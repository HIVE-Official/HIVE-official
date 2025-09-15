import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  uploadBytesResumable,
  UploadTask,
  UploadTaskSnapshot,
  StorageError
} from 'firebase/storage';
import { storage } from './firebase';

// Upload progress callback type
type UploadProgressCallback = (progress: number) => void;

/**
 * Upload an image to Firebase Storage
 */
export async function uploadImage(
  file: File,
  path: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  try {
    // Validate file
    if (!file) throw new Error('No file provided');
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      throw new Error('Image must be less than 5MB');
    }

    // Create storage reference
    const storageRef = ref(storage, path);

    if (onProgress) {
      // Upload with progress tracking
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot: UploadTaskSnapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error: StorageError) => {
            console.error('Upload error:', error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } else {
      // Simple upload
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Upload multiple images
 */
export async function uploadImages(
  files: File[],
  basePath: string,
  onProgress?: (totalProgress: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  const progressMap = new Map<number, number>();

  const updateTotalProgress = () => {
    if (onProgress) {
      const total = Array.from(progressMap.values()).reduce((a, b) => a + b, 0);
      onProgress(total / files.length);
    }
  };

  const uploadPromises = files.map(async (file, index) => {
    const path = `${basePath}/${Date.now()}_${index}_${file.name}`;
    const url = await uploadImage(file, path, (progress) => {
      progressMap.set(index, progress);
      updateTotalProgress();
    });
    return url;
  });

  return Promise.all(uploadPromises);
}

/**
 * Upload a post image
 */
export async function uploadPostImage(
  file: File,
  userId: string,
  spaceId: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const timestamp = Date.now();
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `posts/${spaceId}/${userId}/${timestamp}_${sanitizedFileName}`;
  
  return uploadImage(file, path, onProgress);
}

/**
 * Upload multiple post images
 */
export async function uploadPostImages(
  files: File[],
  userId: string,
  spaceId: string,
  onProgress?: UploadProgressCallback
): Promise<string[]> {
  const basePath = `posts/${spaceId}/${userId}`;
  return uploadImages(files, basePath, onProgress);
}

/**
 * Upload a profile avatar
 */
export async function uploadAvatar(
  file: File,
  userId: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const path = `avatars/${userId}/avatar_${Date.now()}.jpg`;
  return uploadImage(file, path, onProgress);
}

/**
 * Upload a space banner
 */
export async function uploadSpaceBanner(
  file: File,
  spaceId: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const path = `spaces/${spaceId}/banner_${Date.now()}.jpg`;
  return uploadImage(file, path, onProgress);
}

/**
 * Delete an image from storage
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    // Extract path from URL
    const urlObj = new URL(url);
    const path = decodeURIComponent(
      urlObj.pathname.split('/o/')[1].split('?')[0]
    );
    
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Compress image before upload
 */
export async function compressImage(
  file: File,
  maxWidth = 1920,
  maxHeight = 1080,
  quality = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e: any) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        
        // Calculate new dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob: any) => {
            if (!blob) {
              reject(new Error('Failed to compress image'));
              return;
            }
            
            const compressedFile = new File(
              [blob],
              file.name,
              { type: 'image/jpeg' }
            );
            
            resolve(compressedFile);
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Generate a thumbnail URL by appending size parameters
 */
export function getThumbnailUrl(
  originalUrl: string,
  width = 200,
  height = 200
): string {
  // For Firebase Storage, we'd typically use a Cloud Function
  // to generate thumbnails. For now, return original URL
  // TODO: Implement thumbnail generation with Cloud Functions
  return originalUrl;
}

/**
 * Check if a URL is from Firebase Storage
 */
export function isFirebaseStorageUrl(url: string): boolean {
  return url.includes('firebasestorage.googleapis.com');
}

/**
 * Get file metadata from storage URL
 */
export async function getFileMetadata(url: string): Promise<{
  size: number;
  contentType: string;
  updated: Date;
} | null> {
  try {
    if (!isFirebaseStorageUrl(url)) return null;
    
    // Extract path from URL
    const urlObj = new URL(url);
    const path = decodeURIComponent(
      urlObj.pathname.split('/o/')[1].split('?')[0]
    );
    
    const storageRef = ref(storage, path);
    // Note: getMetadata is not directly available in v9
    // Would need to implement with Cloud Functions
    
    return null; // Placeholder
  } catch (error) {
    console.error('Error getting file metadata:', error);
    return null;
  }
}