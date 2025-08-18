import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
import { Button } from "./button";
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Overlay, { className: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className), ...props, ref: ref })));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const alertDialogContentVariants = cva("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] sm:rounded-xl", {
    variants: {
        variant: {
            default: "border-border",
            destructive: "border-border bg-surface/50",
            success: "border-accent bg-accent/5",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const AlertDialogContent = React.forwardRef(({ className, variant, ...props }, ref) => (_jsxs(AlertDialogPortal, { children: [_jsx(AlertDialogOverlay, {}), _jsx(AlertDialogPrimitive.Content, { ref: ref, className: cn(alertDialogContentVariants({ variant }), "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]", "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]", className), ...props })] })));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props }));
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props }));
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Title, { ref: ref, className: cn("text-lg font-semibold text-white", className), ...props })));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Description, { ref: ref, className: cn("text-sm text-muted leading-relaxed", className), ...props })));
AlertDialogDescription.displayName =
    AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, variant = "primary", ...props }, ref) => (_jsx(AlertDialogPrimitive.Action, { ref: ref, asChild: true, ...props, children: _jsx(Button, { variant: variant, className: className, children: props.children }) })));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Cancel, { ref: ref, asChild: true, ...props, children: _jsx(Button, { variant: "ghost", className: cn("mt-2 sm:mt-0", className), children: props.children }) })));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
export { AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, };
//# sourceMappingURL=alert-dialog.js.map