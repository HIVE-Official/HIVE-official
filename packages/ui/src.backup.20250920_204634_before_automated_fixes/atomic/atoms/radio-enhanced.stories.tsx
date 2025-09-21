import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioPresets, RadioGroup, RadioCard } from './radio-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof Radio> = {
  title: '01-Atoms/Radio Enhanced - COMPLETE DEFINITION',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Radio Enhanced - Complete Component Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated radio selection system for University at Buffalo campus single-choice selection and preferences.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Semantic Variants** - Default (gold fill), success, error, warning, info;
- **4 Size Options** - Small, default, large, XL with perfect mobile touch targets;
- **Advanced Features** - Radio groups, cards, horizontal/vertical layouts;
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication;
- **Gold Fill Brand** - Default variant uses gold fill for selected state (semantically correct)
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support;
- **Campus Choice Ready** - Optimized for UB single-choice forms and preference selection;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo single-choice selection and preference forms:
- **Course Selection** - Single course section, professor choice, time slot selection;
- **Housing Preferences** - Single residence hall, room type, meal plan selection;
- **Academic Planning** - Single major selection, graduation term, advisor choice;
- **Event Registration** - Single event session, workshop track, time preference;
- **Profile Settings** - Single privacy level, notification frequency, theme choice;
### 📱 **MOBILE OPTIMIZATION**
- **Touch Targets** - All sizes meet 44px minimum touch target requirements;
- **Thumb Selection** - Optimized for single-thumb selection workflows;
- **Visual Feedback** - Clear selected/unselected states with visual confirmation;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'Radio variant (default uses gold fill for selected state)',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Radio size (all optimized for mobile touch)',
    },
    checked: {
      control: 'boolean',
      description: 'Selected state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

// Default radio showcase;
export const Default: Story = {
  args: {
    label: 'Enable push notifications',
    description: 'Receive real-time updates about your campus activities',
    variant: 'default',
    size: 'default',
    checked: true,
    name: 'notifications',
    value: 'push',
  },
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">✅ VARIANTS</Badge>
            Radio Variants - Perfect Semantic Token Usage;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 variants using 100% semantic tokens (default uses gold fill for selected state)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Radio;
                label="Default (Gold Fill)"
                description="Gold fill indicates selected campus preferences"
                variant="default"
                checked={true}
                name="variant-demo-1"
                value="default"
              />
              <Radio;
                label="Success Selection"
                description="Indicates confirmed or validated choices"
                variant="success"
                checked={true}
                name="variant-demo-2"
                value="success"
              />
              <Radio;
                label="Error Selection"
                description="Used for critical or problematic options"
                variant="error"
                checked={false}
                name="variant-demo-3"
                value="error"
              />
            </div>
            <div className="space-y-4">
              <Radio;
                label="Warning Selection"
                description="Options that require attention or caution"
                variant="warning"
                checked={true}
                name="variant-demo-4"
                value="warning"
              />
              <Radio;
                label="Info Selection"
                description="Informational options and secondary choices"
                variant="info"
                checked={false}
                name="variant-demo-5"
                value="info"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            Radio Sizes - Mobile-First Touch Optimization;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 sizes optimized for different campus coordination contexts;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Radio;
                  label="Small"
                  description="Compact forms"
                  size="sm"
                  variant="default"
                  checked={true}
                  name="size-demo-1"
                  value="sm"
                />
                <p className="text-xs text-[var(--hive-text-muted)]">SM: 16px × 16px</p>
              </div>
              <div className="space-y-3">
                <Radio;
                  label="Default"
                  description="Standard use"
                  size="default"
                  variant="default"
                  checked={true}
                  name="size-demo-2"
                  value="default"
                />
                <p className="text-xs text-[var(--hive-text-muted)]">Default: 20px × 20px</p>
              </div>
              <div className="space-y-3">
                <Radio;
                  label="Large"
                  description="Prominent forms"
                  size="lg"
                  variant="default"
                  checked={true}
                  name="size-demo-3"
                  value="lg"
                />
                <p className="text-xs text-[var(--hive-text-muted)]">LG: 24px × 24px</p>
              </div>
              <div className="space-y-3">
                <Radio;
                  label="Extra Large"
                  description="Hero forms"
                  size="xl"
                  variant="default"
                  checked={true}
                  name="size-demo-4"
                  value="xl"
                />
                <p className="text-xs text-[var(--hive-text-muted)]">XL: 28px × 28px</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ FEATURES</Badge>
            Advanced Features - Groups, Cards, Layouts;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced radio features for enhanced campus choice selection UX;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Radio Groups - Vertical */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Vertical Radio Groups:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <RadioGroup;
                  name="notification-frequency"
                  value="daily"
                  label="Notification Frequency"
                  description="How often do you want to receive updates?"
                  orientation="vertical"
                  spacing="sm"
                >
                  <Radio value="immediate" label="Immediate" description="Get notified right away" />
                  <Radio value="hourly" label="Hourly Digest" description="Summary every hour" />
                  <Radio value="daily" label="Daily Summary" description="Once per day overview" />
                  <Radio value="weekly" label="Weekly Report" description="Weekly comprehensive report" />
                </RadioGroup>
                
                <RadioGroup;
                  name="privacy-level"
                  value="friends"
                  label="Privacy Level"
                  description="Who can see your campus activity?"
                  orientation="vertical"
                  spacing="sm"
                >
                  <Radio value="public" label="Public" description="Visible to all UB students" />
                  <Radio value="friends" label="Friends Only" description="Only your connections" />
                  <Radio value="private" label="Private" description="Only you can see" />
                  <Radio value="ghost" label="Ghost Mode" description="Invisible to others" />
                </RadioGroup>
              </div>
            </div>

            {/* Radio Groups - Horizontal */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Horizontal Radio Groups:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
                <RadioGroup;
                  name="theme-preference"
                  value="auto"
                  label="Theme Preference"
                  description="Choose your preferred interface theme"
                  orientation="horizontal"
                  spacing="lg"
                >
                  <Radio value="light" label="Light" />
                  <Radio value="dark" label="Dark" />
                  <Radio value="auto" label="Auto" />
                </RadioGroup>
                
                <RadioGroup;
                  name="text-size"
                  value="medium"
                  label="Text Size"
                  description="Select your preferred text size"
                  orientation="horizontal"
                  spacing="md"
                >
                  <Radio value="small" label="Small" size="sm" />
                  <Radio value="medium" label="Medium" size="default" />
                  <Radio value="large" label="Large" size="lg" />
                </RadioGroup>
              </div>
            </div>

            {/* Radio Cards */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Radio Cards:</h4>
              <RadioGroup;
                name="residence-hall"
                value="hadley"
                label="Residence Hall Preference"
                description="Select your preferred residence hall for next year"
                orientation="vertical"
                spacing="sm"
              >
                <RadioCard;
                  value="ellicott"
                  label="Ellicott Complex"
                  description="Traditional residence halls with shared bathrooms. Close to academic buildings and dining halls. Great for first-year students."
                  icon={<span className="text-lg">🏢</span>}
                  badge={<Badge variant="info" size="sm">Traditional</Badge>}
                />
                <RadioCard;
                  value="hadley"
                  label="Hadley Village"
                  description="Apartment-style living with full kitchens and living areas. Perfect for upper-class students seeking independence."
                  icon={<span className="text-lg">🏠</span>}
                  badge={<Badge variant="success" size="sm">Apartment</Badge>}
                />
                <RadioCard;
                  value="governors"
                  label="Governors Complex"
                  description="Suite-style rooms with shared common areas. Balance between traditional and apartment living."
                  icon={<span className="text-lg">🏘️</span>}
                  badge={<Badge variant="primary" size="sm">Suite</Badge>}
                />
              </RadioGroup>
            </div>

            {/* Required Selection */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Required Selection:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <RadioGroup;
                  name="graduation-term"
                  value=""
                  label="Expected Graduation Term"
                  description="When do you plan to graduate? (Required for academic planning)"
                  required;
                  error="Please select your expected graduation term"
                  orientation="vertical"
                  spacing="sm"
                >
                  <Radio value="fall-2024" label="Fall 2024" description="December 2024" />
                  <Radio value="spring-2025" label="Spring 2025" description="May 2025" />
                  <Radio value="summer-2025" label="Summer 2025" description="August 2025" />
                  <Radio value="fall-2025" label="Fall 2025" description="December 2025" />
                </RadioGroup>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Radio Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎯 PRESETS</Badge>
            Radio Presets - Common Campus Patterns;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built radio components for common campus single-choice scenarios;
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Priority Selection:</h4>
              <RadioPresets.Priority;
                name="task-priority"
                value="medium"
                label="Assignment Priority"
                description="How urgent is this assignment?"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Selection:</h4>
              <RadioPresets.Size;
                name="group-size"
                value="md"
                label="Study Group Size"
                description="Preferred group size for collaboration"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Theme Selection:</h4>
              <RadioPresets.Theme;
                name="interface-theme"
                value="auto"
                label="Interface Theme"
                description="Choose your preferred visual theme"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Payment Method:</h4>
              <RadioPresets.PaymentMethod;
                name="payment-method"
                value="card"
                label="Payment Method"
                description="How would you like to pay?"
                options={[
                  { value: 'card', label: 'Credit Card', icon: <span>💳</span> },
                  { value: 'paypal', label: 'PayPal', icon: <span>📱</span> },
                  { value: 'campus', label: 'Campus Card', icon: <span>🎓</span> },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Single-Choice Scenarios;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Radio usage in actual University at Buffalo single-choice selection and preference forms;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Section Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 Section Selection:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup;
                name="cse331-section"
                value="section-a2"
                label="Choose Your CSE 331 Section"
                description="Select one section that fits your schedule"
                required;
                orientation="vertical"
                spacing="sm"
              >
                <RadioCard;
                  value="section-a1"
                  label="Section A1 - Dr. Smith"
                  description="MWF 10:00am - 10:50am • Davis Hall 101 • Available spots: 5/35"
                  icon={<span className="text-lg">👨‍🏫</span>}
                  badge={<Badge variant="warning" size="sm">Almost Full</Badge>}
                />
                <RadioCard;
                  value="section-a2"
                  label="Section A2 - Dr. Smith"
                  description="TTh 2:00pm - 3:20pm • Knox Hall 20 • Available spots: 12/35"
                  icon={<span className="text-lg">👨‍🏫</span>}
                  badge={<Badge variant="success" size="sm">Available</Badge>}
                />
                <RadioCard;
                  value="section-b1"
                  label="Section B1 - Prof. Johnson"
                  description="MWF 1:00pm - 1:50pm • Capen Hall 134 • Available spots: 8/35"
                  icon={<span className="text-lg">👩‍🏫</span>}
                  badge={<Badge variant="success" size="sm">Available</Badge>}
                />
                <RadioCard;
                  value="section-b2"
                  label="Section B2 - Prof. Johnson"
                  description="TTh 11:00am - 12:20pm • Davis Hall 101 • Available spots: 0/35"
                  icon={<span className="text-lg">👩‍🏫</span>}
                  badge={<Badge variant="error" size="sm">Full</Badge>}
                  disabled;
                />
              </RadioGroup>
            </div>
          </div>

          {/* Meal Plan Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Meal Plan Selection:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup;
                name="meal-plan"
                value="unlimited"
                label="Choose Your Meal Plan"
                description="Select the meal plan that best fits your lifestyle"
                required;
                orientation="vertical"
                spacing="sm"
              >
                <RadioCard;
                  value="unlimited"
                  label="Unlimited Meal Plan"
                  description="Unlimited access to all dining halls, 400 dining dollars per semester. Perfect for students who eat most meals on campus."
                  icon={<span className="text-lg">🍽️</span>}
                  badge={<Badge variant="primary" size="sm">Most Popular</Badge>}
                />
                <RadioCard;
                  value="14-meals"
                  label="14 Meals Per Week"
                  description="14 meals per week plus 300 dining dollars. Good balance for students who occasionally eat off-campus."
                  icon={<span className="text-lg">📅</span>}
                  badge={<Badge variant="success" size="sm">Balanced</Badge>}
                />
                <RadioCard;
                  value="10-meals"
                  label="10 Meals Per Week"
                  description="10 meals per week plus 200 dining dollars. Ideal for students with lighter eating schedules."
                  icon={<span className="text-lg">🥪</span>}
                  badge={<Badge variant="info" size="sm">Light</Badge>}
                />
                <RadioCard;
                  value="declining-balance"
                  label="Declining Balance Only"
                  description="500 dining dollars per semester, no meal swipes. Maximum flexibility for upperclass students."
                  icon={<span className="text-lg">💰</span>}
                  badge={<Badge variant="secondary" size="sm">Flexible</Badge>}
                />
              </RadioGroup>
            </div>
          </div>

          {/* Academic Advisor Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Advisor Assignment:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup;
                name="advisor-preference"
                value="cs-focus"
                label="Advisor Specialization Preference"
                description="Choose an advisor based on your academic interests"
                required;
                orientation="vertical"
                spacing="sm"
              >
                <Radio;
                  value="cs-focus"
                  label="Computer Science Focus"
                  description="Specializes in CS curriculum, graduate school prep, and tech industry career guidance"
                />
                <Radio;
                  value="research-focus"
                  label="Research & Graduate School"
                  description="Expertise in research opportunities, PhD preparation, and academic career paths"
                />
                <Radio;
                  value="industry-focus"
                  label="Industry & Internships"
                  description="Strong connections with tech companies, internship placement, and industry networking"
                />
                <Radio;
                  value="interdisciplinary"
                  label="Interdisciplinary Studies"
                  description="Experience with double majors, minors, and cross-department collaboration"
                />
              </RadioGroup>
            </div>
          </div>

          {/* Graduation Ceremony Participation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Graduation Ceremony Participation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup;
                name="graduation-ceremony"
                value=""
                label="Graduation Ceremony Plans"
                description="Will you participate in the graduation ceremony?"
                required;
                orientation="vertical"
                spacing="sm"
              >
                <RadioCard;
                  value="attending"
                  label="Yes, I will attend"
                  description="Participate in the full graduation ceremony with cap and gown. Includes professional photos and diploma presentation."
                  icon={<span className="text-lg">🎓</span>}
                  badge={<Badge variant="success" size="sm">Traditional</Badge>}
                />
                <RadioCard;
                  value="virtual"
                  label="Virtual participation only"
                  description="Watch the ceremony online and receive diploma by mail. Name will still be announced during virtual ceremony."
                  icon={<span className="text-lg">💻</span>}
                  badge={<Badge variant="info" size="sm">Remote</Badge>}
                />
                <RadioCard;
                  value="not-attending"
                  label="No, I will not participate"
                  description="Skip the ceremony entirely. Diploma will be mailed to your address on file after degree conferral."
                  icon={<span className="text-lg">📮</span>}
                  badge={<Badge variant="secondary" size="sm">Mail Only</Badge>}
                />
              </RadioGroup>
            </div>
          </div>

          {/* Study Space Preference */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Preferred Study Environment:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <RadioGroup;
                name="study-environment"
                value="library"
                label="Where do you study best?"
                description="Help us recommend the best study spaces for you"
                orientation="vertical"
                spacing="sm"
              >
                <Radio;
                  value="library"
                  label="Quiet Library Spaces"
                  description="Lockwood Library silent floors, Capen quiet study areas"
                />
                <Radio;
                  value="collaborative"
                  label="Collaborative Study Areas"
                  description="Group study rooms, Student Union collaborative spaces"
                />
                <Radio;
                  value="cafe"
                  label="Coffee Shops & Cafes"
                  description="Starbucks, Tim Hortons, campus cafes with background noise"
                />
                <Radio;
                  value="dorm"
                  label="Residence Hall Study Lounges"
                  description="Floor study lounges, residence hall quiet areas"
                />
                <Radio;
                  value="outdoor"
                  label="Outdoor Spaces (Weather Permitting)"
                  description="Campus quads, outdoor seating areas, fresh air study spots"
                />
              </RadioGroup>
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
    label: 'UB Campus Notification Preference',
    description: 'Choose how you want to receive campus updates',
    variant: 'default',
    size: 'default',
    checked: true,
    name: 'campus-notifications',
    value: 'immediate',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Radio Enhanced Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different radio configurations;
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Radio {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};