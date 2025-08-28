import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, InfoTooltip, DarkTooltip, LightTooltip, ClickTooltip } from './tooltip';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Button } from './button-enhanced';
import '../../hive-tokens.css';

const meta: Meta<typeof Tooltip> = {
  title: '01-Atoms/Tooltip - COMPLETE DEFINITION',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Tooltip - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated tooltip system for University at Buffalo campus contextual help and information display.

### 🏆 **COMPONENT EXCELLENCE**
- **3 Visual Variants** - Default, dark, light with perfect semantic token usage
- **4 Placement Options** - Top, bottom, left, right with smart positioning
- **3 Trigger Types** - Hover, click, focus with intelligent interaction handling
- **3 Size Options** - Small, medium, large with appropriate content sizing
- **Advanced Features** - Arrows, delays, outside click handling, accessibility
- **Perfect Semantic Tokens** - 100% semantic token usage for consistent theming
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support
- **Campus Context Ready** - Optimized for UB help text and information display

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo contextual information and help systems:
- **Academic Help** - Course requirement explanations, grade calculation details
- **Interface Guidance** - Form field help, navigation explanations, feature descriptions
- **Campus Information** - Building locations, department contacts, office hours
- **System Status** - Loading states, error explanations, success confirmations
- **Feature Discovery** - New feature highlights, capability explanations

### 📱 **MOBILE OPTIMIZATION**
- **Touch Friendly** - Click triggers optimized for mobile interaction
- **Responsive Sizing** - Content scaling appropriate for mobile screens
- **Smart Positioning** - Intelligent placement to avoid viewport edges
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement relative to trigger element',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
      description: 'How tooltip is triggered',
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tooltip size',
    },
    delay: {
      control: { type: 'range', min: 0, max: 1000, step: 50 },
      description: 'Delay before showing tooltip (ms)',
    },
    arrow: {
      control: 'boolean',
      description: 'Show pointing arrow',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

// Default tooltip showcase
export const Default: Story = {
  args: {
    content: 'This course requires MTH 241 and CSE 250 as prerequisites',
    placement: 'top',
    trigger: 'hover',
    variant: 'default',
    size: 'md',
    delay: 200,
    arrow: true,
    disabled: false,
  },
  render: (args) => (
    <div className="flex justify-center items-center h-32 p-6 bg-[var(--hive-background-primary)]">
      <Tooltip {...args}>
        <Button variant="secondary">
          CSE 331 Prerequisites
        </Button>
      </Tooltip>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Placement Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ PLACEMENT</Badge>
            Tooltip Placement - Smart Positioning
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 placement options with intelligent positioning relative to trigger elements
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center min-h-[200px] bg-[var(--hive-background-secondary)] rounded-lg relative">
            
            {/* Center reference */}
            <div className="text-center">
              <div className="w-4 h-4 bg-[var(--hive-brand-secondary)] rounded-full mx-auto mb-4"></div>
              <p className="text-sm text-[var(--hive-text-tertiary)]">Trigger Element</p>
            </div>

            {/* Top placement */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <Tooltip 
                content="Top placement tooltip for academic course information" 
                placement="top" 
                variant="primary"
              >
                <Button size="sm" variant="secondary">Top</Button>
              </Tooltip>
            </div>

            {/* Bottom placement */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <Tooltip 
                content="Bottom placement tooltip for supplementary details" 
                placement="bottom" 
                variant="primary"
              >
                <Button size="sm" variant="secondary">Bottom</Button>
              </Tooltip>
            </div>

            {/* Left placement */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2">
              <Tooltip 
                content="Left placement tooltip for contextual help" 
                placement="left" 
                variant="primary"
              >
                <Button size="sm" variant="secondary">Left</Button>
              </Tooltip>
            </div>

            {/* Right placement */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <Tooltip 
                content="Right placement tooltip for additional information" 
                placement="right" 
                variant="primary"
              >
                <Button size="sm" variant="secondary">Right</Button>
              </Tooltip>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Tooltip Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 visual variants using 100% semantic tokens for consistent theming
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Variant:</h4>
              <Tooltip 
                content="Default tooltip style with secondary background and primary text. Perfect for general campus information and help text." 
                variant="primary"
                placement="top"
              >
                <Button variant="primary">
                  Course Info
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                General purpose tooltip
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dark Variant:</h4>
              <Tooltip 
                content="Dark tooltip style with primary background for high contrast. Ideal for important notifications and system messages." 
                variant="dark"
                placement="top"
              >
                <Button variant="secondary">
                  System Status
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                High contrast tooltip
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Light Variant:</h4>
              <Tooltip 
                content="Light tooltip style with tertiary background for subtle information. Great for supplementary details and non-critical help." 
                variant="light"
                placement="top"
              >
                <Button variant="secondary">
                  Additional Info
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Subtle information tooltip
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Trigger Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ TRIGGERS</Badge>
            Trigger Types - Interaction Methods
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 trigger types for different campus interaction contexts and accessibility needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Hover Trigger:</h4>
              <Tooltip 
                content="Hover to see course prerequisites and enrollment requirements. This tooltip appears on mouse hover and focus for accessibility." 
                trigger="hover"
                delay={100}
              >
                <Button variant="primary">
                  Hover Me
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Default hover interaction
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Click Trigger:</h4>
              <ClickTooltip 
                content="Click to toggle detailed course information. Click outside or on the button again to close. Perfect for mobile devices."
                placement="top"
              >
                <Button variant="secondary">
                  Click Me
                </Button>
              </ClickTooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Mobile-friendly click interaction
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Focus Trigger:</h4>
              <Tooltip 
                content="Focus trigger shows tooltip when element receives keyboard focus. Essential for accessibility and keyboard navigation."
                trigger="focus"
              >
                <Button variant="secondary">
                  Focus Me
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Keyboard navigation accessible
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">📏 SIZES</Badge>
            Tooltip Sizes - Content Capacity
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes optimized for different content lengths and campus information types
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Small Size:</h4>
              <Tooltip 
                content="Short help text" 
                size="sm"
                placement="top"
              >
                <Button size="sm" variant="secondary">
                  Small Tooltip
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Brief information
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Medium Size:</h4>
              <Tooltip 
                content="Medium length tooltip with additional course details and enrollment information for students." 
                size="md"
                placement="top"
              >
                <Button variant="primary">
                  Medium Tooltip
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Standard information
              </p>
            </div>

            <div className="text-center space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Large Size:</h4>
              <Tooltip 
                content="Large tooltip capacity for comprehensive course descriptions, detailed prerequisites, semester availability, professor information, and complete enrollment requirements that students need to understand before registration." 
                size="lg"
                placement="top"
              >
                <Button size="lg" variant="secondary">
                  Large Tooltip
                </Button>
              </Tooltip>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                Detailed information
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="warning">🛠️ FEATURES</Badge>
            Advanced Features - Arrows, Delays, States
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced tooltip features for enhanced campus UX and accessibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Arrow Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Arrow Options:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center space-y-4">
                  <Tooltip 
                    content="Tooltip with arrow pointing to the trigger element for clear visual connection." 
                    arrow={true}
                    placement="top"
                  >
                    <Button variant="primary">
                      With Arrow
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    Clear visual connection
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <Tooltip 
                    content="Tooltip without arrow for cleaner, minimal appearance." 
                    arrow={false}
                    placement="top"
                  >
                    <Button variant="secondary">
                      Without Arrow
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    Minimal appearance
                  </p>
                </div>
              </div>
            </div>

            {/* Delay Options */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Delay Timing:</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-4">
                  <Tooltip 
                    content="Immediate tooltip (0ms delay) for instant feedback." 
                    delay={0}
                    placement="top"
                  >
                    <Button variant="primary">
                      Instant
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    0ms delay
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <Tooltip 
                    content="Standard delay (200ms) for normal interactions." 
                    delay={200}
                    placement="top"
                  >
                    <Button variant="secondary">
                      Standard
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    200ms delay
                  </p>
                </div>
                <div className="text-center space-y-4">
                  <Tooltip 
                    content="Slow delay (500ms) to prevent accidental triggers." 
                    delay={500}
                    placement="top"
                  >
                    <Button variant="secondary">
                      Slow
                    </Button>
                  </Tooltip>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">
                    500ms delay
                  </p>
                </div>
              </div>
            </div>

            {/* Disabled State */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Disabled State:</h4>
              <div className="text-center">
                <Tooltip 
                  content="This tooltip is disabled and will not appear." 
                  disabled={true}
                  placement="top"
                >
                  <Button variant="secondary" disabled>
                    Disabled Tooltip
                  </Button>
                </Tooltip>
                <p className="text-xs text-[var(--hive-text-tertiary)] mt-2">
                  Tooltip disabled for inactive elements
                </p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 PRESETS</Badge>
            Tooltip Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built tooltip components for common campus help and information scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Info Tooltip:</h4>
              <div className="text-center">
                <InfoTooltip 
                  content="General information tooltip using default styling for campus help text and feature explanations."
                  placement="top"
                >
                  <Button variant="primary">
                    Campus Info
                  </Button>
                </InfoTooltip>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Dark Tooltip:</h4>
              <div className="text-center">
                <DarkTooltip 
                  content="High-contrast dark tooltip for important system notifications and critical campus alerts."
                  placement="top"
                >
                  <Button variant="secondary">
                    System Alert
                  </Button>
                </DarkTooltip>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Light Tooltip:</h4>
              <div className="text-center">
                <LightTooltip 
                  content="Subtle light tooltip for supplementary campus information and non-critical help text."
                  placement="top"
                >
                  <Button variant="secondary">
                    Extra Details
                  </Button>
                </LightTooltip>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Click Tooltip:</h4>
              <div className="text-center">
                <ClickTooltip 
                  content="Click-triggered tooltip optimized for mobile campus interfaces and touch interactions."
                  placement="top"
                >
                  <Button variant="primary">
                    Mobile Friendly
                  </Button>
                </ClickTooltip>
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
            Real Campus Tooltip Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Tooltip usage in actual University at Buffalo academic and administrative contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Registration Help */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration Interface:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Course Selection:</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">CSE 331</span>
                      <Tooltip 
                        content="Algorithm Analysis and Design - Covers asymptotic notation, recurrence relations, divide-and-conquer, greedy algorithms, dynamic programming, and graph algorithms. Prerequisites: CSE 250 (Data Structures) and MTH 241 (Calculus III)."
                        size="lg"
                        placement="right"
                      >
                        <Button size="sm" variant="ghost">ℹ️</Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Section A1</span>
                      <Tooltip 
                        content="MWF 10:00-10:50am in Davis Hall 101. Instructor: Dr. Sarah Johnson. Available spots: 12/35. This section has historically high ratings for clear instruction."
                        placement="right"
                      >
                        <Button size="sm" variant="ghost">📍</Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-[var(--hive-status-warning)]">Waitlist</span>
                      <Tooltip 
                        content="Join the waitlist to be automatically enrolled if a spot opens. You'll be notified via email and UB mobile app. Waitlist position updates daily."
                        placement="right"
                        variant="primary"
                      >
                        <Button size="sm" variant="ghost">⏰</Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Registration Tools:</h5>
                  <div className="space-y-3">
                    <Tooltip 
                      content="Check if you meet all prerequisite requirements for this course. System will verify completion of CSE 250 and MTH 241 with minimum grades."
                      placement="left"
                      size="md"
                    >
                      <Button variant="secondary" size="sm">
                        Check Prerequisites
                      </Button>
                    </Tooltip>
                    <Tooltip 
                      content="View your current course schedule for time conflicts. Shows all enrolled courses, work schedule, and campus commitments to help avoid scheduling conflicts."
                      placement="left"
                      size="md"
                    >
                      <Button variant="secondary" size="sm">
                        View Schedule
                      </Button>
                    </Tooltip>
                    <ClickTooltip 
                      content="Get recommendations for courses that fit your schedule, major requirements, and academic interests. Based on your academic history and degree progress."
                      placement="left"
                      size="lg"
                    >
                      <Button variant="secondary" size="sm">
                        Course Recommendations
                      </Button>
                    </ClickTooltip>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Academic Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Dashboard:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold text-[var(--hive-text-primary)]">3.75</span>
                    <Tooltip 
                      content="Current semester GPA calculation based on enrolled courses. Includes all courses in progress with current grades. Final GPA will be calculated after final exams."
                      placement="top"
                      size="md"
                    >
                      <Button size="sm" variant="ghost">📊</Button>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-[var(--hive-text-secondary)]">Current GPA</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold text-[var(--hive-text-primary)]">102/120</span>
                    <Tooltip 
                      content="Credit hours completed toward graduation. You need 120 total credits including 40 upper-level credits (300/400 level). Currently 18 credits remaining."
                      placement="top"
                      size="md"
                    >
                      <Button size="sm" variant="ghost">🎓</Button>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-[var(--hive-text-secondary)]">Credits Completed</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold text-[var(--hive-status-success)]">Spring 2025</span>
                    <Tooltip 
                      content="Expected graduation date based on current course enrollment and degree progress. Complete remaining 18 credits to graduate on schedule."
                      placement="top"
                      size="md"
                    >
                      <Button size="sm" variant="ghost">📅</Button>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-[var(--hive-text-secondary)]">Expected Graduation</p>
                </div>
              </div>

            </div>
          </div>

          {/* Campus Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Services Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Academic Resources:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Lockwood Library</span>
                      <Tooltip 
                        content="Main library with study spaces, computer labs, and research assistance. Open 24/7 during finals week. Current capacity: 847/1200 students."
                        placement="right"
                        size="md"
                      >
                        <Button size="sm" variant="ghost">📚</Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Math Tutoring</span>
                      <Tooltip 
                        content="Free tutoring for all math courses in Mathematics Learning Center (Math Building, Room 140). Walk-in hours: Mon-Fri 9am-5pm. No appointment needed."
                        placement="right"
                        size="md"
                      >
                        <Button size="sm" variant="ghost">🧮</Button>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Writing Center</span>
                      <Tooltip 
                        content="One-on-one writing consultations for any assignment or project. Located in Baldy Hall. Schedule appointments online through UB Connects."
                        placement="right"
                        size="md"
                      >
                        <Button size="sm" variant="ghost">✍️</Button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Campus Life:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Student Union</span>
                      <DarkTooltip 
                        content="Hub for dining, events, and student organizations. Food court open until 10pm. Student organization offices on 3rd floor. Event space bookings through UB Events."
                        placement="right"
                        size="md"
                      >
                        <Button size="sm" variant="ghost">🏢</Button>
                      </DarkTooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Recreation Center</span>
                      <LightTooltip 
                        content="Fitness facilities, group classes, and intramural sports. Current hours: 6am-11pm weekdays, 8am-10pm weekends. Towel service available."
                        placement="right"
                        size="md"
                      >
                        <Button size="sm" variant="ghost">💪</Button>
                      </LightTooltip>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Health Services</span>
                      <Tooltip 
                        content="Michael Hall Health Center provides medical care, mental health counseling, and wellness programs. Emergency care available 24/7. Appointments recommended."
                        placement="right"
                        size="md"
                        variant="primary"
                      >
                        <Button size="sm" variant="ghost">🏥</Button>
                      </Tooltip>
                    </div>
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

// Interactive playground
export const Playground: Story = {
  args: {
    content: 'University at Buffalo campus tooltip with helpful information',
    placement: 'top',
    trigger: 'hover',
    variant: 'default',
    size: 'md',
    delay: 200,
    arrow: true,
    disabled: false,
  },
  render: (args) => (
    <div className="flex justify-center items-center h-48 p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Tooltip Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different tooltip configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Tooltip {...args}>
            <Button variant="primary">
              UB Campus Tooltip
            </Button>
          </Tooltip>
        </CardContent>
      </Card>
    </div>
  ),
};