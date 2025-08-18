"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Button } from '../button';
import { GraduationCap, Loader2 } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';
const ACADEMIC_LEVELS = [
    {
        value: "undergraduate",
        label: "Undergraduate",
        description: "Bachelor's degree program"
    },
    {
        value: "graduate",
        label: "Graduate Student",
        description: "Master's degree program"
    },
    {
        value: "phd",
        label: "PhD Student",
        description: "Doctoral degree program"
    },
    {
        value: "other",
        label: "Other",
        description: "Certificate, non-degree, or other program"
    }
];
export const AcademicStep = ({ academicLevel, onAcademicLevelChange, graduationYear, onGraduationYearChange, onSubmit, onBack, isLoading, major = '', onMajorChange, classYear = '', onClassYearChange }) => {
    useAdaptiveMotion('academic'); // For consistency with motion system
    const currentYear = new Date().getFullYear();
    const graduationYears = Array.from({ length: 8 }, (_, i) => currentYear + i);
    // Class year options for undergraduates
    const classYearOptions = [
        { value: 'freshman', label: 'Freshman', description: 'First year student' },
        { value: 'sophomore', label: 'Sophomore', description: 'Second year student' },
        { value: 'junior', label: 'Junior', description: 'Third year student' },
        { value: 'senior', label: 'Senior', description: 'Fourth year student' },
        { value: 'super-senior', label: 'Super Senior', description: 'Fifth+ year student' },
    ];
    // Common fields of study
    const commonMajors = [
        'Computer Science', 'Business Administration', 'Engineering', 'Psychology', 'Biology',
        'English', 'Mathematics', 'Chemistry', 'Economics', 'Political Science',
        'Communications', 'Art', 'Music', 'Education', 'Nursing', 'Physics',
        'History', 'Sociology', 'Philosophy', 'Environmental Science', 'Architecture',
        'Accounting', 'Marketing', 'Finance', 'Pre-Med', 'Pre-Law', 'Other'
    ];
    return (_jsxs("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" }), _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" })] }), _jsxs(motion.div, { className: "w-full max-w-2xl relative z-10", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { className: "flex justify-center mb-8", variants: hiveVariants.item, children: _jsx("div", { className: "flex space-x-2", children: [1, 2, 3, 4].map((stepNum, index) => (_jsx("div", { className: `w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${index < 2 ? 'bg-white' : index === 2 ? 'bg-accent' : 'bg-muted'}` }, stepNum))) }) }), _jsxs(motion.div, { className: "module-border module-surface module-padding space-y-8", variants: hiveVariants.item, children: [_jsxs(motion.div, { className: "text-center space-y-4", variants: hiveVariants.item, children: [_jsx("div", { className: "w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(GraduationCap, { className: "w-8 h-8 text-accent" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-display font-semibold text-foreground", children: "Academic Information" }), _jsx("p", { className: "text-muted font-body mt-2", children: "Tell us about your academic journey so we can connect you with relevant communities" }), _jsx("div", { className: "mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg", children: _jsxs("p", { className: "text-sm text-foreground font-body", children: ["\u2728 ", _jsx("strong", { children: "You'll automatically join:" }), " Your major community, graduation class, and residential space"] }) })] })] }), _jsxs(motion.div, { className: "hive-stack", variants: hiveVariants.container, children: [_jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsx("h3", { className: "text-sm font-medium text-foreground font-body", children: "Academic Level" }), _jsx("div", { className: "grid gap-3", children: ACADEMIC_LEVELS.map((level) => (_jsxs(motion.label, { className: `relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${academicLevel === level.value
                                                        ? 'border-accent bg-accent/5'
                                                        : 'border-border hover:border-accent/30 hover:bg-surface-01'}`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("input", { type: "radio", name: "academicLevel", value: level.value, checked: academicLevel === level.value, onChange: (e) => onAcademicLevelChange(e.target.value), className: "sr-only" }), _jsx("div", { className: "flex-1", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-4 h-4 rounded-full border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] flex items-center justify-center ${academicLevel === level.value
                                                                            ? 'border-accent bg-accent'
                                                                            : 'border-border'}`, children: academicLevel === level.value && (_jsx("div", { className: "w-2 h-2 bg-white rounded-full" })) }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-foreground font-body", children: level.label }), _jsx("div", { className: "text-sm text-muted font-body", children: level.description })] })] }) })] }, level.value))) })] }), academicLevel === 'undergraduate' && onClassYearChange && (_jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, children: [_jsx("h3", { className: "text-sm font-medium text-foreground font-body", children: "Current Year in School" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: classYearOptions.map((year) => (_jsxs(motion.label, { className: `relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] min-h-[44px] ${classYear === year.value
                                                        ? 'border-accent bg-accent/5'
                                                        : 'border-border hover:border-accent/30 hover:bg-surface-01'}`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: [_jsx("input", { type: "radio", name: "classYear", value: year.value, checked: classYear === year.value, onChange: (e) => onClassYearChange(e.target.value), className: "sr-only" }), _jsxs("div", { className: "flex items-center gap-3 w-full", children: [_jsx("div", { className: `w-4 h-4 rounded-full border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] flex items-center justify-center ${classYear === year.value
                                                                        ? 'border-accent bg-accent'
                                                                        : 'border-border'}`, children: classYear === year.value && (_jsx("div", { className: "w-2 h-2 bg-white rounded-full" })) }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium text-foreground font-body text-sm", children: year.label }), _jsx("div", { className: "text-xs text-muted font-body", children: year.description })] })] })] }, year.value))) })] })), onMajorChange && (_jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsx("h3", { className: "text-sm font-medium text-foreground font-body", children: "Field of Study" }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: major, onChange: (e) => onMajorChange(e.target.value), placeholder: "e.g., Computer Science", list: "majors", className: "w-full px-4 py-3 border-2 border-border rounded-lg bg-surface text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]" }), _jsx("datalist", { id: "majors", children: commonMajors.map((majorOption) => (_jsx("option", { value: majorOption }, majorOption))) })] }), _jsx("p", { className: "text-xs text-muted font-body", children: "Type your major or select from the dropdown suggestions" })] })), _jsxs(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: [_jsx("h3", { className: "text-sm font-medium text-foreground font-body", children: "Expected Graduation Year" }), _jsx("select", { value: graduationYear, onChange: (e) => onGraduationYearChange(parseInt(e.target.value)), className: "w-full px-4 py-3 border-2 border-border rounded-lg bg-surface text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", children: graduationYears.map(year => (_jsx("option", { value: year, className: "bg-surface text-foreground", children: year }, year))) })] })] }), _jsxs(motion.div, { className: "flex gap-3 pt-4", variants: hiveVariants.item, children: [_jsx(Button, { variant: "outline", onClick: onBack, className: "flex-1 font-body", disabled: isLoading, children: "Back" }), _jsx(Button, { variant: "ritual", onClick: onSubmit, disabled: isLoading, className: "flex-1 font-body", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }), "Saving..."] })) : ('Continue') })] })] }), _jsx(motion.div, { className: "text-center mt-6", variants: hiveVariants.item, children: _jsx("p", { className: "text-sm text-muted font-body", children: "Step 3 of 4" }) })] })] }));
};
//# sourceMappingURL=academic-step.js.map