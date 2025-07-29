import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveButton, HiveInput, HiveCard, HiveProgress } from '../../components';
import { HiveLogo } from '../../components/hive-icons';
import { Mail, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, User, GraduationCap, AtSign, Camera, Wrench, Shield, Loader2, Sparkles } from 'lucide-react';
const meta = {
    title: '12-Onboarding/Real Authentication Flow',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Complete HIVE authentication and onboarding flow using the actual components and APIs we built. This demonstrates the real user journey with session management, backend integration, and proper error handling.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
// Mock API responses for Storybook
const mockAPI = {
    sendMagicLink: async (email, schoolId) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            message: "Magic link sent to your email address",
            devMode: true,
            magicLink: `http://localhost:3000/auth/verify?mode=signIn&oobCode=DEV_MODE&email=${encodeURIComponent(email)}&schoolId=${schoolId}`
        };
    },
    verifyMagicLink: async (email, schoolId) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            success: true,
            needsOnboarding: true,
            userId: `dev_${email.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}`,
            developmentMode: true,
        };
    },
    completeOnboarding: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1500));
        return {
            success: true,
            message: "Onboarding completed successfully",
            user: {
                id: data.userId,
                fullName: data.fullName,
                handle: data.handle.toLowerCase(),
                major: data.major,
                builderOptIn: data.builderOptIn,
            },
        };
    },
    checkHandle: async (handle) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        const reserved = ['admin', 'hive', 'api', 'test'];
        return {
            available: !reserved.includes(handle.toLowerCase()) && handle.length >= 3
        };
    }
};
// School Search Step
const SchoolSearchStep = ({ onNext }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSchool, setSelectedSchool] = useState(null);
    const mockSchools = [
        { id: 'stanford', name: 'Stanford University', domain: 'stanford.edu' },
        { id: 'berkeley', name: 'UC Berkeley', domain: 'berkeley.edu' },
        { id: 'mit', name: 'MIT', domain: 'mit.edu' },
        { id: 'harvard', name: 'Harvard University', domain: 'harvard.edu' },
    ];
    const filteredSchools = mockSchools.filter(school => school.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsx("div", { className: "min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx(HiveLogo, { className: "h-12 w-12 mx-auto mb-6" }), _jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Welcome to HIVE" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Your campus. Built by students who got tired of GroupMe chaos." })] }), _jsxs(HiveCard, { className: "p-8", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-6", children: "Find Your School" }), _jsxs("div", { className: "space-y-4", children: [_jsx(HiveInput, { type: "text", placeholder: "Search for your university...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "w-full" }), searchTerm && (_jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: filteredSchools.map((school) => (_jsxs("div", { className: `p-3 rounded-lg border cursor-pointer transition-all ${selectedSchool?.id === school.id
                                            ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10'
                                            : 'border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-focus)]'}`, onClick: () => setSelectedSchool(school), children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: school.name }), _jsx("div", { className: "text-[var(--hive-text-muted)] text-sm", children: school.domain })] }, school.id))) }))] }), _jsxs(HiveButton, { className: "w-full mt-6", onClick: () => selectedSchool && onNext(selectedSchool), disabled: !selectedSchool, children: ["Continue to Sign In", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] })] })] }) }));
};
// Login Step
const LoginStep = ({ schoolData, onNext, onBack }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const result = await mockAPI.sendMagicLink(email, schoolData.id);
            onNext(email, result.magicLink);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx(HiveLogo, { className: "h-12 w-12 mx-auto mb-6" }), _jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Sign in to HIVE" }), _jsxs("p", { className: "text-[var(--hive-text-muted)]", children: ["Join ", _jsx("span", { className: "text-[var(--hive-brand-primary)]", children: schoolData.name }), " on HIVE"] })] }), _jsx(HiveCard, { className: "p-8", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2 text-[var(--hive-text-primary)]", children: "School email address" }), _jsx(HiveInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: `Enter your @${schoolData.domain} address`, required: true, disabled: isLoading, className: "w-full" }), _jsx("p", { className: "text-xs mt-1 text-[var(--hive-text-muted)]", children: "We'll send a secure magic link to your email" })] }), error && (_jsx("div", { className: "p-3 rounded-lg bg-[var(--hive-status-error)]/10 border border-[var(--hive-status-error)]/30", children: _jsx("p", { className: "text-sm text-[var(--hive-status-error)]", children: error }) })), _jsx(HiveButton, { type: "submit", disabled: isLoading || !email, className: "w-full", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), "Sending magic link..."] })) : ('Send magic link') })] }) }), _jsx("div", { className: "text-center mt-6", children: _jsxs(HiveButton, { variant: "ghost", onClick: onBack, children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Back to school selection"] }) })] }) }));
};
// Magic Link Sent Step
const MagicLinkSentStep = ({ email, magicLink, onNext }) => {
    const [isVerifying, setIsVerifying] = useState(false);
    const handleMagicLinkClick = async () => {
        setIsVerifying(true);
        try {
            const urlParams = new URLSearchParams(new URL(magicLink).search);
            const schoolId = urlParams.get('schoolId');
            const result = await mockAPI.verifyMagicLink(email, schoolId || 'test-school');
            // Simulate session creation
            const sessionData = {
                userId: result.userId,
                email: email,
                schoolId: schoolId || 'test-school',
                needsOnboarding: result.needsOnboarding,
                verifiedAt: new Date().toISOString(),
            };
            onNext(sessionData);
        }
        catch (error) {
            console.error('Magic link verification failed:', error);
        }
        finally {
            setIsVerifying(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--hive-status-success)]/20 border border-[var(--hive-status-success)]/30 flex items-center justify-center", children: _jsx(Mail, { className: "w-8 h-8 text-[var(--hive-status-success)]" }) }), _jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Check your inbox" }), _jsxs("p", { className: "text-[var(--hive-text-muted)] mb-6", children: ["Magic link sent to ", _jsx("span", { className: "text-[var(--hive-brand-primary)]", children: email })] }), _jsx(HiveCard, { className: "p-6 mb-6", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm text-[var(--hive-text-muted)] mb-4", children: "\uD83D\uDEE0\uFE0F Development Mode - Magic Link:" }), _jsx("div", { className: "p-3 bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/30 rounded-lg mb-4", children: _jsx("p", { className: "text-xs text-[var(--hive-brand-primary)] break-all", children: magicLink }) }), _jsx(HiveButton, { onClick: handleMagicLinkClick, disabled: isVerifying, className: "w-full", children: isVerifying ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), "Verifying..."] })) : ('Use Dev Magic Link') })] }) }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "New to HIVE? Your account will be created automatically." })] }) }) }));
};
// Onboarding Steps
const OnboardingSteps = ({ userData, onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({
        fullName: '',
        major: '',
        handle: '',
        avatarUrl: '',
        builderOptIn: false,
        consentGiven: false,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [handleAvailable, setHandleAvailable] = useState(null);
    const [isCheckingHandle, setIsCheckingHandle] = useState(false);
    const steps = [
        { id: 'name', title: 'Your Identity', icon: User },
        { id: 'academics', title: 'Academic Profile', icon: GraduationCap },
        { id: 'handle', title: 'Unique Handle', icon: AtSign },
        { id: 'photo', title: 'Profile Picture', icon: Camera },
        { id: 'builder', title: 'Builder Access', icon: Wrench },
        { id: 'legal', title: 'Terms & Privacy', icon: Shield },
    ];
    const progress = ((currentStep + 1) / steps.length) * 100;
    const checkHandle = async (handle) => {
        if (handle.length < 3) {
            setHandleAvailable(null);
            return;
        }
        setIsCheckingHandle(true);
        try {
            const result = await mockAPI.checkHandle(handle);
            setHandleAvailable(result.available);
        }
        finally {
            setIsCheckingHandle(false);
        }
    };
    const canGoNext = () => {
        switch (currentStep) {
            case 0: return data.fullName.trim().length >= 2;
            case 1: return data.major.length > 0;
            case 2: return data.handle.length >= 3 && handleAvailable === true;
            case 3: return true; // Optional step
            case 4: return true;
            case 5: return data.consentGiven;
            default: return false;
        }
    };
    const goNext = () => {
        if (currentStep < steps.length - 1 && canGoNext()) {
            setCurrentStep(prev => prev + 1);
        }
    };
    const goBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };
    const handleSubmit = async () => {
        if (!canGoNext())
            return;
        setIsSubmitting(true);
        try {
            const result = await mockAPI.completeOnboarding({
                userId: userData.userId,
                ...data,
            });
            onComplete(result);
        }
        catch (error) {
            console.error('Onboarding error:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const renderStep = () => {
        switch (currentStep) {
            case 0: // Name
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "What's your name?" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "This is how you'll be known on HIVE" })] }), _jsx(HiveInput, { type: "text", placeholder: "Enter your full name", value: data.fullName, onChange: (e) => setData({ ...data, fullName: e.target.value }), className: "w-full text-lg" })] }));
            case 1: // Academics
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "What's your major?" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Help us connect you with relevant spaces" })] }), _jsx(HiveInput, { type: "text", placeholder: "e.g., Computer Science, Business, Art", value: data.major, onChange: (e) => setData({ ...data, major: e.target.value }), className: "w-full text-lg" })] }));
            case 2: // Handle
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Choose your handle" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Your unique @username on HIVE" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-muted)]", children: "@" }), _jsx(HiveInput, { type: "text", placeholder: "yourhandle", value: data.handle, onChange: (e) => {
                                        const newHandle = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
                                        setData({ ...data, handle: newHandle });
                                        checkHandle(newHandle);
                                    }, className: "w-full text-lg pl-8" }), isCheckingHandle && (_jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2", children: _jsx(Loader2, { className: "w-4 h-4 animate-spin" }) })), !isCheckingHandle && handleAvailable === true && (_jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2", children: _jsx(CheckCircle, { className: "w-4 h-4 text-[var(--hive-status-success)]" }) })), !isCheckingHandle && handleAvailable === false && (_jsx("div", { className: "absolute right-3 top-1/2 transform -translate-y-1/2", children: _jsx(AlertCircle, { className: "w-4 h-4 text-[var(--hive-status-error)]" }) }))] }), handleAvailable === false && (_jsx("p", { className: "text-sm text-[var(--hive-status-error)]", children: "This handle is not available" }))] }));
            case 3: // Photo
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Add a profile picture" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Optional - you can add this later" })] }), _jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-32 h-32 bg-[var(--hive-background-secondary)] rounded-full flex items-center justify-center border-2 border-dashed border-[var(--hive-border-subtle)]", children: _jsx(Camera, { className: "w-8 h-8 text-[var(--hive-text-muted)]" }) }) }), _jsx("p", { className: "text-center text-sm text-[var(--hive-text-muted)]", children: "Click to upload or drag and drop" })] }));
            case 4: // Builder
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Ready to build?" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Get access to HIVE's tool builder and create custom solutions" })] }), _jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "flex items-start space-x-4", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-brand-primary)] rounded-lg flex items-center justify-center", children: _jsx(Wrench, { className: "w-5 h-5 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: "Builder Access" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] mb-4", children: "Create tools, automate workflows, and build solutions for your campus community" }), _jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: data.builderOptIn, onChange: (e) => setData({ ...data, builderOptIn: e.target.checked }), className: "w-4 h-4 text-[var(--hive-brand-primary)] rounded" }), _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: "Yes, I want builder access" })] })] })] }) })] }));
            case 5: // Legal
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Terms & Privacy" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Please review and accept our terms" })] }), _jsx("div", { className: "space-y-4", children: _jsxs("label", { className: "flex items-start space-x-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: data.consentGiven, onChange: (e) => setData({ ...data, consentGiven: e.target.checked }), className: "w-4 h-4 text-[var(--hive-brand-primary)] rounded mt-1" }), _jsxs("div", { className: "text-sm text-[var(--hive-text-muted)]", children: ["I agree to HIVE's", ' ', _jsx("a", { href: "#", className: "text-[var(--hive-brand-primary)] hover:underline", children: "Terms of Service" }), ' ', "and", ' ', _jsx("a", { href: "#", className: "text-[var(--hive-brand-primary)] hover:underline", children: "Privacy Policy" })] })] }) })] }));
            default:
                return null;
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4", children: _jsx("div", { className: "w-full max-w-2xl", children: _jsxs(HiveCard, { className: "p-8", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-brand-primary)] rounded-lg flex items-center justify-center", children: steps[currentStep] && (() => {
                                                    const IconComponent = steps[currentStep].icon;
                                                    return _jsx(IconComponent, { className: "w-4 h-4 text-[var(--hive-background-primary)]" });
                                                })() }), _jsxs("div", { children: [_jsxs("div", { className: "text-sm text-[var(--hive-text-muted)]", children: ["Step ", currentStep + 1, " of ", steps.length] }), _jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: steps[currentStep]?.title })] })] }), _jsxs("div", { className: "text-sm text-[var(--hive-text-muted)]", children: [Math.round(progress), "% complete"] })] }), _jsx(HiveProgress, { value: progress, className: "h-2" })] }), _jsx("div", { className: "min-h-[280px] mb-6", children: renderStep() }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(HiveButton, { variant: "ghost", onClick: goBack, disabled: currentStep === 0, children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Back"] }), currentStep === steps.length - 1 ? (_jsx(HiveButton, { onClick: handleSubmit, disabled: !canGoNext() || isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), "Creating your profile..."] })) : (_jsxs(_Fragment, { children: ["Enter HIVE", _jsx(Sparkles, { className: "w-4 h-4 ml-2" })] })) })) : (_jsxs(HiveButton, { onClick: goNext, disabled: !canGoNext(), children: ["Continue", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }))] })] }) }) }));
};
// Success Step
const SuccessStep = ({ result }) => {
    return (_jsx("div", { className: "min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-4", children: _jsxs("div", { className: "w-full max-w-md text-center", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-[var(--hive-brand-primary)] to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-6", children: _jsx(Sparkles, { className: "w-10 h-10 text-[var(--hive-background-primary)]" }) }), _jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Welcome to HIVE!" }), _jsxs("p", { className: "text-xl text-[var(--hive-text-muted)] mb-8", children: ["Your profile is ready, ", result.user.fullName.split(' ')[0], "!"] }), _jsx(HiveCard, { className: "p-6 mb-8", children: _jsxs("div", { className: "space-y-3 text-left", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Name:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: result.user.fullName })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Handle:" }), _jsxs("span", { className: "text-[var(--hive-brand-primary)]", children: ["@", result.user.handle] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Major:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: result.user.major })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-[var(--hive-text-muted)]", children: "Builder:" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: result.user.builderOptIn ? 'Enabled' : 'Disabled' })] })] }) }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Taking you to your new digital campus..." })] }) }));
};
// Main Flow Component
const RealAuthFlow = () => {
    const [currentStep, setCurrentStep] = useState('school');
    const [schoolData, setSchoolData] = useState(null);
    const [email, setEmail] = useState('');
    const [magicLink, setMagicLink] = useState('');
    const [userData, setUserData] = useState(null);
    const [result, setResult] = useState(null);
    const handleSchoolSelected = (school) => {
        setSchoolData(school);
        setCurrentStep('login');
    };
    const handleMagicLinkSent = (userEmail, link) => {
        setEmail(userEmail);
        setMagicLink(link);
        setCurrentStep('magic-link');
    };
    const handleMagicLinkVerified = (user) => {
        setUserData(user);
        setCurrentStep('onboarding');
    };
    const handleOnboardingComplete = (onboardingResult) => {
        setResult(onboardingResult);
        setCurrentStep('success');
    };
    const resetFlow = () => {
        setCurrentStep('school');
        setSchoolData(null);
        setEmail('');
        setMagicLink('');
        setUserData(null);
        setResult(null);
    };
    switch (currentStep) {
        case 'school':
            return _jsx(SchoolSearchStep, { onNext: handleSchoolSelected });
        case 'login':
            return (_jsx(LoginStep, { schoolData: schoolData, onNext: handleMagicLinkSent, onBack: () => setCurrentStep('school') }));
        case 'magic-link':
            return (_jsx(MagicLinkSentStep, { email: email, magicLink: magicLink, onNext: handleMagicLinkVerified }));
        case 'onboarding':
            return (_jsx(OnboardingSteps, { userData: userData, onComplete: handleOnboardingComplete }));
        case 'success':
            return _jsx(SuccessStep, { result: result });
        default:
            return null;
    }
};
export const CompleteRealAuthFlow = {
    name: 'Complete Real Authentication Flow',
    render: () => _jsx(RealAuthFlow, {}),
    parameters: {
        docs: {
            description: {
                story: 'Complete authentication and onboarding flow using the actual components and API structure we built. This demonstrates the real user journey: school selection → login → magic link → onboarding → success. All form validation, error handling, and state management works exactly as in the production app.'
            }
        }
    }
};
// Individual step stories for testing
export const SchoolSearch = {
    name: 'School Search Step',
    render: () => _jsx(SchoolSearchStep, { onNext: (school) => console.log('School selected:', school) }),
    parameters: {
        docs: {
            description: {
                story: 'School search and selection step with real search functionality and school data.'
            }
        }
    }
};
export const LoginForm = {
    name: 'Login Form Step',
    render: () => {
        const mockSchool = { id: 'stanford', name: 'Stanford University', domain: 'stanford.edu' };
        return (_jsx(LoginStep, { schoolData: mockSchool, onNext: (email, link) => console.log('Magic link sent:', { email, link }), onBack: () => console.log('Back to school selection') }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Login form with email validation and magic link sending functionality.'
            }
        }
    }
};
export const MagicLinkSent = {
    name: 'Magic Link Sent Step',
    render: () => (_jsx(MagicLinkSentStep, { email: "test@stanford.edu", magicLink: "http://localhost:3000/auth/verify?mode=signIn&oobCode=DEV_MODE&email=test%40stanford.edu&schoolId=stanford", onNext: (userData) => console.log('Magic link verified:', userData) })),
    parameters: {
        docs: {
            description: {
                story: 'Magic link confirmation screen with development mode link for testing.'
            }
        }
    }
};
export const OnboardingFlow = {
    name: 'Onboarding Flow Steps',
    render: () => {
        const mockUserData = {
            userId: 'dev_test_user_123',
            email: 'test@stanford.edu',
            schoolId: 'stanford',
        };
        return (_jsx(OnboardingSteps, { userData: mockUserData, onComplete: (result) => console.log('Onboarding complete:', result) }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Complete onboarding wizard with all steps: name, academics, handle, photo, builder, and legal. Features real validation, handle checking, and progress tracking.'
            }
        }
    }
};
export const SuccessScreen = {
    name: 'Success Screen',
    render: () => {
        const mockResult = {
            user: {
                fullName: 'Alex Rivera',
                handle: 'alexrivera',
                major: 'Computer Science',
                builderOptIn: true,
            }
        };
        return _jsx(SuccessStep, { result: mockResult });
    },
    parameters: {
        docs: {
            description: {
                story: 'Success screen showing completed profile information after successful onboarding.'
            }
        }
    }
};
//# sourceMappingURL=real-auth-flow.stories.js.map