'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Flag,
  Target,
  CheckCircle,
  Circle,
  Clock,
  Calendar,
  TrendingUp,
  Award,
  Star,
  Zap,
  Users,
  BookOpen,
  Briefcase,
  Heart,
  Coffee,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Share2,
  Lock,
  Unlock
} from 'lucide-react';
import { Button, Badge, Progress } from '@hive/ui';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, addDays, isBefore, isAfter } from 'date-fns';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';

interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'career' | 'personal' | 'social' | 'health' | 'creative';
  targetDate: Date;
  createdAt: Date;
  completedAt?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  progress: number;
  tasks: {
    id: string;
    title: string;
    completed: boolean;
    completedAt?: Date;
  }[];
  visibility: 'private' | 'friends' | 'public';
  color: string;
  icon: string;
  reminders: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface MilestoneCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  count: number;
}

interface MilestoneTrackerProps {
  userId: string;
  className?: string;
}

export function MilestoneTracker({ userId, className = '' }: MilestoneTrackerProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [categories, setCategories] = useState<MilestoneCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'timeline' | 'calendar'>('list');

  useEffect(() => {
    fetchMilestones();
  }, [userId]);

  const fetchMilestones = async () => {
    try {
      const response = await authenticatedFetch(`/api/users/${userId}/milestones`);
      if (response.ok) {
        const data = await response.json();
        const processedMilestones = processMilestones(data.milestones || []);
        setMilestones(processedMilestones);
        calculateCategories(processedMilestones);
      }
    } catch (error) {
      logger.error('Error fetching milestones:', error);
    } finally {
      setLoading(false);
    }
  };

  const processMilestones = (milestoneList: any[]): Milestone[] => {
    return milestoneList.map(milestone => {
      const completedTasks = milestone.tasks?.filter((t: any) => t.completed).length || 0;
      const totalTasks = milestone.tasks?.length || 0;
      const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      
      // Determine status
      let status: Milestone['status'] = 'pending';
      if (milestone.completedAt) {
        status = 'completed';
      } else if (progress > 0) {
        status = 'in_progress';
      } else if (isBefore(new Date(milestone.targetDate), new Date())) {
        status = 'overdue';
      }
      
      return {
        ...milestone,
        targetDate: new Date(milestone.targetDate),
        createdAt: new Date(milestone.createdAt),
        completedAt: milestone.completedAt ? new Date(milestone.completedAt) : undefined,
        status,
        progress
      };
    });
  };

  const calculateCategories = (milestoneList: Milestone[]) => {
    const categoryMap: Record<string, MilestoneCategory> = {
      academic: {
        id: 'academic',
        name: 'Academic',
        icon: BookOpen,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        count: 0
      },
      career: {
        id: 'career',
        name: 'Career',
        icon: Briefcase,
        color: 'text-purple-400',
        bgColor: 'bg-purple-400/10',
        count: 0
      },
      personal: {
        id: 'personal',
        name: 'Personal',
        icon: Star,
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400/10',
        count: 0
      },
      social: {
        id: 'social',
        name: 'Social',
        icon: Users,
        color: 'text-pink-400',
        bgColor: 'bg-pink-400/10',
        count: 0
      },
      health: {
        id: 'health',
        name: 'Health',
        icon: Heart,
        color: 'text-green-400',
        bgColor: 'bg-green-400/10',
        count: 0
      },
      creative: {
        id: 'creative',
        name: 'Creative',
        icon: Zap,
        color: 'text-orange-400',
        bgColor: 'bg-orange-400/10',
        count: 0
      }
    };

    milestoneList.forEach(milestone => {
      if (categoryMap[milestone.category]) {
        categoryMap[milestone.category].count++;
      }
    });

    setCategories(Object.values(categoryMap));
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'in_progress': return 'text-blue-400 bg-blue-400/10';
      case 'overdue': return 'text-red-400 bg-red-400/10';
      default: return 'text-neutral-400 bg-neutral-400/10';
    }
  };

  const getPriorityColor = (priority: Milestone['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-neutral-400';
    }
  };

  const toggleTask = async (milestoneId: string, taskId: string) => {
    try {
      await authenticatedFetch(`/api/milestones/${milestoneId}/tasks/${taskId}/toggle`, {
        method: 'POST'
      });
      
      // Update local state
      setMilestones(prev => prev.map(milestone => {
        if (milestone.id === milestoneId) {
          const updatedTasks = milestone.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed, completedAt: !task.completed ? new Date() : undefined };
            }
            return task;
          });
          
          const completedTasks = updatedTasks.filter(t => t.completed).length;
          const progress = (completedTasks / updatedTasks.length) * 100;
          
          return {
            ...milestone,
            tasks: updatedTasks,
            progress,
            status: progress === 100 ? 'completed' : progress > 0 ? 'in_progress' : milestone.status
          };
        }
        return milestone;
      }));
    } catch (error) {
      logger.error('Error toggling task:', error);
    }
  };

  const filteredMilestones = milestones.filter(milestone => {
    if (selectedCategory === 'all') return true;
    return milestone.category === selectedCategory;
  });

  const upcomingMilestones = filteredMilestones
    .filter(m => m.status !== 'completed' && !isBefore(new Date(m.targetDate), new Date()))
    .sort((a, b) => a.targetDate.getTime() - b.targetDate.getTime())
    .slice(0, 3);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
              Milestone Tracker
            </h2>
            <p className="text-sm text-neutral-400">
              Set goals, track progress, celebrate achievements
            </p>
          </div>
          
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Milestone
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">
              {milestones.filter(m => m.status === 'completed').length}
            </div>
            <div className="text-xs text-neutral-400">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {milestones.filter(m => m.status === 'in_progress').length}
            </div>
            <div className="text-xs text-neutral-400">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {milestones.filter(m => m.status === 'pending').length}
            </div>
            <div className="text-xs text-neutral-400">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">
              {milestones.filter(m => m.status === 'overdue').length}
            </div>
            <div className="text-xs text-neutral-400">Overdue</div>
          </div>
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-2',
                selectedCategory === category.id
                  ? cn(category.bgColor, category.color, 'border border-current')
                  : 'bg-white/5 text-neutral-400 hover:bg-white/10'
              )}
            >
              <category.icon className="h-3 w-3" />
              {category.name}
              {category.count > 0 && (
                <span className="text-xs">({category.count})</span>
              )}
            </button>
          ))}
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm transition-all',
              selectedCategory === 'all'
                ? 'bg-white/10 text-[var(--hive-text-inverse)] border border-white/20'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10'
            )}
          >
            All ({milestones.length})
          </button>
        </div>

        <div className="flex gap-2">
          {(['list', 'timeline', 'calendar'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm capitalize transition-all',
                viewMode === mode
                  ? 'bg-white/10 text-[var(--hive-text-inverse)]'
                  : 'text-neutral-400 hover:text-[var(--hive-text-inverse)]'
              )}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Milestones */}
      {upcomingMilestones.length > 0 && (
        <div className="bg-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-secondary)]/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
            <span className="text-sm font-medium text-[var(--hive-brand-secondary)]">
              Upcoming Milestones
            </span>
          </div>
          <div className="space-y-2">
            {upcomingMilestones.map(milestone => (
              <div key={milestone.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-300">{milestone.title}</span>
                  <Badge className={cn('text-xs', getPriorityColor(milestone.priority))}>
                    {milestone.priority}
                  </Badge>
                </div>
                <span className="text-xs text-neutral-400">
                  {formatDistanceToNow(milestone.targetDate, { addSuffix: true })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Milestones List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filteredMilestones.length === 0 ? (
        <div className="text-center py-12">
          <Flag className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No milestones yet</p>
          <p className="text-sm text-neutral-500 mt-1">
            Create your first milestone to start tracking progress
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredMilestones.map((milestone: any) => {
              const category = categories.find(c => c.id === milestone.category);
              const Icon = category?.icon || Flag;
              
              return (
                <motion.div
                  key={milestone.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={() => setSelectedMilestone(milestone)}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/[0.07] transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={cn('p-2 rounded-lg', category?.bgColor)}>
                      <Icon className={cn('h-5 w-5', category?.color)} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-medium text-[var(--hive-text-inverse)] mb-1">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-neutral-400">
                            {milestone.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={cn('text-xs', getStatusColor(milestone.status))}>
                            {milestone.status.replace('_', ' ')}
                          </Badge>
                          {milestone.visibility === 'private' ? (
                            <Lock className="h-3 w-3 text-neutral-400" />
                          ) : (
                            <Unlock className="h-3 w-3 text-neutral-400" />
                          )}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(milestone.progress)}%</span>
                        </div>
                        <Progress value={milestone.progress} className="h-2" />
                      </div>
                      
                      {/* Tasks Preview */}
                      {milestone.tasks.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs text-neutral-400 mb-2">
                            Tasks ({milestone.tasks.filter(t => t.completed).length}/{milestone.tasks.length})
                          </div>
                          <div className="flex gap-1">
                            {milestone.tasks.slice(0, 5).map(task => (
                              <div
                                key={task.id}
                                className={cn(
                                  'h-2 w-2 rounded-full',
                                  task.completed ? 'bg-green-400' : 'bg-neutral-600'
                                )}
                              />
                            ))}
                            {milestone.tasks.length > 5 && (
                              <span className="text-xs text-neutral-500">
                                +{milestone.tasks.length - 5}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {format(milestone.targetDate, 'MMM dd, yyyy')}
                          </span>
                          <span className={cn('flex items-center gap-1', getPriorityColor(milestone.priority))}>
                            <Flag className="h-3 w-3" />
                            {milestone.priority}
                          </span>
                        </div>
                        
                        <ChevronRight className="h-4 w-4 text-neutral-400" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}