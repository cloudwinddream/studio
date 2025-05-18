import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BookOpenText, Construction } from "lucide-react";
import Image from "next/image";

export default function BaziChartPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpenText className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">八字命盘</CardTitle>
          </div>
          <CardDescription>揭开您四柱八字的奥秘。</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-accent" />
            即将推出
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            此部分将显示您的个性化八字命盘，包括您的四柱、五行分布以及对人生各方面的初步解读。
          </p>
          <div className="relative w-full max-w-md mx-auto aspect-video">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="八字命盘占位图" 
              layout="fill" 
              objectFit="contain"
              data-ai-hint="astrology chart" 
              className="rounded-md"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            我们正在努力为您带来这一富有洞察力的功能。敬请期待！
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
