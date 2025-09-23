import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils.js";
const avatarVariants = cva("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", {
    variants: {
        size: {
            sm: "h-6 w-6",
            default: "h-10 w-10",
            lg: "h-16 w-16",
            xl: "h-20 w-20",
            "2xl": "h-24 w-24",
        },
        variant: {
            default: "bg-[var(--hive-background-tertiary)]",
            brand: "bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]",
            outline: "border-2 border-[var(--hive-border-strong)]",
        },
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
});
const Avatar = React.forwardRef(({ className, size, variant, ...props }, ref) => (_jsx("div", { ref: ref, className: cn(avatarVariants({ size, variant }), className), ...props })));
Avatar.displayName = "Avatar";
const AvatarImage = React.forwardRef(({ className, src, alt, onLoadingStatusChange, ...props }, ref) => {
    const [loadingStatus, setLoadingStatus] = React.useState("idle");
    React.useEffect(() => {
        if (!src) {
            setLoadingStatus("error");
            return;
        }
        setLoadingStatus("loading");
        const img = new Image();
        img.onload = () => {
            setLoadingStatus("loaded");
            onLoadingStatusChange?.("loaded");
        };
        img.onerror = () => {
            setLoadingStatus("error");
            onLoadingStatusChange?.("error");
        };
        img.src = src;
    }, [src, onLoadingStatusChange]);
    if (loadingStatus === "loaded") {
        return (_jsx("img", { ref: ref, src: src, alt: alt, className: cn("aspect-square h-full w-full object-cover", className), ...props }));
    }
    return null;
});
AvatarImage.displayName = "AvatarImage";
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("flex h-full w-full items-center justify-center rounded-full bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] text-sm font-medium", className), ...props })));
AvatarFallback.displayName = "AvatarFallback";
// Alternative names for compatibility
const ShadcnAvatar = Avatar;
const ShadcnAvatarImage = AvatarImage;
const ShadcnAvatarFallback = AvatarFallback;
export { Avatar, AvatarImage, AvatarFallback, ShadcnAvatar, ShadcnAvatarImage, ShadcnAvatarFallback, avatarVariants, };
//# sourceMappingURL=avatar.js.map