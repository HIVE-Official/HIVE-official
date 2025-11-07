/**
 * FeedMediaPreview - Media grid for post attachments
 *
 * Features:
 * - 1-4 image/video grid layouts
 * - Lightbox on click (using MediaViewer)
 * - Lazy loading for performance
 * - Responsive aspect ratios
 * - Video play overlay
 *
 * Usage:
 * ```tsx
 * import { FeedMediaPreview } from '@hive/ui';
 *
 * <FeedMediaPreview
 *   media={[
 *     { type: 'image', url: 'https://...', alt: 'Photo 1' },
 *     { type: 'video', url: 'https://...', thumbnail: 'https://...' }
 *   ]}
 * />
 * ```
 */
import * as React from 'react';
export interface MediaItem {
    /**
     * Media type
     */
    type: 'image' | 'video';
    /**
     * Media URL
     */
    url: string;
    /**
     * Alt text for images
     */
    alt?: string;
    /**
     * Thumbnail URL for videos
     */
    thumbnail?: string;
    /**
     * Width (for aspect ratio)
     */
    width?: number;
    /**
     * Height (for aspect ratio)
     */
    height?: number;
}
export interface FeedMediaPreviewProps {
    /**
     * Array of media items (1-4)
     */
    media: MediaItem[];
    /**
     * Additional class names
     */
    className?: string;
    /**
     * Rounded corners
     * @default true
     */
    rounded?: boolean;
}
export declare const FeedMediaPreview: React.ForwardRefExoticComponent<FeedMediaPreviewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=feed-media-preview.d.ts.map