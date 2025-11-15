"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
export function useCountdown(target) {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    const remaining = Math.max(0, target - now);
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return { days, hours, minutes, seconds, completed: remaining === 0 };
}
export function Countdown({ target, className, label = ["Days", "Hours", "Minutes", "Seconds"], }) {
    const t = useCountdown(target);
    return (_jsx("div", { className: cn("grid grid-cols-4 gap-3 rounded-2xl border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] p-5", className), "aria-live": "polite", children: [
            { l: label[0], v: t.days },
            { l: label[1], v: t.hours },
            { l: label[2], v: t.minutes },
            { l: label[3], v: t.seconds },
        ].map((p) => (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "text-3xl font-semibold tabular-nums text-[var(--hive-text-primary)]", children: String(p.v).padStart(2, "0") }), _jsx("div", { className: "mt-1 text-xs uppercase tracking-wider text-[var(--hive-text-tertiary)]", children: p.l })] }, p.l))) }));
}
//# sourceMappingURL=countdown.js.map