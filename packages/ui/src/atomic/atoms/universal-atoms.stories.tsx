import type { Meta, StoryObj } from '@storybook/react';
import { UniversalButton } from './universal-atoms';

/**
 * UniversalButton component from HIVE design system
 *
 * HIVE Design System Story
 * All UI/UX built in Storybook first
 */

// REQUIRED: Meta configuration following HIVE standards
const meta = {
  title: 'Atoms/UniversalButton',
  component: UniversalButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'UniversalButton component from HIVE design system. Built with HIVE design system standards: CVA variants, mobile-first sizing (44px minimum touch targets), HIVE CSS variables, React.forwardRef pattern.',
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
} satisfies Meta<typeof UniversalButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// REQUIRED: Default story showing base component
export const Default: Story = {
  args: {
    children: 'Default UniversalButton',
  },
};

// REQUIRED: Show all variants if component has variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <UniversalButton variant="default">Default</UniversalButton>
      <UniversalButton variant="secondary">Secondary</UniversalButton>
      <UniversalButton variant="outline">Outline</UniversalButton>
      <UniversalButton variant="ghost">Ghost</UniversalButton>
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
      <UniversalButton size="sm">Small</UniversalButton>
      <UniversalButton size="default">Default</UniversalButton>
      <UniversalButton size="lg">Large</UniversalButton>
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
      <UniversalButton>Default</UniversalButton>
      <UniversalButton className="hover:opacity-80">Hover State</UniversalButton>
      <UniversalButton disabled>Disabled</UniversalButton>
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
      <UniversalButton className="w-full">Full Width</UniversalButton>
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
