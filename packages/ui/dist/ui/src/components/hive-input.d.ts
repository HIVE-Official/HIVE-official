import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveInputVariants: (props?: ({
    variant?: "default" | "ghost" | "filled" | null | undefined;
    size?: "sm" | "lg" | "md" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface HiveInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof hiveInputVariants> {
}
declare const HiveInput: React.ForwardRefExoticComponent<HiveInputProps & React.RefAttributes<HTMLInputElement>>;
export { HiveInput, hiveInputVariants };
//# sourceMappingURL=hive-input.d.ts.map