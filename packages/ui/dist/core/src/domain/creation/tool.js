import { z } from 'zod';
// Minimal, stable Tool primitives to satisfy typechecking and light usage.
export const ToolStatus = z.enum(['draft', 'published', 'archived']);
export const ToolVersionSchema = z.string().default('0.1.0');
export const ToolConfigSchema = z.any();
export const ToolMetadataSchema = z.record(z.any()).default({});
export const ToolSchema = z.object({
    id: z.string(),
    name: z.string(),
    version: ToolVersionSchema.optional(),
    status: ToolStatus.default('draft'),
    config: ToolConfigSchema.optional(),
    metadata: ToolMetadataSchema.optional(),
});
export const CreateToolSchema = ToolSchema.pick({ name: true, config: true }).partial({ config: true });
export const UpdateToolSchema = ToolSchema.partial();
export const ShareToolSchema = z.object({ toolId: z.string(), expiresAt: z.date().optional() });
export function createToolDefaults(partial) {
    return {
        id: partial?.id ?? `tool_${Math.random().toString(36).slice(2, 10)}`,
        name: partial?.name ?? 'Untitled Tool',
        version: partial?.version ?? '0.1.0',
        status: partial?.status ?? 'draft',
        config: partial?.config ?? {},
        metadata: partial?.metadata ?? {},
    };
}
export function generateShareToken() {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}
export function canUserEditTool(_userId, _tool) {
    return true;
}
export function canUserViewTool(_userId, _tool) {
    return true;
}
export function getNextVersion(current = '0.1.0') {
    const parts = current.split('.').map((n) => parseInt(n || '0', 10));
    if (parts.length !== 3 || parts.some((n) => Number.isNaN(n)))
        return '0.1.1';
    parts[2] += 1; // bump patch
    return parts.join('.');
}
export function determineChangeType(_from, _to) {
    return 'patch';
}
export function validateToolStructure(input) {
    const parsed = ToolSchema.safeParse(input);
    return parsed.success ? { success: true } : { success: false, error: parsed.error };
}
//# sourceMappingURL=tool.js.map