import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";
const Switch = React.forwardRef(({ className, ...props }, ref) => (_jsx(SwitchPrimitives.Root, { className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#FFD700] data-[state=unchecked]:bg-white/20", className), ...props, ref: ref, children: _jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-white ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=checked]:bg-black data-[state=unchecked]:translate-x-0") }) })));
Switch.displayName = SwitchPrimitives.Root.displayName;
export { Switch };
//# sourceMappingURL=switch.js.map