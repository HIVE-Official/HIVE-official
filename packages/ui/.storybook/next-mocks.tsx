/**
 * Next.js Navigation Mocks for Storybook
 * 
 * These mocks replace Next.js router hooks that don't work in Storybook environment
 */

import React, { createContext, useContext, ReactNode, useState } from 'react';

// Mock router context
interface MockRouterContext {
  pathname: string;
  push: (url: string) => void;
  replace: (url: string) => void;
  back: () => void;
  forward: () => void;
  query: Record<string, string>;
}

const MockRouterContext = createContext<MockRouterContext | null>(null);

// Next.js navigation mocks
export const useRouter = () => {
  const [pathname, setPathname] = useState('/');
  const [query] = useState({});

  return {
    pathname,
    query,
    push: (url: string) => {
      console.log('Mock router push:', url);
      setPathname(url);
    },
    replace: (url: string) => {
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
      on: () => {},
      off: () => {},
      emit: () => {},
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
export const MockNavigationProvider = ({ 
  children, 
  initialPath = '/' 
}: { 
  children: ReactNode; 
  initialPath?: string;
}) => {
  const [pathname, setPathname] = useState(initialPath);

  const mockRouter: MockRouterContext = {
    pathname,
    query: {},
    push: (url: string) => {
      setPathname(url);
    },
    replace: (url: string) => {
      setPathname(url);
    },
    back: () => {
      console.log('Mock back');
    },
    forward: () => {
      console.log('Mock forward');
    },
  };

  return (
    <MockRouterContext.Provider value={mockRouter}>
      {children}
    </MockRouterContext.Provider>
  );
};

// Mock the navigation context hook
export const useMockNavigation = () => {
  const [currentPath, setCurrentPath] = useState('/');

  return {
    currentPath,
    isActive: (path: string, matchPaths?: string[]) => {
      return currentPath === path || (matchPaths && matchPaths.includes(currentPath));
    },
    navigate: async (path: string) => {
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
    handleKeyboardShortcut: (event: KeyboardEvent) => {
      console.log('Mock keyboard shortcut:', event.key);
    },
  };
};