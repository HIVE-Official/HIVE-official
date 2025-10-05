import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (_jsx("input", { type: type, className: cn("flex h-9 w-full rounded-md border border-white/12 bg-[#0c0c0c] px-3 py-1 text-sm text-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-white/40 focus:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50", className), ref: ref, ...props }));
});
Input.displayName = "Input";
export { Input };
//# sourceMappingURL=input.js.map