import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { type VariantProps } from "class-variance-authority";
declare const popoverContentVariants: (props?: {
    variant?: "default" | "accent" | "minimal" | "elevated";
    size?: "sm" | "md" | "lg" | "auto";
} & import("class-variance-authority/types").ClassProp) => string;
declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & VariantProps<(props?: {
    variant?: "default" | "accent" | "minimal" | "elevated";
    size?: "sm" | "md" | "lg" | "auto";
} & import("class-variance-authority/types").ClassProp) => string> & React.RefAttributes<HTMLDivElement>>;
declare const PopoverHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const PopoverTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
declare const PopoverDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const PopoverFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription, PopoverFooter, popoverContentVariants };
//# sourceMappingURL=popover.d.ts.map