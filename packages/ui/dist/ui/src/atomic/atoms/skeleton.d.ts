import React from 'react';
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: string | number;
    height?: string | number;
    lines?: number;
    animate?: boolean;
}
export declare const Skeleton: React.FC<SkeletonProps>;
export declare const SkeletonText: React.FC<{
    lines?: number;
    className?: string;
}>;
export declare const SkeletonAvatar: React.FC<{
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}>;
export declare const SkeletonCard: React.FC<{
    className?: string;
}>;
//# sourceMappingURL=skeleton.d.ts.map