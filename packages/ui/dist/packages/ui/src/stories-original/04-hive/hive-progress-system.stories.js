import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveProgress } from '../../components/hive-progress';
import { HiveButton } from '../../components/hive-button';
const meta = {
    title: '04-Hive/Progress System',
    component: HiveProgress,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'HIVE Progress System - Comprehensive progress indicators with multiple variants, animations, and states. Perfect for loading states, file uploads, and process tracking.',
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['bar', 'circular', 'step', 'spinner', 'skeleton'],
            description: 'Progress indicator type',
        },
        value: {
            control: { type: 'range', min: 0, max: 100 },
            description: 'Progress value (0-100)',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'Progress indicator size',
        },
        status: {
            control: 'select',
            options: ['default', 'success', 'warning', 'error'],
            description: 'Progress status/color',
        },
        showLabel: {
            control: 'boolean',
            description: 'Show progress label',
        },
        showPercentage: {
            control: 'boolean',
            description: 'Show percentage value',
        },
        animated: {
            control: 'boolean',
            description: 'Enable animations',
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const ProgressBar = {
    args: {
        variant: 'bar',
        value: 65,
        size: 'md',
        status: 'default',
        showLabel: true,
        showPercentage: true,
        animated: true,
    },
};
export const CircularProgress = {
    args: {
        variant: 'circular',
        value: 75,
        size: 'lg',
        status: 'default',
        showPercentage: true,
        animated: true,
    },
};
export const StepProgress = {
    args: {
        variant: 'step',
        value: 60,
        steps: ['Profile', 'Preferences', 'Verification', 'Complete'],
        size: 'md',
        status: 'default',
        showLabel: true,
    },
};
export const LoadingSpinner = {
    args: {
        variant: 'spinner',
        size: 'md',
        status: 'default',
        animated: true,
    },
};
export const SkeletonLoader = {
    args: {
        variant: 'skeleton',
        size: 'md',
        animated: true,
    },
};
// Progress Status Variants
export const SuccessProgress = {
    args: {
        variant: 'bar',
        value: 100,
        size: 'md',
        status: 'success',
        showLabel: true,
        showPercentage: true,
        label: 'Upload Complete',
    },
};
export const WarningProgress = {
    args: {
        variant: 'circular',
        value: 85,
        size: 'lg',
        status: 'warning',
        showPercentage: true,
        label: 'Storage Almost Full',
    },
};
export const ErrorProgress = {
    args: {
        variant: 'bar',
        value: 45,
        size: 'md',
        status: 'error',
        showLabel: true,
        showPercentage: true,
        label: 'Upload Failed',
    },
};
// Size Variants
export const ProgressSizes = {
    render: () => (_jsxs("div", { className: "space-y-6 w-full max-w-md", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm text-gray-400", children: "Small" }), _jsx(HiveProgress, { variant: "bar", value: 40, size: "sm", showPercentage: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm text-gray-400", children: "Medium" }), _jsx(HiveProgress, { variant: "bar", value: 65, size: "md", showPercentage: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm text-gray-400", children: "Large" }), _jsx(HiveProgress, { variant: "bar", value: 80, size: "lg", showPercentage: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-sm text-gray-400", children: "Extra Large" }), _jsx(HiveProgress, { variant: "bar", value: 95, size: "xl", showPercentage: true })] })] })),
};
// Interactive Demo
export const InteractiveDemo = {
    render: () => {
        const [progress, setProgress] = useState(0);
        const [isLoading, setIsLoading] = useState(false);
        const [status, setStatus] = useState('default');
        const startProgress = () => {
            setIsLoading(true);
            setProgress(0);
            setStatus('default');
            const interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsLoading(false);
                        setStatus('success');
                        return 100;
                    }
                    return prev + 2;
                });
            }, 100);
        };
        const simulateError = () => {
            setStatus('error');
            setProgress(45);
            setIsLoading(false);
        };
        const simulateWarning = () => {
            setStatus('warning');
            setProgress(85);
            setIsLoading(false);
        };
        const reset = () => {
            setProgress(0);
            setStatus('default');
            setIsLoading(false);
        };
        return (_jsx("div", { className: "space-y-6 w-full max-w-lg", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "File Upload Progress" }), _jsxs("div", { className: "space-y-4", children: [_jsx(HiveProgress, { variant: "bar", value: progress, size: "lg", status: status, showLabel: true, showPercentage: true, label: status === 'success' ? 'Upload Complete!' :
                                    status === 'error' ? 'Upload Failed' :
                                        status === 'warning' ? 'Storage Warning' :
                                            isLoading ? 'Uploading...' : 'Ready to Upload', animated: true }), _jsx("div", { className: "flex justify-center", children: _jsx(HiveProgress, { variant: "circular", value: progress, size: "lg", status: status, showPercentage: true, animated: true }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(HiveButton, { onClick: startProgress, disabled: isLoading, variant: "primary", children: isLoading ? 'Uploading...' : 'Start Upload' }), _jsx(HiveButton, { onClick: reset, variant: "outline", children: "Reset" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx(HiveButton, { onClick: simulateError, variant: "destructive", size: "sm", children: "Simulate Error" }), _jsx(HiveButton, { onClick: simulateWarning, size: "sm", children: "Simulate Warning" })] })] }) }));
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive progress demo with different states and animations. Test various scenarios including success, error, and warning states.',
            },
        },
    },
};
// Multi-Step Process
export const MultiStepProcess = {
    render: () => {
        const [currentStep, setCurrentStep] = useState(0);
        const steps = ['Account Setup', 'Profile Info', 'Preferences', 'Verification', 'Complete'];
        const nextStep = () => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            }
        };
        const prevStep = () => {
            if (currentStep > 0) {
                setCurrentStep(prev => prev - 1);
            }
        };
        const progress = ((currentStep + 1) / steps.length) * 100;
        return (_jsx("div", { className: "space-y-6 w-full max-w-lg", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Account Setup" }), _jsx(HiveProgress, { variant: "step", value: progress, steps: steps, currentStep: currentStep, size: "md", showLabel: true }), _jsxs("div", { className: "p-6 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10", children: [_jsxs("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-2", children: ["Step ", currentStep + 1, ": ", steps[currentStep]] }), _jsxs("p", { className: "text-gray-400 text-sm", children: [currentStep === 0 && "Let's start by setting up your account credentials.", currentStep === 1 && "Tell us a bit about yourself and your interests.", currentStep === 2 && "Configure your notification and privacy preferences.", currentStep === 3 && "Verify your email address and phone number.", currentStep === 4 && "All done! Welcome to HIVE community."] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx(HiveButton, { onClick: prevStep, disabled: currentStep === 0, variant: "outline", children: "Previous" }), _jsx(HiveButton, { onClick: nextStep, disabled: currentStep === steps.length - 1, variant: "primary", children: currentStep === steps.length - 1 ? 'Finish' : 'Next' })] })] }) }));
    },
};
// Loading States Showcase
export const LoadingStates = {
    render: () => {
        const [loadingStates, setLoadingStates] = useState({
            page: false,
            content: false,
            action: false,
        });
        const toggleLoading = (key) => {
            setLoadingStates(prev => ({ ...prev, [key]: !prev[key] }));
        };
        return (_jsxs("div", { className: "space-y-8 w-full max-w-2xl", children: [_jsxs("div", { className: "text-center space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Loading State Examples" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsx(HiveButton, { onClick: () => toggleLoading('page'), variant: loadingStates.page ? 'primary' : 'outline', children: "Page Loading" }), _jsx(HiveButton, { onClick: () => toggleLoading('content'), variant: loadingStates.content ? 'primary' : 'outline', children: "Content Loading" }), _jsx(HiveButton, { onClick: () => toggleLoading('action'), variant: loadingStates.action ? 'primary' : 'outline', children: "Action Loading" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-4 p-4 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Page Loading" }), loadingStates.page ? (_jsxs("div", { className: "space-y-3", children: [_jsx(HiveProgress, { variant: "skeleton", size: "lg" }), _jsx(HiveProgress, { variant: "skeleton", size: "md" }), _jsx(HiveProgress, { variant: "skeleton", size: "sm" })] })) : (_jsxs("div", { className: "space-y-2 text-sm text-gray-400", children: [_jsx("div", { children: "\u2713 Header loaded" }), _jsx("div", { children: "\u2713 Navigation ready" }), _jsx("div", { children: "\u2713 Content available" })] }))] }), _jsxs("div", { className: "space-y-4 p-4 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Content Loading" }), loadingStates.content ? (_jsx("div", { className: "flex justify-center", children: _jsx(HiveProgress, { variant: "spinner", size: "lg" }) })) : (_jsxs("div", { className: "text-sm text-gray-400", children: [_jsx("div", { children: "\uD83D\uDCDD Article content" }), _jsx("div", { children: "\uD83D\uDDBC\uFE0F Images loaded" }), _jsx("div", { children: "\uD83D\uDCAC Comments ready" })] }))] }), _jsxs("div", { className: "space-y-4 p-4 bg-[var(--hive-text-primary)]/5 rounded-lg border border-white/10", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Action Progress" }), loadingStates.action ? (_jsx(HiveProgress, { variant: "circular", value: 65, size: "md", showPercentage: true, label: "Processing..." })) : (_jsxs("div", { className: "text-sm text-gray-400", children: [_jsx("div", { children: "\u26A1 Action completed" }), _jsx("div", { children: "\uD83D\uDCCA Results ready" })] }))] })] })] }));
    },
};
//# sourceMappingURL=hive-progress-system.stories.js.map