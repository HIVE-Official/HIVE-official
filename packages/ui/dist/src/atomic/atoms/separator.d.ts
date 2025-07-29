import React from 'react';
export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    spacing?: 'none' | 'sm' | 'md' | 'lg';
    decorative?: boolean;
}
export declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;
export declare const HorizontalSeparator: React.FC<Omit<SeparatorProps, 'orientation'>>;
export declare const VerticalSeparator: React.FC<Omit<SeparatorProps, 'orientation'>>;
export declare const GradientDivider: React.FC<Omit<SeparatorProps, 'variant'>>;
//# sourceMappingURL=separator.d.ts.map