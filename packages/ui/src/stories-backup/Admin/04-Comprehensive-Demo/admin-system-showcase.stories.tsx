import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Admin/04-Comprehensive Demo/AdminSystemShowcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete Admin & Analytics System showcase demonstrating power admin and student leader capabilities'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// User roles type
type UserRole = 'power_admin' | 'student_leader' | 'moderator';

// Demo data for different dashboards
const PLATFORM_STATS = {
  totalUsers: 12847,
  totalSpaces: 847,
  activeSpaces: 623,
  moderationQueue: 4,
  weeklyGrowth: 23.5,
  engagementRate: 67.8
};

const SPACE_STATS = {
  spaceName: 'CS 220 Study Group',
  totalMembers: 47,
  activeMembers: 32,
  postsThisWeek: 23,
  upcomingEvents: 3,
  engagementRate: 68.1,
  communityHealth: 87.5
};

const RECENT_ACTIVITY = [
  { id: '1', type: 'member_joined', description: 'Emma Wilson joined your space', time: '2 minutes ago', icon: '👤' },
  { id: '2', type: 'post_created', description: 'New study session post by Alex Chen', time: '15 minutes ago', icon: '📝' },
  { id: '3', type: 'event_created', description: 'Algorithm workshop scheduled for Friday', time: '1 hour ago', icon: '📅' },
  { id: '4', type: 'moderation', description: 'Content report resolved - no action needed', time: '2 hours ago', icon: '🛡️' }
];

const FEATURE_FLAGS = [
  { id: '1', name: 'Enhanced Profile Widgets', enabled: true, rollout: 75 },
  { id: '2', name: 'Real-time Space Chat', enabled: false, rollout: 0 },
  { id: '3', name: 'Mobile Push Notifications', enabled: true, rollout: 100 },
  { id: '4', name: 'AI Space Recommendations', enabled: false, rollout: 10 }
];

// Role Selector Component
const RoleSelector: React.FC<{
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}> = ({ selectedRole, onRoleChange }) => {
  const roles = [
    { id: 'power_admin', label: 'Power Admin', icon: '⚡', description: 'Platform-wide administration' },
    { id: 'student_leader', label: 'Student Leader', icon: '👑', description: 'Space leadership tools' },
    { id: 'moderator', label: 'Moderator', icon: '🛡️', description: 'Content moderation' }
  ] as const;

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Admin Role</h3>
      
      <div className="space-y-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
              selectedRole === role.id
                ? 'bg-hive-brand-primary/10 border-hive-brand-primary text-hive-text-primary'
                : 'bg-white border-hive-border-default text-hive-text-secondary hover:border-hive-brand-primary hover:bg-hive-background-primary'
            }`}
          >
            <div className="text-2xl">{role.icon}</div>
            <div className="text-left">
              <div className="font-semibold">{role.label}</div>
              <div className="text-sm opacity-80">{role.description}</div>
            </div>
            {selectedRole === role.id && (
              <div className="ml-auto text-hive-brand-primary">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard: React.FC<{
  title: string;
  value: number | string;
  change?: number;
  icon: string;
  color: string;
  onClick?: () => void;
}> = ({ title, value, change, icon, color, onClick }) => {
  return (
    <div 
      className={`bg-white rounded-2xl border border-hive-border-default p-6 transition-shadow ${
        onClick ? 'cursor-pointer hover:shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            change >= 0 ? 'text-hive-status-success' : 'text-hive-status-error'
          }`}>
            <svg className={`w-4 h-4 ${change < 0 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold text-hive-text-primary mb-2">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      
      <div className="text-sm text-hive-text-secondary">{title}</div>
    </div>
  );
};

// Quick Actions Component
const QuickActions: React.FC<{
  role: UserRole;
  onAction: (action: string) => void;
}> = ({ role, onAction }) => {
  const getActionsForRole = (role: UserRole) => {
    switch (role) {
      case 'power_admin':
        return [
          { id: 'view_analytics', label: 'Platform Analytics', icon: '📊', color: 'bg-blue-500' },
          { id: 'manage_features', label: 'Feature Flags', icon: '🚩', color: 'bg-purple-500' },
          { id: 'user_management', label: 'User Management', icon: '👥', color: 'bg-green-500' },
          { id: 'system_health', label: 'System Health', icon: '❤️', color: 'bg-red-500' }
        ];
      case 'student_leader':
        return [
          { id: 'space_analytics', label: 'Space Analytics', icon: '📈', color: 'bg-blue-500' },
          { id: 'member_management', label: 'Manage Members', icon: '👤', color: 'bg-green-500' },
          { id: 'create_event', label: 'Create Event', icon: '📅', color: 'bg-purple-500' },
          { id: 'space_settings', label: 'Space Settings', icon: '⚙️', color: 'bg-orange-500' }
        ];
      case 'moderator':
        return [
          { id: 'moderation_queue', label: 'Review Queue', icon: '🛡️', color: 'bg-red-500' },
          { id: 'reports', label: 'User Reports', icon: '📋', color: 'bg-orange-500' },
          { id: 'content_review', label: 'Content Review', icon: '👁️', color: 'bg-blue-500' },
          { id: 'warnings', label: 'Issue Warnings', icon: '⚠️', color: 'bg-yellow-500' }
        ];
    }
  };

  const actions = getActionsForRole(role);

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction(action.id)}
            className={`flex items-center gap-3 p-4 rounded-xl ${action.color} text-white hover:opacity-80 transition-opacity`}
          >
            <span className="text-xl">{action.icon}</span>
            <span className="font-medium text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Recent Activity Feed Component
const RecentActivityFeed: React.FC<{
  activities: typeof RECENT_ACTIVITY;
  role: UserRole;
}> = ({ activities, role }) => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'member_joined': return 'bg-green-100 text-green-800';
      case 'post_created': return 'bg-blue-100 text-blue-800';
      case 'event_created': return 'bg-purple-100 text-purple-800';
      case 'moderation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = role === 'student_leader' 
    ? activities.filter(a => a.type !== 'moderation')
    : activities;

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className={`w-8 h-8 ${getActivityColor(activity.type)} rounded-full flex items-center justify-center text-sm flex-shrink-0`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-hive-text-primary">{activity.description}</div>
              <div className="text-xs text-hive-text-secondary">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm text-hive-brand-primary hover:underline">
        View All Activity
      </button>
    </div>
  );
};

// Feature Flag Summary Component
const FeatureFlagSummary: React.FC<{
  flags: typeof FEATURE_FLAGS;
  onManageFlags: () => void;
}> = ({ flags, onManageFlags }) => {
  const enabledFlags = flags.filter(f => f.enabled).length;
  const partialRollout = flags.filter(f => f.enabled && f.rollout < 100).length;

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-hive-text-primary">Feature Flags</h3>
        <button
          onClick={onManageFlags}
          className="text-sm text-hive-brand-primary hover:underline"
        >
          Manage All
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-hive-status-success">{enabledFlags}</div>
          <div className="text-xs text-hive-text-secondary">Enabled</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-hive-status-warning">{partialRollout}</div>
          <div className="text-xs text-hive-text-secondary">Partial Rollout</div>
        </div>
      </div>
      
      <div className="space-y-3">
        {flags.slice(0, 3).map((flag) => (
          <div key={flag.id} className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-hive-text-primary truncate">{flag.name}</div>
              <div className="text-xs text-hive-text-secondary">
                {flag.enabled ? `${flag.rollout}% rollout` : 'Disabled'}
              </div>
            </div>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ml-2 ${
              flag.enabled 
                ? flag.rollout === 100 ? 'bg-hive-status-success' : 'bg-hive-status-warning'
                : 'bg-hive-status-error'
            }`} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Admin System Showcase Component
const AdminSystemShowcase: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('power_admin');

  const handleAction = (action: string) => {
    console.log('Action triggered:', action, 'for role:', selectedRole);
    alert(`Action: ${action}\nRole: ${selectedRole}\n\nThis would navigate to the appropriate admin interface.`);
  };

  const handleManageFlags = () => {
    console.log('Managing feature flags');
    alert('This would open the full feature flag management interface.');
  };

  const renderMetrics = () => {
    switch (selectedRole) {
      case 'power_admin':
        return (
          <>
            <MetricCard
              title="Total Users"
              value={PLATFORM_STATS.totalUsers}
              change={PLATFORM_STATS.weeklyGrowth}
              icon="👥"
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
              onClick={() => handleAction('view_users')}
            />
            <MetricCard
              title="Active Spaces"
              value={PLATFORM_STATS.activeSpaces}
              change={12.3}
              icon="🏠"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              onClick={() => handleAction('view_spaces')}
            />
            <MetricCard
              title="Engagement Rate"
              value={`${PLATFORM_STATS.engagementRate}%`}
              change={5.2}
              icon="📊"
              color="bg-gradient-to-br from-purple-500 to-pink-600"
              onClick={() => handleAction('view_engagement')}
            />
            <MetricCard
              title="Moderation Queue"
              value={PLATFORM_STATS.moderationQueue}
              icon="🛡️"
              color="bg-gradient-to-br from-orange-500 to-red-600"
              onClick={() => handleAction('moderation_queue')}
            />
          </>
        );
      case 'student_leader':
        return (
          <>
            <MetricCard
              title="Space Members"
              value={SPACE_STATS.totalMembers}
              change={8.2}
              icon="👥"
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
              onClick={() => handleAction('view_members')}
            />
            <MetricCard
              title="Active Members"
              value={SPACE_STATS.activeMembers}
              change={12.1}
              icon="✨"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              onClick={() => handleAction('view_active_members')}
            />
            <MetricCard
              title="Posts This Week"
              value={SPACE_STATS.postsThisWeek}
              change={15.6}
              icon="📝"
              color="bg-gradient-to-br from-purple-500 to-pink-600"
              onClick={() => handleAction('view_posts')}
            />
            <MetricCard
              title="Community Health"
              value={`${SPACE_STATS.communityHealth}%`}
              change={3.2}
              icon="❤️"
              color="bg-gradient-to-br from-orange-500 to-red-600"
              onClick={() => handleAction('view_health')}
            />
          </>
        );
      case 'moderator':
        return (
          <>
            <MetricCard
              title="Pending Reports"
              value={4}
              icon="📋"
              color="bg-gradient-to-br from-red-500 to-orange-600"
              onClick={() => handleAction('pending_reports')}
            />
            <MetricCard
              title="Resolved Today"
              value={12}
              change={20.5}
              icon="✅"
              color="bg-gradient-to-br from-green-500 to-emerald-600"
              onClick={() => handleAction('resolved_today')}
            />
            <MetricCard
              title="Avg Response Time"
              value="2.4h"
              change={-15.3}
              icon="⏱️"
              color="bg-gradient-to-br from-blue-500 to-indigo-600"
              onClick={() => handleAction('response_time')}
            />
            <MetricCard
              title="Content Warnings"
              value={8}
              icon="⚠️"
              color="bg-gradient-to-br from-yellow-500 to-orange-600"
              onClick={() => handleAction('content_warnings')}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl">⚡</span>
            <h1 className="text-3xl font-bold text-hive-text-primary">Admin & Analytics System</h1>
          </div>
          <p className="text-hive-text-secondary">
            Comprehensive administration tools for platform oversight and community leadership
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <RoleSelector
              selectedRole={selectedRole}
              onRoleChange={setSelectedRole}
            />
            
            <QuickActions
              role={selectedRole}
              onAction={handleAction}
            />

            {selectedRole === 'power_admin' && (
              <FeatureFlagSummary
                flags={FEATURE_FLAGS}
                onManageFlags={handleManageFlags}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Role-specific header */}
            <div className="bg-white rounded-2xl border border-hive-border-default p-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  {selectedRole === 'power_admin' ? '⚡' : selectedRole === 'student_leader' ? '👑' : '🛡️'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-hive-text-primary">
                    {selectedRole === 'power_admin' ? 'Power Admin Dashboard' : 
                     selectedRole === 'student_leader' ? `${SPACE_STATS.spaceName} Leadership` : 
                     'Moderation Dashboard'}
                  </h2>
                  <p className="text-hive-text-secondary">
                    {selectedRole === 'power_admin' ? 'Monitor platform health and manage global features' : 
                     selectedRole === 'student_leader' ? 'Manage your space community and track engagement' : 
                     'Review reports and maintain community standards'}
                  </p>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderMetrics()}
            </div>

            {/* Secondary Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RecentActivityFeed
                activities={RECENT_ACTIVITY}
                role={selectedRole}
              />

              {/* Role-specific additional content */}
              {selectedRole === 'power_admin' && (
                <div className="bg-white rounded-2xl border border-hive-border-default p-6">
                  <h3 className="text-lg font-bold text-hive-text-primary mb-4">System Health</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">API Response Time</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                        <span className="text-sm font-medium text-hive-text-primary">124ms</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Database Performance</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                        <span className="text-sm font-medium text-hive-text-primary">Excellent</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Error Rate</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                        <span className="text-sm font-medium text-hive-text-primary">0.02%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Uptime</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                        <span className="text-sm font-medium text-hive-text-primary">99.98%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'student_leader' && (
                <div className="bg-white rounded-2xl border border-hive-border-default p-6">
                  <h3 className="text-lg font-bold text-hive-text-primary mb-4">Member Insights</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Most Active Member</span>
                      <span className="text-sm font-medium text-hive-text-primary">Sarah Johnson</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Peak Activity Time</span>
                      <span className="text-sm font-medium text-hive-text-primary">7-9 PM</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Avg Session Length</span>
                      <span className="text-sm font-medium text-hive-text-primary">12.4 minutes</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Response Rate</span>
                      <span className="text-sm font-medium text-hive-text-primary">84.7%</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'moderator' && (
                <div className="bg-white rounded-2xl border border-hive-border-default p-6">
                  <h3 className="text-lg font-bold text-hive-text-primary mb-4">Moderation Stats</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Reports This Week</span>
                      <span className="text-sm font-medium text-hive-text-primary">23</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">False Positive Rate</span>
                      <span className="text-sm font-medium text-hive-text-primary">12%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Educational Actions</span>
                      <span className="text-sm font-medium text-hive-text-primary">67%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Community Health</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-hive-status-success rounded-full" />
                        <span className="text-sm font-medium text-hive-text-primary">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20 text-center">
              <h3 className="text-2xl font-bold text-hive-text-primary mb-4">
                {selectedRole === 'power_admin' ? 'Platform Administration' : 
                 selectedRole === 'student_leader' ? 'Community Leadership' : 
                 'Content Moderation'}
              </h3>
              <p className="text-hive-text-secondary mb-6">
                {selectedRole === 'power_admin' ? 'Manage features, monitor health, and ensure platform success across all communities.' : 
                 selectedRole === 'student_leader' ? 'Build an engaged community with data-driven insights and leadership tools.' : 
                 'Maintain community standards through thoughtful, educational moderation practices.'}
              </p>
              <button
                onClick={() => handleAction('explore_all')}
                className="px-6 py-3 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors"
              >
                Explore All Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompleteAdminSystem: Story = {
  name: '⚡ Complete Admin System',
  render: () => <AdminSystemShowcase />
};