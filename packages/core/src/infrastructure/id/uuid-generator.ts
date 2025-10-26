// Bounded Context Owner: Identity & Access Management Guild
// Universal UUID generator that works in both Node (>=18) and browsers.
import type { IdGenerator } from "../../shared/id-generator";

function fallbackV4(): string {
  // RFC4122 v4 (non-crypto fallback for environments lacking Web Crypto)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class UuidGenerator implements IdGenerator {
  generate(): string {
    const g = (globalThis as unknown as { crypto?: { randomUUID?: () => string } }).crypto;
    if (g?.randomUUID) {
      return g.randomUUID();
    }
    return fallbackV4();
  }
}
