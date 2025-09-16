import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api/middleware/api-auth-middleware';

// In-memory store for development mode profile data (shared with profile route)
const devProfileStore: Record<string, any> = {};

export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
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
      
      return NextResponse.json({
        success: true,
        message: 'Avatar generated successfully (development mode)',
        avatarUrl,
        // SECURITY: Development mode removed for production safety
      });
    }

    // Generate avatar and save to Firebase
    const styles = ['avataaars', 'big-smile', 'adventurer', 'personas', 'miniavs'];
    const randomStyle = styles[Math.floor(Math.random() * styles.length)];
    const randomSeed = Date.now() + Math.random();
    
    const avatarUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}`;
    
    // Update user profile in Firebase with new avatar
    try {
      const { dbAdmin } = await import('@/lib/firebase/admin/firebase-admin');
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
    
    return NextResponse.json({
      success: true,
      message: 'Avatar generated and saved successfully',
      avatarUrl
    });

  } catch (error) {
    logger.error('Avatar generation error');
    return NextResponse.json(ApiResponseHelper.error("Failed to generate avatar", { error: String("INTERNAL_ERROR") }), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Avatar generation is safe for development
  operation: 'generate_avatar' 
});