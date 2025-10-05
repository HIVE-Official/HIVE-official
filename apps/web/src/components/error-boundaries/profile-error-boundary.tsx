"use client";

import React from 'react';
import { AlertTriangle, RefreshCw, User, Settings, Home } from 'lucide-react';
import { Button, Card } from "@hive/ui";
import { ErrorBoundary } from '../error-boundary';

interface ProfileErrorFallbackProps {
  error?: any;
  retry: () => void;
  errorId?: string;
}

function ProfileErrorFallback({ error, retry, errorId }: ProfileErrorFallbackProps) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Card className="p-8 bg-hive-surface border-hive-border text-center">
        <div className="w-16 h-16 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </div>

        <h2 className="text-xl font-bold text-hive-text-primary mb-3">
          Profile Temporarily Unavailable
        </h2>
        <p className="text-hive-text-secondary mb-2">
          We're having trouble accessing profile data. Don't worry - your information is safe.
        </p>
        <p className="text-hive-text-tertiary text-sm mb-6">
          This usually resolves quickly. Try refreshing in a moment.
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
            Retry Profile
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
            onClick={() => window.location.href = '/settings'}
            className="border-hive-border text-hive-text-secondary"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Data safety assurance */}
        <div className="mt-6 pt-4 border-t border-hive-border">
          <p className="text-xs text-hive-text-tertiary">
            Your profile data is safely stored. This is just a temporary display issue.
          </p>
        </div>
      </Card>
    </div>
  );
}

interface ProfileErrorBoundaryProps {
  children: React.ReactNode;
  profileId?: string; // For viewing others' profiles
  context?: 'own' | 'other' | 'edit' | 'settings';
}

export function ProfileErrorBoundary({
  children,
  profileId,
  context = 'own'
}: ProfileErrorBoundaryProps) {
  const contextualSettings = {
    own: { maxRetries: 5, enableRecovery: true },
    other: { maxRetries: 3, enableRecovery: true },
    edit: { maxRetries: 2, enableRecovery: false }, // Don't auto-retry edit forms
    settings: { maxRetries: 3, enableRecovery: false }
  };

  const settings = contextualSettings[context];

  return (
    <ErrorBoundary
      context={`profile_${context}${profileId ? `_${profileId}` : ''}`}
      enableRecovery={settings.enableRecovery}
      maxRetries={settings.maxRetries}
      fallback={ProfileErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
}