"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, AlertCircle, Clock, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Alert } from '../alert.js';
import { Card, CardHeader, CardContent, CardFooter } from '../card.js';
import { cn } from '../../lib/utils.js';
export const EmailVerification = ({ email, schoolName, onBack, onResend, className, expirationMinutes = 10 }) => {
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(expirationMinutes * 60);
    const [resendCount, setResendCount] = useState(0);
    // Countdown timer for link expiration
    useEffect(() => {
        if (timeRemaining <= 0)
            return;
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeRemaining]);
    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown <= 0)
            return;
        const timer = setInterval(() => {
            setResendCooldown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [resendCooldown]);
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    const handleResend = async () => {
        if (!onResend || isResending || resendCooldown > 0)
            return;
        setIsResending(true);
        try {
            await onResend();
            setResendCount(prev => prev + 1);
            setTimeRemaining(expirationMinutes * 60); // Reset expiration timer
            setResendCooldown(30); // 30 second cooldown between resends
        }
        catch (error) {
            console.error('Failed to resend email:', error);
        }
        finally {
            setIsResending(false);
        }
    };
    const openEmailApp = () => {
        // Try to open default email client
        window.location.href = 'mailto:';
    };
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("w-full max-w-md mx-auto", className), children: _jsxs(Card, { variant: "elevated", padding: "lg", children: [_jsxs(CardHeader, { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Mail, { className: "w-8 h-8 text-accent" }) }), _jsx("h2", { className: "text-2xl font-semibold", children: "Check your email" }), _jsxs("p", { className: "text-base text-muted-foreground", children: ["We've sent a magic link to ", _jsx("span", { className: "text-[var(--hive-text-inverse)] font-medium", children: email })] })] }), _jsxs(CardContent, { className: "space-y-6", children: [timeRemaining > 0 ? (_jsxs(Alert, { variant: "primary", children: [_jsx(Clock, { className: "w-4 h-4" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Magic link sent!" }), _jsxs("p", { className: "text-sm", children: ["Click the link in your email to sign in to ", schoolName, ".", timeRemaining > 0 && (_jsxs(_Fragment, { children: [" Expires in ", _jsx("span", { className: "font-mono", children: formatTime(timeRemaining) }), "."] }))] })] })] })) : (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Link expired" }), _jsx("p", { className: "text-sm", children: "Your magic link has expired. Request a new one to continue." })] })] })), _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { variant: "secondary", className: "w-full", onClick: openEmailApp, children: [_jsx(ExternalLink, { className: "w-4 h-4 mr-2" }), "Open email app"] }), _jsx(Button, { variant: timeRemaining > 0 ? "ghost" : "primary", className: "w-full", onClick: handleResend, disabled: isResending || resendCooldown > 0, children: isResending ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }), "Sending..."] })) : resendCooldown > 0 ? (`Resend in ${resendCooldown}s`) : (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2" }), "Resend magic link"] })) })] }), _jsxs("div", { className: "bg-surface/50 rounded-lg p-4 space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-inverse)]", children: "Didn't receive the email?" }), _jsxs("ul", { className: "text-xs text-muted space-y-1", children: [_jsx("li", { children: "\u2022 Check your spam or junk folder" }), _jsx("li", { children: "\u2022 Make sure you entered your email correctly" }), _jsx("li", { children: "\u2022 Email delivery may take a few minutes" }), _jsx("li", { children: "\u2022 Contact support if problems persist" })] })] }), resendCount > 0 && (_jsxs("div", { className: "text-xs text-muted text-center", children: ["Magic link sent ", resendCount + 1, " time", resendCount > 0 ? 's' : ''] }))] }), _jsx(CardFooter, { children: onBack && (_jsx(Button, { variant: "ghost", className: "w-full", onClick: onBack, children: "\u2190 Try a different email" })) })] }) }));
};
//# sourceMappingURL=email-verification.js.map