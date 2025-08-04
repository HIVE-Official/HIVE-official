// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Patch Next.js config for ESLint 9 compatibility
const patchedNextConfig = fixupConfigRules([
  ...compat.extends("next/core-web-vitals"),
]);

export default [
  // Base JavaScript config
  js.configs.recommended,

  // Add Next.js specific config
  ...patchedNextConfig,

  // Main configuration for all files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
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
    rules: {
      // Next.js specific rules
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",

      // Very lenient unused variables rule
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern:
            "^_|^data$|^user$|^error$|^event$|^props$|^filter$",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
          args: "after-used",
          caughtErrors: "none",
        },
      ],
      "no-console": "off", // Allow console statements for now
      "prefer-const": "error",
      "no-var": "error",

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
      "no-unused-vars": "off",
      "react/jsx-key": "off", // Disable key requirement for test files
    },
  },

  // API routes - allow console statements for logging
  {
    files: ["src/app/api/**/*.ts"],
    rules: {
      "no-console": "off",
      "no-unused-vars": "off", // Turn off completely for API routes
    },
  },

  // File-specific overrides
  {
    files: ["src/app/legal/**/*.tsx", "src/app/profile/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
  // Development integration files - allow unused vars for stubs
  {
    files: [
      "src/hooks/use-platform-integration.ts",
      "src/lib/unified-state-management.ts",
      "src/lib/platform-integration.ts",
      "src/lib/platform-wide-search.ts"
    ],
    rules: {
      "no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  {
    files: ["src/app/onboarding/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off", // Turn off completely for onboarding components
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
    ],
  },
];
