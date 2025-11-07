'use client';

import * as React from 'react';
import { useActiveRituals } from '@/hooks/use-active-rituals';
import { RitualFeedBannerCard } from '@hive/ui';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface RitualFeedIntegrationProps {
  /** Max number of ritual banners to show in feed */
  maxBanners?: number;
  /** Position in feed: 'top' (before posts) or 'sticky' (fixed at top) */
  position?: 'top' | 'sticky';
}

/**
 * Ritual Feed Integration
 *
 * Automatically fetches and displays active ritual banners in the feed
 * Polls every 30 seconds for real-time updates
 * Supports dismiss/snooze functionality
 */
export function RitualFeedIntegration({
  maxBanners = 1,
  position = 'top',
}: RitualFeedIntegrationProps) {
  const router = useRouter();
  const { rituals, isLoading } = useActiveRituals({
    enabled: true,
    pollInterval: 30000, // 30 seconds
  });

  const [dismissedIds, setDismissedIds] = React.useState<Set<string>>(() => {
    // Load dismissed IDs from sessionStorage
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('dismissed-rituals');
      return new Set(stored ? JSON.parse(stored) : []);
    }
    return new Set();
  });

  // Save dismissed IDs to sessionStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dismissed-rituals', JSON.stringify(Array.from(dismissedIds)));
    }
  }, [dismissedIds]);

  const handleDismiss = React.useCallback((ritualId: string) => {
    setDismissedIds(prev => new Set(prev).add(ritualId));
  }, []);

  const handleAction = React.useCallback((href: string) => {
    router.push(href);
  }, [router]);

  // Filter out dismissed rituals and limit to maxBanners
  const visibleRituals = React.useMemo(() => {
    return rituals
      .filter(ritual => !dismissedIds.has(ritual.id))
      .slice(0, maxBanners);
  }, [rituals, dismissedIds, maxBanners]);

  if (isLoading || visibleRituals.length === 0) {
    return null;
  }

  const containerClasses = position === 'sticky'
    ? 'sticky top-0 z-30 bg-[var(--hive-background-primary)] pb-4'
    : 'mb-6';

  return (
    <div className={containerClasses} role="region" aria-label="Active campus rituals">
      <div className="space-y-4">
        {visibleRituals.map(ritual => (
          <div key={ritual.id} id={`ritual-banner-${ritual.id}`} className="relative">
            <RitualFeedBannerCard
              banner={ritual}
              onAction={handleAction}
            />

            {/* Dismiss Button */}
            <button
              onClick={() => handleDismiss(ritual.id)}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/60 backdrop-blur-sm transition-colors hover:bg-black/70 hover:text-white"
              aria-label="Dismiss ritual banner"
              aria-controls={`ritual-banner-${ritual.id}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
