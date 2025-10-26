// Bounded Context Owner: Identity & Access Management Guild
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import { fileURLToPath } from "node:url";
import path from "node:path";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";

const typeCheckedRules =
  tsPlugin.configs["recommended-type-checked"]?.rules ?? {};
const tsconfigRootDir = path.resolve(
  fileURLToPath(new URL(".", import.meta.url))
);

export default [
  // Turn off unused-disable reporting to keep pre-GA noise low
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
  },
  // Next.js plugin + rules in flat config shape
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...(nextPlugin.configs?.["core-web-vitals"]?.rules ?? {}),
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  // Admin API route handlers: relax strict unsafe rules (typed incrementally)
  {
    files: ["apps/admin/src/app/api/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-base-to-string": "off",
    },
  },
  {
    ignores: [
      "node_modules",
      "dist",
      "coverage",
      // Next.js build outputs
      ".next/**",
      "apps/**/.next/**",
      // Generated SDKs and types
      "apps/web/src/dataconnect-generated/**",
      "packages/**/src/dataconnect-generated/**",
      "packages/**/dataconnect-generated/**",
    ],
  },
  js.configs.recommended,
  // Browser environment for client-side code
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // TypeScript files with type checking (apps/web)
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./apps/web/tsconfig.json",
        tsconfigRootDir,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...typeCheckedRules,
      // Pre-GA: do not warn on these categories in web
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      // Use TS-aware unused-vars, disable core rule
      "no-unused-vars": "off",
      // Disable core no-undef for TS (not type-aware)
      "no-undef": "off",
      // Allow console in development
      "no-console": "off",
      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  // TypeScript files with type checking (apps/admin)
  {
    files: ["apps/admin/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./apps/admin/tsconfig.json",
        tsconfigRootDir,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...typeCheckedRules,
      // Pre-GA posture for admin: reduce noise
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/require-await": "off",
      // For admin surfaces, disable noisy unsafe rules until DTOs are fully typed
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "@typescript-eslint/explicit-function-return-type": "off",
      // Use TS-aware unused-vars, disable core rule
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  // TypeScript files with type checking (apps/e2e)
  {
    files: ["apps/e2e/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./apps/e2e/tsconfig.json",
        tsconfigRootDir,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...typeCheckedRules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/require-await": "off",
      // Relax unsafe rules in e2e app sandbox
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "no-undef": "off",
      "no-empty": "off",
      // Use TS-aware unused-vars, disable core rule
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "all", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
  // TypeScript files without type checking (packages)
  {
    files: ["packages/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: false,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // UI/library code: do not warn on any in pre-GA
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      // Use TS-aware unused-vars, disable core rule
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // Disable core no-undef for TS (not type-aware)
      "no-undef": "off",
      // Allow console in development
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
  // Specific rules for auth/onboarding contexts
  {
    files: ["apps/web/src/contexts/{auth,onboarding}/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/require-await": "off",
    },
  },
  // Next.js route handlers: relax strict unsafe rules (will be typed incrementally)
  {
    files: ["apps/web/src/app/api/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
  // Test files: allow flexible patterns and vitest globals
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    languageOptions: {
      globals: {
        describe: true,
        it: true,
        test: true,
        expect: true,
        beforeAll: true,
        beforeEach: true,
        afterAll: true,
        afterEach: true,
        vi: true,
      },
    },
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/require-await": "off",
      "no-undef": "off",
    },
  },
  // Generated declaration files: turn off noisy rules
  {
    files: ["**/dataconnect-generated/**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-redeclare": "off",
      "no-undef": "off",
    },
  },
  // UI package: treat unused vars as warnings during active redesign
  {
    files: ["packages/ui/src/**/*.{ts,tsx}"],
    ignores: [
      "packages/ui/src/stories/**",
      "packages/ui/.storybook/**",
    ],
    rules: {
      // Disable core rule here too; TS rule below governs
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrors: "all", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },
  // Storybook and Stories: relax DX rules (last-wins)
  {
    files: [
      "**/*.stories.ts",
      "**/*.stories.tsx",
      "**/.storybook/**/*.{ts,tsx}",
    ],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "no-undef": "off",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      "no-irregular-whitespace": "off",
    },
  },
  // Apps: prohibit deep imports from design-system internals
  {
    files: ["apps/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/components/*",
                "@/atoms/*",
                "@/molecules/*",
                "@/organisms/*",
              ],
              message: "Import from @hive/ui instead of internal '@/…' paths (single source of truth)",
            },
          ],
        },
      ],
    },
  },
];
