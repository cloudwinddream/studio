"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Gem, Loader2, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { generateFengShuiItemImage } from '@/ai/flows/generate-feng-shui-item-image';
import { Skeleton } from '@/components/ui/skeleton';

// Static placeholder data, item name will be used for AI image generation
const defaultItem = {
  name: "紫水晶", // Amethyst in Chinese
  image: "https://placehold.co/300x200.png", // Placeholder
  imageHint: "crystal geode",
  meaning: "促进平静、直觉和精神觉醒。",
  placement: "放置在您的书桌或冥想空间，以增强专注和平静。"
};

export function FengShuiItemCard() {
  const [itemName, setItemName] = useState<string>(defaultItem.name);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(true); // Start generating on mount
  const [generationError, setGenerationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!itemName) {
        setIsGenerating(false);
        return;
      }
      
      setIsGenerating(true);
      setGenerationError(null);
      try {
        const imageUrl = await generateFengShuiItemImage({ itemName });
        setGeneratedImageUrl(imageUrl);
      } catch (error) {
        console.error("Failed to generate Feng Shui item image:", error);
        setGenerationError("图片生成失败，将显示默认图片。");
        setGeneratedImageUrl(null); // Fallback to placeholder
      } finally {
        setIsGenerating(false);
      }
    };

    fetchImage();
  }, [itemName]);

  const displayImageUrl = generatedImageUrl || defaultItem.image;
  const displayImageAlt = itemName || defaultItem.name;

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gem className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">开运好物</CardTitle>
        </div>
        <CardDescription>用这个幸运物增强您的运气。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="aspect-[3/2] relative w-full rounded-md overflow-hidden bg-muted">
          {isGenerating ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/70">
              <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">正在生成开运好物图片...</p>
            </div>
          ) : generationError && !generatedImageUrl ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/70 p-4">
              <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
              <p className="text-sm text-destructive text-center">{generationError}</p>
              <Image 
                src={defaultItem.image} 
                alt={defaultItem.name} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint={defaultItem.imageHint}
                className="opacity-30" 
              />
            </div>
          ) : null}
          
          {(!isGenerating || generatedImageUrl) && (
            <Image 
              src={displayImageUrl} 
              alt={displayImageAlt} 
              layout="fill" 
              objectFit="cover"
              data-ai-hint={generatedImageUrl ? itemName : defaultItem.imageHint} // Use item name as hint if AI generated
              className={isGenerating && !generatedImageUrl ? "opacity-0" : "opacity-100 transition-opacity duration-500"}
              onError={() => {
                // Handle image load error for generated or placeholder
                if (generatedImageUrl) {
                  setGenerationError("图片加载失败，显示默认图片。");
                  setGeneratedImageUrl(null); // Fallback to placeholder on error
                }
                // If placeholder also fails, this will be an issue with the placeholder itself
              }}
            />
          )}
        </div>
        <h3 className="font-semibold text-lg text-primary-foreground">{itemName}</h3>
        <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">寓意：</span> {defaultItem.meaning}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground italic"><span className="font-medium text-foreground">提示：</span> {defaultItem.placement}</p>
      </CardFooter>
    </Card>
  );
}
