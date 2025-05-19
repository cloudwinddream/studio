
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { CalendarDays, Info, Loader2 } from "lucide-react";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar"; // Renamed to avoid conflict
import { useEffect, useState } from "react";
import sxwnl from '@/lib/sxwnl'; // Import the local library
import type { LunarDateInfo } from '@/types/sxwnl';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"; // Added missing import

const DetailItem = ({ label, value }: { label: string; value: string | undefined | null }) => (
  value ? <p><span className="font-semibold text-primary">{label}:</span> {value}</p> : null
);

const DetailList = ({ label, items }: { label: string; items: string[] | undefined }) => (
  items && items.length > 0 ? (
    <div>
      <p className="font-semibold text-primary mb-1">{label}:</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <Badge key={index} variant="secondary" className="text-sm">{item}</Badge>
        ))}
      </div>
    </div>
  ) : null
);

export default function PerpetualCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [lunarDetails, setLunarDetails] = useState<LunarDateInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      setError(null);
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const details = sxwnl.getDay(year, month, day);
        if (details.error) {
          setError("无法获取所选日期的详细信息，可能日期超出了支持范围 (1900-2049)。");
          setLunarDetails(null);
        } else {
          setLunarDetails(details);
        }
      } catch (e) {
        console.error("Error fetching lunar details:", e);
        setError("获取农历详情时发生错误。");
        setLunarDetails(null);
      }
      setIsLoading(false);
    }
  }, [selectedDate]);

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-md">
          <CardHeader>
            <CardTitle>选择日期</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ShadcnCalendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date.getFullYear() < 1900 || date.getFullYear() > 2049} // sxwnl range
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle>每日详情</CardTitle>
            {selectedDate && <CardDescription>{selectedDate.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })} {lunarDetails?.cnWeek}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2">正在加载详情...</p>
              </div>
            )}
            {error && !isLoading && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>错误</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {!isLoading && !error && lunarDetails && (
              <div className="space-y-3 text-sm">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-lg font-semibold text-primary">{lunarDetails.cnLunarDate} ({lunarDetails.lYearName})</p>
                    <p className="text-muted-foreground">{lunarDetails.gzYear}年 {lunarDetails.gzMonth}月 {lunarDetails.gzDay}日</p>
                </div>
                
                <Separator />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  <DetailItem label="节气" value={lunarDetails.term || "无"} />
                  <DetailItem label="星座" value={lunarDetails.astro} />
                  <DetailItem label="建除十二值" value={lunarDetails.jcName} />
                  <DetailItem label="今日神煞" value={`${lunarDetails.shenSha} (${lunarDetails.shenShaType})`} />
                </div>
                
                {lunarDetails.festival && lunarDetails.festival.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="font-semibold text-primary mb-1">节日:</p>
                      <div className="flex flex-wrap gap-2">
                        {lunarDetails.festival.map(f => (
                          <Badge key={f.name} variant="outline">{f.name} ({f.type === 'lunar' ? '农历' : '公历'})</Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Separator />
                <DetailList label="今日宜" items={lunarDetails.huangLiY} />
                <Separator />
                <DetailList label="今日忌" items={lunarDetails.huangLiJ} />
                <Separator />
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="font-semibold text-muted-foreground mb-1">彭祖百忌:</p>
                  <p className="text-xs">{lunarDetails.pengZu}</p>
                </div>
                {lunarDetails.shenShaDesc && (
                   <div className="bg-muted/50 p-3 rounded-md">
                     <p className="font-semibold text-muted-foreground mb-1">神煞释义 ({lunarDetails.shenSha}):</p>
                     <p className="text-xs">{lunarDetails.shenShaDesc}</p>
                   </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
