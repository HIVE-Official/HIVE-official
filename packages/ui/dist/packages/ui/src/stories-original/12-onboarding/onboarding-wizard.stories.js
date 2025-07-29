import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { HiveOnboardingWizard, OnboardingProvider, useOnboarding } from '../../components/onboarding/hive-onboarding-wizard';
const meta = {
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
export const Default = {
    args: {
        initialStep: 'welcome',
        mockMode: true,
        onComplete: (userData) => {
            console.log('Onboarding completed:', userData);
        }
    }
};
export const StartAtNameStep = {
    args: {
        initialStep: 'name',
        mockMode: true,
        onComplete: (userData) => {
            console.log('Onboarding completed:', userData);
        }
    }
};
export const StartAtHandleStep = {
    args: {
        initialStep: 'handle',
        mockMode: true,
        onComplete: (userData) => {
            console.log('Onboarding completed:', userData);
        }
    }
};
export const StartAtPhotoStep = {
    args: {
        initialStep: 'photo',
        mockMode: true,
        onComplete: (userData) => {
            console.log('Onboarding completed:', userData);
        }
    }
};
export const StartAtAcademicsStep = {
    args: {
        initialStep: 'academics',
        mockMode: true,
        onComplete: (userData) => {
            console.log('Onboarding completed:', userData);
        }
    }
};
export const StartAtBuilderStep = {
    args: {
        initialStep: 'builder',
        mockMode: true,
        onComplete: (userData) => {
            console.log('Onboarding completed:', userData);
        }
    }
};
export const StartAtLegalStep = {
    args: {
        initialStep: 'legal',
        mockMode: true,
        onComplete: (userData) => {
            console.log('Onboarding completed:', userData);
        }
    }
};
export const CompletionScreen = {
    args: {
        initialStep: 'complete',
        mockMode: true,
        onComplete: (userData) => {
            console.log('Onboarding completed:', userData);
        }
    }
};
// Interactive example with pre-filled data
export const PreFilledExample = {
    render: () => {
        return (_jsx(OnboardingProvider, { initialStep: "academics", mockMode: true, onComplete: (userData) => console.log('Completed:', userData), children: _jsx(PreFilledWizard, {}) }));
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
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]", children: _jsx("div", { className: "w-full max-w-2xl", children: _jsx("div", { className: "glass rounded-3xl p-8 space-y-8", children: _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Pre-filled Example" }), _jsx("p", { className: "text-[var(--hive-text-muted)] mt-2", children: "This demonstrates the onboarding flow with pre-populated data" })] }) }) }) }));
}
// Example with form validation showcase
export const ValidationShowcase = {
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
export const CampusExample = {
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
//# sourceMappingURL=onboarding-wizard.stories.js.map