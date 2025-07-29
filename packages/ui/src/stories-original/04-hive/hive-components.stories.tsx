import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveButton, 
  HiveCard, 
  HiveInput, 
  HiveBadge
} from '../../components';
import { Heart, Star, Plus, Download, Settings } from 'lucide-react';

const meta: Meta = {
  title: '04-Hive/Core Components',
  parameters: {
    docs: {
      description: {
        component: 'Core HIVE branded components with luxury dark theme and glass morphism effects',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// HiveButton Showcase
export const HiveButtons: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Button System</h1>
      
      {/* Primary Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">Primary Variants</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <HiveButton variant="primary">Primary</HiveButton>
          <HiveButton variant="secondary">Secondary</HiveButton>
          <HiveButton variant="gold">Gold Accent</HiveButton>
          <HiveButton variant="outline">Outline</HiveButton>
          <HiveButton variant="outline-subtle">Outline Subtle</HiveButton>
          <HiveButton variant="ghost">Ghost</HiveButton>
          <HiveButton variant="ghost-gold">Ghost Gold</HiveButton>
        </div>
      </section>

      {/* Chip Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">Chip Variants</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <HiveButton variant="chip" size="chip">Default Chip</HiveButton>
          <HiveButton variant="chip-white" size="chip">White Chip</HiveButton>
          <HiveButton variant="chip-gold" size="chip">Gold Chip</HiveButton>
          <HiveButton variant="chip-glass" size="chip">Glass Chip</HiveButton>
        </div>
      </section>

      {/* Special Effects */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibent text-[var(--hive-text-primary)] mb-6">Special Effects</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <HiveButton variant="glow">Glow Effect</HiveButton>
          <HiveButton variant="minimal">Minimal</HiveButton>
          <HiveButton variant="success">Success</HiveButton>
          <HiveButton variant="danger">Danger</HiveButton>
          <HiveButton variant="warning">Warning</HiveButton>
        </div>
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">Size Variants</h2>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <HiveButton size="xs">Extra Small</HiveButton>
          <HiveButton size="sm">Small</HiveButton>
          <HiveButton size="default">Default</HiveButton>
          <HiveButton size="lg">Large</HiveButton>
          <HiveButton size="xl">Extra Large</HiveButton>
        </div>
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">With Icons</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <HiveButton leftIcon={<Heart className="w-4 h-4" />}>With Left Icon</HiveButton>
          <HiveButton rightIcon={<Star className="w-4 h-4" />}>With Right Icon</HiveButton>
          <HiveButton leftIcon={<Plus className="w-4 h-4" />} rightIcon={<Download className="w-4 h-4" />}>
            Both Icons
          </HiveButton>
          <HiveButton variant="gold" leftIcon={<Settings className="w-4 h-4" />}>
            Gold with Icon
          </HiveButton>
        </div>
      </section>

      {/* Loading States */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">Loading States</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <HiveButton loading>Loading</HiveButton>
          <HiveButton variant="gold" loading>Loading Gold</HiveButton>
          <HiveButton variant="chip" loading size="chip">Loading Chip</HiveButton>
        </div>
      </section>

      {/* Icon Only */}
      <section>
        <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">Icon Only</h2>
        <div className="flex flex-wrap gap-4">
          <HiveButton size="icon"><Heart className="w-4 h-4" /></HiveButton>
          <HiveButton size="icon-sm" variant="gold"><Star className="w-4 h-4" /></HiveButton>
          <HiveButton size="icon-lg" variant="glow"><Plus className="w-4 h-4" /></HiveButton>
        </div>
      </section>
    </div>
  ),
};

// HiveCard Showcase
export const HiveCards: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Card System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HiveCard className="p-6">
          <h3 className="text-[var(--hive-text-primary)] font-semibold mb-2">Default Card</h3>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            Basic HIVE card with glass morphism background and luxury styling.
          </p>
        </HiveCard>
        
        <HiveCard variant="elevated" className="p-6">
          <h3 className="text-[var(--hive-text-primary)] font-semibold mb-2">Elevated Card</h3>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            Elevated variant with enhanced shadow and depth for important content.
          </p>
        </HiveCard>
        
        <HiveCard variant="glass" className="p-6">
          <h3 className="text-[var(--hive-text-primary)] font-semibold mb-2">Glass Card</h3>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            Pure glass morphism effect with subtle transparency and blur.
          </p>
        </HiveCard>
        
        <HiveCard variant="gold" className="p-6">
          <h3 className="text-[var(--hive-brand-secondary)] font-semibold mb-2">Gold Accent Card</h3>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            Premium card with gold accent border and subtle glow effect.
          </p>
        </HiveCard>
        
        <HiveCard variant="interactive" className="p-6 cursor-pointer">
          <h3 className="text-[var(--hive-text-primary)] font-semibold mb-2">Interactive Card</h3>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            Hover-enabled card with magnetic interaction effects.
          </p>
        </HiveCard>
        
        <HiveCard variant="minimal" className="p-6">
          <h3 className="text-[var(--hive-text-primary)] font-semibold mb-2">Minimal Card</h3>
          <p className="text-[var(--hive-text-secondary)] text-sm">
            Clean minimal design with subtle borders and backgrounds.
          </p>
        </HiveCard>
      </div>
    </div>
  ),
};

// HiveInput Showcase
export const HiveInputs: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Input System</h1>
      
      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block text-[var(--hive-text-secondary)] text-sm font-medium mb-2">
            Default Input
          </label>
          <HiveInput placeholder="Enter your text..." />
        </div>
        
        <div>
          <label className="block text-[var(--hive-text-secondary)] text-sm font-medium mb-2">
            Gold Variant
          </label>
          <HiveInput variant="gold" placeholder="Premium input with gold accent..." />
        </div>
        
        <div>
          <label className="block text-[var(--hive-text-secondary)] text-sm font-medium mb-2">
            Glass Variant
          </label>
          <HiveInput variant="glass" placeholder="Glass morphism input..." />
        </div>
        
        <div>
          <label className="block text-[var(--hive-text-secondary)] text-sm font-medium mb-2">
            Minimal Variant
          </label>
          <HiveInput variant="minimal" placeholder="Clean minimal design..." />
        </div>
        
        <div>
          <label className="block text-[var(--hive-text-secondary)] text-sm font-medium mb-2">
            Different Sizes
          </label>
          <div className="space-y-3">
            <HiveInput size="sm" placeholder="Small input..." />
            <HiveInput size="default" placeholder="Default input..." />
            <HiveInput size="lg" placeholder="Large input..." />
          </div>
        </div>
        
        <div>
          <label className="block text-[var(--hive-text-secondary)] text-sm font-medium mb-2">
            With Icons
          </label>
          <div className="space-y-3">
            <HiveInput 
              leftIcon={<Settings className="w-4 h-4" />}
              placeholder="Input with left icon..." 
            />
            <HiveInput 
              rightIcon={<Star className="w-4 h-4" />}
              placeholder="Input with right icon..." 
            />
          </div>
        </div>
        
        <div>
          <label className="block text-[var(--hive-text-secondary)] text-sm font-medium mb-2">
            States
          </label>
          <div className="space-y-3">
            <HiveInput placeholder="Normal state..." />
            <HiveInput disabled placeholder="Disabled state..." />
            <HiveInput error placeholder="Error state..." />
            <HiveInput success placeholder="Success state..." />
          </div>
        </div>
      </div>
    </div>
  ),
};

// HiveBadge Showcase
export const HiveBadges: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Badge System</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">Variants</h2>
          <div className="flex flex-wrap gap-3">
            <HiveBadge variant="default">Default</HiveBadge>
            <HiveBadge variant="gold">Gold</HiveBadge>
            <HiveBadge variant="glass">Glass</HiveBadge>
            <HiveBadge variant="outline">Outline</HiveBadge>
            <HiveBadge variant="success">Success</HiveBadge>
            <HiveBadge variant="warning">Warning</HiveBadge>
            <HiveBadge variant="danger">Danger</HiveBadge>
            <HiveBadge variant="info">Info</HiveBadge>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">Sizes</h2>
          <div className="flex flex-wrap items-center gap-3">
            <HiveBadge size="sm">Small</HiveBadge>
            <HiveBadge size="default">Default</HiveBadge>
            <HiveBadge size="lg">Large</HiveBadge>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-4">With Icons</h2>
          <div className="flex flex-wrap gap-3">
            <HiveBadge variant="gold">
              <Star className="w-3 h-3 mr-1" />
              Premium
            </HiveBadge>
            <HiveBadge variant="success">
              <Heart className="w-3 h-3 mr-1" />
              Active
            </HiveBadge>
            <HiveBadge variant="glass">
              <Settings className="w-3 h-3 mr-1" />
              Settings
            </HiveBadge>
          </div>
        </section>
      </div>
    </div>
  ),
};

// Premium Components Showcase
export const PremiumComponents: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)] min-h-screen">
      <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-8">HIVE Premium Components</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">Premium Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <HiveButton variant="primary">Premium Default</HiveButton>
            <HiveButton variant="gold">Premium Gold</HiveButton>
            <HiveButton variant="ghost">Premium Glass</HiveButton>
            <HiveButton variant="glow">Premium Glow</HiveButton>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">Premium Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <HiveCard className="p-6">
              <h3 className="text-[var(--hive-brand-secondary)] font-semibold mb-2">Premium Card</h3>
              <p className="text-[var(--hive-text-secondary)] text-sm">
                Enhanced premium card with advanced glass morphism and gold accents.
              </p>
            </HiveCard>
            
            <HiveCard variant="luxury" className="p-6">
              <h3 className="text-[var(--hive-brand-secondary)] font-semibold mb-2">Luxury Card</h3>
              <p className="text-[var(--hive-text-secondary)] text-sm">
                Ultimate luxury variant with sophisticated effects and premium feel.
              </p>
            </HiveCard>
          </div>
        </section>
      </div>
    </div>
  ),
};