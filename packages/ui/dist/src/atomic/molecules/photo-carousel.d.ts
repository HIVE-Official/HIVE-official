import React from 'react';
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
export declare const PhotoCarousel: React.FC<PhotoCarouselProps>;
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
export declare const PortraitCard: React.FC<PortraitCardProps>;
export default PhotoCarousel;
//# sourceMappingURL=photo-carousel.d.ts.map