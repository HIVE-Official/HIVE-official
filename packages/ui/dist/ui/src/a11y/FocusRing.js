import * as React from "react";
import { cn } from "@/lib/utils";
/**
 * FocusRing ensures every interactive element renders a consistent, high-contrast outline
 * that respects reduced motion and user theme tokens.
 */
export function FocusRing({ children, color = "var(--hive-focus-ring,#ffd166)", offset = 3, within = false, radius, className, }) {
    const focusClass = within
        ? "focus-within:outline focus-within:outline-2 focus-within:outline-[var(--focus-ring-color,#ffd166)] focus-within:outline-offset-[var(--focus-ring-offset,3px)] focus-within:rounded-[var(--focus-ring-radius,inherit)]"
        : "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--focus-ring-color,#ffd166)] focus-visible:outline-offset-[var(--focus-ring-offset,3px)] focus-visible:rounded-[var(--focus-ring-radius,inherit)]";
    const childStyle = children.props.style ?? {};
    const mergedStyle = {
        ...childStyle,
        "--focus-ring-color": color,
        "--focus-ring-offset": typeof offset === "number" ? `${offset}px` : offset,
        ...(radius !== undefined
            ? { "--focus-ring-radius": typeof radius === "number" ? `${radius}px` : radius }
            : {}),
    };
    return React.cloneElement(children, {
        className: cn("transition-shadow duration-150 ease-out outline-none", focusClass, className, children.props.className),
        style: mergedStyle,
    });
}
//# sourceMappingURL=FocusRing.js.map