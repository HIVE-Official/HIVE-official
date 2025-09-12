import React from 'react';
export interface HiveChartProps extends React.HTMLAttributes<HTMLDivElement> {
    data?: unknown[];
    type?: 'line' | 'bar' | 'pie' | 'area';
}
export declare const HiveChart: React.FC<HiveChartProps>;
export declare const hiveChartVariants: {};
//# sourceMappingURL=hive-charts.d.ts.map