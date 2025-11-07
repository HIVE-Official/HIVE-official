/**
 * Prettier configuration for the monorepo
 * Keeps formatting lightweight and consistent across apps and packages.
 */
export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  overrides: [
    { files: '*.md', options: { proseWrap: 'always' } },
  ],
};

