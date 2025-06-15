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
    disableTelemetry: true,
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
      build: {
        rollupOptions: {
          external: [],
          onwarn(warning, warn) {
            // Suppress "use client" directive warnings from third-party libraries
            if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && 
                warning.message.includes('"use client"')) {
              return;
            }
            // Suppress sourcemap warnings for components
            if (warning.code === 'SOURCEMAP_ERROR') {
              return;
            }
            // Suppress eval warnings from Storybook core (known issue)
            if (warning.message.includes('Use of eval') && 
                warning.message.includes('@storybook/core')) {
              return;
            }
            // Suppress external dependency warnings for workspace packages
            if (warning.code === 'UNRESOLVED_IMPORT' && 
                warning.message.includes('@hive/')) {
              return;
            }
            warn(warning);
          },
        },
        chunkSizeWarningLimit: 1000, // Increase chunk size limit
      },
    });
  },
};

export default config; 