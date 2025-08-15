"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '../../../../components/error-boundary';
import { 
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Activity,
  Lock,
  Sparkles,
  Star,
  MessageSquare
} from 'lucide-react';

const analyticsFeatures = [
  {
    id: 'engagement',
    name: 'Platform Engagement',
    description: 'Track how you use HIVE and optimize your campus experience',
    icon: Activity,
    color: 'purple',
    comingSoon: ['Usage patterns', 'Feature adoption', 'Engagement quality', 'Peak usage times']
  },
  {
    id: 'academic',
    name: 'Academic Insights',
    description: 'Monitor study efficiency and academic performance metrics',
    icon: BookOpen,
    color: 'blue',
    comingSoon: ['Study efficiency', 'GPA tracking', 'Assignment completion', 'Study tool usage']
  },
  {
    id: 'social',
    name: 'Community Analytics',
    description: 'Measure your campus network growth and social engagement',
    icon: Users,
    color: 'green',
    comingSoon: ['Network growth', 'Space participation', 'Event attendance', 'Leadership metrics']
  },
  {
    id: 'optimization',
    name: 'Smart Insights',
    description: 'AI-powered recommendations to improve your campus life',
    icon: Sparkles,
    color: 'yellow',
    comingSoon: ['Personalized tips', 'Efficiency optimization', 'Goal recommendations', 'Success patterns']
  }
];

export default function ProfileAnalyticsPage() {
  const router = useRouter();
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
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
                    <BarChart3 size={20} className="text-hive-brand-secondary" />
                  </div>
                  <div>
                    <h1 className="text-heading-lg font-semibold text-hive-text-primary">Analytics</h1>
                    <p className="text-body-md text-hive-text-secondary">Insights to optimize your campus experience</p>
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
              <span className="text-sm font-medium text-hive-brand-secondary">Launching with v1</span>
            </div>
            
            <h2 className="text-display-sm font-bold text-hive-text-primary mb-4">
              Your Campus Life, Analyzed
            </h2>
            <p className="text-body-lg text-hive-text-secondary max-w-2xl mx-auto mb-8">
              Get personalized insights into your study patterns, social engagement, and campus integration. 
              Discover optimization opportunities and track your growth over time.
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
                    Added to Analytics Waitlist!
                  </>
                ) : (
                  <>
                    <BarChart3 size={18} />
                    Get Early Access to Analytics
                  </>
                )}
              </button>
              <button 
                onClick={() => router.push('/profile')}
                className="px-6 py-3 border border-hive-border-default text-hive-text-secondary rounded-lg font-medium hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
              >
                Back to Profile
              </button>
            </div>
          </div>

          {/* Analytics Features Preview */}
          <div className="mb-12">
            <h3 className="text-heading-md font-semibold text-hive-text-primary mb-6 text-center">
              What You&apos;ll Track in v1
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={feature.id}
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
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${getColorClasses(feature.color)} mb-3`}>
                        <IconComponent size={24} />
                      </div>
                      <h4 className="font-semibold text-hive-text-primary mb-2">{feature.name}</h4>
                      <p className="text-body-sm text-hive-text-secondary mb-4">{feature.description}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-hive-text-tertiary uppercase tracking-wide">Key Metrics:</p>
                      {feature.comingSoon.slice(0, 3).map((metric, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-hive-text-secondary">
                          <div className="w-1 h-1 bg-hive-text-tertiary rounded-full" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mock Analytics Preview */}
          <div className="bg-hive-background-elevated rounded-xl border border-hive-border-subtle p-8 mb-8">
            <h3 className="text-heading-md font-semibold text-hive-text-primary mb-6 text-center">
              Preview: Your Analytics Dashboard
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-500/5 rounded-lg border border-purple-500/20">
                <div className="text-2xl font-bold text-purple-400 mb-1">87%</div>
                <div className="text-sm text-hive-text-secondary">Engagement Score</div>
              </div>
              <div className="text-center p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                <div className="text-2xl font-bold text-blue-400 mb-1">12</div>
                <div className="text-sm text-hive-text-secondary">Study Tools Used</div>
              </div>
              <div className="text-center p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400 mb-1">6</div>
                <div className="text-sm text-hive-text-secondary">Active Spaces</div>
              </div>
              <div className="text-center p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-400 mb-1">89%</div>
                <div className="text-sm text-hive-text-secondary">Campus Integration</div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-hive-background-tertiary rounded-lg text-hive-text-secondary">
                <Lock size={16} />
                <span className="text-sm">Full dashboard unlocks with v1</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-br from-hive-brand-secondary/5 to-hive-brand-primary/5 rounded-xl border border-hive-brand-secondary/20 p-8">
            <h3 className="text-heading-md font-semibold text-hive-text-primary mb-6 text-center">
              Why Analytics Matter for Campus Success
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-xl mb-4">
                  <TrendingUp size={28} className="text-blue-400" />
                </div>
                <h4 className="font-semibold text-hive-text-primary mb-2">Optimize Your Time</h4>
                <p className="text-body-sm text-hive-text-secondary">
                  Identify peak productivity hours and optimize your study schedule
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-xl mb-4">
                  <Users size={28} className="text-green-400" />
                </div>
                <h4 className="font-semibold text-hive-text-primary mb-2">Grow Your Network</h4>
                <p className="text-body-sm text-hive-text-secondary">
                  Track social engagement and discover networking opportunities
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-xl mb-4">
                  <BarChart3 size={28} className="text-purple-400" />
                </div>
                <h4 className="font-semibold text-hive-text-primary mb-2">Measure Progress</h4>
                <p className="text-body-sm text-hive-text-secondary">
                  Set goals and track your academic and social development
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-hive-brand-secondary/5 to-hive-brand-primary/5 rounded-xl border border-hive-brand-secondary/20 p-8">
              <h3 className="text-heading-md font-semibold text-hive-text-primary mb-4">
                Ready to Optimize Your Campus Experience?
              </h3>
              <p className="text-body-md text-hive-text-secondary mb-6 max-w-2xl mx-auto">
                Join the waitlist to get early access to HIVE Analytics when v1 launches. 
                Be among the first to unlock insights that help you succeed in college.
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
                      You&apos;re on the analytics list!
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      Join Analytics Waitlist
                    </>
                  )}
                </button>
                
                <div className="flex items-center gap-4 text-sm text-hive-text-tertiary">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>2,891 waiting</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    <span>Updates via email</span>
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