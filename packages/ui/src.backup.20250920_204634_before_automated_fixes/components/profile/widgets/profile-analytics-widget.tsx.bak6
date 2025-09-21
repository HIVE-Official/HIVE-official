'use client';

import React, { useState } from 'react';
import { motion } from '../../framer-motion-proxy';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen,
  Activity,
  Star,
  Calendar,
  Zap,
  Lock
} from 'lucide-react';

export const ProfileAnalyticsWidget: React.FC = () => {
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  const analyticsPreview = [
    { label: 'Engagement Score', value: '87%', color: 'purple', icon: Activity },
    { label: 'Study Hours', value: '24h', color: 'blue', icon: BookOpen },
    { label: 'Active Spaces', value: '6', color: 'green', icon: Users },
    { label: 'Campus Integration', value: '89%', color: 'yellow', icon: TrendingUp }
  ];

  const upcomingFeatures = [
    'Real-time engagement tracking',
    'Study efficiency analysis',
    'Social network growth metrics',
    'Personalized optimization tips',
    'Goal tracking and milestones',
    'Weekly progress reports'
  ];

  const handleJoinWaitlist = () => {
    setJoinedWaitlist(true);
    setTimeout(() => setJoinedWaitlist(false), 3000);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'green': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'yellow': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-hive-brand-secondary/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-hive-brand-secondary/10 rounded-xl mb-4 relative">
          <BarChart3 size={28} className="text-hive-brand-secondary" />
          <div className="absolute -top-1 -right-1 p-1 bg-hive-brand-secondary rounded-full">
            <Lock size={12} className="text-hive-background-primary" />
          </div>
        </div>
        <h2 className="text-heading-lg font-semibold text-hive-text-primary mb-2">Analytics</h2>
        <p className="text-body-md text-hive-text-secondary">
          Your campus life insights and optimization opportunities
        </p>
        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-hive-brand-secondary/10 rounded-full border border-hive-brand-secondary/20">
          <Zap size={14} className="text-hive-brand-secondary" />
          <span className="text-sm font-medium text-hive-brand-secondary">Coming in v1</span>
        </div>
      </div>

      {/* Preview Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {analyticsPreview.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.label}
              className={`p-4 rounded-xl border text-center relative overflow-hidden ${getColorClasses(metric.color)}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {/* Lock overlay */}
              <div className="absolute inset-0 bg-hive-background-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Lock size={20} className="text-hive-brand-secondary" />
              </div>
              
              <IconComponent size={20} className="mx-auto mb-2" />
              <div className="text-lg font-bold text-hive-text-primary mb-1">{metric.value}</div>
              <div className="text-xs text-hive-text-secondary">{metric.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Feature Preview */}
      <div className="bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6">
        <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
          <Star size={18} className="text-hive-brand-secondary" />
          What You'll Track in v1
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 text-sm text-hive-text-secondary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="w-1 h-1 bg-hive-brand-secondary rounded-full" />
              <span>{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sample Chart Placeholder */}
      <div className="bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6 relative">
        <div className="absolute inset-0 bg-hive-background-primary/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Lock size={32} className="text-hive-brand-secondary mx-auto mb-3" />
            <p className="text-hive-text-primary font-medium mb-1">Interactive Dashboard</p>
            <p className="text-sm text-hive-text-secondary">Unlocks with v1 launch</p>
          </div>
        </div>
        
        <h3 className="font-semibold text-hive-text-primary mb-4">Weekly Activity Pattern</h3>
        <div className="h-32 flex items-end justify-between gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-hive-brand-secondary/20 rounded-t"
                style={{ height: `${Math.random() * 80 + 20}%` }}
              />
              <span className="text-xs text-hive-text-tertiary mt-2">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button
          onClick={handleJoinWaitlist}
          disabled={joinedWaitlist}
          className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-semibold hover:bg-hive-brand-hover disabled:opacity-50 transition-colors flex items-center gap-2 mx-auto"
        >
          {joinedWaitlist ? (
            <>
              <Star size={18} className="text-hive-gold" />
              Added to Waitlist!
            </>
          ) : (
            <>
              <BarChart3 size={18} />
              Join Analytics Waitlist
            </>
          )}
        </button>
        
        <p className="text-sm text-hive-text-tertiary mt-3">
          Be first to unlock insights when v1 launches
        </p>
      </div>
    </div>
  );
};

export default ProfileAnalyticsWidget;