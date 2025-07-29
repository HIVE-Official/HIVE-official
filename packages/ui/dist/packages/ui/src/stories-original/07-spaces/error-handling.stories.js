import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState } from 'react';
const meta = {
    title: 'Spaces/Error Handling',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Comprehensive error handling patterns for HIVE spaces including network errors, permissions, validation, and recovery strategies.',
            },
        },
    },
};
export default meta;
// Error types and mock data
const errorTypes = {
    network: {
        title: 'Network Error',
        description: 'Unable to connect to HIVE servers',
        icon: '🌐',
        color: 'red',
        recoverable: true
    },
    permission: {
        title: 'Permission Denied',
        description: 'You don\'t have permission to perform this action',
        icon: '🔒',
        color: 'orange',
        recoverable: false
    },
    validation: {
        title: 'Invalid Input',
        description: 'Please check your input and try again',
        icon: '⚠️',
        color: 'yellow',
        recoverable: true
    },
    notFound: {
        title: 'Space Not Found',
        description: 'The space you\'re looking for doesn\'t exist',
        icon: '🔍',
        color: 'gray',
        recoverable: false
    },
    server: {
        title: 'Server Error',
        description: 'Something went wrong on our end',
        icon: '🔥',
        color: 'red',
        recoverable: true
    },
    quota: {
        title: 'Quota Exceeded',
        description: 'You\'ve reached your space limit',
        icon: '📊',
        color: 'purple',
        recoverable: false
    }
};
export const ErrorStatesOverview = {
    render: () => {
        const [selectedError, setSelectedError] = useState(null);
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Error Handling States" }), _jsx("p", { className: "text-gray-600", children: "Comprehensive error handling patterns for HIVE spaces" })] }), _jsx(HiveButton, { variant: "outline", children: "Error Documentation" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: Object.entries(errorTypes).map(([key, error]) => (_jsx(motion.div, { whileHover: { y: -4 }, transition: { duration: 0.2 }, children: _jsx(HiveCard, { className: "h-full cursor-pointer", onClick: () => setSelectedError(key), children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "text-2xl", children: error.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: error.title }), _jsx("p", { className: "text-sm text-gray-600", children: error.description })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(HiveBadge, { variant: error.recoverable ? 'success' : 'destructive', children: error.recoverable ? 'Recoverable' : 'Non-recoverable' }), _jsx("div", { className: `w-3 h-3 rounded-full bg-${error.color}-500` })] })] }) }) }, key))) }), selectedError && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-6", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsxs("h3", { className: "text-lg font-semibold mb-4", children: [errorTypes[selectedError].title, " Details"] }), _jsx("p", { className: "text-gray-600 mb-4", children: errorTypes[selectedError].description }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "primary", children: "Learn More" }), _jsx(HiveButton, { variant: "outline", children: "View Examples" })] })] }) }) }))] }) }));
    },
};
export const NetworkErrorHandling = {
    render: () => {
        const [isOffline, setIsOffline] = useState(false);
        const [isRetrying, setIsRetrying] = useState(false);
        const [retryCount, setRetryCount] = useState(0);
        const handleRetry = () => {
            setIsRetrying(true);
            setRetryCount(prev => prev + 1);
            setTimeout(() => {
                setIsRetrying(false);
                // Simulate success after 3 retries
                if (retryCount >= 2) {
                    setIsOffline(false);
                    setRetryCount(0);
                }
            }, 2000);
        };
        const simulateOffline = () => {
            setIsOffline(true);
            setRetryCount(0);
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Network Error Handling" }), _jsx("p", { className: "text-gray-600", children: "Network connectivity and error recovery patterns" })] }), _jsx(HiveButton, { variant: "outline", onClick: simulateOffline, disabled: isOffline, children: "Simulate Offline" })] }), isOffline ? (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-center py-12", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDF10" }), _jsx("h2", { className: "text-xl font-semibold mb-2", children: "Connection Lost" }), _jsx("p", { className: "text-gray-600 mb-6", children: "Unable to connect to HIVE servers. Please check your internet connection." }), _jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx(HiveButton, { variant: "primary", onClick: handleRetry, disabled: isRetrying, children: isRetrying ? 'Retrying...' : `Retry${retryCount > 0 ? ` (${retryCount})` : ''}` }), _jsx("div", { className: "text-sm text-gray-500", children: "Auto-retry in 30 seconds" })] })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }).map((_, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 }, children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("h3", { className: "font-semibold mb-2", children: ["Sample Space ", i + 1] }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "This space loaded successfully after network recovery." }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { className: "text-sm text-gray-500", children: "Online" })] })] }) }) }, i))) }))] }) }));
    },
};
export const PermissionErrorHandling = {
    render: () => {
        const [userRole, setUserRole] = useState('guest');
        const [attemptedAction, setAttemptedAction] = useState(null);
        const actions = [
            { id: 'create-post', label: 'Create Post', requiredRole: 'member' },
            { id: 'deploy-tool', label: 'Deploy Tool', requiredRole: 'builder' },
            { id: 'manage-members', label: 'Manage Members', requiredRole: 'builder' },
            { id: 'view-analytics', label: 'View Analytics', requiredRole: 'builder' },
            { id: 'delete-space', label: 'Delete Space', requiredRole: 'builder' }
        ];
        const handleAction = (actionId, requiredRole) => {
            const roleHierarchy = { guest: 0, member: 1, builder: 2 };
            const userLevel = roleHierarchy[userRole];
            const requiredLevel = roleHierarchy[requiredRole];
            if (userLevel < requiredLevel) {
                setAttemptedAction(actionId);
            }
            else {
                alert('Action completed successfully!');
            }
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Permission Error Handling" }), _jsx("p", { className: "text-gray-600", children: "Role-based access control and permission errors" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Role:" }), _jsxs("select", { value: userRole, onChange: (e) => setUserRole(e.target.value), className: "px-3 py-1 border rounded text-sm", children: [_jsx("option", { value: "guest", children: "Guest" }), _jsx("option", { value: "member", children: "Member" }), _jsx("option", { value: "builder", children: "Builder" })] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: actions.map((action) => (_jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "font-semibold", children: action.label }), _jsx(HiveBadge, { variant: "outline", children: action.requiredRole })] }), _jsx(HiveButton, { variant: "primary", onClick: () => handleAction(action.id, action.requiredRole), className: "w-full", children: "Try Action" })] }) }, action.id))) }), attemptedAction && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "fixed inset-0 bg-[var(--hive-background-primary)] bg-opacity-50 flex items-center justify-center z-50", children: _jsx(motion.div, { initial: { scale: 0.9 }, animate: { scale: 1 }, className: "bg-[var(--hive-text-primary)] p-6 rounded-lg max-w-md mx-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83D\uDD12" }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "Permission Denied" }), _jsxs("p", { className: "text-gray-600 mb-6", children: ["You don't have permission to perform this action.", userRole === 'guest' ? ' Please join the space first.' :
                                                userRole === 'member' ? ' Builder permissions required.' : ''] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "primary", onClick: () => setAttemptedAction(null), children: "Got it" }), userRole === 'guest' && (_jsx(HiveButton, { variant: "outline", onClick: () => {
                                                    setUserRole('member');
                                                    setAttemptedAction(null);
                                                }, children: "Join Space" }))] })] }) }) }))] }) }));
    },
};
export const ValidationErrorHandling = {
    render: () => {
        const [formData, setFormData] = useState({
            spaceName: '',
            description: '',
            visibility: 'public'
        });
        const [errors, setErrors] = useState({});
        const [isSubmitting, setIsSubmitting] = useState(false);
        const validate = () => {
            const newErrors = {};
            if (!formData.spaceName.trim()) {
                newErrors.spaceName = 'Space name is required';
            }
            else if (formData.spaceName.length < 3) {
                newErrors.spaceName = 'Space name must be at least 3 characters';
            }
            else if (formData.spaceName.length > 50) {
                newErrors.spaceName = 'Space name must be less than 50 characters';
            }
            if (!formData.description.trim()) {
                newErrors.description = 'Description is required';
            }
            else if (formData.description.length < 10) {
                newErrors.description = 'Description must be at least 10 characters';
            }
            else if (formData.description.length > 500) {
                newErrors.description = 'Description must be less than 500 characters';
            }
            return newErrors;
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            const validationErrors = validate();
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                setIsSubmitting(true);
                // Simulate server validation
                setTimeout(() => {
                    setIsSubmitting(false);
                    // Simulate server-side validation error
                    if (formData.spaceName.toLowerCase().includes('test')) {
                        setErrors({ spaceName: 'Space name cannot contain "test"' });
                    }
                    else {
                        alert('Space created successfully!');
                        setFormData({ spaceName: '', description: '', visibility: 'public' });
                    }
                }, 2000);
            }
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 max-w-2xl mx-auto", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-2", children: "Form Validation Errors" }), _jsx("p", { className: "text-gray-600", children: "Comprehensive form validation with real-time feedback" })] }), _jsx(HiveCard, { children: _jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Space Name *" }), _jsx(HiveInput, { value: formData.spaceName, onChange: (e) => setFormData(prev => ({ ...prev, spaceName: e.target.value })), placeholder: "Enter space name", className: `w-full ${errors.spaceName ? 'border-red-500' : ''}` }), errors.spaceName && (_jsx(motion.p, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "text-red-500 text-sm mt-1", children: errors.spaceName }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Description *" }), _jsx("textarea", { value: formData.description, onChange: (e) => setFormData(prev => ({ ...prev, description: e.target.value })), placeholder: "Describe your space", rows: 4, className: `w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}` }), _jsxs("div", { className: "flex justify-between items-center mt-1", children: [errors.description && (_jsx(motion.p, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "text-red-500 text-sm", children: errors.description })), _jsxs("span", { className: "text-sm text-gray-500 ml-auto", children: [formData.description.length, "/500"] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Visibility" }), _jsxs("select", { value: formData.visibility, onChange: (e) => setFormData(prev => ({ ...prev, visibility: e.target.value })), className: "w-full px-3 py-2 border border-gray-300 rounded-md", children: [_jsx("option", { value: "public", children: "Public" }), _jsx("option", { value: "private", children: "Private" }), _jsx("option", { value: "invite-only", children: "Invite Only" })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { type: "submit", variant: "primary", disabled: isSubmitting, children: isSubmitting ? 'Creating...' : 'Create Space' }), _jsx(HiveButton, { type: "button", variant: "outline", onClick: () => {
                                                setFormData({ spaceName: '', description: '', visibility: 'public' });
                                                setErrors({});
                                            }, children: "Reset" })] })] }) })] }) }));
    },
};
export const ErrorRecoveryStrategies = {
    render: () => {
        const [errorScenario, setErrorScenario] = useState(null);
        const [isRecovering, setIsRecovering] = useState(false);
        const [recoveryProgress, setRecoveryProgress] = useState(0);
        const scenarios = [
            {
                id: 'data-loss',
                title: 'Data Loss Recovery',
                description: 'Recover unsaved changes from local storage',
                icon: '💾',
                strategy: 'Auto-save and local storage backup'
            },
            {
                id: 'sync-conflict',
                title: 'Sync Conflict Resolution',
                description: 'Handle conflicting changes from multiple users',
                icon: '🔄',
                strategy: 'Conflict detection and manual resolution'
            },
            {
                id: 'partial-failure',
                title: 'Partial Operation Failure',
                description: 'Some parts of the operation succeeded',
                icon: '⚠️',
                strategy: 'Rollback and retry failed parts'
            },
            {
                id: 'quota-exceeded',
                title: 'Quota Exceeded',
                description: 'User has reached their limits',
                icon: '📊',
                strategy: 'Graceful degradation and upgrade prompts'
            }
        ];
        const handleRecovery = (scenarioId) => {
            setErrorScenario(scenarioId);
            setIsRecovering(true);
            setRecoveryProgress(0);
            // Simulate recovery process
            const interval = setInterval(() => {
                setRecoveryProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsRecovering(false);
                        setTimeout(() => setErrorScenario(null), 1000);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Error Recovery Strategies" }), _jsx("p", { className: "text-gray-600", children: "Automated and manual recovery patterns for common error scenarios" })] }), _jsx(HiveButton, { variant: "outline", children: "Recovery Guide" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: scenarios.map((scenario) => (_jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "text-2xl", children: scenario.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: scenario.title }), _jsx("p", { className: "text-sm text-gray-600", children: scenario.description })] })] }), _jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "text-sm text-gray-500 mb-2", children: "Recovery Strategy:" }), _jsx("div", { className: "text-sm bg-gray-50 p-2 rounded", children: scenario.strategy })] }), _jsx(HiveButton, { variant: "primary", onClick: () => handleRecovery(scenario.id), disabled: isRecovering, className: "w-full", children: isRecovering && errorScenario === scenario.id ? 'Recovering...' : 'Test Recovery' })] }) }, scenario.id))) }), errorScenario && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "fixed inset-0 bg-[var(--hive-background-primary)] bg-opacity-50 flex items-center justify-center z-50", children: _jsx(motion.div, { initial: { scale: 0.9 }, animate: { scale: 1 }, className: "bg-[var(--hive-text-primary)] p-6 rounded-lg max-w-md mx-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl mb-4", children: scenarios.find(s => s.id === errorScenario)?.icon }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: isRecovering ? 'Recovering...' : 'Recovery Complete' }), isRecovering ? (_jsxs("div", { className: "mb-4", children: [_jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-600 h-2 rounded-full transition-all duration-200", style: { width: `${recoveryProgress}%` } }) }), _jsxs("p", { className: "text-sm text-gray-600 mt-2", children: [recoveryProgress, "% complete"] })] })) : (_jsx("p", { className: "text-gray-600 mb-4", children: "Recovery completed successfully!" })), !isRecovering && (_jsx(HiveButton, { variant: "primary", onClick: () => setErrorScenario(null), children: "Close" }))] }) }) }))] }) }));
    },
};
//# sourceMappingURL=error-handling.stories.js.map