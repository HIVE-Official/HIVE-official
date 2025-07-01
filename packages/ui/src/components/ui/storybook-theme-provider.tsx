'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface StorybookThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: 'light' | 'dark';
  enableSystem?: boolean;
}

/**
 * Storybook-compatible theme provider that replaces next-themes
 * for isolated component development and testing
 */
export const StorybookThemeProvider: React.FC<StorybookThemeProviderProps> = ({
  children,
  attribute = 'class',
  defaultTheme = 'dark',
  enableSystem: _enableSystem = false,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);

  const toggleTheme = React.useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const contextValue = useMemo(() => ({
    theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  useEffect(() => {
    // Apply theme to document/body for Storybook
    if (attribute === 'class') {
      document.documentElement.className = theme;
      document.body.className = `min-h-screen bg-background font-sans antialiased ${theme}`;
    } else {
      document.documentElement.setAttribute(attribute, theme);
    }
  }, [theme, attribute]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`theme-${theme} min-h-screen bg-background text-foreground`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a StorybookThemeProvider');
  }
  return context;
}; 