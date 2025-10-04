import * as React from "react";
export interface PhotoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of photo URLs (max 5 for profile galleries) */
    photos: string[];
    /** Alt text prefix (will append index) */
    altPrefix?: string;
    /** Aspect ratio class */
    aspectRatio?: "square" | "portrait" | "wide";
}
declare const PhotoCarousel: React.ForwardRefExoticComponent<PhotoCarouselProps & React.RefAttributes<HTMLDivElement>>;
export { PhotoCarousel };
//# sourceMappingURL=photo-carousel.d.ts.map