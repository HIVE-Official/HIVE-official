import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import uiConfig from "../packages/ui/.storybook/main";

// Use the UI package config but pin stories to the monorepo path so Vite serves them correctly
const base = uiConfig as StorybookConfig;

const config: StorybookConfig = {
  ...base,
  stories: [
    "../packages/ui/src/**/*.mdx",
    "../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  viteFinal: async (incoming, options) => {
    // Run the UI package's viteFinal first (if present)
    const withUi = typeof base.viteFinal === 'function' ? await base.viteFinal(incoming, options as any) : incoming;
    // Force Vite root to packages/ui so /src/* maps to packages/ui/src/*
    return mergeConfig(withUi, {
      root: path.resolve(__dirname, '../packages/ui'),
      server: {
        fs: {
          allow: [
            path.resolve(__dirname, '../packages/ui'),
            path.resolve(__dirname, '..'),
            path.resolve(__dirname, '../../'),
          ],
        },
      },
    });
  },
};

export default config;
