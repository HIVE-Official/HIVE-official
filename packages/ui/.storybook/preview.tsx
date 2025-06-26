import React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles/globals.css';

// Global decorator to wrap all stories
const withProviders = (Story: React.ComponentType) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
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
          value: 'hsl(var(--background))',
        },
        {
          name: 'light',
          value: 'hsl(var(--background-light))',
        },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    withProviders,
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
      attributeName: 'data-mode',
    }),
  ],
};

export default preview; 