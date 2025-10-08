import * as React from "react";
export interface ProfilePhotoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of photo URLs */
    photos: string[];
    /** Currently active photo index */
    activeIndex?: number;
    /** Callback when photo changes */
    onPhotoChange?: (index: number) => void;
    /** Callback when user wants to view full screen */
    onOpenLightbox?: (index: number) => void;
    /** Profile name for alt text */
    profileName: string;
}
/**
 * Profile Photo Carousel
 *
 * Tinder-style photo navigation with:
 * - Click zones (left/right to navigate)
 * - Interactive indicator dots
 * - Keyboard navigation (arrow keys)
 * - Full-screen expand button
 * - Smooth transitions
 *
 * Design Pattern: Modal-first IA
 * - Clicking photo opens lightbox modal (no route change)
 * - Indicators show total photos at a glance
 */
declare const ProfilePhotoCarousel: React.ForwardRefExoticComponent<ProfilePhotoCarouselProps & React.RefAttributes<HTMLDivElement>>;
export { ProfilePhotoCarousel };
//# sourceMappingURL=profile-photo-carousel.d.ts.map