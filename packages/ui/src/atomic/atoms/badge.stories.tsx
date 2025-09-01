import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge, RecognitionBadges } from './badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import '../../hive-tokens.css';

// Import icon components from badge for story usage
const CrownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m2 20 3-3.5L8.5 20l3.5-4L16 20l3-3.5L22 20H2ZM7 4l2.5 5L12 4l2.5 5L17 4" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22,4 12,14.01 9,11.01" />
  </svg>
);

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5.39-1.61" />
    <path d="M2 2l20 20" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55.47.98.97 1.21C11.25 18.48 11.61 18.9 12 19.34c.39-.44.75-.86 1.03-1.13.5-.23.97-.66.97-1.21v-2.34" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const FlameIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

const BookIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const UsersIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);

const CodeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,18 22,12 16,6" />
    <polyline points="8,6 2,12 8,18" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const HeartIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const meta: Meta<typeof Badge> = {
  title: '01-Atoms/Badge - COMPLETE DEFINITION',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Badge - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated badge system for University at Buffalo campus coordination and status indication.

### 🏆 **COMPONENT EXCELLENCE**
- **15+ Badge Variants** - 7 core system + 8 HIVE recognition variants for comprehensive campus social status
- **Recognition System** - Builder, verified, leader, achievement, streak, scholar, connector, and role-specific badges
- **3 Size Options** - Small, medium, large with perfect mobile touch compatibility
- **Advanced Features** - Dot indicators, count badges with overflow handling, preset components
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication for all variants
- **Gold Outline Primary** - Brand badge uses gold outline only (never fill)
- **Icon Integration** - Built-in icon support with preset recognition badge components
- **Campus Context Ready** - Perfect for University at Buffalo student status, role, and coordination indicators

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo student coordination:
- **Student Roles** - "Group Leader", "Builder", "RA", "Tutor"
- **Space Status** - "Active", "Study Session", "Event", "Private"
- **Academic Indicators** - "CSE Major", "Honor Student", "Dean's List"
- **Activity Counts** - Notification counts, member counts, RSVP counts
- **Availability Status** - "Available", "Busy", "In Class", "Office Hours"
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary', 'secondary', 'success', 'warning', 'error', 'info', 'ghost',
        'builder', 'verified', 'leader', 'ghost-mode',
        'achievement', 'streak', 'scholar', 'connector',
        'dean', 'developer', 'organizer', 'helper'
      ],
      description: 'Badge variant (primary uses gold outline only)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    dot: {
      control: 'boolean',
      description: 'Show as dot indicator with text',
    },
    count: {
      control: 'number',
      description: 'Show as count badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// Default badge showcase
export const Default: Story = {
  args: {
    children: 'Group Leader',
    variant: 'primary',
    size: 'md',
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Core System Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ CORE SYSTEM</Badge>
            Core Badge Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            7 core system variants using 100% semantic tokens (primary uses gold outline only)
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Badge variant="primary">Gold Outline (Primary)</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="emerald">Success</Badge>
            <Badge variant="gold">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
        </CardContent>
      </Card>

      {/* HIVE Recognition System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="builder">🏆 HIVE RECOGNITION</Badge>
            HIVE Recognition Badge System
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Comprehensive recognition system for University at Buffalo campus community building
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Platform Recognition:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="builder" icon={<CrownIcon />}>Builder</Badge>
                  <Badge variant="verified" icon={<CheckCircleIcon />}>Verified</Badge>
                  <Badge variant="leader" icon={<StarIcon />}>Leader</Badge>
                  <Badge variant="ghost-mode" icon={<EyeOffIcon />}>Ghost Mode</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Achievement Recognition:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="achievement" icon={<TrophyIcon />}>Achievement</Badge>
                  <Badge variant="streak" icon={<FlameIcon />}>7 day streak</Badge>
                  <Badge variant="scholar" icon={<BookIcon />}>Scholar</Badge>
                  <Badge variant="connector" icon={<UsersIcon />}>Connector</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Custom Role Recognition:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="dean" icon={<GraduationCapIcon />}>Dean's List</Badge>
                  <Badge variant="developer" icon={<CodeIcon />}>Developer</Badge>
                  <Badge variant="organizer" icon={<CalendarIcon />}>Event Organizer</Badge>
                  <Badge variant="helper" icon={<HeartIcon />}>Community Helper</Badge>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Recognition Badge Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎯 PRESET COMPONENTS</Badge>
            Recognition Badge Preset Components
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-configured badge components with icons for consistent HIVE recognition system usage
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Platform Recognition Presets:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <RecognitionBadges.Builder />
                  <RecognitionBadges.Verified />
                  <RecognitionBadges.Leader />
                  <RecognitionBadges.GhostMode />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Achievement Presets:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <RecognitionBadges.Achievement count={12} />
                  <RecognitionBadges.Streak count={7} />
                  <RecognitionBadges.Scholar />
                  <RecognitionBadges.Connector />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Role Presets:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <RecognitionBadges.DeansListing />
                  <RecognitionBadges.Developer />
                  <RecognitionBadges.EventOrganizer />
                  <RecognitionBadges.CommunityHelper />
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Badge Sizes - Mobile-First Design</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 sizes optimized for different campus coordination contexts
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-center space-y-2">
              <Badge size="sm" variant="primary">Small</Badge>
              <p className="text-xs text-[var(--hive-text-muted)]">Compact lists</p>
            </div>
            <div className="text-center space-y-2">
              <Badge size="md" variant="primary">Medium</Badge>
              <p className="text-xs text-[var(--hive-text-muted)]">Default size</p>
            </div>
            <div className="text-center space-y-2">
              <Badge size="lg" variant="primary">Large</Badge>
              <p className="text-xs text-[var(--hive-text-muted)]">Prominent display</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dot Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge dot variant="emerald">Dot Indicators</Badge>
            Status Dots with Text
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Dot indicators for subtle status indication with accompanying text
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <Badge dot variant="emerald" size="sm">Study session active</Badge>
              <Badge dot variant="primary" size="md">Group coordination</Badge>
              <Badge dot variant="gold" size="lg">Review required</Badge>
            </div>
            <div className="flex flex-wrap gap-6">
              <Badge dot variant="error">Space full</Badge>
              <Badge dot variant="info">New announcement</Badge>
              <Badge dot variant="ghost">Offline mode</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Count Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge count={12} variant="error" />
            Count Badges - Activity Indicators
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Count badges for notifications, members, and activity tracking with overflow handling
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            {/* Notification Counts */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Notification Counts:</h4>
              <div className="flex flex-wrap gap-4">
                <Badge count={3} variant="error" size="sm" />
                <Badge count={12} variant="gold" size="md" />
                <Badge count={156} variant="info" size="lg" />
                <Badge count={999} variant="primary" maxCount={99} />
              </div>
            </div>

            {/* Member Counts */}
            <div className="space-y-3">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Member Counts:</h4>
              <div className="flex flex-wrap gap-4">
                <Badge count={5} variant="emerald">Online</Badge>
                <Badge count={23} variant="secondary">Total Members</Badge>
                <Badge count={7} variant="primary">Active Now</Badge>
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
            Real Campus Coordination Badges
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Badge usage in actual University at Buffalo student coordination scenarios
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Roles */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Roles & Positions:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary">Group Leader</Badge>
                <Badge variant="emerald">Study Buddy</Badge>
                <Badge variant="info">Tutor Available</Badge>
                <Badge variant="gold">RA on Duty</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">CSE Major</Badge>
                <Badge variant="secondary">Pre-Med</Badge>
                <Badge variant="secondary">Business</Badge>
                <Badge variant="ghost">Undeclared</Badge>
              </div>
            </div>
          </div>

          {/* Academic Achievements & Recognition */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Recognition & HIVE Achievements:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex flex-wrap gap-3">
                <RecognitionBadges.DeansListing />
                <RecognitionBadges.Scholar />
                <RecognitionBadges.Achievement count={15} />
                <Badge variant="verified" icon={<CheckCircleIcon />}>Honor Student</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <RecognitionBadges.Builder />
                <RecognitionBadges.Developer />
                <RecognitionBadges.Connector />
                <RecognitionBadges.Streak count={14} />
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">Senior</Badge>
                <Badge variant="secondary">Junior</Badge>
                <Badge variant="secondary">Sophomore</Badge>
                <Badge variant="secondary">Freshman</Badge>
              </div>
            </div>
          </div>

          {/* Space & Activity Status */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Space & Activity Status:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex flex-wrap gap-3">
                <Badge dot variant="emerald">Study session active</Badge>
                <Badge dot variant="gold">Event starting soon</Badge>
                <Badge dot variant="error">Space full</Badge>
                <Badge dot variant="info">New announcements</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant="primary">Featured Space</Badge>
                <Badge variant="emerald">Verified</Badge>
                <Badge variant="gold">Requires Permission</Badge>
                <Badge variant="error">Private</Badge>
              </div>
            </div>
          </div>

          {/* Live Activity Counts */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Live Activity Indicators:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* CSE 331 Study Group */}
                <div className="text-center space-y-2">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">CSE 331 Study Group</h5>
                  <div className="space-y-2">
                    <Badge count={8} variant="emerald">Online</Badge>
                    <Badge count={23} variant="secondary">Members</Badge>
                    <Badge count={3} variant="gold">Notifications</Badge>
                  </div>
                </div>

                {/* Hadley Village 2nd Floor */}
                <div className="text-center space-y-2">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Hadley 2nd Floor</h5>
                  <div className="space-y-2">
                    <Badge count={12} variant="info">Residents</Badge>
                    <Badge count={5} variant="emerald">Available</Badge>
                    <Badge count={1} variant="error">Urgent</Badge>
                  </div>
                </div>

                {/* Engineering Capstone */}
                <div className="text-center space-y-2">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Capstone Project</h5>
                  <div className="space-y-2">
                    <Badge count={4} variant="primary">Team Size</Badge>
                    <Badge count={7} variant="gold">Tasks Due</Badge>
                    <Badge count={2} variant="emerald">Completed</Badge>
                  </div>
                </div>

                {/* UB Campus Events */}
                <div className="text-center space-y-2">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Campus Events</h5>
                  <div className="space-y-2">
                    <Badge count={15} variant="info">This Week</Badge>
                    <Badge count={67} variant="primary">RSVPs</Badge>
                    <Badge count={12} variant="error">Waitlist</Badge>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Course & Academic Coordination */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Coordination Badges:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
              <div className="space-y-4">
                
                {/* Course Status */}
                <div className="space-y-2">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">CSE 331 - Algorithm Analysis:</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="primary">Spring 2024</Badge>
                    <Badge variant="emerald">Dr. Smith Section</Badge>
                    <Badge dot variant="gold">Exam Next Week</Badge>
                    <Badge count={15} variant="info">Study Partners</Badge>
                  </div>
                </div>

                {/* Assignment Status */}
                <div className="space-y-2">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Group Project Status:</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="error">Due Tomorrow</Badge>
                    <Badge variant="gold">Review Needed</Badge>
                    <Badge variant="emerald">Code Complete</Badge>
                    <Badge dot variant="primary">Team Meeting Tonight</Badge>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="space-y-2">
                  <h5 className="font-medium text-[var(--hive-text-primary)]">Office Hours & Help:</h5>
                  <div className="flex flex-wrap gap-2">
                    <Badge dot variant="emerald">TA Available Now</Badge>
                    <Badge variant="info">Prof Office Hours 2-4pm</Badge>
                    <Badge variant="primary">Peer Tutoring</Badge>
                    <Badge count={8} variant="gold">Queue Position</Badge>
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
    children: 'UB Student',
    variant: 'primary',
    size: 'md',
    dot: false,
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Badge Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different badge configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Badge {...args} />
        </CardContent>
      </Card>
    </div>
  ),
};