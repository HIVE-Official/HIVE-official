"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { cn } from '@/lib/utils';
export const EmailGate = ({ schoolName, schoolDomain, schoolId, onBack, className, onSuccess, showTermsAndPrivacy = true, backLinkHref }) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const validateEmail = (email) => {
        const eduRegex = /^[^@]+@[^@]+\.edu$/i;
        return eduRegex.test(email);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!validateEmail(email)) {
            setError('Please enter a valid .edu email address');
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/auth/email/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, schoolId }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to send magic link');
            }
            // Store email in localStorage for verification
            if (typeof window !== 'undefined') {
                localStorage.setItem('hive-auth-email', email);
            }
            setIsSuccess(true);
            // In development mode with dev_verify_url, redirect immediately
            if (data.dev_mode && data.dev_verify_url) {
                setTimeout(() => {
                    window.location.href = data.dev_verify_url;
                }, 1000);
            }
            // Call success callback
            onSuccess?.(email);
        }
        catch (err) {
            const error = err;
            setError(error.message || 'Failed to send magic link. Please try again.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("w-full max-w-md", className), children: _jsx("div", { className: "bg-surface border border-border rounded-lg p-6", children: isSuccess ? (_jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "flex justify-center", children: _jsx(CheckCircle, { className: "w-12 h-12 text-accent" }) }), _jsx("h2", { className: "text-xl font-semibold text-white font-display", children: "Check Your Email" }), _jsxs("p", { className: "text-muted-foreground", children: ["We sent a magic link to ", _jsx("span", { className: "text-white font-medium", children: email }), ". Click it to continue to HIVE."] }), _jsx("div", { className: "text-xs text-muted-foreground mt-4", children: "Didn't receive it? Check your spam folder or try again." })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "text-center space-y-4 mb-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx(Mail, { className: "w-12 h-12 text-white" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-semibold text-white font-display", children: ["Join ", schoolName] }), _jsxs("p", { className: "text-muted-foreground mt-1", children: ["Enter your ", schoolDomain, " email to continue"] })] })] }), error && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, className: "bg-surface/50 border border-border rounded-lg p-3 mb-4", children: _jsxs("div", { className: "flex items-center gap-2 text-muted-foreground text-sm", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), error] }) })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "email", className: "sr-only", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: `you@${schoolDomain}`, value: email, onChange: (e) => {
                                            setEmail(e.target.value);
                                            setError(null); // Clear error when user types
                                        }, className: "bg-primary border-border", required: true, disabled: isSubmitting })] }), _jsxs("div", { className: "flex gap-2", children: [onBack && (_jsx(Button, { type: "button", variant: "outline", onClick: onBack, disabled: isSubmitting, children: "Back" })), _jsx(Button, { type: "submit", variant: "ritual", size: "lg", className: "w-full font-semibold", disabled: isSubmitting || !email.trim(), children: isSubmitting ? (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex items-center gap-2", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Sending..."] })) : ('Send Magic Link') })] }), showTermsAndPrivacy && (_jsxs("div", { className: "mt-4 text-xs text-center text-muted-foreground", children: ["By continuing, you agree to HIVE's", ' ', _jsx("a", { href: "/legal/terms", className: "underline hover:text-foreground transition-colors", children: "Terms of Service" }), ' ', "and", ' ', _jsx("a", { href: "/legal/privacy", className: "underline hover:text-foreground transition-colors", children: "Privacy Policy" }), "."] })), backLinkHref && (_jsx("div", { className: "mt-2 text-center", children: _jsx("a", { href: backLinkHref, className: "text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors", children: "Back" }) }))] })] })) }) }));
};
//# sourceMappingURL=email-gate.js.map