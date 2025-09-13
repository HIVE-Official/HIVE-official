import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from './skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import '../../hive-tokens.css';

const meta: Meta<typeof Skeleton> = {
  title: '01-Atoms/Skeleton - COMPLETE DEFINITION',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Skeleton - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated loading placeholder system for University at Buffalo campus interfaces and content loading states.

### 🏆 **COMPONENT EXCELLENCE**
- **4 Visual Variants** - Text, circular, rectangular, rounded for all content types
- **Multi-line Support** - Automatic text line generation with realistic proportions
- **Custom Dimensions** - Flexible width and height configuration
- **Smooth Animation** - Pulse animation for engaging loading experience
- **Perfect Semantic Tokens** - 100% semantic token usage for background colors
- **Smart Accessibility** - Proper ARIA attributes for screen reader compatibility
- **Campus Content Ready** - Optimized for UB academic and administrative content loading

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo interface loading states and content placeholders:
- **Course Loading** - Class schedules, enrollment data, grade calculations
- **Academic Content** - Student profiles, transcript data, degree progress
- **Campus Services** - Dining menus, housing information, library resources
- **Administrative Tools** - User management, system data, reports
- **Social Features** - Profile cards, activity feeds, notifications
- **Mobile Interfaces** - Responsive loading states for mobile campus access

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Appropriate skeleton dimensions for mobile screens
- **Performance Optimized** - Lightweight animations that preserve battery
- **Consistent Rendering** - Smooth placeholder experience across devices
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Skeleton shape variant',
    },
    width: {
      control: 'text',
      description: 'Skeleton width (string or number)',
    },
    height: {
      control: 'text',
      description: 'Skeleton height (string or number)',
    },
    lines: {
      control: 'number',
      description: 'Number of text lines (text variant only)',
    },
    animate: {
      control: 'boolean',
      description: 'Enable pulse animation',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

// Default skeleton showcase
export const Default: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: '2rem',
    animate: true,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Loading Course Information...
          </Text>
          <Skeleton {...args} />
          <Text variant="body-sm" color="secondary">
            Default skeleton placeholder for University at Buffalo content
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">🎭 VARIANTS</Badge>
            Skeleton Variants - Shape & Content Types
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 shape variants for different content types and loading contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Single Line:</Text>
                  <Skeleton variant="text" width="60%" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Multiple Lines:</Text>
                  <Skeleton variant="text" lines={3} />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Custom Width:</Text>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="40%" />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Circular Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex items-center gap-6">
                  <div className="text-center space-y-2">
                    <Skeleton variant="circular" width={32} height={32} />
                    <Text variant="body-xs" color="secondary">32px - Small</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Text variant="body-xs" color="secondary">40px - Medium</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="circular" width={48} height={48} />
                    <Text variant="body-xs" color="secondary">48px - Large</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="circular" width={64} height={64} />
                    <Text variant="body-xs" color="secondary">64px - Extra</Text>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Rectangular Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Card Content:</Text>
                  <Skeleton variant="rectangular" width="100%" height="6rem" />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Button Placeholders:</Text>
                  <div className="flex gap-3">
                    <Skeleton variant="rectangular" width="5rem" height="2.5rem" />
                    <Skeleton variant="rectangular" width="4rem" height="2.5rem" />
                    <Skeleton variant="rectangular" width="6rem" height="2.5rem" />
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Rounded Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Image Placeholders:</Text>
                  <div className="grid grid-cols-3 gap-4">
                    <Skeleton variant="rounded" width="100%" height="4rem" />
                    <Skeleton variant="rounded" width="100%" height="4rem" />
                    <Skeleton variant="rounded" width="100%" height="4rem" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Card Headers:</Text>
                  <Skeleton variant="rounded" width="100%" height="3rem" />
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Animation Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">⚡ ANIMATION</Badge>
            Skeleton Animation - Pulse Effects
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Smooth pulse animation for engaging loading experience
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Animated (Default):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <Skeleton variant="text" lines={3} animate={true} />
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" width={40} height={40} animate={true} />
                  <Skeleton variant="text" width="60%" animate={true} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Static (No Animation):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <Skeleton variant="text" lines={3} animate={false} />
                <div className="flex items-center gap-3">
                  <Skeleton variant="circular" width={40} height={40} animate={false} />
                  <Skeleton variant="text" width="60%" animate={false} />
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESETS</Badge>
            Skeleton Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built skeleton components for common University at Buffalo interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">SkeletonText Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Short Text (1 line):</Text>
                  <SkeletonText lines={1} />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium Text (3 lines - default):</Text>
                  <SkeletonText />
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Long Text (5 lines):</Text>
                  <SkeletonText lines={5} />
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">SkeletonAvatar Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="flex items-center gap-6">
                  <div className="text-center space-y-2">
                    <SkeletonAvatar size="sm" />
                    <Text variant="body-xs" color="secondary">Small (32px)</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <SkeletonAvatar size="md" />
                    <Text variant="body-xs" color="secondary">Medium (40px)</Text>
                  </div>
                  <div className="text-center space-y-2">
                    <SkeletonAvatar size="lg" />
                    <Text variant="body-xs" color="secondary">Large (48px)</Text>
                  </div>
                </div>

              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">SkeletonCard Preset:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <SkeletonCard className="bg-[var(--hive-background-primary)] rounded-lg" />

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
            Skeleton usage in actual University at Buffalo academic and administrative loading contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Schedule Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Schedule Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <Text variant="heading-sm" color="primary">Fall 2024 Course Schedule</Text>
                  <Skeleton variant="text" width="40%" />
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((course: any) => (
                    <div key={course} className="p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-3">
                      <div className="flex items-center gap-4">
                        <Skeleton variant="rectangular" width="4rem" height="1.5rem" />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="rectangular" width="3rem" height="1.5rem" />
                      </div>
                      <div className="flex items-center gap-6">
                        <Skeleton variant="text" width="8rem" />
                        <Skeleton variant="text" width="6rem" />
                        <Skeleton variant="text" width="10rem" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Student Profile Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-6">
                
                {/* Profile Header */}
                <div className="flex items-center gap-6">
                  <SkeletonAvatar size="lg" />
                  <div className="space-y-3 flex-1">
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="text" width="60%" />
                    <div className="flex gap-3">
                      <Skeleton variant="rectangular" width="5rem" height="1.5rem" />
                      <Skeleton variant="rectangular" width="4rem" height="1.5rem" />
                    </div>
                  </div>
                </div>

                {/* Academic Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <Skeleton variant="text" width="3rem" className="mx-auto" />
                    <Skeleton variant="text" width="4rem" className="mx-auto" />
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="text" width="3rem" className="mx-auto" />
                    <Skeleton variant="text" width="5rem" className="mx-auto" />
                  </div>
                  <div className="text-center space-y-2">
                    <Skeleton variant="text" width="3rem" className="mx-auto" />
                    <Skeleton variant="text" width="6rem" className="mx-auto" />
                  </div>
                </div>

                {/* Course List */}
                <div className="space-y-4">
                  <Skeleton variant="text" width="8rem" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((course: any) => (
                      <div key={course} className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <Skeleton variant="text" width="4rem" />
                          <Skeleton variant="text" width="12rem" />
                        </div>
                        <Skeleton variant="text" width="3rem" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Grade Report Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Grade Report Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-3">
                <Skeleton variant="text" width="12rem" />
                <Skeleton variant="text" width="20rem" />
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((semester: any) => (
                  <div key={semester} className="space-y-3">
                    <Skeleton variant="text" width="8rem" />
                    <div className="grid grid-cols-4 gap-4 p-4 bg-[var(--hive-background-primary)] rounded-lg">
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="100%" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Campus Events Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Events Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Skeleton variant="text" width="10rem" />

              <div className="grid md:grid-cols-2 gap-6">
                
                {[1, 2, 3, 4].map((event: any) => (
                  <div key={event} className="p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-4">
                    <Skeleton variant="rounded" width="100%" height="8rem" />
                    <div className="space-y-2">
                      <Skeleton variant="text" width="80%" />
                      <Skeleton variant="text" width="60%" />
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton variant="text" width="4rem" />
                      <Skeleton variant="text" width="6rem" />
                      <Skeleton variant="text" width="5rem" />
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>

          {/* Dining Menu Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Dining Menu Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="flex items-center gap-4">
                <Skeleton variant="rectangular" width="3rem" height="3rem" />
                <div className="space-y-2">
                  <Skeleton variant="text" width="10rem" />
                  <Skeleton variant="text" width="15rem" />
                </div>
              </div>

              <div className="space-y-4">
                {['Breakfast', 'Lunch', 'Dinner'].map((meal: any) => (
                  <div key={meal} className="space-y-3">
                    <Skeleton variant="text" width="6rem" />
                    <div className="grid md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="p-3 bg-[var(--hive-background-primary)] rounded-lg space-y-2">
                          <Skeleton variant="text" width="80%" />
                          <Skeleton variant="text" width="100%" lines={2} />
                          <Skeleton variant="text" width="4rem" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Library Search Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Library Search Results Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="flex items-center gap-4">
                <Skeleton variant="rectangular" width="20rem" height="2.5rem" />
                <Skeleton variant="rectangular" width="6rem" height="2.5rem" />
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((result: any) => (
                  <div key={result} className="p-4 bg-[var(--hive-background-primary)] rounded-lg space-y-3">
                    <div className="flex items-start gap-4">
                      <Skeleton variant="rectangular" width="4rem" height="6rem" />
                      <div className="space-y-2 flex-1">
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                        <SkeletonText lines={3} />
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton variant="text" width="6rem" />
                      <Skeleton variant="text" width="4rem" />
                      <Skeleton variant="text" width="8rem" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Social Feed Loading */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Social Feed Loading:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              {[1, 2, 3].map((post: any) => (
                <SkeletonCard key={post} className="bg-[var(--hive-background-primary)] rounded-lg" />
              ))}

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
    variant: 'rectangular',
    width: '100%',
    height: '4rem',
    animate: true,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different skeleton configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive skeleton placeholder for University at Buffalo content loading
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};