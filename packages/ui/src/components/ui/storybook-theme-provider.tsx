'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

export interface StorybookThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
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
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    // Apply theme to document/body for Storybook
    if (attribute === 'class') {
      document.documentElement.className = theme;
      document.body.className = `min-h-screen bg-background font-sans antialiased ${theme}`;
    } else {
      document.documentElement.setAttribute(attribute, theme);
    }
  }, [theme, attribute]);

  const contextValue = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a StorybookThemeProvider');
  }
  return context;
}; 