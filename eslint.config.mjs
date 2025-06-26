// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// @ts-check
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [{ files: ["**/*.{js,mjs,cjs,ts,tsx}"] }, {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
}, pluginJs.configs.recommended, ...tseslint.configs.recommended, pluginReact.configs.flat.recommended, {
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "no-console": "off",
    "react/prop-types": "off",
  },
}, {
  // Ignore problematic directories and files
  ignores: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.next/**",
    "**/.turbo/**",
    "**/out/**",
    "**/build/**",
    "**/.cache/**",
    "**/coverage/**",
    "**/lib/**", // Compiled JavaScript
    "**/src/**/*.js",
    "**/src/**/*.js.map",
    "**/src/**/*.d.ts",
    "**/src/**/*.d.ts.map",
    "**/.eslintrc.js",
    "**/eslint.config.js",
    "**/storybook-static/**",
    "**/test-results/**",
    "**/playwright-report/**",
    "**/functions/lib/**", // Firebase compiled functions
    "**/packages/*/lib/**", // Package compiled outputs
    "**/scripts/**", // Node.js scripts
    "**/firebase/datafix/**", // Firebase data migration scripts
    "**/firebase/scripts/**",
    "**/*.test.js",
    "**/functions/src/feed/report.ts", // Still suspicious, but keeping for now
    "**/functions/src/moderation.ts", // Still suspicious, but keeping for now
    "**/functions/src/spaces/claim.ts", // Still suspicious, but keeping for now
  ],
}, ...storybook.configs["flat/recommended"]];
