import type { Meta, StoryObj } from '@storybook/react';
import { 
  RitualInitializeWorkflow,
  RitualDiscoverWorkflow,
  RitualConnectWorkflow
} from '../../atomic/organisms';

// Initialize Workflow Stories
const InitializeMeta: Meta<typeof RitualInitializeWorkflow> = {
  title: '06-Feed-Rituals/Ritual Workflows/Initialize Workflow',
  component: RitualInitializeWorkflow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Initialize Ritual Workflow - Week 1

The Initialize ritual is a guided three-step workflow that sets up the user's complete HIVE profile during Week 1 of the summer preparation period.

## Business Logic

**Purpose**: Seeds the Profile system and Avatar Widget with user data
- **Step 1**: Profile Basics - Name, bio, major, graduation year
- **Step 2**: Interest Selection - Academic and social interests (min 3)  
- **Step 3**: Campus Goals - Objectives for campus life (min 2)

**Data Flow**: 
- Completed data flows directly to Avatar Widget Focus View
- Interest selections seed personalization algorithms
- Goals inform Space and Tool recommendations

## Design Principles

- **Progressive Disclosure**: One step at a time with clear progress
- **Validation**: Real-time validation with helpful error states
- **Completion Celebration**: Satisfying finish with clear next steps
- **Mobile Optimized**: Works seamlessly on all device sizes
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'range', min: 0, max: 2, step: 1 },
      description: 'Current step in the workflow (0-2)',
    },
  },
};

export default InitializeMeta;
type InitializeStory = StoryObj<typeof RitualInitializeWorkflow>;

export const InitializeStart: InitializeStory = {
  args: {
    currentStep: 0,
    onStepComplete: (stepId, data) => console.log('Step completed:', stepId, data),
    onRitualComplete: () => console.log('Initialize ritual completed!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Starting state of the Initialize ritual at Step 1: Profile Basics. User enters basic information and selects major/graduation year.',
      },
    },
  },
};

export const InitializeStep2: InitializeStory = {
  args: {
    currentStep: 1,
    userProgress: {
      completedSteps: ['profile_basics'],
      currentStepData: {
        profile_basics: {
          displayName: 'Alex Chen',
          bio: 'CS student interested in AI and web development',
          major: 'Computer Science',
          graduationYear: '2026'
        }
      }
    },
    onStepComplete: (stepId, data) => console.log('Step completed:', stepId, data),
    onRitualComplete: () => console.log('Initialize ritual completed!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Step 2: Interest Selection. User chooses from categorized interests that will personalize their HIVE experience.',
      },
    },
  },
};

export const InitializeStep3: InitializeStory = {
  args: {
    currentStep: 2,
    userProgress: {
      completedSteps: ['profile_basics', 'interests'],
      currentStepData: {
        profile_basics: {
          displayName: 'Alex Chen',
          major: 'Computer Science',
          graduationYear: '2026'
        },
        interests: {
          interests: ['Coding', 'Study Groups', 'AI/ML', 'Web Development', 'Academic Clubs']
        }
      }
    },
    onStepComplete: (stepId, data) => console.log('Step completed:', stepId, data),
    onRitualComplete: () => console.log('Initialize ritual completed!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Step 3: Campus Goals. Final step where user selects their objectives for campus life.',
      },
    },
  },
};

// Discover Workflow Stories
const DiscoverMeta: Meta<typeof RitualDiscoverWorkflow> = {
  title: '06-Feed-Rituals/Ritual Workflows/Discover Workflow',
  component: RitualDiscoverWorkflow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Discover Ritual Workflow - Week 2

The Discover ritual guides users through finding and joining Spaces that match their interests and goals from the Initialize ritual.

## Business Logic

**Purpose**: Seeds the Spaces system and My Spaces Widget
- Space recommendations based on Initialize ritual data
- Minimum 3 space joins required for completion
- Search and filter functionality for exploration
- Recommended vs. other spaces distinction

**Data Flow**:
- User interests/goals from Initialize → Space matching algorithm
- Joined spaces → My Spaces Widget population
- Space memberships → Feed personalization preparation

## Features

- **Smart Recommendations**: Algorithm-driven space suggestions
- **Search & Filter**: Find specific communities by category
- **Match Scoring**: Percentage match based on user profile
- **Community Stats**: Member counts and activity levels
- **Real-time Validation**: Progress tracking with clear requirements
        `,
      },
    },
  },
  tags: ['autodocs'],
};

const DiscoverStory: StoryObj<typeof RitualDiscoverWorkflow> = {};

export const DiscoverDefault: DiscoverStory = {
  args: {
    userInterests: ['Coding', 'Study Groups', 'AI/ML', 'Web Development', 'Academic Clubs'],
    userGoals: ['academic_excellence', 'research', 'networking', 'leadership'],
    onStepComplete: (stepId, data) => console.log('Discover step completed:', stepId, data),
    onRitualComplete: () => console.log('Discover ritual completed!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Discover ritual with user interests and goals from a completed Initialize ritual. Shows personalized space recommendations.',
      },
    },
  },
};

export const DiscoverMinimalInterests: DiscoverStory = {
  args: {
    userInterests: ['Music', 'Art'],
    userGoals: ['creativity', 'social_life'],
    onStepComplete: (stepId, data) => console.log('Discover step completed:', stepId, data),
    onRitualComplete: () => console.log('Discover ritual completed!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Discover ritual with creative interests, showing how the recommendation algorithm adapts to different user profiles.',
      },
    },
  },
};

// Connect Workflow Stories  
const ConnectMeta: Meta<typeof RitualConnectWorkflow> = {
  title: '06-Feed-Rituals/Ritual Workflows/Connect Workflow',
  component: RitualConnectWorkflow,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Connect Ritual Workflow - Week 3

The Connect ritual provides users with limited friend invitations to build their initial social graph during the summer preparation period.

## Business Logic

**Purpose**: Seeds the social graph and Connections Widget
- **Limited Invitations**: 5 exclusive invites create scarcity and value
- **Multiple Methods**: Link sharing, SMS, email, QR codes
- **Social Proof**: Community stats build excitement
- **Minimum Requirement**: 2+ invites sent for completion

**Data Flow**:
- Friend invitations → Social graph building
- Accepted invites → Connections Widget population  
- Social connections → Feed personalization (v1)

## Strategic Design

- **Scarcity Psychology**: Limited invites increase perceived value
- **Viral Growth**: Word-of-mouth marketing through friend invitations
- **Quality Control**: Invite-only maintains community quality
- **Social Validation**: Joining with friends increases retention
        `,
      },
    },
  },
  tags: ['autodocs'],
};

const ConnectStory: StoryObj<typeof RitualConnectWorkflow> = {};

export const ConnectDefault: ConnectStory = {
  args: {
    userProfile: {
      name: 'Alex Chen',
      handle: '@alex_codes',
      interests: ['Coding', 'Study Groups', 'AI/ML']
    },
    onStepComplete: (stepId, data) => console.log('Connect step completed:', stepId, data),
    onRitualComplete: () => console.log('Connect ritual completed!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Connect ritual showing the invitation interface with limited invites and multiple sharing methods.',
      },
    },
  },
};

export const ConnectMinimalProfile: ConnectStory = {
  args: {
    userProfile: {
      name: 'New Student',
      handle: '@newstudent',
      interests: ['Social']
    },
    onStepComplete: (stepId, data) => console.log('Connect step completed:', stepId, data),
    onRitualComplete: () => console.log('Connect ritual completed!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Connect ritual with minimal user profile, showing how the interface adapts to different user states.',
      },
    },
  },
};

// Mobile views for all workflows
export const InitializeMobile: InitializeStory = {
  args: {
    currentStep: 1,
    onStepComplete: (stepId, data) => console.log('Step completed:', stepId, data),
    onRitualComplete: () => console.log('Initialize ritual completed!')
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Mobile-optimized view of the Initialize ritual workflow with responsive layout adjustments.',
      },
    },
  },
};

export const DiscoverMobile: DiscoverStory = {
  args: {
    userInterests: ['Coding', 'Study Groups'],
    userGoals: ['academic_excellence'],
    onStepComplete: (stepId, data) => console.log('Discover step completed:', stepId, data),
    onRitualComplete: () => console.log('Discover ritual completed!')
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Mobile view of Discover ritual with touch-optimized space selection and responsive grid layout.',
      },
    },
  },
};

export const ConnectMobile: ConnectStory = {
  args: {
    userProfile: {
      name: 'Mobile User',
      handle: '@mobileuser',
      interests: ['Social']
    },
    onStepComplete: (stepId, data) => console.log('Connect step completed:', stepId, data),
    onRitualComplete: () => console.log('Connect ritual completed!')
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story: 'Mobile-optimized Connect ritual with touch-friendly invitation methods and responsive sharing options.',
      },
    },
  },
};