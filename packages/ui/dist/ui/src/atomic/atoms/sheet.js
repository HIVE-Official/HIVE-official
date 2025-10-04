"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Cross2Icon } from "@radix-ui/react-icons";
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(SheetPrimitive.Overlay, { className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className), ...props, ref: ref })));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva("fixed z-50 gap-4 bg-[#0c0c0c] p-6 text-white transition ease-liquid data-[state=closed]:duration-smooth data-[state=open]:duration-flowing data-[state=open]:animate-in data-[state=closed]:animate-out", {
    variants: {
        side: {
            top: "inset-x-0 top-0 border-b border-white/8 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
            bottom: "inset-x-0 bottom-0 border-t border-white/8 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
            left: "inset-y-0 left-0 h-full w-3/4 border-r border-white/8 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
            right: "inset-y-0 right-0 h-full w-3/4 border-l border-white/8 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        },
    },
    defaultVariants: {
        side: "right",
    },
});
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (_jsxs(SheetPortal, { children: [_jsx(SheetOverlay, {}), _jsxs(SheetPrimitive.Content, { ref: ref, className: cn(sheetVariants({ side }), className), ...props, children: [_jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm text-white/70 transition-all hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:ring-offset-2 focus:ring-offset-black disabled:pointer-events-none", children: [_jsx(Cross2Icon, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Close" })] }), children] })] })));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props }));
SheetHeader.displayName = "SheetHeader";
const SheetFooter = ({ className, ...props }) => (_jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props }));
SheetFooter.displayName = "SheetFooter";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(SheetPrimitive.Title, { ref: ref, className: cn("text-lg font-semibold text-white", className), ...props })));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(SheetPrimitive.Description, { ref: ref, className: cn("text-sm text-white/70", className), ...props })));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };
//# sourceMappingURL=sheet.js.map