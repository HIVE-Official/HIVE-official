import type { Meta, StoryObj } from '@storybook/react';
import { ProfileIdentityWidget } from '../../atomic/organisms/profile-identity-widget';

/**
 * ProfileIdentityWidget component from HIVE design system
 *
 * HIVE Design System Story
 * All UI/UX built in Storybook first
 */

// REQUIRED: Meta configuration following HIVE standards
const meta = {
  title: '02-Profile/Profile Identity Widget',
  component: ProfileIdentityWidget,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ProfileIdentityWidget component from HIVE design system. Built with HIVE design system standards: CVA variants, mobile-first sizing (44px minimum touch targets), HIVE CSS variables, React.forwardRef pattern.',
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
} satisfies Meta<typeof ProfileIdentityWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

// REQUIRED: Default story showing base component
export const Default: Story = {
  args: {
    children: 'Default ProfileIdentityWidget',
  },
};

// REQUIRED: Show all variants if component has variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <ProfileIdentityWidget variant="default">Default</ProfileIdentityWidget>
      <ProfileIdentityWidget variant="secondary">Secondary</ProfileIdentityWidget>
      <ProfileIdentityWidget variant="outline">Outline</ProfileIdentityWidget>
      <ProfileIdentityWidget variant="ghost">Ghost</ProfileIdentityWidget>
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
      <ProfileIdentityWidget size="sm">Small</ProfileIdentityWidget>
      <ProfileIdentityWidget size="default">Default</ProfileIdentityWidget>
      <ProfileIdentityWidget size="lg">Large</ProfileIdentityWidget>
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
      <ProfileIdentityWidget>Default</ProfileIdentityWidget>
      <ProfileIdentityWidget className="hover:opacity-80">Hover State</ProfileIdentityWidget>
      <ProfileIdentityWidget disabled>Disabled</ProfileIdentityWidget>
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
      <ProfileIdentityWidget className="w-full">Full Width</ProfileIdentityWidget>
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
