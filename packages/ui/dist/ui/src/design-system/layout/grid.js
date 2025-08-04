import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
import { cva } from 'class-variance-authority';
export const gridVariants = cva('grid', {
    variants: {
        cols: {
            1: 'grid-cols-1',
            2: 'grid-cols-2',
            3: 'grid-cols-3',
            4: 'grid-cols-4',
            5: 'grid-cols-5',
            6: 'grid-cols-6',
            12: 'grid-cols-12',
        },
        gap: {
            none: 'gap-0',
            xs: 'gap-1',
            sm: 'gap-2',
            md: 'gap-4',
            lg: 'gap-6',
            xl: 'gap-8',
            '2xl': 'gap-12',
        },
        responsive: {
            true: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
            false: '',
        },
        // Campus-specific layouts
        campusLayout: {
            'course-grid': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            'profile-grid': 'grid-cols-1 lg:grid-cols-2',
            'activity-grid': 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
            'tool-grid': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        }
    },
    defaultVariants: {
        cols: 1,
        gap: 'md',
        responsive: false,
    },
});
export const Grid = ({ children, className, cols, gap, responsive, campusLayout, ...props }) => {
    return (_jsx("div", { className: cn(gridVariants({ cols, gap, responsive, campusLayout }), className), ...props, children: children }));
};
//# sourceMappingURL=grid.js.map