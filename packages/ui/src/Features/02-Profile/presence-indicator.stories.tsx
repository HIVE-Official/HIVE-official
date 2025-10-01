import type { Meta, StoryObj } from '@storybook/react';
import { PresenceIndicator } from '../../atomic/atoms/presence-indicator';

/**
 * PresenceIndicator component from HIVE design system
 *
 * HIVE Design System Story
 * All UI/UX built in Storybook first
 */

// REQUIRED: Meta configuration following HIVE standards
const meta = {
  title: '02-Profile/Presence Indicator',
  component: PresenceIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PresenceIndicator component from HIVE design system. Built with HIVE design system standards: CVA variants, mobile-first sizing (44px minimum touch targets), HIVE CSS variables, React.forwardRef pattern.',
      },
    },
  },
  tags: ['autodocs'], // REQUIRED: Enables automatic prop documentation
  argTypes: {
    variant: {
      control: 'select',
      description: 'Visual variant of the component',
    },
    size: {
      control: 'select',
      description: 'Size variant (all sizes are mobile-friendly with 44px+ touch targets)',
    },
  },
} satisfies Meta<typeof PresenceIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

// REQUIRED: Default story showing base component
export const Default: Story = {
  args: {
    children: 'Default PresenceIndicator',
  },
};

// REQUIRED: Show all variants if component has variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <PresenceIndicator variant="default">Default</PresenceIndicator>
      <PresenceIndicator variant="secondary">Secondary</PresenceIndicator>
      <PresenceIndicator variant="outline">Outline</PresenceIndicator>
      <PresenceIndicator variant="ghost">Ghost</PresenceIndicator>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available variants following HIVE design system.',
      },
    },
  },
};

// REQUIRED: Show all sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <PresenceIndicator size="sm">Small</PresenceIndicator>
      <PresenceIndicator size="default">Default</PresenceIndicator>
      <PresenceIndicator size="lg">Large</PresenceIndicator>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size variants. All sizes maintain 44px+ minimum for mobile touch targets.',
      },
    },
  },
};

// REQUIRED: Interactive states (hover, focus, disabled)
export const States: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <PresenceIndicator>Default</PresenceIndicator>
      <PresenceIndicator className="hover:opacity-80">Hover State</PresenceIndicator>
      <PresenceIndicator disabled>Disabled</PresenceIndicator>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive states. Focus states use HIVE brand primary color for consistency.',
      },
    },
  },
};

// RECOMMENDED: Responsive examples
export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <PresenceIndicator className="w-full">Full Width</PresenceIndicator>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Component behavior on mobile viewports. HIVE components are mobile-first by design.',
      },
    },
  },
};

// RECOMMENDED: Dark theme demonstration (default for HIVE)
export const DarkTheme: Story = {
  args: {
    children: 'Dark Theme (HIVE Default)',
  },
  parameters: {
    backgrounds: {
      default: 'hive-dark',
    },
    docs: {
      description: {
        story: 'Component in dark theme (HIVE default). Uses CSS variables for consistent theming.',
      },
    },
  },
};
