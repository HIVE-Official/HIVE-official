'use client'

import { 
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { logger  } from '@/types/core';

// Magic link authentication
export function useSendMagicLink() {
  return useMutation({
    mutationFn: async ({ 
      email, 
      schoolId,
      redirectUrl 
    }: { 
      email: string; 
      schoolId?: string;
      redirectUrl?: string;
    }) => {
      // Call your API endpoint to send magic link
      const payload: any = { email };
      if (schoolId && schoolId !== 'undefined') {
        payload.schoolId = schoolId;
      }
      if (redirectUrl) {
        payload.redirectUrl = redirectUrl;
      }
      
      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Failed to send magic link');
      }
      
      return response.json();
    },
    onError: (error: Error) => {
      logger.error('Failed to send magic link', { 
        message: error.message,
        stack: error.stack 
      });
    }
  });
}

export function useVerifyMagicLink() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ token }: { token: string }) => {
      // Call your API endpoint to verify magic link
      const response = await fetch('/api/auth/verify-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Invalid or expired link');
      }
      
      const { customToken, user } = await response.json();
      
      // For now, just return the user data
      // Firebase auth will be handled separately
      return { user };
    },
    onSuccess: ({ user }) => {
      // Update auth state in cache
      queryClient.setQueryData(['auth', 'user'], user);
      logger.info('Magic link verified successfully', { userId: user.id });
    },
    onError: (error) => {
      logger.error('Failed to verify magic link', { error });
    }
  });
}