'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { cn } from '../../../lib/utils';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';
import { 
  Zap,
  Plus,
  Settings,
  Crown,
  Star,
  Code,
  Wrench,
  Rocket,
  Users,
  Eye,
  Download,
  TrendingUp,
  Award,
  Target,
  Calendar,
  Clock,
  Flame,
  BarChart3,
  Play,
  Pause,
  Edit,
  Share,
  ExternalLink,
  Sparkles,
  Beaker,
  Cog,
  Database,
  Palette,
  Layout,
  Smartphone,
  Globe,
  ShieldCheck,
  Lightbulb,
  Coffee,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

// HiveLAB Types
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon?: string;
  type: 'form' | 'calculator' | 'tracker' | 'game' | 'utility' | 'social' | 'academic';
  status: 'draft' | 'testing' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  
  // Usage Stats
  usage: {
    totalUses: number;
    uniqueUsers: number;
    thisWeek: number;
    rating: number;
    reviews: number;
  };
  
  // Development Status
  progress: number; // 0-100
  isPublic: boolean;
  isShared: boolean;
  spaceId?: string;
  spaceName?: string;
  
  // Builder Info
  collaborators?: {
    id: string;
    name: string;
    avatar?: string;
    role: 'owner' | 'editor' | 'viewer';
  }[];
}

export interface BuilderStats {
  level: number;
  xp: number;
  xpToNext: number;
  totalTools: number;
  publishedTools: number;
  totalUses: number;
  streak: number;
  badges: {
    id: string;
    name: string;
    icon: string;
    earnedAt: Date;
    description: string;
  }[];
  achievements: {
    id: string;
    title: string;
    progress: number;
    total: number;
    completed: boolean;
  }[];
}

export interface HiveLabCardProps {
  tools: Tool[];
  builderStats: BuilderStats;
  isBuilder: boolean;
  isEditMode: boolean;
  onCreateTool?: () => void;
  onToolClick?: (toolId: string) => void;
  onSettingsClick?: () => void;
  className?: string;
}

// Tool Type Configuration
const toolTypeConfig = {
  form: { 
    icon: Layout, 
    color: 'bg-blue-500', 
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    label: 'Form' 
  },
  calculator: { 
    icon: Database, 
    color: 'bg-green-500', 
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    label: 'Calculator' 
  },
  tracker: { 
    icon: BarChart3, 
    color: 'bg-purple-500', 
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    label: 'Tracker' 
  },
  game: { 
    icon: Smartphone, 
    color: 'bg-pink-500', 
    textColor: 'text-pink-700',
    bgColor: 'bg-pink-50',
    label: 'Game' 
  },
  utility: { 
    icon: Wrench, 
    color: 'bg-orange-500', 
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    label: 'Utility' 
  },
  social: { 
    icon: Users, 
    color: 'bg-red-500', 
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    label: 'Social' 
  },
  academic: { 
    icon: Award, 
    color: 'bg-indigo-500', 
    textColor: 'text-indigo-700',
    bgColor: 'bg-indigo-50',
    label: 'Academic' 
  }
};

// Status Configuration
const statusConfig = {
  draft: { 
    icon: Edit, 
    color: 'bg-gray-500', 
    textColor: 'text-gray-700',
    label: 'Draft' 
  },
  testing: { 
    icon: Beaker, 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-700',
    label: 'Testing' 
  },
  published: { 
    icon: Rocket, 
    color: 'bg-green-500', 
    textColor: 'text-green-700',
    label: 'Live' 
  },
  archived: { 
    icon: Archive, 
    color: 'bg-gray-400', 
    textColor: 'text-gray-600',
    label: 'Archived' 
  }
};

// Builder Level Configuration
const builderLevelConfig = {
  1: { title: 'Apprentice', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  2: { title: 'Maker', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  3: { title: 'Artisan', color: 'text-green-600', bgColor: 'bg-green-100' },
  4: { title: 'Expert', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  5: { title: 'Master', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  6: { title: 'Legend', color: 'text-red-600', bgColor: 'bg-red-100' }
};

// Tool Item Component
function ToolItem({ 
  tool, 
  onClick,
  variant = 'compact'
}: { 
  tool: Tool;
  onClick?: (toolId: string) => void;
  variant?: 'compact' | 'minimal';
}) {
  const config = toolTypeConfig[tool.type];
  const statusConfig_ = statusConfig[tool.status];
  const TypeIcon = config.icon;
  const StatusIcon = statusConfig_.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'p-2 rounded-lg border transition-all cursor-pointer',
        'bg-white border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]'
      )}
      onClick={() => onClick?.(tool.id)}
    >
      <div className="flex items-start gap-2">
        <div className={cn('w-6 h-6 rounded flex items-center justify-center flex-shrink-0', config.color)}>
          <TypeIcon className="w-3 h-3 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h5 className="font-medium text-xs text-[var(--hive-text-primary)] truncate">
              {tool.name}
            </h5>
            <Badge variant="outline" className="text-xs px-1 py-0">
              <StatusIcon className="w-2 h-2 mr-1" />
              {statusConfig_.label}
            </Badge>
          </div>
          
          {variant === 'compact' && (
            <>
              <p className="text-xs text-[var(--hive-text-muted)] line-clamp-1 mt-0.5">
                {tool.description}
              </p>
              
              <div className="flex items-center gap-3 mt-1 text-xs text-[var(--hive-text-muted)]">
                <div className="flex items-center gap-1">
                  <Users className="w-2.5 h-2.5" />
                  {tool.usage.uniqueUsers}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-2.5 h-2.5" />
                  {tool.usage.totalUses}
                </div>
                {tool.usage.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-2.5 h-2.5" />
                    {tool.usage.rating.toFixed(1)}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      
      {tool.progress < 100 && tool.status === 'draft' && (
        <div className="mt-2">
          <Progress value={tool.progress} className="h-1" />
          <span className="text-xs text-[var(--hive-text-muted)]">{tool.progress}% complete</span>
        </div>
      )}
    </motion.div>
  );
}

// Builder Stats Component
function BuilderStatsDisplay({ stats }: { stats: BuilderStats }) {
  const levelConfig = builderLevelConfig[Math.min(stats.level, 6) as keyof typeof builderLevelConfig];
  const xpProgress = (stats.xp / (stats.xp + stats.xpToNext)) * 100;

  return (
    <div className="space-y-3">
      {/* Level Display */}
      <div className="text-center">
        <div className={cn('inline-flex items-center gap-2 px-2 py-1 rounded-full', levelConfig.bgColor)}>
          <Crown className={cn('w-3 h-3', levelConfig.color)} />
          <span className={cn('text-xs font-medium', levelConfig.color)}>
            Level {stats.level} {levelConfig.title}
          </span>
        </div>
        <div className="mt-2">
          <Progress value={xpProgress} className="h-1" />
          <p className="text-xs text-[var(--hive-text-muted)] mt-1">
            {stats.xp} / {stats.xp + stats.xpToNext} XP
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="text-sm font-semibold text-[var(--hive-text-primary)]">
            {stats.publishedTools}
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">Published</div>
        </div>
        <div>
          <div className="text-sm font-semibold text-[var(--hive-text-primary)]">
            {stats.totalUses}
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">Total Uses</div>
        </div>
        <div>
          <div className="text-sm font-semibold text-[var(--hive-text-primary)]">
            {stats.streak}
          </div>
          <div className="text-xs text-[var(--hive-text-muted)]">Day Streak</div>
        </div>
      </div>

      {/* Recent Badges */}
      {stats.badges.length > 0 && (
        <div className="flex justify-center gap-1">
          {stats.badges.slice(0, 3).map((badge) => (
            <div
              key={badge.id}
              className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center"
              title={badge.name}
            >
              <span className="text-xs">{badge.icon}</span>
            </div>
          ))}
          {stats.badges.length > 3 && (
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-600">+{stats.badges.length - 3}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Non-Builder Welcome Component
function NonBuilderWelcome({ onBecomeBuilder }: { onBecomeBuilder?: () => void }) {
  return (
    <div className="text-center space-y-3">
      <div className="w-12 h-12 mx-auto bg-[var(--hive-brand-gold)] rounded-full flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      
      <div>
        <h4 className="font-medium text-[var(--hive-text-primary)] mb-1">
          Become a Builder
        </h4>
        <p className="text-xs text-[var(--hive-text-muted)] leading-relaxed">
          Create tools that help your campus community. Join the builder program!
        </p>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-[var(--hive-text-muted)]">
          ✨ Create custom tools<br/>
          👑 Earn builder status<br/>
          🚀 Share with your spaces
        </div>
        
        <Button size="sm" className="w-full" onClick={onBecomeBuilder}>
          <Lightbulb className="w-3 h-3 mr-2" />
          Apply to Build
        </Button>
      </div>
    </div>
  );
}

// Quick Actions Component
function QuickActions({ 
  onCreateTool,
  hasTools 
}: { 
  onCreateTool?: () => void;
  hasTools: boolean;
}) {
  const quickTemplates = [
    { type: 'form', label: 'Form', icon: Layout },
    { type: 'calculator', label: 'Calculator', icon: Database },
    { type: 'tracker', label: 'Tracker', icon: BarChart3 }
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--hive-text-muted)]">Quick Create</span>
      </div>
      
      <div className="grid grid-cols-3 gap-1">
        {quickTemplates.map(({ type, label, icon: Icon }) => (
          <Button
            key={type}
            size="sm"
            variant="outline"
            className="h-8 px-2 text-xs"
            onClick={onCreateTool}
          >
            <Icon className="w-3 h-3 mr-1" />
            {label}
          </Button>
        ))}
      </div>
      
      {hasTools && (
        <Button
          size="sm"
          variant="ghost"
          className="w-full h-6 text-xs"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          View All Tools
        </Button>
      )}
    </div>
  );
}

// Main HiveLAB Card Component
export function HiveLabCard({
  tools,
  builderStats,
  isBuilder,
  isEditMode,
  onCreateTool,
  onToolClick,
  onSettingsClick,
  className
}: HiveLabCardProps) {
  const [showAllTools, setShowAllTools] = useState(false);

  const recentTools = useMemo(() => 
    tools
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, showAllTools ? undefined : 2),
    [tools, showAllTools]
  );

  const activeTools = useMemo(() => 
    tools.filter(tool => tool.status === 'published' || tool.status === 'testing'),
    [tools]
  );

  const draftTools = useMemo(() => 
    tools.filter(tool => tool.status === 'draft'),
    [tools]
  );

  return (
    <Card className={cn('h-full overflow-hidden', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[var(--hive-brand-gold)]" />
            <h3 className="font-semibold text-[var(--hive-text-primary)] text-sm">
              HiveLAB
            </h3>
            {isBuilder && (
              <Badge variant="default" className="text-xs bg-[var(--hive-brand-gold)]">
                <Crown className="w-3 h-3 mr-1" />
                Builder
              </Badge>
            )}
          </div>
          
          {!isEditMode && isBuilder && (
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={onSettingsClick}
            >
              <Settings className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {!isBuilder ? (
          <NonBuilderWelcome onBecomeBuilder={onCreateTool} />
        ) : (
          <>
            {/* Builder Stats */}
            <BuilderStatsDisplay stats={builderStats} />

            {/* Recent/Active Tools */}
            {tools.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--hive-text-muted)]">
                    Recent Tools ({tools.length})
                  </span>
                  {tools.length > 2 && !showAllTools && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 px-1 text-xs"
                      onClick={() => setShowAllTools(true)}
                    >
                      View All
                    </Button>
                  )}
                </div>
                
                <div className="space-y-1">
                  {recentTools.map((tool) => (
                    <ToolItem
                      key={tool.id}
                      tool={tool}
                      onClick={onToolClick}
                      variant="minimal"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <QuickActions 
              onCreateTool={onCreateTool}
              hasTools={tools.length > 0}
            />

            {/* Active Project Progress */}
            {draftTools.length > 0 && (
              <div className="p-2 bg-[var(--hive-background-tertiary)] rounded text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <Edit className="w-3 h-3 text-[var(--hive-text-muted)]" />
                  <span className="text-[var(--hive-text-muted)]">
                    {draftTools.length} draft{draftTools.length > 1 ? 's' : ''} in progress
                  </span>
                </div>
                {draftTools[0] && (
                  <div>
                    <div className="font-medium text-[var(--hive-text-primary)]">
                      {draftTools[0].name}
                    </div>
                    <Progress value={draftTools[0].progress} className="h-1 mt-1" />
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {tools.length === 0 && (
              <div className="text-center py-4">
                <Beaker className="w-8 h-8 mx-auto mb-2 text-[var(--hive-text-muted)] opacity-50" />
                <p className="text-xs text-[var(--hive-text-muted)] mb-2">
                  Start building your first tool!
                </p>
                <Button size="sm" onClick={onCreateTool}>
                  <Plus className="w-3 h-3 mr-1" />
                  Create Tool
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Default props for development
export const mockTools: Tool[] = [
  {
    id: 'tool-1',
    name: 'Study Group Scheduler',
    description: 'Schedule and manage study sessions for your courses',
    type: 'form',
    status: 'published',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    usage: {
      totalUses: 145,
      uniqueUsers: 23,
      thisWeek: 18,
      rating: 4.7,
      reviews: 12
    },
    progress: 100,
    isPublic: true,
    isShared: true,
    spaceId: 'space-cs250',
    spaceName: 'CS 250 Study Group'
  },
  {
    id: 'tool-2',
    name: 'GPA Calculator',
    description: 'Calculate your semester and cumulative GPA',
    type: 'calculator',
    status: 'testing',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000),
    usage: {
      totalUses: 67,
      uniqueUsers: 45,
      thisWeek: 22,
      rating: 4.9,
      reviews: 8
    },
    progress: 95,
    isPublic: false,
    isShared: false
  },
  {
    id: 'tool-3',
    name: 'Habit Tracker',
    description: 'Track daily habits and build streaks',
    type: 'tracker',
    status: 'draft',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    usage: {
      totalUses: 0,
      uniqueUsers: 0,
      thisWeek: 0,
      rating: 0,
      reviews: 0
    },
    progress: 65,
    isPublic: false,
    isShared: false
  }
];

export const mockBuilderStats: BuilderStats = {
  level: 3,
  xp: 2450,
  xpToNext: 550,
  totalTools: 8,
  publishedTools: 3,
  totalUses: 1247,
  streak: 12,
  badges: [
    {
      id: 'badge-1',
      name: 'First Tool',
      icon: '🚀',
      earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      description: 'Published your first tool'
    },
    {
      id: 'badge-2',
      name: 'Popular Creator',
      icon: '⭐',
      earnedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      description: 'Tool reached 100+ uses'
    },
    {
      id: 'badge-3',
      name: 'Streak Master',
      icon: '🔥',
      earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      description: '10-day building streak'
    }
  ],
  achievements: [
    {
      id: 'achievement-1',
      title: 'Tool Master',
      progress: 3,
      total: 5,
      completed: false
    },
    {
      id: 'achievement-2',
      title: 'Community Helper',
      progress: 147,
      total: 500,
      completed: false
    }
  ]
};