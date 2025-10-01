import type { Meta, StoryObj } from '@storybook/react';
import { HiveAvatarUploadWithCrop } from './hive-avatar-upload-with-crop';

/**
 * HiveAvatarUploadWithCrop component from HIVE design system
 *
 * HIVE Design System Story
 * All UI/UX built in Storybook first
 */

// REQUIRED: Meta configuration following HIVE standards
const meta = {
  title: 'Molecules/HiveAvatarUploadWithCrop',
  component: HiveAvatarUploadWithCrop,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HiveAvatarUploadWithCrop component from HIVE design system. Built with HIVE design system standards: CVA variants, mobile-first sizing (44px minimum touch targets), HIVE CSS variables, React.forwardRef pattern.',
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
} satisfies Meta<typeof HiveAvatarUploadWithCrop>;

export default meta;
type Story = StoryObj<typeof meta>;

// REQUIRED: Default story showing base component
export const Default: Story = {
  args: {
    children: 'Default HiveAvatarUploadWithCrop',
  },
};

// REQUIRED: Show all variants if component has variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap items-center">
      <HiveAvatarUploadWithCrop variant="default">Default</HiveAvatarUploadWithCrop>
      <HiveAvatarUploadWithCrop variant="secondary">Secondary</HiveAvatarUploadWithCrop>
      <HiveAvatarUploadWithCrop variant="outline">Outline</HiveAvatarUploadWithCrop>
      <HiveAvatarUploadWithCrop variant="ghost">Ghost</HiveAvatarUploadWithCrop>
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
      <HiveAvatarUploadWithCrop size="sm">Small</HiveAvatarUploadWithCrop>
      <HiveAvatarUploadWithCrop size="default">Default</HiveAvatarUploadWithCrop>
      <HiveAvatarUploadWithCrop size="lg">Large</HiveAvatarUploadWithCrop>
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
      <HiveAvatarUploadWithCrop>Default</HiveAvatarUploadWithCrop>
      <HiveAvatarUploadWithCrop className="hover:opacity-80">Hover State</HiveAvatarUploadWithCrop>
      <HiveAvatarUploadWithCrop disabled>Disabled</HiveAvatarUploadWithCrop>
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
      <HiveAvatarUploadWithCrop className="w-full">Full Width</HiveAvatarUploadWithCrop>
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
