// ESLint configuration for detecting hardcoded values in HIVE components
// Enforces design token usage and PRD compliance

module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    // Detect hardcoded hex colors
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value=/^#[0-9A-Fa-f]{6}$/]',
        message: 'Hardcoded hex colors are not allowed. Use design tokens from @hive/tokens instead.',
      },
      {
        selector: 'Literal[value=/^#[0-9A-Fa-f]{3}$/]',
        message: 'Hardcoded hex colors are not allowed. Use design tokens from @hive/tokens instead.',
      },
      {
        selector: 'Literal[value=/^rgb\\(/]',
        message: 'Hardcoded RGB colors are not allowed. Use design tokens from @hive/tokens instead.',
      },
      {
        selector: 'Literal[value=/^rgba\\(/]',
        message: 'Hardcoded RGBA colors are not allowed. Use design tokens from @hive/tokens instead.',
      },
      // Detect hardcoded pixel values (except 0, 1px borders)
      {
        selector: 'Literal[value=/^[0-9]+px$/]:not([value="0px"]):not([value="1px"])',
        message: 'Hardcoded pixel values should use spacing tokens. Use tokens from @hive/tokens instead.',
      },
      // Detect hardcoded rem values (except common small values)
      {
        selector: 'Literal[value=/^[0-9.]+rem$/]:not([value="0rem"]):not([value="0.125rem"]):not([value="0.25rem"])',
        message: 'Hardcoded rem values should use spacing tokens. Use tokens from @hive/tokens instead.',
      },
    ],
    
    // Detect legacy luxury color token usage
    'no-restricted-patterns': [
      'error',
      {
        selector: 'Literal[value*="hive-obsidian"]',
        message: 'Legacy luxury token "hive-obsidian" detected. Migrate to PRD-aligned tokens: use "bg-black" or semantic tokens.',
      },
      {
        selector: 'Literal[value*="hive-charcoal"]',
        message: 'Legacy luxury token "hive-charcoal" detected. Migrate to PRD-aligned tokens: use "bg-gray-900" or semantic tokens.',
      },
      {
        selector: 'Literal[value*="hive-platinum"]',
        message: 'Legacy luxury token "hive-platinum" detected. Migrate to PRD-aligned tokens: use "text-white" or semantic tokens.',
      },
      {
        selector: 'Literal[value*="hive-champagne"]',
        message: 'Legacy luxury token "hive-champagne" detected. Migrate to PRD-aligned gold tokens.',
      },
      {
        selector: 'Literal[value*="hive-bronze"]',
        message: 'Legacy luxury token "hive-bronze" detected. Migrate to PRD-aligned gold tokens.',
      },
    ],
  },
  
  // Override for specific files where hardcoded values are acceptable
  overrides: [
    {
      // Allow hardcoded values in Storybook stories for documentation
      files: ['**/*.stories.tsx', '**/*.stories.ts'],
      rules: {
        'no-restricted-syntax': 'warn', // Warn instead of error
        'no-restricted-patterns': 'warn',
      },
    },
    {
      // Allow hardcoded values in design token definition files
      files: ['**/tokens/**/*.ts', '**/tokens/**/*.tsx'],
      rules: {
        'no-restricted-syntax': 'off',
        'no-restricted-patterns': 'off',
      },
    },
    {
      // Allow hardcoded values in test files for mocking
      files: ['**/*.test.tsx', '**/*.test.ts', '**/*.spec.tsx', '**/*.spec.ts'],
      rules: {
        'no-restricted-syntax': 'warn',
        'no-restricted-patterns': 'warn',
      },
    },
  ],
};