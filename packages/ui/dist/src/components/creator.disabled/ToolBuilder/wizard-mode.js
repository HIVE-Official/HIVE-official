"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils.js';
import { Card } from '../../ui/card.js';
import { Button } from '../../../index.js';
import { Input } from '../../../index.js';
import { Label } from '../../ui/label.js';
import { Textarea } from '../../../index.js';
import { Badge } from '../../ui/badge.js';
import { ArrowRight, ArrowLeft, Check, Zap, Calculator, FileText, Hash, Users, Calendar, BarChart3, } from 'lucide-react';
// Step 1: Tool Type Selection
function ToolTypeStep({ value, onChange }) {
    const toolTypes = [
        {
            id: 'calculator',
            title: 'Calculator',
            description: 'Math-based tools like GPA calculators, tip calculators, grade calculators',
            icon: Calculator,
            popular: true,
        },
        {
            id: 'organizer',
            title: 'Organizer',
            description: 'Tools to organize information like study planners, task lists, schedules',
            icon: FileText,
            popular: true,
        },
        {
            id: 'generator',
            title: 'Generator',
            description: 'Generate content like passwords, team assignments, quiz questions',
            icon: Hash,
            popular: false,
        },
        {
            id: 'tracker',
            title: 'Tracker',
            description: 'Track progress, habits, assignments, or goals over time',
            icon: BarChart3,
            popular: true,
        },
        {
            id: 'social',
            title: 'Social Tool',
            description: 'Tools for group work, polls, team formation, or collaboration',
            icon: Users,
            popular: false,
        },
        {
            id: 'planner',
            title: 'Planner',
            description: 'Schedule makers, calendar tools, timeline planners',
            icon: Calendar,
            popular: true,
        },
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "What type of tool do you want to create?" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Choose the category that best fits your tool's purpose" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: toolTypes.map((type) => (_jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Card, { className: cn("p-4 cursor-pointer transition-all duration-200 relative", "bg-[var(--hive-background-secondary)]/30 border-[var(--hive-border-primary)]", "hover:bg-[var(--hive-background-secondary)]/60", value === type.id && "ring-2 ring-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"), onClick: () => onChange(type.id), children: [type.popular && (_jsx(Badge, { className: "absolute -top-2 -right-2 bg-[var(--hive-brand-primary)] text-[var(--hive-text-primary)]", children: "Popular" })), _jsxs("div", { className: "flex flex-col items-center text-center space-y-3", children: [_jsx("div", { className: cn("w-12 h-12 rounded-lg flex items-center justify-center", "bg-[var(--hive-brand-primary)]/20"), children: _jsx(type.icon, { className: "h-6 w-6 text-[var(--hive-brand-primary)]" }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] mb-1", children: type.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed", children: type.description })] }), value === type.id && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "w-6 h-6 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center", children: _jsx(Check, { className: "h-4 w-4 text-[var(--hive-text-primary)]" }) }))] })] }) }, type.id))) })] }));
}
// Step 2: Basic Information
function BasicInfoStep({ data, onChange }) {
    return (_jsxs("div", { className: "space-y-6 max-w-2xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Tell us about your tool" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Give your tool a name and description so students know what it does" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[var(--hive-text-primary)] font-medium", children: "Tool Name" }), _jsx(Input, { value: data.name, onChange: (e) => onChange({ ...data, name: e.target.value }), placeholder: "e.g., GPA Calculator, Study Planner, Assignment Tracker", className: cn("bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-secondary)]", "focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30") }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Keep it clear and descriptive - this is what students will see first" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-[var(--hive-text-primary)] font-medium", children: "Description" }), _jsx(Textarea, { value: data.description, onChange: (e) => onChange({ ...data, description: e.target.value }), placeholder: "Describe what your tool does and how it helps students...", rows: 4, className: cn("bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]", "text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-secondary)]", "focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30 resize-none") }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: "A good description helps students understand the value of your tool" })] })] })] }));
}
// Step 3: Features Selection
function FeaturesStep({ value, onChange }) {
    const features = [
        { id: 'calculations', label: 'Calculations', description: 'Mathematical operations and formulas' },
        { id: 'data-storage', label: 'Data Storage', description: 'Save and retrieve user data' },
        { id: 'export', label: 'Export Results', description: 'Export data to PDF, CSV, or images' },
        { id: 'sharing', label: 'Sharing', description: 'Share results with classmates or professors' },
        { id: 'charts', label: 'Charts & Graphs', description: 'Visualize data with charts' },
        { id: 'reminders', label: 'Reminders', description: 'Set up notifications and alerts' },
        { id: 'collaboration', label: 'Collaboration', description: 'Multi-user functionality' },
        { id: 'templates', label: 'Templates', description: 'Pre-built layouts and configurations' },
    ];
    const toggleFeature = (featureId) => {
        if (value.includes(featureId)) {
            onChange(value.filter(id => id !== featureId));
        }
        else {
            onChange([...value, featureId]);
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "What features do you need?" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Select the features that your tool will use (you can change these later)" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: features.map((feature) => (_jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsx(Card, { className: cn("p-4 cursor-pointer transition-all duration-200", "bg-[var(--hive-background-secondary)]/30 border-[var(--hive-border-primary)]", "hover:bg-[var(--hive-background-secondary)]/60", value.includes(feature.id) && "ring-2 ring-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"), onClick: () => toggleFeature(feature.id), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)] mb-1", children: feature.label }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: feature.description })] }), value.includes(feature.id) && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "w-5 h-5 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center ml-3", children: _jsx(Check, { className: "h-3 w-3 text-[var(--hive-text-primary)]" }) }))] }) }) }, feature.id))) })] }));
}
// Step 4: Styling
function StylingStep({ data, onChange }) {
    const colorOptions = [
        { name: 'Blue', value: 'var(--hive-status-info)' },
        { name: 'Green', value: 'var(--hive-status-success)' },
        { name: 'Purple', value: 'var(--hive-status-info)' },
        { name: 'Orange', value: 'var(--hive-status-warning)' },
        { name: 'Red', value: 'var(--hive-status-error)' },
        { name: 'Teal', value: 'var(--hive-status-success)' },
    ];
    return (_jsxs("div", { className: "space-y-6 max-w-2xl mx-auto", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Customize the look" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Choose colors and sizing that match your style" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-[var(--hive-text-primary)] font-medium", children: "Primary Color" }), _jsx("div", { className: "grid grid-cols-3 gap-3", children: colorOptions.map((color) => (_jsxs("button", { onClick: () => onChange({ ...data, primaryColor: color.value }), className: cn("p-3 rounded-lg border-2 transition-all", "flex items-center gap-3", data.primaryColor === color.value
                                        ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                                        : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"), children: [_jsx("div", { className: "w-4 h-4 rounded-full", style: { backgroundColor: color.value } }), _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: color.name }), data.primaryColor === color.value && (_jsx(Check, { className: "h-4 w-4 text-[var(--hive-brand-primary)] ml-auto" }))] }, color.value))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-[var(--hive-text-primary)] font-medium", children: "Text Size" }), _jsx("div", { className: "grid grid-cols-3 gap-3", children: ['Small', 'Medium', 'Large'].map((size) => (_jsx("button", { onClick: () => onChange({ ...data, fontSize: size.toLowerCase() }), className: cn("p-3 rounded-lg border-2 transition-all text-center", data.fontSize === size.toLowerCase()
                                        ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                                        : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"), children: _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: size }) }, size))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-[var(--hive-text-primary)] font-medium", children: "Spacing" }), _jsx("div", { className: "grid grid-cols-3 gap-3", children: ['Compact', 'Comfortable', 'Spacious'].map((spacing) => (_jsx("button", { onClick: () => onChange({ ...data, spacing: spacing.toLowerCase() }), className: cn("p-3 rounded-lg border-2 transition-all text-center", data.spacing === spacing.toLowerCase()
                                        ? "border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/10"
                                        : "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)]"), children: _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: spacing }) }, spacing))) })] })] })] }));
}
export const WizardMode = ({ onComplete, className }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [wizardData, setWizardData] = useState({
        toolType: '',
        name: '',
        description: '',
        features: [],
        styling: {
            primaryColor: 'var(--hive-status-info)',
            fontSize: 'medium',
            spacing: 'comfortable'
        }
    });
    const steps = [
        {
            id: 'type',
            title: 'Tool Type',
            description: 'Choose your tool category',
            component: ToolTypeStep,
        },
        {
            id: 'info',
            title: 'Basic Info',
            description: 'Name and description',
            component: BasicInfoStep,
        },
        {
            id: 'features',
            title: 'Features',
            description: 'Select capabilities',
            component: FeaturesStep,
        },
        {
            id: 'styling',
            title: 'Styling',
            description: 'Customize appearance',
            component: StylingStep,
        },
    ];
    const canProceed = () => {
        switch (currentStep) {
            case 0: return !!wizardData.toolType;
            case 1: return !!wizardData.name && !!wizardData.description;
            case 2: return wizardData.features.length > 0;
            case 3: return true;
            default: return false;
        }
    };
    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
        else {
            // Complete wizard
            const toolConfig = {
                name: wizardData.name,
                description: wizardData.description,
                category: wizardData.toolType,
                elements: [], // Will be populated based on selections
                config: {
                    ...wizardData.styling,
                },
                metadata: {
                    features: wizardData.features,
                },
            };
            onComplete(toolConfig);
        }
    };
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    const CurrentStepComponent = steps[currentStep].component;
    return (_jsxs("div", { className: cn("flex flex-col h-full", className), children: [_jsxs("div", { className: "p-6 border-b border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h1", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "Tool Creation Wizard" }), _jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["Step ", currentStep + 1, " of ", steps.length] })] }), _jsx("div", { className: "flex items-center gap-2", children: steps.map((step, index) => (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center flex-1", children: [_jsx("div", { className: cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all", index < currentStep
                                                ? "bg-[var(--hive-brand-primary)] text-[var(--hive-text-primary)]"
                                                : index === currentStep
                                                    ? "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] ring-2 ring-[var(--hive-brand-primary)]"
                                                    : "bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]"), children: index < currentStep ? (_jsx(Check, { className: "h-4 w-4" })) : (index + 1) }), _jsxs("div", { className: "text-center mt-2", children: [_jsx("p", { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: step.title }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: step.description })] })] }), index < steps.length - 1 && (_jsx("div", { className: cn("flex-1 h-0.5 mx-2 transition-all", index < currentStep
                                        ? "bg-[var(--hive-brand-primary)]"
                                        : "bg-[var(--hive-background-secondary)]") }))] }, step.id))) })] }), _jsx("div", { className: "flex-1 overflow-auto", children: _jsx("div", { className: "p-6", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 }, children: _jsx(CurrentStepComponent, { value: currentStep === 0 ? wizardData.toolType :
                                    currentStep === 1 ? { name: wizardData.name, description: wizardData.description } :
                                        currentStep === 2 ? wizardData.features :
                                            wizardData.styling, onChange: (value) => {
                                    if (currentStep === 0) {
                                        setWizardData({ ...wizardData, toolType: value });
                                    }
                                    else if (currentStep === 1) {
                                        setWizardData({ ...wizardData, ...value });
                                    }
                                    else if (currentStep === 2) {
                                        setWizardData({ ...wizardData, features: value });
                                    }
                                    else if (currentStep === 3) {
                                        setWizardData({ ...wizardData, styling: value });
                                    }
                                }, data: currentStep === 1 ? { name: wizardData.name, description: wizardData.description } :
                                    currentStep === 3 ? wizardData.styling : undefined }) }, currentStep) }) }) }), _jsx("div", { className: "p-6 border-t border-[var(--hive-border-primary)]", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Button, { variant: "outline", onClick: handleBack, disabled: currentStep === 0, children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] }), _jsxs(Button, { onClick: handleNext, disabled: !canProceed(), className: "bg-[var(--hive-brand-primary)] hover:bg-[var(--hive-brand-primary)]/90", children: [currentStep === steps.length - 1 ? 'Create Tool' : 'Next', currentStep === steps.length - 1 ? (_jsx(Zap, { className: "h-4 w-4 ml-2" })) : (_jsx(ArrowRight, { className: "h-4 w-4 ml-2" }))] })] }) })] }));
};
export default WizardMode;
//# sourceMappingURL=wizard-mode.js.map