import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { HiveAuthOnboardingIntegration } from '../../components/auth/hive-auth-onboarding-integration';
import { HiveAuthFlowEnhanced, AuthProvider, type AuthStep } from '../../components/auth/hive-auth-flow-enhanced';
import { HiveOnboardingWizardEnhanced, OnboardingProvider, type OnboardingStep } from '../../components/onboarding/hive-onboarding-wizard-enhanced';

// =============================================================================
// COMPLETE HIVE AUTH & ONBOARDING USER JOURNEY
// =============================================================================

/**
 * # Complete HIVE Auth & Onboarding Journey
 * 
 * ## Overview
 * This story showcases the complete user journey from first visit to onboarded HIVE member,
 * demonstrating the seamless flow between authentication and onboarding systems.
 * 
 * ## User Journey Flow
 * 1. **Landing Welcome** - Brand introduction and value proposition
 * 2. **Auth Options** - Sign in/up with email or magic link
 * 3. **Email Verification** - Secure email confirmation process
 * 4. **Onboarding Welcome** - Personalized onboarding introduction
 * 5. **Profile Creation** - Name, handle, and photo setup
 * 6. **Academic Setup** - University and academic information
 * 7. **Builder Assessment** - Skills and interests evaluation
 * 8. **Platform Complete** - Ready to use HIVE
 * 
 * ## Design Highlights
 * - Consistent brand experience throughout the entire flow
 * - Seamless transitions between auth and onboarding
 * - Mobile-first responsive design
 * - Campus-specific customization (UB focus)
 * - Progressive disclosure of features and benefits
 */

type JourneyPhase = 'auth' | 'onboarding' | 'complete';

interface CompleteJourneyState {
  phase: JourneyPhase;
  authStep: AuthStep;
  onboardingStep: OnboardingStep;
  userEmail: string;
  userName: string;
}

function CompleteAuthOnboardingJourney() {
  const [journeyState, setJourneyState] = useState<CompleteJourneyState>({
    phase: 'auth',
    authStep: 'welcome',
    onboardingStep: 'welcome',
    userEmail: '',
    userName: ''
  });

  // Mock auth completion handler
  const handleAuthComplete = (email: string, isNewUser: boolean) => {
    setJourneyState(prev => ({
      ...prev,
      phase: 'onboarding',
      userEmail: email,
      authStep: 'onboarding'
    }));
  };

  // Mock onboarding completion handler
  const handleOnboardingComplete = (userData: any) => {
    setJourneyState(prev => ({
      ...prev,
      phase: 'complete',
      userName: userData.name || 'New HIVE Member'
    }));
  };

  // Reset journey for demo purposes
  const resetJourney = () => {
    setJourneyState({
      phase: 'auth',
      authStep: 'welcome',
      onboardingStep: 'welcome',
      userEmail: '',
      userName: ''
    });
  };

  if (journeyState.phase === 'complete') {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Success State */}
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)]/60 flex items-center justify-center">
              <div className="text-3xl">🎉</div>
            </div>
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)]">
              Welcome to HIVE, {journeyState.userName}!
            </h1>
            <p className="text-[var(--hive-text-secondary)] text-lg">
              You're all set to start building your campus community at the University of Buffalo.
            </p>
          </div>

          {/* Next Steps Preview */}
          <div className="bg-[var(--hive-background-secondary)] rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-[var(--hive-text-primary)]">What's Next?</h3>
            <div className="space-y-3 text-sm text-[var(--hive-text-secondary)]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)]"></div>
                <span>Explore UB spaces and connect with classmates</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)]"></div>
                <span>Create your first campus tool or ritual</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)]"></div>
                <span>Join study groups and campus events</span>
              </div>
            </div>
          </div>

          {/* Demo Reset */}
          <button
            onClick={resetJourney}
            className="w-full px-6 py-3 bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-primary)] rounded-lg font-medium transition-colors"
          >
            ↻ Restart Journey Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Journey Progress Indicator */}
      <div className="fixed top-4 left-4 z-50 bg-[var(--hive-background-secondary)]/90 backdrop-blur-sm rounded-lg p-3 border border-[var(--hive-border-default)]">
        <div className="flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${journeyState.phase === 'auth' ? 'bg-[var(--hive-brand-secondary)]' : 'bg-[var(--hive-background-tertiary)]'}`}></div>
          <span className="text-[var(--hive-text-secondary)]">Auth</span>
          <div className="w-4 h-px bg-[var(--hive-border-default)]"></div>
          <div className={`w-2 h-2 rounded-full ${journeyState.phase === 'onboarding' ? 'bg-[var(--hive-brand-secondary)]' : 'bg-[var(--hive-background-tertiary)]'}`}></div>
          <span className="text-[var(--hive-text-secondary)]">Onboarding</span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetJourney}
        className="fixed top-4 right-4 z-50 px-3 py-2 bg-[var(--hive-background-secondary)]/90 backdrop-blur-sm hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-secondary)] text-xs rounded-lg font-medium transition-colors border border-[var(--hive-border-default)]"
      >
        ↻ Reset
      </button>

      {/* Auth Phase */}
      {journeyState.phase === 'auth' && (
        <AuthProvider>
          <HiveAuthFlowEnhanced 
            onAuthComplete={handleAuthComplete}
            initialStep={journeyState.authStep}
          />
        </AuthProvider>
      )}

      {/* Onboarding Phase */}
      {journeyState.phase === 'onboarding' && (
        <OnboardingProvider>
          <HiveOnboardingWizardEnhanced
            onComplete={handleOnboardingComplete}
            initialStep={journeyState.onboardingStep}
            userEmail={journeyState.userEmail}
          />
        </OnboardingProvider>
      )}
    </div>
  );
}

// Individual Auth Flow Stories
function AuthFlowShowcase() {
  const [currentStep, setCurrentStep] = useState<AuthStep>('welcome');
  
  const authSteps: { step: AuthStep; title: string; description: string }[] = [
    { step: 'welcome', title: 'Welcome Screen', description: 'Brand introduction and value proposition' },
    { step: 'sign-in', title: 'Sign In', description: 'Email and password authentication' },
    { step: 'sign-up', title: 'Sign Up', description: 'New account creation' },
    { step: 'forgot-password', title: 'Forgot Password', description: 'Password reset flow' },
    { step: 'verify-email', title: 'Email Verification', description: 'Email confirmation step' },
    { step: 'magic-link-sent', title: 'Magic Link', description: 'Passwordless authentication' },
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Step Selector */}
      <div className="fixed top-4 left-4 z-50 bg-[var(--hive-background-secondary)]/90 backdrop-blur-sm rounded-lg p-4 border border-[var(--hive-border-default)] max-w-xs">
        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-3 text-sm">Auth Flow Steps</h3>
        <div className="space-y-2">
          {authSteps.map(({ step, title, description }) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                currentStep === step 
                  ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/20' 
                  : 'hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-secondary)]'
              }`}
            >
              <div className="font-medium">{title}</div>
              <div className="text-[var(--hive-text-tertiary)] text-[10px]">{description}</div>
            </button>
          ))}
        </div>
      </div>

      <AuthProvider>
        <HiveAuthFlowEnhanced 
          initialStep={currentStep}
          onAuthComplete={() => {}}
        />
      </AuthProvider>
    </div>
  );
}

// Individual Onboarding Flow Stories
function OnboardingFlowShowcase() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  
  const onboardingSteps: { step: OnboardingStep; title: string; description: string }[] = [
    { step: 'welcome', title: 'Welcome', description: 'Onboarding introduction' },
    { step: 'name', title: 'Name Setup', description: 'Full name input' },
    { step: 'handle', title: 'Handle Selection', description: '@username creation' },
    { step: 'photo', title: 'Profile Photo', description: 'Avatar upload' },
    { step: 'academics', title: 'Academic Info', description: 'University details' },
    { step: 'builder', title: 'Builder Assessment', description: 'Skills evaluation' },
    { step: 'legal', title: 'Legal Agreements', description: 'Terms and privacy' },
    { step: 'complete', title: 'Completion', description: 'Success celebration' },
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Step Selector */}
      <div className="fixed top-4 left-4 z-50 bg-[var(--hive-background-secondary)]/90 backdrop-blur-sm rounded-lg p-4 border border-[var(--hive-border-default)] max-w-xs">
        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-3 text-sm">Onboarding Steps</h3>
        <div className="space-y-2">
          {onboardingSteps.map(({ step, title, description }) => (
            <button
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                currentStep === step 
                  ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/20' 
                  : 'hover:bg-[var(--hive-interactive-hover)] text-[var(--hive-text-secondary)]'
              }`}
            >
              <div className="font-medium">{title}</div>
              <div className="text-[var(--hive-text-tertiary)] text-[10px]">{description}</div>
            </button>
          ))}
        </div>
      </div>

      <OnboardingProvider>
        <HiveOnboardingWizardEnhanced
          initialStep={currentStep}
          onComplete={() => {}}
          userEmail="student@buffalo.edu"
        />
      </OnboardingProvider>
    </div>
  );
}

// =============================================================================
// STORYBOOK CONFIGURATION
// =============================================================================

const meta: Meta<typeof CompleteAuthOnboardingJourney> = {
  title: 'Complete User Journey/Auth & Onboarding Flow',
  component: CompleteAuthOnboardingJourney,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete user journey from authentication through onboarding to platform readiness. This showcases the seamless flow between all auth and onboarding components with campus-specific UB customization.'
      }
    },
    viewport: {
      defaultViewport: 'responsive',
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' },
        { name: 'light', value: '#FFFFFF' }
      ]
    }
  },
  tags: ['autodocs'],
  argTypes: {
    // No args for this story as it manages its own state
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// STORY VARIATIONS
// =============================================================================

export const CompleteUserJourney: Story = {
  name: '🎯 Complete User Journey',
  render: () => <CompleteAuthOnboardingJourney />,
  parameters: {
    docs: {
      description: {
        story: 'The complete user experience from first visit to onboarded HIVE member. Click through the entire flow to see seamless transitions between auth and onboarding.'
      }
    }
  }
};

export const IntegratedUserJourney: Story = {
  name: '🚀 Production Integration',
  render: () => (
    <HiveAuthOnboardingIntegration
      mockMode={true}
      schoolId="ub-buffalo"
      schoolName="University of Buffalo"
      schoolDomain="buffalo.edu"
      onAuthComplete={(user: any) => console.log('Auth completed:', user)}
      onOnboardingComplete={(data: any) => console.log('Onboarding completed:', data)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Production-ready integrated auth and onboarding flow. This component is designed to work with UnifiedAuth context and can be used directly in the web app.'
      }
    }
  }
};

export const AuthFlowSteps: Story = {
  name: '🔐 Auth Flow Showcase',
  render: () => <AuthFlowShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Individual authentication flow steps. Use the step selector to jump between different auth states and explore each screen in detail.'
      }
    }
  }
};

export const OnboardingFlowSteps: Story = {
  name: '👋 Onboarding Flow Showcase',
  render: () => <OnboardingFlowShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Individual onboarding wizard steps. Navigate through each onboarding screen to see the complete user setup experience.'
      }
    }
  }
};

// Mobile-specific story
export const MobileUserJourney: Story = {
  name: '📱 Mobile User Journey',
  render: () => <CompleteAuthOnboardingJourney />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Complete user journey optimized for mobile devices. Shows how the flow adapts to smaller screens with mobile-first design.'
      }
    }
  }
};

// Tablet-specific story
export const TabletUserJourney: Story = {
  name: '📟 Tablet User Journey',
  render: () => <CompleteAuthOnboardingJourney />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: 'User journey experience on tablet devices, showing responsive design adaptations for medium-sized screens.'
      }
    }
  }
};