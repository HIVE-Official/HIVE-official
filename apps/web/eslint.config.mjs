// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

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
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
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
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Next.js specific rules
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",

      // Disable base rule and use TypeScript version
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
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

  // API routes - optimized for memory usage
  {
    files: ["src/app/api/**/*.ts"],
    languageOptions: {
      parserOptions: {
        // Reduce memory usage for API routes
        ecmaFeatures: {
          globalReturn: false,
          impliedStrict: true,
        },
      },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "off", // Turn off completely for API routes
      "@typescript-eslint/no-explicit-any": "warn", // Less strict for API routes
      "@typescript-eslint/no-unused-vars": "off", // API routes have many utility functions
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
      "src/lib/platform-wide-search.ts",
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

  // Disable Next.js link rule for test files
  {
    files: [
      "**/*.test.tsx",
      "**/*.test.ts",
      "**/test/**/*.tsx",
      "**/test/**/*.ts",
    ],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },

  // Three.js / React Three Fiber components - allow Three.js properties
  {
    files: [
      "**/components/landing/3d/**/*.{ts,tsx}",
      "**/components/**/*3d*.{ts,tsx}",
      "**/components/**/*3D*.{ts,tsx}",
    ],
    rules: {
      "react/no-unknown-property": "off", // Three.js uses special props
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
      // Performance optimizations - ignore large directories
      "src/test/**", // Test files cause memory issues
      "src/__tests__/**", // Integration test files
      // Ignore build artifacts and cache files
      ".turbo/**",
      ".vercel/**",
      "coverage/**",
      // Ignore media files that can cause issues
      "**/*.webm",
      "**/*.mp4",
      "**/*.wav",
      "**/*.mp3",
      // Ignore specific problematic files
      "src/lib/config.ts", // Known memory issue
      "src/app/api/**/*.ts", // Process separately
    ],
  },
];
