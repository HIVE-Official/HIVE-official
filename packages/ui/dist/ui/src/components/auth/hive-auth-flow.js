"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, createContext, useContext } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../../atomic/atoms/button';
import { Check, Mail, ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
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
    // Mock authentication functions for Storybook
    const handleSignIn = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            if (mockMode) {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                // Mock logic: if email contains "new", treat as new user
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
            else {
                // Real implementation would go here
                console.log('Real sign in:', { email, password });
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
            else {
                // Real implementation would go here
                console.log('Real sign up:', { email, password, name });
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
            else {
                // Real implementation would go here
                console.log('Send magic link:', { email });
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
            else {
                // Real implementation would go here
                console.log('Reset password:', { email });
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
export function HiveAuthFlow({ className, onAuthSuccess, initialStep = 'welcome', mockMode = false }) {
    return (_jsx(AuthProvider, { onAuthSuccess: onAuthSuccess, initialStep: initialStep, mockMode: mockMode, children: _jsx("div", { className: cn("min-h-screen flex items-center justify-center p-4", "bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]", className), children: _jsx("div", { className: "w-full max-w-md", children: _jsx(AuthStepRenderer, {}) }) }) }));
}
// =============================================================================
// STEP RENDERER
// =============================================================================
function AuthStepRenderer() {
    const { state } = useAuth();
    switch (state.step) {
        case 'welcome':
            return _jsx(WelcomeStep, {});
        case 'sign-in':
            return _jsx(SignInStep, {});
        case 'sign-up':
            return _jsx(SignUpStep, {});
        case 'forgot-password':
            return _jsx(ForgotPasswordStep, {});
        case 'verify-email':
            return _jsx(VerifyEmailStep, {});
        case 'magic-link-sent':
            return _jsx(MagicLinkSentStep, {});
        case 'onboarding':
            return _jsx(OnboardingRedirectStep, {});
        default:
            return _jsx(WelcomeStep, {});
    }
}
// =============================================================================
// WELCOME STEP
// =============================================================================
function WelcomeStep() {
    const { setStep } = useAuth();
    return (_jsxs("div", { className: "glass rounded-3xl p-8 text-center space-y-8", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 bg-[var(--hive-brand-primary)] rounded-2xl flex items-center justify-center", children: _jsx("div", { className: "w-8 h-8 bg-[var(--hive-background-primary)] rounded-lg" }) }) }), _jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: "Welcome to HIVE" }), _jsx("p", { className: "text-[var(--hive-text-muted)] text-lg", children: "Your programmable campus layer where students build the future" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { variant: "premium", size: "lg", className: "w-full", onClick: () => setStep('sign-up'), children: "Create Account" }), _jsx(Button, { variant: "outline", size: "lg", className: "w-full", onClick: () => setStep('sign-in'), children: "Sign In" })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Join thousands of student builders transforming campus life" })] }));
}
// =============================================================================
// SIGN IN STEP
// =============================================================================
function SignInStep() {
    const { state, setStep, goBack, handleSignIn, handleMagicLink, setError } = useAuth();
    const [email, setEmailInput] = useState('');
    const [password, setPassword] = useState('');
    const [usePassword, setUsePassword] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Email is required');
            return;
        }
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
    };
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsxs("button", { onClick: goBack, className: "inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] }), _jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Sign In to HIVE" })] }), state.error && (_jsxs("div", { className: "flex items-center gap-2 p-3 rounded-xl bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/20", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-[var(--hive-status-error)]" }), _jsx("span", { className: "text-sm text-[var(--hive-status-error)]", children: state.error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmailInput(e.target.value), placeholder: "alex@university.edu", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), usePassword && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your password", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] })), _jsxs(Button, { type: "submit", variant: "premium", size: "lg", className: "w-full", disabled: state.loading, children: [state.loading && _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), usePassword ? 'Sign In' : 'Send Magic Link'] })] }), _jsx("div", { className: "text-center", children: _jsx("button", { type: "button", onClick: () => setUsePassword(!usePassword), className: "text-sm text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80 transition-colors", disabled: state.loading, children: usePassword ? 'Use magic link instead' : 'Use password instead' }) }), _jsxs("div", { className: "text-center space-y-2", children: [usePassword && (_jsx("button", { type: "button", onClick: () => setStep('forgot-password'), className: "block text-sm text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors mx-auto", disabled: state.loading, children: "Forgot your password?" })), _jsxs("div", { className: "text-sm text-[var(--hive-text-muted)]", children: ["Don't have an account?", ' ', _jsx("button", { type: "button", onClick: () => setStep('sign-up'), className: "text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80 transition-colors", disabled: state.loading, children: "Sign up" })] })] })] }));
}
// =============================================================================
// SIGN UP STEP
// =============================================================================
function SignUpStep() {
    const { state, setStep, goBack, handleSignUp, setError } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation
        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }
        if (!formData.email.trim()) {
            setError('Email is required');
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
        await handleSignUp(formData.email, formData.password, formData.name);
    };
    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsxs("button", { onClick: goBack, className: "inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] }), _jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Join HIVE" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Start building tools for your campus" })] }), state.error && (_jsxs("div", { className: "flex items-center gap-2 p-3 rounded-xl bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/20", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-[var(--hive-status-error)]" }), _jsx("span", { className: "text-sm text-[var(--hive-status-error)]", children: state.error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Full Name" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => updateFormData('name', e.target.value), placeholder: "Alex Rivera", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "University Email" }), _jsx("input", { type: "email", value: formData.email, onChange: (e) => updateFormData('email', e.target.value), placeholder: "alex@university.edu", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Password" }), _jsx("input", { type: "password", value: formData.password, onChange: (e) => updateFormData('password', e.target.value), placeholder: "Create a strong password", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Confirm Password" }), _jsx("input", { type: "password", value: formData.confirmPassword, onChange: (e) => updateFormData('confirmPassword', e.target.value), placeholder: "Confirm your password", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), _jsxs(Button, { type: "submit", variant: "premium", size: "lg", className: "w-full", disabled: state.loading, children: [state.loading && _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Create Account"] })] }), _jsxs("div", { className: "text-center text-sm text-[var(--hive-text-muted)]", children: ["Already have an account?", ' ', _jsx("button", { type: "button", onClick: () => setStep('sign-in'), className: "text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-primary)]/80 transition-colors", disabled: state.loading, children: "Sign in" })] })] }));
}
// =============================================================================
// FORGOT PASSWORD STEP
// =============================================================================
function ForgotPasswordStep() {
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
    return (_jsxs("div", { className: "glass rounded-3xl p-8 space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsxs("button", { onClick: goBack, className: "inline-flex items-center gap-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back"] }), _jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Reset Password" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "We'll send you a link to reset your password" })] }), state.error && (_jsxs("div", { className: "flex items-center gap-2 p-3 rounded-xl bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/20", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-[var(--hive-status-error)]" }), _jsx("span", { className: "text-sm text-[var(--hive-status-error)]", children: state.error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmailInput(e.target.value), placeholder: "alex@university.edu", className: "w-full h-12 px-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-primary)] focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 transition-all", disabled: state.loading })] }), _jsxs(Button, { type: "submit", variant: "premium", size: "lg", className: "w-full", disabled: state.loading, children: [state.loading && _jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Send Reset Link"] })] })] }));
}
// =============================================================================
// VERIFICATION STEPS
// =============================================================================
function VerifyEmailStep() {
    const { state, goBack } = useAuth();
    return (_jsxs("div", { className: "glass rounded-3xl p-8 text-center space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center", children: _jsx(Mail, { className: "h-8 w-8 text-[var(--hive-brand-primary)]" }) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Check Your Email" }), _jsxs("p", { className: "text-[var(--hive-text-muted)]", children: ["We sent a verification link to ", _jsx("strong", { children: state.email })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Click the link in your email to verify your account and complete registration." }), _jsx(Button, { variant: "outline", size: "lg", className: "w-full", onClick: goBack, children: "Back to Sign Up" })] })] }));
}
function MagicLinkSentStep() {
    const { state, goBack } = useAuth();
    return (_jsxs("div", { className: "glass rounded-3xl p-8 text-center space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center", children: _jsx(Check, { className: "h-8 w-8 text-[var(--hive-brand-primary)]" }) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Magic Link Sent" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Check your email for a secure sign-in link" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("p", { className: "text-sm text-[var(--hive-text-muted)]", children: ["We sent a secure link to ", _jsx("strong", { children: state.email }), ". Click it to sign in instantly."] }), _jsx(Button, { variant: "outline", size: "lg", className: "w-full", onClick: goBack, children: "Back to Sign In" })] })] }));
}
function OnboardingRedirectStep() {
    return (_jsxs("div", { className: "glass rounded-3xl p-8 text-center space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-16 h-16 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center animate-pulse", children: _jsx(ArrowRight, { className: "h-8 w-8 text-[var(--hive-background-primary)]" }) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Welcome to HIVE!" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Let's get you set up with your builder profile" })] }), _jsx("div", { className: "animate-pulse", children: _jsx("div", { className: "h-2 bg-[var(--hive-brand-primary)]/30 rounded-full", children: _jsx("div", { className: "h-2 bg-[var(--hive-brand-primary)] rounded-full w-1/3 transition-all duration-1000" }) }) })] }));
}
//# sourceMappingURL=hive-auth-flow.js.map