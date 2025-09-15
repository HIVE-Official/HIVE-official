'use client';

import { useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { motion } from 'framer-motion';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log detailed error information
    logger.error('Global error caught:', {
      name: error.name,
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      cause: error.cause
    });
    
    // Also send to external logging if possible
    try {
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: error.name,
          message: error.message,
          stack: error.stack,
          digest: error.digest,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {
        // Ignore fetch errors - we don't want to create more errors
      });
    } catch {
      // Ignore any errors in error logging
    }
  }, [error]);

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
    window.location.href = '/';
  };

  return (
    <html>
      <body style={{ margin: 0, padding: 0 }}>
        {/* Background gradients matching home page */}
        <div className="fixed inset-0 bg-[var(--hive-background-primary)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--hive-background-secondary),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--hive-background-secondary),transparent_50%)]" />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: [0.33, 0.65, 0, 1] }}
          >
            <div className="rounded-lg border border-[var(--hive-brand-secondary)]/30 bg-[var(--hive-background-secondary)] p-8 shadow-xl">
              {/* Gold accent line */}
              <div className="h-1 bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)]/50 rounded-full mb-6" />
              
              <div className="flex flex-col items-center gap-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5, ease: [0.33, 0.65, 0, 1] }}
                >
                  <div className="rounded-full bg-[var(--hive-brand-secondary)]/10 p-3">
                    <AlertTriangle className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h1 
                    className="text-2xl font-bold tracking-tight text-[var(--hive-text-inverse)]"
                    style={{
                      fontFamily: 'Space Grotesk, system-ui, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    Something went wrong!
                  </h1>
                  <p 
                    className="text-[#6B7280] leading-relaxed"
                    style={{
                      fontFamily: 'Geist Sans, system-ui, sans-serif',
                      fontWeight: 400
                    }}
                  >
                    We encountered an error while loading the page.
                    Please try again or return to the home page.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <motion.button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-[var(--hive-gray-700)] rounded-lg hover:bg-[var(--hive-background-secondary)] hover:border-[var(--hive-brand-secondary)]/50 text-[var(--hive-text-inverse)] transition-all duration-180 ease-hive focus:ring-2 focus:ring-[var(--hive-brand-secondary)] focus:ring-offset-2 focus:ring-offset-[var(--hive-background-primary)]"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      fontFamily: 'Geist Sans, system-ui, sans-serif',
                      fontWeight: 500
                    }}
                  >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </motion.button>
                  <motion.button
                    onClick={handleGoHome}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-lg hover:bg-[var(--hive-brand-secondary)]/90 transition-all duration-180 ease-hive focus:ring-2 focus:ring-[var(--hive-brand-secondary)] focus:ring-offset-2 focus:ring-offset-[var(--hive-background-primary)]"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      fontFamily: 'Geist Sans, system-ui, sans-serif',
                      fontWeight: 600
                    }}
                  >
                    <Home className="h-4 w-4" />
                    Go Home
                  </motion.button>
                </div>

                {/* Show error details in development */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 w-full rounded-lg border border-[var(--hive-gray-700)] bg-[var(--hive-background-primary)] p-4 text-left">
                    <p 
                      className="text-[#6B7280] text-sm"
                      style={{ fontFamily: 'Geist Mono, ui-monospace, monospace' }}
                    >
                      {error.name}: {error.message}
                    </p>
                    {error.digest && (
                      <p 
                        className="mt-2 text-[#6B7280] text-xs"
                        style={{ fontFamily: 'Geist Mono, ui-monospace, monospace' }}
                      >
                        Digest: {error.digest}
                      </p>
                    )}
                  </div>
                )}

                <p 
                  className="text-sm text-[#6B7280]"
                  style={{
                    fontFamily: 'Geist Sans, system-ui, sans-serif',
                    fontWeight: 400
                  }}
                >
                  Need help? Contact{' '}
                  <a
                    href="mailto:support@thehiveuni.com"
                    className="text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80 transition-colors duration-180 ease-hive"
                    style={{
                      fontFamily: 'Geist Sans, system-ui, sans-serif',
                      fontWeight: 500
                    }}
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