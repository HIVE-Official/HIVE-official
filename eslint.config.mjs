// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import tseslint from "typescript-eslint";

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

const config = [
  // Base JavaScript config
  js.configs.recommended,

  // TypeScript configs
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Patched Next.js config with pages directory fix
  ...patchedNextConfig.map((config) => ({
    ...config,
    rules: {
      ...config.rules,
      "@next/next/no-html-link-for-pages": ["error", "apps/web/src/app"],
    },
  })),

  // Global configuration
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "error",
    },
  },

  // Comprehensive ignore patterns - exclude all problematic files and directories
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
      "**/lib/**/*.js", // Firebase functions compiled JS

      // Configuration files that shouldn't be linted with TypeScript rules
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
      "**/.storybook/**/*.js",
      "**/.storybook/**/*.jsx",
      "**/.storybook/**/*.ts",
      "**/.storybook/**/*.tsx",

      // Package-level config files
      "**/packages/*/eslint.config.mjs",
      "**/packages/config/**/*.js",

      // Firebase functions and other build artifacts
      "**/functions/lib/**",
      "**/functions/dist/**",
      "**/packages/firebase/functions/lib/**",

      // Temporarily exclude problematic index files
      "**/packages/ui/index.ts",
      "**/packages/*/index.ts",
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
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },

  // Relax type checking for API routes and Firebase functions where complex types exist
  {
    files: [
      "apps/web/src/app/api/**/*.ts",
      "functions/src/**/*.ts",
      "**/__tests__/**/*.ts",
      "**/*.test.ts",
      "**/*.spec.ts",
      "**/__mocks__/**/*.ts",
    ],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "warn",
    },
  },

  // Relax type checking for UI components where complex prop types exist
  {
    files: [
      "packages/ui/src/**/*.tsx",
      "packages/ui/src/**/*.ts",
      "packages/core/src/**/*.ts",
    ],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "import/no-anonymous-default-export": "warn",
    },
  },
];

export default config;
