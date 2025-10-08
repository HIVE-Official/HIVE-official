"use strict";
/**
 * Firebase Ritual Repository Implementation
 * Handles ritual persistence with Firebase
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseRitualRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@hive/firebase");
const Result_1 = require("../../../domain/shared/base/Result");
const ritual_aggregate_1 = require("../../../domain/rituals/aggregates/ritual.aggregate");
const ritual_id_value_1 = require("../../../domain/rituals/value-objects/ritual-id.value");
const campus_id_value_1 = require("../../../domain/profile/value-objects/campus-id.value");
const profile_id_value_1 = require("../../../domain/profile/value-objects/profile-id.value");
class FirebaseRitualRepository {
    constructor() {
        this.collectionName = 'rituals';
    }
    async findById(id) {
        try {
            const ritualId = typeof id === 'string' ? id : id.value;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, ritualId);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return Result_1.Result.fail('Ritual not found');
            }
            const data = docSnap.data();
            return this.toDomain(ritualId, data);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find ritual: ${error}`);
        }
    }
    async findByCampus(campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('startDate', 'desc'), (0, firestore_1.limit)(50));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const rituals = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    rituals.push(result.getValue());
                }
            }
            return Result_1.Result.ok(rituals);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find rituals: ${error}`);
        }
    }
    async findActive(campusId) {
        try {
            const now = firestore_1.Timestamp.now();
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('startDate', '<=', now), (0, firestore_1.where)('endDate', '>=', now), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('endDate', 'asc'), (0, firestore_1.orderBy)('startDate', 'desc'), (0, firestore_1.limit)(20));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const rituals = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    const ritual = result.getValue();
                    if (ritual.isActive()) {
                        rituals.push(ritual);
                    }
                }
            }
            return Result_1.Result.ok(rituals);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find active rituals: ${error}`);
        }
    }
    async findByType(type, campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('type', '==', type), (0, firestore_1.orderBy)('startDate', 'desc'), (0, firestore_1.limit)(20));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const rituals = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    rituals.push(result.getValue());
                }
            }
            return Result_1.Result.ok(rituals);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find rituals by type: ${error}`);
        }
    }
    async findActiveByType(type, campusId) {
        try {
            const now = firestore_1.Timestamp.now();
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('type', '==', type), (0, firestore_1.where)('startDate', '<=', now), (0, firestore_1.where)('endDate', '>=', now), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('endDate', 'asc'), (0, firestore_1.orderBy)('startDate', 'desc'), (0, firestore_1.limit)(1));
            const snapshot = await (0, firestore_1.getDocs)(q);
            if (snapshot.empty) {
                return Result_1.Result.fail('No active ritual of this type found');
            }
            const doc = snapshot.docs[0];
            return this.toDomain(doc.id, doc.data());
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find active ritual by type: ${error}`);
        }
    }
    async findUserRituals(userId) {
        try {
            // Query rituals where user is a participant
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('participantIds', 'array-contains', userId), (0, firestore_1.orderBy)('endDate', 'desc'), (0, firestore_1.limit)(50));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const rituals = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    rituals.push(result.getValue());
                }
            }
            return Result_1.Result.ok(rituals);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find user rituals: ${error}`);
        }
    }
    async save(ritual) {
        try {
            const data = this.toPersistence(ritual);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, ritual.ritualId.value);
            if (ritual.createdAt) {
                // Update existing
                await (0, firestore_1.updateDoc)(docRef, {
                    ...data,
                    updatedAt: firestore_1.Timestamp.now()
                });
            }
            else {
                // Create new
                await (0, firestore_1.setDoc)(docRef, {
                    ...data,
                    createdAt: firestore_1.Timestamp.now(),
                    updatedAt: firestore_1.Timestamp.now()
                });
            }
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to save ritual: ${error}`);
        }
    }
    async delete(id) {
        try {
            const ritualId = typeof id === 'string' ? id : id.value;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, ritualId);
            await (0, firestore_1.deleteDoc)(docRef);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to delete ritual: ${error}`);
        }
    }
    // Helper methods for domain mapping
    async toDomain(id, data) {
        try {
            // Create campus ID
            const campusIdResult = campus_id_value_1.CampusId.create(data.campusId);
            if (campusIdResult.isFailure) {
                return Result_1.Result.fail(campusIdResult.error);
            }
            // Create ritual ID
            const ritualIdResult = ritual_id_value_1.RitualId.create(id);
            if (ritualIdResult.isFailure) {
                return Result_1.Result.fail(ritualIdResult.error);
            }
            // Create ProfileId for creator
            const createdBy = profile_id_value_1.ProfileId.create(data.createdBy || 'system');
            if (createdBy.isFailure) {
                return Result_1.Result.fail(createdBy.error);
            }
            // Create ritual with new model
            const ritualResult = ritual_aggregate_1.Ritual.create({
                ritualId: ritualIdResult.getValue(),
                name: data.name,
                description: data.description,
                icon: data.icon,
                type: data.type || 'short', // short, anticipatory, yearbook
                category: data.category || 'social', // social, academic, wellness, community
                duration: data.duration || '1 week',
                startDate: data.startDate?.toDate() || new Date(),
                endDate: data.endDate?.toDate(),
                goals: data.goals || [],
                requirements: data.requirements || [],
                rewards: data.rewards || [],
                campusId: campusIdResult.getValue(),
                targetAudience: data.targetAudience || 'all',
                createdBy: createdBy.getValue(),
                status: data.status || 'draft',
                visibility: data.visibility || 'public',
                announcedAt: data.announcedAt?.toDate(),
                activatedAt: data.activatedAt?.toDate(),
                launchedAt: data.launchedAt?.toDate(),
                completedAt: data.completedAt?.toDate()
            });
            if (ritualResult.isFailure) {
                return Result_1.Result.fail(ritualResult.error);
            }
            const ritual = ritualResult.getValue();
            // Set timestamps
            if (data.createdAt) {
                ritual.setCreatedAt(data.createdAt.toDate());
            }
            if (data.updatedAt) {
                ritual.setUpdatedAt(data.updatedAt.toDate());
            }
            // Load participants (without triggering events)
            if (data.participantIds && Array.isArray(data.participantIds)) {
                data.participantIds.forEach((profileId) => {
                    ritual.addParticipant(profileId);
                });
            }
            // Set goals if they exist
            if (data.goals && Array.isArray(data.goals)) {
                ritual.setGoals(data.goals.map((goal) => ({
                    id: goal.id,
                    description: goal.description,
                    type: goal.type || 'individual',
                    targetValue: goal.targetValue || 100,
                    currentValue: goal.currentValue || 0,
                    isCompleted: goal.isCompleted || false,
                    completedAt: goal.completedAt?.toDate()
                })));
            }
            // Set requirements if they exist
            if (data.requirements && Array.isArray(data.requirements)) {
                ritual.setRequirements(data.requirements);
            }
            // Set rewards if they exist
            if (data.rewards && Array.isArray(data.rewards)) {
                ritual.setRewards(data.rewards);
            }
            return Result_1.Result.ok(ritual);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to map to domain: ${error}`);
        }
    }
    toPersistence(ritual) {
        return {
            // Identity
            name: ritual.name,
            description: ritual.description,
            icon: ritual.ritualId.value, // Use icon if available
            // Classification
            type: ritual.type, // short, anticipatory, yearbook
            category: ritual.category, // social, academic, wellness, community
            duration: ritual.duration,
            // Timing
            startDate: ritual.startDate ? firestore_1.Timestamp.fromDate(ritual.startDate) : null,
            endDate: ritual.endDate ? firestore_1.Timestamp.fromDate(ritual.endDate) : null,
            // Goals, Requirements, Rewards
            goals: ritual.goals,
            requirements: ritual.requirements,
            rewards: ritual.rewards,
            // Participation
            participantIds: ritual.getParticipants().map((p) => p.value),
            participantCount: ritual.getParticipantCount(),
            targetParticipation: ritual.participationStats.total,
            participationStats: ritual.participationStats,
            // Campus
            campusId: ritual.campusId.value,
            targetAudience: ritual.targetAudience,
            createdBy: ritual.ritualId.value, // Need proper createdBy tracking
            // Status
            status: ritual.status,
            visibility: ritual.visibility,
            // Lifecycle Timestamps
            announcedAt: ritual.announcedAt ? firestore_1.Timestamp.fromDate(ritual.announcedAt) : null,
            activatedAt: ritual.activatedAt ? firestore_1.Timestamp.fromDate(ritual.activatedAt) : null,
            launchedAt: ritual.launchedAt ? firestore_1.Timestamp.fromDate(ritual.launchedAt) : null,
            completedAt: ritual.completedAt ? firestore_1.Timestamp.fromDate(ritual.completedAt) : null,
            // Progress Metrics
            totalProgress: ritual.getTotalProgress(),
            completionPercentage: ritual.getCompletionPercentage(),
            // Metadata
            createdAt: firestore_1.Timestamp.fromDate(ritual.createdAt),
            updatedAt: firestore_1.Timestamp.fromDate(ritual.updatedAt)
        };
    }
    async findParticipation(ritualId, profileId) {
        try {
            const participationDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.db, `${this.collectionName}/${ritualId}/participation/${profileId}`));
            if (!participationDoc.exists()) {
                return Result_1.Result.fail('Participation not found');
            }
            const data = participationDoc.data();
            return Result_1.Result.ok({
                id: participationDoc.id,
                ritualId,
                profileId,
                completionCount: data.completionCount || 0,
                streakCount: data.streakCount || 0,
                totalPoints: data.totalPoints || 0,
                lastParticipatedAt: data.lastParticipatedAt?.toDate(),
                createdAt: data.createdAt?.toDate() || new Date(),
                isActive: data.isActive !== false
            });
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find participation: ${error}`);
        }
    }
    async saveParticipation(participation) {
        try {
            const participationData = {
                ritualId: participation.ritualId,
                profileId: participation.profileId,
                completionCount: participation.completionCount || 0,
                streakCount: participation.streakCount || 0,
                totalPoints: participation.totalPoints || 0,
                lastParticipatedAt: participation.lastParticipatedAt ? firestore_1.Timestamp.fromDate(participation.lastParticipatedAt) : null,
                createdAt: participation.createdAt ? firestore_1.Timestamp.fromDate(participation.createdAt) : firestore_1.Timestamp.now(),
                isActive: participation.isActive !== false,
                updatedAt: firestore_1.Timestamp.now()
            };
            await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.db, `${this.collectionName}/${participation.ritualId}/participation/${participation.profileId}`), participationData);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to save participation: ${error}`);
        }
    }
    async findLeaderboard(ritualId, limit = 50) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, `${this.collectionName}/${ritualId}/participation`), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('totalPoints', 'desc'), (0, firestore_1.limit)(limit));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const leaderboard = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                lastParticipatedAt: doc.data().lastParticipatedAt?.toDate(),
                createdAt: doc.data().createdAt?.toDate()
            }));
            return Result_1.Result.ok(leaderboard);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find leaderboard: ${error}`);
        }
    }
    async findByParticipant(profileId) {
        try {
            // First find all rituals where this user has participated
            const ritualsSnapshot = await (0, firestore_1.getDocs)((0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName)));
            const participatedRituals = [];
            for (const ritualDoc of ritualsSnapshot.docs) {
                const participationDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.db, `${this.collectionName}/${ritualDoc.id}/participation/${profileId}`));
                if (participationDoc.exists()) {
                    const ritualResult = await this.toDomain(ritualDoc.id, ritualDoc.data());
                    if (ritualResult.isSuccess) {
                        participatedRituals.push(ritualResult.getValue());
                    }
                }
            }
            return Result_1.Result.ok(participatedRituals);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find rituals by participant: ${error}`);
        }
    }
    subscribeToRitual(ritualId, callback) {
        // Simplified subscription implementation
        // In production, this would use Firestore real-time listeners
        console.log(`Subscribing to ritual ${ritualId}`);
        this.findById(ritualId).then((result) => {
            if (result.isSuccess) {
                callback(result.getValue());
            }
        });
        // Return unsubscribe function
        return () => {
            console.log(`Unsubscribed from ritual ${ritualId}`);
        };
    }
    subscribeToActiveRituals(campusId, callback) {
        // Simplified subscription implementation
        // In production, this would use Firestore real-time listeners
        console.log(`Subscribing to active rituals for campus ${campusId}`);
        this.findActive(campusId).then((result) => {
            if (result.isSuccess) {
                callback(result.getValue());
            }
        });
        // Return unsubscribe function
        return () => {
            console.log(`Unsubscribed from active rituals for campus ${campusId}`);
        };
    }
}
exports.FirebaseRitualRepository = FirebaseRitualRepository;
//# sourceMappingURL=ritual.repository.js.map