"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { GraduationCap, Users, BookOpen, ArrowRight, Zap } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';
import { AlumniWaitlistModal } from './alumni-waitlist-modal';
import { FacultyModal } from './faculty-modal';
export const WelcomeRoleStep = ({ onRoleSelect, schoolName, userEmail, }) => {
    useAdaptiveMotion('academic'); // For consistency with motion system
    const [selectedRole, setSelectedRole] = useState(null);
    const [showAlumniModal, setShowAlumniModal] = useState(false);
    const [showFacultyModal, setShowFacultyModal] = useState(false);
    const roleOptions = [
        {
            value: 'student',
            label: 'Student',
            description: 'Find your people, join spaces, and build tools that spread across campus',
            icon: GraduationCap,
            available: true,
        },
        {
            value: 'faculty',
            label: 'Faculty/Staff',
            description: 'Guide student communities and help build the campus experience',
            icon: Users,
            available: true,
        },
        {
            value: 'alumni',
            label: 'Alumni',
            description: 'Stay connected with your campus community and upcoming features',
            icon: BookOpen,
            available: true,
            comingSoon: false,
        },
    ];
    const handleRoleSelect = (role) => {
        const option = roleOptions.find(opt => opt.value === role);
        if (!option?.available)
            return;
        setSelectedRole(role);
    };
    const handleContinue = () => {
        if (selectedRole) {
            if (selectedRole === 'alumni') {
                setShowAlumniModal(true);
            }
            else if (selectedRole === 'faculty') {
                setShowFacultyModal(true);
            }
            else {
                onRoleSelect(selectedRole);
            }
        }
    };
    const handleFacultyContinue = (data) => {
        setShowFacultyModal(false);
        onRoleSelect('faculty', data);
    };
    return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" })] }), _jsxs(motion.div, { className: "w-full max-w-xl relative z-10", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { className: "flex justify-center mb-12", variants: hiveVariants.item, children: _jsx("div", { className: "flex space-x-3", children: [1, 2, 3, 4].map((stepNum, index) => (_jsx("div", { className: `w-3 h-3 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${index === 0 ? 'bg-accent' : 'bg-surface-02'}` }, stepNum))) }) }), _jsxs(motion.div, { className: "bg-surface-01 border border-border rounded-2xl p-8 space-y-10", variants: hiveVariants.item, children: [_jsxs(motion.div, { className: "text-center space-y-6", variants: hiveVariants.item, children: [_jsx("div", { className: "w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto", children: _jsx(Zap, { className: "w-10 h-10 text-accent" }) }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h1", { className: "text-3xl font-display font-semibold text-foreground leading-tight", children: ["What's your role at ", schoolName, "?"] }), _jsx("p", { className: "text-muted-foreground font-body text-lg", children: "Join the programmable campus layer where your community lives" })] })] }), _jsx(motion.div, { className: "space-y-6", variants: hiveVariants.container, children: _jsx("div", { className: "space-y-4", children: roleOptions.map((option, index) => {
                                        const Icon = option.icon;
                                        const isSelected = selectedRole === option.value;
                                        const isDisabled = !option.available;
                                        return (_jsx(motion.button, { onClick: () => handleRoleSelect(option.value), disabled: isDisabled, className: `w-full p-6 rounded-xl border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-left ${isSelected
                                                ? 'border-accent bg-accent/10 shadow-lg'
                                                : isDisabled
                                                    ? 'border-border bg-surface-01 opacity-60 cursor-not-allowed'
                                                    : 'border-border bg-surface-02 hover:border-accent/40 hover:bg-surface-03 hover:shadow-md'}`, variants: hiveVariants.item, whileHover: !isDisabled ? { scale: 1.01 } : undefined, whileTap: !isDisabled ? { scale: 0.99 } : undefined, transition: { delay: index * 0.1 }, children: _jsxs("div", { className: "flex items-start gap-5", children: [_jsx("div", { className: `p-4 rounded-xl flex-shrink-0 ${isSelected
                                                            ? 'bg-accent text-background'
                                                            : isDisabled
                                                                ? 'bg-surface-03 text-muted'
                                                                : 'bg-surface-03 text-foreground'}`, children: _jsx(Icon, { className: "w-6 h-6" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("h3", { className: `font-semibold font-body text-lg ${isSelected ? 'text-accent' : 'text-foreground'}`, children: option.label }), option.comingSoon && (_jsx("span", { className: "text-xs px-2 py-1 bg-surface-03 text-muted rounded-full", children: "Coming Soon" }))] }), _jsx("p", { className: "text-muted-foreground font-body leading-relaxed", children: option.description })] }), isSelected && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "text-accent flex-shrink-0", children: _jsx(ArrowRight, { className: "w-5 h-5" }) }))] }) }, option.value));
                                    }) }) }), _jsxs(motion.div, { variants: hiveVariants.item, initial: "hidden", animate: "visible", transition: { delay: 0.4 }, children: [_jsxs(Button, { onClick: handleContinue, disabled: !selectedRole, variant: "ritual", size: "lg", className: "w-full h-14 text-lg font-semibold", children: ["Continue Setup", _jsx(ArrowRight, { className: "w-5 h-5 ml-2" })] }), selectedRole && (_jsx(motion.p, { className: "text-center text-sm text-muted-foreground font-body mt-4", initial: { opacity: 0 }, animate: { opacity: 1 }, children: "Next: Create your profile" }))] })] }), _jsx(motion.div, { className: "text-center mt-8", variants: hiveVariants.item, children: _jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Step 1 of 4" }) })] }), _jsx(AlumniWaitlistModal, { isOpen: showAlumniModal, onClose: () => setShowAlumniModal(false), schoolName: schoolName, userEmail: userEmail }), _jsx(FacultyModal, { isOpen: showFacultyModal, onClose: () => setShowFacultyModal(false), onContinue: handleFacultyContinue, schoolName: schoolName, userEmail: userEmail })] }));
};
//# sourceMappingURL=welcome-role-step.js.map