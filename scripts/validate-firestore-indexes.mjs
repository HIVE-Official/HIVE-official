#!/usr/bin/env node
// Validate Firestore indexes configuration for duplicates and basic structure.
// Usage: pnpm indexes:validate

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const path = resolve(process.cwd(), "firestore.indexes.json");

let json;
try {
  json = JSON.parse(readFileSync(path, "utf8"));
} catch (e) {
  console.error("❌ Failed to read or parse firestore.indexes.json:", e instanceof Error ? e.message : String(e));
  process.exit(1);
}

// Support both top-level array (newer format) and nested { indexes: [] } (legacy firebase-tools export)
const idx = Array.isArray(json?.indexes)
  ? json.indexes
  : Array.isArray(json?.indexes?.indexes)
  ? json.indexes.indexes
  : null;
if (!Array.isArray(idx)) {
  console.error("❌ Missing composite indexes array in firestore.indexes.json (expected 'indexes' or 'indexes.indexes')");
  process.exit(1);
}

// Build a signature for each composite index to detect duplicates
const sig = (i) => {
  const cg = i.collectionGroup || i.collectionId || "";
  const fields = (i.fields || [])
    .map((f) => `${f.fieldPath}:${f.arrayConfig || f.order || ""}`)
    .join("|");
  return `${cg}__${fields}`;
};

const seen = new Map();
let duplicates = 0;
for (const i of idx) {
  const key = sig(i);
  if (seen.has(key)) {
    duplicates++;
  } else {
    seen.set(key, true);
  }
}

if (duplicates > 0) {
  console.error(`❌ Found ${duplicates} duplicate composite index definition(s).`);
  process.exit(1);
}

console.log(`✅ Indexes look good. Total composites: ${idx.length}`);
process.exit(0);
