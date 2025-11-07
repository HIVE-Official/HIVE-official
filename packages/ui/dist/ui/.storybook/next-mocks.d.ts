/**
 * Next.js Navigation Mocks for Storybook
 *
 * These mocks replace Next.js router hooks that don't work in Storybook environment
 */
import { ReactNode } from 'react';
export declare const useRouter: () => {
    pathname: string;
    query: {};
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
    reload: () => void;
    prefetch: () => Promise<void>;
    beforePopState: () => void;
    events: {
        on: () => void;
        off: () => void;
        emit: () => void;
    };
    isFallback: boolean;
};
export declare const usePathname: () => string;
export declare const useSearchParams: () => URLSearchParams;
export declare const MockNavigationProvider: ({ children, initialPath }: {
    children: ReactNode;
    initialPath?: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useMockNavigation: () => {
    currentPath: string;
    isActive: (path: string, matchPaths?: string[]) => boolean;
    navigate: (path: string) => Promise<void>;
    goBack: () => void;
    goForward: () => void;
    generateBreadcrumbs: () => {
        label: string;
        href: string;
    }[];
    getPageTitle: () => string;
    getPageDescription: () => string;
};
export declare const useMockKeyboardNavigation: () => {
    handleKeyboardShortcut: (event: KeyboardEvent) => void;
    currentPath: string;
    isActive: (path: string, matchPaths?: string[]) => boolean;
    navigate: (path: string) => Promise<void>;
    goBack: () => void;
    goForward: () => void;
    generateBreadcrumbs: () => {
        label: string;
        href: string;
    }[];
    getPageTitle: () => string;
    getPageDescription: () => string;
};
//# sourceMappingURL=next-mocks.d.ts.map