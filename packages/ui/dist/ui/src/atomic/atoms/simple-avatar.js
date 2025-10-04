import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar.js";
import { cn } from "@/lib/utils";
const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
};
/**
 * SimpleAvatar - A convenience wrapper around the compound Avatar component
 * that accepts src, fallback, and size props directly for common use cases.
 */
export const SimpleAvatar = React.forwardRef(({ src, fallback, size = "md", children, className, ...props }, ref) => {
    return (_jsxs(Avatar, { ref: ref, className: cn(sizeClasses[size], className), ...props, children: [src && _jsx(AvatarImage, { src: src }), _jsx(AvatarFallback, { children: fallback || children })] }));
});
SimpleAvatar.displayName = "SimpleAvatar";
//# sourceMappingURL=simple-avatar.js.map