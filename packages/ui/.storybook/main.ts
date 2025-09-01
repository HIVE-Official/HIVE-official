import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    // 🏗️ FOUNDATION ONLY - Core design system and tokens
    '../src/stories/00-Foundation/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🧱 ATOMIC COMPONENTS ONLY - Working building blocks
    '../src/atomic/atoms/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/atomic/molecules/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/atomic/organisms/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🔐 AUTH & ONBOARDING - Complete user flows
    '../src/stories/10-Auth-Onboarding/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    });
  },
};

export default config; 