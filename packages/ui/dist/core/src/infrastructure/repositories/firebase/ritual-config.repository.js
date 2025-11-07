import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, Timestamp, where, orderBy, } from "firebase/firestore";
import { db } from "@hive/firebase";
import { Result } from "../../../domain/shared/base/Result";
import { RitualUnionSchema, } from "../../../domain/rituals/archetypes";
const COLLECTION_NAME = "rituals_v2";
export class FirebaseRitualConfigRepository {
    constructor() {
        this.collectionRef = collection(db, COLLECTION_NAME);
    }
    async findById(id) {
        try {
            const docRef = doc(this.collectionRef, id);
            const snapshot = await getDoc(docRef);
            if (!snapshot.exists()) {
                return Result.fail("Ritual not found");
            }
            return this.toDomain(snapshot.id, snapshot.data());
        }
        catch (error) {
            return Result.fail(`Failed to load ritual ${id}: ${error.message}`);
        }
    }
    async findBySlug(slug, campusId) {
        try {
            const q = query(this.collectionRef, where("campusId", "==", campusId), where("slug", "==", slug), orderBy("updatedAt", "desc"));
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
                return Result.fail("Ritual not found");
            }
            const docSnap = snapshot.docs[0];
            return this.toDomain(docSnap.id, docSnap.data());
        }
        catch (error) {
            return Result.fail(`Failed to find ritual by slug: ${error.message}`);
        }
    }
    async findByCampus(campusId, options) {
        try {
            const constraints = [
                where("campusId", "==", campusId),
                orderBy("startsAt", "desc"),
            ];
            if (options?.phases && options.phases.length > 0) {
                constraints.push(where("phase", "in", options.phases));
            }
            const snapshot = await getDocs(query(this.collectionRef, ...constraints));
            const results = [];
            for (const docSnap of snapshot.docs) {
                const parsed = this.toDomain(docSnap.id, docSnap.data());
                if (parsed.isSuccess) {
                    results.push(parsed.getValue());
                }
                else {
                    console.warn("[RITUAL_REPOSITORY] Failed to parse ritual", {
                        id: docSnap.id,
                        error: parsed.error,
                    });
                }
            }
            return Result.ok(results);
        }
        catch (error) {
            return Result.fail(`Failed to load campus rituals: ${error.message}`);
        }
    }
    async findActive(campusId, referenceDate = new Date()) {
        try {
            const nowTs = Timestamp.fromDate(referenceDate);
            const snapshot = await getDocs(query(this.collectionRef, where("campusId", "==", campusId), where("phase", "in", ["announced", "active"]), where("startsAt", "<=", nowTs), orderBy("startsAt", "desc")));
            const results = [];
            for (const docSnap of snapshot.docs) {
                const parsed = this.toDomain(docSnap.id, docSnap.data());
                if (parsed.isSuccess) {
                    const ritual = parsed.getValue();
                    const isStillActive = ritual.phase === "active" ||
                        (ritual.phase === "announced" &&
                            new Date(ritual.startsAt).getTime() <= referenceDate.getTime());
                    if (isStillActive) {
                        results.push(ritual);
                    }
                }
            }
            return Result.ok(results);
        }
        catch (error) {
            return Result.fail(`Failed to load active rituals: ${error.message}`);
        }
    }
    async findByArchetype(archetype, campusId) {
        try {
            const snapshot = await getDocs(query(this.collectionRef, where("campusId", "==", campusId), where("archetype", "==", archetype), orderBy("startsAt", "desc")));
            const results = [];
            for (const docSnap of snapshot.docs) {
                const parsed = this.toDomain(docSnap.id, docSnap.data());
                if (parsed.isSuccess) {
                    results.push(parsed.getValue());
                }
            }
            return Result.ok(results);
        }
        catch (error) {
            return Result.fail(`Failed to load rituals by archetype: ${error.message}`);
        }
    }
    async findActiveByArchetype(archetype, campusId, referenceDate = new Date()) {
        try {
            const nowTs = Timestamp.fromDate(referenceDate);
            const snapshot = await getDocs(query(this.collectionRef, where("campusId", "==", campusId), where("archetype", "==", archetype), where("phase", "in", ["announced", "active"]), where("startsAt", "<=", nowTs), orderBy("startsAt", "desc")));
            const results = [];
            for (const docSnap of snapshot.docs) {
                const parsed = this.toDomain(docSnap.id, docSnap.data());
                if (parsed.isSuccess) {
                    const ritual = parsed.getValue();
                    const isActiveWindow = new Date(ritual.endsAt).getTime() >= referenceDate.getTime();
                    if (isActiveWindow) {
                        results.push(ritual);
                    }
                }
            }
            return Result.ok(results);
        }
        catch (error) {
            return Result.fail(`Failed to load active rituals by archetype: ${error.message}`);
        }
    }
    async save(ritual) {
        try {
            const docRef = doc(this.collectionRef, ritual.id);
            const snapshot = await getDoc(docRef);
            const nowTs = Timestamp.now();
            const payload = this.toPersistence(ritual, {
                createdAt: snapshot.exists()
                    ? snapshot.data().createdAt
                    : nowTs,
                updatedAt: nowTs,
            });
            if (snapshot.exists()) {
                await setDoc(docRef, payload, { merge: true });
            }
            else {
                await setDoc(docRef, payload);
            }
            return Result.ok();
        }
        catch (error) {
            return Result.fail(`Failed to save ritual ${ritual.id}: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const docRef = doc(this.collectionRef, id);
            await deleteDoc(docRef);
            return Result.ok();
        }
        catch (error) {
            return Result.fail(`Failed to delete ritual ${id}: ${error.message}`);
        }
    }
    // Helpers
    toDomain(id, data) {
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
            return Result.fail(`Invalid ritual payload: ${parsed.error.message}`);
        }
        return Result.ok(parsed.data);
    }
    toPersistence(ritual, timestamps) {
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
                ? { ...ritual.presentation }
                : {},
            metrics: ritual.metrics
                ? { ...ritual.metrics }
                : {},
            config: ritual.config,
        };
    }
    timestampToIso(value) {
        if (!value)
            return new Date().toISOString();
        if (typeof value === "string")
            return value;
        return value.toDate().toISOString();
    }
}
//# sourceMappingURL=ritual-config.repository.js.map