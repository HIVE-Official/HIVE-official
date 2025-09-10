import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
export const HiveSelect = ({ className, options = [], variant = 'default', children, ...props }) => {
    const variantClasses = {
        default: 'border border-input bg-background',
        ghost: 'border-transparent bg-transparent hover:bg-accent',
        filled: 'bg-muted border-transparent',
    };
    return (_jsxs("select", { className: cn('flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', 'disabled:cursor-not-allowed disabled:opacity-50', variantClasses[variant], className), ...props, children: [options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))), children] }));
};
export const hiveSelectVariants = {};
//# sourceMappingURL=hive-select.js.map