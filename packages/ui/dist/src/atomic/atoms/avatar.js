"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils";
const Avatar = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Root, { ref: ref, className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className), ...props })));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Image, { ref: ref, className: cn("aspect-square h-full w-full", className), ...props })));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Fallback, { ref: ref, className: cn("flex h-full w-full items-center justify-center rounded-full bg-white/10", className), ...props })));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const AvatarGroup = React.forwardRef(({ className, children, size = "md", max = 3, ...props }, ref) => {
    const sizeClasses = {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
    };
    const childArray = React.Children.toArray(children);
    const displayChildren = max ? childArray.slice(0, max) : childArray;
    const remaining = max && childArray.length > max ? childArray.length - max : 0;
    return (_jsxs("div", { ref: ref, className: cn("flex -space-x-2", className), ...props, children: [displayChildren.map((child, index) => (_jsx("div", { className: cn("relative ring-2 ring-[#0c0c0c]", sizeClasses[size]), children: child }, index))), remaining > 0 && (_jsxs("div", { className: cn("relative flex items-center justify-center rounded-full bg-white/10 text-white/70 ring-2 ring-[#0c0c0c] font-medium", sizeClasses[size]), children: ["+", remaining] }))] }));
});
AvatarGroup.displayName = "AvatarGroup";
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
//# sourceMappingURL=avatar.js.map