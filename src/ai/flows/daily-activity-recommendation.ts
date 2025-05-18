'use server';
/**
 * @fileOverview Generates personalized daily activity recommendations based on Bazi and current day.
 *
 * - dailyActivityRecommendation - A function that generates activity recommendations.
 * - DailyActivityRecommendationInput - The input type for the function.
 * - DailyActivityRecommendationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyActivityRecommendationInputSchema = z.object({
  baziChart: z
    .string()
    .describe("The user's Bazi chart information, including the Four Pillars and Five Elements."),
  currentDate: z
    .string()
    .describe('The current date for which the recommendations are generated (YYYY-MM-DD).'),
});
export type DailyActivityRecommendationInput = z.infer<
  typeof DailyActivityRecommendationInputSchema
>;

const DailyActivityRecommendationOutputSchema = z.object({
  recommendedPeople: z
    .string()
    .describe('People who are suitable to interact with today.'),
  recommendedLocations: z.string().describe('Locations suitable to visit today.'),
  healthyEatingSuggestion: z.string().describe('Healthy eating suggestions for today.'),
});
export type DailyActivityRecommendationOutput = z.infer<
  typeof DailyActivityRecommendationOutputSchema
>;

export async function dailyActivityRecommendation(
  input: DailyActivityRecommendationInput
): Promise<DailyActivityRecommendationOutput> {
  return dailyActivityRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyActivityRecommendationPrompt',
  input: {schema: DailyActivityRecommendationInputSchema},
  output: {schema: DailyActivityRecommendationOutputSchema},
  prompt: `You are an expert in Chinese astrology, providing daily recommendations based on a user's Bazi chart and the current day's energies.

  Bazi Chart: {{{baziChart}}}
  Current Date: {{{currentDate}}}

  Based on this information, provide personalized recommendations for:

  - Suitable people to interact with (recommendedPeople):
  - Locations to visit (recommendedLocations):
  - Healthy eating suggestions (healthyEatingSuggestion):
  `,
});

const dailyActivityRecommendationFlow = ai.defineFlow(
  {
    name: 'dailyActivityRecommendationFlow',
    inputSchema: DailyActivityRecommendationInputSchema,
    outputSchema: DailyActivityRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
