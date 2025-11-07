import { z } from 'zod';

const TimestampSchema = z.preprocess((value) => {
  if (value instanceof Date) return value;
  if (value && typeof (value as any).toDate === 'function') {
    try {
      return (value as any).toDate();
    } catch {
      return value;
    }
  }
  return value;
}, z.date());

export const PlacementTargetType = z.enum(['space', 'profile']);
export type PlacementTargetType = z.infer<typeof PlacementTargetType>;

export const PlacementPermissionsSchema = z.object({
  canInteract: z.boolean().default(true),
  canView: z.boolean().default(true),
  canEdit: z.boolean().default(false),
  allowedRoles: z.array(z.string()).default(['member', 'moderator', 'admin', 'builder']),
});

export const PlacementSettingsSchema = z.object({
  showInDirectory: z.boolean().default(true),
  allowSharing: z.boolean().default(true),
  collectAnalytics: z.boolean().default(true),
  notifyOnInteraction: z.boolean().default(false),
});

export const PlacedToolSchema = z.object({
  toolId: z.string(),
  targetType: PlacementTargetType,
  targetId: z.string(),
  surface: z.enum(['pinned', 'posts', 'events', 'tools', 'chat', 'members']).default('tools'),
  status: z.enum(['active', 'paused', 'disabled']).default('active'),
  position: z.number().min(0).default(0),
  config: z.record(z.unknown()).default({}),
  permissions: PlacementPermissionsSchema.default({}),
  settings: PlacementSettingsSchema.default({}),
  createdAt: TimestampSchema,
  createdBy: z.string(),
  updatedAt: TimestampSchema,
  usageCount: z.number().min(0).default(0),
  lastUsedAt: TimestampSchema.optional(),
  metadata: z.record(z.unknown()).default({}),
});

export type PlacedTool = z.infer<typeof PlacedToolSchema>;

export const PLACED_TOOL_COLLECTION_NAME = 'placed_tools';

export function getPlacementCollectionPath(targetType: PlacementTargetType, targetId: string) {
  return targetType === 'space'
    ? `spaces/${targetId}/${PLACED_TOOL_COLLECTION_NAME}`
    : `profiles/${targetId}/${PLACED_TOOL_COLLECTION_NAME}`;
}

export function getPlacementDocPath(targetType: PlacementTargetType, targetId: string, placementId: string) {
  return `${getPlacementCollectionPath(targetType, targetId)}/${placementId}`;
}

export function encodePlacementCompositeId(
  targetType: PlacementTargetType,
  targetId: string,
  placementId: string
) {
  return `${targetType}:${targetId}:${placementId}`;
}

export function decodePlacementCompositeId(compositeId: string) {
  const [targetType, targetId, placementId] = compositeId.split(':');
  if (!targetType || !targetId || !placementId) {
    throw new Error('Invalid placement identifier');
  }
  if (targetType !== 'space' && targetType !== 'profile') {
    throw new Error('Invalid placement target type');
  }

  return {
    targetType: targetType as PlacementTargetType,
    targetId,
    placementId,
  };
}

export function tryDecodePlacementCompositeId(compositeId: string) {
  try {
    return decodePlacementCompositeId(compositeId);
  } catch {
    return null;
  }
}
