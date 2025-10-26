#!/usr/bin/env node
// Deploy Firestore security rules defined in firestore.rules
// Usage: pnpm rules:deploy [projectId]

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const rulesPath = resolve(process.cwd(), "firestore.rules");
if (!existsSync(rulesPath)) {
  console.error("firestore.rules not found at repo root");
  process.exit(1);
}

const project = process.argv[2];
const args = ["deploy", "--only", "firestore:rules"]; // picks up firebase.json rules path
if (project) args.push("--project", project);

console.log("🔐 Deploying Firestore rules...", project ? `(project: ${project})` : "");
const result = spawnSync("firebase", args, { stdio: "inherit" });
process.exit(result.status ?? 1);

