import type { DailyFortunePoemData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, Palette, Sigma } from 'lucide-react';

interface FortunePoemDisplayProps {
  data: DailyFortunePoemData;
}

export function FortunePoemDisplay({ data }: FortunePoemDisplayProps) {
  return (
    <Card className="shadow-lg  bg-gradient-to-br from-primary/10 via-background to-background">
      <CardHeader>
        <div className="flex items-center gap-3">
          <ScrollText className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl font-semibold">每日诗籤</CardTitle>
        </div>
        <CardDescription>来自星辰的片刻启示。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border border-dashed border-primary/50 rounded-lg bg-primary/5 min-h-[160px]">
          <p className="text-lg whitespace-pre-line font-serif leading-relaxed text-foreground">
            {data.poem}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="flex items-center space-x-3 p-3 bg-card rounded-lg shadow-sm">
            <Palette className="h-6 w-6 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">幸运色</p>
              <p className="text-lg font-semibold text-accent-foreground">{data.luckyColor}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-card rounded-lg shadow-sm">
            <Sigma className="h-6 w-6 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">幸运数字</p>
              <p className="text-lg font-semibold text-accent-foreground">{data.luckyNumber}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
