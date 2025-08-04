'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
import { ArrowRight, GraduationCap, Home, Users, Star } from 'lucide-react';
// Default category configurations
export const SPACE_CATEGORIES = {
    university: {
        type: 'university',
        title: 'University Spaces',
        description: 'Official academic spaces for courses, departments, and university programs',
        icon: _jsx(GraduationCap, { className: "w-6 h-6" }),
        gradient: 'from-blue-500/20 via-blue-600/15 to-indigo-500/20',
        accentColor: 'text-blue-400',
        examples: ['CS 101', 'Computer Science Dept', 'Engineering College']
    },
    residential: {
        type: 'residential',
        title: 'Residential Life',
        description: 'Connect with your dorm, floor, building, and residential community',
        icon: _jsx(Home, { className: "w-6 h-6" }),
        gradient: 'from-emerald-500/20 via-emerald-600/15 to-teal-500/20',
        accentColor: 'text-emerald-400',
        examples: ['Ellicott Complex', 'Governors Floor 3', 'South Campus']
    },
    greek: {
        type: 'greek',
        title: 'Greek Life',
        description: 'Fraternities, sororities, and Greek organizations on campus',
        icon: _jsx(Users, { className: "w-6 h-6" }),
        gradient: 'from-purple-500/20 via-purple-600/15 to-violet-500/20',
        accentColor: 'text-purple-400',
        examples: ['Alpha Phi Alpha', 'Panhellenic Council', 'IFC']
    },
    student: {
        type: 'student',
        title: 'Student Groups',
        description: 'Student-created spaces for clubs, organizations, and special interests',
        icon: _jsx(Star, { className: "w-6 h-6" }),
        gradient: 'from-rose-500/20 via-rose-600/15 to-pink-500/20',
        accentColor: 'text-rose-400',
        examples: ['Study Groups', 'Intramural Teams', 'Student Clubs']
    }
};
export const SpaceCategoryCard = ({ category, onClick, variant = 'default', className }) => {
    const handleClick = () => {
        onClick?.(category.type);
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, whileHover: {
            y: -4,
            transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
        }, whileTap: { scale: 0.98 }, onClick: handleClick, className: cn('relative group cursor-pointer overflow-hidden', 
        // HIVE Luxury Foundation
        'bg-gradient-to-br from-[var(--hive-background-secondary)]/90 via-[var(--hive-background-tertiary)]/80 to-[var(--hive-background-interactive)]/90', 'backdrop-blur-xl border border-[var(--hive-border-primary)]/20', 'hover:border-[var(--hive-border-primary)]/40', 
        // HIVE Luxury Radius
        'rounded-2xl', 'transition-all duration-500 ease-out', 
        // Responsive sizing
        variant === 'featured' ? 'h-48 p-8' : 'h-40 p-6', className), children: [_jsx("div", { className: cn('absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500', `bg-gradient-to-br ${category.gradient}`) }), _jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[var(--hive-brand-primary)]/10 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-[var(--hive-brand-primary)]/20 to-transparent rounded-full blur-xl" })] }), _jsxs("div", { className: "relative z-10 h-full flex flex-col", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsx("div", { className: cn('w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300', 'bg-gradient-to-br from-[var(--hive-background-secondary)]/60 to-[var(--hive-background-tertiary)]/60', 'border-[var(--hive-border-primary)]/30 group-hover:border-[var(--hive-border-primary)]/50', category.accentColor), children: category.icon }), _jsx("div", { className: "px-3 py-1 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm border border-[var(--hive-border-primary)]/30 rounded-full", children: _jsxs("span", { className: "text-xs font-bold text-[var(--hive-text-secondary)]", children: [category.count.toLocaleString(), " spaces"] }) })] }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: cn('font-bold text-lg leading-tight mb-2 transition-colors duration-300', 'text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)]'), children: category.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed line-clamp-2", children: category.description })] }), _jsx("div", { className: "mt-4", children: _jsx("div", { className: "flex flex-wrap gap-1.5", children: category.examples.slice(0, 3).map((example, index) => (_jsx("span", { className: "px-2 py-1 text-xs font-medium text-[var(--hive-text-placeholder)] bg-[var(--hive-background-primary)]/40 border border-[var(--hive-border-primary)]/20 rounded-lg", children: example }, index))) }) }), _jsx(motion.div, { className: "absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300", initial: { x: -10 }, animate: { x: 0 }, children: _jsx("div", { className: cn('w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300', 'bg-[var(--hive-background-secondary)]/80 border-[var(--hive-border-primary)]/40', category.accentColor), children: _jsx(ArrowRight, { className: "w-4 h-4" }) }) })] }), _jsx("div", { className: "absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" })] }));
};
export default SpaceCategoryCard;
//# sourceMappingURL=space-category-card.js.map