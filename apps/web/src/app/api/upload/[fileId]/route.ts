import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api-auth-middleware';
import { storage as adminStorage } from '@/lib/firebase-admin';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { FieldValue } from 'firebase-admin/firestore';

/**
 * Get file information and metadata
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;
    
    // Get file document from Firestore
    const fileDoc = await dbAdmin.collection('uploads').doc(fileId).get();
    
    if (!fileDoc.exists) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const fileData = fileDoc.data()!;
    
    // Check visibility and permissions
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (fileData.visibility === 'private') {
      // For private files, check if user owns the file or has access token
      const userHeader = request.headers.get('x-user-id');
      if (fileData.uploadedBy !== userHeader && fileData.accessToken !== token) {
        return NextResponse.json(
          { error: 'Unauthorized access' },
          { status: 403 }
        );
      }
    }

    // Log access
    await logFileAccess(fileId, 'metadata', request);

    // Update last accessed time
    await dbAdmin.collection('uploads').doc(fileId).update({
      lastAccessed: FieldValue.serverTimestamp()
    });

    return NextResponse.json({
      file: {
        id: fileDoc.id,
        ...fileData
      }
    });

  } catch (error) {
    logger.error('Failed to get file info', { error, fileId: (await params).fileId });
    return NextResponse.json(
      { error: 'Failed to get file information' },
      { status: 500 }
    );
  }
}

/**
 * Update file metadata or settings
 */
export const PUT = withAuth(async (request: NextRequest, authContext, { params }: { params: Promise<{ fileId: string }> }) => {
  try {
    const { fileId } = await params;
    const updates = await request.json();
    
    // Get current file data
    const fileDoc = await dbAdmin.collection('uploads').doc(fileId).get();
    
    if (!fileDoc.exists) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const fileData = fileDoc.data()!;
    
    // Check ownership
    if (fileData.uploadedBy !== authContext.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    // Allowed updates
    const allowedUpdates: any = {};
    if (updates.description !== undefined) allowedUpdates.description = updates.description;
    if (updates.tags !== undefined) allowedUpdates.tags = updates.tags;
    if (updates.visibility !== undefined && ['public', 'authenticated', 'private'].includes(updates.visibility)) {
      allowedUpdates.visibility = updates.visibility;
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    allowedUpdates.updatedAt = FieldValue.serverTimestamp();

    await dbAdmin.collection('uploads').doc(fileId).update(allowedUpdates);

    logger.info('File updated', { fileId, userId: authContext.userId, updates: Object.keys(allowedUpdates) });

    return NextResponse.json({
      success: true,
      fileId,
      updates: allowedUpdates
    });

  } catch (error) {
    logger.error('Failed to update file', { error, fileId: (await params).fileId });
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    );
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'update_file'
});

/**
 * Delete file and all associated data
 */
export const DELETE = withAuth(async (request: NextRequest, authContext, { params }: { params: Promise<{ fileId: string }> }) => {
  try {
    const { fileId } = await params;
    
    // Get file data
    const fileDoc = await dbAdmin.collection('uploads').doc(fileId).get();
    
    if (!fileDoc.exists) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const fileData = fileDoc.data()!;
    
    // Check ownership
    if (fileData.uploadedBy !== authContext.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const bucket = adminStorage.bucket();

    // Delete main file
    if (fileData.storageLocation) {
      try {
        await bucket.file(fileData.storageLocation).delete();
      } catch (error) {
        logger.warn('Failed to delete main file from storage', { 
          error, 
          fileId, 
          storageLocation: fileData.storageLocation 
        });
      }
    }

    // Delete thumbnails
    if (fileData.metadata?.processedVersions) {
      for (const version of fileData.metadata.processedVersions) {
        try {
          // Extract path from URL or construct it
          const thumbPath = `${fileData.storageLocation?.replace(/\/[^/]+$/, '')}/thumbs/${fileId}_${version.version.replace('thumb_', '')}.jpg`;
          await bucket.file(thumbPath).delete();
        } catch (error) {
          logger.warn('Failed to delete thumbnail', { error, fileId, version: version.version });
        }
      }
    }

    // Mark file as deleted in Firestore (soft delete)
    await dbAdmin.collection('uploads').doc(fileId).update({
      status: 'cancelled',
      deletedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    // Update user quota
    await updateUserQuotaOnDelete(authContext.userId, fileData.metadata?.size || 0);

    logger.info('File deleted', { fileId, userId: authContext.userId });

    return NextResponse.json({
      success: true,
      fileId,
      message: 'File deleted successfully'
    });

  } catch (error) {
    logger.error('Failed to delete file', { error, fileId: (await params).fileId });
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'delete_file'
});

/**
 * Get signed download URL for file
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    const { fileId } = await params;
    const { action = 'view' } = await request.json();
    
    // Get file document
    const fileDoc = await dbAdmin.collection('uploads').doc(fileId).get();
    
    if (!fileDoc.exists) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const fileData = fileDoc.data()!;
    
    // Check visibility and access
    if (fileData.visibility === 'private') {
      const userHeader = request.headers.get('x-user-id');
      const { token } = await request.json();
      
      if (fileData.uploadedBy !== userHeader && fileData.accessToken !== token) {
        return NextResponse.json(
          { error: 'Unauthorized access' },
          { status: 403 }
        );
      }
    }

    if (!fileData.storageLocation) {
      return NextResponse.json(
        { error: 'File storage location not found' },
        { status: 404 }
      );
    }

    const bucket = adminStorage.bucket();
    const file = bucket.file(fileData.storageLocation);

    // Generate signed URL
    const expireTime = Date.now() + 60 * 60 * 1000; // 1 hour
    const [url] = await file.getSignedUrl({
      action: action === 'download' ? 'read' : 'read',
      expires: expireTime,
      responseDisposition: action === 'download' 
        ? `attachment; filename="${fileData.metadata?.originalName || 'download'}"` 
        : undefined
    });

    // Log access
    await logFileAccess(fileId, action as any, request);

    // Update download count if this is a download
    if (action === 'download') {
      await dbAdmin.collection('uploads').doc(fileId).update({
        downloads: FieldValue.increment(1),
        lastAccessed: FieldValue.serverTimestamp()
      });
    }

    return NextResponse.json({
      url,
      expiresAt: new Date(expireTime).toISOString(),
      action
    });

  } catch (error) {
    logger.error('Failed to generate file URL', { error, fileId: (await params).fileId });
    return NextResponse.json(
      { error: 'Failed to generate file URL' },
      { status: 500 }
    );
  }
}

// Helper function to log file access
async function logFileAccess(
  fileId: string,
  accessType: 'view' | 'download' | 'thumbnail' | 'metadata',
  request: NextRequest
): Promise<void> {
  try {
    await dbAdmin.collection('fileAccessLogs').add({
      fileId,
      accessType,
      accessedBy: request.headers.get('x-user-id') || null,
      userAgent: request.headers.get('user-agent') || null,
      referrer: request.headers.get('referer') || null,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
      responseCode: 200,
      bytesTransferred: 0, // This would be set after response
      createdAt: FieldValue.serverTimestamp()
    });
  } catch (error) {
    logger.error('Failed to log file access', { error, fileId, accessType });
  }
}

// Helper function to update user quota on delete
async function updateUserQuotaOnDelete(userId: string, fileSize: number): Promise<void> {
  try {
    const quotaRef = dbAdmin.collection('userQuotas').doc(userId);
    
    await dbAdmin.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(quotaRef);
      
      if (doc.exists) {
        const currentQuota = doc.data()!;
        
        transaction.update(quotaRef, {
          usedStorage: Math.max(0, (currentQuota.usedStorage || 0) - fileSize),
          usedFiles: Math.max(0, (currentQuota.usedFiles || 0) - 1),
          updatedAt: FieldValue.serverTimestamp()
        });
      }
    });
    
  } catch (error) {
    logger.error('Failed to update user quota on delete', { error, userId });
  }
}