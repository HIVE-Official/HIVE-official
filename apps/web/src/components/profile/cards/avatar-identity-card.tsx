"use client";

import React, { useState } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Camera, 
  Edit3, 
  MapPin, 
  Calendar,
  GraduationCap,
  BookOpen,
  Wrench,
  Settings
} from 'lucide-react';
import Image from 'next/image';
import { useProfile } from '@/hooks/use-profile';

interface AvatarIdentityCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function AvatarIdentityCard({ settings: _settings, isEditMode, className }: AvatarIdentityCardProps) {
  const { profile, isLoading, updateProfile } = useProfile();
  const [_isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/2 mx-auto"></div>
        </div>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center text-muted-foreground">
          <div className="text-sm">Profile not found</div>
        </div>
      </Card>
    );
  }

  const handlePhotoUpload = () => {
    // Open photo upload modal
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle photo upload
        const formData = new FormData();
        formData.append('photo', file);
        
        try {
          const response = await fetch('/api/profile/upload-photo', {
            method: 'POST',
            body: formData
          });
          
          if (response.ok) {
            const data = await response.json();
            updateProfile({ avatarUrl: data.avatarUrl });
          }
        } catch (error) {
          console.error('Error uploading photo:', error);
        }
      }
    };
    input.click();
  };

  return (
    <Card className={`p-6 relative ${className}`}>
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute top-2 right-2 opacity-50">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Avatar Section */}
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-2xl font-bold text-muted-foreground">
                {profile.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          
          {!isEditMode && (
            <button
              onClick={handlePhotoUpload}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-accent text-accent-foreground rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors"
            >
              <Camera className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Identity Information */}
      <div className="text-center space-y-2">
        {/* Name and Handle */}
        <div>
          <h3 className="font-semibold text-foreground text-lg">
            {profile.fullName || 'Unknown User'}
          </h3>
          <p className="text-sm text-muted-foreground">
            @{profile.handle || 'no_handle'}
          </p>
        </div>

        {/* Academic Info Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-3">
          {/* Handle both legacy major (string) and new majors (array) */}
          {(profile.majors && profile.majors.length > 0) ? (
            // New majors array format
            profile.majors.slice(0, 2).map((major, index) => (
              <Badge key={major} variant="secondary" className="text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                {major}
              </Badge>
            ))
          ) : (
            // Legacy single major format for backward compatibility
            profile.major && (
              <Badge variant="secondary" className="text-xs">
                <BookOpen className="h-3 w-3 mr-1" />
                {profile.major}
              </Badge>
            )
          )}
          {/* Show +N indicator if there are more than 2 majors */}
          {profile.majors && profile.majors.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{profile.majors.length - 2} more
            </Badge>
          )}
          
          {profile.academicYear && (
            <Badge variant="secondary" className="text-xs">
              <GraduationCap className="h-3 w-3 mr-1" />
              {profile.academicYear}
            </Badge>
          )}
          
          {profile.builderStatus && (
            <Badge className="bg-accent text-accent-foreground text-xs">
              <Wrench className="h-3 w-3 mr-1" />
              Builder
            </Badge>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed px-2">
            {profile.bio}
          </p>
        )}

        {/* Location and Graduation */}
        <div className="space-y-1 text-xs text-muted-foreground">
          {profile.housing && (
            <div className="flex items-center justify-center gap-1">
              <MapPin className="h-3 w-3" />
              {profile.housing}
            </div>
          )}
          
          {profile.graduationYear && (
            <div className="flex items-center justify-center gap-1">
              <Calendar className="h-3 w-3" />
              Class of {profile.graduationYear}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex justify-center gap-4 pt-3 border-t border-border/50">
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">12</div>
            <div className="text-xs text-muted-foreground">Spaces</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">8</div>
            <div className="text-xs text-muted-foreground">Tools</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-foreground">24</div>
            <div className="text-xs text-muted-foreground">Friends</div>
          </div>
        </div>

        {/* Edit Profile Button */}
        {!isEditMode && (
          <div className="pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="w-full"
            >
              <Edit3 className="h-3 w-3 mr-2" />
              Edit Profile
            </Button>
          </div>
        )}
      </div>

      {/* Online Status Indicator */}
      <div className="absolute top-6 left-6">
        <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
      </div>
    </Card>
  );
}