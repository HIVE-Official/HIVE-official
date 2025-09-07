"use client";

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { queryClient } from '@hive/hooks';
import { ShellProvider } from "@hive/ui";
import { ModalProvider } from '../components/ui/modal-system';
import ErrorProvider from '../components/error-provider';
import { AuthErrorBoundary } from '../components/auth/auth-error-boundary';
import { DevBypassAuthProvider } from '../components/auth/dev-bypass-provider';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <ModalProvider>
          <AuthErrorBoundary>
            <DevBypassAuthProvider>
              <ShellProvider>
                {children}
                {process.env.NODE_ENV === 'development' && (
                  <ReactQueryDevtools 
                    initialIsOpen={false} 
                    position="bottom-left"
                    panelProps={{
                      style: {
                        zIndex: 999999,
                      }
                    }}
                  />
                )}
              </ShellProvider>
            </DevBypassAuthProvider>
          </AuthErrorBoundary>
        </ModalProvider>
      </ErrorProvider>
    </QueryClientProvider>
  );
} 