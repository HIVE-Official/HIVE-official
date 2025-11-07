// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
// Optional: patch Next.js rules for ESLint 9 compatibility if available
let fixupConfigRules = (configs) => configs;
try {
  const compatMod = await import('@eslint/compat');
  if (compatMod && typeof compatMod.fixupConfigRules === 'function') {
    fixupConfigRules = compatMod.fixupConfigRules;
  }
} catch {
  // Fallback to identity if @eslint/compat is not installed
}
import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";
import nextPluginModule from '@next/eslint-plugin-next';
const nextPlugin = nextPluginModule.default ?? nextPluginModule;
import reactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const patchedNextConfig = [];

const sharedGlobals = {
  React: "readonly",
  JSX: "readonly",
  window: "readonly",
  document: "readonly",
  navigator: "readonly",
  fetch: "readonly",
  Headers: "readonly",
  Request: "readonly",
  Response: "readonly",
  URL: "readonly",
  FormData: "readonly",
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
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
};

const sharedIgnores = [
  ".next/**",
  "out/**",
  "public/**",
  "storybook-static/**",
  "playwright-report/**",
  "test-results/**",
  "coverage/**",
  ".turbo/**",
  ".vercel/**",
  "node_modules/**",
  "temp/**",
  "scripts/**",
  "build-output.txt",
  "lint-report.txt",
  "lint-full-report.txt",
  "test-import.mjs",
  "tsconfig.tsbuildinfo",
  "**/*.tsbuildinfo",
  "**/*.webm",
  "**/*.mp4",
  "**/*.wav",
  "**/*.mp3",
  // Do not ignore API routes; we want scoped rules to apply
  "src/test/**",
  "src/__tests__/**",
  "src/types/**",
  "test/**",
  "__tests__/**",
  "types/**",
  "src/lib/tool-execution-runtime.ts",
  "src/lib/redis-client.ts",
  "tests/**/__fixtures__/**",
  "tests/**/__generated__/**",
  "tests/**/__snapshots__/**",
  "src/**/__fixtures__/**",
];

export default [
  // Base JavaScript config
  js.configs.recommended,

  {
    ignores: sharedIgnores,
  },

  {
    plugins: {
      '@next/next': nextPlugin
    },
  },

  {
    languageOptions: {
      globals: sharedGlobals,
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
    },
  },

  ...patchedNextConfig,

  // Main configuration for entry-critical surfaces (strict)
  {
    files: [
      "src/app/start/**/*.{ts,tsx}",
      "src/components/landing/**/*.{ts,tsx}",
      "src/app/landing/**/*.{ts,tsx}",
      "src/app/auth/**/*.{ts,tsx}",
      "src/app/page.tsx"
    ],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react-hooks": reactHooks,
    },
    rules: {
      // Enable in future when browser globals are standardized across SSR/CSR
      "no-undef": "off",
      // Allow intentional empty blocks (common in try/catch stubs)
      "no-empty": "off",
      // Allow catch blocks that simply rethrow or do nothing in stubs
      "no-useless-catch": "off",
      // React hooks
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

      // Keep lint lightweight without React plugin dependency
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
    files: ["src/app/legal/**/*.tsx", "src/app/profile/**/*.tsx", "src/app/auth/**/*.tsx"],
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
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": "off", // Turn off completely for onboarding components
    },
  },

  // Test files rules
  {
    files: [
      "**/*.test.tsx",
      "**/*.test.ts",
      "**/test/**/*.tsx",
      "**/test/**/*.ts",
    ],
    rules: {},
  },

  // Ignore patterns specific to web app
];
