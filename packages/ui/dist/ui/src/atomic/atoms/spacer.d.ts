import React from 'react';
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    direction?: 'horizontal' | 'vertical' | 'both';
    responsive?: boolean;
    flexible?: boolean;
    debug?: boolean;
}
export declare const Spacer: React.ForwardRefExoticComponent<SpacerProps & React.RefAttributes<HTMLDivElement>>;
export declare const VerticalSpacer: React.FC<Omit<SpacerProps, 'direction'>>;
export declare const HorizontalSpacer: React.FC<Omit<SpacerProps, 'direction'>>;
export declare const FlexibleSpacer: React.FC<Omit<SpacerProps, 'flexible'>>;
export declare const ResponsiveSpacer: React.FC<Omit<SpacerProps, 'responsive'>>;
export declare const TinySpacer: React.FC<Omit<SpacerProps, 'size'>>;
export declare const SmallSpacer: React.FC<Omit<SpacerProps, 'size'>>;
export declare const MediumSpacer: React.FC<Omit<SpacerProps, 'size'>>;
export declare const LargeSpacer: React.FC<Omit<SpacerProps, 'size'>>;
export declare const ExtraLargeSpacer: React.FC<Omit<SpacerProps, 'size'>>;
export declare const HugeSpacer: React.FC<Omit<SpacerProps, 'size'>>;
export declare const VerticalGap: {
    xs: () => import("react/jsx-runtime").JSX.Element;
    sm: () => import("react/jsx-runtime").JSX.Element;
    md: () => import("react/jsx-runtime").JSX.Element;
    lg: () => import("react/jsx-runtime").JSX.Element;
    xl: () => import("react/jsx-runtime").JSX.Element;
    '2xl': () => import("react/jsx-runtime").JSX.Element;
    '3xl': () => import("react/jsx-runtime").JSX.Element;
    '4xl': () => import("react/jsx-runtime").JSX.Element;
};
export declare const HorizontalGap: {
    xs: () => import("react/jsx-runtime").JSX.Element;
    sm: () => import("react/jsx-runtime").JSX.Element;
    md: () => import("react/jsx-runtime").JSX.Element;
    lg: () => import("react/jsx-runtime").JSX.Element;
    xl: () => import("react/jsx-runtime").JSX.Element;
    '2xl': () => import("react/jsx-runtime").JSX.Element;
    '3xl': () => import("react/jsx-runtime").JSX.Element;
    '4xl': () => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=spacer.d.ts.map