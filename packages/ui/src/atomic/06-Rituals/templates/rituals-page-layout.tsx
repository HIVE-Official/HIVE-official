'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { RitualCard } from '../organisms/ritual-card';
import { RitualFeedBannerCard, type RitualFeedBannerCardProps } from '../organisms/ritual-feed-banner';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../00-Global/atoms/tabs';
import { Sparkles, Calendar, CheckCircle2 } from 'lucide-react';

export interface RitualData {
  id: string;
  name: string;
  description: string;
  icon?: string;
  progress: number;
  participantCount: number;
  duration: string;
  startDate?: string;
  endDate?: string;
  frequency: string;
  isParticipating: boolean;
  isCompleted?: boolean;
  status: 'active' | 'upcoming' | 'completed';
}

export interface RitualsPageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  rituals: RitualData[];
  featuredRitual?: RitualData;
  featuredRitualBanner?: RitualFeedBannerCardProps['banner'];
  onRitualJoin?: (ritualId: string) => void;
  onRitualView?: (ritualId: string) => void;
  onBannerAction?: (href: string) => void;
  defaultTab?: 'active' | 'upcoming' | 'completed';
  isLoading?: boolean;
}

/**
 * RitualsPageLayout
 *
 * Complete rituals page with:
 * - Tab filters (Active, Upcoming, Completed)
 * - Featured ritual banner
 * - Grid of ritual cards
 * - Empty states per tab
 */
export const RitualsPageLayout = React.forwardRef<HTMLDivElement, RitualsPageLayoutProps>(
  (
    {
      rituals,
      featuredRitual,
      featuredRitualBanner,
      onRitualJoin,
      onRitualView,
      onBannerAction,
      defaultTab = 'active',
      isLoading = false,
      className,
      ...props
    },
    ref
  ) => {
    const [activeTab, setActiveTab] = React.useState(defaultTab);

    const filteredRituals = React.useMemo(() => {
      return rituals.filter((r) => r.status === activeTab);
    }, [rituals, activeTab]);

    const renderEmptyState = (tab: string) => {
      const emptyStates = {
        active: {
          icon: Sparkles,
          title: 'No active rituals',
          description: 'Check back soon for new campus-wide challenges',
        },
        upcoming: {
          icon: Calendar,
          title: 'No upcoming rituals',
          description: 'New rituals are added regularly',
        },
        completed: {
          icon: CheckCircle2,
          title: 'No completed rituals yet',
          description: 'Join a ritual to start building habits',
        },
      };

      const state = emptyStates[tab as keyof typeof emptyStates];
      const Icon = state.icon;

      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--hive-background-tertiary)]">
            <Icon className="h-8 w-8 text-[var(--hive-text-tertiary)]" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[var(--hive-text-primary)]">
            {state.title}
          </h3>
          <p className="text-sm text-[var(--hive-text-tertiary)]">
            {state.description}
          </p>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn('min-h-screen bg-[var(--hive-background-primary)]', className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 py-8" role="main" aria-labelledby="rituals-title">
          {/* Header */}
          <div className="mb-8">
            <h1 id="rituals-title" className="mb-2 text-3xl font-bold text-[var(--hive-text-primary)]">
              Campus Rituals
            </h1>
            <p className="text-[var(--hive-text-secondary)]">
              Build better habits together. Join campus-wide behavioral campaigns.
            </p>
          </div>

          {/* Featured Ritual */}
          {activeTab === 'active' && (
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--hive-brand-primary)]" />
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]">
                  Featured
                </span>
              </div>
              {featuredRitualBanner ? (
                <RitualFeedBannerCard banner={featuredRitualBanner} onAction={onBannerAction} />
              ) : featuredRitual ? (
                <RitualCard
                  ritual={featuredRitual}
                  variant="featured"
                  onJoin={() => onRitualJoin?.(featuredRitual.id)}
                  onViewDetails={() => onRitualView?.(featuredRitual.id)}
                  className="max-w-md"
                />
              ) : null}
            </div>
          )}

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="mb-6" aria-label="Ritual filters">
              <TabsTrigger value="active">
                Active
                {rituals.filter((r) => r.status === 'active').length > 0 && (
                  <span className="ml-2 rounded-full bg-[var(--hive-background-tertiary)] px-2 py-0.5 text-xs">
                    {rituals.filter((r) => r.status === 'active').length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="upcoming">
                Upcoming
                {rituals.filter((r) => r.status === 'upcoming').length > 0 && (
                  <span className="ml-2 rounded-full bg-[var(--hive-background-tertiary)] px-2 py-0.5 text-xs">
                    {rituals.filter((r) => r.status === 'upcoming').length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completed
                {rituals.filter((r) => r.status === 'completed').length > 0 && (
                  <span className="ml-2 rounded-full bg-[var(--hive-background-tertiary)} px-2 py-0.5 text-xs">
                    {rituals.filter((r) => r.status === 'completed').length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" aria-label="Active rituals">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse rounded-2xl bg-[var(--hive-background-secondary)]"
                    />
                  ))}
                </div>
              ) : filteredRituals.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                  {filteredRituals.map((ritual) => (
                    <RitualCard
                      key={ritual.id}
                      role="listitem"
                      ritual={ritual}
                      onJoin={() => onRitualJoin?.(ritual.id)}
                      onViewDetails={() => onRitualView?.(ritual.id)}
                    />
                  ))}
                </div>
              ) : (
                renderEmptyState('active')
              )}
            </TabsContent>

            <TabsContent value="upcoming" aria-label="Upcoming rituals">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse rounded-2xl bg-[var(--hive-background-secondary)]"
                    />
                  ))}
                </div>
              ) : filteredRituals.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                  {filteredRituals.map((ritual) => (
                    <RitualCard
                      key={ritual.id}
                      role="listitem"
                      ritual={ritual}
                      onJoin={() => onRitualJoin?.(ritual.id)}
                      onViewDetails={() => onRitualView?.(ritual.id)}
                    />
                  ))}
                </div>
              ) : (
                renderEmptyState('upcoming')
              )}
            </TabsContent>

            <TabsContent value="completed" aria-label="Completed rituals">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-80 animate-pulse rounded-2xl bg-[var(--hive-background-secondary)]"
                    />
                  ))}
                </div>
              ) : filteredRituals.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
                  {filteredRituals.map((ritual) => (
                    <RitualCard
                      key={ritual.id}
                      role="listitem"
                      ritual={ritual}
                      onViewDetails={() => onRitualView?.(ritual.id)}
                    />
                  ))}
                </div>
              ) : (
                renderEmptyState('completed')
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
);

RitualsPageLayout.displayName = 'RitualsPageLayout';
