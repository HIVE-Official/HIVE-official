"use client"

import * as React from "react"
import { Calendar, BarChart3, ListTodo, FileText, Wrench, Plus, Sparkles } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"
import { Card } from "../atoms/card"
import { Badge } from "../atoms/badge"

export interface Tool {
  id: string
  name: string
  icon: string
  color?: string
  description?: string
  isCustom?: boolean
  createdBy?: string
  usageCount?: number
  permissions?: "all" | "leaders" | "custom"
}

export interface SpaceToolsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default tools (Event, Poll, Task, Resource) */
  defaultTools?: Tool[]

  /** Custom HiveLab tools */
  customTools?: Tool[]

  /** Whether the current user is a space leader */
  isLeader?: boolean

  /** Handler for tool click */
  onToolClick?: (tool: Tool) => void

  /** Handler for creating/managing tools (leaders only) */
  onManageTools?: () => void

  /** Handler for creating a new tool in HiveLab */
  onCreateTool?: () => void

  /** Loading state */
  isLoading?: boolean
}

const defaultToolsData: Tool[] = [
  {
    id: "event",
    name: "Event",
    icon: "📅",
    description: "Create an event",
    permissions: "leaders",
  },
  {
    id: "poll",
    name: "Poll",
    icon: "📊",
    description: "Quick poll (2-5 options)",
    permissions: "all",
  },
  {
    id: "task",
    name: "Task",
    icon: "📋",
    description: "Assign task with deadline",
    permissions: "leaders",
  },
  {
    id: "resource",
    name: "Resource",
    icon: "📚",
    description: "Upload or link resource",
    permissions: "all",
  },
]

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Calendar,
    BarChart3,
    ListTodo,
    FileText,
    Wrench,
    Sparkles,
  }
  return icons[iconName] || Wrench
}

const SpaceToolsPanel = React.forwardRef<HTMLDivElement, SpaceToolsPanelProps>(
  (
    {
      className,
      defaultTools = defaultToolsData,
      customTools = [],
      isLeader = false,
      onToolClick,
      onManageTools,
      onCreateTool,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const hasCustomTools = customTools.length > 0

    return (
      <Card ref={ref} className={cn("p-4", className)} {...props}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-white/70" />
            <h3 className="text-sm font-semibold text-white">Tools</h3>
          </div>
          {isLeader && onManageTools && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={onManageTools}
            >
              <Wrench className="w-3 h-3 mr-1" />
              Manage
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-md bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <>
            {/* Default Tools Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              {defaultTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onToolClick?.(tool)}
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
                  {tool.permissions === "leaders" && (
                    <Badge variant="secondary" className="text-[10px] h-4 px-1">
                      Leaders
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            {/* Custom Tools Section */}
            {hasCustomTools && (
              <div className="border-t border-white/8 pt-3 mt-3">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-3 h-3 text-white/70" />
                  <h4 className="text-xs font-semibold text-white/70">
                    Custom Tools
                  </h4>
                </div>
                <div className="space-y-2">
                  {customTools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => onToolClick?.(tool)}
                      className={cn(
                        "w-full flex items-center gap-3 p-2.5 rounded-lg",
                        "border border-white/8 bg-[#000000]",
                        "hover:bg-white/10 hover:border-white/20 transition-all",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                        "text-left group"
                      )}
                      style={
                        tool.color
                          ? { borderLeftWidth: "3px", borderLeftColor: tool.color }
                          : undefined
                      }
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">
                        {tool.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-white truncate">
                          {tool.name}
                        </div>
                        {tool.usageCount !== undefined && (
                          <div className="text-[10px] text-white/70">
                            {tool.usageCount} uses
                          </div>
                        )}
                      </div>
                      {tool.isCustom && (
                        <Badge variant="outline" className="text-[10px] h-4 px-1 shrink-0">
                          Custom
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Create Tool CTA (Leaders Only) */}
            {isLeader && onCreateTool && (
              <div className="border-t border-white/8 pt-3 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs"
                  onClick={onCreateTool}
                >
                  <Plus className="w-3 h-3 mr-2" />
                  Create Custom Tool
                </Button>
                <p className="text-[10px] text-white/70 mt-2 text-center">
                  Build tools in HiveLab
                </p>
              </div>
            )}
          </>
        )}
      </Card>
    )
  }
)

SpaceToolsPanel.displayName = "SpaceToolsPanel"

export { SpaceToolsPanel }
