"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { MotionDiv, MotionSpan } from "./motion-wrapper";
const calculateTimeLeft = (targetDate) => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
        return null;
    }
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};
const NumberBox = ({ value, label }) => (_jsxs(MotionDiv, { className: "flex flex-col items-center", initial: { opacity: 0, scale: 0.8, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: {
        duration: 0.18,
        ease: [0.33, 0.65, 0, 1]
    }, children: [_jsx("div", { className: "relative bg-transparent rounded-lg border border-[#FFD700]/30 p-3 sm:p-4 w-[60px] sm:w-[80px] md:w-[100px] overflow-hidden", children: _jsx("div", { className: "relative h-[30px] sm:h-[36px] md:h-[44px] flex items-center justify-center", children: _jsx(MotionSpan, { className: "font-mono text-2xl sm:text-3xl md:text-4xl font-normal text-[#FFD700]/90", initial: { opacity: 0, y: 10, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: {
                        duration: 0.24,
                        ease: [0.33, 0.65, 0, 1]
                    }, children: value.toString().padStart(2, '0') }, value) }) }), _jsx("span", { className: "mt-2 text-xs sm:text-sm font-sans text-[#FFD700]/60 uppercase tracking-wider", children: label })] }));
export const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);
    if (!timeLeft) {
        return (_jsx("div", { className: "text-center font-display text-2xl text-foreground", children: "Launch time!" }));
    }
    return (_jsxs("div", { className: "flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8", children: [_jsx(NumberBox, { value: timeLeft.days, label: "Days" }), _jsx(NumberBox, { value: timeLeft.hours, label: "Hours" }), _jsx(NumberBox, { value: timeLeft.minutes, label: "Minutes" }), _jsx(NumberBox, { value: timeLeft.seconds, label: "Seconds" })] }));
};
//# sourceMappingURL=countdown.js.map