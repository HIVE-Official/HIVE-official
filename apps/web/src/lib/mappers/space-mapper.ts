import type { Space } from '@hive/core';

type MaybeValueObject<T> = T | { value: T } | { id: T };

type Primitive = string | number | boolean | null | undefined;

export interface SpaceViewModel {
  id: string;
  name: string;
  description?: string;
  category?: string;
  visibility?: 'public' | 'private' | string;
  status?: string;
  isActive?: boolean;
  memberCount?: number;
  trendingScore?: number;
  settings?: Record<string, unknown>;
  metrics?: Record<string, unknown>;
  tags?: unknown;
  joinPolicy?: unknown;
  raw: Partial<Space> | Record<string, unknown>;
  [key: string]: unknown;
}

function unwrap<T>(value: MaybeValueObject<T> | undefined): T | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value === 'object') {
    if ('value' in value && typeof (value as any).value !== 'undefined') {
      return (value as any).value as T;
    }
    if ('id' in value && typeof (value as any).id !== 'undefined') {
      return (value as any).id as T;
    }
  }

  return value as T;
}

function resolveVisibility(space: any): 'public' | 'private' | string | undefined {
  if (typeof space?.visibility === 'string') {
    return space.visibility;
  }

  if (typeof space?.isPublic === 'boolean') {
    return space.isPublic ? 'public' : 'private';
  }

  if (typeof space?.settings?.isPublic === 'boolean') {
    return space.settings.isPublic ? 'public' : 'private';
  }

  return undefined;
}

function resolveStatus(space: any): string | undefined {
  if (typeof space?.status === 'string') {
    return space.status;
  }

  if (typeof space?.isActive === 'boolean') {
    return space.isActive ? 'active' : 'inactive';
  }

  return undefined;
}

function resolveMemberCount(space: any): number | undefined {
  if (typeof space?.memberCount === 'number') {
    return space.memberCount;
  }

  if (typeof space?.members === 'object' && Array.isArray(space.members)) {
    return space.members.length;
  }

  if (typeof space?.metrics?.memberCount === 'number') {
    return space.metrics.memberCount;
  }

  if (typeof space?.getMemberCount === 'function') {
    try {
      const value = space.getMemberCount();
      if (typeof value === 'number') {
        return value;
      }
    } catch (error) {
      console.warn('Failed to read member count from space aggregate', error);
    }
  }

  return undefined;
}

function normalizeSettings(space: any): Record<string, unknown> | undefined {
  if (space?.settings && typeof space.settings === 'object') {
    return space.settings;
  }

  const settings: Record<string, Primitive> = {};

  if (typeof space?.allowInvites === 'boolean') {
    settings.allowInvites = space.allowInvites;
  }

  if (typeof space?.requireApproval === 'boolean') {
    settings.requireApproval = space.requireApproval;
  }

  if (typeof space?.maxMembers === 'number') {
    settings.maxMembers = space.maxMembers;
  }

  return Object.keys(settings).length > 0 ? settings : undefined;
}

export function toSpaceViewModel(space: Partial<Space> | Record<string, unknown> | null | undefined): SpaceViewModel | null {
  if (!space) {
    return null;
  }

  const id = unwrap<string>((space as any).id ?? (space as any).spaceId ?? (space as any).spaceIdValue);

  if (!id) {
    return null;
  }

  const name = unwrap<string>((space as any).name) || (space as any).name?.name;
  const description = unwrap<string>((space as any).description);
  const category = unwrap<string>((space as any).category) || (space as any).spaceType || (space as any).type;
  const visibility = resolveVisibility(space);
  const status = resolveStatus(space);
  const isActive = typeof (space as any).isActive === 'boolean' ? (space as any).isActive : status === 'active';
  const memberCount = resolveMemberCount(space);
  const trendingScore = typeof (space as any).trendingScore === 'number' ? (space as any).trendingScore : undefined;
  const settings = normalizeSettings(space);

  const viewModel: SpaceViewModel = {
    id,
    name: name || 'Untitled Space',
    description: description || '',
    category,
    visibility,
    status,
    isActive,
    memberCount,
    trendingScore,
    settings,
    raw: space,
  };

  if ((space as any).metrics && typeof (space as any).metrics === 'object') {
    viewModel.metrics = (space as any).metrics as Record<string, unknown>;
  }

  if ((space as any).tags) {
    viewModel.tags = (space as any).tags;
  }

  if ((space as any).joinPolicy) {
    viewModel.joinPolicy = (space as any).joinPolicy;
  }

  return viewModel;
}

export function spaceNameToString(name: MaybeValueObject<string> | undefined): string {
  return unwrap<string>(name) ?? '';
}
