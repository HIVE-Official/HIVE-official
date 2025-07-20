import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveOnboardingWizard, OnboardingProvider, useOnboarding } from '../../components/onboarding/hive-onboarding-wizard';

const meta: Meta<typeof HiveOnboardingWizard> = {
  title: '12. Onboarding/Onboarding Wizard',
  component: HiveOnboardingWizard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Onboarding Wizard

A comprehensive, multi-step onboarding flow that guides new users through setting up their HIVE profile. Features:

## Key Features
- **7-Step Flow**: Welcome → Name → Handle → Photo → Academics → Builder → Legal → Complete
- **Progress Tracking**: Visual progress indicator with step completion status
- **Form Validation**: Real-time validation with error handling
- **Liquid Metal Animations**: Smooth transitions with HIVE motion system
- **Context Management**: React Context for state management across steps
- **Mock & Production Modes**: Support for development and production environments

## Step-by-Step Flow
1. **Welcome**: Introduction to HIVE with animated logo
2. **Name**: Full name collection with validation
3. **Handle**: Unique username selection with availability checking
4. **Photo**: Optional profile photo upload with drag & drop
5. **Academics**: University, major, and graduation year selection
6. **Builder**: Experience level and goal assessment
7. **Legal**: Terms, privacy, and community agreement
8. **Complete**: Success confirmation with animated celebration

## Implementation
- Uses React Context for state management
- Form validation with real-time feedback
- File upload handling for profile photos
- API integration for onboarding completion
- Local storage session management
- Responsive design with mobile support
        `
      }
    }
  },
  argTypes: {
    initialStep: {
      control: { type: 'select' },
      options: ['welcome', 'name', 'handle', 'photo', 'academics', 'builder', 'legal', 'complete'],
      description: 'Starting step for the onboarding flow'
    },
    mockMode: {
      control: 'boolean',
      description: 'Enable mock mode for development'
    }
  }
};

export default meta;
type Story = StoryObj<typeof HiveOnboardingWizard>;

export const Default: Story = {
  args: {
    initialStep: 'welcome',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding completed:', userData);
    }
  }
};

export const StartAtNameStep: Story = {
  args: {
    initialStep: 'name',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding completed:', userData);
    }
  }
};

export const StartAtHandleStep: Story = {
  args: {
    initialStep: 'handle',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding completed:', userData);
    }
  }
};

export const StartAtPhotoStep: Story = {
  args: {
    initialStep: 'photo',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding completed:', userData);
    }
  }
};

export const StartAtAcademicsStep: Story = {
  args: {
    initialStep: 'academics',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding completed:', userData);
    }
  }
};

export const StartAtBuilderStep: Story = {
  args: {
    initialStep: 'builder',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding completed:', userData);
    }
  }
};

export const StartAtLegalStep: Story = {
  args: {
    initialStep: 'legal',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding completed:', userData);
    }
  }
};

export const CompletionScreen: Story = {
  args: {
    initialStep: 'complete',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Onboarding completed:', userData);
    }
  }
};

// Interactive example with pre-filled data
export const PreFilledExample: Story = {
  render: () => {
    return (
      <OnboardingProvider 
        initialStep="academics"
        mockMode={true}
        onComplete={(userData) => console.log('Completed:', userData)}
      >
        <PreFilledWizard />
      </OnboardingProvider>
    );
  }
};

function PreFilledWizard() {
  const { updateData } = useOnboarding();
  
  React.useEffect(() => {
    updateData({
      name: 'Alex Rivera',
      handle: 'alexrivera',
      university: 'University at Buffalo',
      major: 'Computer Science',
      graduationYear: '2025',
      interests: ['Web Development', 'AI/ML'],
      builderExperience: 'intermediate',
      builderGoals: ['learn', 'solve'],
      agreedToTerms: true,
      agreedToPrivacy: true,
      agreedToCommunity: true
    });
  }, [updateData]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]">
      <div className="w-full max-w-2xl">
        <div className="glass rounded-3xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
              Pre-filled Example
            </h2>
            <p className="text-[var(--hive-text-muted)] mt-2">
              This demonstrates the onboarding flow with pre-populated data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Example with form validation showcase
export const ValidationShowcase: Story = {
  args: {
    initialStep: 'name',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Validation demo completed:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates form validation in the name step with real-time error feedback.'
      }
    }
  }
};

// Campus-specific example
export const CampusExample: Story = {
  args: {
    initialStep: 'welcome',
    mockMode: true,
    onComplete: (userData) => {
      console.log('Campus onboarding completed:', userData);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Campus-specific onboarding flow tailored for University at Buffalo students.'
      }
    }
  }
};