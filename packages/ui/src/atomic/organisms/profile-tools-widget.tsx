'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { 
  Wrench,
  Plus,
  ExternalLink,
  Users,
  Heart,
  Star,
  Zap,
  Code,
  Calculator,
  Calendar,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronRight,
  Play,
  Share,
  Download
} from 'lucide-react';

export interface PersonalTool {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'productivity' | 'social' | 'utility' | 'experimental';
  status: 'active' | 'draft' | 'published' | 'archived';
  usageCount: number;
  likes: number;
  collaborators?: number;
  lastUsed?: string;
  isPublic: boolean;
  isFeatured?: boolean;
}

export interface ProfileToolsWidgetProps {
  user: {
    id: string;
    name: string;
  };
  personalTools?: PersonalTool[];
  totalToolsCreated?: number;
  totalUsage?: number;
  featuredTool?: PersonalTool;
  weeklyActivity?: number;
  isEditable?: boolean;
  onCreateTool?: () => void;
  onViewTool?: (toolId: string) => void;
  onEditTool?: (toolId: string) => void;
  onViewAllTools?: () => void;
  onToolMarketplace?: () => void;
  className?: string;
}

const getToolCategoryConfig = (category: string) => {
  const configs = {
    academic: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: Calculator,
      label: 'Academic'
    },
    productivity: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      borderColor: 'border-[var(--hive-gold)]/20',
      icon: Zap,
      label: 'Productivity'
    },
    social: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      borderColor: 'border-[var(--hive-gold)]/20',
      icon: MessageSquare,
      label: 'Social'
    },
    utility: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: Wrench,
      label: 'Utility'
    },
    experimental: {
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      icon: Code,
      label: 'Experimental'
    }
  };
  
  return configs[category as keyof typeof configs] || configs.utility;
};

const getToolStatusConfig = (status: string) => {
  const configs = {
    active: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      label: 'Active'
    },
    draft: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      label: 'Draft'
    },
    published: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      label: 'Published'
    },
    archived: {
      color: 'text-[var(--hive-text-muted)]',
      bgColor: 'bg-[var(--hive-background-secondary)]',
      label: 'Archived'
    }
  };
  
  return configs[status as keyof typeof configs] || configs.draft;
};

export const ProfileToolsWidget: React.FC<ProfileToolsWidgetProps> = ({
  user,
  personalTools = [],
  totalToolsCreated = 0,
  totalUsage = 0,
  featuredTool,
  weeklyActivity = 0,
  isEditable = true,
  onCreateTool,
  onViewTool,
  onEditTool,
  onViewAllTools,
  onToolMarketplace,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the most recent tools (up to 3)
  const recentTools = personalTools.slice(0, 3);
  const activeTools = personalTools.filter(tool => tool.status === 'active' || tool.status === 'published').length;
  const totalLikes = personalTools.reduce((sum, tool) => sum + tool.likes, 0);

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]',
        isHovered && 'scale-[1.02]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text variant="body-sm" color="gold" weight="medium">
              Personal Tools
            </Text>
            {activeTools > 0 && (
              <Badge variant="secondary" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                {activeTools} Active
              </Badge>
            )}
          </div>
          {isEditable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewAllTools}
              className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Tool Creation Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Wrench className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalToolsCreated}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Tools Created
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalUsage.toLocaleString()}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Total Usage
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Heart className="h-3 w-3 text-red-500" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalLikes}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Likes Received
            </Text>
          </div>
        </div>

        {/* Featured Tool */}
        {featuredTool && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Featured Tool:</Text>
              <Star className="h-3 w-3 text-[var(--hive-gold)]" />
            </div>
            <div className={cn(
              'p-3 rounded-lg border transition-colors hover:bg-[var(--hive-background-secondary)] cursor-pointer',
              getToolCategoryConfig(featuredTool.category).bgColor,
              getToolCategoryConfig(featuredTool.category).borderColor
            )}
            onClick={() => onViewTool?.(featuredTool.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {(() => {
                    const IconComponent = getToolCategoryConfig(featuredTool.category).icon;
                    return <IconComponent className={cn(
                      'h-4 w-4 mt-0.5 flex-shrink-0',
                      getToolCategoryConfig(featuredTool.category).color
                    )} />;
                  })()}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Text variant="body-sm" weight="medium" color="primary" className="truncate">
                        {featuredTool.name}
                      </Text>
                      {featuredTool.isPublic && (
                        <Badge variant="secondary" className="text-xs">
                          Public
                        </Badge>
                      )}
                    </div>
                    <Text variant="body-xs" color="secondary" className="line-clamp-2">
                      {featuredTool.description}
                    </Text>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                        <Text variant="body-xs" color="secondary">
                          {featuredTool.usageCount.toLocaleString()} uses
                        </Text>
                      </div>
                      {featuredTool.likes > 0 && (
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3 text-red-500" />
                          <Text variant="body-xs" color="secondary">
                            {featuredTool.likes}
                          </Text>
                        </div>
                      )}
                      {featuredTool.collaborators && featuredTool.collaborators > 1 && (
                        <Text variant="body-xs" color="secondary">
                          +{featuredTool.collaborators - 1} collaborators
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {isEditable && onEditTool && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onEditTool(featuredTool.id);
                      }}
                      className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
                    >
                      <Play className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      onViewTool?.(featuredTool.id);
                    }}
                    className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Tools */}
        {recentTools.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Recent Tools:</Text>
              {personalTools.length > 3 && (
                <Text variant="body-xs" color="secondary">
                  +{personalTools.length - 3} more
                </Text>
              )}
            </div>
            <div className="space-y-1">
              {recentTools.map((tool: any) => {
                const categoryConfig = getToolCategoryConfig(tool.category);
                const statusConfig = getToolStatusConfig(tool.status);
                return (
                  <div 
                    key={tool.id}
                    className="flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer"
                    onClick={() => onViewTool?.(tool.id)}
                  >
                    <categoryConfig.icon className={cn('h-3 w-3', categoryConfig.color)} />
                    <Text variant="body-xs" color="primary" className="flex-1 truncate">
                      {tool.name}
                    </Text>
                    <Badge 
                      variant="secondary" 
                      className={cn('text-xs', statusConfig.color)}
                    >
                      {statusConfig.label}
                    </Badge>
                    <div className="flex items-center gap-1">
                      {tool.usageCount > 0 && (
                        <Text variant="body-xs" color="secondary">
                          {tool.usageCount > 999 ? '999+' : tool.usageCount}
                        </Text>
                      )}
                      <ChevronRight className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Weekly Activity */}
        {weeklyActivity > 0 && (
          <div className="space-y-2 pt-2 border-t border-[var(--hive-border-primary)]">
            <Text variant="body-sm" color="primary" weight="medium">This Week:</Text>
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="secondary">Tool Development Activity</Text>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-[var(--hive-background-secondary)] rounded-full">
                  <div 
                    className="h-2 bg-[var(--hive-gold)] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(weeklyActivity, 100)}%` }}
                  />
                </div>
                <Text variant="body-xs" color="gold" weight="medium">
                  {weeklyActivity}%
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]">
          {isEditable && onCreateTool && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onCreateTool}
              className="flex-1"
            >
              <Plus className="h-3 w-3 mr-1" />
              Create Tool
            </Button>
          )}
          
          {onViewAllTools && (
            <Button
              variant="primary"
              size="sm"
              onClick={onViewAllTools}
              className="flex-1"
            >
              <Wrench className="h-3 w-3 mr-1" />
              My Tools
            </Button>
          )}
          
          {onToolMarketplace && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToolMarketplace}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Share className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Empty State */}
        {personalTools.length === 0 && (
          <div className="text-center py-6">
            <Wrench className="h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" />
            <Text variant="body-sm" color="secondary" className="mb-2">
              No tools created yet
            </Text>
            <Text variant="body-xs" color="secondary" className="mb-4">
              Start building your first tool to help fellow UB students
            </Text>
            {isEditable && onCreateTool && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onCreateTool}
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Your First Tool
              </Button>
            )}
          </div>
        )}

      </CardContent>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--hive-gold)]/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" />
      )}
    </Card>
  );
};