import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveNavigationInputVariants: (props?: ({
    variant?: "default" | "minimal" | "command" | "premium" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface HiveNavigationInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof hiveNavigationInputVariants> {
    onSearch?: (query: string) => void;
    onClear?: () => void;
    showShortcut?: boolean;
    shortcutKey?: string;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    clearable?: boolean;
    loading?: boolean;
}
export declare function HiveNavigationInput({ variant, size, onSearch, onClear, showShortcut, shortcutKey, icon, rightIcon, clearable, loading, className, value, onChange, placeholder, ...props }: HiveNavigationInputProps): import("react/jsx-runtime").JSX.Element;
export interface HiveCommandResultProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    shortcut?: string;
    isSelected?: boolean;
    onClick?: () => void;
    className?: string;
}
export declare function HiveCommandResult({ title, subtitle, icon, shortcut, isSelected, onClick, className }: HiveCommandResultProps): import("react/jsx-runtime").JSX.Element;
export interface HiveCommandSectionProps {
    title: string;
    count?: number;
    className?: string;
}
export declare function HiveCommandSection({ title, count, className }: HiveCommandSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=hive-navigation-input.d.ts.map