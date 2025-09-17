import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './text';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof Text> = {
  title: '01-Atoms/Text - COMPLETE DEFINITION',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Text - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated typography system for University at Buffalo campus content display and text hierarchy.

### 🏆 **COMPONENT EXCELLENCE**
- **14 Text Variants** - Display, heading, and body scales with perfect hierarchy
- **9 Semantic Colors** - Primary, secondary, muted, gold, ruby, emerald with semantic tokens
- **5 Weight Options** - Light to bold with perfect font weight progression
- **3 Alignment Options** - Left, center, right with responsive behavior
- **Semantic Elements** - H1-H6, P, Span, Div with proper HTML semantics
- **Perfect Semantic Tokens** - 100% semantic token usage for colors
- **Typography Scale** - Comprehensive scale from display 2XL to body 2XS
- **Campus Text Ready** - Optimized for UB content display and readability

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo content display and information hierarchy:
- **Academic Content** - Course descriptions, academic announcements, policy text
- **Campus Information** - Event details, department information, news articles
- **Student Communications** - Notifications, messages, updates, alerts
- **Interface Text** - Labels, descriptions, help text, form guidance
- **Navigation Text** - Menu items, breadcrumbs, section headers

### 📱 **MOBILE OPTIMIZATION**
- **Responsive Scaling** - Intelligent text scaling across device sizes
- **Reading Optimization** - Line heights and spacing optimized for mobile reading
- **Accessibility** - Screen reader friendly with proper semantic elements
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: 'HTML element to render',
    },
    variant: {
      control: 'select',
      options: [
        'display-2xl', 'display-xl', 'display-lg', 'display-md', 'display-sm',
        'heading-xl', 'heading-lg', 'heading-md', 'heading-sm',
        'body-lg', 'body-md', 'body-sm', 'body-xs', 'body-2xs'
      ],
      description: 'Text size and style variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'mutedLight', 'mutedDark', 'subtle', 'gold', 'ruby', 'emerald'],
      description: 'Text color (semantic tokens)',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// Default text showcase
export const Default: Story = {
  args: {
    as: 'p',
    variant: 'body-md',
    color: 'primary',
    children: 'Welcome to the University at Buffalo HIVE platform. This is your campus community hub for social utility and academic collaboration.',
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Typography Scale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ TYPOGRAPHY SCALE</Badge>
            Complete Typography Scale - Display to Body
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            14 carefully crafted text variants with perfect hierarchy and semantic token usage
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Display Scale */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Display Scale (Hero Text):</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text as="h1" variant="display-2xl" color="primary">
                  HIVE Platform
                </Text>
                <Text as="h1" variant="display-xl" color="primary">
                  Welcome to Campus
                </Text>
                <Text as="h2" variant="display-lg" color="secondary">
                  Connect • Collaborate • Create
                </Text>
                <Text as="h2" variant="display-md" color="gold">
                  University at Buffalo
                </Text>
                <Text as="h3" variant="display-sm" color="muted">
                  Your Academic Journey Starts Here
                </Text>
              </div>
            </div>

            {/* Heading Scale */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Heading Scale (Section Headers):</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text as="h1" variant="heading-xl" color="primary">
                  Course Registration - Spring 2025
                </Text>
                <Text as="h2" variant="heading-lg" color="secondary">
                  Available Computer Science Courses
                </Text>
                <Text as="h3" variant="heading-md" color="primary">
                  CSE 331 - Algorithm Analysis and Design
                </Text>
                <Text as="h4" variant="heading-sm" color="muted">
                  Prerequisites: CSE 250, MTH 241
                </Text>
              </div>
            </div>

            {/* Body Scale */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Body Scale (Content Text):</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text variant="body-lg" color="primary">
                  Large body text for prominent content descriptions and important announcements to the campus community.
                </Text>
                <Text variant="body-md" color="secondary">
                  Standard body text for general content, course descriptions, and regular campus communications.
                </Text>
                <Text variant="body-sm" color="muted">
                  Small body text for supplementary information, metadata, and secondary details.
                </Text>
                <Text variant="body-xs" color="muted">
                  Extra small text for captions, timestamps, and minimal supporting information.
                </Text>
                <Text variant="body-2xs" color="subtle">
                  Tiny text for legal disclaimers, copyright notices, and minimal interface elements.
                </Text>
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
            Text Colors - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            9 semantic colors using 100% semantic tokens for consistent theming
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Primary Colors:</h4>
              <div className="space-y-3">
                <Text color="primary" variant="body-md">
                  Primary - Main content text for headings and key information
                </Text>
                <Text color="secondary" variant="body-md">
                  Secondary - Supporting content and descriptive text
                </Text>
                <Text color="muted" variant="body-md">
                  Muted - Less important content and metadata
                </Text>
                <Text color="subtle" variant="body-md">
                  Subtle - Minimal interface text and disclaimers
                </Text>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Semantic Colors:</h4>
              <div className="space-y-3">
                <Text color="gold" variant="body-md" weight="semibold">
                  Gold - UB brand emphasis and achievements
                </Text>
                <Text color="emerald" variant="body-md" weight="medium">
                  Emerald - Success messages and positive status
                </Text>
                <Text color="ruby" variant="body-md" weight="medium">
                  Ruby - Error messages and critical alerts
                </Text>
                <Text color="mutedLight" variant="body-md">
                  Muted Light - Tertiary content and light backgrounds
                </Text>
                <Text color="mutedDark" variant="body-md">
                  Muted Dark - Quaternary content and dark emphasis
                </Text>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weight & Alignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ WEIGHTS & ALIGNMENT</Badge>
            Font Weights and Text Alignment Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 font weights and 3 alignment options for complete text styling control
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Font Weights */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Font Weights:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text variant="heading-md" weight="light" color="primary">
                    Light Weight - Elegant headers
                  </Text>
                  <Text variant="heading-md" weight="normal" color="primary">
                    Normal Weight - Standard text
                  </Text>
                  <Text variant="heading-md" weight="medium" color="primary">
                    Medium Weight - Emphasis
                  </Text>
                </div>
                <div className="space-y-3">
                  <Text variant="heading-md" weight="semibold" color="primary">
                    Semibold Weight - Strong emphasis
                  </Text>
                  <Text variant="heading-md" weight="bold" color="primary">
                    Bold Weight - Maximum emphasis
                  </Text>
                </div>
              </div>
            </div>

            {/* Text Alignment */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Alignment:</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text variant="body-md" align="left" color="primary">
                  Left aligned text is the default for most campus content and provides optimal readability for Western languages.
                </Text>
                <Text variant="body-md" align="center" color="secondary">
                  Center aligned text works well for headers, announcements, and featured content that needs emphasis.
                </Text>
                <Text variant="body-md" align="right" color="muted">
                  Right aligned text is useful for metadata, timestamps, and content that should align with right-side elements.
                </Text>
              </div>
            </div>

            {/* Truncation */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Truncation:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-3">
                <div className="max-w-xs">
                  <Text variant="body-md" color="primary" truncate>
                    This is a very long piece of text that will be truncated with an ellipsis when it exceeds the container width, which is useful for maintaining layout consistency in cards and lists.
                  </Text>
                </div>
                <p className="text-xs text-[var(--hive-text-tertiary)]">
                  ↑ Truncated text with ellipsis (max-width: 20rem)
                </p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* HTML Semantics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🏷️ HTML SEMANTICS</Badge>
            Semantic HTML Elements - Accessibility & SEO
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Proper HTML semantic elements for accessibility, SEO, and screen reader compatibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            {/* Headings */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Semantic Headings:</h4>
              <div className="space-y-3 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text as="h1" variant="heading-xl" color="primary">
                  H1 - Page Title (Computer Science Department)
                </Text>
                <Text as="h2" variant="heading-lg" color="secondary">
                  H2 - Section Header (Undergraduate Programs)
                </Text>
                <Text as="h3" variant="heading-md" color="primary">
                  H3 - Subsection (Bachelor of Science in Computer Science)
                </Text>
                <Text as="h4" variant="heading-sm" color="muted">
                  H4 - Sub-subsection (Curriculum Requirements)
                </Text>
                <Text as="h5" variant="body-lg" weight="semibold" color="primary">
                  H5 - Minor heading (Core Courses)
                </Text>
                <Text as="h6" variant="body-md" weight="medium" color="secondary">
                  H6 - Minimal heading (Course Prerequisites)
                </Text>
              </div>
            </div>

            {/* Content Elements */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Content Elements:</h4>
              <div className="space-y-4 bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <Text as="p" variant="body-md" color="primary">
                  <strong>Paragraph element</strong> - The Computer Science program at the University at Buffalo provides students with a comprehensive foundation in theoretical and practical aspects of computing.
                </Text>
                <Text as="span" variant="body-sm" color="gold" weight="medium">
                  Span element - Inline text for emphasis and special styling within larger content blocks.
                </Text>
                <Text as="div" variant="body-xs" color="muted">
                  Div element - Block-level text container for complex content layouts and styling needs.
                </Text>
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
            Real Campus Text Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Text component usage in actual University at Buffalo content and interface contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Content */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Course Listing:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              <Text as="h2" variant="heading-lg" color="primary">
                CSE 331 - Algorithm Analysis and Design
              </Text>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Text variant="body-sm" color="gold" weight="medium">
                    Credits: 4 • Prerequisites: CSE 250, MTH 241
                  </Text>
                  <Text variant="body-sm" color="muted">
                    Section A1: MWF 10:00-10:50am • Davis Hall 101
                  </Text>
                  <Text variant="body-sm" color="muted">
                    Instructor: Dr. Sarah Johnson • Available: 12/35
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text variant="body-xs" color="emerald" weight="medium">
                    ✓ Satisfies Computer Science Core Requirement
                  </Text>
                  <Text variant="body-xs" color="secondary">
                    Last updated: December 15, 2024
                  </Text>
                </div>
              </div>
              <Text variant="body-md" color="primary">
                This course provides an introduction to the design and analysis of algorithms. Topics include asymptotic notation, recurrence relations, basic algorithmic paradigms (divide-and-conquer, greedy, dynamic programming), graph algorithms, and NP-completeness.
              </Text>
            </div>
          </div>

          {/* Campus News Article */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus News Article:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              <Text as="h1" variant="display-md" color="primary">
                UB Engineering Students Win National Robotics Competition
              </Text>
              <div className="flex items-center gap-4">
                <Text variant="body-sm" color="gold" weight="medium">
                  Engineering News
                </Text>
                <Text variant="body-sm" color="muted">
                  December 18, 2024
                </Text>
                <Text variant="body-sm" color="secondary">
                  By Campus Communications
                </Text>
              </div>
              <Text variant="body-lg" color="primary" weight="medium">
                A team of University at Buffalo engineering students has taken first place in the National Autonomous Robotics Challenge, beating 47 other university teams from across the United States.
              </Text>
              <Text variant="body-md" color="secondary">
                The winning team, composed of students from the Computer Science and Engineering department, developed an innovative navigation system that allows robots to operate in complex environments without human intervention.
              </Text>
              <Text variant="body-md" color="primary">
                "This victory showcases the exceptional talent and dedication of our students," said Dr. Michael Chen, Chair of the Computer Science and Engineering Department. "Their innovative approach to autonomous navigation represents a significant advancement in robotics technology."
              </Text>
            </div>
          </div>

          {/* Student Profile Card */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Profile Information:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <Text as="h3" variant="heading-md" color="primary">
                  Alex Martinez
                </Text>
                <Text variant="body-sm" color="gold" weight="medium">
                  Class of 2025
                </Text>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Text variant="body-sm" color="secondary" weight="medium">
                    Major: Computer Science
                  </Text>
                  <Text variant="body-sm" color="secondary">
                    Minor: Mathematics, Business Administration
                  </Text>
                  <Text variant="body-sm" color="muted">
                    Residence: Hadley Village
                  </Text>
                </div>
                <div className="space-y-2">
                  <Text variant="body-sm" color="emerald" weight="medium">
                    GPA: 3.85 / 4.0
                  </Text>
                  <Text variant="body-sm" color="primary">
                    Credits: 102 / 120 (85% complete)
                  </Text>
                  <Text variant="body-sm" color="gold">
                    Dean's List: Fall 2023, Spring 2024
                  </Text>
                </div>
              </div>
              <Text variant="body-md" color="primary">
                Senior Computer Science student specializing in artificial intelligence and machine learning. Active member of the UB ACM chapter and lead developer for the campus sustainability app project.
              </Text>
            </div>
          </div>

          {/* System Notifications */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus System Notifications:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[var(--hive-status-success)] mt-2"></div>
                  <div className="space-y-1">
                    <Text variant="body-sm" color="emerald" weight="semibold">
                      Registration Successful
                    </Text>
                    <Text variant="body-sm" color="primary">
                      You've been successfully enrolled in CSE 331 Section A1.
                    </Text>
                    <Text variant="body-xs" color="muted">
                      2 minutes ago
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[var(--hive-status-warning)] mt-2"></div>
                  <div className="space-y-1">
                    <Text variant="body-sm" color="gold" weight="semibold">
                      Payment Required
                    </Text>
                    <Text variant="body-sm" color="primary">
                      Spring 2025 tuition payment is due January 15, 2025.
                    </Text>
                    <Text variant="body-xs" color="muted">
                      1 hour ago
                    </Text>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-[var(--hive-status-info)] mt-2"></div>
                  <div className="space-y-1">
                    <Text variant="body-sm" color="secondary" weight="semibold">
                      Campus Update
                    </Text>
                    <Text variant="body-sm" color="primary">
                      Lockwood Library will have extended hours during finals week.
                    </Text>
                    <Text variant="body-xs" color="muted">
                      3 hours ago
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interface Text Examples */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Interface Text & Guidance:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              {/* Form Labels */}
              <div className="space-y-3">
                <Text variant="body-sm" color="primary" weight="medium">
                  Email Address
                </Text>
                <div className="p-3 border border-[var(--hive-border-primary)] rounded-lg">
                  <Text variant="body-sm" color="muted">
                    your.email@buffalo.edu
                  </Text>
                </div>
                <Text variant="body-xs" color="muted">
                  Use your official UB email address for account verification
                </Text>
              </div>

              {/* Help Text */}
              <div className="space-y-2">
                <Text variant="body-sm" color="primary" weight="medium">
                  Password Requirements
                </Text>
                <div className="space-y-1">
                  <Text variant="body-xs" color="emerald">
                    ✓ At least 8 characters long
                  </Text>
                  <Text variant="body-xs" color="emerald">
                    ✓ Contains uppercase and lowercase letters
                  </Text>
                  <Text variant="body-xs" color="ruby">
                    ✗ Contains at least one number
                  </Text>
                  <Text variant="body-xs" color="muted">
                    • Contains at least one special character
                  </Text>
                </div>
              </div>

              {/* Legal Text */}
              <div className="border-t border-[var(--hive-border-tertiary)] pt-4">
                <Text variant="body-2xs" color="subtle" align="center">
                  By creating an account, you agree to the University at Buffalo Student Code of Conduct and acknowledge that you have read our Privacy Policy. This platform is intended for current UB students, faculty, and staff only.
                </Text>
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
    as: 'p',
    variant: 'body-md',
    color: 'primary',
    weight: 'normal',
    align: 'left',
    truncate: false,
    children: 'University at Buffalo HIVE platform text component showcase.',
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Text Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different text configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Text {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};