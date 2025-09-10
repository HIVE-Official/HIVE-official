import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export async function onPostCreate(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  context: functions.EventContext
): Promise<void> {
  const db = admin.firestore();
  const postData = snapshot.data();
  const { spaceId, postId } = context.params;
  
  try {
    // Get post author information
    const authorDoc = await db.collection('users').doc(postData.authorId).get();
    const authorData = authorDoc.data();
    
    // Get space information
    const spaceDoc = await db.collection('spaces').doc(spaceId).get();
    const spaceData = spaceDoc.data();
    
    // Notify space members (except author)
    const membersSnapshot = await db
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .where('notifications', '==', true)
      .get();
    
    const notificationPromises = membersSnapshot.docs
      .filter(doc => doc.id !== postData.authorId)
      .map(async (memberDoc) => {
        const memberId = memberDoc.id;
        
        // Create notification
        return db
          .collection('users')
          .doc(memberId)
          .collection('notifications')
          .add({
            type: 'new_post',
            title: `New post in ${spaceData?.name || 'space'}`,
            message: `${authorData?.displayName || 'Someone'} posted: "${postData.content.substring(0, 100)}..."`,
            metadata: {
              spaceId,
              postId,
              authorId: postData.authorId,
              authorName: authorData?.displayName,
              authorAvatar: authorData?.photoURL
            },
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            read: false
          });
      });
    
    await Promise.all(notificationPromises);
    
    // Update space activity metrics
    await db.collection('spaces').doc(spaceId).update({
      lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),
      totalPosts: admin.firestore.FieldValue.increment(1),
      'metrics.dailyPosts': admin.firestore.FieldValue.increment(1)
    });
    
    // Update user activity metrics
    await db.collection('users').doc(postData.authorId).update({
      'stats.totalPosts': admin.firestore.FieldValue.increment(1),
      lastPostAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Check for coordination keywords and tag appropriately
    const coordinationKeywords = ['study', 'ride', 'food', 'help', 'need', 'anyone', 'join'];
    const content = postData.content.toLowerCase();
    
    if (coordinationKeywords.some(keyword => content.includes(keyword))) {
      // Tag as coordination post
      await snapshot.ref.update({
        tags: admin.firestore.FieldValue.arrayUnion('coordination'),
        priority: 'high'
      });
      
      // Add to coordination feed
      await db.collection('coordination').add({
        postId,
        spaceId,
        authorId: postData.authorId,
        content: postData.content,
        type: detectCoordinationType(content),
        status: 'active',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      });
    }
    
    // Check for mentions and notify mentioned users
    const mentions = extractMentions(postData.content);
    if (mentions.length > 0) {
      const mentionPromises = mentions.map(async (handle) => {
        // Find user by handle
        const userSnapshot = await db
          .collection('users')
          .where('handle', '==', handle)
          .limit(1)
          .get();
        
        if (!userSnapshot.empty) {
          const mentionedUserId = userSnapshot.docs[0].id;
          
          // Create mention notification
          return db
            .collection('users')
            .doc(mentionedUserId)
            .collection('notifications')
            .add({
              type: 'mention',
              title: 'You were mentioned',
              message: `${authorData?.displayName || 'Someone'} mentioned you in a post`,
              metadata: {
                spaceId,
                postId,
                authorId: postData.authorId
              },
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
              read: false
            });
        }
      });
      
      await Promise.all(mentionPromises);
    }
    
    console.log(`Post onCreate trigger completed for post ${postId} in space ${spaceId}`);
  } catch (error) {
    console.error('Error in post onCreate trigger:', error);
    throw error;
  }
}

function detectCoordinationType(content: string): string {
  if (content.includes('study') || content.includes('homework') || content.includes('exam')) {
    return 'study';
  }
  if (content.includes('ride') || content.includes('drive') || content.includes('carpool')) {
    return 'ride';
  }
  if (content.includes('food') || content.includes('eat') || content.includes('lunch') || content.includes('dinner')) {
    return 'food';
  }
  if (content.includes('help') || content.includes('need')) {
    return 'help';
  }
  return 'general';
}

function extractMentions(content: string): string[] {
  const mentionRegex = /@([a-zA-Z0-9_]+)/g;
  const mentions: string[] = [];
  let match;
  
  while ((match = mentionRegex.exec(content)) !== null) {
    mentions.push(match[1]);
  }
  
  return mentions;
}