import * as React from "react";
export interface CheckIconProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Size of the check icon container */
    size?: "sm" | "md" | "lg" | "xl";
    /** Variant style for the check icon */
    variant?: "default" | "success" | "minimal";
    /** Whether to show the icon (for animation purposes) */
    checked?: boolean;
    /** Custom icon to use instead of Check */
    icon?: React.ReactNode;
}
/**
 * CheckIcon Component
 *
 * A reusable check icon with gold background and black icon by default,
 * ensuring proper contrast for accessibility.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <CheckIcon checked={true} />
 *
 * // Different sizes
 * <CheckIcon size="lg" checked={isCompleted} />
 *
 * // Custom styling
 * <CheckIcon variant="success" checked={true} />
 * ```
 */
export declare const CheckIcon: React.ForwardRefExoticComponent<CheckIconProps & React.RefAttributes<HTMLDivElement>>;
export { CheckIcon as default };
//# sourceMappingURL=check-icon.d.ts.map