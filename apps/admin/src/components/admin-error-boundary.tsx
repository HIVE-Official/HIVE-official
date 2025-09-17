"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HiveCard as Card, CardContent, CardHeader, CardTitle, HiveButton as Button } from "@hive/ui";
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { logger } from '@hive/core';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Admin Dashboard Error:', {
      error: error.toString(),
      errorInfo: errorInfo.componentStack,
    });
    
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full border-red-900 bg-gray-900/50">
            <CardHeader className="border-b border-red-900">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <CardTitle className="text-xl text-white">
                  Admin Dashboard Error
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                <p className="text-red-400 font-semibold mb-2">
                  Something went wrong in the admin dashboard
                </p>
                {this.state.error && (
                  <p className="text-sm text-gray-400 font-mono">
                    {this.state.error.toString()}
                  </p>
                )}
              </div>

              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="cursor-pointer">
                  <summary className="text-sm text-gray-500 hover:text-gray-300">
                    View error details (Development only)
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-800 rounded text-xs text-gray-400 overflow-auto max-h-64">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={this.handleReset}
                  variant="default"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Home className="h-4 w-4" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}