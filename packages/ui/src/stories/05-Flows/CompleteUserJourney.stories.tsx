 
// @ts-nocheck
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthFlow, type School } from '../../components/auth';
import { 
  InterestsStep, 
  AcademicCardStep, 
  OnboardingCompleteStep 
} from '../../components/onboarding';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// StorybookThemeProvider removed with ui/ directory cleanup
import { ToastProvider } from '../../components/toast-provider';
import { action } from '@storybook/addon-actions';

// Full Website Layout Wrapper - simulates complete Next.js app structure
const FullWebsiteWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  
  return (
    <html lang="en" className="dark">
      <head>
        <title>HIVE - Complete User Journey</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            {children}
          </ToastProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

// Navigation component for post-onboarding state
const AppNavigation = ({ user }: { user: { email: string; fullName: string } }) => (
  <nav className="bg-surface-01 border-b border-border">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <div className="text-xl font-bold text-accent">HIVE</div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-muted">Welcome, {user.fullName}</span>
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-black text-sm font-semibold">
            {user.fullName.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

// Feed component for post-onboarding state
const FeedPage = ({ user }: { user: { email: string; fullName: string } }) => (
  <div className="min-h-screen bg-background">
    <AppNavigation user={user} />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h2 className="text-3xl font-display font-semibold text-foreground mb-4">
          Welcome to HIVE!
        </h2>
        
        <p className="text-lg text-muted font-sans mb-8 max-w-2xl mx-auto">
          You've successfully completed the authentication and onboarding flow. 
          This is your feed where you'll see posts from your campus community.
        </p>

        <div className="bg-surface-01 border border-border rounded-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-display font-semibold text-foreground mb-4">
            Your Profile
          </h3>
          
          <div className="space-y-3 text-left">
            <div className="flex justify-between">
              <span className="text-muted font-sans">Email:</span>
              <span className="font-sans">{user.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted font-sans">Name:</span>
              <span className="font-sans">{user.fullName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted font-sans">Status:</span>
              <span className="text-accent font-sans">✓ Authenticated</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-muted font-sans">
          <p>🎉 Complete User Journey Successful!</p>
          <p className="mt-2">Ready to connect with your campus community.</p>
        </div>
      </div>
    </main>
  </div>
);

// User journey state management
type JourneyState = 
  | { type: 'AUTH'; authState?: unknown }
  | { type: 'ONBOARDING'; user: { email: string; fullName: string }; currentStep: number }
  | { type: 'COMPLETE'; user: { email: string; fullName: string } };

// Mock data
const mockSchools: School[] = [
  { 
    id: '1', 
    name: 'University at Buffalo', 
    domain: 'buffalo.edu', 
    status: 'open', 
    isFeatured: true,
    location: 'Buffalo, NY',
    studentCount: 32000
  },
  { 
    id: '2', 
    name: 'Rochester Institute of Technology', 
    domain: 'rit.edu', 
    status: 'waitlist', 
    waitlistCount: 250,
    location: 'Rochester, NY',
    studentCount: 19000
  },
];

// Realistic network simulation
const simulateNetworkDelay = (min = 500, max = 1500) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

// Complete user journey component
const CompleteUserJourney = () => {
  const [journeyState, setJourneyState] = useState<JourneyState>({ type: 'AUTH' });

  const handleAuthComplete = async (email: string, _school: School) => {
    action('auth-complete')({ email });
    await simulateNetworkDelay(1000, 2000);
    
    // Extract name from email for demo
    const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim();
    const fullName = name.charAt(0).toUpperCase() + name.slice(1);
    
    setJourneyState({ 
      type: 'ONBOARDING', 
      user: { email, fullName },
      currentStep: 1 
    });
  };

  const handleOnboardingStep = async (stepData: Record<string, unknown>) => {
    action('onboarding-step')({ stepData });
    
    if (journeyState.type === 'ONBOARDING') {
      const nextStep = journeyState.currentStep + 1;
      
      if (nextStep > 3) {
        // Complete onboarding
        await simulateNetworkDelay(1000, 2000);
        setJourneyState({ 
          type: 'COMPLETE', 
          user: journeyState.user 
        });
      } else {
        setJourneyState({
          ...journeyState,
          currentStep: nextStep
        });
      }
    }
  };

  const renderContent = () => {
    switch (journeyState.type) {
      case 'AUTH':
        return (
          <AuthFlow
            schools={mockSchools}
            onMagicLinkRequest={async (email: string, school: School) => {
              await simulateNetworkDelay(1000, 2000);
              await handleAuthComplete(email, school);
              return { success: true, timeoutMs: 300000 };
            }}
            onCreateSchool={async (schoolName: string) => {
              action('create-school')({ schoolName });
              await simulateNetworkDelay(2000, 3000);
              return { schoolId: 'new-school', waitlistPosition: 1 };
            }}
          />
        );

      case 'ONBOARDING': {
        const { user, currentStep } = journeyState;
        
        const renderOnboardingStep = () => {
          const commonProps = {
            onSubmit: handleOnboardingStep,
            onSkip: () => handleOnboardingStep({}),
          };

          switch (currentStep) {
            case 1:
              return (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold font-display mb-2">Welcome to HIVE, {user.fullName}!</h1>
                    <p className="text-muted">Let's personalize your experience</p>
                  </div>
                  <InterestsStep {...commonProps} />
                </div>
              );
            case 2:
              return (
                <div className="space-y-6">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold font-display mb-2">Academic Information</h1>
                    <p className="text-muted">Tell us about your studies</p>
                  </div>
                  <AcademicCardStep {...commonProps} />
                </div>
              );
            case 3:
              return (
                <div className="space-y-6">
                  <OnboardingCompleteStep 
                    onSubmit={async () => {
                      await handleOnboardingStep({ completed: true });
                    }}
                  />
                </div>
              );
            default:
              return null;
          }
        };

        return (
          <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Step {currentStep} of 3</span>
                  <span className="text-sm text-muted">{Math.round((currentStep / 3) * 100)}% complete</span>
                </div>
                <div className="w-full bg-surface-01 rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>
              
              {renderOnboardingStep()}
            </div>
          </main>
        );
      }

      case 'COMPLETE':
        return <FeedPage user={journeyState.user} />;

      default:
        return null;
    }
  };

  return renderContent();
};

// Journey reset component for testing
const JourneyWithReset = () => {
  const [key, setKey] = useState(0);
  
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setKey(k => k + 1)}
          className="bg-accent text-black px-4 py-2 rounded-md text-sm font-semibold"
        >
          Reset Journey
        </button>
      </div>
      <CompleteUserJourney key={key} />
    </div>
  );
};

const meta: Meta<typeof React.Fragment> = {
  title: 'Full Website/Complete User Journey',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: `
# Complete User Journey - Full Website Experience

This story demonstrates the entire HIVE user experience from first visit to active use:

## 🎯 Complete Flow Coverage:
1. **Authentication** → School selection and magic link flow
2. **Email Verification** → Simulated magic link success
3. **Onboarding** → 3-step profile setup with progress tracking
4. **Feed Access** → Welcome to the main application

## 🚀 Real-World Simulation:
- **Network delays** with realistic timing
- **State persistence** across the entire journey
- **Progress tracking** throughout onboarding
- **Complete responsive design** for all viewports

## 📱 Cross-Platform Testing:
- **Mobile**: Touch-optimized throughout entire flow
- **Tablet**: Enhanced spacing and interaction areas
- **Desktop**: Full keyboard navigation and optimal layouts
        `,
      },
    },
  },
  decorators: [
    (Story: any) => (
      <FullWebsiteWrapper>
        <Story />
      </FullWebsiteWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const CompleteFlow: Story = {
  render: () => <JourneyWithReset />,
  parameters: {
    docs: {
      description: {
        story: `
## 🚀 Complete User Journey

Experience the full HIVE user journey from start to finish:

### 📋 Journey Steps:
1. **Authentication Flow**
   - School selection (UB featured)
   - Email entry with validation
   - Magic link simulation
   
2. **Onboarding Flow** 
   - Interest selection
   - Academic information
   - Completion celebration
   
3. **Application Access**
   - Welcome to main feed
   - Profile information display
   - Full navigation available

### 🧪 Test Instructions:
- Use \`student@buffalo.edu\` for fastest path
- Complete all onboarding steps or skip any
- Use Reset button to restart journey

### 📱 Responsive Testing:
Switch viewports to test the complete flow on different devices.
        `,
      },
    },
  },
};

export const MobileJourney: Story = {
  render: () => <JourneyWithReset />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: `
## 📱 Mobile-First Complete Journey

The entire user experience optimized for mobile with touch-friendly interactions throughout.
        `,
      },
    },
  },
}; 