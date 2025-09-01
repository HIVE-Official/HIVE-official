import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
export const Stack = ({ direction = 'vertical', spacing = '1rem', align = 'stretch', justify = 'start', className, children, style, ...props }) => {
    const flexDirection = direction === 'horizontal' ? 'row' : 'column';
    const alignMap = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        stretch: 'stretch',
    };
    const justifyMap = {
        start: 'flex-start',
        center: 'center',
        end: 'flex-end',
        between: 'space-between',
        around: 'space-around',
        evenly: 'space-evenly',
    };
    return (_jsx("div", { className: cn('flex', className), style: {
            flexDirection,
            gap: spacing,
            alignItems: alignMap[align],
            justifyContent: justifyMap[justify],
            ...style,
        }, ...props, children: children }));
};
//# sourceMappingURL=Stack.js.map