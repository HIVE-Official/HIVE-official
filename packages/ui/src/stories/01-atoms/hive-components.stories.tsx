import type { Meta, StoryObj } from '@storybook/react';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';

const meta: Meta = {
  title: '01-Atoms/HIVE Components',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# HIVE Atomic Components

Core atomic components that form the foundation of the HIVE design system.

## Components

- **HiveButton**: Primary interaction element with multiple variants
- **HiveCard**: Container component for content organization
- **HiveBadge**: Status and notification indicators

## Design Principles

- Consistent semantic token usage
- Mobile-first responsive design
- Accessibility-first approach
- HIVE brand integration with gold accents
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const ButtonVariants: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Button Variants
        </h3>
        <div className="flex flex-wrap gap-4">
          <HiveButton variant="primary">Primary</HiveButton>
          <HiveButton variant="secondary">Secondary</HiveButton>
          <HiveButton variant="outline">Outline</HiveButton>
          <HiveButton variant="ghost">Ghost</HiveButton>
          <HiveButton variant="destructive">Destructive</HiveButton>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Button Sizes
        </h3>
        <div className="flex items-center gap-4">
          <HiveButton size="sm">Small</HiveButton>
          <HiveButton size="md">Medium</HiveButton>
          <HiveButton size="lg">Large</HiveButton>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Button States
        </h3>
        <div className="flex flex-wrap gap-4">
          <HiveButton>Normal</HiveButton>
          <HiveButton loading>Loading</HiveButton>
          <HiveButton disabled>Disabled</HiveButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different button variants, sizes, and states available in the HIVE design system.',
      },
    },
  },
};

export const CardShowcase: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Card Variants
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HiveCard>
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
              Default Card
            </h4>
            <p className="text-[var(--hive-text-secondary)]">
              This is a default card with standard styling.
            </p>
          </HiveCard>

          <HiveCard variant="elevated">
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
              Elevated Card
            </h4>
            <p className="text-[var(--hive-text-secondary)]">
              This card has enhanced shadow and elevation.
            </p>
          </HiveCard>

          <HiveCard variant="outline">
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
              Outline Card
            </h4>
            <p className="text-[var(--hive-text-secondary)]">
              This card uses border styling instead of background.
            </p>
          </HiveCard>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Interactive Card
        </h3>
        <div className="max-w-md">
          <HiveCard interactive>
            <h4 className="font-semibold text-[var(--hive-text-primary)] mb-2">
              Clickable Card
            </h4>
            <p className="text-[var(--hive-text-secondary)] mb-4">
              This card responds to hover and click interactions.
            </p>
            <HiveButton size="sm">Action</HiveButton>
          </HiveCard>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different card variants and interactive states.',
      },
    },
  },
};

export const BadgeShowcase: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Badge Variants
        </h3>
        <div className="flex flex-wrap gap-4">
          <HiveBadge variant="default">Default</HiveBadge>
          <HiveBadge variant="primary">Primary</HiveBadge>
          <HiveBadge variant="secondary">Secondary</HiveBadge>
          <HiveBadge variant="success">Success</HiveBadge>
          <HiveBadge variant="warning">Warning</HiveBadge>
          <HiveBadge variant="error">Error</HiveBadge>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Badge Sizes
        </h3>
        <div className="flex items-center gap-4">
          <HiveBadge size="sm">Small</HiveBadge>
          <HiveBadge size="md">Medium</HiveBadge>
          <HiveBadge size="lg">Large</HiveBadge>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-6 text-[var(--hive-text-primary)]">
          Usage Examples
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[var(--hive-text-primary)]">Notifications</span>
            <HiveBadge variant="error">3</HiveBadge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--hive-text-primary)]">Status</span>
            <HiveBadge variant="success">Online</HiveBadge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--hive-text-primary)]">New Feature</span>
            <HiveBadge variant="primary">NEW</HiveBadge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge components for status indicators and notifications.',
      },
    },
  },
};