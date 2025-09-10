'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Eye,
  Trash2,
  Download,
  Copy
} from 'lucide-react';
import { useImageUpload } from '@/hooks/use-image-upload';
import { logger } from '@/lib/logger';
import Image from 'next/image';

interface ImageUploadProps {
  onUpload?: (urls: string[]) => void;
  onError?: (error: Error) => void;
  maxFiles?: number;
  purpose?: 'avatar' | 'cover_photo' | 'post_attachment' | 'tool_asset' | 'space_banner' | 'event_image' | 'profile_media' | 'general_upload';
  className?: string;
  accept?: string;
  disabled?: boolean;
  showPreview?: boolean;
  compressImages?: boolean;
  generateThumbnails?: boolean;
  maxWidth?: number;
  maxHeight?: number;
}

interface UploadedFile {
  id: string;
  file: File;
  url?: string;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  progress: number;
  error?: string;
  metadata?: {
    size: number;
    dimensions?: { width: number; height: number };
    thumbnails?: Array<{ version: string; url: string }>;
  };
}

export function ImageUpload({
  onUpload,
  onError,
  maxFiles = 5,
  purpose = 'general_upload',
  className = '',
  accept = 'image/jpeg,image/png,image/webp,image/gif',
  disabled = false,
  showPreview = true,
  compressImages = true,
  generateThumbnails = true,
  maxWidth,
  maxHeight
}: ImageUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, isUploading: hookIsUploading, error: hookError } = useImageUpload();

  // Sync hook uploading state
  useEffect(() => {
    setIsUploading(hookIsUploading);
  }, [hookIsUploading]);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    // Check file limits
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      const error = new Error(`Maximum ${maxFiles} files allowed`);
      onError?.(error);
      return;
    }

    // Validate file types
    const allowedTypes = accept.split(',').map(type => type.trim());
    const invalidFiles = fileArray.filter(file => 
      !allowedTypes.some(type => file.type === type || file.name.toLowerCase().endsWith(type.replace('image/', '.')))
    );

    if (invalidFiles.length > 0) {
      const error = new Error(`Invalid file types: ${invalidFiles.map(f => f.name).join(', ')}`);
      onError?.(error);
      return;
    }

    // Create initial file entries
    const newFiles: UploadedFile[] = fileArray.map(file => ({
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      file,
      status: 'pending' as const,
      progress: 0
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Upload files sequentially to avoid overwhelming the system
    for (const uploadFile of newFiles) {
      try {
        setUploadedFiles(prev => 
          prev.map(f => f.id === uploadFile.id ? { ...f, status: 'uploading' } : f)
        );

        // Create form data for API upload
        const formData = new FormData();
        formData.append('file', uploadFile.file);
        formData.append('config', JSON.stringify({
          purpose,
          generateThumbnails,
          compressImages,
          maxWidth,
          maxHeight,
          quality: 85,
          visibility: 'authenticated'
        }));

        // Upload via API
        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const result = await response.json();

        setUploadedFiles(prev =>
          prev.map(f => f.id === uploadFile.id ? {
            ...f,
            status: 'completed' as const,
            progress: 100,
            url: result.file.url,
            metadata: {
              size: result.file.metadata.size,
              dimensions: result.file.metadata.dimensions,
              thumbnails: result.file.thumbnails
            }
          } : f)
        );

        logger.info('File uploaded successfully', { 
          fileId: result.file.id, 
          fileName: uploadFile.file.name,
          purpose 
        });

      } catch (error) {
        logger.error('Upload failed', { error, fileName: uploadFile.file.name });
        
        setUploadedFiles(prev =>
          prev.map(f => f.id === uploadFile.id ? {
            ...f,
            status: 'error' as const,
            error: error instanceof Error ? error.message : 'Upload failed'
          } : f)
        );

        onError?.(error instanceof Error ? error : new Error('Upload failed'));
      }
    }

    // Call onUpload with successful URLs
    const successfulUploads = uploadedFiles
      .filter(f => f.status === 'completed' && f.url)
      .map(f => f.url!);
    
    if (successfulUploads.length > 0) {
      onUpload?.(successfulUploads);
    }

  }, [uploadedFiles, maxFiles, accept, onError, onUpload, purpose, compressImages, generateThumbnails, maxWidth, maxHeight]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [disabled, handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFiles]);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const retryUpload = useCallback((fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (file && file.status === 'error') {
      handleFiles([file.file]);
      removeFile(fileId);
    }
  }, [uploadedFiles, handleFiles, removeFile]);

  const copyUrl = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      // You could add a toast notification here
      logger.info('URL copied to clipboard');
    } catch (error) {
      logger.error('Failed to copy URL', { error });
    }
  }, []);

  const openFile = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFile}
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer
          ${isDragOver 
            ? 'border-hive-primary bg-hive-primary/10' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}
          ${isUploading ? 'pointer-events-none' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          onChange={handleFileInput}
          disabled={disabled}
          className="hidden"
        />

        <div className="text-center">
          {isUploading ? (
            <div className="space-y-2">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-hive-primary" />
              <p className="text-sm font-medium text-gray-700">Uploading...</p>
            </div>
          ) : (
            <div className="space-y-2">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <div className="text-sm text-gray-600">
                <p className="font-medium">
                  {isDragOver ? 'Drop files here' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {accept.split(',').join(', ')} up to {maxFiles} files
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Progress and Preview */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Files ({uploadedFiles.length}/{maxFiles})
          </h4>
          
          <div className="space-y-3">
            {uploadedFiles.map((uploadFile) => (
              <div key={uploadFile.id} className="bg-white border rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  {/* Preview Thumbnail */}
                  {showPreview && uploadFile.status === 'completed' && uploadFile.url ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={uploadFile.url}
                        alt={uploadFile.file.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    </div>
                  )}

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {uploadFile.file.name}
                      </p>
                      
                      {/* Status Icon */}
                      <div className="flex items-center space-x-2">
                        {uploadFile.status === 'uploading' && (
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                        )}
                        {uploadFile.status === 'completed' && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {uploadFile.status === 'error' && (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-1">
                          {uploadFile.status === 'completed' && uploadFile.url && (
                            <>
                              <button
                                onClick={() => window.open(uploadFile.url, '_blank')}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded"
                                title="View image"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => copyUrl(uploadFile.url!)}
                                className="p-1 text-gray-400 hover:text-gray-600 rounded"
                                title="Copy URL"
                              >
                                <Copy className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          
                          {uploadFile.status === 'error' && (
                            <button
                              onClick={() => retryUpload(uploadFile.id)}
                              className="p-1 text-blue-600 hover:text-blue-700 rounded"
                              title="Retry upload"
                            >
                              <Upload className="h-4 w-4" />
                            </button>
                          )}
                          
                          <button
                            onClick={() => removeFile(uploadFile.id)}
                            className="p-1 text-red-600 hover:text-red-700 rounded"
                            title="Remove file"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* File Details */}
                    <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                      <span>{(uploadFile.file.size / 1024 / 1024).toFixed(2)} MB</span>
                      {uploadFile.metadata?.dimensions && (
                        <span>
                          {uploadFile.metadata.dimensions.width} × {uploadFile.metadata.dimensions.height}
                        </span>
                      )}
                      {uploadFile.status === 'completed' && uploadFile.metadata?.thumbnails && (
                        <span>{uploadFile.metadata.thumbnails.length} thumbnails</span>
                      )}
                    </div>

                    {/* Progress Bar */}
                    {uploadFile.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadFile.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {uploadFile.progress}% uploaded
                        </p>
                      </div>
                    )}

                    {/* Error Message */}
                    {uploadFile.status === 'error' && uploadFile.error && (
                      <p className="mt-1 text-xs text-red-600">
                        {uploadFile.error}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Display */}
      {hookError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-sm text-red-800">
              {hookError.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Simplified avatar upload component
export function AvatarUpload({
  currentUrl,
  onUpload,
  size = 'lg',
  className = ''
}: {
  currentUrl?: string;
  onUpload: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  const handleUpload = (urls: string[]) => {
    if (urls.length > 0) {
      onUpload(urls[0]);
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {currentUrl ? (
        <div className="relative w-full h-full rounded-full overflow-hidden">
          <Image
            src={currentUrl}
            alt="Avatar"
            fill
            className="object-cover"
            sizes={sizeClasses[size]}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Upload className="h-6 w-6 text-white" />
          </div>
        </div>
      ) : (
        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-gray-400" />
        </div>
      )}
      
      <ImageUpload
        onUpload={handleUpload}
        maxFiles={1}
        purpose="avatar"
        className="absolute inset-0 opacity-0"
        showPreview={false}
        compressImages={true}
        maxWidth={400}
        maxHeight={400}
      />
    </div>
  );
}