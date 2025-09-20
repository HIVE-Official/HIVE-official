/**
 * HIVE Component Foundation System
 * Standardized patterns based on HiveButton excellence
 * Ensures consistency across all components
 */
import { type VariantProps } from 'class-variance-authority';
import React from 'react';
export declare const componentBase: {
    readonly interactive: string;
    readonly container: string;
    readonly input: string;
    readonly text: string;
};
export declare const standardSizes: (props?: {
    size?: "default" | "xs" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export declare const standardVariants: (props?: {
    variant?: "primary" | "secondary" | "success" | "warning" | "outline" | "ghost" | "destructive";
} & import("class-variance-authority/types").ClassProp) => string;
export interface StandardComponentProps {
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    'data-testid'?: string;
}
export interface StandardInteractiveProps extends StandardComponentProps {
    onClick?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    tabIndex?: number;
    'aria-label'?: string;
    'aria-describedby'?: string;
}
export interface StandardFormProps extends StandardComponentProps {
    id?: string;
    name?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
}
/**
 * Standard Component Factory
 * Creates consistent components following HiveButton pattern
 */
export declare function createStandardComponent<T extends Record<string, any>>(displayName: string, baseClassName: string, variants: any, defaultVariants?: Record<string, any>): React.ForwardRefExoticComponent<React.PropsWithoutRef<T & VariantProps<any>> & React.RefAttributes<HTMLElement>>;
/**
 * Motion Props Factory (based on HiveButton pattern)
 */
export declare function getStandardMotionProps(disabled?: boolean, variant?: string): {
    initial: string;
    whileHover: string;
    whileTap: string;
    variants: {
        rest: {
            scale: number;
        };
        hover: {
            scale: number;
            transition: {
                duration: number;
            };
        };
        pressed: {
            scale: number;
            transition: {
                duration: number;
            };
        };
    };
};
/**
 * Loading State Factory
 */
export declare function createLoadingIndicator(loading?: boolean, size?: 'sm' | 'md' | 'lg'): React.DetailedReactHTMLElement<{
    className: string;
    'aria-label': string;
}, HTMLElement>;
/**
 * Icon Integration Pattern
 */
export declare function createIconSlot(icon?: React.ReactNode, position?: 'left' | 'right', loading?: boolean): React.DetailedReactHTMLElement<{
    className: string;
    children: string | number | true | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal;
}, HTMLElement>;
/**
 * Validation State Factory
 */
export declare function getValidationProps(error?: string, success?: boolean): {
    'aria-invalid': boolean;
    'aria-describedby': string;
    className: string;
} | {
    'aria-invalid': boolean;
    className: string;
    'aria-describedby'?: undefined;
} | {
    'aria-invalid'?: undefined;
    'aria-describedby'?: undefined;
    className?: undefined;
};
//# sourceMappingURL=component-foundation.d.ts.map