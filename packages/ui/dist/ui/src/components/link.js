import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const Link = React.forwardRef(({ href, children, className, ...props }, ref) => {
    return (_jsx("a", { href: href, ref: ref, className: cn("text-foreground underline-offset-4 hover:underline hover:text-accent transition-colors", className), ...props, children: children }));
});
Link.displayName = "Link";
export { Link };
//# sourceMappingURL=link.js.map