"use client"

import * as React from "react"
import { X } from "lucide-react"
import { MotionDiv, AnimatePresence } from "../../shells/motion-safe"
import { transitions } from "../../lib/animations"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"

/**
 * Space Side Panel
 *
 * SPEC-compliant side panel overlay for widget expansion.
 * Replaces modals with smooth slide-in panels.
 *
 * Layout behavior:
 * - Desktop: Slides in from right, pushes content left (40% → 60% width)
 * - Mobile: Bottom sheet with swipe gestures
 * - Hash URL: Updates to #events, #members, #resources
 */

export interface SpaceSidePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Panel is open */
  isOpen: boolean

  /** Panel type (determines hash URL) */
  panelType?: "events" | "members" | "resources" | "about" | "tools"

  /** Title for panel header */
  title: string

  /** Content to display in panel */
  children: React.ReactNode

  /** Close handler */
  onClose: () => void

  /** Panel width on desktop */
  width?: "40%" | "50%" | "60%"
}

export const SpaceSidePanel = React.forwardRef<HTMLDivElement, SpaceSidePanelProps>(
  (
    {
      isOpen,
      panelType,
      title,
      children,
      onClose,
      width = "60%",
      className,
      ...props
    },
    ref
  ) => {

    // Update hash URL when panel opens/closes
    React.useEffect(() => {
      if (isOpen && panelType) {
        // Update URL hash without scrolling
        window.history.pushState(null, "", `#${panelType}`)
      } else if (!isOpen) {
        // Clear hash when closing
        if (window.location.hash) {
          window.history.pushState(null, "", window.location.pathname)
        }
      }
    }, [isOpen, panelType])

    // Handle browser back button
    React.useEffect(() => {
      const handleHashChange = () => {
        if (!window.location.hash && isOpen) {
          onClose()
        }
      }

      window.addEventListener("hashchange", handleHashChange)
      return () => window.removeEventListener("hashchange", handleHashChange)
    }, [isOpen, onClose])

    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop (mobile only) */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Panel */}
            <MotionDiv
              ref={ref}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn(
                "fixed right-0 top-0 z-50 h-full bg-[#0c0c0c] border-l border-white/8",
                "flex flex-col overflow-hidden",
                "md:top-16", // Account for header on desktop
                className
              )}
              style={{
                width: width
              }}
              {...props}
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#000000]">
                <h2 className="text-lg font-semibold text-white tracking-tight">
                  {title}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close panel</span>
                </Button>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto">
                {children}
              </div>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    )
  }
)

SpaceSidePanel.displayName = "SpaceSidePanel"
