'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Temporary stubs until GlobalErrorBoundary is exported from @hive/ui
interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
  [key: string]: any;
}

function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return <>{children}</>;
}

function useGlobalErrorBoundary() {
  return {
    trackError: (error: any, context?: Record<string, unknown>) => console.error('Error tracked:', error, context),
    getAnalytics: () => ({}),
    reset: () => {}
  };
}

interface ErrorProviderContext {
  reportError: (error: any, _context?: Record<string, unknown>) => void;
  getErrorAnalytics: () => Record<string, unknown>;
  resetErrorState: () => void;
  isOnline: boolean;
  campusInfo?: {
    id: string;
    name: string;
    networkQuality: 'excellent' | 'good' | 'fair' | 'poor';
  };
}

const ErrorContext = createContext<ErrorProviderContext | null>(null);

interface ErrorProviderProps {
  children: React.ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  // Temporarily remove auth dependency to fix SSG issues
  const user: { id: string; fullName?: string; email?: string; isAdmin?: boolean } | null = null;
  const { trackError, getAnalytics, reset } = useGlobalErrorBoundary();
  const [isOnline, setIsOnline] = useState(true);
  const [campusInfo, setCampusInfo] = useState<ErrorProviderContext['campusInfo']>();

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Detect campus network information
  useEffect(() => {
    async function detectCampusInfo() {
      try {
        // This would integrate with your campus detection API
        const response = await fetch('/api/campus/detect', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        if (response.ok) {
          const info = await response.json() as ErrorProviderContext['campusInfo'];
          setCampusInfo(info);
        }
      } catch (error) {
        console.warn('Failed to detect campus info:', error);
      }
    }

    detectCampusInfo();
  }, []);

  // Global error handlers
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      trackError(new Error(event.reason), {
        type: 'unhandled-promise-rejection',
        user,
        campus: campusInfo,
        isOnline,
      });
    };

    // Handle global JavaScript errors
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global JavaScript error:', event.error);
      trackError(event.error, {
        type: 'global-js-error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        user,
        campus: campusInfo,
        isOnline,
      });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleGlobalError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleGlobalError);
    };
  }, [trackError, user, campusInfo, isOnline]);

  const contextValue: ErrorProviderContext = {
    reportError: (error: any, context?: Record<string, unknown>) => {
      trackError(error, {
        ...context,
        user,
        campus: campusInfo,
        isOnline,
        timestamp: new Date().toISOString(),
      });
    },
    getErrorAnalytics: getAnalytics,
    resetErrorState: reset,
    isOnline,
    campusInfo,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      <GlobalErrorBoundary
        enableAnalytics={true}
        enableAutoRecovery={true}
        maxRetryAttempts={3}
        context={{
          user: user ? {
            id: (user as any).id,
            name: (user as any).displayName || undefined,
            email: (user as any).email || undefined,
            isAdmin: (user as any).isAdmin || false,
          } : undefined,
          campus: campusInfo ? {
            id: campusInfo.id,
            name: campusInfo.name,
          } : undefined,
          session: {
            startTime: new Date(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          },
        }}
      >
        {children}
      </GlobalErrorBoundary>
    </ErrorContext.Provider>
  );
}

export function useErrorHandler() {
  const context = useContext(ErrorContext);
  if (!context) {
    // During SSR or when context is not available, provide a safe fallback
    if (typeof window === 'undefined') {
      // SSR fallback - provide minimal error handler state
      return {
        reportError: () => {},
        getErrorAnalytics: () => ({}),
        resetErrorState: () => {},
        isOnline: true,
        campusInfo: undefined,
      };
    }
    throw new Error('useErrorHandler must be used within an ErrorProvider');
  }
  return context;
}

// HOC for components that need error handling
export function withErrorHandling<P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  componentName?: string
) {
  const WrappedComponent = (props: P) => {
    const { reportError } = useErrorHandler();

    // Create an error boundary specifically for this component
    const ComponentErrorBoundary = ({ children }: { children: React.ReactNode }) => {
      const [hasError, setHasError] = useState(false);

      const handleError = (error: any) => {
        setHasError(true);
        reportError(error, {
          component: componentName || Component.displayName || Component.name,
          props: Object.keys(props).length < 10 ? props : 'Props too large to log',
        });
      };

      const handleRetry = () => {
        setHasError(false);
      };

      if (hasError) {
        return (
          <div className="p-4 border border-hive-border-default/20 rounded-lg bg-hive-background-secondary/10">
            <div className="text-center space-y-3">
              <div className="text-2xl">⚠️</div>
              <div className="text-sm text-hive-text-secondary">
                Something went wrong with this component
              </div>
              <button
                onClick={handleRetry}
                className="px-3 py-1 text-xs bg-[var(--hive-brand-primary)] text-hive-text-primary rounded hover:bg-[var(--hive-brand-primary)]/90"
              >
                Try Again
              </button>
            </div>
          </div>
        );
      }

      try {
        return <>{children}</>;
      } catch (error) {
        handleError(error as Error);
        return null;
      }
    };

    return (
      <ComponentErrorBoundary>
        <Component {...props} />
      </ComponentErrorBoundary>
    );
  };

  WrappedComponent.displayName = `withErrorHandling(${componentName || Component.displayName || Component.name})`;

  return WrappedComponent;
}

export default ErrorProvider;
