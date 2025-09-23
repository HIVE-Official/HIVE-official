/**
 * Universal Atoms
 * Core UI building blocks for the HIVE platform
 * Uses the gold (var(--hive-brand-secondary)), black, and white color scheme
 */
import React, { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
export interface UniversalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}
export declare const UniversalButton: React.ForwardRefExoticComponent<UniversalButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface UniversalInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
}
export declare const UniversalInput: React.ForwardRefExoticComponent<UniversalInputProps & React.RefAttributes<HTMLInputElement>>;
export interface UniversalCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined' | 'glass';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onClick?: () => void;
}
export declare const UniversalCard: React.FC<UniversalCardProps>;
export interface UniversalBadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
export declare const UniversalBadge: React.FC<UniversalBadgeProps>;
export interface UniversalAvatarProps {
    src?: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    fallback?: string;
    status?: 'online' | 'offline' | 'busy';
    className?: string;
}
export declare const UniversalAvatar: React.FC<UniversalAvatarProps>;
export interface UniversalSkeletonProps {
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular';
    className?: string;
}
export declare const UniversalSkeleton: React.FC<UniversalSkeletonProps>;
export declare const UniversalDivider: React.FC<{
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}>;
export declare const UniversalIconButton: React.ForwardRefExoticComponent<{
    icon: React.ReactNode;
    variant?: "default" | "primary" | "ghost";
    size?: "sm" | "md" | "lg";
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
export interface UniversalCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
}
export declare const UniversalCheckbox: React.ForwardRefExoticComponent<UniversalCheckboxProps & React.RefAttributes<HTMLInputElement>>;
declare const _default: {
    UniversalButton: React.ForwardRefExoticComponent<UniversalButtonProps & React.RefAttributes<HTMLButtonElement>>;
    UniversalInput: React.ForwardRefExoticComponent<UniversalInputProps & React.RefAttributes<HTMLInputElement>>;
    UniversalCard: React.FC<UniversalCardProps>;
    UniversalBadge: React.FC<UniversalBadgeProps>;
    UniversalAvatar: React.FC<UniversalAvatarProps>;
    UniversalSkeleton: React.FC<UniversalSkeletonProps>;
    UniversalDivider: React.FC<{
        orientation?: "horizontal" | "vertical";
        className?: string;
    }>;
    UniversalIconButton: React.ForwardRefExoticComponent<{
        icon: React.ReactNode;
        variant?: "default" | "primary" | "ghost";
        size?: "sm" | "md" | "lg";
    } & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
    UniversalCheckbox: React.ForwardRefExoticComponent<UniversalCheckboxProps & React.RefAttributes<HTMLInputElement>>;
};
export default _default;
//# sourceMappingURL=universal-atoms.d.ts.map