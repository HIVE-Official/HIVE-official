import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const badgeVariants = cva("inline-flex items-center rounded-full border border-[var(--hive-border-default)] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)] focus:ring-offset-2", {
    variants: {
        variant: {
            default: "bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]",
            secondary: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]",
            destructive: "bg-[var(--hive-status-error)] text-[var(--hive-status-error-text)] hover:bg-[var(--hive-status-error)]/80",
            success: "bg-[var(--hive-status-success)] text-[var(--hive-status-success-text)] hover:bg-[var(--hive-status-success)]/80",
            warning: "bg-[var(--hive-status-warning)] text-[var(--hive-status-warning-text)] hover:bg-[var(--hive-status-warning)]/80",
            outline: "bg-transparent text-[var(--hive-text-primary)] border-[var(--hive-border-strong)]",
            pill: "bg-[color-mix(in_srgb,var(--hive-background-secondary) 85%,transparent)] text-[var(--hive-text-secondary)] border-[color-mix(in_srgb,var(--hive-border-default) 60%,transparent)]",
            // University class year variants
            freshman: "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
            sophomore: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
            // Class year variants (continued)
            junior: "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200",
            senior: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200",
            // Skill and activity variants
            "skill-tag": "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200",
            "building-tools": "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200",
            // Additional variants for profiles and spaces
            primary: "bg-[var(--hive-accent)] text-white hover:bg-[var(--hive-accent)]/90",
            "prof-favorite": "bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200",
            "major-tag": "bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200",
            "active-tag": "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200",
            "tool-tag": "bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200",
            leadership: "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200",
        },
        tone: {
            default: "",
            muted: "bg-[color-mix(in_srgb,var(--hive-background-tertiary) 85%,transparent)] text-[var(--hive-text-secondary)] border-[color-mix(in_srgb,var(--hive-border-default) 60%,transparent)]",
            contrast: "bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)] border-transparent shadow-[0_8px_20px_rgba(0,0,0,0.32)]",
        },
    },
    defaultVariants: {
        variant: "default",
        tone: "default",
    },
});
function Badge({ className, variant, tone, ...props }) {
    return (_jsx("div", { className: cn(badgeVariants({ variant, tone }), className), ...props }));
}
export { Badge, badgeVariants };
//# sourceMappingURL=badge.js.map