import type { Meta, StoryObj } from '@storybook/react';
import { CompleteHIVEToolsSystem } from '../../atomic/organisms/complete-hive-tools-system';

/**
 * CompleteHIVEToolsSystem component from HIVE design system
 *
 * HIVE Design System Story
 * All UI/UX built in Storybook first
 */

// REQUIRED: Meta configuration following HIVE standards
const meta = {
  title: '05-HiveLab/Complete Hive Tools System',
  component: CompleteHIVEToolsSystem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'CompleteHIVEToolsSystem component from HIVE design system. Built with HIVE design system standards: CVA variants, mobile-first sizing (44px minimum touch targets), HIVE CSS variables, React.forwardRef pattern.',
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
} satisfies Meta<typeof CompleteHIVEToolsSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

// REQUIRED: Default story showing base component
export const Default: Story = {
  args: {
    children: 'Default CompleteHIVEToolsSystem',
  },
};

// REQUIRED: Show all variants if component has variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <CompleteHIVEToolsSystem variant="default">Default</CompleteHIVEToolsSystem>
      <CompleteHIVEToolsSystem variant="secondary">Secondary</CompleteHIVEToolsSystem>
      <CompleteHIVEToolsSystem variant="outline">Outline</CompleteHIVEToolsSystem>
      <CompleteHIVEToolsSystem variant="ghost">Ghost</CompleteHIVEToolsSystem>
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
      <CompleteHIVEToolsSystem size="sm">Small</CompleteHIVEToolsSystem>
      <CompleteHIVEToolsSystem size="default">Default</CompleteHIVEToolsSystem>
      <CompleteHIVEToolsSystem size="lg">Large</CompleteHIVEToolsSystem>
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
      <CompleteHIVEToolsSystem>Default</CompleteHIVEToolsSystem>
      <CompleteHIVEToolsSystem className="hover:opacity-80">Hover State</CompleteHIVEToolsSystem>
      <CompleteHIVEToolsSystem disabled>Disabled</CompleteHIVEToolsSystem>
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
      <CompleteHIVEToolsSystem className="w-full">Full Width</CompleteHIVEToolsSystem>
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
