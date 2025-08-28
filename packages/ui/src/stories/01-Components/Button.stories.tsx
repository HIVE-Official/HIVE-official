import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/button';
import { RitualButton } from '../../components/ritual-button';
import { Search, Heart, Settings, Plus, Download, ArrowRight, Zap, Star } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# HIVE Button System

Clean, tech social platform buttons with minimal gold usage and Vercel-inspired precision.

## Design Principles:
- **Tech Social**: Clean, modern, platform-quality interactions
- **Minimal Gold**: Gold only for accents and focus states
- **Modular**: Easy to extend with new variants
- **Cross-Platform**: forwardRef pattern for React Native compatibility

## Core Variants:
- **Primary**: Clean black with subtle gold hover (main CTAs)
- **Secondary**: Sophisticated border treatment (secondary actions)
- **Accent**: Minimal gold fill (key moments only)
- **Ghost**: Invisible until hover (navigation, tertiary)
- **Destructive**: Monochrome approach (no red violations)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost', 'destructive'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Join Campus',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Browse Spaces',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Create Space',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cancel',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Space',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-white">HIVE Button System</h1>
          <p className="text-white/70 text-lg">Tech social platform buttons with minimal gold usage</p>
        </div>

        {/* Core Variants */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Core Variants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white/80">Primary Actions</h3>
                <div className="space-y-2">
                  <Button variant="primary" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Join Campus
                  </Button>
                  <Button variant="accent" className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Create Space
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white/80">Secondary Actions</h3>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full">
                    Browse Spaces
                  </Button>
                  <Button variant="ghost" className="w-full">
                    Maybe Later
                  </Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-white/80">Special Actions</h3>
                <div className="space-y-2">
                  <Button variant="destructive" className="w-full">
                    Leave Space
                  </Button>
                  <Button variant="ghost" className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Sizes</h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
              <Button variant="primary" size="xl">Extra Large</Button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Icon Buttons</h2>
            <div className="flex items-center gap-4">
              <Button variant="primary" size="icon-sm">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="accent" size="icon-lg">
                <Star className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">States</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Normal</Button>
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
          </div>

          {/* With Icons */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">With Icons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">
                <Download className="w-4 h-4 mr-2" />
                Download App
              </Button>
              <Button variant="secondary">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const RitualButtons: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-white">Ritual Buttons</h1>
          <p className="text-white/70 text-lg">Special moments and campus celebrations</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Campus Rituals</h2>
            <div className="space-y-3">
              <RitualButton variant="primary" className="w-full">
                <Zap className="w-5 h-5 mr-3" />
                Complete Onboarding Ritual
              </RitualButton>
              <RitualButton variant="celebration" className="w-full">
                <Star className="w-5 h-5 mr-3" />
                Claim Achievement
              </RitualButton>
              <RitualButton variant="energy" className="w-full">
                Join Campus Energy Wave
              </RitualButton>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Different Sizes</h2>
            <div className="space-y-3">
              <RitualButton variant="primary" size="md">Medium Ritual</RitualButton>
              <RitualButton variant="primary" size="lg">Large Ritual</RitualButton>
              <RitualButton variant="primary" size="xl">Extra Large Ritual</RitualButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-white">Loading States</h1>
          <p className="text-white/70 text-lg">All button variants with loading indicators</p>
        </div>

        <div className="space-y-4">
          <Button variant="primary" loading className="w-full">
            Joining Campus...
          </Button>
          <Button variant="secondary" loading className="w-full">
            Loading Spaces...
          </Button>
          <Button variant="accent" loading className="w-full">
            Creating Space...
          </Button>
          <RitualButton variant="primary" loading className="w-full">
            Completing Ritual...
          </RitualButton>
        </div>
      </div>
    </div>
  ),
};