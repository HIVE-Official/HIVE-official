"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils';

// =============================================================================
// 📸 **PHOTO CAROUSEL - SOCIAL DISCOVERY COMPONENT**
// =============================================================================
// Tinder-style photo carousel for HIVE profiles
// Supports 1-6 photos with portrait card format and context tags

export interface PhotoCarouselProps {
  /** Array of photo URLs */
  photos: string[];
  /** Optional context tags for each photo */
  photoContexts?: string[];
  /** Primary photo index (which photo to show first) */
  primaryPhotoIndex?: number;
  /** Aspect ratio - portrait for social discovery */
  aspectRatio?: 'portrait' | 'square' | 'landscape';
  /** Show navigation dots */
  showIndicators?: boolean;
  /** Show context tags on photos */
  showContextTags?: boolean;
  /** Enable swipe/tap navigation */
  enableNavigation?: boolean;
  /** Custom className for styling */
  className?: string;
  /** Callback when photo changes */
  onPhotoChange?: (photoIndex: number) => void;
  /** Click handler for photo */
  onPhotoClick?: (photoIndex: number) => void;
}

export const PhotoCarousel: React.FC<PhotoCarouselProps> = ({
  photos,
  photoContexts = [],
  primaryPhotoIndex = 0,
  aspectRatio = 'portrait',
  showIndicators = true,
  showContextTags = true,
  enableNavigation = true,
  className,
  onPhotoChange,
  onPhotoClick,
}) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(primaryPhotoIndex);
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<number, boolean>>({});

  // Ensure we don't exceed array bounds
  const validatedPhotos = useMemo(() => {
    return photos.filter(photo => photo && photo.length > 0).slice(0, 6);
  }, [photos]);

  // Handle photo navigation
  const goToPhoto = useCallback((index: number) => {
    if (index >= 0 && index < validatedPhotos.length) {
      setCurrentPhotoIndex(index);
      onPhotoChange?.(index);
    }
  }, [validatedPhotos.length, onPhotoChange]);

  const goToPrevious = useCallback(() => {
    const prevIndex = currentPhotoIndex > 0 ? currentPhotoIndex - 1 : validatedPhotos.length - 1;
    goToPhoto(prevIndex);
  }, [currentPhotoIndex, validatedPhotos.length, goToPhoto]);

  const goToNext = useCallback(() => {
    const nextIndex = currentPhotoIndex < validatedPhotos.length - 1 ? currentPhotoIndex + 1 : 0;
    goToPhoto(nextIndex);
  }, [currentPhotoIndex, validatedPhotos.length, goToPhoto]);

  // Handle image loading errors
  const handleImageError = useCallback((photoIndex: number) => {
    setImageLoadErrors(prev => ({...prev, [photoIndex]: true}));
  }, []);

  // Handle tap navigation (left/right zones)
  const handlePhotoClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableNavigation || validatedPhotos.length <= 1) {
      onPhotoClick?.(currentPhotoIndex);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const containerWidth = rect.width;

    // Left 30% = previous, right 30% = next, center 40% = photo click
    if (clickX < containerWidth * 0.3) {
      goToPrevious();
    } else if (clickX > containerWidth * 0.7) {
      goToNext();
    } else {
      onPhotoClick?.(currentPhotoIndex);
    }
  }, [enableNavigation, validatedPhotos.length, currentPhotoIndex, onPhotoClick, goToPrevious, goToNext]);

  // Get aspect ratio classes
  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]', // 9:12 ratio for mobile portrait
    square: 'aspect-square',
    landscape: 'aspect-[4/3]'
  };

  if (!validatedPhotos.length) {
    return (
      <div className={cn(
        "relative rounded-2xl bg-gradient-to-br from-hive-gold/20 to-purple-600/20 flex items-center justify-center",
        aspectRatioClasses[aspectRatio],
        className
      )}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-hive-gold/20 flex items-center justify-center mb-4 mx-auto">
            <svg className="w-8 h-8 text-hive-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p className="text-white/70 text-sm">Add photos to get started</p>
        </div>
      </div>
    );
  }

  const currentPhoto = validatedPhotos[currentPhotoIndex];
  const currentContext = photoContexts[currentPhotoIndex];
  const hasError = imageLoadErrors[currentPhotoIndex];

  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl bg-gray-900 shadow-lg",
      "border border-gray-700/50 hover:border-hive-gold/30 transition-all duration-300",
      aspectRatioClasses[aspectRatio],
      className
    )}>
      {/* Main Photo */}
      <div
        className="relative w-full h-full cursor-pointer group"
        onClick={handlePhotoClick}
      >
        {!hasError ? (
          <img
            src={currentPhoto}
            alt={`Profile photo ${currentPhotoIndex + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => handleImageError(currentPhotoIndex)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-2 mx-auto">
                <svg className="w-6 h-6 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p className="text-gray-400 text-xs">Photo unavailable</p>
            </div>
          </div>
        )}

        {/* Bottom Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Context Tag */}
        {showContextTags && currentContext && !hasError && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-hive-gold/90 text-black backdrop-blur-sm">
              {currentContext}
            </span>
          </div>
        )}

        {/* Navigation Zones (invisible but functional) */}
        {enableNavigation && validatedPhotos.length > 1 && (
          <>
            <div className="absolute left-0 top-0 w-[30%] h-full bg-transparent" />
            <div className="absolute right-0 top-0 w-[30%] h-full bg-transparent" />
          </>
        )}
      </div>

      {/* Photo Indicators */}
      {showIndicators && validatedPhotos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2">
            {validatedPhotos.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPhoto(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === currentPhotoIndex
                    ? "bg-hive-gold scale-125"
                    : "bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Photo Counter */}
      {validatedPhotos.length > 1 && (
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-black/50 text-white backdrop-blur-sm">
            {currentPhotoIndex + 1}/{validatedPhotos.length}
          </span>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// 🎨 **PORTRAIT CARD WRAPPER** - For Social Discovery
// =============================================================================
// Full Tinder-style portrait card with name overlays and social context

export interface PortraitCardProps extends PhotoCarouselProps {
  /** User's display name */
  displayName?: string;
  /** Age (calculated from graduation year) */
  age?: number;
  /** Graduation year */
  graduationYear?: number;
  /** Academic major */
  major?: string;
  /** Show user info overlay */
  showUserInfo?: boolean;
  /** Mutual connections count */
  mutualConnections?: number;
  /** Mutual spaces */
  mutualSpaces?: string[];
  /** Activity status */
  activityStatus?: 'online' | 'active_today' | 'active_week';
  /** Verification badge */
  isVerified?: boolean;
}

export const PortraitCard: React.FC<PortraitCardProps> = ({
  displayName,
  age,
  graduationYear,
  major,
  showUserInfo = true,
  mutualConnections,
  mutualSpaces = [],
  activityStatus,
  isVerified,
  ...carouselProps
}) => {
  return (
    <div className="relative">
      <PhotoCarousel
        {...carouselProps}
        aspectRatio="portrait"
        className={cn("shadow-2xl shadow-hive-gold/20", carouselProps.className)}
      />

      {/* User Info Overlay */}
      {showUserInfo && displayName && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Main User Info */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-semibold text-white">
                  {displayName}
                  {age && `, ${age}`}
                </h3>
                {isVerified && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </div>
                )}
              </div>
              {major && graduationYear && (
                <p className="text-white/80 text-sm">
                  {major} • {graduationYear}
                </p>
              )}
            </div>

            {/* Activity Status */}
            {activityStatus && (
              <div className="flex items-center space-x-1">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  activityStatus === 'online' ? 'bg-green-400' :
                  activityStatus === 'active_today' ? 'bg-yellow-400' :
                  'bg-gray-400'
                )} />
                <span className="text-white/60 text-xs">
                  {activityStatus === 'online' ? 'Active now' :
                   activityStatus === 'active_today' ? 'Active today' :
                   'Active this week'}
                </span>
              </div>
            )}
          </div>

          {/* Social Proof */}
          {(mutualConnections !== undefined || mutualSpaces.length > 0) && (
            <div className="space-y-1">
              {mutualConnections !== undefined && mutualConnections > 0 && (
                <p className="text-white/70 text-sm">
                  👥 {mutualConnections} mutual connection{mutualConnections !== 1 ? 's' : ''}
                </p>
              )}
              {mutualSpaces.length > 0 && (
                <p className="text-white/70 text-sm">
                  📍 {mutualSpaces.length > 1
                    ? `${mutualSpaces.length} shared spaces`
                    : `Both in ${mutualSpaces[0]}`}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;