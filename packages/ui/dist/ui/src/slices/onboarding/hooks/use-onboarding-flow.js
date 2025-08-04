/**
 * useOnboardingFlow Hook
 *
 * Manages the complete onboarding flow state, step progression,
 * data validation, and persistence for HIVE user onboarding.
 */
"use client";
import { useState, useCallback, useEffect } from 'react';
import { ONBOARDING_STEPS, ONBOARDING_CONFIG, ERROR_MESSAGES } from '../constants.js';
const initialOnboardingData = {
    firstName: '',
    lastName: '',
    email: '',
    handle: '',
    profilePhoto: undefined,
    schoolId: '',
    schoolName: '',
    graduationYear: new Date().getFullYear() + 4,
    major: '',
    year: 'freshman',
    userType: 'student',
    isBuilder: false,
    interests: [],
    hasAcceptedTerms: false,
    hasAcceptedPrivacy: false,
    hasAcceptedCommunityGuidelines: false,
    notificationPreferences: {
        email: true,
        push: true,
        sms: false
    },
    currentStep: 'welcome',
    completedSteps: [],
    startedAt: new Date()
};
export function useOnboardingFlow() {
    const [data, setData] = useState(initialOnboardingData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Get current step details
    const currentStep = ONBOARDING_STEPS.find(step => step.id === data.currentStep) || ONBOARDING_STEPS[0];
    // Calculate progress
    const progress = {
        totalSteps: ONBOARDING_STEPS.length,
        completedSteps: data.completedSteps.length,
        currentStepIndex: ONBOARDING_STEPS.findIndex(step => step.id === data.currentStep),
        percentComplete: Math.round((data.completedSteps.length / ONBOARDING_STEPS.length) * 100),
        estimatedTimeRemaining: Math.max(0, (ONBOARDING_STEPS.length - data.completedSteps.length) * 2) // 2 min per step
    };
    // Auto-save data to localStorage
    useEffect(() => {
        const autoSave = setTimeout(() => {
            try {
                localStorage.setItem('hive-onboarding-data', JSON.stringify(data));
            }
            catch (err) {
                console.warn('Failed to save onboarding data:', err);
            }
        }, ONBOARDING_CONFIG.autoSaveInterval * 1000);
        return () => clearTimeout(autoSave);
    }, [data]);
    // Load saved data on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('hive-onboarding-data');
            if (saved) {
                const parsedData = JSON.parse(saved);
                setData(prev => ({ ...prev, ...parsedData }));
            }
        }
        catch (err) {
            console.warn('Failed to load saved onboarding data:', err);
        }
    }, []);
    // Update onboarding data
    const updateData = useCallback((updates) => {
        setData(prev => ({ ...prev, ...updates }));
        setError(null);
    }, []);
    // Validate current step
    const validateCurrentStep = useCallback(() => {
        const errors = {};
        const warnings = {};
        switch (data.currentStep) {
            case 'name':
                if (!data.firstName.trim()) {
                    errors.firstName = [ERROR_MESSAGES.required];
                }
                if (!data.lastName.trim()) {
                    errors.lastName = [ERROR_MESSAGES.required];
                }
                if (data.firstName.length > ONBOARDING_CONFIG.nameMaxLength) {
                    errors.firstName = [ERROR_MESSAGES.nameTooLong];
                }
                if (data.lastName.length > ONBOARDING_CONFIG.nameMaxLength) {
                    errors.lastName = [ERROR_MESSAGES.nameTooLong];
                }
                break;
            case 'handle':
                if (!data.handle.trim()) {
                    errors.handle = [ERROR_MESSAGES.required];
                }
                else if (data.handle.length < ONBOARDING_CONFIG.handleMinLength) {
                    errors.handle = [ERROR_MESSAGES.handleTooShort];
                }
                else if (data.handle.length > ONBOARDING_CONFIG.handleMaxLength) {
                    errors.handle = [ERROR_MESSAGES.handleTooLong];
                }
                break;
            case 'user-type':
                if (!data.userType) {
                    errors.userType = [ERROR_MESSAGES.required];
                }
                break;
            case 'academics':
                if (!data.major.trim()) {
                    errors.major = [ERROR_MESSAGES.required];
                }
                if (!data.graduationYear) {
                    errors.graduationYear = [ERROR_MESSAGES.required];
                }
                if (data.userType === 'student' && !data.year) {
                    errors.year = [ERROR_MESSAGES.required];
                }
                break;
            case 'legal':
                if (!data.hasAcceptedTerms) {
                    errors.terms = ['You must accept the Terms of Service'];
                }
                if (!data.hasAcceptedPrivacy) {
                    errors.privacy = ['You must accept the Privacy Policy'];
                }
                if (!data.hasAcceptedCommunityGuidelines) {
                    errors.guidelines = ['You must accept the Community Guidelines'];
                }
                break;
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors,
            warnings
        };
    }, [data]);
    // Move to next step
    const nextStep = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Validate current step
            const validation = validateCurrentStep();
            if (!validation.isValid) {
                setError(ERROR_MESSAGES.validationFailed);
                return;
            }
            // Mark current step as completed
            const updatedCompletedSteps = [...data.completedSteps];
            if (!updatedCompletedSteps.includes(data.currentStep)) {
                updatedCompletedSteps.push(data.currentStep);
            }
            // Find next step
            const currentIndex = ONBOARDING_STEPS.findIndex(step => step.id === data.currentStep);
            let nextIndex = currentIndex + 1;
            // Skip faculty info step for non-faculty users
            if (ONBOARDING_STEPS[nextIndex]?.id === 'faculty-info' && data.userType !== 'faculty') {
                nextIndex += 1;
            }
            // Check if we're at the end
            if (nextIndex >= ONBOARDING_STEPS.length) {
                // Complete onboarding
                await submitOnboarding();
                return;
            }
            const nextStep = ONBOARDING_STEPS[nextIndex];
            updateData({
                currentStep: nextStep.id,
                completedSteps: updatedCompletedSteps
            });
        }
        catch (err) {
            setError(err instanceof Error ? err.message : ERROR_MESSAGES.serverError);
        }
        finally {
            setIsLoading(false);
        }
    }, [data, validateCurrentStep, updateData]);
    // Move to previous step
    const previousStep = useCallback(() => {
        const currentIndex = ONBOARDING_STEPS.findIndex(step => step.id === data.currentStep);
        if (currentIndex > 0) {
            let prevIndex = currentIndex - 1;
            // Skip faculty info step for non-faculty users when going backwards
            if (ONBOARDING_STEPS[prevIndex]?.id === 'faculty-info' && data.userType !== 'faculty') {
                prevIndex -= 1;
            }
            if (prevIndex >= 0) {
                const prevStep = ONBOARDING_STEPS[prevIndex];
                updateData({ currentStep: prevStep.id });
            }
        }
    }, [data.currentStep, data.userType, updateData]);
    // Go to specific step
    const goToStep = useCallback((stepId) => {
        const step = ONBOARDING_STEPS.find(s => s.id === stepId);
        if (step) {
            updateData({ currentStep: stepId });
        }
    }, [updateData]);
    // Submit complete onboarding
    const submitOnboarding = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Final validation
            const validation = validateCurrentStep();
            if (!validation.isValid) {
                setError(ERROR_MESSAGES.validationFailed);
                return;
            }
            // Here you would typically make an API call to submit the onboarding data
            // For now, we'll simulate success
            await new Promise(resolve => setTimeout(resolve, 2000));
            updateData({
                completedAt: new Date(),
                completedSteps: ONBOARDING_STEPS.map(step => step.id)
            });
            // Clear saved data
            localStorage.removeItem('hive-onboarding-data');
            // Redirect to dashboard or next page would happen here
            console.log('Onboarding completed successfully!', data);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : ERROR_MESSAGES.serverError);
        }
        finally {
            setIsLoading(false);
        }
    }, [data, validateCurrentStep, updateData]);
    return {
        data,
        progress,
        currentStep,
        isLoading,
        error,
        updateData,
        nextStep,
        previousStep,
        goToStep,
        submitOnboarding,
        validateCurrentStep
    };
}
//# sourceMappingURL=use-onboarding-flow.js.map