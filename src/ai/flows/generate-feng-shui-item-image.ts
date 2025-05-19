
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
      const response = await ai.generate({ 
        model: 'googleai/gemini-2.0-flash-exp', // Ensure this model is used for image generation
        prompt: `生成一张关于"${input.itemName}"的图片，该物品常被用作风水开运摆件或饰品。图片风格应美观、清晰，适合展示。`,
        config: {
          responseModalities: ['IMAGE', 'TEXT'], // Must include IMAGE, TEXT is also fine.
        },
      });

      const mediaArray = response.media;
      const responseText = response.text;
      const isBlocked = response.isBlocked;
      const blockReason = response.blockReason;
      const blockReasonMessage = response.blockReasonMessage;

      if (mediaArray && mediaArray.length > 0 && mediaArray[0] && mediaArray[0].url) {
        return mediaArray[0].url; // Access the URL from the first media part
      } else {
        console.error(
          'Image generation failed to return a valid media URL. AI Response Details:',
          {
            itemName: input.itemName,
            mediaArray: mediaArray,
            responseText: responseText,
            isBlocked: isBlocked,
            blockReason: blockReason,
            blockReasonMessage: blockReasonMessage,
            // For very detailed debugging, you might log the entire 'response' object,
            // but be mindful of potentially large data or sensitive info in a real production scenario.
            // fullResponse: response 
          }
        );
        throw new Error('Image generation did not return a valid media URL. Please check server logs for more details.');
      }
    } catch (error) {
      console.error('Error during Feng Shui item image generation flow:', error);
      // Re-throwing to let the caller (UI) handle it, which it does by showing a fallback.
      // If the error is already an Error instance, just rethrow. Otherwise, wrap it.
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Failed to generate image: ${String(error)}`);
    }
  }
);

