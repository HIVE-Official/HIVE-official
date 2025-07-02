// Temporary ESLint overrides for legacy code while maintaining standards for new code
// TODO: Gradually refactor functions to meet stricter standards

module.exports = {
  overrides: [
    {
      // Legacy API routes - allow larger functions for business logic
      files: ["apps/web/src/app/api/**/*.ts"],
      rules: {
        "max-lines-per-function": ["warn", { max: 200, skipBlankLines: true, skipComments: true }],
        "complexity": ["warn", { max: 30 }], // Business logic complexity
      }
    },
    {
      // Legacy onboarding components - complex user flows
      files: [
        "apps/web/src/components/onboarding/**/*.tsx",
        "packages/ui/src/components/onboarding/**/*.tsx"
      ],
      rules: {
        "max-lines-per-function": ["warn", { max: 250, skipBlankLines: true, skipComments: true }],
        "complexity": ["warn", { max: 25 }],
      }
    },
    {
      // Test files - comprehensive scenarios allowed
      files: ["**/*.test.ts", "**/*.spec.ts", "**/*.test.tsx"],
      rules: {
        "max-lines-per-function": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
        "max-nested-callbacks": ["warn", { max: 6 }],
        "complexity": "off", // Test complexity is acceptable
      }
    },
    {
      // Storybook stories - documentation heavy
      files: ["**/*.stories.tsx", "**/*.stories.ts"],
      rules: {
        "max-lines-per-function": ["warn", { max: 200, skipBlankLines: true, skipComments: true }],
        "no-console": "off", // Stories may use console for demo
      }
    },
    {
      // WIP components - under development
      files: ["apps/web/src/app/(wip)/**/*.tsx"],
      rules: {
        "max-lines-per-function": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
        "complexity": ["warn", { max: 25 }],
      }
    },
    {
      // Auth components - complex user flows
      files: [
        "apps/web/src/app/auth/**/*.tsx",
        "packages/ui/src/components/auth/**/*.tsx"
      ],
      rules: {
        "max-lines-per-function": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
        "complexity": ["warn", { max: 30 }],
      }
    },
    {
      // Core business logic - complex domain logic allowed
      files: ["packages/core/src/**/*.ts"],
      rules: {
        "complexity": ["warn", { max: 30 }],
        "max-lines-per-function": ["warn", { max: 200, skipBlankLines: true, skipComments: true }],
      }
    },
    {
      // Auth logic package - security complexity
      files: ["packages/auth-logic/src/**/*.ts"],
      rules: {
        "complexity": ["warn", { max: 25 }],
        "max-lines-per-function": ["warn", { max: 200, skipBlankLines: true, skipComments: true }],
        "max-lines": ["warn", { max: 800 }], // Auth test files are comprehensive
      }
    },
    {
      // Admin components - dashboard complexity
      files: ["apps/admin/src/**/*.tsx"],
      rules: {
        "max-lines-per-function": ["warn", { max: 400, skipBlankLines: true, skipComments: true }],
        "complexity": ["warn", { max: 25 }],
      }
    },
    {
      // Page components - can be larger due to layout requirements  
      files: [
        "apps/web/src/app/**/page.tsx",
        "apps/web/src/app/role/page.tsx",
        "apps/web/src/app/test-flows/page.tsx"
      ],
      rules: {
        "max-lines-per-function": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
        "complexity": ["warn", { max: 25 }],
      }
    }
  ]
}; 