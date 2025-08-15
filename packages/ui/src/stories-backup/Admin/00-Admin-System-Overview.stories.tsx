import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Admin/00-Admin System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Admin & Analytics System Overview - Complete system for platform administration and space leadership with analytics and moderation tools.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AdminSystemOverview: Story = {
  name: '⚡ Admin System Overview',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
              Admin & Analytics System
            </div>
            <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
              Comprehensive administration tools for platform oversight and space leadership with analytics, moderation, and feature management
            </div>
          </div>

          {/* System Architecture */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">System Architecture</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Power Admin Dashboard */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    ⚡
                  </div>
                  <h3 className="text-xl font-bold text-hive-text-primary">Power Admin Dashboard</h3>
                  <p className="text-hive-text-secondary">Platform-wide administration and oversight</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🌐 Platform Analytics</div>
                    <div className="text-sm text-hive-text-secondary">User growth, space creation, engagement metrics</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">👥 User Management</div>
                    <div className="text-sm text-hive-text-secondary">Account oversight, role management, violations</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🏠 Space Oversight</div>
                    <div className="text-sm text-hive-text-secondary">Space management, content moderation, health metrics</div>
                  </div>

                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🚩 Feature Flags</div>
                    <div className="text-sm text-hive-text-secondary">Platform feature management and rollout control</div>
                  </div>
                </div>
              </div>

              {/* Student Leader Dashboard */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    👑
                  </div>
                  <h3 className="text-xl font-bold text-hive-text-primary">Student Leader Dashboard</h3>
                  <p className="text-hive-text-secondary">Space-specific leadership tools</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">📊 Space Analytics</div>
                    <div className="text-sm text-hive-text-secondary">Member engagement, activity trends, growth metrics</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">👥 Member Management</div>
                    <div className="text-sm text-hive-text-secondary">Member roles, invitations, community health</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🛠️ Space Configuration</div>
                    <div className="text-sm text-hive-text-secondary">Settings, permissions, space customization</div>
                  </div>

                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🎯 Coordination Tools</div>
                    <div className="text-sm text-hive-text-secondary">Event planning, announcements, member engagement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6">Power Admin Features</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-red-800">Platform Analytics Dashboard</div>
                    <div className="text-sm text-red-600">Real-time metrics, growth trends, usage statistics</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-red-800">User & Space Management</div>
                    <div className="text-sm text-red-600">Account oversight, violation handling, space health</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-red-800">Human-Reviewed Moderation</div>
                    <div className="text-sm text-red-600">Content review queue, violation reports, actions</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-red-800">Feature Flag Management</div>
                    <div className="text-sm text-red-600">Platform feature control and rollout management</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">Student Leader Features</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Space Analytics & Insights</div>
                    <div className="text-sm text-blue-600">Member engagement, activity patterns, growth tracking</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Member Management Tools</div>
                    <div className="text-sm text-blue-600">Role assignment, invitations, community health</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Coordination & Events</div>
                    <div className="text-sm text-blue-600">Event planning, announcements, member engagement</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Space Configuration</div>
                    <div className="text-sm text-blue-600">Settings, permissions, customization options</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Moderation System */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Human-Reviewed Moderation System</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🚨
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Report Processing</h4>
                <p className="text-sm text-hive-text-secondary">Community reports are reviewed by human moderators with context and history</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  👁️
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Content Review</h4>
                <p className="text-sm text-hive-text-secondary">All content actions reviewed with community context and educational approach</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  ⚖️
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Action Tracking</h4>
                <p className="text-sm text-hive-text-secondary">Transparent moderation actions with appeals process and learning outcomes</p>
              </div>
            </div>
          </div>

          {/* Component Structure */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Component Structure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">⚡ Power Admin</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• PlatformAnalytics - Growth & usage metrics</li>
                  <li>• UserManagement - Account oversight</li>
                  <li>• SpaceOversight - Platform-wide space health</li>
                  <li>• FeatureFlags - Feature management</li>
                  <li>• ModerationQueue - Content review</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">👑 Student Leader</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• SpaceAnalytics - Engagement metrics</li>
                  <li>• MemberManagement - Role & invitation tools</li>
                  <li>• EventPlanning - Coordination tools</li>
                  <li>• SpaceSettings - Configuration panel</li>
                  <li>• CommunityHealth - Wellness tracking</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">📊 Analytics</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• MetricsDashboard - Real-time data</li>
                  <li>• EngagementCharts - Activity visualization</li>
                  <li>• GrowthTracking - Trend analysis</li>
                  <li>• HealthScores - Community wellness</li>
                  <li>• ReportGeneration - Data exports</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">🛠️ Management</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• RoleManager - Permission control</li>
                  <li>• ContentModerator - Review tools</li>
                  <li>• NotificationCenter - Admin alerts</li>
                  <li>• ActivityLogger - Action tracking</li>
                  <li>• SettingsPanel - Configuration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Development Progress */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Development Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-hive-text-primary">✅ Completed</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">System architecture planning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">Admin role hierarchy design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">Moderation workflow specification</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-hive-text-primary">🚧 In Progress</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Power admin dashboard components</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Student leader dashboard tools</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Analytics and reporting system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Human moderation interface</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Guide */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Storybook Navigation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-red-50 rounded-xl border border-red-200 text-center">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="font-bold text-red-800 mb-2">Power Admin</h3>
                <p className="text-sm text-red-600 mb-4">Platform-wide administration and oversight tools</p>
                <div className="text-xs text-red-500">Admin → 01-Power Admin</div>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <div className="text-3xl mb-4">👑</div>
                <h3 className="font-bold text-blue-800 mb-2">Student Leader</h3>
                <p className="text-sm text-blue-600 mb-4">Space-specific leadership and management tools</p>
                <div className="text-xs text-blue-500">Admin → 02-Student Leader</div>
              </div>

              <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="font-bold text-green-800 mb-2">Analytics</h3>
                <p className="text-sm text-green-600 mb-4">Metrics, insights, and reporting tools</p>
                <div className="text-xs text-green-500">Admin → 03-Analytics</div>
              </div>

              <div className="p-6 bg-orange-50 rounded-xl border border-orange-200 text-center">
                <div className="text-3xl mb-4">🛠️</div>
                <h3 className="font-bold text-orange-800 mb-2">Moderation</h3>
                <p className="text-sm text-orange-600 mb-4">Human-reviewed content moderation system</p>
                <div className="text-xs text-orange-500">Admin → 04-Moderation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};