import React from 'react';
export interface HiveProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    variant?: 'default' | 'success' | 'warning' | 'danger';
}
export declare const HiveProgress: React.FC<HiveProgressProps>;
export declare const hiveProgressVariants: {};
//# sourceMappingURL=hive-progress.d.ts.map