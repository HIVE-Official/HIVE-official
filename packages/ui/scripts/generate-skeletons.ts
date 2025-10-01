/**
 * Skeleton Component Generator
 *
 * Generates all missing skeleton components with comprehensive stories
 * for Storybook review and UI/UX decision making
 */

import fs from 'fs';
import path from 'path';

interface ComponentSpec {
  name: string;
  type: 'atom' | 'molecule' | 'organism' | 'template';
  feature: string;
  description: string;
  props: string[];
  states: string[];
  variants?: string[];
}

const components: ComponentSpec[] = [
  // ===== FEED COMPONENTS (Remaining) =====
  {
    name: 'feed-comment',
    type: 'molecule',
    feature: '04-Feed',
    description: 'Single comment display with author, content, and actions',
    props: ['authorName', 'authorAvatar', 'content', 'timestamp', 'likeCount', 'isLiked'],
    states: ['default', 'liked', 'loading'],
  },
  {
    name: 'feed-comment-thread',
    type: 'molecule',
    feature: '04-Feed',
    description: 'Nested comment thread with replies',
    props: ['comments', 'maxDepth', 'onLoadMore'],
    states: ['default', 'loading', 'empty'],
  },
  {
    name: 'feed-search-bar',
    type: 'molecule',
    feature: '04-Feed',
    description: 'Search bar with filters and suggestions',
    props: ['placeholder', 'onSearch', 'filters', 'suggestions'],
    states: ['default', 'focused', 'with-results', 'loading'],
  },
  {
    name: 'feed-post-full',
    type: 'organism',
    feature: '04-Feed',
    description: 'Complete post with expanded comments and interactions',
    props: ['post', 'comments', 'onComment', 'onShare', 'onEdit', 'onDelete'],
    states: ['default', 'editing', 'loading'],
  },
  {
    name: 'feed-filters',
    type: 'organism',
    feature: '04-Feed',
    description: 'Filter controls for feed (Following/All, spaces, content type)',
    props: ['activeFilter', 'spaces', 'contentTypes', 'onFilterChange'],
    states: ['default', 'loading'],
  },
  {
    name: 'feed-empty-state',
    type: 'organism',
    feature: '04-Feed',
    description: 'Empty state when no posts available',
    props: ['message', 'actionText', 'onAction'],
    states: ['default'],
  },
  {
    name: 'feed-skeleton-loader',
    type: 'organism',
    feature: '04-Feed',
    description: 'Loading skeleton for feed',
    props: ['count'],
    states: ['default'],
  },

  // ===== SPACES COMPONENTS =====
  {
    name: 'space-card',
    type: 'molecule',
    feature: '03-Spaces',
    description: 'Space card for browse/discovery views',
    props: ['name', 'description', 'coverImage', 'memberCount', 'isJoined', 'isPrivate', 'category'],
    states: ['default', 'joined', 'hover', 'loading'],
    variants: ['default', 'featured', 'compact'],
  },
  {
    name: 'space-badge',
    type: 'atom',
    feature: '03-Spaces',
    description: 'Badge for space category, privacy, etc',
    props: ['type', 'label'],
    states: ['default'],
    variants: ['category', 'privacy', 'member-count'],
  },
  {
    name: 'space-member-card',
    type: 'molecule',
    feature: '03-Spaces',
    description: 'Member card in space member list',
    props: ['name', 'avatar', 'role', 'joinDate'],
    states: ['default', 'hover'],
  },
  {
    name: 'space-event-card',
    type: 'molecule',
    feature: '03-Spaces',
    description: 'Event card in space events',
    props: ['title', 'date', 'time', 'location', 'rsvpCount'],
    states: ['default', 'rsvped'],
  },
  {
    name: 'space-header',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Space header with cover, name, join button, etc',
    props: ['name', 'description', 'coverImage', 'icon', 'memberCount', 'isJoined', 'isLeader', 'isPrivate'],
    states: ['default', 'member-view', 'leader-view', 'loading'],
  },
  {
    name: 'space-post-feed',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Post feed within a space',
    props: ['posts', 'hasComposer', 'onPost', 'onLoadMore'],
    states: ['default', 'loading', 'empty'],
  },
  {
    name: 'space-sidebar',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Space sidebar with about, members, events',
    props: ['about', 'members', 'events', 'resources'],
    states: ['default', 'loading'],
  },
  {
    name: 'space-creation-modal',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Multi-step modal for creating a space',
    props: ['currentStep', 'onNext', 'onBack', 'onSubmit'],
    states: ['step-1', 'step-2', 'step-3', 'submitting'],
  },
  {
    name: 'space-settings-modal',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Space settings modal with tabs',
    props: ['activeTab', 'space', 'onSave'],
    states: ['default', 'saving'],
  },
  {
    name: 'space-member-list',
    type: 'organism',
    feature: '03-Spaces',
    description: 'List of space members with filters',
    props: ['members', 'onFilter', 'onSearch', 'isLeader'],
    states: ['default', 'loading', 'empty'],
  },
  {
    name: 'space-discovery-hub',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Space discovery with featured, trending, recommendations',
    props: ['featured', 'trending', 'recommended'],
    states: ['default', 'loading'],
  },
  {
    name: 'space-about-section',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Full about section for space',
    props: ['description', 'created', 'creator', 'category', 'tags', 'rules'],
    states: ['default'],
  },
  {
    name: 'space-events-panel',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Events panel for space',
    props: ['events', 'canCreate'],
    states: ['default', 'empty'],
  },
  {
    name: 'space-members-panel',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Members panel for space',
    props: ['members', 'total'],
    states: ['default', 'loading'],
  },
  {
    name: 'space-resources-panel',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Resources/links panel for space',
    props: ['resources', 'links'],
    states: ['default', 'empty'],
  },
  {
    name: 'space-leader-toolbar',
    type: 'organism',
    feature: '03-Spaces',
    description: 'Quick actions toolbar for space leaders',
    props: ['spaceId', 'actions'],
    states: ['default'],
  },

  // ===== RITUALS COMPONENTS =====
  {
    name: 'ritual-card',
    type: 'molecule',
    feature: '06-Rituals',
    description: 'Ritual card for browse view',
    props: ['name', 'icon', 'description', 'duration', 'participants', 'progress', 'reward', 'isJoined'],
    states: ['default', 'joined', 'completed', 'upcoming'],
  },
  {
    name: 'ritual-progress-tracker',
    type: 'molecule',
    feature: '06-Rituals',
    description: 'Visual progress tracker for ritual',
    props: ['dailyGoals', 'weeklyProgress', 'completion'],
    states: ['default'],
  },
  {
    name: 'ritual-streak-counter',
    type: 'molecule',
    feature: '06-Rituals',
    description: 'Streak counter with calendar',
    props: ['currentStreak', 'longestStreak', 'checkIns'],
    states: ['default'],
  },
  {
    name: 'ritual-reward-display',
    type: 'molecule',
    feature: '06-Rituals',
    description: 'Display ritual reward',
    props: ['icon', 'description', 'points', 'isEarned'],
    states: ['locked', 'earned'],
  },
  {
    name: 'ritual-check-in-button',
    type: 'molecule',
    feature: '06-Rituals',
    description: 'Check-in button with states',
    props: ['isCheckedIn', 'onCheckIn'],
    states: ['ready', 'checking-in', 'success', 'already-checked-in'],
  },
  {
    name: 'ritual-participation-ui',
    type: 'organism',
    feature: '06-Rituals',
    description: 'Complete participation interface',
    props: ['ritual', 'progress', 'streak', 'points', 'leaderboardPosition'],
    states: ['default', 'checked-in', 'loading'],
  },
  {
    name: 'ritual-leaderboard',
    type: 'organism',
    feature: '06-Rituals',
    description: 'Ritual leaderboard with rankings',
    props: ['rankings', 'userPosition', 'filter', 'timePeriod'],
    states: ['default', 'loading'],
  },
  {
    name: 'ritual-creation-modal',
    type: 'organism',
    feature: '06-Rituals',
    description: 'Create ritual modal',
    props: ['onSubmit'],
    states: ['default', 'submitting'],
  },

  // ===== PROFILE COMPONENTS =====
  {
    name: 'profile-stat-card',
    type: 'molecule',
    feature: '02-Profile',
    description: 'Single stat display card',
    props: ['icon', 'value', 'label', 'onClick'],
    states: ['default', 'clickable'],
  },
  {
    name: 'profile-bio-editor',
    type: 'molecule',
    feature: '02-Profile',
    description: 'Editable bio field',
    props: ['bio', 'maxLength', 'onSave'],
    states: ['viewing', 'editing'],
  },
  {
    name: 'profile-social-links',
    type: 'molecule',
    feature: '02-Profile',
    description: 'Social media links display',
    props: ['links', 'isEditable'],
    states: ['default', 'editing'],
  },
  {
    name: 'profile-header',
    type: 'organism',
    feature: '02-Profile',
    description: 'Complete profile header',
    props: ['user', 'coverPhoto', 'isOwnProfile', 'isConnected', 'stats'],
    states: ['own-profile', 'other-user', 'connected-user', 'loading'],
  },
  {
    name: 'profile-edit-form',
    type: 'organism',
    feature: '02-Profile',
    description: 'Profile edit form',
    props: ['user', 'onSave', 'onCancel'],
    states: ['default', 'saving', 'unsaved-changes'],
  },
  {
    name: 'profile-connections-list',
    type: 'organism',
    feature: '02-Profile',
    description: 'List of user connections',
    props: ['connections', 'onSearch', 'onFilter'],
    states: ['default', 'loading', 'empty'],
  },
  {
    name: 'profile-activity-timeline',
    type: 'organism',
    feature: '02-Profile',
    description: 'Activity timeline',
    props: ['activities', 'onLoadMore'],
    states: ['default', 'loading', 'empty'],
  },
  {
    name: 'profile-stats-dashboard',
    type: 'organism',
    feature: '02-Profile',
    description: 'Detailed stats dashboard',
    props: ['stats', 'timePeriod'],
    states: ['default', 'loading'],
  },
  {
    name: 'profile-calendar-view',
    type: 'organism',
    feature: '02-Profile',
    description: 'Calendar with events and check-ins',
    props: ['events', 'checkIns', 'month'],
    states: ['month-view', 'week-view'],
  },
  {
    name: 'profile-tools-widget',
    type: 'organism',
    feature: '02-Profile',
    description: 'User tools widget',
    props: ['tools', 'canCreate'],
    states: ['default', 'empty'],
  },

  // ===== ONBOARDING COMPONENTS =====
  {
    name: 'onboarding-step-indicator',
    type: 'molecule',
    feature: '01-Onboarding',
    description: 'Progress indicator for onboarding',
    props: ['currentStep', 'totalSteps', 'completedSteps'],
    states: ['default'],
  },
  {
    name: 'onboarding-email-verification',
    type: 'molecule',
    feature: '01-Onboarding',
    description: 'Email verification step',
    props: ['email', 'onVerify', 'onResend'],
    states: ['default', 'verifying', 'success', 'error'],
  },
  {
    name: 'onboarding-wizard',
    type: 'organism',
    feature: '01-Onboarding',
    description: 'Multi-step onboarding wizard',
    props: ['currentStep', 'onNext', 'onBack', 'onSkip', 'onComplete'],
    states: ['step-1', 'step-2', 'step-3', 'step-4', 'step-5', 'step-6', 'step-7'],
  },
  {
    name: 'onboarding-profile-setup',
    type: 'organism',
    feature: '01-Onboarding',
    description: 'Profile setup step',
    props: ['onSave'],
    states: ['default', 'saving'],
  },
  {
    name: 'onboarding-connection-suggestions',
    type: 'organism',
    feature: '01-Onboarding',
    description: 'Connection suggestions step',
    props: ['suggestions', 'onConnect', 'onSkip'],
    states: ['default', 'loading', 'empty'],
  },
  {
    name: 'onboarding-space-recommendations',
    type: 'organism',
    feature: '01-Onboarding',
    description: 'Space recommendations step',
    props: ['recommendations', 'onJoin', 'onSkip'],
    states: ['default', 'loading', 'empty'],
  },

  // ===== HIVELAB COMPONENTS =====
  {
    name: 'tool-builder-canvas',
    type: 'organism',
    feature: '05-HiveLab',
    description: 'Drag-drop canvas for tool builder',
    props: ['elements', 'selectedElement', 'onElementAdd', 'onElementSelect'],
    states: ['default', 'dragging'],
  },
  {
    name: 'tool-builder-palette',
    type: 'organism',
    feature: '05-HiveLab',
    description: 'Element palette sidebar',
    props: ['elementTypes', 'onDragStart'],
    states: ['default'],
  },
  {
    name: 'tool-builder-properties',
    type: 'organism',
    feature: '05-HiveLab',
    description: 'Properties panel for selected element',
    props: ['element', 'onUpdate'],
    states: ['default', 'no-selection'],
  },
  {
    name: 'tool-runtime-executor',
    type: 'organism',
    feature: '05-HiveLab',
    description: 'Tool runtime execution interface',
    props: ['tool', 'onRun'],
    states: ['ready', 'running', 'success', 'error'],
  },
  {
    name: 'tool-browse-grid',
    type: 'organism',
    feature: '05-HiveLab',
    description: 'Grid of browsable tools',
    props: ['tools', 'onInstall', 'onRun'],
    states: ['default', 'loading', 'empty'],
  },
];

// Template for component
const generateComponent = (spec: ComponentSpec): string => {
  const propsInterface = spec.props.map(prop => `  ${prop}?: any;`).join('\n');

  return `'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/**
 * SKELETON COMPONENT - UI/UX TO BE DETERMINED
 *
 * ${spec.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
 *
 * ${spec.description}
 */

const ${spec.name.replace(/-/g, '')}Variants = cva(
  'relative w-full border rounded-lg p-4 bg-[var(--hive-surface-primary)]',
  {
    variants: {
      variant: {
        default: 'border-[var(--hive-border-default)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ${spec.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${spec.name.replace(/-/g, '')}Variants> {
${propsInterface}
  isLoading?: boolean;
  error?: string;
}

export const ${spec.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')} = React.forwardRef<
  HTMLDivElement,
  ${spec.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}Props
>(
  (
    {
      className,
      variant,
      isLoading = false,
      error,
      ...props
    },
    ref
  ) => {
    if (isLoading) {
      return (
        <div
          ref={ref}
          className={cn(${spec.name.replace(/-/g, '')}Variants({ variant }), className)}
          {...props}
        >
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-[var(--hive-surface-secondary)] rounded" />
            <div className="h-4 bg-[var(--hive-surface-secondary)] rounded w-3/4" />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          ref={ref}
          className={cn(${spec.name.replace(/-/g, '')}Variants({ variant }), 'border-[var(--hive-error)]', className)}
          {...props}
        >
          <p className="text-[var(--hive-error)]">Error: {error}</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(${spec.name.replace(/-/g, '')}Variants({ variant }), className)}
        {...props}
      >
        <div className="text-center py-8">
          <p className="text-2xl mb-2">🎨</p>
          <p className="text-[var(--hive-text-primary)] font-semibold mb-1">
            ${spec.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </p>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
            ${spec.description}
          </p>
          <div className="p-2 bg-[var(--hive-surface-tertiary)] rounded text-xs text-[var(--hive-text-tertiary)]">
            ⚠️ SKELETON: UI/UX to be designed in Storybook review
          </div>
        </div>
      </div>
    );
  }
);

${spec.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}.displayName = '${spec.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}';
`;
};

// Template for story
const generateStory = (spec: ComponentSpec): string => {
  const componentName = spec.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');

  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${componentName} } from './${spec.name}';

const meta = {
  title: '${spec.feature}/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**SKELETON COMPONENT** - ${spec.description}. ' +
          'UI/UX design to be finalized during Storybook review.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    error: 'Failed to load component',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Default</h3>
        <${componentName} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Loading</h3>
        <${componentName} isLoading={true} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Error</h3>
        <${componentName} error="Error message" />
      </div>
    </div>
  ),
};
`;
};

// Generate all components
console.log(`Generating ${components.length} skeleton components...`);

components.forEach((spec) => {
  const basePath = path.join(__dirname, '..', 'src', 'atomic', `${spec.type}s`);

  // Ensure directory exists
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  // Generate component
  const componentPath = path.join(basePath, `${spec.name}.tsx`);
  const componentContent = generateComponent(spec);
  fs.writeFileSync(componentPath, componentContent);
  console.log(`✓ Created ${spec.name}.tsx`);

  // Generate story
  const storyPath = path.join(basePath, `${spec.name}.stories.tsx`);
  const storyContent = generateStory(spec);
  fs.writeFileSync(storyPath, storyContent);
  console.log(`✓ Created ${spec.name}.stories.tsx`);
});

console.log(`\n✅ Generated ${components.length * 2} files (${components.length} components + ${components.length} stories)`);
console.log('\nNext steps:');
console.log('1. Update index.ts exports');
console.log('2. Run: pnpm storybook');
console.log('3. Review all components in Storybook');
console.log('4. Decide on UI/UX for each component');
