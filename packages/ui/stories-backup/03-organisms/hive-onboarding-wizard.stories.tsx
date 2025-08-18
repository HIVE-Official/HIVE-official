import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveOnboardingWizard } from '../../components/onboarding/hive-onboarding-wizard';
import { User, MapPin, Book, Users, Zap, CheckCircle } from 'lucide-react';

/**
 * # HiveOnboardingWizard - Campus Welcome Experience
 * 
 * The HiveOnboardingWizard organism is the foundational welcome experience in the HIVE Design System.
 * It guides new students through platform setup with a blend of social discovery and utility configuration,
 * creating an engaging first impression that sets up long-term campus success.
 * 
 * ## Social Media Features
 * - Profile creation and campus identity setup
 * - Interest selection and peer discovery
 * - Social connection recommendations
 * - Community introduction and space discovery
 * 
 * ## Utility Features  
 * - Academic schedule integration
 * - Tool recommendation and setup
 * - Campus resource discovery
 * - Productivity preference configuration
 * 
 * ## Campus Integration
 * Designed for organism-level onboarding that combines social platform engagement
 * with academic utility setup, ensuring students get maximum value from day one.
 */

const meta: Meta<typeof HiveOnboardingWizard> = {
  title: '03-Organisms/HiveOnboardingWizard',
  component: HiveOnboardingWizard,
  parameters: {
    docs: {
      description: {
        component: `
# HiveOnboardingWizard - Campus Welcome System

This organism component exemplifies HIVE's social media + utility platform approach for student onboarding:

## Social Media Integration
- Profile creation and campus identity
- Interest selection and peer discovery
- Social connection recommendations
- Community introduction flows

## Campus Utility Features
- Academic schedule integration
- Tool recommendation system
- Campus resource discovery
- Productivity setup workflows

## Student Engagement Patterns
- Progressive disclosure of features
- Social validation and encouragement
- Utility-first value demonstration
- Community connection facilitation

The HiveOnboardingWizard ensures every new student understands both the social and utility value of the platform.
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 6 },
      description: 'Current step in the onboarding flow'
    },
    showSkipOption: {
      control: 'boolean',
      description: 'Allow users to skip onboarding steps'
    }
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[var(--hive-background-primary)]">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample user data for onboarding
const sampleUserData = {
  name: '',
  email: 'sarah.chen@stanford.edu',
  school: 'Stanford University',
  major: '',
  year: '',
  interests: [],
  profileImage: null
};

// 1. DEFAULT STORY - Welcome step
export const Default: Story = {
  args: {
    initialStep: 0,
    userData: sampleUserData,
    onComplete: (data) => console.log('Onboarding completed:', data),
    onSkip: () => console.log('Onboarding skipped')
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    initialStep: 0,
    showSkipOption: true,
    userData: sampleUserData,
    onComplete: (data) => console.log('Onboarding completed:', data),
    onSkip: () => console.log('Onboarding skipped'),
    onStepChange: (step) => console.log('Step changed to:', step)
  }
};

// 3. ALL STEPS STORY - Complete onboarding flow
export const AllSteps: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Complete Onboarding Flow
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          All steps in the campus welcome experience
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Step 1: Welcome</h3>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👋</span>
              </div>
              <h4 className="text-lg font-semibold mb-2">Welcome to HIVE!</h4>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                Where campus connections meet academic utility
              </p>
            </div>
          </div>
          
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Step 2: Basic Profile</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">Full Name</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">School & Major</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span className="text-sm">Academic Year</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Step 3: Interests</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-[var(--hive-background-primary)] rounded text-xs">Computer Science</span>
              <span className="px-2 py-1 bg-[var(--hive-background-primary)] rounded text-xs">Study Groups</span>
              <span className="px-2 py-1 bg-[var(--hive-background-primary)] rounded text-xs">Machine Learning</span>
              <span className="px-2 py-1 bg-[var(--hive-background-primary)] rounded text-xs">Web Development</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Step 4: Campus Tools</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm">GPA Calculator</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm">Study Scheduler</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm">Campus Navigator</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Step 5: Join Spaces</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">CS 101 Study Group</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">Dorm Floor 3B</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="text-sm">Tech Club</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Step 6: Complete</h3>
            <div className="text-center py-4">
              <Zap className="h-12 w-12 text-[var(--hive-brand-primary)] mx-auto mb-2" />
              <p className="text-sm">You're all set! Welcome to HIVE.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 4. SPECIFIC STEPS STORY - Individual step demos
export const ProfileSetup: Story = {
  args: {
    initialStep: 1,
    userData: {
      ...sampleUserData,
      name: 'Sarah Chen'
    }
  }
};

export const InterestSelection: Story = {
  args: {
    initialStep: 2,
    userData: {
      ...sampleUserData,
      name: 'Sarah Chen',
      school: 'Stanford University',
      major: 'Computer Science',
      year: 'Junior'
    }
  }
};

export const ToolRecommendations: Story = {
  args: {
    initialStep: 3,
    userData: {
      ...sampleUserData,
      name: 'Sarah Chen',
      school: 'Stanford University',
      major: 'Computer Science',
      year: 'Junior',
      interests: ['Computer Science', 'Study Groups', 'Machine Learning']
    }
  }
};

// 5. CAMPUS SCENARIOS STORY - Different student types
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Onboarding Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How different types of students experience onboarding
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">First-Year Student</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm">Campus orientation focus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm">Basic academic tools setup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-sm">Dorm and social connections</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-sm">Study group discovery</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Transfer Student</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm">Credit transfer integration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm">Advanced tool recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-sm">Major-specific spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-sm">Peer network building</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Graduate Student</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm">Research focus setup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm">Advanced productivity tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-sm">Academic collaboration spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-sm">Mentorship connections</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">International Student</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm">Campus resource discovery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm">Cultural integration tools</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-sm">International student spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                <span className="text-sm">Language exchange groups</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 6. PROGRESS STATES STORY - Different completion states
export const ProgressStates: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Onboarding Progress States
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Visual progress indicators throughout the flow
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-medium">Step Progress Indicators</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Progress: 3 of 6 steps</span>
              <span className="text-sm text-[var(--hive-text-secondary)]">50%</span>
            </div>
            <div className="w-full bg-[var(--hive-background-primary)] rounded-full h-2">
              <div className="bg-[var(--hive-brand-primary)] h-2 rounded-full" style={{width: '50%'}}></div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full"></div>
                <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full"></div>
                <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full"></div>
                <div className="w-2 h-2 bg-[var(--hive-background-primary)] rounded-full"></div>
                <div className="w-2 h-2 bg-[var(--hive-background-primary)] rounded-full"></div>
                <div className="w-2 h-2 bg-[var(--hive-background-primary)] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Completion Celebration</h3>
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg text-center">
            <div className="w-16 h-16 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-[var(--hive-background-primary)]" />
            </div>
            <h4 className="font-semibold mb-2">Welcome to HIVE! 🎉</h4>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              You're all set up and ready to connect with your campus community
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

// 7. ACCESSIBILITY STORY - A11y features
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessibility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant onboarding experience
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
        <h3 className="font-medium mb-4">Accessibility Features:</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Keyboard navigation support
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Screen reader announcements
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              High contrast focus indicators
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Progress announcements
            </li>
          </ul>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Form validation feedback
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Skip navigation options
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Error state descriptions
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              Semantic HTML structure
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};