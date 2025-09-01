"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Progress, Input, Textarea } from '../atoms/index.js';
import { Card } from '../molecules/index.js';
import { Target, User, Heart, CheckCircle, ChevronRight, ChevronLeft, Sparkles, Users, Clock, Badge } from 'lucide-react';
// Step Components
const ProfileBasicsStep = ({ onComplete, initialData }) => {
    const [formData, setFormData] = useState({
        displayName: initialData?.displayName || '',
        bio: initialData?.bio || '',
        major: initialData?.major || '',
        graduationYear: initialData?.graduationYear || '',
        ...initialData
    });
    const majors = [
        'Computer Science', 'Biology', 'Psychology', 'Business', 'Engineering',
        'Mathematics', 'English', 'History', 'Chemistry', 'Physics', 'Art', 'Music'
    ];
    const years = ['2025', '2026', '2027', '2028'];
    const isValid = formData.displayName.trim() && formData.major && formData.graduationYear;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-full flex items-center justify-center", children: _jsx(User, { className: "h-10 w-10 text-hive-obsidian" }) }), _jsx("h3", { className: "text-2xl font-bold text-hive-text-primary mb-2", children: "Tell Us About Yourself" }), _jsx("p", { className: "text-hive-text-secondary", children: "This information helps us personalize your HIVE experience" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-hive-text-primary mb-2", children: "Display Name *" }), _jsx(Input, { value: formData.displayName, onChange: (e) => setFormData((prev) => ({ ...prev, displayName: e.target.value })), placeholder: "How should others see your name?", className: "w-full" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-hive-text-primary mb-2", children: "Bio" }), _jsx(Textarea, { value: formData.bio, onChange: (e) => setFormData((prev) => ({ ...prev, bio: e.target.value })), placeholder: "Tell us a bit about yourself...", className: "w-full h-24" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-hive-text-primary mb-2", children: "Major *" }), _jsxs("select", { value: formData.major, onChange: (e) => setFormData((prev) => ({ ...prev, major: e.target.value })), className: "w-full p-3 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary", children: [_jsx("option", { value: "", children: "Select your major" }), majors.map(major => (_jsx("option", { value: major, children: major }, major)))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-hive-text-primary mb-2", children: "Graduation Year *" }), _jsxs("select", { value: formData.graduationYear, onChange: (e) => setFormData((prev) => ({ ...prev, graduationYear: e.target.value })), className: "w-full p-3 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary", children: [_jsx("option", { value: "", children: "Select year" }), years.map(year => (_jsx("option", { value: year, children: year }, year)))] })] })] })] }), _jsxs(Button, { onClick: () => onComplete(formData), disabled: !isValid, className: "w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90", children: ["Continue to Interests", _jsx(ChevronRight, { className: "h-4 w-4 ml-2" })] })] }));
};
const InterestsStep = ({ onComplete, initialData }) => {
    const [selectedInterests, setSelectedInterests] = useState(initialData?.interests || []);
    const interestCategories = {
        'Academic': ['Study Groups', 'Research', 'Tutoring', 'Academic Clubs'],
        'Technology': ['Coding', 'AI/ML', 'Cybersecurity', 'Web Development', 'Mobile Apps'],
        'Creative': ['Art', 'Music', 'Writing', 'Photography', 'Design'],
        'Sports & Fitness': ['Intramural Sports', 'Gym', 'Running', 'Yoga', 'Outdoor Activities'],
        'Social': ['Parties', 'Networking', 'Community Service', 'Cultural Events'],
        'Professional': ['Internships', 'Career Development', 'Entrepreneurship', 'Finance']
    };
    const toggleInterest = (interest) => {
        setSelectedInterests(prev => prev.includes(interest)
            ? prev.filter(i => i !== interest)
            : [...prev, interest]);
    };
    const isValid = selectedInterests.length >= 3;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-hive-brand-secondary to-purple-500 rounded-full flex items-center justify-center", children: _jsx(Heart, { className: "h-10 w-10 text-[var(--hive-text-inverse)]" }) }), _jsx("h3", { className: "text-2xl font-bold text-hive-text-primary mb-2", children: "What Interests You?" }), _jsx("p", { className: "text-hive-text-secondary", children: "Select at least 3 interests to help us find your communities" })] }), _jsx("div", { className: "space-y-6", children: Object.entries(interestCategories).map(([category, interests]) => (_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-3", children: category }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-3", children: interests.map(interest => (_jsx("button", { onClick: () => toggleInterest(interest), className: `p-3 rounded-lg border transition-all text-sm ${selectedInterests.includes(interest)
                                    ? 'bg-hive-gold/20 border-hive-gold text-hive-gold'
                                    : 'bg-hive-surface-elevated border-hive-border-subtle text-hive-text-secondary hover:border-hive-gold/50'}`, children: interest }, interest))) })] }, category))) }), _jsxs("div", { className: "bg-hive-surface-elevated p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Selected interests:" }), _jsxs("span", { className: `font-semibold ${isValid ? 'text-hive-gold' : 'text-hive-text-secondary'}`, children: [selectedInterests.length, "/3+ required"] })] }), selectedInterests.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2 mt-3", children: selectedInterests.map(interest => (_jsx("span", { className: "px-2 py-1 bg-hive-gold/20 text-hive-gold text-xs rounded-full", children: interest }, interest))) }))] }), _jsxs(Button, { onClick: () => onComplete({ interests: selectedInterests }), disabled: !isValid, className: "w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90", children: ["Continue to Goals", _jsx(ChevronRight, { className: "h-4 w-4 ml-2" })] })] }));
};
const GoalsStep = ({ onComplete, initialData }) => {
    const [selectedGoals, setSelectedGoals] = useState(initialData?.goals || []);
    const campusGoals = [
        { id: 'academic_excellence', label: 'Academic Excellence', description: 'Maintain high GPA and excel in coursework' },
        { id: 'research', label: 'Research Opportunities', description: 'Get involved in faculty research projects' },
        { id: 'internships', label: 'Internships', description: 'Secure valuable work experience' },
        { id: 'leadership', label: 'Leadership Roles', description: 'Take on leadership positions in organizations' },
        { id: 'networking', label: 'Professional Networking', description: 'Build connections for career opportunities' },
        { id: 'social_life', label: 'Active Social Life', description: 'Make lasting friendships and memories' },
        { id: 'clubs', label: 'Club Involvement', description: 'Join and contribute to student organizations' },
        { id: 'fitness', label: 'Health & Fitness', description: 'Maintain physical and mental wellbeing' },
        { id: 'creativity', label: 'Creative Expression', description: 'Explore artistic and creative pursuits' },
        { id: 'entrepreneurship', label: 'Entrepreneurship', description: 'Start projects or business ventures' }
    ];
    const toggleGoal = (goalId) => {
        setSelectedGoals(prev => prev.includes(goalId)
            ? prev.filter(id => id !== goalId)
            : [...prev, goalId]);
    };
    const isValid = selectedGoals.length >= 2;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center", children: _jsx(Target, { className: "h-10 w-10 text-[var(--hive-text-inverse)]" }) }), _jsx("h3", { className: "text-2xl font-bold text-hive-text-primary mb-2", children: "What Are Your Campus Goals?" }), _jsx("p", { className: "text-hive-text-secondary", children: "Select your top priorities to help us recommend relevant spaces and tools" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: campusGoals.map(goal => (_jsx("button", { onClick: () => toggleGoal(goal.id), className: `p-4 rounded-lg border text-left transition-all ${selectedGoals.includes(goal.id)
                        ? 'bg-hive-gold/20 border-hive-gold'
                        : 'bg-hive-surface-elevated border-hive-border-subtle hover:border-hive-gold/50'}`, children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: `w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${selectedGoals.includes(goal.id)
                                    ? 'border-hive-gold bg-hive-gold'
                                    : 'border-hive-border-subtle'}`, children: selectedGoals.includes(goal.id) && (_jsx(CheckCircle, { className: "h-3 w-3 text-hive-obsidian" })) }), _jsxs("div", { children: [_jsx("h4", { className: `font-semibold mb-1 ${selectedGoals.includes(goal.id) ? 'text-hive-gold' : 'text-hive-text-primary'}`, children: goal.label }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: goal.description })] })] }) }, goal.id))) }), _jsx("div", { className: "bg-hive-surface-elevated p-4 rounded-lg", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Selected goals:" }), _jsxs("span", { className: `font-semibold ${isValid ? 'text-hive-gold' : 'text-hive-text-secondary'}`, children: [selectedGoals.length, "/2+ required"] })] }) }), _jsxs(Button, { onClick: () => onComplete({ goals: selectedGoals }), disabled: !isValid, className: "w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90", children: ["Complete Initialize Ritual", _jsx(Sparkles, { className: "h-4 w-4 ml-2" })] })] }));
};
export function RitualInitializeWorkflow({ currentStep = 0, onStepComplete, onRitualComplete, userProgress, className = '' }) {
    const [activeStep, setActiveStep] = useState(currentStep);
    const [stepData, setStepData] = useState({});
    const [isComplete, setIsComplete] = useState(false);
    const steps = [
        {
            id: 'profile_basics',
            title: 'Profile Basics',
            description: 'Set up your basic profile information',
            icon: User,
            estimatedTime: 3,
            isRequired: true,
            component: ProfileBasicsStep
        },
        {
            id: 'interests',
            title: 'Select Interests',
            description: 'Choose your academic and social interests',
            icon: Heart,
            estimatedTime: 5,
            isRequired: true,
            component: InterestsStep
        },
        {
            id: 'campus_goals',
            title: 'Campus Goals',
            description: 'Define your objectives for campus life',
            icon: Target,
            estimatedTime: 4,
            isRequired: true,
            component: GoalsStep
        }
    ];
    const handleStepComplete = (data) => {
        const step = steps[activeStep];
        const newStepData = { ...stepData, [step.id]: data };
        setStepData(newStepData);
        onStepComplete?.(step.id, data);
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
        else {
            setIsComplete(true);
            onRitualComplete?.();
        }
    };
    const handlePreviousStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };
    const totalEstimatedTime = steps.reduce((total, step) => total + step.estimatedTime, 0);
    const progressPercentage = ((activeStep + 1) / steps.length) * 100;
    if (isComplete) {
        return (_jsx("div", { className: `space-y-8 ${className}`, children: _jsxs(Card, { className: "p-8 text-center bg-gradient-to-br from-hive-gold/10 to-green-500/10 border-hive-gold/30", children: [_jsx("div", { className: "w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-hive-gold to-green-500 rounded-full flex items-center justify-center", children: _jsx(CheckCircle, { className: "h-12 w-12 text-[var(--hive-text-inverse)]" }) }), _jsx("h2", { className: "text-3xl font-bold text-hive-text-primary mb-4", children: "Initialize Ritual Complete!" }), _jsx("p", { className: "text-hive-text-secondary text-lg mb-6", children: "Your HIVE profile is now set up and ready. Your interests and goals will help us personalize your experience and connect you with relevant communities." }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(Badge, { className: "h-8 w-8 mx-auto mb-2 text-hive-gold" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Profile Complete" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Avatar Widget populated" })] }), _jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(Heart, { className: "h-8 w-8 mx-auto mb-2 text-hive-brand-secondary" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Interests Saved" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Personalization active" })] }), _jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(Target, { className: "h-8 w-8 mx-auto mb-2 text-green-400" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Goals Set" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Recommendations ready" })] })] }), _jsxs("div", { className: "flex items-center justify-center space-x-2 text-hive-gold", children: [_jsx(Users, { className: "h-5 w-5" }), _jsx("span", { className: "font-medium", children: "Ready for Week 2: Discover Communities" })] })] }) }));
    }
    const CurrentStepComponent = steps[activeStep].component;
    return (_jsxs("div", { className: `space-y-8 ${className}`, children: [_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-hive-text-primary", children: "Initialize Ritual" }), _jsx("p", { className: "text-hive-text-secondary", children: "Week 1 \u2022 Build your foundation" })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary text-sm", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsxs("span", { children: ["~", totalEstimatedTime, " minutes total"] })] }) })] }), _jsxs("div", { className: "mb-8", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("span", { className: "text-sm font-medium text-hive-text-primary", children: ["Step ", activeStep + 1, " of ", steps.length] }), _jsxs("span", { className: "text-sm text-hive-text-secondary", children: [Math.round(progressPercentage), "% complete"] })] }), _jsx(Progress, { value: progressPercentage, className: "h-2" })] }), _jsx("div", { className: "flex items-center justify-between mb-8", children: steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = index === activeStep;
                            const isCompleted = index < activeStep;
                            return (_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center ${isCompleted
                                            ? 'bg-green-500'
                                            : isActive
                                                ? 'bg-hive-gold'
                                                : 'bg-hive-surface-elevated border border-hive-border-subtle'}`, children: isCompleted ? (_jsx(CheckCircle, { className: "h-5 w-5 text-[var(--hive-text-inverse)]" })) : (_jsx(Icon, { className: `h-5 w-5 ${isActive ? 'text-hive-obsidian' : 'text-hive-text-secondary'}` })) }), index < steps.length - 1 && (_jsx("div", { className: `w-16 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-hive-border-subtle'}` }))] }, step.id));
                        }) })] }), _jsxs(Card, { className: "p-8", children: [_jsx(CurrentStepComponent, { onComplete: handleStepComplete, initialData: stepData[steps[activeStep].id] }), activeStep > 0 && (_jsx("div", { className: "mt-6", children: _jsxs(Button, { variant: "secondary", onClick: handlePreviousStep, className: "flex items-center", children: [_jsx(ChevronLeft, { className: "h-4 w-4 mr-2" }), "Previous Step"] }) }))] })] }));
}
//# sourceMappingURL=ritual-initialize-workflow.js.map