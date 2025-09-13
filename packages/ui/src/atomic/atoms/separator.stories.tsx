import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Separator, HorizontalSeparator, VerticalSeparator, GradientDivider } from './separator';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import '../../hive-tokens.css';

const meta: Meta<typeof Separator> = {
  title: '01-Atoms/Separator - COMPLETE DEFINITION',
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Separator - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated separator system for University at Buffalo campus content division and visual organization.

### 🏆 **COMPONENT EXCELLENCE**
- **4 Visual Variants** - Solid, dashed, dotted, gradient with perfect semantic token usage
- **2 Orientations** - Horizontal and vertical with intelligent sizing
- **3 Size Options** - Small, medium, large with appropriate visual weight
- **4 Spacing Options** - None, small, medium, large with consistent rhythm
- **Perfect Semantic Tokens** - 100% semantic token usage for borders
- **Smart Accessibility** - ARIA compliant with proper separator roles
- **Campus Layout Ready** - Optimized for UB content organization and visual hierarchy

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo content organization and interface structure:
- **Academic Content** - Separating course sections, assignment categories, grade breakdowns
- **Administrative Forms** - Dividing form sections, grouping related fields
- **Campus Information** - Organizing event details, department listings, news articles
- **Navigation Structure** - Separating menu sections, breadcrumb divisions
- **Data Display** - Organizing student records, course catalogs, campus directories

### 📱 **MOBILE OPTIMIZATION**
- **Visual Clarity** - Appropriate thickness and contrast for mobile screens
- **Touch Spacing** - Proper spacing for mobile content organization
- **Responsive Behavior** - Consistent appearance across device sizes
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Separator orientation',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'gradient'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Separator thickness',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Margin spacing around separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether separator is decorative only (affects ARIA)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

// Default separator showcase
export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    spacing: 'md',
    decorative: false,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Course Registration for Spring 2025
          </Text>
          <Separator {...args} />
          <Text variant="body-md" color="secondary">
            Available computer science courses and enrollment information for University at Buffalo students.
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
      
      {/* Orientation Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ ORIENTATIONS</Badge>
            Separator Orientations - Horizontal & Vertical
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            2 orientations for flexible content organization and layout structure
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Horizontal Separators */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Separators:</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text variant="body-md" color="primary">
                  Computer Science Department
                </Text>
                <HorizontalSeparator />
                <Text variant="body-md" color="secondary">
                  Undergraduate Programs
                </Text>
                <HorizontalSeparator variant="dashed" />
                <Text variant="body-md" color="secondary">
                  Graduate Programs
                </Text>
                <HorizontalSeparator variant="dotted" />
                <Text variant="body-md" color="secondary">
                  Research Opportunities
                </Text>
              </div>
            </div>

            {/* Vertical Separators */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Separators:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center gap-4 h-16">
                  <Text variant="body-sm" color="primary">CSE 331</Text>
                  <VerticalSeparator />
                  <Text variant="body-sm" color="secondary">Algorithm Analysis</Text>
                  <VerticalSeparator variant="dashed" />
                  <Text variant="body-sm" color="secondary">4 Credits</Text>
                  <VerticalSeparator variant="dotted" />
                  <Text variant="body-sm" color="muted">Prerequisites: CSE 250</Text>
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
            <Badge variant="info">🎨 VARIANTS</Badge>
            Separator Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 visual variants using 100% semantic tokens for consistent border styling
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Solid Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Clean, definitive content division</Text>
                <Separator variant="solid" />
                <Text variant="body-sm" color="secondary">Most common separator for clear section breaks</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dashed Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Subtle content organization</Text>
                <Separator variant="dashed" />
                <Text variant="body-sm" color="secondary">Softer division for related content sections</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dotted Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Minimal visual separation</Text>
                <Separator variant="dotted" />
                <Text variant="body-sm" color="secondary">Lightest separation for subtle organization</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Gradient Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Elegant content transition</Text>
                <GradientDivider />
                <Text variant="body-sm" color="secondary">Smooth visual flow between content sections</Text>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📏 SIZES</Badge>
            Separator Sizes - Visual Weight Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes for different visual hierarchy and content organization needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Small Size (Subtle):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Light content division</Text>
                <Separator size="sm" />
                <Text variant="body-sm" color="secondary">Minimal visual weight for subtle organization</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Medium Size (Standard):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Standard content division</Text>
                <Separator size="md" />
                <Text variant="body-sm" color="secondary">Default size for most campus content organization</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Large Size (Prominent):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Strong content division</Text>
                <Separator size="lg" />
                <Text variant="body-sm" color="secondary">Prominent separation for major section breaks</Text>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Spacing Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📐 SPACING</Badge>
            Separator Spacing - Rhythm & Flow
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 spacing options for consistent content rhythm and visual breathing room
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">No Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-sm" color="primary">Tight content layout</Text>
                <Separator spacing="none" />
                <Text variant="body-sm" color="secondary">No margin for compact organization</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Small Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-sm" color="primary">Compact content layout</Text>
                <Separator spacing="sm" />
                <Text variant="body-sm" color="secondary">Minimal spacing for dense information</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Medium Spacing (Default):</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-sm" color="primary">Standard content layout</Text>
                <Separator spacing="md" />
                <Text variant="body-sm" color="secondary">Balanced spacing for most campus content</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Large Spacing:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-sm" color="primary">Spacious content layout</Text>
                <Separator spacing="lg" />
                <Text variant="body-sm" color="secondary">Generous spacing for featured content sections</Text>
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
            Separator Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built separator components for common campus content organization patterns
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Academic Requirements</Text>
                <HorizontalSeparator />
                <Text variant="body-sm" color="secondary">Core CS courses, electives, and general education requirements</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center gap-3 h-12">
                  <Text variant="body-sm" color="primary">Fall 2024</Text>
                  <VerticalSeparator />
                  <Text variant="body-sm" color="secondary">Spring 2025</Text>
                  <VerticalSeparator />
                  <Text variant="body-sm" color="muted">Summer 2025</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Gradient Divider:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Course Description</Text>
                <GradientDivider />
                <Text variant="body-sm" color="secondary">Prerequisites and enrollment information</Text>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Decorative Separator:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Text variant="body-sm" color="primary">Visual enhancement only</Text>
                <Separator decorative />
                <Text variant="body-sm" color="secondary">No semantic meaning for screen readers</Text>
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
            Real Campus Separator Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Separator usage in actual University at Buffalo academic and administrative contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Catalog */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Catalog Organization:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-md" color="primary">
                  CSE 331 - Algorithm Analysis and Design
                </Text>
                <Separator />
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">
                      Course Information
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Credits: 4 • Prerequisites: CSE 250, MTH 241
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Offered: Fall, Spring • Format: Lecture + Recitation
                    </Text>
                  </div>
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">
                      Enrollment Details
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Available Sections: 3 • Total Capacity: 105 students
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      Registration: Open to CS majors and minors
                    </Text>
                  </div>
                </div>
                
                <Separator variant="dashed" />
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">
                    Course Description
                  </Text>
                  <Text variant="body-md" color="primary">
                    This course provides an introduction to the design and analysis of algorithms. Topics include asymptotic notation, recurrence relations, basic algorithmic paradigms such as divide-and-conquer, greedy, and dynamic programming. Graph algorithms and NP-completeness are also covered.
                  </Text>
                </div>
                
                <Separator variant="dotted" />
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">
                    Learning Outcomes
                  </Text>
                  <div className="space-y-2">
                    <Text variant="body-sm" color="secondary">
                      • Analyze time and space complexity of algorithms using asymptotic notation
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      • Design efficient algorithms using divide-and-conquer, greedy, and dynamic programming approaches
                    </Text>
                    <Text variant="body-sm" color="secondary">
                      • Implement and analyze fundamental graph algorithms
                    </Text>
                  </div>
                </div>
                
              </div>

            </div>
          </div>

          {/* Student Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Academic Dashboard:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              {/* Academic Progress */}
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Academic Progress - Fall 2024
                </Text>
                <Separator size="lg" />
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-2">
                    <Text variant="display-sm" color="emerald" weight="bold">3.75</Text>
                    <Text variant="body-sm" color="secondary">Current GPA</Text>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <VerticalSeparator size="lg" />
                  </div>
                  <div className="text-center space-y-2">
                    <Text variant="display-sm" color="primary" weight="bold">102</Text>
                    <Text variant="body-sm" color="secondary">Credits Completed</Text>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <VerticalSeparator size="lg" />
                  </div>
                  <div className="text-center space-y-2">
                    <Text variant="display-sm" color="gold" weight="bold">18</Text>
                    <Text variant="body-sm" color="secondary">Credits Remaining</Text>
                  </div>
                </div>
              </div>
              
              <GradientDivider />
              
              {/* Current Courses */}
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Current Enrollment
                </Text>
                <Separator variant="dashed" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Text variant="body-sm" color="primary" weight="medium">CSE 331</Text>
                    <div className="flex items-center gap-2">
                      <Text variant="body-xs" color="secondary">Section A1</Text>
                      <VerticalSeparator size="sm" />
                      <Text variant="body-xs" color="emerald">A- (92%)</Text>
                    </div>
                  </div>
                  <Separator spacing="sm" />
                  
                  <div className="flex items-center justify-between">
                    <Text variant="body-sm" color="primary" weight="medium">MTH 241</Text>
                    <div className="flex items-center gap-2">
                      <Text variant="body-xs" color="secondary">Section B2</Text>
                      <VerticalSeparator size="sm" />
                      <Text variant="body-xs" color="primary">B+ (88%)</Text>
                    </div>
                  </div>
                  <Separator spacing="sm" />
                  
                  <div className="flex items-center justify-between">
                    <Text variant="body-sm" color="primary" weight="medium">PHI 237</Text>
                    <div className="flex items-center gap-2">
                      <Text variant="body-xs" color="secondary">Section C1</Text>
                      <VerticalSeparator size="sm" />
                      <Text variant="body-xs" color="emerald">A (95%)</Text>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Event Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Event Details:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <Text as="h3" variant="heading-md" color="primary">
                CS Department Career Fair
              </Text>
              <Separator />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" color="gold" weight="medium">Event Details</Text>
                    <div className="space-y-1">
                      <Text variant="body-sm" color="secondary">
                        📅 Wednesday, December 20, 2024
                      </Text>
                      <Text variant="body-sm" color="secondary">
                        ⏰ 10:00 AM - 4:00 PM
                      </Text>
                      <Text variant="body-sm" color="secondary">
                        📍 Student Union Ballroom
                      </Text>
                    </div>
                  </div>
                  
                  <Separator variant="dotted" spacing="sm" />
                  
                  <div className="space-y-2">
                    <Text variant="body-sm" color="gold" weight="medium">Registration</Text>
                    <Text variant="body-sm" color="secondary">
                      Free for all UB students • RSVP required
                    </Text>
                    <Text variant="body-sm" color="emerald">
                      ✓ You are registered for this event
                    </Text>
                  </div>
                </div>
                
                <div className="hidden md:flex justify-center">
                  <VerticalSeparator />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" color="gold" weight="medium">Participating Companies</Text>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Text variant="body-sm" color="secondary">Google</Text>
                        <VerticalSeparator size="sm" />
                        <Text variant="body-xs" color="muted">SWE Internships</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Text variant="body-sm" color="secondary">Microsoft</Text>
                        <VerticalSeparator size="sm" />
                        <Text variant="body-xs" color="muted">Full-time & Internships</Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Text variant="body-sm" color="secondary">Meta</Text>
                        <VerticalSeparator size="sm" />
                        <Text variant="body-xs" color="muted">New Grad Positions</Text>
                      </div>
                    </div>
                  </div>
                  
                  <Separator variant="dotted" spacing="sm" />
                  
                  <div className="space-y-2">
                    <Text variant="body-sm" color="gold" weight="medium">What to Bring</Text>
                    <Text variant="body-sm" color="secondary">
                      Resume copies, portfolio examples, questions about roles and company culture
                    </Text>
                  </div>
                </div>
              </div>
              
              <GradientDivider />
              
              <div className="space-y-2">
                <Text variant="body-sm" color="gold" weight="medium">Important Notes</Text>
                <Text variant="body-sm" color="primary">
                  Professional dress recommended. Career Services will be available for resume reviews and interview preparation. Parking available in Parking Lot N with validation.
                </Text>
              </div>
              
            </div>
          </div>

          {/* Navigation Breadcrumbs */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Navigation Breadcrumbs:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="flex items-center gap-2 text-sm">
                <Text variant="body-sm" color="gold" weight="medium">HIVE</Text>
                <VerticalSeparator size="sm" />
                <Text variant="body-sm" color="secondary">Academics</Text>
                <VerticalSeparator size="sm" />
                <Text variant="body-sm" color="secondary">Computer Science</Text>
                <VerticalSeparator size="sm" />
                <Text variant="body-sm" color="secondary">Course Catalog</Text>
                <VerticalSeparator size="sm" />
                <Text variant="body-sm" color="primary" weight="medium">CSE 331</Text>
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
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    spacing: 'md',
    decorative: false,
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Separator Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different separator configurations
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Content above the separator
          </Text>
          <Separator {...args} />
          <Text variant="body-md" color="secondary">
            Content below the separator - showing visual organization for University at Buffalo campus content.
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};