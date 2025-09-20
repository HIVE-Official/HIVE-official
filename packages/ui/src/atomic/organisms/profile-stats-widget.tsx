'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Zap,
  Users,
  Clock,
  Calendar,
  Heart,
  MessageSquare,
  Star,
  Trophy,
  Activity,
  Settings,
  ExternalLink,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  Download
} from 'lucide-react';

export interface StatMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  category: 'engagement' | 'academic' | 'social' | 'productivity' | 'growth';
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  period: 'daily' | 'weekly' | 'monthly' | 'semester';
  isHighlighted?: boolean;
}

export interface PersonalGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'academic' | 'social' | 'personal' | 'career';
  isActive: boolean;
}

export interface ProfileStatsWidgetProps {
  user: {
    id: string;
    name: string;
    academicYear?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
  };
  keyMetrics?: StatMetric[];
  personalGoals?: PersonalGoal[];
  overallScore?: number;
  weeklyGrowth?: number;
  academicProgress?: number;
  socialEngagement?: number;
  platformLevel?: number;
  streak?: number;
  isEditable?: boolean;
  onViewMetric?: (metricId: string) => void;
  onViewAllStats?: () => void;
  onSetGoal?: () => void;
  onExportData?: () => void;
  onViewInsights?: () => void;
  className?: string;
}

const getMetricCategoryConfig = (category: string) => {
  const configs = {
    engagement: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: Activity,
      label: 'Engagement'
    },
    academic: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: Target,
      label: 'Academic'
    },
    social: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: Users,
      label: 'Social'
    },
    productivity: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      borderColor: 'border-[var(--hive-gold)]/20',
      icon: Zap,
      label: 'Productivity'
    },
    growth: {
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      icon: TrendingUp,
      label: 'Growth'
    }
  };
  
  return configs[category as keyof typeof configs] || configs.engagement;
};

const getTrendIcon = (trend: string) => {
  const icons = {
    up: ArrowUp,
    down: ArrowDown,
    stable: Minus
  };
  return icons[trend as keyof typeof icons] || Minus;
};

const getTrendColor = (trend: string) => {
  const colors = {
    up: 'text-green-500',
    down: 'text-red-500',
    stable: 'text-[var(--hive-text-muted)]'
  };
  return colors[trend as keyof typeof colors] || colors.stable;
};

const getGoalCategoryConfig = (category: string) => {
  const configs = {
    academic: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      icon: Target,
      label: 'Academic'
    },
    social: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      icon: Users,
      label: 'Social'
    },
    personal: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      icon: Heart,
      label: 'Personal'
    },
    career: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      icon: Trophy,
      label: 'Career'
    }
  };
  
  return configs[category as keyof typeof configs] || configs.personal;
};

export const ProfileStatsWidget: React.FC<ProfileStatsWidgetProps> = ({
  user,
  keyMetrics = [],
  personalGoals = [],
  overallScore = 0,
  weeklyGrowth = 0,
  academicProgress = 0,
  socialEngagement = 0,
  platformLevel = 1,
  streak = 0,
  isEditable = true,
  onViewMetric,
  onViewAllStats,
  onSetGoal,
  onExportData,
  onViewInsights,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get top metrics for display
  const topMetrics = keyMetrics.slice(0, 4);
  const activeGoals = personalGoals.filter(goal => goal.isActive);
  const completedGoals = personalGoals.filter(goal => 
    goal.current >= goal.target && goal.isActive
  );

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
              Personal Analytics
            </Text>
            {streak > 0 && (
              <Badge variant="outline" className="text-xs">
                <Trophy className="h-3 w-3 mr-1" />
                Level {platformLevel}
              </Badge>
            )}
          </div>
          {isEditable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewAllStats}
              className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Core Stats Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <BarChart3 className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {overallScore}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Overall Score
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <Text variant="body-sm" weight="medium" color="primary">
                +{weeklyGrowth}%
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Weekly Growth
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Award className="h-3 w-3 text-[var(--hive-gold)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {streak}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Day Streak
            </Text>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary">Academic Progress</Text>
              <Text variant="body-xs" color="secondary">{academicProgress}%</Text>
            </div>
            <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2">
              <div 
                className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${academicProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary">Social Engagement</Text>
              <Text variant="body-xs" color="secondary">{socialEngagement}%</Text>
            </div>
            <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2">
              <div 
                className="bg-purple-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${socialEngagement}%` }}
              />
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        {topMetrics.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Key Metrics:</Text>
              {keyMetrics.length > 4 && (
                <Text variant="body-xs" color="secondary">
                  +{keyMetrics.length - 4} more
                </Text>
              )}
            </div>
            <div className="space-y-1">
              {topMetrics.map((metric) => {
                const config = getMetricCategoryConfig(metric.category);
                const TrendIcon = getTrendIcon(metric.trend);
                const trendColor = getTrendColor(metric.trend);
                
                return (
                  <div 
                    key={metric.id}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded transition-colors cursor-pointer',
                      'hover:bg-[var(--hive-background-secondary)]',
                      metric.isHighlighted && 'bg-[var(--hive-gold)]/5 border border-[var(--hive-gold)]/20'
                    )}
                    onClick={() => onViewMetric?.(metric.id)}
                  >
                    <config.icon className={cn('h-3 w-3', config.color)} />
                    <Text variant="body-xs" color="primary" className="flex-1 truncate">
                      {metric.name}
                    </Text>
                    <div className="flex items-center gap-1">
                      <Text variant="body-xs" color="primary" weight="medium">
                        {metric.value.toLocaleString()}{metric.unit}
                      </Text>
                      <TrendIcon className={cn('h-2 w-2', trendColor)} />
                      <Text variant="body-xs" className={trendColor}>
                        {metric.trendPercentage}%
                      </Text>
                    </div>
                    <ChevronRight className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Personal Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-[var(--hive-border-primary)]">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Active Goals:</Text>
              <Text variant="body-xs" color="secondary">
                {completedGoals.length}/{activeGoals.length} completed
              </Text>
            </div>
            <div className="space-y-2">
              {activeGoals.slice(0, 2).map((goal) => {
                const config = getGoalCategoryConfig(goal.category);
                const progress = Math.min((goal.current / goal.target) * 100, 100);
                const isCompleted = goal.current >= goal.target;
                
                return (
                  <div key={goal.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <config.icon className={cn('h-3 w-3', config.color)} />
                        <Text variant="body-xs" color="primary" className="truncate">
                          {goal.name}
                        </Text>
                      </div>
                      <Text variant="body-xs" color="secondary">
                        {goal.current}/{goal.target} {goal.unit}
                      </Text>
                    </div>
                    <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-1.5">
                      <div 
                        className={cn(
                          'rounded-full h-1.5 transition-all duration-500',
                          isCompleted ? 'bg-green-500' : config.color.replace('text-', 'bg-')
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Academic Year Progress */}
        {user.academicYear && (
          <div className="space-y-2 pt-2 border-t border-[var(--hive-border-primary)]">
            <Text variant="body-sm" color="primary" weight="medium">
              {user.academicYear.charAt(0).toUpperCase() + user.academicYear.slice(1)} Year Progress:
            </Text>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Text variant="body-sm" color="primary">Semester Completion</Text>
                <Text variant="body-xs" color="secondary">{academicProgress}%</Text>
              </div>
              <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2">
                <div 
                  className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${academicProgress}%` }}
                />
              </div>
              <Text variant="body-xs" color="secondary" className="mt-1">
                {academicProgress >= 75 ? 'Excellent progress this semester! 🎓' :
                 academicProgress >= 50 ? 'Good progress - keep it up! 📚' :
                 academicProgress >= 25 ? 'Building momentum this term 💪' :
                 'Early semester - great potential ahead! ✨'}
              </Text>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]">
          {isEditable && onSetGoal && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSetGoal}
              className="flex-1"
            >
              <Target className="h-3 w-3 mr-1" />
              Set Goal
            </Button>
          )}
          
          {onViewAllStats && (
            <Button
              variant="default"
              size="sm"
              onClick={onViewAllStats}
              className="flex-1"
            >
              <BarChart3 className="h-3 w-3 mr-1" />
              All Stats
            </Button>
          )}
          
          {onViewInsights && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewInsights}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Eye className="h-3 w-3" />
            </Button>
          )}
          
          {onExportData && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onExportData}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Download className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Empty State */}
        {keyMetrics.length === 0 && personalGoals.length === 0 && (
          <div className="text-center py-6">
            <BarChart3 className="h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" />
            <Text variant="body-sm" color="secondary" className="mb-2">
              No analytics data yet
            </Text>
            <Text variant="body-xs" color="secondary" className="mb-4">
              Start engaging with the platform to see your personal analytics and insights
            </Text>
            {isEditable && onSetGoal && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSetGoal}
              >
                <Target className="h-3 w-3 mr-1" />
                Set Your First Goal
              </Button>
            )}
          </div>
        )}

      </CardContent>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" />
      )}
    </Card>
  );
};