'use client';

export const dynamic = 'force-dynamic';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import type { RitualDetailView } from '@hive/core';
import { Button } from '@hive/ui';
import { secureApiFetch } from '@/lib/secure-auth-utils';
import { useSession } from '../../../hooks/use-session';
import { ErrorBoundary } from '../../../components/error-boundary';

async function fetchRitualDetail(ritualId: string): Promise<RitualDetailView> {
  const response = await secureApiFetch(`/api/rituals/${ritualId}`);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.error ?? `Failed to load ritual (${response.status})`);
  }

  const payload = (await response.json()) as { data: RitualDetailView };
  return payload.data;
}

function LoadingState() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-12 text-white/60">
      <div className="h-8 w-40 animate-pulse rounded-full bg-white/10" />
      <div className="h-10 w-3/4 animate-pulse rounded-xl bg-white/10" />
      <div className="h-5 w-full animate-pulse rounded-xl bg-white/5" />
      <div className="h-5 w-5/6 animate-pulse rounded-xl bg-white/5" />
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-16 text-center text-white/70">
      <p>{message}</p>
      <Button variant="secondary" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

function RitualDetailPageContent() {
  const params = useParams<{ ritualId: string }>();
  const router = useRouter();
  const ritualId = params?.ritualId;

  useSession();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['ritual-detail', ritualId],
    queryFn: () => {
      if (!ritualId) {
        throw new Error('Ritual identifier missing');
      }
      return fetchRitualDetail(ritualId);
    },
    enabled: Boolean(ritualId),
    staleTime: 60_000,
    // Poll for live updates while active
    refetchInterval: (data) => (data?.status === 'active' ? 30_000 : false),
  });

  if (isLoading || !ritualId) {
    return <LoadingState />;
  }

  if (isError || !data) {
    const message = error instanceof Error ? error.message : 'Unable to load ritual';
    return <ErrorState message={message} onRetry={() => refetch()} />;
  }

  const handlePrimary = async (href: string) => {
    try {
      if (data.status === 'active') {
        const res = await secureApiFetch('/api/rituals/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ritualId }),
        });
        if (res.ok) {
          await refetch();
          return;
        }
      }
    } catch {
      // fall through to navigation
    }
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-8">
        <button
          type="button"
          className="text-sm text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
          onClick={() => router.push('/rituals')}
        >
          ← Back to rituals
        </button>
        <div className="rounded-2xl border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-6">
          <h1 className="text-2xl font-semibold">{data.title}</h1>
          {data.subtitle && (
            <p className="mt-1 text-sm text-[var(--hive-text-secondary)]">
              {data.subtitle}
            </p>
          )}
          {data.description && (
            <p className="mt-4 text-sm text-[var(--hive-text-primary)] whitespace-pre-wrap">
              {data.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RitualDetailPage() {
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorState
          message="Something went wrong while rendering this ritual."
          onRetry={resetErrorBoundary}
        />
      )}
    >
      <RitualDetailPageContent />
    </ErrorBoundary>
  );
}
