import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  staticDirs: [
    {
      from: path.resolve(__dirname, "../../../public"),
      to: "/",
    },
  ],
  viteFinal: async (config) => {
    const { default: tailwindcss } = await import("tailwindcss");
    const { default: autoprefixer } = await import("autoprefixer");

    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [
            tailwindcss({
              config: path.resolve(__dirname, "./tailwind.config.js"),
            }),
            autoprefixer(),
          ],
        },
      },
      define: {
        // Fix "process is not defined" error
        "process.env": "{}",
        "process.env.NODE_ENV": JSON.stringify(
          process.env.NODE_ENV || "development"
        ),
        global: "globalThis",
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
          // Workspace packages - point to src directories for imports
          "@hive/core": path.resolve(__dirname, "../../core/src/index.ts"),
          "@hive/hooks": path.resolve(__dirname, "../../hooks/src"),
          "@hive/ui": path.resolve(__dirname, "../src"),
          "@hive/tokens": path.resolve(__dirname, "../../tokens/src"),
          "@hive/utilities": path.resolve(__dirname, "../../utilities/src"),
          "@hive/validation": path.resolve(__dirname, "../../validation/src"),
          "@hive/auth-logic": path.resolve(__dirname, "../../auth-logic/src"),
          "@hive/analytics": path.resolve(__dirname, "../../analytics/src"),
          "@hive/api-client": path.resolve(__dirname, "../../api-client/src"),
          "@hive/i18n": path.resolve(__dirname, "../../i18n/src"),
          // Config packages - point to package roots
          "@hive/eslint-config": path.resolve(__dirname, "../../config/eslint"),
          "@hive/typescript-config": path.resolve(
            __dirname,
            "../../config/typescript"
          ),
          // Map imports like @hive/profile/xyz → real profile components directory
          "@hive/profile/":
            path
              .resolve(
                __dirname,
                "../../../apps/web/src/app/profile/components"
              )
              .replace(/\\/g, "/") + "/",
          // Mock Next.js Image for Storybook
          "next/image": path.resolve(
            __dirname,
            "../src/lib/next-image-mock.tsx"
          ),
        },
        dedupe: ["react", "react-dom"],
      },
      server: {
        fs: {
          allow: [
            // allow Storybook to import workspace packages and app components
            path.resolve(__dirname, ".."),
            path.resolve(__dirname, "../../.."), // monorepo root
            path.resolve(__dirname, "../../../apps/web/src"),
          ],
        },
      },
      optimizeDeps: {
        include: ["react", "react-dom"],
        // Include workspace packages that need pre-bundling
        force: true,
      },
    });
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default config;
