import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/button';
import { 
  Zap, 
  Heart, 
  Share, 
  MessageCircle, 
  Star, 
  Coffee, 
  Code, 
  Terminal,
  Play,
  Plus,
  Users,
  Send,
  Download,
  Settings
} from 'lucide-react';

const meta = {
  component: React.Fragment,
  title: 'Visual Improvements/🎛️ Button Options',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# HIVE Button System

Testing all available button variants and sizes in the HIVE design system.

## Available Variants:
- **Primary**: Main call-to-action buttons
- **Secondary**: Secondary actions with border treatment
- **Accent**: Gold accent for key moments
- **Ghost**: Invisible until hover
- **Destructive**: For destructive actions
- **Outline**: Border-only variant (legacy support)
- **Default**: Same as primary (legacy support)
- **Ritual**: Special HIVE moments (legacy support)
- **Surface**: Surface-level variant (legacy support)
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllButtonVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black text-white p-8 space-y-16">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
          HIVE Button System
        </h1>
        <p className="text-white/70 text-lg">
          All available button variants and configurations
        </p>
      </div>

      {/* CORE BUTTON VARIANTS */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">Core Button Variants</h2>
          <p className="text-white/70 mb-6">Primary button system with all variants</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Primary Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Primary Button
              </Button>
              <Button variant="secondary" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Accent Button
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Secondary Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Secondary Button
              </Button>
              <Button variant="secondary" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Outline Button
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Special Actions</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full">
                Ghost Button
              </Button>
              <Button variant="destructive" className="w-full">
                Destructive Button
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legacy Support</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                <Star className="w-4 h-4 mr-2" />
                Ritual Button
              </Button>
              <Button variant="surface" className="w-full">
                Surface Button
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SIZES */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">Button Sizes</h2>
          <p className="text-white/70 mb-6">All available button sizes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Small</h3>
            <Button variant="primary" size="sm" className="w-full">
              Small Button
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Medium (Default)</h3>
            <Button variant="primary" size="md" className="w-full">
              Medium Button
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Large</h3>
            <Button variant="primary" size="lg" className="w-full">
              Large Button
            </Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Extra Large</h3>
            <Button variant="primary" size="xl" className="w-full">
              Extra Large Button
            </Button>
          </div>
        </div>
      </section>

      {/* ICON BUTTONS */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">Icon Buttons</h2>
          <p className="text-white/70 mb-6">Icon-only button variants</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Small Icons</h3>
            <div className="flex gap-2">
              <Button variant="primary" size="icon-sm">
                <Heart className="w-3 h-3" />
              </Button>
              <Button variant="secondary" size="icon-sm">
                <Share className="w-3 h-3" />
              </Button>
              <Button variant="secondary" size="icon-sm">
                <Star className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Regular Icons</h3>
            <div className="flex gap-2">
              <Button variant="primary" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="icon">
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Large Icons</h3>
            <div className="flex gap-2">
              <Button variant="primary" size="icon-lg">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="icon-lg">
                <Share className="w-5 h-5" />
              </Button>
              <Button variant="secondary" size="icon-lg">
                <Star className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STATES */}
      <section className="space-y-6">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-2xl font-bold text-accent mb-2">Button States</h2>
          <p className="text-white/70 mb-6">Loading and disabled states</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Normal</h3>
            <div className="space-y-2">
              <Button variant="primary" className="w-full">
                Normal Button
              </Button>
              <Button variant="secondary" className="w-full">
                Normal Accent
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loading</h3>
            <div className="space-y-2">
              <Button variant="primary" loading className="w-full">
                Loading...
              </Button>
              <Button variant="secondary" loading className="w-full">
                Processing...
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Disabled</h3>
            <div className="space-y-2">
              <Button variant="primary" disabled className="w-full">
                Disabled Button
              </Button>
              <Button variant="secondary" disabled className="w-full">
                Disabled Accent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="text-center pt-16 border-t border-accent/20">
        <p className="text-white/70 max-w-2xl mx-auto">
          This demonstrates all available button variants, sizes, and states in the HIVE design system.
          Each variant serves different contexts and user expectations.
        </p>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="bg-black text-white p-8 space-y-8">
      <h2 className="text-2xl font-bold text-accent text-center mb-8">Loading States Across All Variants</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Primary</h3>
          <Button variant="primary" loading className="w-full">
            Processing...
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Accent</h3>
          <Button variant="secondary" loading className="w-full">
            Deploying...
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Secondary</h3>
          <Button variant="secondary" loading className="w-full">
            Loading...
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Ghost</h3>
          <Button variant="ghost" loading className="w-full">
            Processing...
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Ritual</h3>
          <Button variant="primary" loading className="w-full">
            Completing...
          </Button>
        </div>
      </div>
    </div>
  ),
};