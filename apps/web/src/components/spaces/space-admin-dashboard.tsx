"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge, Modal } from "@hive/ui";
import { Alert } from "@/components/layout/page-container";
import { 
  Users, 
  Settings, 
  BarChart3, 
  Shield, 
  Flag, 
  Trash2, 
  UserPlus, 
  UserMinus, 
  MessageSquare, 
  Calendar, 
  Zap, 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Star,
  Eye,
  EyeOff,
  Edit,
  Download,
  Bell,
  Archive
} from "lucide-react";

interface SpaceAdminDashboardProps {
  spaceId: string;
  spaceName: string;
  userRole: 'admin' | 'moderator' | 'member';
}

interface SpaceMember {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: string;
  lastActive: string;
  contributionScore: number;
  verified?: boolean;
}

interface SpaceAnalytics {
  totalMembers: number;
  activeMembers: number;
  weeklyGrowth: number;
  engagementRate: number;
  totalEvents: number;
  totalPosts: number;
  totalTools: number;
  reportedContent: number;
}

export function SpaceAdminDashboard({ spaceId, spaceName, userRole }: SpaceAdminDashboardProps) {
  const [analytics, setAnalytics] = useState<SpaceAnalytics | null>(null);
  const [recentMembers, setRecentMembers] = useState<SpaceMember[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'content' | 'settings'>('overview');
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockAnalytics: SpaceAnalytics = {
        totalMembers: 127,
        activeMembers: 89,
        weeklyGrowth: 12,
        engagementRate: 76,
        totalEvents: 23,
        totalPosts: 156,
        totalTools: 8,
        reportedContent: 2
      };

      const mockMembers: SpaceMember[] = [
        {
          id: '1',
          name: 'Sarah Chen',
          handle: 'sarahc',
          role: 'admin',
          joinedAt: '2024-01-15T10:00:00Z',
          lastActive: '2024-02-01T14:30:00Z',
          contributionScore: 95,
          verified: true
        },
        {
          id: '2',
          name: 'Marcus Johnson',
          handle: 'marcusj',
          role: 'moderator',
          joinedAt: '2024-01-20T09:00:00Z',
          lastActive: '2024-02-01T12:15:00Z',
          contributionScore: 87
        },
        {
          id: '3',
          name: 'Emma Davis',
          handle: 'emmad',
          role: 'member',
          joinedAt: '2024-01-25T11:30:00Z',
          lastActive: '2024-01-31T16:45:00Z',
          contributionScore: 62
        }
      ];

      setAnalytics(mockAnalytics);
      setRecentMembers(mockMembers);
      setIsLoading(false);
    };

    fetchAdminData();
  }, [spaceId]);

  if (userRole === 'member') {
    return (
      <div className="text-center py-12">
        <Shield className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Access Restricted</h3>
        <p className="text-zinc-400">You don't have permission to view the admin dashboard.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-[var(--hive-text-inverse)]">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">Space Administration</h2>
          <p className="text-zinc-400">Manage {spaceName} • {analytics?.totalMembers} members</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="building-tools" className="capitalize">
            {userRole}
          </Badge>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View Space
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 bg-zinc-800/50 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'members', label: 'Members', icon: Users },
          { id: 'content', label: 'Content', icon: MessageSquare },
          { id: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-hive-gold text-hive-obsidian font-medium'
                  : 'text-zinc-400 hover:text-[var(--hive-text-inverse)]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && analytics && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="p-4 bg-zinc-800/50 border-zinc-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{analytics.totalMembers}</div>
                  <div className="text-sm text-zinc-400">Total Members</div>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                <span className="text-green-400">+{analytics.weeklyGrowth} this week</span>
              </div>
            </Card>

            <Card className="p-4 bg-zinc-800/50 border-zinc-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{analytics.activeMembers}</div>
                  <div className="text-sm text-zinc-400">Active Members</div>
                </div>
                <Activity className="h-8 w-8 text-green-400" />
              </div>
              <div className="mt-2 text-sm text-zinc-400">
                {Math.round((analytics.activeMembers / analytics.totalMembers) * 100)}% of total
              </div>
            </Card>

            <Card className="p-4 bg-zinc-800/50 border-zinc-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{analytics.engagementRate}%</div>
                  <div className="text-sm text-zinc-400">Engagement Rate</div>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
              <div className="mt-2 text-sm text-green-400">
                Above average
              </div>
            </Card>

            <Card className="p-4 bg-zinc-800/50 border-zinc-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{analytics.totalEvents}</div>
                  <div className="text-sm text-zinc-400">Total Events</div>
                </div>
                <Calendar className="h-8 w-8 text-orange-400" />
              </div>
              <div className="mt-2 text-sm text-zinc-400">
                {analytics.totalPosts} posts, {analytics.totalTools} tools
              </div>
            </Card>

            <Card className="p-4 bg-zinc-800/50 border-zinc-700">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">8.2</div>
                  <div className="text-sm text-zinc-400">Health Score</div>
                </div>
                <Zap className="h-8 w-8 text-green-400" />
              </div>
              <div className="mt-2 text-sm text-green-400">
                Excellent condition
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6 bg-zinc-800/50 border-zinc-700">
            <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <Button
                onClick={() => setShowMemberModal(true)}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne justify-start"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => window.location.href = `/spaces/${spaceId}/resources`}
              >
                <Archive className="h-4 w-4 mr-2" />
                Manage Resources
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => window.location.href = `/spaces/${spaceId}/analytics`}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-zinc-800/50 border-zinc-700">
            <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Recent Members</h3>
            <div className="space-y-3">
              {recentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center">
                      <span className="text-[var(--hive-text-inverse)] font-semibold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-[var(--hive-text-inverse)]">{member.name}</span>
                        {member.verified && <Star className="h-4 w-4 text-hive-gold fill-current" />}
                        <Badge 
                          variant={member.role === 'admin' ? 'destructive' : member.role === 'moderator' ? 'building-tools' : 'skill-tag'} 
                          className="text-xs"
                        >
                          {member.role}
                        </Badge>
                      </div>
                      <div className="text-sm text-zinc-400">@{member.handle} • Score: {member.contributionScore}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-[var(--hive-text-inverse)]">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'members' && (
        <Card className="p-8 bg-zinc-800/50 border-zinc-700 text-center">
          <Users className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Member Management</h3>
          <p className="text-zinc-400 mb-6">
            Advanced member management features are coming soon.
          </p>
          <Button variant="outline">
            View All Members
          </Button>
        </Card>
      )}

      {activeTab === 'content' && (
        <Card className="p-8 bg-zinc-800/50 border-zinc-700 text-center">
          <MessageSquare className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Content Moderation</h3>
          <p className="text-zinc-400 mb-6">
            Content moderation and reporting tools are coming soon.
          </p>
          {analytics && analytics.reportedContent > 0 && (
            <div className="flex items-center justify-center space-x-2 text-orange-400 mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span>{analytics.reportedContent} items need review</span>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'settings' && (
        <Card className="p-8 bg-zinc-800/50 border-zinc-700 text-center">
          <Settings className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Space Settings</h3>
          <p className="text-zinc-400 mb-6">
            Advanced space configuration options are coming soon.
          </p>
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Space Details
          </Button>
        </Card>
      )}

      {/* Member Invite Modal */}
      <Modal
        isOpen={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        title="Invite Members"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-zinc-400">Send invitations to new members to join {spaceName}.</p>
          
          <div>
            <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">Email Addresses</label>
            <textarea
              placeholder="Enter email addresses, one per line..."
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] placeholder-zinc-400 focus:border-hive-gold focus:outline-none resize-none"
              rows={4}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowMemberModal(false)}>
              Cancel
            </Button>
            <Button className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne">
              Send Invitations
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}