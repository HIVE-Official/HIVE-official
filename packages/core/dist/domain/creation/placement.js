"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLACED_TOOL_COLLECTION_NAME = exports.PlacedToolSchema = exports.PlacementSettingsSchema = exports.PlacementPermissionsSchema = exports.PlacementTargetType = void 0;
exports.getPlacementCollectionPath = getPlacementCollectionPath;
exports.getPlacementDocPath = getPlacementDocPath;
exports.encodePlacementCompositeId = encodePlacementCompositeId;
exports.decodePlacementCompositeId = decodePlacementCompositeId;
exports.tryDecodePlacementCompositeId = tryDecodePlacementCompositeId;
const zod_1 = require("zod");
exports.PlacementTargetType = zod_1.z.enum(['space', 'profile', 'feed']);
exports.PlacementPermissionsSchema = zod_1.z.object({
    canEdit: zod_1.z.boolean().default(true),
    canRemove: zod_1.z.boolean().default(true),
});
exports.PlacementSettingsSchema = zod_1.z.object({
    position: zod_1.z.number().int().default(0),
    pinned: zod_1.z.boolean().default(false),
});
exports.PlacedToolSchema = zod_1.z.object({
    toolId: zod_1.z.string(),
    targetType: exports.PlacementTargetType,
    targetId: zod_1.z.string(),
    permissions: exports.PlacementPermissionsSchema.default({ canEdit: true, canRemove: true }),
    settings: exports.PlacementSettingsSchema.default({ position: 0, pinned: false }),
});
exports.PLACED_TOOL_COLLECTION_NAME = 'placed_tools';
function getPlacementCollectionPath(targetType, targetId) {
    return `${targetType}/${targetId}/${exports.PLACED_TOOL_COLLECTION_NAME}`;
}
function getPlacementDocPath(targetType, targetId, placementId) {
    return `${getPlacementCollectionPath(targetType, targetId)}/${placementId}`;
}
function encodePlacementCompositeId(targetType, targetId, placementId) {
    return `${targetType}:${targetId}:${placementId}`;
}
function decodePlacementCompositeId(compositeId) {
    const [tt, tid, pid] = compositeId.split(':');
    return { targetType: tt, targetId: tid, placementId: pid };
}
function tryDecodePlacementCompositeId(compositeId) {
    try {
        return [true, decodePlacementCompositeId(compositeId)];
    }
    catch {
        return [false];
    }
}
//# sourceMappingURL=placement.js.map