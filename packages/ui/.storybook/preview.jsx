import React from 'react';
import { ThemeProvider } from "../src/components/theme-provider";
import '../src/globals.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [
    (Story) => (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="bg-bg-canvas text-text-primary h-screen w-screen">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
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
        { name: 'dark', value: '#0A0A0A' },
        { name: 'light', value: '#FFFFFF' },
      ],
    },
  },
};

export default preview; 