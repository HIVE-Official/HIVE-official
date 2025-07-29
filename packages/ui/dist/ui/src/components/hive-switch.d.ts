import React from "react";
import { type VariantProps } from 'class-variance-authority';
declare const hiveSwitchVariants: (props?: {
    variant?: "gold" | "default" | "minimal" | "success";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const hiveSwitchThumbVariants: (props?: {
    variant?: "gold" | "default" | "minimal" | "success";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveSwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'>, VariantProps<typeof hiveSwitchVariants> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
    description?: string;
    variant?: "default" | "gold" | "success" | "minimal";
    size?: "sm" | "default" | "lg" | "xl";
}
declare const HiveSwitch: React.ForwardRefExoticComponent<HiveSwitchProps & React.RefAttributes<HTMLButtonElement>>;
declare const HiveGoldSwitch: React.ForwardRefExoticComponent<Omit<HiveSwitchProps, "variant"> & React.RefAttributes<HTMLButtonElement>>;
declare const HiveSuccessSwitch: React.ForwardRefExoticComponent<Omit<HiveSwitchProps, "variant"> & React.RefAttributes<HTMLButtonElement>>;
declare const HiveMinimalSwitch: React.ForwardRefExoticComponent<Omit<HiveSwitchProps, "variant"> & React.RefAttributes<HTMLButtonElement>>;
declare const HiveNotificationSwitch: React.ForwardRefExoticComponent<Omit<HiveSwitchProps, "label" | "description"> & React.RefAttributes<HTMLButtonElement>>;
declare const HivePrivacySwitch: React.ForwardRefExoticComponent<Omit<HiveSwitchProps, "label" | "description"> & React.RefAttributes<HTMLButtonElement>>;
export { HiveSwitch, HiveGoldSwitch, HiveSuccessSwitch, HiveMinimalSwitch, HiveNotificationSwitch, HivePrivacySwitch, hiveSwitchVariants, hiveSwitchThumbVariants };
declare const Switch: React.ForwardRefExoticComponent<Omit<HiveSwitchProps, "label" | "description"> & React.RefAttributes<HTMLButtonElement>>;
export { Switch, HiveSwitch as SwitchAdvanced };
//# sourceMappingURL=hive-switch.d.ts.map