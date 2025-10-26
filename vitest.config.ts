// Bounded Context Owner: Identity & Access Management Guild
import { loadEnvConfig } from "@next/env";
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import path from "node:path";

loadEnvConfig(process.cwd(), true);

const rootDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)));
const resolvePath = (...segments: string[]) => path.resolve(rootDir, ...segments);

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^@core$/,
        replacement: resolvePath("packages/core/src/index.ts")
      },
      {
        find: /^@core\//,
        replacement: `${resolvePath("packages/core/src")}/`
      }
    ]
  },
  test: {
    environment: "jsdom",
    env: {
      ENABLE_DEV_SEEDS: "true",
      USE_FIRESTORE_SPACES: "false"
    },
    include: [
      "apps/web/src/contexts/auth/**/*.test.{ts,tsx}",
      "apps/web/src/contexts/onboarding/**/*.test.{ts,tsx}",
      "apps/web/src/app/api/**/*.test.{ts,tsx}",
      "apps/web/src/app/api/**/*.spec.{ts,tsx}",
      "apps/web/src/server/**/*.test.{ts,tsx}",
      "apps/web/src/server/**/*.spec.{ts,tsx}",
      "packages/core/src/**/*.test.{ts,tsx}",
      "packages/core/src/**/*.spec.{ts,tsx}",
      "functions/src/**/*.test.{ts,tsx}"
    ],
    coverage: {
      reporter: ["text", "lcov"],
      include: [
        "apps/web/src/contexts/auth/**/*.{ts,tsx}",
        "apps/web/src/contexts/onboarding/**/*.{ts,tsx}"
      ]
    }
  }
});
