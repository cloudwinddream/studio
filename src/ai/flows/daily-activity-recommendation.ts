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
    .describe("The user's Bazi chart information, including the Four Pillars and Five Elements. This information is provided in Chinese."),
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
    .describe('People who are suitable to interact with today, in Chinese.'),
  recommendedLocations: z.string().describe('Locations suitable to visit today, in Chinese.'),
  healthyEatingSuggestion: z.string().describe('Healthy eating suggestions for today, in Chinese.'),
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
  prompt: `您是一位中国命理专家，根据用户的八字命盘和当日的能量提供每日建议。所有输出都应该是简体中文。

  八字命盘信息: {{{baziChart}}}
  当前日期: {{{currentDate}}}

  基于这些信息，请提供个性化的中文建议：

  - 今日适宜接触的人物 (recommendedPeople):
  - 今日适宜前往的地点 (recommendedLocations):
  - 今日健康饮食建议 (healthyEatingSuggestion):
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
