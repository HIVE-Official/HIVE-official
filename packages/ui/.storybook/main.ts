import type { StorybookConfig } from '@storybook/react-vite';
import { join, dirname } from 'path';

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx', 
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath('@storybook/addon-controls'),
    getAbsolutePath('@storybook/addon-viewport'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config) {
    const { default: tsconfigPaths } = await import('vite-tsconfig-paths')
    
    // Ensure plugins array exists
    config.plugins = config.plugins || []
    
    // Add TypeScript path resolution
    config.plugins.push(tsconfigPaths())
    
    // Add path aliases for HIVE monorepo
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': join(__dirname, '../src'),
      '@hive/ui': join(__dirname, '../src'),
      '@hive/tokens': join(__dirname, '../../tokens/src'),
      '@hive/core': join(__dirname, '../../core/src'),
    }
    
    // Ensure CSS is processed correctly
    config.css = config.css || {}
    config.css.postcss = config.css.postcss || {}
    
    return config
  },
};

export default config;