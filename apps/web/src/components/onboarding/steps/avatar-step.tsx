"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@hive/ui';
import { Button } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { logger } from '@hive/core';

export function OnboardingAvatarStep() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(onboardingData?.avatarUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError('');

      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/auth/upload-avatar', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    return result.avatarUrl;
  };

  const handleSkip = async () => {
    setIsUploading(true);
    
    try {
      await update({
        avatarUrl: undefined
      });

      logger.info('Avatar upload skipped');
      router.push('/onboarding/interests');
      
    } catch (error) {
      logger.error('Failed to skip avatar upload:', error);
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    setIsUploading(true);
    setError('');

    try {
      let finalAvatarUrl = previewUrl;

      // Upload file if selected
      if (selectedFile) {
        finalAvatarUrl = await uploadFile(selectedFile);
      }

      await update({
        avatarUrl: finalAvatarUrl || undefined
      });

      logger.info('Avatar saved:', { avatarUrl: finalAvatarUrl });
      router.push('/onboarding/interests');
      
    } catch (err) {
      setError('Failed to upload avatar. Please try again.');
      logger.error('Avatar upload error:', err);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card border-border">
        <CardHeader className="text-center space-y-2">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <Camera className="w-6 h-6 text-accent" />
          </div>
          <CardTitle className="text-xl font-display text-card-foreground">
            Add Profile Picture
          </CardTitle>
          <CardDescription className="text-muted-foreground font-sans">
            Upload a photo to personalize your profile
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-accent/10 border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              
              {previewUrl && (
                <button
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <div className="text-center space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <Button
              type="button"
              variant="outline"
              onClick={handleUploadClick}
              className="w-full h-12"
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {previewUrl ? 'Change Photo' : 'Upload Photo'}
            </Button>

            <p className="text-xs text-muted-foreground">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={handleSkip}
              disabled={isUploading}
            >
              Skip for Now
            </Button>
            <Button
              className="flex-1 h-12"
              onClick={handleSubmit}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Next'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 