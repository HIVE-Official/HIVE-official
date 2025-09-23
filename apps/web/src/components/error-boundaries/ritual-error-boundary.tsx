"use client";

import React, { Component, ReactNode } from 'react';
import { Alert, AlertDescription } from '@hive/ui';
import { Button } from '@hive/ui';
import { RefreshCw, AlertTriangle, Sparkles } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  ritualName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId: string;
  retryCount: number;
}

export class RitualErrorBoundary extends Component<Props, State> {
  private maxRetries = 2; // Fewer retries for rituals since they're less critical

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorId: this.generateErrorId(),
      retryCount: 0
    };
  }

  private generateErrorId(): string {
    return `ritual_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `ritual_error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      retryCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Ritual Error Boundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      ritualName: this.props.ritualName,
      timestamp: new Date().toISOString()
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report ritual-specific errors
    if (process.env.NODE_ENV === 'production') {
      this.reportError(error, errorInfo);
    }
  }

  private reportError(error: Error, errorInfo: React.ErrorInfo) {
    try {
      fetch('/api/errors/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          errorId: this.state.errorId,
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          ritualName: this.props.ritualName,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          type: 'ritual_error_boundary'
        })
      }).catch(reportError => {
        console.error('Failed to report ritual error:', reportError);
      });
    } catch (reportError) {
      console.error('Ritual error reporting failed:', reportError);
    }
  }

  private handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorId: this.generateErrorId(),
        retryCount: prevState.retryCount + 1
      }));
    }
  };

  private handleHideRitual = () => {
    // Hide this ritual and continue without it
    this.setState({
      hasError: false,
      error: undefined,
      errorId: this.generateErrorId(),
      retryCount: 0
    });

    // In a real implementation, this would hide the specific ritual
    // For now, we'll just reset the error state
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Minimalist error state for rituals (less disruptive)
      return (
        <div className="p-4 border border-orange-500/30 bg-orange-500/10 rounded-lg">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0" />

            <div className="flex-1">
              <h4 className="text-sm font-medium text-orange-300">
                {this.props.ritualName ? `${this.props.ritualName} Unavailable` : 'Ritual Unavailable'}
              </h4>
              <p className="text-xs text-orange-400/70 mt-1">
                This ritual couldn't load properly. You can try again or continue without it.
              </p>
            </div>

            <div className="flex space-x-2">
              {this.state.retryCount < this.maxRetries && (
                <Button
                  onClick={this.handleRetry}
                  size="sm"
                  variant="outline"
                  className="border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                >
                  <RefreshCw className="h-3 w-3" />
                </Button>
              )}

              <Button
                onClick={this.handleHideRitual}
                size="sm"
                variant="ghost"
                className="text-orange-400/70 hover:text-orange-400"
              >
                <span className="text-xs">Skip</span>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lightweight fallback component for ritual strips
export function RitualStripFallback({ message = "Rituals temporarily unavailable" }: { message?: string }) {
  return (
    <div className="bg-hive-surface border-b border-hive-border">
      <div className="max-w-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center space-x-3 py-4 text-hive-text-secondary">
          <Sparkles className="h-5 w-5 text-hive-text-secondary/50" />
          <span className="text-sm">{message}</span>
        </div>
      </div>
    </div>
  );
}