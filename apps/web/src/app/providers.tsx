"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import { UnifiedAuthProvider, ShellProvider } from "@hive/ui";
import { ModalProvider } from '../components/ui/modal-system';
import ErrorProvider from '../components/error-provider';
import createFirebaseAuthIntegration from '../lib/firebase-auth-integration';

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

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <ModalProvider>
          <UnifiedAuthProvider firebaseIntegration={firebaseIntegration}>
            <ShellProvider>
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
            </ShellProvider>
          </UnifiedAuthProvider>
        </ModalProvider>
      </ErrorProvider>
    </QueryClientProvider>
  );
} 