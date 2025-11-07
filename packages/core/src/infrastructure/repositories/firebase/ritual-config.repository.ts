import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@hive/firebase";
import { Result } from "../../../domain/shared/base/Result";
import {
  RitualUnion,
  RitualUnionSchema,
  RitualPhase,
} from "../../../domain/rituals/archetypes";
import { IRitualConfigRepository } from "../interfaces";

const COLLECTION_NAME = "rituals_v2";

interface RitualDocument {
  id: string;
  campusId: string;
  title: string;
  subtitle?: string;
  description?: string;
  archetype: string;
  phase: RitualPhase;
  startsAt: Timestamp;
  endsAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  visibility: "public" | "invite_only" | "secret";
  slug?: string;
  presentation?: Record<string, unknown>;
  metrics?: Record<string, unknown>;
  config: Record<string, unknown>;
}

export class FirebaseRitualConfigRepository
  implements IRitualConfigRepository
{
  private collectionRef = collection(db, COLLECTION_NAME);

  async findById(id: string): Promise<Result<RitualUnion>> {
    try {
      const docRef = doc(this.collectionRef, id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        return Result.fail<RitualUnion>("Ritual not found");
      }

      return this.toDomain(snapshot.id, snapshot.data() as RitualDocument);
    } catch (error) {
      return Result.fail<RitualUnion>(
        `Failed to load ritual ${id}: ${(error as Error).message}`,
      );
    }
  }

  async findBySlug(slug: string, campusId: string): Promise<Result<RitualUnion>> {
    try {
      const q = query(
        this.collectionRef,
        where("campusId", "==", campusId),
        where("slug", "==", slug),
        orderBy("updatedAt", "desc"),
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return Result.fail<RitualUnion>("Ritual not found");
      }
      const docSnap = snapshot.docs[0];
      return this.toDomain(docSnap.id, docSnap.data() as RitualDocument);
    } catch (error) {
      return Result.fail<RitualUnion>(
        `Failed to find ritual by slug: ${(error as Error).message}`,
      );
    }
  }

  async findByCampus(
    campusId: string,
    options?: { phases?: RitualPhase[] },
  ): Promise<Result<RitualUnion[]>> {
    try {
      const constraints: any[] = [
        where("campusId", "==", campusId),
        orderBy("startsAt", "desc"),
      ];

      if (options?.phases && options.phases.length > 0) {
        constraints.push(where("phase", "in", options.phases));
      }

      const snapshot = await getDocs(query(this.collectionRef, ...constraints));
      const results: RitualUnion[] = [];

      for (const docSnap of snapshot.docs) {
        const parsed = this.toDomain(
          docSnap.id,
          docSnap.data() as RitualDocument,
        );
        if (parsed.isSuccess) {
          results.push(parsed.getValue());
        } else {
          console.warn("[RITUAL_REPOSITORY] Failed to parse ritual", {
            id: docSnap.id,
            error: parsed.error,
          });
        }
      }

      return Result.ok(results);
    } catch (error) {
      return Result.fail<RitualUnion[]>(
        `Failed to load campus rituals: ${(error as Error).message}`,
      );
    }
  }

  async findActive(
    campusId: string,
    referenceDate: Date = new Date(),
  ): Promise<Result<RitualUnion[]>> {
    try {
      const nowTs = Timestamp.fromDate(referenceDate);
      const snapshot = await getDocs(
        query(
          this.collectionRef,
          where("campusId", "==", campusId),
          where("phase", "in", ["announced", "active"]),
          where("startsAt", "<=", nowTs),
          orderBy("startsAt", "desc"),
        ),
      );

      const results: RitualUnion[] = [];
      for (const docSnap of snapshot.docs) {
        const parsed = this.toDomain(
          docSnap.id,
          docSnap.data() as RitualDocument,
        );
        if (parsed.isSuccess) {
          const ritual = parsed.getValue();
          const isStillActive =
            ritual.phase === "active" ||
            (ritual.phase === "announced" &&
              new Date(ritual.startsAt).getTime() <= referenceDate.getTime());
          if (isStillActive) {
            results.push(ritual);
          }
        }
      }

      return Result.ok(results);
    } catch (error) {
      return Result.fail<RitualUnion[]>(
        `Failed to load active rituals: ${(error as Error).message}`,
      );
    }
  }

  async findByArchetype(
    archetype: string,
    campusId: string,
  ): Promise<Result<RitualUnion[]>> {
    try {
      const snapshot = await getDocs(
        query(
          this.collectionRef,
          where("campusId", "==", campusId),
          where("archetype", "==", archetype),
          orderBy("startsAt", "desc"),
        ),
      );

      const results: RitualUnion[] = [];
      for (const docSnap of snapshot.docs) {
        const parsed = this.toDomain(
          docSnap.id,
          docSnap.data() as RitualDocument,
        );
        if (parsed.isSuccess) {
          results.push(parsed.getValue());
        }
      }

      return Result.ok(results);
    } catch (error) {
      return Result.fail<RitualUnion[]>(
        `Failed to load rituals by archetype: ${(error as Error).message}`,
      );
    }
  }

  async findActiveByArchetype(
    archetype: string,
    campusId: string,
    referenceDate: Date = new Date(),
  ): Promise<Result<RitualUnion[]>> {
    try {
      const nowTs = Timestamp.fromDate(referenceDate);
      const snapshot = await getDocs(
        query(
          this.collectionRef,
          where("campusId", "==", campusId),
          where("archetype", "==", archetype),
          where("phase", "in", ["announced", "active"]),
          where("startsAt", "<=", nowTs),
          orderBy("startsAt", "desc"),
        ),
      );

      const results: RitualUnion[] = [];
      for (const docSnap of snapshot.docs) {
        const parsed = this.toDomain(
          docSnap.id,
          docSnap.data() as RitualDocument,
        );
        if (parsed.isSuccess) {
          const ritual = parsed.getValue();
          const isActiveWindow =
            new Date(ritual.endsAt).getTime() >= referenceDate.getTime();
          if (isActiveWindow) {
            results.push(ritual);
          }
        }
      }

      return Result.ok(results);
    } catch (error) {
      return Result.fail<RitualUnion[]>(
        `Failed to load active rituals by archetype: ${(error as Error).message}`,
      );
    }
  }

  async save(ritual: RitualUnion): Promise<Result<void>> {
    try {
      const docRef = doc(this.collectionRef, ritual.id);
      const snapshot = await getDoc(docRef);
      const nowTs = Timestamp.now();

      const payload = this.toPersistence(ritual, {
        createdAt: snapshot.exists()
          ? (snapshot.data() as RitualDocument).createdAt
          : nowTs,
        updatedAt: nowTs,
      });

      if (snapshot.exists()) {
        await setDoc(docRef, payload, { merge: true });
      } else {
        await setDoc(docRef, payload);
      }

      return Result.ok();
    } catch (error) {
      return Result.fail<void>(
        `Failed to save ritual ${ritual.id}: ${(error as Error).message}`,
      );
    }
  }

  async delete(id: string): Promise<Result<void>> {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
      return Result.ok();
    } catch (error) {
      return Result.fail<void>(
        `Failed to delete ritual ${id}: ${(error as Error).message}`,
      );
    }
  }

  // Helpers

  private toDomain(id: string, data: RitualDocument): Result<RitualUnion> {
    const base = {
      id,
      slug: data.slug,
      campusId: data.campusId,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      archetype: data.archetype,
      phase: data.phase,
      startsAt: this.timestampToIso(data.startsAt),
      endsAt: this.timestampToIso(data.endsAt),
      createdAt: this.timestampToIso(data.createdAt),
      updatedAt: this.timestampToIso(data.updatedAt),
      visibility: data.visibility,
      presentation: data.presentation,
      metrics: data.metrics,
      config: data.config,
    };

    const parsed = RitualUnionSchema.safeParse(base);
    if (!parsed.success) {
      return Result.fail<RitualUnion>(
        `Invalid ritual payload: ${parsed.error.message}`,
      );
    }

    return Result.ok(parsed.data as RitualUnion);
  }

  private toPersistence(
    ritual: RitualUnion,
    timestamps: { createdAt: Timestamp; updatedAt: Timestamp },
  ): RitualDocument {
    return {
      id: ritual.id,
      campusId: ritual.campusId,
      title: ritual.title,
      subtitle: ritual.subtitle,
      description: ritual.description,
      archetype: ritual.archetype,
      phase: ritual.phase,
      startsAt: Timestamp.fromDate(new Date(ritual.startsAt)),
      endsAt: Timestamp.fromDate(new Date(ritual.endsAt)),
      createdAt: timestamps.createdAt,
      updatedAt: timestamps.updatedAt,
      visibility: ritual.visibility,
      slug: ritual.slug,
      presentation: ritual.presentation
        ? { ...ritual.presentation } as Record<string, unknown>
        : {},
      metrics: ritual.metrics
        ? { ...ritual.metrics } as Record<string, unknown>
        : {},
      config: ritual.config,
    };
  }

  private timestampToIso(value: Timestamp | string | undefined): string {
    if (!value) return new Date().toISOString();
    if (typeof value === "string") return value;
    return value.toDate().toISOString();
  }
}
