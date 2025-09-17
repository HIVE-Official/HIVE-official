import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/auth';

export async function onUserCreate(user: UserRecord): Promise<void> {
  const db = admin.firestore();
  
  try {
    // Create user document in Firestore
    const userDoc = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      phoneNumber: user.phoneNumber || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      lastActive: admin.firestore.FieldValue.serverTimestamp(),
      
      // Default user preferences
      preferences: {
        emailNotifications: true,
        pushNotifications: true,
        emailDigest: 'daily',
        theme: 'dark',
        language: 'en'
      },
      
      // Default privacy settings
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        allowMessages: true,
        allowInvites: true
      },
      
      // Initialize empty arrays
      spaces: [],
      interests: [],
      achievements: [],
      
      // Profile completion tracking
      profileCompletion: {
        hasAvatar: false,
        hasDisplayName: !!user.displayName,
        hasAcademicInfo: false,
        hasInterests: false,
        hasSpaces: false,
        percentage: 20
      },
      
      // Onboarding status
      onboardingCompleted: false,
      onboardingStep: 0,
      
      // Role and permissions
      role: 'student',
      isVerified: false,
      isBanned: false
    };
    
    await db.collection('users').doc(user.uid).set(userDoc);
    
    // Auto-join default spaces based on email domain
    const emailDomain = user.email?.split('@')[1];
    if (emailDomain === 'buffalo.edu') {
      // Auto-join UB general space
      await autoJoinSpace(user.uid, 'ub-general');
      await autoJoinSpace(user.uid, 'ub-announcements');
    }
    
    // Create initial achievement
    await grantAchievement(user.uid, 'first-steps', {
      name: 'First Steps',
      description: 'Created your HIVE account',
      category: 'exploration',
      points: 10,
      rarity: 'common'
    });
    
    // Initialize user feed
    await db.collection('feed').doc(user.uid).set({
      userId: user.uid,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp(),
      preferences: {
        showCoordination: true,
        showEvents: true,
        showRituals: true,
        showAnnouncements: true
      }
    });
    
    console.log(`User document created for ${user.uid}`);
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}

async function autoJoinSpace(userId: string, spaceId: string): Promise<void> {
  const db = admin.firestore();
  
  try {
    // Add user to space members
    await db
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .set({
        userId,
        role: 'member',
        joinedAt: admin.firestore.FieldValue.serverTimestamp(),
        notifications: true
      });
    
    // Add space to user's spaces
    await db
      .collection('users')
      .doc(userId)
      .update({
        spaces: admin.firestore.FieldValue.arrayUnion(spaceId)
      });
    
    // Update space member count
    await db
      .collection('spaces')
      .doc(spaceId)
      .update({
        memberCount: admin.firestore.FieldValue.increment(1)
      });
  } catch (error) {
    console.error(`Error auto-joining space ${spaceId}:`, error);
  }
}

async function grantAchievement(
  userId: string,
  achievementId: string,
  achievementData: any
): Promise<void> {
  const db = admin.firestore();
  
  try {
    // Add achievement to user
    await db
      .collection('users')
      .doc(userId)
      .collection('achievements')
      .doc(achievementId)
      .set({
        ...achievementData,
        unlockedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    
    // Update user's achievement array
    await db
      .collection('users')
      .doc(userId)
      .update({
        achievements: admin.firestore.FieldValue.arrayUnion(achievementId),
        totalPoints: admin.firestore.FieldValue.increment(achievementData.points || 0)
      });
  } catch (error) {
    console.error(`Error granting achievement ${achievementId}:`, error);
  }
}