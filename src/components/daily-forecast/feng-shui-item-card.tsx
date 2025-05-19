
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Gem, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FengShuiItem {
  id: string;
  name: string;
  imageSrc: string;
  imageHint: string;
  meaning: string;
  placement: string;
}

const fengShuiItems: FengShuiItem[] = [
  {
    id: '1',
    name: "紫水晶", // Amethyst
    imageSrc: "https://picsum.photos/seed/amethyst/300/200",
    imageHint: "crystal geode",
    meaning: "促进平静、直觉和精神觉醒。",
    placement: "放置在您的书桌或冥想空间，以增强专注和平静。"
  },
  {
    id: '2',
    name: "金蟾", // Money Frog
    imageSrc: "https://picsum.photos/seed/moneyfrog/300/200",
    imageHint: "golden toad",
    meaning: "招财进宝，财源广进。",
    placement: "放置在家中或办公室的财位，面向门口。"
  },
  {
    id: '3',
    name: "风水轮", // Feng Shui Water Wheel
    imageSrc: "https://picsum.photos/seed/waterwheel/300/200",
    imageHint: "water feature",
    meaning: "时来运转，催财升运。",
    placement: "宜放置在客厅或办公室的偏财位，水流朝内。"
  },
  {
    id: '4',
    name: "平安扣", // Safety Buckle
    imageSrc: "https://picsum.photos/seed/safetybuckle/300/200",
    imageHint: "jade donut",
    meaning: "锁住平安，岁岁平安。",
    placement: "可随身佩戴或挂于车内、床头。"
  }
];

export function FengShuiItemCard() {
  const [currentItem, setCurrentItem] = useState<FengShuiItem | null>(null);

  useEffect(() => {
    // Select a random item on client-side mount
    const randomIndex = Math.floor(Math.random() * fengShuiItems.length);
    setCurrentItem(fengShuiItems[randomIndex]);
  }, []);

  if (!currentItem) {
    return (
      <Card className="shadow-md overflow-hidden flex items-center justify-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </Card>
    );
  }

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
            src={currentItem.imageSrc}
            alt={currentItem.name}
            fill
            style={{ objectFit: "cover" }}
            data-ai-hint={currentItem.imageHint}
            priority={false} // Let Next.js decide, or set to true if critical
          />
        </div>
        <h3 className="font-semibold text-lg text-primary-foreground">{currentItem.name}</h3>
        <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">寓意：</span> {currentItem.meaning}</p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground italic"><span className="font-medium text-foreground">提示：</span> {currentItem.placement}</p>
      </CardFooter>
    </Card>
  );
}
