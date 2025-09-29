"use strict";
/**
 * Firebase Profile Repository
 * Firestore implementation for Profile domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseProfileRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const domain_1 = require("../../domain");
class FirebaseProfileRepository {
    constructor() {
        this.collectionName = 'profiles';
    }
    async save(profile) {
        try {
            const profileData = this.domainToFirestore(profile);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, profile.id.id);
            await (0, firestore_1.setDoc)(docRef, profileData, { merge: true });
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to save profile: ${error}`);
        }
    }
    async findById(profileId) {
        try {
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, profileId.id);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return domain_1.Result.fail('Profile not found');
            }
            const firestoreData = docSnap.data();
            const profile = this.firestoreToDisplay(firestoreData);
            return domain_1.Result.ok(profile);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find profile: ${error}`);
        }
    }
    async findByEmail(email) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('email', '==', email.email), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.limit)(1));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            if (querySnapshot.empty) {
                return domain_1.Result.fail('Profile not found');
            }
            const doc = querySnapshot.docs[0];
            const firestoreData = doc.data();
            const profile = this.firestoreToDisplay(firestoreData);
            return domain_1.Result.ok(profile);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find profile by email: ${error}`);
        }
    }
    async findByHandle(handle) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('handle', '==', handle.username), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.limit)(1));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            if (querySnapshot.empty) {
                return domain_1.Result.fail('Profile not found');
            }
            const doc = querySnapshot.docs[0];
            const firestoreData = doc.data();
            const profile = this.firestoreToDisplay(firestoreData);
            return domain_1.Result.ok(profile);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find profile by handle: ${error}`);
        }
    }
    async delete(profileId) {
        try {
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, profileId.id);
            await (0, firestore_1.deleteDoc)(docRef);
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to delete profile: ${error}`);
        }
    }
    async findConnectionsOf(profileId) {
        try {
            // First get the profile to get their connections
            const profileResult = await this.findById(profileId);
            if (profileResult.isFailure) {
                return domain_1.Result.fail(profileResult.error);
            }
            const profile = profileResult.getValue();
            const connectionIds = profile.connections.map(c => c.id);
            if (connectionIds.length === 0) {
                return domain_1.Result.ok([]);
            }
            // Firestore 'in' queries are limited to 10 items, so we might need to batch
            const profiles = [];
            const batchSize = 10;
            for (let i = 0; i < connectionIds.length; i += batchSize) {
                const batch = connectionIds.slice(i, i + batchSize);
                const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('id', 'in', batch), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'));
                const querySnapshot = await (0, firestore_1.getDocs)(q);
                querySnapshot.docs.forEach(doc => {
                    const firestoreData = doc.data();
                    profiles.push(this.firestoreToDisplay(firestoreData));
                });
            }
            return domain_1.Result.ok(profiles);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find connections: ${error}`);
        }
    }
    async findByInterest(interest, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('interests', 'array-contains', interest), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.where)('isOnboarded', '==', true), (0, firestore_1.orderBy)('updatedAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const profiles = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            return domain_1.Result.ok(profiles);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find profiles by interest: ${error}`);
        }
    }
    async findByMajor(major, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('major', '==', major), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.where)('isOnboarded', '==', true), (0, firestore_1.orderBy)('updatedAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const profiles = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            return domain_1.Result.ok(profiles);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find profiles by major: ${error}`);
        }
    }
    async findOnboardedProfiles(maxCount = 50) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('isOnboarded', '==', true), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.orderBy)('updatedAt', 'desc'), (0, firestore_1.limit)(maxCount));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const profiles = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            return domain_1.Result.ok(profiles);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find onboarded profiles: ${error}`);
        }
    }
    async findByCampus(campusId, limitCount = 100) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const profiles = querySnapshot.docs.map(doc => {
                const firestoreData = doc.data();
                return this.firestoreToDisplay(firestoreData);
            });
            return domain_1.Result.ok(profiles);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find profiles by campus: ${error}`);
        }
    }
    async getTotalCampusUsers(campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            return domain_1.Result.ok(querySnapshot.size);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get total campus users: ${error}`);
        }
    }
    subscribeToProfile(profileId, callback) {
        const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, profileId.id);
        return (0, firestore_1.onSnapshot)(docRef, (doc) => {
            if (doc.exists()) {
                const firestoreData = doc.data();
                const profile = this.firestoreToDisplay(firestoreData);
                callback(profile);
            }
            else {
                callback(null);
            }
        });
    }
    // Helper methods for data transformation
    domainToFirestore(profile) {
        const data = profile.toData();
        return {
            id: data.id.id,
            email: data.email.email,
            handle: data.handle.username,
            firstName: data.personalInfo.firstName,
            lastName: data.personalInfo.lastName,
            bio: data.personalInfo.bio || '',
            major: data.personalInfo.major || '',
            graduationYear: data.personalInfo.graduationYear || null,
            dormLocation: data.personalInfo.dorm || '',
            profileImageUrl: data.photos.length > 0 ? data.photos[0].url : null,
            additionalPhotos: data.photos.slice(1).map(p => p.url),
            interests: data.interests,
            connections: data.connections.map(c => c.id),
            isOnboarded: data.isOnboarded,
            campusId: 'ub-buffalo', // Hard-coded for v1
            createdAt: firestore_1.Timestamp.fromDate(data.createdAt),
            updatedAt: firestore_1.Timestamp.fromDate(data.updatedAt),
        };
    }
    firestoreToDisplay(data) {
        // Reconstruct the profile from Firestore data
        const profileData = {
            id: domain_1.ProfileId.create(data.id).getValue(),
            email: domain_1.UBEmail.create(data.email).getValue(),
            handle: domain_1.Handle.create(data.handle).getValue(),
            personalInfo: {
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                major: data.major,
                graduationYear: data.graduationYear || undefined,
                dorm: data.dormLocation,
            },
            photos: [
                ...(data.profileImageUrl ? [{ url: data.profileImageUrl }] : []),
                ...data.additionalPhotos.map(url => ({ url }))
            ].map(p => ({ url: p.url, equals: () => false })),
            interests: data.interests,
            connections: data.connections.map(id => domain_1.ProfileId.create(id).getValue()),
            isOnboarded: data.isOnboarded,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        };
        return domain_1.Profile.fromData(profileData);
    }
}
exports.FirebaseProfileRepository = FirebaseProfileRepository;
//# sourceMappingURL=profile.repository.js.map