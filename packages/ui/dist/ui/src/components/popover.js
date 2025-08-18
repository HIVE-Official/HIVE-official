import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const popoverContentVariants = cva("z-50 rounded-xl border bg-background p-4 text-white shadow-lg transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] outline-none", {
    variants: {
        variant: {
            default: [
                "border-border bg-background",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            ],
            elevated: [
                "border-accent bg-background shadow-xl",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            ],
            minimal: [
                "border-border/50 bg-surface backdrop-blur-sm",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            ],
            accent: [
                "border-accent/30 bg-accent/5",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            ]
        },
        size: {
            sm: "w-64 p-3",
            md: "w-80 p-4",
            lg: "w-96 p-6",
            auto: "min-w-64 max-w-md p-4"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "md"
    }
});
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverContent = React.forwardRef(({ className, variant, size, align = "center", sideOffset = 4, ...props }, ref) => (_jsx(PopoverPrimitive.Portal, { children: _jsx(PopoverPrimitive.Content, { ref: ref, align: align, sideOffset: sideOffset, className: cn(popoverContentVariants({ variant, size }), "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }) })));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
const PopoverHeader = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4", className), ...props })));
PopoverHeader.displayName = "PopoverHeader";
const PopoverTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h3", { ref: ref, className: cn("text-lg font-semibold leading-none tracking-tight text-white", className), ...props })));
PopoverTitle.displayName = "PopoverTitle";
const PopoverDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("p", { ref: ref, className: cn("text-sm text-muted leading-relaxed", className), ...props })));
PopoverDescription.displayName = "PopoverDescription";
const PopoverFooter = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4", className), ...props })));
PopoverFooter.displayName = "PopoverFooter";
export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverFooter, popoverContentVariants };
//# sourceMappingURL=popover.js.map