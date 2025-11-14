'use client';

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
import { cn } from '@/lib/utils';
import {
  MediaViewer,
  MediaViewerTrigger,
  MediaViewerContent,
  MediaViewerViewport,
  MediaViewerClose,
} from '../atoms/media-viewer';
import { PlayIcon } from '../../00-Global/atoms/icon-library';

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

export const FeedMediaPreview = React.forwardRef<HTMLDivElement, FeedMediaPreviewProps>(
  ({ media, className, rounded = true }, ref) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [lightboxOpen, setLightboxOpen] = React.useState(false);

    if (!media || media.length === 0) {
      return null;
    }

    const count = Math.min(media.length, 4); // Max 4 items

    // Grid layout classes based on count
    const getGridClasses = () => {
      switch (count) {
        case 1:
          return 'grid-cols-1';
        case 2:
          return 'grid-cols-2';
        case 3:
          return 'grid-cols-2'; // 2 cols with 3rd item spanning
        case 4:
          return 'grid-cols-2';
        default:
          return 'grid-cols-1';
      }
    };

    // Item-specific classes
    const getItemClasses = (index: number) => {
      if (count === 3 && index === 2) {
        return 'col-span-2'; // Third item spans full width
      }
      return '';
    };

    const handleMediaClick = (index: number) => {
      setSelectedIndex(index);
      setLightboxOpen(true);
    };

    return (
      <>
        {/* Media Grid */}
        <div
          ref={ref}
          className={cn(
            'grid gap-1',
            getGridClasses(),
            className
          )}
        >
          {media.slice(0, 4).map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleMediaClick(index)}
              className={cn(
                'group relative aspect-[4/3] overflow-hidden bg-[var(--hive-background-secondary)] transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-primary)]',
                rounded && 'rounded-xl',
                getItemClasses(index),
                count === 1 && 'aspect-[16/9]', // Single image has different aspect ratio
              )}
            >
              {/* Image */}
              {item.type === 'image' && (
                <img
                  src={item.url}
                  alt={item.alt || `Image ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              )}

              {/* Video */}
              {item.type === 'video' && (
                <>
                  <img
                    src={item.thumbnail || item.url}
                    alt={item.alt || `Video ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all group-hover:bg-black/40">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                      <PlayIcon className="h-8 w-8 text-black" />
                    </div>
                  </div>
                </>
              )}

              {/* More indicator (if > 4 items) */}
              {index === 3 && media.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                  <span className="text-3xl font-bold text-white">
                    +{media.length - 4}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Lightbox */}
        <MediaViewer open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <MediaViewerContent>
            <MediaViewerViewport>
              {media[selectedIndex]?.type === 'image' && (
                <img
                  src={media[selectedIndex].url}
                  alt={media[selectedIndex].alt || `Image ${selectedIndex + 1}`}
                  className="max-h-[90vh] max-w-full object-contain"
                />
              )}
              {media[selectedIndex]?.type === 'video' && (
                <video
                  src={media[selectedIndex].url}
                  controls
                  autoPlay
                  className="max-h-[90vh] max-w-full"
                />
              )}
            </MediaViewerViewport>
            <MediaViewerClose />
          </MediaViewerContent>
        </MediaViewer>
      </>
    );
  }
);

FeedMediaPreview.displayName = 'FeedMediaPreview';
