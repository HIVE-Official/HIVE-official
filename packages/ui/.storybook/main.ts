import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';

const config: StorybookConfig = {
  stories: [
    // 🏗️ FOUNDATION FIRST - Core design system and tokens
    '../src/stories/00-Foundation/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/atomic/foundations/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🧱 ATOMIC BUILDING BLOCKS - Core UI components
    '../src/stories/01-Atoms/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/atomic/atoms/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🔗 MOLECULES - Combined atomic elements
    '../src/stories/02-Molecules/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/atomic/molecules/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🏛️ ORGANISMS - Complex component systems
    '../src/stories/03-Organisms/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/atomic/organisms/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 📱 FEATURE SLICE: Authentication & Onboarding
    '../src/stories/10-Auth-Onboarding/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/auth/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/onboarding/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🧭 FEATURE SLICE: Navigation & Layout
    '../src/stories/11-Navigation-Layout/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/navigation/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/navigation/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 👤 FEATURE SLICE: Profile System
    '../src/stories/12-Profile-System/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/profile/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🏠 FEATURE SLICE: Spaces & Communities
    '../src/stories/13-Spaces-Communities/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/spaces/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 📰 FEATURE SLICE: Feed & Social
    '../src/stories/14-Feed-Social/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/social/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🔧 FEATURE SLICE: Tools & Creation
    '../src/stories/15-Tools-Creation/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/tools/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/creators/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/hivelab/**/*.stories.@(js|jsx|ts|tsx)',
    
    // ⚡ FEATURE SLICE: Rituals & Coordination
    '../src/stories/16-Rituals-Coordination/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/rituals/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🎓 FEATURE SLICE: Campus Integration
    '../src/stories/17-Campus-Integration/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/campus/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/mobile/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🔐 FEATURE SLICE: Admin & Moderation
    '../src/stories/18-Admin-Moderation/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/admin/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🏗️ PLATFORM SYSTEMS - Cross-cutting concerns
    '../src/stories/90-Platform-Systems/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/shell/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/dashboard/**/*.stories.@(js|jsx|ts|tsx)',
    
    // 🔬 DEVELOPMENT & QUALITY
    '../src/stories/99-Development/**/*.stories.@(js|jsx|ts|tsx)',
    
    // Include all MDX documentation
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
          // Mock next-themes for Storybook
          'next-themes': path.resolve(__dirname, 'mocks.tsx'),
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