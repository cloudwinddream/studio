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
        Interpreting Your Poem
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground italic">
        "The wise old master on the bustling street corner squinted, smoke curling from his long pipe. 'Ah,' he'd begin, 'this poem speaks of hidden currents, like a river flowing beneath a calm surface. The dragon and phoenix dance in your stars today, suggesting a meeting of significance. But beware the playful monkey, for distractions may lead you astray. The path to fortune is paved with mindful steps, young one. Remember, the brightest treasures are often found not by searching, but by being ready when they appear.' He'd then take a long puff, leaving you to ponder the myriad meanings..."
      </p>
    </CardContent>
  </Card>
);

const DailyTipsCarousel = () => {
  const tips = [
    "Embrace new opportunities with an open mind.",
    "Communication is key in relationships today.",
    "Focus on one task at a time for better productivity.",
    "A short walk can refresh your mind and body.",
    "Listen to your intuition; it has valuable insights.",
    "Patience will be rewarded in financial matters.",
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
        <CardTitle className="text-xl">Today's Wisdom</CardTitle>
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
      setError("Please complete your user profile (birth date and time) in settings to get your daily forecast.");
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

        // Simplified Bazi chart string for now
        const baziChartString = `Bazi derived from Birth Date: ${userProfile.birthDate}, Birth Time: ${userProfile.birthTime}, Gender: ${userProfile.gender || 'Not specified'}`;
        const activityInput = {
          baziChart: baziChartString,
          currentDate: currentDate,
        };
        const activityResult = await dailyActivityRecommendation(activityInput);
        setActivityData(activityResult);

      } catch (e) {
        console.error("Error fetching daily data:", e);
        setError("Failed to fetch daily forecast. Please try again.");
        setFortunePoemData(null);
        setActivityData(null);
      }
    });
  };
  
  useEffect(() => {
    if (!isLoadingProfile && userProfile) {
      fetchData();
    } else if (!isLoadingProfile && !userProfile) {
       setError("Please set your birth date and time in settings for a personalized forecast.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, isLoadingProfile]);


  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading user profile...</p>
      </div>
    );
  }
  
  if (error && !isFetching) {
     return (
      <Alert variant="destructive" className="shadow-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error}
          {error.includes("profile") && (
            <Link href="/settings" className="mt-2 block">
              <Button variant="default" size="sm">Go to Settings</Button>
            </Link>
          )}
           {!error.includes("profile") && (
             <Button onClick={fetchData} disabled={isFetching} variant="outline" size="sm" className="mt-2">
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              Try Again
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
          <AlertTitle className="text-accent-foreground">Complete Your Profile</AlertTitle>
          <AlertDescription className="text-accent-foreground/80">
            For personalized daily insights, please provide your birth date and time in the settings.
            <Link href="/settings" className="mt-2 block">
              <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90" size="sm">Go to Settings</Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {isFetching && (
        <div className="flex flex-col justify-center items-center min-h-[300px] space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-primary">Generating your personalized forecast...</p>
          <p className="text-sm text-muted-foreground">This may take a moment.</p>
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
              Refresh Forecast
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
