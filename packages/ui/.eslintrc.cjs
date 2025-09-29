module.exports = {
  root: true,
  extends: ["@hive/eslint-config"],
  overrides: [
    {
      // Override for CommonJS build scripts
      files: ["*.cjs"],
      env: {
        node: true,
        commonjs: true,
      },
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "no-undef": "off",
        "no-console": "off",
        "@typescript-eslint/no-unused-vars": "warn",
      },
    },
    {
      // Override for TypeScript files
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-unsafe-assignment": "warn",
      },
    },
  ],
};