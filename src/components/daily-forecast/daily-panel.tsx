"use client";

import { useEffect, useState, useTransition } from 'react';
import { useUserProfile } from '@/contexts/user-profile-context';
import { generateDailyFortunePoem } from '@/ai/flows/daily-fortune-poem';
import { dailyActivityRecommendation } from '@/ai/flows/daily-activity-recommendation';
import type { DailyFortunePoemData, DailyActivityRecommendationData, UserProfile } from '@/lib/types';
import { FortunePoemDisplay } from './fortune-poem-display';
import { ActivityRecommendationDisplay } from './activity-recommendation-display';
import { FengShuiItemCard } from './feng-shui-item-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader2, Info, AlertTriangle, Wand2, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const PoemInterpretationStory = () => (
  <Card className="shadow-md">
    <CardHeader>
      <CardTitle className="text-xl flex items-center gap-2">
        <Wand2 className="text-accent h-5 w-5" />
        解读您的诗籤
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground italic">
        “街角那位睿智的老先生眯起了眼，长长的烟斗冒着袅袅青烟。‘啊，’他开口道，‘此籤预示着暗流涌动，如同平静水面下的江河。今日您星盘中龙凤呈祥，预示着一次重要的相遇。但要当心那调皮的猴子，分心可能会让您误入歧途。财富之路是用正念的步伐铺就的，年轻人。记住，最璀璨的宝藏往往不是通过寻找得到的，而是在它们出现时做好准备。’他随后深吸一口烟，留给您去琢磨这其中万千的含义……”
      </p>
    </CardContent>
  </Card>
);

const DailyTipsCarousel = () => {
  const tips = [
    "以开放的心态拥抱新的机遇。",
    "沟通是今天人际关系的关键。",
    "一次专注于一项任务，以提高效率。",
    "短暂的散步可以使您的身心焕然一新。",
    "倾听您的直觉；它有宝贵的见解。",
    "耐心将在财务问题上得到回报。",
  ];
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [tips.length]);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">今日锦囊</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-lg font-medium text-primary h-12 flex items-center justify-center">
          {tips[currentTip]}
        </p>
      </CardContent>
    </Card>
  );
};


export function DailyPanel() {
  const { userProfile, isLoading: isLoadingProfile } = useUserProfile();
  const [fortunePoemData, setFortunePoemData] = useState<DailyFortunePoemData | null>(null);
  const [activityData, setActivityData] = useState<DailyActivityRecommendationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFetching, startFetching] = useTransition();

  const fetchData = () => {
    if (!userProfile || !userProfile.birthDate || !userProfile.birthTime) {
      setError("请在设置中完善您的用户资料（出生日期和时间）以获取每日运势。");
      setFortunePoemData(null);
      setActivityData(null);
      return;
    }
    setError(null);
    startFetching(async () => {
      try {
        const currentDate = new Date().toISOString().split('T')[0];
        const poemInput = {
          birthDate: userProfile.birthDate,
          birthTime: userProfile.birthTime,
          currentDate: currentDate,
        };
        const poemResult = await generateDailyFortunePoem(poemInput);
        setFortunePoemData(poemResult);

        const baziChartString = `八字来源于出生日期: ${userProfile.birthDate}, 出生时间: ${userProfile.birthTime}, 性别: ${userProfile.gender || '未指定'}`;
        const activityInput = {
          baziChart: baziChartString,
          currentDate: currentDate,
        };
        const activityResult = await dailyActivityRecommendation(activityInput);
        setActivityData(activityResult);

      } catch (e) {
        console.error("获取每日数据时出错:", e);
        setError("获取每日运势失败。请再试一次。");
        setFortunePoemData(null);
        setActivityData(null);
      }
    });
  };
  
  useEffect(() => {
    if (!isLoadingProfile && userProfile) {
      fetchData();
    } else if (!isLoadingProfile && !userProfile) {
       setError("请在设置中设定您的出生日期和时间以获取个性化运势。");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, isLoadingProfile]);


  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">正在加载用户资料...</p>
      </div>
    );
  }
  
  if (error && !isFetching) {
     return (
      <Alert variant="destructive" className="shadow-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>错误</AlertTitle>
        <AlertDescription>
          {error}
          {error.includes("资料") && (
            <Link href="/settings" className="mt-2 block">
              <Button variant="default" size="sm">前往设置</Button>
            </Link>
          )}
           {!error.includes("资料") && (
             <Button onClick={fetchData} disabled={isFetching} variant="outline" size="sm" className="mt-2">
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              再试一次
            </Button>
           )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {!userProfile && !isLoadingProfile && (
        <Alert variant="default" className="bg-accent/30 border-accent shadow-md">
          <Info className="h-4 w-4 text-accent-foreground" />
          <AlertTitle className="text-accent-foreground">完善您的资料</AlertTitle>
          <AlertDescription className="text-accent-foreground/80">
            为了获得个性化的每日洞察，请在设置中提供您的出生日期和时间。
            <Link href="/settings" className="mt-2 block">
              <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">前往设置</Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {isFetching && (
        <div className="flex flex-col justify-center items-center min-h-[300px] space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-primary">正在生成您的个性化运势...</p>
          <p className="text-sm text-muted-foreground">这可能需要一些时间。</p>
        </div>
      )}

      {!isFetching && userProfile && (fortunePoemData || activityData) && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {fortunePoemData && <FortunePoemDisplay data={fortunePoemData} />}
              {activityData && <ActivityRecommendationDisplay data={activityData} />}
            </div>
            <div className="space-y-6">
              <FengShuiItemCard />
              <PoemInterpretationStory />
            </div>
          </div>
          <DailyTipsCarousel />
           <div className="text-center mt-4">
            <Button onClick={fetchData} disabled={isFetching} variant="outline">
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              刷新运势
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
