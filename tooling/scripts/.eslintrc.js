module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // Allow require() imports for Node.js scripts
    "@typescript-eslint/no-require-imports": "off",
    // Allow console usage in scripts
    "no-console": "off",
    // Allow unused vars starting with underscore
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
}; 