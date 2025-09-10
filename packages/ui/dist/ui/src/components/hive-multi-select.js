import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils';
export const HiveMultiSelect = ({ className, options = [], value = [], onChange, placeholder = 'Select items...', ...props }) => {
    return (_jsxs("div", { className: cn('w-full border rounded-md p-2', className), ...props, children: [_jsx("div", { className: "text-sm text-muted-foreground", children: placeholder }), _jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: value.map((v) => (_jsx("span", { className: "px-2 py-1 bg-primary/10 rounded-md text-xs", children: v }, v))) })] }));
};
export const hiveMultiSelectVariants = {};
//# sourceMappingURL=hive-multi-select.js.map