import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/structured-logger';
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

type ViewerRelationship = 'self' | 'friend' | 'connection' | 'campus';

const relationshipScore: Record<ViewerRelationship, number> = {
  self: 4,
  friend: 3,
  connection: 2,
  campus: 1,
};

const visibilityRequirement: Record<string, number> = {
  public: 0,
  campus: 1,
  connections: 2,
  friends: 3,
  private: 4,
  ghost: 4,
};

const DEFAULT_GRID = {
  cards: [
    { id: 'spaces_hub', type: 'spaces_hub', size: '2x1', visible: true },
    { id: 'friends_network', type: 'friends_network', size: '2x1', visible: true },
    { id: 'active_now', type: 'active_now', size: '1x1', visible: true },
    { id: 'discovery', type: 'discovery', size: '1x1', visible: true },
  ],
  mobileLayout: [
    { id: 'spaces_hub_mobile', type: 'spaces_hub', size: '2x1', visible: true },
    { id: 'friends_network_mobile', type: 'friends_network', size: '2x1', visible: true },
  ],
};

const GridSchema = z.object({
  cards: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        size: z.enum(['1x1', '1x2', '2x1', '2x2']).default('1x1'),
        position: z.number().optional(),
        visible: z.boolean().optional(),
        customType: z.string().optional(),
        title: z.string().optional(),
      }),
    )
    .default(DEFAULT_GRID.cards as any),
  mobileLayout: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        size: z.enum(['1x1', '1x2', '2x1', '2x2']).default('1x1'),
        position: z.number().optional(),
        visible: z.boolean().optional(),
        customType: z.string().optional(),
        title: z.string().optional(),
      }),
    )
    .default(DEFAULT_GRID.mobileLayout as any),
  lastModified: z.union([z.string(), z.number(), z.date()]).optional(),
});

const UpdateSchema = z.object({
  privacy: z.record(z.any()).optional(),
  grid: GridSchema.optional(),
});

const formatTimestamp = (value: any): string | null => {
  if (!value) return null;
  if (typeof value === 'string') return value;
  if (value instanceof Date) return value.toISOString();
  if (typeof value?.toDate === 'function') {
    try {
      return value.toDate().toISOString();
    } catch (err) {
      logger.warn('Failed to convert Firestore timestamp', err instanceof Error ? err : new Error(String(err)));
      return null;
    }
  }
  return null;
};

const normalizeGrid = (grid: any | undefined) => {
  if (!grid) {
    return { ...DEFAULT_GRID, lastModified: new Date().toISOString() };
  }

  const parsed = GridSchema.safeParse(grid);
  if (!parsed.success) {
    logger.warn('Invalid profile grid stored in Firestore; defaulting', parsed.error);
    return { ...DEFAULT_GRID, lastModified: new Date().toISOString() };
  }

  const lastModified = parsed.data.lastModified ? formatTimestamp(parsed.data.lastModified) : null;
  return {
    cards: parsed.data.cards,
    mobileLayout: parsed.data.mobileLayout,
    lastModified: lastModified ?? new Date().toISOString(),
  };
};

const normalizeWidgetLevel = (
  widget: string,
  privacyDoc: Record<string, any> | undefined,
  defaults: { level: string },
) => {
  const level = privacyDoc?.widgets?.[widget]?.level ?? privacyDoc?.[widget]?.level;
  if (typeof level === 'string') return level;

  // Fall back to legacy boolean flags
  switch (widget) {
    case 'activity':
      return privacyDoc?.showActivity === false ? 'private' : 'connections';
    case 'spaces':
      return privacyDoc?.showSpaces === false ? 'private' : 'connections';
    case 'connections':
      return privacyDoc?.showConnections === false ? 'private' : 'connections';
    case 'discovery':
      return 'campus';
    default:
      return defaults.level;
  }
};

const canView = (relationship: ViewerRelationship, level: string | undefined): boolean => {
  if (!level) return true;
  if (level === 'private' || level === 'ghost') {
    return relationship === 'self';
  }

  const viewerScore = relationshipScore[relationship] ?? 0;
  const required = visibilityRequirement[level] ?? 0;
  return viewerScore >= required;
};

const resolveRelationship = (
  isOwnProfile: boolean,
  connectionDoc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> | null,
): ViewerRelationship => {
  if (isOwnProfile) return 'self';
  if (connectionDoc?.exists && connectionDoc.data()?.isFriend) return 'friend';
  if (connectionDoc?.exists) return 'connection';
  return 'campus';
};

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, _ctx, respond) => {
  try {
    const viewerId = getUserId(request);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const handle = searchParams.get('handle');

    let targetUserId = id || null;

    if (!targetUserId && handle) {
      const byHandle = await dbAdmin
        .collection('users')
        .where('handle', '==', handle)
        .where('campusId', '==', CURRENT_CAMPUS_ID)
        .limit(1)
        .get();

      if (byHandle.empty) {
        return respond.error('Profile not found', 'RESOURCE_NOT_FOUND', { status: 404 });
      }
      targetUserId = byHandle.docs[0].id;
    }

    if (!targetUserId) targetUserId = viewerId;

    const userRef = dbAdmin.collection('users').doc(targetUserId);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      return respond.error('Profile not found', 'RESOURCE_NOT_FOUND', { status: 404 });
    }

    const userData = userSnap.data() || {};
    if (userData.campusId && userData.campusId !== CURRENT_CAMPUS_ID) {
      return respond.error('Profile not found', 'RESOURCE_NOT_FOUND', { status: 404 });
    }

    const [privacySnap, connectionSnap, presenceSnap] = await Promise.all([
      dbAdmin.collection('privacySettings').doc(targetUserId).get().catch(() => null),
      targetUserId === viewerId
        ? Promise.resolve(null)
        : userRef.collection('connections').doc(viewerId).get().catch(() => null),
      dbAdmin.collection('presence').doc(targetUserId).get().catch(() => null),
    ]);

    const privacyDoc = {
      ...(userData.privacySettings || {}),
      ...(userData.privacy || {}),
      ...(privacySnap?.exists ? privacySnap.data() : {}),
    } as Record<string, any>;

    const isOwnProfile = targetUserId === viewerId;
    const viewerRelationship = resolveRelationship(isOwnProfile, connectionSnap);

    const profileVisibilityLevel =
      typeof privacyDoc?.profile?.level === 'string'
        ? privacyDoc.profile.level
        : privacyDoc?.isPublic === false
          ? 'connections'
          : 'public';

    if (!canView(viewerRelationship, profileVisibilityLevel)) {
      return respond.error('Profile not found', 'RESOURCE_NOT_FOUND', { status: 404 });
    }

    const gridLayout = normalizeGrid(userData.profileGrid);

    const widgetLevels = {
      activity: normalizeWidgetLevel('activity', privacyDoc, { level: 'connections' }),
      spaces: normalizeWidgetLevel('spaces', privacyDoc, { level: 'connections' }),
      connections: normalizeWidgetLevel('connections', privacyDoc, { level: 'connections' }),
      discovery: normalizeWidgetLevel('discovery', privacyDoc, { level: 'campus' }),
    };

    const [spacesSnap, connectionsListSnap, suggestionSnap] = await Promise.all([
      dbAdmin
        .collection('spaces')
        .where('campusId', '==', CURRENT_CAMPUS_ID)
        .where('members', 'array-contains', targetUserId)
        .limit(8)
        .get()
        .catch(() => ({ empty: true, docs: [] } as FirebaseFirestore.QuerySnapshot)),
      userRef
        .collection('connections')
        .orderBy('connectedAt', 'desc')
        .limit(8)
        .get()
        .catch(() => ({ empty: true, docs: [] } as FirebaseFirestore.QuerySnapshot)),
      dbAdmin
        .collection('spaces')
        .where('campusId', '==', CURRENT_CAMPUS_ID)
        .orderBy('memberCount', 'desc')
        .limit(6)
        .get()
        .catch(() => ({ empty: true, docs: [] } as FirebaseFirestore.QuerySnapshot)),
    ]);

    const spaces = spacesSnap.docs.map((doc) => {
      const space = doc.data();
      const memberIds: string[] = Array.isArray(space.members) ? space.members : [];
      const leaderIds: string[] = Array.isArray(space.leaders) ? space.leaders : [];
      return {
        id: doc.id,
        name: space.name ?? 'Campus Space',
        role: leaderIds.includes(targetUserId)
          ? 'Lead'
          : memberIds.includes(targetUserId)
            ? 'Member'
            : 'Participant',
        memberCount: space.memberCount ?? memberIds.length ?? 0,
        lastActivityAt: formatTimestamp(space.lastActivityAt) ?? new Date().toISOString(),
        headline: space.tagline ?? space.subtitle ?? '',
      };
    });

    const connections = connectionsListSnap.docs.map((doc) => {
      const connection = doc.data();
      return {
        id: doc.id,
        name: connection.displayName || connection.fullName || 'Student',
        avatarUrl: connection.avatarUrl || null,
        sharedSpaces: Array.isArray(connection.sharedSpaces) ? connection.sharedSpaces : [],
        isFriend: connection.isFriend === true,
        connectionStrength: connection.connectionStrength ?? connection.strength ?? 0,
        mutualConnections: connection.mutualConnections ?? 0,
        lastInteractionAt: formatTimestamp(connection.lastInteraction),
      };
    });

    const suggestionCandidates = suggestionSnap.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() || {}) }))
      .filter((space) => !Array.isArray(space.members) || !space.members.includes?.(targetUserId))
      .slice(0, 3)
      .map((space) => ({
        id: space.id as string,
        name: space.name ?? 'Campus Space',
        reason: space.matchReason ?? 'Popular on campus',
        category: space.category ?? 'space',
      }));

    const friendCount = connections.filter((c) => c.isFriend).length;

    const stats = {
      spacesJoined: spaces.length,
      connections: userData.connectionCount ?? connections.length,
      friends: userData.friendCount ?? friendCount,
      toolsCreated: userData.toolsCreated ?? userData.stats?.toolsCreated ?? 0,
      toolsUsed: userData.toolsUsed ?? userData.stats?.toolsUsed ?? spaces.filter((space) => (space as any).tools?.length).length ?? 0,
      activeRituals: userData.activeRituals ?? userData.stats?.activeRituals ?? 0,
      reputation: userData.reputation ?? userData.stats?.reputation ?? 68,
      currentStreak: userData.currentStreak ?? userData.stats?.currentStreak ?? 0,
    };

    const presenceStatus = presenceSnap?.exists ? presenceSnap.data() : null;

    const profilePayload = {
      id: targetUserId,
      handle: userData.handle || '',
      fullName: userData.fullName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'Student',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      campusId: userData.campusId || CURRENT_CAMPUS_ID,
      avatarUrl: userData.avatarUrl || userData.profileImageUrl || null,
      pronouns: userData.pronouns || null,
      bio: userData.bio || '',
      major: userData.major || '',
      graduationYear: userData.graduationYear || null,
      interests: Array.isArray(userData.interests) ? userData.interests : [],
      badges: Array.isArray(userData.badges) ? userData.badges : [],
      presence: {
        status: presenceStatus?.status || 'offline',
        lastSeen: formatTimestamp(presenceStatus?.lastSeen),
        isGhostMode: presenceStatus?.isGhostMode ?? privacyDoc?.ghostMode ?? false,
      },
      stats,
    };

    const viewerCanViewSpaces = canView(viewerRelationship, widgetLevels.spaces);
    const viewerCanViewConnections = canView(viewerRelationship, widgetLevels.connections);
    const viewerCanViewActivity = canView(viewerRelationship, widgetLevels.activity);
    const viewerCanViewDiscovery = canView(viewerRelationship, widgetLevels.discovery);

    const activities = viewerCanViewActivity
      ? spaces.slice(0, 4).map((space) => ({
          id: `${space.id}-activity`,
          type: 'space',
          spaceId: space.id,
          spaceName: space.name,
          action: 'active',
          timestamp: space.lastActivityAt,
        }))
      : [];

    return respond.success({
      profile: profilePayload,
      grid: gridLayout,
      stats,
      spaces: viewerCanViewSpaces ? spaces : [],
      connections: viewerCanViewConnections ? connections : [],
      activities,
      intelligence: viewerCanViewDiscovery
        ? {
            suggestions: suggestionCandidates,
          }
        : { suggestions: [] },
      viewer: {
        relationship: viewerRelationship,
        isOwnProfile,
        isConnection: viewerRelationship === 'connection' || viewerRelationship === 'friend',
        isFriend: viewerRelationship === 'friend',
      },
      privacy: {
        profileLevel: profileVisibilityLevel,
        widgets: widgetLevels,
      },
    });
  } catch (error) {
    logger.error('Failed to fetch profile v2', error instanceof Error ? error : new Error(String(error)));
    return respond.error('Failed to fetch profile', 'INTERNAL_ERROR', { status: 500 });
  }
});

export const PATCH = withAuthAndErrors(async (request: AuthenticatedRequest, _ctx, respond) => {
  try {
    const userId = getUserId(request);
    const payload = await request.json();
    const parsed = UpdateSchema.parse(payload);

    const updates: Array<Promise<unknown>> = [];
    let fieldsUpdated: string[] = [];

    if (parsed.privacy) {
      const privacyRef = dbAdmin.collection('privacySettings').doc(userId);
      const existing = await privacyRef.get();
      const now = new Date().toISOString();
      const merged = {
        ...(existing.exists ? existing.data() : {}),
        ...parsed.privacy,
        userId,
        updatedAt: now,
        campusId: existing.data()?.campusId || CURRENT_CAMPUS_ID,
      };
      if (!existing.exists) merged.createdAt = now;

      updates.push(privacyRef.set(merged, { merge: true }));
      fieldsUpdated = fieldsUpdated.concat(Object.keys(parsed.privacy));
    }

    if (parsed.grid) {
      const normalized = normalizeGrid(parsed.grid);
      updates.push(
        dbAdmin
          .collection('users')
          .doc(userId)
          .set({ profileGrid: normalized }, { merge: true }),
      );
      fieldsUpdated.push('grid');
    }

    if (updates.length === 0) {
      return respond.success({ message: 'No changes applied', fieldsUpdated: [] }, 'No updates');
    }

    await Promise.all(updates);

    return respond.success({ fieldsUpdated }, 'Profile updated');
  } catch (error) {
    logger.error('Failed to update profile v2', error instanceof Error ? error : new Error(String(error)));
    return respond.error('Failed to update profile', 'INTERNAL_ERROR', { status: 500 });
  }
});
