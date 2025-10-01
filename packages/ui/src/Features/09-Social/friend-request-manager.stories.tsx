import type { Meta, StoryObj } from '@storybook/react';
import { FriendRequestManager } from '../../atomic/molecules/friend-request-manager';

/**
 * FriendRequestManager component from HIVE design system
 *
 * HIVE Design System Story
 * All UI/UX built in Storybook first
 */

// REQUIRED: Meta configuration following HIVE standards
const meta = {
  title: '09-Social/Friend Request Manager',
  component: FriendRequestManager,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'FriendRequestManager component from HIVE design system. Built with HIVE design system standards: CVA variants, mobile-first sizing (44px minimum touch targets), HIVE CSS variables, React.forwardRef pattern.',
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
} satisfies Meta<typeof FriendRequestManager>;

export default meta;
type Story = StoryObj<typeof meta>;

// REQUIRED: Default story showing base component
export const Default: Story = {
  args: {
    children: 'Default FriendRequestManager',
  },
};

// REQUIRED: Show all variants if component has variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <FriendRequestManager variant="default">Default</FriendRequestManager>
      <FriendRequestManager variant="secondary">Secondary</FriendRequestManager>
      <FriendRequestManager variant="outline">Outline</FriendRequestManager>
      <FriendRequestManager variant="ghost">Ghost</FriendRequestManager>
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
      <FriendRequestManager size="sm">Small</FriendRequestManager>
      <FriendRequestManager size="default">Default</FriendRequestManager>
      <FriendRequestManager size="lg">Large</FriendRequestManager>
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
      <FriendRequestManager>Default</FriendRequestManager>
      <FriendRequestManager className="hover:opacity-80">Hover State</FriendRequestManager>
      <FriendRequestManager disabled>Disabled</FriendRequestManager>
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
      <FriendRequestManager className="w-full">Full Width</FriendRequestManager>
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
