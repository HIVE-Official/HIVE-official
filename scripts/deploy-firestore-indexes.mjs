#!/usr/bin/env node
// Deploy Firestore composite indexes defined in firestore.indexes.json
// Usage: pnpm indexes:deploy [projectId]
// - If projectId is omitted, uses the default from .firebaserc

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const indexesPath = resolve(root, "firestore.indexes.json");
if (!existsSync(indexesPath)) {
  console.error("firestore.indexes.json not found at repo root");
  process.exit(1);
}

// Basic sanity check that JSON is valid before deploying
try {
  JSON.parse(readFileSync(indexesPath, "utf8"));
} catch (e) {
  console.error("Invalid JSON in firestore.indexes.json:", e instanceof Error ? e.message : String(e));
  process.exit(1);
}

const project = process.argv[2];
const args = ["deploy", "--only", "firestore:indexes"]; // picks up firebase.json indexes path
if (project) args.push("--project", project);

console.log("🚀 Deploying Firestore indexes...", project ? `(project: ${project})` : "");
const result = spawnSync("firebase", args, { stdio: "inherit" });
process.exit(result.status ?? 1);

