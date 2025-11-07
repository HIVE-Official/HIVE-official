// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import tseslint from "typescript-eslint";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPluginModule from "@next/eslint-plugin-next";
const nextPlugin = nextPluginModule.default ?? nextPluginModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Patch Next.js config for ESLint 9 compatibility
const patchedNextConfig = [];

// Patch Storybook config for ESLint 9 compatibility
const patchedStorybookConfig = fixupConfigRules([
  ...compat.extends("plugin:storybook/recommended"),
]);

const config = [
  // Base JavaScript config
  js.configs.recommended,

  {
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
  },

  // TypeScript configs for regular TypeScript files
  ...tseslint.configs.recommended,

  // Main TypeScript files with full type checking
  {
    files: [
      "apps/web/src/**/*.{ts,tsx}",
      "packages/*/src/**/*.{ts,tsx}",
      "functions/src/**/*.ts",
    ],
    ignores: [
      "**/*.stories.{js,jsx,ts,tsx}",
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // Storybook stories files - NO TypeScript project parsing
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        // NO project parsing for stories
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Test files - relaxed TypeScript rules
  {
    files: [
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/__mocks__/**/*.{js,jsx,ts,tsx}",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

// Note: next/core-web-vitals via legacy config can duplicate plugin registrations
// under ESLint 9 flat config. To avoid "Cannot redefine plugin 'react-hooks'",
// we omit the Next preset here and rely on the TypeScript base + local rules.

  // Firebase Functions - relaxed type checking
  {
    files: ["functions/src/**/*.ts", "packages/firebase/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["./functions/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_|^context$" },
      ],
    },
  },

  // Comprehensive ignore patterns
  {
    ignores: [
      // Build outputs and caches
      "**/storybook-static/**",
      "**/dist/**",
      "**/build/**",
      "**/node_modules/**",
      "**/.turbo/**",
      "**/.next/**",
      "**/coverage/**",
      "**/lib/**/*.js",

      // Configuration files
      "**/eslint.config.mjs",
      "**/eslint.config.js",
      "**/tailwind.config.js",
      "**/tailwind.config.ts",
      "**/postcss.config.js",
      "**/next.config.js",
      "**/next.config.mjs",
      "**/vite.config.js",
      "**/vite.config.ts",

      // Storybook configuration
      "**/.storybook/**",

      // Firebase functions compiled
      "**/functions/lib/**",
      "**/functions/dist/**",
      // Firebase maintenance scripts and local scripts
      "firebase/datafix/**",
      "firebase/scripts/**",
      "scripts/**",

      // Orphaned files
      "src/components/**",
      "src/lib/**",
      "src/types/**",
    ],
  },

  // File-specific overrides
  {
    files: [
      "apps/web/src/app/legal/**/*.tsx",
      "apps/web/src/app/profile/**/*.tsx",
    ],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["apps/web/src/app/onboarding/**/*.tsx"],
    rules: {
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default config;
