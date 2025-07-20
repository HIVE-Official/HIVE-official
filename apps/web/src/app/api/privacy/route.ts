import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const privacyDoc = await getDoc(doc(db, 'privacySettings', user.uid));
    
    if (!privacyDoc.exists()) {
      // Create default settings if none exist
      const newSettings: PrivacySettings = {
        userId: user.uid,
        ...defaultPrivacySettings,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'privacySettings', user.uid), newSettings);
      return NextResponse.json({ settings: newSettings });
    }

    const settings = privacyDoc.data() as PrivacySettings;
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching privacy settings:', error);
    return NextResponse.json({ error: 'Failed to fetch privacy settings' }, { status: 500 });
  }
}

// PUT - Update privacy settings
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { ghostMode, profileVisibility, activitySharing, notifications, dataRetention } = body;

    // Validate ghost mode level
    if (ghostMode?.level && !['invisible', 'minimal', 'selective', 'normal'].includes(ghostMode.level)) {
      return NextResponse.json({ error: 'Invalid ghost mode level' }, { status: 400 });
    }

    // Get existing settings
    const privacyDoc = await getDoc(doc(db, 'privacySettings', user.uid));
    const existingSettings = privacyDoc.exists() ? privacyDoc.data() as PrivacySettings : {
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

    await setDoc(doc(db, 'privacySettings', user.uid), updatedSettings);

    // Apply privacy changes immediately
    await applyPrivacyChanges(user.uid, updatedSettings);

    return NextResponse.json({ 
      settings: updatedSettings,
      message: 'Privacy settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating privacy settings:', error);
    return NextResponse.json({ error: 'Failed to update privacy settings' }, { status: 500 });
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
    console.error('Error applying privacy changes:', error);
  }
}

// Helper function to update space visibility
async function updateSpaceVisibility(userId: string, settings: PrivacySettings) {
  try {
    const membershipsQuery = query(
      collection(db, 'members'),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    
    // Update visibility in each space membership
    const updates = membershipsSnapshot.docs.map(async (memberDoc) => {
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

      return updateDoc(memberDoc.ref, updatedMemberData);
    });

    await Promise.all(updates);
  } catch (error) {
    console.error('Error updating space visibility:', error);
  }
}

// Helper function to update profile visibility
async function updateProfileVisibility(userId: string, profileVisibility: PrivacySettings['profileVisibility']) {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
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

      await updateDoc(userDocRef, updatedUserData);
    }
  } catch (error) {
    console.error('Error updating profile visibility:', error);
  }
}

// Helper function to cleanup old activity data
async function cleanupOldActivityData(userId: string, retentionPeriod: number) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionPeriod);
    const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

    // Query old activity events
    const oldEventsQuery = query(
      collection(db, 'activityEvents'),
      where('userId', '==', userId),
      where('date', '<', cutoffDateStr)
    );

    const oldEventsSnapshot = await getDocs(oldEventsQuery);
    
    // Delete old events in batches
    const batch = db.batch();
    oldEventsSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    if (oldEventsSnapshot.docs.length > 0) {
      await batch.commit();
      console.log(`Deleted ${oldEventsSnapshot.docs.length} old activity events for user ${userId}`);
    }

    // Query old activity summaries
    const oldSummariesQuery = query(
      collection(db, 'activitySummaries'),
      where('userId', '==', userId),
      where('date', '<', cutoffDateStr)
    );

    const oldSummariesSnapshot = await getDocs(oldSummariesQuery);
    
    // Delete old summaries in batches
    const summaryBatch = db.batch();
    oldSummariesSnapshot.docs.forEach(doc => {
      summaryBatch.delete(doc.ref);
    });
    
    if (oldSummariesSnapshot.docs.length > 0) {
      await summaryBatch.commit();
      console.log(`Deleted ${oldSummariesSnapshot.docs.length} old activity summaries for user ${userId}`);
    }
  } catch (error) {
    console.error('Error cleaning up old activity data:', error);
  }
}