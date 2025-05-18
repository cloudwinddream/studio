
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIconComponent, CalendarDays, Info, Clock, AlertTriangle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import sxwnl from "sxwnl"; // Import the library
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Added missing import

interface LunarDetails {
  lunarDate: string;
  ganzhiYear: string;
  ganzhiMonth: string;
  ganzhiDay: string;
  solarTerm: string | null;
  宜: string[];
  忌: string[];
  dayYi: string[];
  dayJi: string[];
  timeYi: { [key: string]: string[] };
  timeJi: { [key: string]: string[] };
  shichen: string[];
  jiXiong: string[];
  pengZu: string[];
  chongSha: string;
  caiShen: string; // God of Wealth direction
  xiShen: string; // God of Joy direction
  fuShen: string; // God of Fortune direction
  huangHeiDao: string; // Yellow and Black Road auspiciousness
  naiYin: string; // Na Yin Wu Xing
  wuXing: string; // Day's Wu Xing
}

export default function PerpetualCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [lunarDetails, setLunarDetails] = useState<LunarDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      setIsLoadingDetails(true);
      setErrorDetails(null);
      try {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();

        // Get basic lunar info
        const dayData = sxwnl.lunisolar.calendar(year, month, day);

        const details: LunarDetails = {
          lunarDate: `农历 ${dayData.lunarMonthName}${dayData.lunarDayName}`,
          ganzhiYear: `${dayData.gzYear}年`,
          ganzhiMonth: `${dayData.gzMonth}月`,
          ganzhiDay: `${dayData.gzDay}日`,
          solarTerm: dayData.solarTerm || null,
          宜: sxwnl.tong_shu.getYi(dayData.gzDate).split("."),
          忌: sxwnl.tong_shu.getJi(dayData.gzDate).split("."),
          dayYi: sxwnl.tong_shu.getDayYi(dayData.gzDate).split("."),
          dayJi: sxwnl.tong_shu.getDayJi(dayData.gzDate).split("."),
          timeYi: {}, // Will populate below
          timeJi: {}, // Will populate below
          shichen: [], // Will populate below
          jiXiong: [], // Will populate below
          pengZu: sxwnl.tong_shu.getPengZu(dayData.gzDate).split(" "),
          chongSha: `冲${dayData.shengXiaoChong} (${dayData.gzChong}) 煞${dayData.sha}`,
          caiShen: sxwnl.tong_shu.getCaiShen(dayData.gzDay),
          xiShen: sxwnl.tong_shu.getXiShen(dayData.gzDay),
          fuShen: sxwnl.tong_shu.getFuShen(dayData.gzDay),
          huangHeiDao: sxwnl.tong_shu.getHuangHeiDao(dayData.gzDate),
          naiYin: dayData.naiYin,
          wuXing: dayData.wuXing,
        };
        
        const dayGz = dayData.gzDate;
        const timeNames = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
        const timeRanges = [
          "23:00-00:59", "01:00-02:59", "03:00-04:59", "05:00-06:59", 
          "07:00-08:59", "09:00-10:59", "11:00-12:59", "13:00-14:59",
          "15:00-16:59", "17:00-18:59", "19:00-20:59", "21:00-22:59"
        ];

        for (let i = 0; i < 12; i++) {
          const timeGz = sxwnl.tong_shu.getShiGz(dayGz, i);
          details.shichen.push(`${timeNames[i]}时 (${timeRanges[i]}) - ${timeGz}`);
          details.jiXiong.push(sxwnl.tong_shu.getShiShen(dayGz, i)); // 吉凶
          details.timeYi[timeGz] = sxwnl.tong_shu.getTimeYi(dayGz, timeGz).split(".");
          details.timeJi[timeGz] = sxwnl.tong_shu.getTimeJi(dayGz, timeGz).split(".");
        }
        
        setLunarDetails(details);
      } catch (error) {
        console.error("Error fetching lunar details:", error);
        setErrorDetails("获取详细信息失败，请稍后再试。");
        setLunarDetails(null);
      } finally {
        setIsLoadingDetails(false);
      }
    }
  }, [selectedDate]);

  const DetailItem = ({ label, value, valueClassName }: { label: string; value: string | string[] | null; valueClassName?: string }) => {
    if (!value || (Array.isArray(value) && value.length === 0) || (Array.isArray(value) && value.length === 1 && value[0] === "")) return null;
    return (
      <div className="py-2">
        <p className="text-sm font-semibold text-primary">{label}:</p>
        {Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1 mt-1">
            {value.map((v, i) => v && <Badge key={i} variant="secondary" className={cn("font-normal", valueClassName)}>{v}</Badge>)}
          </div>
        ) : (
          <p className={cn("text-sm text-foreground", valueClassName)}>{value}</p>
        )}
      </div>
    );
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CalendarIconComponent className="h-5 w-5" />
              选择日期
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow-md"
              footer={selectedDate && <p className="text-sm text-center pt-2">已选择: {selectedDate.toLocaleDateString('zh-CN')}</p>}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Info className="h-5 w-5 text-primary" />
              每日详情
            </CardTitle>
            {selectedDate && <CardDescription> {selectedDate.toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} </CardDescription>}
          </CardHeader>
          <CardContent>
            {isLoadingDetails && (
              <div className="flex items-center justify-center h-40">
                <CalendarDays className="h-8 w-8 animate-pulse text-primary" />
                <p className="ml-2">正在加载详情...</p>
              </div>
            )}
            {errorDetails && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>错误</AlertTitle>
                <AlertDescription>{errorDetails}</AlertDescription>
              </Alert>
            )}
            {!isLoadingDetails && !errorDetails && lunarDetails && (
              <ScrollArea className="h-[calc(100vh-20rem)] lg:h-auto lg:max-h-[600px] pr-3">
                <div className="space-y-3">
                  <Card className="bg-primary/5">
                    <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-lg">基本信息</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                      <DetailItem label="公历" value={selectedDate?.toLocaleDateString('zh-CN', { year: 'numeric', month: 'numeric', day: 'numeric' })} />
                      <DetailItem label="农历" value={lunarDetails.lunarDate} />
                      <DetailItem label="年份" value={lunarDetails.ganzhiYear} />
                      <DetailItem label="月份" value={lunarDetails.ganzhiMonth} />
                      <DetailItem label="日期" value={lunarDetails.ganzhiDay} />
                      {lunarDetails.solarTerm && <DetailItem label="节气" value={lunarDetails.solarTerm} valueClassName="text-accent font-semibold"/>}
                      <DetailItem label="纳音五行" value={lunarDetails.naiYin} />
                       <DetailItem label="本日五行" value={lunarDetails.wuXing} />
                      <DetailItem label="冲煞" value={lunarDetails.chongSha} valueClassName="text-destructive-foreground font-medium" />
                      <DetailItem label="彭祖百忌" value={lunarDetails.pengZu.join('; ')} />
                    </CardContent>
                  </Card>

                  <Card className="bg-card">
                     <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-lg">今日吉神方位</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4">
                      <DetailItem label="财神" value={lunarDetails.caiShen} />
                      <DetailItem label="喜神" value={lunarDetails.xiShen} />
                      <DetailItem label="福神" value={lunarDetails.fuShen} />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card">
                     <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-lg">黄黑道日</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                       <DetailItem label="本日" value={lunarDetails.huangHeiDao} valueClassName={lunarDetails.huangHeiDao?.includes("吉") ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}/>
                    </CardContent>
                  </Card>

                  <Card className="bg-accent/10">
                     <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-lg">今日宜忌 (综合)</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <DetailItem label="宜" value={lunarDetails.宜} valueClassName="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" />
                      <Separator className="my-3"/>
                      <DetailItem label="忌" value={lunarDetails.忌} valueClassName="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" />
                    </CardContent>
                  </Card>
                  
                   <Card className="bg-secondary/10">
                     <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-lg">今日日建宜忌</CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4">
                      <DetailItem label="日宜" value={lunarDetails.dayYi} valueClassName="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300" />
                      <Separator className="my-3"/>
                      <DetailItem label="日忌" value={lunarDetails.dayJi} valueClassName="bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300" />
                    </CardContent>
                  </Card>


                  <Card>
                    <CardHeader className="pb-2 pt-4 px-4">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        时辰吉凶与宜忌
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-4 space-y-3">
                      {lunarDetails.shichen.map((shichen, index) => (
                        <div key={index} className="p-3 border rounded-md bg-background shadow-sm">
                          <p className="font-semibold">{shichen} <Badge variant={lunarDetails.jiXiong[index].includes("吉") ? "default" : "destructive"} className={cn(lunarDetails.jiXiong[index].includes("吉") ? "bg-green-500" : "bg-red-500", "ml-2")}>{lunarDetails.jiXiong[index]}</Badge></p>
                          <div className="mt-1">
                             <DetailItem label="时宜" value={lunarDetails.timeYi[shichen.split(' - ')[1]] || ['无']} valueClassName="text-xs bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-300" />
                             <DetailItem label="时忌" value={lunarDetails.timeJi[shichen.split(' - ')[1]] || ['无']} valueClassName="text-xs bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-300" />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            )}
            {!isLoadingDetails && !errorDetails && !lunarDetails && selectedDate && (
                 <Alert>
                    <CalendarDays className="h-4 w-4" />
                    <AlertTitle>暂无数据</AlertTitle>
                    <AlertDescription>无法加载所选日期的详细信息。</AlertDescription>
                </Alert>
            )}
             {!selectedDate && (
                <Alert variant="default" className="bg-muted">
                    <CalendarIconComponent className="h-4 w-4" />
                    <AlertTitle>请选择日期</AlertTitle>
                    <AlertDescription>请从左侧日历中选择一个日期以查看详细信息。</AlertDescription>
                </Alert>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
