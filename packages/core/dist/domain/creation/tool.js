"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareToolSchema = exports.UpdateToolSchema = exports.CreateToolSchema = exports.ToolSchema = exports.ToolMetadataSchema = exports.ToolConfigSchema = exports.ToolVersionSchema = exports.ToolStatus = void 0;
exports.createToolDefaults = createToolDefaults;
exports.generateShareToken = generateShareToken;
exports.canUserEditTool = canUserEditTool;
exports.canUserViewTool = canUserViewTool;
exports.getNextVersion = getNextVersion;
exports.determineChangeType = determineChangeType;
exports.validateToolStructure = validateToolStructure;
const zod_1 = require("zod");
// Minimal, stable Tool primitives to satisfy typechecking and light usage.
exports.ToolStatus = zod_1.z.enum(['draft', 'published', 'archived']);
exports.ToolVersionSchema = zod_1.z.string().default('0.1.0');
exports.ToolConfigSchema = zod_1.z.any();
exports.ToolMetadataSchema = zod_1.z.record(zod_1.z.any()).default({});
exports.ToolSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    version: exports.ToolVersionSchema.optional(),
    status: exports.ToolStatus.default('draft'),
    config: exports.ToolConfigSchema.optional(),
    metadata: exports.ToolMetadataSchema.optional(),
});
exports.CreateToolSchema = exports.ToolSchema.pick({ name: true, config: true }).partial({ config: true });
exports.UpdateToolSchema = exports.ToolSchema.partial();
exports.ShareToolSchema = zod_1.z.object({ toolId: zod_1.z.string(), expiresAt: zod_1.z.date().optional() });
function createToolDefaults(partial) {
    return {
        id: partial?.id ?? `tool_${Math.random().toString(36).slice(2, 10)}`,
        name: partial?.name ?? 'Untitled Tool',
        version: partial?.version ?? '0.1.0',
        status: partial?.status ?? 'draft',
        config: partial?.config ?? {},
        metadata: partial?.metadata ?? {},
    };
}
function generateShareToken() {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}
function canUserEditTool(_userId, _tool) {
    return true;
}
function canUserViewTool(_userId, _tool) {
    return true;
}
function getNextVersion(current = '0.1.0') {
    const parts = current.split('.').map((n) => parseInt(n || '0', 10));
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n)))
        return '0.1.1';
    parts[2] += 1; // bump patch
    return parts.join('.');
}
function determineChangeType(_from, _to) {
    return 'patch';
}
function validateToolStructure(input) {
    const parsed = exports.ToolSchema.safeParse(input);
    return parsed.success ? { success: true } : { success: false, error: parsed.error };
}
//# sourceMappingURL=tool.js.map