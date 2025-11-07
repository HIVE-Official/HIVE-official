"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import ErrorProvider from '../components/error-provider';
import createFirebaseAuthIntegration from '../lib/firebase-auth-integration';
import { SimpleAuthProvider } from '../components/auth/simple-auth-provider';
import { ToastProvider } from '@/hooks/use-toast';
import { logger } from '@/lib/structured-logger';

// Load Devtools only in development and on the client
const ReactQueryDevtools = dynamic(
  () => import('@tanstack/react-query-devtools').then(m => m.ReactQueryDevtools),
  { ssr: false }
);

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
        logger.warn('Firebase auth integration failed to initialize', error as Error, { component: 'providers' });
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
          <ToastProvider>
            {children}
            {process.env.NODE_ENV !== 'production' ? (
              <ReactQueryDevtools initialIsOpen={false} />
            ) : null}
          </ToastProvider>
        </SimpleAuthProvider>
      </ErrorProvider>
    </QueryClientProvider>
  );
}
