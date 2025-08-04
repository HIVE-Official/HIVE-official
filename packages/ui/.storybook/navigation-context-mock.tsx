/**
 * Mock Navigation Context for Storybook
 * 
 * Replaces the use-navigation-context hook that depends on Next.js router
 */

import React, { useState } from 'react';

// Mock the navigation context hook
export const useNavigation = () => {
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
      { label: 'Spaces', href: '/spaces' },
      { label: 'Current Page' }
    ],
    getPageTitle: () => 'Mock Page Title',
    getPageDescription: () => 'Mock page description',
  };
};

export const useKeyboardNavigation = () => {
  const navigation = useNavigation();
  
  return {
    ...navigation,
    handleKeyboardShortcut: (event: KeyboardEvent) => {
      console.log('Mock keyboard shortcut:', event.key);
      // Don't prevent default in Storybook to avoid interfering with Storybook shortcuts
    },
  };
};