'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
export const RitualLaunchCountdown = ({ title = 'Launch Countdown', targetTime, ...props }) => {
    const [label, setLabel] = React.useState('');
    React.useEffect(() => {
        const target = new Date(targetTime).getTime();
        const tick = () => {
            const now = Date.now();
            const ms = Math.max(0, target - now);
            const m = Math.round(ms / 60000);
            const h = Math.floor(m / 60);
            const mm = m % 60;
            setLabel(h > 0 ? `${h}h ${mm}m` : `${mm}m`);
        };
        const id = setInterval(tick, 30000);
        tick();
        return () => clearInterval(id);
    }, [targetTime]);
    return (_jsxs(Card, { className: "border-white/10 bg-white/5 p-5", ...props, children: [_jsx("div", { className: "text-xs uppercase tracking-widest text-white/50", children: title }), _jsx("div", { className: "mt-2 text-3xl font-semibold text-white", children: label })] }));
};
//# sourceMappingURL=ritual-launch-countdown.js.map