// HIVE Wizard Tool Builder - Atomic Design: Template
// Guided step-by-step tool creation wizard
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Check, Zap, Target, Palette, Settings, Eye, Save, Play, HelpCircle, Users, Lock, Globe, Smartphone, Monitor, Tablet } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveInput } from '../hive-input';
import { HiveTextarea } from '../hive-textarea';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveCard, HiveCardContent, HiveCardHeader, HiveCardTitle } from '../hive-card';
import { HiveSwitch } from '../hive-switch';
import { HiveSelect } from '../hive-select';
import { motion } from '../framer-motion-proxy';
import { ToolPreview } from './tool-preview';
const WIZARD_STEPS = [
    {
        id: 'purpose',
        title: 'Define Purpose',
        description: 'What problem will your tool solve?',
        icon: Target
    },
    {
        id: 'audience',
        title: 'Choose Audience',
        description: 'Who will use this tool?',
        icon: Users
    },
    {
        id: 'category',
        title: 'Select Category',
        description: 'What type of tool are you building?',
        icon: Zap
    },
    {
        id: 'design',
        title: 'Design & Style',
        description: 'Customize the look and feel',
        icon: Palette
    },
    {
        id: 'features',
        title: 'Add Features',
        description: 'Select tool functionality',
        icon: Settings
    },
    {
        id: 'preview',
        title: 'Preview & Test',
        description: 'Review your tool before saving',
        icon: Eye
    }
];
// Campus-specific tool categories with guided options
const TOOL_CATEGORIES = [
    {
        id: 'academic',
        name: 'Academic Tools',
        description: 'Course management, assignments, study aids',
        examples: ['Assignment tracker', 'Study scheduler', 'Grade calculator'],
        color: 'var(--hive-color-blue-500)',
        icon: '📚'
    },
    {
        id: 'social',
        name: 'Social Tools',
        description: 'Community building, events, communication',
        examples: ['Event polls', 'Group chat', 'Social calendar'],
        color: 'var(--hive-color-pink-500)',
        icon: '💬'
    },
    {
        id: 'productivity',
        name: 'Productivity Tools',
        description: 'Organization, planning, task management',
        examples: ['To-do lists', 'Time tracker', 'Goal planner'],
        color: 'var(--hive-color-green-500)',
        icon: '⚡'
    },
    {
        id: 'campus-life',
        name: 'Campus Life',
        description: 'Dining, housing, campus resources',
        examples: ['Dining reviews', 'Room finder', 'Campus map'],
        color: 'var(--hive-color-orange-500)',
        icon: '🏫'
    },
    {
        id: 'greek-life',
        name: 'Greek Life',
        description: 'Fraternity and sorority management',
        examples: ['Rush tracker', 'Event planning', 'Member directory'],
        color: 'var(--hive-color-purple-500)',
        icon: '🏛️'
    },
    {
        id: 'analytics',
        name: 'Analytics & Data',
        description: 'Data collection, reporting, insights',
        examples: ['Survey forms', 'Dashboard', 'Report generator'],
        color: 'var(--hive-color-yellow-500)',
        icon: '📊'
    }
];
// Predefined color themes
const COLOR_THEMES = [
    { name: 'HIVE Gold', primary: '#FFD700', secondary: '#FFF8DC', description: 'Classic HIVE branding' },
    { name: 'Academic Blue', primary: '#3B82F6', secondary: '#EBF4FF', description: 'Professional and trustworthy' },
    { name: 'Nature Green', primary: '#10B981', secondary: '#ECFDF5', description: 'Fresh and energetic' },
    { name: 'Campus Orange', primary: '#F97316', secondary: '#FFF7ED', description: 'Warm and inviting' },
    { name: 'Royal Purple', primary: '#8B5CF6', secondary: '#F3F0FF', description: 'Premium and elegant' },
    { name: 'Social Pink', primary: '#EC4899', secondary: '#FDF2F8', description: 'Friendly and approachable' }
];
// Common tool features
const TOOL_FEATURES = [
    {
        id: 'user-auth',
        name: 'User Authentication',
        description: 'Require users to log in',
        category: 'security',
        recommended: true
    },
    {
        id: 'data-collection',
        name: 'Data Collection',
        description: 'Collect and store user responses',
        category: 'functionality',
        recommended: true
    },
    {
        id: 'notifications',
        name: 'Notifications',
        description: 'Send alerts and updates to users',
        category: 'engagement',
        recommended: false
    },
    {
        id: 'analytics',
        name: 'Usage Analytics',
        description: 'Track how users interact with your tool',
        category: 'insights',
        recommended: false
    },
    {
        id: 'sharing',
        name: 'Social Sharing',
        description: 'Allow users to share content',
        category: 'social',
        recommended: false
    },
    {
        id: 'mobile-responsive',
        name: 'Mobile Responsive',
        description: 'Optimized for mobile devices',
        category: 'accessibility',
        recommended: true
    },
    {
        id: 'offline-mode',
        name: 'Offline Mode',
        description: 'Work without internet connection',
        category: 'accessibility',
        recommended: false
    },
    {
        id: 'real-time',
        name: 'Real-time Updates',
        description: 'Live updates and collaboration',
        category: 'advanced',
        recommended: false
    }
];
const StepWrapper = ({ step, isActive, isCompleted, children }) => {
    const IconComponent = step.icon;
    return (_jsx(motion.div, { animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }, className: "w-full max-w-4xl mx-auto", children: _jsxs(HiveCard, { className: "min-h-[500px]", children: [_jsxs(HiveCardHeader, { className: "text-center pb-6", children: [_jsx("div", { className: "flex items-center justify-center mb-4", children: _jsx("div", { className: cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-colors", isCompleted
                                    ? "bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]"
                                    : "bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]"), children: isCompleted ? (_jsx(Check, { size: 24 })) : (_jsx(IconComponent, { size: 24 })) }) }), _jsx(HiveCardTitle, { className: "text-2xl font-bold", children: step.title }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mt-2", children: step.description })] }), _jsx(HiveCardContent, { className: "pt-0", children: children })] }) }));
};
// Individual step components
const PurposeStep = ({ tool, onChange }) => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Tool Name" }), _jsx(HiveInput, { value: tool.name, onChange: (e) => onChange({ ...tool, name: e.target.value }), placeholder: "Give your tool a descriptive name...", className: "text-lg" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "What problem does this tool solve?" }), _jsx(HiveTextarea, { value: tool.description, onChange: (e) => onChange({ ...tool, description: e.target.value }), placeholder: "Describe the problem your tool addresses and how it helps users...", rows: 4 })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Popular Campus Tool Ideas" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
                            'Track assignment deadlines across all courses',
                            'Coordinate study group meetings and locations',
                            'Rate and review campus dining options',
                            'Find compatible roommates based on preferences',
                            'Organize club events and manage RSVPs',
                            'Create polls for group decision making'
                        ].map((idea, index) => (_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => onChange({
                                ...tool,
                                description: idea + '. This tool will help students by providing an easy-to-use interface for this common campus need.'
                            }), className: "text-left h-auto py-3 justify-start", children: _jsx("span", { className: "text-sm", children: idea }) }, index))) })] })] }));
};
const AudienceStep = ({ tool, onChange }) => {
    const [selectedAudience, setSelectedAudience] = useState([]);
    const audiences = [
        { id: 'students', name: 'Students', description: 'Undergraduate and graduate students', icon: '🎓' },
        { id: 'faculty', name: 'Faculty', description: 'Professors and instructors', icon: '👨‍🏫' },
        { id: 'staff', name: 'Staff', description: 'University administrators and staff', icon: '👔' },
        { id: 'clubs', name: 'Student Organizations', description: 'Clubs, societies, and groups', icon: '🏛️' },
        { id: 'greek', name: 'Greek Life', description: 'Fraternities and sororities', icon: '🏺' },
        { id: 'public', name: 'General Public', description: 'Open to everyone', icon: '🌍' }
    ];
    const toggleAudience = (audienceId) => {
        const newAudience = selectedAudience.includes(audienceId)
            ? selectedAudience.filter(id => id !== audienceId)
            : [...selectedAudience, audienceId];
        setSelectedAudience(newAudience);
        onChange({
            ...tool,
            metadata: {
                ...tool.metadata,
                tags: [...(tool.metadata.tags || []), ...newAudience]
            }
        });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Who is your primary audience?" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-4", children: "Select all groups that will use this tool. This helps with permissions and features." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: audiences.map((audience) => (_jsx(HiveCard, { className: cn("cursor-pointer transition-all duration-200", selectedAudience.includes(audience.id)
                        ? "ring-2 ring-[var(--hive-color-gold-primary)] bg-[var(--hive-color-gold-primary)]/5"
                        : "hover:shadow-md"), onClick: () => toggleAudience(audience.id), children: _jsx(HiveCardContent, { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "text-2xl", children: audience.icon }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: audience.name }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-1", children: audience.description })] }), selectedAudience.includes(audience.id) && (_jsx(Check, { size: 20, className: "text-[var(--hive-color-gold-primary)]" }))] }) }) }, audience.id))) }), _jsxs("div", { className: "mt-8 pt-6 border-t border-[var(--hive-border-default)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Privacy & Access" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Public Tool" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Anyone can discover and use this tool" })] }), _jsx(HiveSwitch, { checked: tool.isPublic, onCheckedChange: (checked) => onChange({ ...tool, isPublic: checked }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Require Authentication" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Users must log in to use this tool" })] }), _jsx(HiveSwitch, { checked: tool.config.requireAuthentication, onCheckedChange: (checked) => onChange({
                                            ...tool,
                                            config: { ...tool.config, requireAuthentication: checked }
                                        }) })] })] })] })] }));
};
const CategoryStep = ({ tool, onChange }) => {
    const [selectedCategory, setSelectedCategory] = useState(tool.metadata.category || '');
    const selectCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        onChange({
            ...tool,
            metadata: {
                ...tool.metadata,
                category: categoryId
            }
        });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "What category best describes your tool?" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-6", children: "This helps users discover your tool and suggests relevant features." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: TOOL_CATEGORIES.map((category) => (_jsx(HiveCard, { className: cn("cursor-pointer transition-all duration-200", selectedCategory === category.id
                        ? "ring-2 ring-[var(--hive-color-gold-primary)] bg-[var(--hive-color-gold-primary)]/5"
                        : "hover:shadow-md"), onClick: () => selectCategory(category.id), children: _jsx(HiveCardContent, { className: "p-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl", style: { backgroundColor: category.color + '20' }, children: category.icon }), _jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: category.name }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-4", children: category.description }), _jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: ["Examples: ", category.examples.join(', ')] }), selectedCategory === category.id && (_jsx("div", { className: "mt-4", children: _jsxs(HiveBadge, { className: "bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]", children: [_jsx(Check, { size: 12 }), "Selected"] }) }))] }) }) }, category.id))) })] }));
};
const DesignStep = ({ tool, onChange }) => {
    const [selectedTheme, setSelectedTheme] = useState(tool.config.primaryColor || COLOR_THEMES[0].primary);
    const selectTheme = (theme) => {
        setSelectedTheme(theme.primary);
        onChange({
            ...tool,
            config: {
                ...tool.config,
                primaryColor: theme.primary,
                backgroundColor: theme.secondary
            }
        });
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Choose a Color Theme" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-6", children: "Select colors that match your tool's purpose and audience." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: COLOR_THEMES.map((theme) => (_jsx(HiveCard, { className: cn("cursor-pointer transition-all duration-200", selectedTheme === theme.primary
                                ? "ring-2 ring-[var(--hive-color-gold-primary)]"
                                : "hover:shadow-md"), onClick: () => selectTheme(theme), children: _jsxs(HiveCardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsxs("div", { className: "flex gap-1", children: [_jsx("div", { className: "w-6 h-6 rounded-full border border-white shadow-sm", style: { backgroundColor: theme.primary } }), _jsx("div", { className: "w-6 h-6 rounded-full border border-white shadow-sm", style: { backgroundColor: theme.secondary } })] }), _jsx("div", { className: "flex-1", children: _jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: theme.name }) }), selectedTheme === theme.primary && (_jsx(Check, { size: 16, className: "text-[var(--hive-color-gold-primary)]" }))] }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: theme.description })] }) }, theme.name))) })] }), _jsxs("div", { className: "pt-6 border-t border-[var(--hive-border-default)]", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-4", children: "Theme Preferences" }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Theme Mode" }), _jsx(HiveSelect, { value: tool.config.theme || 'auto', onValueChange: (value) => onChange({
                                        ...tool,
                                        config: { ...tool.config, theme: value }
                                    }), options: [
                                        { value: 'auto', label: 'Auto (System Preference)' },
                                        { value: 'light', label: 'Light Mode' },
                                        { value: 'dark', label: 'Dark Mode' }
                                    ] })] }) })] })] }));
};
const FeaturesStep = ({ tool, onChange }) => {
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const toggleFeature = (featureId) => {
        const newFeatures = selectedFeatures.includes(featureId)
            ? selectedFeatures.filter(id => id !== featureId)
            : [...selectedFeatures, featureId];
        setSelectedFeatures(newFeatures);
        // Update tool config based on selected features
        const updatedConfig = { ...tool.config };
        if (newFeatures.includes('user-auth')) {
            updatedConfig.requireAuthentication = true;
        }
        if (newFeatures.includes('analytics')) {
            updatedConfig.trackingEnabled = true;
        }
        if (newFeatures.includes('notifications')) {
            updatedConfig.notifyOnSubmission = true;
        }
        onChange({ ...tool, config: updatedConfig });
    };
    const featuresByCategory = TOOL_FEATURES.reduce((acc, feature) => {
        if (!acc[feature.category]) {
            acc[feature.category] = [];
        }
        acc[feature.category].push(feature);
        return acc;
    }, {});
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Add Features to Your Tool" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-6", children: "Select features that enhance your tool's functionality. Recommended features are pre-selected." })] }), Object.entries(featuresByCategory).map(([categoryName, features]) => (_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3 capitalize", children: categoryName }), _jsx("div", { className: "space-y-3", children: features.map((feature) => (_jsx("div", { className: cn("p-4 border rounded-lg cursor-pointer transition-all duration-200", selectedFeatures.includes(feature.id) || feature.recommended
                                ? "border-[var(--hive-color-gold-primary)] bg-[var(--hive-color-gold-primary)]/5"
                                : "border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)]"), onClick: () => toggleFeature(feature.id), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h5", { className: "font-medium text-[var(--hive-text-primary)]", children: feature.name }), feature.recommended && (_jsx(HiveBadge, { variant: "course-tag", className: "text-xs", children: "Recommended" }))] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: feature.description })] }), _jsx("div", { className: "ml-4", children: _jsx(HiveSwitch, { checked: selectedFeatures.includes(feature.id) || feature.recommended, onCheckedChange: () => toggleFeature(feature.id) }) })] }) }, feature.id))) })] }, categoryName)))] }));
};
const PreviewStep = ({ tool }) => {
    const [showPreview, setShowPreview] = useState(false);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-3", children: "Your Tool is Ready!" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-6", children: "Review your tool configuration and test it before saving." })] }), _jsx(HiveCard, { children: _jsx(HiveCardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-2xl flex items-center justify-center text-2xl", style: { backgroundColor: tool.config.primaryColor + '20' }, children: "\uD83D\uDEE0\uFE0F" }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-2", children: tool.name }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-4", children: tool.description }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(HiveBadge, { variant: "course-tag", children: tool.metadata.category }), _jsxs(HiveBadge, { variant: "course-tag", children: [tool.config.theme, " theme"] }), tool.isPublic && (_jsxs(HiveBadge, { variant: "course-tag", children: [_jsx(Globe, { size: 12 }), "Public"] })), tool.config.requireAuthentication && (_jsxs(HiveBadge, { variant: "course-tag", children: [_jsx(Lock, { size: 12 }), "Auth Required"] }))] })] })] }) }) }), _jsx("div", { className: "flex gap-4 justify-center", children: _jsxs(HiveButton, { variant: "outline", onClick: () => setShowPreview(true), className: "flex items-center gap-2", children: [_jsx(Eye, { size: 16 }), "Preview Tool"] }) }), _jsxs("div", { className: "text-center pt-6 border-t border-[var(--hive-border-default)]", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-2", children: "Next Steps" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-4", children: "After saving, you can customize your tool further in the visual builder or deploy it immediately." }), _jsxs("div", { className: "flex gap-2 justify-center text-xs text-[var(--hive-text-tertiary)]", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Monitor, { size: 12 }), "Desktop ready"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Tablet, { size: 12 }), "Tablet optimized"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Smartphone, { size: 12 }), "Mobile responsive"] })] })] }), showPreview && (_jsx(ToolPreview, { tool: tool, onClose: () => setShowPreview(false) }))] }));
};
// Main Wizard Tool Builder component
export const WizardToolBuilder = ({ tool, onChange, onSave, onPreview, isLoading = false }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState(new Set());
    const currentStepData = WIZARD_STEPS[currentStep];
    const isLastStep = currentStep === WIZARD_STEPS.length - 1;
    const isFirstStep = currentStep === 0;
    // Check if current step is completed
    const isCurrentStepCompleted = useCallback(() => {
        switch (currentStepData.id) {
            case 'purpose':
                return tool.name.trim() && tool.description.trim();
            case 'audience':
                return true; // Audience step is always considered complete
            case 'category':
                return tool.metadata.category;
            case 'design':
                return tool.config.primaryColor;
            case 'features':
                return true; // Features step is always considered complete
            case 'preview':
                return true; // Preview step is always considered complete
            default:
                return false;
        }
    }, [tool, currentStepData.id]);
    // Handle next step
    const handleNext = () => {
        if (isCurrentStepCompleted()) {
            setCompletedSteps(prev => new Set([...prev, currentStep]));
            if (!isLastStep) {
                setCurrentStep(currentStep + 1);
            }
        }
    };
    // Handle previous step
    const handlePrevious = () => {
        if (!isFirstStep) {
            setCurrentStep(currentStep - 1);
        }
    };
    // Handle step navigation
    const goToStep = (stepIndex) => {
        if (stepIndex <= currentStep || completedSteps.has(stepIndex - 1)) {
            setCurrentStep(stepIndex);
        }
    };
    // Render step content
    const renderStepContent = () => {
        switch (currentStepData.id) {
            case 'purpose':
                return _jsx(PurposeStep, { tool: tool, onChange: onChange });
            case 'audience':
                return _jsx(AudienceStep, { tool: tool, onChange: onChange });
            case 'category':
                return _jsx(CategoryStep, { tool: tool, onChange: onChange });
            case 'design':
                return _jsx(DesignStep, { tool: tool, onChange: onChange });
            case 'features':
                return _jsx(FeaturesStep, { tool: tool, onChange: onChange });
            case 'preview':
                return _jsx(PreviewStep, { tool: tool });
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-[var(--hive-background-primary)]", children: [_jsx("div", { className: "sticky top-0 z-10 bg-[var(--hive-background-secondary)] border-b border-[var(--hive-border-default)]", children: _jsxs("div", { className: "max-w-4xl mx-auto px-6 py-4", children: [_jsx("div", { className: "flex items-center justify-between mb-4", children: WIZARD_STEPS.map((step, index) => {
                                const IconComponent = step.icon;
                                const isActive = index === currentStep;
                                const isCompleted = completedSteps.has(index);
                                const isAccessible = index <= currentStep || completedSteps.has(index - 1);
                                return (_jsxs("div", { className: "flex items-center", children: [_jsx("button", { className: cn("w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200", isActive
                                                ? "bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]"
                                                : isCompleted
                                                    ? "bg-[var(--hive-color-gold-primary)] text-[var(--hive-background-primary)]"
                                                    : isAccessible
                                                        ? "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] hover:bg-[var(--hive-interactive-hover)]"
                                                        : "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-disabled)] cursor-not-allowed"), onClick: () => isAccessible && goToStep(index), disabled: !isAccessible, children: isCompleted ? (_jsx(Check, { size: 16 })) : (_jsx(IconComponent, { size: 16 })) }), index < WIZARD_STEPS.length - 1 && (_jsx("div", { className: "w-8 h-px bg-[var(--hive-border-default)] mx-2" }))] }, step.id));
                            }) }), _jsx("div", { className: "w-full bg-[var(--hive-background-tertiary)] rounded-full h-2", children: _jsx("div", { className: "bg-[var(--hive-color-gold-primary)] h-2 rounded-full transition-all duration-300", style: { width: `${((currentStep + 1) / WIZARD_STEPS.length) * 100}%` } }) })] }) }), _jsx("div", { className: "max-w-4xl mx-auto px-6 py-8", children: _jsx(StepWrapper, { step: currentStepData, isActive: true, isCompleted: completedSteps.has(currentStep), children: renderStepContent() }) }), _jsx("div", { className: "sticky bottom-0 bg-[var(--hive-background-secondary)] border-t border-[var(--hive-border-default)]", children: _jsx("div", { className: "max-w-4xl mx-auto px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["Step ", currentStep + 1, " of ", WIZARD_STEPS.length] }), !isCurrentStepCompleted() && (_jsxs(HiveBadge, { variant: "course-tag", className: "text-xs", children: [_jsx(HelpCircle, { size: 12 }), "Complete to continue"] }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { variant: "outline", onClick: handlePrevious, disabled: isFirstStep, children: [_jsx(ChevronLeft, { size: 16 }), "Previous"] }), isLastStep ? (_jsxs("div", { className: "flex gap-2", children: [_jsxs(HiveButton, { variant: "outline", onClick: () => onSave(tool), disabled: isLoading, children: [_jsx(Save, { size: 16 }), "Save Draft"] }), _jsxs(HiveButton, { variant: "primary", onClick: () => onPreview(tool), children: [_jsx(Play, { size: 16 }), "Build Tool"] })] })) : (_jsxs(HiveButton, { onClick: handleNext, disabled: !isCurrentStepCompleted(), children: ["Next", _jsx(ChevronRight, { size: 16 })] }))] })] }) }) })] }));
};
export default WizardToolBuilder;
//# sourceMappingURL=wizard-tool-builder.js.map