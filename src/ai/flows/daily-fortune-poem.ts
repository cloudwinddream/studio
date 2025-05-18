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
  poem: z.string().describe('A short fortune poem (谶语) of approximately 100 characters.'),
  luckyColor: z.string().describe('The lucky color for the day.'),
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
  prompt: `You are an expert in Chinese astrology and fortune telling. Generate a short poem (谶语) of approximately 100 characters based on the user's Bazi information (birth date: {{{birthDate}}}, birth time: {{{birthTime}}}) and the current date ({{{currentDate}}}).

The poem should be in traditional Chinese style, with eight lines and rhyming couplets. It should provide insights and guidance for the user's day.

Also, determine the lucky color and lucky number for the day based on the same information. Return luckyColor as a color name, and luckyNumber as an integer.

Output in JSON format.
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
