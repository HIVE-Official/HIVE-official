import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type VariantProps } from "class-variance-authority";
declare const tooltipContentVariants: (props?: {
    variant?: "default" | "destructive" | "accent" | "minimal";
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & VariantProps<(props?: {
    variant?: "default" | "destructive" | "accent" | "minimal";
    size?: "sm" | "md" | "lg";
} & import("class-variance-authority/types").ClassProp) => string> & React.RefAttributes<HTMLDivElement>>;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipContentVariants };
//# sourceMappingURL=tooltip.d.ts.map