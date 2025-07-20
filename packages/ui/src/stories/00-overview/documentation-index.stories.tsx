import type { Meta, StoryObj } from '@storybook/react';
import { HiveCard, HiveButton, HiveBadge } from '../../components';
import { 
  BookOpen, 
  Palette, 
  Type, 
  Move, 
  Layout, 
  Mouse, 
  Layers, 
  Zap, 
  Users, 
  Settings,
  Eye,
  Code,
  Smartphone,
  Heart
} from 'lucide-react';

const meta: Meta = {
  title: '00-Overview/Documentation Index',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete navigation guide to the HIVE Design System documentation and component library.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DocumentationIndex: Story = {
  render: () => (
    <div className="bg-[#0A0A0B] min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#E5E5E7] mb-4">
            HIVE Design System Documentation
          </h1>
          <p className="text-xl text-[#C1C1C4] max-w-3xl mx-auto">
            Complete guide to building with HIVE's dark luxury design system. 
            Everything you need to create premium campus infrastructure.
          </p>
        </div>

        {/* Foundation Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E5E7] mb-8 flex items-center">
            <BookOpen className="w-8 h-8 mr-3 text-[#FFD700]" />
            Foundation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HiveCard variant="gold-accent" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                  <Palette className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Design Tokens</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Colors, spacing, typography, motion, and effects that define the HIVE aesthetic.
                  </p>
                  <HiveBadge variant="gold" size="sm">Essential</HiveBadge>
                </div>
              </div>
            </HiveCard>

            <HiveCard variant="default" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
                  <Type className="w-6 h-6 text-[#10B981]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Typography</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Inter font family with display, heading, and body scales optimized for dark luxury.
                  </p>
                  <HiveBadge variant="success" size="sm">Complete</HiveBadge>
                </div>
              </div>
            </HiveCard>

            <HiveCard variant="default" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
                  <Move className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Motion System</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Liquid metal motion with magnetic interactions and orchestrated timing.
                  </p>
                  <HiveBadge variant="info" size="sm">Advanced</HiveBadge>
                </div>
              </div>
            </HiveCard>
          </div>
        </section>

        {/* Layout Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E5E7] mb-8 flex items-center">
            <Layout className="w-8 h-8 mr-3 text-[#FFD700]" />
            Layout & Structure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HiveCard variant="default" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                  <Layers className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Box, Stack & Grid</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Fundamental layout primitives for building complex interfaces.
                  </p>
                  <HiveBadge variant="default" size="sm">Basic</HiveBadge>
                </div>
              </div>
            </HiveCard>

            <HiveCard variant="default" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F59E0B]/20 transition-colors">
                  <Smartphone className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Responsive Design</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Mobile-first approach optimized for on-campus usage patterns.
                  </p>
                  <HiveBadge variant="warning" size="sm">Mobile-First</HiveBadge>
                </div>
              </div>
            </HiveCard>
          </div>
        </section>

        {/* UI Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E5E7] mb-8 flex items-center">
            <Mouse className="w-8 h-8 mr-3 text-[#FFD700]" />
            UI Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Buttons', icon: Mouse, description: 'Primary actions with liquid metal motion', status: 'Complete' },
              { name: 'Cards', icon: Layers, description: 'Content containers with glass morphism', status: 'Complete' },
              { name: 'Forms', icon: Code, description: 'Input, select, and form validation', status: 'Complete' },
              { name: 'Navigation', icon: Settings, description: 'Breadcrumbs, menus, and navigation', status: 'Complete' },
              { name: 'Badges', icon: Heart, description: 'Status indicators and labels', status: 'Complete' },
              { name: 'Modals', icon: Eye, description: 'Overlays and dialog systems', status: 'Complete' },
              { name: 'Tables', icon: Layout, description: 'Data display with sorting', status: 'Complete' },
              { name: 'Charts', icon: Zap, description: 'Data visualization components', status: 'Complete' },
            ].map((component, index) => (
              <HiveCard key={index} variant="minimal" size="sm" className="group cursor-pointer">
                <div className="text-center">
                  <div className="w-10 h-10 bg-[#FFD700]/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FFD700]/20 transition-colors">
                    <component.icon className="w-5 h-5 text-[#FFD700]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#E5E5E7] mb-1">{component.name}</h3>
                  <p className="text-[#9B9B9F] text-xs mb-2">{component.description}</p>
                  <HiveBadge variant="success" size="xs">{component.status}</HiveBadge>
                </div>
              </HiveCard>
            ))}
          </div>
        </section>

        {/* HIVE Components Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E5E7] mb-8 flex items-center">
            <Zap className="w-8 h-8 mr-3 text-[#FFD700]" />
            HIVE Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HiveCard variant="gold-featured" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                  <Users className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Space Components</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Digital homes for campus communities with activation systems.
                  </p>
                  <HiveBadge variant="gold" size="sm">Platform Core</HiveBadge>
                </div>
              </div>
            </HiveCard>

            <HiveCard variant="default" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
                  <Settings className="w-6 h-6 text-[#10B981]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Tool Builders</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    HiveLAB components for Element composition and Tool creation.
                  </p>
                  <HiveBadge variant="success" size="sm">Builder System</HiveBadge>
                </div>
              </div>
            </HiveCard>

            <HiveCard variant="default" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#8B5CF6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#8B5CF6]/20 transition-colors">
                  <Eye className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Surface Components</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Six universal surfaces: Pinned, Posts, Events, Tools, Chat, Members.
                  </p>
                  <HiveBadge variant="outline" size="sm">Universal</HiveBadge>
                </div>
              </div>
            </HiveCard>
          </div>
        </section>

        {/* Premium & Specialized Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E5E7] mb-8 flex items-center">
            <Heart className="w-8 h-8 mr-3 text-[#FFD700]" />
            Premium & Specialized
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HiveCard variant="gold-premium" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#FFD700]/10 rounded-lg flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors">
                  <Heart className="w-6 h-6 text-[#FFD700]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Premium Components</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Enhanced components with advanced interactions and magnetic hover effects.
                  </p>
                  <HiveBadge variant="gold" size="sm">Premium</HiveBadge>
                </div>
              </div>
            </HiveCard>

            <HiveCard variant="default" size="default" className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#EF4444]/10 rounded-lg flex items-center justify-center group-hover:bg-[#EF4444]/20 transition-colors">
                  <Zap className="w-6 h-6 text-[#EF4444]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#E5E5E7] mb-2">Logo System</h3>
                  <p className="text-[#C1C1C4] text-sm mb-3">
                    Comprehensive HIVE branding with variants, patterns, and responsive behavior.
                  </p>
                  <HiveBadge variant="danger" size="sm">Brand</HiveBadge>
                </div>
              </div>
            </HiveCard>
          </div>
        </section>

        {/* App Shell & Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#E5E5E7] mb-8 flex items-center">
            <Layout className="w-8 h-8 mr-3 text-[#FFD700]" />
            Application Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HiveCard variant="elevated" size="lg" className="group cursor-pointer">
              <h3 className="text-xl font-semibold text-[#E5E5E7] mb-4">App Shell & Navigation</h3>
              <p className="text-[#C1C1C4] mb-4">
                Complete application layout with header, sidebar, and page containers. 
                Includes command palette, user menu, and notification systems.
              </p>
              <div className="flex gap-2">
                <HiveBadge variant="success" size="sm">Layout</HiveBadge>
                <HiveBadge variant="info" size="sm">Navigation</HiveBadge>
                <HiveBadge variant="warning" size="sm">Interactive</HiveBadge>
              </div>
            </HiveCard>

            <HiveCard variant="elevated" size="lg" className="group cursor-pointer">
              <h3 className="text-xl font-semibold text-[#E5E5E7] mb-4">Onboarding & Auth</h3>
              <p className="text-[#C1C1C4] mb-4">
                Complete user onboarding flow with welcome steps, school search, 
                profile setup, and authentication patterns.
              </p>
              <div className="flex gap-2">
                <HiveBadge variant="gold" size="sm">Auth</HiveBadge>
                <HiveBadge variant="success" size="sm">Forms</HiveBadge>
                <HiveBadge variant="outline" size="sm">Flow</HiveBadge>
              </div>
            </HiveCard>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-[#E5E5E7] mb-8">Get Started</h2>
          <div className="flex justify-center gap-4">
            <HiveButton variant="primary" size="lg">
              <BookOpen className="w-5 h-5 mr-2" />
              View All Components
            </HiveButton>
            <HiveButton variant="outline" size="lg">
              <Code className="w-5 h-5 mr-2" />
              Design Tokens
            </HiveButton>
            <HiveButton variant="ghost-gold" size="lg">
              <Zap className="w-5 h-5 mr-2" />
              Motion System
            </HiveButton>
          </div>
        </section>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};