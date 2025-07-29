"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils.js';
import { HiveButton } from '../hive-button.js';
import { ArrowLeft, ArrowRight, Check, Upload, Search, Zap, BookOpen, Users, Scale, Camera, User, Hash, GraduationCap, Loader2 } from 'lucide-react';
const OnboardingContext = createContext(null);
export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within OnboardingProvider');
    }
    return context;
}
// =============================================================================
// ONBOARDING PROVIDER
// =============================================================================
const STEP_ORDER = [
    'welcome', 'name', 'handle', 'photo', 'academics', 'builder', 'legal', 'complete'
];
export function OnboardingProvider({ children, onComplete, initialStep = 'welcome', mockMode = false }) {
    const [state, setState] = useState({
        step: initialStep,
        currentStepIndex: STEP_ORDER.indexOf(initialStep),
        loading: false,
        error: null,
        data: {
            name: '',
            handle: '',
            university: '',
            major: '',
            graduationYear: '',
            interests: [],
            builderExperience: 'none',
            builderGoals: [],
            agreedToTerms: false,
            agreedToPrivacy: false,
            agreedToCommunity: false,
        },
    });
    const nextStep = () => {
        const nextIndex = Math.min(state.currentStepIndex + 1, STEP_ORDER.length - 1);
        setState(prev => ({
            ...prev,
            step: STEP_ORDER[nextIndex],
            currentStepIndex: nextIndex,
            error: null,
        }));
    };
    const prevStep = () => {
        const prevIndex = Math.max(state.currentStepIndex - 1, 0);
        setState(prev => ({
            ...prev,
            step: STEP_ORDER[prevIndex],
            currentStepIndex: prevIndex,
            error: null,
        }));
    };
    const setStep = (step) => {
        const stepIndex = STEP_ORDER.indexOf(step);
        setState(prev => ({
            ...prev,
            step,
            currentStepIndex: stepIndex,
            error: null,
        }));
    };
    const updateData = (updates) => {
        setState(prev => ({
            ...prev,
            data: { ...prev.data, ...updates },
        }));
    };
    const setLoading = (loading) => {
        setState(prev => ({ ...prev, loading }));
    };
    const setError = (error) => {
        setState(prev => ({ ...prev, error }));
    };
    const canProceed = () => {
        const { data, step } = state;
        switch (step) {
            case 'welcome':
                return true;
            case 'name':
                return data.name.trim().length >= 2;
            case 'handle':
                return data.handle.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(data.handle);
            case 'photo':
                return true; // Photo is optional
            case 'academics':
                return data.university.trim().length > 0 && data.major.trim().length > 0 && data.graduationYear.length > 0;
            case 'builder':
                return data.builderExperience !== 'none' || data.builderGoals.length > 0;
            case 'legal':
                return data.agreedToTerms && data.agreedToPrivacy && data.agreedToCommunity;
            case 'complete':
                return true;
            default:
                return false;
        }
    };
    const completeOnboarding = async () => {
        setLoading(true);
        setError(null);
        try {
            if (mockMode) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                onComplete?.(state.data);
            }
            else {
                // Real implementation would go here
                console.log('Complete onboarding:', state.data);
                onComplete?.(state.data);
            }
        }
        catch (error) {
            setError('Failed to complete onboarding. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const contextValue = {
        state,
        nextStep,
        prevStep,
        setStep,
        updateData,
        setLoading,
        setError,
        canProceed,
        completeOnboarding,
    };
    return (_jsx(OnboardingContext.Provider, { value: contextValue, children: children }));
}
export function HiveOnboardingWizard({ className, onComplete, initialStep = 'welcome', mockMode = false }) {
    return (_jsx(OnboardingProvider, { onComplete: onComplete, initialStep: initialStep, mockMode: mockMode, children: _jsx("div", { className: cn("min-h-screen flex items-center justify-center p-4", "bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]", className), children: _jsx("div", { className: "w-full max-w-2xl", children: _jsx(OnboardingStepRenderer, {}) }) }) }));
}
// =============================================================================
// STEP RENDERER
// =============================================================================
function OnboardingStepRenderer() {
    const { state } = useOnboarding();
    switch (state.step) {
        case 'welcome':
            return _jsx(WelcomeStep, {});
        case 'name':
            return _jsx(NameStep, {});
        case 'handle':
            return _jsx(HandleStep, {});
        case 'photo':
            return _jsx(PhotoStep, {});
        case 'academics':
            return _jsx(AcademicsStep, {});
        case 'builder':
            return _jsx(BuilderStep, {});
        case 'legal':
            return _jsx(LegalStep, {});
        case 'complete':
            return _jsx(CompleteStep, {});
        default:
            return _jsx(WelcomeStep, {});
    }
}
// =============================================================================
// SHARED COMPONENTS
// =============================================================================
function ProgressBar() {
    const { state } = useOnboarding();
    const progress = ((state.currentStepIndex + 1) / STEP_ORDER.length) * 100;
    return (_jsx("div", { className: "w-full h-2 bg-[var(--hive-background-secondary)] rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-[var(--hive-brand-primary)] transition-all duration-500 ease-out", style: { width: `${progress}%` } }) }));
}
function StepNavigation({ canGoBack = true, nextLabel = "Continue" }) {
    const { state, prevStep, nextStep, canProceed } = useOnboarding();
    return (_jsxs("div", { className: "flex justify-between items-center pt-6", children: [canGoBack && state.currentStepIndex > 0 ? (_jsxs(HiveButton, { variant: "ghost", onClick: prevStep, disabled: state.loading, className: "flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] })) : (_jsx("div", {})), _jsxs(HiveButton, { variant: "premium", onClick: nextStep, disabled: !canProceed() || state.loading, className: "flex items-center gap-2", children: [state.loading && _jsx(Loader2, { className: "h-4 w-4 animate-spin" }), nextLabel, _jsx(ArrowRight, { className: "h-4 w-4" })] })] }));
}
// =============================================================================
// ONBOARDING STEPS
// =============================================================================
function WelcomeStep() {
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-8", children: [_jsx(ProgressBar, {}), _jsxs("div", { className: "text-center space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-20 h-20 bg-[var(--hive-brand-primary)] rounded-3xl flex items-center justify-center animate-pulse", children: _jsx("div", { className: "w-10 h-10 bg-[var(--hive-background-primary)] rounded-xl" }) }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)]", children: "Welcome to HIVE" }), _jsx("p", { className: "text-xl text-[var(--hive-text-muted)] max-w-md mx-auto", children: "Let's build your builder profile and get you connected to your campus community" })] }), _jsxs("div", { className: "glass rounded-2xl p-6 space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "What you'll do:" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2 text-[var(--hive-text-muted)]", children: [_jsx(User, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), "Set up your profile"] }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--hive-text-muted)]", children: [_jsx(GraduationCap, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), "Connect to your university"] }), _jsxs("div", { className: "flex items-center gap-2 text-[var(--hive-text-muted)]", children: [_jsx(Zap, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }), "Choose your builder path"] })] })] })] }), _jsx(StepNavigation, { canGoBack: false, nextLabel: "Get Started" })] }));
}
function NameStep() {
    const { state, updateData, setError } = useOnboarding();
    const handleNameChange = (name) => {
        updateData({ name });
        if (name.trim().length < 2) {
            setError('Name must be at least 2 characters');
        }
        else {
            setError(null);
        }
    };
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-8", children: [_jsx(ProgressBar, {}), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "What's your name?" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "This is how you'll appear to other builders in your campus community" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Full Name" }), _jsx("input", { type: "text", value: state.data.name, onChange: (e) => handleNameChange(e.target.value), placeholder: "Alex Rivera", className: "w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), state.error && (_jsx("p", { className: "text-sm text-[var(--hive-status-error)]", children: state.error }))] })] }), _jsx(StepNavigation, {})] }));
}
function HandleStep() {
    const { state, updateData, setError } = useOnboarding();
    const handleUsernameChange = (handle) => {
        // Remove @ if user types it
        const cleanHandle = handle.replace('@', '');
        updateData({ handle: cleanHandle });
        if (cleanHandle.length < 3) {
            setError('Username must be at least 3 characters');
        }
        else if (!/^[a-zA-Z0-9_]+$/.test(cleanHandle)) {
            setError('Username can only contain letters, numbers, and underscores');
        }
        else {
            setError(null);
        }
    };
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-8", children: [_jsx(ProgressBar, {}), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Hash, { className: "h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "Choose your handle" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Your unique identifier that other builders will use to find and mention you" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Username" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-lg text-[var(--hive-text-muted)]", children: "@" }), _jsx("input", { type: "text", value: state.data.handle, onChange: (e) => handleUsernameChange(e.target.value), placeholder: "alexrivera", className: "w-full h-14 pl-8 pr-4 text-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] })] }), state.error && (_jsx("p", { className: "text-sm text-[var(--hive-status-error)]", children: state.error })), state.data.handle && !state.error && (_jsx("div", { className: "glass rounded-xl p-3 bg-[var(--hive-status-success)]/10 border border-[var(--hive-status-success)]/20", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Check, { className: "h-4 w-4 text-[var(--hive-status-success)]" }), _jsxs("span", { className: "text-sm text-[var(--hive-status-success)]", children: ["@", state.data.handle, " is available"] })] }) }))] })] }), _jsx(StepNavigation, {})] }));
}
function PhotoStep() {
    const { state, updateData } = useOnboarding();
    const [dragActive, setDragActive] = useState(false);
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const photoUrl = URL.createObjectURL(file);
            updateData({ photoUrl });
        }
    };
    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const photoUrl = URL.createObjectURL(file);
            updateData({ photoUrl });
        }
    };
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-8", children: [_jsx(ProgressBar, {}), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Camera, { className: "h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "Add a profile photo" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Help other builders recognize you (you can skip this step)" })] }), _jsx("div", { className: "flex justify-center", children: state.data.photoUrl ? (_jsxs("div", { className: "relative", children: [_jsx("img", { src: state.data.photoUrl, alt: "Profile", className: "w-32 h-32 rounded-full object-cover border-4 border-[var(--hive-brand-primary)]" }), _jsx("button", { onClick: () => updateData({ photoUrl: undefined }), className: "absolute -top-2 -right-2 w-8 h-8 bg-[var(--hive-status-error)] rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-bold hover:bg-[var(--hive-status-error)]/80 transition-colors", children: "\u00D7" })] })) : (_jsxs("div", { className: cn("w-64 h-64 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-all", dragActive
                                ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                                : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"), onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: () => document.getElementById('photo-upload')?.click(), children: [_jsx(Upload, { className: "h-12 w-12 text-[var(--hive-text-muted)]" }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-[var(--hive-text-primary)] font-medium", children: "Drop a photo here" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "or click to browse" })] })] })) }), _jsx("input", { id: "photo-upload", type: "file", accept: "image/*", onChange: handleFileInput, className: "hidden" })] }), _jsx(StepNavigation, { nextLabel: state.data.photoUrl ? "Continue" : "Skip for now" })] }));
}
function AcademicsStep() {
    const { state, updateData } = useOnboarding();
    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from({ length: 8 }, (_, i) => (currentYear + i).toString());
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-8", children: [_jsx(ProgressBar, {}), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(GraduationCap, { className: "h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "Academic Info" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Connect with your campus community and relevant spaces" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "University" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", value: state.data.university, onChange: (e) => updateData({ university: e.target.value }), placeholder: "Search for your university...", className: "w-full h-12 pl-10 pr-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Major/Field of Study" }), _jsx("input", { type: "text", value: state.data.major, onChange: (e) => updateData({ major: e.target.value }), placeholder: "Computer Science, Business, etc.", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Expected Graduation Year" }), _jsxs("select", { value: state.data.graduationYear, onChange: (e) => updateData({ graduationYear: e.target.value }), className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading, children: [_jsx("option", { value: "", children: "Select graduation year" }), graduationYears.map(year => (_jsx("option", { value: year, children: year }, year)))] })] })] })] }), _jsx(StepNavigation, {})] }));
}
function BuilderStep() {
    const { state, updateData } = useOnboarding();
    const experiences = [
        { value: 'none', label: 'No experience', description: 'New to building digital tools' },
        { value: 'beginner', label: 'Beginner', description: 'Some basic coding or tool-building experience' },
        { value: 'intermediate', label: 'Intermediate', description: 'Built apps or tools before' },
        { value: 'advanced', label: 'Advanced', description: 'Experienced developer or maker' },
    ];
    const goals = [
        { id: 'learn', label: 'Learn to build', icon: BookOpen },
        { id: 'solve', label: 'Solve campus problems', icon: Zap },
        { id: 'connect', label: 'Connect with builders', icon: Users },
        { id: 'impact', label: 'Create campus impact', icon: Scale },
    ];
    const toggleGoal = (goalId) => {
        const currentGoals = state.data.builderGoals;
        const newGoals = currentGoals.includes(goalId)
            ? currentGoals.filter(g => g !== goalId)
            : [...currentGoals, goalId];
        updateData({ builderGoals: newGoals });
    };
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-8", children: [_jsx(ProgressBar, {}), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Zap, { className: "h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "Your Builder Journey" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Help us understand your experience and goals so we can personalize HIVE for you" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-3", children: "Building Experience" }), _jsx("div", { className: "space-y-2", children: experiences.map((exp) => (_jsxs("label", { className: cn("flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all", state.data.builderExperience === exp.value
                                                ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                                                : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"), children: [_jsx("input", { type: "radio", name: "experience", value: exp.value, checked: state.data.builderExperience === exp.value, onChange: (e) => updateData({ builderExperience: e.target.value }), className: "sr-only" }), _jsx("div", { className: cn("w-4 h-4 rounded-full border-2 flex items-center justify-center", state.data.builderExperience === exp.value
                                                        ? "border-[var(--hive-brand-primary)]"
                                                        : "border-[var(--hive-border-primary)]"), children: state.data.builderExperience === exp.value && (_jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--hive-brand-primary)]" })) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: exp.label }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: exp.description })] })] }, exp.value))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-3", children: "What do you want to do on HIVE? (Select all that apply)" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: goals.map((goal) => {
                                            const Icon = goal.icon;
                                            const isSelected = state.data.builderGoals.includes(goal.id);
                                            return (_jsxs("button", { onClick: () => toggleGoal(goal.id), className: cn("p-4 rounded-xl border transition-all text-left", isSelected
                                                    ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                                                    : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"), children: [_jsx(Icon, { className: cn("h-6 w-6 mb-2", isSelected ? "text-[var(--hive-brand-primary)]" : "text-[var(--hive-text-muted)]") }), _jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: goal.label }), isSelected && (_jsx(Check, { className: "h-4 w-4 text-[var(--hive-brand-primary)] mt-1" }))] }, goal.id));
                                        }) })] })] })] }), _jsx(StepNavigation, {})] }));
}
function LegalStep() {
    const { state, updateData } = useOnboarding();
    const agreements = [
        {
            key: 'agreedToTerms',
            title: 'Terms of Service',
            description: 'I agree to HIVE\'s terms of service and acceptable use policy',
        },
        {
            key: 'agreedToPrivacy',
            title: 'Privacy Policy',
            description: 'I understand how HIVE collects, uses, and protects my data',
        },
        {
            key: 'agreedToCommunity',
            title: 'Community Guidelines',
            description: 'I will follow HIVE\'s community guidelines and respect other builders',
        },
    ];
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-8", children: [_jsx(ProgressBar, {}), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Scale, { className: "h-8 w-8 text-[var(--hive-brand-primary)] mx-auto" }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "Community Agreements" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Please review and accept our community standards to complete your registration" })] }), _jsx("div", { className: "space-y-4", children: agreements.map((agreement) => (_jsxs("label", { className: "flex items-start gap-3 p-4 rounded-xl border border-[var(--hive-border-primary)] cursor-pointer hover:border-[var(--hive-border-secondary)] transition-all", children: [_jsx("input", { type: "checkbox", checked: state.data[agreement.key], onChange: (e) => updateData({ [agreement.key]: e.target.checked }), className: "mt-1 w-4 h-4 rounded border-[var(--hive-border-primary)] text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/30" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: agreement.title }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)] mt-1", children: agreement.description })] })] }, agreement.key))) }), _jsx("div", { className: "text-center text-sm text-[var(--hive-text-muted)]", children: "By continuing, you confirm that you are at least 13 years old and agree to all the above terms." })] }), _jsx(StepNavigation, { nextLabel: "Complete Registration" })] }));
}
function CompleteStep() {
    const { state, completeOnboarding } = useOnboarding();
    React.useEffect(() => {
        // Auto-complete onboarding after a delay
        const timer = setTimeout(() => {
            completeOnboarding();
        }, 2000);
        return () => clearTimeout(timer);
    }, [completeOnboarding]);
    return (_jsx("div", { className: "glass rounded-3xl p-8 text-center space-y-8", children: _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-24 h-24 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center animate-pulse", children: _jsx(Check, { className: "h-12 w-12 text-[var(--hive-background-primary)]" }) }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)]", children: ["Welcome to HIVE, ", state.data.name, "!"] }), _jsx("p", { className: "text-xl text-[var(--hive-text-muted)]", children: "Your builder profile is complete. Get ready to transform your campus experience." })] }), _jsxs("div", { className: "glass rounded-2xl p-6 space-y-3", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "What's next?" }), _jsxs("div", { className: "space-y-2 text-sm text-[var(--hive-text-muted)]", children: [_jsx("div", { children: "\u2728 Explore pre-seeded Spaces for your campus" }), _jsx("div", { children: "\uD83D\uDEE0\uFE0F Create your first Tool in HiveLAB" }), _jsx("div", { children: "\uD83D\uDE80 Connect with other builders" })] })] }), state.loading && (_jsxs("div", { className: "flex items-center justify-center gap-2 text-[var(--hive-text-muted)]", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Setting up your profile..."] }))] }) }));
}
//# sourceMappingURL=hive-onboarding-wizard.js.map