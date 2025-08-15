"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '../../../../components/error-boundary';
import { 
  ArrowLeft,
  Wrench,
  Lock,
  Zap,
  Users,
  Calendar,
  BookOpen,
  Home,
  MessageSquare,
  Star,
  Sparkles
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const builderToolCategories = [
  {
    id: 'academic',
    name: 'Academic Tools',
    description: 'Study schedulers, assignment trackers, grade calculators',
    icon: BookOpen,
    color: 'blue',
    comingSoon: ['Smart Study Planner', 'Grade Tracker Pro', 'Assignment Coordinator', 'Study Group Matcher']
  },
  {
    id: 'social',
    name: 'Social Coordination',
    description: 'Event planners, group coordinators, activity organizers',
    icon: Users,
    color: 'purple',
    comingSoon: ['Event Planner', 'Group Chat Organizer', 'Activity Scheduler', 'Social Calendar']
  },
  {
    id: 'dorm',
    name: 'Dorm Life',
    description: 'Floor coordination, laundry tracking, meal planning',
    icon: Home,
    color: 'green',
    comingSoon: ['Laundry Tracker', 'Floor Coordinator', 'Meal Planner', 'Roommate Manager']
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Time management, habit tracking, goal setting',
    icon: Zap,
    color: 'yellow',
    comingSoon: ['Habit Tracker', 'Goal Setter', 'Time Blocker', 'Focus Timer']
  }
];

export default function ProfileToolsPage() {
  const router = useRouter();
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'green': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'yellow': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-hive-brand-secondary/20';
    }
  };

  const handleJoinWaitlist = () => {
    setJoinedWaitlist(true);
    // TODO: Implement actual waitlist API call
    setTimeout(() => setJoinedWaitlist(false), 3000);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-hive-background-primary">
        {/* Header */}
        <div className="border-b border-hive-border-default bg-hive-background-secondary">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-lg hover:bg-hive-interactive-hover transition-colors"
                >
                  <ArrowLeft size={20} className="text-hive-text-secondary" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-hive-brand-secondary/10 rounded-lg">
                    <Wrench size={20} className="text-hive-brand-secondary" />
                  </div>
                  <div>
                    <h1 className="text-heading-lg font-semibold text-hive-text-primary">Builder Tools</h1>
                    <p className="text-body-md text-hive-text-secondary">Create and share tools that solve campus problems</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-hive-brand-secondary/10 rounded-lg border border-hive-brand-secondary/20">
                  <Lock size={14} className="text-hive-brand-secondary" />
                  <span className="text-sm font-medium text-hive-brand-secondary">v1 Release</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto p-6">
          <div className="text-center py-12 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-hive-brand-secondary/10 rounded-full border border-hive-brand-secondary/20 mb-6">
              <Sparkles size={16} className="text-hive-brand-secondary" />
              <span className="text-sm font-medium text-hive-brand-secondary">Coming in v1</span>
            </div>
            
            <h2 className="text-display-sm font-bold text-hive-text-primary mb-4">
              Build Tools That Matter
            </h2>
            <p className="text-body-lg text-hive-text-secondary max-w-2xl mx-auto mb-8">
              The HIVE builder ecosystem lets you create and share tools that solve real campus problems. 
              From study coordinators to dorm life helpers, build what your community needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleJoinWaitlist}
                disabled={joinedWaitlist}
                className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-semibold hover:bg-hive-brand-hover disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                {joinedWaitlist ? (
                  <>
                    <Star size={18} className="text-hive-gold" />
                    Added to Waitlist!
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Join Builder Waitlist
                  </>
                )}
              </button>
              <button 
                onClick={() => router.push('/spaces')}
                className="px-6 py-3 border border-hive-border-default text-hive-text-secondary rounded-lg font-medium hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
              >
                Explore Spaces Instead
              </button>
            </div>
          </div>

          {/* Tool Categories Preview */}
          <div className="mb-12">
            <h3 className="text-heading-md font-semibold text-hive-text-primary mb-6 text-center">
              What You&apos;ll Be Able to Build
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {builderToolCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <div 
                    key={category.id}
                    className="bg-hive-background-elevated rounded-xl border border-hive-border-subtle p-6 relative overflow-hidden group"
                  >
                    {/* Lock Overlay */}
                    <div className="absolute inset-0 bg-hive-background-primary/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="text-center">
                        <Lock size={24} className="text-hive-brand-secondary mx-auto mb-2" />
                        <p className="text-sm font-medium text-hive-brand-secondary">Coming in v1</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${getColorClasses(category.color)} mb-3`}>
                        <IconComponent size={24} />
                      </div>
                      <h4 className="font-semibold text-hive-text-primary mb-2">{category.name}</h4>
                      <p className="text-body-sm text-hive-text-secondary mb-4">{category.description}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-hive-text-tertiary uppercase tracking-wide">Example Tools:</p>
                      {category.comingSoon.slice(0, 3).map((tool, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-hive-text-secondary">
                          <div className="w-1 h-1 bg-hive-text-tertiary rounded-full" />
                          <span>{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Builder Benefits */}
          <div className="bg-hive-background-elevated rounded-xl border border-hive-border-subtle p-8">
            <h3 className="text-heading-md font-semibold text-hive-text-primary mb-6 text-center">
              Why Build on HIVE?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-xl mb-4">
                  <Users size={28} className="text-blue-400" />
                </div>
                <h4 className="font-semibold text-hive-text-primary mb-2">Built-in Community</h4>
                <p className="text-body-sm text-hive-text-secondary">
                  Your tools automatically reach your campus community through HIVE spaces
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-xl mb-4">
                  <Zap size={28} className="text-green-400" />
                </div>
                <h4 className="font-semibold text-hive-text-primary mb-2">No-Code Builder</h4>
                <p className="text-body-sm text-hive-text-secondary">
                  Create powerful tools without programming using our visual builder
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-xl mb-4">
                  <Calendar size={28} className="text-purple-400" />
                </div>
                <h4 className="font-semibold text-hive-text-primary mb-2">Campus Integration</h4>
                <p className="text-body-sm text-hive-text-secondary">
                  Tools integrate with calendars, spaces, and campus systems seamlessly
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-hive-brand-secondary/5 to-hive-brand-primary/5 rounded-xl border border-hive-brand-secondary/20 p-8">
              <h3 className="text-heading-md font-semibold text-hive-text-primary mb-4">
                Ready to Build the Future of Campus Life?
              </h3>
              <p className="text-body-md text-hive-text-secondary mb-6 max-w-2xl mx-auto">
                Join the waitlist to be among the first to access the HIVE builder tools when v1 launches. 
                Help shape how students coordinate, collaborate, and succeed together.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={handleJoinWaitlist}
                  disabled={joinedWaitlist}
                  className="px-8 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-semibold hover:bg-hive-brand-hover disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {joinedWaitlist ? (
                    <>
                      <Star size={18} className="text-hive-gold" />
                      You&apos;re on the list!
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Get Early Access
                    </>
                  )}
                </button>
                
                <div className="flex items-center gap-4 text-sm text-hive-text-tertiary">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>1,247 on waitlist</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    <span>Updates via Discord</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}