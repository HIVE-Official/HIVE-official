"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, RefreshCw } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";
export const CheckEmailInfo = ({ email, backLinkHref, }) => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [canResend, setCanResend] = useState(false);
    const [isResending, setIsResending] = useState(false);
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
        else {
            setCanResend(true);
        }
    }, [timeLeft]);
    const handleResend = async () => {
        if (!email)
            return;
        setIsResending(true);
        try {
            // Add resend logic here if needed
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            setTimeLeft(300); // Reset timer
            setCanResend(false);
        }
        catch (error) {
            console.error("Failed to resend email:", error);
        }
        finally {
            setIsResending(false);
        }
    };
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-background p-4", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.18, ease: [0.33, 0.65, 0, 1] }, className: "w-full max-w-md", children: _jsxs("div", { className: "bg-surface border border-border rounded-lg p-8 text-center space-y-6", children: [_jsx("div", { className: "w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center mx-auto", children: _jsx(Mail, { className: "w-5 h-5 text-muted" }) }), _jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "text-xl font-display font-medium text-foreground", children: "Check Your Email" }), _jsxs("p", { className: "text-sm text-muted font-body", children: ["We sent a magic link to", " ", _jsx("span", { className: "text-foreground", children: email || "your email address" })] })] }), _jsxs("div", { className: "space-y-3 pt-2", children: [_jsx(Button, { onClick: handleResend, variant: "outline", disabled: !canResend || isResending, className: "w-full", children: isResending ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "w-4 h-4 mr-2 animate-spin" }), "Sending..."] })) : (canResend ? "Resend Email" : `Resend in ${formatTime(timeLeft)}`) }), _jsx(Button, { asChild: true, variant: "ghost", className: "w-full", children: _jsx(Link, { href: backLinkHref, children: "Back" }) })] })] }) }) }));
};
//# sourceMappingURL=CheckEmailInfo.js.map