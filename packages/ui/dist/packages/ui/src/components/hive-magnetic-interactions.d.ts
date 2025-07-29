import React, { ReactNode } from 'react';
interface MagneticHoverProps {
    children: ReactNode;
    className?: string;
    intensity?: 'subtle' | 'medium' | 'strong' | 'extreme';
    disabled?: boolean;
    onMagneticEnter?: () => void;
    onMagneticLeave?: () => void;
    magneticId?: string;
}
export declare const HiveMagneticHover: React.FC<MagneticHoverProps>;
interface MagneticSnapProps {
    children: ReactNode;
    className?: string;
    snapTarget?: string;
    snapId: string;
    onSnap?: (targetId: string) => void;
    onRelease?: () => void;
    disabled?: boolean;
}
export declare const HiveMagneticSnap: React.FC<MagneticSnapProps>;
interface LiquidRippleProps {
    children: ReactNode;
    className?: string;
    rippleColor?: string;
    intensity?: 'subtle' | 'medium' | 'strong';
    disabled?: boolean;
    onRippleComplete?: () => void;
}
export declare const HiveLiquidRipple: React.FC<LiquidRippleProps>;
interface LiquidTransformProps {
    children: ReactNode;
    className?: string;
    transformKey: string | number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}
export declare const HiveLiquidTransform: React.FC<LiquidTransformProps>;
interface MagneticTargetProps {
    children: ReactNode;
    className?: string;
    targetId: string;
    onElementEnterZone?: (elementId: string) => void;
    onElementLeaveZone?: (elementId: string) => void;
    visualizeZone?: boolean;
}
export declare const HiveMagneticTarget: React.FC<MagneticTargetProps>;
export {};
//# sourceMappingURL=hive-magnetic-interactions.d.ts.map