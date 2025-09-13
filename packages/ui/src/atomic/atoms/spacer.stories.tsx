import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Spacer, 
  VerticalSpacer, 
  HorizontalSpacer, 
  FlexibleSpacer, 
  ResponsiveSpacer,
  TinySpacer,
  SmallSpacer,
  MediumSpacer,
  LargeSpacer,
  ExtraLargeSpacer,
  HugeSpacer,
  VerticalGap,
  HorizontalGap
} from './spacer';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import '../../hive-tokens.css';

const meta: Meta<typeof Spacer> = {
  title: '01-Atoms/Spacer - COMPLETE DEFINITION',
  component: Spacer,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Spacer - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated spacing system for University at Buffalo campus interface layouts and visual rhythm.

### 🏆 **COMPONENT EXCELLENCE**
- **8 Size Options** - From xs (4px) to 4xl (96px) for precise spacing control
- **3 Direction Types** - Horizontal, vertical, and both for complete layout flexibility
- **Responsive Spacing** - Automatic size scaling across device breakpoints
- **Flexible Growth** - Dynamic spacing that grows to fill available space
- **Debug Visualization** - Visual debugging mode for layout development
- **Perfect Semantic Tokens** - 100% semantic token usage for debug styling
- **Smart Accessibility** - Hidden from screen readers with aria-hidden
- **Campus Layout Ready** - Optimized for UB content organization and visual hierarchy

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo interface spacing and content organization:
- **Academic Content** - Spacing between course sections, assignment groups
- **Administrative Forms** - Consistent spacing in registration and enrollment forms
- **Campus Information** - Organized spacing in event details, news articles
- **Navigation Layout** - Proper spacing between menu items and breadcrumbs
- **Data Display** - Structured spacing in student records and course catalogs
- **Mobile Interfaces** - Responsive spacing that works across all device sizes

### 📱 **MOBILE OPTIMIZATION**
- **Responsive Scaling** - Automatic size adjustments for mobile screens
- **Touch-Friendly Spacing** - Appropriate spacing for mobile interactions
- **Consistent Rhythm** - Maintains visual hierarchy across device sizes
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Spacer size',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical', 'both'],
      description: 'Spacing direction',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive scaling',
    },
    flexible: {
      control: 'boolean',
      description: 'Enable flexible growth',
    },
    debug: {
      control: 'boolean',
      description: 'Show debug visualization',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

// Default spacer showcase
export const Default: Story = {
  args: {
    size: 'md',
    direction: 'vertical',
    responsive: false,
    flexible: false,
    debug: true,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Content above the spacer
          </Text>
          <Spacer {...args} />
          <Text variant="body-md" color="secondary">
            Content below the spacer - showing controlled spacing for University at Buffalo interfaces
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
      
      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">📏 SIZES</Badge>
            Spacer Sizes - Precise Spacing Control
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 sizes from xs (4px) to 4xl (96px) for complete layout flexibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            {/* Vertical Spacing Examples */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Spacing Examples:</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Extra Small (4px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Line 1</Text>
                    <Spacer size="xs" debug />
                    <Text variant="body-xs" color="primary">Line 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Small (8px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Line 1</Text>
                    <Spacer size="sm" debug />
                    <Text variant="body-xs" color="primary">Line 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Medium (16px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Line 1</Text>
                    <Spacer size="md" debug />
                    <Text variant="body-xs" color="primary">Line 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Large (24px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Line 1</Text>
                    <Spacer size="lg" debug />
                    <Text variant="body-xs" color="primary">Line 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">Extra Large (32px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Section 1</Text>
                    <Spacer size="xl" debug />
                    <Text variant="body-xs" color="primary">Section 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">2X Large (48px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Block 1</Text>
                    <Spacer size="2xl" debug />
                    <Text variant="body-xs" color="primary">Block 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">3X Large (64px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Area 1</Text>
                    <Spacer size="3xl" debug />
                    <Text variant="body-xs" color="primary">Area 2</Text>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-[var(--hive-text-secondary)]">4X Large (96px):</h5>
                  <div className="bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                    <Text variant="body-xs" color="primary">Region 1</Text>
                    <Spacer size="4xl" debug />
                    <Text variant="body-xs" color="primary">Region 2</Text>
                  </div>
                </div>

              </div>
            </div>

            {/* Horizontal Spacing Examples */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Spacing Examples:</h4>
              
              <div className="space-y-4">
                
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">Item</Text>
                    <HorizontalSpacer size="xs" debug />
                    <Text variant="body-sm" color="secondary">xs</Text>
                    <HorizontalSpacer size="sm" debug />
                    <Text variant="body-sm" color="secondary">sm</Text>
                    <HorizontalSpacer size="md" debug />
                    <Text variant="body-sm" color="secondary">md</Text>
                    <HorizontalSpacer size="lg" debug />
                    <Text variant="body-sm" color="secondary">lg</Text>
                    <HorizontalSpacer size="xl" debug />
                    <Text variant="body-sm" color="secondary">xl</Text>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Direction Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🧭 DIRECTIONS</Badge>
            Spacing Directions - Layout Flexibility
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 direction types for complete control over spacing placement
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Direction:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text variant="body-sm" color="primary">Course Requirements</Text>
                <VerticalSpacer size="lg" debug />
                <Text variant="body-sm" color="secondary">Core CS Courses</Text>
                <VerticalSpacer size="md" debug />
                <Text variant="body-sm" color="secondary">Technical Electives</Text>
                <VerticalSpacer size="sm" debug />
                <Text variant="body-sm" color="muted">General Education</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Direction:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center">
                  <Text variant="body-sm" color="primary">CSE 331</Text>
                  <HorizontalSpacer size="lg" debug />
                  <Text variant="body-sm" color="secondary">Algorithm Analysis</Text>
                  <HorizontalSpacer size="md" debug />
                  <Text variant="body-sm" color="secondary">4 Credits</Text>
                  <HorizontalSpacer size="sm" debug />
                  <Text variant="body-sm" color="muted">Fall 2024</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Both Directions:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" color="primary">Column 1</Text>
                    <Text variant="body-xs" color="secondary">Content here</Text>
                  </div>
                  <Spacer direction="both" size="xl" debug />
                  <div className="space-y-2">
                    <Text variant="body-sm" color="primary">Column 2</Text>
                    <Text variant="body-xs" color="secondary">Content here</Text>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Responsive Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📱 RESPONSIVE</Badge>
            Responsive Spacing - Device Adaptation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Automatic spacing adjustment across device breakpoints for optimal mobile experience
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Responsive Vertical Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text variant="body-sm" color="primary">Mobile: sm → Tablet: md → Desktop: lg</Text>
                <ResponsiveSpacer size="sm" direction="vertical" debug />
                <Text variant="body-sm" color="secondary">Spacing automatically adapts to screen size</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Responsive Horizontal Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center">
                  <Text variant="body-sm" color="primary">Item 1</Text>
                  <ResponsiveSpacer size="md" direction="horizontal" debug />
                  <Text variant="body-sm" color="secondary">Item 2</Text>
                  <ResponsiveSpacer size="md" direction="horizontal" debug />
                  <Text variant="body-sm" color="muted">Item 3</Text>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Flexible Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🔄 FLEXIBLE</Badge>
            Flexible Spacing - Dynamic Growth
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Dynamic spacing that grows to fill available space for perfect layouts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Flexible Horizontal Growth:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center">
                  <Text variant="body-sm" color="primary">Left Content</Text>
                  <FlexibleSpacer direction="horizontal" debug />
                  <Text variant="body-sm" color="secondary">Right Content</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Flexible Vertical Growth:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg h-40 flex flex-col">
                <Text variant="body-sm" color="primary">Top Content</Text>
                <FlexibleSpacer direction="vertical" debug />
                <Text variant="body-sm" color="secondary">Bottom Content</Text>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="gold">🎯 PRESETS</Badge>
            Spacer Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built spacer components for common University at Buffalo interface patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size-Based Presets:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-2">
                <Text variant="body-xs" color="primary">TinySpacer (xs)</Text>
                <TinySpacer debug />
                <Text variant="body-xs" color="primary">SmallSpacer (sm)</Text>
                <SmallSpacer debug />
                <Text variant="body-xs" color="primary">MediumSpacer (md)</Text>
                <MediumSpacer debug />
                <Text variant="body-xs" color="primary">LargeSpacer (lg)</Text>
                <LargeSpacer debug />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Function-Based Presets:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center">
                  <Text variant="body-xs" color="primary">Gap.sm</Text>
                  {HorizontalGap.sm()}
                  <Text variant="body-xs" color="primary">Gap.md</Text>
                  {HorizontalGap.md()}
                  <Text variant="body-xs" color="primary">Gap.lg</Text>
                  {HorizontalGap.lg()}
                  <Text variant="body-xs" color="primary">End</Text>
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
            Real Campus Spacing Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Spacer usage in actual University at Buffalo academic and administrative interfaces
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Listing */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Listing Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-0">
                <Text as="h3" variant="heading-md" color="primary">
                  Computer Science Courses - Fall 2024
                </Text>
                <VerticalSpacer size="lg" />
                
                <div className="space-y-0">
                  <Text variant="body-sm" color="gold" weight="medium">Core Requirements</Text>
                  <VerticalSpacer size="sm" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 250 - Data Structures</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">4 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="emerald">Available</Text>
                  </div>
                  <VerticalSpacer size="xs" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 331 - Algorithm Analysis</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">4 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="ruby">Waitlist</Text>
                  </div>
                  <VerticalSpacer size="xs" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 410 - Software Engineering</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">3 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="emerald">Available</Text>
                  </div>
                </div>
                
                <VerticalSpacer size="lg" />
                
                <div className="space-y-0">
                  <Text variant="body-sm" color="gold" weight="medium">Technical Electives</Text>
                  <VerticalSpacer size="sm" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 442 - Software Engineering</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">4 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="emerald">Available</Text>
                  </div>
                  <VerticalSpacer size="xs" />
                  
                  <div className="flex items-center">
                    <Text variant="body-sm" color="primary">CSE 460 - Machine Learning</Text>
                    <HorizontalSpacer size="md" />
                    <Text variant="body-sm" color="secondary">3 Credits</Text>
                    <HorizontalSpacer size="sm" />
                    <Text variant="body-sm" color="emerald">Available</Text>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Student Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Dashboard Sections:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-0">
                <Text as="h3" variant="heading-lg" color="primary">
                  Academic Dashboard
                </Text>
                <VerticalSpacer size="2xl" />
                
                {/* Quick Stats */}
                <div className="space-y-0">
                  <Text variant="heading-sm" color="gold">Academic Progress</Text>
                  <VerticalSpacer size="md" />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Text variant="display-sm" color="emerald" weight="bold">3.75</Text>
                      <VerticalSpacer size="xs" />
                      <Text variant="body-sm" color="secondary">Current GPA</Text>
                    </div>
                    <div className="text-center">
                      <Text variant="display-sm" color="primary" weight="bold">102</Text>
                      <VerticalSpacer size="xs" />
                      <Text variant="body-sm" color="secondary">Credits Earned</Text>
                    </div>
                    <div className="text-center">
                      <Text variant="display-sm" color="gold" weight="bold">18</Text>
                      <VerticalSpacer size="xs" />
                      <Text variant="body-sm" color="secondary">Credits Remaining</Text>
                    </div>
                  </div>
                </div>
                
                <VerticalSpacer size="2xl" />
                
                {/* Current Courses */}
                <div className="space-y-0">
                  <Text variant="heading-sm" color="gold">Current Enrollment</Text>
                  <VerticalSpacer size="md" />
                  
                  <div className="space-y-0">
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Text variant="body-sm" color="primary" weight="medium">CSE 331</Text>
                        <HorizontalSpacer size="sm" />
                        <Text variant="body-sm" color="secondary">Algorithm Analysis</Text>
                      </div>
                      <Text variant="body-sm" color="emerald">A- (92%)</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Text variant="body-sm" color="primary" weight="medium">MTH 241</Text>
                        <HorizontalSpacer size="sm" />
                        <Text variant="body-sm" color="secondary">College Calculus</Text>
                      </div>
                      <Text variant="body-sm" color="primary">B+ (88%)</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center justify-between p-3 bg-[var(--hive-background-primary)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Text variant="body-sm" color="primary" weight="medium">PHI 237</Text>
                        <HorizontalSpacer size="sm" />
                        <Text variant="body-sm" color="secondary">Ethics</Text>
                      </div>
                      <Text variant="body-sm" color="emerald">A (95%)</Text>
                    </div>
                  </div>
                </div>
                
                <VerticalSpacer size="2xl" />
                
                {/* Upcoming Deadlines */}
                <div className="space-y-0">
                  <Text variant="heading-sm" color="gold">Upcoming Deadlines</Text>
                  <VerticalSpacer size="md" />
                  
                  <div className="space-y-0">
                    <div className="flex items-center">
                      <Text variant="body-sm" color="ruby" weight="medium">Tomorrow</Text>
                      <HorizontalSpacer size="md" />
                      <Text variant="body-sm" color="secondary">CSE 331 Assignment 4</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="muted">11:59 PM</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center">
                      <Text variant="body-sm" color="gold" weight="medium">Friday</Text>
                      <HorizontalSpacer size="md" />
                      <Text variant="body-sm" color="secondary">MTH 241 Midterm Exam</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="muted">2:00 PM</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center">
                      <Text variant="body-sm" color="primary" weight="medium">Next Week</Text>
                      <HorizontalSpacer size="md" />
                      <Text variant="body-sm" color="secondary">PHI 237 Essay Draft</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="muted">Monday</Text>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Form Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Registration Form Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="space-y-0">
                <Text as="h3" variant="heading-md" color="primary">
                  Course Registration - Spring 2025
                </Text>
                <VerticalSpacer size="lg" />
                
                <div className="space-y-0">
                  <Text variant="body-sm" color="gold" weight="medium">Student Information</Text>
                  <VerticalSpacer size="sm" />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Text variant="body-sm" color="secondary">Student ID: 50123456</Text>
                    </div>
                    <div>
                      <Text variant="body-sm" color="secondary">Classification: Senior</Text>
                    </div>
                  </div>
                </div>
                
                <VerticalSpacer size="xl" />
                
                <div className="space-y-0">
                  <Text variant="body-sm" color="gold" weight="medium">Course Selection</Text>
                  <VerticalSpacer size="sm" />
                  
                  <div className="space-y-0">
                    <div className="flex items-center">
                      <Text variant="body-sm" color="primary">Course Code</Text>
                      <HorizontalSpacer size="lg" />
                      <Text variant="body-sm" color="primary">Course Title</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="primary">Credits</Text>
                    </div>
                    <VerticalSpacer size="sm" />
                    
                    <div className="flex items-center p-2 bg-[var(--hive-background-primary)] rounded">
                      <Text variant="body-sm" color="secondary">CSE 442</Text>
                      <HorizontalSpacer size="lg" />
                      <Text variant="body-sm" color="secondary">Software Engineering</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="secondary">4</Text>
                    </div>
                    <VerticalSpacer size="xs" />
                    
                    <div className="flex items-center p-2 bg-[var(--hive-background-primary)] rounded">
                      <Text variant="body-sm" color="secondary">CSE 460</Text>
                      <HorizontalSpacer size="lg" />
                      <Text variant="body-sm" color="secondary">Machine Learning</Text>
                      <FlexibleSpacer />
                      <Text variant="body-sm" color="secondary">3</Text>
                    </div>
                  </div>
                </div>
                
                <VerticalSpacer size="xl" />
                
                <div className="flex items-center justify-between">
                  <Text variant="body-sm" color="primary" weight="medium">Total Credits: 7</Text>
                  <button className="px-4 py-2 bg-[var(--hive-brand-primary)] text-white rounded-lg">
                    Register for Courses
                  </button>
                </div>
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
    direction: 'vertical',
    responsive: false,
    flexible: false,
    debug: true,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Spacer Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different spacer configurations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Content above the spacer
          </Text>
          <Spacer {...args} />
          <Text variant="body-md" color="secondary">
            Content below the spacer - testing spacing for University at Buffalo interfaces
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};