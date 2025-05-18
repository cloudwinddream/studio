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
            <CardTitle className="text-3xl font-bold">Little Six Arts Oracle (小六壬)</CardTitle>
          </div>
          <CardDescription>Quick divination for immediate guidance.</CardDescription>
        </CardHeader>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-accent" />
            Feature Under Development
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Soon, you'll be able to perform quick Little Six Arts (Xiao Liu Ren) divinations here.
            Ask a question and receive guidance based on traditional methods.
          </p>
          <div className="relative w-full max-w-sm mx-auto aspect-square">
            <Image 
              src="https://placehold.co/400x400.png" 
              alt="Little Six Arts Placeholder" 
              layout="fill" 
              objectFit="contain" 
              data-ai-hint="oracle symbols"
              className="rounded-md"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            This feature is being crafted to provide you with swift insights.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
