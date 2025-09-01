"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveAuthFlowEnhanced, AuthProvider } from './hive-auth-flow-enhanced.js';
import { HiveOnboardingWizardEnhanced, OnboardingProvider } from '../onboarding/hive-onboarding-wizard-enhanced.js';
export function HiveAuthOnboardingIntegration({ onAuthComplete, onOnboardingComplete, schoolId = 'ub-buffalo', schoolName = 'University of Buffalo', schoolDomain = 'buffalo.edu', mockMode = false, initialPhase = 'auth', skipAuth = false }) {
    const [currentPhase, setCurrentPhase] = useState(skipAuth ? 'onboarding' : initialPhase);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    // Handle auth completion -> onboarding transition
    const handleAuthSuccess = (user) => {
        console.log('🔐 Auth completed:', { email: user.email, isNewUser: user.isNewUser });
        setUserEmail(user.email);
        setUserName(user.name);
        // Call external auth complete handler
        onAuthComplete?.(user);
        if (user.isNewUser) {
            // New user needs onboarding
            setCurrentPhase('onboarding');
        }
        else {
            // Existing user goes straight to complete
            setCurrentPhase('complete');
        }
    };
    // Handle onboarding completion
    const handleOnboardingSuccess = (userData) => {
        console.log('👋 Onboarding completed:', userData);
        setUserName(userData.name || userName);
        setCurrentPhase('complete');
        // Call external onboarding complete handler
        onOnboardingComplete?.(userData);
    };
    // Render current phase
    if (currentPhase === 'complete') {
        return (_jsx("div", { className: "min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center p-6", children: _jsxs("div", { className: "max-w-md w-full text-center space-y-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)]/60 flex items-center justify-center", children: _jsx("div", { className: "text-3xl", children: "\uD83C\uDF89" }) }), _jsxs("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: ["Welcome to HIVE", userName ? `, ${userName}` : '', "!"] }), _jsxs("p", { className: "text-[var(--hive-text-secondary)] text-lg", children: ["You're all set to start building your campus community at ", schoolName, "."] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] rounded-xl p-6 space-y-4", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: "What's Next?" }), _jsxs("div", { className: "space-y-3 text-sm text-[var(--hive-text-secondary)]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)]" }), _jsxs("span", { children: ["Explore ", schoolName.split(' ')[0], " spaces and connect with classmates"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)]" }), _jsx("span", { children: "Create your first campus tool or ritual" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)]" }), _jsx("span", { children: "Join study groups and campus events" })] })] })] })] }) }));
    }
    if (currentPhase === 'onboarding') {
        return (_jsx(OnboardingProvider, { children: _jsx(HiveOnboardingWizardEnhanced, { onComplete: handleOnboardingSuccess, userEmail: userEmail, initialStep: "welcome" }) }));
    }
    // Auth phase (default)
    return (_jsx(AuthProvider, { onAuthSuccess: handleAuthSuccess, mockMode: mockMode, children: _jsx(HiveAuthFlowEnhanced, { onAuthComplete: (email, isNewUser) => {
                handleAuthSuccess({
                    id: 'temp-id',
                    email,
                    name: email.split('@')[0],
                    isNewUser
                });
            }, initialStep: "welcome" }) }));
}
export function UnifiedAuthBridge({ children, unifiedAuth }) {
    // This component can be used to bridge the enhanced components with UnifiedAuth
    // For now, it's a passthrough, but can be enhanced to provide integration
    return _jsx(_Fragment, { children: children });
}
// Export for use in stories and production
export { AuthProvider, OnboardingProvider };
//# sourceMappingURL=hive-auth-onboarding-integration.js.map