"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
export const CountdownTimer = ({ targetDate, onComplete, className, size = 'md', variant = 'default' }) => {
    const [timeLeft, setTimeLeft] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const target = targetDate.getTime();
            const difference = target - now;
            if (difference <= 0) {
                if (!isComplete) {
                    setIsComplete(true);
                    onComplete?.();
                }
                return [
                    { value: 0, label: 'Days', shortLabel: 'D' },
                    { value: 0, label: 'Hours', shortLabel: 'H' },
                    { value: 0, label: 'Minutes', shortLabel: 'M' },
                    { value: 0, label: 'Seconds', shortLabel: 'S' }
                ];
            }
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            return [
                { value: days, label: 'Days', shortLabel: 'D' },
                { value: hours, label: 'Hours', shortLabel: 'H' },
                { value: minutes, label: 'Minutes', shortLabel: 'M' },
                { value: seconds, label: 'Seconds', shortLabel: 'S' }
            ];
        };
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate, isComplete, onComplete]);
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return {
                    container: 'gap-2',
                    timeBox: 'p-2 min-w-[40px]',
                    value: 'text-lg font-bold',
                    label: 'text-xs'
                };
            case 'lg':
                return {
                    container: 'gap-6',
                    timeBox: 'p-6 min-w-[80px]',
                    value: 'text-4xl font-bold',
                    label: 'text-sm'
                };
            default: // md
                return {
                    container: 'gap-4',
                    timeBox: 'p-4 min-w-[60px]',
                    value: 'text-2xl font-bold',
                    label: 'text-xs'
                };
        }
    };
    const getVariantClasses = () => {
        switch (variant) {
            case 'accent':
                return {
                    timeBox: 'bg-accent/10 border-2 border-accent/50 hover:border-accent text-accent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]',
                    value: 'text-accent font-bold',
                    label: 'text-accent/80'
                };
            case 'minimal':
                return {
                    timeBox: 'bg-transparent border-2 border-border/30 hover:border-accent/50 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]',
                    value: 'text-white font-bold',
                    label: 'text-muted'
                };
            default:
                return {
                    timeBox: 'bg-surface border-2 border-border hover:border-accent/50 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]',
                    value: 'text-white font-bold',
                    label: 'text-muted'
                };
        }
    };
    const sizeClasses = getSizeClasses();
    const variantClasses = getVariantClasses();
    if (isComplete) {
        return (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: cn("text-center", className), children: _jsx("div", { className: "text-accent text-xl font-semibold", children: "\uD83C\uDF89 HIVE is Live!" }) }));
    }
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: cn("flex items-center justify-center", sizeClasses.container, className), children: timeLeft.map((unit, index) => (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: index * 0.1 }, className: cn("flex flex-col items-center rounded-lg transition-all duration-300", sizeClasses.timeBox, variantClasses.timeBox), children: [_jsx(motion.div, { initial: { y: -10, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.3 }, className: cn("font-mono leading-none", sizeClasses.value, variantClasses.value), children: unit.value.toString().padStart(2, '0') }, unit.value), _jsx("div", { className: cn("uppercase tracking-wider font-medium mt-1", sizeClasses.label, variantClasses.label), children: size === 'sm' ? unit.shortLabel : unit.label })] }, unit.label))) }));
};
//# sourceMappingURL=countdown-timer.js.map