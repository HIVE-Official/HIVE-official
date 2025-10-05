"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card"
import { Badge } from "../atoms/badge"
import { Button } from "../atoms/button"
import { cn } from "../../lib/utils"

export interface SpaceResource {
  id: string
  title: string
  description?: string
  url: string
  type: "link" | "document" | "video" | "github" | "other"
  addedBy?: {
    name: string
    handle: string
    avatar?: string
  }
  addedAt: Date
  isPinned?: boolean
  clicks?: number
}

export interface SpaceResourcesPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of resources */
  resources?: SpaceResource[]

  /** Add resource handler */
  onAddResource?: () => void

  /** Resource click handler */
  onResourceClick?: (resource: SpaceResource) => void

  /** Remove resource handler */
  onRemoveResource?: (resourceId: string) => void

  /** Whether user can add resources */
  canAddResources?: boolean

  /** Show add button even when resources exist */
  alwaysShowAddButton?: boolean

  /** Loading state */
  isLoading?: boolean

  /** Empty state message */
  emptyStateMessage?: string
}

const SpaceResourcesPanel = React.forwardRef<HTMLDivElement, SpaceResourcesPanelProps>(
  (
    {
      className,
      resources = [],
      onAddResource,
      onResourceClick,
      onRemoveResource,
      canAddResources = false,
      alwaysShowAddButton = false,
      emptyStateMessage = "No resources added yet",
      ...props
    },
    ref
  ) => {
    // Separate pinned and regular resources
    const pinnedResources = React.useMemo(
      () => resources.filter((r) => r.isPinned).sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime()),
      [resources]
    )
    const regularResources = React.useMemo(
      () => resources.filter((r) => !r.isPinned).sort((a, b) => b.addedAt.getTime() - a.addedAt.getTime()),
      [resources]
    )

    // Get icon for resource type
    const getResourceIcon = (type: SpaceResource["type"]) => {
      switch (type) {
        case "link":
          return (
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          )
        case "document":
          return (
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          )
        case "video":
          return (
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
            </svg>
          )
        case "github":
          return (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          )
        default:
          return (
            <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          )
      }
    }

    // Format URL for display (remove protocol, truncate)
    const formatUrl = (url: string) => {
      try {
        const urlObj = new URL(url)
        const domain = urlObj.hostname.replace("www.", "")
        return domain
      } catch {
        return url
      }
    }

    // Render resource item
    const ResourceItem = ({ resource }: { resource: SpaceResource }) => (
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e: React.MouseEvent) => {
          if (onResourceClick) {
            e.preventDefault()
            onResourceClick(resource)
          }
        }}
        className="group flex items-start gap-3 rounded-lg border border-white/8 bg-[#0c0c0c] p-3 transition-all duration-smooth hover:border-white/20 hover:bg-white/10"
      >
        {/* Icon */}
        <div className="shrink-0 mt-0.5 text-white/70 group-hover:text-[#FFD700] transition-all duration-smooth">
          {getResourceIcon(resource.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white group-hover:text-[#FFD700] transition-all duration-smooth truncate">
                {resource.title}
              </h4>
              <p className="text-xs text-white/70 truncate mt-0.5">
                {formatUrl(resource.url)}
              </p>
            </div>
            {resource.isPinned && (
              <svg className="h-3.5 w-3.5 shrink-0 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 011-1h.5a1.5 1.5 0 000-3H6a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            )}
          </div>
          {resource.description && (
            <p className="text-xs text-white/70 line-clamp-2 mt-1.5">
              {resource.description}
            </p>
          )}
          {resource.clicks !== undefined && (
            <p className="text-xs text-white/70 mt-1.5">
              {resource.clicks} {resource.clicks === 1 ? "click" : "clicks"}
            </p>
          )}
        </div>

        {/* External link indicator */}
        <svg className="h-3.5 w-3.5 shrink-0 text-white/70 group-hover:text-[#FFD700] transition-all duration-smooth" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    )

    return (
      <Card ref={ref} className={cn("transition-all duration-smooth", className)} {...props}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold tracking-tight leading-tight">Resources</CardTitle>
            {canAddResources && onAddResource && (alwaysShowAddButton || resources.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAddResource}
                className="h-8 px-2 transition-all duration-smooth"
              >
                <svg className="h-3.5 w-3.5 mr-1" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span className="text-xs">Add Link</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <svg className="h-12 w-12 text-white/30 mb-3" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              <p className="text-sm text-white/70">{emptyStateMessage}</p>
              {canAddResources && onAddResource && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddResource}
                  className="mt-3 transition-all duration-smooth"
                >
                  <svg className="h-4 w-4 mr-1.5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add First Resource
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Pinned Resources */}
              {pinnedResources.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5 text-[#FFD700]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 011-1h.5a1.5 1.5 0 000-3H6a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                    <span className="text-xs font-semibold text-white uppercase tracking-wide">
                      Pinned
                    </span>
                  </div>
                  {pinnedResources.map((resource) => (
                    <ResourceItem key={resource.id} resource={resource} />
                  ))}
                </div>
              )}

              {/* Regular Resources */}
              {regularResources.length > 0 && (
                <div className="space-y-2">
                  {pinnedResources.length > 0 && (
                    <div className="pt-2 border-t border-white/8">
                      <span className="text-xs font-semibold text-white uppercase tracking-wide">
                        All Resources
                      </span>
                    </div>
                  )}
                  {regularResources.map((resource) => (
                    <ResourceItem key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

SpaceResourcesPanel.displayName = "SpaceResourcesPanel"

export { SpaceResourcesPanel }
