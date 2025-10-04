"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"

export interface ProfilePhotoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of photo URLs */
  photos: string[]

  /** Currently active photo index */
  activeIndex?: number

  /** Callback when photo changes */
  onPhotoChange?: (index: number) => void

  /** Callback when user wants to view full screen */
  onOpenLightbox?: (index: number) => void

  /** Profile name for alt text */
  profileName: string
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
const ProfilePhotoCarousel = React.forwardRef<HTMLDivElement, ProfilePhotoCarouselProps>(
  ({
    className,
    photos,
    activeIndex: controlledIndex,
    onPhotoChange,
    onOpenLightbox,
    profileName,
    ...props
  }, ref) => {
    const [internalIndex, setInternalIndex] = React.useState(0)
    const isControlled = controlledIndex !== undefined
    const currentIndex = isControlled ? controlledIndex : internalIndex

    // Update index (controlled or uncontrolled)
    const updateIndex = React.useCallback((newIndex: number) => {
      const validIndex = Math.max(0, Math.min(newIndex, photos.length - 1))

      if (!isControlled) {
        setInternalIndex(validIndex)
      }

      onPhotoChange?.(validIndex)
    }, [photos.length, isControlled, onPhotoChange])

    // Navigation handlers
    const goToPrevious = React.useCallback((e: React.MouseEvent) => {
      e.stopPropagation()
      updateIndex(currentIndex - 1)
    }, [currentIndex, updateIndex])

    const goToNext = React.useCallback((e: React.MouseEvent) => {
      e.stopPropagation()
      updateIndex(currentIndex + 1)
    }, [currentIndex, updateIndex])

    const goToIndex = React.useCallback((index: number, e: React.MouseEvent) => {
      e.stopPropagation()
      updateIndex(index)
    }, [updateIndex])

    // Keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          updateIndex(currentIndex - 1)
        } else if (e.key === 'ArrowRight') {
          updateIndex(currentIndex + 1)
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentIndex, updateIndex])

    // Click photo to open lightbox
    const handlePhotoClick = React.useCallback(() => {
      onOpenLightbox?.(currentIndex)
    }, [currentIndex, onOpenLightbox])

    if (!photos || photos.length === 0) {
      return (
        <div ref={ref} className={cn("flex items-center justify-center bg-muted rounded-3xl", className)} {...props}>
          <p className="text-muted-foreground text-sm">No photos</p>
        </div>
      )
    }

    const hasMultiplePhotos = photos.length > 1

    return (
      <div ref={ref} className={cn("relative group", className)} {...props}>
        {/* Photo Display */}
        <div
          className="relative overflow-hidden rounded-3xl border-4 border-border shadow-2xl cursor-pointer h-full"
          onClick={handlePhotoClick}
        >
          <img
            src={photos[currentIndex]}
            alt={`${profileName} - Photo ${currentIndex + 1}`}
            className="h-full w-full object-cover transition-opacity duration-300"
          />

          {/* Expand icon (hover) */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
              <Maximize2 className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* Navigation Zones (only if multiple photos) */}
          {hasMultiplePhotos && (
            <>
              {/* Left zone */}
              {currentIndex > 0 && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity group/nav"
                  onClick={goToPrevious}
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/nav:opacity-100 transition-opacity">
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}

              {/* Right zone */}
              {currentIndex < photos.length - 1 && (
                <div
                  className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity group/nav"
                  onClick={goToNext}
                >
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/nav:opacity-100 transition-opacity">
                    <ChevronRight className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Photo Indicators (Tinder-style) */}
          {hasMultiplePhotos && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => goToIndex(index, e)}
                  className={cn(
                    "flex-1 max-w-[100px] h-1 rounded-full transition-all cursor-pointer",
                    index === currentIndex
                      ? "bg-white shadow-lg"
                      : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
)

ProfilePhotoCarousel.displayName = "ProfilePhotoCarousel"

export { ProfilePhotoCarousel }
