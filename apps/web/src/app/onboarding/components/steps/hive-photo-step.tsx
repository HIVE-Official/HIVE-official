import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import { Camera, Upload, X, CheckCircle, User, Crop, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { HiveButton, HiveCard } from "@hive/ui";
import { getDefaultAvatarOptions } from "@/lib/avatar-generator";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HivePhotoStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

export function HivePhotoStep({ data, updateData, onNext }: HivePhotoStepProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState({ width: 200, height: 240 }); // 5:6 ratio to match card format
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropImageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);
    
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setIsUploading(true);
    
    try {
      // Create preview URL for cropping
      const previewUrl = URL.createObjectURL(file);
      setOriginalImage(previewUrl);
      setShowCropper(true);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    updateData({ profilePhoto: undefined });
    setError(null);
  };

  const selectAvatar = (avatar: string) => {
    // Close any open cropper and clear states
    setShowCropper(false);
    setOriginalImage(null);
    setIsUploading(false);
    
    // Set the selected avatar directly
    updateData({ profilePhoto: avatar });
    setError(null);
  };

  const cropImage = useCallback(() => {
    if (!originalImage || !cropImageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = cropImageRef.current;

    if (!ctx) return;

    // Set canvas size to crop dimensions (card aspect ratio)
    canvas.width = cropSize.width;
    canvas.height = cropSize.height;

    // Calculate scale factor
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    // Draw cropped image
    ctx.drawImage(
      img,
      cropPosition.x * scaleX,
      cropPosition.y * scaleY,
      cropSize.width * scaleX,
      cropSize.height * scaleY,
      0,
      0,
      cropSize.width,
      cropSize.height
    );

    // Convert to blob and update state
    canvas.toBlob((blob) => {
      if (blob) {
        const croppedUrl = URL.createObjectURL(blob);
        updateData({ profilePhoto: croppedUrl });
        setShowCropper(false);
        setOriginalImage(null);
      }
    }, 'image/jpeg', 0.9);
  }, [originalImage, cropPosition, cropSize, updateData]);

  const cancelCrop = () => {
    setShowCropper(false);
    setOriginalImage(null);
    if (originalImage) {
      URL.revokeObjectURL(originalImage);
    }
  };

  const handleResize = useCallback((e: React.MouseEvent, handle: string) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    
    const rect = cropImageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = { ...cropPosition };
    const startSize = { ...cropSize };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rect || !cropImageRef.current) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const imgWidth = cropImageRef.current.width;
      const imgHeight = cropImageRef.current.height;

      const newPos = { ...startPos };
      const newSize = { ...startSize };
      
      // Card aspect ratio (5:6 - width:height)
      const aspectRatio = 5/6;

      switch (handle) {
        case 'nw': // Top-left - maintain aspect ratio
        case 'ne': // Top-right - maintain aspect ratio  
        case 'sw': // Bottom-left - maintain aspect ratio
        case 'se': { // Bottom-right - maintain aspect ratio
          const newWidth = handle.includes('w') 
            ? Math.max(50, Math.min(startSize.width - deltaX, imgWidth - startPos.x))
            : Math.max(50, Math.min(startSize.width + deltaX, imgWidth - startPos.x));
          const newHeight = newWidth / aspectRatio;
          
          newSize.width = newWidth;
          newSize.height = Math.max(60, Math.min(newHeight, imgHeight - startPos.y));
          
          // Adjust width based on height constraint
          if (newSize.height !== newHeight) {
            newSize.width = newSize.height * aspectRatio;
          }
          
          if (handle.includes('w')) {
            newPos.x = startPos.x + (startSize.width - newSize.width);
          }
          if (handle.includes('n')) {
            newPos.y = startPos.y + (startSize.height - newSize.height);
          }
          break;
        }
        case 'n': // Top - resize height, adjust width to maintain ratio
        case 's': { // Bottom - resize height, adjust width to maintain ratio
          const heightChange = handle === 'n' ? -deltaY : deltaY;
          newSize.height = Math.max(60, Math.min(startSize.height + heightChange, imgHeight - startPos.y));
          newSize.width = newSize.height * aspectRatio;
          
          if (handle === 'n') {
            newPos.y = startPos.y + (startSize.height - newSize.height);
          }
          break;
        }
        case 'w': // Left - resize width, adjust height to maintain ratio
        case 'e': { // Right - resize width, adjust height to maintain ratio
          const widthChange = handle === 'w' ? -deltaX : deltaX;
          newSize.width = Math.max(50, Math.min(startSize.width + widthChange, imgWidth - startPos.x));
          newSize.height = newSize.width / aspectRatio;
          
          if (handle === 'w') {
            newPos.x = startPos.x + (startSize.width - newSize.width);
          }
          break;
        }
      }

      // Ensure crop area stays within image bounds
      newPos.x = Math.max(0, Math.min(newPos.x, imgWidth - newSize.width));
      newPos.y = Math.max(0, Math.min(newPos.y, imgHeight - newSize.height));

      setCropPosition(newPos);
      setCropSize(newSize);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeHandle(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [cropPosition, cropSize]);

  // Generate default avatar options based on user data
  const avatarOptions = getDefaultAvatarOptions(data.handle || data.fullName || 'user');

  // Show cropper modal
  if (showCropper && originalImage) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[var(--hive-background-primary)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4 flex items-center">
              <Crop className="w-5 h-5 mr-2 text-[var(--hive-brand-primary)]" />
              Crop Your Photo
            </h3>
            
            <div className="relative mb-6 max-h-96 overflow-hidden bg-[var(--hive-background-secondary)]/20 rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={cropImageRef}
                src={originalImage}
                alt="Crop preview"
                className="max-w-full max-h-96 mx-auto block"
                style={{ objectFit: 'contain' }}
              />
              
              {/* Crop overlay */}
              <div
                className="absolute border-2 border-[var(--hive-brand-primary)] bg-transparent cursor-move select-none"
                style={{
                  left: cropPosition.x,
                  top: cropPosition.y,
                  width: cropSize.width,
                  height: cropSize.height,
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                }}
                onMouseDown={(e) => {
                  if (isResizing) return;
                  setIsDragging(true);
                  const rect = cropImageRef.current?.getBoundingClientRect();
                  if (rect) {
                    const startX = e.clientX - rect.left - cropPosition.x;
                    const startY = e.clientY - rect.top - cropPosition.y;
                    
                    const handleMouseMove = (e: MouseEvent) => {
                      if (rect && cropImageRef.current) {
                        const newX = Math.max(0, Math.min(e.clientX - rect.left - startX, cropImageRef.current.width - cropSize.width));
                        const newY = Math.max(0, Math.min(e.clientY - rect.top - startY, cropImageRef.current.height - cropSize.height));
                        setCropPosition({ x: newX, y: newY });
                      }
                    };
                    
                    const handleMouseUp = () => {
                      setIsDragging(false);
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }
                }}
              >
                {/* Grid lines */}
                <div className="absolute inset-0 border border-white/50 pointer-events-none">
                  <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="border border-white/20" />
                    ))}
                  </div>
                </div>
                
                {/* Resize handles */}
                {/* Corner handles */}
                <div
                  className="absolute w-3 h-3 bg-[var(--hive-brand-primary)] border border-white cursor-nw-resize -top-1 -left-1 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleResize(e, 'nw')}
                />
                <div
                  className="absolute w-3 h-3 bg-[var(--hive-brand-primary)] border border-white cursor-ne-resize -top-1 -right-1 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleResize(e, 'ne')}
                />
                <div
                  className="absolute w-3 h-3 bg-[var(--hive-brand-primary)] border border-white cursor-sw-resize -bottom-1 -left-1 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleResize(e, 'sw')}
                />
                <div
                  className="absolute w-3 h-3 bg-[var(--hive-brand-primary)] border border-white cursor-se-resize -bottom-1 -right-1 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleResize(e, 'se')}
                />
                
                {/* Edge handles */}
                <div
                  className="absolute w-3 h-3 bg-[var(--hive-brand-primary)] border border-white cursor-n-resize -top-1 left-1/2 -translate-x-1/2 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleResize(e, 'n')}
                />
                <div
                  className="absolute w-3 h-3 bg-[var(--hive-brand-primary)] border border-white cursor-s-resize -bottom-1 left-1/2 -translate-x-1/2 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleResize(e, 's')}
                />
                <div
                  className="absolute w-3 h-3 bg-[var(--hive-brand-primary)] border border-white cursor-w-resize top-1/2 -left-1 -translate-y-1/2 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleResize(e, 'w')}
                />
                <div
                  className="absolute w-3 h-3 bg-[var(--hive-brand-primary)] border border-white cursor-e-resize top-1/2 -right-1 -translate-y-1/2 hover:scale-125 transition-transform"
                  onMouseDown={(e) => handleResize(e, 'e')}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-[var(--hive-text-muted)]">
                Drag to move • Drag corners/edges to resize
              </div>
              
              <div className="flex gap-3">
                <HiveButton
                  variant="secondary"
                  size="sm"
                  onClick={cancelCrop}
                  leftIcon={<X className="w-4 h-4" />}
                >
                  Cancel
                </HiveButton>
                
                <HiveButton
                  variant="premium"
                  size="sm"
                  onClick={cropImage}
                  leftIcon={<CheckCircle className="w-4 h-4" />}
                >
                  Apply Crop
                </HiveButton>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-8)] py-[var(--hive-spacing-6)] max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="text-center space-y-[var(--hive-spacing-4)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-[var(--hive-brand-primary)]/30"
        >
          <Camera className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            Add a profile picture
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            Help others recognize you around campus. This step is optional.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-[var(--hive-spacing-8)]"
      >
        {/* Current Photo or Upload Zone */}
        {data.profilePhoto ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center space-y-[var(--hive-spacing-4)]"
          >
            {/* Selected Photo Card - Larger for Main Display */}
            <div className="relative group">
              <HiveCard
                variant="elevated"
                className="w-40 h-48 p-0 overflow-hidden border-2 border-[var(--hive-brand-primary)]/30 shadow-xl"
              >
                <Image
                  src={data.profilePhoto}
                  alt="Profile"
                  width={160}
                  height={192}
                  className="w-full h-full object-cover"
                />
              </HiveCard>
              
              {/* Success Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--hive-status-success)] rounded-full flex items-center justify-center border-3 border-[var(--hive-background-primary)] shadow-lg"
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>

              {/* Remove Button */}
              <motion.button
                onClick={removePhoto}
                className="absolute -top-2 -left-2 w-8 h-8 bg-[var(--hive-status-error)]/90 backdrop-blur-sm border border-[var(--hive-status-error)] rounded-full flex items-center justify-center text-white hover:bg-[var(--hive-status-error)] transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-90"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Change Photo Button */}
            <HiveButton
              onClick={openFileDialog}
              variant="outline"
              size="sm"
              leftIcon={<Upload className="w-4 h-4" />}
            >
              Change Photo
            </HiveButton>
          </motion.div>
        ) : (
          <div className="space-y-[var(--hive-spacing-6)]">
            {/* Upload Area */}
            <HiveCard
              variant="elevated"
              className="p-[var(--hive-spacing-8)] border-2 border-dashed border-[var(--hive-border-primary)]/30 hover:border-[var(--hive-brand-primary)]/50 transition-all duration-300 cursor-pointer group"
              onClick={openFileDialog}
            >
              <div className="flex flex-col items-center space-y-[var(--hive-spacing-4)] text-center">
                <motion.div
                  className="w-20 h-20 rounded-full bg-[var(--hive-brand-primary)]/10 flex items-center justify-center group-hover:bg-[var(--hive-brand-primary)]/20 transition-all duration-200 hover:scale-105"
                >
                  {isUploading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Camera className="w-8 h-8 text-[var(--hive-brand-primary)]" />
                    </motion.div>
                  ) : (
                    <Camera className="w-8 h-8 text-[var(--hive-brand-primary)]" />
                  )}
                </motion.div>
                
                <div>
                  <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">
                    {isUploading ? "Uploading..." : "Upload your photo"}
                  </h3>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    Drag and drop or click to browse
                  </p>
                  <p className="text-xs text-[var(--hive-text-muted)] mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </div>
              </div>
            </HiveCard>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-[var(--hive-status-error)] text-sm flex items-center gap-2 justify-center bg-[var(--hive-status-error)]/10 rounded-lg p-3"
                >
                  <span>⚠️</span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* OR Divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--hive-border-primary)]/20" />
              </div>
              <div className="relative bg-[var(--hive-background-primary)] px-4">
                <span className="text-sm text-[var(--hive-text-muted)]">or</span>
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="space-y-[var(--hive-spacing-4)]">
              <h4 className="text-center font-medium text-[var(--hive-text-primary)]">
                Choose an avatar
              </h4>
              
              <div className="grid grid-cols-2 gap-[var(--hive-spacing-4)]">
                {avatarOptions.map((avatar, index) => (
                  <motion.div
                    key={avatar}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    // Removed whileHover and whileTap - using CSS hover/active states
                  >
                    <HiveCard
                      variant="elevated"
                      className="relative h-32 overflow-hidden border-2 border-[var(--hive-border-primary)]/20 hover:border-[var(--hive-brand-primary)]/50 transition-all duration-200 group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                      onClick={() => selectAvatar(avatar)}
                    >
                      <Image
                        src={avatar}
                        alt={`Avatar option ${index + 1}`}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-[var(--hive-brand-primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    </HiveCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skip Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={onNext}
            className="text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors text-sm underline underline-offset-4 hover:no-underline"
          >
            Skip for now
          </button>
        </motion.div>

        {/* Photo Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <HiveCard
            variant="default"
            className="p-[var(--hive-spacing-4)]"
          >
            <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-[var(--hive-spacing-3)] flex items-center">
              <Camera className="w-4 h-4 mr-2 text-[var(--hive-brand-primary)]" />
              Photo Guidelines
            </h4>
            <div className="grid grid-cols-1 gap-[var(--hive-spacing-2)] text-xs text-[var(--hive-text-muted)]">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full" />
                <span>Use a clear photo of yourself</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full" />
                <span>Square images work best</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1 h-1 bg-[var(--hive-brand-primary)] rounded-full" />
                <span>Maximum 5MB file size</span>
              </div>
            </div>
          </HiveCard>
        </motion.div>
      </motion.div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
    </motion.div>
  );
}