import { z } from 'zod';
import { ElementInstanceSchema, type ElementInstance } from './elements';

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

export const ToolStatus = z.enum(['draft', 'preview', 'published']);

export const ToolMetadataSchema = z.object({
  tags: z.array(z.string().max(32)).max(10).default([]),
  difficulty: z.enum(['beginner', 'advanced']).default('beginner'),
  estimatedMinutes: z.number().min(1).max(240).default(10),
  surface: z.enum(['pinned', 'posts', 'events', 'tools']).default('tools'),
});

export const ToolConfigSchema = z.object({
  layout: z.enum(['stack', 'flow']).default('stack'),
  allowMultipleResponses: z.boolean().default(false),
  showProgress: z.boolean().default(false),
  dataStorage: z.enum(['space', 'profile']).default('space'),
  autoSave: z.boolean().default(true),
});

export const ToolVersionSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  changelog: z.string().max(500).optional(),
  createdAt: TimestampSchema,
  createdBy: z.string(),
  isStable: z.boolean().default(false),
});

export const ToolSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(80),
  description: z.string().max(500).default(''),
  ownerId: z.string(),
  collaborators: z.array(z.string()).default([]),
  status: ToolStatus.default('draft'),
  currentVersion: z.string().regex(/^\d+\.\d+\.\d+$/).default('1.0.0'),
  versions: z.array(ToolVersionSchema).default([]),
  elements: z.array(ElementInstanceSchema).max(50),
  config: ToolConfigSchema.default({}),
  metadata: ToolMetadataSchema.default({}),
  isPublic: z.boolean().default(false),
  shareToken: z.string().optional(),
  forkCount: z.number().min(0).default(0),
  viewCount: z.number().min(0).default(0),
  useCount: z.number().min(0).default(0),
  ratingCount: z.number().min(0).default(0),
  spaceId: z.string().optional(),
  isSpaceTool: z.boolean().default(false),
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
  publishedAt: TimestampSchema.optional(),
  lastUsedAt: TimestampSchema.optional(),
});

export type Tool = z.infer<typeof ToolSchema>;

export const CreateToolSchema = z.object({
  name: z.string().min(3).max(80),
  description: z.string().max(500).optional(),
  spaceId: z.string().optional(),
  isSpaceTool: z.boolean().default(false),
  config: ToolConfigSchema.partial().optional(),
  metadata: ToolMetadataSchema.partial().optional(),
});

export const UpdateToolSchema = CreateToolSchema.extend({
  elements: z.array(ElementInstanceSchema).max(50).optional(),
  changelog: z.string().max(500).optional(),
  status: ToolStatus.optional(),
}).partial();

export const ShareToolSchema = z.object({
  permission: z.enum(['view', 'edit']).default('view'),
  expiresAt: z.date().optional(),
  requiresApproval: z.boolean().default(false),
});

export function createToolDefaults(opts: {
  ownerId?: string;
  name?: string;
  description?: string;
  spaceId?: string;
  isSpaceTool?: boolean;
  config?: z.infer<typeof ToolConfigSchema>;
  metadata?: z.infer<typeof ToolMetadataSchema>;
} = {}) {
  return {
    name: opts.name ?? 'Untitled Tool',
    description: opts.description ?? '',
    ownerId: opts.ownerId ?? '',
    collaborators: [],
    status: 'draft' as const,
    currentVersion: '1.0.0',
    versions: [],
    elements: [] as ElementInstance[],
    config: ToolConfigSchema.parse(opts.config ?? {}),
    metadata: ToolMetadataSchema.parse(opts.metadata ?? {}),
    isPublic: false,
    shareToken: undefined,
    forkCount: 0,
    viewCount: 0,
    useCount: 0,
    ratingCount: 0,
    spaceId: opts.spaceId,
    isSpaceTool: opts.isSpaceTool ?? false,
  };
}

export function generateShareToken(toolId: string, userId: string) {
  return Buffer.from(`${toolId}:${userId}:${Date.now()}`).toString('base64url');
}

export function canUserEditTool(tool: Tool, userId: string) {
  return tool.ownerId === userId || tool.collaborators.includes(userId);
}

export function canUserViewTool(tool: Tool, userId: string) {
  return tool.isPublic || tool.ownerId === userId || tool.collaborators.includes(userId);
}

export function getNextVersion(current: string, type: 'major' | 'minor' | 'patch' = 'patch') {
  const [major, minor, patch] = current.split('.').map((segment) => Number(segment) || 0);
  if (type === 'major') return `${major + 1}.0.0`;
  if (type === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

export function determineChangeType(previous: ElementInstance[], next: ElementInstance[]): 'major' | 'minor' | 'patch' {
  if (next.length < previous.length) return 'major';

  const prevIds = new Set(previous.map((el) => el.id));
  const nextIds = new Set(next.map((el) => el.id));

  for (const id of prevIds) {
    if (!nextIds.has(id)) {
      return 'major';
    }
  }

  if (next.length > previous.length) return 'minor';
  return 'patch';
}

export function validateToolStructure(elements: ElementInstance[]) {
  const ids = new Set<string>();
  for (const element of elements) {
    if (ids.has(element.id)) {
      return false;
    }
    ids.add(element.id);
  }
  return true;
}
