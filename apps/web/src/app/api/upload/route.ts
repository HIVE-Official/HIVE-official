import { NextRequest, NextResponse } from 'next/server';
import { storageAdmin, dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/utils/structured-logger';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { z } from 'zod';
import crypto from 'crypto';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, 'application/pdf', 'text/plain', 'application/json'];

export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'general';
    const context = formData.get('context') as string; // e.g., 'profile', 'post', 'space'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    const fileType = file.type;
    const isImage = ALLOWED_IMAGE_TYPES.includes(fileType);
    
    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop();
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const timestamp = Date.now();
    const userId = authContext.userId;
    
    // Organize files by context and user
    const storagePath = `uploads/${context || 'general'}/${userId}/${timestamp}_${uniqueId}.${fileExtension}`;

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Firebase Storage
    const bucket = storageAdmin.bucket();
    const storageFile = bucket.file(storagePath);
    
    await storageFile.save(buffer, {
      metadata: {
        contentType: fileType,
        metadata: {
          uploadedBy: userId,
          originalName: file.name,
          context: context || 'general',
          timestamp: timestamp.toString()
        }
      },
      public: false, // Keep files private by default
      resumable: false
    });

    // Generate signed URL (expires in 7 days)
    const [signedUrl] = await storageFile.getSignedUrl({
      action: 'read',
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Store file metadata in Firestore
    const fileDoc = await dbAdmin.collection('uploads').add({
      userId,
      fileName: file.name,
      fileType,
      fileSize: file.size,
      storagePath,
      context: context || 'general',
      isImage,
      uploadedAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active'
    });

    logger.info('File uploaded successfully', {
      fileId: fileDoc.id,
      userId,
      fileName: file.name,
      fileSize: file.size,
      context
    });

    return NextResponse.json({
      success: true,
      fileId: fileDoc.id,
      url: signedUrl,
      fileName: file.name,
      fileType,
      fileSize: file.size,
      isImage,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    logger.error('File upload failed', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'upload_file'
});

// Delete uploaded file
export const DELETE = withAuth(async (request: NextRequest, authContext) => {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');

    if (!fileId) {
      return NextResponse.json(
        { success: false, error: 'File ID required' },
        { status: 400 }
      );
    }

    // Get file metadata
    const fileDoc = await dbAdmin.collection('uploads').doc(fileId).get();
    
    if (!fileDoc.exists) {
      return NextResponse.json(
        { success: false, error: 'File not found' },
        { status: 404 }
      );
    }

    const fileData = fileDoc.data();

    // Verify ownership
    if (fileData?.userId !== authContext.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Delete from Storage
    const bucket = storageAdmin.bucket();
    const file = bucket.file(fileData.storagePath);
    
    try {
      await file.delete();
    } catch (storageError) {
      logger.warn('Failed to delete file from storage', { 
        error: storageError, 
        storagePath: fileData.storagePath 
      });
    }

    // Mark as deleted in Firestore
    await fileDoc.ref.update({
      status: 'deleted',
      deletedAt: new Date()
    });

    logger.info('File deleted successfully', {
      fileId,
      userId: authContext.userId,
      fileName: fileData.fileName
    });

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    logger.error('File deletion failed', { error });
    return NextResponse.json(
      { success: false, error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}, {
  allowDevelopmentBypass: true,
  operation: 'delete_file'
});