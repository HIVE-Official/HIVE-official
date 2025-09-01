"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import { BreadcrumbNavigation } from './breadcrumb-navigation.js'; // Temporarily disabled
import { cn } from '../../lib/utils.js';
export function PageContainer({ children, title, subtitle, breadcrumbs, actions, className, maxWidth = 'full', padding = 'lg' }) {
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        '2xl': 'max-w-7xl',
        '4xl': 'max-w-screen-xl',
        '7xl': 'max-w-screen-2xl',
        full: 'max-w-none'
    };
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-6 md:p-8'
    };
    return (_jsx("div", { className: cn("min-h-full", className), children: _jsxs("div", { className: cn("mx-auto", maxWidthClasses[maxWidth], paddingClasses[padding]), children: [breadcrumbs && breadcrumbs.length > 0 && (_jsx("div", { className: "mb-6", children: _jsx("nav", { className: "flex", "aria-label": "Breadcrumb", children: _jsx("ol", { className: "flex items-center space-x-1 text-sm", children: breadcrumbs.map((item, index) => (_jsxs("li", { className: "flex items-center", children: [index > 0 && _jsx("span", { className: "mx-2 text-[var(--hive-text-tertiary)]", children: "/" }), item.href ? (_jsx("a", { href: item.href, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: item.label })) : (_jsx("span", { className: "text-[var(--hive-text-primary)]", children: item.label }))] }, index))) }) }) })), (title || subtitle || actions) && (_jsx("div", { className: "mb-8", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [title && (_jsx("h1", { className: "text-2xl md:text-3xl font-semibold text-[var(--hive-text-primary)] font-['Space_Grotesk'] tracking-tight", children: title })), subtitle && (_jsx("p", { className: "mt-2 text-[var(--hive-text-tertiary)] text-base md:text-lg", children: subtitle }))] }), actions && (_jsx("div", { className: "flex-shrink-0", children: actions }))] }) })), _jsx("div", { className: "space-y-6", children: children })] }) }));
}
//# sourceMappingURL=page-container.js.map