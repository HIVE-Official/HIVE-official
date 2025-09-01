// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import storybookPlugin from "eslint-plugin-storybook";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Patch Storybook config for ESLint 9 compatibility
const patchedStorybookConfig = fixupConfigRules([
  ...compat.extends("plugin:storybook/recommended"),
]);

export default [
  // Base JavaScript config
  js.configs.recommended,

  // TypeScript configs for non-story files
  ...tseslint.configs.recommended,

  // Main UI package files with TypeScript parsing
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "**/*.stories.{js,jsx,ts,tsx}",
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "src/stories/generate-missing-stories.ts",
    ],
    plugins: {
      import: fixupPluginRules(importPlugin),
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "import/no-anonymous-default-export": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      // Allow some flexibility for UI package
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
    },
  },

  // Story files WITHOUT TypeScript project parsing to avoid config conflicts
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    plugins: {
      storybook: fixupPluginRules(storybookPlugin),
    },
    languageOptions: {
      parser: tseslint.parser,
      // NO project parsing for stories - they're excluded from tsconfig
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Storybook specific rules
      "storybook/hierarchy-separator": "error",
      "storybook/default-exports": "error",
      "storybook/csf-component": "error",
      "storybook/no-redundant-story-name": "error",
      "storybook/prefer-pascal-case": "error",
      "storybook/story-exports": "error",
      "storybook/await-interactions": "error",
      "storybook/use-storybook-expect": "error",
      // Stories can have flexible structure
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Node.js CJS files - allow require() and Node globals
  {
    files: ["**/*.cjs"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        process: "readonly",
        console: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },

  // Global ignore patterns
  {
    ignores: [
      "storybook-static/**",
      ".storybook/**",
      "dist/**",
      "vite.config.ts",
      "postcss.config.js",
      "tailwind.config.js",
      "tailwind.config.ts",
      "*.config.*",
      "node_modules/**",
      "src/stories/generate-missing-stories.ts",
    ],
  },
];
