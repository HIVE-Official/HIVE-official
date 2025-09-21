import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const badgeVariants = cva("inline-flex items-center rounded-full border border-[var(--hive-border-default)] px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)] focus:ring-offset-2", {
    variants: {
        variant: {
            default: "bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-secondary)]",
            secondary: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]",
            destructive: "bg-[var(--hive-status-error)] text-[var(--hive-status-error-text)] hover:bg-[var(--hive-status-error)]/80",
            success: "bg-[var(--hive-status-success)] text-[var(--hive-status-success-text)] hover:bg-[var(--hive-status-success)]/80",
            warning: "bg-[var(--hive-status-warning)] text-[var(--hive-status-warning-text)] hover:bg-[var(--hive-status-warning)]/80",
            outline: "bg-transparent text-[var(--hive-text-primary)] border-[var(--hive-border-strong)]",
            // University class year variants
            freshman: "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
            sophomore: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
            // Skill and activity variants
            "skill-tag": "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200",
            "building-tools": "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
function Badge({ className, variant, ...props }) {
    return (_jsx("div", { className: cn(badgeVariants({ variant }), className), ...props }));
}
export { Badge, badgeVariants };
//# sourceMappingURL=badge.js.map