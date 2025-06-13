import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
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
  },
  viteFinal: (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@hive/core': path.resolve(__dirname, '../../core/src'),
          '@hive/hooks': path.resolve(__dirname, '../../hooks/src'),
          '@hive/tokens': path.resolve(__dirname, '../../tokens/src'),
          '@hive/utilities': path.resolve(__dirname, '../../utilities/src'),
          '@hive/validation': path.resolve(__dirname, '../../validation/src'),
        },
      },
    });
  },
};

export default config; 