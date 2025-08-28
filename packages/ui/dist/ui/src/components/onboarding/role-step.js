"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Briefcase, AlertCircle } from 'lucide-react';
import { Button } from '../button';
import { Card, CardContent } from '../card';
import { Alert } from '../alert';
import { cn } from '../../lib/utils';
const ROLE_OPTIONS = [
    {
        id: 'undergraduate',
        title: 'Undergraduate Student',
        description: 'Currently pursuing a bachelor\'s degree',
        icon: _jsx(GraduationCap, { className: "w-6 h-6" }),
        isActive: true
    },
    {
        id: 'graduate',
        title: 'Graduate Student',
        description: 'Pursuing master\'s, PhD, or professional degree',
        icon: _jsx(BookOpen, { className: "w-6 h-6" }),
        isActive: true
    },
    {
        id: 'faculty',
        title: 'Faculty & Staff',
        description: 'University employees, professors, and staff',
        icon: _jsx(Briefcase, { className: "w-6 h-6" }),
        isActive: false,
        comingSoon: true
    },
    {
        id: 'alumni',
        title: 'Alumni',
        description: 'Graduated from this university',
        icon: _jsx(Users, { className: "w-6 h-6" }),
        isActive: false,
        comingSoon: true
    }
];
export const RoleStep = ({ onRoleSelect, onContinue, selectedRole, className }) => {
    const [localSelectedRole, setLocalSelectedRole] = useState(selectedRole || '');
    const handleRoleClick = (roleId, isActive) => {
        if (!isActive)
            return;
        setLocalSelectedRole(roleId);
        onRoleSelect(roleId);
    };
    const canContinue = localSelectedRole && ROLE_OPTIONS.find(r => r.id === localSelectedRole)?.isActive;
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("w-full max-w-2xl mx-auto", className), children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white mb-3", children: "What's your role?" }), _jsx("p", { className: "text-lg text-muted", children: "Help us customize your HIVE experience for your campus life" })] }), _jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "grid gap-4", children: ROLE_OPTIONS.map((role, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: _jsx(Card, { variant: localSelectedRole === role.id ? "accent" : role.isActive ? "interactive" : "default", padding: "md", className: cn("transition-all duration-200", role.isActive ? "cursor-pointer" : "opacity-50 cursor-not-allowed"), onClick: () => handleRoleClick(role.id, role.isActive), children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: cn("p-3 rounded-lg flex-shrink-0", role.isActive
                                                    ? localSelectedRole === role.id
                                                        ? "bg-accent/20 text-accent"
                                                        : "bg-surface text-white"
                                                    : "bg-surface/50 text-muted"), children: role.icon }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: cn("font-semibold", role.isActive ? "text-white" : "text-muted"), children: role.title }), localSelectedRole === role.id && role.isActive && (_jsx("div", { className: "w-2 h-2 bg-accent rounded-full" })), role.comingSoon && (_jsx("span", { className: "text-xs bg-surface/50 text-muted px-2 py-1 rounded", children: "Coming Soon" }))] }), _jsx("p", { className: cn("text-sm", role.isActive ? "text-muted" : "text-muted/70"), children: role.description })] })] }) }) }) }, role.id))) }), _jsxs(Alert, { variant: "info", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Student-focused launch" }), _jsx("p", { className: "text-sm", children: "HIVE is currently optimized for student experiences. Faculty and alumni access will be available soon." })] })] }), _jsx("div", { className: "flex justify-center pt-4", children: _jsx(Button, { variant: "primary", size: "lg", onClick: onContinue, disabled: !canContinue, className: "min-w-[140px]", children: "Continue" }) }), _jsx("div", { className: "text-center text-sm text-muted", children: "Your role helps us show you relevant spaces and content for your campus experience." })] })] }));
};
//# sourceMappingURL=role-step.js.map