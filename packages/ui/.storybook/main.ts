// Bounded Context Owner: Design System Guild
import { resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";
type EsbuildPlugin = import("esbuild").Plugin;

const removeUseClientDirective = (source: string): string | null => {
  let index = source.indexOf('"use client"');
  let directiveLength = '"use client"'.length;
  if (index === -1) {
    index = source.indexOf("'use client'");
    directiveLength = "'use client'".length;
  }
  if (index === -1) {
    return null;
  }
  const before = source.slice(0, index);
  if (!/^(?:\s|\/\*[\s\S]*?\*\/|\/\/[^\n]*\n)*$/.test(before)) {
    return null;
  }
  let end = index + directiveLength;
  if (source[end] === ";") {
    end += 1;
  }
  if (source[end] === "\r" && source[end + 1] === "\n") {
    end += 2;
  } else if (source[end] === "\n" || source[end] === "\r") {
    end += 1;
  }
  return before + source.slice(end);
};

const CODE_FILE_REGEX = /\.(?:[cm]?[jt]s|[jt]sx)$/;

const createStripUseClientDirectivePlugin = (): PluginOption => ({
  name: "strip-use-client-directive",
  enforce: "pre",
  async transform(code, id) {
    const sanitizedId = id.split("?")[0];
    if (!CODE_FILE_REGEX.test(sanitizedId)) {
      return;
    }
    const updated = removeUseClientDirective(code);
    if (updated === null) {
      return;
    }
    return { code: updated, map: null };
  }
});

const createStripUseClientDirectiveForOptimizeDeps = (): EsbuildPlugin => ({
  name: "strip-use-client-directive",
  setup(build) {
    build.onLoad({ filter: CODE_FILE_REGEX }, async (args) => {
      const { readFile } = await import("node:fs/promises");
      const source = await readFile(args.path, "utf8");
      const updated = removeUseClientDirective(source);
      if (updated === null) {
        return;
      }
      const extension = args.path.split(".").pop() ?? "js";
      const loader =
        extension === "tsx"
          ? "tsx"
          : extension === "ts"
          ? "ts"
          : extension === "jsx"
          ? "jsx"
          : "js";
      return { contents: updated, loader };
    });
  }
});

const config: StorybookConfig = {
  // Include both CSF and MDX stories via explicit specifier for Storybook 8+
  stories: [
    {
      directory: "../src/stories",
      files: "**/*.stories.@(ts|tsx|mdx)"
    }
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-viewport"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: "tag",
    mdxCompileOptions: {
      skipCsf: false
    }
  },
  viteFinal: async (config) => {
    // Ensure dev server root is this package so `/.storybook/preview.ts` resolves correctly.
    (config as any).root = resolve(__dirname, "..");
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@": resolve(__dirname, "../src"),
      // Map core package for browser stories to source files
      "@core": resolve(__dirname, "../../core/src")
    } as any;

    // Allow Vite dev server to access monorepo files if needed
    (config.server ??= {} as any);
    (config.server.fs ??= {} as any);
    (config.server.fs.allow ??= [] as any[]);
    const packageRoot = resolve(__dirname, "..");
    const packagesDir = resolve(__dirname, "../../");
    const workspaceRoot = resolve(__dirname, "../../..");
    const workspaceNodeModules = resolve(workspaceRoot, "node_modules");
    (config.server.fs.allow as any[]).push(packageRoot);
    (config.server.fs.allow as any[]).push(packagesDir);
    (config.server.fs.allow as any[]).push(workspaceRoot);
    (config.server.fs.allow as any[]).push(workspaceNodeModules);

    // Prevent esbuild from choking on `"use client"` directives inside framer-motion when Storybook prebundles.
    (config.optimizeDeps ??= {});
    (config.optimizeDeps.exclude ??= []);
    if (!config.optimizeDeps.exclude.includes("framer-motion")) {
      config.optimizeDeps.exclude.push("framer-motion");
    }
    // Disable esbuild onLoad plugin to avoid fs access issues in dev optimizer.
    // The Vite transform plugin below still strips "use client" safely.
    (config.optimizeDeps.esbuildOptions ??= {});

    // Strip `"use client"` directives during the final Rollup build as well.
    const pluginList: PluginOption[] = Array.isArray(config.plugins)
      ? [...config.plugins]
      : config.plugins
      ? [config.plugins]
      : [];
    config.plugins = [...pluginList, createStripUseClientDirectivePlugin()];

    return config;
  }
};

export default config;
