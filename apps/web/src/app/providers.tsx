"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import ErrorProvider from '../components/error-provider';
import createFirebaseAuthIntegration from '../lib/firebase-auth-integration';
import { SimpleAuthProvider } from '../components/auth/simple-auth-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }));

  const [firebaseIntegration] = useState(() => {
    // Only create Firebase integration on client-side
    if (typeof window !== 'undefined') {
      try {
        return createFirebaseAuthIntegration();
      } catch (error) {
        console.warn('Firebase auth integration failed to initialize:', error);
        return undefined;
      }
    }
    return undefined;
  });

  // Navigation is now handled by NavigationLayout in layout.tsx

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <SimpleAuthProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </SimpleAuthProvider>
      </ErrorProvider>
    </QueryClientProvider>
  );
} 