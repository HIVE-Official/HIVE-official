module.exports = {
  extends: [
    './base',
    'next/core-web-vitals'
  ],
  rules: {
    // Next.js specific rules
    '@next/next/no-html-link-for-pages': 'off', // We use app router
    
    // React rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // Override base rules for Next.js
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }]
  },
  env: {
    browser: true,
    es2022: true,
    node: true
  }
};