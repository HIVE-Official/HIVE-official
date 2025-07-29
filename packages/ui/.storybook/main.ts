import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    // ORGANIZED ATOMIC DESIGN SYSTEM - Clean structure
    '../src/stories/00-foundation/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/01-atoms/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/02-molecules/**/*.stories.@(js|jsx|ts|tsx)', // Re-enabled with comprehensive new stories
    '../src/stories/03-organisms/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/04-templates/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/05-pages/**/*.stories.@(js|jsx|ts|tsx)',
    
    // Include all MDX docs
    '../src/**/*.mdx'
  ],
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
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@hive/core': path.resolve(__dirname, '../../core/src'),
          '@hive/hooks': path.resolve(__dirname, '../../hooks/src'),
          '@hive/tokens': path.resolve(__dirname, '../../tokens/src'),
          '@hive/utilities': path.resolve(__dirname, '../../utilities/src'),
          '@hive/validation': path.resolve(__dirname, '../../validation/src'),
          // Completely exclude auth-logic from Storybook
          '@hive/auth-logic': path.resolve(__dirname, 'mocks.tsx'),
          // Mock server-side modules for browser compatibility
          'firebase-admin': path.resolve(__dirname, 'mocks.tsx'),
          'firebase-admin/firestore': path.resolve(__dirname, 'mocks.tsx'),
          'firebase-admin/auth': path.resolve(__dirname, 'mocks.tsx'),
          'google-cloud-firestore': path.resolve(__dirname, 'mocks.tsx'),
          'google-auth-library': path.resolve(__dirname, 'mocks.tsx'),
          'gcp-metadata': path.resolve(__dirname, 'mocks.tsx'),
          'google-logging-utils': path.resolve(__dirname, 'mocks.tsx'),
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
        chunkSizeWarningLimit: 1000, // Increase chunk size limit
      },
    });
  },
};

export default config; 