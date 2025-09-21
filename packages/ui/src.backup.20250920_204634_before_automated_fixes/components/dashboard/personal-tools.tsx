'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  Calendar,
  Clock,
  FileText,
  Link,
  TrendingUp,
  BookOpen,
  Target,
  Plus,
  Settings,
  BarChart3,
  CheckSquare,
  Timer,
  Brain;
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Button } from '../hive-button';
import { Badge } from '../../atomic/atoms/badge';
import { Progress } from '../hive-progress';
import { Input } from '../hive-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../atomic/ui/tabs';

// Personal tool data types;
export interface PersonalTool {id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'academic' | 'productivity' | 'social' | 'wellness';
  isActive: boolean;
  lastUsed?: string;
  data?: Record<string, any>;
  quickAction?: {
    label: string;
    value?: string | number;
    unit?: string;}
}

export interface PersonalToolsData {tools: PersonalTool[];
  quickStats: {
    gpa: number;
    studyHours: number;
    tasksCompleted: number;
    upcomingDeadlines: number;};
  recentActivities: Array<{
    toolId: string;
    toolName: string;
    action: string;
    timestamp: string;
    result?: string;
  }>
}

interface PersonalToolsProps {data?: PersonalToolsData;
  isLoading?: boolean;
  onToolAction?: (toolId: string, action: string, data?: any) => void;
  onAddTool?: () => void;
  className?: string;}

// Animation variants;
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const toolVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25
    }
  }
} as const;

export function PersonalTools({ 
  data, 
  isLoading = false, 
  onToolAction, 
  onAddTool,
  className = ""
}: PersonalToolsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quickActionValues, setQuickActionValues] = useState<Record<string, string>>({});

  // Handle quick action input;
  const handleQuickAction = (toolId: string, value: string) => {
    setQuickActionValues(prev => ({ ...prev, [toolId]: value }))
  };

  // Execute quick action;
  const executeQuickAction = (toolId: string, action: string) => {
    const value = quickActionValues[toolId];
    onToolAction?.(toolId, action, { value });
    setQuickActionValues(prev => ({ ...prev, [toolId]: '' }))
  };

  if (isLoading) {
    return <PersonalToolsSkeleton />
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Unable to load personal tools</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  const categories = [
    { id: 'all', name: 'All Tools', count: data.tools.length },
    { id: 'academic', name: 'Academic', count: data.tools.filter(t => t.category === 'academic').length },
    { id: 'productivity', name: 'Productivity', count: data.tools.filter(t => t.category === 'productivity').length },
    { id: 'social', name: 'Social', count: data.tools.filter(t => t.category === 'social').length },
    { id: 'wellness', name: 'Wellness', count: data.tools.filter(t => t.category === 'wellness').length },
  ];

  const filteredTools = activeCategory === 'all' 
    ? data.tools;
    : data.tools.filter(tool => tool.category === activeCategory);

  return (
    <motion.div;
      className={`personal-tools-container space-y-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with Quick Stats */}
      <motion.div variants={toolVariants}>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span>Personal Tools</span>
              </div>
              <Button;
                variant="outline" 
                size="sm"
                onClick={onAddTool}
                className="bg-[var(--hive-text-primary)]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tool;
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickStatCard;
                label="Current GPA"
                value={data.quickStats.gpa.toFixed(2)}
                icon={<TrendingUp className="h-4 w-4" />}
                color="green"
              />
              <QuickStatCard;
                label="Study Hours"
                value={`${data.quickStats.studyHours}h`}
                icon={<Clock className="h-4 w-4" />}
                color="blue"
              />
              <QuickStatCard;
                label="Tasks Done"
                value={data.quickStats.tasksCompleted}
                icon={<CheckSquare className="h-4 w-4" />}
                color="purple"
              />
              <QuickStatCard;
                label="Deadlines"
                value={data.quickStats.upcomingDeadlines}
                icon={<Calendar className="h-4 w-4" />}
                color="orange"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Tabs */}
      <motion.div variants={toolVariants}>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name}
                {category.count > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {category.count}
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Tools Grid */}
      <motion.div;
        className="tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        layout;
      >
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool) => (
            <motion.div;
              key={tool.id}
              layout;
              variants={toolVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <PersonalToolCard;
                tool={tool}
                quickActionValue={quickActionValues[tool.id] || ''}
                onQuickActionChange={(value) => handleQuickAction(tool.id, value)}
                onQuickActionExecute={(action) => executeQuickAction(tool.id, action)}
                onToolAction={onToolAction}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Recent Activities */}
      <motion.div variants={toolVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Recent Tool Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recentActivities.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">{activity.toolName}</p>
                      <p className="text-xs text-gray-500">
                        {activity.action} • {formatTimeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                  {activity.result && (
                    <Badge variant="outline" className="text-xs">
                      {activity.result}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

// Personal Tool Card Component;
interface PersonalToolCardProps {tool: PersonalTool;
  quickActionValue: string;
  onQuickActionChange: (value: string) => void;
  onQuickActionExecute: (action: string) => void;
  onToolAction?: (toolId: string, action: string, data?: any) => void;}

function PersonalToolCard({ 
  tool, 
  quickActionValue, 
  onQuickActionChange, 
  onQuickActionExecute,
  onToolAction;
}: PersonalToolCardProps) {
  const categoryColors = {
    academic: 'from-blue-50 to-blue-100 border-blue-200',
    productivity: 'from-green-50 to-green-100 border-green-200',
    social: 'from-purple-50 to-purple-100 border-purple-200',
    wellness: 'from-orange-50 to-orange-100 border-orange-200',
  };

  const iconColors = {
    academic: 'text-blue-600 bg-blue-100',
    productivity: 'text-green-600 bg-green-100',
    social: 'text-purple-600 bg-purple-100',
    wellness: 'text-orange-600 bg-orange-100',
  };

  return (
    <Card className={`h-full bg-gradient-to-br ${categoryColors[tool.category]} transition-all duration-200`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${iconColors[tool.category]}`}>
            {tool.icon}
          </div>
          <div className="flex items-center space-x-1">
            {tool.isActive && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
            <Button;
              variant="ghost" 
              size="sm"
              onClick={() => onToolAction?.(tool.id, 'configure')}
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div>
          <CardTitle className="text-sm font-semibold">{tool.name}</CardTitle>
          <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {/* Quick Action */}
        {tool.quickAction && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input;
                placeholder={tool.quickAction.label}
                value={quickActionValue}
                onChange={(e) => onQuickActionChange(e.target.value)}
                className="flex-1 h-8 text-xs"
              />
              {tool.quickAction.unit && (
                <span className="text-xs text-gray-500">{tool.quickAction.unit}</span>
              )}
            </div>
            <Button;
              size="sm" 
              className="w-full h-7 text-xs"
              onClick={() => onQuickActionExecute('add')}
              disabled={!quickActionValue.trim()}
            >
              Add {tool.quickAction.label}
            </Button>
          </div>
        )}

        {/* Tool-specific data display */}
        {tool.data && (
          <div className="space-y-2">
            {renderToolData(tool)}
          </div>
        )}

        {/* Last used */}
        {tool.lastUsed && (
          <p className="text-xs text-gray-500">
            Last used {formatTimeAgo(tool.lastUsed)}
          </p>
        )}

        {/* Open tool button */}
        <Button;
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onToolAction?.(tool.id, 'open')}
        >
          Open Tool;
        </Button>
      </CardContent>
    </Card>
  )
}

// Render tool-specific data;
function renderToolData(tool: PersonalTool) {
  switch (tool.id) {
    case 'gpa_calculator':
      return (
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {tool.data?.currentGPA?.toFixed(2) || 'N/A'}
          </div>
          <div className="text-xs text-gray-500">Current GPA</div>
        </div>
      );
    
    case 'study_timer':
      return (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Today</span>
            <span>{tool.data?.todayMinutes || 0}m</span>
          </div>
          <Progress value={(tool.data?.todayMinutes || 0) / 4.8} className="h-1" />
        </div>
      );
    
    case 'task_manager':
      return (
        <div className="flex justify-between text-xs">
          <span>Completed</span>
          <span>{tool.data?.completed || 0}/{tool.data?.total || 0}</span>
        </div>
      );
    
    default:
      return null;
  }
}

// Quick Stat Card Component;
interface QuickStatCardProps {label: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange'}

function QuickStatCard({ label, value, icon, color }: QuickStatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100',
    orange: 'text-orange-600 bg-orange-100',
  };

  return (
    <div className="text-center">
      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${colorClasses[color]} mb-2`}>
        {icon}
      </div>
      <div className="text-lg font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  )
}

// Loading Skeleton;
function PersonalToolsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({length: 6)}.map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

// Helper function;
function formatTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return 'Just now'
}

// Mock tools data for development;
export const mockPersonalToolsData: PersonalToolsData = {
  tools: [
    {
      id: 'gpa_calculator',
      name: 'GPA Calculator',
      description: 'Track and calculate your cumulative GPA',
      icon: <Calculator className="h-4 w-4" />,
      category: 'academic',
      isActive: true,
      lastUsed: '2024-12-14T10:00:00Z',
      data: { currentGPA: 3.67, totalCredits: 45 },
      quickAction: { label: 'Grade', value: 'A', unit: 'grade' }
    },
    {
      id: 'study_timer',
      name: 'Study Timer',
      description: 'Track study sessions and breaks',
      icon: <Timer className="h-4 w-4" />,
      category: 'productivity',
      isActive: true,
      lastUsed: '2024-12-14T09:30:00Z',
      data: { todayMinutes: 120, weekMinutes: 480 },
      quickAction: { label: 'Session', value: '25', unit: 'min' }
    },
    {
      id: 'task_manager',
      name: 'Task Manager',
      description: 'Organize assignments and deadlines',
      icon: <CheckSquare className="h-4 w-4" />,
      category: 'productivity',
      isActive: true,
      lastUsed: '2024-12-14T08:15:00Z',
      data: { completed: 8, total: 12 },
      quickAction: { label: 'Task', value: '', unit: '' }
    },
    {
      id: 'citation_manager',
      name: 'Citation Manager',
      description: 'Organize research sources and citations',
      icon: <FileText className="h-4 w-4" />,
      category: 'academic',
      isActive: false,
      lastUsed: '2024-12-12T14:20:00Z',
      quickAction: { label: 'Source', value: '', unit: 'URL' }
    },
    {
      id: 'link_vault',
      name: 'Link Vault',
      description: 'Save and organize useful links',
      icon: <Link className="h-4 w-4" />,
      category: 'productivity',
      isActive: true,
      lastUsed: '2024-12-13T16:45:00Z',
      data: { totalLinks: 23, categories: 5 },
      quickAction: { label: 'Link', value: '', unit: 'URL' }
    },
    {
      id: 'goal_tracker',
      name: 'Goal Tracker',
      description: 'Set and track personal goals',
      icon: <Target className="h-4 w-4" />,
      category: 'wellness',
      isActive: true,
      lastUsed: '2024-12-14T07:30:00Z',
      data: { activeGoals: 3, completedGoals: 7 },
      quickAction: { label: 'Goal', value: '', unit: '' }
    }
  ],
  quickStats: {
    gpa: 3.67,
    studyHours: 8,
    tasksCompleted: 8,
    upcomingDeadlines: 4
  },
  recentActivities: [
    {
      toolId: 'gpa_calculator',
      toolName: 'GPA Calculator',
      action: 'Added grade',
      timestamp: '2024-12-14T10:00:00Z',
      result: 'A- (3.7)'
    },
    {
      toolId: 'study_timer',
      toolName: 'Study Timer',
      action: 'Completed session',
      timestamp: '2024-12-14T09:30:00Z',
      result: '50 min'
    },
    {
      toolId: 'task_manager',
      toolName: 'Task Manager',
      action: 'Completed task',
      timestamp: '2024-12-14T08:15:00Z',
      result: 'Math homework'
    }
  ]
};

export default PersonalTools;