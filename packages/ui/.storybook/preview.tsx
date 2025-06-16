import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from 'next-themes';
import '../src/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' },
        { name: 'light', value: '#FFFFFF' },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <div className="min-h-screen bg-background text-foreground">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview; 