'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Type,
  ToggleLeft,
  Hash,
  Calendar,
  Image,
  FileText,
  BarChart,
  Filter,
  Database,
  Zap,
  Bell,
  Send,
  Download,
  Upload,
  Search,
  Users,
  MapPin,
  Clock,
  Link,
  Code,
  Layout,
  Square,
  Circle,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ElementDefinition {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
  config?: Record<string, any>;
}

const ELEMENT_CATEGORIES = {
  input: {
    name: 'Input',
    color: 'blue',
    elements: [
      { id: 'text-input', name: 'Text Input', icon: <Type className="h-4 w-4" />, description: 'Single line text input' },
      { id: 'number-input', name: 'Number', icon: <Hash className="h-4 w-4" />, description: 'Numeric input field' },
      { id: 'toggle', name: 'Toggle', icon: <ToggleLeft className="h-4 w-4" />, description: 'Boolean on/off switch' },
      { id: 'date-picker', name: 'Date Picker', icon: <Calendar className="h-4 w-4" />, description: 'Calendar date selector' },
      { id: 'file-upload', name: 'File Upload', icon: <Upload className="h-4 w-4" />, description: 'File upload handler' },
      { id: 'search', name: 'Search', icon: <Search className="h-4 w-4" />, description: 'Search input with filters' }
    ]
  },
  display: {
    name: 'Display',
    color: 'green',
    elements: [
      { id: 'text-display', name: 'Text', icon: <FileText className="h-4 w-4" />, description: 'Display text content' },
      { id: 'image', name: 'Image', icon: <Image className="h-4 w-4" />, description: 'Image display' },
      { id: 'chart', name: 'Chart', icon: <BarChart className="h-4 w-4" />, description: 'Data visualization' },
      { id: 'list', name: 'List', icon: <Layout className="h-4 w-4" />, description: 'Item list display' },
      { id: 'card', name: 'Card', icon: <Square className="h-4 w-4" />, description: 'Content card' },
      { id: 'badge', name: 'Badge', icon: <Circle className="h-4 w-4" />, description: 'Status badge' }
    ]
  },
  action: {
    name: 'Action',
    color: 'purple',
    elements: [
      { id: 'button', name: 'Button', icon: <Square className="h-4 w-4" />, description: 'Clickable button' },
      { id: 'submit', name: 'Submit', icon: <Send className="h-4 w-4" />, description: 'Form submission' },
      { id: 'download', name: 'Download', icon: <Download className="h-4 w-4" />, description: 'File download' },
      { id: 'share', name: 'Share', icon: <Users className="h-4 w-4" />, description: 'Share content' },
      { id: 'notify', name: 'Notify', icon: <Bell className="h-4 w-4" />, description: 'Send notification' },
      { id: 'link', name: 'Link', icon: <Link className="h-4 w-4" />, description: 'External link' }
    ]
  },
  logic: {
    name: 'Logic',
    color: 'orange',
    elements: [
      { id: 'filter', name: 'Filter', icon: <Filter className="h-4 w-4" />, description: 'Filter data' },
      { id: 'condition', name: 'Condition', icon: <Code className="h-4 w-4" />, description: 'If/then logic' },
      { id: 'loop', name: 'Loop', icon: <ChevronRight className="h-4 w-4" />, description: 'Iterate over data' },
      { id: 'timer', name: 'Timer', icon: <Clock className="h-4 w-4" />, description: 'Time-based trigger' },
      { id: 'validator', name: 'Validator', icon: <Zap className="h-4 w-4" />, description: 'Validate input' }
    ]
  },
  data: {
    name: 'Data',
    color: 'teal',
    elements: [
      { id: 'database', name: 'Database', icon: <Database className="h-4 w-4" />, description: 'Data source' },
      { id: 'api', name: 'API', icon: <Zap className="h-4 w-4" />, description: 'External API' },
      { id: 'storage', name: 'Storage', icon: <Square className="h-4 w-4" />, description: 'Local storage' },
      { id: 'user-data', name: 'User Data', icon: <Users className="h-4 w-4" />, description: 'User profile data' },
      { id: 'location', name: 'Location', icon: <MapPin className="h-4 w-4" />, description: 'Location data' }
    ]
  }
};

interface ElementPaletteProps {
  onDragStart: (element: ElementDefinition) => void;
  className?: string;
}

export function ElementPalette({ onDragStart, className }: ElementPaletteProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(ELEMENT_CATEGORIES))
  );
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleDragStart = (e: React.DragEvent, element: ElementDefinition, category: string) => {
    e.dataTransfer.setData('elementType', element.id);
    e.dataTransfer.setData('elementCategory', category);
    e.dataTransfer.setData('elementName', element.name);
    onDragStart({ ...element, category });
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      teal: 'bg-teal-500/20 text-teal-400 border-teal-500/30'
    };
    return colors[color] || colors.blue;
  };

  // Filter elements based on search
  const filteredCategories = Object.entries(ELEMENT_CATEGORIES).map(([key, category]) => ({
    key,
    ...category,
    elements: category.elements.filter(el => 
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.elements.length > 0);

  return (
    <div className={cn("bg-gray-950 flex flex-col h-full", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">Elements</h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search elements..."
            className="w-full pl-10 pr-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredCategories.map(({ key, name, color, elements }) => (
          <div key={key} className="space-y-2">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(key)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", `bg-${color}-500`)} />
                <span className="text-sm font-medium text-gray-300">{name}</span>
                <span className="text-xs text-gray-500">({elements.length})</span>
              </div>
              {expandedCategories.has(key) ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {/* Elements */}
            <AnimatePresence>
              {expandedCategories.has(key) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-1 overflow-hidden"
                >
                  {elements.map(element => (
                    <div
                      key={element.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, element, key)}
                      className={cn(
                        "p-3 rounded-lg border cursor-move transition-all",
                        "hover:scale-[1.02] active:scale-[0.98]",
                        getColorClasses(color)
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">{element.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{element.name}</p>
                          <p className="text-xs opacity-80 mt-0.5">{element.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No elements found</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-gray-400 hover:text-white mt-2"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Footer Tips */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/50">
        <p className="text-xs text-gray-500">
          💡 Drag elements to the canvas to add them
        </p>
      </div>
    </div>
  );
}