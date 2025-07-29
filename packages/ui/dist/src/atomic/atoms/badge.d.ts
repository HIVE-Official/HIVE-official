import React from 'react';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
    count?: number;
    maxCount?: number;
    children?: React.ReactNode;
}
export declare const Badge: React.FC<BadgeProps>;
//# sourceMappingURL=badge.d.ts.map