import type { Meta, StoryObj } from '@storybook/react';
import { HiveButton } from '../../components/hive-button';
import { Star, Download, Plus, ArrowRight, Loader2, Heart } from 'lucide-react';

const meta: Meta<typeof HiveButton> = {
  title: '04-Hive/Hive Button',
  component: HiveButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'The consolidated HIVE Button component featuring liquid metal motion, magnetic interactions, glass morphism effects, and comprehensive variant system. Supports all HIVE design tokens and interaction patterns including tool-building and space-activation workflows.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'premium', 'outline', 'outline-subtle', 'ghost', 'ghost-gold', 'chip', 'chip-platinum', 'chip-gold', 'chip-glass', 'glow', 'minimal', 'success', 'destructive', 'warning', 'link'],
      description: 'HIVE button variants using semantic design tokens'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg', 'chip-xs', 'chip-sm', 'chip', 'chip-lg'],
      description: 'Button sizes including chip variants'
    },
    magneticHover: {
      control: 'boolean',
      description: 'Enable magnetic hover interactions for premium variants'
    },
    magneticIntensity: {
      control: 'select',
      options: ['subtle', 'medium', 'strong'],
      description: 'Intensity of magnetic hover effect'
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Re-export for migration compatibility
export { HiveButton as Button } from '../../components/hive-button';

export const Primary: Story = {
  args: {
    children: 'HIVE Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button with platinum background and liquid metal motion - the signature HIVE interaction'
      }
    }
  }
};

export const CoreVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-8 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveButton variant="primary">Primary</HiveButton>
      <HiveButton variant="secondary">Secondary</HiveButton>
      <HiveButton variant="premium">Premium</HiveButton>
      <HiveButton variant="outline">Outline</HiveButton>
      <HiveButton variant="ghost">Ghost</HiveButton>
      <HiveButton variant="glow">Glow</HiveButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Core HIVE button variants showcasing the primary interaction patterns for campus infrastructure'
      }
    }
  }
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveButton size="xs">Extra Small</HiveButton>
      <HiveButton size="sm">Small</HiveButton>
      <HiveButton size="default">Default</HiveButton>
      <HiveButton size="lg">Large</HiveButton>
      <HiveButton size="xl">Extra Large</HiveButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button size variants for different UI contexts and importance levels'
      }
    }
  }
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveButton leftIcon={<Plus className="w-4 h-4" />}>Create Tool</HiveButton>
      <HiveButton rightIcon={<ArrowRight className="w-4 h-4" />} variant="premium">Activate Space</HiveButton>
      <HiveButton leftIcon={<Download className="w-4 h-4" />} rightIcon={<Star className="w-4 h-4" />} variant="glow">Save & Rate</HiveButton>
      <HiveButton size="icon" variant="ghost"><Heart className="w-4 h-4" /></HiveButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with left icons, right icons, and icon-only variants for tool-building interfaces'
      }
    }
  }
};

export const ChipVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveButton variant="chip" size="chip-sm">Filter</HiveButton>
      <HiveButton variant="chip-gold" size="chip">Premium</HiveButton>
      <HiveButton variant="chip-platinum" size="chip">Selected</HiveButton>
      <HiveButton variant="chip-glass" size="chip-lg">Category</HiveButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chip-style buttons perfect for filters, tags, and selection interfaces in space directories'
      }
    }
  }
};

export const StatusVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveButton variant="success" leftIcon={<Plus className="w-4 h-4" />}>Tool Created</HiveButton>
      <HiveButton variant="warning" leftIcon={<Star className="w-4 h-4" />}>Pending Review</HiveButton>
      <HiveButton variant="destructive" leftIcon={<Heart className="w-4 h-4" />}>Remove Tool</HiveButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status buttons for tool creation, space activation, and feedback workflows'
      }
    }
  }
};

export const InteractiveStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveButton>Normal</HiveButton>
      <HiveButton loading>Creating Tool...</HiveButton>
      <HiveButton disabled>Disabled</HiveButton>
      <HiveButton variant="premium" magneticHover magneticIntensity="strong">Magnetic Hover</HiveButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive states including loading, disabled, and magnetic hover effects'
      }
    }
  }
};

export const PremiumShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Premium Tool Builder Actions</h3>
        <div className="flex gap-4 justify-center">
          <HiveButton variant="premium" size="lg" leftIcon={<Plus className="w-5 h-5" />} magneticHover>Create Element</HiveButton>
          <HiveButton variant="glow" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />} magneticHover>Deploy Tool</HiveButton>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Space Activation Flow</h3>
        <div className="flex gap-3 justify-center">
          <HiveButton variant="chip-gold" size="chip">Preview</HiveButton>
          <HiveButton variant="premium" size="default">Activate Space</HiveButton>
          <HiveButton variant="glow" size="default">Invite Builders</HiveButton>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Premium showcase demonstrating HIVE buttons in tool-building and space-activation workflows with magnetic interactions'
      }
    }
  }
};

export const AsChildPattern: Story = {
  render: () => (
    <div className="flex gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveButton asChild variant="premium">
        <a href="#tools" className="no-underline">Browse Tools</a>
      </HiveButton>
      <HiveButton asChild variant="glow">
        <a href="#spaces" className="no-underline">Explore Spaces</a>
      </HiveButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using asChild prop for link styling while maintaining HIVE button appearance - perfect for navigation'
      }
    }
  }
};