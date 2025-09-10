import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils';
export const Grid = ({ cols = 1, gap = '1rem', responsive = true, className, children, style, ...props }) => {
    const gridCols = typeof cols === 'number'
        ? responsive
            ? `repeat(auto-fit, minmax(250px, 1fr))`
            : `repeat(${cols}, 1fr)`
        : cols;
    return (_jsx("div", { className: cn('grid', className), style: {
            gridTemplateColumns: gridCols,
            gap,
            ...style,
        }, ...props, children: children }));
};
//# sourceMappingURL=Grid.js.map