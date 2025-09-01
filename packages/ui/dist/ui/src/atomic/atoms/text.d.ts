import React from 'react';
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    variant?: 'display-2xl' | 'display-xl' | 'display-lg' | 'display-md' | 'display-sm' | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'body-lg' | 'body-md' | 'body-sm' | 'body-xs' | 'body-2xs';
    color?: 'primary' | 'secondary' | 'muted' | 'mutedLight' | 'mutedDark' | 'subtle' | 'gold' | 'ruby' | 'emerald';
    weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
    align?: 'left' | 'center' | 'right';
    truncate?: boolean;
    children: React.ReactNode;
}
export declare const textVariants: {
    variant: {
        'display-2xl': string;
        'display-xl': string;
        'display-lg': string;
        'display-md': string;
        'display-sm': string;
        'heading-xl': string;
        'heading-lg': string;
        'heading-md': string;
        'heading-sm': string;
        'body-lg': string;
        'body-md': string;
        'body-sm': string;
        'body-xs': string;
        'body-2xs': string;
    };
    color: {
        primary: string;
        secondary: string;
        muted: string;
        mutedLight: string;
        mutedDark: string;
        subtle: string;
        gold: string;
        ruby: string;
        emerald: string;
    };
    weight: {
        light: string;
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
    };
    align: {
        left: string;
        center: string;
        right: string;
    };
};
export declare const Text: React.FC<TextProps>;
//# sourceMappingURL=text.d.ts.map