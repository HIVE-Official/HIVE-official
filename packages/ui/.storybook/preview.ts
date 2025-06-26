import type { Preview } from '@storybook/react'
import { withThemeByDataAttribute } from '@storybook/addon-themes'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
          value: 'hsl(0 0% 3.9%)', // HIVE background
        },
        {
          name: 'surface',
          value: 'hsl(0 0% 6.7%)', // HIVE surface
        },
      ],
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
      attributeName: 'data-mode',
    }),
  ],
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
  tags: ['autodocs'],
};

export default preview;