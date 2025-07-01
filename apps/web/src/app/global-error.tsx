'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@hive/ui';
import { useAnalytics } from '@hive/analytics';
import { logger } from '@hive/core';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { trackError } = useAnalytics();

  useEffect(() => {
    // Track the error in analytics
    trackError(error, 'global', 'high');
  }, [error, trackError]);

  const handleReset = () => {
    try {
      reset();
    } catch (error) {
      // If reset fails, log the error and reload the page
      logger.error('Failed to reset error boundary:', error);
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    // Use window.location for hard navigation
    window.location.href = '/welcome';
  };

  return (
    <html>
      <body>
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-lg border bg-card p-8 shadow-lg">
              <div className="flex flex-col items-center gap-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                >
                  <div className="rounded-full bg-destructive/10 p-3">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Something went wrong!
                  </h1>
                  <p className="text-muted-foreground">
                    We encountered an error while loading the page.
                    Please try again or return to the home page.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleGoHome}
                    className="gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Go Home
                  </Button>
                </div>

                {/* Show error details in development */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 rounded border bg-muted/50 p-4 text-left text-sm text-muted-foreground">
                    <p className="font-mono">{error.name}: {error.message}</p>
                    {error.digest && (
                      <p className="mt-2 font-mono text-xs">
                        Digest: {error.digest}
                      </p>
                    )}
                  </div>
                )}

                <p className="text-sm text-muted-foreground">
                  Need help? Contact{' '}
                  <a
                    href="mailto:support@thehiveuni.com"
                    className="text-primary hover:underline"
                  >
                    support@thehiveuni.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
} 