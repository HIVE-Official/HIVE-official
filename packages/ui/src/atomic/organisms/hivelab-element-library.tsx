"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Input } from "../atoms/input"
import { Badge } from "../atoms/badge"
import { Search, Star } from "lucide-react"

export interface Element {
  id: string
  name: string
  icon: string
  category: "interaction" | "logic" | "display" | "data" | "action" | "connect"
  description: string
  color?: string
  isNew?: boolean
  isFavorite?: boolean
  complexity?: "simple" | "medium" | "advanced"
}

export interface HiveLabElementLibraryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Available elements */
  elements?: Element[]

  /** Filter by category */
  selectedCategory?: Element["category"] | "all"

  /** Category change handler */
  onCategoryChange?: (category: Element["category"] | "all") => void

  /** Element selection handler (for dragging to canvas) */
  onElementSelect?: (element: Element) => void

  /** Toggle favorite handler */
  onToggleFavorite?: (elementId: string) => void

  /** Search query */
  searchQuery?: string

  /** Search handler */
  onSearchChange?: (query: string) => void

  /** Show favorites only */
  showFavoritesOnly?: boolean
}

const categories = [
  { id: "all" as const, name: "All Elements", icon: "🎨", color: "text-white" },
  { id: "interaction" as const, name: "Interaction", icon: "🎮", color: "text-blue-500", description: "How users interact" },
  { id: "logic" as const, name: "Logic", icon: "🧠", color: "text-purple-500", description: "Make it smart" },
  { id: "display" as const, name: "Display", icon: "👁️", color: "text-green-500", description: "Show cool stuff" },
  { id: "data" as const, name: "Data", icon: "💾", color: "text-orange-500", description: "Store & remember" },
  { id: "action" as const, name: "Action", icon: "🚀", color: "text-pink-500", description: "Make things happen" },
  { id: "connect" as const, name: "Connect", icon: "🔌", color: "text-cyan-500", description: "Link to world" },
]

const HiveLabElementLibrary = React.forwardRef<HTMLDivElement, HiveLabElementLibraryProps>(
  (
    {
      className,
      elements = [],
      selectedCategory = "all",
      onCategoryChange,
      onElementSelect,
      onToggleFavorite,
      searchQuery = "",
      onSearchChange,
      showFavoritesOnly = false,
      ...props
    },
    ref
  ) => {
    const [internalSearch, setInternalSearch] = React.useState("")
    const search = searchQuery || internalSearch
    const setSearch = onSearchChange || setInternalSearch

    // Filter elements
    const filteredElements = React.useMemo(() => {
      let filtered = elements

      // Category filter
      if (selectedCategory !== "all") {
        filtered = filtered.filter((e) => e.category === selectedCategory)
      }

      // Search filter
      if (search) {
        filtered = filtered.filter(
          (e) =>
            e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.description.toLowerCase().includes(search.toLowerCase())
        )
      }

      // Favorites filter
      if (showFavoritesOnly) {
        filtered = filtered.filter((e) => e.isFavorite)
      }

      return filtered
    }, [elements, selectedCategory, search, showFavoritesOnly])

    // Group by category for display
    const groupedElements = React.useMemo(() => {
      return filteredElements.reduce((acc, element) => {
        if (!acc[element.category]) {
          acc[element.category] = []
        }
        acc[element.category].push(element)
        return acc
      }, {} as Record<Element["category"], Element[]>)
    }, [filteredElements])

    return (
      <Card ref={ref} className={cn("flex flex-col h-full", className)} {...props}>
        {/* Header */}
        <div className="p-4 border-b border-white/8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Element Library</h3>
            <Badge variant="freshman" className="text-xs">
              {filteredElements.length} elements
            </Badge>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
            <Input
              placeholder="Search elements..."
              value={search}
              onChange={(e: React.ChangeEvent) => setSearch((e.target as HTMLInputElement).value)}
              className="pl-9 h-9 text-sm"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-4 py-3 border-b border-white/8 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange?.(category.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0",
                  "hover:bg-white/10",
                  selectedCategory === category.id
                    ? "bg-[#FFD700] text-black"
                    : "bg-white/10 text-white/70"
                )}
              >
                <span className="mr-1">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Elements List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedCategory === "all" ? (
            // Show grouped by category
            <>
              {categories.slice(1).map((category) => {
                const categoryElements = groupedElements[category.id]
                if (!categoryElements || categoryElements.length === 0) return null

                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn("text-sm font-semibold", category.color)}>
                        {category.icon} {category.name}
                      </span>
                      <Badge variant="sophomore" className="h-5 px-1.5 text-xs">
                        {categoryElements.length}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {categoryElements.map((element) => (
                        <ElementCard
                          key={element.id}
                          element={element}
                          onSelect={onElementSelect}
                          onToggleFavorite={onToggleFavorite}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            // Show flat list for specific category
            <div className="space-y-1">
              {filteredElements.map((element) => (
                <ElementCard
                  key={element.id}
                  element={element}
                  onSelect={onElementSelect}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          )}

          {filteredElements.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm font-medium text-white mb-1">No elements found</p>
              <p className="text-xs text-white/70">
                Try a different search or category
              </p>
            </div>
          )}
        </div>

        {/* Footer Tip */}
        <div className="p-3 border-t border-white/8 bg-white/5">
          <p className="text-[10px] text-white/70 text-center">
            💡 Drag elements to the canvas to build your tool
          </p>
        </div>
      </Card>
    )
  }
)

HiveLabElementLibrary.displayName = "HiveLabElementLibrary"

// Element Card Component
interface ElementCardProps {
  element: Element
  onSelect?: (element: Element) => void
  onToggleFavorite?: (elementId: string) => void
}

const ElementCard: React.FC<ElementCardProps> = ({ element, onSelect, onToggleFavorite }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(element))
    e.dataTransfer.effectAllowed = "copy"
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect?.(element)}
      className={cn(
        "group relative flex items-center gap-3 p-2.5 rounded-lg",
        "border border-white/8 bg-[#0c0c0c]",
        "hover:bg-white/10 hover:border-[#FFD700]/50 transition-all cursor-grab active:cursor-grabbing",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/20"
      )}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-8 h-8 rounded bg-white/10 shrink-0 text-lg group-hover:scale-110 transition-transform">
        {element.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-white truncate">{element.name}</p>
          {element.isNew && (
            <Badge variant="freshman" className="h-4 px-1 text-[9px] shrink-0">
              NEW
            </Badge>
          )}
          {element.complexity && element.complexity !== "simple" && (
            <Badge variant="sophomore" className="h-4 px-1 text-[9px] shrink-0">
              {element.complexity === "advanced" ? "Advanced" : "Med"}
            </Badge>
          )}
        </div>
        <p className="text-[10px] text-white/70 truncate">{element.description}</p>
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation()
          onToggleFavorite?.(element.id)
        }}
        className={cn(
          "shrink-0 p-1 rounded hover:bg-[#0c0c0c]/80 transition-colors",
          "opacity-0 group-hover:opacity-100",
          element.isFavorite && "opacity-100"
        )}
      >
        <Star
          className={cn(
            "h-3.5 w-3.5",
            element.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-white/70"
          )}
        />
      </button>
    </div>
  )
}

export { HiveLabElementLibrary }
