"use client";

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Button, Progress } from "@hive/ui";
import { HiveModal, HiveModalContent, HiveModalHeader, HiveModalTitle, HiveModalFooter } from "@/components/temp-stubs";
import { Alert } from "@/components/temp-stubs";
import { 
  Upload, 
  Camera, 
  RotateCcw, 
  Check,
  AlertTriangle
} from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (_file: File) => Promise<void>;
  currentPhotoUrl?: string;
  isUploading?: boolean;
  uploadProgress?: number;
}

export function PhotoUploadModal({
  isOpen,
  onClose,
  onUpload,
  currentPhotoUrl,
  isUploading = false,
  uploadProgress = 0
}: PhotoUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((file: File) => {
    setError(null);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, GIF)');
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB');
      return;
    }
    
    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    try {
      await onUpload(selectedFile);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setDragOver(false);
    onClose();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <HiveModal open={isOpen} onOpenChange={handleClose} size="lg">
      <HiveModalContent className="max-w-2xl">
        <HiveModalHeader>
          <HiveModalTitle className="flex items-center space-x-2">
            <Camera className="h-5 w-5" />
            <span>Upload Profile Photo</span>
          </HiveModalTitle>
        </HiveModalHeader>

        <div className="space-y-6 p-6">
          {/* Current Photo Display */}
          {currentPhotoUrl && !previewUrl && (
            <div className="text-center">
              <p className="text-sm text-hive-text-mutedLight mb-3">Current Photo</p>
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-hive-background-tertiary">
                <Image
                  src={currentPhotoUrl}
                  alt="Current profile photo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${dragOver 
                ? 'border-hive-gold bg-hive-gold/5' 
                : 'border-hive-border-default hover:border-hive-border-hover'
              }
              ${selectedFile ? 'border-green-500 bg-green-500/5' : ''}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden bg-hive-background-tertiary">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      handleReset();
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Choose Different
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-hive-background-secondary rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-8 w-8 text-hive-text-mutedLight" />
                </div>
                <div>
                  <p className="text-white font-medium">Drop your photo here, or click to browse</p>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white">Uploading...</span>
                <span className="text-hive-text-mutedLight">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-center space-x-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {/* Upload Guidelines */}
          <div className="text-xs text-hive-text-mutedLight space-y-1">
            <p>• Image will be cropped to a square automatically</p>
            <p>• Recommended size: 400x400 pixels or larger</p>
            <p>• Keep your photo appropriate for campus community</p>
          </div>
        </div>

        <HiveModalFooter>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
          >
            {isUploading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Upload Photo
              </>
            )}
          </Button>
        </HiveModalFooter>
      </HiveModalContent>
    </HiveModal>
  );
}