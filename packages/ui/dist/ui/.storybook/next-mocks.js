import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Next.js Navigation Mocks for Storybook
 *
 * These mocks replace Next.js router hooks that don't work in Storybook environment
 */
import { createContext, useContext, useState } from 'react';
const MockRouterContext = createContext(null);
// Next.js navigation mocks
export const useRouter = () => {
    const [pathname, setPathname] = useState('/');
    const [query] = useState({});
    return {
        pathname,
        query,
        push: (url) => {
            console.log('Mock router push:', url);
            setPathname(url);
        },
        replace: (url) => {
            console.log('Mock router replace:', url);
            setPathname(url);
        },
        back: () => {
            console.log('Mock router back');
        },
        forward: () => {
            console.log('Mock router forward');
        },
        reload: () => {
            console.log('Mock router reload');
        },
        prefetch: async () => {
            console.log('Mock router prefetch');
        },
        beforePopState: () => {
            console.log('Mock router beforePopState');
        },
        events: {
            on: () => { },
            off: () => { },
            emit: () => { },
        },
        isFallback: false,
    };
};
export const usePathname = () => {
    const context = useContext(MockRouterContext);
    return context?.pathname || '/';
};
export const useSearchParams = () => {
    const searchParams = new URLSearchParams();
    return searchParams;
};
// Mock navigation context provider
export const MockNavigationProvider = ({ children, initialPath = '/' }) => {
    const [pathname, setPathname] = useState(initialPath);
    const mockRouter = {
        pathname,
        query: {},
        push: (url) => {
            setPathname(url);
        },
        replace: (url) => {
            setPathname(url);
        },
        back: () => {
            console.log('Mock back');
        },
        forward: () => {
            console.log('Mock forward');
        },
    };
    return (_jsx(MockRouterContext.Provider, { value: mockRouter, children: children }));
};
// Mock the navigation context hook
export const useMockNavigation = () => {
    const [currentPath, setCurrentPath] = useState('/');
    return {
        currentPath,
        isActive: (path, matchPaths) => {
            return currentPath === path || (matchPaths && matchPaths.includes(currentPath));
        },
        navigate: async (path) => {
            setCurrentPath(path);
            console.log('Mock navigate to:', path);
        },
        goBack: () => {
            console.log('Mock go back');
        },
        goForward: () => {
            console.log('Mock go forward');
        },
        generateBreadcrumbs: () => [
            { label: 'Home', href: '/' },
            { label: 'Current', href: currentPath }
        ],
        getPageTitle: () => 'Mock Page Title',
        getPageDescription: () => 'Mock page description',
    };
};
export const useMockKeyboardNavigation = () => {
    const navigation = useMockNavigation();
    return {
        ...navigation,
        handleKeyboardShortcut: (event) => {
            console.log('Mock keyboard shortcut:', event.key);
        },
    };
};
//# sourceMappingURL=next-mocks.js.map