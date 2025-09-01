import React from 'react';
export interface HiveSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options?: Array<{
        label: string;
        value: string;
    }>;
    variant?: 'default' | 'ghost' | 'filled';
}
export declare const HiveSelect: React.FC<HiveSelectProps>;
export declare const hiveSelectVariants: {};
//# sourceMappingURL=hive-select.d.ts.map