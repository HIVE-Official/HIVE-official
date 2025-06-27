// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  // Global ignores (applies to all configs)
  {
    ignores: [
      "dist/**/*",
      "build/**/*", 
      "storybook-static/**/*",
      "node_modules/**/*",
      "coverage/**/*",
      "*.config.*",
      ".turbo/**/*"
    ]
  },
  // Include only source files
  {
    files: ["src/**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: { 
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", // We use TypeScript for prop validation
      "@typescript-eslint/no-unused-expressions": "off", // Causes issues with conditional expressions
      "react/no-unescaped-entities": "off", // Allow quotes in JSX
    }
  },
  // Storybook-specific configuration
  {
    files: ["src/**/*.stories.@(js|jsx|ts|tsx)"],
    plugins: { storybook },
    rules: {
      "storybook/story-exports": "off", // Temporarily disable to debug
      "storybook/no-renderer-packages": "off", // Temporarily disable to debug
    }
  }
];
