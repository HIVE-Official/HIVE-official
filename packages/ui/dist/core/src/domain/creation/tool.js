import { z } from 'zod';
import { ElementInstanceSchema } from './element';
// Tool status for Draft → Preview → Publish workflow
export const ToolStatus = z.enum(['draft', 'preview', 'published']);
// Tool sharing permissions
export const ToolPermission = z.enum(['view', 'comment', 'edit']);
// Tool collaborator with role-based permissions
export const ToolCollaboratorSchema = z.object({
    userId: z.string(),
    permission: ToolPermission,
    addedAt: z.date(),
    addedBy: z.string(),
});
// Tool metadata for analytics and discovery
export const ToolMetadataSchema = z.object({
    tags: z.array(z.string()).max(10).optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
    estimatedTime: z.number().min(1).max(300).optional(), // minutes
    category: z.string().max(50).optional(),
    language: z.string().length(2).default('en'), // ISO 639-1
});
// Tool data schema configuration
export const ToolDataSchemaSchema = z.object({
    fields: z.array(z.object({
        name: z.string().max(50),
        type: z.enum(['string', 'number', 'boolean', 'date', 'array', 'object']),
        required: z.boolean().default(false),
        validation: z.object({
            min: z.number().optional(),
            max: z.number().optional(),
            pattern: z.string().optional(),
            enum: z.array(z.string()).optional(),
        }).optional(),
    })),
    maxRecords: z.number().min(1).max(1000).default(100),
    allowAnonymous: z.boolean().default(false),
});
// Tool configuration and settings
export const ToolConfigSchema = z.object({
    // Appearance
    theme: z.enum(['light', 'dark', 'auto']).default('auto'),
    primaryColor: z.string().default('#3b82f6'),
    backgroundColor: z.string().default('#ffffff'),
    // Behavior
    allowMultipleSubmissions: z.boolean().default(false),
    requireAuthentication: z.boolean().default(true),
    showProgressBar: z.boolean().default(false),
    autoSave: z.boolean().default(true),
    enableRealTimeUpdates: z.boolean().default(false),
    // Additional UI/UX settings
    maxResponseLength: z.number().min(1).max(10000).default(1000),
    customCSS: z.string().default(''),
    headerText: z.string().default(''),
    footerText: z.string().default(''),
    // Data handling
    dataSchema: ToolDataSchemaSchema.optional(),
    dataRetentionDays: z.number().min(1).max(365).default(90),
    // Notifications
    notifyOnSubmission: z.boolean().default(false),
    notificationEmail: z.string().email().optional(),
    // Analytics
    trackingEnabled: z.boolean().default(true),
    allowAnalyticsOptOut: z.boolean().default(true),
});
// Tool version for immutable versioning
export const ToolVersionSchema = z.object({
    version: z.string().regex(/^\d+\.\d+\.\d+$/, 'Version must follow semver format (e.g., 1.0.0)'),
    changelog: z.string().max(1000).optional(),
    createdAt: z.date(),
    createdBy: z.string(),
    isStable: z.boolean().default(false),
    deprecatedAt: z.date().optional(),
});
// Main Tool schema
export const ToolSchema = z.object({
    id: z.string(),
    name: z.string().min(1).max(100),
    description: z.string().max(500),
    // Ownership and collaboration
    ownerId: z.string(),
    collaborators: z.array(ToolCollaboratorSchema).default([]),
    // Status and versioning
    status: ToolStatus.default('draft'),
    currentVersion: z.string().regex(/^\d+\.\d+\.\d+$/).default('1.0.0'),
    versions: z.array(ToolVersionSchema).default([]),
    // Tool structure
    elements: z.array(ElementInstanceSchema).max(50), // ELEMENT_LIMITS.MAX_ELEMENTS_PER_TOOL
    config: ToolConfigSchema.default({}),
    metadata: ToolMetadataSchema.default({}),
    // Sharing and distribution
    isPublic: z.boolean().default(false),
    shareToken: z.string().optional(), // For share-by-link
    forkCount: z.number().min(0).default(0),
    originalToolId: z.string().optional(), // If this is a fork
    // Analytics and usage
    viewCount: z.number().min(0).default(0),
    useCount: z.number().min(0).default(0),
    rating: z.number().min(0).max(5).optional(),
    ratingCount: z.number().min(0).default(0),
    // Space integration
    spaceId: z.string().optional(), // If tool belongs to a specific space
    isSpaceTool: z.boolean().default(false),
    // Timestamps
    createdAt: z.date(),
    updatedAt: z.date(),
    publishedAt: z.date().optional(),
    lastUsedAt: z.date().optional(),
});
// Tool creation schema (for API)
export const CreateToolSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(500),
    spaceId: z.string().optional(),
    isSpaceTool: z.boolean().default(false),
    config: ToolConfigSchema.partial().optional(),
    metadata: ToolMetadataSchema.partial().optional(),
});
// Tool update schema (for API)
export const UpdateToolSchema = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().max(500).optional(),
    elements: z.array(ElementInstanceSchema).max(50).optional(),
    config: ToolConfigSchema.partial().optional(),
    metadata: ToolMetadataSchema.partial().optional(),
    changelog: z.string().max(1000).optional(),
});
// Tool sharing schema
export const ShareToolSchema = z.object({
    permission: ToolPermission.default('view'),
    expiresAt: z.date().optional(),
    requiresApproval: z.boolean().default(false),
});
// Tool data record (stored in tools/{id}/records subcollection)
export const ToolDataRecordSchema = z.object({
    id: z.string(),
    toolId: z.string(),
    data: z.record(z.any()), // Validated against tool's dataSchema
    submittedBy: z.string().optional(), // userId if authenticated
    submittedAt: z.date(),
    ipAddress: z.string().optional(), // For anonymous submissions
    userAgent: z.string().optional(),
    sessionId: z.string().optional(),
    // Metadata
    isAnonymous: z.boolean().default(false),
    isValid: z.boolean().default(true),
    validationErrors: z.array(z.string()).optional(),
    // Analytics
    completionTime: z.number().optional(), // milliseconds
    deviceType: z.enum(['desktop', 'tablet', 'mobile']).optional(),
    referrer: z.string().optional(),
});
// Tool usage events for analytics
export const ToolUsageEventSchema = z.object({
    id: z.string(),
    toolId: z.string(),
    userId: z.string().optional(),
    eventType: z.enum(['view', 'start', 'complete', 'abandon', 'share', 'fork']),
    timestamp: z.date(),
    sessionId: z.string(),
    metadata: z.record(z.any()).optional(),
});
// Utility functions
export const createToolDefaults = (ownerId, data) => ({
    name: data.name,
    description: data.description,
    ownerId,
    collaborators: [],
    status: 'draft',
    currentVersion: '1.0.0',
    versions: [],
    elements: [],
    config: { ...ToolConfigSchema.parse({}), ...data.config },
    metadata: { ...ToolMetadataSchema.parse({}), ...data.metadata },
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
export const generateShareToken = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
export const canUserEditTool = (tool, userId) => {
    if (tool.ownerId === userId)
        return true;
    return tool.collaborators.some(collab => collab.userId === userId && collab.permission === 'edit');
};
export const canUserViewTool = (tool, userId) => {
    if (tool.isPublic)
        return true;
    if (tool.ownerId === userId)
        return true;
    return tool.collaborators.some(collab => collab.userId === userId);
};
export const getNextVersion = (currentVersion, changeType) => {
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
export const determineChangeType = (oldElements, newElements) => {
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
export const validateToolStructure = (elements) => {
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
//# sourceMappingURL=tool.js.map