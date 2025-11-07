"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseRitualConfigRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@hive/firebase");
const Result_1 = require("../../../domain/shared/base/Result");
const archetypes_1 = require("../../../domain/rituals/archetypes");
const COLLECTION_NAME = "rituals_v2";
class FirebaseRitualConfigRepository {
    constructor() {
        this.collectionRef = (0, firestore_1.collection)(firebase_1.db, COLLECTION_NAME);
    }
    async findById(id) {
        try {
            const docRef = (0, firestore_1.doc)(this.collectionRef, id);
            const snapshot = await (0, firestore_1.getDoc)(docRef);
            if (!snapshot.exists()) {
                return Result_1.Result.fail("Ritual not found");
            }
            return this.toDomain(snapshot.id, snapshot.data());
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to load ritual ${id}: ${error.message}`);
        }
    }
    async findBySlug(slug, campusId) {
        try {
            const q = (0, firestore_1.query)(this.collectionRef, (0, firestore_1.where)("campusId", "==", campusId), (0, firestore_1.where)("slug", "==", slug), (0, firestore_1.orderBy)("updatedAt", "desc"));
            const snapshot = await (0, firestore_1.getDocs)(q);
            if (snapshot.empty) {
                return Result_1.Result.fail("Ritual not found");
            }
            const docSnap = snapshot.docs[0];
            return this.toDomain(docSnap.id, docSnap.data());
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find ritual by slug: ${error.message}`);
        }
    }
    async findByCampus(campusId, options) {
        try {
            const constraints = [
                (0, firestore_1.where)("campusId", "==", campusId),
                (0, firestore_1.orderBy)("startsAt", "desc"),
            ];
            if (options?.phases && options.phases.length > 0) {
                constraints.push((0, firestore_1.where)("phase", "in", options.phases));
            }
            const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.query)(this.collectionRef, ...constraints));
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
            return Result_1.Result.ok(results);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to load campus rituals: ${error.message}`);
        }
    }
    async findActive(campusId, referenceDate = new Date()) {
        try {
            const nowTs = firestore_1.Timestamp.fromDate(referenceDate);
            const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.query)(this.collectionRef, (0, firestore_1.where)("campusId", "==", campusId), (0, firestore_1.where)("phase", "in", ["announced", "active"]), (0, firestore_1.where)("startsAt", "<=", nowTs), (0, firestore_1.orderBy)("startsAt", "desc")));
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
            return Result_1.Result.ok(results);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to load active rituals: ${error.message}`);
        }
    }
    async findByArchetype(archetype, campusId) {
        try {
            const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.query)(this.collectionRef, (0, firestore_1.where)("campusId", "==", campusId), (0, firestore_1.where)("archetype", "==", archetype), (0, firestore_1.orderBy)("startsAt", "desc")));
            const results = [];
            for (const docSnap of snapshot.docs) {
                const parsed = this.toDomain(docSnap.id, docSnap.data());
                if (parsed.isSuccess) {
                    results.push(parsed.getValue());
                }
            }
            return Result_1.Result.ok(results);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to load rituals by archetype: ${error.message}`);
        }
    }
    async findActiveByArchetype(archetype, campusId, referenceDate = new Date()) {
        try {
            const nowTs = firestore_1.Timestamp.fromDate(referenceDate);
            const snapshot = await (0, firestore_1.getDocs)((0, firestore_1.query)(this.collectionRef, (0, firestore_1.where)("campusId", "==", campusId), (0, firestore_1.where)("archetype", "==", archetype), (0, firestore_1.where)("phase", "in", ["announced", "active"]), (0, firestore_1.where)("startsAt", "<=", nowTs), (0, firestore_1.orderBy)("startsAt", "desc")));
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
            return Result_1.Result.ok(results);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to load active rituals by archetype: ${error.message}`);
        }
    }
    async save(ritual) {
        try {
            const docRef = (0, firestore_1.doc)(this.collectionRef, ritual.id);
            const snapshot = await (0, firestore_1.getDoc)(docRef);
            const nowTs = firestore_1.Timestamp.now();
            const payload = this.toPersistence(ritual, {
                createdAt: snapshot.exists()
                    ? snapshot.data().createdAt
                    : nowTs,
                updatedAt: nowTs,
            });
            if (snapshot.exists()) {
                await (0, firestore_1.setDoc)(docRef, payload, { merge: true });
            }
            else {
                await (0, firestore_1.setDoc)(docRef, payload);
            }
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to save ritual ${ritual.id}: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const docRef = (0, firestore_1.doc)(this.collectionRef, id);
            await (0, firestore_1.deleteDoc)(docRef);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to delete ritual ${id}: ${error.message}`);
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
        const parsed = archetypes_1.RitualUnionSchema.safeParse(base);
        if (!parsed.success) {
            return Result_1.Result.fail(`Invalid ritual payload: ${parsed.error.message}`);
        }
        return Result_1.Result.ok(parsed.data);
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
            startsAt: firestore_1.Timestamp.fromDate(new Date(ritual.startsAt)),
            endsAt: firestore_1.Timestamp.fromDate(new Date(ritual.endsAt)),
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
exports.FirebaseRitualConfigRepository = FirebaseRitualConfigRepository;
//# sourceMappingURL=ritual-config.repository.js.map