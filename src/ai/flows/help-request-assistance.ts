'use server';

/**
 * @fileOverview A flow to assist users in drafting help requests using AI.
 *
 * - helpRequestAssistance - A function that generates suggested help request texts.
 * - HelpRequestAssistanceInput - The input type for the helpRequestAssistance function.
 * - HelpRequestAssistanceOutput - The return type for the helpRequestAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HelpRequestAssistanceInputSchema = z.object({
  requestType: z
    .string()
    .describe('The type of help requested (e.g., groceries, errands, etc.)'),
  additionalDetails: z
    .string()
    .describe('Any additional details or context for the help request.'),
});
export type HelpRequestAssistanceInput = z.infer<
  typeof HelpRequestAssistanceInputSchema
>;

const HelpRequestAssistanceOutputSchema = z.object({
  suggestedRequestText: z
    .string()
    .describe('The AI-generated suggested text for the help request.'),
});
export type HelpRequestAssistanceOutput = z.infer<
  typeof HelpRequestAssistanceOutputSchema
>;

export async function helpRequestAssistance(
  input: HelpRequestAssistanceInput
): Promise<HelpRequestAssistanceOutput> {
  return helpRequestAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'helpRequestAssistancePrompt',
  input: {schema: HelpRequestAssistanceInputSchema},
  output: {schema: HelpRequestAssistanceOutputSchema},
  prompt: `You are an AI assistant helping users draft effective help requests for their community.

  Based on the type of help requested and any additional details provided, generate a clear and concise request for assistance.

  Type of Help Requested: {{{requestType}}}
  Additional Details: {{{additionalDetails}}}

  Suggested Request Text:`, // The prompt should request for suggested request text
});

const helpRequestAssistanceFlow = ai.defineFlow(
  {
    name: 'helpRequestAssistanceFlow',
    inputSchema: HelpRequestAssistanceInputSchema,
    outputSchema: HelpRequestAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
