"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import { FirebaseAuthProvider } from "../../../../packages/ui/src/contexts/unified-auth-context";
import { ShellProvider } from "../../../../packages/ui/src/components/shell/shell-provider";
import { ModalProvider } from '../components/ui/modal-system';
import ErrorProvider from '../components/error-provider';
import { AuthErrorBoundary } from '../components/auth/auth-error-boundary';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <ModalProvider>
          <AuthErrorBoundary>
            <FirebaseAuthProvider>
              <ShellProvider>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
              </ShellProvider>
            </FirebaseAuthProvider>
          </AuthErrorBoundary>
        </ModalProvider>
      </ErrorProvider>
    </QueryClientProvider>
  );
} 