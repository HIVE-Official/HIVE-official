"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Input } from "../atoms/input"
import { Badge } from "../atoms/badge"
import { Button } from "../atoms/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs"
import { Search, TrendingUp, Star, Copy, Users, Clock, Sparkles } from "lucide-react"

export interface Template {
  id: string
  name: string
  description: string
  icon: string
  category: "academic" | "social" | "greek-life" | "residential" | "career" | "wellness"
  elementCount: number
  complexity: "simple" | "medium" | "complex"
  deploysCount: number
  forksCount: number
  successRate: number
  responseRate?: number
  creatorName: string
  creatorHandle: string
  isTrending?: boolean
  isNew?: boolean
  tags: string[]
  preview?: {
    elements: string[]
    flow: string
  }
}

export interface HiveLabTemplateBrowserProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Available templates */
  templates?: Template[]

  /** Template selection handler */
  onTemplateSelect?: (template: Template) => void

  /** Fork template handler */
  onForkTemplate?: (templateId: string) => void

  /** Deploy template handler */
  onDeployTemplate?: (templateId: string) => void

  /** Search query */
  searchQuery?: string

  /** Search handler */
  onSearchChange?: (query: string) => void

  /** Show leader stats */
  isLeader?: boolean
}

const categories = [
  { id: "all" as const, name: "All Templates", icon: "🎨" },
  { id: "academic" as const, name: "Academic", icon: "📚" },
  { id: "social" as const, name: "Social", icon: "🎉" },
  { id: "greek-life" as const, name: "Greek Life", icon: "🏛️" },
  { id: "residential" as const, name: "Residential", icon: "🏠" },
  { id: "career" as const, name: "Career", icon: "💼" },
  { id: "wellness" as const, name: "Wellness", icon: "💚" },
]

const HiveLabTemplateBrowser = React.forwardRef<HTMLDivElement, HiveLabTemplateBrowserProps>(
  (
    {
      className,
      templates = [],
      onTemplateSelect,
      onForkTemplate,
      onDeployTemplate,
      searchQuery = "",
      onSearchChange,
      isLeader = false,
      ...props
    },
    ref
  ) => {
    const [internalSearch, setInternalSearch] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState<
      Template["category"] | "all"
    >("all")
    const search = searchQuery || internalSearch
    const setSearch = onSearchChange || setInternalSearch

    // Filter templates
    const filteredTemplates = React.useMemo(() => {
      let filtered = templates

      // Category filter
      if (selectedCategory !== "all") {
        filtered = filtered.filter((t) => t.category === selectedCategory)
      }

      // Search filter
      if (search) {
        filtered = filtered.filter(
          (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.description.toLowerCase().includes(search.toLowerCase()) ||
            t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
        )
      }

      return filtered
    }, [templates, selectedCategory, search])

    // Group templates
    const trending = filteredTemplates.filter((t) => t.isTrending).slice(0, 6)
    const newTemplates = filteredTemplates.filter((t) => t.isNew).slice(0, 6)
    const mostForked = [...filteredTemplates]
      .sort((a, b) => b.forksCount - a.forksCount)
      .slice(0, 6)
    const quickBuilds = filteredTemplates
      .filter((t) => t.complexity === "simple")
      .slice(0, 6)

    return (
      <Card ref={ref} className={cn("flex flex-col h-full", className)} {...props}>
        {/* Header */}
        <div className="p-6 border-b border-white/8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Template Marketplace</h2>
              <p className="text-sm text-white/70">
                60-second deploy · Fork and customize
              </p>
            </div>
            <Badge variant="freshman" className="text-xs">
              {filteredTemplates.length} templates
            </Badge>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
            <Input
              placeholder="Search templates or problems..."
              value={search}
              onChange={(e: React.ChangeEvent) => setSearch((e.target as HTMLInputElement).value)}
              className="pl-9 h-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="discover" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-6 mt-4">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>

          {/* Discover Tab */}
          <TabsContent value="discover" className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Trending Section */}
            <Section
              title="Trending This Week"
              icon={<TrendingUp className="h-4 w-4" />}
              templates={trending}
              onTemplateSelect={onTemplateSelect}
              onForkTemplate={onForkTemplate}
              onDeployTemplate={onDeployTemplate}
            />

            {/* Quick Builds */}
            <Section
              title="5-Minute Builds"
              icon={<Clock className="h-4 w-4" />}
              description="Simple tools, big impact"
              templates={quickBuilds}
              onTemplateSelect={onTemplateSelect}
              onForkTemplate={onForkTemplate}
              onDeployTemplate={onDeployTemplate}
            />

            {/* Most Forked */}
            <Section
              title="Most Forked"
              icon={<Copy className="h-4 w-4" />}
              description="Community favorites"
              templates={mostForked}
              onTemplateSelect={onTemplateSelect}
              onForkTemplate={onForkTemplate}
              onDeployTemplate={onDeployTemplate}
            />
          </TabsContent>

          {/* Trending Tab */}
          <TabsContent value="trending" className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trending.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={onTemplateSelect}
                  onFork={onForkTemplate}
                  onDeploy={onDeployTemplate}
                />
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="flex-1 overflow-y-auto p-6 space-y-6">
            {categories.slice(1).map((category) => {
              const categoryTemplates = filteredTemplates
                .filter((t) => t.category === category.id)
                .slice(0, 3)

              if (categoryTemplates.length === 0) return null

              return (
                <Section
                  key={category.id}
                  title={category.name}
                  icon={<span className="text-lg">{category.icon}</span>}
                  templates={categoryTemplates}
                  onTemplateSelect={onTemplateSelect}
                  onForkTemplate={onForkTemplate}
                  onDeployTemplate={onDeployTemplate}
                />
              )
            })}
          </TabsContent>

          {/* New Tab */}
          <TabsContent value="new" className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={onTemplateSelect}
                  onFork={onForkTemplate}
                  onDeploy={onDeployTemplate}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="p-4 border-t border-white/8 bg-white/5">
          <p className="text-xs text-white/70 text-center">
            💡 All templates are fully customizable · Fork and make it your own
          </p>
        </div>
      </Card>
    )
  }
)

HiveLabTemplateBrowser.displayName = "HiveLabTemplateBrowser"

// Section Component
interface SectionProps {
  title: string
  icon?: React.ReactNode
  description?: string
  templates: Template[]
  onTemplateSelect?: (template: Template) => void
  onForkTemplate?: (templateId: string) => void
  onDeployTemplate?: (templateId: string) => void
}

const Section: React.FC<SectionProps> = ({
  title,
  icon,
  description,
  templates,
  onTemplateSelect,
  onForkTemplate,
  onDeployTemplate,
}) => {
  if (templates.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {description && (
            <p className="text-xs text-white/70">{description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={onTemplateSelect}
            onFork={onForkTemplate}
            onDeploy={onDeployTemplate}
          />
        ))}
      </div>
    </div>
  )
}

// Template Card Component
interface TemplateCardProps {
  template: Template
  onSelect?: (template: Template) => void
  onFork?: (templateId: string) => void
  onDeploy?: (templateId: string) => void
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onSelect,
  onFork,
  onDeploy,
}) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-lg cursor-pointer",
        "border border-white/8 hover:border-[#FFD700]/50"
      )}
      onClick={() => onSelect?.(template)}
    >
      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl">{template.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">
                {template.name}
              </h4>
              <p className="text-xs text-white/70">by {template.creatorName}</p>
            </div>
          </div>
          {template.isTrending && (
            <Badge variant="freshman" className="h-5 px-1.5 text-[9px]">
              <TrendingUp className="h-3 w-3 mr-0.5" />
              HOT
            </Badge>
          )}
          {template.isNew && (
            <Badge variant="freshman" className="h-5 px-1.5 text-[9px]">
              <Sparkles className="h-3 w-3 mr-0.5" />
              NEW
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-white/70 line-clamp-2">
          {template.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-white/70">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{template.deploysCount} deploys</span>
          </div>
          <div className="flex items-center gap-1">
            <Copy className="h-3 w-3" />
            <span>{template.forksCount} forks</span>
          </div>
        </div>

        {/* Success Rate */}
        {template.responseRate && (
          <div className="pt-2 border-t border-white/8">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">Success Rate</span>
              <span className="font-semibold text-green-500">
                {template.responseRate}% response
              </span>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {template.tags.slice(0, 3).map((tag, idx) => (
            <Badge key={idx} variant="sophomore" className="h-5 px-1.5 text-[9px]">
              {tag}
            </Badge>
          ))}
          <Badge variant="freshman" className="h-5 px-1.5 text-[9px]">
            {template.elementCount} elements
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            className="flex-1 h-7 text-xs"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              onDeploy?.(template.id)
            }}
          >
            Quick Deploy
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-2"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              onFork?.(template.id)
            }}
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export { HiveLabTemplateBrowser }
