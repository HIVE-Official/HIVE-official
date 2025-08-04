"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToolStructure = exports.determineChangeType = exports.getNextVersion = exports.canUserViewTool = exports.canUserEditTool = exports.generateShareToken = exports.createToolDefaults = exports.ToolUsageEventSchema = exports.ToolDataRecordSchema = exports.ShareToolSchema = exports.UpdateToolSchema = exports.CreateToolSchema = exports.ToolSchema = exports.ToolVersionSchema = exports.ToolConfigSchema = exports.ToolDataSchemaSchema = exports.ToolMetadataSchema = exports.ToolCollaboratorSchema = exports.ToolPermission = exports.ToolStatus = void 0;
const zod_1 = require("zod");
const element_1 = require("./element");
// Tool status for Draft → Preview → Publish workflow
exports.ToolStatus = zod_1.z.enum(['draft', 'preview', 'published']);
// Tool sharing permissions
exports.ToolPermission = zod_1.z.enum(['view', 'comment', 'edit']);
// Tool collaborator with role-based permissions
exports.ToolCollaboratorSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    permission: exports.ToolPermission,
    addedAt: zod_1.z.date(),
    addedBy: zod_1.z.string(),
});
// Tool metadata for analytics and discovery
exports.ToolMetadataSchema = zod_1.z.object({
    tags: zod_1.z.array(zod_1.z.string()).max(10).optional(),
    difficulty: zod_1.z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    estimatedTime: zod_1.z.number().min(1).max(300).optional(), // minutes
    category: zod_1.z.string().max(50).optional(),
    language: zod_1.z.string().length(2).default('en'), // ISO 639-1
});
// Tool data schema configuration
exports.ToolDataSchemaSchema = zod_1.z.object({
    fields: zod_1.z.array(zod_1.z.object({
        name: zod_1.z.string().max(50),
        type: zod_1.z.enum(['string', 'number', 'boolean', 'date', 'array', 'object']),
        required: zod_1.z.boolean().default(false),
        validation: zod_1.z.object({
            min: zod_1.z.number().optional(),
            max: zod_1.z.number().optional(),
            pattern: zod_1.z.string().optional(),
            enum: zod_1.z.array(zod_1.z.string()).optional(),
        }).optional(),
    })),
    maxRecords: zod_1.z.number().min(1).max(1000).default(100),
    allowAnonymous: zod_1.z.boolean().default(false),
});
// Tool configuration and settings
exports.ToolConfigSchema = zod_1.z.object({
    // Appearance
    theme: zod_1.z.enum(['light', 'dark', 'auto']).default('auto'),
    primaryColor: zod_1.z.string().default('#3b82f6'),
    backgroundColor: zod_1.z.string().default('#ffffff'),
    // Behavior
    allowMultipleSubmissions: zod_1.z.boolean().default(false),
    requireAuthentication: zod_1.z.boolean().default(true),
    showProgressBar: zod_1.z.boolean().default(false),
    autoSave: zod_1.z.boolean().default(true),
    enableRealTimeUpdates: zod_1.z.boolean().default(false),
    // Additional UI/UX settings
    maxResponseLength: zod_1.z.number().min(1).max(10000).default(1000),
    customCSS: zod_1.z.string().default(''),
    headerText: zod_1.z.string().default(''),
    footerText: zod_1.z.string().default(''),
    // Data handling
    dataSchema: exports.ToolDataSchemaSchema.optional(),
    dataRetentionDays: zod_1.z.number().min(1).max(365).default(90),
    // Notifications
    notifyOnSubmission: zod_1.z.boolean().default(false),
    notificationEmail: zod_1.z.string().email().optional(),
    // Analytics
    trackingEnabled: zod_1.z.boolean().default(true),
    allowAnalyticsOptOut: zod_1.z.boolean().default(true),
});
// Tool version for immutable versioning
exports.ToolVersionSchema = zod_1.z.object({
    version: zod_1.z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must follow semver format (e.g., 1.0.0)'),
    changelog: zod_1.z.string().max(1000).optional(),
    createdAt: zod_1.z.date(),
    createdBy: zod_1.z.string(),
    isStable: zod_1.z.boolean().default(false),
    deprecatedAt: zod_1.z.date().optional(),
});
// Main Tool schema
exports.ToolSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().max(500),
    // Ownership and collaboration
    ownerId: zod_1.z.string(),
    collaborators: zod_1.z.array(exports.ToolCollaboratorSchema).default([]),
    // Status and versioning
    status: exports.ToolStatus.default('draft'),
    currentVersion: zod_1.z.string().regex(/^\d+\.\d+\.\d+$/).default('1.0.0'),
    versions: zod_1.z.array(exports.ToolVersionSchema).default([]),
    // Tool structure
    elements: zod_1.z.array(element_1.ElementInstanceSchema).max(50), // ELEMENT_LIMITS.MAX_ELEMENTS_PER_TOOL
    config: exports.ToolConfigSchema.default({}),
    metadata: exports.ToolMetadataSchema.default({}),
    // Sharing and distribution
    isPublic: zod_1.z.boolean().default(false),
    shareToken: zod_1.z.string().optional(), // For share-by-link
    forkCount: zod_1.z.number().min(0).default(0),
    originalToolId: zod_1.z.string().optional(), // If this is a fork
    // Analytics and usage
    viewCount: zod_1.z.number().min(0).default(0),
    useCount: zod_1.z.number().min(0).default(0),
    rating: zod_1.z.number().min(0).max(5).optional(),
    ratingCount: zod_1.z.number().min(0).default(0),
    // Space integration
    spaceId: zod_1.z.string().optional(), // If tool belongs to a specific space
    isSpaceTool: zod_1.z.boolean().default(false),
    // Timestamps
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    publishedAt: zod_1.z.date().optional(),
    lastUsedAt: zod_1.z.date().optional(),
});
// Tool creation schema (for API)
exports.CreateToolSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().max(500),
    spaceId: zod_1.z.string().optional(),
    isSpaceTool: zod_1.z.boolean().default(false),
    config: exports.ToolConfigSchema.partial().optional(),
    metadata: exports.ToolMetadataSchema.partial().optional(),
});
// Tool update schema (for API)
exports.UpdateToolSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().max(500).optional(),
    elements: zod_1.z.array(element_1.ElementInstanceSchema).max(50).optional(),
    config: exports.ToolConfigSchema.partial().optional(),
    metadata: exports.ToolMetadataSchema.partial().optional(),
    changelog: zod_1.z.string().max(1000).optional(),
});
// Tool sharing schema
exports.ShareToolSchema = zod_1.z.object({
    permission: exports.ToolPermission.default('view'),
    expiresAt: zod_1.z.date().optional(),
    requiresApproval: zod_1.z.boolean().default(false),
});
// Tool data record (stored in tools/{id}/records subcollection)
exports.ToolDataRecordSchema = zod_1.z.object({
    id: zod_1.z.string(),
    toolId: zod_1.z.string(),
    data: zod_1.z.record(zod_1.z.any()), // Validated against tool's dataSchema
    submittedBy: zod_1.z.string().optional(), // userId if authenticated
    submittedAt: zod_1.z.date(),
    ipAddress: zod_1.z.string().optional(), // For anonymous submissions
    userAgent: zod_1.z.string().optional(),
    sessionId: zod_1.z.string().optional(),
    // Metadata
    isAnonymous: zod_1.z.boolean().default(false),
    isValid: zod_1.z.boolean().default(true),
    validationErrors: zod_1.z.array(zod_1.z.string()).optional(),
    // Analytics
    completionTime: zod_1.z.number().optional(), // milliseconds
    deviceType: zod_1.z.enum(['desktop', 'tablet', 'mobile']).optional(),
    referrer: zod_1.z.string().optional(),
});
// Tool usage events for analytics
exports.ToolUsageEventSchema = zod_1.z.object({
    id: zod_1.z.string(),
    toolId: zod_1.z.string(),
    userId: zod_1.z.string().optional(),
    eventType: zod_1.z.enum(['view', 'start', 'complete', 'abandon', 'share', 'fork']),
    timestamp: zod_1.z.date(),
    sessionId: zod_1.z.string(),
    metadata: zod_1.z.record(zod_1.z.any()).optional(),
});
// Utility functions
const createToolDefaults = (ownerId, data) => ({
    name: data.name,
    description: data.description,
    ownerId,
    collaborators: [],
    status: 'draft',
    currentVersion: '1.0.0',
    versions: [],
    elements: [],
    config: { ...exports.ToolConfigSchema.parse({}), ...data.config },
    metadata: { ...exports.ToolMetadataSchema.parse({}), ...data.metadata },
    isPublic: false,
    forkCount: 0,
    viewCount: 0,
    useCount: 0,
    ratingCount: 0,
    spaceId: data.spaceId,
    isSpaceTool: data.isSpaceTool || false,
    publishedAt: undefined,
    lastUsedAt: undefined,
});
exports.createToolDefaults = createToolDefaults;
const generateShareToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
exports.generateShareToken = generateShareToken;
const canUserEditTool = (tool, userId) => {
    if (tool.ownerId === userId)
        return true;
    return tool.collaborators.some(collab => collab.userId === userId && collab.permission === 'edit');
};
exports.canUserEditTool = canUserEditTool;
const canUserViewTool = (tool, userId) => {
    if (tool.isPublic)
        return true;
    if (tool.ownerId === userId)
        return true;
    return tool.collaborators.some(collab => collab.userId === userId);
};
exports.canUserViewTool = canUserViewTool;
const getNextVersion = (currentVersion, changeType) => {
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    switch (changeType) {
        case 'major':
            return `${major + 1}.0.0`;
        case 'minor':
            return `${major}.${minor + 1}.0`;
        case 'patch':
            return `${major}.${minor}.${patch + 1}`;
        default:
            throw new Error(`Invalid change type: ${changeType}`);
    }
};
exports.getNextVersion = getNextVersion;
const determineChangeType = (oldElements, newElements) => {
    // Major: Breaking changes (removed elements, changed element types)
    const oldElementIds = new Set(oldElements.map(el => el.id));
    const newElementIds = new Set(newElements.map(el => el.id));
    // Check for removed elements
    for (const oldId of oldElementIds) {
        if (!newElementIds.has(oldId)) {
            return 'major'; // Removed element is breaking
        }
    }
    // Check for element type changes
    const oldElementMap = new Map(oldElements.map(el => [el.id, el]));
    const newElementMap = new Map(newElements.map(el => [el.id, el]));
    for (const [id, oldEl] of oldElementMap) {
        const newEl = newElementMap.get(id);
        if (newEl && oldEl.elementId !== newEl.elementId) {
            return 'major'; // Changed element type is breaking
        }
    }
    // Minor: New elements or significant config changes
    if (newElements.length > oldElements.length) {
        return 'minor'; // Added new elements
    }
    // Check for significant config changes
    for (const [id, oldEl] of oldElementMap) {
        const newEl = newElementMap.get(id);
        if (newEl) {
            const oldConfigStr = JSON.stringify(oldEl.config);
            const newConfigStr = JSON.stringify(newEl.config);
            if (oldConfigStr !== newConfigStr) {
                // For now, treat any config change as minor
                // In the future, we could analyze the specific changes
                return 'minor';
            }
        }
    }
    // Patch: Minor changes (position, visibility, etc.)
    return 'patch';
};
exports.determineChangeType = determineChangeType;
const validateToolStructure = (elements) => {
    const errors = [];
    // Check element count limit
    if (elements.length > 50) { // ELEMENT_LIMITS.MAX_ELEMENTS_PER_TOOL
        errors.push(`Tool cannot have more than 50 elements (found ${elements.length})`);
    }
    // Check nesting depth
    const checkNestingDepth = (elementId, depth = 0) => {
        if (depth > 3) { // ELEMENT_LIMITS.MAX_NESTING_DEPTH
            errors.push(`Element ${elementId} exceeds maximum nesting depth of 3`);
            return depth;
        }
        const children = elements.filter(el => el.parentId === elementId);
        let maxChildDepth = depth;
        for (const child of children) {
            const childDepth = checkNestingDepth(child.id, depth + 1);
            maxChildDepth = Math.max(maxChildDepth, childDepth);
        }
        return maxChildDepth;
    };
    // Check root elements (no parent)
    const rootElements = elements.filter(el => !el.parentId);
    for (const root of rootElements) {
        checkNestingDepth(root.id);
    }
    // Check for circular references
    const hasCircularReference = (elementId, visited = new Set()) => {
        if (visited.has(elementId)) {
            errors.push(`Circular reference detected involving element ${elementId}`);
            return true;
        }
        visited.add(elementId);
        const children = elements.filter(el => el.parentId === elementId);
        for (const child of children) {
            if (hasCircularReference(child.id, new Set(visited))) {
                return true;
            }
        }
        return false;
    };
    // Check each root element for circular references
    for (const root of rootElements) {
        hasCircularReference(root.id);
    }
    return {
        isValid: errors.length === 0,
        errors
    };
};
exports.validateToolStructure = validateToolStructure;
//# sourceMappingURL=tool.js.map