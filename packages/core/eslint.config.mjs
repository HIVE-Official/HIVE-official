// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {files: ["**/*.{js,mjs,cjs,ts,tsx}"]},
  {
    languageOptions: { 
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        exports: "readonly",
        require: "readonly",
        global: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly"
      }
    }
  },
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
      "src/domain/firestore/analytics.ts",
      "src/domain/firestore/moderation.ts",
      "src/domain/firestore/notification.ts",
      "src/domain/firestore/ritual.ts",
      "src/domain/firestore/tool.ts",
      "src/utils/database-helpers.ts",
      "src/scripts/**",
    ],
  },
];
