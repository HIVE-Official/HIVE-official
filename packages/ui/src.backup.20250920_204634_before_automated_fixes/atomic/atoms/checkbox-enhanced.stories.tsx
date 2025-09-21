import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxPresets, CheckboxGroup, CheckboxCard } from './checkbox-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof Checkbox> = {
  title: '01-Atoms/Checkbox Enhanced - COMPLETE DEFINITION',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Checkbox Enhanced - Complete Component Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated checkbox selection system for University at Buffalo campus coordination and multi-option selection.

### 🏆 **COMPONENT EXCELLENCE**
- **5 Semantic Variants** - Default (gold fill), success, error, warning, info;
- **4 Size Options** - Small, default, large, XL with perfect mobile touch targets;
- **Advanced Features** - Indeterminate state, cards, groups, label positioning;
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication;
- **Gold Fill Brand** - Default variant uses gold fill for checked state (semantically correct)
- **Smart Accessibility** - ARIA compliant, keyboard navigation, screen reader support;
- **Campus Selection Ready** - Optimized for UB multi-option forms and preference selection;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo multi-selection and preference forms:
- **Course Selection** - Multiple course preferences, elective choices, schedule options;
- **Activity Registration** - Multiple club interests, event RSVPs, activity preferences;
- **Privacy Settings** - Multiple privacy controls, notification preferences;
- **Academic Planning** - Course requirements, graduation checklist, milestone tracking;
- **Space Coordination** - Multiple meeting times, location preferences, feature selections;
### 📱 **MOBILE OPTIMIZATION**
- **Touch Targets** - All sizes meet 44px minimum touch target requirements;
- **Thumb Selection** - Optimized for single-thumb multi-selection workflows;
- **Visual Feedback** - Clear checked/unchecked states with visual confirmation;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'Checkbox variant (default uses gold fill for checked state)',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Checkbox size (all optimized for mobile touch)',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'default', 'lg', 'full'],
      description: 'Border radius',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state for partial selection',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default checkbox showcase;
export const Default: Story = {
  args: {
    label: 'Enable study group notifications',
    description: 'Receive alerts when study groups form in your courses',
    variant: 'default',
    size: 'default',
    checked: true,
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
            Checkbox Variants - Perfect Semantic Token Usage;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 variants using 100% semantic tokens (default uses gold fill for checked state)
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Checkbox;
                label="Default (Gold Fill)"
                description="Gold fill indicates selected campus features"
                variant="default"
                checked={true}
              />
              <Checkbox;
                label="Success Selection"
                description="Indicates completed or validated choices"
                variant="success"
                checked={true}
              />
              <Checkbox;
                label="Error Selection"
                description="Used for critical or problematic options"
                variant="error"
                checked={false}
              />
            </div>
            <div className="space-y-4">
              <Checkbox;
                label="Warning Selection"
                description="Options that require attention or caution"
                variant="warning"
                checked={true}
              />
              <Checkbox;
                label="Info Selection"
                description="Informational options and secondary choices"
                variant="info"
                checked={false}
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
            Checkbox Sizes - Mobile-First Touch Optimization;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 sizes optimized for different campus coordination contexts;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Checkbox;
                  label="Small"
                  description="Compact forms"
                  size="sm"
                  variant="default"
                  checked={true}
                />
                <p className="text-xs text-[var(--hive-text-muted)]">SM: 16px × 16px</p>
              </div>
              <div className="space-y-3">
                <Checkbox;
                  label="Default"
                  description="Standard use"
                  size="default"
                  variant="default"
                  checked={true}
                />
                <p className="text-xs text-[var(--hive-text-muted)]">Default: 20px × 20px</p>
              </div>
              <div className="space-y-3">
                <Checkbox;
                  label="Large"
                  description="Prominent forms"
                  size="lg"
                  variant="default"
                  checked={true}
                />
                <p className="text-xs text-[var(--hive-text-muted)]">LG: 24px × 24px</p>
              </div>
              <div className="space-y-3">
                <Checkbox;
                  label="Extra Large"
                  description="Hero forms"
                  size="xl"
                  variant="default"
                  checked={true}
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
            Advanced Features - Indeterminate, Cards, Groups;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced checkbox features for enhanced campus coordination UX;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Indeterminate State */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Indeterminate State:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Checkbox;
                  label="Select All Study Materials"
                  description="Master checkbox for all study materials"
                  indeterminate={true}
                  variant="default"
                />
                <div className="ml-6 space-y-2">
                  <Checkbox label="Lecture Notes" checked={true} size="sm" />
                  <Checkbox label="Practice Problems" checked={true} size="sm" />
                  <Checkbox label="Video Recordings" checked={false} size="sm" />
                  <Checkbox label="Study Guides" checked={false} size="sm" />
                </div>
                <p className="text-xs text-[var(--hive-text-muted)] ml-6">
                  Indeterminate state shows partial selection of child items;
                </p>
              </div>
            </div>

            {/* Required Fields */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Required Selections:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <Checkbox;
                  label="Terms and Conditions"
                  description="You must agree to the terms to continue"
                  required;
                  variant="default"
                  checked={false}
                />
                <Checkbox;
                  label="Academic Honor Code"
                  description="Required for all UB course registrations"
                  required;
                  variant="default"
                  checked={true}
                />
              </div>
            </div>

            {/* Checkbox Groups */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Checkbox Groups:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <CheckboxGroup;
                  label="Notification Preferences"
                  description="Choose which notifications you want to receive"
                  orientation="vertical"
                  spacing="sm"
                >
                  <Checkbox label="Course updates" size="sm" checked={true} />
                  <Checkbox label="Assignment reminders" size="sm" checked={true} />
                  <Checkbox label="Grade notifications" size="sm" checked={false} />
                  <Checkbox label="Campus events" size="sm" checked={true} />
                </CheckboxGroup>
                
                <CheckboxGroup;
                  label="Privacy Settings"
                  description="Control your profile visibility"
                  orientation="vertical"
                  spacing="sm"
                >
                  <Checkbox label="Public profile" size="sm" checked={false} />
                  <Checkbox label="Show online status" size="sm" checked={true} />
                  <Checkbox label="Allow friend requests" size="sm" checked={true} />
                  <Checkbox label="Share academic info" size="sm" checked={false} />
                </CheckboxGroup>
              </div>
            </div>

            {/* Checkbox Cards */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Checkbox Cards:</h4>
              <div className="space-y-3">
                <CheckboxCard;
                  label="Campus Email Notifications"
                  description="Receive important campus updates, emergency alerts, and academic announcements via email"
                  icon={<span className="text-lg">📧</span>}
                  badge={<Badge variant="error" size="sm">Required</Badge>}
                  variant="default"
                  checked={true}
                />
                <CheckboxCard;
                  label="Study Group Coordination"
                  description="Get notified when study groups form in your courses and receive collaboration invites"
                  icon={<span className="text-lg">👥</span>}
                  badge={<Badge variant="success" size="sm">Academic</Badge>}
                  variant="default"
                  checked={true}
                />
                <CheckboxCard;
                  label="Social Event Updates"
                  description="Receive invitations to campus social events, club activities, and recreational programs"
                  icon={<span className="text-lg">🎉</span>}
                  badge={<Badge variant="info" size="sm">Social</Badge>}
                  variant="default"
                  checked={false}
                />
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Checkbox Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🎯 PRESETS</Badge>
            Checkbox Presets - Common Campus Patterns;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built checkbox components for common campus coordination scenarios;
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Common Presets:</h4>
              <div className="space-y-3">
                <CheckboxPresets.Terms checked={true} />
                <CheckboxPresets.Newsletter checked={false} />
                <CheckboxPresets.RememberMe checked={true} />
                <CheckboxPresets.SelectAll indeterminate={true} />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Custom Campus Checkboxes:</h4>
              <div className="space-y-3">
                <Checkbox;
                  label="UB Student Verification"
                  description="Verify your UB student status for access"
                  variant="default"
                  required;
                  checked={true}
                />
                <Checkbox;
                  label="Academic Integrity Pledge"
                  description="I agree to uphold UB's academic integrity standards"
                  variant="success"
                  required;
                  checked={true}
                />
                <Checkbox;
                  label="Campus Safety Notifications"
                  description="Emergency alerts and safety updates"
                  variant="error"
                  checked={true}
                />
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
            Real Campus Selection Scenarios;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Checkbox usage in actual University at Buffalo multi-selection and preference forms;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Registration Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration - Fall 2024:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <CheckboxGroup;
                label="Schedule Preferences"
                description="Select all acceptable time slots for your courses"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Morning classes (8am - 12pm)" size="sm" checked={false} />
                <Checkbox label="Afternoon classes (12pm - 5pm)" size="sm" checked={true} />
                <Checkbox label="Evening classes (5pm - 9pm)" size="sm" checked={true} />
                <Checkbox label="Weekend classes (Saturday)" size="sm" checked={false} />
              </CheckboxGroup>
              
              <CheckboxGroup;
                label="Course Format Preferences"
                description="Which course formats are you willing to take?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="In-person lectures" size="sm" checked={true} />
                <Checkbox label="Online synchronous" size="sm" checked={true} />
                <Checkbox label="Online asynchronous" size="sm" checked={false} />
                <Checkbox label="Hybrid format" size="sm" checked={true} />
              </CheckboxGroup>
              
              <CheckboxGroup;
                label="Required Course Selections"
                description="CSE 331 sections you can attend"
                required;
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Section A1 - MWF 10:00am (Dr. Smith)" size="sm" checked={true} />
                <Checkbox label="Section A2 - TTh 2:00pm (Dr. Smith)" size="sm" checked={true} />
                <Checkbox label="Section B1 - MWF 1:00pm (Prof. Johnson)" size="sm" checked={false} />
                <Checkbox label="Section B2 - TTh 11:00am (Prof. Johnson)" size="sm" checked={true} />
              </CheckboxGroup>
            </div>
          </div>

          {/* Residence Hall Application */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Residence Hall Application:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <CheckboxGroup;
                label="Housing Preferences (Select up to 3)"
                description="Rank your top choices for residence halls"
                orientation="vertical"
                spacing="sm"
              >
                <CheckboxCard;
                  label="Ellicott Complex"
                  description="Traditional residence halls, close to academic buildings, freshman-friendly community"
                  icon={<span className="text-lg">🏢</span>}
                  badge={<Badge variant="info" size="sm">Traditional</Badge>}
                  checked={true}
                />
                <CheckboxCard;
                  label="Hadley Village"
                  description="Apartment-style living, upper-class students, full kitchens and living areas"
                  icon={<span className="text-lg">🏠</span>}
                  badge={<Badge variant="success" size="sm">Apartment</Badge>}
                  checked={true}
                />
                <CheckboxCard;
                  label="Governors Complex"
                  description="Suite-style rooms, social atmosphere, shared common areas"
                  icon={<span className="text-lg">🏘️</span>}
                  badge={<Badge variant="primary" size="sm">Suite</Badge>}
                  checked={false}
                />
              </CheckboxGroup>
              
              <CheckboxGroup;
                label="Roommate Preferences"
                description="What are you looking for in a roommate?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Same major or similar academic interests" size="sm" checked={true} />
                <Checkbox label="Similar sleep schedule (early/late)" size="sm" checked={true} />
                <Checkbox label="Non-smoker" size="sm" checked={true} />
                <Checkbox label="Comfortable with guests" size="sm" checked={false} />
                <Checkbox label="Study together regularly" size="sm" checked={true} />
              </CheckboxGroup>
            </div>
          </div>

          {/* Campus Activity Registration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Activity Registration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <CheckboxGroup;
                label="Academic & Professional Interests"
                description="Select all areas that interest you"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Computer Science Student Association" size="sm" checked={true} />
                <Checkbox label="Engineering Student Council" size="sm" checked={true} />
                <Checkbox label="Business Student Association" size="sm" checked={false} />
                <Checkbox label="Pre-Med Society" size="sm" checked={false} />
                <Checkbox label="Debate Team" size="sm" checked={false} />
              </CheckboxGroup>
              
              <CheckboxGroup;
                label="Social & Recreational Activities"
                description="What social activities interest you?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Intramural sports leagues" size="sm" checked={true} />
                <Checkbox label="Greek life organizations" size="sm" checked={false} />
                <Checkbox label="Cultural clubs and organizations" size="sm" checked={true} />
                <Checkbox label="Volunteer and service groups" size="sm" checked={true} />
                <Checkbox label="Music and arts clubs" size="sm" checked={false} />
              </CheckboxGroup>
              
              <CheckboxGroup;
                label="Time Commitment Availability"
                description="How much time can you dedicate to activities?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Light commitment (2-4 hours/week)" size="sm" checked={true} />
                <Checkbox label="Moderate commitment (5-8 hours/week)" size="sm" checked={true} />
                <Checkbox label="Heavy commitment (9+ hours/week)" size="sm" checked={false} />
                <Checkbox label="Leadership positions" size="sm" checked={true} />
              </CheckboxGroup>
            </div>
          </div>

          {/* Study Group Formation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE 331 Study Group Formation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <CheckboxGroup;
                label="Study Topics (Select areas you need help with)"
                description="What topics do you want to focus on in study sessions?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Dynamic Programming algorithms" size="sm" checked={true} />
                <Checkbox label="Graph traversal (BFS/DFS)" size="sm" checked={true} />
                <Checkbox label="Time complexity analysis" size="sm" checked={false} />
                <Checkbox label="Divide and conquer strategies" size="sm" checked={true} />
                <Checkbox label="Greedy algorithms" size="sm" checked={false} />
                <Checkbox label="Exam preparation and practice problems" size="sm" checked={true} />
              </CheckboxGroup>
              
              <CheckboxGroup;
                label="Meeting Preferences"
                description="When and where would you prefer to meet?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Weekday evenings (6-9pm)" size="sm" checked={true} />
                <Checkbox label="Weekend afternoons (1-5pm)" size="sm" checked={true} />
                <Checkbox label="Library study rooms" size="sm" checked={true} />
                <Checkbox label="Virtual/online meetings" size="sm" checked={false} />
                <Checkbox label="Coffee shops on campus" size="sm" checked={false} />
              </CheckboxGroup>
              
              <CheckboxGroup;
                label="Collaboration Style"
                description="How do you prefer to study with others?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Work through problems together" size="sm" checked={true} />
                <Checkbox label="Teach and explain concepts to others" size="sm" checked={true} />
                <Checkbox label="Quiz each other on material" size="sm" checked={false} />
                <Checkbox label="Share notes and resources" size="sm" checked={true} />
              </CheckboxGroup>
            </div>
          </div>

          {/* Event Planning Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Hadley Village Floor Event Planning:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <CheckboxGroup;
                label="Event Ideas (Vote for your favorites)"
                description="What types of events would you attend?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Movie nights in the lounge" size="sm" checked={true} />
                <Checkbox label="Study break activities during finals" size="sm" checked={true} />
                <Checkbox label="Floor dinners and potlucks" size="sm" checked={false} />
                <Checkbox label="Game tournaments (video games, board games)" size="sm" checked={true} />
                <Checkbox label="Guest speakers and workshops" size="sm" checked={false} />
                <Checkbox label="Seasonal celebrations and holidays" size="sm" checked={true} />
              </CheckboxGroup>
              
              <CheckboxGroup;
                label="Availability for Planning"
                description="How would you like to contribute to events?"
                orientation="vertical"
                spacing="sm"
              >
                <Checkbox label="Help with event planning and organization" size="sm" checked={false} />
                <Checkbox label="Assist with setup and cleanup" size="sm" checked={true} />
                <Checkbox label="Contribute to food and supplies" size="sm" checked={true} />
                <Checkbox label="Promote events to other floor residents" size="sm" checked={true} />
              </CheckboxGroup>
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
    label: 'UB Campus Notifications',
    description: 'Receive updates about campus events and activities',
    variant: 'default',
    size: 'default',
    checked: true,
    indeterminate: false,
    required: false,
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Checkbox Enhanced Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different checkbox configurations;
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md">
            <Checkbox {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};