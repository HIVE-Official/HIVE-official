import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { cva } from 'class-variance-authority';
export const containerVariants = cva('mx-auto px-4', {
    variants: {
        size: {
            xs: 'max-w-xs',
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            '3xl': 'max-w-3xl',
            '4xl': 'max-w-4xl',
            '5xl': 'max-w-5xl',
            '6xl': 'max-w-6xl',
            '7xl': 'max-w-7xl',
            full: 'max-w-full',
            screen: 'max-w-screen-2xl',
        },
        padding: {
            none: 'px-0',
            sm: 'px-2 sm:px-4',
            md: 'px-4 sm:px-6',
            lg: 'px-4 sm:px-6 lg:px-8',
            xl: 'px-6 sm:px-8 lg:px-12',
        },
        // Campus-specific container layouts
        campusLayout: {
            'page-content': 'max-w-7xl px-4 sm:px-6 lg:px-8',
            'course-content': 'max-w-4xl px-4 sm:px-6',
            'profile-content': 'max-w-6xl px-4 sm:px-6 lg:px-8',
            'auth-content': 'max-w-md px-6',
            'dashboard-content': 'max-w-full px-4 sm:px-6 lg:px-8',
            'modal-content': 'max-w-2xl px-6',
        }
    },
    defaultVariants: {
        size: '7xl',
        padding: 'lg',
    },
});
export const Container = ({ children, className, size, padding, campusLayout, as: Component = 'div', ...props }) => {
    return (_jsx(Component, { className: cn(containerVariants({ size, padding, campusLayout }), className), ...props, children: children }));
};
//# sourceMappingURL=container.js.map