import React from 'react';
interface RippleProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}
export declare const HiveRipple: React.FC<RippleProps>;
interface MagneticHoverProps {
    children: React.ReactNode;
    className?: string;
    intensity?: 'subtle' | 'medium' | 'strong';
    disabled?: boolean;
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    layoutId?: string;
}
export declare const HiveMagneticHover: React.FC<MagneticHoverProps>;
interface CascadeProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}
export declare const HiveCascade: React.FC<CascadeProps>;
interface FloatProps {
    children: React.ReactNode;
    className?: string;
    intensity?: 'subtle' | 'medium' | 'strong';
    duration?: number;
}
export declare const HiveFloat: React.FC<FloatProps>;
interface ShimmerProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    radius?: string;
}
export declare const HiveShimmer: React.FC<ShimmerProps>;
interface GlowPulseProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
    intensity?: 'subtle' | 'medium' | 'strong';
}
export declare const HiveGlowPulse: React.FC<GlowPulseProps>;
interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}
export declare const HivePageTransition: React.FC<PageTransitionProps>;
interface ToolPlantProps {
    children: React.ReactNode;
    className?: string;
    planted?: boolean;
}
export declare const HiveToolPlant: React.FC<ToolPlantProps>;
export declare const HiveMotionWrapper: React.FC<MagneticHoverProps>;
export {};
//# sourceMappingURL=hive-motion-wrapper.d.ts.map