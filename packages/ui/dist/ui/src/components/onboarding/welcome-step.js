"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../button';
import { Heading, Typography } from '../typography';
import { motion } from 'framer-motion';
export const WelcomeStep = ({ onNext }) => {
    return (_jsxs(motion.div, { className: "text-center", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, children: [_jsx(Heading, { level: 1, className: "mb-4", children: "Welcome to HIVE" }), _jsx(Typography, { variant: "lead", className: "mb-8 text-muted-foreground", children: "The social platform for your school. Let's get your profile set up in a few simple steps." }), _jsx(Button, { onClick: onNext, size: "lg", children: "Let's Go" })] }));
};
//# sourceMappingURL=welcome-step.js.map