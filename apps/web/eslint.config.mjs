// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // Base JavaScript config
  js.configs.recommended,

  // TypeScript ESLint configs
  ...tseslint.configs.recommended,

  // Add Next.js specific config
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },

  // Main configuration for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        NodeJS: "readonly",
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        global: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // HIVE MONOREPO ARCHITECTURE RULES
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@hive/*/**"],
              message:
                "Deep imports from @hive packages are not allowed. Import from the package's main entry point (e.g., '@hive/ui') instead.",
            },
          ],
        },
      ],

      // CRITICAL ERROR PREVENTION RULES (MUST be error level per @error-prevention-and-linting-strict.mdc)
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "no-unused-vars": "off", // Turn off base rule in favor of TypeScript rule

      // CRITICAL TYPE SAFETY (temporarily disabled for infrastructure cleanup)
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",

      // Next.js specific rules are now handled by the plugin config above

      // React specific rules
      "react/no-unescaped-entities": "off",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/no-deprecated": "warn",
      "react/no-direct-mutation-state": "error",
      "react/no-is-mounted": "error",
      "react/no-unknown-property": "error",
      "react/prop-types": "off", // We use TypeScript for prop validation
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react-hooks/exhaustive-deps": "warn",

      // Other helpful rules
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "off", // Allow console statements for now
    },
  },

  // Test files configuration
  {
    files: ["**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
        vi: "readonly",
        vitest: "readonly",
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "off", // Allow floating promises in tests
    },
  },

  // API routes - be even more lenient
  {
    files: ["src/app/api/**/*.ts"],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
    },
  },

  // File-specific overrides
  {
    files: ["src/app/legal/**/*.tsx", "src/app/profile/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["src/app/onboarding/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Generated files configuration
  {
    files: ["**/*.d.ts", "**/*.js"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  // Ignore patterns specific to web app
  {
    ignores: [
      ".next/**",
      "out/**",
      "public/**",
      "playwright-report/**",
      "test-results/**",
      "node_modules/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "src/lib/env.d.ts",
      "src/lib/env.js",
      "src/lib/firebase-admin.d.ts",
      "src/lib/firebase-admin.js",
      "test/e2e/types.d.ts",
    ],
  },
];
