"use strict";
/**
 * Firebase Campus Repository
 * Firestore implementation for Campus-level operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseCampusRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const domain_1 = require("../../domain");
class FirebaseCampusRepository {
    constructor() {
        this.campusCollection = 'campus_config';
        this.profilesCollection = 'profiles';
        this.spacesCollection = 'spaces';
        this.ritualsCollection = 'rituals';
        this.activityCollection = 'user_activity';
    }
    async getCampusStats(campusId) {
        try {
            // Get total users count
            const usersQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.profilesCollection), (0, firestore_1.where)('campusId', '==', campusId));
            const usersCount = await (0, firestore_1.getCountFromServer)(usersQuery);
            // Get total spaces count
            const spacesQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('campusId', '==', campusId));
            const spacesCount = await (0, firestore_1.getCountFromServer)(spacesQuery);
            // Get active rituals count
            const ritualsQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.ritualsCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('status', '==', 'active'));
            const ritualsCount = await (0, firestore_1.getCountFromServer)(ritualsQuery);
            // Get daily active users (users active in last 24 hours)
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const dailyActiveQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.activityCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('lastActiveAt', '>', firestore_1.Timestamp.fromDate(yesterday)));
            const dailyActiveCount = await (0, firestore_1.getCountFromServer)(dailyActiveQuery);
            const stats = {
                totalUsers: usersCount.data().count,
                totalSpaces: spacesCount.data().count,
                activeRituals: ritualsCount.data().count,
                dailyActiveUsers: dailyActiveCount.data().count,
            };
            return domain_1.Result.ok(stats);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get campus stats: ${error}`);
        }
    }
    async verifyCampusEmail(email) {
        try {
            const emailLower = email.toLowerCase();
            // For UB-specific implementation
            if (emailLower.endsWith('@buffalo.edu')) {
                return domain_1.Result.ok(true);
            }
            // Check if email domain is in any campus configuration
            const campusQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.campusCollection));
            const campusSnapshot = await (0, firestore_1.getDocs)(campusQuery);
            for (const doc of campusSnapshot.docs) {
                const campusData = doc.data();
                if (campusData.isActive) {
                    for (const domain of campusData.emailDomains) {
                        if (emailLower.endsWith(domain.toLowerCase())) {
                            return domain_1.Result.ok(true);
                        }
                    }
                }
            }
            return domain_1.Result.ok(false);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to verify campus email: ${error}`);
        }
    }
    async getValidEmailDomains(campusId) {
        try {
            // For UB-specific implementation
            if (campusId === 'ub-buffalo') {
                return domain_1.Result.ok(['@buffalo.edu']);
            }
            // Get campus configuration
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.campusCollection, campusId);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return domain_1.Result.fail('Campus configuration not found');
            }
            const campusData = docSnap.data();
            if (!campusData.isActive) {
                return domain_1.Result.fail('Campus is not active');
            }
            return domain_1.Result.ok(campusData.emailDomains);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get valid email domains: ${error}`);
        }
    }
    // Additional campus-specific methods
    async getCampusConfiguration(campusId) {
        try {
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.campusCollection, campusId);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return domain_1.Result.fail('Campus configuration not found');
            }
            const campusData = docSnap.data();
            return domain_1.Result.ok(campusData);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get campus configuration: ${error}`);
        }
    }
    async getTopSpacesByActivity(campusId, limitCount = 10) {
        try {
            // Get spaces ordered by recent activity
            const spacesQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('lastActivityAt', 'desc'), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(spacesQuery);
            const topSpaces = snapshot.docs.map(doc => {
                const data = doc.data();
                // Simple activity score based on member count and recent activity
                const daysSinceActivity = (Date.now() - data.lastActivityAt.toDate().getTime()) / (1000 * 60 * 60 * 24);
                const activityScore = data.memberCount * Math.max(1, 7 - daysSinceActivity);
                return {
                    spaceId: doc.id,
                    activityScore: Math.round(activityScore)
                };
            });
            return domain_1.Result.ok(topSpaces);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get top spaces by activity: ${error}`);
        }
    }
    async getCampusEngagementMetrics(campusId) {
        try {
            // This would be implemented with proper analytics aggregation
            // For now, return placeholder metrics that would be calculated
            // from actual usage data in production
            const metrics = {
                averagePostsPerDay: 12.5,
                averageConnectionsPerUser: 8.3,
                mostActiveSpaceType: 'study-group',
                peakActivityHour: 19 // 7 PM
            };
            return domain_1.Result.ok(metrics);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get campus engagement metrics: ${error}`);
        }
    }
}
exports.FirebaseCampusRepository = FirebaseCampusRepository;
//# sourceMappingURL=campus.repository.js.map