"use client";

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { Card, CardContent } from "@hive/ui";

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ProfileErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Profile Error Boundary caught an error:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent 
          error={this.state.error!} 
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-hive-background-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-hive-surface-elevated border-hive-border-subtle">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-hive-text-primary mb-2">
            Something went wrong
          </h2>
          <p className="text-hive-text-secondary mb-4">
            We encountered an error while loading your profile. This has been logged and we'll look into it.
          </p>
          <Button 
            onClick={resetErrorBoundary}
            className="w-full bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="text-sm text-hive-text-secondary cursor-pointer">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs bg-hive-background-primary p-2 rounded overflow-auto text-red-400">
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export { ProfileErrorBoundary, type ErrorFallbackProps };