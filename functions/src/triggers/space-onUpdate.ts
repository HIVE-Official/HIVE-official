import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export async function onSpaceUpdate(
  change: functions.Change<functions.firestore.QueryDocumentSnapshot>,
  context: functions.EventContext
): Promise<void> {
  const db = admin.firestore();
  const beforeData = change.before.data();
  const afterData = change.after.data();
  const { spaceId } = context.params;
  
  try {
    // Check for visibility change
    if (beforeData.visibility !== afterData.visibility) {
      console.log(`Space ${spaceId} visibility changed from ${beforeData.visibility} to ${afterData.visibility}`);
      
      // If space became private, notify members
      if (afterData.visibility === 'private' && beforeData.visibility === 'public') {
        const membersSnapshot = await db
          .collection('spaces')
          .doc(spaceId)
          .collection('members')
          .get();
        
        const notificationPromises = membersSnapshot.docs.map(async (memberDoc) => {
          return db
            .collection('users')
            .doc(memberDoc.id)
            .collection('notifications')
            .add({
              type: 'space_update',
              title: 'Space Privacy Update',
              message: `${afterData.name} is now a private space`,
              metadata: {
                spaceId,
                changeType: 'visibility'
              },
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
              read: false
            });
        });
        
        await Promise.all(notificationPromises);
      }
    }
    
    // Check for new leader assignment
    if (beforeData.leaderId !== afterData.leaderId && afterData.leaderId) {
      // Update member role to leader
      await db
        .collection('spaces')
        .doc(spaceId)
        .collection('members')
        .doc(afterData.leaderId)
        .update({
          role: 'leader',
          promotedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      
      // Update previous leader to member if exists
      if (beforeData.leaderId) {
        await db
          .collection('spaces')
          .doc(spaceId)
          .collection('members')
          .doc(beforeData.leaderId)
          .update({
            role: 'member'
          });
      }
      
      // Notify new leader
      await db
        .collection('users')
        .doc(afterData.leaderId)
        .collection('notifications')
        .add({
          type: 'role_change',
          title: 'You are now a Space Leader!',
          message: `You've been promoted to leader of ${afterData.name}`,
          metadata: {
            spaceId,
            role: 'leader'
          },
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          read: false
        });
      
      // Grant leader achievement
      await grantAchievement(afterData.leaderId, 'space-leader', {
        name: 'Space Leader',
        description: 'Became a leader of a space',
        category: 'leadership',
        points: 50,
        rarity: 'rare'
      });
    }
    
    // Check for space verification
    if (!beforeData.isVerified && afterData.isVerified) {
      // Notify all members about verification
      const membersSnapshot = await db
        .collection('spaces')
        .doc(spaceId)
        .collection('members')
        .get();
      
      const notificationPromises = membersSnapshot.docs.map(async (memberDoc) => {
        return db
          .collection('users')
          .doc(memberDoc.id)
          .collection('notifications')
          .add({
            type: 'space_verified',
            title: 'Space Verified! ',
            message: `${afterData.name} is now a verified space`,
            metadata: {
              spaceId
            },
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            read: false
          });
      });
      
      await Promise.all(notificationPromises);
    }
    
    // Update space activity metrics
    if (afterData.memberCount !== beforeData.memberCount) {
      const growth = afterData.memberCount - beforeData.memberCount;
      
      await db.collection('analytics').doc('spaces').update({
        totalMembers: admin.firestore.FieldValue.increment(growth),
        [`spaces.${spaceId}.memberCount`]: afterData.memberCount,
        [`spaces.${spaceId}.lastUpdated`]: admin.firestore.FieldValue.serverTimestamp()
      });
    }
    
    // Check for milestone achievements
    if (afterData.memberCount >= 100 && beforeData.memberCount < 100) {
      // Space reached 100 members milestone
      if (afterData.leaderId) {
        await grantAchievement(afterData.leaderId, 'community-builder', {
          name: 'Community Builder',
          description: 'Led a space to 100+ members',
          category: 'leadership',
          points: 100,
          rarity: 'epic'
        });
      }
    }
    
    console.log(`Space onUpdate trigger completed for space ${spaceId}`);
  } catch (error) {
    console.error('Error in space onUpdate trigger:', error);
    throw error;
  }
}

async function grantAchievement(
  userId: string,
  achievementId: string,
  achievementData: any
): Promise<void> {
  const db = admin.firestore();
  
  try {
    // Check if achievement already granted
    const existingAchievement = await db
      .collection('users')
      .doc(userId)
      .collection('achievements')
      .doc(achievementId)
      .get();
    
    if (!existingAchievement.exists) {
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
      
      // Create notification
      await db
        .collection('users')
        .doc(userId)
        .collection('notifications')
        .add({
          type: 'achievement_unlocked',
          title: 'Achievement Unlocked! <Æ',
          message: `You earned "${achievementData.name}" - ${achievementData.description}`,
          metadata: {
            achievementId,
            points: achievementData.points,
            rarity: achievementData.rarity
          },
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          read: false
        });
    }
  } catch (error) {
    console.error(`Error granting achievement ${achievementId}:`, error);
  }
}