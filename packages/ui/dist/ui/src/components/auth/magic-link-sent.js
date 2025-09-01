'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
export const MagicLinkSent = ({ email, school, onBack, onResend, className }) => {
    const [isResending, setIsResending] = React.useState(false);
    const handleResendClick = async () => {
        setIsResending(true);
        await onResend();
        // Add a small delay to show feedback
        setTimeout(() => setIsResending(false), 1000);
    };
    return (_jsxs("div", { className: className, children: [_jsx(motion.div, { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 0.4, delay: 0.1, ease: [0.68, -0.55, 0.265, 1.55] }, className: "w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-accent/20", children: _jsx(Mail, { className: "h-10 w-10 text-accent" }) }), _jsx("h1", { className: "text-h2 font-display font-semibold text-center mb-2", children: "Check your email" }), _jsxs("p", { className: "text-body text-muted text-center mb-8", children: ["We sent a magic link to ", _jsx("br", {}), _jsx("strong", { className: "text-foreground", children: email })] }), _jsxs("p", { className: "text-body-sm text-muted text-center mb-6", children: ["Click the link in your email to complete sign-in at ", school.name, ". It will expire in 10 minutes."] }), _jsx(Button, { variant: "primary", size: "lg", fullWidth: true, onClick: handleResendClick, loading: isResending, children: isResending ? 'Sending...' : 'Resend Magic Link' }), _jsx("div", { className: "text-center mt-6", children: _jsxs(Button, { onClick: onBack, variant: "ghost", className: "text-muted hover:text-foreground", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back to school selection"] }) }), _jsx("p", { className: "text-caption text-muted text-center mt-8", children: "Having trouble? Check your spam folder or contact support." })] }));
};
//# sourceMappingURL=magic-link-sent.js.map