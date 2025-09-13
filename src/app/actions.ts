'use server';

import { helpRequestAssistance } from '@/ai/flows/help-request-assistance';
import { chatSuggestion, ChatSuggestionInput } from '@/ai/flows/chat-suggestion';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
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

const requestSchema = z.object({
  requestType: z.string().min(1, 'Please select a request type.'),
  details: z.string().min(10, 'Details must be at least 10 characters.'),
  userId: z.string(),
});

export async function createHelpRequest(values: z.infer<typeof requestSchema>) {
    const validatedFields = requestSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid fields."
        };
    }

    const { requestType, details, userId } = validatedFields.data;

    try {
        await addDoc(collection(db, 'requests'), {
            userId,
            type: requestType,
            description: details,
            status: 'open',
            createdAt: serverTimestamp(),
        });

    } catch (error) {
        console.error(error);
        return {
            error: "Failed to create request. Please try again."
        }
    }

    return {
        error: null,
    }
}


export async function getChatSuggestions(input: ChatSuggestionInput) {
  try {
    const result = await chatSuggestion(input);
    return {
      error: null,
      suggestions: result.suggestions,
    };
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to get AI suggestions.',
      suggestions: [],
    };
  }
}
