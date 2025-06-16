module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    "/generated/**/*", // Ignore generated files.
    "**/*.js", // Ignore JavaScript files
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    indent: ["error", 2],
    // Core safety rules
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // Temporarily relax unsafe rules while we fix infrastructure
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unsafe-argument": "warn",
    // Other helpful rules
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
  },
  // Special handling for test files
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.spec.ts"],
      env: {
        mocha: true,
      },
      rules: {
        "@typescript-eslint/no-unused-expressions": "off", // Allow chai assertions
        "@typescript-eslint/no-explicit-any": "off", // Allow any in tests
      },
    },
  ],
};
