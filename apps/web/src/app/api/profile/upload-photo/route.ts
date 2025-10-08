import { getStorage } from 'firebase-admin/storage';
import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware/index';

// In-memory store for development mode profile data (shared with profile route)
const devProfileStore: Record<string, any> = {};

export const POST = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  context,
  respond
) => {
  const userId = getUserId(request);

    const formData = await request.formData();
    const file = formData.get('photo') as File;

    if (!file) {
      return respond.error("No photo file provided", "INVALID_INPUT", { status: 400 });
    }

    // Handle development mode
    if (userId === 'test-user' || userId === 'dev_user_123') {
      // In development, simulate successful upload with a unique URL
      const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`;
      
      // Store the avatar URL in development profile store
      devProfileStore[userId] = {
        ...devProfileStore[userId],
        avatarUrl,
        profilePhoto: avatarUrl,
      };
      
      logger.info('Development mode: Photo upload simulated for file', {
        fileData: { filename: file.name, action: 'upload' as const },
        endpoint: '/api/profile/upload-photo'
      });
      
      return respond.success({
        message: 'Photo uploaded successfully (development mode)',
        avatarUrl
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return respond.error("Invalid file type. Only JPEG, PNG, and WebP are allowed.", "INVALID_INPUT", { status: 400 });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return respond.error("File too large. Maximum size is 5MB.", "INVALID_INPUT", { status: 400 });
    }

    // Upload to Firebase Storage (Admin SDK)
    const storage = getStorage();
    const bucket = storage.bucket();
    const fileName = `profile-photos/${userId}/${Date.now()}-${file.name}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    
    // Upload file to Firebase Storage
    const fileRef = bucket.file(fileName);
    await fileRef.save(fileBuffer, {
      metadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000', // 1 year cache
      },
    });

    // Make file publicly accessible
    await fileRef.makePublic();

    // Get download URL
    const downloadURL = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Update user document with new avatar URL
    const userRef = dbAdmin.collection('users').doc(userId);
    await userRef.update({
      avatarUrl: downloadURL,
      profilePhoto: downloadURL, // For compatibility
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return respond.success({
      avatarUrl: downloadURL,
      message: 'Profile photo updated successfully'
    });

});