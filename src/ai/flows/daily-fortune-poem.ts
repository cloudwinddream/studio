'use server';
/**
 * @fileOverview Generates a daily fortune poem (谶语) based on user's Bazi information and current date.
 *
 * - generateDailyFortunePoem - A function that generates the daily fortune poem.
 * - DailyFortunePoemInput - The input type for the generateDailyFortunePoem function.
 * - DailyFortunePoemOutput - The return type for the generateDailyFortunePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DailyFortunePoemInputSchema = z.object({
  birthDate: z.string().describe('User birth date in ISO format (YYYY-MM-DD).'),
  birthTime: z.string().describe('User birth time in HH:mm format.'),
  currentDate: z.string().describe('Current date in ISO format (YYYY-MM-DD).'),
});
export type DailyFortunePoemInput = z.infer<typeof DailyFortunePoemInputSchema>;

const DailyFortunePoemOutputSchema = z.object({
  poem: z.string().describe('A short fortune poem (谶语) in Chinese, approximately 100 characters.'),
  luckyColor: z.string().describe('The lucky color for the day, in Chinese (e.g., "红色", "蓝色").'),
  luckyNumber: z.number().describe('The lucky number for the day.'),
});
export type DailyFortunePoemOutput = z.infer<typeof DailyFortunePoemOutputSchema>;

export async function generateDailyFortunePoem(input: DailyFortunePoemInput): Promise<DailyFortunePoemOutput> {
  return dailyFortunePoemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyFortunePoemPrompt',
  input: {schema: DailyFortunePoemInputSchema},
  output: {schema: DailyFortunePoemOutputSchema},
  prompt: `您是一位精通中国命理和占卜的专家。请根据用户的八字信息（出生日期：{{{birthDate}}}，出生时间：{{{birthTime}}}）和当前日期（{{{currentDate}}}），生成一首约100字的简短谶语。

谶语应为中国传统风格，八句，押韵。它应为用户当天的生活提供见解和指引。

同时，根据相同信息确定当天的幸运色和幸运数字。请以中文返回幸运色（例如，“红色”，“蓝色”），幸运数字以整数形式返回。

以JSON格式输出。
`,
});

const dailyFortunePoemFlow = ai.defineFlow(
  {
    name: 'dailyFortunePoemFlow',
    inputSchema: DailyFortunePoemInputSchema,
    outputSchema: DailyFortunePoemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
