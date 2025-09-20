import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type VariantProps } from 'class-variance-authority';
declare const hiveTooltipVariants: (props?: {
    variant?: "default" | "success" | "warning" | "error" | "gold" | "info" | "solid" | "minimal" | "glass";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
declare const HiveTooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const HiveTooltip: React.FC<TooltipPrimitive.TooltipProps>;
declare const HiveTooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface HiveTooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, VariantProps<typeof hiveTooltipVariants> {
    variant?: "default" | "glass" | "gold" | "success" | "warning" | "error" | "info" | "minimal" | "solid";
    size?: "sm" | "default" | "lg" | "xl";
    withArrow?: boolean;
    animated?: boolean;
}
declare const HiveTooltipContent: React.ForwardRefExoticComponent<HiveTooltipContentProps & React.RefAttributes<HTMLDivElement>>;
interface HiveMotionTooltipProps extends Omit<HiveTooltipContentProps, 'content'> {
    children: React.ReactNode;
    content: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    delayDuration?: number;
}
declare const HiveMotionTooltip: React.ForwardRefExoticComponent<HiveMotionTooltipProps & React.RefAttributes<HTMLElement>>;
declare const HiveHelpTooltip: React.ForwardRefExoticComponent<Omit<HiveMotionTooltipProps, "variant" | "size"> & React.RefAttributes<HTMLElement>>;
declare const HiveErrorTooltip: React.ForwardRefExoticComponent<Omit<HiveMotionTooltipProps, "variant"> & React.RefAttributes<HTMLElement>>;
declare const HiveSuccessTooltip: React.ForwardRefExoticComponent<Omit<HiveMotionTooltipProps, "variant"> & React.RefAttributes<HTMLElement>>;
declare const HiveGoldTooltip: React.ForwardRefExoticComponent<Omit<HiveMotionTooltipProps, "variant"> & React.RefAttributes<HTMLElement>>;
declare const HiveMinimalTooltip: React.ForwardRefExoticComponent<Omit<HiveMotionTooltipProps, "variant" | "withArrow"> & React.RefAttributes<HTMLElement>>;
export { HiveTooltip, HiveTooltipTrigger, HiveTooltipContent, HiveTooltipProvider, HiveMotionTooltip, HiveHelpTooltip, HiveErrorTooltip, HiveSuccessTooltip, HiveGoldTooltip, HiveMinimalTooltip, hiveTooltipVariants };
export { HiveTooltip as Tooltip, HiveTooltipTrigger as TooltipTrigger, HiveTooltipContent as TooltipContent, HiveTooltipProvider as TooltipProvider };
//# sourceMappingURL=hive-tooltip.d.ts.map