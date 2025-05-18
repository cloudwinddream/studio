import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Puzzle, Construction } from "lucide-react";
import Image from "next/image";

export default function LittleSixArtsPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Puzzle className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">小六壬神算</CardTitle>
          </div>
          <CardDescription>快速占卜，即时指引。</CardDescription>
        </CardHeader>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-accent" />
            功能开发中
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            很快，您就可以在这里进行小六壬快速占卜了。
            提出一个问题，即可根据传统方法获得指引。
          </p>
          <div className="relative w-full max-w-sm mx-auto aspect-square">
            <Image 
              src="https://placehold.co/400x400.png" 
              alt="小六壬占位图" 
              layout="fill" 
              objectFit="contain" 
              data-ai-hint="oracle symbols"
              className="rounded-md"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            此功能正在精心打造中，旨在为您提供快捷的洞察。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
