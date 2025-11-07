import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const aliasEntries = [
  {
    find: '@hive/tokens/hive-tokens-generated.css',
    replacement: path.resolve(__dirname, '../../tokens/hive-tokens-generated.css'),
  },
  {
    // Map Geist variable font assets to filesystem paths to bypass package export maps
    find: 'geist/dist/fonts/geist-sans/Geist-Variable.woff2',
    replacement: path.resolve(__dirname, '../../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2'),
  },
  {
    find: 'geist/dist/fonts/geist-mono/GeistMono-Variable.woff2',
    replacement: path.resolve(__dirname, '../../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2'),
  },
  {
    find: '@hive/tokens',
    replacement: path.resolve(__dirname, '../../tokens/src'),
  },
  {
    find: '@',
    replacement: path.resolve(__dirname, '../src'),
  },
  {
    find: '@hive/ui',
    replacement: path.resolve(__dirname, '../src'),
  },
  {
    find: '@hive/core',
    replacement: path.resolve(__dirname, '../../core/src'),
  },
  {
    find: '@hive/hooks',
    replacement: path.resolve(__dirname, '../../hooks/src'),
  },
  {
    find: '@hive/utilities',
    replacement: path.resolve(__dirname, '../../utilities/src'),
  },
  {
    find: '@hive/validation',
    replacement: path.resolve(__dirname, '../../validation/src'),
  },
  {
    // Completely exclude auth-logic from Storybook
    find: '@hive/auth-logic',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
  {
    // Mock Next.js navigation for Storybook
    find: 'next/navigation',
    replacement: path.resolve(__dirname, 'next-mocks.tsx'),
  },
  {
    find: 'next/router',
    replacement: path.resolve(__dirname, 'next-mocks.tsx'),
  },
  {
    // Mock next-themes for Storybook
    find: 'next-themes',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
  {
    // Mock navigation context hook
    find: '../../hooks/use-navigation-context',
    replacement: path.resolve(__dirname, 'navigation-context-mock.tsx'),
  },
  {
    // Mock server-side modules for browser compatibility
    find: 'firebase-admin',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
  {
    find: 'firebase-admin/firestore',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
  {
    find: 'firebase-admin/auth',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
  {
    find: 'google-cloud-firestore',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
  {
    find: 'google-auth-library',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
  {
    find: 'gcp-metadata',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
  {
    find: 'google-logging-utils',
    replacement: path.resolve(__dirname, 'mocks.tsx'),
  },
];

const config: StorybookConfig = {
  stories: [
    // Use a single, stable glob to avoid builder-vite glob edge cases
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    // storysource is not installed and causes noisy warnings; omit unless needed
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
      define: {
        global: 'globalThis',
        'process.env': '{}',
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.stdout': JSON.stringify({ isTTY: false }),
        'process.stderr': JSON.stringify({ isTTY: false }),
        'process.stdin': JSON.stringify({ isTTY: false }),
        'process.platform': JSON.stringify('browser'),
        'process.versions': '{}',
        'process.cwd': JSON.stringify('/'),
        'process.chdir': 'undefined',
        'process.exit': 'undefined',
      },
      resolve: {
        alias: aliasEntries,
      },
      server: {
        fs: {
          // Allow monorepo traversal when resolving stories and imports
          allow: [
            path.resolve(__dirname, '..'),
            path.resolve(__dirname, '../../'),
            path.resolve(__dirname, '../../../'),
          ],
        },
      },
      optimizeDeps: {
        include: [
          'framer-motion',
          'react',
          'react-dom',
          '@radix-ui/react-slot',
          '@radix-ui/react-tabs',
          '@radix-ui/react-label',
          '@radix-ui/react-scroll-area',
          '@radix-ui/react-tooltip',
          '@radix-ui/react-checkbox',
          '@radix-ui/react-radio-group',
          '@radix-ui/react-popover',
          '@radix-ui/react-separator',
          '@radix-ui/react-slider',
          '@radix-ui/react-toast',
          '@radix-ui/react-alert-dialog',
          '@radix-ui/react-avatar',
          '@radix-ui/react-dropdown-menu',
          'class-variance-authority',
          'clsx',
          'tailwind-merge',
          'lucide-react',
        ],
        exclude: [
          '@hive/core', 
          '@hive/auth-logic',
          '@hive/auth-logic/*',
          'firebase-admin',
          'firebase-admin/firestore',
          'firebase-admin/auth',
          'google-cloud-firestore',
          'google-auth-library',
          'gcp-metadata',
          'google-logging-utils'
        ],
      },
      build: {
        rollupOptions: {
          external: [
            '@hive/auth-logic',
            'firebase-admin',
            'firebase-admin/firestore',
            'firebase-admin/auth',
            'google-cloud-firestore',
            'google-auth-library',
            'gcp-metadata',
            'google-logging-utils',
            'fs',
            'path',
            'crypto',
            'util',
            'stream',
            'url',
            'querystring',
            'events',
            'child_process'
          ],
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
        chunkSizeWarningLimit: 2000, // Increase chunk size limit for large stories
        target: 'esnext', // Use modern JavaScript for better parsing
      },
      esbuild: {
        target: 'esnext',
        logOverride: { 'this-is-undefined-in-esm': 'silent' },
        // Increase memory limits for large files
        platform: 'browser'
      },
    });
  },
};

export default config; 
