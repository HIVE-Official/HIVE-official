import React from 'react';
export interface HiveMultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    options?: Array<{
        label: string;
        value: string;
    }>;
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
}
export declare const HiveMultiSelect: React.FC<HiveMultiSelectProps>;
export declare const hiveMultiSelectVariants: {};
//# sourceMappingURL=hive-multi-select.d.ts.map