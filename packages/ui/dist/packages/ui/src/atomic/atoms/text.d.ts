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
export declare const Text: React.FC<TextProps>;
//# sourceMappingURL=text.d.ts.map