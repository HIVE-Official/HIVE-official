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
    '../src/stories/05-shell/**/*.stories.@(js|jsx|ts|tsx)', // HIVE Shell System
    '../src/stories/05-pages/**/*.stories.@(js|jsx|ts|tsx)',
    
    // SYSTEM-BASED ORGANIZATION
    '../src/stories/Profile/**/*.stories.@(js|jsx|ts|tsx)', // Profile System
    '../src/stories/Search/**/*.stories.@(js|jsx|ts|tsx)', // Search System
    '../src/stories/Admin/**/*.stories.@(js|jsx|ts|tsx)', // Admin System
    '../src/stories/Settings/**/*.stories.@(js|jsx|ts|tsx)', // Settings System
    '../src/stories/01-Atomic-Components/**/*.stories.@(js|jsx|ts|tsx)', // Atomic Components
    '../src/stories/02-Molecular-Components/**/*.stories.@(js|jsx|ts|tsx)', // Molecular Components
    '../src/stories/03-Navigation-System/**/*.stories.@(js|jsx|ts|tsx)', // Navigation System
    '../src/stories/04-Spaces-System/**/*.stories.@(js|jsx|ts|tsx)', // Spaces System
    '../src/stories/05-Profile-System/**/*.stories.@(js|jsx|ts|tsx)', // Profile System (Legacy)
    '../src/stories/06-feed-rituals/**/*.stories.@(js|jsx|ts|tsx)', // Feed & Rituals
    '../src/stories/07-Tools-Creation/**/*.stories.@(js|jsx|ts|tsx)', // Tools & Creation
    '../src/stories/99-System-Integration/**/*.stories.@(js|jsx|ts|tsx)', // System Integration
    
    // ATOMIC DESIGN SYSTEM - Co-located stories (NEW)
    '../src/atomic/**/*.stories.@(js|jsx|ts|tsx)',
    
    // Include all MDX docs
    '../src/**/*.mdx'
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
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/\.stories\.tsx?$/],
          include: [path.resolve(__dirname, '../src')],
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
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
          // Mock Next.js navigation for Storybook
          'next/navigation': path.resolve(__dirname, 'next-mocks.tsx'),
          'next/router': path.resolve(__dirname, 'next-mocks.tsx'),
          // Mock navigation context hook
          '../../hooks/use-navigation-context': path.resolve(__dirname, 'navigation-context-mock.tsx'),
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