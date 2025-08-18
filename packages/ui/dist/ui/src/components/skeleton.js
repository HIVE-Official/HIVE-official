import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
const skeletonVariants = cva("animate-pulse rounded-md bg-muted transition-all duration-base ease-smooth", {
    variants: {
        variant: {
            default: "bg-muted",
            subtle: "bg-muted/50",
            shimmer: "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]",
        },
        size: {
            sm: "h-3",
            default: "h-4",
            lg: "h-6",
            xl: "h-8",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
function Skeleton({ className, variant, size, ...props }) {
    return (_jsx("div", { className: cn(skeletonVariants({ variant, size }), className), ...props }));
}
export { Skeleton, skeletonVariants };
//# sourceMappingURL=skeleton.js.map