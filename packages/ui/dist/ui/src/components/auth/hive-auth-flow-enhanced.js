"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, createContext, useContext } from 'react';
import { cn } from '../lib/utils';
import { Button } from '../../ui/button';
import { Check, Mail, ArrowLeft, ArrowRight, Loader2, AlertCircle, Sparkles, Zap, Users, Shield } from 'lucide-react';
const AuthContext = createContext(null);
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
export function AuthProvider({ children, onAuthSuccess, initialStep = 'welcome', mockMode = false }) {
    const [state, setState] = useState({
        step: initialStep,
        email: '',
        loading: false,
        error: null,
        isNewUser: false,
    });
    const setStep = (step) => setState(prev => ({ ...prev, step }));
    const setEmail = (email) => setState(prev => ({ ...prev, email }));
    const setLoading = (loading) => setState(prev => ({ ...prev, loading }));
    const setError = (error) => setState(prev => ({ ...prev, error }));
    const setIsNewUser = (isNewUser) => setState(prev => ({ ...prev, isNewUser }));
    const goBack = () => {
        const stepFlow = {
            'welcome': 'welcome',
            'sign-in': 'welcome',
            'sign-up': 'welcome',
            'forgot-password': 'sign-in',
            'verify-email': 'sign-in',
            'magic-link-sent': 'sign-in',
            'onboarding': 'welcome',
        };
        setStep(stepFlow[state.step]);
        setError(null);
    };
    const handleSignIn = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            if (mockMode) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                const isNewUser = email.includes('new');
                if (isNewUser) {
                    setStep('onboarding');
                }
                onAuthSuccess?.({
                    id: '1',
                    email,
                    name: email.split('@')[0],
                    isNewUser
                });
            }
        }
        catch (error) {
            setError('Sign in failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleSignUp = async (email, password, name) => {
        setLoading(true);
        setError(null);
        try {
            if (mockMode) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setStep('verify-email');
            }
        }
        catch (error) {
            setError('Sign up failed. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleMagicLink = async (email) => {
        setLoading(true);
        setError(null);
        try {
            if (mockMode) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStep('magic-link-sent');
            }
        }
        catch (error) {
            setError('Failed to send magic link. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const handleForgotPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            if (mockMode) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStep('magic-link-sent');
            }
        }
        catch (error) {
            setError('Failed to send reset email. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };
    const contextValue = {
        state,
        setStep,
        setEmail,
        setLoading,
        setError,
        setIsNewUser,
        goBack,
        handleSignIn,
        handleSignUp,
        handleMagicLink,
        handleForgotPassword,
    };
    return (_jsx(AuthContext.Provider, { value: contextValue, children: children }));
}
export function HiveAuthFlowEnhanced({ className, onAuthSuccess, initialStep = 'welcome', mockMode = false }) {
    return (_jsx(AuthProvider, { onAuthSuccess: onAuthSuccess, initialStep: initialStep, mockMode: mockMode, children: _jsxs("div", { className: cn("min-h-screen flex items-center justify-center p-4 relative overflow-hidden", "bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]", className), children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsx("div", { className: "absolute inset-0", style: {
                                    backgroundImage: `linear-gradient(var(--hive-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--hive-border-subtle) 1px, transparent 1px)`,
                                    backgroundSize: '50px 50px',
                                    animation: 'grid-flow 20s linear infinite'
                                } }) }), _jsx("div", { className: "absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-[var(--hive-brand-primary)] opacity-5 blur-3xl animate-pulse" }), _jsx("div", { className: "absolute bottom-1/4 -right-20 w-60 h-60 rounded-full bg-[var(--hive-brand-accent)] opacity-5 blur-3xl animate-pulse", style: { animationDelay: '1s' } }), _jsx("div", { className: "absolute inset-0", children: [...Array(6)].map((_, i) => (_jsx("div", { className: "absolute w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full opacity-30", style: {
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 2}s`
                                } }, i))) })] }), _jsx("div", { className: "w-full max-w-md relative z-10", children: _jsx(AuthStepRenderer, {}) }), _jsx("style", { children: `
          @keyframes grid-flow {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        ` })] }) }));
}
// =============================================================================
// ENHANCED STEP RENDERER
// =============================================================================
function AuthStepRenderer() {
    const { state } = useAuth();
    switch (state.step) {
        case 'welcome':
            return _jsx(EnhancedWelcomeStep, {});
        case 'sign-in':
            return _jsx(EnhancedSignInStep, {});
        case 'sign-up':
            return _jsx(EnhancedSignUpStep, {});
        case 'forgot-password':
            return _jsx(EnhancedForgotPasswordStep, {});
        case 'verify-email':
            return _jsx(EnhancedVerifyEmailStep, {});
        case 'magic-link-sent':
            return _jsx(EnhancedMagicLinkSentStep, {});
        case 'onboarding':
            return _jsx(EnhancedOnboardingRedirectStep, {});
        default:
            return _jsx(EnhancedWelcomeStep, {});
    }
}
// =============================================================================
// ENHANCED WELCOME STEP WITH BRAND SHOWCASE
// =============================================================================
function EnhancedWelcomeStep() {
    const { setStep } = useAuth();
    const [isAnimating, setIsAnimating] = useState(false);
    const handleGetStarted = () => {
        setIsAnimating(true);
        setTimeout(() => setStep('sign-up'), 300);
    };
    return (_jsxs("div", { className: cn("liquid-metal rounded-3xl p-8 text-center space-y-8 relative overflow-hidden", "border border-[var(--hive-border-glass)] shadow-[var(--hive-shadow-level3)]", isAnimating && "scale-95 opacity-80 transition-all duration-300"), children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-glass)] opacity-50" }), _jsx("div", { className: "relative z-10 flex justify-center", children: _jsx("div", { className: "relative group", children: _jsxs("div", { className: "w-20 h-20 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-2xl flex items-center justify-center relative overflow-hidden shadow-[var(--hive-shadow-gold-glow)]", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-background-primary)] rounded-xl relative", children: _jsx("div", { className: "absolute inset-2 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-sm" }) }), _jsx("div", { className: "absolute inset-0 rounded-2xl border-2 border-[var(--hive-brand-primary)] opacity-0 group-hover:opacity-100 animate-pulse" }), _jsx(Sparkles, { className: "absolute -top-1 -right-1 h-4 w-4 text-[var(--hive-brand-primary)] animate-pulse" })] }) }) }), _jsxs("div", { className: "relative z-10 space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk'] tracking-tight", children: ["Welcome to", ' ', _jsx("span", { className: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent", children: "HIVE" })] }), _jsxs("p", { className: "text-xl text-[var(--hive-text-secondary)] leading-relaxed max-w-sm mx-auto", children: ["Your ", _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "programmable campus layer" }), " where students build the future"] })] }), _jsxs("div", { className: "glass rounded-2xl p-6 space-y-4 border border-[var(--hive-border-glass)]", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] flex items-center justify-center gap-2", children: [_jsx(Zap, { className: "h-5 w-5 text-[var(--hive-brand-primary)]" }), "Transform Your Campus Experience"] }), _jsxs("div", { className: "grid grid-cols-1 gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[var(--hive-brand-primary)]/10 flex items-center justify-center", children: _jsx(Users, { className: "h-4 w-4 text-[var(--hive-brand-primary)]" }) }), _jsx("span", { children: "Connect with builder communities" })] }), _jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[var(--hive-status-success)]/10 flex items-center justify-center", children: _jsx(Zap, { className: "h-4 w-4 text-[var(--hive-status-success)]" }) }), _jsx("span", { children: "Build tools that solve real problems" })] }), _jsxs("div", { className: "flex items-center gap-3 text-[var(--hive-text-secondary)]", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-[var(--hive-status-info)]/10 flex items-center justify-center", children: _jsx(Shield, { className: "h-4 w-4 text-[var(--hive-status-info)]" }) }), _jsx("span", { children: "University-verified secure platform" })] })] })] })] }), _jsxs("div", { className: "relative z-10 space-y-4", children: [_jsxs(Button, { variant: "primary", size: "lg", className: "w-full bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] font-semibold shadow-[var(--hive-shadow-gold-glow)] hive-interactive", onClick: handleGetStarted, children: [_jsx(Sparkles, { className: "h-4 w-4 mr-2" }), "Create Account", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] }), _jsx(Button, { variant: "secondary", size: "lg", className: "w-full border-[var(--hive-border-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass)] hive-interactive", onClick: () => setStep('sign-in'), children: "Sign In" })] }), _jsxs("div", { className: "relative z-10", children: [_jsxs("p", { className: "text-sm text-[var(--hive-text-muted)] leading-relaxed", children: ["Join ", _jsx("span", { className: "text-[var(--hive-brand-primary)] font-semibold", children: "thousands" }), " of student builders transforming campus life"] }), _jsx("div", { className: "flex justify-center mt-3 space-x-1", children: [...Array(5)].map((_, i) => (_jsx("div", { className: "w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full animate-pulse", style: { animationDelay: `${i * 0.2}s` } }, i))) })] })] }));
}
// =============================================================================
// ENHANCED SIGN IN STEP WITH LIQUID METAL DESIGN
// =============================================================================
function EnhancedSignInStep() {
    const { state, setStep, goBack, handleSignIn, handleMagicLink, setError } = useAuth();
    const [email, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [usePassword, setUsePassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Email is required');
            return;
        }
        setIsSubmitting(true);
        if (usePassword) {
            if (!password.trim()) {
                setError('Password is required');
                return;
            }
            await handleSignIn(email, password);
        }
        else {
            await handleMagicLink(email);
        }
        setIsSubmitting(false);
    };
    return (_jsxs("div", { className: "liquid-metal rounded-3xl p-8 space-y-6 border border-[var(--hive-border-glass)] shadow-[var(--hive-shadow-level3)] relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-glass)] via-transparent to-[var(--hive-overlay-gold-subtle)] opacity-30" }), _jsxs("div", { className: "relative z-10 text-center space-y-4", children: [_jsxs("button", { onClick: goBack, className: "inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors hive-interactive", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: ["Sign In to", ' ', _jsx("span", { className: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent", children: "HIVE" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Welcome back, builder" })] })] }), state.error && (_jsx("div", { className: "relative z-10 glass rounded-xl p-4 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-[var(--hive-status-error)] flex-shrink-0" }), _jsx("span", { className: "text-sm text-[var(--hive-status-error)]", children: state.error })] }) })), _jsxs("form", { onSubmit: handleSubmit, className: "relative z-10 space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "University Email" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "email", value: email, onChange: (e) => setEmailInput(e.target.value), placeholder: "alex@buffalo.edu", className: "w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive", disabled: state.loading }), _jsx("div", { className: "absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/0 to-[var(--hive-brand-accent)]/0 hover:from-[var(--hive-brand-primary)]/5 hover:to-[var(--hive-brand-accent)]/5 transition-all pointer-events-none" })] })] }), usePassword && (_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", className: "w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive", disabled: state.loading }), _jsx("div", { className: "absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/0 to-[var(--hive-brand-accent)]/0 hover:from-[var(--hive-brand-primary)]/5 hover:to-[var(--hive-brand-accent)]/5 transition-all pointer-events-none" })] })] })), _jsxs(Button, { type: "submit", variant: "primary", size: "lg", className: cn("w-full font-semibold hive-interactive", usePassword
                            ? "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] shadow-[var(--hive-shadow-gold-glow)]"
                            : "bg-gradient-to-r from-[var(--hive-status-info)] to-[var(--hive-status-info)] text-white shadow-[var(--hive-shadow-level2)]"), disabled: state.loading || isSubmitting, children: [(state.loading || isSubmitting) && _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), usePassword ? (_jsxs(_Fragment, { children: [_jsx(Shield, { className: "h-4 w-4 mr-2" }), "Sign In"] })) : (_jsxs(_Fragment, { children: [_jsx(Zap, { className: "h-4 w-4 mr-2" }), "Send Magic Link"] }))] })] }), _jsx("div", { className: "relative z-10 text-center", children: _jsx("button", { type: "button", onClick: () => setUsePassword(!usePassword), className: "text-sm text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-accent)] transition-colors font-medium", disabled: state.loading, children: usePassword ? (_jsxs(_Fragment, { children: [_jsx(Zap, { className: "h-3 w-3 mr-1 inline" }), "Use magic link instead"] })) : (_jsxs(_Fragment, { children: [_jsx(Shield, { className: "h-3 w-3 mr-1 inline" }), "Use password instead"] })) }) }), _jsxs("div", { className: "relative z-10 text-center space-y-3", children: [usePassword && (_jsx("button", { type: "button", onClick: () => setStep('forgot-password'), className: "block text-sm text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors mx-auto", disabled: state.loading, children: "Forgot your password?" })), _jsxs("div", { className: "text-sm text-[var(--hive-text-muted)]", children: ["Don't have an account?", ' ', _jsx("button", { type: "button", onClick: () => setStep('sign-up'), className: "text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-accent)] transition-colors font-medium", disabled: state.loading, children: "Sign up" })] })] })] }));
}
// =============================================================================
// ENHANCED SIGN UP STEP WITH GLASS MORPHISM
// =============================================================================
function EnhancedSignUpStep() {
    const { state, setStep, goBack, handleSignUp, setError } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Enhanced Validation
        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }
        if (!formData.email.trim()) {
            setError('University email is required');
            return;
        }
        if (!formData.email.includes('.edu')) {
            setError('Please use your university (.edu) email address');
            return;
        }
        if (!formData.password) {
            setError('Password is required');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        setIsSubmitting(true);
        await handleSignUp(formData.email, formData.password, formData.name);
        setIsSubmitting(false);
    };
    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    return (_jsxs("div", { className: "glass-strong rounded-3xl p-8 space-y-6 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level4)] relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-overlay-gold-subtle)] via-transparent to-[var(--hive-overlay-glass-medium)] opacity-40" }), _jsxs("div", { className: "relative z-10 text-center space-y-4", children: [_jsxs("button", { onClick: goBack, className: "inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors hive-interactive", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] font-['Space_Grotesk']", children: ["Join", ' ', _jsx("span", { className: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent", children: "HIVE" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Start building tools for your campus" })] })] }), state.error && (_jsx("div", { className: "relative z-10 glass rounded-xl p-4 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-[var(--hive-status-error)] flex-shrink-0" }), _jsx("span", { className: "text-sm text-[var(--hive-status-error)]", children: state.error })] }) })), _jsxs("form", { onSubmit: handleSubmit, className: "relative z-10 space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Full Name" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => updateFormData('name', e.target.value), placeholder: "Alex Rivera", className: "w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive", disabled: state.loading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "University Email" }), _jsx("input", { type: "email", value: formData.email, onChange: (e) => updateFormData('email', e.target.value), placeholder: "alex@buffalo.edu", className: "w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive", disabled: state.loading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Password" }), _jsx("input", { type: "password", value: formData.password, onChange: (e) => updateFormData('password', e.target.value), placeholder: "Create a strong password", className: "w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive", disabled: state.loading })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "Confirm Password" }), _jsx("input", { type: "password", value: formData.confirmPassword, onChange: (e) => updateFormData('confirmPassword', e.target.value), placeholder: "Confirm your password", className: "w-full h-14 px-4 text-lg bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all hive-interactive", disabled: state.loading })] }), _jsxs(Button, { type: "submit", variant: "primary", size: "lg", className: "w-full bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] text-[var(--hive-text-inverse)] font-semibold shadow-[var(--hive-shadow-gold-glow)] hive-interactive", disabled: state.loading || isSubmitting, children: [(state.loading || isSubmitting) && _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), _jsx(Sparkles, { className: "h-4 w-4 mr-2" }), "Create Account", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })] }), _jsxs("div", { className: "relative z-10 text-center text-sm text-[var(--hive-text-muted)]", children: ["Already have an account?", ' ', _jsx("button", { type: "button", onClick: () => setStep('sign-in'), className: "text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-accent)] transition-colors font-medium", disabled: state.loading, children: "Sign in" })] })] }));
}
// =============================================================================
// ADDITIONAL ENHANCED STEPS (Forgot Password, Verify Email, etc.)
// =============================================================================
function EnhancedForgotPasswordStep() {
    const { state, goBack, handleForgotPassword, setError } = useAuth();
    const [email, setEmailInput] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Email is required');
            return;
        }
        await handleForgotPassword(email);
    };
    return (_jsxs("div", { className: "liquid-metal rounded-3xl p-8 space-y-6 border border-[var(--hive-border-glass)] shadow-[var(--hive-shadow-level3)]", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsxs("button", { onClick: goBack, className: "inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors hive-interactive", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Reset Password" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "We'll send you a secure link to reset your password" })] })] }), state.error && (_jsx("div", { className: "glass rounded-xl p-4 border border-[var(--hive-status-error)]/20 bg-[var(--hive-status-error)]/10", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-[var(--hive-status-error)]" }), _jsx("span", { className: "text-sm text-[var(--hive-status-error)]", children: state.error })] }) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)]", children: "University Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmailInput(e.target.value), placeholder: "alex@buffalo.edu", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)]/50 backdrop-blur-sm border border-[var(--hive-border-glass)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), _jsxs(Button, { type: "submit", variant: "primary", size: "lg", className: "w-full bg-gradient-to-r from-[var(--hive-status-info)] to-[var(--hive-status-info)] text-white font-semibold hive-interactive", disabled: state.loading, children: [state.loading && _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), _jsx(Mail, { className: "h-4 w-4 mr-2" }), "Send Reset Link"] })] })] }));
}
function EnhancedVerifyEmailStep() {
    const { state, goBack } = useAuth();
    return (_jsxs("div", { className: "glass-strong rounded-3xl p-8 text-center space-y-6 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-level3)]", children: [_jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "w-20 h-20 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center relative", children: [_jsx(Mail, { className: "h-10 w-10 text-[var(--hive-brand-primary)]" }), _jsx("div", { className: "absolute inset-0 rounded-full border-2 border-[var(--hive-brand-primary)] animate-pulse" })] }) }), _jsxs("div", { className: "space-y-3", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Check Your Email" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)]", children: ["We sent a verification link to", ' ', _jsx("strong", { className: "text-[var(--hive-brand-primary)]", children: state.email })] })] }), _jsx("div", { className: "glass rounded-xl p-4 border border-[var(--hive-border-glass)]", children: _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Click the link in your email to verify your account and complete registration." }) }), _jsx(Button, { variant: "secondary", size: "lg", className: "w-full border-[var(--hive-border-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass)] hive-interactive", onClick: goBack, children: "Back to Sign Up" })] }));
}
function EnhancedMagicLinkSentStep() {
    const { state, goBack } = useAuth();
    return (_jsxs("div", { className: "liquid-metal rounded-3xl p-8 text-center space-y-6 border border-[var(--hive-border-glass)] shadow-[var(--hive-shadow-level3)]", children: [_jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "w-20 h-20 bg-[var(--hive-status-success)]/20 rounded-full flex items-center justify-center relative", children: [_jsx(Check, { className: "h-10 w-10 text-[var(--hive-status-success)]" }), _jsx(Sparkles, { className: "absolute -top-1 -right-1 h-5 w-5 text-[var(--hive-brand-primary)] animate-pulse" })] }) }), _jsxs("div", { className: "space-y-3", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Magic Link Sent \u2728" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Check your email for a secure sign-in link" })] }), _jsx("div", { className: "glass rounded-xl p-4 border border-[var(--hive-border-glass)]", children: _jsxs("p", { className: "text-sm text-[var(--hive-text-muted)]", children: ["We sent a secure link to", ' ', _jsx("strong", { className: "text-[var(--hive-brand-primary)]", children: state.email }), ".", ' ', "Click it to sign in instantly."] }) }), _jsx(Button, { variant: "secondary", size: "lg", className: "w-full border-[var(--hive-border-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass)] hive-interactive", onClick: goBack, children: "Back to Sign In" })] }));
}
function EnhancedOnboardingRedirectStep() {
    return (_jsxs("div", { className: "glass-strong rounded-3xl p-8 text-center space-y-6 border border-[var(--hive-border-glass-strong)] shadow-[var(--hive-shadow-gold-glow)]", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-full flex items-center justify-center animate-pulse shadow-[var(--hive-shadow-gold-glow)]", children: _jsx(ArrowRight, { className: "h-10 w-10 text-[var(--hive-text-inverse)]" }) }) }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: ["Welcome to", ' ', _jsx("span", { className: "bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent", children: "HIVE!" })] }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Let's get you set up with your builder profile" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-3 overflow-hidden", children: _jsx("div", { className: "h-3 bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] rounded-full transition-all duration-1000 animate-pulse", style: { width: '33%' } }) }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Setting up your campus builder profile..." })] })] }));
}
//# sourceMappingURL=hive-auth-flow-enhanced.js.map