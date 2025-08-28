"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Upload,
  Camera,
  XIcon,
  Shuffle,
  Crop,
} from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';
import { ImageCropModal } from './image-crop-modal';

export interface CreateProfileStepProps {
  displayName: string;
  onDisplayNameChange: (value: string) => void;
  handle: string;
  onHandleChange: (value: string) => void;
  handleAvailability: {
    isChecking: boolean;
    available: boolean | null;
  };
  avatarUrl?: string;
  avatarModerationStatus?: "pending" | "approved" | "rejected" | "under_review";
  onFileSelect: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  isUploading: boolean;
  error?: string;
  selectedFile: File | null;
  termsAccepted: boolean;
  onTermsAcceptedChange: (checked: boolean) => void;
  userRole?: 'student' | 'faculty' | 'alumni';
  schoolName?: string;
  photos?: string[];
  onPhotosChange?: (photos: string[]) => void;
}

export const CreateProfileStep: React.FC<CreateProfileStepProps> = ({
  displayName,
  onDisplayNameChange,
  handle,
  onHandleChange,
  handleAvailability,
  avatarUrl,
  avatarModerationStatus,
  onFileSelect,
  onSubmit,
  isUploading,
  error,
  selectedFile,
  termsAccepted,
  onTermsAcceptedChange,
  userRole = 'student',
  schoolName = 'your school',
  photos = [],
  onPhotosChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { variants: _variants } = useAdaptiveMotion('academic');
  const [showCropModal, setShowCropModal] = useState(false);
  const [cropImageFile, setCropImageFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const allPhotos = [...photos, ...(selectedFile ? [URL.createObjectURL(selectedFile)] : []), ...(avatarUrl ? [avatarUrl] : [])].filter(Boolean);
  const maxPhotos = 1;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    // Clear the selected file if it exists
    if (selectedFile) {
      onFileSelect(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
    
    // Clear existing photos
    if (onPhotosChange && photos.length > 0) {
      onPhotosChange([]);
    }
  };

  const handleCropComplete = (croppedFile: File) => {
    onFileSelect(croppedFile);
    setShowCropModal(false);
    setCropImageFile(null);
  };

  const handleCropPhoto = async () => {
    if (allPhotos.length === 0) return;
    
    const photoUrl = allPhotos[0];
    
    // If it's a selectedFile (blob URL), use it directly
    if (selectedFile) {
      setCropImageFile(selectedFile);
      setShowCropModal(true);
      return;
    }
    
    // If it's an existing photo URL, convert to File
    try {
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const file = new File([blob], 'profile-photo.jpg', { type: 'image/jpeg' });
      setCropImageFile(file);
      setShowCropModal(true);
    } catch (error) {
      console.error('Failed to load photo for cropping:', error);
    }
  };

  const generateSuggestions = () => {
    if (!displayName || displayName.trim().length === 0) {
      // If no name provided, show message
      setSuggestions([]);
      return;
    }

    // Import the functions dynamically to avoid build issues
    import("@hive/core").then(({ generateHandleSuggestions }) => {
      const newSuggestions = generateHandleSuggestions(displayName, 4);
      setSuggestions(newSuggestions);
    }).catch(() => {
      // Fallback name-based suggestions if import fails
      const cleanName = displayName.toLowerCase().replace(/[^a-z0-9]/g, "");
      const names = displayName.trim().split(/\s+/);
      const firstName = names[0]?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
      const lastName = names[names.length - 1]?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
      
      const fallbackSuggestions = [];
      
      if (cleanName) {
        fallbackSuggestions.push(`${cleanName}${Math.floor(Math.random() * 99) + 1}`);
      }
      
      if (firstName && lastName && firstName !== lastName) {
        fallbackSuggestions.push(`${firstName}.${lastName}`);
        fallbackSuggestions.push(`${firstName}${lastName?.charAt(0) || ""}`);
      }
      
      if (firstName) {
        fallbackSuggestions.push(`${firstName}${Math.floor(Math.random() * 999) + 1}`);
      }
      
      setSuggestions(fallbackSuggestions.slice(0, 4));
    });
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-2xl bg-surface border border-border rounded-lg p-8 space-y-8"
        variants={hiveVariants.scaleIn}
        initial="hidden"
        animate="visible"
      >
      <motion.div className="text-center space-y-3" variants={hiveVariants.item}>
        <h2 className="text-2xl font-display font-medium text-foreground">
          {userRole === 'student' 
            ? `Welcome to ${schoolName}!`
            : userRole === 'faculty'
            ? `Welcome, Professor!`
            : `Welcome to HIVE!`
          }
        </h2>
        <p className="text-muted font-body text-base">
          {userRole === 'student' 
            ? `Let's create your student profile so you can connect with classmates and discover campus communities.`
            : userRole === 'faculty'
            ? `Set up your faculty profile to connect with colleagues and guide students in their journey.`  
            : `Tell us about yourself to get started on your HIVE journey.`
          }
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="text-sm font-medium text-accent font-body">
            Step 2 of 4
          </span>
        </div>
      </motion.div>

      <motion.form 
        onSubmit={onSubmit} 
        className="space-y-6"
        variants={hiveVariants.container}
        initial="hidden"
        animate="visible"
      >
        {/* Single Profile Photo */}
        <motion.div className="bg-surface-01 border border-border rounded-lg overflow-hidden" variants={hiveVariants.item}>
          {/* Photo Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground font-body">Profile Photo</h3>
              <span className="text-xs text-muted">{allPhotos.length > 0 ? '1/1' : '0/1'}</span>
            </div>
          </div>

          {/* Main Photo Display */}
          <div className="relative h-80 bg-surface-02 overflow-hidden">
            <AnimatePresence mode="wait">
              {allPhotos.length > 0 ? (
                <motion.div 
                  key="photo"
                  className="relative h-full"
                  variants={hiveVariants.scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <img
                    src={allPhotos[0]}
                    alt="Profile photo"
                    className="w-full h-full object-cover"
                  />

                  {/* Remove Photo Button */}
                  <motion.button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute top-4 right-4 w-8 h-8 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-muted hover:text-accent transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XIcon className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  onClick={handleUploadClick}
                  className="h-full flex flex-col items-center justify-center cursor-pointer hover:bg-surface-03 transition-colors"
                  variants={hiveVariants.scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Camera className="w-12 h-12 text-muted mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">Add your photo</h4>
                  <p className="text-sm text-muted text-center max-w-xs">
                    Share a photo to help others get to know you better
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Controls */}
          <div className="p-6 border-t border-border bg-surface-02">
            <div className="flex gap-3 justify-center">
              <Button 
                type="button" 
                variant="secondary" 
                size="sm" 
                onClick={handleUploadClick}
                disabled={allPhotos.length >= maxPhotos}
              >
                <Upload className="w-4 h-4 mr-2" />
                {allPhotos.length === 0 ? 'Add Photo' : 'Replace Photo'}
              </Button>
              {(allPhotos.length > 0) && (
                <Button type="button" variant="secondary" size="sm" onClick={handleCropPhoto}>
                  <Crop className="w-4 h-4 mr-2" />
                  Edit Photo
                </Button>
              )}
            </div>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted font-body">
                Your photo helps you make genuine connections - add one to get started
              </p>
              {avatarModerationStatus && avatarModerationStatus !== 'approved' && (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm bg-surface-02 text-muted border border-border mt-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted" />
                  {avatarModerationStatus === 'pending' && 'Photo under review'}
                  {avatarModerationStatus === 'under_review' && 'Photo being reviewed'}
                  {avatarModerationStatus === 'rejected' && 'Photo needs update'}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div className="space-y-2" variants={hiveVariants.item}>
          <Label htmlFor="displayName">Full Name</Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => onDisplayNameChange(e.target.value)}
            placeholder="Ada Lovelace"
            variant="accent"
            required
          />
        </motion.div>

        <motion.div className="space-y-3" variants={hiveVariants.item}>
          <div className="flex items-center justify-between">
            <Label htmlFor="handle">Username</Label>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={generateSuggestions}
              className="text-xs text-muted hover:text-accent"
            >
              <Shuffle className="w-3 h-3 mr-1" />
              Randomize
            </Button>
          </div>
          
          <div className="relative">
            <Input
              id="handle"
              value={handle}
              onChange={(e) => onHandleChange(e.target.value)}
              placeholder="your.username"
              variant="accent"
              required
              className="pr-10"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <AnimatePresence mode="wait">
                {handleAvailability.isChecking && (
                  <motion.div
                    key="checking"
                    variants={hiveVariants.scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <Loader2 className="h-5 w-5 animate-spin text-muted" />
                  </motion.div>
                )}
                {handleAvailability.available === true && (
                  <motion.div
                    key="available"
                    variants={hiveVariants.scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </motion.div>
                )}
                {handleAvailability.available === false && (
                  <motion.div
                    key="unavailable"
                    variants={hiveVariants.scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <AlertCircle className="h-5 w-5 text-muted" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Username Suggestions */}
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={hiveVariants.slideDown}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    type="button"
                    onClick={() => onHandleChange(suggestion)}
                    className="px-3 py-1.5 text-xs bg-surface-01 border border-border rounded-md hover:bg-surface-02 hover:border-accent/30 text-muted hover:text-accent transition-all"
                    variants={hiveVariants.scaleIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div className="flex items-start space-x-3" variants={hiveVariants.item}>
          <Checkbox id="terms" checked={termsAccepted} onCheckedChange={onTermsAcceptedChange} className="mt-1" />
          <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-normal">
            I agree to the{' '}
            <a href="/legal/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              Privacy Policy
            </a>
            .
          </Label>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p 
              className="text-sm text-muted italic"
              variants={hiveVariants.slideDown}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div variants={hiveVariants.item}>
          <Button 
            type="submit" 
            variant="primary"
            fullWidth
            disabled={isUploading || !termsAccepted}
          >
            {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue'}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>

    {/* Image Crop Modal */}
    <ImageCropModal
      isOpen={showCropModal}
      onClose={() => {
        setShowCropModal(false);
        setCropImageFile(null);
      }}
      imageFile={cropImageFile}
      onCropComplete={handleCropComplete}
    />
    </div>
  );
}; 