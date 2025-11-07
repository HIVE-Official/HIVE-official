'use client';

import * as React from 'react';
import { RitualsPageLayout, type RitualsPageLayoutProps } from '@hive/ui';
import { toFeedBanner, type RitualUnion } from '@hive/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { secureApiFetch } from '@/lib/secure-auth-utils';

export default function RitualsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [rituals, setRituals] = React.useState<RitualsPageLayoutProps['rituals']>([]);
  const [featured, setFeatured] = React.useState<RitualsPageLayoutProps['featuredRitual']>(undefined);
  const [featuredBanner, setFeaturedBanner] = React.useState<ReturnType<typeof toFeedBanner> | undefined>(undefined);
  const [loading, setLoading] = React.useState(true);

  const loadRituals = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await secureApiFetch('/api/rituals?format=raw');
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const ritualsRaw: RitualUnion[] = Array.isArray(data?.data) ? data.data : [];

      const list = ritualsRaw.map<RitualsPageLayoutProps['rituals'][number]>((ritual) => {
        const durationMinutes = Math.max(
          1,
          Math.round(
            (new Date(ritual.endsAt).getTime() - new Date(ritual.startsAt).getTime()) /
              (1000 * 60),
          ),
        );
        return {
          id: ritual.id,
          name: ritual.title,
          description: ritual.description ?? '',
          icon: ritual.presentation?.icon,
          progress: Math.round(ritual.metrics?.completionRate ?? 0),
          participantCount: ritual.metrics?.participants ?? 0,
          duration: `${durationMinutes} min`,
          startDate: ritual.startsAt,
          endDate: ritual.endsAt,
          frequency: ritual.archetype,
          isParticipating: Boolean(ritual.metrics?.participants && ritual.metrics.participants > 0),
          isCompleted: ritual.phase === 'ended',
          status:
            ritual.phase === 'active'
              ? 'active'
              : ritual.phase === 'announced'
                ? 'upcoming'
                : 'completed',
        };
      });

      setRituals(list);

      const activeRitual = ritualsRaw.find((ritual) => ritual.phase === 'active');
      if (activeRitual) {
        setFeaturedBanner(toFeedBanner(activeRitual));
        const match = list.find((item) => item.id === activeRitual.id);
        if (match) setFeatured(match);
      } else {
        setFeaturedBanner(undefined);
        setFeatured(list[0]);
      }
    } catch {
      setRituals([]);
      setFeaturedBanner(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadRituals();
  }, [loadRituals]);

  const onJoin = async (ritualId: string) => {
    try {
      const res = await secureApiFetch('/api/rituals/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ritualId }),
      });
      if (res.ok) void loadRituals();
    } catch {}
  };

  const onView = (ritualId: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('focus', ritualId);
    router.push(url.pathname + '?' + url.searchParams.toString());
  };

  const defaultTab = (params.get('tab') as any) || 'active';

  return (
    <RitualsPageLayout
      rituals={rituals}
      featuredRitual={featured}
      featuredRitualBanner={featuredBanner}
      onBannerAction={(href) => router.push(href)}
      onRitualJoin={onJoin}
      onRitualView={onView}
      defaultTab={defaultTab}
      isLoading={loading}
    />
  );
}
