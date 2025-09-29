"use strict";
/**
 * Firebase Space Repository
 * Firestore implementation for Space domain
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseSpaceRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const domain_1 = require("../../domain");
class FirebaseSpaceRepository {
    constructor() {
        this.spacesCollection = 'spaces';
        this.membersCollection = 'space_members';
        this.postsCollection = 'posts';
    }
    async save(space) {
        try {
            const spaceData = this.domainToFirestore(space);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.spacesCollection, space.id.id);
            await (0, firestore_1.setDoc)(docRef, spaceData, { merge: true });
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to save space: ${error}`);
        }
    }
    async findById(spaceId) {
        try {
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.spacesCollection, spaceId.id);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return domain_1.Result.fail('Space not found');
            }
            const firestoreData = docSnap.data();
            // Get members and posts for this space
            const [membersResult, postsResult] = await Promise.all([
                this.getSpaceMembers(spaceId),
                this.getSpacePosts(spaceId)
            ]);
            if (membersResult.isFailure) {
                return domain_1.Result.fail(membersResult.error);
            }
            if (postsResult.isFailure) {
                return domain_1.Result.fail(postsResult.error);
            }
            const space = this.firestoreToDisplay(firestoreData, membersResult.getValue(), postsResult.getValue());
            return domain_1.Result.ok(space);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find space: ${error}`);
        }
    }
    async findByName(name, campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('name', '==', name.name), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.limit)(1));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            if (querySnapshot.empty) {
                return domain_1.Result.fail('Space not found');
            }
            const doc = querySnapshot.docs[0];
            const spaceId = domain_1.SpaceId.create(doc.id).getValue();
            return this.findById(spaceId);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find space by name: ${error}`);
        }
    }
    async delete(spaceId) {
        try {
            const batch = (0, firestore_1.writeBatch)(firebase_1.db);
            // Delete space document
            const spaceRef = (0, firestore_1.doc)(firebase_1.db, this.spacesCollection, spaceId.id);
            batch.delete(spaceRef);
            // Delete all members
            const membersQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.membersCollection), (0, firestore_1.where)('spaceId', '==', spaceId.id));
            const membersSnapshot = await (0, firestore_1.getDocs)(membersQuery);
            membersSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            // Delete all posts
            const postsQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.postsCollection), (0, firestore_1.where)('spaceId', '==', spaceId.id));
            const postsSnapshot = await (0, firestore_1.getDocs)(postsQuery);
            postsSnapshot.docs.forEach(doc => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            return domain_1.Result.ok();
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to delete space: ${error}`);
        }
    }
    async findByCampus(campusId, maxResults = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('lastActivityAt', 'desc'), (0, firestore_1.limit)(maxResults));
            return this.executeSpacesQuery(q);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find spaces by campus: ${error}`);
        }
    }
    async findByType(spaceType, campusId, maxResults = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('spaceType', '==', spaceType), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(maxResults));
            return this.executeSpacesQuery(q);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find spaces by type: ${error}`);
        }
    }
    async findByMember(profileId, maxResults = 20) {
        try {
            // First get all space memberships for this profile
            const membersQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.membersCollection), (0, firestore_1.where)('profileId', '==', profileId.id), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'));
            const membersSnapshot = await (0, firestore_1.getDocs)(membersQuery);
            const spaceIds = membersSnapshot.docs.map(doc => doc.data().spaceId);
            if (spaceIds.length === 0) {
                return domain_1.Result.ok([]);
            }
            // Firestore 'in' queries are limited to 10 items
            const spaces = [];
            const batchSize = 10;
            for (let i = 0; i < spaceIds.length; i += batchSize) {
                const batch = spaceIds.slice(i, i + batchSize);
                const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('id', 'in', batch), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.orderBy)('lastActivityAt', 'desc'), (0, firestore_1.limit)(maxResults));
                const querySnapshot = await (0, firestore_1.getDocs)(q);
                for (const doc of querySnapshot.docs) {
                    const spaceId = domain_1.SpaceId.create(doc.id).getValue();
                    const spaceResult = await this.findById(spaceId);
                    if (spaceResult.isSuccess) {
                        spaces.push(spaceResult.getValue());
                    }
                }
            }
            return domain_1.Result.ok(spaces.slice(0, maxResults));
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find spaces by member: ${error}`);
        }
    }
    async findTrending(campusId, maxResults = 20) {
        try {
            // For simplicity, define trending as spaces with most recent activity
            // In production, this would use more sophisticated trending algorithms
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('memberCount', '>', 1), // Must have multiple members
            (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.orderBy)('lastActivityAt', 'desc'), (0, firestore_1.limit)(maxResults));
            return this.executeSpacesQuery(q);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find trending spaces: ${error}`);
        }
    }
    async findPublicSpaces(campusId, maxResults = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('visibility', '==', 'public'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(maxResults));
            return this.executeSpacesQuery(q);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find public spaces: ${error}`);
        }
    }
    async searchSpaces(searchQuery, campusId, maxResults = 20) {
        try {
            // Firestore doesn't support full-text search, so we'll use simple name matching
            // In production, this would use Algolia or similar search service
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('name'), (0, firestore_1.limit)(50) // Get more results to filter locally
            );
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            for (const doc of querySnapshot.docs) {
                const data = doc.data();
                // Simple text matching - would be replaced with proper search
                if (data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    data.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                    const spaceId = domain_1.SpaceId.create(doc.id).getValue();
                    const spaceResult = await this.findById(spaceId);
                    if (spaceResult.isSuccess) {
                        spaces.push(spaceResult.getValue());
                    }
                }
                if (spaces.length >= maxResults)
                    break;
            }
            return domain_1.Result.ok(spaces);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to search spaces: ${error}`);
        }
    }
    subscribeToSpace(spaceId, callback) {
        const docRef = (0, firestore_1.doc)(firebase_1.db, this.spacesCollection, spaceId.id);
        return (0, firestore_1.onSnapshot)(docRef, async (doc) => {
            if (doc.exists()) {
                const spaceResult = await this.findById(spaceId);
                callback(spaceResult.isSuccess ? spaceResult.getValue() : null);
            }
            else {
                callback(null);
            }
        });
    }
    async findRecommended(campusId, interests, major, limitCount = 10) {
        try {
            // Build query based on interests and major
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('visibility', '==', 'public'), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(limitCount));
            return this.executeSpacesQuery(q);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to find recommended spaces: ${error}`);
        }
    }
    subscribeToTrendingSpaces(campusId, callback) {
        const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.spacesCollection), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('memberCount', '>', 1), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(10));
        return (0, firestore_1.onSnapshot)(q, async (snapshot) => {
            const spaces = [];
            for (const doc of snapshot.docs) {
                const spaceId = domain_1.SpaceId.create(doc.id).getValue();
                const spaceResult = await this.findById(spaceId);
                if (spaceResult.isSuccess) {
                    spaces.push(spaceResult.getValue());
                }
            }
            callback(spaces);
        });
    }
    // Helper methods
    async executeSpacesQuery(q) {
        try {
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            for (const doc of querySnapshot.docs) {
                const spaceId = domain_1.SpaceId.create(doc.id).getValue();
                const spaceResult = await this.findById(spaceId);
                if (spaceResult.isSuccess) {
                    spaces.push(spaceResult.getValue());
                }
            }
            return domain_1.Result.ok(spaces);
        }
        catch (error) {
            return domain_1.Result.fail(`Query execution failed: ${error}`);
        }
    }
    async getSpaceMembers(spaceId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.membersCollection), (0, firestore_1.where)('spaceId', '==', spaceId.id), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'));
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const members = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    profileId: domain_1.ProfileId.create(data.profileId).getValue(),
                    role: data.role,
                    joinedAt: data.joinedAt.toDate()
                };
            });
            return domain_1.Result.ok(members);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get space members: ${error}`);
        }
    }
    async getSpacePosts(spaceId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.postsCollection), (0, firestore_1.where)('spaceId', '==', spaceId.id), (0, firestore_1.where)('campusId', '==', 'ub-buffalo'), (0, firestore_1.orderBy)('createdAt', 'desc'), (0, firestore_1.limit)(50) // Reasonable default for space posts
            );
            const querySnapshot = await (0, firestore_1.getDocs)(q);
            const posts = querySnapshot.docs.map(doc => {
                const data = doc.data();
                // Reconstruct Post from Firestore data
                const postData = {
                    id: domain_1.PostId.create(data.id).getValue(),
                    content: data.content,
                    authorId: data.authorId ? domain_1.ProfileId.create(data.authorId).getValue() : null,
                    sourceUrl: data.sourceUrl,
                    isRSSPost: data.isRSSPost,
                    commentIds: data.commentIds.map(id => id), // Simplified for now
                    createdAt: data.createdAt.toDate(),
                    updatedAt: data.updatedAt.toDate()
                };
                return {
                    id: domain_1.PostId.create(data.id).getValue(),
                    content: { content: data.content },
                    authorId: data.authorId ? domain_1.ProfileId.create(data.authorId).getValue() : domain_1.ProfileId.create('unknown').getValue(),
                    spaceId: spaceId,
                    createdAt: data.createdAt.toDate(),
                    updatedAt: data.updatedAt.toDate(),
                    reactions: {},
                    commentCount: data.commentIds?.length || 0,
                    isFromRSS: data.isRSSPost || false,
                    rssSourceUrl: data.sourceUrl
                };
            });
            return domain_1.Result.ok(posts);
        }
        catch (error) {
            return domain_1.Result.fail(`Failed to get space posts: ${error}`);
        }
    }
    domainToFirestore(space) {
        const data = space.toData();
        return {
            id: data.id.id,
            name: data.name.name,
            description: data.description.description,
            spaceType: data.spaceType ?? data.type.type,
            visibility: data.visibility ?? 'public',
            createdBy: data.createdBy?.id ?? data.creator.id,
            memberIds: data.members.map(m => m.profileId.id),
            memberCount: data.members.length,
            postCount: data.posts.length,
            lastActivityAt: firestore_1.Timestamp.fromDate(data.lastActivityAt ?? data.updatedAt),
            rssUrl: data.rssUrl ?? null,
            rssLastFetch: data.rssLastFetch ? firestore_1.Timestamp.fromDate(data.rssLastFetch) : null,
            settings: {
                allowInvites: data.settings.allowInvites ?? false,
                requireApproval: data.settings.requireApproval ?? false,
                allowRSS: data.settings.allowRSS ?? false,
            },
            campusId: 'ub-buffalo', // Hard-coded for v1
            createdAt: firestore_1.Timestamp.fromDate(data.createdAt),
            updatedAt: firestore_1.Timestamp.fromDate(data.updatedAt),
        };
    }
    firestoreToDisplay(data, members, posts) {
        const spaceData = {
            id: domain_1.SpaceId.create(data.id).getValue(),
            name: domain_1.SpaceName.create(data.name).getValue(),
            description: domain_1.SpaceDescription.create(data.description).getValue(),
            type: { type: data.spaceType },
            spaceType: data.spaceType,
            visibility: data.visibility,
            creator: domain_1.ProfileId.create(data.createdBy).getValue(),
            createdBy: domain_1.ProfileId.create(data.createdBy).getValue(),
            members,
            posts,
            lastActivityAt: data.lastActivityAt.toDate(),
            rssUrl: data.rssUrl,
            rssLastFetch: data.rssLastFetch?.toDate(),
            settings: {
                isPrivate: data.visibility === 'private',
                allowMemberPosts: true,
                requireApproval: data.settings.requireApproval ?? false,
                rssFeedEnabled: data.settings.allowRSS ?? false,
                allowInvites: data.settings.allowInvites ?? false,
                allowRSS: data.settings.allowRSS ?? false,
            },
            campusId: data.campusId || 'ub-buffalo',
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        };
        return domain_1.Space.fromData(spaceData);
    }
}
exports.FirebaseSpaceRepository = FirebaseSpaceRepository;
//# sourceMappingURL=space.repository.js.map