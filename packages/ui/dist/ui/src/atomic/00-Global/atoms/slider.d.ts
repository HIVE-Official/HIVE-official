import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { type VariantProps } from "class-variance-authority";
declare const sliderVariants: (props?: {
    size?: "sm" | "lg" | "default";
} & import("class-variance-authority/types").ClassProp) => string;
declare const sliderTrackVariants: (props?: {
    variant?: "success" | "default" | "destructive" | "subtle";
} & import("class-variance-authority/types").ClassProp) => string;
declare const sliderRangeVariants: (props?: {
    variant?: "success" | "default" | "destructive" | "subtle";
} & import("class-variance-authority/types").ClassProp) => string;
declare const sliderThumbVariants: (props?: {
    variant?: "success" | "default" | "destructive" | "subtle";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, VariantProps<typeof sliderVariants> {
    variant?: "default" | "destructive" | "success" | "subtle";
}
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>>;
export { Slider, sliderVariants, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants };
//# sourceMappingURL=slider.d.ts.map