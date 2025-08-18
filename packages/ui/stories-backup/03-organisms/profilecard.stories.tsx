import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileSystem as ProfileCard } from '../../components/profile/profile-system';

/**
 * # ProfileCard - Social Media + Utility Platform
 * 
 * The ProfileCard organism is a complex social-utility system that powers major campus interactions. It combines social media community features with robust academic and campus life utilities.
 * 
 * ## Social Media Features
 * - Social proof badges and achievements
- Peer recognition and endorsements
 * 
 * ## Utility Features  
 * - Academic progress tracking
- Skill development monitoring
 * 
 * ## Campus Integration
 * Designed for organism level interactions that blend social engagement
 * with academic utility, making campus life more connected and productive.
 */

const meta: Meta<typeof ProfileCard> = {
  title: '03-Organisms/ProfileCard',
  component: ProfileCard,
  parameters: {
    docs: {
      description: {
        component: `
# ProfileCard - Campus Social + Utility


This organism component exemplifies HIVE's social media + utility platform approach:

## Social Media Integration
- Social proof badges and achievements
- Peer recognition and endorsements
- Community status and role displays
- Friend connections and social graphs

## Campus Utility Features
- Academic progress tracking
- Skill development monitoring
- Course completion status
- GPA and grade analytics

## Student Engagement Patterns
- Profile views and social validation
- Achievement sharing and celebrations
- Peer comparison and motivation
- Academic milestone announcements

The ProfileCard ensures every interaction serves both social connection and academic success.
        `
      }
    },
    layout: 'padded'
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] ">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Social media context
export const Default: Story = {
  args: {
    user: {
      id: '1',
      fullName: 'Maya Patel',
      handle: 'mayacodes',
      email: 'maya.patel@caltech.edu',
      avatar: '/api/placeholder/80/80',
      major: 'Computer Science',
      school: 'Caltech',
      bio: 'Building the future of campus connectivity through innovative tools and community-driven solutions.',
      isBuilder: true,
      isPublic: true,
      builderLevel: 'Expert',
      memberSince: '2023-08-01T00:00:00Z',
      onlineStatus: 'online',
      interests: ['Full Stack Development', 'Campus Tech', 'Community Building', 'AI/ML'],
      stats: {
        totalSpaces: 12,
        activeSpaces: 8,
        toolsCreated: 18,
        connectionsCount: 342,
        streakDays: 56,
        totalActivity: 234
      }
    },
    spaces: [
      {
        id: '1',
        name: 'CS 101 Study Group',
        type: 'course',
        memberCount: 24,
        unreadCount: 3,
        lastActivity: '2 hours ago'
      },
      {
        id: '2', 
        name: 'Dorm Floor 3B',
        type: 'housing',
        memberCount: 18,
        unreadCount: 1,
        lastActivity: '1 hour ago'
      }
    ],
    events: [
      {
        id: '1',
        title: 'Algorithm Study Session',
        time: '2:00 PM',
        type: 'academic',
        location: 'Library Room 302',
        attendees: ['Alex', 'Sam', 'Jordan']
      }
    ],
    connections: [
      {
        id: '1',
        type: 'dorm_classmate',
        message: 'You and Alex both live in Dorm A and are in CS 101',
        people: ['Alex Rodriguez'],
        action: 'Connect for study sessions'
      }
    ],
    hiveLab: {
      isLocked: false,
      availableTools: ['GPA Calculator', 'Schedule Optimizer'],
      createdTools: ['Study Planner', 'Grade Tracker'],
      comingSoon: ['Campus Navigator', 'Social Scheduler']
    }
  }
};

// 2. PLAYGROUND STORY - Interactive social/utility controls
export const Playground: Story = {
  args: {
    user: {
      id: '2',
      fullName: 'Jordan Kim',
      handle: 'jordanbuilds',
      email: 'jordan.kim@berkeley.edu',
      major: 'Electrical Engineering',
      school: 'UC Berkeley',
      bio: 'Hardware + software integration enthusiast. Building IoT solutions for smart campus living.',
      isBuilder: true,
      isPublic: true,
      builderLevel: 'Advanced',
      memberSince: '2023-09-15T00:00:00Z',
      onlineStatus: 'online',
      interests: ['IoT', 'Hardware Design', 'Mobile Development', 'Sustainability'],
      stats: {
        totalSpaces: 15,
        activeSpaces: 10,
        toolsCreated: 22,
        connectionsCount: 198,
        streakDays: 34,
        totalActivity: 167
      }
    },
    spaces: [
      {
        id: '1',
        name: 'EE 105 Lab Partners',
        type: 'course',
        memberCount: 16,
        unreadCount: 2,
        lastActivity: '45 minutes ago'
      },
      {
        id: '2',
        name: 'Sustainability Club',
        type: 'club',
        memberCount: 87,
        unreadCount: 5,
        lastActivity: '3 hours ago'
      }
    ],
    events: [
      {
        id: '1',
        title: 'Circuit Design Workshop',
        time: '4:00 PM',
        type: 'academic',
        location: 'Engineering Lab 205',
        attendees: ['Maya', 'Alex', 'Sam']
      }
    ],
    connections: [
      {
        id: '1',
        type: 'tool_collaboration',
        message: 'Maya and you both work on campus automation tools',
        people: ['Maya Patel'],
        action: 'Collaborate on IoT project'
      }
    ],
    hiveLab: {
      isLocked: false,
      availableTools: ['Power Calculator', 'Circuit Simulator'],
      createdTools: ['Smart Thermostat Controller', 'Energy Monitor'],
      comingSoon: ['Campus Energy Dashboard', 'Smart Lighting System']
    },
    showOnboarding: false,
    showPrivacyBanner: false,
    showGraduationBanner: false
  }
};

// 3. SOCIAL MEDIA STORY - Community engagement focus
export const SocialMedia: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Media Platform Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Community engagement and social proof elements
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-[var(--hive-brand-primary)]">Building study group credibility</h3>
          <ProfileCard 
            user={{
              id: '3a',
              fullName: 'Sam Chen',
              handle: 'samstudies',
              email: 'sam.chen@stanford.edu',
              major: 'Biology',
              school: 'Stanford University',
              bio: 'Pre-med student passionate about group study and peer mentoring.',
              isBuilder: false,
              isPublic: true,
              memberSince: '2023-09-01T00:00:00Z',
              onlineStatus: 'online',
              interests: ['Biology', 'Medicine', 'Study Groups', 'Tutoring'],
              stats: {
                totalSpaces: 8,
                activeSpaces: 6,
                toolsCreated: 3,
                connectionsCount: 127,
                streakDays: 21,
                totalActivity: 89
              }
            }}
            spaces={[
              {
                id: '1',
                name: 'Bio 101 Study Group',
                type: 'course',
                memberCount: 15,
                unreadCount: 2,
                lastActivity: '1 hour ago'
              }
            ]}
            events={[]}
            connections={[]}
            hiveLab={null}
          />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-[var(--hive-brand-primary)]">Showcasing academic achievements</h3>
          <ProfileCard 
            user={{
              id: '3b',
              fullName: 'Riley Torres',
              handle: 'rileyachieves',
              email: 'riley.torres@mit.edu',
              major: 'Mathematics',
              school: 'MIT',
              bio: 'Math major with high GPA, helping classmates succeed through peer tutoring.',
              isBuilder: true,
              isPublic: true,
              builderLevel: 'Advanced',
              memberSince: '2023-08-15T00:00:00Z',
              onlineStatus: 'online',
              interests: ['Mathematics', 'Tutoring', 'Academic Excellence', 'Problem Solving'],
              stats: {
                totalSpaces: 10,
                activeSpaces: 7,
                toolsCreated: 12,
                connectionsCount: 203,
                streakDays: 45,
                totalActivity: 156
              }
            }}
            spaces={[]}
            events={[]}
            connections={[]}
            hiveLab={{
              isLocked: false,
              availableTools: ['Math Problem Solver', 'Formula Reference'],
              createdTools: ['Calculus Tutor', 'Statistics Helper'],
              comingSoon: ['Advanced Linear Algebra Tools']
            }}
          />
        </div>
      </div>
    </div>
  )
};

// 4. UTILITY FEATURES STORY - Academic productivity focus  
export const UtilityFeatures: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Academic Utility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Productivity tools and campus life optimization
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <ProfileCard 
        user={{
          id: '4',
          fullName: 'Casey Johnson',
          handle: 'caseytech',
          email: 'casey.johnson@ucla.edu',
          major: 'Computer Science',
          school: 'UCLA',
          bio: 'Full-stack developer focused on campus productivity tools and student success platforms.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Intermediate',
          memberSince: '2023-09-10T00:00:00Z',
          onlineStatus: 'online',
          interests: ['Web Development', 'UX Design', 'Campus Life', 'Productivity'],
          stats: {
            totalSpaces: 7,
            activeSpaces: 5,
            toolsCreated: 9,
            connectionsCount: 165,
            streakDays: 28,
            totalActivity: 112
          }
        }}
        spaces={[
          {
            id: '1',
            name: 'CS Builders Club',
            type: 'club',
            memberCount: 45,
            unreadCount: 4,
            lastActivity: '30 minutes ago'
          }
        ]}
        events={[]}
        connections={[]}
        hiveLab={{
          isLocked: false,
          availableTools: ['Grade Tracker', 'Study Scheduler'],
          createdTools: ['Campus Navigator', 'Event Planner'],
          comingSoon: ['Social Study Finder']
        }}
      />
      </div>
    </div>
  )
};

// 5. CAMPUS SCENARIOS STORY - Real student usage
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How students use this component in real campus situations
        </p>
      </div>
      
      <div className="space-y-4">
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Building study group credibility</h3>
          <ProfileCard 
        user={{
          id: '4',
          fullName: 'Casey Johnson',
          handle: 'caseytech',
          email: 'casey.johnson@ucla.edu',
          major: 'Computer Science',
          school: 'UCLA',
          bio: 'Full-stack developer focused on campus productivity tools and student success platforms.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Intermediate',
          memberSince: '2023-09-10T00:00:00Z',
          onlineStatus: 'online',
          interests: ['Web Development', 'UX Design', 'Campus Life', 'Productivity'],
          stats: {
            totalSpaces: 7,
            activeSpaces: 5,
            toolsCreated: 9,
            connectionsCount: 165,
            streakDays: 28,
            totalActivity: 112
          }
        }}
        spaces={[
          {
            id: '1',
            name: 'CS Builders Club',
            type: 'club',
            memberCount: 45,
            unreadCount: 4,
            lastActivity: '30 minutes ago'
          }
        ]}
        events={[]}
        connections={[]}
        hiveLab={{
          isLocked: false,
          availableTools: ['Grade Tracker', 'Study Scheduler'],
          createdTools: ['Campus Navigator', 'Event Planner'],
          comingSoon: ['Social Study Finder']
        }}
      />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Showcasing academic achievements</h3>
          <ProfileCard 
        user={{
          id: '4',
          fullName: 'Casey Johnson',
          handle: 'caseytech',
          email: 'casey.johnson@ucla.edu',
          major: 'Computer Science',
          school: 'UCLA',
          bio: 'Full-stack developer focused on campus productivity tools and student success platforms.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Intermediate',
          memberSince: '2023-09-10T00:00:00Z',
          onlineStatus: 'online',
          interests: ['Web Development', 'UX Design', 'Campus Life', 'Productivity'],
          stats: {
            totalSpaces: 7,
            activeSpaces: 5,
            toolsCreated: 9,
            connectionsCount: 165,
            streakDays: 28,
            totalActivity: 112
          }
        }}
        spaces={[
          {
            id: '1',
            name: 'CS Builders Club',
            type: 'club',
            memberCount: 45,
            unreadCount: 4,
            lastActivity: '30 minutes ago'
          }
        ]}
        events={[]}
        connections={[]}
        hiveLab={{
          isLocked: false,
          availableTools: ['Grade Tracker', 'Study Scheduler'],
          createdTools: ['Campus Navigator', 'Event Planner'],
          comingSoon: ['Social Study Finder']
        }}
      />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Connecting with classmates</h3>
          <ProfileCard 
        user={{
          id: '4',
          fullName: 'Casey Johnson',
          handle: 'caseytech',
          email: 'casey.johnson@ucla.edu',
          major: 'Computer Science',
          school: 'UCLA',
          bio: 'Full-stack developer focused on campus productivity tools and student success platforms.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Intermediate',
          memberSince: '2023-09-10T00:00:00Z',
          onlineStatus: 'online',
          interests: ['Web Development', 'UX Design', 'Campus Life', 'Productivity'],
          stats: {
            totalSpaces: 7,
            activeSpaces: 5,
            toolsCreated: 9,
            connectionsCount: 165,
            streakDays: 28,
            totalActivity: 112
          }
        }}
        spaces={[
          {
            id: '1',
            name: 'CS Builders Club',
            type: 'club',
            memberCount: 45,
            unreadCount: 4,
            lastActivity: '30 minutes ago'
          }
        ]}
        events={[]}
        connections={[]}
        hiveLab={{
          isLocked: false,
          availableTools: ['Grade Tracker', 'Study Scheduler'],
          createdTools: ['Campus Navigator', 'Event Planner'],
          comingSoon: ['Social Study Finder']
        }}
      />
        </div>
      </div>
    </div>
  )
};

// 6. RESPONSIVE STORY - Mobile social engagement
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Mobile-First Social Design
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Optimized for 80% mobile campus usage patterns
        </p>
      </div>
      
      <ProfileCard 
        user={{
          id: '4',
          fullName: 'Casey Johnson',
          handle: 'caseytech',
          email: 'casey.johnson@ucla.edu',
          major: 'Computer Science',
          school: 'UCLA',
          bio: 'Full-stack developer focused on campus productivity tools and student success platforms.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Intermediate',
          memberSince: '2023-09-10T00:00:00Z',
          onlineStatus: 'online',
          interests: ['Web Development', 'UX Design', 'Campus Life', 'Productivity'],
          stats: {
            totalSpaces: 7,
            activeSpaces: 5,
            toolsCreated: 9,
            connectionsCount: 165,
            streakDays: 28,
            totalActivity: 112
          }
        }}
        spaces={[
          {
            id: '1',
            name: 'CS Builders Club',
            type: 'club',
            memberCount: 45,
            unreadCount: 4,
            lastActivity: '30 minutes ago'
          }
        ]}
        events={[]}
        connections={[]}
        hiveLab={{
          isLocked: false,
          availableTools: ['Grade Tracker', 'Study Scheduler'],
          createdTools: ['Campus Navigator', 'Event Planner'],
          comingSoon: ['Social Study Finder']
        }}
      />
    </div>
  )
};

// 7. ACCESSIBILITY STORY - Inclusive campus community
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessible Campus Community
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant social and utility features
        </p>
      </div>
      
      <ProfileCard 
        user={{
          id: '4',
          fullName: 'Casey Johnson',
          handle: 'caseytech',
          email: 'casey.johnson@ucla.edu',
          major: 'Computer Science',
          school: 'UCLA',
          bio: 'Full-stack developer focused on campus productivity tools and student success platforms.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Intermediate',
          memberSince: '2023-09-10T00:00:00Z',
          onlineStatus: 'online',
          interests: ['Web Development', 'UX Design', 'Campus Life', 'Productivity'],
          stats: {
            totalSpaces: 7,
            activeSpaces: 5,
            toolsCreated: 9,
            connectionsCount: 165,
            streakDays: 28,
            totalActivity: 112
          }
        }}
        spaces={[
          {
            id: '1',
            name: 'CS Builders Club',
            type: 'club',
            memberCount: 45,
            unreadCount: 4,
            lastActivity: '30 minutes ago'
          }
        ]}
        events={[]}
        connections={[]}
        hiveLab={{
          isLocked: false,
          availableTools: ['Grade Tracker', 'Study Scheduler'],
          createdTools: ['Campus Navigator', 'Event Planner'],
          comingSoon: ['Social Study Finder']
        }}
      />
    </div>
  )
};

// 8. MOTION STORY - HIVE liquid metal social interactions
export const Motion: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Social Interaction Motion
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          HIVE liquid metal animations for social engagement
        </p>
      </div>
      
      <ProfileCard 
        user={{
          id: '4',
          fullName: 'Casey Johnson',
          handle: 'caseytech',
          email: 'casey.johnson@ucla.edu',
          major: 'Computer Science',
          school: 'UCLA',
          bio: 'Full-stack developer focused on campus productivity tools and student success platforms.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Intermediate',
          memberSince: '2023-09-10T00:00:00Z',
          onlineStatus: 'online',
          interests: ['Web Development', 'UX Design', 'Campus Life', 'Productivity'],
          stats: {
            totalSpaces: 7,
            activeSpaces: 5,
            toolsCreated: 9,
            connectionsCount: 165,
            streakDays: 28,
            totalActivity: 112
          }
        }}
        spaces={[
          {
            id: '1',
            name: 'CS Builders Club',
            type: 'club',
            memberCount: 45,
            unreadCount: 4,
            lastActivity: '30 minutes ago'
          }
        ]}
        events={[]}
        connections={[]}
        hiveLab={{
          isLocked: false,
          availableTools: ['Grade Tracker', 'Study Scheduler'],
          createdTools: ['Campus Navigator', 'Event Planner'],
          comingSoon: ['Social Study Finder']
        }}
      />
    </div>
  )
};