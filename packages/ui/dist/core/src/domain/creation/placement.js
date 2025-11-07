import { z } from 'zod';
export const PlacementTargetType = z.enum(['space', 'profile', 'feed']);
export const PlacementPermissionsSchema = z.object({
    canEdit: z.boolean().default(true),
    canRemove: z.boolean().default(true),
});
export const PlacementSettingsSchema = z.object({
    position: z.number().int().default(0),
    pinned: z.boolean().default(false),
});
export const PlacedToolSchema = z.object({
    toolId: z.string(),
    targetType: PlacementTargetType,
    targetId: z.string(),
    permissions: PlacementPermissionsSchema.default({ canEdit: true, canRemove: true }),
    settings: PlacementSettingsSchema.default({ position: 0, pinned: false }),
});
export const PLACED_TOOL_COLLECTION_NAME = 'placed_tools';
export function getPlacementCollectionPath(targetType, targetId) {
    return `${targetType}/${targetId}/${PLACED_TOOL_COLLECTION_NAME}`;
}
export function getPlacementDocPath(targetType, targetId, placementId) {
    return `${getPlacementCollectionPath(targetType, targetId)}/${placementId}`;
}
export function encodePlacementCompositeId(targetType, targetId, placementId) {
    return `${targetType}:${targetId}:${placementId}`;
}
export function decodePlacementCompositeId(compositeId) {
    const [tt, tid, pid] = compositeId.split(':');
    return { targetType: tt, targetId: tid, placementId: pid };
}
export function tryDecodePlacementCompositeId(compositeId) {
    try {
        return [true, decodePlacementCompositeId(compositeId)];
    }
    catch {
        return [false];
    }
}
//# sourceMappingURL=placement.js.map