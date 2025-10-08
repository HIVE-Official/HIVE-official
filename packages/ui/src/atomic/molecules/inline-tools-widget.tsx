"use client"

import * as React from "react"
import { Calendar, BarChart3, CheckSquare, FileText } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"

/**
 * Inline Tools Widget
 *
 * SPEC-compliant tools system:
 * - 📅 Event: Create space event (leaders only)
 * - 📊 Poll: Quick poll (all members)
 * - 📋 Task: Assign task (leaders only)
 * - 📚 Resource: Upload resource (members after 7 days)
 *
 * These are NOT separate views - they open inline creation forms.
 */

export interface InlineToolsWidgetProps {
  /** Is the current user a leader? */
  isLeader?: boolean

  /** Is the current user a new member? (< 7 days) */
  isNewMember?: boolean

  /** Tool click handlers */
  onCreateEvent?: () => void
  onCreatePoll?: () => void
  onCreateTask?: () => void
  onUploadResource?: () => void
}

export const InlineToolsWidget = React.forwardRef<HTMLDivElement, InlineToolsWidgetProps>(
  ({ isLeader = false, isNewMember = false, onCreateEvent, onCreatePoll, onCreateTask, onUploadResource }, ref) => {

    const tools = [
      {
        id: "event",
        icon: Calendar,
        label: "Event",
        emoji: "📅",
        description: "Create event",
        onClick: onCreateEvent,
        disabled: !isLeader,
        tooltip: isLeader ? "Create space event" : "Leaders only"
      },
      {
        id: "poll",
        icon: BarChart3,
        label: "Poll",
        emoji: "📊",
        description: "Quick poll",
        onClick: onCreatePoll,
        disabled: false,
        tooltip: "Create a poll"
      },
      {
        id: "task",
        icon: CheckSquare,
        label: "Task",
        emoji: "📋",
        description: "Assign task",
        onClick: onCreateTask,
        disabled: !isLeader,
        tooltip: isLeader ? "Assign a task" : "Leaders only"
      },
      {
        id: "resource",
        icon: FileText,
        label: "Resource",
        emoji: "📚",
        description: "Upload file",
        onClick: onUploadResource,
        disabled: isNewMember,
        tooltip: isNewMember ? "Available after 7 days" : "Upload or link resource"
      }
    ]

    return (
      <div ref={ref} className="grid grid-cols-2 gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon
          return (
            <Button
              key={tool.id}
              variant="outline"
              size="sm"
              disabled={tool.disabled}
              onClick={tool.onClick}
              className={cn(
                "flex flex-col items-center gap-1.5 h-auto py-3 transition-all duration-200",
                !tool.disabled && "hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5"
              )}
              title={tool.tooltip}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-base">{tool.emoji}</span>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs font-medium">{tool.label}</span>
            </Button>
          )
        })}
      </div>
    )
  }
)

InlineToolsWidget.displayName = "InlineToolsWidget"
