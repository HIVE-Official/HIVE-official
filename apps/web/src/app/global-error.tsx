'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log detailed error information
    console.error('Global error caught:', {
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
    } catch (e) {
      // Ignore any errors in error logging
    }
  }, [error]);

  const handleReset = () => {
    try {
      reset();
    } catch (error) {
      // If reset fails, log the error and reload the page
      console.error('Failed to reset error boundary:', error);
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    // Use window.location for hard navigation
    window.location.href = '/';
  };

  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <div className="rounded-lg border border-gray-700 bg-gray-900 p-8 shadow-lg">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="rounded-full bg-red-900/20 p-3">
                  <div className="h-6 w-6 text-red-400">⚠️</div>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Something went wrong!
                  </h1>
                  <p className="text-gray-400">
                    We encountered an error while loading the page.
                    Please try again or return to the home page.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    🔄 Try Again
                  </button>
                  <button
                    onClick={handleGoHome}
                    className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    🏠 Go Home
                  </button>
                </div>

                {/* Show error details in development */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 rounded border border-gray-600 bg-gray-800 p-4 text-left text-sm text-gray-300">
                    <p className="font-mono">{error.name}: {error.message}</p>
                    {error.digest && (
                      <p className="mt-2 font-mono text-xs">
                        Digest: {error.digest}
                      </p>
                    )}
                  </div>
                )}

                <p className="text-sm text-gray-400">
                  Need help? Contact{' '}
                  <a
                    href="mailto:support@thehiveuni.com"
                    className="text-yellow-400 hover:underline"
                  >
                    support@thehiveuni.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
} 