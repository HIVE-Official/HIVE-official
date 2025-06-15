// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import tseslint from "typescript-eslint";
import baseConfig from "@hive/eslint-config";

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
  // Extend base config
  ...baseConfig,

  // UI package specific configuration (NO Storybook rules here)
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "**/*.stories.{js,jsx,ts,tsx}",
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Allow default exports for components
      "import/no-default-export": "off",
      // Disable Storybook rules for regular component files
      "storybook/csf-component": "off",
      "storybook/default-exports": "off",
      "storybook/story-exports": "off",
    },
  },

  // ONLY apply Storybook rules to story files
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    ...patchedStorybookConfig[0], // Apply the Storybook config
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Merge existing rules with Storybook-specific rules
      ...patchedStorybookConfig[0]?.rules,
      // Storybook specific rules
      "storybook/hierarchy-separator": "error",
      "storybook/default-exports": "error",
      "storybook/csf-component": "error",
      "storybook/no-redundant-story-name": "error",
      "storybook/prefer-pascal-case": "error",
      "storybook/story-exports": "error",
      "storybook/await-interactions": "error",
      "storybook/use-storybook-expect": "error",
      // Stories can have any structure
      "@typescript-eslint/no-explicit-any": "off",
      "import/no-anonymous-default-export": "off",
    },
  },

  // Ignore patterns specific to UI package
  {
    ignores: [
      "storybook-static/**",
      ".storybook/**",
      "dist/**",
      "vite.config.ts",
      "postcss.config.js",
      "tailwind.config.js",
      "tailwind.config.ts",
      "index.ts", // Root index file
      "**/index.ts", // All index files
    ],
  },
];
