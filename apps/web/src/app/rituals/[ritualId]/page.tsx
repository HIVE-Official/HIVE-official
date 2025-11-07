'use client';

export const dynamic = 'force-dynamic';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import type { RitualDetailView } from '@hive/core';
import { RitualDetailLayout, Button } from '@hive/ui';
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
    <RitualDetailLayout
      ritual={data}
      onPrimaryAction={handlePrimary}
      onBack={() => router.push('/rituals')}
      onTournamentVote={async (matchupId, choice) => {
        try {
          const res = await secureApiFetch(`/api/rituals/${ritualId}/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matchupId, choice }),
          });
          if (res.ok) await refetch();
        } catch {}
      }}
      onFeatureUnlock={async () => {
        try {
          const res = await secureApiFetch(`/api/rituals/${ritualId}/feature-usage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'use' }),
          });
          if (res.ok) await refetch();
        } catch {}
      }}
      onLeakReveal={async (clueId) => {
        try {
          const res = await secureApiFetch(`/api/rituals/${ritualId}/leak`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'reveal', clueId }),
          });
          if (res.ok) await refetch();
        } catch {}
      }}
      onLotteryEnter={async () => {
        try {
          const res = await secureApiFetch(`/api/rituals/${ritualId}/lottery`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'enter' }),
          });
          if (res.ok) await refetch();
        } catch {}
      }}
      onUnlockContribute={async () => {
        try {
          const res = await secureApiFetch(`/api/rituals/${ritualId}/unlock`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'contribute', value: 1 }),
          });
          if (res.ok) await refetch();
        } catch {}
      }}
      onSurvivalVote={async (matchupId, competitorId) => {
        try {
          const res = await secureApiFetch(`/api/rituals/${ritualId}/survival/vote`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matchupId, competitorId }),
          });
          if (res.ok) await refetch();
        } catch {}
      }}
    />
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
