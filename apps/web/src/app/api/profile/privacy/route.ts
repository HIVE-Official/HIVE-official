import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";

// Shared privacy settings shape (kept compatible with /api/privacy)
interface PrivacySettings {
  userId: string;
  ghostMode: {
    enabled: boolean;
    level: 'invisible' | 'minimal' | 'selective' | 'normal';
    hideFromDirectory: boolean;
    hideActivity: boolean;
    hideSpaceMemberships: boolean;
    hideLastSeen: boolean;
    hideOnlineStatus: boolean;
  };
  profileVisibility: {
    showToSpaceMembers: boolean;
    showToFollowers: boolean;
    showToPublic: boolean;
    hideProfilePhoto: boolean;
    hideHandle: boolean;
    hideInterests: boolean;
  };
  activitySharing: {
    shareActivityData: boolean;
    shareSpaceActivity: boolean;
    shareToolUsage: boolean;
    shareContentCreation: boolean;
    allowAnalytics: boolean;
  };
  notifications: {
    enableActivityNotifications: boolean;
    enableSpaceNotifications: boolean;
    enableToolNotifications: boolean;
    enableRitualNotifications: boolean;
  };
  dataRetention: {
    retainActivityData: boolean;
    retentionPeriod: number; // days
    autoDeleteInactiveData: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

const defaultPrivacy: Omit<PrivacySettings, 'userId' | 'createdAt' | 'updatedAt'> = {
  ghostMode: {
    enabled: false,
    level: 'normal',
    hideFromDirectory: false,
    hideActivity: false,
    hideSpaceMemberships: false,
    hideLastSeen: false,
    hideOnlineStatus: false,
  },
  profileVisibility: {
    showToSpaceMembers: true,
    showToFollowers: true,
    showToPublic: false,
    hideProfilePhoto: false,
    hideHandle: false,
    hideInterests: false,
  },
  activitySharing: {
    shareActivityData: false,
    shareSpaceActivity: true,
    shareToolUsage: false,
    shareContentCreation: true,
    allowAnalytics: true,
  },
  notifications: {
    enableActivityNotifications: true,
    enableSpaceNotifications: true,
    enableToolNotifications: true,
    enableRitualNotifications: true,
  },
  dataRetention: {
    retainActivityData: true,
    retentionPeriod: 365,
    autoDeleteInactiveData: false,
  },
};

// GET /api/profile/privacy - returns { success, privacy }
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, _ctx, respond) => {
  const userId = getUserId(request);
  try {
    const ref = dbAdmin.collection('privacySettings').doc(userId);
    const snap = await ref.get();
    if (!snap.exists) {
      const now = new Date().toISOString();
      const settings: PrivacySettings = {
        userId,
        ...defaultPrivacy,
        createdAt: now,
        updatedAt: now,
      };
      await ref.set({ ...settings, campusId: CURRENT_CAMPUS_ID } as any);
      return respond.success({ privacy: settings });
    }
    const settings = snap.data() as (PrivacySettings & { campusId?: string });
    if (settings?.campusId && settings.campusId !== CURRENT_CAMPUS_ID) {
      return respond.error('Access denied for this campus', 'FORBIDDEN', { status: 403 });
    }
    return respond.success({ privacy: settings });
  } catch (error) {
    logger.error('Failed to fetch privacy via /api/profile/privacy', error instanceof Error ? error : new Error(String(error)));
    return respond.error('Failed to fetch privacy settings', 'INTERNAL_ERROR', { status: 500 });
  }
});

// PATCH /api/profile/privacy - partial update, returns { success, privacy, message }
export const PATCH = withAuthAndErrors(async (request: AuthenticatedRequest, _ctx, respond) => {
  const userId = getUserId(request);
  try {
    const updates = await request.json();
    const ref = dbAdmin.collection('privacySettings').doc(userId);
    const snap = await ref.get();
    const now = new Date().toISOString();

    let merged: PrivacySettings;
    if (!snap.exists) {
      merged = {
        userId,
        ...defaultPrivacy,
        ...updates,
        createdAt: now,
        updatedAt: now,
      };
    } else {
      const existing = snap.data() as (PrivacySettings & { campusId?: string });
      if (existing?.campusId && existing.campusId !== CURRENT_CAMPUS_ID) {
        return respond.error('Access denied for this campus', 'FORBIDDEN', { status: 403 });
      }
      merged = {
        ...existing,
        ghostMode: { ...existing.ghostMode, ...(updates.ghostMode || {}) },
        profileVisibility: { ...existing.profileVisibility, ...(updates.profileVisibility || {}) },
        activitySharing: { ...existing.activitySharing, ...(updates.activitySharing || {}) },
        notifications: { ...existing.notifications, ...(updates.notifications || {}) },
        dataRetention: { ...existing.dataRetention, ...(updates.dataRetention || {}) },
        updatedAt: now,
      };
    }

    await ref.set({ ...merged, campusId: (snap.data() as any)?.campusId || CURRENT_CAMPUS_ID } as any);
    return respond.success({ privacy: merged }, 'Privacy settings updated');
  } catch (error) {
    logger.error('Failed to update privacy via /api/profile/privacy', error instanceof Error ? error : new Error(String(error)));
    return respond.error('Failed to update privacy settings', 'INTERNAL_ERROR', { status: 500 });
  }
});
