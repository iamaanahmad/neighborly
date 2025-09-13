'use server';

import { helpRequestAssistance } from '@/ai/flows/help-request-assistance';
import { z } from 'zod';

const suggestionSchema = z.object({
  requestType: z.string(),
  additionalDetails: z.string(),
});

export async function getHelpRequestSuggestion(formData: FormData) {
  const validatedFields = suggestionSchema.safeParse({
    requestType: formData.get('requestType'),
    additionalDetails: formData.get('additionalDetails'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid input.',
      suggestion: null,
    };
  }

  try {
    const result = await helpRequestAssistance(validatedFields.data);
    return {
      error: null,
      suggestion: result.suggestedRequestText,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to get AI suggestion. Please try again.',
      suggestion: null,
    };
  }
}
