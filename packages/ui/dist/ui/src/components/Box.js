import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils.js";
const Box = React.forwardRef(({ className, ...props }, ref) => {
    return _jsx("div", { ref: ref, className: cn(className), ...props });
});
Box.displayName = "Box";
export { Box };
//# sourceMappingURL=Box.js.map