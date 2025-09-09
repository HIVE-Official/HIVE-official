"use client";

import React, { useState, useEffect } from 'react';
import { Button, Badge } from '@hive/ui';
import { 
  Edit,
  Camera,
  ChevronLeft,
  ChevronRight,
  MapPin,
  School,
  Calendar,
  Users,
  Shield,
  Ghost,
  Sparkles,
  Clock
} from 'lucide-react';
import { useProfileModern } from '@hive/hooks';
import Image from 'next/image';

interface Photo {
  id: string;
  url: string;
  context: string[];
  privacy: 'public' | 'friends' | 'private';
}

interface IdentityModuleProps {
  editable?: boolean;
  onEdit?: () => void;
}

export function IdentityModule({ editable = true, onEdit }: IdentityModuleProps) {
  const { profile, updateProfile } = useProfileModern();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: profile?.avatarUrl || '/default-avatar.png',
      context: ['main', 'campus'],
      privacy: 'public'
    }
  ]);
  
  const [status, setStatus] = useState({
    vibe: '🎯',
    text: 'Thriving',
    availability: 'Available 2hr',
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000)
  });

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const getVerificationBadge = () => {
    if (profile?.email?.endsWith('@buffalo.edu')) {
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
          <Shield className="h-3 w-3 mr-1" />
          UB Verified
        </Badge>
      );
    }
    return null;
  };

  const getAvailabilityColor = () => {
    if (status.availability.includes('Available')) {
      return 'text-green-400';
    } else if (status.availability.includes('Busy')) {
      return 'text-[var(--hive-gold)]';
    }
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Mobile Layout (140px height) */}
      <div className="md:hidden">
        <div className="flex items-start p-4 gap-3">
          {/* Photo Carousel - 80px */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted relative group">
              {photos.length > 0 && (
                <Image
                  src={photos[currentPhotoIndex].url}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              )}
              
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-1 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-1 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </>
              )}
            </div>
            
            {/* Photo dots indicator */}
            {photos.length > 1 && (
              <div className="flex justify-center gap-1 mt-1">
                {photos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      idx === currentPhotoIndex 
                        ? 'bg-accent' 
                        : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-lg text-foreground truncate">
                  {profile?.fullName || 'Student'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {profile?.major || 'Undeclared'} • {profile?.year || 'Freshman'}
                </p>
                {profile?.pronouns && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {profile.pronouns}
                  </p>
                )}
              </div>
              
              {editable && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onEdit}
                  className="h-7 px-2"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg">{status.vibe}</span>
              <span className="text-sm font-medium">{status.text}</span>
              <span className={`text-xs ${getAvailabilityColor()}`}>
                • {status.availability}
              </span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-2">
              {getVerificationBadge()}
              {profile?.achievements?.includes('builder') && (
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Builder
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (160px height) */}
      <div className="hidden md:block">
        <div className="flex items-center p-6 gap-6">
          {/* Photo Carousel - Larger on desktop */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-muted relative group">
              {photos.length > 0 && (
                <Image
                  src={photos[currentPhotoIndex].url}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              )}
              
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-1 top-1/2 -translate-y-1/2 p-1.5 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 bg-background/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
            
            {/* Photo dots indicator */}
            {photos.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-2">
                {photos.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                      idx === currentPhotoIndex 
                        ? 'bg-accent' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    onClick={() => setCurrentPhotoIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info Section - More spacious on desktop */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-bold text-2xl text-foreground">
                    {profile?.fullName || 'Student'}
                  </h1>
                  {getVerificationBadge()}
                </div>
                
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <School className="h-4 w-4" />
                    {profile?.major || 'Undeclared'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {profile?.year || 'Freshman'}
                  </span>
                  {profile?.dormBuilding && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profile.dormBuilding}
                    </span>
                  )}
                  {profile?.pronouns && (
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {profile.pronouns}
                    </span>
                  )}
                </div>
              </div>
              
              {editable && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onEdit}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Status Section */}
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{status.vibe}</span>
                  <div>
                    <p className="font-medium text-foreground">{status.text}</p>
                    <p className={`text-sm ${getAvailabilityColor()}`}>
                      <Clock className="h-3 w-3 inline mr-1" />
                      {status.availability}
                    </p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {/* Open status update modal */}}
                >
                  Update Status
                </Button>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="flex items-center gap-2 mt-3">
              {profile?.achievements?.includes('builder') && (
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Tool Builder
                </Badge>
              )}
              {profile?.achievements?.includes('leader') && (
                <Badge className="bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border-[var(--hive-gold)]/30">
                  <Users className="h-4 w-4 mr-1" />
                  Community Leader
                </Badge>
              )}
              {profile?.privacySettings?.ghostMode && (
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Ghost className="h-4 w-4 mr-1" />
                  Ghost Mode
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}