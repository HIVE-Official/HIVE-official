"use strict";
/**
 * Firebase Ritual Repository
 * Firestore implementation for Ritual domain with participation tracking
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseRitualRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const domain_1 = require("../../domain");
class FirebaseRitualRepository {
    constructor() {
        this.ritualsCollection = 'rituals';
        this.participationCollection = 'ritual_participation';
    }
    async save(ritual) {
        try {
            const ritualData = this.domainToFirestore(ritual);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.ritualsCollection, ritual.id.id);
            await (0, firestore_1.setDoc)(docRef, ritualData, { merge: true });
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to save ritual: ${error}`);
        }
    }
    async findById(ritualId) {
        try {
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.ritualsCollection, ritualId.id);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return domain_1.Result.fail('Ritual not found');
            }
            const firestoreData = docSnap.data();
            const ritual = this.firestoreToDisplay(firestoreData);
            return domain_1.Result.ok(ritual);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find ritual: ${error}`);
        }
    }
    async delete(ritualId) {
        try {
            const batch = (0, firestore_1.writeBatch)(firebase_1.db);
            // Delete ritual document
            const ritualRef = (0, firestore_1.doc)(firebase_1.db, this.ritualsCollection, ritualId.id);
            batch.delete(ritualRef);
            // Delete all participation records
            const participationQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.participationCollection), (0, firestore_1.where)('ritualId', '==', ritualId.id));
            const participationSnapshot = await (0, firestore_1.getDocs)(participationQuery);
            participationSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to delete ritual: ${error}`);
        }
    }
    async findActive(campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.ritualsCollection), (0, firestore_1.where)('status', '==', 'active'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('startDate', 'desc'));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const rituals = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            return domain_1.Result.ok(rituals);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find active rituals: ${error}`);
        }
    }
    async findByType(ritualType, campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.ritualsCollection), (0, firestore_1.where)('ritualType', '==', ritualType), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('createdAt', 'desc'));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const rituals = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            return domain_1.Result.ok(rituals);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find rituals by type: ${error}`);
        }
    }
    async findByParticipant(profileId) {
        try {
            // First get all participation records for this user
            const participationQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.participationCollection), (0, firestore_1.where)('profileId', '==', profileId.id), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'));
            const participationSnapshot = await (0, firestore_1.getDocs)(participationQuery);
            const ritualIds = participationSnapshot.docs.map(doc => doc.data().ritualId);
            if (ritualIds.length === 0) {
                return domain_1.Result.ok([]);
            }
            // Get all rituals (batch processing for Firestore 'in' limit)
            const rituals = [];
            const batchSize = 10;
            for (let i = 0; i < ritualIds.length; i += batchSize) {
                const batch = ritualIds.slice(i, i + batchSize);
                const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.ritualsCollection), (0, firestore_1.where)('id', 'in', batch), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'));
                const querySnapshot = await (0, firestore_1.getDocs)(q);
                querySnapshot.docs.forEach(doc => {
                    const firestoreData = doc.data();
                    rituals.push(this.firestoreToDisplay(firestoreData));
                });
            }
            return domain_1.Result.ok(rituals);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find rituals by participant: ${error}`);
        }
    }
    async findCompleted(campusId, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.ritualsCollection), (0, firestore_1.where)('status', '==', 'completed'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('endDate', 'desc'), (0, firestore_1.limit)(limitCount));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const rituals = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            return domain_1.Result.ok(rituals);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find completed rituals: ${error}`);
        }
    }
    async findActiveByType(ritualType, campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.ritualsCollection), (0, firestore_1.where)('ritualType', '==', ritualType), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('status', '==', 'active'), (0, firestore_1.limit)(1));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            if (querySnapshot.empty) {
                return domain_1.Result.fail(`No active ritual of type ${ritualType} found`);
            }
            const firestoreData = querySnapshot.docs[0].data();
            const ritual = this.firestoreToDisplay(firestoreData);
            return domain_1.Result.ok(ritual);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find active ritual by type: ${error}`);
        }
    }
    async findUpcoming(campusId) {
        try {
            const now = firestore_1.Timestamp.now();
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.ritualsCollection), (0, firestore_1.where)('status', '==', 'upcoming'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('startDate', '>', now), (0, firestore_1.orderBy)('startDate', 'asc'));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const rituals = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            return domain_1.Result.ok(rituals);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find upcoming rituals: ${error}`);
        }
    }
    async saveParticipation(participation) {
        try {
            const participationData = this.participationToFirestore(participation);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.participationCollection, `${participation.ritualId.id}_${participation.participantId.id}`);
            await (0, firestore_1.setDoc)(docRef, participationData, { merge: true });
            // Update ritual participant count
            await this.updateRitualParticipantCount(participation.ritualId);
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to save participation: ${error}`);
        }
    }
    async findParticipation(ritualId, profileId) {
        try {
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.participationCollection, `${ritualId.id}_${profileId.id}`);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return domain_1.Result.fail('Participation not found');
            }
            const firestoreData = docSnap.data();
            const participation = this.firestoreToParticipation(firestoreData);
            return domain_1.Result.ok(participation);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find participation: ${error}`);
        }
    }
    async findLeaderboard(ritualId, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.participationCollection), (0, firestore_1.where)('ritualId', '==', ritualId.id), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.orderBy)('totalPoints', 'desc'), (0, firestore_1.limit)(limitCount));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const participations = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToParticipation(firestoreData);
            });
            return domain_1.Result.ok(participations);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find leaderboard: ${error}`);
        }
    }
    subscribeToRitual(ritualId, callback) {
        const docRef = (0, firestore_1.doc)(firebase_1.db, this.ritualsCollection, ritualId.id);
        return (0, firestore_1.onSnapshot)(docRef, (doc) => {
            if (doc.exists()) {
                const firestoreData = doc.data();
                const ritual = this.firestoreToDisplay(firestoreData);
                callback(ritual);
            }
            else {
                callback(null);
            }
        });
    }
    subscribeToActiveRituals(campusId, callback) {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.ritualsCollection), (0, firestore_1.where)('status', '==', 'active'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('participantCount', 'desc'));
        return (0, firestore_1.onSnapshot)(q, (snapshot) => {
            const rituals = snapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            callback(rituals);
        });
    }
    // Helper methods
    async updateRitualParticipantCount(ritualId) {
        try {
            // Count actual participation records
            const participationQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.participationCollection), (0, firestore_1.where)('ritualId', '==', ritualId.id), (0, firestore_1.where)('status', '==', 'active'));
            const snapshot = await (0, firestore_1.getDocs)(participationQuery);
            const participantCount = snapshot.size;
            const participantIds = snapshot.docs.map(doc => doc.data().profileId);
            // Update ritual document
            const ritualRef = (0, firestore_1.doc)(firebase_1.db, this.ritualsCollection, ritualId.id);
            await (0, firestore_1.setDoc)(ritualRef, {
                participantCount,
                participantIds,
                updatedAt: firestore_1.Timestamp.now()
            }, { merge: true });
        }
        catch (error) {
            console.error('Failed to update ritual participant count:', error);
        }
    }
    domainToFirestore(ritual) {
        const data = ritual.toData();
        return {
            id: data.id.id,
            name: data.title.title,
            description: data.description.description,
            ritualType: data.type.type,
            status: data.status.status,
            startDate: firestore_1.Timestamp.fromDate(data.startDate),
            endDate: firestore_1.Timestamp.fromDate(data.endDate),
            participantIds: data.participations.map(p => p.participantId.id),
            participantCount: data.participations.length,
            milestones: data.milestones.map(m => ({
                id: `milestone_${m.name}`,
                name: m.name,
                description: m.description,
                targetValue: m.threshold,
                currentValue: 0, // This should be calculated from participations
                isCompleted: m.unlocked,
                completedAt: null,
                participantCompletions: [],
                rewards: [{
                        type: 'badge',
                        value: m.reward,
                        description: m.description
                    }]
            })),
            settings: {
                maxParticipants: null,
                requireApproval: false,
                allowLateJoin: true,
                isVisible: true,
            },
            leaderboard: [], // Computed from participation records
            campusId: 'ub-buffalo',
            createdBy: 'system', // TODO: Track creator
            createdAt: firestore_1.Timestamp.fromDate(data.createdAt),
            updatedAt: firestore_1.Timestamp.fromDate(data.updatedAt),
        };
    }
    firestoreToDisplay(data) {
        const ritualData = {
            id: domain_1.RitualId.create(data.id).getValue(),
            title: domain_1.RitualTitle.create(data.name).getValue(),
            description: domain_1.RitualDescription.create(data.description).getValue(),
            type: domain_1.RitualType.create(data.ritualType).getValue(),
            status: domain_1.RitualStatus.create(data.status).getValue(),
            campusGoal: domain_1.CampusGoal.create(100, // Default target - should be stored properly
            'participants', data.participantCount).getValue(),
            startDate: data.startDate.toDate(),
            endDate: data.endDate.toDate(),
            participations: [], // Load separately if needed
            milestones: data.milestones.map(m => domain_1.Milestone.create(m.name, m.description, m.targetValue, m.rewards[0]?.value || 'Badge').getValue()),
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        };
        return domain_1.Ritual.fromData(ritualData);
    }
    participationToFirestore(participation) {
        return {
            id: participation.id.id,
            ritualId: participation.ritualId.id,
            profileId: participation.participantId.id,
            status: participation.isActive ? 'active' : 'inactive',
            joinedAt: firestore_1.Timestamp.fromDate(participation.joinedAt),
            lastActiveAt: firestore_1.Timestamp.fromDate(participation.joinedAt), // TODO: Track last activity
            totalPoints: participation.totalPoints.value,
            completedMilestones: participation.milestonesUnlocked,
            milestoneProgress: participation.milestonesUnlocked.map(milestoneName => ({
                milestoneId: milestoneName,
                currentValue: 0, // TODO: Track progress
                isCompleted: true,
                completedAt: firestore_1.Timestamp.now()
            })),
            streak: {
                currentDays: 0,
                longestDays: 0,
                lastActivityDate: firestore_1.Timestamp.fromDate(participation.joinedAt)
            },
            achievements: [],
            campusId: 'ub-buffalo',
            createdAt: firestore_1.Timestamp.fromDate(participation.joinedAt),
            updatedAt: firestore_1.Timestamp.fromDate(participation.joinedAt),
        };
    }
    firestoreToParticipation(data) {
        const participation = {
            id: domain_1.ParticipationId.create(data.id).getValue(),
            ritualId: domain_1.RitualId.create(data.ritualId).getValue(),
            participantId: domain_1.ProfileId.create(data.profileId).getValue(),
            joinedAt: data.joinedAt.toDate(),
            totalPoints: domain_1.Points.create(data.totalPoints).getValue(),
            activities: [], // Load separately if needed
            milestonesUnlocked: data.completedMilestones,
            isActive: data.status === 'active'
        };
        return participation;
    }
}
exports.FirebaseRitualRepository = FirebaseRitualRepository;
//# sourceMappingURL=ritual.repository.js.map