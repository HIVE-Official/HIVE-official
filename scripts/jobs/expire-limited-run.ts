#!/usr/bin/env ts-node
import { expireLimitedRunTools } from "../../apps/web/src/server/tools/limited-run-expiry";

async function main() {
  const expired = await expireLimitedRunTools();

  const certified = expired.filter((entry) => entry.certified);
  const failed = expired.filter((entry) => !entry.certified);

  if (expired.length === 0) {
    console.log("No limited run tools ready for expiry.");
    return;
  }

  if (certified.length > 0) {
    console.log("Certified tools:");
    for (const entry of certified) {
      console.log(`- ${entry.id}`);
    }
  }

  if (failed.length > 0) {
    console.log("Failed to certify:");
    for (const entry of failed) {
      console.log(`- ${entry.id} (${entry.error ?? "unknown error"})`);
    }
  }
}

void main();
