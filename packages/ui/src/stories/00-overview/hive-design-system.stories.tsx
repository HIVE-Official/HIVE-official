import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveButton, 
  HiveCard, 
  HiveInput, 
  HiveBadge,
  HivePremiumButton,
  HiveModal,
  HiveSelect,
  HiveSpaceCard
} from '../../components';
import { HiveLogo } from '../../components/hive-icons';
import { Star, Heart, Settings, Users, BookOpen, Zap } from 'lucide-react';

// Wrapper component for design system overview
const HiveDesignSystemOverview = () => null;

const meta: Meta<typeof HiveDesignSystemOverview> = {
  title: '00-Overview/HIVE Design System',
  component: HiveDesignSystemOverview,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of the HIVE Design System - Dark luxury campus infrastructure with matte obsidian glass aesthetic and liquid metal motion.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Complete Design System Overview
export const DesignSystemOverview: Story = {
  render: () => (
    <div className="bg-[#0A0A0B] min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#FFD700]/5" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <HiveLogo size="xl" variant="primary" />
            </div>
            <h1 className="text-6xl font-bold text-[#E5E5E7] mb-6">
              HIVE Design System
            </h1>
            <p className="text-xl text-[#C1C1C4] max-w-3xl mx-auto mb-8">
              Dark luxury campus infrastructure that treats students as builders, not just users. 
              Matte obsidian glass aesthetic with liquid metal motion systems.
            </p>
            <div className="flex justify-center gap-4">
              <HivePremiumButton variant="gold-glow" size="lg">
                <Zap className="w-5 h-5 mr-2" />
                Get Started
              </HivePremiumButton>
              <HivePremiumButton variant="outline" size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Documentation
              </HivePremiumButton>
            </div>
          </div>
        </div>
      </div>

      {/* Design Principles */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-[#E5E5E7] text-center mb-16">Design Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <HiveCard variant="gold-accent" size="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFD700]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h3 className="text-xl font-semibold text-[#E5E5E7] mb-3">Students as Builders</h3>
              <p className="text-[#C1C1C4]">
                Empower students to create tools and shape their digital campus experience through 
                programmable Elements and Space activation.
              </p>
            </div>
          </HiveCard>

          <HiveCard variant="elevated" size="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#10B981]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-semibold text-[#E5E5E7] mb-3">Infrastructure Feel</h3>
              <p className="text-[#C1C1C4]">
                Matte obsidian glass components that feel substantial and trustworthy, 
                like premium campus infrastructure students can rely on.
              </p>
            </div>
          </HiveCard>

          <HiveCard variant="minimal" size="lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-[#3B82F6]" />
              </div>
              <h3 className="text-xl font-semibold text-[#E5E5E7] mb-3">Liquid Metal Motion</h3>
              <p className="text-[#C1C1C4]">
                Buttery smooth 60fps animations with magnetic interactions and orchestrated timing 
                that feels premium and responsive.
              </p>
            </div>
          </HiveCard>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-[#E5E5E7] text-center mb-16">Core Components</h2>
        
        {/* Buttons */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-8">Button System</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HiveCard variant="default" size="lg">
              <h4 className="text-lg font-medium text-[#E5E5E7] mb-6">HIVE Buttons</h4>
              <div className="flex flex-wrap gap-3 mb-6">
                <HiveButton variant="primary">Primary</HiveButton>
                <HiveButton variant="secondary">Secondary</HiveButton>
                <HiveButton variant="outline">Outline</HiveButton>
                <HiveButton variant="ghost">Ghost</HiveButton>
              </div>
              <div className="flex flex-wrap gap-3">
                <HiveButton variant="chip" size="chip">Chip</HiveButton>
                <HiveButton variant="chip-gold" size="chip">Gold Chip</HiveButton>
                <HiveButton variant="chip-glass" size="chip">Glass Chip</HiveButton>
              </div>
            </HiveCard>

            <HiveCard variant="default" size="lg">
              <h4 className="text-lg font-medium text-[#E5E5E7] mb-6">Premium Buttons</h4>
              <div className="flex flex-wrap gap-3 mb-6">
                <HivePremiumButton variant="gold-glow">Gold Glow</HivePremiumButton>
                <HivePremiumButton variant="success">Success</HivePremiumButton>
                <HivePremiumButton variant="danger">Danger</HivePremiumButton>
              </div>
              <div className="flex flex-wrap gap-3">
                <HivePremiumButton variant="chip-gold" size="sm">Premium Chip</HivePremiumButton>
                <HivePremiumButton variant="chip-glass" size="sm">Glass Chip</HivePremiumButton>
              </div>
            </HiveCard>
          </div>
        </div>

        {/* Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-8">Card System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HiveCard variant="default" size="default">
              <h4 className="text-lg font-medium text-[#E5E5E7] mb-2">Default Card</h4>
              <p className="text-[#C1C1C4] text-sm">
                Standard card for most content with glass morphism background.
              </p>
            </HiveCard>

            <HiveCard variant="gold-accent" size="default">
              <h4 className="text-lg font-medium text-[#E5E5E7] mb-2">Gold Accent</h4>
              <p className="text-[#C1C1C4] text-sm">
                Premium card with gold accent for featured content.
              </p>
            </HiveCard>

            <HiveCard variant="elevated" size="default">
              <h4 className="text-lg font-medium text-[#E5E5E7] mb-2">Elevated Card</h4>
              <p className="text-[#C1C1C4] text-sm">
                Higher elevation with stronger shadows for important content.
              </p>
            </HiveCard>
          </div>
        </div>

        {/* Space Cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-8">Space System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HiveSpaceCard
              title="Computer Science"
              memberCount={247}
              isActive={true}
              category="Academic"
            />
            <HiveSpaceCard
              title="Theta Chi"
              memberCount={89}
              isActive={true}
              category="Greek Life"
            />
          </div>
        </div>

        {/* Form Elements */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-8">Form Elements</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HiveCard variant="default" size="lg">
              <h4 className="text-lg font-medium text-[#E5E5E7] mb-6">Input Components</h4>
              <div className="space-y-4">
                <HiveInput placeholder="Enter your email" type="email" />
                <HiveInput placeholder="Search spaces..." type="search" />
                <HiveSelect 
                  placeholder="Select your major"
                  options={[
                    { value: 'cs', label: 'Computer Science' },
                    { value: 'ee', label: 'Electrical Engineering' },
                    { value: 'me', label: 'Mechanical Engineering' }
                  ]}
                />
              </div>
            </HiveCard>

            <HiveCard variant="default" size="lg">
              <h4 className="text-lg font-medium text-[#E5E5E7] mb-6">Badges & Status</h4>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <HiveBadge variant="freshman">Freshman</HiveBadge>
                  <HiveBadge variant="sophomore">Sophomore</HiveBadge>
                  <HiveBadge variant="junior">Junior</HiveBadge>
                  <HiveBadge variant="senior">Senior</HiveBadge>
                  <HiveBadge variant="grad">Graduate</HiveBadge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <HiveBadge variant="tool-newbie" size="sm">Tool Newbie</HiveBadge>
                  <HiveBadge variant="tool-builder" size="sm">Tool Builder</HiveBadge>
                  <HiveBadge variant="tool-expert" size="sm">Tool Expert</HiveBadge>
                </div>
              </div>
            </HiveCard>
          </div>
        </div>
      </section>

      {/* Color Palette Preview */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-[#E5E5E7] text-center mb-16">Dark Luxury Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-full h-24 bg-[#0A0A0B] rounded-lg border border-[#2A2A2D] mb-2" />
            <div className="text-[#C1C1C4] text-sm font-mono">Obsidian</div>
            <div className="text-[#9B9B9F] text-xs">#0A0A0B</div>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-[#FFD700] rounded-lg border border-[#2A2A2D] mb-2" />
            <div className="text-[#C1C1C4] text-sm font-mono">Gold</div>
            <div className="text-[#9B9B9F] text-xs">#FFD700</div>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-[#E5E5E7] rounded-lg border border-[#2A2A2D] mb-2" />
            <div className="text-[#C1C1C4] text-sm font-mono">Platinum</div>
            <div className="text-[#9B9B9F] text-xs">#E5E5E7</div>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-[#10B981] rounded-lg border border-[#2A2A2D] mb-2" />
            <div className="text-[#C1C1C4] text-sm font-mono">Emerald</div>
            <div className="text-[#9B9B9F] text-xs">#10B981</div>
          </div>
          <div className="text-center">
            <div className="w-full h-24 bg-[#EF4444] rounded-lg border border-[#2A2A2D] mb-2" />
            <div className="text-[#C1C1C4] text-sm font-mono">Ruby</div>
            <div className="text-[#9B9B9F] text-xs">#EF4444</div>
          </div>
        </div>
      </section>

      {/* Motion System Demo */}
      <section className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-[#E5E5E7] text-center mb-16">Liquid Metal Motion</h2>
        <HiveCard variant="gold-featured" size="xl">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-4">Interactive Elements</h3>
            <p className="text-[#C1C1C4] mb-8">
              Hover over buttons and cards to experience the liquid metal motion system. 
              Every interaction feels premium with 60fps animations and magnetic feedback.
            </p>
            <div className="flex justify-center gap-4">
              <HivePremiumButton magneticHover rippleEffect>
                <Heart className="w-4 h-4 mr-2" />
                Magnetic Hover
              </HivePremiumButton>
              <HivePremiumButton magneticHover rippleEffect variant="outline">
                <Star className="w-4 h-4 mr-2" />
                Ripple Effect
              </HivePremiumButton>
            </div>
          </div>
        </HiveCard>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2D] mt-16">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <HiveLogo size="md" variant="monochrome" />
            </div>
            <p className="text-[#9B9B9F] text-sm">
              Built for students, by students. Programmable campus infrastructure that grows with your community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Design Tokens Reference
export const DesignTokensReference: Story = {
  render: () => (
    <div className="p-8 bg-[#0A0A0B] min-h-screen">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-8">Design Tokens Quick Reference</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Colors */}
        <HiveCard variant="default" size="lg">
          <h2 className="text-xl font-semibold text-[#E5E5E7] mb-4">Semantic Colors</h2>
          <div className="space-y-3 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-text-primary</span>
              <span className="text-[#E5E5E7]">#E5E5E7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-text-secondary</span>
              <span className="text-[#C1C1C4]">#C1C1C4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-brand-primary</span>
              <span className="text-[#FFD700]">#FFD700</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-background-primary</span>
              <span className="text-[#9B9B9F]">#0A0A0B</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-background-secondary</span>
              <span className="text-[#9B9B9F]">#111113</span>
            </div>
          </div>
        </HiveCard>

        {/* Motion */}
        <HiveCard variant="default" size="lg">
          <h2 className="text-xl font-semibold text-[#E5E5E7] mb-4">Motion System</h2>
          <div className="space-y-3 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-duration-smooth</span>
              <span className="text-[#FFD700]">0.4s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-easing</span>
              <span className="text-[#FFD700]">cubic-bezier(0.23, 1, 0.32, 1)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-transform-scaleHover</span>
              <span className="text-[#FFD700]">1.02</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-transform-scaleTap</span>
              <span className="text-[#FFD700]">0.98</span>
            </div>
          </div>
        </HiveCard>

        {/* Spacing */}
        <HiveCard variant="default" size="lg">
          <h2 className="text-xl font-semibold text-[#E5E5E7] mb-4">Spacing Scale</h2>
          <div className="space-y-3 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-spacing-2</span>
              <span className="text-[#FFD700]">0.5rem (8px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-spacing-4</span>
              <span className="text-[#FFD700]">1rem (16px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-spacing-6</span>
              <span className="text-[#FFD700]">1.5rem (24px)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-spacing-8</span>
              <span className="text-[#FFD700]">2rem (32px)</span>
            </div>
          </div>
        </HiveCard>

        {/* Radius */}
        <HiveCard variant="default" size="lg">
          <h2 className="text-xl font-semibold text-[#E5E5E7] mb-4">Border Radius</h2>
          <div className="space-y-3 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-radius-sm</span>
              <span className="text-[#FFD700]">0.5rem</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-radius-md</span>
              <span className="text-[#FFD700]">0.75rem</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-radius-lg</span>
              <span className="text-[#FFD700]">1rem</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C1C1C4]">--hive-radius-xl</span>
              <span className="text-[#FFD700]">1.5rem</span>
            </div>
          </div>
        </HiveCard>
      </div>
    </div>
  ),
};