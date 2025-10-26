import * as logger from "firebase-functions/logger";
import type { Firestore } from "firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";

const MAX_BATCH_SIZE = 400;

interface PinExpirySweepMetrics {
  readonly expiredCount: number;
  readonly spacesTouched: number;
  readonly posts: readonly { readonly spaceId: string; readonly postId: string; readonly expiredAt: string }[];
}

const parsePath = (path: string) => {
  const segments = path.split("/");
  const spaceIndex = segments.findIndex((segment) => segment === "spaces");
  if (spaceIndex === -1 || segments.length < spaceIndex + 3) {
    return { spaceId: "unknown", postId: "unknown" };
  }

  const spaceId = segments[spaceIndex + 1] ?? "unknown";
  const postId = segments[segments.length - 1] ?? "unknown";
  return { spaceId, postId };
};

export const runPinExpirySweep = async (firestore: Firestore, now: Date): Promise<PinExpirySweepMetrics> => {
  const expiredSnapshot = await firestore
    .collectionGroup("posts")
    .where("pinnedAt", "!=", null)
    .where("pinExpiresAt", "<=", now)
    .get();

  if (expiredSnapshot.empty) {
    return {
      expiredCount: 0,
      spacesTouched: 0,
      posts: []
    };
  }

  const updates: PinExpirySweepMetrics["posts"] = [];
  const spaces = new Set<string>();

  let batch = firestore.batch();
  let writesInBatch = 0;

  for (const doc of expiredSnapshot.docs) {
    const { spaceId, postId } = parsePath(doc.ref.path);
    spaces.add(spaceId);

    updates.push({
      spaceId,
      postId,
      expiredAt: now.toISOString()
    });

    batch.update(doc.ref, {
      pinnedAt: null,
      pinExpiresAt: null,
      updatedAt: now
    });
    writesInBatch += 1;

    if (writesInBatch === MAX_BATCH_SIZE) {
      await batch.commit();
      batch = firestore.batch();
      writesInBatch = 0;
    }
  }

  if (writesInBatch > 0) {
    await batch.commit();
  }

  updates.forEach((entry) => {
    logger.info("spaces.posts.pins.expired", entry);
  });

  return {
    expiredCount: updates.length,
    spacesTouched: spaces.size,
    posts: updates
  };
};

export const handlePinExpiryRequest = async (now: Date = new Date()) => {
  const firestore = getFirestore();
  return runPinExpirySweep(firestore, now);
};
