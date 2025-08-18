/**
 * Minimal onboarding flow hook for slice integration
 */
import { useState } from 'react';
export function useOnboardingFlow() {
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        handle: '',
        schoolId: '',
        major: '',
        graduationYear: new Date().getFullYear() + 4,
        year: 'freshman',
        userType: 'student',
        currentStep: 'welcome',
        completedSteps: [],
        startedAt: new Date()
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const updateData = (updates) => {
        setData(prev => ({ ...prev, ...updates }));
    };
    const submitOnboarding = async () => {
        setIsLoading(true);
        try {
            // Submit logic here
            console.log('Onboarding submitted:', data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        }
        finally {
            setIsLoading(false);
        }
    };
    return {
        data,
        isLoading,
        error,
        updateData,
        submitOnboarding,
        progress: { percentComplete: 0, totalSteps: 5, completedSteps: 0 },
        currentStep: { id: 'welcome', title: 'Welcome' },
        nextStep: async () => { },
        previousStep: () => { },
        validateCurrentStep: () => ({ isValid: true, errors: {}, warnings: {} })
    };
}
//# sourceMappingURL=use-onboarding-flow.js.map