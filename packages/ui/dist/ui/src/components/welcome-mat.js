'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from './card';
import { cn } from '../lib/utils';
export function WelcomeMat({ isVisible, onDismiss, userName, className, }) {
    return (_jsx(AnimatePresence, { children: isVisible && (_jsx(motion.div, { className: cn('fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md', className), initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: _jsx(motion.div, { initial: { scale: 0.95, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.95, opacity: 0 }, transition: { duration: 0.18 }, children: _jsxs(Card, { className: "w-[340px] max-w-full text-center", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "You're in \u2014 welcome to HIVE!" }), _jsxs(CardDescription, { children: [userName ? `Hello ${userName}! ` : '', "Explore spaces and connect with your campus."] })] }), _jsxs(CardContent, { className: "flex flex-col gap-3 pt-0", children: [_jsx(Button, { onClick: onDismiss, children: "Explore Spaces" }), _jsx(Button, { variant: "outline", onClick: onDismiss, children: "View your profile \u2192" })] })] }) }) })) }));
}
export function useWelcomeMat() {
    const [isVisible, setIsVisible] = React.useState(false);
    const [hasCheckedStorage, setHasCheckedStorage] = React.useState(false);
    React.useEffect(() => {
        const dismissed = typeof window !== 'undefined' &&
            window.localStorage.getItem('welcomeMatDismissed');
        if (!dismissed) {
            setIsVisible(true);
        }
        setHasCheckedStorage(true);
    }, []);
    const dismissWelcomeMat = React.useCallback(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('welcomeMatDismissed', 'true');
        }
        setIsVisible(false);
    }, []);
    return { isVisible, dismissWelcomeMat, hasCheckedStorage };
}
//# sourceMappingURL=welcome-mat.js.map