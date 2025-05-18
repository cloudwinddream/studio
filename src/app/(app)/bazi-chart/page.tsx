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
            <CardTitle className="text-3xl font-bold">Bazi Chart</CardTitle>
          </div>
          <CardDescription>Unlock the secrets of your Four Pillars of Destiny.</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-accent" />
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            This section will display your personalized Bazi chart, including your Four Pillars,
            Five Elements distribution, and initial interpretations for various life aspects.
          </p>
          <div className="relative w-full max-w-md mx-auto aspect-video">
            <Image 
              src="https://placehold.co/600x400.png" 
              alt="Bazi Chart Placeholder" 
              layout="fill" 
              objectFit="contain"
              data-ai-hint="astrology chart" 
              className="rounded-md"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            We are working on bringing you this insightful feature. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
