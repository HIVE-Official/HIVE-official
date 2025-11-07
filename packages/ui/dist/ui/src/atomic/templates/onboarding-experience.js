'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Button, HiveCard, HiveCardContent, HiveCardDescription, HiveCardFooter, HiveCardHeader, HiveCardTitle, HiveLogo, Progress, Badge, } from '../atoms/index.js';
import { MotionDiv } from '../../shells/motion-safe.js';
import { HIVE_EASING } from './onboarding/motion-presets.js';
import { UB_INTEREST_CATEGORIES } from '@hive/core';
import { WelcomeStage } from './onboarding/welcome-stage.js';
import { RoleSelector } from './onboarding/role-selector.js';
import { IdentityStep } from './onboarding/identity-step.js';
import { AcademicsStep } from './onboarding/academics-step.js';
import { InterestsStep } from './onboarding/interests-step.js';
import { ConfirmStep } from './onboarding/confirm-step.js';
import { SuccessCelebration } from './onboarding/success-celebration.js';
import { ProgressSidebar, MobileProgressBadge } from './onboarding/progress-sidebar.js';
import { ArrowLeft, ArrowRight, Users, BookOpen, Heart } from 'lucide-react';
const STEP_CONFIG = [
    {
        id: 'welcome',
        title: 'Welcome to HIVE',
        description: 'UB’s student-built digital commons for tonight’s rituals and campus pulse.',
    },
    {
        id: 'role',
        title: 'Choose your role',
        description: 'Student, faculty, or alumni unlock different space permissions.',
    },
    {
        id: 'profile',
        title: 'Profile basics',
        description: 'Set your name and handle so classmates can find you fast.',
    },
    {
        id: 'academics',
        title: 'Academics & bio',
        description: 'Major, year, and living setup so the feed can match you.',
    },
    {
        id: 'interests',
        title: 'Interests',
        description: 'Pick 3-6 signals to seed Tonight @ UB with the right energy.',
    },
    {
        id: 'legal',
        title: 'Privacy & terms',
        description: 'Review the UB community agreements before entering the feed.',
    },
];
const INTEREST_OPTIONS = UB_INTEREST_CATEGORIES.flatMap(({ items }) => items);
const LIVING_SITUATIONS = [
    { value: 'north-campus', label: 'North Campus Residence' },
    { value: 'south-campus', label: 'South Campus Residence' },
    { value: 'off-campus', label: 'Off Campus in Buffalo' },
    { value: 'commuter', label: 'Commuter' },
];
const ACADEMIC_LEVELS = [
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'doctoral', label: 'Doctoral' },
    { value: 'professional', label: 'Professional Program' },
];
const TAKEN_HANDLES = ['ubstudent', 'campusqueen', 'blueandgold', 'ubambassador'];
const HANDLE_PATTERN = /^[a-z0-9._-]+$/;
const currentYear = new Date().getFullYear();
const GRAD_YEARS = Array.from({ length: 8 }, (_, index) => String(currentYear + index));
const GRAD_OPTIONS = GRAD_YEARS.map((year) => ({ value: year, label: year }));
const DEFAULT_STATE = {
    userType: null,
    firstName: '',
    lastName: '',
    fullName: '',
    handle: '',
    academicLevel: '',
    major: '',
    graduationYear: '',
    livingSituation: '',
    interests: [],
    hasConsented: false,
    acceptedPrivacy: false,
    acceptedGuidelines: false,
    bio: '',
};
const autoCapitalize = (value) => value.replace(/\b\w/g, (char) => char.toUpperCase());
const generateHandleFromName = (firstName, lastName) => {
    const normalize = (val) => val.toLowerCase().replace(/[^a-z0-9]/g, '');
    const first = normalize(firstName);
    const last = normalize(lastName);
    if (!first && !last)
        return '';
    if (!last)
        return first.slice(0, 20);
    return `${first}.${last}`.slice(0, 20);
};
export function HiveOnboardingExperience({ initialStep = 0, defaultState, onComplete, }) {
    const [currentStep, setCurrentStep] = useState(() => {
        if (initialStep < 0)
            return 0;
        if (initialStep >= STEP_CONFIG.length)
            return STEP_CONFIG.length - 1;
        return initialStep;
    });
    const [formState, setFormState] = useState(() => ({
        ...DEFAULT_STATE,
        ...defaultState,
    }));
    const [handleLocked, setHandleLocked] = useState(() => Boolean(defaultState?.handle));
    const [handleStatus, setHandleStatus] = useState('idle');
    const [isComplete, setIsComplete] = useState(false);
    const [completedState, setCompletedState] = useState(null);
    const [interestMessage, setInterestMessage] = useState(null);
    const interestMessageTimeout = useRef(null);
    const [consentError, setConsentError] = useState(false);
    useEffect(() => {
        if (handleLocked)
            return;
        const suggestion = generateHandleFromName(formState.firstName, formState.lastName);
        setFormState((previous) => {
            if (previous.handle === suggestion)
                return previous;
            return { ...previous, handle: suggestion };
        });
    }, [formState.firstName, formState.lastName, handleLocked]);
    useEffect(() => {
        const handle = formState.handle.trim();
        if (!handle) {
            setHandleStatus('idle');
            return;
        }
        if (handle.length < 3 ||
            handle.length > 20 ||
            !HANDLE_PATTERN.test(handle) ||
            handle.startsWith('.') ||
            handle.endsWith('.')) {
            setHandleStatus('invalid');
            return;
        }
        setHandleStatus('checking');
        const timeout = window.setTimeout(() => {
            const isTaken = TAKEN_HANDLES.includes(handle.toLowerCase());
            setHandleStatus(isTaken ? 'taken' : 'available');
        }, 400);
        return () => window.clearTimeout(timeout);
    }, [formState.handle]);
    useEffect(() => {
        return () => {
            if (interestMessageTimeout.current) {
                window.clearTimeout(interestMessageTimeout.current);
            }
        };
    }, []);
    const updateState = useCallback((patch) => {
        setFormState((previous) => ({ ...previous, ...patch }));
        if (interestMessageTimeout.current) {
            window.clearTimeout(interestMessageTimeout.current);
            interestMessageTimeout.current = null;
        }
        setInterestMessage(null);
        setConsentError(false);
    }, []);
    const updateFirstName = useCallback((value) => {
        const capitalized = autoCapitalize(value);
        setFormState((previous) => {
            const fullName = `${capitalized} ${previous.lastName}`.trim();
            return { ...previous, firstName: capitalized, fullName };
        });
    }, []);
    const updateLastName = useCallback((value) => {
        const capitalized = autoCapitalize(value);
        setFormState((previous) => {
            const fullName = `${previous.firstName} ${capitalized}`.trim();
            return { ...previous, lastName: capitalized, fullName };
        });
    }, []);
    const handleHandleChange = useCallback((value) => {
        const sanitized = value.toLowerCase().replace(/[^a-z0-9._-]/g, '');
        const hasValue = sanitized.length > 0;
        setHandleLocked(hasValue);
        if (!hasValue) {
            setHandleStatus('idle');
        }
        updateState({ handle: sanitized });
    }, [updateState]);
    const toggleInterest = useCallback((interest) => {
        setFormState((previous) => {
            const hasInterest = previous.interests.includes(interest);
            if (hasInterest) {
                return {
                    ...previous,
                    interests: previous.interests.filter((item) => item !== interest),
                };
            }
            if (previous.interests.length >= 6) {
                setInterestMessage('Pick up to six. Deselect one to try a new vibe.');
                if (interestMessageTimeout.current) {
                    window.clearTimeout(interestMessageTimeout.current);
                }
                interestMessageTimeout.current = window.setTimeout(() => {
                    setInterestMessage(null);
                    interestMessageTimeout.current = null;
                }, 2500);
                return previous;
            }
            return {
                ...previous,
                interests: [...previous.interests, interest],
            };
        });
    }, []);
    const currentStepConfig = STEP_CONFIG[currentStep];
    const canContinue = useMemo(() => {
        switch (currentStepConfig.id) {
            case 'welcome':
                return true;
            case 'role':
                return formState.userType !== null;
            case 'profile':
                return (formState.firstName.trim().length >= 2 &&
                    formState.lastName.trim().length >= 2 &&
                    handleStatus === 'available');
            case 'academics':
                return (formState.major.trim().length >= 2 &&
                    Boolean(formState.academicLevel) &&
                    Boolean(formState.graduationYear) &&
                    Boolean(formState.livingSituation));
            case 'interests':
                return formState.interests.length >= 3 && formState.interests.length <= 6;
            case 'legal':
                return formState.hasConsented && formState.acceptedPrivacy && formState.acceptedGuidelines;
            default:
                return false;
        }
    }, [currentStepConfig.id, formState, handleStatus]);
    const progress = useMemo(() => {
        if (currentStep === 0)
            return 0;
        const actionableSteps = STEP_CONFIG.length - 1;
        return Math.min(100, Math.round((currentStep / actionableSteps) * 100));
    }, [currentStep]);
    const goNext = useCallback(() => {
        if (!canContinue) {
            if (currentStepConfig.id === 'legal') {
                setConsentError(true);
            }
            return;
        }
        if (currentStep === STEP_CONFIG.length - 1) {
            setIsComplete(true);
            setCompletedState(formState);
            setConsentError(false);
            return;
        }
        setConsentError(false);
        setCurrentStep((previous) => Math.min(previous + 1, STEP_CONFIG.length - 1));
    }, [canContinue, currentStep, currentStepConfig.id, formState]);
    const goBack = useCallback(() => {
        setCurrentStep((previous) => Math.max(previous - 1, 0));
        setConsentError(false);
    }, []);
    const resetToSuggestedHandle = useCallback(() => {
        const suggestion = generateHandleFromName(formState.firstName, formState.lastName);
        setHandleLocked(false);
        setFormState((previous) => ({ ...previous, handle: suggestion }));
        setHandleStatus('idle');
    }, [formState.firstName, formState.lastName]);
    const handleFinalContinue = useCallback(() => {
        if (!completedState)
            return;
        onComplete?.(completedState);
    }, [completedState, onComplete]);
    const handleConsentChange = useCallback((field, value) => {
        updateState({ [field]: value });
    }, [updateState]);
    if (isComplete) {
        return (_jsx(SuccessCelebration, { firstName: completedState?.firstName || '', onContinue: handleFinalContinue }));
    }
    const fractionLabel = currentStep === 0 ? 'Orientation' : `Step ${currentStep} of ${STEP_CONFIG.length - 1}`;
    const showMobileProgress = currentStepConfig.id !== 'welcome';
    const showNavigation = currentStepConfig.id !== 'welcome';
    const academicLabel = ACADEMIC_LEVELS.find((option) => option.value === formState.academicLevel)?.label;
    const livingLabel = LIVING_SITUATIONS.find((option) => option.value === formState.livingSituation)?.label;
    const renderStepContent = () => {
        switch (currentStepConfig.id) {
            case 'welcome':
                return _jsx(WelcomeStage, { onStart: goNext });
            case 'role':
                return (_jsx(RoleSelector, { selectedRole: formState.userType, onSelect: (role) => updateState({ userType: role }) }));
            case 'profile':
                return (_jsx(IdentityStep, { firstName: formState.firstName, lastName: formState.lastName, fullName: formState.fullName, handle: formState.handle, handleLocked: handleLocked, handleStatus: handleStatus, onFirstNameChange: updateFirstName, onLastNameChange: updateLastName, onHandleChange: handleHandleChange, onResetHandle: resetToSuggestedHandle }));
            case 'academics':
                return (_jsx(AcademicsStep, { academicLevel: formState.academicLevel, graduationYear: formState.graduationYear, livingSituation: formState.livingSituation, major: formState.major, academicOptions: ACADEMIC_LEVELS, graduationOptions: GRAD_OPTIONS, livingOptions: LIVING_SITUATIONS, onAcademicLevelChange: (value) => updateState({ academicLevel: value }), onGraduationYearChange: (value) => updateState({ graduationYear: value }), onLivingSituationChange: (value) => updateState({ livingSituation: value }), onMajorChange: (value) => updateState({ major: value }) }));
            case 'interests':
                return (_jsx(InterestsStep, { options: INTEREST_OPTIONS, selected: formState.interests, onToggle: toggleInterest, helperMessage: interestMessage, minRequired: 3, maxAllowed: 6 }));
            case 'legal':
                return (_jsx(ConfirmStep, { state: formState, academicLabel: academicLabel, livingLabel: livingLabel, consentError: consentError, onConsentChange: handleConsentChange }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "relative min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] overflow-hidden", children: [_jsx(MotionDiv, { "aria-hidden": true, className: "absolute inset-0", initial: { opacity: 0 }, animate: { opacity: 1 }, style: { background: 'linear-gradient(135deg, rgba(9,11,17,0.94), rgba(9,9,11,0.88))' } }), _jsxs("div", { className: "relative z-10 flex flex-col lg:flex-row min-h-screen", children: [_jsxs("section", { className: "w-full lg:w-2/3 flex flex-col items-center p-6 lg:p-10", children: [_jsxs("header", { className: "w-full max-w-3xl mx-auto pb-10 flex items-center justify-between", children: [_jsx(HiveLogo, { showText: true, variant: "gradient", size: "default", "aria-label": "HIVE logo" }), _jsx(Badge, { variant: "outline", children: "Tonight @ UB" })] }), _jsxs("main", { className: "w-full max-w-3xl mx-auto space-y-[var(--hive-spacing-6)]", children: [showMobileProgress && (_jsx(MobileProgressBadge, { stepTitle: currentStepConfig.title, stepCopy: currentStepConfig.description, fractionLabel: fractionLabel, progressValue: progress })), _jsx(AnimatePresence, { mode: "wait", children: _jsx(MotionDiv, { initial: { opacity: 0, y: 18, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -18, scale: 0.98 }, transition: { duration: 0.45, ease: HIVE_EASING.liquid }, children: _jsxs(HiveCard, { className: "overflow-hidden rounded-[32px] border border-[var(--hive-border-primary)]/40 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(9,11,17,0.94))] backdrop-blur-[30px] shadow-[0_45px_120px_rgba(0,0,0,0.55)]", children: [_jsxs(HiveCardHeader, { className: "relative p-[var(--hive-spacing-6)] pb-[var(--hive-spacing-4)]", children: [_jsx(MotionDiv, { "aria-hidden": true, className: "absolute inset-x-[var(--hive-spacing-6)] -top-6 h-24 rounded-full bg-[radial-gradient(circle,rgba(255,215,0,0.22),transparent_65%)] opacity-40", initial: { opacity: 0 }, animate: { opacity: 0.4 } }), _jsxs("div", { className: "relative flex items-center justify-between mb-[var(--hive-spacing-3)]", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-[var(--hive-text-muted)]", children: fractionLabel }), _jsx("h1", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: currentStepConfig.title })] }), _jsxs("span", { className: "text-sm text-[var(--hive-text-muted)]", children: [progress, "% ready"] })] }), _jsxs(MotionDiv, { className: "relative", initial: { opacity: 0.4 }, animate: { opacity: 1 }, children: [_jsx(Progress, { value: progress, className: "h-2" }), _jsx(MotionDiv, { "aria-hidden": true, className: "absolute inset-0 rounded-full bg-[linear-gradient(90deg,rgba(255,215,0,0.35),rgba(86,107,255,0.35))] opacity-30", initial: { opacity: 0.1 }, animate: { opacity: [0.25, 0.45, 0.25] }, transition: { duration: 6, repeat: Infinity, ease: HIVE_EASING.silk } })] }), _jsx("p", { className: "relative mt-[var(--hive-spacing-3)] text-[var(--hive-text-secondary)] text-sm md:text-base", children: currentStepConfig.description })] }), _jsx(HiveCardContent, { className: "p-[var(--hive-spacing-6)] pt-[var(--hive-spacing-4)] space-y-[var(--hive-spacing-6)]", children: renderStepContent() }), showNavigation && (_jsxs(HiveCardFooter, { className: "flex items-center justify-between border-t border-[var(--hive-border-primary)]/30 bg-[linear-gradient(120deg,rgba(10,12,18,0.92),rgba(10,10,12,0.85))] px-[var(--hive-spacing-6)] py-[var(--hive-spacing-4)]", children: [_jsx(Button, { variant: "secondary", size: "lg", onClick: goBack, disabled: currentStep === 0, leftIcon: _jsx(ArrowLeft, { className: "w-4 h-4", "aria-hidden": true }), children: "Back" }), _jsx(Button, { variant: currentStepConfig.id === 'legal' ? 'brand' : 'default', size: "lg", onClick: goNext, disabled: !canContinue, rightIcon: _jsx(ArrowRight, { className: "w-4 h-4", "aria-hidden": true }), children: currentStepConfig.id === 'legal' ? 'Enter HIVE' : 'Continue' })] }))] }) }, currentStepConfig.id) })] })] }), _jsx("aside", { className: "hidden lg:block w-80 p-[var(--hive-spacing-6)] pt-24 relative z-10", children: _jsxs("div", { className: "sticky top-6 space-y-[var(--hive-spacing-6)]", children: [_jsx(ProgressSidebar, { steps: STEP_CONFIG, currentStep: currentStepConfig.id }), _jsxs(HiveCard, { className: "p-[var(--hive-spacing-4)] bg-[linear-gradient(150deg,rgba(255,255,255,0.03),rgba(13,14,21,0.9))] border-[var(--hive-border-primary)]/35 rounded-2xl backdrop-blur-2xl shadow-[0_32px_60px_rgba(0,0,0,0.45)]", children: [_jsxs(HiveCardHeader, { className: "space-y-1", children: [_jsx(HiveCardTitle, { className: "text-base", children: "Live preview" }), _jsx(HiveCardDescription, { children: "Snapshot of your campus identity." })] }), _jsxs(HiveCardContent, { className: "space-y-3 text-sm text-[var(--hive-text-secondary)]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "w-10 h-10 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.28),transparent_65%)] flex items-center justify-center text-sm font-semibold text-[var(--hive-brand-primary)] border border-[var(--hive-border-gold)]/60", children: [(formState.firstName[0] || 'U').toUpperCase(), (formState.lastName[0] || 'B').toUpperCase()] }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-[var(--hive-text-primary)]", children: formState.fullName || 'Your campus name' }), _jsxs("p", { className: "text-xs text-[var(--hive-text-muted)]", children: ["@", formState.handle || 'handle'] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BookOpen, { className: "h-4 w-4", "aria-hidden": true }), formState.major || 'Major still pending'] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4", "aria-hidden": true }), academicLabel || 'Academic level'] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Heart, { className: "h-4 w-4", "aria-hidden": true }), formState.interests.length > 0 ? `${formState.interests.length} interest tags` : 'Pick interest tags'] })] })] })] }) })] })] }));
}
export default HiveOnboardingExperience;
//# sourceMappingURL=onboarding-experience.js.map
