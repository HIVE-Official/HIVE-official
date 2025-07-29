import React from 'react';
export interface TooltipProps {
    content: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    trigger?: 'hover' | 'click' | 'focus';
    delay?: number;
    arrow?: boolean;
    variant?: 'default' | 'dark' | 'light';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    children: React.ReactElement;
}
export declare const Tooltip: React.FC<TooltipProps>;
export declare const InfoTooltip: React.FC<Omit<TooltipProps, 'variant'>>;
export declare const DarkTooltip: React.FC<Omit<TooltipProps, 'variant'>>;
export declare const LightTooltip: React.FC<Omit<TooltipProps, 'variant'>>;
export declare const ClickTooltip: React.FC<Omit<TooltipProps, 'trigger'>>;
//# sourceMappingURL=tooltip.d.ts.map