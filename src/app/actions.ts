
'use server';

import { helpRequestAssistance } from '@/ai/flows/help-request-assistance';
import { chatSuggestion, ChatSuggestionInput } from '@/ai/flows/chat-suggestion';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';
import { moderateText } from '@/ai/flows/moderate-text';

const suggestionSchema = z.object({
  requestType: z.string().optional(),
  additionalDetails: z.string().optional(),
});

export async function getHelpRequestSuggestion(prevState: any, formData: FormData) {
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

  const { requestType, additionalDetails } = validatedFields.data;

  if (!requestType && !additionalDetails) {
     return {
      error: 'Please provide a request type or some details for the AI to generate a suggestion.',
      suggestion: null,
    };
  }


  try {
    const result = await helpRequestAssistance({
        requestType: requestType || '',
        additionalDetails: additionalDetails || ''
    });
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
        // Moderate the content before creating the request
        const moderationResult = await moderateText({ textToModerate: details });
        if (!moderationResult.isAppropriate) {
            return {
                error: `Your request was flagged as inappropriate and could not be posted. ${moderationResult.reason ? `Reason: ${moderationResult.reason}` : 'Please review our community guidelines.'}`
            }
        }

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
