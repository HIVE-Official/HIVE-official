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
  // Make @typescript-eslint plugin available globally for rule references
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
  },
  // Base JavaScript config
  js.configs.recommended,

  // TypeScript configs are applied within scoped blocks below to avoid over-linting

  // Main UI package files with TypeScript parsing
  {
    files: [
      "src/lib/utils.ts",
      "src/atomic/atoms/button.tsx",
      "src/atomic/atoms/card.tsx",
      "src/atomic/atoms/badge.tsx",
      "src/atomic/atoms/hive-logo.tsx",
      "src/atomic/atoms/label.tsx",
      "src/atomic/atoms/simple-avatar.tsx",
      "src/components/ui/input-otp.tsx",
      "src/atomic/molecules/stat-card.tsx",
      "src/atomic/molecules/tag-list.tsx",
      "src/atomic/molecules/notification-card.tsx",
    ],
    ignores: [
      "**/*.stories.{js,jsx,ts,tsx}",
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "src/stories/generate-missing-stories.ts",
      // Exclude complex, app-specific areas from strict lint while we harden primitives
      "src/atomic/organisms/**",
      "src/atomic/templates/**",
      "src/shells/**",
      "src/navigation/**",
      "src/providers/**",
      "src/hooks/**",
      "src/atomic/molecules/**",
    ],
    plugins: {
      import: fixupPluginRules(importPlugin),
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      // Ensure plugin-import resolves TS paths and TS/TSX extensions
      'import/resolver': {
        typescript: {
          project: true,
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "import/no-anonymous-default-export": "off",
      "import/no-unresolved": "error",
      "import/named": "error",
      // Keep unused-vars as a warning within curated foundation scope
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "off",
      // Allow some flexibility for UI package to eliminate warnings
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
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
      // Turn off noisy SB rules to keep stories flexible (foundation reviewed manually)
      "storybook/hierarchy-separator": "off",
      "storybook/default-exports": "off",
      "storybook/csf-component": "off",
      "storybook/no-redundant-story-name": "off",
      "storybook/prefer-pascal-case": "off",
      "storybook/story-exports": "off",
      "storybook/await-interactions": "off",
      "storybook/use-storybook-expect": "off",
      // Stories can have flexible structure
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-imports": "off",
      "import/no-anonymous-default-export": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Allow stories to be flexible and skip strict type/lint constraints

  // CommonJS build scripts configuration
  {
    files: ["*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },

  // Global ignore patterns - optimized for memory usage
  {
    ignores: [
      "**/*.stories.*",
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
      // Performance optimizations
      "src/**/*.bak", // Backup files
      "src/**/*.disabled", // Disabled files
      "src/**/*.backup", // Backup files
      "src/**/*.old", // Old files
      "**/*.map", // Source maps
      "**/*.d.ts", // Type definitions (parsed separately)
      // Large directories that can cause memory issues
      "stories-backup/**", // Large backup directory
      // Exclude app-specific UI layers from strict lint until refactor completes
      "src/atomic/organisms/**",
      "src/atomic/templates/**",
      "src/shells/**",
      "src/navigation/**",
      "src/providers/**",
      "src/hooks/**",
    ],
  },
];
