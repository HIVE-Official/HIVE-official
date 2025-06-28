import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { logger } from '@hive/core';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `avatars/${userId}.${fileExtension}`;

    // Upload to Firebase Storage
    const storage = getStorage();
    const bucket = storage.bucket();
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const firebaseFile = bucket.file(fileName);
    await firebaseFile.save(fileBuffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          uploadedBy: userId,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    // Make the file publicly accessible
    await firebaseFile.makePublic();

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    logger.info(`Avatar uploaded successfully for user ${userId}`);

    return NextResponse.json({
      success: true,
      avatarUrl: publicUrl,
      message: 'Avatar uploaded successfully',
    });

  } catch (error) {
    logger.error('Avatar upload error:', error);

    if (error instanceof Error && 'code' in error) {
      const authError = error as { code: string };
      if (authError.code === 'auth/id-token-expired') {
        return NextResponse.json(
          { error: 'Token expired' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to upload avatar' },
      { status: 500 }
    );
  }
} 