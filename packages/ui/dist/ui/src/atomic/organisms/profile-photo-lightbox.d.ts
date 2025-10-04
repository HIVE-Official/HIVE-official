import * as React from "react";
export interface ProfilePhotoLightboxProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of photo URLs */
    photos: string[];
    /** Initially active photo index */
    initialIndex?: number;
    /** Is lightbox open */
    isOpen: boolean;
    /** Callback when lightbox closes */
    onClose: () => void;
    /** Profile name for alt text and sharing */
    profileName: string;
    /** Optional download handler */
    onDownload?: (photoUrl: string) => void;
    /** Optional share handler */
    onShare?: (photoUrl: string) => void;
}
/**
 * Profile Photo Lightbox
 *
 * Full-screen modal for viewing profile photos with:
 * - Keyboard navigation (arrow keys, escape)
 * - Swipe gestures (touch)
 * - Download and share actions
 * - Smooth transitions
 * - Dark overlay
 *
 * Design Pattern: Modal-first IA
 * - Opens from ProfilePhotoCarousel
 * - Preserves navigation context
 * - Smooth enter/exit transitions
 */
declare const ProfilePhotoLightbox: React.ForwardRefExoticComponent<ProfilePhotoLightboxProps & React.RefAttributes<HTMLDivElement>>;
export { ProfilePhotoLightbox };
//# sourceMappingURL=profile-photo-lightbox.d.ts.map