// @ts-check
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,tsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
    },
  },
  {
    // Ignore problematic directories and files
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/lib/**", // Compiled JavaScript
      "**/*.config.js",
      "**/*.config.mjs",
      "**/*.config.ts",
      "**/.eslintrc.js",
      "**/storybook-static/**",
      "**/test-results/**",
      "**/playwright-report/**",
      "**/functions/lib/**", // Firebase compiled functions
      "**/packages/*/lib/**", // Package compiled outputs
      "**/scripts/**", // Node.js scripts
      "**/firebase/datafix/**", // Firebase data migration scripts
      "**/functions/src/feed/report.ts", // Still suspicious, but keeping for now
      "**/functions/src/moderation.ts", // Still suspicious, but keeping for now
      "**/functions/src/spaces/claim.ts", // Still suspicious, but keeping for now
    ],
  },
];
