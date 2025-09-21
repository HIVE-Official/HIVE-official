"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/card"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { Grid } from "../atoms/grid"
import { HiveProgress } from "../atoms/hive-progress"

export interface HIVETool {
  id: string
  name: string
  description: string
  category: string
  status: 'draft' | 'published' | 'archived'
  usage: number
  rating: number
  createdAt: Date
  updatedAt: Date
  author: {
    id: string
    name: string
    avatar?: string
  }
  tags: string[]
  complexity: 'beginner' | 'intermediate' | 'advanced'
}

export interface CompleteHIVEToolsSystemProps {
  tools: HIVETool[]
  onToolSelect?: (tool: HIVETool) => void
  onToolCreate?: () => void
  onToolEdit?: (tool: HIVETool) => void
  onToolDelete?: (tool: HIVETool) => void
  onToolDuplicate?: (tool: HIVETool) => void
  className?: string
  showCreateButton?: boolean
  showSearch?: boolean
  showFilters?: boolean
}

const CompleteHIVEToolsSystem = React.forwardRef<HTMLDivElement, CompleteHIVEToolsSystemProps>(
  ({
    tools,
    onToolSelect,
    onToolCreate,
    onToolEdit,
    onToolDelete,
    onToolDuplicate,
    className,
    showCreateButton = true,
    showSearch = true,
    showFilters = true,
    ...props
  }, ref) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<string>("all")
    const [selectedStatus, setSelectedStatus] = React.useState<string>("all")

    // Filter tools based on search and filters
    const filteredTools = React.useMemo(() => {
      return tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
        const matchesStatus = selectedStatus === "all" || tool.status === selectedStatus

        return matchesSearch && matchesCategory && matchesStatus
      })
    }, [tools, searchQuery, selectedCategory, selectedStatus])

    // Get unique categories
    const categories = React.useMemo(() => {
      const cats = Array.from(new Set(tools.map(tool => tool.category)))
      return ["all", ...cats]
    }, [tools])

    const getStatusColor = (status: HIVETool['status']) => {
      switch (status) {
        case 'published': return 'success'
        case 'draft': return 'warning'
        case 'archived': return 'secondary'
        default: return 'default'
      }
    }

    const getComplexityColor = (complexity: HIVETool['complexity']) => {
      switch (complexity) {
        case 'beginner': return 'success'
        case 'intermediate': return 'warning'
        case 'advanced': return 'destructive'
        default: return 'default'
      }
    }

    return (
      <div ref={ref} className={cn("w-full space-y-6", className)} {...props}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
              HIVE Tools System
            </h2>
            <p className="text-[var(--hive-text-secondary)]">
              Manage and explore tools in your HIVE workspace
            </p>
          </div>
          {showCreateButton && onToolCreate && (
            <Button onClick={onToolCreate} variant="default">
              Create New Tool
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        {(showSearch || showFilters) && (
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                {showSearch && (
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-[var(--hive-border-default)] rounded-md bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)]"
                    />
                  </div>
                )}

                {showFilters && (
                  <div className="flex space-x-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-[var(--hive-border-default)] rounded-md bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === "all" ? "All Categories" : category}
                        </option>
                      ))}
                    </select>

                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 border border-[var(--hive-border-default)] rounded-md bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]"
                    >
                      <option value="all">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tools Grid */}
        <Grid columns="auto-fit" gap={6} className="min-h-[400px]">
          {filteredTools.map((tool) => (
            <Card key={tool.id} className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <div className="flex space-x-1">
                    <Badge variant={getStatusColor(tool.status) as any}>
                      {tool.status}
                    </Badge>
                    <Badge variant={getComplexityColor(tool.complexity) as any}>
                      {tool.complexity}
                    </Badge>
                  </div>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--hive-text-secondary)]">Usage</span>
                    <span className="font-medium">{tool.usage}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--hive-text-secondary)]">Rating</span>
                      <span className="font-medium">{tool.rating}/5</span>
                    </div>
                    <HiveProgress value={tool.rating * 20} max={100} />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tool.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tool.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  {onToolSelect && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToolSelect(tool)}
                      className="flex-1"
                    >
                      Open
                    </Button>
                  )}
                  {onToolEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToolEdit(tool)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {filteredTools.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-[var(--hive-text-secondary)]">
                No tools found matching your criteria.
              </p>
              {showCreateButton && onToolCreate && (
                <Button onClick={onToolCreate} variant="outline" className="mt-4">
                  Create Your First Tool
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }
)

CompleteHIVEToolsSystem.displayName = "CompleteHIVEToolsSystem"

export { CompleteHIVEToolsSystem }