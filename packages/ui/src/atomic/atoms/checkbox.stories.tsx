import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CheckboxEnhanced as Checkbox } from './checkbox-enhanced';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof Checkbox> = {
  title: '01-Atoms/Checkbox - COMPLETE DEFINITION',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: `
## ☑️ HIVE Checkbox - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive checkbox input system for University at Buffalo HIVE platform selections and preferences.

### 🎯 **COMPONENT EXCELLENCE**
- **2 Visual Variants** - Default and card layouts for different interface contexts
- **3 Size Options** - Small, medium, large for flexible form design
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states
- **Indeterminate State** - Partial selection support for complex hierarchies
- **Label & Description** - Rich labeling with secondary text support
- **Error States** - Validation feedback with semantic error styling
- **Accessibility Ready** - Proper ARIA labels, keyboard navigation, and screen reader support
- **Campus Interface** - Built for University at Buffalo student platform forms and selections

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform selections:
- **Course Preferences** - Course selection, schedule preferences, notification settings
- **Space Membership** - Space joining, privacy settings, notification preferences
- **Profile Settings** - Visibility controls, contact preferences, platform notifications
- **Tool Configuration** - Tool permissions, sharing settings, deployment options
- **Event Management** - RSVP options, reminder preferences, calendar integration
- **Academic Workflows** - Assignment submissions, group project coordination

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizing** - Minimum 44px touch targets for all variants
- **Responsive Design** - Adaptive sizing and spacing for mobile forms
- **Clear Visual States** - High contrast for accessibility and mobile visibility
- **Screen Reader Support** - Proper labeling and state announcements
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    variant: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Checkbox variant styling',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default checkbox showcase
export const Default: Story = {
  args: {
    label: 'Join CSE 331 Space',
    description: 'Receive notifications for assignments and discussions',
    size: 'md',
    variant: 'default',
    checked: false,
    disabled: false,
    onChange: action('checkbox-changed'),
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE checkbox system for University at Buffalo platform selections:
          </Text>
          <Checkbox {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive checkbox with label, description, and state management
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
      
      {/* Checkbox Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">☑️ CHECKBOX VARIANTS</Badge>
            Layout Variant Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            2 checkbox variants for different University at Buffalo HIVE platform interface contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Layout Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Default Layout (Compact):</Text>
                  <div className="space-y-3">
                    <Checkbox
                      label="Enable notifications"
                      description="Receive updates about space activity"
                      variant="primary"
                      onChange={action('default-compact')}
                    />
                    <Checkbox
                      label="Join study group"
                      description="Participate in CSE 331 algorithm study sessions"
                      variant="primary"
                      checked
                      onChange={action('default-compact-checked')}
                    />
                    <Checkbox
                      label="Share calendar availability"
                      description="Let group members see your free time"
                      variant="primary"
                      onChange={action('default-compact-calendar')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Compact layout for forms, settings, and preference lists
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Card Layout (Prominent):</Text>
                  <div className="space-y-3">
                    <Checkbox
                      label="Enable email notifications"
                      description="Receive daily digests of space activity and important updates"
                      variant="card"
                      onChange={action('card-prominent')}
                    />
                    <Checkbox
                      label="Auto-join course spaces"
                      description="Automatically join spaces for enrolled courses like CSE 331, CSE 250"
                      variant="card"
                      checked
                      onChange={action('card-prominent-checked')}
                    />
                    <Checkbox
                      label="Public profile visibility"
                      description="Allow other UB students to find and connect with your profile"
                      variant="card"
                      onChange={action('card-prominent-public')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Card layout for prominent settings, feature toggles, and onboarding choices
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Checkbox Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 CHECKBOX SIZES</Badge>
            Size Variations
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 checkbox sizes for different interface densities and responsive design
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (Compact):</Text>
                  <div className="space-y-2">
                    <Checkbox
                      size="sm"
                      label="Desktop notifications"
                      description="Browser notifications for messages"
                      onChange={action('small-desktop')}
                    />
                    <Checkbox
                      size="sm"
                      label="Mobile notifications"
                      description="Push notifications on mobile"
                      checked
                      onChange={action('small-mobile')}
                    />
                    <Checkbox
                      size="sm"
                      label="Email summaries"
                      description="Weekly activity digest"
                      onChange={action('small-email')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    16px checkbox - Compact size for dense interfaces, secondary preferences, and mobile layouts
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (Standard):</Text>
                  <div className="space-y-3">
                    <Checkbox
                      size="md"
                      label="Auto-save drafts"
                      description="Automatically save tool and post drafts"
                      onChange={action('medium-autosave')}
                    />
                    <Checkbox
                      size="md"
                      label="Profile visibility"
                      description="Show profile to other UB students"
                      checked
                      onChange={action('medium-visibility')}
                    />
                    <Checkbox
                      size="md"
                      label="Calendar integration"
                      description="Sync events with personal calendar"
                      onChange={action('medium-calendar')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    20px checkbox - Standard size for most forms, settings, and preference interfaces
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (Prominent):</Text>
                  <div className="space-y-3">
                    <Checkbox
                      size="lg"
                      label="Terms of Service"
                      description="I agree to the University at Buffalo HIVE platform terms and conditions"
                      onChange={action('large-terms')}
                    />
                    <Checkbox
                      size="lg"
                      label="Privacy Policy"
                      description="I understand how my academic and social data will be used"
                      checked
                      onChange={action('large-privacy')}
                    />
                    <Checkbox
                      size="lg"
                      label="Community Guidelines"
                      description="I agree to maintain respectful campus community interactions"
                      onChange={action('large-community')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    24px checkbox - Large size for important agreements, onboarding, and prominent feature toggles
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE STATES</Badge>
            Checkbox States and Error Handling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive states for user feedback, validation, and accessibility
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Standard States:</Text>
                  <div className="space-y-3">
                    <Checkbox
                      label="Unchecked state"
                      description="Default state for new options"
                      onChange={action('unchecked')}
                    />
                    <Checkbox
                      label="Checked state"
                      description="Selected option with confirmation"
                      checked
                      onChange={action('checked')}
                    />
                    <Checkbox
                      label="Indeterminate state"
                      description="Partial selection in hierarchical choices"
                      indeterminate
                      onChange={action('indeterminate')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Core checkbox states for selection, confirmation, and partial selection
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Disabled States:</Text>
                  <div className="space-y-3">
                    <Checkbox
                      label="Disabled unchecked"
                      description="Option not available for selection"
                      disabled
                      onChange={action('disabled-unchecked')}
                    />
                    <Checkbox
                      label="Disabled checked"
                      description="Required option that cannot be changed"
                      checked
                      disabled
                      onChange={action('disabled-checked')}
                    />
                    <Checkbox
                      label="Disabled indeterminate"
                      description="Partial selection in locked hierarchy"
                      indeterminate
                      disabled
                      onChange={action('disabled-indeterminate')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Disabled states for unavailable options and system-controlled settings
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="red" weight="medium">Error States:</Text>
                  <div className="space-y-3">
                    <Checkbox
                      label="Required selection"
                      description="You must agree to continue"
                      error="This field is required"
                      onChange={action('error-required')}
                    />
                    <Checkbox
                      label="Invalid configuration"
                      description="This option conflicts with other settings"
                      error="Cannot enable with current privacy settings"
                      checked
                      onChange={action('error-conflict')}
                    />
                    <Checkbox
                      label="Validation error"
                      description="Please review your selection"
                      error="Incompatible with university policy"
                      onChange={action('error-validation')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Error states for validation feedback and user guidance
                  </Text>
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
            Real Campus Checkbox Usage Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Checkbox usage in actual University at Buffalo student workflow and campus platform preference contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Course Registration Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Registration & Academic Preferences:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Fall 2024 Course Selection Preferences
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Course Enrollment:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Checkbox
                        variant="card"
                        label="Auto-join CSE 331 Space"
                        description="Automatically join the Algorithm Analysis course space when enrolled"
                        checked
                        onChange={action('auto-join-cse331')}
                      />
                      <Checkbox
                        variant="card"
                        label="Enable course notifications"
                        description="Receive updates about assignments, exams, and announcements"
                        checked
                        onChange={action('course-notifications')}
                      />
                      <Checkbox
                        variant="card"
                        label="Share study availability"
                        description="Let classmates see when you're available for group study"
                        onChange={action('study-availability')}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Resources:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Checkbox
                        variant="card"
                        label="Access lecture recordings"
                        description="Download and view recorded CSE 331 lectures and demos"
                        checked
                        onChange={action('lecture-recordings')}
                      />
                      <Checkbox
                        variant="card"
                        label="Sync with UB calendar"
                        description="Automatically add class schedules and assignment due dates"
                        onChange={action('ub-calendar-sync')}
                      />
                      <Checkbox
                        variant="card"
                        label="Email assignment reminders"
                        description="Get email notifications 24 hours before deadlines"
                        checked
                        onChange={action('assignment-reminders')}
                      />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Profile Privacy Settings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Profile Privacy & Visibility Settings:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Profile Visibility:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox
                      label="Show profile to UB students"
                      description="Let other University at Buffalo students find your profile"
                      checked
                      onChange={action('ub-student-visibility')}
                    />
                    <Checkbox
                      label="Display major and year"
                      description="Show Computer Science Senior on your profile"
                      checked
                      onChange={action('major-year-display')}
                    />
                    <Checkbox
                      label="Show course enrollment"
                      description="Display enrolled courses like CSE 331, CSE 250"
                      onChange={action('course-enrollment-display')}
                    />
                    <Checkbox
                      label="Public space membership"
                      description="Show which campus spaces you belong to"
                      onChange={action('space-membership-public')}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Contact Preferences:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox
                      label="Allow direct messages"
                      description="Let other students send you private messages"
                      checked
                      onChange={action('direct-messages')}
                    />
                    <Checkbox
                      label="Study group invitations"
                      description="Receive invitations to join study groups for your courses"
                      checked
                      onChange={action('study-group-invites')}
                    />
                    <Checkbox
                      label="Event notifications"
                      description="Get notified about campus events and activities"
                      onChange={action('event-notifications')}
                    />
                    <Checkbox
                      label="Tool collaboration requests"
                      description="Allow requests to collaborate on tools and projects"
                      checked
                      onChange={action('tool-collaboration')}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Residential Life Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Living & Community Settings:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Community:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox
                      size="sm"
                      label="Join floor space"
                      description="Ellicott Complex Floor 8"
                      checked
                      onChange={action('floor-space-join')}
                    />
                    <Checkbox
                      size="sm"
                      label="Floor event notifications"
                      description="Floor meetings and activities"
                      checked
                      onChange={action('floor-events')}
                    />
                    <Checkbox
                      size="sm"
                      label="Laundry alerts"
                      description="Notify when machines available"
                      onChange={action('laundry-alerts')}
                    />
                    <Checkbox
                      size="sm"
                      label="Package delivery alerts"
                      description="Mail center notifications"
                      checked
                      onChange={action('package-alerts')}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Activities:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox
                      size="sm"
                      label="UB Bulls athletics"
                      description="Game schedules and updates"
                      onChange={action('athletics-updates')}
                    />
                    <Checkbox
                      size="sm"
                      label="Student organization fairs"
                      description="Club recruitment events"
                      checked
                      onChange={action('org-fairs')}
                    />
                    <Checkbox
                      size="sm"
                      label="Homecoming activities"
                      description="Annual celebration events"
                      onChange={action('homecoming')}
                    />
                    <Checkbox
                      size="sm"
                      label="Spring Fest events"
                      description="End of semester celebrations"
                      checked
                      onChange={action('spring-fest')}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Support:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox
                      size="sm"
                      label="Tutoring center alerts"
                      description="Available tutoring sessions"
                      onChange={action('tutoring-alerts')}
                    />
                    <Checkbox
                      size="sm"
                      label="Library study room booking"
                      description="Lockwood Library reservations"
                      checked
                      onChange={action('library-booking')}
                    />
                    <Checkbox
                      size="sm"
                      label="Career fair notifications"
                      description="Job and internship fairs"
                      checked
                      onChange={action('career-fairs')}
                    />
                    <Checkbox
                      size="sm"
                      label="Research opportunities"
                      description="Faculty research positions"
                      onChange={action('research-opportunities')}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Tool & Platform Preferences */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Platform Tools & Collaboration:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Tool Building & Sharing Preferences
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Tool Creation:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Checkbox
                        variant="card"
                        label="Auto-save tool drafts"
                        description="Automatically save your tool building progress every 2 minutes"
                        checked
                        onChange={action('auto-save-tools')}
                      />
                      <Checkbox
                        variant="card"
                        label="Share tools publicly"
                        description="Make your tools discoverable by other UB students by default"
                        onChange={action('share-tools-public')}
                      />
                      <Checkbox
                        variant="card"
                        label="Enable tool analytics"
                        description="Track usage statistics and user feedback for your tools"
                        checked
                        onChange={action('tool-analytics')}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Collaboration:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <Checkbox
                        variant="card"
                        label="Accept collaboration requests"
                        description="Allow other students to request collaboration on your tools"
                        checked
                        onChange={action('collaboration-requests')}
                      />
                      <Checkbox
                        variant="card"
                        label="Tool deployment notifications"
                        description="Get notified when collaborators deploy or update shared tools"
                        onChange={action('deployment-notifications')}
                      />
                      <Checkbox
                        variant="card"
                        label="Version control integration"
                        description="Automatically create backups when making significant tool changes"
                        checked
                        onChange={action('version-control')}
                      />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Mobile Accessibility */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Usage:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized checkbox settings for on-campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mobile Notifications:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox
                      size="lg"
                      label="Push notifications"
                      description="Receive alerts on your mobile device while walking around campus"
                      checked
                      onChange={action('mobile-push')}
                    />
                    <Checkbox
                      size="lg"
                      label="Location-based alerts"
                      description="Get notifications when near relevant campus buildings or events"
                      onChange={action('location-alerts')}
                    />
                    <Checkbox
                      size="lg"
                      label="Offline access"
                      description="Download content for offline viewing during poor campus WiFi"
                      checked
                      onChange={action('offline-access')}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Actions:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Checkbox
                      size="lg"
                      label="Quick space joining"
                      description="Enable one-tap joining for course and community spaces"
                      checked
                      onChange={action('quick-join')}
                    />
                    <Checkbox
                      size="lg"
                      label="Fast tool access"
                      description="Show frequently used tools on mobile home screen"
                      onChange={action('fast-tools')}
                    />
                    <Checkbox
                      size="lg"
                      label="Campus map integration"
                      description="Show relevant spaces and events on UB campus map"
                      checked
                      onChange={action('campus-map')}
                    />
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
    label: 'Join Space',
    description: 'Receive notifications and updates',
    size: 'md',
    variant: 'default',
    checked: false,
    disabled: false,
    indeterminate: false,
    onChange: action('playground-changed'),
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Checkbox Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different checkbox configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Checkbox {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive checkbox testing for University at Buffalo HIVE platform interface design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};