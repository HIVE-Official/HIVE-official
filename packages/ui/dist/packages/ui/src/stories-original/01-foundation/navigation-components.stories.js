import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Calendar, Settings, ChevronLeft, ChevronRight, Check } from 'lucide-react';
const meta = {
    title: '01-Foundation/Navigation Components',
    parameters: {
        docs: {
            description: {
                component: 'HIVE Navigation Components - Bottom Tab Bar, Step Indicator, and Pagination with dark luxury aesthetic',
            },
        },
    },
};
export default meta;
// Bottom Tab Bar Component
const BottomTabBar = ({ items, activeIndex, onTabChange }) => {
    return (_jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-[var(--hive-background-primary)]/95 backdrop-blur-md border-t border-white/5", children: _jsx("div", { className: "flex items-center justify-around py-2 px-4 max-w-md mx-auto", children: items.map((item, index) => (_jsxs(motion.button, { onClick: () => onTabChange(index), className: `relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ${activeIndex === index
                    ? 'text-[var(--hive-brand-secondary)]'
                    : 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]'}`, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [activeIndex === index && (_jsx(motion.div, { layoutId: "activeTab", className: "absolute inset-0 bg-[var(--hive-brand-secondary)]/10 rounded-lg border border-[var(--hive-brand-secondary)]/20", transition: { type: "spring", bounce: 0.2, duration: 0.6 } })), _jsxs("div", { className: "relative mb-1", children: [item.icon, item.badge && item.badge > 0 && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, className: "absolute -top-1 -right-1 min-w-4 h-4 bg-[var(--hive-status-error)] rounded-full flex items-center justify-center px-1", children: _jsx("span", { className: "text-xs font-medium text-[var(--hive-text-primary)]", children: item.badge > 99 ? '99+' : item.badge }) }))] }), _jsx("span", { className: "text-xs font-medium", children: item.label })] }, index))) }) }));
};
// Step Indicator Component
const StepIndicator = ({ steps, currentStep, completedSteps }) => {
    return (_jsx("div", { className: "w-full max-w-2xl mx-auto", children: _jsx("div", { className: "flex items-center justify-between mb-8", children: steps.map((step, index) => (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(motion.div, { className: `relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${completedSteps.has(index)
                                    ? 'bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                    : currentStep === index
                                        ? 'bg-[var(--hive-background-tertiary)] border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]'
                                        : 'bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)]'}`, whileHover: { scale: 1.05 }, initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: index * 0.1 }, children: completedSteps.has(index) ? (_jsx(Check, { size: 20 })) : (_jsx("span", { className: "font-semibold", children: index + 1 })) }), _jsx("span", { className: `mt-3 text-sm font-medium text-center max-w-[30] transition-colors duration-300 ${currentStep === index
                                    ? 'text-[var(--hive-brand-secondary)]'
                                    : completedSteps.has(index)
                                        ? 'text-[var(--hive-text-secondary)]'
                                        : 'text-[var(--hive-text-tertiary)]'}`, children: step })] }), index < steps.length - 1 && (_jsxs("div", { className: "flex-1 h-0.5 mx-4 mt-6 relative", children: [_jsx("div", { className: "absolute inset-0 bg-[var(--hive-border-default)] rounded-full" }), _jsx(motion.div, { className: "absolute inset-0 bg-[var(--hive-brand-secondary)] rounded-full origin-left", initial: { scaleX: 0 }, animate: {
                                    scaleX: completedSteps.has(index) ? 1 : currentStep > index ? 1 : 0
                                }, transition: { duration: 0.5, delay: index * 0.1 } })] }))] }, index))) }) }));
};
// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, showFirstLast = true, showPrevNext = true }) => {
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        }
        else {
            rangeWithDots.push(1);
        }
        rangeWithDots.push(...range);
        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        }
        else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }
        return rangeWithDots;
    };
    const visiblePages = getVisiblePages();
    return (_jsxs("div", { className: "flex items-center justify-center space-x-2", children: [showFirstLast && currentPage > 1 && (_jsx(motion.button, { onClick: () => onPageChange(1), className: "px-3 py-2 text-sm font-medium text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] transition-colors duration-200", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "First" })), showPrevNext && currentPage > 1 && (_jsx(motion.button, { onClick: () => onPageChange(currentPage - 1), className: "flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:border-[var(--hive-brand-secondary)]/20 transition-all duration-200", whileHover: { scale: 1.05, backgroundColor: 'var(--hive-background-tertiary)' }, whileTap: { scale: 0.95 }, children: _jsx(ChevronLeft, { size: 16 }) })), visiblePages.map((page, index) => (_jsx(React.Fragment, { children: page === '...' ? (_jsx("span", { className: "px-3 py-2 text-[var(--hive-text-tertiary)]", children: "..." })) : (_jsx(motion.button, { onClick: () => onPageChange(page), className: `flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === page
                        ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] border-[var(--hive-brand-secondary)]'
                        : 'bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:border-[var(--hive-brand-secondary)]/20'}`, whileHover: {
                        scale: 1.05,
                        backgroundColor: currentPage === page ? 'var(--hive-brand-secondary)' : 'var(--hive-background-tertiary)'
                    }, whileTap: { scale: 0.95 }, children: page })) }, index))), showPrevNext && currentPage < totalPages && (_jsx(motion.button, { onClick: () => onPageChange(currentPage + 1), className: "flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:border-[var(--hive-brand-secondary)]/20 transition-all duration-200", whileHover: { scale: 1.05, backgroundColor: 'var(--hive-background-tertiary)' }, whileTap: { scale: 0.95 }, children: _jsx(ChevronRight, { size: 16 }) })), showFirstLast && currentPage < totalPages && (_jsx(motion.button, { onClick: () => onPageChange(totalPages), className: "px-3 py-2 text-sm font-medium text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] transition-colors duration-200", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "Last" }))] }));
};
// Stories
export const BottomTabBarStory = {
    name: 'Bottom Tab Bar',
    render: () => {
        const [activeTab, setActiveTab] = React.useState(0);
        const tabItems = [
            { icon: _jsx(Home, { size: 20 }), label: 'Home', badge: 0 },
            { icon: _jsx(Users, { size: 20 }), label: 'Spaces', badge: 3 },
            { icon: _jsx(Calendar, { size: 20 }), label: 'Events', badge: 12 },
            { icon: _jsx(Settings, { size: 20 }), label: 'Settings', badge: 0 },
        ];
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen pb-20 p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Bottom Tab Bar" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-8", children: "Mobile-first navigation with badges, active states, and liquid metal animations." }), _jsx("div", { className: "space-y-4 mb-8", children: _jsxs("div", { className: "text-[var(--hive-text-secondary)]", children: ["Current Tab: ", _jsx("span", { className: "text-[var(--hive-brand-secondary)]", children: tabItems[activeTab].label })] }) }), _jsx(BottomTabBar, { items: tabItems, activeIndex: activeTab, onTabChange: setActiveTab })] }));
    },
};
export const StepIndicatorStory = {
    name: 'Step Indicator',
    render: () => {
        const [currentStep, setCurrentStep] = React.useState(1);
        const [completedSteps, setCompletedSteps] = React.useState(new Set([0]));
        const steps = [
            'Account Setup',
            'University Verification',
            'Profile Creation',
            'Space Discovery',
            'Welcome Complete'
        ];
        const handleNextStep = () => {
            if (currentStep < steps.length - 1) {
                setCompletedSteps(prev => new Set([...prev, currentStep]));
                setCurrentStep(currentStep + 1);
            }
        };
        const handlePrevStep = () => {
            if (currentStep > 0) {
                setCompletedSteps(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(currentStep);
                    return newSet;
                });
                setCurrentStep(currentStep - 1);
            }
        };
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Step Indicator" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-12", children: "Onboarding flow progress with completed states and smooth transitions." }), _jsx(StepIndicator, { steps: steps, currentStep: currentStep, completedSteps: completedSteps }), _jsxs("div", { className: "flex justify-center space-x-4 mt-12", children: [_jsx(motion.button, { onClick: handlePrevStep, disabled: currentStep === 0, className: "px-6 py-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] text-[var(--hive-text-secondary)] rounded-lg disabled:opacity-50 hover:border-[var(--hive-brand-secondary)]/20", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "Previous" }), _jsx(motion.button, { onClick: handleNextStep, disabled: currentStep === steps.length - 1, className: "px-6 py-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-lg font-medium disabled:opacity-50", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "Next Step" })] })] }));
    },
};
export const PaginationStory = {
    name: 'Pagination',
    render: () => {
        const [currentPage, setCurrentPage] = React.useState(5);
        const totalPages = 25;
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Pagination" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-12", children: "Smart pagination with ellipsis, hover states, and HIVE brand aesthetic." }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Full Pagination" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: setCurrentPage, showFirstLast: true, showPrevNext: true })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Minimal Pagination" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: setCurrentPage, showFirstLast: false, showPrevNext: true })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Numbers Only" }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, onPageChange: setCurrentPage, showFirstLast: false, showPrevNext: false })] })] }), _jsx("div", { className: "mt-12 text-center", children: _jsxs("div", { className: "text-[var(--hive-text-secondary)]", children: ["Page ", _jsx("span", { className: "text-[var(--hive-brand-secondary)] font-medium", children: currentPage }), " of ", totalPages] }) })] }));
    },
};
//# sourceMappingURL=navigation-components.stories.js.map