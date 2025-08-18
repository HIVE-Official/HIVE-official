import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileHeader } from '../../components/profile/profile-header';

// Mock component for Storybook demonstration
const MockProfileCard: React.FC<any> = (props) => (
  <div className="p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)]">
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-10 h-10 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">JD</span>
      </div>
      <div>
        <h3 className="font-semibold text-[var(--hive-text-primary)]">John Doe</h3>
        <p className="text-sm text-[var(--hive-text-secondary)]">Computer Science Major</p>
      </div>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--hive-text-secondary)]">GPA</span>
        <span className="font-medium text-[var(--hive-text-primary)]">3.8</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-[var(--hive-text-secondary)]">Credits</span>
        <span className="font-medium text-[var(--hive-text-primary)]">89/120</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-[var(--hive-text-secondary)]">Study Groups</span>
        <span className="font-medium text-[var(--hive-text-primary)]">4</span>
      </div>
    </div>
    {props.children && (
      <div className="mt-3 pt-3 border-t border-[var(--hive-border-default)]">
        {props.children}
      </div>
    )}
  </div>
);

/**
 * # ProfileHeader - Social Media + Utility Platform
 * 
 * The ProfileHeader molecule combines multiple social and utility atoms to create focused campus interactions. It bridges social media engagement with academic productivity in meaningful ways.
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
 * Designed for molecule level interactions that blend social engagement
 * with academic utility, making campus life more connected and productive.
 */

const meta: Meta<typeof ProfileHeader> = {
  title: '02-Molecules/ProfileHeader',
  component: ProfileHeader,
  parameters: {
    docs: {
      description: {
        component: `
# ProfileHeader - Campus Social + Utility


This molecule component exemplifies HIVE's social media + utility platform approach:

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

The ProfileHeader ensures every interaction serves both social connection and academic success.
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
      fullName: 'Sarah Chen',
      handle: 'sarahcodes',
      email: 'sarah.chen@stanford.edu',
      avatar: '/api/placeholder/80/80',
      major: 'Computer Science',
      school: 'Stanford University',
      bio: 'Full-stack developer passionate about building campus community tools. Always down to help with coding projects!',
      isBuilder: true,
      isPublic: true,
      builderLevel: 'Advanced',
      memberSince: '2023-09-01T00:00:00Z',
      onlineStatus: 'online',
      interests: ['React', 'Node.js', 'Machine Learning', 'Campus Tech'],
      stats: {
        totalSpaces: 8,
        activeSpaces: 5,
        toolsCreated: 12,
        connectionsCount: 248,
        streakDays: 15,
        totalActivity: 145
      }
    }
  }
};

// 2. PLAYGROUND STORY - Interactive social/utility controls
export const Playground: Story = {
  args: {
    user: {
      id: '2',
      fullName: 'Alex Rodriguez',
      handle: 'alexbuilds',
      email: 'alex.rodriguez@berkeley.edu',
      major: 'Electrical Engineering',
      school: 'UC Berkeley',
      bio: 'Hardware enthusiast and IoT developer. Building the next generation of smart campus solutions.',
      isBuilder: true,
      isPublic: true,
      builderLevel: 'Expert',
      memberSince: '2023-08-15T00:00:00Z',
      onlineStatus: 'online',
      interests: ['IoT', 'Hardware', 'Arduino', 'Smart Cities'],
      stats: {
        totalSpaces: 12,
        activeSpaces: 8,
        toolsCreated: 25,
        connectionsCount: 389,
        streakDays: 42,
        totalActivity: 287
      }
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
          <h3 className="font-semibold mb-2">Building study group credibility</h3>
          <MockProfileCard />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Showcasing academic achievements</h3>
          <MockProfileCard />
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
        <MockProfileCard />
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
          <MockProfileCard />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Showcasing academic achievements</h3>
          <MockProfileCard />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Connecting with classmates</h3>
          <MockProfileCard />
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
      
      <ProfileHeader 
        user={{
          id: '3',
          fullName: 'Jamie Park',
          handle: 'jamiep',
          email: 'jamie.park@mit.edu',
          major: 'Computer Science',
          school: 'MIT',
          bio: 'AI researcher and campus community builder.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Advanced',
          memberSince: '2023-07-20T00:00:00Z',
          onlineStatus: 'online',
          interests: ['AI', 'Machine Learning', 'Community Building'],
          stats: {
            totalSpaces: 6,
            activeSpaces: 4,
            toolsCreated: 8,
            connectionsCount: 156,
            streakDays: 23,
            totalActivity: 98
          }
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
      
      <ProfileHeader 
        user={{
          id: '3',
          fullName: 'Jamie Park',
          handle: 'jamiep',
          email: 'jamie.park@mit.edu',
          major: 'Computer Science',
          school: 'MIT',
          bio: 'AI researcher and campus community builder.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Advanced',
          memberSince: '2023-07-20T00:00:00Z',
          onlineStatus: 'online',
          interests: ['AI', 'Machine Learning', 'Community Building'],
          stats: {
            totalSpaces: 6,
            activeSpaces: 4,
            toolsCreated: 8,
            connectionsCount: 156,
            streakDays: 23,
            totalActivity: 98
          }
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
      
      <ProfileHeader 
        user={{
          id: '3',
          fullName: 'Jamie Park',
          handle: 'jamiep',
          email: 'jamie.park@mit.edu',
          major: 'Computer Science',
          school: 'MIT',
          bio: 'AI researcher and campus community builder.',
          isBuilder: true,
          isPublic: true,
          builderLevel: 'Advanced',
          memberSince: '2023-07-20T00:00:00Z',
          onlineStatus: 'online',
          interests: ['AI', 'Machine Learning', 'Community Building'],
          stats: {
            totalSpaces: 6,
            activeSpaces: 4,
            toolsCreated: 8,
            connectionsCount: 156,
            streakDays: 23,
            totalActivity: 98
          }
        }}
      />
    </div>
  )
};