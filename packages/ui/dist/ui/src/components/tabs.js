import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const tabsListVariants = cva("inline-flex items-center justify-center transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", {
    variants: {
        variant: {
            default: [
                "rounded-xl bg-surface p-1",
                "border border-border"
            ],
            underline: [
                "border-b border-border bg-transparent",
                "rounded-none p-0"
            ],
            pills: [
                "bg-transparent p-0 gap-2"
            ],
            minimal: [
                "bg-transparent p-0 gap-1"
            ]
        },
        size: {
            sm: "h-9 text-sm",
            md: "h-10 text-sm",
            lg: "h-12 text-base"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "md"
    }
});
const tabsTriggerVariants = cva("inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: [
                "rounded-lg px-3 py-1.5",
                "text-muted hover:text-white hover:bg-border",
                "data-[state=active]:bg-border data-[state=active]:text-white data-[state=active]:shadow-sm"
            ],
            underline: [
                "rounded-none px-4 py-3 border-b-2 border-transparent",
                "text-muted hover:text-white hover:border-border",
                "data-[state=active]:border-accent data-[state=active]:text-white"
            ],
            pills: [
                "rounded-xl px-4 py-2 bg-surface border border-border",
                "text-muted hover:text-white hover:bg-border hover:border-border",
                "data-[state=active]:bg-accent data-[state=active]:text-black data-[state=active]:border-accent"
            ],
            minimal: [
                "rounded-lg px-3 py-1.5",
                "text-muted hover:text-white",
                "data-[state=active]:text-accent data-[state=active]:bg-accent/10"
            ]
        },
        size: {
            sm: "text-sm px-2 py-1",
            md: "text-sm px-3 py-1.5",
            lg: "text-base px-4 py-2"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "md"
    }
});
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, variant, size, ...props }, ref) => (_jsx(TabsPrimitive.List, { ref: ref, className: cn(tabsListVariants({ variant, size }), className), ...props })));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, variant, size, ...props }, ref) => (_jsx(TabsPrimitive.Trigger, { ref: ref, className: cn(tabsTriggerVariants({ variant, size }), className), ...props })));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (_jsx(TabsPrimitive.Content, { ref: ref, className: cn("mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", className), ...props })));
TabsContent.displayName = TabsPrimitive.Content.displayName;
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
//# sourceMappingURL=tabs.js.map