"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
const RitualProgressRing = React.forwardRef(({ className, personal, campus, target = 100, size = "md", showLabels = true, ...props }, ref) => {
    const sizeConfig = {
        sm: { ring: 80, stroke: 6, fontSize: "text-lg" },
        md: { ring: 120, stroke: 8, fontSize: "text-2xl" },
        lg: { ring: 160, stroke: 10, fontSize: "text-3xl" },
    };
    const config = sizeConfig[size];
    const radius = (config.ring - config.stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = config.ring / 2;
    // Calculate dash offsets for progress
    const personalOffset = circumference - (personal / 100) * circumference;
    const campusOffset = circumference - (campus / 100) * circumference;
    return (_jsxs("div", { ref: ref, className: cn("flex flex-col items-center gap-4", className), ...props, children: [_jsxs("div", { className: "relative", style: { width: config.ring, height: config.ring }, children: [_jsxs("svg", { width: config.ring, height: config.ring, className: "transform -rotate-90", children: [_jsx("circle", { cx: center, cy: center, r: radius, fill: "none", stroke: "rgba(255,255,255,0.08)", strokeWidth: config.stroke }), _jsx("circle", { cx: center, cy: center, r: radius, fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: config.stroke, strokeDasharray: circumference, strokeDashoffset: campusOffset, strokeLinecap: "round", className: "transition-all duration-smooth ease-liquid" }), _jsx("circle", { cx: center, cy: center, r: radius - config.stroke - 2, fill: "none", stroke: "#FFD700", strokeWidth: config.stroke - 2, strokeDasharray: circumference, strokeDashoffset: personalOffset, strokeLinecap: "round", className: "transition-all duration-smooth ease-liquid", style: {
                                    filter: "drop-shadow(0 0 8px rgba(255, 215, 0, 0.4))",
                                } })] }), _jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [_jsxs("div", { className: cn("font-bold text-white", config.fontSize), children: [personal, "%"] }), _jsx("div", { className: "text-xs text-white/50 font-medium", children: "personal" })] })] }), showLabels && (_jsxs("div", { className: "flex gap-6 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-[#FFD700]" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-xs text-white/50", children: "Your Progress" }), _jsxs("span", { className: "font-semibold text-white", children: [personal, "%"] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-white/30" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-xs text-white/50", children: "Campus" }), _jsxs("span", { className: "font-semibold text-white", children: [campus, "%"] })] })] })] }))] }));
});
RitualProgressRing.displayName = "RitualProgressRing";
export { RitualProgressRing };
//# sourceMappingURL=ritual-progress-ring.js.map