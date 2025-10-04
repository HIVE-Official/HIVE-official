"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface FeedLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional header content (filters, rituals strip) */
  header?: React.ReactNode

  /** Main feed content */
  children: React.ReactNode

  /** Optional right sidebar (trending, suggestions) */
  sidebar?: React.ReactNode

  /** Layout mode */
  layoutMode?: "centered" | "sidebar"
}

const FeedLayout = React.forwardRef<HTMLDivElement, FeedLayoutProps>(
  (
    {
      className,
      header,
      children,
      sidebar,
      layoutMode = "centered",
      ...props
    },
    ref
  ) => {
    if (layoutMode === "sidebar") {
      // Feed with right sidebar (trending, suggestions)
      return (
        <div
          ref={ref}
          className={cn("flex flex-col min-h-screen bg-[#000000]", className)}
          {...props}
        >
          {/* Header Section (Rituals, Filters) */}
          {header && (
            <div className="sticky top-16 z-40 border-b border-white/8 bg-[#0c0c0c]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0c0c0c]/80">
              {header}
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex gap-6 w-full max-w-7xl mx-auto p-6 flex-col lg:flex-row">
            {/* Feed Column - 70% */}
            <div className="flex-[7] min-w-0">
              {children}
            </div>

            {/* Sidebar - 30% */}
            {sidebar && (
              <div className="flex-[3] space-y-4 min-w-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
                {sidebar}
              </div>
            )}
          </div>
        </div>
      )
    }

    // Centered feed (no sidebar - default)
    return (
      <div
        ref={ref}
        className={cn("flex flex-col min-h-screen bg-[#000000]", className)}
        {...props}
      >
        {/* Header Section (Rituals, Filters) */}
        {header && (
          <div className="sticky top-16 z-40 border-b border-white/8 bg-[#0c0c0c]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0c0c0c]/80">
            {header}
          </div>
        )}

        {/* Centered Feed */}
        <div className="w-full max-w-2xl mx-auto p-6">
          {children}
        </div>
      </div>
    )
  }
)

FeedLayout.displayName = "FeedLayout"

export { FeedLayout }
