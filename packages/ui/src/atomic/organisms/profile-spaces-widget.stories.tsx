import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileSpacesWidget, JoinedSpace } from './profile-spaces-widget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileSpacesWidget> = {
  title: '03-Organisms/Profile Spaces Widget - COMPLETE DEFINITION',
  component: ProfileSpacesWidget,
  parameters: {
    docs: {
      description: {
        component: `
## 🏠 HIVE Profile Spaces Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive joined communities widget for University at Buffalo HIVE platform student space membership and campus community integration.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Space Types** - Academic, residential, social, professional, hobby with distinct visual styling
- **4 Role Levels** - Member, moderator, admin, founder with proper hierarchy display
- **Activity Tracking** - High, medium, low activity levels with visual engagement indicators
- **Real-Time Updates** - Unread message counts, upcoming events, and community notifications
- **Leadership Recognition** - Visual indicators for leadership roles and community contributions
- **Engagement Analytics** - Weekly community participation with progress visualization
- **Perfect Semantic Tokens** - 100% semantic token usage for consistent theming
- **Mobile Optimized** - Touch-friendly design with responsive community management
- **Campus Integration** - Built for University at Buffalo student space discovery and participation

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student community engagement:
- **Academic Spaces** - CSE 331 study groups, research labs, course communities, TA coordination
- **Residential Spaces** - Ellicott Complex floors, dorm activities, housing coordination
- **Social Spaces** - Interest clubs, recreational groups, cultural organizations, friend circles
- **Professional Spaces** - Career development, internship coordination, industry networking
- **Hobby Spaces** - Gaming groups, creative communities, sports teams, maker spaces
- **Leadership Roles** - Space moderation, community building, event coordination
- **Campus Events** - Study sessions, social gatherings, academic workshops, club meetings

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large space cards and clear navigation controls
- **Quick Space Access** - One-touch space entry while walking between classes
- **Real-Time Notifications** - Immediate updates for new messages and events
- **Responsive Community** - Adaptive space management for mobile campus coordination
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
      description: 'User profile data',
    },
    joinedSpaces: {
      control: 'object',
      description: 'Array of joined spaces',
    },
    totalSpaces: {
      control: 'number',
      description: 'Total number of spaces joined',
    },
    spacesCreated: {
      control: 'number',
      description: 'Number of spaces created by user',
    },
    totalMembers: {
      control: 'number',
      description: 'Total community size across all spaces',
    },
    weeklyEngagement: {
      control: { type: 'range', min: 0, max: 100 },
      description: 'Weekly engagement percentage',
    },
    featuredSpace: {
      control: 'object',
      description: 'Featured space to highlight',
    },
    isEditable: {
      control: 'boolean',
      description: 'Enable editing controls',
    },
    onJoinSpace: {
      action: 'join-space',
      description: 'Join new space handler',
    },
    onViewSpace: {
      action: 'view-space',
      description: 'View space handler',
    },
    onCreateSpace: {
      action: 'create-space',
      description: 'Create space handler',
    },
    onViewAllSpaces: {
      action: 'view-all-spaces',
      description: 'View all spaces handler',
    },
    onExploreSpaces: {
      action: 'explore-spaces',
      description: 'Explore spaces handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileSpacesWidget>;

// Sample space data for stories
const sampleSpaces = {
  activeStudent: [
    {
      id: 'cse331-study-group',
      name: 'CSE 331 Algorithm Analysis Study Group',
      description: 'Collaborative study space for mastering algorithms, data structures, and computational complexity.',
      type: 'academic' as const,
      memberCount: 34,
      role: 'moderator' as const,
      joinedDate: '2024-01-15',
      lastActive: '2 hours ago',
      isPrivate: false,
      activityLevel: 'high' as const,
      unreadMessages: 12,
      upcomingEvents: 2
    },
    {
      id: 'ellicott-porter-floor',
      name: 'Ellicott Porter Hall - 3rd Floor',
      description: 'Floor community for coordinating events, study sessions, and building friendships.',
      type: 'residential' as const,
      memberCount: 28,
      role: 'admin' as const,
      joinedDate: '2023-08-20',
      lastActive: '1 hour ago',
      isPrivate: true,
      activityLevel: 'high' as const,
      unreadMessages: 8,
      upcomingEvents: 1
    },
    {
      id: 'ub-ai-research',
      name: 'UB AI Research Lab Community',
      description: 'Research collaboration space for machine learning projects and paper discussions.',
      type: 'professional' as const,
      memberCount: 67,
      role: 'member' as const,
      joinedDate: '2024-02-01',
      lastActive: '4 hours ago',
      isPrivate: false,
      activityLevel: 'medium' as const,
      unreadMessages: 3,
      upcomingEvents: 1
    },
    {
      id: 'gaming-club-ub',
      name: 'UB Gaming & Esports Club',
      description: 'Competitive gaming, tournaments, and casual play sessions for all skill levels.',
      type: 'hobby' as const,
      memberCount: 156,
      role: 'member' as const,
      joinedDate: '2023-09-10',
      lastActive: '1 day ago',
      isPrivate: false,
      activityLevel: 'medium' as const,
      unreadMessages: 0,
      upcomingEvents: 3
    },
    {
      id: 'pre-med-society',
      name: 'UB Pre-Med Student Society',
      description: 'Medical school preparation, MCAT study groups, and healthcare career guidance.',
      type: 'professional' as const,
      memberCount: 89,
      role: 'member' as const,
      joinedDate: '2024-01-08',
      lastActive: '2 days ago',
      isPrivate: false,
      activityLevel: 'low' as const,
      unreadMessages: 1
    }
  ],
  communityLeader: [
    {
      id: 'robotics-club-ub',
      name: 'UB Robotics & Automation Club',
      description: 'Building autonomous systems, competing in robotics competitions, and sharing engineering knowledge.',
      type: 'professional' as const,
      memberCount: 78,
      role: 'founder' as const,
      joinedDate: '2022-09-01',
      lastActive: '30 minutes ago',
      isPrivate: false,
      activityLevel: 'high' as const,
      unreadMessages: 15,
      upcomingEvents: 4
    },
    {
      id: 'engineering-mentorship',
      name: 'Engineering Peer Mentorship Network',
      description: 'Connecting upperclassmen with underclassmen for academic and career guidance in engineering.',
      type: 'professional' as const,
      memberCount: 234,
      role: 'admin' as const,
      joinedDate: '2023-01-15',
      lastActive: '1 hour ago',
      isPrivate: false,
      activityLevel: 'high' as const,
      unreadMessages: 23,
      upcomingEvents: 2
    },
    {
      id: 'hackathon-organizers',
      name: 'UB Hackathon Organizing Committee',
      description: 'Planning and executing hackathons, coding competitions, and tech events on campus.',
      type: 'professional' as const,
      memberCount: 45,
      role: 'admin' as const,
      joinedDate: '2023-08-01',
      lastActive: '3 hours ago',
      isPrivate: true,
      activityLevel: 'high' as const,
      unreadMessages: 8,
      upcomingEvents: 1
    }
  ],
  newStudent: [
    {
      id: 'freshman-orientation-group',
      name: 'Freshman Orientation - Group 7',
      description: 'Orientation group for new UB students to connect, ask questions, and navigate campus life.',
      type: 'social' as const,
      memberCount: 15,
      role: 'member' as const,
      joinedDate: '2024-08-15',
      lastActive: '6 hours ago',
      isPrivate: false,
      activityLevel: 'medium' as const,
      unreadMessages: 4,
      upcomingEvents: 1
    }
  ]
};

const sampleUser = {
  id: 'sarah-chen-spaces',
  name: 'Sarah Chen'
};

// Default profile spaces widget showcase
export const Default: Story = {
  args: {
    user: sampleUser,
    joinedSpaces: sampleSpaces.activeStudent,
    totalSpaces: 8,
    spacesCreated: 2,
    totalMembers: 456,
    weeklyEngagement: 73,
    featuredSpace: sampleSpaces.activeStudent[0],
    isEditable: true,
    onJoinSpace: action('join-space-clicked'),
    onViewSpace: action('view-space-clicked'),
    onCreateSpace: action('create-space-clicked'),
    onViewAllSpaces: action('view-all-spaces-clicked'),
    onExploreSpaces: action('explore-spaces-clicked'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)] max-w-md">
      <Text variant="body-md" color="primary" className="mb-4">
        HIVE profile spaces widget for University at Buffalo student communities:
      </Text>
      <ProfileSpacesWidget {...args} />
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Community Engagement Levels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">🏠 COMMUNITY PROFILES</Badge>
            Student Engagement Levels
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Spaces widget variations for different University at Buffalo student community engagement levels
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Student Community Engagement:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Active Community Member:</Text>
                    <ProfileSpacesWidget
                      user={sampleUser}
                      joinedSpaces={sampleSpaces.activeStudent}
                      totalSpaces={8}
                      spacesCreated={2}
                      totalMembers={456}
                      weeklyEngagement={73}
                      featuredSpace={sampleSpaces.activeStudent[0]}
                      isEditable={true}
                      onJoinSpace={action('active-member-join')}
                      onViewSpace={action('active-member-view')}
                      onCreateSpace={action('active-member-create')}
                      onViewAllSpaces={action('active-member-all')}
                      onExploreSpaces={action('active-member-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Engaged student with multiple communities, leadership roles, and active participation
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Community Leader:</Text>
                    <ProfileSpacesWidget
                      user={{
                        id: 'alex-community-leader',
                        name: 'Alex Rivera'
                      }}
                      joinedSpaces={sampleSpaces.communityLeader}
                      totalSpaces={12}
                      spacesCreated={6}
                      totalMembers={892}
                      weeklyEngagement={91}
                      featuredSpace={sampleSpaces.communityLeader[0]}
                      isEditable={true}
                      onJoinSpace={action('leader-join')}
                      onViewSpace={action('leader-view')}
                      onCreateSpace={action('leader-create')}
                      onViewAllSpaces={action('leader-all')}
                      onExploreSpaces={action('leader-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Leadership-focused student with founder and admin roles across professional communities
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">New Student Explorer:</Text>
                    <ProfileSpacesWidget
                      user={{
                        id: 'jamie-new-student',
                        name: 'Jamie Park'
                      }}
                      joinedSpaces={sampleSpaces.newStudent}
                      totalSpaces={3}
                      spacesCreated={0}
                      totalMembers={45}
                      weeklyEngagement={34}
                      featuredSpace={sampleSpaces.newStudent[0]}
                      isEditable={true}
                      onJoinSpace={action('new-student-join')}
                      onViewSpace={action('new-student-view')}
                      onCreateSpace={action('new-student-create')}
                      onViewAllSpaces={action('new-student-all')}
                      onExploreSpaces={action('new-student-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Freshman exploring campus communities and building initial connections
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Empty State:</Text>
                    <ProfileSpacesWidget
                      user={{
                        id: 'david-empty-spaces',
                        name: 'David Kim'
                      }}
                      joinedSpaces={[]}
                      totalSpaces={0}
                      spacesCreated={0}
                      totalMembers={0}
                      weeklyEngagement={0}
                      isEditable={true}
                      onJoinSpace={action('empty-join-first')}
                      onViewSpace={action('empty-view')}
                      onCreateSpace={action('empty-create')}
                      onViewAllSpaces={action('empty-all')}
                      onExploreSpaces={action('empty-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Student ready to discover and join their first campus communities
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Space Types & Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎯 SPACE TYPES & ROLES</Badge>
            Community Categories & Leadership
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 space types and 4 role levels for comprehensive University at Buffalo student community engagement
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Community Types & Leadership Roles:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Communities:</Text>
                    <ProfileSpacesWidget
                      user={sampleUser}
                      joinedSpaces={[
                        {
                          id: 'cse-study-collective',
                          name: 'CSE Study Collective',
                          description: 'Computer science students collaborating on coursework, projects, and exam preparation.',
                          type: 'academic',
                          memberCount: 156,
                          role: 'moderator',
                          joinedDate: '2024-01-15',
                          lastActive: '1 hour ago',
                          isPrivate: false,
                          activityLevel: 'high',
                          unreadMessages: 15,
                          upcomingEvents: 3
                        },
                        {
                          id: 'math-tutoring-circle',
                          name: 'Mathematics Tutoring Circle',
                          description: 'Peer tutoring and support for calculus, discrete math, and statistics courses.',
                          type: 'academic',
                          memberCount: 89,
                          role: 'member',
                          joinedDate: '2024-02-01',
                          lastActive: '3 hours ago',
                          isPrivate: false,
                          activityLevel: 'medium',
                          unreadMessages: 4
                        }
                      ]}
                      totalSpaces={6}
                      spacesCreated={1}
                      totalMembers={345}
                      weeklyEngagement={82}
                      featuredSpace={{
                        id: 'cse-study-collective',
                        name: 'CSE Study Collective',
                        description: 'Computer science students collaborating on coursework, projects, and exam preparation.',
                        type: 'academic',
                        memberCount: 156,
                        role: 'moderator',
                        joinedDate: '2024-01-15',
                        lastActive: '1 hour ago',
                        isPrivate: false,
                        activityLevel: 'high',
                        unreadMessages: 15,
                        upcomingEvents: 3
                      }}
                      isEditable={true}
                      onJoinSpace={action('academic-join')}
                      onViewSpace={action('academic-view')}
                      onCreateSpace={action('academic-create')}
                      onViewAllSpaces={action('academic-all')}
                      onExploreSpaces={action('academic-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Course communities, study groups, research labs, and academic collaboration
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Residential Communities:</Text>
                    <ProfileSpacesWidget
                      user={sampleUser}
                      joinedSpaces={[
                        {
                          id: 'ellicott-community',
                          name: 'Ellicott Complex Community',
                          description: 'Residence hall community for event planning, study coordination, and building friendships.',
                          type: 'residential',
                          memberCount: 234,
                          role: 'admin',
                          joinedDate: '2023-08-20',
                          lastActive: '30 minutes ago',
                          isPrivate: true,
                          activityLevel: 'high',
                          unreadMessages: 12,
                          upcomingEvents: 2
                        },
                        {
                          id: 'governors-floor-3',
                          name: 'Governors Complex - Floor 3',
                          description: 'Floor-specific community for coordinating activities and supporting floor residents.',
                          type: 'residential',
                          memberCount: 24,
                          role: 'member',
                          joinedDate: '2023-08-15',
                          lastActive: '2 hours ago',
                          isPrivate: true,
                          activityLevel: 'medium',
                          unreadMessages: 3
                        }
                      ]}
                      totalSpaces={4}
                      spacesCreated={0}
                      totalMembers={258}
                      weeklyEngagement={67}
                      featuredSpace={{
                        id: 'ellicott-community',
                        name: 'Ellicott Complex Community',
                        description: 'Residence hall community for event planning, study coordination, and building friendships.',
                        type: 'residential',
                        memberCount: 234,
                        role: 'admin',
                        joinedDate: '2023-08-20',
                        lastActive: '30 minutes ago',
                        isPrivate: true,
                        activityLevel: 'high',
                        unreadMessages: 12,
                        upcomingEvents: 2
                      }}
                      isEditable={true}
                      onJoinSpace={action('residential-join')}
                      onViewSpace={action('residential-view')}
                      onCreateSpace={action('residential-create')}
                      onViewAllSpaces={action('residential-all')}
                      onExploreSpaces={action('residential-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Dorm floors, residence halls, housing coordination, and campus living
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Professional Development:</Text>
                    <ProfileSpacesWidget
                      user={sampleUser}
                      joinedSpaces={[
                        {
                          id: 'career-development-network',
                          name: 'UB Career Development Network',
                          description: 'Professional networking, internship coordination, and career preparation resources.',
                          type: 'professional',
                          memberCount: 567,
                          role: 'founder',
                          joinedDate: '2023-01-10',
                          lastActive: '1 hour ago',
                          isPrivate: false,
                          activityLevel: 'high',
                          unreadMessages: 23,
                          upcomingEvents: 4
                        },
                        {
                          id: 'tech-industry-prep',
                          name: 'Tech Industry Interview Prep',
                          description: 'Coding interview preparation, resume reviews, and industry mentorship for tech careers.',
                          type: 'professional',
                          memberCount: 189,
                          role: 'moderator',
                          joinedDate: '2024-01-05',
                          lastActive: '4 hours ago',
                          isPrivate: false,
                          activityLevel: 'medium',
                          unreadMessages: 8
                        }
                      ]}
                      totalSpaces={8}
                      spacesCreated={3}
                      totalMembers={756}
                      weeklyEngagement={89}
                      featuredSpace={{
                        id: 'career-development-network',
                        name: 'UB Career Development Network',
                        description: 'Professional networking, internship coordination, and career preparation resources.',
                        type: 'professional',
                        memberCount: 567,
                        role: 'founder',
                        joinedDate: '2023-01-10',
                        lastActive: '1 hour ago',
                        isPrivate: false,
                        activityLevel: 'high',
                        unreadMessages: 23,
                        upcomingEvents: 4
                      }}
                      isEditable={true}
                      onJoinSpace={action('professional-join')}
                      onViewSpace={action('professional-view')}
                      onCreateSpace={action('professional-create')}
                      onViewAllSpaces={action('professional-all')}
                      onExploreSpaces={action('professional-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Career networking, industry prep, internship coordination, professional mentorship
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Social & Hobby Communities:</Text>
                    <ProfileSpacesWidget
                      user={sampleUser}
                      joinedSpaces={[
                        {
                          id: 'ub-gaming-esports',
                          name: 'UB Gaming & Esports Community',
                          description: 'Competitive gaming, tournaments, casual play sessions, and gaming culture discussions.',
                          type: 'hobby',
                          memberCount: 345,
                          role: 'member',
                          joinedDate: '2023-09-15',
                          lastActive: '6 hours ago',
                          isPrivate: false,
                          activityLevel: 'medium',
                          unreadMessages: 5,
                          upcomingEvents: 2
                        },
                        {
                          id: 'creative-makers-collective',
                          name: 'Creative Makers Collective',
                          description: 'Art, design, music, and creative projects with shared workspace and collaboration.',
                          type: 'social',
                          memberCount: 78,
                          role: 'member',
                          joinedDate: '2024-02-20',
                          lastActive: '1 day ago',
                          isPrivate: false,
                          activityLevel: 'low',
                          unreadMessages: 2
                        }
                      ]}
                      totalSpaces={7}
                      spacesCreated={1}
                      totalMembers={423}
                      weeklyEngagement={54}
                      featuredSpace={{
                        id: 'ub-gaming-esports',
                        name: 'UB Gaming & Esports Community',
                        description: 'Competitive gaming, tournaments, casual play sessions, and gaming culture discussions.',
                        type: 'hobby',
                        memberCount: 345,
                        role: 'member',
                        joinedDate: '2023-09-15',
                        lastActive: '6 hours ago',
                        isPrivate: false,
                        activityLevel: 'medium',
                        unreadMessages: 5,
                        upcomingEvents: 2
                      }}
                      isEditable={true}
                      onJoinSpace={action('social-hobby-join')}
                      onViewSpace={action('social-hobby-view')}
                      onCreateSpace={action('social-hobby-create')}
                      onViewAllSpaces={action('social-hobby-all')}
                      onExploreSpaces={action('social-hobby-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Interest clubs, hobbies, recreational activities, and social connection
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
            Real Campus Community Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile spaces widget usage in actual University at Buffalo student community engagement contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Computer Science Student Communities */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Computer Science Student - Academic & Professional Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - CS Junior Community Leadership (Academic Excellence & Peer Support)
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Academic Leadership Spaces:</Text>
                    <ProfileSpacesWidget
                      user={{
                        id: 'sarah-cs-academic-leader',
                        name: 'Sarah Chen',
                      }}
                      joinedSpaces={[
                        {
                          id: 'cse331-study-leadership',
                          name: 'CSE 331 Algorithm Analysis Study Hub',
                          description: 'Advanced study group for algorithm design, complexity analysis, and competitive programming preparation.',
                          type: 'academic',
                          memberCount: 45,
                          role: 'admin',
                          joinedDate: '2024-01-15',
                          lastActive: '30 minutes ago',
                          isPrivate: false,
                          activityLevel: 'high',
                          unreadMessages: 18,
                          upcomingEvents: 3
                        },
                        {
                          id: 'cse-ta-coordination',
                          name: 'CSE Teaching Assistant Network',
                          description: 'TA coordination, grading standards, and student support strategies for computer science courses.',
                          type: 'professional',
                          memberCount: 23,
                          role: 'moderator',
                          joinedDate: '2024-02-01',
                          lastActive: '2 hours ago',
                          isPrivate: true,
                          activityLevel: 'high',
                          unreadMessages: 7,
                          upcomingEvents: 1
                        },
                        {
                          id: 'ai-research-undergrads',
                          name: 'UB AI Research - Undergraduate Division',
                          description: 'Undergraduate research opportunities, paper discussions, and machine learning project collaboration.',
                          type: 'professional',
                          memberCount: 67,
                          role: 'member',
                          joinedDate: '2024-01-08',
                          lastActive: '1 day ago',
                          isPrivate: false,
                          activityLevel: 'medium',
                          unreadMessages: 4
                        }
                      ]}
                      totalSpaces={8}
                      spacesCreated={3}
                      totalMembers={456}
                      weeklyEngagement={89}
                      featuredSpace={{
                        id: 'cse331-study-leadership',
                        name: 'CSE 331 Algorithm Analysis Study Hub',
                        description: 'Advanced study group for algorithm design, complexity analysis, and competitive programming preparation.',
                        type: 'academic',
                        memberCount: 45,
                        role: 'admin',
                        joinedDate: '2024-01-15',
                        lastActive: '30 minutes ago',
                        isPrivate: false,
                        activityLevel: 'high',
                        unreadMessages: 18,
                        upcomingEvents: 3
                      }}
                      isEditable={true}
                      onJoinSpace={action('cs-academic-leader-join')}
                      onViewSpace={action('cs-academic-leader-view')}
                      onCreateSpace={action('cs-academic-leader-create')}
                      onViewAllSpaces={action('cs-academic-leader-all')}
                      onExploreSpaces={action('cs-academic-leader-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Academic leadership in CSE study groups, TA coordination, and research participation
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Campus Life Integration:</Text>
                    <ProfileSpacesWidget
                      user={{
                        id: 'sarah-cs-campus-life',
                        name: 'Sarah Chen',
                      }}
                      joinedSpaces={[
                        {
                          id: 'ellicott-porter-tech-floor',
                          name: 'Ellicott Porter - Tech Enthusiasts Floor',
                          description: 'Residence hall floor community focused on technology, coding projects, and academic support.',
                          type: 'residential',
                          memberCount: 28,
                          role: 'admin',
                          joinedDate: '2023-08-20',
                          lastActive: '3 hours ago',
                          isPrivate: true,
                          activityLevel: 'high',
                          unreadMessages: 9,
                          upcomingEvents: 2
                        },
                        {
                          id: 'women-in-computing-ub',
                          name: 'Women in Computing at UB',
                          description: 'Professional development, networking, and mentorship for women in computer science and technology.',
                          type: 'professional',
                          memberCount: 134,
                          role: 'moderator',
                          joinedDate: '2023-09-10',
                          lastActive: '1 day ago',
                          isPrivate: false,
                          activityLevel: 'medium',
                          unreadMessages: 5,
                          upcomingEvents: 1
                        }
                      ]}
                      totalSpaces={12}
                      spacesCreated={4}
                      totalMembers={892}
                      weeklyEngagement={73}
                      featuredSpace={{
                        id: 'ellicott-porter-tech-floor',
                        name: 'Ellicott Porter - Tech Enthusiasts Floor',
                        description: 'Residence hall floor community focused on technology, coding projects, and academic support.',
                        type: 'residential',
                        memberCount: 28,
                        role: 'admin',
                        joinedDate: '2023-08-20',
                        lastActive: '3 hours ago',
                        isPrivate: true,
                        activityLevel: 'high',
                        unreadMessages: 9,
                        upcomingEvents: 2
                      }}
                      isEditable={true}
                      onJoinSpace={action('cs-campus-life-join')}
                      onViewSpace={action('cs-campus-life-view')}
                      onCreateSpace={action('cs-campus-life-create')}
                      onViewAllSpaces={action('cs-campus-life-all')}
                      onExploreSpaces={action('cs-campus-life-explore')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Residential community leadership and professional development in tech organizations
                    </Text>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Engineering Student Leadership */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Engineering Student - Leadership & Innovation Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Club Leadership & Innovation:</Text>
                  <ProfileSpacesWidget
                    user={{
                      id: 'alex-engineering-leader',
                      name: 'Alex Rivera',
                    }}
                    joinedSpaces={[
                      {
                        id: 'ub-robotics-club-leadership',
                        name: 'UB Robotics & Automation Club',
                        description: 'Leading autonomous systems development, competition coordination, and engineering education outreach.',
                        type: 'professional',
                        memberCount: 89,
                        role: 'founder',
                        joinedDate: '2022-09-01',
                        lastActive: '1 hour ago',
                        isPrivate: false,
                        activityLevel: 'high',
                        unreadMessages: 25,
                        upcomingEvents: 5
                      },
                      {
                        id: 'senior-design-showcase',
                        name: 'Senior Design Project Showcase',
                        description: 'Coordinating senior design presentations, industry partnerships, and project collaboration.',
                        type: 'academic',
                        memberCount: 156,
                        role: 'admin',
                        joinedDate: '2024-01-15',
                        lastActive: '4 hours ago',
                        isPrivate: false,
                        activityLevel: 'high',
                        unreadMessages: 12,
                        upcomingEvents: 3
                      }
                    ]}
                    totalSpaces={10}
                    spacesCreated={5}
                    totalMembers={734}
                    weeklyEngagement={94}
                    featuredSpace={{
                      id: 'ub-robotics-club-leadership',
                      name: 'UB Robotics & Automation Club',
                      description: 'Leading autonomous systems development, competition coordination, and engineering education outreach.',
                      type: 'professional',
                      memberCount: 89,
                      role: 'founder',
                      joinedDate: '2022-09-01',
                      lastActive: '1 hour ago',
                      isPrivate: false,
                      activityLevel: 'high',
                      unreadMessages: 25,
                      upcomingEvents: 5
                    }}
                    isEditable={true}
                    onJoinSpace={action('engineering-leader-join')}
                    onViewSpace={action('engineering-leader-view')}
                    onCreateSpace={action('engineering-leader-create')}
                    onViewAllSpaces={action('engineering-leader-all')}
                    onExploreSpaces={action('engineering-leader-explore')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Founder-level leadership in robotics club and senior design project coordination
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Mentorship & Community Building:</Text>
                  <ProfileSpacesWidget
                    user={{
                      id: 'alex-mentorship-leader',
                      name: 'Alex Rivera',
                    }}
                    joinedSpaces={[
                      {
                        id: 'engineering-peer-mentorship',
                        name: 'Engineering Peer Mentorship Network',
                        description: 'Connecting upperclassmen with underclassmen for academic guidance and professional development.',
                        type: 'professional',
                        memberCount: 267,
                        role: 'admin',
                        joinedDate: '2023-01-15',
                        lastActive: '2 hours ago',
                        isPrivate: false,
                        activityLevel: 'high',
                        unreadMessages: 18,
                        upcomingEvents: 2
                      },
                      {
                        id: 'hackathon-organizing-committee',
                        name: 'UB Hackathon Organizing Committee',
                        description: 'Planning campus-wide hackathons, coding competitions, and innovation challenges for students.',
                        type: 'professional',
                        memberCount: 45,
                        role: 'admin',
                        joinedDate: '2023-08-01',
                        lastActive: '6 hours ago',
                        isPrivate: true,
                        activityLevel: 'high',
                        unreadMessages: 8,
                        upcomingEvents: 1
                      }
                    ]}
                    totalSpaces={14}
                    spacesCreated={7}
                    totalMembers={1245}
                    weeklyEngagement={87}
                    featuredSpace={{
                      id: 'engineering-peer-mentorship',
                      name: 'Engineering Peer Mentorship Network',
                      description: 'Connecting upperclassmen with underclassmen for academic guidance and professional development.',
                      type: 'professional',
                      memberCount: 267,
                      role: 'admin',
                      joinedDate: '2023-01-15',
                      lastActive: '2 hours ago',
                      isPrivate: false,
                      activityLevel: 'high',
                      unreadMessages: 18,
                      upcomingEvents: 2
                    }}
                    isEditable={true}
                    onJoinSpace={action('mentorship-leader-join')}
                    onViewSpace={action('mentorship-leader-view')}
                    onCreateSpace={action('mentorship-leader-create')}
                    onViewAllSpaces={action('mentorship-leader-all')}
                    onExploreSpaces={action('mentorship-leader-explore')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Administrative leadership in mentorship programs and campus-wide event coordination
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Pre-Med Student Communities */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Pre-Med Student - Academic & Professional Communities:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medical School Preparation:</Text>
                  <ProfileSpacesWidget
                    user={{
                      id: 'jamie-premed-academic',
                      name: 'Jamie Park',
                    }}
                    joinedSpaces={[
                      {
                        id: 'ub-pre-med-society-leadership',
                        name: 'UB Pre-Med Student Society',
                        description: 'Medical school preparation, MCAT study coordination, and healthcare career guidance for aspiring physicians.',
                        type: 'professional',
                        memberCount: 234,
                        role: 'moderator',
                        joinedDate: '2024-01-08',
                        lastActive: '3 hours ago',
                        isPrivate: false,
                        activityLevel: 'high',
                        unreadMessages: 14,
                        upcomingEvents: 4
                      },
                      {
                        id: 'organic-chemistry-study-intensive',
                        name: 'Organic Chemistry Study Intensive',
                        description: 'Advanced organic chemistry study group with mechanism practice and synthesis problem solving.',
                        type: 'academic',
                        memberCount: 28,
                        role: 'admin',
                        joinedDate: '2024-02-01',
                        lastActive: '1 hour ago',
                        isPrivate: false,
                        activityLevel: 'high',
                        unreadMessages: 9,
                        upcomingEvents: 2
                      }
                    ]}
                    totalSpaces={7}
                    spacesCreated={2}
                    totalMembers={456}
                    weeklyEngagement={91}
                    featuredSpace={{
                      id: 'ub-pre-med-society-leadership',
                      name: 'UB Pre-Med Student Society',
                      description: 'Medical school preparation, MCAT study coordination, and healthcare career guidance for aspiring physicians.',
                      type: 'professional',
                      memberCount: 234,
                      role: 'moderator',
                      joinedDate: '2024-01-08',
                      lastActive: '3 hours ago',
                      isPrivate: false,
                      activityLevel: 'high',
                      unreadMessages: 14,
                      upcomingEvents: 4
                    }}
                    isEditable={true}
                    onJoinSpace={action('premed-academic-join')}
                    onViewSpace={action('premed-academic-view')}
                    onCreateSpace={action('premed-academic-create')}
                    onViewAllSpaces={action('premed-academic-all')}
                    onExploreSpaces={action('premed-academic-explore')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Leadership in pre-med society and intensive academic study group coordination
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Research & Clinical Experience:</Text>
                  <ProfileSpacesWidget
                    user={{
                      id: 'jamie-premed-research',
                      name: 'Jamie Park',
                    }}
                    joinedSpaces={[
                      {
                        id: 'clinical-research-interns',
                        name: 'UB Clinical Research Interns - ECMC',
                        description: 'Undergraduate research coordination at Erie County Medical Center with patient interaction experience.',
                        type: 'professional',
                        memberCount: 15,
                        role: 'member',
                        joinedDate: '2024-03-01',
                        lastActive: '1 day ago',
                        isPrivate: true,
                        activityLevel: 'medium',
                        unreadMessages: 3,
                        upcomingEvents: 1
                      },
                      {
                        id: 'healthcare-volunteer-network',
                        name: 'UB Healthcare Volunteer Network',
                        description: 'Coordinating volunteer opportunities at local hospitals, clinics, and community health initiatives.',
                        type: 'social',
                        memberCount: 89,
                        role: 'member',
                        joinedDate: '2023-10-15',
                        lastActive: '2 days ago',
                        isPrivate: false,
                        activityLevel: 'medium',
                        unreadMessages: 2
                      }
                    ]}
                    totalSpaces={9}
                    spacesCreated={1}
                    totalMembers={345}
                    weeklyEngagement={76}
                    featuredSpace={{
                      id: 'clinical-research-interns',
                      name: 'UB Clinical Research Interns - ECMC',
                      description: 'Undergraduate research coordination at Erie County Medical Center with patient interaction experience.',
                      type: 'professional',
                      memberCount: 15,
                      role: 'member',
                      joinedDate: '2024-03-01',
                      lastActive: '1 day ago',
                      isPrivate: true,
                      activityLevel: 'medium',
                      unreadMessages: 3,
                      upcomingEvents: 1
                    }}
                    isEditable={true}
                    onJoinSpace={action('premed-research-join')}
                    onViewSpace={action('premed-research-view')}
                    onCreateSpace={action('premed-research-create')}
                    onViewAllSpaces={action('premed-research-all')}
                    onExploreSpaces={action('premed-research-explore')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Clinical research participation and healthcare volunteer coordination experience
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Community Management */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Community Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized spaces widget for on-campus community engagement:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Real-Time Community Access:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Touch-Friendly Community Management</Text>
                    <Text variant="body-xs" color="secondary">
                      One-touch space access while walking between Lockwood Library and Davis Hall
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Real-time message notifications during study breaks and between classes
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Quick event RSVPs and community updates from residence hall or campus locations
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Leadership management tools accessible during community meetings and events
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus-Integrated Communities:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Location-Aware Community Features</Text>
                    <Text variant="body-xs" color="secondary">
                      Building-specific community discovery based on current campus location
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Event coordination with automatic UB building integration and room booking
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Residence hall community management with floor-specific coordination tools
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Academic space integration with course enrollment and study group formation
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

// Interactive playground
export const Playground: Story = {
  args: {
    user: sampleUser,
    joinedSpaces: sampleSpaces.activeStudent.slice(0, 3),
    totalSpaces: 5,
    spacesCreated: 1,
    totalMembers: 234,
    weeklyEngagement: 67,
    featuredSpace: sampleSpaces.activeStudent[0],
    isEditable: true,
    onJoinSpace: action('playground-join-space'),
    onViewSpace: action('playground-view-space'),
    onCreateSpace: action('playground-create-space'),
    onViewAllSpaces: action('playground-view-all-spaces'),
    onExploreSpaces: action('playground-explore-spaces'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Spaces Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different spaces widget configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-w-md">
            <ProfileSpacesWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive spaces widget testing for University at Buffalo HIVE platform student community engagement
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};