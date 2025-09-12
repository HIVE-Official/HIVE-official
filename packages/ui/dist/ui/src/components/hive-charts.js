import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
export const HiveChart = ({ className, children, ...props }) => {
    return (_jsx("div", { className: cn('w-full h-64 bg-muted rounded-lg p-4', className), ...props, children: children || _jsx("div", { className: "text-muted-foreground", children: "Chart placeholder" }) }));
};
export const hiveChartVariants = {};
//# sourceMappingURL=hive-charts.js.map