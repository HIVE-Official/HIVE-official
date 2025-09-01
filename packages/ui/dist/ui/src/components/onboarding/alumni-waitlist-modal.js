"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Input } from '../../atomic/atoms/input-enhanced.js';
import { Label } from '../label.js';
import { X, Mail, CheckCircle, Loader2, GraduationCap, Star, Users, Calendar } from 'lucide-react';
import { hiveVariants } from '../../lib/motion.js';
export const AlumniWaitlistModal = ({ isOpen, onClose, schoolName, userEmail, }) => {
    const [email, setEmail] = useState(userEmail);
    const [graduationYear, setGraduationYear] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Call waitlist API
            const response = await fetch('/api/auth/alumni-waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    graduationYear,
                    schoolName,
                }),
            });
            if (response.ok) {
                setIsSubmitted(true);
            }
        }
        catch (error) {
            console.error('Failed to join waitlist:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleClose = () => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        onClose();
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: "fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: handleClose, children: _jsxs(motion.div, { className: "bg-surface border border-border rounded-xl p-8 w-full max-w-lg relative overflow-hidden", variants: hiveVariants.scaleIn, initial: "hidden", animate: "visible", exit: "hidden", onClick: (e) => e.stopPropagation(), children: [_jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/5 to-accent/10 rounded-full blur-2xl -translate-y-8 translate-x-8" }), _jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/5 to-accent/10 rounded-full blur-2xl translate-y-8 -translate-x-8" }), _jsx("button", { onClick: handleClose, className: "absolute top-4 right-4 p-2 text-muted hover:text-foreground transition-colors", children: _jsx(X, { className: "w-4 h-4" }) }), !isSubmitted ? (_jsxs(motion.div, { className: "space-y-8 relative z-10", variants: hiveVariants.container, children: [_jsxs(motion.div, { className: "text-center space-y-6", variants: hiveVariants.item, children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(GraduationCap, { className: "w-10 h-10 text-accent" }) }), _jsx("div", { className: "absolute -top-1 -right-1 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center", children: _jsx(Star, { className: "w-3 h-3 text-accent" }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("h2", { className: "text-2xl font-display font-semibold text-foreground", children: ["Welcome back, ", schoolName, " alumni!"] }), _jsx("p", { className: "text-muted font-body text-lg", children: "Join our waitlist to be first to know when alumni features launch" }), _jsxs("div", { className: "flex flex-wrap gap-2 justify-center mt-4", children: [_jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent", children: [_jsx(Users, { className: "w-3 h-3" }), "Alumni Network"] }), _jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent", children: [_jsx(Calendar, { className: "w-3 h-3" }), "Events"] }), _jsxs("div", { className: "inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-xs font-medium text-accent", children: [_jsx(Star, { className: "w-3 h-3" }), "Mentorship"] })] })] })] }), _jsxs(motion.form, { onSubmit: handleSubmit, className: "space-y-6", variants: hiveVariants.item, children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "waitlist-email", className: "text-sm font-medium", children: "Email Address" }), _jsx(Input, { id: "waitlist-email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "your.email@alumni.com", required: true, variant: "secondary", className: "h-12" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "grad-year", className: "text-sm font-medium", children: "Graduation Year" }), _jsx(Input, { id: "grad-year", type: "number", value: graduationYear, onChange: (e) => setGraduationYear(e.target.value), placeholder: "2020", min: "1950", max: new Date().getFullYear() + 10, required: true, variant: "secondary", className: "h-12" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Button, { type: "submit", variant: "primary", size: "lg", className: "w-full h-12", disabled: isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-5 h-5 animate-spin mr-2" }), "Joining Waitlist..."] })) : (_jsxs(_Fragment, { children: [_jsx(Mail, { className: "w-5 h-5 mr-2" }), "Join Alumni Waitlist"] })) }), _jsx("div", { className: "text-center pt-2", children: _jsx("p", { className: "text-xs text-muted font-body", children: "\uD83D\uDD12 We respect your privacy. No spam, just important updates." }) })] })] })] })) : (_jsxs(motion.div, { className: "text-center space-y-8 relative z-10", variants: hiveVariants.container, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { className: "space-y-6", variants: hiveVariants.item, children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(CheckCircle, { className: "w-10 h-10 text-accent" }) }), _jsx("div", { className: "absolute -top-2 -left-2 w-4 h-4 text-accent animate-pulse", children: "\u2728" }), _jsx("div", { className: "absolute -top-1 -right-3 w-3 h-3 text-accent animate-pulse delay-300", children: "\u2B50" }), _jsx("div", { className: "absolute -bottom-2 left-1 w-3 h-3 text-accent animate-pulse delay-150", children: "\u2728" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h2", { className: "text-2xl font-display font-semibold text-foreground", children: "You're on the list!" }), _jsxs("p", { className: "text-muted font-body text-lg", children: ["We'll email you when alumni features are ready. Stay connected to your ", schoolName, " community."] }), _jsxs("div", { className: "bg-surface-01 border border-border rounded-lg p-4 mt-6", children: [_jsx("h3", { className: "text-sm font-medium text-foreground mb-3", children: "What to expect:" }), _jsxs("div", { className: "space-y-2 text-left", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-muted", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-accent" }), "Exclusive early access to alumni features"] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-accent" }), "Alumni networking and mentorship tools"] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-muted", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-accent" }), schoolName, " alumni events and opportunities"] })] })] })] })] }), _jsx(motion.div, { variants: hiveVariants.item, children: _jsx(Button, { onClick: handleClose, variant: "secondary", size: "lg", className: "w-full h-12", children: "Close" }) })] }))] }) })) }));
};
//# sourceMappingURL=alumni-waitlist-modal.js.map