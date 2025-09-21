import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileActivityWidget } from './profile-activity-widget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileActivityWidget> = {
  title: '04-Organisms/Profile System/Profile Activity Widget - COMPLETE DEFINITION',
  component: ProfileActivityWidget,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Profile Activity Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive recent platform engagement tracking interface for University at Buffalo HIVE platform student activity monitoring and social participation analytics.

### 🎯 **COMPONENT EXCELLENCE**
- **8 Activity Types** - Post, comment, join, create, like, collaborate, achievement, event for complete engagement tracking
- **Real-Time Feed** - Live activity updates with timestamps and contextual information
- **Engagement Analytics** - Activity score, weekly streaks, and total engagement metrics
- **Social Context** - Space-aware activities with community integration and peer visibility
- **Progress Tracking** - Weekly engagement goals with visual progress indicators
- **Interactive Design** - Hover effects, activity navigation, and responsive mobile optimization
- **Campus Integration** - University at Buffalo specific activity contexts and academic engagement
- **Achievement System** - Activity streaks, milestones, and community contribution recognition

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student engagement tracking:
- **Academic Activities** - Course participation, study group collaboration, assignment discussions
- **Community Engagement** - Space joining, peer networking, campus event participation
- **Social Interactions** - Post creation, commenting, liking, and collaborative content development
- **Achievement Tracking** - Academic milestones, community contributions, and platform engagement goals
- **Real-Time Updates** - Live activity feeds showing campus community participation and peer interactions
- **Engagement Insights** - Weekly activity analytics and personal engagement pattern recognition
- **Campus Integration** - Residence hall, academic, and social space activity correlation

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large activity items optimized for mobile interaction
- **Responsive Layout** - Adaptive activity feed for different screen sizes and orientations
- **Quick Actions** - Easy post creation and activity navigation for on-the-go campus engagement
- **Loading States** - Smooth activity updates during real-time feed synchronization
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    recentActivities: {
      control: 'object',
      description: 'Array of recent activity items',
    },
    todayActivities: {
      control: 'number',
      description: 'Number of activities today',
    },
    weeklyStreak: {
      control: 'number',
      description: 'Current weekly activity streak',
    },
    totalEngagement: {
      control: 'number',
      description: 'Total engagement count',
    },
    activityScore: {
      control: 'number',
      description: 'Overall activity score',
    },
    topActivityType: {
      control: 'select',
      options: ['post', 'comment', 'join', 'create', 'like', 'collaborate', 'achievement', 'event'],
      description: 'Most frequent activity type',
    },
    isEditable: {
      control: 'boolean',
      description: 'Enable editing capabilities',
    },
    onViewActivity: {
      action: 'view-activity',
      description: 'Activity item click handler',
    },
    onViewAllActivities: {
      action: 'view-all-activities',
      description: 'View all activities handler',
    },
    onCreatePost: {
      action: 'create-post',
      description: 'Create new post handler',
    },
    onEngageMore: {
      action: 'engage-more',
      description: 'Engagement suggestions handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileActivityWidget>;

// Mock activity data for University at Buffalo scenarios
const mockActivitiesEmpty = [];

const mockActivitiesBasic = [
  {
    id: 'act-001',
    type: 'post' as const,
    title: 'Shared CSE 331 algorithm study notes',
    description: 'Posted comprehensive notes on dynamic programming',
    timestamp: '2024-01-15T10:30:00Z',
    contextSpace: {
      name: 'CSE 331 - Data Structures',
      type: 'academic' as const
    },
    engagement: {
      likes: 12,
      comments: 5,
      shares: 3
    },
    isHighlighted: true
  },
  {
    id: 'act-002',
    type: 'join' as const,
    title: 'Joined UB Robotics Club',
    description: 'Became a member of the campus robotics community',
    timestamp: '2024-01-15T09:15:00Z',
    contextSpace: {
      name: 'UB Robotics Club',
      type: 'hobby' as const
    },
    engagement: {
      likes: 8,
      comments: 2,
      shares: 1
    }
  },
  {
    id: 'act-003',
    type: 'comment' as const,
    title: 'Commented on Ellicott floor meeting',
    description: 'Added input about laundry schedule coordination',
    timestamp: '2024-01-15T08:45:00Z',
    contextSpace: {
      name: 'Ellicott Complex - Floor 3',
      type: 'residential' as const
    },
    engagement: {
      likes: 4,
      comments: 0,
      shares: 0
    }
  },
  {
    id: 'act-004',
    type: 'like' as const,
    title: 'Liked study session coordination tool',
    description: 'Appreciated community-built scheduling tool',
    timestamp: '2024-01-15T07:20:00Z',
    contextSpace: {
      name: 'UB Study Tools',
      type: 'academic' as const
    },
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0
    }
  }
];

const mockActivitiesEngaged = [
  {
    id: 'act-101',
    type: 'achievement' as const,
    title: 'Reached 50 community contributions milestone',
    description: 'Achieved significant platform engagement milestone',
    timestamp: '2024-01-15T11:00:00Z',
    engagement: {
      likes: 24,
      comments: 8,
      shares: 6
    },
    isHighlighted: true
  },
  {
    id: 'act-102',
    type: 'create' as const,
    title: 'Created GPA Calculator Tool',
    description: 'Built and published academic planning tool for UB students',
    timestamp: '2024-01-15T10:45:00Z',
    contextSpace: {
      name: 'UB Tool Marketplace',
      type: 'academic' as const
    },
    engagement: {
      likes: 18,
      comments: 12,
      shares: 9
    },
    isHighlighted: true
  },
  {
    id: 'act-103',
    type: 'collaborate' as const,
    title: 'Collaborated on MTH 241 study guide',
    description: 'Co-authored comprehensive calculus study materials',
    timestamp: '2024-01-15T09:30:00Z',
    contextSpace: {
      name: 'MTH 241 - Calculus II',
      type: 'academic' as const
    },
    engagement: {
      likes: 15,
      comments: 7,
      shares: 4
    }
  },
  {
    id: 'act-104',
    type: 'event' as const,
    title: 'Attended Career Fair Prep Workshop',
    description: 'Participated in professional development session',
    timestamp: '2024-01-15T08:00:00Z',
    contextSpace: {
      name: 'UB Career Services',
      type: 'professional' as const
    },
    engagement: {
      likes: 6,
      comments: 3,
      shares: 1
    }
  },
  {
    id: 'act-105',
    type: 'post' as const,
    title: 'Posted about finals week study strategy',
    description: 'Shared effective study techniques and scheduling tips',
    timestamp: '2024-01-15T07:45:00Z',
    contextSpace: {
      name: 'UB Study Strategy Hub',
      type: 'academic' as const
    },
    engagement: {
      likes: 22,
      comments: 14,
      shares: 8
    }
  },
  {
    id: 'act-106',
    type: 'comment' as const,
    title: 'Commented on dorm sustainability initiative',
    description: 'Contributed ideas for campus environmental improvements',
    timestamp: '2024-01-15T06:30:00Z',
    contextSpace: {
      name: 'Sustainable UB',
      type: 'social' as const
    },
    engagement: {
      likes: 9,
      comments: 4,
      shares: 2
    }
  }
];

const mockActivitiesLeadership = [
  {
    id: 'act-201',
    type: 'create' as const,
    title: 'Launched UB Course Review Platform',
    description: 'Built comprehensive course evaluation and planning system',
    timestamp: '2024-01-15T12:00:00Z',
    contextSpace: {
      name: 'UB Academic Tools',
      type: 'academic' as const
    },
    engagement: {
      likes: 45,
      comments: 23,
      shares: 18
    },
    isHighlighted: true
  },
  {
    id: 'act-202',
    type: 'achievement' as const,
    title: 'Became Space Founder - CSE Study Hub',
    description: 'Founded and launched computer science academic community',
    timestamp: '2024-01-15T11:30:00Z',
    contextSpace: {
      name: 'CSE Study Hub',
      type: 'academic' as const
    },
    engagement: {
      likes: 38,
      comments: 19,
      shares: 12
    },
    isHighlighted: true
  },
  {
    id: 'act-203',
    type: 'collaborate' as const,
    title: 'Led group project for Software Engineering',
    description: 'Coordinated team development of campus utility application',
    timestamp: '2024-01-15T10:15:00Z',
    contextSpace: {
      name: 'CSE 442 - Software Engineering',
      type: 'academic' as const
    },
    engagement: {
      likes: 28,
      comments: 16,
      shares: 7
    }
  },
  {
    id: 'act-204',
    type: 'post' as const,
    title: 'Organized campus coding bootcamp',
    description: 'Created and promoted intensive programming workshop series',
    timestamp: '2024-01-15T09:00:00Z',
    contextSpace: {
      name: 'UB Programming Community',
      type: 'hobby' as const
    },
    engagement: {
      likes: 34,
      comments: 21,
      shares: 15
    },
    isHighlighted: true
  }
];

// Default profile activity widget showcase
export const Default: Story = {
  args: {
    user: {
      id: 'user-123',
      name: 'Alex Chen'
    },
    recentActivities: mockActivitiesBasic,
    todayActivities: 4,
    weeklyStreak: 5,
    totalEngagement: 167,
    activityScore: 82,
    topActivityType: 'post',
    isEditable: true,
    onViewActivity: action('view-activity'),
    onViewAllActivities: action('view-all-activities'),
    onCreatePost: action('create-post'),
    onEngageMore: action('engage-more'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE profile activity widget for University at Buffalo student engagement tracking:
          </Text>
          <ProfileActivityWidget {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive activity feed with engagement analytics, streak tracking, and campus context integration
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
      
      {/* Activity Widget Variations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 ACTIVITY WIDGET SYSTEM</Badge>
            Campus Engagement Tracking
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Complete profile activity widget system for University at Buffalo HIVE platform student engagement monitoring and social participation analytics
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Activity Widget Variations:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">New User Activity:</Text>
                    <ProfileActivityWidget
                      user={{ id: 'user-001', name: 'Sarah Johnson' }}
                      recentActivities={mockActivitiesBasic}
                      todayActivities={2}
                      weeklyStreak={3}
                      totalEngagement={45}
                      activityScore={38}
                      topActivityType="join"
                      onViewActivity={action('new-user-activity')}
                      onViewAllActivities={action('new-user-all')}
                      onCreatePost={action('new-user-post')}
                      onEngageMore={action('new-user-engage')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Basic activity tracking for new UB students building campus engagement
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Active Community Member:</Text>
                    <ProfileActivityWidget
                      user={{ id: 'user-002', name: 'Marcus Rodriguez' }}
                      recentActivities={mockActivitiesEngaged}
                      todayActivities={6}
                      weeklyStreak={12}
                      totalEngagement={287}
                      activityScore={94}
                      topActivityType="post"
                      onViewActivity={action('active-user-activity')}
                      onViewAllActivities={action('active-user-all')}
                      onCreatePost={action('active-user-post')}
                      onEngageMore={action('active-user-engage')}
                    />
                    <Text variant="body-xs" color="secondary">
                      High engagement tracking for established community members with strong participation
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Activity Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">⚡ ACTIVITY TYPES</Badge>
            Comprehensive Engagement Tracking
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            8 activity types for complete University at Buffalo campus engagement monitoring and social participation analytics
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Activity Type System:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Content Creation Activities:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Post Activity</Text>
                        <Text variant="body-xs" color="secondary">Share knowledge, insights, and campus experiences</Text>
                      </div>
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Create Activity</Text>
                        <Text variant="body-xs" color="secondary">Build tools, resources, and community utilities</Text>
                      </div>
                      <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Collaborate Activity</Text>
                        <Text variant="body-xs" color="secondary">Work together on projects and academic initiatives</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Engagement Activities:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Comment Activity</Text>
                        <Text variant="body-xs" color="secondary">Participate in discussions and provide feedback</Text>
                      </div>
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Like Activity</Text>
                        <Text variant="body-xs" color="secondary">Show appreciation and support community content</Text>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Join Activity</Text>
                        <Text variant="body-xs" color="secondary">Become member of spaces and communities</Text>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Milestone Activities:</Text>
                    <div className="space-y-2">
                      <div className="p-3 bg-[var(--hive-gold)]/10 border border-[var(--hive-gold)]/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Achievement Activity</Text>
                        <Text variant="body-xs" color="secondary">Reach platform milestones and community goals</Text>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <Text variant="body-sm" color="primary" weight="medium">Event Activity</Text>
                        <Text variant="body-xs" color="secondary">Attend workshops, meetings, and campus gatherings</Text>
                      </div>
                    </div>
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
            Real Campus Activity Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile activity widget usage in actual University at Buffalo student engagement and campus integration contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Computer Science Student */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">CSE Junior - Alex Chen - Academic Excellence Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Computer Science Student with High Academic Engagement
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic-Focused Activity:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileActivityWidget
                        user={{ id: 'user-cs-001', name: 'Alex Chen' }}
                        recentActivities={[
                          {
                            id: 'cs-001',
                            type: 'post',
                            title: 'Shared CSE 331 dynamic programming solutions',
                            description: 'Posted comprehensive algorithm explanations',
                            timestamp: '2024-01-15T10:30:00Z',
                            contextSpace: { name: 'CSE 331 - Data Structures', type: 'academic' },
                            engagement: { likes: 18, comments: 7, shares: 5 },
                            isHighlighted: true
                          },
                          {
                            id: 'cs-002',
                            type: 'collaborate',
                            title: 'Co-authored CSE 442 project documentation',
                            description: 'Team collaboration on software engineering project',
                            timestamp: '2024-01-15T09:15:00Z',
                            contextSpace: { name: 'CSE 442 - Software Engineering', type: 'academic' },
                            engagement: { likes: 12, comments: 4, shares: 2 }
                          },
                          {
                            id: 'cs-003',
                            type: 'create',
                            title: 'Built algorithm visualization tool',
                            description: 'Created interactive learning resource for CSE courses',
                            timestamp: '2024-01-15T08:45:00Z',
                            contextSpace: { name: 'CSE Tool Development', type: 'academic' },
                            engagement: { likes: 25, comments: 9, shares: 8 },
                            isHighlighted: true
                          }
                        ]}
                        todayActivities={5}
                        weeklyStreak={14}
                        totalEngagement={342}
                        activityScore={96}
                        topActivityType="create"
                        onViewActivity={action('cs-student-activity')}
                        onViewAllActivities={action('cs-student-all')}
                        onCreatePost={action('cs-student-post')}
                        onEngageMore={action('cs-student-engage')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Junior CSE student with consistent academic contribution and high tool development activity
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Leadership Activity:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileActivityWidget
                        user={{ id: 'user-cs-002', name: 'Maya Patel' }}
                        recentActivities={mockActivitiesLeadership}
                        todayActivities={7}
                        weeklyStreak={21}
                        totalEngagement={567}
                        activityScore={98}
                        topActivityType="create"
                        onViewActivity={action('cs-leader-activity')}
                        onViewAllActivities={action('cs-leader-all')}
                        onCreatePost={action('cs-leader-post')}
                        onEngageMore={action('cs-leader-engage')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Senior CSE student with leadership roles and community building initiatives
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* New Student Experience */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Freshman Integration Journey:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Week 1 - First Steps:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileActivityWidget
                      user={{ id: 'user-fresh-001', name: 'Jordan Kim' }}
                      recentActivities={[
                        {
                          id: 'fresh-001',
                          type: 'join',
                          title: 'Joined Ellicott Complex - Floor 3',
                          description: 'Became part of residential community',
                          timestamp: '2024-01-15T10:00:00Z',
                          contextSpace: { name: 'Ellicott Complex - Floor 3', type: 'residential' },
                          engagement: { likes: 5, comments: 2, shares: 0 }
                        },
                        {
                          id: 'fresh-002',
                          type: 'join',
                          title: 'Joined Undecided Majors Support',
                          description: 'Connected with academic exploration community',
                          timestamp: '2024-01-15T09:30:00Z',
                          contextSpace: { name: 'Undecided Majors Support', type: 'academic' },
                          engagement: { likes: 3, comments: 1, shares: 0 }
                        }
                      ]}
                      todayActivities={2}
                      weeklyStreak={1}
                      totalEngagement={8}
                      activityScore={15}
                      topActivityType="join"
                      onViewActivity={action('fresh-week1-activity')}
                      onViewAllActivities={action('fresh-week1-all')}
                      onCreatePost={action('fresh-week1-post')}
                      onEngageMore={action('fresh-week1-engage')}
                    />
                    <Text variant="body-xs" color="secondary">
                      New student beginning campus integration through community joining
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Week 4 - Growing Engagement:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileActivityWidget
                      user={{ id: 'user-fresh-002', name: 'Jordan Kim' }}
                      recentActivities={[
                        {
                          id: 'fresh-101',
                          type: 'post',
                          title: 'Shared freshman orientation insights',
                          description: 'Posted helpful tips for new students',
                          timestamp: '2024-01-15T11:00:00Z',
                          contextSpace: { name: 'UB Freshman Community', type: 'social' },
                          engagement: { likes: 8, comments: 3, shares: 2 },
                          isHighlighted: true
                        },
                        {
                          id: 'fresh-102',
                          type: 'comment',
                          title: 'Commented on study group formation',
                          description: 'Joined discussion about academic collaboration',
                          timestamp: '2024-01-15T10:15:00Z',
                          contextSpace: { name: 'GEN 101 Study Groups', type: 'academic' },
                          engagement: { likes: 4, comments: 0, shares: 0 }
                        }
                      ]}
                      todayActivities={3}
                      weeklyStreak={7}
                      totalEngagement={34}
                      activityScore={42}
                      topActivityType="comment"
                      onViewActivity={action('fresh-week4-activity')}
                      onViewAllActivities={action('fresh-week4-all')}
                      onCreatePost={action('fresh-week4-post')}
                      onEngageMore={action('fresh-week4-engage')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Student developing confidence and beginning to contribute content
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Semester End - Established Member:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <ProfileActivityWidget
                      user={{ id: 'user-fresh-003', name: 'Jordan Kim' }}
                      recentActivities={mockActivitiesEngaged}
                      todayActivities={4}
                      weeklyStreak={15}
                      totalEngagement={156}
                      activityScore={78}
                      topActivityType="collaborate"
                      onViewActivity={action('fresh-established-activity')}
                      onViewAllActivities={action('fresh-established-all')}
                      onCreatePost={action('fresh-established-post')}
                      onEngageMore={action('fresh-established-engage')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Fully integrated student with consistent engagement and community contributions
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Empty State */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">New Account - Empty State:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text variant="body-md" color="primary">
                  First-time platform experience with empty activity state:
                </Text>

                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Brand New Account:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileActivityWidget
                        user={{ id: 'user-empty-001', name: 'Taylor Wilson' }}
                        recentActivities={mockActivitiesEmpty}
                        todayActivities={0}
                        weeklyStreak={0}
                        totalEngagement={0}
                        activityScore={0}
                        topActivityType="post"
                        onViewActivity={action('empty-activity')}
                        onViewAllActivities={action('empty-all')}
                        onCreatePost={action('empty-post')}
                        onEngageMore={action('empty-engage')}
                      />
                      <Text variant="body-xs" color="secondary">
                        New user experience with call-to-action for first campus engagement
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">View-Only Mode:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <ProfileActivityWidget
                        user={{ id: 'user-empty-002', name: 'Sam Mitchell' }}
                        recentActivities={mockActivitiesEmpty}
                        todayActivities={0}
                        weeklyStreak={0}
                        totalEngagement={0}
                        activityScore={0}
                        isEditable={false}
                        topActivityType="post"
                        onViewActivity={action('readonly-activity')}
                        onViewAllActivities={action('readonly-all')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Read-only profile view without editing capabilities or action buttons
                      </Text>
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
    user: {
      id: 'user-playground',
      name: 'Alex Chen'
    },
    recentActivities: mockActivitiesBasic,
    todayActivities: 4,
    weeklyStreak: 5,
    totalEngagement: 167,
    activityScore: 82,
    topActivityType: 'post',
    isEditable: true,
    onViewActivity: action('playground-activity'),
    onViewAllActivities: action('playground-all'),
    onCreatePost: action('playground-post'),
    onEngageMore: action('playground-engage'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Activity Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different activity widget configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <ProfileActivityWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive activity widget testing for University at Buffalo HIVE platform engagement tracking design
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};