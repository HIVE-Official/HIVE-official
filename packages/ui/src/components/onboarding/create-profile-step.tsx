"use client";

import React, { useRef } from 'react';
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
} from 'lucide-react';
import { Checkbox } from '../checkbox';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';

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
  onFileSelect: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  isUploading: boolean;
  error?: string;
  selectedFile: File | null;
  termsAccepted: boolean;
  onTermsAcceptedChange: (checked: boolean) => void;
}

export const CreateProfileStep: React.FC<CreateProfileStepProps> = ({
  displayName,
  onDisplayNameChange,
  handle,
  onHandleChange,
  handleAvailability,
  avatarUrl,
  onFileSelect,
  onSubmit,
  isUploading,
  error,
  selectedFile,
  termsAccepted,
  onTermsAcceptedChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { variants: _variants } = useAdaptiveMotion('academic');

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <motion.div 
      className="w-full max-w-lg bg-surface border border-border rounded-lg p-6 space-y-6"
      variants={hiveVariants.scaleIn}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center space-y-2" variants={hiveVariants.item}>
        <h2 className="text-2xl font-display font-medium text-foreground">
          Create Your Profile
        </h2>
        <p className="text-muted font-sans">
          Tell us about yourself to get started
        </p>
      </motion.div>

      <motion.form 
        onSubmit={onSubmit} 
        className="space-y-6"
        variants={hiveVariants.container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col items-center space-y-4" variants={hiveVariants.item}>
          <div className="relative">
            <AnimatePresence mode="wait">
              {avatarUrl || selectedFile ? (
                <motion.div 
                  className="relative"
                  key="avatar"
                  variants={hiveVariants.scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <img
                    src={avatarUrl || (selectedFile ? URL.createObjectURL(selectedFile) : "")}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-2 border-border"
                  />
                  <motion.button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-surface-02 border border-border rounded-full flex items-center justify-center text-muted hover:text-accent transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <XIcon className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  onClick={handleUploadClick}
                  className="w-20 h-20 rounded-full bg-surface-01 border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-surface-02 transition-colors"
                  variants={hiveVariants.scaleIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(255, 215, 0, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Camera className="w-8 h-8 text-muted" />
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
          <Button type="button" variant="outline" size="sm" onClick={handleUploadClick}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </Button>
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

        <motion.div className="space-y-2" variants={hiveVariants.item}>
          <Label htmlFor="handle">Username</Label>
          <div className="relative">
            <Input
              id="handle"
              value={handle}
              onChange={(e) => onHandleChange(e.target.value)}
              placeholder="ada.lovelace"
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
            variant="ritual"
            fullWidth
            disabled={isUploading || !termsAccepted}
          >
            {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Continue'}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}; 