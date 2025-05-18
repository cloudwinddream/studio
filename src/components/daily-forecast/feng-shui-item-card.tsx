import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Gem } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function FengShuiItemCard() {
  // Placeholder data
  const item = {
    name: "Amethyst Crystal",
    image: "https://placehold.co/300x200.png",
    imageHint: "crystal geode",
    meaning: "Promotes calmness, intuition, and spiritual awareness.",
    placement: "Place on your desk or in your meditation space to enhance focus and tranquility."
  };

  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Gem className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">Auspicious Item</CardTitle>
        </div>
        <CardDescription>Enhance your luck with this charm.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="aspect-[3/2] relative w-full rounded-md overflow-hidden">
          <Image 
            src={item.image} 
            alt={item.name} 
            layout="fill" 
            objectFit="cover"
            data-ai-hint={item.imageHint}
          />
        </div>
        <h3 className="font-semibold text-lg text-primary-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Meaning:</span> {item.meaning}</p>
        
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground italic"><span className="font-medium text-foreground">Tip:</span> {item.placement}</p>
      </CardFooter>
    </Card>
  );
}
