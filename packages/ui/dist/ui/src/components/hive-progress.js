import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
export const HiveProgress = ({ className, value = 0, max = 100, variant = 'default', ...props }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const variantColors = {
        default: 'bg-primary',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        danger: 'bg-red-500',
    };
    return (_jsx("div", { className: cn('w-full bg-secondary rounded-full h-2', className), ...props, children: _jsx("div", { className: cn('h-full rounded-full transition-all', variantColors[variant]), style: { width: `${percentage}%` } }) }));
};
export const hiveProgressVariants = {};
//# sourceMappingURL=hive-progress.js.map