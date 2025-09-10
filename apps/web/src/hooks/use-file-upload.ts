'use client';

import { useState, useCallback } from 'react';

interface UploadResult {
  success: boolean;
  fileId?: string;
  url?: string;
  fileName?: string;
  fileType?: string;
  fileSize?: number;
  isImage?: boolean;
  error?: string;
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (
    file: File,
    context?: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(null);

    try {
      // Validate file size (10MB limit)
      const MAX_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'text/plain',
        'application/json'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Allowed: images, PDF, text, JSON');
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      if (context) {
        formData.append('context', context);
      }
      formData.append('type', file.type.startsWith('image/') ? 'image' : 'document');

      // Upload with progress tracking
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = {
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((event.loaded / event.total) * 100)
          };
          setUploadProgress(progress);
          onProgress?.(progress);
        }
      });

      // Create promise for XHR
      const uploadPromise = new Promise<UploadResult>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              reject(new Error('Invalid response from server'));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error during upload'));
        };

        xhr.onabort = () => {
          reject(new Error('Upload cancelled'));
        };
      });

      // Start upload
      xhr.open('POST', '/api/upload');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send(formData);

      const result = await uploadPromise;

      if (!result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  }, []);

  const uploadMultiple = useCallback(async (
    files: File[],
    context?: string,
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<UploadResult[]> => {
    const results: UploadResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const result = await uploadFile(
        files[i],
        context,
        (progress) => onProgress?.(i, progress)
      );
      results.push(result);
    }

    return results;
  }, [uploadFile]);

  const deleteFile = useCallback(async (fileId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/upload?fileId=${fileId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Failed to delete file:', error);
      return false;
    }
  }, []);

  return {
    uploadFile,
    uploadMultiple,
    deleteFile,
    isUploading,
    uploadProgress,
    error
  };
}

// Hook for image-specific uploads with preview
export function useImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const { uploadFile, ...rest } = useFileUpload();

  const uploadImage = useCallback(async (
    file: File,
    context?: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> => {
    // Validate image
    if (!file.type.startsWith('image/')) {
      return {
        success: false,
        error: 'File must be an image'
      };
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    return uploadFile(file, context, onProgress);
  }, [uploadFile]);

  const clearPreview = useCallback(() => {
    setPreview(null);
  }, []);

  return {
    ...rest,
    uploadImage,
    preview,
    clearPreview
  };
}

// Hook for avatar upload with cropping support
export function useAvatarUpload() {
  const { uploadImage, preview, clearPreview, ...rest } = useImageUpload();

  const uploadAvatar = useCallback(async (
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> => {
    // Validate image dimensions and size
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB for avatars
    if (file.size > MAX_SIZE) {
      return {
        success: false,
        error: 'Avatar image must be less than 5MB'
      };
    }

    // Upload with 'profile' context
    return uploadImage(file, 'profile', onProgress);
  }, [uploadImage]);

  return {
    ...rest,
    uploadAvatar,
    preview,
    clearPreview
  };
}