module.exports = {
  "extends": ["next", "turbo", "prettier"],
  "plugins": ["@typescript-eslint", "import", "react", "unicorn"],
  "parser": "@typescript-eslint/parser",
  "rules": {
    "turbo/no-undeclared-env-vars": "off",
    "unicorn/filename-case": [
      "error",
      {
        "case": "kebabCase"
      }
    ]
  }
}; 