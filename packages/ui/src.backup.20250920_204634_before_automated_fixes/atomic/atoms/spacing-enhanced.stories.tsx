import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Spacer, 
  Container, 
  Stack, 
  HStack, 
  VStack, 
  Separator,
  Grid,
  Flex,
  LayoutPresets;
} from './spacing-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { Button } from './button';
import '../../hive-tokens.css';

const meta: Meta<typeof Stack> = {
  title: '01-Atoms/Spacing Enhanced - COMPLETE DEFINITION',
  component: Stack,
  parameters: {
    docs: {
      description: {
        component: `
## 📐 HIVE Spacing Enhanced - Complete Component Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive spacing and layout system for University at Buffalo HIVE platform interface organization and structure.

### 🎯 **COMPONENT EXCELLENCE**
- **8 Layout Components** - Spacer, Container, Stack, HStack, VStack, Separator, Grid, Flex for complete layout control;
- **Responsive Design** - Adaptive sizing and breakpoint-aware layouts for all screen sizes;
- **Perfect Semantic Tokens** - 100% semantic token usage for all spacing, colors, and borders;
- **Layout Presets** - Pre-configured common layout patterns for rapid development;
- **Flexible Spacing** - 8 size options from XS to 3XL for precise spacing control;
- **Advanced Grid System** - Responsive grid with breakpoint management and gap control;
- **Stack System** - Horizontal and vertical stacks with alignment and distribution options;
- **Accessibility Ready** - Proper ARIA labels, semantic structure, and screen reader support;
- **Campus Interface** - Built for University at Buffalo platform layout consistency;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform layout and organization:
- **Page Layouts** - Consistent page structure for course spaces, profiles, and tools;
- **Content Organization** - Stack systems for organizing academic content and social features;
- **Responsive Grids** - Course lists, space directories, tool galleries, and event displays;
- **Interface Separation** - Clear visual separation between platform sections and features;
- **Form Layouts** - Consistent spacing for registration, settings, and tool creation forms;
- **Dashboard Organization** - Structured layouts for student analytics and activity tracking;
### 📱 **MOBILE OPTIMIZATION**
- **Responsive Breakpoints** - Adaptive layouts from mobile to desktop;
- **Touch-Friendly Spacing** - Appropriate spacing for mobile interaction;
- **Flexible Containers** - Adaptive containers for different screen sizes;
- **Mobile-First Design** - Optimized spacing hierarchy for mobile experiences;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stack direction',
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'default', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Stack spacing size',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Cross-axis alignment',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Main-axis distribution',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

// Sample content for demonstrations;
const SampleCard = ({ children, ...props }: { children: React.ReactNode }) => (
  <div className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg" {...props}>
    {children}
  </div>
);

// Default spacing showcase;
export const Default: Story = {
  args: {
    direction: 'vertical',
    spacing: 'default',
    align: 'stretch',
    justify: 'start',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE spacing and layout system for University at Buffalo platform organization:
          </Text>
          <Stack {...args}>
            <SampleCard>
              <Text variant="body-sm">First item in stack</Text>
            </SampleCard>
            <SampleCard>
              <Text variant="body-sm">Second item in stack</Text>
            </SampleCard>
            <SampleCard>
              <Text variant="body-sm">Third item in stack</Text>
            </SampleCard>
          </Stack>
          <Text variant="body-sm" color="secondary">
            Flexible spacing system for consistent platform layout;
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Spacing Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">📐 SPACING COMPONENTS</Badge>
            Layout Component System;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive spacing and layout components for University at Buffalo HIVE platform interface organization;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Core Layout Components:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Spacer Component:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <div className="flex items-center">
                      <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded">Item 1</div>
                      <Spacer size="lg" direction="horizontal" />
                      <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded">Item 2</div>
                    </div>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Flexible spacer for precise spacing control between elements;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Container Component:</Text>
                  <div className="bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <Container size="md" padding="lg">
                      <div className="p-4 bg-[var(--hive-brand-gold)]/10 rounded-lg text-center">
                        <Text variant="body-sm">Container content with max-width and padding</Text>
                      </div>
                    </Container>
                    <Text variant="body-xs" color="secondary" className="p-2">
                      Responsive container with size constraints and padding options;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Separator Component:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <div>
                      <Text variant="body-sm">Content above separator</Text>
                      <Separator className="my-4" />
                      <Text variant="body-sm">Content below separator</Text>
                    </div>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Visual separation between content sections;
                    </Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Stack System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📚 STACK SYSTEM</Badge>
            Horizontal and Vertical Stacks;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Flexible stack components for organizing content with proper spacing and alignment;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Stack Directions:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Vertical Stack (VStack):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <VStack spacing="sm">
                      <SampleCard>Course Space: CSE 331</SampleCard>
                      <SampleCard>Assignment: Algorithm Analysis</SampleCard>
                      <SampleCard>Due Date: Next Tuesday</SampleCard>
                    </VStack>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Vertical organization for course content and academic information;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Horizontal Stack (HStack):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <HStack spacing="sm" align="center">
                      <Button size="sm">Join Space</Button>
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="ghost" size="sm">Share</Button>
                    </HStack>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Horizontal arrangement for action buttons and navigation elements;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Stack Spacing Options:</Text>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-xs" color="secondary" className="mb-2">Small Spacing:</Text>
                      <VStack spacing="xs">
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                      </VStack>
                    </div>
                    <div className="p-3 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                      <Text variant="body-xs" color="secondary" className="mb-2">Large Spacing:</Text>
                      <VStack spacing="lg">
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                        <div className="p-2 bg-[var(--hive-brand-gold)]/20 rounded text-xs">Item</div>
                      </VStack>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Grid and Flex Systems */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ ADVANCED LAYOUTS</Badge>
            Grid and Flex Systems;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced layout systems for complex interface organization and responsive design;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Grid System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Responsive Grid (3 columns):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <Grid cols={3} gap="md" responsive>
                      <SampleCard>Space Card 1</SampleCard>
                      <SampleCard>Space Card 2</SampleCard>
                      <SampleCard>Space Card 3</SampleCard>
                      <SampleCard>Space Card 4</SampleCard>
                      <SampleCard>Space Card 5</SampleCard>
                      <SampleCard>Space Card 6</SampleCard>
                    </Grid>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Responsive grid layout for space directory and course listings;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Flex Layout:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <Flex justify="between" align="center" gap="sm">
                      <SampleCard>Profile Info</SampleCard>
                      <SampleCard>Statistics</SampleCard>
                      <SampleCard>Actions</SampleCard>
                    </Flex>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Flexible layout with space distribution for profile headers and navigation;
                    </Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Layout Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎨 LAYOUT PRESETS</Badge>
            Pre-configured Layout Patterns;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Common layout patterns optimized for University at Buffalo platform interface consistency;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Common Layout Patterns:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Page Layout:</Text>
                  <div className="bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <LayoutPresets.PageLayout>
                      <SampleCard>Page Header</SampleCard>
                      <SampleCard>Main Content</SampleCard>
                      <SampleCard>Footer</SampleCard>
                    </LayoutPresets.PageLayout>
                    <Text variant="body-xs" color="secondary" className="p-2">
                      Standard page layout with container and vertical spacing;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Header Layout:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <LayoutPresets.HeaderLayout>
                      <SampleCard>Page Title</SampleCard>
                      <SampleCard>Actions</SampleCard>
                    </LayoutPresets.HeaderLayout>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Header layout with title and action buttons distributed across space;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Form Layout:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                    <LayoutPresets.FormLayout>
                      <SampleCard>Form Field 1</SampleCard>
                      <SampleCard>Form Field 2</SampleCard>
                      <SampleCard>Submit Button</SampleCard>
                    </LayoutPresets.FormLayout>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Form layout with consistent spacing for registration and settings forms;
                    </Text>
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
            Real Campus Layout Scenarios;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Spacing and layout usage in actual University at Buffalo student interface and platform organization contexts;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Space Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 Course Space Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Algorithm Analysis Course Organization;
                </Text>
                
                <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                  <LayoutPresets.PageLayout>
                    
                    {/* Course Header */}
                    <div className="p-4 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                      <LayoutPresets.HeaderLayout>
                        <VStack spacing="xs">
                          <Text variant="heading-md" color="primary">CSE 331 - Algorithm Analysis</Text>
                          <Text variant="body-sm" color="secondary">Fall 2024 • Dr. Emily Rodriguez</Text>
                        </VStack>
                        <HStack spacing="sm">
                          <Button size="sm">Join Space</Button>
                          <Button variant="outline" size="sm">Syllabus</Button>
                        </HStack>
                      </LayoutPresets.HeaderLayout>
                    </div>

                    <Separator />

                    {/* Course Content Grid */}
                    <Grid cols={3} gap="md" responsive>
                      <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">Recent Assignments</Text>
                          <VStack spacing="xs">
                            <Text variant="body-xs">Dynamic Programming - Due Mon</Text>
                            <Text variant="body-xs">Graph Algorithms - Due Wed</Text>
                            <Text variant="body-xs">Final Project - Due Dec 15</Text>
                          </VStack>
                        </VStack>
                      </div>
                      
                      <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">Study Groups</Text>
                          <VStack spacing="xs">
                            <Text variant="body-xs">Algorithms Study Group</Text>
                            <Text variant="body-xs">Project Team Alpha</Text>
                            <Text variant="body-xs">Exam Prep Group</Text>
                          </VStack>
                        </VStack>
                      </div>
                      
                      <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">Resources</Text>
                          <VStack spacing="xs">
                            <Text variant="body-xs">Lecture Notes</Text>
                            <Text variant="body-xs">Practice Problems</Text>
                            <Text variant="body-xs">Reference Materials</Text>
                          </VStack>
                        </VStack>
                      </div>
                    </Grid>

                  </LayoutPresets.PageLayout>
                  
                  <Text variant="body-sm" color="secondary" className="mt-4">
                    Complete course space layout using HIVE spacing system for academic content organization;
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Student Dashboard Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Dashboard Organization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)]">
                <VStack spacing="lg">
                  
                  {/* Dashboard Header */}
                  <LayoutPresets.HeaderLayout>
                    <VStack spacing="xs">
                      <Text variant="heading-lg" color="primary">Sarah Chen's Dashboard</Text>
                      <Text variant="body-sm" color="secondary">Computer Science Senior • Fall 2024</Text>
                    </VStack>
                    <HStack spacing="sm">
                      <Button size="sm" variant="outline">Profile</Button>
                      <Button size="sm">Settings</Button>
                    </HStack>
                  </LayoutPresets.HeaderLayout>

                  <Separator variant="muted" />

                  {/* Dashboard Content */}
                  <Grid cols={2} gap="lg" responsive>
                    
                    <div className="space-y-4">
                      <Text variant="body-md" weight="medium">Quick Actions</Text>
                      <VStack spacing="sm">
                        <div className="p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                          <HStack justify="between" align="center">
                            <Text variant="body-sm">Check Assignments</Text>
                            <Button size="xs">Go</Button>
                          </HStack>
                        </div>
                        <div className="p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                          <HStack justify="between" align="center">
                            <Text variant="body-sm">Join Study Group</Text>
                            <Button size="xs">Go</Button>
                          </HStack>
                        </div>
                        <div className="p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                          <HStack justify="between" align="center">
                            <Text variant="body-sm">View Calendar</Text>
                            <Button size="xs">Go</Button>
                          </HStack>
                        </div>
                      </VStack>
                    </div>

                    <div className="space-y-4">
                      <Text variant="body-md" weight="medium">Recent Activity</Text>
                      <VStack spacing="sm">
                        <div className="p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-xs">Joined CSE 331 study group</Text>
                        </div>
                        <div className="p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-xs">Submitted algorithm assignment</Text>
                        </div>
                        <div className="p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-xs">Created project planning tool</Text>
                        </div>
                      </VStack>
                    </div>

                  </Grid>

                </VStack>
                
                <Text variant="body-sm" color="secondary" className="mt-4">
                  Student dashboard layout showcasing hierarchical spacing and responsive grid organization;
                </Text>
              </div>

            </div>
          </div>

          {/* Mobile Layout Optimization */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Layout Optimization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized spacing for campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mobile Navigation Layout:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] max-w-sm">
                    <VStack spacing="sm">
                      <LayoutPresets.HeaderLayout>
                        <Text variant="body-md" weight="medium">HIVE</Text>
                        <Button size="sm" variant="ghost">Menu</Button>
                      </LayoutPresets.HeaderLayout>
                      
                      <Separator />
                      
                      <VStack spacing="xs">
                        <div className="w-full p-3 bg-[var(--hive-brand-gold)]/10 rounded-lg">
                          <Text variant="body-sm">Feed</Text>
                        </div>
                        <div className="w-full p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-sm">Spaces</Text>
                        </div>
                        <div className="w-full p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <Text variant="body-sm">Calendar</Text>
                        </div>
                      </VStack>
                    </VStack>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Mobile navigation with touch-friendly spacing;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mobile Content Cards:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] max-w-sm">
                    <VStack spacing="md">
                      <div className="w-full p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">CSE 331 Assignment</Text>
                          <Text variant="body-xs" color="secondary">Due: Next Tuesday</Text>
                          <HStack spacing="xs" justify="end">
                            <Button size="xs">View</Button>
                            <Button size="xs" variant="outline">Submit</Button>
                          </HStack>
                        </VStack>
                      </div>
                      
                      <div className="w-full p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                        <VStack spacing="sm">
                          <Text variant="body-sm" weight="medium">Study Group Meeting</Text>
                          <Text variant="body-xs" color="secondary">Today at 3pm</Text>
                          <HStack spacing="xs" justify="end">
                            <Button size="xs">Join</Button>
                            <Button size="xs" variant="outline">Details</Button>
                          </HStack>
                        </VStack>
                      </div>
                    </VStack>
                    <Text variant="body-xs" color="secondary" className="mt-2">
                      Mobile-optimized card layouts with appropriate spacing for thumb interaction;
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground;
export const Playground: Story = {
  args: {
    direction: 'vertical',
    spacing: 'default',
    align: 'stretch',
    justify: 'start',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Spacing Enhanced Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different spacing configurations;
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Stack {...args}>
              <SampleCard>
                <Text variant="body-sm">First item - adjust spacing and alignment</Text>
              </SampleCard>
              <SampleCard>
                <Text variant="body-sm">Second item - testing layout behavior</Text>
              </SampleCard>
              <SampleCard>
                <Text variant="body-sm">Third item - University at Buffalo spacing system</Text>
              </SampleCard>
            </Stack>
            <Text variant="body-sm" color="secondary">
              Interactive spacing system testing for University at Buffalo HIVE platform layout consistency;
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};