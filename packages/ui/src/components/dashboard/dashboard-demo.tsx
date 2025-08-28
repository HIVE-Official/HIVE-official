'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  Activity,
  Brain,
  BarChart3,
  Users,
  Zap,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';

import { BentoGrid, createGridItem, defaultLayouts } from './bento-grid';
import { HiveDashboard } from './hive-dashboard';
import { PersonalTools, mockPersonalToolsData } from './personal-tools';
import { CalendarWidget, mockCalendarData } from './calendar-widget';
import { ActivityTracker, mockActivityTrackerData } from './activity-tracker';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Button } from '../hive-button';
import { Badge } from '../../atomic/atoms/badge';
import { Progress } from '../hive-progress';

interface DashboardDemoProps {
  variant?: 'academic' | 'productivity' | 'social' | 'custom';
  editable?: boolean;
  showControls?: boolean;
  className?: string;
}

// Quick Stats Widget
function QuickStatsWidget() {
  const stats = [
    { label: 'GPA', value: '3.67', icon: <TrendingUp className="h-4 w-4" />, color: 'text-green-600' },
    { label: 'Study Hours', value: '24h', icon: <Clock className="h-4 w-4" />, color: 'text-blue-600' },
    { label: 'Active Spaces', value: '8', icon: <Users className="h-4 w-4" />, color: 'text-purple-600' },
    { label: 'Tools Used', value: '15', icon: <Zap className="h-4 w-4" />, color: 'text-orange-600' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className={`mb-2 ${stat.color}`}>
            {stat.icon}
          </div>
          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          <div className="text-xs text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

// Mini Calendar Widget
function MiniCalendarWidget() {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-900">
          {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div key={day} className="text-center text-gray-500 font-medium p-2">
            {day}
          </div>
        ))}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const isToday = date === today.getDate();
          const hasEvent = [5, 12, 18, 25].includes(date);
          
          return (
            <div
              key={date}
              className={`
                p-2 text-center cursor-pointer rounded transition-colors relative
                ${isToday 
                  ? 'bg-blue-600 text-[var(--hive-text-primary)]' 
                  : hasEvent 
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100' 
                    : 'hover:bg-gray-100'
                }
              `}
            >
              {date}
              {hasEvent && !isToday && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Goals Progress Widget
function GoalsProgressWidget() {
  const goals = [
    { name: 'Weekly Study', current: 18, target: 25, unit: 'hours' },
    { name: 'GPA Target', current: 3.67, target: 3.8, unit: 'GPA' },
    { name: 'Space Exploration', current: 8, target: 10, unit: 'spaces' }
  ];

  return (
    <div className="space-y-4 p-4">
      <h3 className="font-semibold text-gray-900 text-sm">Current Goals</h3>
      {goals.map((goal) => (
        <div key={goal.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">{goal.name}</span>
            <span className="text-gray-500">
              {goal.current}/{goal.target} {goal.unit}
            </span>
          </div>
          <Progress 
            value={(goal.current / goal.target) * 100} 
            className="h-2"
          />
        </div>
      ))}
    </div>
  );
}

// Recent Activity Widget
function RecentActivityWidget() {
  const activities = [
    { action: 'Joined Study Group', time: '2h ago', type: 'space' },
    { action: 'Used GPA Calculator', time: '4h ago', type: 'tool' },
    { action: 'Posted in CS Majors', time: '6h ago', type: 'social' },
    { action: 'Completed Math Quiz', time: '1d ago', type: 'academic' }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'space': return 'bg-purple-100 text-purple-700';
      case 'tool': return 'bg-blue-100 text-blue-700';
      case 'social': return 'bg-green-100 text-green-700';
      case 'academic': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-3 p-4">
      <h3 className="font-semibold text-gray-900 text-sm">Recent Activity</h3>
      {activities.map((activity, index) => (
        <motion.div
          key={index}
          className="flex items-center justify-between text-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-900">{activity.action}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={`text-xs ${getActivityColor(activity.type)}`}>
              {activity.type}
            </Badge>
            <span className="text-gray-500 text-xs">{activity.time}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function DashboardDemo({
  variant = 'academic',
  editable = true,
  showControls = true,
  className = ""
}: DashboardDemoProps) {
  const [currentVariant, setCurrentVariant] = useState(variant);
  const [layout, setLayout] = useState(() => {
    const baseLayout = defaultLayouts[currentVariant];
    
    // Create grid items based on variant
    const items = [];
    
    if (currentVariant === 'academic') {
      items.push(
        createGridItem('quick-stats', 'Quick Stats', <QuickStatsWidget />, {
          size: 'medium',
          category: 'overview',
          icon: <BarChart3 className="h-4 w-4" />,
          description: 'Key academic metrics at a glance',
          priority: 10
        }),
        createGridItem('calendar', 'Calendar', <MiniCalendarWidget />, {
          size: 'small',
          category: 'schedule',
          icon: <Calendar className="h-4 w-4" />,
          description: 'Monthly calendar view',
          priority: 8
        }),
        createGridItem('goals', 'Goals Progress', <GoalsProgressWidget />, {
          size: 'small',
          category: 'progress',
          icon: <Target className="h-4 w-4" />,
          description: 'Track your academic goals',
          priority: 7
        }),
        createGridItem('activity', 'Recent Activity', <RecentActivityWidget />, {
          size: 'medium',
          category: 'activity',
          icon: <Activity className="h-4 w-4" />,
          description: 'Your latest platform interactions',
          priority: 6
        }),
        createGridItem('personal-tools', 'Personal Tools', <PersonalTools data={mockPersonalToolsData} />, {
          size: 'xl',
          category: 'tools',
          icon: <Brain className="h-4 w-4" />,
          description: 'Your personalized productivity toolkit',
          priority: 9,
          minSize: 'large'
        })
      );
    } else if (currentVariant === 'productivity') {
      items.push(
        createGridItem('activity-tracker', 'Activity Tracker', <ActivityTracker data={mockActivityTrackerData} />, {
          size: 'xl',
          category: 'analytics',
          icon: <Activity className="h-4 w-4" />,
          description: 'Comprehensive productivity analytics',
          priority: 10,
          minSize: 'large'
        }),
        createGridItem('quick-stats', 'Quick Stats', <QuickStatsWidget />, {
          size: 'medium',
          category: 'overview',
          icon: <BarChart3 className="h-4 w-4" />,
          priority: 8
        }),
        createGridItem('goals', 'Goals Progress', <GoalsProgressWidget />, {
          size: 'small',
          category: 'progress',
          icon: <Target className="h-4 w-4" />,
          priority: 7
        })
      );
    } else if (currentVariant === 'social') {
      items.push(
        createGridItem('calendar-widget', 'Calendar & Events', <CalendarWidget data={mockCalendarData} />, {
          size: 'large',
          category: 'events',
          icon: <Calendar className="h-4 w-4" />,
          description: 'Upcoming events and deadlines',
          priority: 10
        }),
        createGridItem('activity', 'Recent Activity', <RecentActivityWidget />, {
          size: 'medium',
          category: 'activity',
          icon: <Activity className="h-4 w-4" />,
          priority: 8
        }),
        createGridItem('quick-stats', 'Community Stats', <QuickStatsWidget />, {
          size: 'small',
          category: 'social',
          icon: <Users className="h-4 w-4" />,
          priority: 7
        })
      );
    }
    
    return {
      ...baseLayout,
      items
    };
  });

  const handleVariantChange = (newVariant: 'academic' | 'productivity' | 'social' | 'custom') => {
    setCurrentVariant(newVariant);
    // Recreate layout for new variant
    const baseLayout = defaultLayouts[newVariant];
    // Add items logic here similar to useState initialization
  };

  return (
    <motion.div 
      className={`dashboard-demo space-y-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Demo Controls */}
      {showControls && (
        <motion.div 
          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-900">HIVE Dashboard Demo</h2>
            <p className="text-sm text-gray-600">
              Interactive dashboard components with customizable layouts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {(['academic', 'productivity', 'social'] as const).map((layoutVariant) => (
              <Button
                key={layoutVariant}
                variant={currentVariant === layoutVariant ? "primary" : "outline"}
                size="sm"
                onClick={() => handleVariantChange(layoutVariant)}
                className="capitalize"
              >
                {layoutVariant}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Dashboard Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <BentoGrid
          layout={layout}
          onLayoutChange={setLayout}
          onItemResize={(itemId, newSize) => {
            console.log(`Item ${itemId} resized to ${newSize}`);
          }}
          onItemRemove={(itemId) => {
            console.log(`Item ${itemId} removed`);
          }}
          onItemAdd={() => {
            console.log('Add new item requested');
          }}
          onItemConfigure={(itemId) => {
            console.log(`Configure item ${itemId}`);
          }}
          editable={editable}
        />
      </motion.div>

      {/* Usage Instructions */}
      {editable && showControls && (
        <motion.div 
          className="p-4 bg-gray-50 rounded-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-medium text-gray-900 mb-2">Interactive Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Drag & Drop:</strong> Hover over widgets and use the grip handle to reorder
            </div>
            <div>
              <strong>Resize:</strong> Use the expand icon to change widget sizes
            </div>
            <div>
              <strong>Configure:</strong> Access widget settings and removal options
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default DashboardDemo;