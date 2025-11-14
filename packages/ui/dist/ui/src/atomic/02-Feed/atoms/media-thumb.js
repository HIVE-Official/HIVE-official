"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Play, Image as ImageIcon, Video, Music } from "lucide-react";
import { cn } from "../../../lib/utils.js";
/**
 * Lightweight media thumbnail for images/video/audio with overlay badges.
 * Button-based for keyboard accessibility; surface-agnostic.
 */
export function MediaThumb({ type = "image", src, alt = "", badges = [], ratio = "16:9", onActivate, className, disabled, ...props }) {
    const padding = ratio === "1:1" ? "pb-[100%]" : ratio === "4:3" ? "pb-[75%]" : "pb-[56.25%]";
    const Icon = type === "audio" ? Music : type === "video" ? Video : ImageIcon;
    return (_jsx("button", { type: "button", disabled: disabled, onClick: onActivate, className: cn("group relative w-full overflow-hidden rounded-xl border outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]", "border-[color-mix(in_srgb,var(--hive-border-subtle,#2E2F39)_65%,transparent)]", "bg-[color-mix(in_srgb,var(--hive-background-overlay,#0C0D11)_30%,transparent)]", className), ...props, children: _jsxs("div", { className: cn("relative w-full", padding), children: [src ? (
                // eslint-disable-next-line @next/next/no-img-element
                _jsx("img", { src: src, alt: alt, className: "absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none", loading: "lazy" })) : (_jsx("div", { className: "absolute inset-0 flex items-center justify-center text-[var(--hive-text-secondary)]", children: _jsx(Icon, { className: "h-7 w-7", "aria-hidden": true }) })), _jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/10" }), badges.length > 0 && (_jsx("div", { className: "absolute left-2 top-2 flex flex-wrap gap-1", children: badges.map((b, i) => (_jsx("span", { className: "inline-flex items-center rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm", children: typeof b === "string" ? b : b.label }, i))) })), type !== "image" && (_jsxs("span", { className: "pointer-events-none absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white/90", children: [_jsx(Play, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsxs("span", { className: "sr-only", children: ["Play ", type] }), _jsx("span", { className: "hidden sm:inline", children: "Play" })] }))] }) }));
}
//# sourceMappingURL=media-thumb.js.map