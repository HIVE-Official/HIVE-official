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
        // React
        React: true,
        
        // Browser globals
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
        
        // DOM Element Types
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
        
        // Event types
        Event: true,
        MouseEvent: true,
        KeyboardEvent: true,
        FocusEvent: true,
        ChangeEvent: true,
        FormEvent: true,
        PerformanceNavigationTiming: true,
        
        // Node.js globals
        process: true,
        module: true,
        require: true,
        __dirname: true,
        __filename: true,
        exports: true,
        global: true,
        Buffer: true,
        NodeJS: true,
        
        // Web APIs and browser globals
        Request: true,
        Response: true,
        Headers: true,
        Document: true,
        MediaQueryListEvent: true,
        HTMLUListElement: true,
        HTMLLIElement: true,
        
        // Runtime globals
        Bun: true,
        Deno: true,
        FirebaseFirestore: true,
        logger: true,
        
        // Test globals
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
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/react-in-jsx-scope": "off",
      "no-console": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "error",
      "no-empty": "warn",
    },
  },
];

const storybookConfig = [
  ...baseConfig,
  ...storybook.configs["flat/recommended"],
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    rules: {
      "storybook/no-renderer-packages": "off", // Allow @storybook/react imports in stories
      "no-undef": "off", // Disable no-undef for stories as they may have complex variable scoping
    },
  },
];

export { baseConfig, storybookConfig }; 