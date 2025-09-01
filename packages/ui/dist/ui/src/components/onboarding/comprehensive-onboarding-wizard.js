'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Use only working UI imports
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Input } from '../../atomic/atoms/input-enhanced.js';
import { Progress } from '../ui/progress.js';
import { Badge } from '../ui/badge.js';
import { Card, CardContent } from '../ui/card.js';
import { HiveLogo } from '../HiveLogo.js';
import { cn } from '../../lib/utils.js';
// Icons
import { ArrowLeft, ArrowRight, CheckCircle, Camera, GraduationCap, Users, Building2, Code, BookOpen, Calendar, Sparkles, Trophy, Rocket, Loader2, AlertCircle } from 'lucide-react';
const OnboardingContext = createContext(null);
export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within OnboardingProvider');
    }
    return context;
};
// Step sequence
const STEPS = [
    'welcome',
    'user-type',
    'profile',
    'academics',
    'interests',
    'spaces',
    'builder',
    'legal',
    'complete'
];
// UB Academic Data
const UB_MAJORS = [
    { id: 'cs-bs', name: 'Computer Science', department: 'Engineering' },
    { id: 'bus-bs', name: 'Business Administration', department: 'Management' },
    { id: 'bio-bs', name: 'Biology', department: 'Arts and Sciences' },
    { id: 'me-bs', name: 'Mechanical Engineering', department: 'Engineering' },
    { id: 'psyc-bs', name: 'Psychology', department: 'Arts and Sciences' }
];
const INTERESTS = [
    { id: 'programming', name: 'Programming', description: 'Software development and coding' },
    { id: 'research', name: 'Research', description: 'Academic research and publications' },
    { id: 'entrepreneurship', name: 'Entrepreneurship', description: 'Starting businesses' },
    { id: 'design', name: 'Design', description: 'UI/UX and graphic design' },
    { id: 'data-science', name: 'Data Science', description: 'Analytics and ML' },
    { id: 'leadership', name: 'Leadership', description: 'Team management' }
];
const SPACES = [
    {
        id: 'cs-study',
        name: 'CS Study Group',
        description: 'Collaborative study sessions for CS majors',
        memberCount: 247,
        tags: ['study', 'programming', 'exams']
    },
    {
        id: 'ub-entrepreneurs',
        name: 'UB Entrepreneurs',
        description: 'Building the next generation of student startups',
        memberCount: 89,
        tags: ['startup', 'networking', 'innovation']
    }
];
// =============================================================================
// INDIVIDUAL STEP COMPONENTS
// =============================================================================
const WelcomeStep = () => {
    const { nextStep } = useOnboarding();
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-8 text-center", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "relative mx-auto mb-6", children: _jsx(HiveLogo, { size: "xl" }) }), _jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Welcome to HIVE" }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto", children: "The social platform where connections form around solving problems together" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700", children: _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: "You're about to join a community of students who build tools, share resources, and collaborate on real solutions to campus problems." }) }), _jsxs(Button, { onClick: nextStep, className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", size: "lg", children: ["Let's Get Started", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const UserTypeStep = () => {
    const { state, updateData, nextStep, prevStep } = useOnboarding();
    const userTypeOptions = [
        {
            value: 'STUDENT',
            icon: GraduationCap,
            title: 'Student',
            description: 'Undergraduate or graduate student'
        },
        {
            value: 'FACULTY',
            icon: BookOpen,
            title: 'Faculty',
            description: 'Professor or instructor'
        },
        {
            value: 'STAFF',
            icon: Building2,
            title: 'Staff',
            description: 'University staff member'
        }
    ];
    const handleSelection = (userType) => {
        updateData({ userType });
        setTimeout(nextStep, 300);
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Confirm Your Role" }), _jsxs("p", { className: "text-slate-600 dark:text-slate-400", children: ["We detected you're a ", state.userType?.toLowerCase(), " from your email"] })] }), _jsx("div", { className: "space-y-4", children: userTypeOptions.map((option, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { className: cn("cursor-pointer transition-all duration-300 border-2", state.userType === option.value
                            ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                            : "border-slate-200 dark:border-slate-700 hover:border-yellow-300"), onClick: () => handleSelection(option.value), children: _jsxs(CardContent, { className: "p-6 flex items-center space-x-4", children: [_jsx("div", { className: cn("p-3 rounded-full", state.userType === option.value ? "bg-yellow-500/20" : "bg-slate-100 dark:bg-slate-800"), children: _jsx(option.icon, { className: cn("h-6 w-6", state.userType === option.value ? "text-yellow-600" : "text-slate-600 dark:text-slate-400") }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: cn("font-semibold", state.userType === option.value ? "text-yellow-600" : "text-slate-900 dark:text-[var(--hive-text-inverse)]"), children: option.title }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: option.description })] }), state.userType === option.value && (_jsx(CheckCircle, { className: "h-5 w-5 text-yellow-500" }))] }) }) }, option.value))) }), _jsxs("div", { className: "flex justify-between", children: [_jsxs(Button, { variant: "secondary", onClick: prevStep, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back"] }), _jsxs(Button, { onClick: nextStep, disabled: !state.userType, className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", children: ["Continue", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const ProfileStep = () => {
    const { state, updateData, nextStep, prevStep, setError, error } = useOnboarding();
    const [isUploading, setIsUploading] = useState(false);
    const handleNameChange = (value) => {
        updateData({ name: value });
        setError(null);
    };
    const handleHandleChange = (value) => {
        const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
        updateData({ handle: sanitized });
        setError(null);
    };
    const canProceed = state.name.length >= 2 && state.handle.length >= 3;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Create Your Profile" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "This is how you'll appear to your campus community" })] }), _jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "relative", children: _jsx("div", { className: cn("w-24 h-24 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600", "flex items-center justify-center bg-slate-50 dark:bg-slate-800 cursor-pointer", "hover:border-yellow-500 transition-colors group"), children: state.photoUrl ? (_jsx("img", { src: state.photoUrl, alt: "Profile", className: "w-full h-full rounded-full object-cover" })) : (_jsxs("div", { className: "text-center", children: [isUploading ? (_jsx(Loader2, { className: "h-6 w-6 text-slate-400 group-hover:text-yellow-500 animate-spin" })) : (_jsx(Camera, { className: "h-6 w-6 text-slate-400 group-hover:text-yellow-500 transition-colors" })), _jsx("p", { className: "text-xs text-slate-400 mt-1", children: isUploading ? 'Uploading...' : 'Add Photo' })] })) }) }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "text-sm font-medium text-slate-900 dark:text-[var(--hive-text-inverse)]", children: ["Full Name ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { type: "text", value: state.name, onChange: (e) => handleNameChange(e.target.value), placeholder: "Enter your full name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "text-sm font-medium text-slate-900 dark:text-[var(--hive-text-inverse)]", children: ["Handle ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400", children: "@" }), _jsx(Input, { type: "text", value: state.handle, onChange: (e) => handleHandleChange(e.target.value), placeholder: "username", className: "pl-7" })] }), _jsx("p", { className: "text-xs text-slate-500", children: "This will be your unique identifier on HIVE" })] })] }), error && (_jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center space-x-2", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-red-600 dark:text-red-400" }), _jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: error })] })), _jsxs("div", { className: "flex justify-between", children: [_jsxs(Button, { variant: "secondary", onClick: prevStep, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back"] }), _jsxs(Button, { onClick: nextStep, disabled: !canProceed, className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", children: ["Continue", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const AcademicsStep = () => {
    const { state, updateData, nextStep, prevStep } = useOnboarding();
    const [selectedMajor, setSelectedMajor] = useState(state.majorId || '');
    const [classYear, setClassYear] = useState(state.classYear || '');
    const handleMajorChange = (value) => {
        setSelectedMajor(value);
        const majorData = UB_MAJORS.find(m => m.id === value);
        updateData({
            majorId: value,
            major: majorData?.name,
            department: majorData?.department
        });
    };
    const canProceed = selectedMajor && classYear;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Academic Information" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Help us connect you with relevant academic communities" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "text-sm font-medium text-slate-900 dark:text-[var(--hive-text-inverse)]", children: ["Major/Program ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: selectedMajor, onChange: (e) => handleMajorChange(e.target.value), className: "w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-yellow-500 text-slate-900 dark:text-[var(--hive-text-inverse)]", children: [_jsx("option", { value: "", children: "Select your major" }), UB_MAJORS.map(major => (_jsx("option", { value: major.id, children: major.name }, major.id)))] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("label", { className: "text-sm font-medium text-slate-900 dark:text-[var(--hive-text-inverse)]", children: ["Class Year ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: classYear, onChange: (e) => {
                                    setClassYear(e.target.value);
                                    updateData({ classYear: e.target.value });
                                }, className: "w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:border-yellow-500 text-slate-900 dark:text-[var(--hive-text-inverse)]", children: [_jsx("option", { value: "", children: "Select your class year" }), _jsx("option", { value: "freshman", children: "Freshman" }), _jsx("option", { value: "sophomore", children: "Sophomore" }), _jsx("option", { value: "junior", children: "Junior" }), _jsx("option", { value: "senior", children: "Senior" }), _jsx("option", { value: "graduate", children: "Graduate Student" }), _jsx("option", { value: "phd", children: "PhD Student" })] })] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsxs(Button, { variant: "secondary", onClick: prevStep, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back"] }), _jsxs(Button, { onClick: nextStep, disabled: !canProceed, className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", children: ["Continue", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const InterestsStep = () => {
    const { state, updateData, nextStep, prevStep } = useOnboarding();
    const [selectedInterests, setSelectedInterests] = useState(state.interests || []);
    const handleInterestToggle = (interestId) => {
        const newInterests = selectedInterests.includes(interestId)
            ? selectedInterests.filter(id => id !== interestId)
            : [...selectedInterests, interestId];
        setSelectedInterests(newInterests);
        updateData({ interests: newInterests });
    };
    const canProceed = selectedInterests.length >= 2;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Your Interests" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Select at least 2 interests to help us recommend relevant spaces" })] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: INTERESTS.map((interest) => (_jsx(Card, { className: cn("cursor-pointer transition-all duration-300 border-2 p-4 text-center", selectedInterests.includes(interest.id)
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-yellow-300"), onClick: () => handleInterestToggle(interest.id), children: _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: cn("font-semibold text-sm", selectedInterests.includes(interest.id) ? "text-yellow-600" : "text-slate-900 dark:text-[var(--hive-text-inverse)]"), children: interest.name }), _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: interest.description }), selectedInterests.includes(interest.id) && (_jsx(CheckCircle, { className: "h-4 w-4 text-yellow-500 mx-auto" }))] }) }, interest.id))) }), _jsx("div", { className: "text-center", children: _jsxs("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: ["Selected: ", selectedInterests.length, " interests"] }) }), _jsxs("div", { className: "flex justify-between", children: [_jsxs(Button, { variant: "secondary", onClick: prevStep, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back"] }), _jsxs(Button, { onClick: nextStep, disabled: !canProceed, className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", children: ["Continue", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const SpacesStep = () => {
    const { state, updateData, nextStep, prevStep } = useOnboarding();
    const [selectedSpaces, setSelectedSpaces] = useState(state.selectedSpaces || []);
    const handleSpaceToggle = (spaceId) => {
        const newSpaces = selectedSpaces.includes(spaceId)
            ? selectedSpaces.filter(id => id !== spaceId)
            : [...selectedSpaces, spaceId];
        setSelectedSpaces(newSpaces);
        updateData({ selectedSpaces: newSpaces });
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Join Your First Spaces" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Choose communities you'd like to be part of (you can join more later)" })] }), _jsx("div", { className: "space-y-4", children: SPACES.map((space) => (_jsx(Card, { className: cn("cursor-pointer transition-all duration-300 border-2", selectedSpaces.includes(space.id)
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-yellow-300"), onClick: () => handleSpaceToggle(space.id), children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-3", children: [_jsx("h3", { className: cn("font-bold text-lg", selectedSpaces.includes(space.id) ? "text-yellow-600" : "text-slate-900 dark:text-[var(--hive-text-inverse)]"), children: space.name }), _jsxs(Badge, { variant: "secondary", className: "text-xs", children: [space.memberCount, " members"] })] }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mb-3", children: space.description }), _jsx("div", { className: "flex flex-wrap gap-2", children: space.tags.map(tag => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, tag))) })] }), selectedSpaces.includes(space.id) && (_jsx(CheckCircle, { className: "h-5 w-5 text-yellow-500 ml-4" }))] }) }) }, space.id))) }), _jsxs("div", { className: "flex justify-between", children: [_jsxs(Button, { variant: "secondary", onClick: prevStep, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back"] }), _jsxs(Button, { onClick: nextStep, className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", children: ["Continue", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const BuilderStep = () => {
    const { state, updateData, nextStep, prevStep } = useOnboarding();
    const [experience, setExperience] = useState(state.builderExperience || 'beginner');
    const experienceOptions = [
        {
            value: 'beginner',
            title: 'New to Building',
            description: "I'm excited to learn how to create tools and solutions",
            icon: Sparkles
        },
        {
            value: 'intermediate',
            title: 'Some Experience',
            description: "I've built a few things and want to do more",
            icon: Code
        },
        {
            value: 'advanced',
            title: 'Experienced Builder',
            description: "I build tools regularly and love helping others",
            icon: Rocket
        }
    ];
    const handleExperienceChange = (value) => {
        setExperience(value);
        updateData({ builderExperience: value });
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Your Building Experience" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "HIVE is about creating tools that solve real problems. What's your experience level?" })] }), _jsx("div", { className: "space-y-4", children: experienceOptions.map((option) => (_jsx(Card, { className: cn("cursor-pointer transition-all duration-300 border-2", experience === option.value
                        ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-yellow-300"), onClick: () => handleExperienceChange(option.value), children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: cn("p-3 rounded-full", experience === option.value ? "bg-yellow-500/20" : "bg-slate-100 dark:bg-slate-800"), children: _jsx(option.icon, { className: cn("h-6 w-6", experience === option.value ? "text-yellow-600" : "text-slate-600 dark:text-slate-400") }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: cn("font-semibold", experience === option.value ? "text-yellow-600" : "text-slate-900 dark:text-[var(--hive-text-inverse)]"), children: option.title }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: option.description })] }), experience === option.value && (_jsx(CheckCircle, { className: "h-5 w-5 text-yellow-500" }))] }) }) }, option.value))) }), _jsxs("div", { className: "flex justify-between", children: [_jsxs(Button, { variant: "secondary", onClick: prevStep, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back"] }), _jsxs(Button, { onClick: nextStep, className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", children: ["Continue", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const LegalStep = () => {
    const { state, updateData, nextStep, prevStep, setError, error } = useOnboarding();
    const [agreements, setAgreements] = useState({
        terms: state.agreedToTerms || false,
        privacy: state.agreedToPrivacy || false,
        community: state.agreedToCommunity || false
    });
    const handleAgreementChange = (type, value) => {
        const newAgreements = { ...agreements, [type]: value };
        setAgreements(newAgreements);
        updateData({
            agreedToTerms: newAgreements.terms,
            agreedToPrivacy: newAgreements.privacy,
            agreedToCommunity: newAgreements.community
        });
        setError(null);
    };
    const canProceed = agreements.terms && agreements.privacy && agreements.community;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Legal Agreements" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: "Please review and accept our terms to complete your registration" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("input", { type: "checkbox", checked: agreements.terms, onChange: (e) => handleAgreementChange('terms', e.target.checked), className: "mt-1 h-4 w-4 text-yellow-500 focus:ring-yellow-500/20 border-slate-300 dark:border-slate-600 rounded" }), _jsx("div", { className: "flex-1", children: _jsxs("p", { className: "text-sm text-slate-900 dark:text-[var(--hive-text-inverse)]", children: ["I agree to the ", _jsx("a", { href: "/legal/terms", className: "text-yellow-600 hover:underline", children: "Terms of Service" })] }) })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("input", { type: "checkbox", checked: agreements.privacy, onChange: (e) => handleAgreementChange('privacy', e.target.checked), className: "mt-1 h-4 w-4 text-yellow-500 focus:ring-yellow-500/20 border-slate-300 dark:border-slate-600 rounded" }), _jsx("div", { className: "flex-1", children: _jsxs("p", { className: "text-sm text-slate-900 dark:text-[var(--hive-text-inverse)]", children: ["I agree to the ", _jsx("a", { href: "/legal/privacy", className: "text-yellow-600 hover:underline", children: "Privacy Policy" })] }) })] }), _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("input", { type: "checkbox", checked: agreements.community, onChange: (e) => handleAgreementChange('community', e.target.checked), className: "mt-1 h-4 w-4 text-yellow-500 focus:ring-yellow-500/20 border-slate-300 dark:border-slate-600 rounded" }), _jsx("div", { className: "flex-1", children: _jsxs("p", { className: "text-sm text-slate-900 dark:text-[var(--hive-text-inverse)]", children: ["I agree to follow the ", _jsx("a", { href: "/legal/community-guidelines", className: "text-yellow-600 hover:underline", children: "Community Guidelines" })] }) })] })] }), _jsx("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700", children: _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: "By creating an account, you're joining a community focused on solving real problems together. We're committed to maintaining a safe, productive environment for all University at Buffalo students." }) })] }), error && (_jsxs("div", { className: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 flex items-center space-x-2", children: [_jsx(AlertCircle, { className: "h-4 w-4 text-red-600 dark:text-red-400" }), _jsx("p", { className: "text-sm text-red-600 dark:text-red-400", children: error })] })), _jsxs("div", { className: "flex justify-between", children: [_jsxs(Button, { variant: "secondary", onClick: prevStep, children: [_jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back"] }), _jsxs(Button, { onClick: nextStep, disabled: !canProceed, className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", children: ["Complete Setup", _jsx(CheckCircle, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const CompleteStep = () => {
    const { state } = useOnboarding();
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "space-y-8 text-center", children: [_jsxs("div", { className: "space-y-6", children: [_jsx(motion.div, { animate: {
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0]
                        }, transition: {
                            duration: 2,
                            ease: "easeInOut"
                        }, children: _jsx(Trophy, { className: "h-16 w-16 text-yellow-500 mx-auto" }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h1", { className: "text-3xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: ["Welcome to HIVE, ", state.name.split(' ')[0], "! \uD83C\uDF89"] }), _jsx("p", { className: "text-lg text-slate-600 dark:text-slate-300 max-w-md mx-auto", children: "Your profile is set up and you're ready to start building connections and solving problems with your campus community." })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-left", children: [_jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700", children: [_jsx(Users, { className: "h-6 w-6 text-yellow-500 mb-2" }), _jsx("h3", { className: "font-semibold text-slate-900 dark:text-[var(--hive-text-inverse)] text-sm", children: "Explore Spaces" }), _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: "Join communities around your interests and major" })] }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700", children: [_jsx(Code, { className: "h-6 w-6 text-yellow-500 mb-2" }), _jsx("h3", { className: "font-semibold text-slate-900 dark:text-[var(--hive-text-inverse)] text-sm", children: "Build Tools" }), _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: "Create solutions that help your campus community" })] }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700", children: [_jsx(Calendar, { className: "h-6 w-6 text-yellow-500 mb-2" }), _jsx("h3", { className: "font-semibold text-slate-900 dark:text-[var(--hive-text-inverse)] text-sm", children: "Coordinate" }), _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: "Organize events and collaborate with others" })] })] }), _jsxs(Button, { size: "lg", className: "bg-yellow-500 hover:bg-yellow-600 text-[var(--hive-text-primary)]", children: ["Enter HIVE", _jsx(Rocket, { className: "ml-2 h-4 w-4" })] })] })] }));
};
const OnboardingProvider = ({ children, initialData = {}, userType = 'STUDENT', email = 'student@buffalo.edu', mockMode = false }) => {
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        currentStep: 'welcome',
        completedSteps: [],
        startedAt: new Date(),
        email,
        userType: userType,
        universityId: 'ub-buffalo',
        campusId: 'north-campus',
        name: '',
        handle: '',
        interests: [],
        selectedSpaces: [],
        builderExperience: 'beginner',
        agreedToTerms: false,
        agreedToPrivacy: false,
        agreedToCommunity: false,
        ...initialData
    });
    const updateData = useCallback((updates) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);
    const nextStep = useCallback(() => {
        const currentIndex = STEPS.indexOf(state.currentStep);
        if (currentIndex < STEPS.length - 1) {
            const newStep = STEPS[currentIndex + 1];
            setState(prev => ({
                ...prev,
                currentStep: newStep,
                completedSteps: [...prev.completedSteps.filter(s => s !== prev.currentStep), prev.currentStep]
            }));
        }
    }, [state.currentStep]);
    const prevStep = useCallback(() => {
        const currentIndex = STEPS.indexOf(state.currentStep);
        if (currentIndex > 0) {
            const newStep = STEPS[currentIndex - 1];
            setState(prev => ({ ...prev, currentStep: newStep }));
        }
    }, [state.currentStep]);
    const goToStep = useCallback((step) => {
        setState(prev => ({ ...prev, currentStep: step }));
    }, []);
    const isStepComplete = useCallback((step) => {
        return state.completedSteps.includes(step);
    }, [state.completedSteps]);
    const canProceed = useCallback(() => {
        return true;
    }, [state]);
    const contextValue = {
        state,
        updateData,
        nextStep,
        prevStep,
        goToStep,
        isStepComplete,
        canProceed,
        setError,
        error
    };
    return (_jsx(OnboardingContext.Provider, { value: contextValue, children: children }));
};
export const ComprehensiveOnboardingWizard = ({ userType = 'STUDENT', email = 'student@buffalo.edu', initialData = {}, mockMode = false, onComplete, onStepChange }) => {
    return (_jsx(OnboardingProvider, { userType: userType, email: email, initialData: initialData, mockMode: mockMode, children: _jsx(OnboardingWizardContent, { onComplete: onComplete, onStepChange: onStepChange }) }));
};
const OnboardingWizardContent = ({ onComplete, onStepChange }) => {
    const { state } = useOnboarding();
    // Notify parent of step changes
    React.useEffect(() => {
        const progress = ((STEPS.indexOf(state.currentStep) + 1) / STEPS.length) * 100;
        onStepChange?.(state.currentStep, progress);
    }, [state.currentStep, onStepChange]);
    const renderStep = () => {
        switch (state.currentStep) {
            case 'welcome':
                return _jsx(WelcomeStep, {});
            case 'user-type':
                return _jsx(UserTypeStep, {});
            case 'profile':
                return _jsx(ProfileStep, {});
            case 'academics':
                return _jsx(AcademicsStep, {});
            case 'interests':
                return _jsx(InterestsStep, {});
            case 'spaces':
                return _jsx(SpacesStep, {});
            case 'builder':
                return _jsx(BuilderStep, {});
            case 'legal':
                return _jsx(LegalStep, {});
            case 'complete':
                return _jsx(CompleteStep, {});
            default:
                return _jsx(WelcomeStep, {});
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden relative flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" }), _jsx("div", { className: "absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-yellow-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse delay-1000" }), _jsx("div", { className: "absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-green-400/10 rounded-full blur-2xl animate-pulse delay-500" })] }), _jsxs(Card, { className: "relative w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-slate-200 dark:border-slate-700 shadow-2xl rounded-3xl overflow-hidden z-10", children: [_jsxs("div", { className: "p-8 pb-6 text-center border-b border-slate-200 dark:border-slate-700", children: [_jsx(motion.div, { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.5, ease: "easeOut" }, className: "mb-6", children: _jsx(HiveLogo, { size: "lg" }) }), _jsxs(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.2, duration: 0.5 }, className: "space-y-2", children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-[var(--hive-text-inverse)]", children: "Welcome to HIVE" }), _jsx("p", { className: "text-slate-600 dark:text-slate-400 text-sm", children: "Set up your profile to connect with your campus community" })] })] }), _jsxs("div", { className: "px-8 pt-6", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsxs("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: ["Step ", STEPS.indexOf(state.currentStep) + 1, " of ", STEPS.length] }), _jsxs("span", { className: "text-sm font-medium text-yellow-600", children: [Math.round(((STEPS.indexOf(state.currentStep) + 1) / STEPS.length) * 100), "%"] })] }), _jsx(Progress, { value: ((STEPS.indexOf(state.currentStep) + 1) / STEPS.length) * 100, className: "h-2" })] }), _jsx("div", { className: "p-8 pt-6", children: _jsx(AnimatePresence, { mode: "wait", children: renderStep() }) })] })] }));
};
export default ComprehensiveOnboardingWizard;
//# sourceMappingURL=comprehensive-onboarding-wizard.js.map