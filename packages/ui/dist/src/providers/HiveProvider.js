/**
 * HIVE Provider
 * Main application provider that wraps all other providers
 * This is the root provider for the entire HIVE platform
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { NotificationProvider } from '../systems/modal-toast-system';
import UniversalShell from '../shells/UniversalShell';
const HiveContext = createContext({
    config: {
        environment: 'development',
        campusId: 'ub-buffalo',
        features: {
            rituals: true,
            tools: true,
            events: true,
            messaging: true,
        },
        theme: {
            primaryColor: 'var(--hive-brand-secondary)',
            mode: 'dark',
        },
    },
    user: null,
    isAuthenticated: false,
    isLoading: true,
    updateConfig: () => { },
});
export const useHive = () => useContext(HiveContext);
// Main HIVE Provider
export const HiveProvider = ({ children, config: initialConfig, withShell = true, shellProps = {} }) => {
    const [config, setConfig] = useState({
        environment: initialConfig?.environment || 'development',
        campusId: initialConfig?.campusId || 'ub-buffalo',
        features: {
            rituals: initialConfig?.features?.rituals ?? true,
            tools: initialConfig?.features?.tools ?? true,
            events: initialConfig?.features?.events ?? true,
            messaging: initialConfig?.features?.messaging ?? true,
        },
        theme: {
            primaryColor: initialConfig?.theme?.primaryColor || 'var(--hive-brand-secondary)',
            mode: initialConfig?.theme?.mode || 'dark',
        },
    });
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Initialize user session
    useEffect(() => {
        const initializeSession = async () => {
            try {
                // Check for existing session
                const sessionData = localStorage.getItem('hive-session');
                if (sessionData) {
                    const session = JSON.parse(sessionData);
                    setUser(session.user);
                }
            }
            catch (error) {
                console.error('Failed to initialize session:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        initializeSession();
    }, []);
    // Apply theme
    useEffect(() => {
        document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
        document.documentElement.className = config.theme.mode;
    }, [config.theme]);
    const updateConfig = (updates) => {
        setConfig(prev => ({
            ...prev,
            ...updates,
            features: {
                ...prev.features,
                ...updates.features,
            },
            theme: {
                ...prev.theme,
                ...updates.theme,
            },
        }));
    };
    const content = withShell ? (_jsx(UniversalShell, { ...shellProps, children: children })) : children;
    return (_jsx(HiveContext.Provider, { value: {
            config,
            user,
            isAuthenticated: !!user,
            isLoading,
            updateConfig,
        }, children: _jsx(NotificationProvider, { children: content }) }));
};
// Layout Wrapper Components
export const PageWrapper = ({ children, className = '', maxWidth = '2xl', padding = true }) => {
    const maxWidths = {
        sm: 'max-w-2xl',
        md: 'max-w-4xl',
        lg: 'max-w-6xl',
        xl: 'max-w-7xl',
        '2xl': 'max-w-max-w-screen-2xl',
        full: 'max-w-full',
    };
    return (_jsx("div", { className: `page-wrapper min-h-screen ${className}`, children: _jsx("div", { className: `${maxWidths[maxWidth]} mx-auto ${padding ? 'p-4 lg:p-8' : ''}`, children: children }) }));
};
// Section Wrapper
export const SectionWrapper = ({ children, className = '', title, description, actions }) => {
    return (_jsxs("section", { className: `section-wrapper ${className}`, children: [(title || description || actions) && (_jsxs("div", { className: "section-header mb-6 flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [title && (_jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: title })), description && (_jsx("p", { className: "text-white/60", children: description }))] }), actions && (_jsx("div", { className: "section-actions ml-4", children: actions }))] })), _jsx("div", { className: "section-content", children: children })] }));
};
// Grid Layout Wrapper
export const GridWrapper = ({ children, columns = 3, gap = 'md', responsive = true, className = '' }) => {
    const gaps = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
    };
    const columnClasses = responsive ? {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
        6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    } : {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
    };
    return (_jsx("div", { className: `grid ${columnClasses[columns]} ${gaps[gap]} ${className}`, children: children }));
};
// Flex Layout Wrapper
export const FlexWrapper = ({ children, direction = 'row', justify = 'start', align = 'stretch', gap = 'md', wrap = false, className = '' }) => {
    const directionClasses = {
        row: 'flex-row',
        col: 'flex-col',
    };
    const justifyClasses = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
    };
    const alignClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
    };
    const gapClasses = {
        none: '',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
    };
    return (_jsx("div", { className: `
      flex
      ${directionClasses[direction]}
      ${justifyClasses[justify]}
      ${alignClasses[align]}
      ${gapClasses[gap]}
      ${wrap ? 'flex-wrap' : ''}
      ${className}
    `, children: children }));
};
// Loading State Wrapper
export const LoadingWrapper = ({ isLoading, children, fallback, className = '' }) => {
    if (isLoading) {
        return (_jsx("div", { className: `loading-wrapper flex items-center justify-center min-h- ${className}`, children: fallback || (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-12 h-12 mx-auto mb-4 border-4 border-[var(--hive-brand-secondary)] border-t-transparent rounded-full animate-spin" }), _jsx("p", { className: "text-white/60", children: "Loading..." })] })) }));
    }
    return _jsx(_Fragment, { children: children });
};
// Error Boundary Wrapper
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback || (_jsx("div", { className: "error-boundary p-8 text-center", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx("div", { className: "text-6xl mb-4", children: "\u26A0\uFE0F" }), _jsx("h2", { className: "text-2xl font-bold text-white mb-2", children: "Something went wrong" }), _jsx("p", { className: "text-white/60 mb-4", children: this.state.error?.message || 'An unexpected error occurred' }), _jsx("button", { onClick: () => window.location.reload(), className: "px-4 py-2 bg-[var(--hive-brand-secondary)] text-black font-medium rounded-lg hover:bg-[var(--hive-brand-secondary-hover)] transition-colors", children: "Reload Page" })] }) }));
        }
        return this.props.children;
    }
}
// Export everything
export default {
    HiveProvider,
    PageWrapper,
    SectionWrapper,
    GridWrapper,
    FlexWrapper,
    LoadingWrapper,
    ErrorBoundary,
    useHive,
};
//# sourceMappingURL=HiveProvider.js.map