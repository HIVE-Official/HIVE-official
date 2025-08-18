import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (_jsx(CheckboxPrimitive.Root, { ref: ref, className: cn("peer h-4 w-4 shrink-0 rounded-sm border border-border ring-offset-background transition-all duration-fast ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary hover:border-accent/50", className), ...props, children: _jsx(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: _jsx(Check, { className: "h-3 w-3" }) }) })));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
const IndeterminateIcon = ({ size = "default" }) => {
    const iconSize = {
        sm: "w-2.5 h-2.5",
        default: "w-3 h-3",
        lg: "w-3.5 h-3.5",
        xl: "w-4 h-4",
    };
    return (_jsx("div", { className: cn("bg-current rounded-sm", iconSize[size || "default"], "h-0.5") }));
};
export { Checkbox, CheckboxGroup, CheckboxCard, checkboxVariants };
//# sourceMappingURL=checkbox.js.map