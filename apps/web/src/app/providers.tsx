"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@hive/auth-logic";
import { ToastProvider, DevModePanel, MotionProvider } from "@hive/ui";
import { WelcomeMatProvider } from "@/components/welcome-mat-provider";
import { setupGlobalErrorHandling } from '@hive/analytics';
// import { analytics, logger } from '@hive/analytics';
// import { logger } from '@hive/core';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  useEffect(() => {
    // Set up global error handling and inject analytics into the logger
    setupGlobalErrorHandling();
    // TODO: Temporarily disabled due to module resolution issue
    // logger.setAnalyticsProvider(analytics);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <MotionProvider>
          <AuthProvider>
            <ToastProvider>
              <>
                <WelcomeMatProvider>
                  {children}
                </WelcomeMatProvider>
                <DevModePanel />
              </>
            </ToastProvider>
          </AuthProvider>
        </MotionProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
