// Bounded Context Owner: Identity & Access Management Guild
// Minimal console telemetry sink for Profiles. Replace with real adapter when analytics pipeline is ready.

export function recordProfileUpdated(profileId: string, fields: string[]) {
  try {
    // eslint-disable-next-line no-console
    console.info("telemetry.profile_updated", { profileId, fields, at: new Date().toISOString() });
  } catch {
    // noop
  }
}

export function recordConnectionCreated(profileId: string, targetProfileId: string) {
  try {
    // eslint-disable-next-line no-console
    console.info("telemetry.connection_created", { profileId, targetProfileId, at: new Date().toISOString() });
  } catch {
    // noop
  }
}

export function recordConnectionRemoved(profileId: string, targetProfileId: string) {
  try {
    // eslint-disable-next-line no-console
    console.info("telemetry.connection_removed", { profileId, targetProfileId, at: new Date().toISOString() });
  } catch {
    // noop
  }
}

