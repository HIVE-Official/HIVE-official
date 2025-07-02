import baseConfig from "./packages/config/eslint/base.mjs";
import overrides from "./.eslintrc.override.js";

// Merge base config with temporary overrides for legacy code
export default [
  ...baseConfig,
  ...overrides.overrides.map(override => ({
    ...override,
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    }
  }))
];
