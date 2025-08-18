"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Users, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
// Mock pre-seeded spaces for UB faculty
const UB_FACULTY_SPACES = [
    {
        id: 'ub-engineering',
        name: 'School of Engineering',
        description: 'Faculty and staff from engineering departments',
        memberCount: 24,
    },
    {
        id: 'ub-medicine',
        name: 'School of Medicine',
        description: 'Medical faculty and research staff',
        memberCount: 18,
    },
    {
        id: 'ub-arts-sciences',
        name: 'College of Arts & Sciences',
        description: 'Faculty from humanities and sciences',
        memberCount: 35,
    },
    {
        id: 'ub-business',
        name: 'School of Management',
        description: 'Business faculty and staff',
        memberCount: 16,
    },
];
export const FacultyVerificationStep = ({ onBack, onVerificationComplete, schoolName, userEmail, }) => {
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState('pending');
    const handleSpaceSelect = (spaceId) => {
        setSelectedSpace(spaceId);
    };
    const handleVerifyAccess = async () => {
        if (!selectedSpace)
            return;
        setIsVerifying(true);
        // Simulate verification process
        await new Promise(resolve => setTimeout(resolve, 2000));
        // For demo purposes, approve if email contains "buffalo.edu"
        const isAuthorized = userEmail.includes('buffalo.edu') || userEmail.includes('ub.edu');
        if (isAuthorized) {
            setVerificationStatus('success');
            setTimeout(() => {
                onVerificationComplete(selectedSpace);
            }, 1000);
        }
        else {
            setVerificationStatus('failed');
            setIsVerifying(false);
        }
    };
    const getStatusContent = () => {
        switch (verificationStatus) {
            case 'success':
                return (_jsxs(motion.div, { className: "text-center space-y-4", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, children: [_jsx("div", { className: "w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(CheckCircle, { className: "w-8 h-8 text-accent" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-display font-medium text-foreground mb-2", children: "Verification Successful!" }), _jsx("p", { className: "text-muted font-body", children: "Welcome to the faculty community. Setting up your profile..." })] })] }));
            case 'failed':
                return (_jsxs(motion.div, { className: "text-center space-y-4", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, children: [_jsx("div", { className: "w-16 h-16 bg-surface-02 rounded-full flex items-center justify-center mx-auto", children: _jsx(AlertCircle, { className: "w-8 h-8 text-muted" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-display font-medium text-foreground mb-2", children: "Verification Failed" }), _jsx("p", { className: "text-muted font-body mb-4", children: "We couldn't verify your faculty status with the provided email. Please contact support if you believe this is an error." }), _jsxs(Button, { variant: "outline", onClick: onBack, children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Go Back"] })] })] }));
            default:
                return null;
        }
    };
    if (verificationStatus !== 'pending') {
        return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" })] }), _jsx("div", { className: "w-full max-w-lg relative z-10", children: _jsx("div", { className: "module-border module-surface module-padding", children: getStatusContent() }) })] }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" })] }), _jsx("div", { className: "w-full max-w-2xl relative z-10", children: _jsxs("div", { className: "module-border module-surface module-padding space-y-8", children: [_jsxs(motion.div, { className: "text-center space-y-3", variants: hiveVariants.item, initial: "hidden", animate: "visible", children: [_jsx("div", { className: "w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Users, { className: "w-8 h-8 text-accent" }) }), _jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: "Faculty Verification" }), _jsxs("p", { className: "text-muted font-body", children: ["Select your department to join the faculty community at ", schoolName] })] }), _jsx(motion.div, { className: "space-y-3", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: UB_FACULTY_SPACES.map((space, index) => {
                                const isSelected = selectedSpace === space.id;
                                return (_jsx(motion.button, { onClick: () => handleSpaceSelect(space.id), className: `w-full p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-left ${isSelected
                                        ? 'border-accent bg-accent/10'
                                        : 'border-border bg-surface-01 hover:border-accent/30 hover:bg-surface-02'}`, variants: hiveVariants.item, whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, transition: { delay: index * 0.1 }, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: `font-medium font-body mb-1 ${isSelected ? 'text-accent' : 'text-foreground'}`, children: space.name }), _jsx("p", { className: "text-sm text-muted font-body", children: space.description })] }), _jsx("div", { className: "text-right", children: _jsxs("p", { className: "text-xs text-muted", children: [space.memberCount, " members"] }) })] }) }, space.id));
                            }) }), _jsxs(motion.div, { className: "flex gap-3 pt-4", variants: hiveVariants.item, initial: "hidden", animate: "visible", transition: { delay: 0.4 }, children: [_jsxs(Button, { variant: "outline", onClick: onBack, className: "flex-1", children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Back"] }), _jsx(Button, { onClick: handleVerifyAccess, disabled: !selectedSpace || isVerifying, variant: "ritual", className: "flex-2", children: isVerifying ? 'Verifying...' : 'Verify Access' })] }), _jsx("div", { className: "text-center pt-4 border-t border-border", children: _jsxs("p", { className: "text-xs text-muted font-body", children: ["Verification is based on your ", userEmail, " email address"] }) })] }) })] }));
};
//# sourceMappingURL=faculty-verification-step.js.map