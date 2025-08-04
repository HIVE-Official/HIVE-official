"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';
import { UnifiedAuthProvider, ShellProvider } from "@hive/ui";

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
      <UnifiedAuthProvider>
        <ShellProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ShellProvider>
      </UnifiedAuthProvider>
    </QueryClientProvider>
  );
} 