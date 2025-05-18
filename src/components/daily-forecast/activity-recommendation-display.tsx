import type { DailyActivityRecommendationData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MapPin, Utensils, Lightbulb } from 'lucide-react';

interface ActivityRecommendationDisplayProps {
  data: DailyActivityRecommendationData;
}

const RecommendationItem = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <div className="flex items-start space-x-3 p-3 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
    <Icon className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
    <div>
      <p className="font-semibold text-secondary-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export function ActivityRecommendationDisplay({ data }: ActivityRecommendationDisplayProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-3">
          <Lightbulb className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl font-semibold">今日活动建议</CardTitle>
        </div>
        <CardDescription>与今日能量协调的建议。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecommendationItem
          icon={Users}
          title="宜相处之人"
          description={data.recommendedPeople}
        />
        <RecommendationItem
          icon={MapPin}
          title="吉利方位"
          description={data.recommendedLocations}
        />
        <RecommendationItem
          icon={Utensils}
          title="饮食调养"
          description={data.healthyEatingSuggestion}
        />
      </CardContent>
    </Card>
  );
}
