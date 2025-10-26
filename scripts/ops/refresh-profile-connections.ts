#!/usr/bin/env -S tsx
// Refresh automatic connections for a given profileId from shared Spaces.
import { refreshAutoConnections } from "../..//apps/web/src/server/profile/auto-connections.service";

async function main() {
  const profileId = process.argv[2];
  if (!profileId) {
    console.error("Usage: pnpm ops:refresh-connections <profileId>");
    process.exit(1);
  }
  try {
    const state = await refreshAutoConnections(profileId);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ ok: true, accepted: state.accepted.length }, null, 2));
  } catch (err) {
    console.error(JSON.stringify({ ok: false, error: err instanceof Error ? err.message : String(err) }));
    process.exit(1);
  }
}

main();

