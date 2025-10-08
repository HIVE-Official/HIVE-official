"use client";

import React from 'react';
import { AlertTriangle, RefreshCw, Users, Plus, Search } from 'lucide-react';
import { Button, Card } from "@hive/ui";
import { ErrorBoundary } from '../error-boundary';

interface SpacesErrorFallbackProps {
  error?: any;
  retry: () => void;
  errorId?: string;
}

function SpacesErrorFallback({ error, retry, errorId }: SpacesErrorFallbackProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Card className="p-8 bg-hive-surface border-hive-border text-center">
        <div className="w-16 h-16 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </div>

        <h2 className="text-xl font-bold text-hive-text-primary mb-3">
          Space Explorer Offline
        </h2>
        <p className="text-hive-text-secondary mb-2">
          We can't load the spaces right now, but your communities are still there waiting for you.
        </p>
        <p className="text-hive-text-tertiary text-sm mb-6">
          Try again in a moment or navigate to a specific space if you know its URL.
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
            Retry Spaces
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/feed'}
            className="border-hive-border text-hive-text-secondary"
          >
            <Users className="w-4 h-4 mr-2" />
            Check Feed
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/spaces/create'}
            className="border-hive-border text-hive-text-secondary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Space
          </Button>
        </div>

        {/* Behavioral continuity - spaces are core to panic-to-relief */}
        <div className="mt-6 pt-4 border-t border-hive-border">
          <p className="text-xs text-hive-text-tertiary mb-3">
            Looking for a specific community? Try these options while we fix the issue:
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              variant="outline"
              className="max-w-sm border-hive-border text-hive-text-tertiary"
              onClick={() => window.location.href = '/spaces/search'}
            >
              <Search className="w-3 h-3 mr-1" />
              Search Spaces
            </Button>
            <Button
              variant="outline"
              className="max-w-sm border-hive-border text-hive-text-tertiary"
              onClick={() => window.location.href = '/spaces/browse'}
            >
              <Users className="w-3 h-3 mr-1" />
              Browse All
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

interface SpacesErrorBoundaryProps {
  children: React.ReactNode;
  spaceId?: string; // For individual space errors
  context?: 'directory' | 'individual' | 'create' | 'search';
}

export function SpacesErrorBoundary({
  children,
  spaceId,
  context = 'directory'
}: SpacesErrorBoundaryProps) {
  const contextualSettings = {
    directory: { maxRetries: 5, enableRecovery: true },
    individual: { maxRetries: 3, enableRecovery: true },
    create: { maxRetries: 2, enableRecovery: false },
    search: { maxRetries: 4, enableRecovery: true }
  };

  const settings = contextualSettings[context];

  return (
    <ErrorBoundary
      context={`spaces_${context}${spaceId ? `_${spaceId}` : ''}`}
      enableRecovery={settings.enableRecovery}
      maxRetries={settings.maxRetries}
      fallback={SpacesErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
}
