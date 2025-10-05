"use client";

import React from 'react';
import { AlertTriangle, RefreshCw, Wrench, Plus, Home } from 'lucide-react';
import { Button, Card } from "@hive/ui";
import { ErrorBoundary } from '../error-boundary';

interface ToolsErrorFallbackProps {
  error?: any;
  retry: () => void;
  errorId?: string;
}

function ToolsErrorFallback({ error, retry, errorId }: ToolsErrorFallbackProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Card className="p-8 bg-hive-surface border-hive-border text-center">
        <div className="w-16 h-16 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </div>

        <h2 className="text-xl font-bold text-hive-text-primary mb-3">
          HiveLab Tools Offline
        </h2>
        <p className="text-hive-text-secondary mb-2">
          The tool builder is temporarily unavailable. Your projects are safe and saved.
        </p>
        <p className="text-hive-text-tertiary text-sm mb-6">
          Check back soon - we're working to restore full functionality.
        </p>

        {errorId && (
          <div className="mb-4 p-3 bg-hive-surface-elevated border border-hive-border rounded-lg">
            <p className="text-xs text-hive-text-tertiary mb-1">Error ID:</p>
            <code className="text-xs text-hive-text-secondary font-mono">{errorId}</code>
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            onClick={retry}
            className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Tools
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/feed'}
            className="border-hive-border text-hive-text-secondary"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Feed
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/tools'}
            className="border-hive-border text-hive-text-secondary"
          >
            <Wrench className="w-4 h-4 mr-2" />
            My Tools
          </Button>
        </div>

        {/* Project safety assurance */}
        <div className="mt-6 pt-4 border-t border-hive-border">
          <p className="text-xs text-hive-text-tertiary">
            All your tool projects are automatically saved. No work will be lost.
          </p>
        </div>
      </Card>
    </div>
  );
}

interface ToolsErrorBoundaryProps {
  children: React.ReactNode;
  toolId?: string;
  context?: 'list' | 'edit' | 'run' | 'create' | 'preview' | 'deploy';
}

export function ToolsErrorBoundary({
  children,
  toolId,
  context = 'list'
}: ToolsErrorBoundaryProps) {
  const contextualSettings = {
    list: { maxRetries: 4, enableRecovery: true },
    edit: { maxRetries: 2, enableRecovery: false }, // Don't auto-retry during editing
    run: { maxRetries: 3, enableRecovery: true },
    create: { maxRetries: 2, enableRecovery: false },
    preview: { maxRetries: 3, enableRecovery: true },
    deploy: { maxRetries: 1, enableRecovery: false } // Critical operation
  };

  const settings = contextualSettings[context];

  return (
    <ErrorBoundary
      context={`tools_${context}${toolId ? `_${toolId}` : ''}`}
      enableRecovery={settings.enableRecovery}
      maxRetries={settings.maxRetries}
      fallback={ToolsErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
}