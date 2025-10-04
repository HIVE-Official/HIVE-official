import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg~*]:pl-7", {
    variants: {
        variant: {
            default: "bg-[#0c0c0c] border-white/20 text-white [&>svg]:text-white",
            destructive: "border-red-500/50 bg-red-500/10 text-red-500 [&>svg]:text-red-500",
            success: "border-[#FFD700]/50 bg-[#FFD700]/10 text-[#FFD700] [&>svg]:text-[#FFD700]",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (_jsx("div", { ref: ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props })));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx("h5", { ref: ref, className: cn("mb-1 font-medium leading-none tracking-tight text-white", className), ...props })));
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn("text-sm text-white/80 [&_p]:leading-relaxed", className), ...props })));
AlertDescription.displayName = "AlertDescription";
export { Alert, AlertTitle, AlertDescription };
//# sourceMappingURL=alert.js.map