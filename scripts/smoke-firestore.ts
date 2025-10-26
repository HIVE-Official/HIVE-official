#!/usr/bin/env -S pnpm tsx
// Quick Firestore smoke test via Admin SDK: writes a non-sensitive doc and reports latency.
// Import directly from workspace package to avoid path alias resolution issues in scripts
import { firebaseFirestore } from "../packages/firebase/src/admin";

async function main() {
  const start = Date.now();
  try {
    const db = firebaseFirestore();
    const ref = await db.collection("health_smokes").add({
      at: new Date(),
      source: "codex-cli",
      campusId: process.env.NEXT_PUBLIC_CAMPUS_ID ?? "ub-buffalo",
      env: process.env.NODE_ENV ?? "development"
    });
    const ms = Date.now() - start;
    console.log(JSON.stringify({ ok: true, id: ref.id, ms }));
    process.exit(0);
  } catch (error) {
    const ms = Date.now() - start;
    console.error(JSON.stringify({ ok: false, error: String(error), ms }));
    process.exit(1);
  }
}

main();
