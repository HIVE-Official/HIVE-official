"use strict";
/**
 * Firebase Tool Repository Implementation
 * Handles tool (HiveLab) persistence with Firebase
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseToolRepository = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("@hive/firebase");
const Result_1 = require("../../../domain/shared/base/Result");
const tool_aggregate_1 = require("../../../domain/tools/aggregates/tool.aggregate");
const tool_id_value_1 = require("../../../domain/tools/value-objects/tool-id.value");
const profile_id_value_1 = require("../../../domain/profile/value-objects/profile-id.value");
const space_id_value_1 = require("../../../domain/spaces/value-objects/space-id.value");
class FirebaseToolRepository {
    constructor() {
        this.collectionName = 'tools';
    }
    async findById(id) {
        try {
            const toolId = typeof id === 'string' ? id : id.value;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, toolId);
            const docSnap = await (0, firestore_1.getDoc)(docRef);
            if (!docSnap.exists()) {
                return Result_1.Result.fail('Tool not found');
            }
            const data = docSnap.data();
            return this.toDomain(toolId, data);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find tool: ${error}`);
        }
    }
    async findByCreator(profileId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('createdBy', '==', profileId), (0, firestore_1.orderBy)('updatedAt', 'desc'), (0, firestore_1.limit)(100));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    tools.push(result.getValue());
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find tools by creator: ${error}`);
        }
    }
    async findBySpace(spaceId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('spaceId', '==', spaceId), (0, firestore_1.where)('status', 'in', ['published', 'draft']), (0, firestore_1.orderBy)('updatedAt', 'desc'));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    tools.push(result.getValue());
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find tools by space: ${error}`);
        }
    }
    async findByStatus(status, campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('status', '==', status), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.orderBy)('updatedAt', 'desc'), (0, firestore_1.limit)(50));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    tools.push(result.getValue());
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find tools by status: ${error}`);
        }
    }
    async findByVisibility(visibility, campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('visibility', '==', visibility), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('status', '==', 'published'), (0, firestore_1.orderBy)('analytics.uses', 'desc'), (0, firestore_1.limit)(50));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    tools.push(result.getValue());
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find tools by visibility: ${error}`);
        }
    }
    async findPublished(campusId, limitCount = 20) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('status', '==', 'published'), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('visibility', 'in', ['campus', 'public']), (0, firestore_1.orderBy)('publishedAt', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    tools.push(result.getValue());
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find published tools: ${error}`);
        }
    }
    async findDeployedToSpace(spaceId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('deployedTo', 'array-contains', spaceId), (0, firestore_1.where)('status', '==', 'published'), (0, firestore_1.orderBy)('analytics.uses', 'desc'));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    tools.push(result.getValue());
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find deployed tools: ${error}`);
        }
    }
    async findTrending(campusId, limitCount = 10) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('status', '==', 'published'), (0, firestore_1.orderBy)('analytics.uses', 'desc'), (0, firestore_1.limit)(limitCount));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    tools.push(result.getValue());
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find trending tools: ${error}`);
        }
    }
    async findForkableTools(campusId) {
        try {
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('status', '==', 'published'), (0, firestore_1.where)('permissions.canFork', '==', true), (0, firestore_1.orderBy)('analytics.forks', 'desc'), (0, firestore_1.limit)(30));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            for (const doc of snapshot.docs) {
                const result = await this.toDomain(doc.id, doc.data());
                if (result.isSuccess) {
                    tools.push(result.getValue());
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to find forkable tools: ${error}`);
        }
    }
    async searchTools(searchQuery, campusId) {
        try {
            // Firebase doesn't support full-text search natively
            // For MVP, we'll do a simple name/description-based search
            // In production, use Algolia or Elasticsearch
            const q = (0, firestore_1.query)((0, firestore_1.collection)(firebase_1.db, this.collectionName), (0, firestore_1.where)('campusId', '==', campusId), (0, firestore_1.where)('status', '==', 'published'), (0, firestore_1.orderBy)('name'), (0, firestore_1.limit)(50));
            const snapshot = await (0, firestore_1.getDocs)(q);
            const tools = [];
            const searchLower = searchQuery.toLowerCase();
            for (const doc of snapshot.docs) {
                const data = doc.data();
                const nameLower = data.name?.toLowerCase() || '';
                const descriptionLower = data.description?.toLowerCase() || '';
                if (nameLower.includes(searchLower) || descriptionLower.includes(searchLower)) {
                    const result = await this.toDomain(doc.id, data);
                    if (result.isSuccess) {
                        tools.push(result.getValue());
                    }
                }
            }
            return Result_1.Result.ok(tools);
        }
        catch (error) {
            return Result_1.Result.fail(`Tool search failed: ${error}`);
        }
    }
    async recordUse(toolId) {
        try {
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, toolId);
            await (0, firestore_1.updateDoc)(docRef, {
                'analytics.uses': (0, firestore_1.increment)(1),
                updatedAt: firestore_1.Timestamp.now()
            });
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to record tool use: ${error}`);
        }
    }
    async save(tool) {
        try {
            const data = this.toPersistence(tool);
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, tool.toolId.value);
            if (tool.createdAt) {
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
            return Result_1.Result.fail(`Failed to save tool: ${error}`);
        }
    }
    async delete(id) {
        try {
            const toolId = typeof id === 'string' ? id : id.value;
            const docRef = (0, firestore_1.doc)(firebase_1.db, this.collectionName, toolId);
            await (0, firestore_1.deleteDoc)(docRef);
            return Result_1.Result.ok();
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to delete tool: ${error}`);
        }
    }
    // Helper methods for domain mapping
    async toDomain(id, data) {
        try {
            // Create ToolId
            const toolIdResult = tool_id_value_1.ToolId.create(id);
            if (toolIdResult.isFailure) {
                return Result_1.Result.fail(toolIdResult.error);
            }
            // Create ProfileId for creator
            const creatorIdResult = profile_id_value_1.ProfileId.create(data.createdBy);
            if (creatorIdResult.isFailure) {
                return Result_1.Result.fail(creatorIdResult.error);
            }
            // Create SpaceId if exists
            let spaceId;
            if (data.spaceId) {
                const spaceIdResult = space_id_value_1.SpaceId.create(data.spaceId);
                if (spaceIdResult.isSuccess) {
                    spaceId = spaceIdResult.getValue();
                }
            }
            // Create forkedFrom ToolId if exists
            let forkedFrom;
            if (data.forkedFrom) {
                const forkedFromResult = tool_id_value_1.ToolId.create(data.forkedFrom);
                if (forkedFromResult.isSuccess) {
                    forkedFrom = forkedFromResult.getValue();
                }
            }
            // Convert deployedTo to SpaceId array
            const deployedTo = [];
            if (data.deployedTo && Array.isArray(data.deployedTo)) {
                for (const spaceIdStr of data.deployedTo) {
                    const spaceIdResult = space_id_value_1.SpaceId.create(spaceIdStr);
                    if (spaceIdResult.isSuccess) {
                        deployedTo.push(spaceIdResult.getValue());
                    }
                }
            }
            // Convert canEdit to ProfileId array
            const canEdit = [];
            if (data.permissions?.canEdit && Array.isArray(data.permissions.canEdit)) {
                for (const profileIdStr of data.permissions.canEdit) {
                    const profileIdResult = profile_id_value_1.ProfileId.create(profileIdStr);
                    if (profileIdResult.isSuccess) {
                        canEdit.push(profileIdResult.getValue());
                    }
                }
            }
            // Create tool
            const toolResult = tool_aggregate_1.Tool.create({
                toolId: toolIdResult.getValue(),
                name: data.name,
                description: data.description,
                icon: data.icon,
                createdBy: creatorIdResult.getValue(),
                spaceId,
                forkedFrom,
                elements: data.elements || [],
                version: data.version || '1.0.0',
                status: data.status || 'draft',
                visibility: data.visibility || 'private',
                permissions: {
                    canFork: data.permissions?.canFork || false,
                    canEdit,
                    requiresApproval: data.permissions?.requiresApproval || false
                }
            });
            if (toolResult.isFailure) {
                return Result_1.Result.fail(toolResult.error);
            }
            const tool = toolResult.getValue();
            // Set additional properties using setters
            if (deployedTo.length > 0) {
                tool.setDeployedTo(deployedTo);
            }
            if (data.analytics) {
                tool.setAnalytics(data.analytics);
            }
            if (data.createdAt) {
                tool.setCreatedAt(data.createdAt.toDate());
            }
            if (data.updatedAt) {
                tool.setUpdatedAt(data.updatedAt.toDate());
            }
            if (data.publishedAt) {
                tool.setPublishedAt(data.publishedAt.toDate());
            }
            return Result_1.Result.ok(tool);
        }
        catch (error) {
            return Result_1.Result.fail(`Failed to map tool to domain: ${error}`);
        }
    }
    toPersistence(tool) {
        return {
            name: tool.name,
            description: tool.description,
            icon: tool.icon || null,
            createdBy: tool.createdBy.value,
            spaceId: tool.spaceId?.value || null,
            forkedFrom: tool.forkedFrom?.value || null,
            campusId: 'ub-buffalo', // Campus isolation (from spaceId or profile in production)
            elements: tool.elements,
            version: tool.version,
            status: tool.status,
            visibility: tool.visibility,
            deployedTo: tool.deployedTo.map(s => s.value),
            analytics: tool.analytics,
            permissions: {
                canFork: tool.permissions.canFork,
                canEdit: tool.permissions.canEdit.map(p => p.value),
                requiresApproval: tool.permissions.requiresApproval
            },
            publishedAt: tool.publishedAt ? firestore_1.Timestamp.fromDate(tool.publishedAt) : null
        };
    }
}
exports.FirebaseToolRepository = FirebaseToolRepository;
//# sourceMappingURL=tool.repository.js.map