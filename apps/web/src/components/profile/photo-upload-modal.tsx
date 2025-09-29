"use client";

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Button, Progress } from "@hive/ui";
import { HiveModal, HiveModalContent, HiveModalHeader, HiveModalTitle, HiveModalFooter, Alert } from "@hive/ui";
import { motion, AnimatePresence } from 'framer-motion';
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
    <HiveModal open={isOpen} onOpenChange={handleClose}>
      <HiveModalContent className="max-w-2xl">
        <HiveModalHeader>
          <HiveModalTitle className="flex items-center space-x-2 font-sans">
            <Camera className="h-5 w-5 text-hive-brand-primary" />
            <span className="text-hive-text-primary">Upload Profile Photo</span>
          </HiveModalTitle>
        </HiveModalHeader>

        <div className="space-y-6 p-6">
          {/* Current Photo Display */}
          {currentPhotoUrl && !previewUrl && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-sm text-hive-text-secondary font-sans mb-3">Current Photo</p>
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-hive-background-tertiary border-2 border-hive-border-default">
                <Image src={currentPhotoUrl} alt="" fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Upload Area */}
          <motion.div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer font-sans
              ${dragOver
                ? 'border-hive-brand-primary bg-hive-overlay-gold-subtle'
                : 'border-hive-border-default hover:border-hive-border-hover'
              }
              ${selectedFile ? 'border-hive-status-success bg-hive-overlay-gold-subtle' : ''}
            `}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
            }}
            whileTap={{
              scale: 0.99,
              transition: { duration: 0.1, ease: [0.23, 1, 0.32, 1] }
            }}
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

            <AnimatePresence mode="wait">
              {previewUrl ? (
                <motion.div
                  key="preview"
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden bg-hive-background-tertiary border-2 border-hive-border-default shadow-hive-level2">
                    <Image src={previewUrl} alt="" fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="font-sans"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Choose Different
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                >
                  <motion.div
                    className="w-16 h-16 bg-hive-background-secondary rounded-full flex items-center justify-center mx-auto border border-hive-border-default"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "var(--hive-background-tertiary)",
                      transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                    }}
                  >
                    <Upload className="h-8 w-8 text-hive-text-secondary" />
                  </motion.div>
                  <div>
                    <p className="text-hive-text-primary font-medium font-sans">Drop your photo here, or click to browse</p>
                    <p className="text-sm text-hive-text-secondary font-sans mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Upload Progress */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="flex items-center justify-between text-sm font-sans">
                  <span className="text-hive-text-primary">Uploading...</span>
                  <span className="text-hive-text-secondary">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Display */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="flex items-center space-x-2 p-3 rounded-lg bg-hive-status-error/10 border border-hive-status-error/20"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                <AlertTriangle className="h-4 w-4 text-hive-status-error" />
                <p className="text-sm text-hive-status-error font-sans">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Guidelines */}
          <div className="text-xs text-hive-text-tertiary font-sans space-y-1">
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
            className="font-sans"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="bg-hive-brand-primary text-hive-brand-onGold hover:bg-hive-brand-hover focus:ring-hive-brand-primary font-sans shadow-hive-gold-glow hover:shadow-hive-gold-glow-strong transition-all duration-300 ease-out"
          >
            <AnimatePresence mode="wait">
              {isUploading ? (
                <motion.div
                  key="uploading"
                  className="flex items-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                  </motion.div>
                  Uploading...
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  className="flex items-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Upload Photo
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </HiveModalFooter>
      </HiveModalContent>
    </HiveModal>
  );
}