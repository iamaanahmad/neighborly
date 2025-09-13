'use server';

/**
 * @fileOverview A flow to moderate text content using AI.
 *
 * - moderateText - A function that checks if text is appropriate.
 * - ModerateTextInput - The input type for the moderateText function.
 * - ModerateTextOutput - The return type for the moderateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateTextInputSchema = z.object({
  textToModerate: z.string().describe('The text content to be moderated.'),
});
export type ModerateTextInput = z.infer<typeof ModerateTextInputSchema>;

const ModerateTextOutputSchema = z.object({
  isAppropriate: z
    .boolean()
    .describe('Whether the text is appropriate and safe for a community platform.'),
  reason: z
    .string()
    .optional()
    .describe('The reason why the text was flagged as inappropriate, if applicable.'),
});
export type ModerateTextOutput = z.infer<typeof ModerateTextOutputSchema>;


export async function moderateText(
  input: ModerateTextInput
): Promise<ModerateTextOutput> {
  return moderateTextFlow(input);
}


const prompt = ai.definePrompt({
  name: 'moderateTextPrompt',
  input: {schema: ModerateTextInputSchema},
  output: {schema: ModerateTextOutputSchema},
  prompt: `You are a content moderator for a community help app called "Neighborly". Your task is to determine if the following text is appropriate and safe for a general audience.

The text should be flagged as inappropriate if it contains:
- Profanity, hate speech, or harassment.
- Personal attacks or discriminatory language.
- Mentions of illegal activities, substances, or weapons.
- Unsafe requests or content that could endanger individuals.
- Spam or commercial advertising.

Analyze the following text and determine if it is appropriate.

Text to Moderate: {{{textToModerate}}}
`,
});

const moderateTextFlow = ai.defineFlow(
  {
    name: 'moderateTextFlow',
    inputSchema: ModerateTextInputSchema,
    outputSchema: ModerateTextOutputSchema,
  },
  async input => {
    if (!input.textToModerate.trim()) {
        return { isAppropriate: true };
    }
    const {output} = await prompt(input);
    return output!;
  }
);
