import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

// Privacy settings interface
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
    retentionPeriod: number; // in days
    autoDeleteInactiveData: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// Default privacy settings
const defaultPrivacySettings: Omit<PrivacySettings, 'userId' | 'createdAt' | 'updatedAt'> = {
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
    retentionPeriod: 365, // 1 year
    autoDeleteInactiveData: false,
  },
};

// GET - Fetch user's privacy settings
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const privacyDoc = await dbAdmin.collection('privacySettings').doc(user.uid).get();
    
    if (!privacyDoc.exists) {
      // Create default settings if none exist
      const newSettings: PrivacySettings = {
        userId: user.uid,
        ...defaultPrivacySettings,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await dbAdmin.collection('privacySettings').doc(user.uid).set(newSettings);
      return NextResponse.json({ settings: newSettings });
    }

    const settings = privacyDoc.data() as PrivacySettings;
    return NextResponse.json({ settings });
  } catch (error) {
    logger.error('Error fetching privacy settings', { error: error, endpoint: '/api/privacy' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch privacy settings", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// PUT - Update privacy settings
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { ghostMode, profileVisibility, activitySharing, notifications, dataRetention } = body;

    // Validate ghost mode level
    if (ghostMode?.level && !['invisible', 'minimal', 'selective', 'normal'].includes(ghostMode.level)) {
      return NextResponse.json(ApiResponseHelper.error("Invalid ghost mode level", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get existing settings
    const privacyDoc = await dbAdmin.collection('privacySettings').doc(user.uid).get();
    const existingSettings = privacyDoc.exists ? privacyDoc.data() as PrivacySettings : {
      userId: user.uid,
      ...defaultPrivacySettings,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Update settings
    const updatedSettings: PrivacySettings = {
      ...existingSettings,
      ghostMode: { ...existingSettings.ghostMode, ...ghostMode },
      profileVisibility: { ...existingSettings.profileVisibility, ...profileVisibility },
      activitySharing: { ...existingSettings.activitySharing, ...activitySharing },
      notifications: { ...existingSettings.notifications, ...notifications },
      dataRetention: { ...existingSettings.dataRetention, ...dataRetention },
      updatedAt: new Date().toISOString()
    };

    await dbAdmin.collection('privacySettings').doc(user.uid).set(updatedSettings);

    // Apply privacy changes immediately
    await applyPrivacyChanges(user.uid, updatedSettings);

    return NextResponse.json({ 
      settings: updatedSettings,
      message: 'Privacy settings updated successfully'
    });
  } catch (error) {
    logger.error('Error updating privacy settings', { error: error, endpoint: '/api/privacy' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update privacy settings", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to apply privacy changes
async function applyPrivacyChanges(userId: string, settings: PrivacySettings) {
  try {
    // Update user's visibility in spaces
    if (settings.ghostMode.enabled) {
      await updateSpaceVisibility(userId, settings);
    }

    // Handle activity data retention
    if (settings.dataRetention.autoDeleteInactiveData) {
      await cleanupOldActivityData(userId, settings.dataRetention.retentionPeriod);
    }

    // Update profile visibility
    await updateProfileVisibility(userId, settings.profileVisibility);

  } catch (error) {
    logger.error('Error applying privacy changes', { error: error, endpoint: '/api/privacy' });
  }
}

// Helper function to update space visibility
async function updateSpaceVisibility(userId: string, settings: PrivacySettings) {
  try {
    const membershipsSnapshot = await dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .get();
    
    // Update visibility in each space membership
    const updates = membershipsSnapshot.docs.map(async (memberDoc: any) => {
      const memberData = memberDoc.data();
      
      const updatedMemberData = {
        ...memberData,
        visibility: {
          showInDirectory: !settings.ghostMode.hideFromDirectory,
          showActivity: !settings.ghostMode.hideActivity,
          showOnlineStatus: !settings.ghostMode.hideOnlineStatus,
          showLastSeen: !settings.ghostMode.hideLastSeen,
        },
        ghostMode: {
          enabled: settings.ghostMode.enabled,
          level: settings.ghostMode.level
        },
        updatedAt: new Date().toISOString()
      };

      return memberDoc.ref.update(updatedMemberData);
    });

    await Promise.all(updates);
  } catch (error) {
    logger.error('Error updating space visibility', { error: error, endpoint: '/api/privacy' });
  }
}

// Helper function to update profile visibility
async function updateProfileVisibility(userId: string, profileVisibility: PrivacySettings['profileVisibility']) {
  try {
    const userDocRef = dbAdmin.collection('users').doc(userId);
    const userDoc = await userDocRef.get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      
      const updatedUserData = {
        ...userData,
        profileVisibility: {
          showToSpaceMembers: profileVisibility.showToSpaceMembers,
          showToFollowers: profileVisibility.showToFollowers,
          showToPublic: profileVisibility.showToPublic,
          hideProfilePhoto: profileVisibility.hideProfilePhoto,
          hideHandle: profileVisibility.hideHandle,
          hideInterests: profileVisibility.hideInterests,
        },
        updatedAt: new Date().toISOString()
      };

      await userDocRef.update(updatedUserData);
    }
  } catch (error) {
    logger.error('Error updating profile visibility', { error: error, endpoint: '/api/privacy' });
  }
}

// Helper function to cleanup old activity data
async function cleanupOldActivityData(userId: string, retentionPeriod: number) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionPeriod);
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

    // Query old activity events
    const oldEventsSnapshot = await dbAdmin.collection('activityEvents')
      .where('userId', '==', userId)
      .where('date', '<', cutoffDateStr)
      .get();
    
    // Delete old events in batches
    const batch = dbAdmin.batch();
    oldEventsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    if (oldEventsSnapshot.docs.length > 0) {
      await batch.commit();
      logger.info('Deletedold activity events for user', { oldEventsSnapshot, userId, endpoint: '/api/privacy' });
    }

    // Query old activity summaries
    const oldSummariesSnapshot = await dbAdmin.collection('activitySummaries')
      .where('userId', '==', userId)
      .where('date', '<', cutoffDateStr)
      .get();
    
    // Delete old summaries in batches
    const summaryBatch = dbAdmin.batch();
    oldSummariesSnapshot.docs.forEach(doc => {
      summaryBatch.delete(doc.ref);
    });
    
    if (oldSummariesSnapshot.docs.length > 0) {
      await summaryBatch.commit();
      logger.info('Deletedold activity summaries for user', { oldSummariesSnapshot, userId, endpoint: '/api/privacy' });
    }
  } catch (error) {
    logger.error('Error cleaning up old activity data', { error: error, endpoint: '/api/privacy' });
  }
}