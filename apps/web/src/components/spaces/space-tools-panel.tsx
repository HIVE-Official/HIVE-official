'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Settings,
  Maximize2,
  Minimize2,
  MoreVertical,
  Timer,
  BarChart3,
  FileText,
  MessageSquare,
  CheckSquare,
  PenTool,
  Calculator,
  Calendar,
  Camera,
  Music,
  Code,
  Map,
  Gamepad2,
  Brain,
  Book,
  Target,
  Activity,
  Users,
  Zap,
  Star,
  Edit,
  Trash2,
  Share,
  Copy,
  Download,
  ExternalLink
} from 'lucide-react';
import {
  Card,
  Button,
  Badge,
  Dialog,
  Input
} from '@hive/ui';
import type { Space } from '@hive/core';

// Define missing types that should be in @hive/core
interface SpaceMember {
  id: string;
  userId: string;
  spaceId: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  isActive: boolean;
}

interface Tool {
  id: string;
  name: string;
  type: string;
  spaceId: string;
  createdBy: string;
  createdAt: Date;
}

interface SpaceToolsPanelProps {
  space: Space;
  userMembership: SpaceMember | null;
}

interface SpaceTool {
  id: string;
  name: string;
  type: ToolType;
  description: string;
  icon: React.ComponentType<any>;
  isActive: boolean;
  config?: any;
  createdBy: string;
  createdAt: Date;
  lastUsed?: Date;
  usageCount: number;
  isExpanded?: boolean;
}

type ToolType =
  | 'timer'
  | 'poll'
  | 'whiteboard'
  | 'file-share'
  | 'attendance'
  | 'calculator'
  | 'todo-list'
  | 'scheduler'
  | 'flashcards'
  | 'study-room'
  | 'quick-vote'
  | 'shared-notes';

const AVAILABLE_TOOLS: Record<ToolType, {
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  color: string;
  features: string[];
}> = {
  timer: {
    name: 'Study Timer',
    description: 'Synchronized Pomodoro sessions for group study',
    icon: Timer,
    category: 'Academic',
    color: 'bg-blue-500',
    features: ['Pomodoro cycles', 'Group sync', 'Break notifications', 'Session history']
  },
  poll: {
    name: 'Live Polls',
    description: 'Real-time voting and decision making',
    icon: BarChart3,
    category: 'Coordination',
    color: 'bg-green-500',
    features: ['Multiple choice', 'Anonymous voting', 'Live results', 'Export data']
  },
  whiteboard: {
    name: 'Collaborative Whiteboard',
    description: 'Shared drawing and brainstorming space',
    icon: PenTool,
    category: 'Creative',
    color: 'bg-purple-500',
    features: ['Real-time collaboration', 'Drawing tools', 'Text notes', 'Save/export']
  },
  'file-share': {
    name: 'File Hub',
    description: 'Centralized file sharing and organization',
    icon: FileText,
    category: 'Productivity',
    color: 'bg-orange-500',
    features: ['File upload', 'Folder organization', 'Version control', 'Access permissions']
  },
  attendance: {
    name: 'Attendance Tracker',
    description: 'Event check-ins and participation tracking',
    icon: CheckSquare,
    category: 'Coordination',
    color: 'bg-red-500',
    features: ['QR code check-in', 'Manual entry', 'Attendance reports', 'Regular events']
  },
  calculator: {
    name: 'Scientific Calculator',
    description: 'Advanced calculator with equation sharing',
    icon: Calculator,
    category: 'Academic',
    color: 'bg-teal-500',
    features: ['Scientific functions', 'Equation history', 'Share calculations', 'Unit conversion']
  },
  'todo-list': {
    name: 'Shared Tasks',
    description: 'Collaborative task management',
    icon: CheckSquare,
    category: 'Productivity',
    color: 'bg-indigo-500',
    features: ['Task assignment', 'Due dates', 'Progress tracking', 'Priority levels']
  },
  scheduler: {
    name: 'Group Scheduler',
    description: 'Find common availability for meetings',
    icon: Calendar,
    category: 'Coordination',
    color: 'bg-pink-500',
    features: ['Availability polling', 'Calendar integration', 'Meeting proposals', 'Time zones']
  },
  flashcards: {
    name: 'Study Cards',
    description: 'Collaborative flashcard creation and study',
    icon: Brain,
    category: 'Academic',
    color: 'bg-yellow-500',
    features: ['Card creation', 'Study modes', 'Progress tracking', 'Shared decks']
  },
  'study-room': {
    name: 'Virtual Study Room',
    description: 'Focus sessions with ambient sounds',
    icon: Book,
    category: 'Academic',
    color: 'bg-cyan-500',
    features: ['Focus timer', 'Ambient sounds', 'Study goals', 'Progress sharing']
  },
  'quick-vote': {
    name: 'Quick Vote',
    description: 'Instant yes/no decisions',
    icon: Target,
    category: 'Coordination',
    color: 'bg-lime-500',
    features: ['One-click voting', 'Anonymous options', 'Quick results', 'Decision history']
  },
  'shared-notes': {
    name: 'Shared Notes',
    description: 'Collaborative note-taking',
    icon: Edit,
    category: 'Academic',
    color: 'bg-rose-500',
    features: ['Real-time editing', 'Rich formatting', 'Version history', 'Export options']
  }
};

export function SpaceToolsPanel({ space, userMembership }: SpaceToolsPanelProps) {
  const [tools, setTools] = useState<SpaceTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const canAddTools = userMembership?.role === 'admin' || userMembership?.role === 'owner';

  // Fetch space tools
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch(`/api/spaces/${space.id}/tools`);
        const data = await response.json();

        if (data.success) {
          setTools(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch tools:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTools();
  }, [space.id]);

  // Add a new tool
  const handleAddTool = async (toolType: ToolType) => {
    try {
      const response = await fetch(`/api/spaces/${space.id}/tools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: toolType })
      });

      if (response.ok) {
        const newTool = await response.json();
        setTools(prev => [...prev, newTool.data]);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Failed to add tool:', error);
    }
  };

  // Remove a tool
  const handleRemoveTool = async (toolId: string) => {
    try {
      await fetch(`/api/spaces/${space.id}/tools/${toolId}`, {
        method: 'DELETE'
      });

      setTools(prev => prev.filter(t => t.id !== toolId));
    } catch (error) {
      console.error('Failed to remove tool:', error);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(Object.values(AVAILABLE_TOOLS).map(t => t.category))];

  // Filter tools by category
  const filteredTools = selectedCategory === 'all'
    ? tools
    : tools.filter(tool => AVAILABLE_TOOLS[tool.type]?.category === selectedCategory);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-800 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">Space Tools</h3>
          <p className="text-gray-400 text-sm">Interactive tools to enhance collaboration</p>
        </div>

        {canAddTools && (
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Tool
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[var(--hive-brand-primary)] text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category === 'all' ? 'All Tools' : category}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-gray-400" />
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">No tools yet</h4>
          <p className="text-gray-400 mb-4">
            {canAddTools
              ? "Add interactive tools to enhance your space's functionality"
              : "Ask an admin to add some tools to get started"
            }
          </p>
          {canAddTools && (
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Tool
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isExpanded={expandedTool === tool.id}
              onExpand={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
              onRemove={canAddTools ? () => handleRemoveTool(tool.id) : undefined}
              canManage={canAddTools}
            />
          ))}
        </div>
      )}

      {/* Add Tool Modal */}
      {showAddModal && (
        <AddToolModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddTool={handleAddTool}
          existingTools={tools.map(t => t.type)}
        />
      )}
    </div>
  );
}

// Individual Tool Card Component
function ToolCard({
  tool,
  isExpanded,
  onExpand,
  onRemove,
  canManage
}: {
  tool: SpaceTool;
  isExpanded: boolean;
  onExpand: () => void;
  onRemove?: () => void;
  canManage: boolean;
}) {
  const toolConfig = AVAILABLE_TOOLS[tool.type];
  const ToolIcon = toolConfig?.icon || Zap;

  return (
    <Card
      className={`transition-all duration-300 cursor-pointer hover:border-[var(--hive-brand-primary)]/50 ${
        isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
      }`}
      onClick={onExpand}
    >
      <div className="p-4">
        {/* Tool Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${toolConfig?.color || 'bg-gray-600'} rounded-lg flex items-center justify-center`}>
              <ToolIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">{tool.name}</h4>
              <p className="text-xs text-gray-400">{toolConfig?.category}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {tool.isActive && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}

            {canManage && (
              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onRemove?.();
                }}
                className="p-1 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors"
                title="Remove tool"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tool Description */}
        <p className="text-sm text-gray-300 mb-3">{tool.description}</p>

        {/* Usage Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Used {tool.usageCount} times</span>
          {tool.lastUsed && (
            <span>Last used {new Date(tool.lastUsed).toLocaleDateString()}</span>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="mb-4">
              <h5 className="font-medium text-white mb-2">Features</h5>
              <div className="grid grid-cols-2 gap-2">
                {toolConfig?.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2 text-sm text-gray-300">
                    <Star className="w-3 h-3 text-[var(--hive-brand-primary)]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                className="max-w-sm flex-1 bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Tool
              </Button>
              <Button
                variant="outline"
                className="max-w-sm"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

// Add Tool Modal Component
function AddToolModal({
  isOpen,
  onClose,
  onAddTool,
  existingTools
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (toolType: ToolType) => void;
  existingTools: ToolType[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...new Set(Object.values(AVAILABLE_TOOLS).map(t => t.category))];

  const filteredTools = Object.entries(AVAILABLE_TOOLS).filter(([type, config]) => {
    const matchesCategory = selectedCategory === 'all' || config.category === selectedCategory;
    const matchesSearch = config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         config.description.toLowerCase().includes(searchQuery.toLowerCase());
    const notAlreadyAdded = !existingTools.includes(type as ToolType);

    return matchesCategory && matchesSearch && notAlreadyAdded;
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="max-w-4xl max-h-[90vh]">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">Add Tool to Space</h2>
        <p className="text-gray-400 mb-6">Choose from our collection of interactive tools</p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              value={searchQuery}
              onChange={(e: React.ChangeEvent) => setSearchQuery((e.target as any).value)}
              placeholder="Search tools..."
              className="w-full"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[var(--hive-brand-primary)] text-black'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredTools.map(([type, config]) => {
            const ToolIcon = config.icon;
            return (
              <Card
                key={type}
                className="p-4 cursor-pointer hover:border-[var(--hive-brand-primary)]/50 transition-all"
                onClick={() => onAddTool(type as ToolType)}
              >
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <ToolIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-white truncate">{config.name}</h4>
                    <p className="text-xs text-gray-400">{config.category}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{config.description}</p>

                <div className="flex flex-wrap gap-1">
                  {config.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {config.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{config.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No tools found matching your criteria</p>
          </div>
        )}
      </div>
    </Dialog>
  );
}
