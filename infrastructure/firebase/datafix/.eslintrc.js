module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-require-imports": "off",
    "no-undef": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-console": "off",
  },
};
