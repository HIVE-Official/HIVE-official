// Bounded Context Owner: Governance Guild
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";

export type FeatureSegments = {
  campuses?: string[];
  roles?: string[];
};

export type FeatureFlag = {
  key: string;
  label?: string;
  description?: string;
  enabled: boolean;
  audience?: string; // legacy/freeform hint
  rolloutPercentage?: number; // 0..100
  segments?: FeatureSegments;
  updatedAt?: Date | null;
};

export async function listFeatureFlags(limit = 50): Promise<FeatureFlag[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const db = firebaseFirestore();
    const snap = await db.collection("feature_flags").limit(limit).get();
    return snap.docs.map((doc) => {
      const d = doc.data() ?? {};
      return {
        key: doc.id,
        label: d.label ?? undefined,
        description: d.description ?? undefined,
        enabled: Boolean(d.enabled ?? false),
        audience: d.audience ?? undefined,
        rolloutPercentage: typeof d.rolloutPercentage === "number" ? d.rolloutPercentage : undefined,
        segments: d.segments ?? undefined,
        updatedAt: d.updatedAt?.toDate?.() ?? null
      } satisfies FeatureFlag;
    });
  } catch {
    return [];
  }
}

export type UpdateFeatureFlag = {
  key: string;
  enabled?: boolean;
  label?: string;
  description?: string;
  audience?: string;
  rolloutPercentage?: number;
  segments?: FeatureSegments;
};

export async function setFeatureFlag(update: UpdateFeatureFlag): Promise<void> {
  if (!isFirebaseConfigured()) return; // no-op in dev
  const db = firebaseFirestore();
  const data: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof update.enabled === "boolean") data.enabled = update.enabled;
  if (update.label !== undefined) data.label = update.label ?? null;
  if (update.description !== undefined) data.description = update.description ?? null;
  if (update.audience !== undefined) data.audience = update.audience ?? null;
  if (typeof update.rolloutPercentage === "number") data.rolloutPercentage = update.rolloutPercentage;
  if (update.segments !== undefined) data.segments = update.segments ?? null;

  await db.collection("feature_flags").doc(update.key).set(data, { merge: true });
}
