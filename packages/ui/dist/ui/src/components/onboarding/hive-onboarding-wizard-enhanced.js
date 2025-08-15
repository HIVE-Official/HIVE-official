"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced';
import { ArrowLeft, ArrowRight, Check, Upload, Search, Zap, BookOpen, Users, Scale, Camera, User, Hash, GraduationCap, Loader2, Sparkles, Crown, Trophy, Target, Heart, Code, Award, Rocket, Star } from 'lucide-react';
const OnboardingContext = createContext(null);
export function useOnboarding() {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within OnboardingProvider');
    }
    return context;
}
// =============================================================================
// ENHANCED ONBOARDING PROVIDER WITH BRAND FEATURES
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
                await new Promise(resolve => setTimeout(resolve, 2000));
                onComplete?.(state.data);
            }
            else {
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
export function HiveOnboardingWizardEnhanced({ className, onComplete, initialStep = 'welcome', mockMode = false }) {
    return (_jsx(OnboardingProvider, { onComplete: onComplete, initialStep: initialStep, mockMode: mockMode, children: _jsxs("div", { className: cn("min-h-screen flex items-center justify-center p-4 relative overflow-hidden", "bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]", className), children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-5", children: _jsx("div", { className: "absolute inset-0", style: {
                                    backgroundImage: `
                linear-gradient(var(--hive-border-glass) 1px, transparent 1px),
                linear-gradient(90deg, var(--hive-border-glass) 1px, transparent 1px),
                radial-gradient(circle at 50% 50%, var(--hive-brand-primary) 1px, transparent 1px)
              `,
                                    backgroundSize: '60px 60px, 60px 60px, 120px 120px',
                                    animation: 'grid-pulse 30s ease-in-out infinite'
                                } }) }), _jsx("div", { className: "absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] opacity-10 blur-3xl animate-pulse" }), _jsx("div", { className: "absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-[var(--hive-brand-accent)] to-[var(--hive-status-success)] opacity-8 blur-3xl animate-pulse", style: { animationDelay: '2s' } }), _jsx("div", { className: "absolute inset-0", children: [...Array(8)].map((_, i) => (_jsx("div", { className: cn("absolute w-2 h-2 rounded-full opacity-20", i % 3 === 0 ? "bg-[var(--hive-brand-primary)]" :
                                    i % 3 === 1 ? "bg-[var(--hive-brand-accent)]" :
                                        "bg-[var(--hive-status-success)]"), style: {
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `float-brand ${4 + Math.random() * 6}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 3}s`
                                } }, i))) }), _jsx("div", { className: "absolute inset-0", children: _jsxs("svg", { className: "w-full h-full opacity-10", viewBox: "0 0 100 100", children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "brandGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "var(--hive-brand-primary)" }), _jsx("stop", { offset: "100%", stopColor: "var(--hive-brand-accent)" })] }) }), _jsx("path", { d: "M20,30 L80,30 L50,70 Z", fill: "none", stroke: "url(#brandGradient)", strokeWidth: "0.5", className: "animate-pulse" })] }) })] }), _jsx("div", { className: "w-full max-w-2xl relative z-10", children: _jsx(OnboardingStepRenderer, {}) }), _jsx("style", { children: `
          @keyframes grid-pulse {
            0%, 100% { opacity: 0.05; transform: scale(1); }
            50% { opacity: 0.1; transform: scale(1.05); }
          }
          
          @keyframes float-brand {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            33% { transform: translateY(-30px) rotate(120deg) scale(1.1); }
            66% { transform: translateY(-15px) rotate(240deg) scale(0.9); }
          }
        ` })] }) }));
}
// =============================================================================
// ENHANCED STEP RENDERER
// =============================================================================
function OnboardingStepRenderer() {
    const { state } = useOnboarding();
    switch (state.step) {
        case 'welcome':
            return _jsx(EnhancedWelcomeStep, {});
        case 'name':
            return _jsx(EnhancedNameStep, {});
        case 'handle':
            return _jsx(EnhancedHandleStep, {});
        case 'photo':
            return _jsx(EnhancedPhotoStep, {});
        case 'academics':
            return _jsx(EnhancedAcademicsStep, {});
        case 'builder':
            return _jsx(EnhancedBuilderStep, {});
        case 'legal':
            return _jsx(EnhancedLegalStep, {});
        case 'complete':
            return _jsx(EnhancedCompleteStep, {});
        default:
            return _jsx(EnhancedWelcomeStep, {});
    }
}
// =============================================================================
// ENHANCED SHARED COMPONENTS WITH BRAND DESIGN
// =============================================================================
function EnhancedProgressBar() {
    const { state } = useOnboarding();
    const progress = ((state.currentStepIndex + 1) / STEP_ORDER.length) * 100;
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-full h-3 bg-[var(--hive-background-secondary)] rounded-full overflow-hidden border border-[var(--hive-border-glass)]", children: _jsx("div", { className: "h-full bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] transition-all duration-700 ease-out rounded-full relative overflow-hidden", style: { width: `${progress}%` }, children: _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-shimmer" }) }) }), _jsx("div", { className: "flex justify-between mt-2", children: STEP_ORDER.map((_, index) => (_jsx("div", { className: cn("w-2 h-2 rounded-full transition-all duration-300", index <= state.currentStepIndex
                        ? "bg-[var(--hive-brand-primary)] shadow-[var(--hive-shadow-gold-glow)]"
                        : "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-glass)]") }, index))) }), _jsx("style", { children: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      ` })] }));
}
function EnhancedStepNavigation({ canGoBack = true, nextLabel = "Continue" }) {
    const { state, prevStep, nextStep, canProceed } = useOnboarding();
    return (_jsxs("div", { className: "flex justify-between items-center pt-6", children: [canGoBack && state.currentStepIndex > 0 ? (_jsxs(Button, { variant: "ghost", onClick: prevStep, disabled: state.loading, className: "flex items-center gap-2 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hive-interactive", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] })) : (_jsx("div", {})), _jsxs(Button, { variant: "primary", onClick: nextStep, disabled: !canProceed() || state.loading, className: cn("flex items-center gap-2 font-semibold hive-interactive", canProceed()
                    ? "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] shadow-[var(--hive-shadow-gold-glow)]"
                    : "opacity-50 cursor-not-allowed"), children: [state.loading && _jsx(Loader2, { className: "h-4 w-4 animate-spin" }), nextLabel, _jsx(ArrowRight, { className: "h-4 w-4" })] })] }));
}
// =============================================================================
// ENHANCED WELCOME STEP WITH BRAND SHOWCASE
// =============================================================================
function EnhancedWelcomeStep() {
    const [isAnimating, setIsAnimating] = useState(false);
    const handleGetStarted = () => {
        setIsAnimating(true);
    };
    return (_jsxs("div", { className: cn("liquid-metal rounded-3xl p-8 space-y-8 relative overflow-hidden border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]", isAnimating && "scale-95 opacity-80 transition-all duration-500"), children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-glass-medium)] opacity-60" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,var(--hive-overlay-gold-medium)_0%,transparent_70%)] opacity-30" }), _jsx("div", { className: "relative z-10", children: _jsx(EnhancedProgressBar, {}) }), _jsx("div", { className: "relative z-10 flex justify-center", children: _jsx("div", { className: "relative group", children: _jsxs("div", { className: "w-24 h-24 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-3xl flex items-center justify-center relative overflow-hidden shadow-[var(--hive-shadow-gold-glow-strong)] animate-pulse", children: [_jsxs("div", { className: "w-12 h-12 bg-[var(--hive-background-primary)] rounded-xl relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-3 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-sm" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent animate-pulse" })] }), _jsx("div", { className: "absolute inset-0 rounded-3xl border-2 border-[var(--hive-brand-primary)] opacity-0 group-hover:opacity-100 animate-pulse scale-110" }), _jsx("div", { className: "absolute inset-0 rounded-3xl border border-[var(--hive-brand-accent)] opacity-50 animate-pulse scale-125" }), _jsx(Sparkles, { className: "absolute -top-2 -right-2 h-6 w-6 text-[var(--hive-brand-primary)] animate-pulse" }), _jsx(Crown, { className: "absolute -bottom-1 -left-1 h-4 w-4 text-[var(--hive-brand-accent)] animate-pulse", style: { animationDelay: '0.5s' } })] }) }) }), _jsxs("div", { className: "relative z-10 text-center space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("h1", { className: "text-5xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk'] tracking-tight leading-tight", children: ["Welcome to", ' ', _jsx("span", { className: "bg-gradient-to-r from-[var(--hive-brand-primary)] via-[var(--hive-brand-accent)] to-[var(--hive-brand-primary)] bg-clip-text text-transparent animate-pulse", children: "HIVE" })] }), _jsxs("p", { className: "text-xl text-[var(--hive-text-secondary)] leading-relaxed max-w-lg mx-auto", children: ["Let's build your", ' ', _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "builder profile" }), ' ', "and get you connected to your", ' ', _jsx("span", { className: "text-[var(--hive-status-success)] font-semibold", children: "campus community" })] })] }), _jsxs("div", { className: "glass-strong rounded-2xl p-6 space-y-4 border border-[var(--hive-border-glass-strong)]", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center justify-center gap-2", children: [_jsx(Rocket, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }), "What you'll accomplish:"] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center border border-[var(--hive-border-gold)]", children: _jsx(User, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }) }), _jsx("span", { children: "Set up your campus identity" })] }), _jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--hive-status-success)]/20 to-[var(--hive-status-info)]/20 flex items-center justify-center border border-[var(--hive-status-success)]/30", children: _jsx(GraduationCap, { className: "h-5 w-5 text-[var(--hive-status-success)]" }) }), _jsx("span", { children: "Connect to University at Buffalo" })] }), _jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--hive-status-info)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center border border-[var(--hive-status-info)]/30", children: _jsx(Zap, { className: "h-5 w-5 text-[var(--hive-status-info)]" }) }), _jsx("span", { children: "Choose your builder journey" })] })] })] })] }), _jsx("div", { className: "relative z-10", children: _jsx(EnhancedStepNavigation, { canGoBack: false, nextLabel: "Get Started" }) })] }));
}
// =============================================================================
// ENHANCED NAME STEP WITH PREMIUM VALIDATION
// =============================================================================
function EnhancedNameStep() {
    const { state, updateData, setError } = useOnboarding();
    const [isFocused, setIsFocused] = useState(false);
    const handleNameChange = (name) => {
        updateData({ name });
        if (name.trim().length < 2) {
            setError('Name must be at least 2 characters');
        }
        else {
            setError(null);
        }
    };
    return (_jsxs("div", { className: "glass-strong rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)] relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-glass-medium)] via-transparent to-[var(--hive-overlay-gold-subtle)] opacity-50" }), _jsx("div", { className: "relative z-10", children: _jsx(EnhancedProgressBar, {}) }), _jsxs("div", { className: "relative z-10 text-center space-y-4", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center border border-[var(--hive-border-gold)]", children: _jsx(User, { className: "h-8 w-8 text-[var(--hive-brand-primary)]" }) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: "What's your name?" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["This is how you'll appear to other builders in your", ' ', _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "campus community" })] })] })] }), _jsxs("div", { className: "relative z-10 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: state.data.name, onChange: (e) => handleNameChange(e.target.value), onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), placeholder: "Alex Rivera", className: cn("w-full h-16 px-6 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border-2 rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] transition-all duration-300 hive-interactive", isFocused
                                            ? "border-[var(--hive-brand-primary)] ring-4 ring-[var(--hive-brand-primary)]/20 shadow-[var(--hive-shadow-gold-glow)]"
                                            : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-glass-strong)]"), disabled: state.loading }), _jsx("div", { className: cn("absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/0 to-[var(--hive-brand-accent)]/0 transition-all pointer-events-none", isFocused && "from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10") }), state.data.name.length > 0 && (_jsx("div", { className: "absolute right-4 top-1/2 transform -translate-y-1/2", children: _jsx("div", { className: cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", state.data.name.length >= 2
                                                ? "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)]"
                                                : "bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)]"), children: state.data.name.length >= 2 ? _jsx(Check, { className: "h-3 w-3" }) : state.data.name.length }) }))] })] }), state.error && (_jsx("div", { className: "glass rounded-xl p-3 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10", children: _jsxs("p", { className: "text-sm text-[var(--hive-status-error)] flex items-center gap-2", children: [_jsx(Target, { className: "h-4 w-4" }), state.error] }) })), state.data.name.length >= 2 && !state.error && (_jsx("div", { className: "glass rounded-xl p-3 border border-[var(--hive-status-success)]/20 bg-[var(--hive-status-success)]/10", children: _jsxs("p", { className: "text-sm text-[var(--hive-status-success)] flex items-center gap-2", children: [_jsx(Check, { className: "h-4 w-4" }), "Perfect! Welcome to HIVE, ", state.data.name] }) }))] }), _jsx("div", { className: "relative z-10", children: _jsx(EnhancedStepNavigation, {}) })] }));
}
// =============================================================================
// ENHANCED HANDLE STEP WITH PREMIUM AVAILABILITY CHECKING
// =============================================================================
function EnhancedHandleStep() {
    const { state, updateData, setError } = useOnboarding();
    const [isFocused, setIsFocused] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const handleUsernameChange = async (handle) => {
        const cleanHandle = handle.replace('@', '');
        updateData({ handle: cleanHandle });
        if (cleanHandle.length < 3) {
            setError('Username must be at least 3 characters');
            return;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(cleanHandle)) {
            setError('Username can only contain letters, numbers, and underscores');
            return;
        }
        // Simulate availability checking
        setIsChecking(true);
        setError(null);
        setTimeout(() => {
            setIsChecking(false);
            // Mock availability check - always available for demo
        }, 800);
    };
    const isAvailable = state.data.handle.length >= 3 && !state.error && !isChecking;
    return (_jsxs("div", { className: "liquid-metal rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)] relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-glass-medium)] opacity-50" }), _jsx("div", { className: "relative z-10", children: _jsx(EnhancedProgressBar, {}) }), _jsxs("div", { className: "relative z-10 text-center space-y-4", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-status-info)]/20 to-[var(--hive-brand-primary)]/20 flex items-center justify-center border border-[var(--hive-status-info)]/30", children: _jsx(Hash, { className: "h-8 w-8 text-[var(--hive-status-info)]" }) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: "Choose your handle" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["Your unique identifier that other builders will use to", ' ', _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "find and mention you" })] })] })] }), _jsxs("div", { className: "relative z-10 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Username" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-6 top-1/2 transform -translate-y-1/2 text-xl text-[var(--hive-text-muted)] font-semibold", children: "@" }), _jsx("input", { type: "text", value: state.data.handle, onChange: (e) => handleUsernameChange(e.target.value), onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), placeholder: "alexrivera", className: cn("w-full h-16 pl-12 pr-16 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border-2 rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] transition-all duration-300 hive-interactive", isFocused
                                            ? "border-[var(--hive-brand-primary)] ring-4 ring-[var(--hive-brand-primary)]/20 shadow-[var(--hive-shadow-gold-glow)]"
                                            : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-glass-strong)]"), disabled: state.loading }), _jsx("div", { className: "absolute right-4 top-1/2 transform -translate-y-1/2", children: isChecking ? (_jsx(Loader2, { className: "h-5 w-5 animate-spin text-[var(--hive-brand-primary)]" })) : isAvailable ? (_jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--hive-status-success)]/20 flex items-center justify-center border border-[var(--hive-status-success)]/40", children: _jsx(Check, { className: "h-4 w-4 text-[var(--hive-status-success)]" }) })) : state.data.handle.length >= 3 && state.error ? (_jsx("div", { className: "w-8 h-8 rounded-full bg-[var(--hive-status-error)]/20 flex items-center justify-center border border-[var(--hive-status-error)]/40", children: _jsx(Target, { className: "h-4 w-4 text-[var(--hive-status-error)]" }) })) : null })] })] }), state.error && (_jsx("div", { className: "glass rounded-xl p-3 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10", children: _jsxs("p", { className: "text-sm text-[var(--hive-status-error)] flex items-center gap-2", children: [_jsx(Target, { className: "h-4 w-4" }), state.error] }) })), isChecking && (_jsx("div", { className: "glass rounded-xl p-3 border border-[var(--hive-brand-primary)]/20 bg-[var(--hive-brand-primary)]/10", children: _jsxs("p", { className: "text-sm text-[var(--hive-brand-primary)] flex items-center gap-2", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Checking availability..."] }) })), isAvailable && (_jsx("div", { className: "glass-strong rounded-xl p-4 border border-[var(--hive-status-success)]/20 bg-[var(--hive-status-success)]/10", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-[var(--hive-status-success)]/20 flex items-center justify-center", children: _jsx(Check, { className: "h-5 w-5 text-[var(--hive-status-success)]" }) }), _jsxs("div", { children: [_jsxs("p", { className: "text-sm font-semibold text-[var(--hive-status-success)]", children: ["@", state.data.handle, " is available! \uD83C\uDF89"] }), _jsx("p", { className: "text-xs text-[var(--hive-text-muted)]", children: "This will be your unique identity on HIVE" })] })] }) }))] }), _jsx("div", { className: "relative z-10", children: _jsx(EnhancedStepNavigation, {}) })] }));
}
// =============================================================================
// ADDITIONAL ENHANCED STEPS (Photo, Academics, Builder, Legal, Complete)
// Note: Due to length constraints, I'll include the remaining steps in abbreviated form
// =============================================================================
function EnhancedPhotoStep() {
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
    return (_jsxs("div", { className: "glass-strong rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]", children: [_jsx(EnhancedProgressBar, {}), _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-accent)]/20 to-[var(--hive-status-info)]/20 flex items-center justify-center border border-[var(--hive-brand-accent)]/30", children: _jsx(Camera, { className: "h-8 w-8 text-[var(--hive-brand-accent)]" }) }) }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: "Add a profile photo" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["Help other builders recognize you", ' ', _jsx("span", { className: "text-[var(--hive-text-muted)]", children: "(optional step)" })] })] }), _jsx("div", { className: "flex justify-center", children: state.data.photoUrl ? (_jsxs("div", { className: "relative group", children: [_jsx("img", { src: state.data.photoUrl, alt: "Profile", className: "w-40 h-40 rounded-full object-cover border-4 border-[var(--hive-brand-primary)] shadow-[var(--hive-shadow-gold-glow)]" }), _jsx("button", { onClick: () => updateData({ photoUrl: undefined }), className: "absolute -top-2 -right-2 w-8 h-8 bg-[var(--hive-status-error)] rounded-full flex items-center justify-center text-[var(--hive-text-primary)] hover:bg-[var(--hive-status-error)]/80 transition-colors shadow-lg", children: "\u00D7" })] })) : (_jsxs("div", { className: cn("w-80 h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-6 cursor-pointer transition-all duration-300 hive-interactive", dragActive
                        ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 shadow-[var(--hive-shadow-gold-glow)]"
                        : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-glass)]"), onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, children: [_jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center", children: _jsx(Upload, { className: "h-8 w-8 text-[var(--hive-brand-primary)]" }) }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-[var(--hive-text-primary)] font-medium text-lg", children: "Drop a photo here" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "or click to browse" })] })] })) }), _jsx(EnhancedStepNavigation, { nextLabel: state.data.photoUrl ? "Continue" : "Skip for now" })] }));
}
function EnhancedAcademicsStep() {
    const { state, updateData } = useOnboarding();
    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from({ length: 8 }, (_, i) => (currentYear + i).toString());
    return (_jsxs("div", { className: "liquid-metal rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]", children: [_jsx(EnhancedProgressBar, {}), _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-status-success)]/20 to-[var(--hive-status-info)]/20 flex items-center justify-center border border-[var(--hive-status-success)]/30", children: _jsx(GraduationCap, { className: "h-8 w-8 text-[var(--hive-status-success)]" }) }) }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: "Academic Info" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["Connect with your", ' ', _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "campus community" }), ' ', "and relevant spaces"] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "University" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[var(--hive-text-muted)]" }), _jsx("input", { type: "text", value: state.data.university, onChange: (e) => updateData({ university: e.target.value }), placeholder: "University at Buffalo", className: "w-full h-14 pl-12 pr-4 bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Major/Field of Study" }), _jsx("input", { type: "text", value: state.data.major, onChange: (e) => updateData({ major: e.target.value }), placeholder: "Computer Science, Business, Engineering...", className: "w-full h-14 px-4 bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Expected Graduation Year" }), _jsxs("select", { value: state.data.graduationYear, onChange: (e) => updateData({ graduationYear: e.target.value }), className: "w-full h-14 px-4 bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive", children: [_jsx("option", { value: "", children: "Select graduation year" }), graduationYears.map(year => (_jsx("option", { value: year, children: year }, year)))] })] })] }), _jsx(EnhancedStepNavigation, {})] }));
}
function EnhancedBuilderStep() {
    const { state, updateData } = useOnboarding();
    const experiences = [
        { value: 'none', label: 'New to Building', description: 'Ready to learn and explore', icon: Star },
        { value: 'beginner', label: 'Beginner Builder', description: 'Some coding or tool experience', icon: Code },
        { value: 'intermediate', label: 'Experienced Builder', description: 'Built projects and tools before', icon: Trophy },
        { value: 'advanced', label: 'Expert Builder', description: 'Seasoned developer and creator', icon: Crown },
    ];
    const goals = [
        { id: 'learn', label: 'Learn to Build', icon: BookOpen, color: 'var(--hive-status-info)' },
        { id: 'solve', label: 'Solve Campus Problems', icon: Zap, color: 'var(--hive-brand-primary)' },
        { id: 'connect', label: 'Connect with Builders', icon: Users, color: 'var(--hive-status-success)' },
        { id: 'impact', label: 'Create Campus Impact', icon: Award, color: 'var(--hive-brand-accent)' },
    ];
    const toggleGoal = (goalId) => {
        const currentGoals = state.data.builderGoals;
        const newGoals = currentGoals.includes(goalId)
            ? currentGoals.filter(g => g !== goalId)
            : [...currentGoals, goalId];
        updateData({ builderGoals: newGoals });
    };
    return (_jsxs("div", { className: "glass-strong rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]", children: [_jsx(EnhancedProgressBar, {}), _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-accent)]/20 flex items-center justify-center border border-[var(--hive-border-gold)]", children: _jsx(Zap, { className: "h-8 w-8 text-[var(--hive-brand-primary)]" }) }) }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: "Your Builder Journey" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["Help us personalize HIVE for your", ' ', _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "technical experience" }), ' ', "and goals"] })] }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2", children: [_jsx(Trophy, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }), "Building Experience"] }), _jsx("div", { className: "space-y-3", children: experiences.map((exp) => {
                                    const IconComponent = exp.icon;
                                    return (_jsxs("label", { className: cn("flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300 hive-interactive", state.data.builderExperience === exp.value
                                            ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 shadow-[var(--hive-shadow-gold-glow)]"
                                            : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-glass)]"), children: [_jsx("div", { className: cn("w-12 h-12 rounded-xl flex items-center justify-center border transition-all", state.data.builderExperience === exp.value
                                                    ? "bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)]"
                                                    : "bg-[var(--hive-background-secondary)] border-[var(--hive-border-glass)]"), children: _jsx(IconComponent, { className: cn("h-6 w-6", state.data.builderExperience === exp.value
                                                        ? "text-[var(--hive-brand-primary)]"
                                                        : "text-[var(--hive-text-muted)]") }) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: exp.label }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: exp.description })] }), _jsx("input", { type: "radio", name: "experience", value: exp.value, checked: state.data.builderExperience === exp.value, onChange: (e) => updateData({ builderExperience: e.target.value }), className: "sr-only" }), state.data.builderExperience === exp.value && (_jsx(Check, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }))] }, exp.value));
                                }) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2", children: [_jsx(Target, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }), "Platform Goals ", _jsx("span", { className: "text-sm font-normal text-[var(--hive-text-muted)]", children: "(Select all that apply)" })] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: goals.map((goal) => {
                                    const IconComponent = goal.icon;
                                    const isSelected = state.data.builderGoals.includes(goal.id);
                                    return (_jsxs("button", { onClick: () => toggleGoal(goal.id), className: cn("p-6 rounded-xl border transition-all duration-300 text-left hive-interactive", isSelected
                                            ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10 shadow-[var(--hive-shadow-gold-glow)]"
                                            : "border-[var(--hive-border-glass)] hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-glass)]"), children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("div", { className: cn("w-10 h-10 rounded-lg flex items-center justify-center", isSelected
                                                            ? "bg-[var(--hive-brand-primary)]/20"
                                                            : "bg-[var(--hive-background-secondary)]"), children: _jsx(IconComponent, { className: cn("h-5 w-5", isSelected ? "text-[var(--hive-brand-primary)]" : "text-[var(--hive-text-muted)]"), style: { color: isSelected ? goal.color : undefined } }) }), isSelected && (_jsx(Check, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }))] }), _jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: goal.label })] }, goal.id));
                                }) })] })] }), _jsx(EnhancedStepNavigation, {})] }));
}
function EnhancedLegalStep() {
    const { state, updateData } = useOnboarding();
    const agreements = [
        {
            key: 'agreedToTerms',
            title: 'Terms of Service',
            description: 'I agree to HIVE\'s terms of service and acceptable use policy',
            icon: Scale
        },
        {
            key: 'agreedToPrivacy',
            title: 'Privacy Policy',
            description: 'I understand how HIVE collects, uses, and protects my data',
            icon: Users
        },
        {
            key: 'agreedToCommunity',
            title: 'Community Guidelines',
            description: 'I will follow HIVE\'s community guidelines and respect other builders',
            icon: Heart
        },
    ];
    return (_jsxs("div", { className: "liquid-metal rounded-3xl p-8 space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)]", children: [_jsx(EnhancedProgressBar, {}), _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--hive-status-info)]/20 to-[var(--hive-brand-primary)]/20 flex items-center justify-center border border-[var(--hive-status-info)]/30", children: _jsx(Scale, { className: "h-8 w-8 text-[var(--hive-status-info)]" }) }) }), _jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: "Community Agreements" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["Please review and accept our", ' ', _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "community standards" }), ' ', "to complete registration"] })] }), _jsx("div", { className: "space-y-4", children: agreements.map((agreement) => {
                    const IconComponent = agreement.icon;
                    return (_jsxs("label", { className: "flex items-start gap-4 p-4 rounded-xl border border-[var(--hive-border-glass)] cursor-pointer hover:border-[var(--hive-border-gold)] hover:bg-[var(--hive-overlay-glass)] transition-all duration-300 hive-interactive", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: state.data[agreement.key], onChange: (e) => updateData({ [agreement.key]: e.target.checked }), className: "w-5 h-5 rounded border-[var(--hive-border-glass)] text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/30" }), _jsx("div", { className: "w-10 h-10 rounded-lg bg-[var(--hive-background-secondary)] flex items-center justify-center", children: _jsx(IconComponent, { className: "h-5 w-5 text-[var(--hive-text-muted)]" }) })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: agreement.title }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)] mt-1", children: agreement.description })] })] }, agreement.key));
                }) }), _jsx("div", { className: "text-center text-sm text-[var(--hive-text-muted)] p-4 glass rounded-xl border border-[var(--hive-border-glass)]", children: "By continuing, you confirm that you are at least 13 years old and agree to all the above terms." }), _jsx(EnhancedStepNavigation, { nextLabel: "Complete Registration" })] }));
}
function EnhancedCompleteStep() {
    const { state, completeOnboarding } = useOnboarding();
    React.useEffect(() => {
        const timer = setTimeout(() => {
            completeOnboarding();
        }, 2000);
        return () => clearTimeout(timer);
    }, [completeOnboarding]);
    return (_jsxs("div", { className: "glass-strong rounded-3xl p-8 text-center space-y-8 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-gold-glow-strong)] relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-medium)] via-transparent to-[var(--hive-overlay-gold-subtle)] opacity-60" }), _jsx("div", { className: "relative z-10 flex justify-center", children: _jsxs("div", { className: "w-32 h-32 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-full flex items-center justify-center animate-pulse shadow-[var(--hive-shadow-gold-glow-strong)] relative", children: [_jsx(Check, { className: "h-16 w-16 text-[var(--hive-text-inverse)]" }), _jsx(Sparkles, { className: "absolute -top-2 -right-2 h-8 w-8 text-[var(--hive-brand-primary)] animate-pulse" }), _jsx(Crown, { className: "absolute -bottom-1 -left-1 h-6 w-6 text-[var(--hive-brand-accent)] animate-pulse", style: { animationDelay: '0.5s' } }), _jsx(Trophy, { className: "absolute top-2 -left-3 h-5 w-5 text-[var(--hive-brand-primary)] animate-pulse", style: { animationDelay: '1s' } })] }) }), _jsxs("div", { className: "relative z-10 space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: ["Welcome to", ' ', _jsx("span", { className: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent", children: "HIVE" }), ",", ' ', state.data.name, "! \uD83C\uDF89"] }), _jsxs("p", { className: "text-xl text-[var(--hive-text-secondary)] leading-relaxed", children: ["Your", ' ', _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "builder profile" }), ' ', "is complete. Get ready to transform your campus experience."] })] }), _jsxs("div", { className: "glass-strong rounded-2xl p-6 space-y-4 border border-[var(--hive-border-gold)]", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center justify-center gap-2", children: [_jsx(Rocket, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }), "What's next?"] }), _jsxs("div", { className: "grid grid-cols-1 gap-3 text-sm", children: [_jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[var(--hive-status-success)]/20 flex items-center justify-center", children: _jsx(Sparkles, { className: "h-4 w-4 text-[var(--hive-status-success)]" }) }), _jsx("span", { children: "Explore pre-seeded Spaces for your campus" })] }), _jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[var(--hive-brand-primary)]/20 flex items-center justify-center", children: _jsx(Zap, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }) }), _jsx("span", { children: "Create your first Tool in HiveLAB" })] }), _jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[var(--hive-status-info)]/20 flex items-center justify-center", children: _jsx(Users, { className: "h-4 w-4 text-[var(--hive-status-info)]" }) }), _jsx("span", { children: "Connect with other builders at UB" })] })] })] }), state.loading && (_jsxs("div", { className: "flex items-center justify-center gap-3 text-[var(--hive-text-muted)]", children: [_jsx(Loader2, { className: "h-5 w-5 animate-spin" }), _jsx("span", { children: "Setting up your campus builder profile..." })] }))] })] }));
}
//# sourceMappingURL=hive-onboarding-wizard-enhanced.js.map