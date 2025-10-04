"use strict";
/**
 * Firebase Space Repository Implementation
 * Handles space persistence with Firebase
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseSpaceRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@hive/firebase");
const Result_1 = require("../../../domain/shared/base/Result");
const space_aggregate_1 = require("../../../domain/spaces/aggregates/space.aggregate");
const space_id_value_1 = require("../../../domain/spaces/value-objects/space-id.value");
const space_name_value_1 = require("../../../domain/spaces/value-objects/space-name.value");
const space_description_value_1 = require("../../../domain/spaces/value-objects/space-description.value");
const space_category_value_1 = require("../../../domain/spaces/value-objects/space-category.value");
const campus_id_value_1 = require("../../../domain/profile/value-objects/campus-id.value");
const profile_id_value_1 = require("../../../domain/profile/value-objects/profile-id.value");
const tab_1 = require("../../../domain/spaces/entities/tab");
const widget_1 = require("../../../domain/spaces/entities/widget");
class FirebaseSpaceRepository {
    constructor() {
        this.collectionName = 'spaces';
    }
    async findById(id) {
        try {
            const spaceId = typeof id === 'string' ? id : id.id;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, spaceId);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return Result_1.Result.fail('Space not found');
            }
            const data = docSnap.data();
            return this.toDomain(spaceId, data);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find space: ${error}`);
        }
    }
    async findByName(name, campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('name', '==', name), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.limit)(1));
            const snapshot = await (0, firestore_1.getDocs)(q);
            if (snapshot.empty) {
                return Result_1.Result.fail('Space not found');
            }
            const doc = snapshot.docs[0];
            return this.toDomain(doc.id, doc.data());
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find space: ${error}`);
        }
    }
    async findByCampus(campusId, limitCount = 50) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    spaces.push(result.getValue());
                }
            }
            return Result_1.Result.ok(spaces);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find spaces: ${error}`);
        }
    }
    async findByCategory(category, campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('category', '==', category), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(50));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    spaces.push(result.getValue());
                }
            }
            return Result_1.Result.ok(spaces);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find spaces: ${error}`);
        }
    }
    async findUserSpaces(userId) {
        try {
            // Query spaces where user is a member
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('memberIds', 'array-contains', userId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('lastActivityAt', 'desc'), (0, firestore_1.limit)(100));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    spaces.push(result.getValue());
                }
            }
            return Result_1.Result.ok(spaces);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find user spaces: ${error}`);
        }
    }
    async findTrending(campusId, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.where)('trendingScore', '>', 0), (0, firestore_1.orderBy)('trendingScore', 'desc'), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    spaces.push(result.getValue());
                }
            }
            return Result_1.Result.ok(spaces);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find trending spaces: ${error}`);
        }
    }
    async findRecommended(campusId, interests, major) {
        try {
            // For MVP, recommend based on member count and category
            // In production, this would use a recommendation engine
            const spaces = [];
            // Get popular spaces
            const popularQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(10));
            const popularSnapshot = await (0, firestore_1.getDocs)(popularQuery);
            for (const doc of popularSnapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    spaces.push(result.getValue());
                }
            }
            // Get spaces matching major if provided
            if (major) {
                const majorQuery = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('tags', 'array-contains', major.toLowerCase()), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.limit)(5));
                const majorSnapshot = await (0, firestore_1.getDocs)(majorQuery);
                for (const doc of majorSnapshot.docs) {
                    const result = await this.toDomain(doc.id, doc.data());
                    if (result.isSuccess && !spaces.find(s => s.spaceId.value === doc.id)) {
                        spaces.push(result.getValue());
                    }
                }
            }
            return Result_1.Result.ok(spaces);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find recommended spaces: ${error}`);
        }
    }
    async searchSpaces(searchQuery, campusId) {
        try {
            // Firebase doesn't support full-text search natively
            // For MVP, we'll do a simple name-based search
            // In production, use Algolia or Elasticsearch
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('name'), (0, firestore_1.limit)(50));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            const searchLower = searchQuery.toLowerCase();
            for (const doc of snapshot.docs) {
                const data = doc.data();
                const nameLower = data.name?.toLowerCase() || '';
                const descriptionLower = data.description?.toLowerCase() || '';
                if (nameLower.includes(searchLower) || descriptionLower.includes(searchLower)) {
                    const result = await this.toDomain(doc.id, data);
                    if (result.isSuccess) {
                        spaces.push(result.getValue());
                    }
                }
            }
            return Result_1.Result.ok(spaces);
        }
        catch (error) {
            return Result_1.Result.fail(`Search failed: ${error}`);
        }
    }
    async save(space) {
        try {
            const data = this.toPersistence(space);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, space.spaceId.value);
            if (space.createdAt) {
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
            return Result_1.Result.fail(`Failed to save space: ${error}`);
        }
    }
    async delete(id) {
        try {
            const spaceId = typeof id === 'string' ? id : id.id;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, spaceId);
            await (0, firestore_1.deleteDoc)(docRef);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to delete space: ${error}`);
        }
    }
    // Helper methods for domain mapping
    async toDomain(id, data) {
        try {
            // Create value objects
            const nameResult = space_name_value_1.SpaceName.create(data.name);
            if (nameResult.isFailure) {
                return Result_1.Result.fail(nameResult.error);
            }
            const descriptionResult = space_description_value_1.SpaceDescription.create(data.description);
            if (descriptionResult.isFailure) {
                return Result_1.Result.fail(descriptionResult.error);
            }
            const categoryResult = space_category_value_1.SpaceCategory.create(data.category);
            if (categoryResult.isFailure) {
                return Result_1.Result.fail(categoryResult.error);
            }
            const campusIdResult = campus_id_value_1.CampusId.create(data.campusId);
            if (campusIdResult.isFailure) {
                return Result_1.Result.fail(campusIdResult.error);
            }
            // Create ProfileId for creator
            const creatorId = profile_id_value_1.ProfileId.create(data.creatorId);
            if (creatorId.isFailure) {
                return Result_1.Result.fail(creatorId.error);
            }
            // Create SpaceId
            const spaceId = space_id_value_1.SpaceId.create(id);
            if (spaceId.isFailure) {
                return Result_1.Result.fail(spaceId.error);
            }
            // Create space
            const spaceResult = space_aggregate_1.Space.create({
                spaceId: spaceId.getValue(),
                name: nameResult.getValue(),
                description: descriptionResult.getValue(),
                category: categoryResult.getValue(),
                createdBy: creatorId.getValue(),
                campusId: campusIdResult.getValue(),
                visibility: data.visibility === 'private' ? 'private' : 'public'
            });
            if (spaceResult.isFailure) {
                return Result_1.Result.fail(spaceResult.error);
            }
            const space = spaceResult.getValue();
            // Set additional properties using setters
            space.setIsVerified(data.isVerified || false);
            space.setMemberCount(data.memberCount || 0);
            space.setPostCount(data.postCount || 0);
            space.setTrendingScore(data.trendingScore || 0);
            space.setLastActivityAt(data.lastActivityAt?.toDate() || new Date());
            if (data.createdAt)
                space.setCreatedAt(data.createdAt.toDate());
            if (data.updatedAt)
                space.setUpdatedAt(data.updatedAt.toDate());
            // Load tabs
            if (data.tabs && Array.isArray(data.tabs)) {
                const tabs = data.tabs.map((tabData) => {
                    const tab = tab_1.Tab.create({
                        name: tabData.title || tabData.name,
                        type: tabData.type || 'feed',
                        isDefault: tabData.isDefault || false,
                        order: tabData.order || 0,
                        widgets: tabData.widgets || [],
                        isVisible: tabData.isVisible !== false,
                        title: tabData.title || tabData.name,
                        originPostId: tabData.originPostId,
                        messageCount: tabData.messageCount || 0,
                        createdAt: tabData.createdAt?.toDate() || new Date(),
                        lastActivityAt: tabData.lastActivityAt?.toDate(),
                        expiresAt: tabData.expiresAt?.toDate(),
                        isArchived: tabData.isArchived || false
                    }, tabData.id);
                    return tab.isSuccess ? tab.getValue() : null;
                }).filter(Boolean);
                space.setTabs(tabs);
            }
            // Load widgets
            if (data.widgets && Array.isArray(data.widgets)) {
                const widgets = data.widgets.map((widgetData) => {
                    const widget = widget_1.Widget.create(widgetData.type, widgetData.config);
                    return widget.isSuccess ? widget.getValue() : null;
                }).filter(Boolean);
                space.setWidgets(widgets);
            }
            return Result_1.Result.ok(space);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to map to domain: ${error}`);
        }
    }
    toPersistence(space) {
        return {
            name: space.name.name,
            description: space.description.value,
            category: space.category.value,
            campusId: space.campusId.id,
            creatorId: space.spaceId.value, // Use spaceId since creatorId doesn't exist
            visibility: space.isPublic ? 'public' : 'private',
            isVerified: space.isVerified,
            memberCount: space.memberCount,
            postCount: space.postCount,
            trendingScore: space.trendingScore,
            lastActivityAt: space.lastActivityAt ? firestore_1.Timestamp.fromDate(space.lastActivityAt) : null,
            isActive: true,
            memberIds: space.members.map(m => m.profileId.value),
            tabs: space.tabs.map(tab => ({
                id: tab.id,
                title: tab.title,
                name: tab.name,
                type: tab.type,
                originPostId: tab.originPostId || null,
                messageCount: tab.messageCount,
                createdAt: tab.createdAt,
                lastActivityAt: tab.lastActivityAt,
                expiresAt: tab.expiresAt,
                isArchived: tab.isArchived,
                isDefault: tab.isDefault,
                order: tab.order,
                widgets: tab.widgets,
                isVisible: tab.isVisible
            })),
            widgets: space.widgets.map(widget => ({
                id: widget.id,
                type: widget.type,
                config: widget.config,
                position: widget.position,
                isEnabled: widget.isEnabled
            })),
            tags: [], // Would be extracted from description/name
            rushModeEnabled: space.rushMode?.isActive || false,
            rushModeEndDate: space.rushMode?.endDate
        };
    }
    // Additional methods required by interface
    async findByType(type, campusId) {
        try {
            // Type could be a sub-category or feature type
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('type', '==', type), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(50));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    spaces.push(result.getValue());
                }
            }
            return Result_1.Result.ok(spaces);
        }
        catch (error) {
            // If 'type' field doesn't exist, fallback to category
            return this.findByCategory(type, campusId);
        }
    }
    async findByMember(userId) {
        // This is the same as findUserSpaces, just delegate
        return this.findUserSpaces(userId);
    }
    async findPublicSpaces(campusId, limit = 100) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('visibility', '==', 'public'), (0, firestore_1.where)('isActive', '==', true), (0, firestore_1.orderBy)('memberCount', 'desc'), (0, firestore_1.limit)(limit));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const spaces = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    spaces.push(result.getValue());
                }
            }
            return Result_1.Result.ok(spaces);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find public spaces: ${error}`);
        }
    }
}
exports.FirebaseSpaceRepository = FirebaseSpaceRepository;
//# sourceMappingURL=space.repository.js.map