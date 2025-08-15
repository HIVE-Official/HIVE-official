import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './spinner';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import '../../hive-tokens.css';

const meta: Meta<typeof Spinner> = {
  title: '01-Atoms/Spinner - COMPLETE DEFINITION',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Spinner - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most comprehensive loading indicator system for University at Buffalo campus interfaces and data states.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Size Options** - From xs (12px) to xl (48px) for all loading contexts
- **4 Semantic Colors** - Primary, secondary, gold, white for brand consistency
- **3 Animation Variants** - Spin, pulse, bounce for different loading states
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors
- **Smooth Animations** - High-performance CSS animations with proper timing
- **Smart Accessibility** - Proper ARIA attributes for screen reader compatibility
- **Campus Context Ready** - Optimized for UB academic and administrative loading states

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo interface loading states and data fetching:
- **Course Loading** - Registration systems, grade calculations, schedule updates
- **Academic Data** - Student records, transcript generation, degree audits
- **Campus Services** - Dining menus, housing applications, library searches
- **Administrative Tools** - User management, system updates, data exports
- **Real-time Features** - Chat loading, notifications, live updates
- **Mobile Interfaces** - Responsive loading states for mobile campus access

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Appropriate Sizes** - Clear visibility on mobile screens
- **Performance Optimized** - Efficient animations that don't drain battery
- **Consistent Rendering** - Smooth animations across all device types
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Spinner size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'gold', 'white'],
      description: 'Spinner color using semantic tokens',
    },
    variant: {
      control: 'select',
      options: ['spin', 'pulse', 'bounce'],
      description: 'Animation variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

// Default spinner showcase
export const Default: Story = {
  args: {
    size: 'md',
    color: 'gold',
    variant: 'spin',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Spinner {...args} />
            <div className="space-y-1">
              <Text variant="body-md" color="primary">
                Loading Course Data...
              </Text>
              <Text variant="body-sm" color="secondary">
                Default spinner for University at Buffalo interfaces
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📏 SIZES</Badge>
            Spinner Sizes - Loading Context Flexibility
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 sizes from xs (12px) to xl (48px) for different loading contexts and interface scales
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Spin Variant Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Spin Variant Sizes:</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                
                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="xs" color="gold" variant="spin" />
                  <div className="text-center">
                    <Text variant="body-xs" color="primary" weight="medium">Extra Small</Text>
                    <Text variant="body-xs" color="secondary">12px - Inline</Text>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="sm" color="gold" variant="spin" />
                  <div className="text-center">
                    <Text variant="body-xs" color="primary" weight="medium">Small</Text>
                    <Text variant="body-xs" color="secondary">16px - Buttons</Text>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="md" color="gold" variant="spin" />
                  <div className="text-center">
                    <Text variant="body-xs" color="primary" weight="medium">Medium</Text>
                    <Text variant="body-xs" color="secondary">24px - Default</Text>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="lg" color="gold" variant="spin" />
                  <div className="text-center">
                    <Text variant="body-xs" color="primary" weight="medium">Large</Text>
                    <Text variant="body-xs" color="secondary">32px - Cards</Text>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="xl" color="gold" variant="spin" />
                  <div className="text-center">
                    <Text variant="body-xs" color="primary" weight="medium">Extra Large</Text>
                    <Text variant="body-xs" color="secondary">48px - Pages</Text>
                  </div>
                </div>

              </div>
            </div>

            {/* Pulse Variant Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Pulse Variant Sizes:</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                
                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="xs" color="primary" variant="pulse" />
                  <Text variant="body-xs" color="secondary">xs - Subtle</Text>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="sm" color="primary" variant="pulse" />
                  <Text variant="body-xs" color="secondary">sm - Compact</Text>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="md" color="primary" variant="pulse" />
                  <Text variant="body-xs" color="secondary">md - Standard</Text>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="lg" color="primary" variant="pulse" />
                  <Text variant="body-xs" color="secondary">lg - Prominent</Text>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="xl" color="primary" variant="pulse" />
                  <Text variant="body-xs" color="secondary">xl - Hero</Text>
                </div>

              </div>
            </div>

            {/* Bounce Variant Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Bounce Variant Sizes:</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                
                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="xs" color="secondary" variant="bounce" />
                  <Text variant="body-xs" color="secondary">xs - Minimal</Text>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="sm" color="secondary" variant="bounce" />
                  <Text variant="body-xs" color="secondary">sm - Small</Text>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="md" color="secondary" variant="bounce" />
                  <Text variant="body-xs" color="secondary">md - Medium</Text>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="lg" color="secondary" variant="bounce" />
                  <Text variant="body-xs" color="secondary">lg - Large</Text>
                </div>

                <div className="flex flex-col items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Spinner size="xl" color="secondary" variant="bounce" />
                  <Text variant="body-xs" color="secondary">xl - Extra</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Color Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 COLORS</Badge>
            Spinner Colors - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 semantic colors for consistent brand expression and visual hierarchy
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Primary Color:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="lg" color="primary" variant="spin" />
                  <Text variant="body-sm" color="primary">Primary text color</Text>
                  <Text variant="body-xs" color="secondary">Main content loading</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Secondary Color:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="lg" color="secondary" variant="pulse" />
                  <Text variant="body-sm" color="secondary">Secondary text color</Text>
                  <Text variant="body-xs" color="secondary">Supporting content</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Gold Color:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="lg" color="gold" variant="bounce" />
                  <Text variant="body-sm" color="gold">HIVE brand accent</Text>
                  <Text variant="body-xs" color="secondary">Featured loading</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">White Color:</h4>
              <div className="bg-[var(--hive-brand-primary)] p-6 rounded-lg space-y-4">
                <div className="flex flex-col items-center gap-3">
                  <Spinner size="lg" color="white" variant="spin" />
                  <Text variant="body-sm" className="text-white">White spinner</Text>
                  <Text variant="body-xs" className="text-white/70">Dark backgrounds</Text>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎭 VARIANTS</Badge>
            Spinner Variants - Animation Styles
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 animation variants for different loading contexts and user experience needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Spin Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-8 rounded-lg">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <Spinner size="xl" color="gold" variant="spin" />
                    <Text variant="body-sm" color="primary" weight="medium">Classic Spin</Text>
                    <Text variant="body-xs" color="secondary">Rotating circle - most common</Text>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Pulse Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-8 rounded-lg">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <Spinner size="xl" color="primary" variant="pulse" />
                    <Text variant="body-sm" color="primary" weight="medium">Gentle Pulse</Text>
                    <Text variant="body-xs" color="secondary">Smooth opacity fade - subtle</Text>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Bounce Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-8 rounded-lg">
                <div className="flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center gap-3">
                    <Spinner size="xl" color="secondary" variant="bounce" />
                    <Text variant="body-sm" color="primary" weight="medium">Playful Bounce</Text>
                    <Text variant="body-xs" color="secondary">Three dots - engaging</Text>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Loading State Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Spinner usage in actual University at Buffalo academic and administrative loading contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Registration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="flex items-center gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg">
                <Spinner size="md" color="gold" variant="spin" />
                <div>
                  <Text variant="body-sm" color="primary" weight="medium">
                    Registering for CSE 331...
                  </Text>
                  <Text variant="body-xs" color="secondary">
                    Checking prerequisites and availability
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg">
                <Spinner size="sm" color="primary" variant="pulse" />
                <div>
                  <Text variant="body-sm" color="primary" weight="medium">
                    Validating schedule conflicts...
                  </Text>
                  <Text variant="body-xs" color="secondary">
                    Checking time overlaps with existing courses
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg">
                <Spinner size="sm" color="secondary" variant="bounce" />
                <div>
                  <Text variant="body-sm" color="primary" weight="medium">
                    Processing enrollment...
                  </Text>
                  <Text variant="body-xs" color="secondary">
                    Finalizing course registration
                  </Text>
                </div>
              </div>

            </div>
          </div>

          {/* Grade Calculation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Data Processing:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-6">
                <div className="text-center">
                  <Spinner size="xl" color="gold" variant="spin" />
                  <div className="mt-4 space-y-2">
                    <Text variant="heading-sm" color="primary">
                      Calculating Final Grades
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Processing assignments, exams, and participation scores for Fall 2024
                    </Text>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                    <Spinner size="sm" color="primary" variant="pulse" />
                    <Text variant="body-xs" color="secondary">CSE 331</Text>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                    <Spinner size="sm" color="primary" variant="pulse" />
                    <Text variant="body-xs" color="secondary">MTH 241</Text>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                    <Spinner size="sm" color="primary" variant="pulse" />
                    <Text variant="body-xs" color="secondary">PHI 237</Text>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Transcript Generation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Document Processing:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="flex items-center justify-between p-4 bg-[var(--hive-background-primary)] rounded-lg">
                <div className="flex items-center gap-4">
                  <Spinner size="lg" color="gold" variant="bounce" />
                  <div>
                    <Text variant="body-md" color="primary" weight="medium">
                      Generating Official Transcript
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Compiling academic records from 2021-2024
                    </Text>
                  </div>
                </div>
                <Text variant="body-sm" color="gold">In Progress...</Text>
              </div>

            </div>
          </div>

          {/* Campus Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Services Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-2 gap-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Dining Services:</Text>
                  <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                    <Spinner size="sm" color="primary" variant="spin" />
                    <Text variant="body-sm" color="secondary">Loading menu for Student Union...</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Library Search:</Text>
                  <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                    <Spinner size="sm" color="secondary" variant="pulse" />
                    <Text variant="body-sm" color="secondary">Searching academic databases...</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Housing Portal:</Text>
                  <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                    <Spinner size="sm" color="gold" variant="bounce" />
                    <Text variant="body-sm" color="secondary">Loading dorm availability...</Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Map:</Text>
                  <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                    <Spinner size="sm" color="primary" variant="spin" />
                    <Text variant="body-sm" color="secondary">Updating bus routes...</Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Button Loading States */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Interactive Loading States:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="flex flex-wrap gap-4">
                
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--hive-brand-primary)] text-white rounded-lg opacity-75 cursor-not-allowed">
                  <Spinner size="sm" color="white" variant="spin" />
                  <Text variant="body-sm" className="text-white">Enrolling...</Text>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--hive-border-primary)] rounded-lg opacity-75 cursor-not-allowed">
                  <Spinner size="sm" color="primary" variant="pulse" />
                  <Text variant="body-sm" color="primary">Saving...</Text>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--hive-brand-secondary)] text-white rounded-lg opacity-75 cursor-not-allowed">
                  <Spinner size="sm" color="white" variant="bounce" />
                  <Text variant="body-sm" className="text-white">Submitting...</Text>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--hive-status-error)] text-[var(--hive-status-error)] rounded-lg opacity-75 cursor-not-allowed">
                  <Spinner size="sm" color="primary" variant="spin" />
                  <Text variant="body-sm" color="ruby">Dropping...</Text>
                </button>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    size: 'lg',
    color: 'gold',
    variant: 'spin',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Spinner Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different spinner configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <Spinner {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};