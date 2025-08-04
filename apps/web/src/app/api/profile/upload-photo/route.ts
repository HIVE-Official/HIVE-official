import { NextRequest, NextResponse } from 'next/server';
import { getStorage } from 'firebase-admin/storage';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

// In-memory store for development mode profile data (shared with profile route)
const devProfileStore: Record<string, any> = {};

export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    const formData = await request.formData();
    const file = formData.get('photo') as File;

    if (!file) {
      return NextResponse.json(ApiResponseHelper.error("No photo file provided", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
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
      
      logger.info('Development mode: Photo upload simulated for file', { data: file.name, endpoint: '/api/profile/upload-photo' });
      
      return NextResponse.json({
        success: true,
        message: 'Photo uploaded successfully (development mode)',
        avatarUrl,
        developmentMode: true
      });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(ApiResponseHelper.error("Invalid file type. Only JPEG, PNG, and WebP are allowed.", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(ApiResponseHelper.error("File too large. Maximum size is 5MB.", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
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
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      avatarUrl: downloadURL,
      message: 'Profile photo updated successfully'
    });

  } catch (error) {
    logger.error('Photo upload error', { error: error, endpoint: '/api/profile/upload-photo' });
    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Allow for photo uploads but with secure auth
  operation: 'upload_profile_photo' 
});