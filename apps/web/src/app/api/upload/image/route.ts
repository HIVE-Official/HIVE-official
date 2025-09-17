import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
import { storage as adminStorage } from '@/lib/firebase/admin/firebase-admin';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';
import { FieldValue } from 'firebase-admin/firestore';
import sharp from 'sharp';
import crypto from 'crypto';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const THUMBNAIL_SIZES = [150, 300, 600]; // Small, medium, large thumbnails

interface UploadConfig {
  purpose: 'avatar' | 'cover_photo' | 'post_attachment' | 'tool_asset' | 'space_banner' | 'event_image' | 'profile_media' | 'general_upload';
  generateThumbnails?: boolean;
  compressImages?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  visibility?: 'public' | 'authenticated' | 'private';
}

/**
 * Upload image with processing and optimization
 */
export const POST = withAuth(async (request: NextRequest, authContext) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const configStr = formData.get('config') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Parse upload configuration
    const config: UploadConfig = configStr ? JSON.parse(configStr) : {
      purpose: 'general_upload',
      generateThumbnails: true,
      compressImages: true,
      quality: 85,
      visibility: 'authenticated'
    };

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type. Allowed types: ${ALLOWED_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size: ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Generate unique file ID and paths
    const fileId = `img_${Date.now()}_${crypto.randomUUID().split('-')[0]}`;
    const userId = authContext.userId;
    const timestamp = Date.now();
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get image metadata
    const metadata = await sharp(buffer).metadata();
    const originalDimensions = {
      width: metadata.width || 0,
      height: metadata.height || 0
    };

    // Calculate checksum
    const checksum = crypto.createHash('sha256').update(buffer).digest('hex');

    // Process image based on configuration
    let processedBuffer = buffer;
    let finalDimensions = originalDimensions;

    if (config.compressImages) {
      const sharpInstance = sharp(buffer);
      
      // Resize if max dimensions specified
      if (config.maxWidth || config.maxHeight) {
        sharpInstance.resize(config.maxWidth, config.maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      // Apply compression based on format
      if (file.type === 'image/jpeg') {
        sharpInstance.jpeg({ quality: config.quality || 85, progressive: true });
      } else if (file.type === 'image/png') {
        sharpInstance.png({ compressionLevel: 6, progressive: true });
      } else if (file.type === 'image/webp') {
        sharpInstance.webp({ quality: config.quality || 85 });
      }

      processedBuffer = await sharpInstance.toBuffer();
      const processedMetadata = await sharp(processedBuffer).metadata();
      finalDimensions = {
        width: processedMetadata.width || 0,
        height: processedMetadata.height || 0
      };
    }

    // Define storage paths
    const basePath = `uploads/${userId}/${config.purpose}`;
    const fileName = `${fileId}.${getFileExtension(file.type)}`;
    const mainImagePath = `${basePath}/${fileName}`;

    // Upload main image
    const bucket = adminStorage.bucket();
    const mainFile = bucket.file(mainImagePath);
    
    await mainFile.save(processedBuffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          uploadedBy: userId,
          originalName: file.name,
          purpose: config.purpose,
          checksum,
          uploadedAt: new Date().toISOString()
        }
      }
    });

    // Generate thumbnails if requested
    const processedVersions: Array<{
      version: string;
      url: string;
      size: number;
      dimensions?: { width: number; height: number };
    }> = [];

    if (config.generateThumbnails) {
      for (const size of THUMBNAIL_SIZES) {
        const thumbnailBuffer = await sharp(buffer)
          .resize(size, size, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toBuffer();

        const thumbnailPath = `${basePath}/thumbs/${fileId}_${size}.jpg`;
        const thumbnailFile = bucket.file(thumbnailPath);

        await thumbnailFile.save(thumbnailBuffer, {
          metadata: {
            contentType: 'image/jpeg',
            metadata: {
              thumbnailSize: size.toString(),
              originalFileId: fileId,
              createdAt: new Date().toISOString()
            }
          }
        });

        // Get thumbnail metadata
        const thumbMeta = await sharp(thumbnailBuffer).metadata();
        
        processedVersions.push({
          version: `thumb_${size}`,
          url: await thumbnailFile.getSignedUrl({
            action: 'read',
            expires: Date.now() + 365 * 24 * 60 * 60 * 1000 // 1 year
          }).then(urls => urls[0]),
          size: thumbnailBuffer.length,
          dimensions: {
            width: thumbMeta.width || size,
            height: thumbMeta.height || size
          }
        });
      }
    }

    // Get signed URL for main image
    const [mainImageUrl] = await mainFile.getSignedUrl({
      action: 'read',
      expires: Date.now() + 365 * 24 * 60 * 60 * 1000 // 1 year
    });

    // Create file record in Firestore
    const fileRecord = {
      id: fileId,
      uploadId: crypto.randomUUID(),
      status: 'completed',
      metadata: {
        filename: fileName,
        originalName: file.name,
        mimeType: file.type,
        size: processedBuffer.length,
        dimensions: finalDimensions,
        checksum,
        verified: true,
        processedVersions
      },
      type: getFileType(file.type),
      purpose: config.purpose,
      url: mainImageUrl,
      storageLocation: mainImagePath,
      uploadedBy: userId,
      visibility: config.visibility || 'authenticated',
      downloads: 0,
      tags: [],
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    };

    await dbAdmin.collection('uploads').doc(fileId).set(fileRecord);

    // Update user's upload quota
    await updateUserQuota(userId, processedBuffer.length);

    // Log the upload
    logger.info('Image uploaded successfully', {
      fileId,
      userId,
      purpose: config.purpose,
      originalSize: file.size,
      processedSize: processedBuffer.length,
      dimensions: finalDimensions,
      thumbnailCount: processedVersions.length
    });

    return NextResponse.json({
      success: true,
      file: {
        id: fileId,
        url: mainImageUrl,
        metadata: {
          filename: fileName,
          originalName: file.name,
          size: processedBuffer.length,
          dimensions: finalDimensions,
          mimeType: file.type
        },
        thumbnails: processedVersions,
        purpose: config.purpose
      }
    });

  } catch (error) {
    logger.error('Image upload failed', { error });
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'upload_image'
});

/**
 * Get upload session info and quotas
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    // Get user's current quota
    const quotaDoc = await dbAdmin.collection('userQuotas').doc(userId).get();
    const quota = quotaDoc.exists ? quotaDoc.data() : {
      maxStorage: 100 * 1024 * 1024, // 100MB default
      maxFiles: 1000,
      maxDailyUploads: 50,
      usedStorage: 0,
      usedFiles: 0,
      dailyUploads: 0
    };

    // Get recent uploads
    const recentUploadsSnapshot = await dbAdmin
      .collection('uploads')
      .where('uploadedBy', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const recentUploads = recentUploadsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      quota,
      recentUploads,
      limits: {
        maxFileSize: MAX_FILE_SIZE,
        allowedTypes: ALLOWED_TYPES,
        thumbnailSizes: THUMBNAIL_SIZES
      }
    });

  } catch (error) {
    logger.error('Failed to get upload info', { error });
    return NextResponse.json(
      { error: 'Failed to get upload information' },
      { status: 500 }
    );
  }
}, { 
  allowDevelopmentBypass: false,
  operation: 'get_upload_info'
});

// Helper functions
function getFileExtension(mimeType: string): string {
  const extensions = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif'
  };
  return extensions[mimeType as keyof typeof extensions] || 'jpg';
}

function getFileType(mimeType: string): 'image' | 'video' | 'audio' | 'document' | 'archive' | 'code' | 'other' {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  return 'other';
}

async function updateUserQuota(userId: string, uploadSize: number): Promise<void> {
  try {
    const quotaRef = dbAdmin.collection('userQuotas').doc(userId);
    
    await dbAdmin.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(quotaRef);
      
      if (!doc.exists) {
        // Create new quota record
        transaction.set(quotaRef, {
          userId,
          maxStorage: 100 * 1024 * 1024, // 100MB default
          maxFiles: 1000,
          maxDailyUploads: 50,
          usedStorage: uploadSize,
          usedFiles: 1,
          dailyUploads: 1,
          dailyResetAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          lastUpload: FieldValue.serverTimestamp(),
          quotaExceeded: false,
          updatedAt: FieldValue.serverTimestamp()
        });
      } else {
        const currentQuota = doc.data()!;
        const now = new Date();
        const resetTime = currentQuota.dailyResetAt?.toDate();
        
        // Reset daily counters if needed
        let dailyUploads = currentQuota.dailyUploads || 0;
        let dailyResetAt = resetTime;
        
        if (!resetTime || now > resetTime) {
          dailyUploads = 0;
          dailyResetAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        }
        
        // Update quota
        transaction.update(quotaRef, {
          usedStorage: (currentQuota.usedStorage || 0) + uploadSize,
          usedFiles: (currentQuota.usedFiles || 0) + 1,
          dailyUploads: dailyUploads + 1,
          dailyResetAt,
          lastUpload: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
      }
    });
    
  } catch (error) {
    logger.error('Failed to update user quota', { error, userId });
  }
}