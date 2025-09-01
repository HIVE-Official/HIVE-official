"use client";

import React, { useState } from 'react';
import { Card, Button } from '@hive/ui';
import { 
  User,
  Camera,
  Edit3,
  Mail,
  AtSign,
  GraduationCap,
  MapPin,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';

interface ProfileData {
  id: string;
  fullName?: string;
  handle?: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  completionPercentage: number;
}

interface IdentityCardProps {
  profile: ProfileData | null;
  onUpdate: (updates: Partial<ProfileData>) => void;
  isUnlocked: boolean;
}

export function IdentityCard({ profile, onUpdate, isUnlocked }: IdentityCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !profile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate({ avatarUrl: data.avatarUrl });
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerPhotoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handlePhotoUpload;
    input.click();
  };

  if (!isUnlocked) {
    return (
      <Card className="p-6 opacity-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-sm text-muted-foreground">Identity card locked</div>
        </div>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground">Loading profile...</div>
        </div>
      </Card>
    );
  }

  const isComplete = profile.fullName && profile.handle && profile.bio && profile.avatarUrl;

  return (
    <Card className="p-6 relative overflow-hidden">
      {/* Completion indicator */}
      {isComplete && (
        <div className="absolute top-4 right-4">
          <Sparkles className="h-5 w-5 text-accent" />
        </div>
      )}

      {/* Avatar section */}
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mx-auto">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || 'Profile'}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
          </div>
          
          {/* Photo upload button */}
          <button
            onClick={triggerPhotoUpload}
            disabled={isUploading}
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center hover:bg-accent/80 transition-colors"
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <Camera className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Profile info */}
      <div className="space-y-3">
        {/* Name and handle */}
        <div className="text-center">
          <div className="font-semibold text-foreground">
            {profile.fullName || 'Add your name'}
          </div>
          <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            <AtSign className="h-3 w-3" />
            {profile.handle || 'choose-handle'}
          </div>
        </div>

        {/* Bio */}
        <div className="text-sm text-center">
          {profile.bio ? (
            <p className="text-foreground">{profile.bio}</p>
          ) : (
            <p className="text-muted-foreground italic">Add a short bio about yourself</p>
          )}
        </div>

        {/* Academic info */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          {profile.major && (
            <div className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" />
              {profile.major}
            </div>
          )}
          {profile.graduationYear && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-muted-foreground rounded-full" />
              Class of {profile.graduationYear}
            </div>
          )}
        </div>

        {/* Email (always shown) */}
        <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Mail className="h-3 w-3" />
          {profile.email}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 space-y-2">
        <Button 
          onClick={() => setIsEditing(true)}
          variant="outline" 
          className="w-full"
          size="sm"
        >
          <Edit3 className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>

        {/* Quick completion indicator */}
        <div className="text-center">
          <div className="text-xs text-muted-foreground">
            Profile {profile.completionPercentage}% complete
          </div>
          <div className="w-full bg-muted rounded-full h-1 mt-1">
            <div 
              className="bg-accent h-1 rounded-full transition-all duration-300"
              style={{ width: `${profile.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}