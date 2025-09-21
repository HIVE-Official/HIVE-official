'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from '../../framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { 
  Camera, 
  Upload, 
  Edit, 
  Settings, 
  Crown, 
  Shield, 
  User, 
  Mail,
  MapPin,
  GraduationCap,
  Building2,
  Calendar,
  Eye,
  EyeOff,
  Save,
  X,
  Check,
  AlertTriangle;
} from 'lucide-react';

// Avatar Card Types;
export interface UserProfile {id: string;
  displayName: string;
  email: string;
  profilePhotoURL?: string;
  bio: string;
  academicInfo: {
    year: string;
    major: string;
    school: string;
    housing?: string;};
  builderStatus: boolean;
  isVerified: boolean;
  ghostMode: boolean;
  lastSeen: string;
  isOnline: boolean;
}

export interface AvatarCardProps {profile: UserProfile;
  isEditMode: boolean;
  onProfileUpdate: (updates: Partial<UserProfile>) => void;
  onPhotoUpload: (file: File) => Promise<string>;
  onEditClick?: () => void;
  onSettingsClick?: () => void;
  className?: string;}

// Photo Upload Component;
function PhotoUploadDialog({ 
  currentPhoto, 
  onUpload, 
  isOpen, 
  onOpenChange;
}: {
  currentPhoto?: string;
  onUpload: (file: File) => Promise<string>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }
}
    if (file.size > 5 * 1024 * 1024) { // 5MB limit;
      alert('File size must be less than 5MB');
      return;
    }

    // Create preview;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file)
  }, []);

  const handleUpload = useCallback(async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await onUpload(file);
      onOpenChange(false);
      setPreview(null)
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload photo')
    } finally {
      setUploading(false)
    }
  }, [onUpload, onOpenChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Profile Photo</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current/Preview Photo */}
          <div className="flex justify-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={preview || currentPhoto} />
              <AvatarFallback className="text-4xl">
                <User className="w-16 h-16" />
              </AvatarFallback>
            </Avatar>
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <input;
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <Button;
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Photo;
            </Button>
            <p className="text-xs text-[var(--hive-text-muted)] text-center">
              JPG, PNG, or WebP. Max 5MB.
            </p>
          </div>

          {/* Upload Button */}
          {preview && (
            <Button;
              className="w-full"
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <motion.div;
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 mr-2"
                  >
                    <Upload className="w-4 h-4" />
                  </motion.div>
                  Uploading...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Photo;
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Profile Editing Form;
function ProfileEditForm({ 
  profile, 
  onSave, 
  onCancel;
}: {
  profile: UserProfile;
  onSave: (updates: Partial<UserProfile>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    displayName: profile.displayName,
    bio: profile.bio,
    academicInfo: { ...profile.academicInfo }
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev };
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        updated[parent as keyof typeof updated] = {
          ...(updated[parent as keyof typeof updated] as any),
          [child]: value;
        }
      } else {
        (updated as any)[field] = value;
      }
      return updated;
    });
    setHasChanges(true)
  }, []);

  const handleSave = useCallback(() => {
    onSave(formData);
    setHasChanges(false)
  }, [formData, onSave]);

  return (
    <motion.div;
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4 bg-[var(--hive-background-secondary)] rounded-lg"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-[var(--hive-text-primary)]">Edit Profile</h4>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!hasChanges}>
            <Save className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Display Name</label>
          <Input;
            value={formData.displayName}
            onChange={(e) => handleChange('displayName', e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Bio</label>
          <Textarea;
            value={formData.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            placeholder="Tell others about yourself..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-[var(--hive-text-primary)]">Year</label>
            <Input;
              value={formData.academicInfo.year}
              onChange={(e) => handleChange('academicInfo.year', e.target.value)}
              placeholder="2026"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-[var(--hive-text-primary)]">Major</label>
            <Input;
              value={formData.academicInfo.major}
              onChange={(e) => handleChange('academicInfo.major', e.target.value)}
              placeholder="Computer Science"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Housing</label>
          <Input;
            value={formData.academicInfo.housing || ''}
            onChange={(e) => handleChange('academicInfo.housing', e.target.value)}
            placeholder="West Campus"
          />
        </div>
      </div>
    </motion.div>
  )
}

// Main Avatar Card Component;
export function AvatarCard({
  profile,
  isEditMode,
  onProfileUpdate,
  onPhotoUpload,
  onEditClick,
  onSettingsClick,
  className;
}: AvatarCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const handlePhotoClick = useCallback(() => {
    if (isEditMode) return;
    setPhotoDialogOpen(true)
  }, [isEditMode]);

  const handleEditProfile = useCallback(() => {
    setIsEditing(true);
    onEditClick?.()
  }, [onEditClick]);

  const handleSaveProfile = useCallback((updates: Partial<UserProfile>) => {
    onProfileUpdate(updates);
    setIsEditing(false)
  }, [onProfileUpdate]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false)
  }, []);

  // Bio truncation for compact display;
  const bioPreview = profile.bio.length > 120 
    ? `${profile.bio.substring(0, 120)}...` 
    : profile.bio;

  return (
    <>
      <Card className={cn('h-full overflow-hidden', className)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Online Status Indicator */}
              <div className="relative">
                <div className={cn(
                  'absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white',
                  profile.isOnline ? 'bg-green-500' : 'bg-gray-400',
                  profile.ghostMode && 'bg-gray-300 opacity-50'
                )} />
              </div>
              
              {/* Basic Info */}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[var(--hive-text-primary)] truncate">
                  {profile.displayName}
                </h3>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  {profile.academicInfo.year} • {profile.academicInfo.major}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {!isEditMode && (
              <div className="flex gap-1">
                <Button;
                  size="sm"
                  variant="ghost"
                  onClick={handleEditProfile}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button;
                  size="sm"
                  variant="ghost"
                  onClick={onSettingsClick}
                  className="h-8 w-8 p-0"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile.profilePhotoURL} />
                <AvatarFallback className="text-lg">
                  {profile.displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {/* Photo Upload Overlay */}
              {!isEditMode && (
                <motion.div;
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                >
                  <Camera className="w-5 h-5 text-white" />
                </motion.div>
              )}

              {/* Builder Crown */}
              {profile.builderStatus && (
                <div className="absolute -top-2 -right-2">
                  <div className="w-6 h-6 bg-[var(--hive-brand-gold)] rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              {/* Ghost Mode Indicator */}
              {profile.ghostMode && (
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center">
                    <EyeOff className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Identity Information */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Status Badges */}
              <div className="flex flex-wrap gap-1">
                {profile.builderStatus && (
                  <Badge variant="secondary" className="bg-[var(--hive-brand-gold)] text-white text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    Builder;
                  </Badge>
                )}
                {profile.isVerified && (
                  <Badge variant="outline" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Verified;
                  </Badge>
                )}
                {profile.ghostMode && (
                  <Badge variant="secondary" className="text-xs">
                    <EyeOff className="w-3 h-3 mr-1" />
                    Ghost;
                  </Badge>
                )}
              </div>

              {/* Academic Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-[var(--hive-text-muted)]">
                  <Building2 className="w-3 h-3" />
                  {profile.academicInfo.school}
                </div>
                {profile.academicInfo.housing && (
                  <div className="flex items-center gap-2 text-xs text-[var(--hive-text-muted)]">
                    <MapPin className="w-3 h-3" />
                    {profile.academicInfo.housing}
                  </div>
                )}
              </div>

              {/* Online Status */}
              <div className="flex items-center gap-2 text-xs">
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  profile.isOnline ? 'bg-green-500' : 'bg-gray-400',
                  profile.ghostMode && 'bg-gray-300 opacity-50'
                )} />
                <span className="text-[var(--hive-text-muted)]">
                  {profile.ghostMode;
                    ? 'Ghost Mode' 
                    : profile.isOnline;
                    ? 'Online' 
                    : `Last seen ${profile.lastSeen}`
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          {!isEditing && profile.bio && (
            <div className="space-y-2">
              <p className="text-sm text-[var(--hive-text-secondary)]">
                {showFullBio ? profile.bio : bioPreview}
              </p>
              {profile.bio.length > 120 && (
                <Button;
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="h-6 px-2 text-xs"
                >
                  {showFullBio ? 'Show less' : 'Show more'}
                </Button>
              )}
            </div>
          )}

          {/* Edit Form */}
          <AnimatePresence>
            {isEditing && (
              <ProfileEditForm;
                profile={profile}
                onSave={handleSaveProfile}
                onCancel={handleCancelEdit}
              />
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Photo Upload Dialog */}
      <PhotoUploadDialog;
        currentPhoto={profile.profilePhotoURL}
        onUpload={onPhotoUpload}
        isOpen={photoDialogOpen}
        onOpenChange={setPhotoDialogOpen}
      />
    </>
  )
}

// Default props for development;
export const mockUserProfile: UserProfile = {
  id: 'user-1',
  displayName: 'Sarah Chen',
  email: 'sarahc@buffalo.edu',
  profilePhotoURL: 'https://images.unsplash.com/photo-1494790108755-2616b2e5c60a?w=128&h=128&fit=crop&crop=face',
  bio: 'CS student passionate about building tools that help campus life. Always down for a good study session! 🚀 Love working on projects that make a real difference.',
  academicInfo: {
    year: '2026',
    major: 'Computer Science',
    school: 'University at Buffalo',
    housing: 'West Campus'
  },
  builderStatus: true,
  isVerified: false,
  ghostMode: false,
  lastSeen: '2 hours ago',
  isOnline: true;
};