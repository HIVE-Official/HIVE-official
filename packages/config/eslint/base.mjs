// @ts-check
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import storybook from "eslint-plugin-storybook";

const baseConfig = [
  {
    ignores: [
      // Build and distribution directories
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/out/**", 
      "**/build/**",
      "**/.cache/**",
      "**/coverage/**",
      "**/lib/**",
      "**/storybook-static/**",
      "**/test-results/**",
      "**/playwright-report/**",
      
      // Generated files
      "**/src/**/*.js",
      "**/src/**/*.js.map", 
      "**/src/**/*.d.ts",
      "**/src/**/*.d.ts.map",
      "**/*.bundle.js",
      "**/*.chunk.js",
      "**/*.min.js",
      
      // Config files
      "**/.eslintrc.js",
      "**/eslint.config.js",
      "**/jest.config.js",
      "**/vitest.config.js",
      "**/vite.config.js",
      "**/webpack.config.js",
      "**/next.config.js",
      "**/tailwind.config.js",
      "**/postcss.config.js",
      
      // Firebase and infrastructure scripts
      "**/firebase/**",
      "**/functions/**",
      "**/scripts/**",
      "**/dataconnect/**",
      
      // Other patterns
      "vendor-chunks/**",
      "framework-*/**",
      "webpack-*/**",
      "**/*.map",
      "**/public/**/*.js",
      
      // Next.js build artifacts
      "apps/web/.next/**",
      "apps/web/out/**",
      "**/vendor-chunks/**",
      "**/chunks/**",
      "**/webpack/**",
      "**/static/**",
      "**/server/**/*.js",
      
      // Package build artifacts
      "packages/ui/dist/**",
      "**/packages/*/lib/**",
      
      // Firebase build artifacts and functions
      "**/functions/lib/**",
      "**/functions/src/**",
      "**/functions/**",
      
      // Script and utility directories  
      "**/scripts/**",
      "**/firebase/datafix/**",
      "**/firebase/scripts/**",
      "**/*.test.js",
      
      // Binary or problematic files
      "functions/src/feed/report.ts",
      "functions/src/moderation.ts",
      "functions/src/spaces/claim.ts",
    ],
  },
  // Base JavaScript configuration
  pluginJs.configs.recommended,
  
  // TypeScript configuration without strict type checking
  ...tseslint.configs.recommended,
  
  // React configuration
  pluginReact.configs.flat.recommended,
  
  // Main configuration
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: true,
        window: true,
        document: true,
        navigator: true,
        localStorage: true,
        sessionStorage: true,
        console: true,
        fetch: true,
        FormData: true,
        URL: true,
        URLSearchParams: true,
        setTimeout: true,
        clearTimeout: true,
        setInterval: true,
        clearInterval: true,
        requestAnimationFrame: true,
        cancelAnimationFrame: true,
        btoa: true,
        atob: true,
        crypto: true,
        File: true,
        FileReader: true,
        Blob: true,
        performance: true,
        alert: true,
        self: true,
        XMLHttpRequest: true,
        CustomEvent: true,
        EventListener: true,
        trustedTypes: true,
        HTMLElement: true,
        HTMLDivElement: true,
        HTMLSpanElement: true,
        HTMLParagraphElement: true,
        HTMLHeadingElement: true,
        HTMLButtonElement: true,
        HTMLInputElement: true,
        HTMLTextAreaElement: true,
        HTMLFormElement: true,
        HTMLLabelElement: true,
        HTMLAnchorElement: true,
        HTMLImageElement: true,
        Element: true,
        Node: true,
        NodeList: true,
        Event: true,
        MouseEvent: true,
        KeyboardEvent: true,
        FocusEvent: true,
        ChangeEvent: true,
        FormEvent: true,
        PerformanceNavigationTiming: true,
        process: true,
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
        exports: true,
        global: true,
        Buffer: true,
        NodeJS: true,
        Request: true,
        Response: true,
        Headers: true,
        Document: true,
        MediaQueryListEvent: true,
        HTMLUListElement: true,
        HTMLLIElement: true,
        Bun: true,
        Deno: true,
        FirebaseFirestore: true,
        logger: true,
        describe: true,
        it: true,
        test: true,
        expect: true,
        jest: true,
        beforeAll: true,
        afterAll: true,
        beforeEach: true,
        afterEach: true,
        vi: true,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Basic TypeScript Rules (without type checking)
      "@typescript-eslint/no-unused-vars": ["error", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],
      "@typescript-eslint/no-explicit-any": "error",
      
      // React Best Practices
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/no-children-prop": "error",
      "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-pascal-case": "error",
      "react/no-array-index-key": "warn",
      "react/no-danger": "error",
      "react/no-deprecated": "error",
      "react/no-direct-mutation-state": "error",
      "react/no-find-dom-node": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-this-in-sfc": "error",
      "react/no-typos": "error",
      "react/no-unused-state": "error",
      "react/prefer-es6-class": "error",
      "react/void-dom-elements-no-children": "error",

      // Performance Rules
      "react/jsx-no-constructed-context-values": "error",
      "react/no-unstable-nested-components": "error",

      // Security Rules (basic ones)
      "no-eval": "error",
      "no-implied-eval": "error",

      // Code Quality Rules
      "complexity": ["warn", { max: 15 }],
      "max-lines": ["warn", { max: 500, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["warn", { max: 100, skipBlankLines: true, skipComments: true }],
      "max-depth": ["warn", { max: 4 }],
      "max-nested-callbacks": ["warn", { max: 3 }],
      "max-params": ["warn", { max: 6 }],
      "no-alert": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
    },
  },
  
  // Relaxed rules for Storybook stories
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    plugins: {
      storybook: storybook,
    },
    rules: {
      // Storybook specific rules
      "storybook/await-interactions": "error",
      "storybook/context-in-play-function": "error",
      "storybook/default-exports": "error",
      "storybook/hierarchy-separator": "warn",
      "storybook/no-redundant-story-name": "warn",
      "storybook/prefer-pascal-case": "warn",
      "storybook/story-exports": "error",
      "storybook/use-storybook-expect": "error",
      "storybook/use-storybook-testing-library": "error",
      
      // Relaxed complexity for Storybook
      "max-lines-per-function": ["warn", { max: 250, skipBlankLines: true, skipComments: true }],
      "no-console": "off", // Allow console for Storybook documentation
    },
  },

  // Relaxed rules for complex UI components (onboarding flows, etc.)
  {
    files: [
      "**/onboarding/**/*.{ts,tsx}",
      "**/auth/**/*.{ts,tsx}",
      "**/components/**/steps/**/*.{ts,tsx}",
    ],
    rules: {
      "max-lines-per-function": ["warn", { max: 375, skipBlankLines: true, skipComments: true }],
      "complexity": ["warn", { max: 25 }],
    },
  },
];

export default baseConfig; 