import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import { dirname, join, resolve } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    defaultName: "Documentation",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    check: false,
  },
  staticDirs: ["../public"],
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": resolve(__dirname, "../src"),
          "@hive/ui": resolve(__dirname, "../src"),
          "@hive/core": resolve(__dirname, "../../core/src"),
          "@hive/hooks": resolve(__dirname, "../../hooks/src/index.ts"),
          "@hive/tokens": resolve(__dirname, "../../tokens/src/index.ts"),
          "@hive/analytics": resolve(__dirname, "../../analytics/src/index.ts"),
        },
      },
      optimizeDeps: {
        include: ["@storybook/addon-themes"],
      },
    });
  },
};

export default config;
