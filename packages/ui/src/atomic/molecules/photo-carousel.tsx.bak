"use client"

import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../atoms/carousel"
import { cn } from "../../lib/utils"

export interface PhotoCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of photo URLs (max 5 for profile galleries) */
  photos: string[]
  /** Alt text prefix (will append index) */
  altPrefix?: string
  /** Aspect ratio class */
  aspectRatio?: "square" | "portrait" | "wide"
}

const PhotoCarousel = React.forwardRef<HTMLDivElement, PhotoCarouselProps>(
  ({ className, photos, altPrefix = "Photo", aspectRatio = "portrait", ...props }, ref) => {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    // Limit to 5 photos max
    const displayPhotos = photos.slice(0, 5)

    React.useEffect(() => {
      if (!api) {
        return
      }

      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap())

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap())
      })
    }, [api])

    const aspectRatioClass = {
      square: "aspect-square",
      portrait: "aspect-[4/5]", // Tinder-style portrait
      wide: "aspect-video",
    }[aspectRatio]

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {displayPhotos.map((photo, index) => (
              <CarouselItem key={index}>
                <div className={cn("relative overflow-hidden rounded-2xl bg-muted", aspectRatioClass)}>
                  <img
                    src={photo}
                    alt={`${altPrefix} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Dot indicators (Tinder-style) */}
          {count > 1 && (
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-10">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-1 rounded-full transition-all",
                    index === current
                      ? "w-8 bg-white"
                      : "w-1 bg-white/50 hover:bg-white/75"
                  )}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Photo counter */}
          {count > 1 && (
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              {current + 1} / {count}
            </div>
          )}
        </Carousel>
      </div>
    )
  }
)

PhotoCarousel.displayName = "PhotoCarousel"

export { PhotoCarousel }
