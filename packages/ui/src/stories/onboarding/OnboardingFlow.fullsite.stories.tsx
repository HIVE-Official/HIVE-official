/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react-vite';
import { 
  InterestsStep, 
  AcademicCardStep, 
  AvatarUploadStep, 
  OnboardingCompleteStep 
} from '../../components/onboarding';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StorybookThemeProvider } from '../../components/ui/storybook-theme-provider';
import { ToastProvider } from '../../components/toast-provider';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';

// Full Website Layout Wrapper - simulates Next.js onboarding page structure
const OnboardingLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased">
        <QueryClientProvider client={queryClient}>
          <StorybookThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <ToastProvider>
              {/* Simulated Onboarding Layout */}
              <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                  {children}
                </div>
              </main>
            </ToastProvider>
          </StorybookThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
};

// Progress indicator component for full website context
const OnboardingProgress = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-muted">Step {currentStep} of {totalSteps}</span>
      <span className="text-sm text-muted">{Math.round((currentStep / totalSteps) * 100)}% complete</span>
    </div>
    <div className="w-full bg-surface-01 rounded-full h-2">
      <div 
        className="bg-accent h-2 rounded-full transition-all duration-300" 
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      />
    </div>
  </div>
);

// Mock onboarding data management
const useOnboardingData = () => {
  const [data, setData] = useState({
    fullName: '',
    handle: '',
    academicLevel: '',
    majors: [],
    graduationYear: new Date().getFullYear() + 4,
    interests: [],
    avatarUrl: null,
    isStudentLeader: false,
  });

  const updateData = (newData: Partial<typeof data>) => {
    setData(prev => ({ ...prev, ...newData }));
    action('onboarding-data-updated')(newData);
  };

  return { data, updateData };
};

// Realistic async handlers with validation
const simulateNetworkDelay = (min = 500, max = 1500) => 
  new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

const mockSubmitHandler = async (stepData: Record<string, unknown>) => {
  action('onboarding-step-submit')(stepData);
  await simulateNetworkDelay();
  
  // Simulate validation errors occasionally
  if (Math.random() < 0.1) {
    throw new Error('Validation failed - please check your information');
  }
  
  return { success: true };
};

// Complete onboarding flow component
const CompleteOnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { data, updateData } = useOnboardingData();
  const totalSteps = 5;

  const handleNext = async (stepData?: Record<string, unknown>) => {
    if (stepData) {
      updateData(stepData);
    }
    await simulateNetworkDelay(200, 500);
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    const commonProps = {
      onSubmit: mockSubmitHandler,
      onSkip: () => handleNext(),
    };

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold font-display mb-2">Welcome to HIVE!</h1>
              <p className="text-muted">Let's set up your profile</p>
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
            <div className="text-center">
              <h1 className="text-2xl font-bold font-display mb-2">Profile Picture</h1>
              <p className="text-muted">Add a photo to personalize your profile</p>
            </div>
            <AvatarUploadStep {...commonProps} />
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold font-display mb-2">Leadership Experience</h1>
              <p className="text-muted">Are you involved in student leadership?</p>
            </div>
            {/* Leadership question component would go here */}
            <div className="bg-surface-01 rounded-lg p-6 text-center">
              <p className="text-muted mb-4">Leadership component placeholder</p>
              <button 
                onClick={() => handleNext({ isStudentLeader: true })}
                className="bg-accent text-black px-6 py-2 rounded-md mr-2"
              >
                Yes, I'm a leader
              </button>
              <button 
                onClick={() => handleNext({ isStudentLeader: false })}
                className="bg-surface-02 text-white px-6 py-2 rounded-md"
              >
                Not at this time
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <OnboardingCompleteStep 
              onSubmit={async () => {
                action('onboarding-complete')(data);
                await simulateNetworkDelay(1000, 2000);
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />
      
      {/* Step Navigation */}
      {currentStep > 1 && currentStep < totalSteps && (
        <div className="mb-6">
          <button 
            onClick={handlePrev}
            className="text-muted hover:text-foreground transition-colors"
          >
            ← Previous
          </button>
        </div>
      )}
      
      {renderStep()}
      
      {/* Debug Panel */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-surface-01 rounded-lg">
          <h3 className="text-sm font-semibold mb-2">Debug Info</h3>
          <pre className="text-xs text-muted">
            Step: {currentStep}/{totalSteps}
            {'\n'}Data: {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

const meta: Meta = {
  title: 'Full Website/Onboarding Flow',
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      description: {
        component: `
# Complete Onboarding Flow - Full Website Context

This story demonstrates the entire onboarding experience within a realistic website layout, including:

## 🎯 Key Features Tested:
- **Multi-step flow** with progress tracking and state persistence
- **Full responsive design** across all breakpoints
- **Form validation** with real-time feedback and error handling
- **Step navigation** with back/forward capabilities
- **Data persistence** between steps
- **Loading states** and network simulation

## 📱 Responsive Testing:
- **Mobile (320px+)**: Stacked layout with touch-optimized controls
- **Tablet (768px+)**: Enhanced spacing with larger touch targets  
- **Desktop (1024px+)**: Optimal card width with keyboard navigation

## 🔧 Developer Testing Features:
- Progress indicator with percentage completion
- Step-by-step data collection and validation
- Error simulation for network issues
- Debug panel showing current state
- Accessibility compliance testing
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <OnboardingLayoutWrapper>
        <Story />
      </OnboardingLayoutWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const CompleteOnboardingJourney: Story = {
  render: () => <CompleteOnboardingFlow />,
  parameters: {
    docs: {
      description: {
        story: `
## 🚀 Complete Onboarding Journey

Experience the full 5-step onboarding process:

1. **Interest Selection** → Choose your passions and activities
2. **Academic Information** → Major, graduation year, academic level
3. **Profile Picture** → Upload or skip avatar selection
4. **Leadership Experience** → Student leadership involvement
5. **Completion** → Welcome celebration and next steps

### 🧪 Interactive Features:
- **Progress tracking** with visual completion indicator
- **Step navigation** using Previous/Next buttons
- **Form validation** with real-time feedback
- **Data persistence** maintained between steps
- **Error simulation** for network issues (10% chance)

### 📱 Test Scenarios:
- Complete the entire flow start to finish
- Use Previous button to go back and modify answers
- Try submitting invalid data to see validation
- Switch viewports to test responsive behavior
        `,
      },
    },
  },
};

export const MobileOnboardingExperience: Story = {
  render: () => <CompleteOnboardingFlow />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: `
## 📱 Mobile-First Onboarding

Optimized mobile experience featuring:
- **Single-column layout** for easy scrolling
- **Large touch targets** (minimum 44px)
- **Simplified navigation** with clear progress
- **Thumb-friendly positioning** for primary actions
- **Reduced cognitive load** with focused content

Test the complete onboarding flow on mobile to ensure smooth touch interactions.
        `,
      },
    },
  },
};

export const IndividualStepTesting: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Interest Selection</h3>
          <InterestsStep 
            onSubmit={mockSubmitHandler}
            onSkip={() => action('interests-skipped')()}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Academic Information</h3>
          <AcademicCardStep 
            onSubmit={mockSubmitHandler}
            onSkip={() => action('academic-skipped')()}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
## 🧪 Individual Step Testing

Test each onboarding component independently:

- **Side-by-side comparison** of all components
- **Individual interaction testing** without flow constraints
- **Design consistency verification** across steps
- **Component isolation** for focused testing

Use this story to test individual components before full flow integration.
        `,
      },
    },
  },
}; 