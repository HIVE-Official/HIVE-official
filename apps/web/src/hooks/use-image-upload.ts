import { useState } from 'react';
import { logger } from '@/lib/logger';

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';

interface UploadProgress {
  percentage: number;
  bytesTransferred: number;
  totalBytes: number;
}

interface UseImageUploadReturn {
  uploadImage: (file: File, path?: string) => Promise<string>;
  uploadMultipleImages: (files: File[], path?: string) => Promise<string[]>;
  deleteImage: (url: string) => Promise<void>;
  isUploading: boolean;
  progress: UploadProgress | null;
  error: Error | null;
}

export function useImageUpload(): UseImageUploadReturn {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const compressImage = async (file: File, maxWidth: number = 1920, maxHeight: number = 1080): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
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
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            file.type,
            0.85 // Quality
          );
        };
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };

  const uploadImage = async (file: File, path?: string): Promise<string> => {
    if (!user) {
      throw new Error('Must be logged in to upload images');
    }

    setIsUploading(true);
    setError(null);
    setProgress(null);

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Image size must be less than 10MB');
      }

      // Compress image if it's too large
      let imageToUpload: Blob = file;
      if (file.size > 1 * 1024 * 1024) { // If larger than 1MB, compress
        imageToUpload = await compressImage(file);
      }

      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const fileName = `${timestamp}_${sanitizedName}`;
      const fullPath = path ? `${path}/${fileName}` : `uploads/${user.uid}/${fileName}`;

      // Create storage reference
      const storageRef = ref(storage, fullPath);

      // Upload file
      setProgress({ percentage: 0, bytesTransferred: 0, totalBytes: imageToUpload.size });
      const snapshot = await uploadBytes(storageRef, imageToUpload, {
        contentType: file.type,
        customMetadata: {
          uploadedBy: user.uid,
          originalName: file.name,
          uploadedAt: new Date().toISOString()
        }
      });

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setProgress({ percentage: 100, bytesTransferred: snapshot.metadata.size || 0, totalBytes: snapshot.metadata.size || 0 });
      
      return downloadURL;
    } catch (err) {
      logger.error('Error uploading image:', { error: String(err) });
      setError(err as Error);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultipleImages = async (files: File[], path?: string): Promise<string[]> => {
    if (!user) {
      throw new Error('Must be logged in to upload images');
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = files.map(file => uploadImage(file, path));
      const urls = await Promise.all(uploadPromises);
      return urls;
    } catch (err) {
      logger.error('Error uploading multiple images:', { error: String(err) });
      setError(err as Error);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (url: string): Promise<void> => {
    if (!user) {
      throw new Error('Must be logged in to delete images');
    }

    try {
      // Extract the path from the URL
      const urlObj = new URL(url);
      const pathMatch = urlObj.pathname.match(/\/o\/(.+?)\?/);
      if (!pathMatch) {
        throw new Error('Invalid image URL');
      }

      const path = decodeURIComponent(pathMatch[1]);
      const storageRef = ref(storage, path);

      await deleteObject(storageRef);
    } catch (err) {
      logger.error('Error deleting image:', { error: String(err) });
      throw err;
    }
  };

  return {
    uploadImage,
    uploadMultipleImages,
    deleteImage,
    isUploading,
    progress,
    error
  };
}