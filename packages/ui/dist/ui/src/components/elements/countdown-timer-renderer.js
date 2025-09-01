"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE CountdownTimer Element Renderer
 * Renders countdown timers within tools
 * Uses standard style system for consistent output
 */
import { useState, useEffect } from 'react';
import { Label } from '../../ui/label';
import { Clock } from 'lucide-react';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles.js';
export const CountdownTimerRenderer = ({ element, config, onStateChange, runtimeContext }) => {
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0
    });
    const [isComplete, setIsComplete] = useState(false);
    // Calculate time remaining
    const calculateTimeRemaining = () => {
        const targetTime = new Date(config.targetDate).getTime();
        const currentTime = new Date().getTime();
        const difference = targetTime - currentTime;
        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
        }
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds, total: difference };
    };
    // Update timer every second
    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = calculateTimeRemaining();
            setTimeRemaining(remaining);
            // Check if countdown is complete
            if (remaining.total <= 0 && !isComplete) {
                setIsComplete(true);
                // Handle completion action
                if (config.onComplete) {
                    switch (config.onComplete.type) {
                        case 'message':
                            alert(config.onComplete.value);
                            break;
                        case 'redirect':
                            window.location.href = config.onComplete.value;
                            break;
                        case 'trigger':
                            // Trigger custom event
                            if (onStateChange) {
                                onStateChange({
                                    completed: true,
                                    completedAt: Date.now(),
                                    triggerValue: config.onComplete.value
                                });
                            }
                            break;
                    }
                }
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [config.onComplete, config.targetDate, isComplete, onStateChange]);
    // Format display based on config
    const formatTimeDisplay = (time) => {
        if (isComplete) {
            return "Time's up!";
        }
        switch (config.format) {
            case 'days':
                return `${Math.ceil(time.total / (1000 * 60 * 60 * 24))} days`;
            case 'hours':
                return `${Math.ceil(time.total / (1000 * 60 * 60))} hours`;
            case 'minutes':
                return `${Math.ceil(time.total / (1000 * 60))} minutes`;
            case 'seconds':
                return `${Math.ceil(time.total / 1000)} seconds`;
            case 'dhms':
            default:
                const parts = [];
                if (time.days > 0)
                    parts.push(`${time.days}d`);
                if (time.hours > 0)
                    parts.push(`${time.hours}h`);
                if (time.minutes > 0)
                    parts.push(`${time.minutes}m`);
                if (time.seconds > 0 || parts.length === 0)
                    parts.push(`${time.seconds}s`);
                return parts.join(' ');
        }
    };
    return (_jsxs("div", { className: `space-y-2 ${classes.container} ${classes.spacing}`, style: styles, children: [config.label && (_jsx(Label, { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: config.label })), _jsxs("div", { className: `
        flex items-center space-x-2 p-3 rounded-lg border border-[var(--hive-border)] ${classes.element}
        ${isComplete ? 'bg-red-50 border-red-200' : 'bg-[var(--hive-background-secondary)]'}
      `, children: [_jsx(Clock, { className: `w-5 h-5 ${isComplete ? 'text-red-500' : 'text-[var(--hive-primary)]'}` }), _jsxs("div", { className: "flex-1", children: [_jsx("div", { className: `
            text-lg font-mono font-semibold
            ${isComplete ? 'text-red-600' : 'text-[var(--hive-text-primary)]'}
          `, children: formatTimeDisplay(timeRemaining) }), !isComplete && (_jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)]", children: ["Until ", new Date(config.targetDate).toLocaleDateString()] }))] })] }), isComplete && config.onComplete?.value && (_jsx("div", { className: "text-sm text-red-600 bg-red-50 p-2 rounded border border-red-200", children: config.onComplete.value }))] }));
};
//# sourceMappingURL=countdown-timer-renderer.js.map