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
          <CardTitle className="text-2xl font-semibold">Activities for Today</CardTitle>
        </div>
        <CardDescription>Suggestions to harmonize with today's energies.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RecommendationItem
          icon={Users}
          title="Connect With"
          description={data.recommendedPeople}
        />
        <RecommendationItem
          icon={MapPin}
          title="Auspicious Places"
          description={data.recommendedLocations}
        />
        <RecommendationItem
          icon={Utensils}
          title="Nourish Yourself"
          description={data.healthyEatingSuggestion}
        />
      </CardContent>
    </Card>
  );
}
