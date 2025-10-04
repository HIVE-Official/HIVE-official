"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../atoms/card"
import { Badge } from "../atoms/badge"
import { Button } from "../atoms/button"
import { cn } from "../../lib/utils"

export interface SpaceAboutSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Space description */
  description: string

  /** Space tags */
  tags?: string[]

  /** Creation info */
  createdAt?: Date
  createdBy?: {
    name: string
    handle?: string
    avatar?: string
  }

  /** Space rules/guidelines */
  rules?: string[]

  /** Space category */
  category?: string
  type?: "academic" | "greek" | "social" | "residential" | "interest" | "official"

  /** Quick stats */
  memberCount?: number
  postCount?: number
  eventCount?: number

  /** Actions */
  onEditDescription?: () => void
  onEditRules?: () => void
  isLeader?: boolean

  /** Expanded state */
  defaultExpanded?: boolean
}

const SpaceAboutSection = React.forwardRef<HTMLDivElement, SpaceAboutSectionProps>(
  (
    {
      className,
      description,
      tags = [],
      createdAt,
      createdBy,
      rules = [],
      category,
      type,
      memberCount,
      postCount,
      eventCount,
      onEditDescription,
      onEditRules,
      isLeader = false,
      defaultExpanded = true,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)
    const [showAllRules, setShowAllRules] = React.useState(false)

    // Format date
    const formattedDate = createdAt
      ? new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(createdAt)
      : null

    // Truncate rules if too many
    const displayedRules = showAllRules ? rules : rules.slice(0, 3)

    return (
      <Card ref={ref} className={cn("transition-all duration-[400ms]", className)} {...props}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold tracking-tight leading-tight">About</CardTitle>
            {isLeader && onEditDescription && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onEditDescription}
                className="h-8 px-2 transition-all duration-fast"
              >
                <svg className="h-3.5 w-3.5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-sm text-white/70 leading-normal whitespace-pre-wrap">
              {description}
            </p>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Category & Type */}
          {(category || type) && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/8">
              <svg className="h-4 w-4 text-white/70" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
              <div className="flex items-center gap-2 flex-wrap">
                {category && (
                  <span className="text-sm font-medium text-white">{category}</span>
                )}
                {type && (
                  <Badge variant="outline" className="text-xs capitalize">
                    {type}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          {(memberCount !== undefined || postCount !== undefined || eventCount !== undefined) && (
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/8">
              {memberCount !== undefined && (
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5 transition-colors duration-fast hover:bg-white/10">
                  <span className="text-lg font-semibold tracking-tight leading-tight text-white">{memberCount}</span>
                  <span className="text-xs text-white/70">Members</span>
                </div>
              )}
              {postCount !== undefined && (
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5 transition-colors duration-fast hover:bg-white/10">
                  <span className="text-lg font-semibold tracking-tight leading-tight text-white">{postCount}</span>
                  <span className="text-xs text-white/70">Posts</span>
                </div>
              )}
              {eventCount !== undefined && (
                <div className="flex flex-col items-center p-3 rounded-lg bg-white/5 transition-colors duration-fast hover:bg-white/10">
                  <span className="text-lg font-semibold tracking-tight leading-tight text-white">{eventCount}</span>
                  <span className="text-xs text-white/70">Events</span>
                </div>
              )}
            </div>
          )}

          {/* Rules */}
          {rules.length > 0 && (
            <div className="pt-3 border-t border-white/8">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold tracking-tight leading-tight text-white flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Community Rules
                </h4>
                {isLeader && onEditRules && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onEditRules}
                    className="h-8 px-2 transition-all duration-fast"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </Button>
                )}
              </div>
              <ol className="space-y-2">
                {displayedRules.map((rule, index) => (
                  <li key={index} className="flex gap-2 text-xs text-white/70 leading-normal">
                    <span className="shrink-0 font-medium text-white">{index + 1}.</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ol>
              {rules.length > 3 && (
                <button
                  onClick={() => setShowAllRules(!showAllRules)}
                  className="mt-3 text-xs text-[#FFD700] transition-colors duration-fast hover:underline"
                >
                  {showAllRules ? "Show less" : `Show ${rules.length - 3} more rules`}
                </button>
              )}
            </div>
          )}

          {/* Created Info */}
          {(createdAt || createdBy) && (
            <div className="pt-3 border-t border-white/8">
              <div className="flex items-start gap-3">
                {createdBy?.avatar ? (
                  <div className="h-10 w-10 overflow-hidden rounded-lg border border-white/8 bg-white/10 shrink-0">
                    <img src={createdBy.avatar} alt={createdBy.name} className="h-full w-full object-cover" />
                  </div>
                ) : createdBy ? (
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg border border-white/8 bg-[#FFD700]/10 shrink-0">
                    <span className="text-xs font-semibold text-[#FFD700]">
                      {createdBy.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                ) : null}

                <div className="flex-1 min-w-0">
                  {createdBy && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-white/70">Created by</span>
                      <span className="text-sm font-medium tracking-tight leading-tight text-white truncate">
                        {createdBy.name}
                      </span>
                      <span className="text-xs text-white/70 truncate">
                        {createdBy.handle}
                      </span>
                    </div>
                  )}
                  {createdAt && (
                    <span className="text-xs text-white/70 mt-1 block">
                      {formattedDate}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

SpaceAboutSection.displayName = "SpaceAboutSection"

export { SpaceAboutSection }
