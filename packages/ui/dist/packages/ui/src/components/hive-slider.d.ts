import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { type VariantProps } from 'class-variance-authority';
declare const hiveSliderVariants: (props?: {
    variant?: "gold" | "default" | "minimal" | "success";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const hiveSliderTrackVariants: (props?: {
    variant?: "gold" | "default" | "minimal" | "success";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const hiveSliderRangeVariants: (props?: {
    variant?: "gold" | "default" | "minimal" | "success";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const hiveSliderThumbVariants: (props?: {
    variant?: "gold" | "default" | "minimal" | "success";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, VariantProps<typeof hiveSliderVariants> {
    variant?: "default" | "gold" | "success" | "minimal";
    size?: "sm" | "default" | "lg" | "xl";
    label?: string;
    description?: string;
    showValue?: boolean;
    valueFormatter?: (value: number) => string;
    liquidMotion?: boolean;
}
declare const HiveSlider: React.ForwardRefExoticComponent<HiveSliderProps & React.RefAttributes<HTMLSpanElement>>;
declare const HiveVolumeSlider: React.ForwardRefExoticComponent<Omit<HiveSliderProps, "min" | "max" | "label" | "showValue" | "valueFormatter"> & React.RefAttributes<HTMLSpanElement>>;
declare const HiveBrightnessSlider: React.ForwardRefExoticComponent<Omit<HiveSliderProps, "min" | "max" | "label" | "showValue" | "valueFormatter"> & React.RefAttributes<HTMLSpanElement>>;
declare const HiveProgressSlider: React.ForwardRefExoticComponent<Omit<HiveSliderProps, "min" | "max" | "label" | "showValue" | "valueFormatter"> & React.RefAttributes<HTMLSpanElement>>;
declare const HivePriceRangeSlider: React.ForwardRefExoticComponent<Omit<HiveSliderProps, "min" | "max" | "label" | "showValue" | "valueFormatter"> & React.RefAttributes<HTMLSpanElement>>;
declare const HiveTemperatureSlider: React.ForwardRefExoticComponent<Omit<HiveSliderProps, "min" | "max" | "label" | "showValue" | "valueFormatter"> & React.RefAttributes<HTMLSpanElement>>;
export { HiveSlider, HiveVolumeSlider, HiveBrightnessSlider, HiveProgressSlider, HivePriceRangeSlider, HiveTemperatureSlider, hiveSliderVariants, hiveSliderTrackVariants, hiveSliderRangeVariants, hiveSliderThumbVariants };
declare const Slider: React.ForwardRefExoticComponent<Omit<HiveSliderProps, "label" | "description" | "showValue" | "liquidMotion"> & React.RefAttributes<HTMLSpanElement>>;
export { Slider, HiveSlider as SliderAdvanced };
//# sourceMappingURL=hive-slider.d.ts.map