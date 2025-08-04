import type { Meta, StoryObj } from '@storybook/react';
import { RitualsHub } from '../../atomic/organisms/rituals-hub';

const meta: Meta<typeof RitualsHub> = {
  title: '06-Feed-Rituals/Rituals Hub',
  component: RitualsHub,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Rituals Hub - vBETA Summer Experience

The Rituals Hub replaces the Feed tab during the summer vBETA period, providing a structured four-week onboarding experience that seeds the entire HIVE platform with user data.

## Business Logic

**Phase 1: Summer Rituals (vBETA)**
- Dedicated ritual interface in Feed tab
- Four-week time-bound progression
- Seeds Profile, Spaces, and Social Graph systems
- Creates community momentum through collective participation

**Core Rituals:**
1. **Initialize** (Week 1) - Profile setup and interest selection
2. **Discover** (Week 2) - Space joining and community discovery  
3. **Connect** (Week 3) - Social network building with limited invites
4. **Launch** (Week 4) - Campus preparation and feature unlocks

## Design Principles

- **Collective Focus**: Shows community participation, not individual performance
- **Time-Bound**: Creates urgency and shared momentum
- **Guided Experience**: Clear next steps and progress indicators
- **Data Seeding**: Every interaction populates platform systems for v1 launch
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentWeek: {
      control: { type: 'range', min: 1, max: 4, step: 1 },
      description: 'Current week in the four-week ritual progression',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RitualsHub>;

// Mock ritual data for stories
const mockRituals = [
  {
    id: 'initialize_ritual',
    name: 'Initialize',
    title: 'Build Your Foundation',
    description: 'Set up your complete HIVE profile, select your interests and campus objectives, and establish your presence in the community.',
    tagline: 'Your journey starts here',
    type: 'onboarding' as const,
    status: 'active' as const,
    week: 1,
    duration: 45,
    totalParticipants: 1247,
    activeParticipants: 892,
    completionRate: 0.73,
    userParticipation: {
      status: 'active' as const,
      progressPercentage: 65,
      currentStep: 'Select your academic interests',
      nextAction: 'Continue Setup'
    },
    milestones: [
      {
        id: 'profile_complete',
        name: 'Profile Complete',
        description: 'Finish your basic profile setup',
        isReached: true
      },
      {
        id: 'interests_selected',
        name: 'Interests Selected', 
        description: 'Choose your academic and social interests',
        isReached: false,
        progress: 3
      },
      {
        id: 'avatar_customized',
        name: 'Avatar Customized',
        description: 'Personalize your HIVE avatar',
        isReached: false,
        progress: 0
      }
    ],
    actions: [
      {
        id: 'complete_profile',
        name: 'Complete Profile',
        description: 'Fill out your basic information',
        isCompleted: true,
        type: 'initialize' as const
      },
      {
        id: 'select_interests',
        name: 'Select Interests',
        description: 'Choose your academic and social interests',
        isCompleted: false,
        type: 'initialize' as const
      }
    ]
  },
  {
    id: 'discover_ritual',
    name: 'Discover',
    title: 'Find Your Communities',
    description: 'Explore and join the Spaces that align with your interests, from academic study groups to hobby communities.',
    tagline: 'Your tribe awaits',
    type: 'community' as const,
    status: 'scheduled' as const,
    week: 2,
    duration: 60,
    totalParticipants: 892,
    activeParticipants: 0,
    completionRate: 0,
    milestones: [
      {
        id: 'first_space_joined',
        name: 'First Space Joined',
        description: 'Join your first community space',
        isReached: false,
        progress: 0
      }
    ],
    actions: []
  }
];

const completedRituals = [
  {
    id: 'onboarding_complete',
    name: 'Welcome',
    title: 'Welcome to HIVE',
    description: 'Complete account setup and platform introduction',
    tagline: 'Welcome to the community',
    type: 'onboarding' as const,
    status: 'completed' as const,
    week: 0,
    duration: 15,
    totalParticipants: 1247,
    activeParticipants: 0,
    completionRate: 1,
    milestones: [],
    actions: []
  }
];

export const Week1Initialize: Story = {
  args: {
    currentWeek: 1,
    availableRituals: mockRituals,
    completedRituals: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Week 1 - Initialize ritual active. Users are setting up their profiles and selecting interests that will seed the Avatar Widget and personalization algorithms.',
      },
    },
  },
};

export const Week2Discover: Story = {
  args: {
    currentWeek: 2,
    availableRituals: [
      {
        ...mockRituals[1],
        status: 'active',
        activeParticipants: 743,
        userParticipation: {
          status: 'active' as const,
          progressPercentage: 30,
          currentStep: 'Browse recommended Spaces',
          nextAction: 'Explore Spaces'
        }
      }
    ],
    completedRituals: [mockRituals[0], ...completedRituals]
  },
  parameters: {
    docs: {
      description: {
        story: 'Week 2 - Discover ritual active. Users are exploring and joining Spaces, which seeds the My Spaces Widget for v1 launch.',
      },
    },
  },
};

export const Week3Connect: Story = {
  args: {
    currentWeek: 3,
    availableRituals: [
      {
        id: 'connect_ritual',
        name: 'Connect',
        title: 'Build Your Network',
        description: 'Use your limited friend invitations to bring your closest friends onto HIVE and build your initial social graph.',
        tagline: 'Bring your crew',
        type: 'community' as const,
        status: 'active' as const,
        week: 3,
        duration: 30,
        totalParticipants: 654,
        activeParticipants: 487,
        completionRate: 0.45,
        userParticipation: {
          status: 'active' as const,
          progressPercentage: 20,
          currentStep: 'Send friend invitations',
          nextAction: 'Invite Friends'
        },
        milestones: [
          {
            id: 'first_invite_sent',
            name: 'First Invite Sent',
            description: 'Send your first friend invitation',
            isReached: false,
            progress: 0
          }
        ],
        actions: []
      }
    ],
    completedRituals: [mockRituals[0], mockRituals[1], ...completedRituals]
  },
  parameters: {
    docs: {
      description: {
        story: 'Week 3 - Connect ritual active. Users are building their social graph with limited friend invitations, creating scarcity and value.',
      },
    },
  },
};

export const Week4Launch: Story = {
  args: {
    currentWeek: 4,
    availableRituals: [
      {
        id: 'launch_ritual',
        name: 'Launch',
        title: 'Prepare for Campus',
        description: 'Final preparations for campus life. Review your profile, confirm your spaces, and get ready for the real-time feed activation.',
        tagline: 'Ready for takeoff',
        type: 'achievement' as const,
        status: 'active' as const,
        week: 4,
        duration: 20,
        totalParticipants: 543,
        activeParticipants: 412,
        completionRate: 0.88,
        userParticipation: {
          status: 'active' as const,
          progressPercentage: 85,
          currentStep: 'Review your profile',
          nextAction: 'Final Review'
        },
        milestones: [
          {
            id: 'profile_reviewed',
            name: 'Profile Reviewed',
            description: 'Complete final profile review',
            isReached: true
          },
          {
            id: 'spaces_confirmed',
            name: 'Spaces Confirmed',
            description: 'Confirm your space memberships',
            isReached: true
          },
          {
            id: 'ready_for_campus',
            name: 'Campus Ready',
            description: 'All systems prepared for launch',
            isReached: false,
            progress: 85
          }
        ],
        actions: []
      }
    ],
    completedRituals: [mockRituals[0], mockRituals[1], { ...mockRituals[1], id: 'connect_completed', week: 3, status: 'completed' as const }, ...completedRituals]
  },
  parameters: {
    docs: {
      description: {
        story: 'Week 4 - Launch ritual active. Final preparations before campus activation and transition to real-time Activity Feed.',
      },
    },
  },
};

// State variations
export const EmptyState: Story = {
  args: {
    currentWeek: 1,
    availableRituals: [],
    completedRituals: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no rituals are available. Should rarely occur in production.',
      },
    },
  },
};

export const HighEngagement: Story = {
  args: {
    currentWeek: 2,
    availableRituals: [
      {
        ...mockRituals[1],
        status: 'active',
        totalParticipants: 2843,
        activeParticipants: 2156,
        completionRate: 0.92,
        userParticipation: {
          status: 'active' as const,
          progressPercentage: 90,
          currentStep: 'Join one more Space',
          nextAction: 'Complete Discovery'
        }
      }
    ],
    completedRituals: [mockRituals[0], ...completedRituals]
  },
  parameters: {
    docs: {
      description: {
        story: 'High engagement scenario with strong community participation and near-completion status.',
      },
    },
  },
};

export const MobileView: Story = {
  args: {
    currentWeek: 1,
    availableRituals: mockRituals,
    completedRituals: []
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Mobile-optimized view of the Rituals Hub with responsive layout adjustments.',
      },
    },
  },
};