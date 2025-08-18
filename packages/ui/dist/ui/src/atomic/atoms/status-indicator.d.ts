import React from 'react';
export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
    status: 'online' | 'offline' | 'away' | 'busy' | 'error' | 'success' | 'warning' | 'pending';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'dot' | 'pulse' | 'glow' | 'ring';
    label?: string;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    showLabel?: boolean;
    animate?: boolean;
}
export declare const StatusIndicator: React.ForwardRefExoticComponent<StatusIndicatorProps & React.RefAttributes<HTMLDivElement>>;
export declare const OnlineIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>>;
export declare const OfflineIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>>;
export declare const BusyIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>>;
export declare const AwayIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>>;
export declare const ErrorIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>>;
export declare const SuccessIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>>;
export declare const WarningIndicator: React.FC<Omit<StatusIndicatorProps, 'status'>>;
export declare const PulseIndicator: React.FC<Omit<StatusIndicatorProps, 'variant'>>;
export declare const GlowIndicator: React.FC<Omit<StatusIndicatorProps, 'variant'>>;
export interface StatusBadgeProps extends Omit<StatusIndicatorProps, 'showLabel'> {
    children?: React.ReactNode;
    count?: number;
    max?: number;
}
export declare const StatusBadge: React.FC<StatusBadgeProps>;
//# sourceMappingURL=status-indicator.d.ts.map