/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@hive/eslint-config", "plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    "**/storybook-static/**",
    "**/dist/**",
    "**/node_modules/**",
    "**/.turbo/**",
    "**/tailwind.config.js",
    "**/tailwind.config.ts",
    "**/postcss.config.js",
    "**/index.ts"
  ],
  overrides: [
    {
      files: ["apps/web/src/app/legal/**/*.tsx", "apps/web/src/app/profile/**/*.tsx"],
      rules: {
        "react/no-unescaped-entities": "off"
      }
    },
    {
      files: ["apps/web/src/app/onboarding/**/*.tsx"],
      rules: {
        "@next/next/no-img-element": "warn",
        "react-hooks/exhaustive-deps": "warn"
      }
    }
  ]
};