import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../../lib/utils.js";
const Skeleton = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn("animate-pulse rounded-md bg-[var(--hive-background-tertiary)]", className), ...props }));
});
Skeleton.displayName = "Skeleton";
export { Skeleton };
//# sourceMappingURL=skeleton.js.map