'use client';

import React, { useState, useCallback, useRef } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';
import { Camera, Upload, X, Check, RotateCw, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '../atoms/button';
import { Dialog, DialogContent } from '../atoms/dialog';
import { Slider } from '../atoms/slider';
import { cn } from '../../lib/utils';

interface HiveAvatarUploadWithCropProps {
  currentAvatar?: string | null;
  onUpload?: (file: File, croppedImageUrl: string) => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  loading?: boolean;
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0
): Promise<{ file: File; url: string }> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  // SPEC: Enforce 3:4 portrait ratio (450x600px)
  const outputWidth = 450;
  const outputHeight = 600;
  canvas.width = outputWidth;
  canvas.height = outputHeight;

  // Calculate the rotated bounding box
  const radians = (rotation * Math.PI) / 180;
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const newWidth = image.width * cos + image.height * sin;
  const newHeight = image.width * sin + image.height * cos;

  // Set up the drawing context
  ctx.translate(outputWidth / 2, outputHeight / 2);
  ctx.rotate(radians);
  ctx.translate(-outputWidth / 2, -outputHeight / 2);

  // Draw the cropped image
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight
  );

  // Convert to blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      resolve({ file, url });
    }, 'image/jpeg', 0.95); // High quality JPEG
  });
}

export const HiveAvatarUploadWithCrop: React.FC<HiveAvatarUploadWithCropProps> = ({
  currentAvatar,
  onUpload,
  size = 'lg',
  className,
  loading = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // SPEC: 3:4 portrait ratio sizes
  const sizeClasses = {
    sm: 'w-12 h-16',
    md: 'w-18 h-24',
    lg: 'w-24 h-32',
    xl: 'w-30 h-40'
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
    xl: 44
  };

  const buttonSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setIsOpen(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    if (!imageSrc || !croppedAreaPixels || !onUpload) return;

    setIsProcessing(true);
    try {
      const { file, url } = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      await onUpload(file, url);
      setIsOpen(false);
      resetState();
    } catch (error) {
      console.error('Error cropping image:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [imageSrc, croppedAreaPixels, rotation, onUpload]);

  const resetState = () => {
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setCroppedAreaPixels(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    resetState();
  };

  return (
    <>
      {/* Avatar Display with Upload Button */}
      <div className={cn('relative group', className)}>
        <div
          className={cn(
            sizeClasses[size],
            'rounded-lg overflow-hidden bg-hive-background-secondary border-2 border-hive-border shadow-xl transition-all duration-200 group-hover:shadow-2xl'
          )}
        >
          {currentAvatar ? (
            <img
              src={currentAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-hive-accent/20 to-hive-accent/10">
              <Camera size={iconSizes[size]} className="text-hive-text-secondary" />
            </div>
          )}
        </div>

        {/* Upload Button Overlay */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className={cn(
            buttonSizes[size],
            'absolute bottom-0 right-0 bg-hive-accent rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-200',
            'hover:scale-110 hover:bg-hive-accent/90 hover:shadow-xl',
            'focus:outline-none focus:ring-2 focus:ring-hive-accent focus:ring-offset-2 focus:ring-offset-hive-background-primary',
            loading && 'opacity-50 cursor-not-allowed'
          )}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-hive-background-primary" />
          ) : (
            <Upload size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} className="text-hive-background-primary" />
          )}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={loading}
        />
      </div>

      {/* Crop Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-hive-background-primary border-hive-border-primary">
          <div className="flex flex-col h-[600px]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-hive-border-primary">
              <h2 className="text-xl font-semibold text-hive-text-primary">
                Adjust Your Profile Picture
              </h2>
              <p className="text-sm text-hive-text-secondary mt-1">
                Drag to reposition, use slider to zoom, and rotate as needed
              </p>
            </div>

            {/* Cropper Container */}
            <div className="relative flex-1 bg-hive-background-secondary">
              {imageSrc && (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={3 / 4} // SPEC: 3:4 portrait ratio
                  cropShape="rect" // SPEC: Portrait photo, not round
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  style={{
                    containerStyle: {
                      background: 'var(--hive-background-secondary)'
                    },
                    mediaStyle: {
                      filter: 'none'
                    }
                  }}
                />
              )}
            </div>

            {/* Controls */}
            <div className="px-6 py-4 bg-hive-background-primary border-t border-hive-border-primary space-y-4">
              {/* Zoom Control */}
              <div className="flex items-center gap-4">
                <ZoomOut className="text-hive-text-secondary" size={20} />
                <Slider
                  value={[zoom]}
                  onValueChange={([value]) => setZoom(value)}
                  min={1}
                  max={3}
                  step={0.01}
                  className="flex-1"
                />
                <ZoomIn className="text-hive-text-secondary" size={20} />
              </div>

              {/* Rotation Control */}
              <div className="flex items-center gap-4">
                <RotateCw className="text-hive-text-secondary" size={20} />
                <Slider
                  value={[rotation]}
                  onValueChange={([value]) => setRotation(value)}
                  min={-180}
                  max={180}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-hive-text-secondary min-w-[50px] text-right">
                  {rotation}°
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isProcessing}
                  className="flex items-center gap-2"
                >
                  <X size={16} />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isProcessing}
                  className="flex items-center gap-2 bg-hive-accent hover:bg-hive-accent/90"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
