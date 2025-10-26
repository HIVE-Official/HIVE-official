// Bounded Context Owner: Identity & Access Management Guild
import { createHash } from "node:crypto";
import { firebaseFirestore } from "@hive/firebase";
import { Timestamp as FirestoreTimestamp } from "firebase-admin/firestore";

const allowDevSeeds = process.env.ENABLE_DEV_SEEDS === "true";

export interface ThrottleRule {
  readonly bucket: string;
  readonly identifier: string;
  readonly limit: number;
  readonly windowMs: number;
}

export interface ThrottleResult {
  readonly allowed: boolean;
  readonly remaining?: number;
  readonly retryAfter?: Date;
}

const memoryStore = new Map<string, { count: number; expiresAt: number }>();

const hashIdentifier = (value: string): string =>
  createHash("sha256").update(value).digest("hex");

const getDocId = (rule: ThrottleRule): string =>
  `${rule.bucket}:${hashIdentifier(rule.identifier)}`;

const toSeconds = (ms: number): number => Math.ceil(ms / 1000);

const logThrottleEvent = async (rule: ThrottleRule, retryAfter: Date) => {
  try {
    const firestore = firebaseFirestore();
    await firestore.collection("auth_throttle_events").add({
      bucket: rule.bucket,
      identifierHash: hashIdentifier(rule.identifier),
      occurredAt: new Date(),
      retryAfter
    });
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.warn("auth.throttle.telemetry_failed", error);
    }
  }
};

const enforceInMemory = (rule: ThrottleRule): ThrottleResult => {
  const key = getDocId(rule);
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (entry && entry.expiresAt > now) {
    if (entry.count >= rule.limit) {
      return {
        allowed: false,
        retryAfter: new Date(entry.expiresAt)
      };
    }

    entry.count += 1;
    memoryStore.set(key, entry);
    return {
      allowed: true,
      remaining: Math.max(rule.limit - entry.count, 0),
      retryAfter: new Date(entry.expiresAt)
    };
  }

  const expiresAt = now + rule.windowMs;
  memoryStore.set(key, { count: 1, expiresAt });
  return {
    allowed: true,
    remaining: rule.limit - 1,
    retryAfter: new Date(expiresAt)
  };
};

export const enforceThrottle = async (rule: ThrottleRule): Promise<ThrottleResult> => {
  try {
    const firestore = firebaseFirestore();
    const docId = getDocId(rule);
    const now = Date.now();

    const result = await firestore.runTransaction(async (tx) => {
      const docRef = firestore.collection("auth_throttle").doc(docId);
      const snapshot = await tx.get(docRef);

      const defaultExpiry = new Date(now + rule.windowMs);
      let expiresAt = defaultExpiry;
      let count = 1;

      if (snapshot.exists) {
        const data = snapshot.data() as { count?: number; expiresAt?: FirestoreTimestamp | Date };
        const storedExpires = data?.expiresAt
          ? data.expiresAt instanceof FirestoreTimestamp
            ? data.expiresAt.toDate()
            : new Date(data.expiresAt as Date)
          : defaultExpiry;

        if (storedExpires.getTime() <= now) {
          count = 1;
          expiresAt = defaultExpiry;
        } else {
          expiresAt = storedExpires;
          const previousCount = data?.count ?? 0;
          if (previousCount >= rule.limit) {
            return {
              allowed: false,
              retryAfter: storedExpires
            } satisfies ThrottleResult;
          }
          count = previousCount + 1;
        }
      }

      tx.set(
        docRef,
        {
          count,
          expiresAt,
          updatedAt: new Date()
        },
        { merge: true }
      );

      return {
        allowed: true,
        remaining: Math.max(rule.limit - count, 0),
        retryAfter: expiresAt
      } satisfies ThrottleResult;
    });

    if (!result.allowed && result.retryAfter) {
      await logThrottleEvent(rule, result.retryAfter);
    }

    return result;
  } catch (error) {
    if (!allowDevSeeds && process.env.NODE_ENV !== "test") {
      console.warn("auth.throttle.firestore_unavailable", error);
    }
    return enforceInMemory(rule);
  }
};

export const formatRetryAfterHeader = (retryAfter?: Date): string | undefined => {
  if (!retryAfter) {
    return undefined;
  }
  const deltaMs = retryAfter.getTime() - Date.now();
  if (deltaMs <= 0) {
    return "1";
  }
  return String(Math.max(1, toSeconds(deltaMs)));
};
