"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Lock } from 'lucide-react';
import { Input } from '../input';
import { Button } from '../button';
import { cn } from '../../lib/utils';
import { Dialog } from '../dialog';
import { Label } from '../label';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';
// Skeleton Loading Component
const SchoolCardSkeleton = ({ index }) => (_jsx(motion.div, { variants: hiveVariants.slideUp, initial: "hidden", animate: "visible", transition: { delay: index * 0.05 }, className: "w-full p-6 rounded-xl border border-border bg-surface/50 animate-pulse", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "h-6 bg-muted/20 rounded w-48 mb-2" }), _jsx("div", { className: "h-4 bg-muted/20 rounded w-32" })] }), _jsx("div", { className: "h-5 w-5 bg-muted/20 rounded" })] }) }));
export const SchoolPick = ({ schools, onSchoolSelect, className, userEmail, isLoading = false }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showWaitlistDialog, setShowWaitlistDialog] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [waitlistSchool, setWaitlistSchool] = useState(null);
    const [isJoiningWaitlist, setIsJoiningWaitlist] = useState(false);
    const [waitlistError, setWaitlistError] = useState(null);
    const [waitlistEmail, setWaitlistEmail] = useState('');
    const { variants: _variants } = useAdaptiveMotion('social');
    const filteredSchools = schools.filter((school) => school.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleSchoolClick = (school) => {
        if (school.status === 'open') {
            onSchoolSelect(school);
        }
        else {
            setWaitlistSchool(school);
            setShowWaitlistDialog(true);
        }
    };
    const handleJoinWaitlist = async () => {
        const email = userEmail || waitlistEmail;
        if (!waitlistSchool || !email) {
            setWaitlistError('Email is required to join the waitlist');
            return;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setWaitlistError('Please enter a valid email address');
            return;
        }
        setIsJoiningWaitlist(true);
        setWaitlistError(null);
        try {
            const response = await fetch('/api/waitlist/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    schoolId: waitlistSchool.id,
                }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to join waitlist');
            }
            setShowWaitlistDialog(false);
            setShowSuccessDialog(true);
        }
        catch (error) {
            setWaitlistError(error instanceof Error ? error.message : 'An error occurred');
        }
        finally {
            setIsJoiningWaitlist(false);
        }
    };
    const handleCloseSuccess = () => {
        setShowSuccessDialog(false);
        setWaitlistSchool(null);
        setWaitlistEmail('');
        setWaitlistError(null);
    };
    const handleCloseWaitlist = () => {
        setShowWaitlistDialog(false);
        setWaitlistEmail('');
        setWaitlistError(null);
    };
    return (_jsxs(motion.div, { className: cn("w-full space-y-8", className), variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { className: "relative", variants: hiveVariants.item, children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" }), _jsx(Input, { type: "text", placeholder: "Search your school...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), variant: "accent", className: "pl-10" })] }), _jsx(motion.div, { className: "space-y-4", variants: hiveVariants.item, children: _jsx(AnimatePresence, { mode: "popLayout", children: isLoading ? (
                    // Show skeleton loading while schools are loading
                    Array.from({ length: 6 }, (_, index) => ({ id: `skeleton-${index}`, index })).map((skeleton) => (_jsx(SchoolCardSkeleton, { index: skeleton.index }, skeleton.id)))) : (filteredSchools.map((school, index) => (_jsx(motion.div, { variants: hiveVariants.slideUp, initial: "hidden", animate: "visible", exit: "hidden", transition: { delay: index * 0.05 }, layout: true, children: _jsx(motion.button, { onClick: () => handleSchoolClick(school), className: cn('w-full p-6 text-left rounded-xl border border-border bg-surface/50', 'transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]', 'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2', school.status === 'waitlist' && 'border-border/60'), whileHover: {
                                scale: 1.01,
                                y: -2,
                                borderColor: school.status === 'open' ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.2)',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 215, 0, 0.1)',
                                transition: { duration: 0.18, ease: [0.33, 0.65, 0, 1] }
                            }, whileTap: { scale: 0.99 }, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-medium text-lg", children: school.name }), _jsx("p", { className: "text-sm text-muted-foreground mt-1.5", children: school.domain })] }), _jsx("div", { className: "flex items-center gap-5 ml-6", children: school.status === 'open' ? (_jsx(motion.div, { className: "text-accent", whileHover: { scale: 1.1 }, transition: { type: "spring", stiffness: 400, damping: 17 }, children: _jsx(ChevronRight, { className: "h-5 w-5" }) })) : (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-right min-w-0", children: _jsxs("div", { className: "text-sm text-muted-foreground font-medium whitespace-nowrap", children: [_jsx("span", { children: school.studentsUntilOpen.toString().charAt(0) }), _jsx("span", { className: "blur-[4px] select-none", style: { filter: 'blur(4px)', textShadow: '0 0 4px currentColor' }, children: school.studentsUntilOpen.toString().slice(1) }), " people till opening"] }) }), _jsx(Lock, { className: "h-5 w-5 text-muted-foreground flex-shrink-0" })] })) })] }) }) }, school.id)))) }) }), _jsx(Dialog, { isOpen: showWaitlistDialog, onClose: handleCloseWaitlist, title: `Join ${waitlistSchool?.name} Waitlist`, description: "Get notified when HIVE launches at your school.", children: _jsxs("div", { className: "mt-6 space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-base", children: "School" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: waitlistSchool?.domain })] }), !userEmail && (_jsxs("div", { children: [_jsx(Label, { htmlFor: "waitlist-email", className: "text-base", children: "Email" }), _jsx(Input, { id: "waitlist-email", type: "email", placeholder: "Enter your email address", value: waitlistEmail, onChange: (e) => setWaitlistEmail(e.target.value), variant: "accent", className: "mt-3", required: true })] })), waitlistError && (_jsx("div", { className: "p-4 rounded-xl bg-surface border border-border", children: _jsx("p", { className: "text-sm text-muted-foreground", children: waitlistError }) })), _jsx(Button, { onClick: handleJoinWaitlist, variant: "ritual", size: "lg", fullWidth: true, disabled: isJoiningWaitlist || (!userEmail && !waitlistEmail), children: isJoiningWaitlist ? 'Joining...' : 'Join Waitlist' })] }) }), _jsx(Dialog, { isOpen: showSuccessDialog, onClose: handleCloseSuccess, title: "You're on the list!", description: "We'll notify you when HIVE launches at your school.", children: _jsx(Button, { onClick: handleCloseSuccess, className: "mt-6", variant: "accent", size: "lg", fullWidth: true, children: "Close" }) })] }));
};
//# sourceMappingURL=school-pick.js.map