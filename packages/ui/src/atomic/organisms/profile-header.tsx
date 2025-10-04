"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar"
import { Badge } from "../atoms/badge"
import { Button } from "../atoms/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "../atoms/carousel"
import { cn } from "../../lib/utils"

export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Profile display name */
  name: string
  /** Profile handle (@username) */
  handle: string
  /** Avatar image URL */
  avatarUrl?: string
  /** Multiple profile photos for swipeable avatar (max 5) */
  photos?: string[]
  /** Bio/description text */
  bio?: string
  /** Academic major */
  major?: string
  /** Academic year (Freshman, Sophomore, etc) */
  academicYear?: string
  /** Graduation year */
  graduationYear?: number
  /** Pronouns */
  pronouns?: string
  /** Whether profile is verified */
  verified?: boolean
  /** Whether this is the current user's profile (show edit button) */
  isOwnProfile?: boolean
  /** Whether already connected */
  isConnected?: boolean
  /** Connection status badges */
  badges?: Array<{
    label: string
    variant?: "default" | "secondary" | "outline" | "destructive"
  }>
  /** Callback when connect button is clicked */
  onConnect?: () => void
  /** Callback when message button is clicked */
  onMessage?: () => void
  /** Callback when edit profile is clicked */
  onEdit?: () => void
}

const ProfileHeader = React.forwardRef<HTMLDivElement, ProfileHeaderProps>(
  ({
    className,
    name,
    handle,
    avatarUrl,
    photos,
    bio,
    major,
    academicYear,
    graduationYear,
    pronouns,
    verified = false,
    isOwnProfile = false,
    isConnected = false,
    badges = [],
    onConnect,
    onMessage,
    onEdit,
    ...props
  }, ref) => {
    // Generate initials from name
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    // Carousel state for swipeable photos
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    // Limit to 5 photos max (HIVE spec)
    const displayPhotos = photos?.slice(0, 5)
    const hasMultiplePhotos = displayPhotos && displayPhotos.length > 1

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

    return (
      <div
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      >
        {/* Top section: Avatar + Name + Actions */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Large Tinder-style portrait (3:4 aspect ratio per spec: 450×600) */}
          {hasMultiplePhotos ? (
            // Swipeable avatar carousel
            <div className="w-60 shrink-0 mx-auto sm:mx-0">
              <Carousel setApi={setApi} opts={{ loop: true }}>
                <CarouselContent>
                  {displayPhotos.map((photo, index) => (
                    <CarouselItem key={index}>
                      <div className="h-80 w-60 rounded-3xl border-4 border-border shadow-2xl overflow-hidden bg-muted">
                        <img
                          src={photo}
                          alt={`${name} - Photo ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Tinder-style dot indicators */}
                {count > 1 && (
                  <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {Array.from({ length: count }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={cn(
                          "h-1 rounded-full transition-all",
                          index === current
                            ? "w-8 bg-white shadow-md"
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
          ) : (
            // Single avatar (fallback)
            <Avatar className="h-80 w-60 rounded-3xl border-4 border-border shadow-2xl shrink-0 mx-auto sm:mx-0">
              <AvatarImage src={avatarUrl || displayPhotos?.[0]} alt={name} className="object-cover" />
              <AvatarFallback className="rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10 text-5xl font-bold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}

          {/* Name, handle, academic info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl font-bold text-foreground">{name}</h1>
                {verified && (
                  <svg
                    className="h-6 w-6 shrink-0 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                )}
              </div>

              <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                <span>@{handle}</span>
                {pronouns && (
                  <>
                    <span>•</span>
                    <span>{pronouns}</span>
                  </>
                )}
              </div>

              {/* Academic info */}
              {(major || academicYear || graduationYear) && (
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  {major && (
                    <span className="text-foreground font-medium">{major}</span>
                  )}
                  {major && (academicYear || graduationYear) && (
                    <span className="text-muted-foreground">•</span>
                  )}
                  {academicYear && (
                    <span className="text-muted-foreground">{academicYear}</span>
                  )}
                  {graduationYear && (
                    <span className="text-muted-foreground">Class of {graduationYear}</span>
                  )}
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              {isOwnProfile ? (
                <Button onClick={onEdit} variant="outline">
                  <svg className="mr-2 h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit Profile
                </Button>
              ) : (
                <>
                  {isConnected ? (
                    <Button onClick={onMessage} variant="default">
                      <svg className="mr-2 h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                      </svg>
                      Message
                    </Button>
                  ) : (
                    <Button onClick={onConnect} variant="default">
                      <svg className="mr-2 h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                      </svg>
                      Connect
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            {bio}
          </p>
        )}

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge
                key={index}
                variant={badge.variant || "secondary"}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        )}
      </div>
    )
  }
)

ProfileHeader.displayName = "ProfileHeader"

export { ProfileHeader }
