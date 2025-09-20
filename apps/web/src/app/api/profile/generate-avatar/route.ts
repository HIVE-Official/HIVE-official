import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';

// In-memory store for development mode profile data (shared with profile route)
const devProfileStore: Record<string, any> = {};

export const POST = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  const userId = getUserId(request);
    
    // Handle development mode
    if (userId === 'test-user') {
      
      // Generate a random avatar using DiceBear API
      const styles = ['avataaars', 'big-smile', 'adventurer', 'personas', 'miniavs'];
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      const randomSeed = Date.now() + Math.random();
      
      const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
      
      // Store the avatar URL in development profile store
      devProfileStore[userId] = {
        ...devProfileStore[userId],
        avatarUrl,
        profilePhoto: avatarUrl,
      };
      
      logger.info('Development mode: Generated avatar URL', { data: avatarUrl, endpoint: '/api/profile/generate-avatar' });
      logger.info('Stored in dev profile store', { data: devProfileStore[userId], endpoint: '/api/profile/generate-avatar' });
      
      return respond.success({
        message: 'Avatar generated successfully (development mode)',
        avatarUrl
      });
    }

    // Generate avatar and save to Firebase
    const styles = ['avataaars', 'big-smile', 'adventurer', 'personas', 'miniavs'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Date.now() + Math.random();
    
    const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
    
    // Update user profile in Firebase with new avatar
    try {
      const { dbAdmin } = await import('@/lib/firebase-admin');
      await dbAdmin.collection('users').doc(userId).update({
        avatarUrl,
        profilePhoto: avatarUrl,
        updatedAt: new Date().toISOString()
      });
      
      logger.info('✅ Avatar saved to Firebase', { userId });
    } catch (firebaseError) {
      logger.error('Failed to save avatar to Firebase', { userId });
      // Continue anyway - avatar generation succeeded even if saving failed
    }
    
    return respond.success({
      message: 'Avatar generated and saved successfully',
      avatarUrl
    });

});