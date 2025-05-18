import { DailyPanel } from '@/components/daily-forecast/daily-panel';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { UserCog, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              <CardTitle className="text-3xl font-bold tracking-tight">每日运势</CardTitle>
            </div>
            <Link href="/settings" passHref>
              <Button variant="outline" size="sm">
                <UserCog className="mr-2 h-4 w-4" />
                更新资料
              </Button>
            </Link>
          </div>
          <CardDescription className="pt-1">
            基于古老智慧和您的独特八字，为您提供个性化的每日洞察。
          </CardDescription>
        </CardHeader>
      </Card>
      <DailyPanel />
    </div>
  );
}
