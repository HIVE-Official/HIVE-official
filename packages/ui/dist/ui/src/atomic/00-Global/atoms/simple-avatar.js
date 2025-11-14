import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar.js";
/**
 * SimpleAvatar - A convenience wrapper around the compound Avatar component
 * that accepts src and fallback props directly for common use cases.
 */
export const SimpleAvatar = React.forwardRef(({ src, fallback, children, ...props }, ref) => {
    return (_jsxs(Avatar, { ref: ref, ...props, children: [src && _jsx(AvatarImage, { src: src }), _jsx(AvatarFallback, { children: fallback || children })] }));
});
SimpleAvatar.displayName = "SimpleAvatar";
//# sourceMappingURL=simple-avatar.js.map