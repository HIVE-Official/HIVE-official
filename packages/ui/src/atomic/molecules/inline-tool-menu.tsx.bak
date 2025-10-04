"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"
import { Calendar, BarChart3, ListTodo, FileText } from "lucide-react"

export interface InlineToolMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Trigger element (usually a button) */
  trigger?: React.ReactNode

  /** Tool click handler */
  onToolSelect?: (toolId: "poll" | "event" | "task" | "resource") => void

  /** Position of the menu (desktop vs mobile) */
  position?: "above" | "below"

  /** Whether menu is open */
  open?: boolean

  /** Open state change handler */
  onOpenChange?: (open: boolean) => void
}

const defaultTools = [
  {
    id: "poll" as const,
    name: "Poll",
    icon: "📊",
    description: "Quick poll (2-5 options)",
  },
  {
    id: "event" as const,
    name: "Event",
    icon: "📅",
    description: "Create an event",
  },
  {
    id: "task" as const,
    name: "Task",
    icon: "📋",
    description: "Assign a task",
  },
  {
    id: "resource" as const,
    name: "Resource",
    icon: "📚",
    description: "Share a resource",
  },
]

const InlineToolMenu = React.forwardRef<HTMLDivElement, InlineToolMenuProps>(
  (
    {
      className,
      trigger,
      onToolSelect,
      position = "above",
      open: controlledOpen,
      onOpenChange,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false)
    const menuRef = React.useRef<HTMLDivElement>(null)

    // Use controlled or uncontrolled state
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen
    const setOpen = onOpenChange || setInternalOpen

    // Close on outside click
    React.useEffect(() => {
      if (!open) return

      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open, setOpen])

    // Handle tool selection
    const handleToolClick = (toolId: "poll" | "event" | "task" | "resource") => {
      onToolSelect?.(toolId)
      setOpen(false)
    }

    return (
      <div ref={ref} className={cn("relative inline-block", className)} {...props}>
        {/* Trigger */}
        {trigger && (
          <div onClick={() => setOpen(!open)}>
            {trigger}
          </div>
        )}

        {/* Menu Dropdown */}
        {open && (
          <div
            ref={menuRef}
            className={cn(
              "absolute z-50 w-64 rounded-lg border border-white/8 bg-[#0c0c0c] shadow-lg",
              position === "above"
                ? "bottom-full left-0 mb-2"
                : "top-full left-0 mt-2",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2"
            )}
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-white/8">
              <h4 className="text-xs font-semibold text-white">
                Quick Tools
              </h4>
              <p className="text-[10px] text-white/70">
                Create polls, events, tasks, and more
              </p>
            </div>

            {/* Tool Grid */}
            <div className="grid grid-cols-2 gap-2 p-2">
              {defaultTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg",
                    "border border-white/8 bg-[#000000]",
                    "hover:bg-white/10 hover:border-white/20 transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                    "group"
                  )}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </span>
                  <span className="text-xs font-medium text-white">
                    {tool.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Footer Help Text */}
            <div className="px-3 py-2 border-t border-white/8 bg-white/5">
              <p className="text-[10px] text-white/70 text-center">
                Tip: Type <code className="bg-[#000000] px-1 rounded">/poll</code> or{" "}
                <code className="bg-[#000000] px-1 rounded">/event</code> for quick access
              </p>
            </div>
          </div>
        )}
      </div>
    )
  }
)

InlineToolMenu.displayName = "InlineToolMenu"

export { InlineToolMenu }
