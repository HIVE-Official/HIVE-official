// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {files: ["**/*.{js,mjs,cjs,ts,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "react/react-in-jsx-scope": "off"
    }
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "*.config.*",
      "**/*.d.ts",
      "**/*.js",
      "**/*.test.*",
      "**/*.spec.*",
      "src/utils/code-analyzer.ts",
    ],
  },
];
