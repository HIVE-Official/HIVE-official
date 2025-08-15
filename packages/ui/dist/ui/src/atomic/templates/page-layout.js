'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { Text } from '../atoms/text';
import { Button } from '../atoms/button';
const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-3xl',
    lg: 'max-w-5xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-8xl',
    full: 'max-w-full'
};
const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
};
const backgroundClasses = {
    default: 'bg-hive-background-primary',
    alt: 'bg-hive-background-secondary',
    glass: 'bg-hive-background-overlay backdrop-blur-md'
};
export const PageLayout = ({ title, subtitle, actions, breadcrumbs, maxWidth = 'xl', padding = 'md', background = 'default', stickyHeader = false, hideHeaderOnMobile = false, loading = false, error, children, className }) => {
    const hasHeader = title || subtitle || actions || breadcrumbs;
    // Loading State
    if (loading) {
        return (_jsx("div", { className: cn('min-h-screen flex items-center justify-center', backgroundClasses[background]), children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "w-8 h-8 border-2 border-hive-gold border-t-transparent rounded-full animate-spin mx-auto" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Loading..." })] }) }));
    }
    // Error State  
    if (error) {
        return (_jsx("div", { className: cn('min-h-screen flex items-center justify-center', backgroundClasses[background], paddingClasses[padding]), children: _jsxs("div", { className: "text-center space-y-4 max-w-md", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-hive-ruby/10 flex items-center justify-center mx-auto", children: _jsx("div", { className: "w-6 h-6 rounded-full bg-hive-ruby" }) }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "heading-lg", color: "primary", children: "Something went wrong" }), _jsx(Text, { variant: "body-md", color: "secondary", children: error })] }), _jsx(Button, { variant: "primary", onClick: () => window.location.reload(), children: "Try Again" })] }) }));
    }
    return (_jsxs("div", { className: cn('min-h-screen', backgroundClasses[background], className), children: [hasHeader && (_jsx("header", { className: cn('border-b border-hive-border-default', stickyHeader && 'sticky top-0 z-40 backdrop-blur-md bg-hive-background-primary/80', hideHeaderOnMobile && 'hidden sm:block'), children: _jsx("div", { className: cn('mx-auto', maxWidthClasses[maxWidth], paddingClasses[padding]), children: _jsxs("div", { className: "space-y-4", children: [breadcrumbs && (_jsx("div", { className: "flex items-center", children: breadcrumbs })), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { className: "space-y-2", children: [title && (_jsx(Text, { variant: "heading-xl", color: "primary", as: "h1", children: title })), subtitle && (_jsx(Text, { variant: "body-lg", color: "secondary", children: subtitle }))] }), actions && (_jsx("div", { className: "flex items-center gap-3", children: actions }))] })] }) }) })), _jsx("main", { className: cn('mx-auto', maxWidthClasses[maxWidth], paddingClasses[padding], hasHeader && 'pt-6'), children: children })] }));
};
//# sourceMappingURL=page-layout.js.map