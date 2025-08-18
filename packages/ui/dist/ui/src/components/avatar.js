import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const avatarVariants = cva(
// Base styles following HIVE brand guidelines - circular avatars
"relative inline-flex shrink-0 overflow-hidden rounded-full border-2 border-border bg-surface-02 transition-all duration-fast ease-smooth", {
    variants: {
        size: {
            xs: "h-6 w-6 text-xs", // 24px
            sm: "h-8 w-8 text-xs", // 32px  
            default: "h-10 w-10 text-sm", // 40px
            lg: "h-12 w-12 text-base", // 48px
            xl: "h-16 w-16 text-lg", // 64px
            "2xl": "h-24 w-24 text-xl", // 96px
        },
        status: {
            none: "",
            // HIVE brand: using monochrome status indicators instead of colors
            online: "ring-2 ring-accent ring-offset-2 ring-offset-background", // Gold for active/online
            away: "ring-2 ring-muted ring-offset-2 ring-offset-background", // Muted for away/idle
            offline: "ring-2 ring-surface-03 ring-offset-2 ring-offset-background", // Surface for offline
        },
        interactive: {
            true: "cursor-pointer hover:scale-105 hover:border-accent/50 hover:ring-2 hover:ring-accent/20 hover:ring-offset-2 hover:ring-offset-background",
            false: "",
        }
    },
    defaultVariants: {
        size: "default",
        status: "none",
        interactive: false,
    },
});
const Avatar = React.forwardRef(({ className, size, status, interactive, ...props }, ref) => (_jsx(AvatarPrimitive.Root, { ref: ref, className: cn(avatarVariants({ size, status, interactive, className })), ...props })));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (_jsx(AvatarPrimitive.Image, { ref: ref, className: cn("aspect-square h-full w-full object-cover", className), ...props })));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, children, ...props }, ref) => (_jsx(AvatarPrimitive.Fallback, { ref: ref, className: cn("flex h-full w-full items-center justify-center bg-surface-02 font-sans font-medium text-foreground select-none", className), ...props, children: children })));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
// Presence indicator component for social platform features
const AvatarPresence = React.forwardRef(({ className, status, size = "default", ...props }, ref) => {
    const presenceSize = {
        sm: "h-2 w-2",
        default: "h-2.5 w-2.5",
        lg: "h-3 w-3",
    };
    // HIVE brand: monochrome presence indicators
    const presenceColor = {
        online: "bg-accent", // Gold for active/online users
        away: "bg-muted", // Muted gray for away/idle
        offline: "bg-surface-03", // Surface for offline
    };
    return (_jsx("div", { ref: ref, className: cn("absolute bottom-0 right-0 rounded-full border-2 border-background transition-colors duration-fast ease-smooth", presenceSize[size], presenceColor[status], className), ...props }));
});
AvatarPresence.displayName = "AvatarPresence";
// Complete avatar with presence - convenience component
const AvatarWithPresence = React.forwardRef(({ className, src, alt, fallback, presence, size, ...props }, ref) => {
    const getPresenceSize = () => {
        switch (size) {
            case "xs":
            case "sm":
                return "sm";
            case "xl":
            case "2xl":
                return "lg";
            default:
                return "default";
        }
    };
    return (_jsxs(Avatar, { ref: ref, className: cn("relative", className), size: size, ...props, children: [_jsx(AvatarImage, { src: src, alt: alt }), _jsx(AvatarFallback, { children: fallback }), presence && (_jsx(AvatarPresence, { status: presence, size: getPresenceSize() }))] }));
});
AvatarWithPresence.displayName = "AvatarWithPresence";
// Avatar group for showing multiple users
const AvatarGroup = React.forwardRef(({ className, children, max = 3, size = "default", ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;
    return (_jsxs("div", { ref: ref, className: cn("flex -space-x-1", className), ...props, children: [visibleChildren.map((child, index) => (_jsx("div", { className: "relative", children: React.isValidElement(child)
                    ? React.cloneElement(child, {
                        size,
                        className: cn("border-2 border-background", child.props.className)
                    })
                    : child }, React.isValidElement(child) && child.key ? child.key : `avatar-${index}`))), remainingCount > 0 && (_jsx(Avatar, { size: size, className: "border-2 border-background", children: _jsxs(AvatarFallback, { className: "bg-surface-03 text-muted font-medium", children: ["+", remainingCount] }) }))] }));
});
AvatarGroup.displayName = "AvatarGroup";
// Utility function to generate initials from name
export const getInitials = (name) => {
    if (!name)
        return "?";
    return name
        .split(" ")
        .map(word => word?.charAt(0))
        .filter(Boolean)
        .join("")
        .toUpperCase()
        .slice(0, 2) || "?";
};
export { Avatar, AvatarImage, AvatarFallback, AvatarPresence, AvatarWithPresence, AvatarGroup, avatarVariants };
//# sourceMappingURL=avatar.js.map