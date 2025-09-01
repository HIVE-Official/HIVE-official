'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { 
  Zap,
  Plus,
  Wrench,
  Code,
  Beaker,
  Lightbulb,
  Rocket,
  Star,
  Users,
  Heart,
  Download,
  Share,
  Play,
  Pause,
  Settings,
  ChevronRight,
  ExternalLink,
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Sparkles,
  FlaskConical
} from 'lucide-react';

export interface BuilderTool {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'productivity' | 'social' | 'utility' | 'experimental';
  buildStatus: 'concept' | 'prototype' | 'testing' | 'published' | 'archived';
  progress: number;
  collaborators: number;
  deployments: number;
  lastWorkedOn: string;
  isPublic: boolean;
  isFeatured?: boolean;
  technologyStack?: string[];
}

export interface BuilderProject {
  id: string;
  name: string;
  description: string;
  type: 'individual' | 'team' | 'hackathon' | 'academic';
  deadline?: string;
  progress: number;
  teamSize: number;
  isActive: boolean;
}

export interface ProfileHiveLabWidgetProps {
  user: {
    id: string;
    name: string;
    builderLevel?: 'novice' | 'apprentice' | 'expert' | 'master';
  };
  builderTools?: BuilderTool[];
  activeProjects?: BuilderProject[];
  totalBuilds?: number;
  totalDeployments?: number;
  totalCollaborations?: number;
  builderScore?: number;
  weeklyBuildTime?: number;
  featuredBuild?: BuilderTool;
  isEditable?: boolean;
  onCreateTool?: () => void;
  onViewTool?: (toolId: string) => void;
  onEditTool?: (toolId: string) => void;
  onDeployTool?: (toolId: string) => void;
  onViewAllBuilds?: () => void;
  onViewBuildLab?: () => void;
  className?: string;
}

const getToolCategoryConfig = (category: string) => {
  const configs = {
    academic: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: Lightbulb,
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
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: Users,
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
      icon: FlaskConical,
      label: 'Experimental'
    }
  };
  
  return configs[category as keyof typeof configs] || configs.utility;
};

const getBuildStatusConfig = (status: string) => {
  const configs = {
    concept: {
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      label: 'Concept',
      progress: 10
    },
    prototype: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      label: 'Prototype',
      progress: 35
    },
    testing: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      label: 'Testing',
      progress: 70
    },
    published: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      label: 'Published',
      progress: 100
    },
    archived: {
      color: 'text-[var(--hive-text-muted)]',
      bgColor: 'bg-[var(--hive-background-secondary)]',
      label: 'Archived',
      progress: 0
    }
  };
  
  return configs[status as keyof typeof configs] || configs.concept;
};

const getBuilderLevelConfig = (level: string) => {
  const configs = {
    novice: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      icon: Sparkles,
      label: 'Novice Builder'
    },
    apprentice: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      icon: Code,
      label: 'Apprentice Builder'
    },
    expert: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      icon: Rocket,
      label: 'Expert Builder'
    },
    master: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      icon: Trophy,
      label: 'Master Builder'
    }
  };
  
  return configs[level as keyof typeof configs] || configs.novice;
};

const formatTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
};

export const ProfileHiveLabWidget: React.FC<ProfileHiveLabWidgetProps> = ({
  user,
  builderTools = [],
  activeProjects = [],
  totalBuilds = 0,
  totalDeployments = 0,
  totalCollaborations = 0,
  builderScore = 0,
  weeklyBuildTime = 0,
  featuredBuild,
  isEditable = true,
  onCreateTool,
  onViewTool,
  onEditTool,
  onDeployTool,
  onViewAllBuilds,
  onViewBuildLab,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the most recent builds (up to 3)
  const recentBuilds = builderTools
    .sort((a, b) => new Date(b.lastWorkedOn).getTime() - new Date(a.lastWorkedOn).getTime())
    .slice(0, 3);
    
  const builderLevelConfig = getBuilderLevelConfig(user.builderLevel || 'novice');
  const activeBuilds = builderTools.filter(tool => 
    ['prototype', 'testing'].includes(tool.buildStatus)
  ).length;
  const publishedBuilds = builderTools.filter(tool => 
    tool.buildStatus === 'published'
  ).length;

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
              HiveLab Builder
            </Text>
            <Badge variant="secondary" className={cn('text-xs', builderLevelConfig.color)}>
              <builderLevelConfig.icon className="h-3 w-3 mr-1" />
              {builderLevelConfig.label}
            </Badge>
          </div>
          {isEditable && (
            <ButtonEnhanced
              variant="ghost"
              size="icon"
              onClick={onViewBuildLab}
              className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </ButtonEnhanced>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Builder Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Beaker className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalBuilds}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Total Builds
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Rocket className="h-3 w-3 text-green-500" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalDeployments}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Deployments
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Users className="h-3 w-3 text-purple-500" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalCollaborations}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Collaborations
            </Text>
          </div>
        </div>

        {/* Builder Score Progress */}
        {builderScore > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Builder Score:</Text>
              <Text variant="body-xs" color="gold" weight="medium">
                {builderScore}/100
              </Text>
            </div>
            <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-[var(--hive-gold)] rounded-full h-2 transition-all duration-500"
                style={{ width: `${builderScore}%` }}
              />
            </div>
            <Text variant="body-xs" color="secondary">
              {builderScore >= 80 ? 'Master level builder! 🚀' : 
               builderScore >= 60 ? 'Expert builder - keep growing! ⚡' :
               builderScore >= 40 ? 'Apprentice builder - great progress! 💫' :
               'Novice builder - exciting journey ahead! ✨'}
            </Text>
          </div>
        )}

        {/* Featured Build */}
        {featuredBuild && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Featured Build:</Text>
              <Star className="h-3 w-3 text-[var(--hive-gold)]" />
            </div>
            <div className={cn(
              'p-3 rounded-lg border transition-colors hover:bg-[var(--hive-background-secondary)] cursor-pointer',
              getToolCategoryConfig(featuredBuild.category).bgColor,
              getToolCategoryConfig(featuredBuild.category).borderColor
            )}
            onClick={() => onViewTool?.(featuredBuild.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  {(() => {
                    const IconComponent = getToolCategoryConfig(featuredBuild.category).icon;
                    return <IconComponent className={cn(
                      'h-4 w-4 mt-0.5 flex-shrink-0',
                      getToolCategoryConfig(featuredBuild.category).color
                    )} />;
                  })()}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Text variant="body-sm" weight="medium" color="primary" className="truncate">
                        {featuredBuild.name}
                      </Text>
                      <Badge 
                        variant="secondary" 
                        className={cn('text-xs', getBuildStatusConfig(featuredBuild.buildStatus).color)}
                      >
                        {getBuildStatusConfig(featuredBuild.buildStatus).label}
                      </Badge>
                    </div>
                    <Text variant="body-xs" color="secondary" className="line-clamp-2">
                      {featuredBuild.description}
                    </Text>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Target className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                        <Text variant="body-xs" color="secondary">
                          {featuredBuild.progress}% complete
                        </Text>
                      </div>
                      {featuredBuild.collaborators > 1 && (
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-purple-500" />
                          <Text variant="body-xs" color="secondary">
                            {featuredBuild.collaborators} collaborators
                          </Text>
                        </div>
                      )}
                      {featuredBuild.deployments > 0 && (
                        <div className="flex items-center gap-1">
                          <Rocket className="h-3 w-3 text-green-500" />
                          <Text variant="body-xs" color="secondary">
                            {featuredBuild.deployments} deployments
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {isEditable && onEditTool && (
                    <ButtonEnhanced
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditTool(featuredBuild.id);
                      }}
                      className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
                    >
                      <Play className="h-3 w-3" />
                    </ButtonEnhanced>
                  )}
                  {onDeployTool && featuredBuild.buildStatus === 'testing' && (
                    <ButtonEnhanced
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeployTool(featuredBuild.id);
                      }}
                      className="h-6 w-6 text-green-500 hover:text-green-600"
                    >
                      <Rocket className="h-3 w-3" />
                    </ButtonEnhanced>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Builds */}
        {recentBuilds.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Recent Builds:</Text>
              {builderTools.length > 3 && (
                <Text variant="body-xs" color="secondary">
                  +{builderTools.length - 3} more
                </Text>
              )}
            </div>
            <div className="space-y-1">
              {recentBuilds.map((tool) => {
                const categoryConfig = getToolCategoryConfig(tool.category);
                const statusConfig = getBuildStatusConfig(tool.buildStatus);
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
                    <Text variant="body-xs" color="secondary">
                      {formatTimeAgo(tool.lastWorkedOn)}
                    </Text>
                    <ChevronRight className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Projects */}
        {activeProjects.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-[var(--hive-border-primary)]">
            <Text variant="body-sm" color="primary" weight="medium">Active Projects:</Text>
            <div className="space-y-1">
              {activeProjects.slice(0, 2).map((project) => (
                <div 
                  key={project.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      project.isActive ? 'bg-green-500' : 'bg-[var(--hive-text-muted)]'
                    )} />
                    <Text variant="body-xs" color="primary" className="truncate">
                      {project.name}
                    </Text>
                  </div>
                  <Text variant="body-xs" color="secondary">
                    {project.progress}%
                  </Text>
                  {project.teamSize > 1 && (
                    <div className="flex items-center gap-1">
                      <Users className="h-2 w-2 text-[var(--hive-text-secondary)]" />
                      <Text variant="body-xs" color="secondary">
                        {project.teamSize}
                      </Text>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Build Activity */}
        {weeklyBuildTime > 0 && (
          <div className="space-y-2 pt-2 border-t border-[var(--hive-border-primary)]">
            <Text variant="body-sm" color="primary" weight="medium">This Week:</Text>
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="secondary">Build Time</Text>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-[var(--hive-background-secondary)] rounded-full">
                  <div 
                    className="h-2 bg-gradient-to-r from-purple-500 to-[var(--hive-gold)] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((weeklyBuildTime / 20) * 100, 100)}%` }}
                  />
                </div>
                <Text variant="body-xs" color="gold" weight="medium">
                  {weeklyBuildTime}h
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]">
          {isEditable && onCreateTool && (
            <ButtonEnhanced
              variant="secondary"
              size="sm"
              onClick={onCreateTool}
              className="flex-1"
            >
              <Plus className="h-3 w-3 mr-1" />
              New Build
            </ButtonEnhanced>
          )}
          
          {onViewAllBuilds && (
            <ButtonEnhanced
              variant="primary"
              size="sm"
              onClick={onViewAllBuilds}
              className="flex-1"
            >
              <Beaker className="h-3 w-3 mr-1" />
              All Builds
            </ButtonEnhanced>
          )}
          
          {onViewBuildLab && (
            <ButtonEnhanced
              variant="ghost"
              size="icon"
              onClick={onViewBuildLab}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <ExternalLink className="h-3 w-3" />
            </ButtonEnhanced>
          )}
        </div>

        {/* Empty State */}
        {builderTools.length === 0 && (
          <div className="text-center py-6">
            <Beaker className="h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" />
            <Text variant="body-sm" color="secondary" className="mb-2">
              No builds yet
            </Text>
            <Text variant="body-xs" color="secondary" className="mb-4">
              Start building your first tool in HiveLab for the UB community
            </Text>
            {isEditable && onCreateTool && (
              <ButtonEnhanced
                variant="secondary"
                size="sm"
                onClick={onCreateTool}
              >
                <Plus className="h-3 w-3 mr-1" />
                Start Your First Build
              </ButtonEnhanced>
            )}
          </div>
        )}

      </CardContent>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" />
      )}
    </Card>
  );
};