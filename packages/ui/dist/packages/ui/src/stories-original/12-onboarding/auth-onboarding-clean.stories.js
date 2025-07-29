import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiveButton, HiveInput, HiveCard, HiveProgress } from '../../components';
import { HiveLogo } from '../../components/hive-icons';
import { Mail, CheckCircle, ArrowRight, ArrowLeft, User, AtSign, GraduationCap, Wrench, Loader2, Sparkles, School } from 'lucide-react';
const meta = {
    title: '12-Onboarding/Clean Auth & Onboarding',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Clean, properly spaced authentication and onboarding flow using HIVE design system with generous spacing and clear visual hierarchy.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
// =============================================================================
// MOTION SYSTEM
// =============================================================================
const pageTransition = {
    initial: { opacity: 0, y: 40 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    },
    exit: {
        opacity: 0,
        y: -40,
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
    }
};
// =============================================================================
// SCHOOL SELECTION
// =============================================================================
function SchoolStep({ onNext }) {
    const [selected, setSelected] = useState('');
    const schools = ['Stanford University', 'UC Berkeley', 'MIT', 'Harvard University'];
    return (_jsx(motion.div, { className: "min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-secondary)] flex items-center justify-center px-8 py-16", variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: _jsxs("div", { className: "w-full max-w-lg", children: [_jsxs("div", { className: "text-center mb-20", children: [_jsx(HiveLogo, { className: "h-16 w-16 mx-auto mb-12" }), _jsx("h1", { className: "text-5xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Welcome to HIVE" }), _jsx("p", { className: "text-xl text-[var(--hive-text-muted)] leading-relaxed", children: "Your campus. Built by students who got tired of GroupMe chaos." })] }), _jsxs(HiveCard, { className: "hive-glass p-12 space-y-10", children: [_jsxs("div", { className: "flex items-center space-x-4 mb-8", children: [_jsx(School, { className: "h-6 w-6 text-[var(--hive-brand-primary)]" }), _jsx("h2", { className: "text-2xl font-semibold text-[var(--hive-text-primary)]", children: "Find Your School" })] }), _jsx(HiveInput, { type: "text", placeholder: "Search for your university...", className: "w-full h-14 text-lg" }), _jsx("div", { className: "space-y-4", children: schools.map((school) => (_jsxs(motion.button, { className: `w-full p-6 rounded-2xl border-2 text-left transition-all ${selected === school
                                    ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/5'
                                    : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]/50'}`, onClick: () => setSelected(school), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("div", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: school }), _jsxs("div", { className: "text-sm text-[var(--hive-text-muted)] mt-1", children: ["@", school.toLowerCase().replace(/\s/g, ''), ".edu"] })] }, school))) }), _jsxs(HiveButton, { className: "w-full h-14 text-lg", onClick: () => selected && onNext(selected), disabled: !selected, variant: "premium", children: ["Continue to Sign In", _jsx(ArrowRight, { className: "w-5 h-5 ml-3" })] })] })] }) }));
}
// =============================================================================
// AUTHENTICATION
// =============================================================================
function AuthStep({ schoolName, onNext, onBack }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
        onNext(email);
    };
    return (_jsx(motion.div, { className: "min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-secondary)] flex items-center justify-center px-8 py-16", variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: _jsxs("div", { className: "w-full max-w-lg", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsx(HiveLogo, { className: "h-12 w-12 mx-auto mb-10" }), _jsx("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-6", children: "Sign in to HIVE" }), _jsxs("p", { className: "text-lg text-[var(--hive-text-muted)]", children: ["Join ", _jsx("span", { className: "text-[var(--hive-brand-primary)]", children: schoolName }), " on HIVE"] })] }), _jsx(HiveCard, { className: "hive-glass p-12", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-4 text-[var(--hive-text-primary)]", children: "School email address" }), _jsx(HiveInput, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Enter your school email", required: true, disabled: loading, className: "w-full h-14 text-lg" }), _jsx("p", { className: "text-sm mt-3 text-[var(--hive-text-muted)]", children: "We'll send a secure magic link to your email" })] }), _jsx(HiveButton, { type: "submit", disabled: loading || !email, className: "w-full h-14 text-lg", variant: "premium", children: loading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 mr-3 animate-spin" }), "Sending magic link..."] })) : (_jsxs(_Fragment, { children: ["Send magic link", _jsx(Mail, { className: "w-5 h-5 ml-3" })] })) })] }) }), _jsx("div", { className: "text-center mt-10", children: _jsxs(HiveButton, { variant: "ghost", onClick: onBack, className: "text-lg", children: [_jsx(ArrowLeft, { className: "w-5 h-5 mr-3" }), "Back to school selection"] }) })] }) }));
}
// =============================================================================
// ONBOARDING STEP WRAPPER
// =============================================================================
function OnboardingStep({ title, subtitle, step, totalSteps, children, onNext, onBack, canProceed = true, nextLabel = "Continue" }) {
    const progress = (step / totalSteps) * 100;
    return (_jsx(motion.div, { className: "min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-secondary)] flex items-center justify-center px-8 py-16", variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: _jsx("div", { className: "w-full max-w-2xl", children: _jsxs(HiveCard, { className: "hive-glass p-16", children: [_jsxs("div", { className: "mb-16", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsxs("div", { children: [_jsxs("div", { className: "text-sm text-[var(--hive-text-muted)] mb-2", children: ["Step ", step, " of ", totalSteps] }), _jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: title })] }), _jsxs("div", { className: "text-lg text-[var(--hive-text-muted)]", children: [Math.round(progress), "%"] })] }), _jsx(HiveProgress, { value: progress, className: "h-3 mb-6" }), _jsx("p", { className: "text-lg text-[var(--hive-text-muted)] leading-relaxed", children: subtitle })] }), _jsx("div", { className: "mb-16", children: children }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(HiveButton, { variant: "ghost", onClick: onBack, className: "text-lg px-8", children: [_jsx(ArrowLeft, { className: "w-5 h-5 mr-3" }), "Back"] }), _jsxs(HiveButton, { onClick: onNext, disabled: !canProceed, variant: "premium", className: "text-lg px-12 h-14", children: [nextLabel, _jsx(ArrowRight, { className: "w-5 h-5 ml-3" })] })] })] }) }) }));
}
// =============================================================================
// NAME STEP
// =============================================================================
function NameStep({ onNext, onBack }) {
    const [name, setName] = useState('');
    return (_jsx(OnboardingStep, { title: "What's your name?", subtitle: "This is how you'll be known on HIVE", step: 1, totalSteps: 4, onNext: () => onNext(name), onBack: onBack, canProceed: name.trim().length >= 2, children: _jsxs("div", { className: "text-center space-y-12", children: [_jsx("div", { className: "w-24 h-24 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(User, { className: "w-12 h-12 text-[var(--hive-brand-primary)]" }) }), _jsx("div", { className: "max-w-md mx-auto", children: _jsx(HiveInput, { type: "text", placeholder: "Enter your full name", value: name, onChange: (e) => setName(e.target.value), className: "w-full h-16 text-xl text-center", autoFocus: true }) }), name.trim().length >= 2 && (_jsxs(motion.div, { className: "flex items-center justify-center space-x-3 text-[var(--hive-status-success)]", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: [_jsx(CheckCircle, { className: "w-5 h-5" }), _jsx("span", { className: "text-lg", children: "Looks good!" })] }))] }) }));
}
// =============================================================================
// HANDLE STEP
// =============================================================================
function HandleStep({ onNext, onBack }) {
    const [handle, setHandle] = useState('');
    const [isAvailable, setIsAvailable] = useState(null);
    const checkHandle = (value) => {
        if (value.length >= 3) {
            const reserved = ['admin', 'hive', 'api'];
            setIsAvailable(!reserved.includes(value.toLowerCase()));
        }
        else {
            setIsAvailable(null);
        }
    };
    const handleChange = (e) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
        setHandle(value);
        checkHandle(value);
    };
    return (_jsx(OnboardingStep, { title: "Choose your handle", subtitle: "Your unique @username on HIVE", step: 2, totalSteps: 4, onNext: () => onNext(handle), onBack: onBack, canProceed: handle.length >= 3 && isAvailable === true, children: _jsxs("div", { className: "text-center space-y-12", children: [_jsx("div", { className: "w-24 h-24 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(AtSign, { className: "w-12 h-12 text-[var(--hive-brand-primary)]" }) }), _jsxs("div", { className: "max-w-md mx-auto space-y-6", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-6 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-muted)] text-xl", children: "@" }), _jsx(HiveInput, { type: "text", placeholder: "yourhandle", value: handle, onChange: handleChange, className: "w-full h-16 text-xl text-center pl-12", autoFocus: true }), _jsx("div", { className: "absolute right-6 top-1/2 transform -translate-y-1/2", children: isAvailable === true && (_jsx(CheckCircle, { className: "w-6 h-6 text-[var(--hive-status-success)]" })) })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "3+ characters, letters, numbers, and underscores only" })] }), handle.length >= 3 && isAvailable === true && (_jsx(motion.div, { className: "p-6 bg-[var(--hive-status-success)]/10 border border-[var(--hive-status-success)]/30 rounded-2xl", initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, children: _jsxs("div", { className: "flex items-center justify-center space-x-3 text-[var(--hive-status-success)]", children: [_jsx(CheckCircle, { className: "w-5 h-5" }), _jsxs("span", { className: "text-lg font-medium", children: ["@", handle, " is available!"] })] }) }))] }) }));
}
// =============================================================================
// ACADEMICS STEP
// =============================================================================
function AcademicsStep({ onNext, onBack }) {
    const [major, setMajor] = useState('');
    const majors = [
        'Computer Science', 'Business', 'Engineering', 'Psychology',
        'Biology', 'Economics', 'Art & Design', 'Mathematics'
    ];
    return (_jsx(OnboardingStep, { title: "What's your major?", subtitle: "Help us connect you with relevant spaces and peers", step: 3, totalSteps: 4, onNext: () => onNext(major), onBack: onBack, canProceed: !!major, children: _jsxs("div", { className: "space-y-12", children: [_jsx("div", { className: "text-center", children: _jsx("div", { className: "w-24 h-24 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-8", children: _jsx(GraduationCap, { className: "w-12 h-12 text-[var(--hive-brand-primary)]" }) }) }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: majors.map((majorOption) => (_jsx(motion.button, { className: `p-6 rounded-2xl border-2 text-lg transition-all ${major === majorOption
                            ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/5 text-[var(--hive-brand-primary)]'
                            : 'border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] hover:border-[var(--hive-brand-primary)]/50'}`, onClick: () => setMajor(majorOption), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: majorOption }, majorOption))) }), _jsx("div", { className: "text-center", children: _jsx(HiveInput, { type: "text", placeholder: "Or enter your major", value: major, onChange: (e) => setMajor(e.target.value), className: "w-full max-w-md mx-auto h-14 text-lg text-center" }) })] }) }));
}
// =============================================================================
// BUILDER STEP
// =============================================================================
function BuilderStep({ onNext, onBack }) {
    const [builderOptIn, setBuilderOptIn] = useState(false);
    return (_jsx(OnboardingStep, { title: "Ready to build?", subtitle: "Get access to HIVE's tool builder and create custom solutions", step: 4, totalSteps: 4, onNext: () => onNext(builderOptIn), onBack: onBack, canProceed: true, nextLabel: "Complete Setup", children: _jsxs("div", { className: "space-y-12", children: [_jsx("div", { className: "text-center", children: _jsx("div", { className: "w-24 h-24 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-8", children: _jsx(Wrench, { className: "w-12 h-12 text-[var(--hive-brand-primary)]" }) }) }), _jsx(HiveCard, { className: "p-10", children: _jsxs("div", { className: "flex items-start space-x-6", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-brand-primary)] rounded-2xl flex items-center justify-center", children: _jsx(Wrench, { className: "w-8 h-8 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-4", children: "Builder Access" }), _jsx("p", { className: "text-lg text-[var(--hive-text-muted)] mb-8 leading-relaxed", children: "Create tools, automate workflows, and build solutions for your campus community" }), _jsxs("label", { className: "flex items-center space-x-4 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: builderOptIn, onChange: (e) => setBuilderOptIn(e.target.checked), className: "w-5 h-5 text-[var(--hive-brand-primary)] rounded" }), _jsx("span", { className: "text-lg text-[var(--hive-text-primary)]", children: "Yes, I want builder access" })] })] })] }) }), builderOptIn && (_jsxs(motion.div, { className: "text-center p-8 bg-[var(--hive-brand-primary)]/5 border border-[var(--hive-brand-primary)]/20 rounded-2xl", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, children: [_jsx(Sparkles, { className: "w-8 h-8 text-[var(--hive-brand-primary)] mx-auto mb-4" }), _jsx("p", { className: "text-lg text-[var(--hive-text-primary)] font-medium mb-2", children: "Welcome to the builder community!" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "You'll get access to advanced tools and exclusive builder spaces" })] }))] }) }));
}
// =============================================================================
// SUCCESS STEP
// =============================================================================
function SuccessStep({ state }) {
    return (_jsx(motion.div, { className: "min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] to-[var(--hive-background-secondary)] flex items-center justify-center px-8 py-16", variants: pageTransition, initial: "initial", animate: "animate", exit: "exit", children: _jsxs("div", { className: "w-full max-w-lg text-center", children: [_jsx(motion.div, { className: "w-32 h-32 bg-gradient-to-br from-[var(--hive-brand-primary)] to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-12", animate: {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                    }, transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }, children: _jsx(Sparkles, { className: "w-16 h-16 text-[var(--hive-background-primary)]" }) }), _jsx("h1", { className: "text-5xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Welcome to HIVE!" }), _jsxs("p", { className: "text-xl text-[var(--hive-text-muted)] mb-16 leading-relaxed", children: ["Your profile is ready, ", state.name.split(' ')[0], "!"] }), _jsx(HiveCard, { className: "hive-glass p-10 mb-12", children: _jsxs("div", { className: "space-y-6 text-left", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-lg text-[var(--hive-text-muted)]", children: "Name:" }), _jsx("span", { className: "text-lg text-[var(--hive-text-primary)]", children: state.name })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-lg text-[var(--hive-text-muted)]", children: "Handle:" }), _jsxs("span", { className: "text-lg text-[var(--hive-brand-primary)]", children: ["@", state.handle] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-lg text-[var(--hive-text-muted)]", children: "Major:" }), _jsx("span", { className: "text-lg text-[var(--hive-text-primary)]", children: state.major })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-lg text-[var(--hive-text-muted)]", children: "Builder:" }), _jsx("span", { className: "text-lg text-[var(--hive-text-primary)]", children: state.builderOptIn ? 'Enabled' : 'Disabled' })] })] }) }), _jsx(motion.p, { className: "text-lg text-[var(--hive-text-muted)]", animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 2, repeat: Infinity }, children: "Taking you to your new digital campus..." })] }) }));
}
// =============================================================================
// MAIN FLOW COMPONENT
// =============================================================================
function CleanAuthFlow() {
    const [state, setState] = useState({
        step: 'school',
        loading: false,
        schoolName: '',
        email: '',
        name: '',
        handle: '',
        major: '',
        builderOptIn: false,
    });
    const updateState = (updates) => {
        setState(prev => ({ ...prev, ...updates }));
    };
    const renderStep = () => {
        switch (state.step) {
            case 'school':
                return (_jsx(SchoolStep, { onNext: (schoolName) => updateState({ schoolName, step: 'auth' }) }));
            case 'auth':
                return (_jsx(AuthStep, { schoolName: state.schoolName, onNext: (email) => updateState({ email, step: 'name' }), onBack: () => updateState({ step: 'school' }) }));
            case 'name':
                return (_jsx(NameStep, { onNext: (name) => updateState({ name, step: 'handle' }), onBack: () => updateState({ step: 'auth' }) }));
            case 'handle':
                return (_jsx(HandleStep, { onNext: (handle) => updateState({ handle, step: 'academics' }), onBack: () => updateState({ step: 'name' }) }));
            case 'academics':
                return (_jsx(AcademicsStep, { onNext: (major) => updateState({ major, step: 'builder' }), onBack: () => updateState({ step: 'handle' }) }));
            case 'builder':
                return (_jsx(BuilderStep, { onNext: (builderOptIn) => updateState({ builderOptIn, step: 'success' }), onBack: () => updateState({ step: 'academics' }) }));
            case 'success':
                return _jsx(SuccessStep, { state: state });
            default:
                return null;
        }
    };
    return (_jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { children: renderStep() }, state.step) }));
}
// =============================================================================
// STORIES
// =============================================================================
export const CompleteFlow = {
    name: 'Clean Complete Flow',
    render: () => _jsx(CleanAuthFlow, {}),
    parameters: {
        docs: {
            description: {
                story: 'Clean, properly spaced authentication and onboarding flow with generous spacing, clear visual hierarchy, and proper HIVE design system implementation.'
            }
        }
    }
};
export const SchoolSelection = {
    name: 'School Selection',
    render: () => (_jsx(SchoolStep, { onNext: (school) => console.log('Selected:', school) }))
};
export const Authentication = {
    name: 'Authentication',
    render: () => (_jsx(AuthStep, { schoolName: "Stanford University", onNext: (email) => console.log('Email:', email), onBack: () => console.log('Back') }))
};
export const NameCollection = {
    name: 'Name Collection',
    render: () => (_jsx(NameStep, { onNext: (name) => console.log('Name:', name), onBack: () => console.log('Back') }))
};
export const HandleSelection = {
    name: 'Handle Selection',
    render: () => (_jsx(HandleStep, { onNext: (handle) => console.log('Handle:', handle), onBack: () => console.log('Back') }))
};
export const AcademicDetails = {
    name: 'Academic Details',
    render: () => (_jsx(AcademicsStep, { onNext: (major) => console.log('Major:', major), onBack: () => console.log('Back') }))
};
export const BuilderPreferences = {
    name: 'Builder Preferences',
    render: () => (_jsx(BuilderStep, { onNext: (optIn) => console.log('Builder:', optIn), onBack: () => console.log('Back') }))
};
export const SuccessScreen = {
    name: 'Success Screen',
    render: () => (_jsx(SuccessStep, { state: {
            step: 'success',
            loading: false,
            schoolName: 'Stanford University',
            email: 'alex@stanford.edu',
            name: 'Alex Rivera',
            handle: 'alexrivera',
            major: 'Computer Science',
            builderOptIn: true,
        } }))
};
//# sourceMappingURL=auth-onboarding-clean.stories.js.map