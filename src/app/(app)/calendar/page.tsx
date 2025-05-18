import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, CalendarDays, Construction } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";

export default function PerpetualCalendarPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">万年历</CardTitle>
          </div>
          <CardDescription>探索公历和农历、节气以及每日指南。</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>日历视图</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border shadow-md"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Construction className="h-6 w-6 text-accent" />
              每日详情 (即将推出)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              此部分将显示选定日期的详细信息，包括：
            </p>
            <ul className="list-disc list-inside text-left text-muted-foreground text-sm">
              <li>农历日期与节气</li>
              <li>天干地支</li>
              <li>每日宜忌</li>
              <li>吉时与吉向</li>
            </ul>
             <div className="relative w-full max-w-xs mx-auto aspect-[4/3]">
              <Image 
                src="https://placehold.co/400x300.png" 
                alt="日历详情占位图" 
                layout="fill" 
                objectFit="contain" 
                data-ai-hint="chinese almanac"
                className="rounded-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
