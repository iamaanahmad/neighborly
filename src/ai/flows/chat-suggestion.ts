'use server';

/**
 * @fileOverview A flow to generate helpful chat reply suggestions for volunteers.
 *
 * - chatSuggestion - A function that generates suggested chat replies.
 * - ChatSuggestionInput - The input type for the chatSuggestion function.
 * - ChatSuggestionOutput - The return type for the chatSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatSuggestionInputSchema = z.object({
  history: z
    .array(z.object({
        role: z.enum(['user', 'model']),
        content: z.array(z.object({
            text: z.string(),
        }))
    }))
    .describe('The recent conversation history.'),
});
export type ChatSuggestionInput = z.infer<typeof ChatSuggestionInputSchema>;

const ChatSuggestionOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of 2-3 concise and helpful reply suggestions.'),
});
export type ChatSuggestionOutput = z.infer<typeof ChatSuggestionOutputSchema>;

export async function chatSuggestion(
  input: ChatSuggestionInput
): Promise<ChatSuggestionOutput> {
  return chatSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatSuggestionPrompt',
  input: {schema: ChatSuggestionInputSchema},
  output: {schema: ChatSuggestionOutputSchema},
  prompt: `You are an AI assistant for "Neighborly", a community help app. Your role is to help volunteers (Helpers) respond to people asking for help (Seekers).

Based on the provided conversation history, generate 2-3 very short, concise, and helpful reply suggestions for the Helper. The suggestions should be encouraging, clear, and action-oriented.

Do not suggest anything that makes promises you cannot keep. Keep the tone friendly and supportive.

Examples of good suggestions:
- "I can help with that!"
- "What time works best for you?"
- "I'm on my way."
- "Glad I could help!"
- "Yes, that's correct."

Conversation History:
{{#each history}}
  {{#if (eq role 'user')}}Seeker: {{content.0.text}}{{/if}}
  {{#if (eq role 'model')}}Helper: {{content.0.text}}{{/if}}
{{/each}}
`,
});

const chatSuggestionFlow = ai.defineFlow(
  {
    name: 'chatSuggestionFlow',
    inputSchema: ChatSuggestionInputSchema,
    outputSchema: ChatSuggestionOutputSchema,
  },
  async input => {
    // The Gemini API requires that the history alternates between user and model.
    // Let's ensure the last message is from the 'user' (Seeker).
    // If the last message is from the 'model' (Helper), we can't generate a reply.
    const lastMessage = input.history[input.history.length - 1];
    if (lastMessage && lastMessage.role === 'model') {
        return { suggestions: [] };
    }

    const {output} = await prompt(input);
    return output!;
  }
);
