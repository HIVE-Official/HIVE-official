"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Loader2 } from "lucide-react"

export interface FeedInfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Feed items to display */
  children: React.ReactNode

  /** Load more function */
  onLoadMore?: () => void | Promise<void>

  /** Whether there are more items to load */
  hasMore?: boolean

  /** Loading state */
  isLoading?: boolean

  /** Initial load count (SPEC: 15 posts) */
  initialLoad?: number

  /** Scroll increment (SPEC: 10 posts) */
  scrollIncrement?: number

  /** Max items in memory (SPEC: 50 posts) */
  maxInMemory?: number

  /** Threshold to trigger load (0-1, default 0.8 = 80% scrolled) */
  loadThreshold?: number

  /** Custom loading component */
  loadingComponent?: React.ReactNode

  /** Custom end component */
  endComponent?: React.ReactNode
}

const FeedInfiniteScroll = React.forwardRef<HTMLDivElement, FeedInfiniteScrollProps>(
  (
    {
      className,
      children,
      onLoadMore,
      hasMore = false,
      isLoading = false,
      initialLoad = 15,
      scrollIncrement = 10,
      maxInMemory = 50,
      loadThreshold = 0.8,
      loadingComponent,
      endComponent,
      ...props
    },
    ref
  ) => {
    const [isLoadingMore, setIsLoadingMore] = React.useState(false)
    const observerTarget = React.useRef<HTMLDivElement>(null)

    // Intersection Observer for infinite scroll
    React.useEffect(() => {
      if (!onLoadMore || !hasMore || isLoading || isLoadingMore) return

      const observer = new IntersectionObserver(
        (entries) => {
          const first = entries[0]
          if (first.isIntersecting) {
            handleLoadMore()
          }
        },
        {
          threshold: loadThreshold,
          rootMargin: "100px", // Load 100px before reaching bottom
        }
      )

      const currentTarget = observerTarget.current
      if (currentTarget) {
        observer.observe(currentTarget)
      }

      return () => {
        if (currentTarget) {
          observer.unobserve(currentTarget)
        }
      }
    }, [hasMore, isLoading, isLoadingMore, loadThreshold])

    const handleLoadMore = async () => {
      if (!onLoadMore || !hasMore || isLoadingMore) return

      setIsLoadingMore(true)
      try {
        await onLoadMore()
      } catch (error) {
        console.error("Error loading more items:", error)
      } finally {
        setIsLoadingMore(false)
      }
    }

    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {/* Feed Items */}
        {children}

        {/* Loading Indicator */}
        {(isLoading || isLoadingMore) && (
          loadingComponent || (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-white/50" />
              <span className="ml-3 text-sm text-white/50">Loading more...</span>
            </div>
          )
        )}

        {/* Intersection Observer Target */}
        {hasMore && !isLoading && !isLoadingMore && (
          <div ref={observerTarget} className="h-4" />
        )}

        {/* End of Feed */}
        {!hasMore && !isLoading && (
          endComponent || (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-4xl mb-3">✨</div>
              <p className="text-sm font-semibold text-white mb-1">
                You're all caught up!
              </p>
              <p className="text-xs text-white/50 max-w-xs">
                That's everything from your spaces. Check back later for new content.
              </p>
            </div>
          )
        )}
      </div>
    )
  }
)

FeedInfiniteScroll.displayName = "FeedInfiniteScroll"

export { FeedInfiniteScroll }
