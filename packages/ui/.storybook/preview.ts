import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/assets/globals.css'

// Global decorator to ensure proper theme and context setup
const ThemeDecorator = (Story: React.ComponentType) => {
  return React.createElement('div', {
    className: 'dark',
    style: {
      minHeight: '100vh',
      backgroundColor: 'hsl(0 0% 3.9%)', // --background
      color: 'hsl(0 0% 98%)', // --foreground
    }
  }, React.createElement(Story))
}

const preview: Preview = {
  decorators: [ThemeDecorator],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'hsl(0 0% 3.9%)', // HIVE background in HSL
        },
        {
          name: 'surface',
          value: 'hsl(0 0% 6.7%)', // HIVE surface in HSL
        },
      ],
    },
    viewport: {
      defaultViewport: 'responsive',
    },
    docs: {
      theme: {
        base: 'dark',
        brandTitle: 'HIVE Design System',
        brandUrl: '/',
        colorPrimary: 'hsl(47.9 95.8% 53.1%)', // Gold accent
        colorSecondary: 'hsl(0 0% 63.9%)', // Muted
        
        // UI
        appBg: 'hsl(0 0% 3.9%)',
        appContentBg: 'hsl(0 0% 6.7%)',
        appBorderColor: 'hsl(0 0% 14.9%)',
        appBorderRadius: 8,
        
        // Text colors
        textColor: 'hsl(0 0% 98%)',
        textInverseColor: 'hsl(0 0% 9%)',
        textMutedColor: 'hsl(0 0% 63.9%)',
        
        // Toolbar default and active colors
        barTextColor: 'hsl(0 0% 63.9%)',
        barSelectedColor: 'hsl(47.9 95.8% 53.1%)',
        barBg: 'hsl(0 0% 6.7%)',
        
        // Form colors
        inputBg: 'hsl(0 0% 14.9%)',
        inputBorder: 'hsl(0 0% 14.9%)',
        inputTextColor: 'hsl(0 0% 98%)',
        inputBorderRadius: 8,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark (HIVE Default)' },
          { value: 'light', title: 'Light (Testing Only)' }
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;