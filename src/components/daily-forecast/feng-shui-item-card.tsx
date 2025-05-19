
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Gem } from 'lucide-react';
import { useState } from 'react';

// Static placeholder data
const defaultItem = {
  name: "紫水晶", // Amethyst in Chinese
  image: "https://placehold.co/300x200.png",
  imageHint: "crystal geode", // Hint for the placeholder
  meaning: "促进平静、直觉和精神觉醒。",
  placement: "放置在您的书桌或冥想空间，以增强专注和平静。"
};

export function FengShuiItemCard() {
  const [itemName] = useState<string>(defaultItem.name);

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
          <Image
            src={defaultItem.image}
            alt={itemName || "开运好物图片"}
            fill
            style={{ objectFit: "cover" }}
            data-ai-hint={defaultItem.imageHint}
            // Removed className="transition-opacity duration-500" and priority for debugging
          />
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
