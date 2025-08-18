import React from 'react';
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'none';
    padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    center?: boolean;
    fluid?: boolean;
    breakout?: boolean;
    variant?: 'default' | 'card' | 'panel' | 'section';
    gutter?: boolean;
    children: React.ReactNode;
}
export declare const Container: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<HTMLDivElement>>;
export declare const PageContainer: React.FC<Omit<ContainerProps, 'maxWidth' | 'gutter'>>;
export declare const ContentContainer: React.FC<Omit<ContainerProps, 'maxWidth'>>;
export declare const NarrowContainer: React.FC<Omit<ContainerProps, 'maxWidth'>>;
export declare const WideContainer: React.FC<Omit<ContainerProps, 'maxWidth'>>;
export declare const FluidContainer: React.FC<Omit<ContainerProps, 'fluid'>>;
export declare const CardContainer: React.FC<Omit<ContainerProps, 'variant'>>;
export declare const PanelContainer: React.FC<Omit<ContainerProps, 'variant'>>;
export declare const SectionContainer: React.FC<Omit<ContainerProps, 'variant'>>;
export declare const BreakoutContainer: React.FC<Omit<ContainerProps, 'breakout'>>;
export declare const SmallContainer: React.FC<Omit<ContainerProps, 'maxWidth'>>;
export declare const MediumContainer: React.FC<Omit<ContainerProps, 'maxWidth'>>;
export declare const LargeContainer: React.FC<Omit<ContainerProps, 'maxWidth'>>;
export declare const ExtraLargeContainer: React.FC<Omit<ContainerProps, 'maxWidth'>>;
export declare const CenteredContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const FullWidthSection: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
//# sourceMappingURL=container.d.ts.map