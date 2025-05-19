'use server';
/**
 * @fileOverview Generates an image for a Feng Shui item using AI.
 *
 * - generateFengShuiItemImage - A function that generates an image based on the item name.
 * - GenerateFengShuiItemImageInput - The input type for the function.
 * - GenerateFengShuiItemImageOutput - The return type for the function (image data URI).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFengShuiItemImageInputSchema = z.object({
  itemName: z.string().describe('The name of the Feng Shui item in Chinese (e.g., "紫水晶").'),
});
export type GenerateFengShuiItemImageInput = z.infer<typeof GenerateFengShuiItemImageInputSchema>;

// The output is a string, which will be the image data URI.
const GenerateFengShuiItemImageOutputSchema = z.string().describe("The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:image/png;base64,<encoded_data>'.");
export type GenerateFengShuiItemImageOutput = z.infer<typeof GenerateFengShuiItemImageOutputSchema>;

export async function generateFengShuiItemImage(
  input: GenerateFengShuiItemImageInput
): Promise<GenerateFengShuiItemImageOutput> {
  return generateFengShuiItemImageFlow(input);
}

const generateFengShuiItemImageFlow = ai.defineFlow(
  {
    name: 'generateFengShuiItemImageFlow',
    inputSchema: GenerateFengShuiItemImageInputSchema,
    outputSchema: GenerateFengShuiItemImageOutputSchema,
  },
  async (input) => {
    try {
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // Ensure this model is used for image generation
        prompt: `生成一张关于"${input.itemName}"的图片，该物品常被用作风水开运摆件或饰品。图片风格应美观、清晰，适合展示。`,
        config: {
          responseModalities: ['IMAGE', 'TEXT'], // Must include IMAGE, TEXT is also fine.
        },
      });

      if (media && media.url) {
        return media.url; // This should be the data URI of the generated image
      } else {
        throw new Error('Image generation did not return a media URL.');
      }
    } catch (error) {
      console.error('Error generating Feng Shui item image:', error);
      // Fallback or re-throw, depending on desired error handling
      // For now, re-throwing to let the caller handle it.
      throw error; 
    }
  }
);
