"use strict";
/**
 * Firebase Profile Repository Implementation
 * Handles profile persistence with Firebase
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseProfileRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@hive/firebase");
const Result_1 = require("../../../domain/shared/base/Result");
const profile_aggregate_1 = require("../../../domain/profile/aggregates/profile.aggregate");
const profile_id_value_1 = require("../../../domain/profile/value-objects/profile-id.value");
const value_objects_1 = require("../../../domain/profile/value-objects");
const profile_handle_value_1 = require("../../../domain/profile/value-objects/profile-handle.value");
const campus_id_value_1 = require("../../../domain/profile/value-objects/campus-id.value");
const user_type_value_1 = require("../../../domain/profile/value-objects/user-type.value");
const profile_privacy_value_1 = require("../../../domain/profile/value-objects/profile-privacy.value");
const feature_flags_1 = require("../../feature-flags");
class FirebaseProfileRepository {
    constructor() {
        this.collectionName = 'users';
        this.connectionsCollection = 'connections';
    }
    async findById(id) {
        try {
            const profileId = typeof id === 'string' ? id : id.id;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, profileId);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return Result_1.Result.fail('Profile not found');
            }
            const data = docSnap.data();
            return this.toDomain(profileId, data);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find profile: ${error}`);
        }
    }
    async findByEmail(email) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('email', '==', email), (0, firestore_1.limit)(1));
            const snapshot = await (0, firestore_1.getDocs)(q);
            if (snapshot.empty) {
                return Result_1.Result.fail('Profile not found');
            }
            const doc = snapshot.docs[0];
            return this.toDomain(doc.id, doc.data());
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find profile: ${error}`);
        }
    }
    async findByHandle(handle) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('handle', '==', handle.toLowerCase()), (0, firestore_1.limit)(1));
            const snapshot = await (0, firestore_1.getDocs)(q);
            if (snapshot.empty) {
                return Result_1.Result.fail('Profile not found');
            }
            const doc = snapshot.docs[0];
            return this.toDomain(doc.id, doc.data());
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find profile: ${error}`);
        }
    }
    async findByCampus(campusId, limitCount = 50) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const profiles = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    profiles.push(result.getValue());
                }
            }
            return Result_1.Result.ok(profiles);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find profiles: ${error}`);
        }
    }
    async exists(handle) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('handle', '==', handle.toLowerCase()), (0, firestore_1.limit)(1));
            const snapshot = await (0, firestore_1.getDocs)(q);
            return !snapshot.empty;
        }
        catch {
            return false;
        }
    }
    async searchByName(searchQuery, campusId) {
        try {
            // Firebase doesn't support full-text search natively
            // For MVP, we'll do a simple prefix search on firstName and lastName
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('firstName'), (0, firestore_1.limit)(20));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const profiles = [];
            const searchLower = searchQuery.toLowerCase();
            for (const doc of snapshot.docs) {
                const data = doc.data();
                const fullName = `${data.firstName} ${data.lastName}`.toLowerCase();
                const handle = data.handle?.toLowerCase() || '';
                if (fullName.includes(searchLower) || handle.includes(searchLower)) {
                    const result = await this.toDomain(doc.id, data);
                    if (result.isSuccess) {
                        profiles.push(result.getValue());
                    }
                }
            }
            return Result_1.Result.ok(profiles);
        }
        catch (error) {
            return Result_1.Result.fail(`Search failed: ${error}`);
        }
    }
    async save(profile) {
        try {
            const data = this.toPersistence(profile);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, profile.id);
            if (profile.createdAt) {
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
            return Result_1.Result.fail(`Failed to save profile: ${error}`);
        }
    }
    async delete(id) {
        try {
            const profileId = typeof id === 'string' ? id : id.id;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, profileId);
            await (0, firestore_1.deleteDoc)(docRef);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to delete profile: ${error}`);
        }
    }
    // Helper methods for domain mapping
    async toDomain(id, data) {
        try {
            // Handle legacy profiles without enhanced features
            if (!(0, feature_flags_1.isFeatureEnabled)('PROFILE_CAMPUS_ISOLATION') || !data.campusId) {
                data.campusId = 'ub-buffalo'; // Default for legacy profiles
            }
            const profileData = {
                id,
                email: data.email,
                handle: data.handle,
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                major: data.major,
                graduationYear: data.graduationYear,
                interests: data.interests || [],
                photos: data.photos || [],
                isActive: data.isActive !== false,
                isVerified: data.isVerified || false,
                userType: data.userType || 'student',
                campusId: data.campusId,
                privacy: data.privacy || {},
                badges: data.badges || [],
                blockedUsers: data.blockedUsers || [],
                lastSeen: data.lastSeen?.toDate(),
                createdAt: data.createdAt?.toDate(),
                updatedAt: data.updatedAt?.toDate(),
                onboardingCompleted: data.onboardingCompleted || false,
                activityScore: data.activityScore || 0,
                followerCount: data.followerCount || 0,
                followingCount: data.followingCount || 0,
                connectionCount: data.connectionCount || 0
            };
            // Create value objects
            const emailResult = value_objects_1.UBEmail.create(profileData.email);
            if (emailResult.isFailure) {
                return Result_1.Result.fail(emailResult.error);
            }
            const handleResult = profile_handle_value_1.ProfileHandle.create(profileData.handle);
            if (handleResult.isFailure) {
                return Result_1.Result.fail(handleResult.error);
            }
            const campusIdResult = campus_id_value_1.CampusId.create(profileData.campusId);
            if (campusIdResult.isFailure) {
                return Result_1.Result.fail(campusIdResult.error);
            }
            const userTypeResult = user_type_value_1.UserType.create(profileData.userType);
            if (userTypeResult.isFailure) {
                return Result_1.Result.fail(userTypeResult.error);
            }
            // Create profile
            const profile = profile_aggregate_1.Profile.create({
                profileId: profile_id_value_1.ProfileId.create(id).getValue(),
                email: emailResult.getValue(),
                handle: handleResult.getValue(),
                userType: userTypeResult.getValue(),
                campusId: campusIdResult.getValue(),
                personalInfo: {
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    bio: profileData.bio,
                    major: profileData.major,
                    graduationYear: profileData.graduationYear,
                    profilePhoto: profileData.profilePhoto || profileData.photos?.[0],
                    coverPhoto: profileData.coverPhoto || profileData.photos?.[1]
                },
                socialInfo: {
                    interests: profileData.interests || [],
                    clubs: profileData.clubs || [],
                    sports: profileData.sports || []
                }
            });
            if (profile.isFailure) {
                return Result_1.Result.fail(profile.error);
            }
            const enhancedProfile = profile.getValue();
            // Set additional properties using setter methods where needed
            if (profileData.isVerified !== undefined) {
                enhancedProfile.setIsVerified(profileData.isVerified);
            }
            if (profileData.activityScore !== undefined) {
                enhancedProfile.setActivityScore(profileData.activityScore);
            }
            // Set privacy settings
            if (profileData.privacy && (0, feature_flags_1.isFeatureEnabled)('PROFILE_PRIVACY_CONTROLS')) {
                const privacyResult = profile_privacy_value_1.ProfilePrivacy.create(profileData.privacy);
                if (privacyResult.isSuccess) {
                    enhancedProfile.setPrivacy(privacyResult.getValue());
                }
            }
            return Result_1.Result.ok(enhancedProfile);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to map to domain: ${error}`);
        }
    }
    toPersistence(profile) {
        return {
            email: profile.email.value,
            handle: profile.handle.value.toLowerCase(),
            firstName: profile.firstName,
            lastName: profile.lastName,
            bio: profile.bio,
            major: profile.major,
            graduationYear: profile.graduationYear,
            interests: profile.interests,
            photos: profile.photos,
            isActive: profile.isActive,
            isVerified: profile.isVerified,
            userType: profile.userType.value,
            campusId: profile.campusId.id,
            privacy: profile.privacy ? {
                profileVisibility: profile.privacy.profileVisibility,
                showEmail: profile.privacy.showEmail,
                showConnections: profile.privacy.showConnections,
                allowConnectionRequests: profile.privacy.allowConnectionRequests
            } : {},
            badges: profile.badges,
            blockedUsers: profile.blockedUsers,
            lastSeen: profile.lastSeen ? firestore_1.Timestamp.fromDate(profile.lastSeen) : null,
            onboardingCompleted: profile.onboardingCompleted,
            activityScore: profile.activityScore,
            followerCount: profile.followerCount,
            followingCount: profile.followingCount,
            connectionCount: profile.connectionCount
        };
    }
    // Additional methods required by interface
    async findOnboardedProfiles(maxCount = 100) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('onboardingCompleted', '==', true), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(maxCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const profiles = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    profiles.push(result.getValue());
                }
            }
            return Result_1.Result.ok(profiles);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find onboarded profiles: ${error}`);
        }
    }
    async findByInterest(interest, limitCount = 50) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('interests', 'array-contains', interest), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('activityScore', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const profiles = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    profiles.push(result.getValue());
                }
            }
            return Result_1.Result.ok(profiles);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find profiles by interest: ${error}`);
        }
    }
    async findByMajor(major, limitCount = 50) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('major', '==', major), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const profiles = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    profiles.push(result.getValue());
                }
            }
            return Result_1.Result.ok(profiles);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find profiles by major: ${error}`);
        }
    }
    async findConnectionsOf(profileId) {
        try {
            // Find all connections for this profile
            const q1 = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.connectionsCollection), (0, firestore_1.where)('fromProfileId', '==', profileId), (0, firestore_1.where)('status', '==', 'accepted'));
            const q2 = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.connectionsCollection), (0, firestore_1.where)('toProfileId', '==', profileId), (0, firestore_1.where)('status', '==', 'accepted'));
            const [snapshot1, snapshot2] = await Promise.all([(0, firestore_1.getDocs)(q1), (0, firestore_1.getDocs)(q2)]);
            // Collect all connected profile IDs
            const connectedProfileIds = new Set();
            snapshot1.docs.forEach(doc => {
                const data = doc.data();
                connectedProfileIds.add(data.toProfileId);
            });
            snapshot2.docs.forEach(doc => {
                const data = doc.data();
                connectedProfileIds.add(data.fromProfileId);
            });
            // Fetch all connected profiles
            const profiles = [];
            for (const connectedId of Array.from(connectedProfileIds)) {
                const result = await this.findById(connectedId);
                if (result.isSuccess) {
                    profiles.push(result.getValue());
                }
            }
            return Result_1.Result.ok(profiles);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find connections: ${error}`);
        }
    }
    async getTotalCampusUsers(campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true));
            const snapshot = await (0, firestore_1.getDocs)(q);
            return Result_1.Result.ok(snapshot.size);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to count campus users: ${error}`);
        }
    }
}
exports.FirebaseProfileRepository = FirebaseProfileRepository;
//# sourceMappingURL=profile.repository.js.map