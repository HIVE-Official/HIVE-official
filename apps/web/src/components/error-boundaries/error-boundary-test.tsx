"use client";

import React, { useState } from 'react';
import { Button, Card } from "@hive/ui";
import { Bug, AlertTriangle } from 'lucide-react';
import { FeedErrorBoundary, SpacesErrorBoundary, ProfileErrorBoundary, ToolsErrorBoundary } from './';

interface ErrorTriggerProps {
  errorType: 'render' | 'async' | 'null' | 'chunk';
  context: string;
}

function ErrorTrigger({ errorType, context }: ErrorTriggerProps) {
  const [shouldError, setShouldError] = useState(false);

  const triggerError = () => {
    setShouldError(true);
  };

  if (shouldError) {
    switch (errorType) {
      case 'render':
        throw new Error(`Test render error in ${context} component`);
      case 'null':
        // @ts-ignore - intentional error for testing
        return null.something;
      case 'chunk':
        throw new Error(`ChunkLoadError: Loading chunk failed in ${context}`);
      case 'async':
        // Simulate async error
        setTimeout(() => {
          throw new Error(`Async error in ${context} component`);
        }, 100);
        break;
    }
  }

  return (
    <Card className="p-4 bg-hive-surface border-hive-border">
      <div className="flex items-center gap-3 mb-3">
        <Bug className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <h3 className="font-medium text-hive-text-primary">
          {context} Error Test
        </h3>
      </div>
      <p className="text-sm text-hive-text-secondary mb-4">
        Test error boundary for {context} context with {errorType} error type.
      </p>
      <Button
        onClick={triggerError}
        variant="outline"
        className="max-w-sm border-red-500 text-red-400 hover:bg-red-500/10"
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Trigger {errorType} Error
      </Button>
    </Card>
  );
}

/**
 * Test component for demonstrating error boundary functionality
 * Only available in development mode for testing
 */
export function ErrorBoundaryTest() {
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (!isDevelopment) {
    return null;
  }

  return (
    <div className="p-6 space-y-6">
      <Card className="p-6 bg-hive-surface border-hive-border">
        <h2 className="text-xl font-bold text-hive-text-primary mb-4">
          Error Boundary Testing (Development Only)
        </h2>
        <p className="text-hive-text-secondary mb-6">
          Test the error boundary system by triggering different types of errors
          in various contexts. Each error boundary should gracefully handle failures
          and provide appropriate recovery options.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Feed Error Boundary Tests */}
          <div className="space-y-4">
            <h3 className="font-semibold text-hive-text-primary">Feed Context</h3>
            <FeedErrorBoundary>
              <ErrorTrigger errorType="render" context="Feed" />
            </FeedErrorBoundary>
            <FeedErrorBoundary>
              <ErrorTrigger errorType="null" context="Feed" />
            </FeedErrorBoundary>
          </div>

          {/* Spaces Error Boundary Tests */}
          <div className="space-y-4">
            <h3 className="font-semibold text-hive-text-primary">Spaces Context</h3>
            <SpacesErrorBoundary context="directory">
              <ErrorTrigger errorType="chunk" context="Spaces" />
            </SpacesErrorBoundary>
            <SpacesErrorBoundary context="individual" spaceId="test-space">
              <ErrorTrigger errorType="render" context="Individual Space" />
            </SpacesErrorBoundary>
          </div>

          {/* Profile Error Boundary Tests */}
          <div className="space-y-4">
            <h3 className="font-semibold text-hive-text-primary">Profile Context</h3>
            <ProfileErrorBoundary context="own">
              <ErrorTrigger errorType="async" context="Profile" />
            </ProfileErrorBoundary>
            <ProfileErrorBoundary context="edit">
              <ErrorTrigger errorType="render" context="Profile Edit" />
            </ProfileErrorBoundary>
          </div>

          {/* Tools Error Boundary Tests */}
          <div className="space-y-4">
            <h3 className="font-semibold text-hive-text-primary">Tools Context</h3>
            <ToolsErrorBoundary context="edit" toolId="test-tool">
              <ErrorTrigger errorType="render" context="Tool Editor" />
            </ToolsErrorBoundary>
            <ToolsErrorBoundary context="deploy">
              <ErrorTrigger errorType="chunk" context="Tool Deploy" />
            </ToolsErrorBoundary>
          </div>
        </div>

        <div className="mt-6 p-4 bg-hive-surface-elevated border border-hive-border rounded-lg">
          <h4 className="font-medium text-hive-text-primary mb-2">Testing Instructions:</h4>
          <ul className="text-sm text-hive-text-secondary space-y-1">
            <li>• Click any "Trigger Error" button to test that error boundary</li>
            <li>• Each error boundary should show a contextual error message</li>
            <li>• Recovery options should be appropriate for the context</li>
            <li>• Error IDs should be generated and logged to console</li>
            <li>• Check browser console for detailed error logging</li>
            <li>• Test retry functionality where enabled</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
