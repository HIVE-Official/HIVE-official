import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
export const ScrollArea = ({ children, className }) => {
    return (_jsx("div", { className: cn('relative overflow-hidden', className), children: _jsx("div", { className: "h-full w-full overflow-auto", children: children }) }));
};
//# sourceMappingURL=scroll-area.js.map