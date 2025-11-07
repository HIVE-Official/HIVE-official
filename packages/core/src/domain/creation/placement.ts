import { z } from 'zod';

export const PlacementTargetType = z.enum(['space', 'profile', 'feed']);
export type PlacementTargetType = z.infer<typeof PlacementTargetType>;

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

export function getPlacementCollectionPath(targetType: PlacementTargetType, targetId: string): string {
  return `${targetType}/${targetId}/${PLACED_TOOL_COLLECTION_NAME}`;
}

export function getPlacementDocPath(targetType: PlacementTargetType, targetId: string, placementId: string): string {
  return `${getPlacementCollectionPath(targetType, targetId)}/${placementId}`;
}

export function encodePlacementCompositeId(targetType: PlacementTargetType, targetId: string, placementId: string): string {
  return `${targetType}:${targetId}:${placementId}`;
}

export function decodePlacementCompositeId(compositeId: string): { targetType: PlacementTargetType; targetId: string; placementId: string } {
  const [tt, tid, pid] = compositeId.split(':');
  return { targetType: (tt as PlacementTargetType), targetId: tid, placementId: pid };
}

export function tryDecodePlacementCompositeId(compositeId: string): [boolean, { targetType: PlacementTargetType; targetId: string; placementId: string }?] {
  try {
    return [true, decodePlacementCompositeId(compositeId)];
  } catch {
    return [false];
  }
}

