/**
 * HIVE Standard Element Styles Hook
 * Converts any element style config to consistent CSS classes and variables
 * Flexible input, consistent output
 */
export interface StandardStyleConfig {
    width?: number | 'auto' | 'full' | 'fit';
    height?: number | 'auto' | 'full' | 'fit';
    margin?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    padding?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    opacity?: number;
    textColor?: string;
    fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | string;
    fontWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
    textAlign?: 'left' | 'center' | 'right';
    disabled?: boolean;
    hidden?: boolean;
}
export declare function extractStandardStyle(config: any): StandardStyleConfig;
export declare function useStandardElementStyles(styleConfig: StandardStyleConfig | any): {
    classes: {
        container: string;
        element: string;
        spacing: string;
    };
    styles: import("react").CSSProperties;
    config: StandardStyleConfig;
};
export declare function useStandardElementBehavior(config: {
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    validation?: {
        pattern?: string;
        minLength?: number;
        maxLength?: number;
    };
}): {
    isRequired: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    validation: {
        pattern?: string;
        minLength?: number;
        maxLength?: number;
    };
    ariaAttributes: {
        'aria-required': true | undefined;
        'aria-disabled': true | undefined;
        'aria-readonly': true | undefined;
    };
};
//# sourceMappingURL=use-standard-element-styles.d.ts.map