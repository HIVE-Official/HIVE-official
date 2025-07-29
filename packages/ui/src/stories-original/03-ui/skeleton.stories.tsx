/**
 * HIVE Skeleton Loading System
 * 
 * Luxury loading states using HIVE design system:
 * - Obsidian/charcoal backgrounds with subtle pulse
 * - Campus-contextual loading patterns
 * - Glass morphism and premium animations
 */

import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { Skeleton } from '../../components/ui/skeleton';
import { HiveCard, HiveCardHeader, HiveCardContent } from '../../components';
import { User, BookOpen, Calendar, BarChart3, Users, Zap } from 'lucide-react';

const meta: Meta<typeof Skeleton> = {
  title: '03-UI/Skeleton Loading',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE luxury skeleton loading patterns for campus platform - uses obsidian backgrounds with subtle pulse animations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// HIVE Campus Profile Loading
const CampusProfileSkeleton = () => (
  <HiveCard className="w-80">
    <HiveCardHeader>
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </HiveCardHeader>
    
    <HiveCardContent className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Academic info skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      
      {/* Tool grid skeleton */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    </HiveCardContent>
  </HiveCard>
);

// HIVE Space Card Loading
const SpaceCardSkeleton = () => (
  <HiveCard className="w-80">
    <HiveCardContent className="space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
      
      <Skeleton className="h-32 w-full rounded-xl" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </HiveCardContent>
  </HiveCard>
);

// HIVE Feed Post Loading
const FeedPostSkeleton = () => (
  <HiveCard className="w-96">
    <HiveCardHeader>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
    </HiveCardHeader>
    
    <HiveCardContent className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      
      {/* Tool preview skeleton */}
      <div className="p-4 bg-[var(--hive-background-tertiary)]/60 rounded-xl border border-[var(--hive-border-subtle)]">
        <div className="flex items-center gap-3 mb-2">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-3 w-full" />
      </div>
      
      {/* Social actions skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-20 rounded-xl" />
          <Skeleton className="h-8 w-16 rounded-xl" />
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
        <Skeleton className="h-8 w-8 rounded-xl" />
      </div>
    </HiveCardContent>
  </HiveCard>
);

// HIVE Dashboard Widget Loading
const DashboardWidgetSkeleton = ({ title }: { title: string }) => (
  <HiveCard className="w-72">
    <HiveCardHeader>
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-6 rounded" />
        <div className="flex-1">
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-4 w-4 rounded" />
      </div>
    </HiveCardHeader>
    
    <HiveCardContent>
      {title === 'Calendar' ? (
        <div className="space-y-3">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-6 rounded" />
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-6 rounded" />
            ))}
          </div>
        </div>
      ) : title === 'Chart' ? (
        <div className="space-y-3">
          <div className="flex items-end gap-1 h-24">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton 
                key={i} 
                className="flex-1 rounded-t" 
                style={{ height: `${Math.random() * 60 + 20}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      )}
    </HiveCardContent>
  </HiveCard>
);

// HIVE Loading Showcase
const HIVELoadingShowcase = () => (
  <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-[var(--hive-text-primary)]">
        HIVE Campus Loading States
      </h1>
      <p className="text-[var(--hive-text-secondary)] max-w-2xl mx-auto">
        Luxury skeleton patterns for campus platform components using obsidian backgrounds and subtle pulse animations.
      </p>
    </div>
    
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Loading
        </h3>
        <CampusProfileSkeleton />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <Users className="w-5 h-5" />
          Space Loading
        </h3>
        <SpaceCardSkeleton />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Feed Post Loading
        </h3>
        <FeedPostSkeleton />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Calendar Widget
        </h3>
        <DashboardWidgetSkeleton title="Calendar" />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Chart Widget
        </h3>
        <DashboardWidgetSkeleton title="Chart" />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Tool Widget
        </h3>
        <DashboardWidgetSkeleton title="Tool" />
      </div>
    </div>
  </div>
);

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

export const Basic: Story = {
  render: () => (
    <div className="space-y-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-56" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic skeleton loading using HIVE design tokens with subtle pulse animation.',
      },
    },
  },
};

export const CampusProfile: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)]">
      <CampusProfileSkeleton />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus student profile loading state with academic info and tool grid.',
      },
    },
  },
};

export const SpaceCard: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)]">
      <SpaceCardSkeleton />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus space card loading state with preview and interaction buttons.',
      },
    },
  },
};

export const FeedPost: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)]">
      <FeedPostSkeleton />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus feed post loading state with tool preview and social actions.',
      },
    },
  },
};

export const DashboardWidgets: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <DashboardWidgetSkeleton title="Calendar" />
        <DashboardWidgetSkeleton title="Chart" />
        <DashboardWidgetSkeleton title="Tool" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Campus dashboard widget loading states for calendar, charts, and tools.',
      },
    },
  },
};

export const CompleteShowcase: Story = {
  render: () => <HIVELoadingShowcase />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete showcase of HIVE campus loading states using luxury design system.',
      },
    },
  },
};