"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
export const RoleSelectionStep = ({ onRoleSelect, schoolName, }) => {
    const [selectedRole, setSelectedRole] = useState(null);
    const roleOptions = [
        {
            value: 'student',
            label: 'Student',
            description: 'Currently enrolled undergraduate or graduate student',
            icon: GraduationCap,
            available: true,
        },
        {
            value: 'faculty',
            label: 'Faculty/Staff',
            description: 'Professor, instructor, or staff member',
            icon: Users,
            available: true,
        },
        {
            value: 'alumni',
            label: 'Alumni',
            description: 'Graduate or former student',
            icon: BookOpen,
            available: false,
            comingSoon: true,
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
            onRoleSelect(selectedRole);
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" })] }), _jsxs("div", { className: "w-full max-w-2xl relative z-10", children: [_jsx("div", { className: "flex justify-center mb-8", children: _jsx("div", { className: "flex space-x-2", children: [1, 2, 3, 4, 5].map((stepNum, index) => (_jsx("div", { className: `w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${index === 0 ? 'bg-accent' : 'bg-muted'}` }, stepNum))) }) }), _jsxs("div", { className: "module-border module-surface module-padding space-y-8", children: [_jsxs(motion.div, { className: "text-center space-y-3", variants: hiveVariants.item, initial: "hidden", animate: "visible", children: [_jsxs("h1", { className: "text-2xl font-display font-semibold text-foreground", children: ["What's your role at ", schoolName, "?"] }), _jsx("p", { className: "text-muted font-body", children: "Help us personalize your HIVE experience" })] }), _jsx(motion.div, { className: "space-y-4", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: roleOptions.map((option, index) => {
                                    const Icon = option.icon;
                                    const isSelected = selectedRole === option.value;
                                    const isDisabled = !option.available;
                                    return (_jsx(motion.button, { onClick: () => handleRoleSelect(option.value), disabled: isDisabled, className: `w-full p-6 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-left ${isSelected
                                            ? 'border-accent bg-accent/10'
                                            : isDisabled
                                                ? 'border-border bg-surface-01 opacity-60 cursor-not-allowed'
                                                : 'border-border bg-surface-01 hover:border-accent/30 hover:bg-surface-02'}`, variants: hiveVariants.item, whileHover: !isDisabled ? { scale: 1.02 } : undefined, whileTap: !isDisabled ? { scale: 0.98 } : undefined, transition: { delay: index * 0.1 }, children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `p-3 rounded-lg ${isSelected
                                                        ? 'bg-accent text-background'
                                                        : isDisabled
                                                            ? 'bg-surface-02 text-muted'
                                                            : 'bg-surface-02 text-foreground'}`, children: _jsx(Icon, { className: "w-6 h-6" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: `font-medium font-body ${isSelected ? 'text-accent' : 'text-foreground'}`, children: option.label }), option.comingSoon && (_jsx("span", { className: "text-xs px-2 py-1 bg-surface-03 text-muted rounded-full", children: "Coming Soon" }))] }), _jsx("p", { className: "text-sm text-muted font-body", children: option.description })] }), isSelected && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "text-accent", children: _jsx(ArrowRight, { className: "w-5 h-5" }) }))] }) }, option.value));
                                }) }), _jsx(motion.div, { variants: hiveVariants.item, initial: "hidden", animate: "visible", transition: { delay: 0.4 }, children: _jsxs(Button, { onClick: handleContinue, disabled: !selectedRole, variant: "ritual", size: "lg", className: "w-full", children: ["Continue", _jsx(ArrowRight, { className: "w-4 h-4 ml-2" })] }) })] }), _jsx("div", { className: "text-center mt-6", children: _jsx("p", { className: "text-sm text-muted font-body", children: "Step 1 of 5" }) })] })] }));
};
//# sourceMappingURL=role-selection-step.js.map