// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

/**
 * Custom ESLint configuration for HIVE monorepo
 * Uses ESLint 9 flat config system with compatibility utilities
 */
export default [
  // Base JavaScript config
  js.configs.recommended,
  
  // TypeScript configs
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  
  // Patched configs for compatibility
  ...fixupConfigRules([
    ...compat.extends("turbo"),
    ...compat.extends("prettier"),
  ]),
  
  // Global configuration
  {
    plugins: {
      unicorn: fixupPluginRules(unicorn),
      import: fixupPluginRules(importPlugin),
    },
    
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
    
    rules: {
      "turbo/no-undeclared-env-vars": "off",
      "unicorn/filename-case": [
        "error",
        {
          "case": "kebabCase"
        }
      ],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
  
  // Ignore patterns
  {
    ignores: [
      "node_modules/",
      "dist/",
      ".turbo/",
      "storybook-static/",
      ".next/",
      "**/eslint.config.mjs",
      "**/eslint.config.js",
      "**/*.d.ts",
      "**/*.d.ts.map",
      "**/src/**/*.js",
      "**/src/**/*.js.map",
    ],
  },
]; 