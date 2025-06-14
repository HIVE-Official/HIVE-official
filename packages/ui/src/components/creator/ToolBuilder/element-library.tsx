import React, { useState, useMemo } from 'react'
import { useDrag } from 'react-dnd'
import { cn } from '@/lib/utils'
import { Element, ElementCategory } from '@hive/core/domain/creation/element'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Search, 
  Type, 
  Image, 
  Minus, 
  Layers,
  MousePointer,
  ChevronDown,
  Star,
  Clock,
  BarChart3,
  GitBranch,
  Zap,
  Sparkles,
  TrendingUp
} from 'lucide-react'

interface ElementLibraryProps {
  elements: Element[]
  onElementSelect: (elementId: string, position: { x: number; y: number }) => void
  searchQuery: string
  selectedCategory: string
  className?: string
}

interface DraggableElementProps {
  element: Element
  onSelect: (elementId: string, position: { x: number; y: number }) => void
}

const ElementIcon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  const iconMap = {
    'Type': Type,
    'Image': Image,
    'Minus': Minus,
    'Layers': Layers,
    'MousePointer': MousePointer,
    'ChevronDown': ChevronDown,
    'Star': Star,
    'Clock': Clock,
    'BarChart3': BarChart3,
    'GitBranch': GitBranch,
    'Zap': Zap,
  }
  
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Type
  return <IconComponent className={className} />
}

const DraggableElement: React.FC<DraggableElementProps> = ({ element, onSelect }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { elementId: element.id, elementType: element.type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ position: { x: number; y: number } }>()
      if (item && dropResult) {
        onSelect(item.elementId, dropResult.position)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const handleClick = () => {
    // Default position for click-to-add
    onSelect(element.id, { x: 100, y: 100 })
  }

  return (
    <div
      ref={drag}
      onClick={handleClick}
      className={cn(
        'group relative p-3 border rounded-lg cursor-pointer transition-all hover:border-primary hover:shadow-sm',
        'bg-card hover:bg-accent/50',
        isDragging && 'opacity-50 scale-95'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 rounded-md bg-primary/10 text-primary">
          <ElementIcon iconName={element.icon} className="h-4 w-4" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{element.name}</h4>
            {element.isOfficial && (
              <Badge variant="secondary" className="text-xs px-1 py-0">
                <Sparkles className="h-3 w-3" />
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {element.description}
          </p>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              v{element.version}
            </Badge>
            
            {element.usageCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                {element.usageCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Presets indicator */}
      {element.presets && element.presets.length > 0 && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="secondary" className="text-xs">
            {element.presets.length} presets
          </Badge>
        </div>
      )}
    </div>
  )
}

export const ElementLibrary: React.FC<ElementLibraryProps> = ({
  elements,
  onElementSelect,
  searchQuery: initialSearchQuery,
  selectedCategory: initialSelectedCategory,
  className
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [selectedCategory, setSelectedCategory] = useState<ElementCategory | 'all'>(
    initialSelectedCategory as ElementCategory | 'all'
  )

  // Filter and organize elements
  const { filteredElements, categorizedElements, popularElements } = useMemo(() => {
    let filtered = elements

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(element =>
        element.name.toLowerCase().includes(query) ||
        element.description.toLowerCase().includes(query) ||
        element.type.toLowerCase().includes(query) ||
        (element.presets?.some(preset => 
          preset.name.toLowerCase().includes(query) ||
          preset.tags?.some(tag => tag.toLowerCase().includes(query))
        ))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(element => element.category === selectedCategory)
    }

    // Categorize elements
    const categorized = {
      'Display & Layout': filtered.filter(el => el.category === 'Display & Layout'),
      'Inputs & Choices': filtered.filter(el => el.category === 'Inputs & Choices'),
      'Logic & Dynamics': filtered.filter(el => el.category === 'Logic & Dynamics'),
    }

    // Get popular elements (based on usage count and presets popularity)
    const popular = [...filtered]
      .sort((a, b) => {
        const aPopularity = (a.usageCount || 0) + (a.presets?.reduce((sum, p) => sum + (p.popularity || 0), 0) || 0)
        const bPopularity = (b.usageCount || 0) + (b.presets?.reduce((sum, p) => sum + (p.popularity || 0), 0) || 0)
        return bPopularity - aPopularity
      })
      .slice(0, 6)

    return {
      filteredElements: filtered,
      categorizedElements: categorized,
      popularElements: popular
    }
  }, [elements, searchQuery, selectedCategory])

  const categories: { id: ElementCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Elements', count: elements.length },
    { id: 'Display & Layout', label: 'Display & Layout', count: categorizedElements['Display & Layout'].length },
    { id: 'Inputs & Choices', label: 'Inputs & Choices', count: categorizedElements['Inputs & Choices'].length },
    { id: 'Logic & Dynamics', label: 'Logic & Dynamics', count: categorizedElements['Logic & Dynamics'].length },
  ]

  return (
    <div className={cn('flex flex-col h-full bg-card border-r', className)}>
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg mb-3">Elements</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search elements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ElementCategory | 'all')}>
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            <TabsTrigger value="Display & Layout" className="text-xs">Display</TabsTrigger>
          </TabsList>
          <TabsList className="grid w-full grid-cols-2 h-auto mt-1">
            <TabsTrigger value="Inputs & Choices" className="text-xs">Inputs</TabsTrigger>
            <TabsTrigger value="Logic & Dynamics" className="text-xs">Logic</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Element List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Popular Elements (when showing all) */}
          {selectedCategory === 'all' && !searchQuery && popularElements.length > 0 && (
            <div>
              <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Popular
              </h3>
              <div className="space-y-2">
                {popularElements.map((element) => (
                  <DraggableElement
                    key={element.id}
                    element={element}
                    onSelect={onElementSelect}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Category Sections */}
          {selectedCategory === 'all' ? (
            // Show all categories
            Object.entries(categorizedElements).map(([category, categoryElements]) => (
              categoryElements.length > 0 && (
                <div key={category}>
                  <h3 className="font-medium text-sm mb-3">{category}</h3>
                  <div className="space-y-2">
                    {categoryElements.map((element) => (
                      <DraggableElement
                        key={element.id}
                        element={element}
                        onSelect={onElementSelect}
                      />
                    ))}
                  </div>
                </div>
              )
            ))
          ) : (
            // Show selected category
            <div className="space-y-2">
              {filteredElements.map((element) => (
                <DraggableElement
                  key={element.id}
                  element={element}
                  onSelect={onElementSelect}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredElements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No elements found</p>
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t bg-muted/50">
        <div className="text-xs text-muted-foreground text-center">
          {filteredElements.length} of {elements.length} elements
        </div>
        <div className="text-xs text-muted-foreground text-center mt-1">
          Drag to canvas or click to add
        </div>
      </div>
    </div>
  )
}

export default ElementLibrary 