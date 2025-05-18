export type UserProfile = {
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  gender?: 'male' | 'female' | 'other';
};

export type DailyFortunePoemData = {
  poem: string;
  luckyColor: string;
  luckyNumber: number;
};

export type DailyActivityRecommendationData = {
  recommendedPeople: string;
  recommendedLocations: string;
  healthyEatingSuggestion: string;
};
