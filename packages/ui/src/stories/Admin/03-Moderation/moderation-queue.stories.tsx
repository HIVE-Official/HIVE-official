import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Admin/03-Moderation/ModerationQueue',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Human-reviewed moderation system for content reports, community violations, and educational interventions'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface ModerationItem {
  id: string;
  type: 'content_report' | 'behavior_report' | 'space_violation' | 'harassment' | 'spam';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_review' | 'resolved' | 'escalated';
  reportedContent: {
    type: 'post' | 'comment' | 'space' | 'user' | 'event';
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    space: {
      id: string;
      name: string;
    };
    timestamp: string;
  };
  reports: {
    reporterId: string;
    reporterName: string;
    reason: string;
    description: string;
    timestamp: string;
  }[];
  assignedTo?: string;
  createdAt: string;
  context: {
    previousViolations: number;
    userJoinDate: string;
    recentActivity: string;
    communityStanding: 'good' | 'warning' | 'probation' | 'at_risk';
  };
}

interface ModerationAction {
  id: string;
  type: 'dismiss' | 'warning' | 'content_removal' | 'temporary_suspension' | 'space_restriction' | 'educational_intervention';
  reason: string;
  message?: string;
  duration?: string;
  educationalResources?: string[];
}

// Demo data
const MODERATION_QUEUE: ModerationItem[] = [
  {
    id: '1',
    type: 'content_report',
    priority: 'high',
    status: 'pending',
    reportedContent: {
      type: 'post',
      id: 'post_123',
      content: 'This assignment is impossible! The professor clearly doesn\'t know what they\'re doing. I\'m going to fail because of their incompetence.',
      author: {
        id: 'user_456',
        name: 'Alex Thompson',
        avatar: '😤'
      },
      space: {
        id: 'space_789',
        name: 'CS 220 Study Group'
      },
      timestamp: '2024-02-12 14:30:00'
    },
    reports: [
      {
        reporterId: 'user_111',
        reporterName: 'Sarah Johnson',
        reason: 'Inappropriate criticism of faculty',
        description: 'This post contains unprofessional criticism of the professor that could harm the learning environment.',
        timestamp: '2024-02-12 15:45:00'
      }
    ],
    createdAt: '2024-02-12 15:45:00',
    context: {
      previousViolations: 0,
      userJoinDate: '2024-01-15',
      recentActivity: 'Regular participant, generally constructive posts',
      communityStanding: 'good'
    }
  },
  {
    id: '2',
    type: 'behavior_report',
    priority: 'urgent',
    status: 'in_review',
    reportedContent: {
      type: 'user',
      id: 'user_789',
      content: 'Pattern of dismissive behavior in study group discussions',
      author: {
        id: 'user_789',
        name: 'Jordan Martinez',
        avatar: '🙄'
      },
      space: {
        id: 'space_456',
        name: 'Engineering Career Prep'
      },
      timestamp: '2024-02-11 09:15:00'
    },
    reports: [
      {
        reporterId: 'user_222',
        reporterName: 'Maya Patel',
        reason: 'Dismissive behavior',
        description: 'Consistently dismisses other members\' questions and contributions, creating an unwelcoming environment.',
        timestamp: '2024-02-11 18:20:00'
      },
      {
        reporterId: 'user_333',
        reporterName: 'David Kim',
        reason: 'Creating hostile environment',
        description: 'Makes other members feel stupid for asking questions. Several people have mentioned feeling intimidated.',
        timestamp: '2024-02-11 19:30:00'
      }
    ],
    assignedTo: 'Sarah Chen',
    createdAt: '2024-02-11 18:20:00',
    context: {
      previousViolations: 1,
      userJoinDate: '2024-01-08',
      recentActivity: 'Active contributor but showing concerning behavioral patterns',
      communityStanding: 'warning'
    }
  },
  {
    id: '3',
    type: 'spam',
    priority: 'medium',
    status: 'pending',
    reportedContent: {
      type: 'post',
      id: 'post_456',
      content: '🔥 TUTORING SERVICES 🔥 Get A+ grades guaranteed! DM for rates. Professional help for all CS courses!!!',
      author: {
        id: 'user_999',
        name: 'QuickTutor Pro',
        avatar: '💰'
      },
      space: {
        id: 'space_123',
        name: 'Data Structures Study Circle'
      },
      timestamp: '2024-02-12 10:22:00'
    },
    reports: [
      {
        reporterId: 'user_444',
        reporterName: 'Emma Wilson',
        reason: 'Commercial spam',
        description: 'Advertising tutoring services inappropriately in academic study space.',
        timestamp: '2024-02-12 11:15:00'
      }
    ],
    createdAt: '2024-02-12 11:15:00',
    context: {
      previousViolations: 0,
      userJoinDate: '2024-02-10',
      recentActivity: 'New member, only promotional content posted',
      communityStanding: 'at_risk'
    }
  },
  {
    id: '4',
    type: 'harassment',
    priority: 'urgent',
    status: 'escalated',
    reportedContent: {
      type: 'comment',
      id: 'comment_789',
      content: 'You clearly don\'t belong in this major. Maybe try something easier like art history.',
      author: {
        id: 'user_666',
        name: 'TechBro2024',
        avatar: '😤'
      },
      space: {
        id: 'space_999',
        name: 'Women in CS Support Group'
      },
      timestamp: '2024-02-11 16:45:00'
    },
    reports: [
      {
        reporterId: 'user_555',
        reporterName: 'Lisa Zhang',
        reason: 'Harassment and discrimination',
        description: 'Targeted harassment based on gender in a support space for women in CS.',
        timestamp: '2024-02-11 17:00:00'
      }
    ],
    assignedTo: 'Admin Team',
    createdAt: '2024-02-11 17:00:00',
    context: {
      previousViolations: 3,
      userJoinDate: '2024-01-20',
      recentActivity: 'Multiple complaints across different spaces',
      communityStanding: 'probation'
    }
  }
];

// Priority Badge Component
const PriorityBadge: React.FC<{ priority: ModerationItem['priority'] }> = ({ priority }) => {
  const priorityConfig = {
    low: { color: 'bg-gray-100 text-gray-800', icon: '⚪' },
    medium: { color: 'bg-yellow-100 text-yellow-800', icon: '🟡' },
    high: { color: 'bg-orange-100 text-orange-800', icon: '🟠' },
    urgent: { color: 'bg-red-100 text-red-800', icon: '🔴' }
  };

  const config = priorityConfig[priority];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span>{config.icon}</span>
      <span className="capitalize">{priority}</span>
    </span>
  );
};

// Status Badge Component
const StatusBadge: React.FC<{ status: ModerationItem['status'] }> = ({ status }) => {
  const statusConfig = {
    pending: { color: 'bg-blue-100 text-blue-800', icon: '⏳' },
    in_review: { color: 'bg-yellow-100 text-yellow-800', icon: '👁️' },
    resolved: { color: 'bg-green-100 text-green-800', icon: '✅' },
    escalated: { color: 'bg-red-100 text-red-800', icon: '⬆️' }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span>{config.icon}</span>
      <span className="capitalize">{status.replace('_', ' ')}</span>
    </span>
  );
};

// Type Badge Component
const TypeBadge: React.FC<{ type: ModerationItem['type'] }> = ({ type }) => {
  const typeConfig = {
    content_report: { color: 'bg-purple-100 text-purple-800', icon: '📝' },
    behavior_report: { color: 'bg-orange-100 text-orange-800', icon: '👤' },
    space_violation: { color: 'bg-red-100 text-red-800', icon: '🏠' },
    harassment: { color: 'bg-red-100 text-red-800', icon: '🚨' },
    spam: { color: 'bg-gray-100 text-gray-800', icon: '🗑️' }
  };

  const config = typeConfig[type];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span>{config.icon}</span>
      <span className="capitalize">{type.replace('_', ' ')}</span>
    </span>
  );
};

// Community Standing Indicator
const CommunityStandingIndicator: React.FC<{ standing: ModerationItem['context']['communityStanding'] }> = ({ standing }) => {
  const standingConfig = {
    good: { color: 'text-hive-status-success', icon: '✅', label: 'Good Standing' },
    warning: { color: 'text-hive-status-warning', icon: '⚠️', label: 'Warning' },
    probation: { color: 'text-orange-600', icon: '🔶', label: 'Probation' },
    at_risk: { color: 'text-hive-status-error', icon: '🔴', label: 'At Risk' }
  };

  const config = standingConfig[standing];

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${config.color}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

// Moderation Item Card Component
const ModerationItemCard: React.FC<{ 
  item: ModerationItem; 
  onReview: (itemId: string) => void;
  onAssign: (itemId: string, assignee: string) => void;
  onResolve: (itemId: string, action: ModerationAction) => void;
}> = ({ item, onReview, onAssign, onResolve }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <TypeBadge type={item.type} />
          <PriorityBadge priority={item.priority} />
          <StatusBadge status={item.status} />
        </div>
        
        <div className="text-sm text-hive-text-secondary">
          {item.createdAt}
        </div>
      </div>

      {/* Reported Content */}
      <div className="mb-4 p-4 bg-hive-background-primary rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-hive-brand-primary rounded-full flex items-center justify-center text-white text-sm">
            {item.reportedContent.author.avatar}
          </div>
          <div>
            <div className="font-medium text-hive-text-primary">{item.reportedContent.author.name}</div>
            <div className="text-sm text-hive-text-secondary">
              in {item.reportedContent.space.name} • {item.reportedContent.timestamp}
            </div>
          </div>
        </div>
        
        <div className="text-hive-text-primary">
          {showFullContent ? item.reportedContent.content : truncateContent(item.reportedContent.content)}
          {item.reportedContent.content.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="ml-2 text-hive-brand-primary hover:underline text-sm"
            >
              {showFullContent ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>

      {/* Reports */}
      <div className="mb-4">
        <div className="text-sm font-medium text-hive-text-primary mb-2">
          Reports ({item.reports.length})
        </div>
        <div className="space-y-2">
          {item.reports.map((report, index) => (
            <div key={index} className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-red-800">{report.reporterName}</div>
                <div className="text-xs text-red-600">{report.timestamp}</div>
              </div>
              <div className="text-sm text-red-700 mb-1">Reason: {report.reason}</div>
              <div className="text-sm text-red-600">{report.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Context Information */}
      <div className="mb-4 p-4 bg-blue-50 rounded-xl">
        <div className="text-sm font-medium text-blue-800 mb-2">User Context</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-blue-600">Previous Violations</div>
            <div className="font-medium text-blue-800">{item.context.previousViolations}</div>
          </div>
          <div>
            <div className="text-blue-600">Member Since</div>
            <div className="font-medium text-blue-800">{item.context.userJoinDate}</div>
          </div>
          <div className="col-span-2">
            <div className="text-blue-600">Recent Activity</div>
            <div className="font-medium text-blue-800">{item.context.recentActivity}</div>
          </div>
          <div className="col-span-2">
            <CommunityStandingIndicator standing={item.context.communityStanding} />
          </div>
        </div>
      </div>

      {/* Assignment */}
      {item.assignedTo && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="text-hive-text-secondary">Assigned to:</span>
          <span className="font-medium text-hive-text-primary">{item.assignedTo}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onReview(item.id)}
            className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors"
          >
            {item.status === 'pending' ? 'Start Review' : 'Continue Review'}
          </button>
          
          {item.status === 'pending' && !item.assignedTo && (
            <button
              onClick={() => onAssign(item.id, 'Current User')}
              className="px-4 py-2 bg-white border border-hive-border-default text-hive-text-secondary rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors"
            >
              Assign to Me
            </button>
          )}
        </div>

        <button
          onClick={() => setShowActions(!showActions)}
          className="px-4 py-2 bg-white border border-hive-border-default text-hive-text-secondary rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors"
        >
          Quick Actions
        </button>
      </div>

      {/* Quick Actions Panel */}
      {showActions && (
        <div className="mt-4 p-4 bg-hive-background-primary rounded-xl">
          <div className="text-sm font-medium text-hive-text-primary mb-3">Quick Resolution Actions</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <button
              onClick={() => onResolve(item.id, { id: '1', type: 'dismiss', reason: 'No violation found' })}
              className="px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors"
            >
              Dismiss
            </button>
            <button
              onClick={() => onResolve(item.id, { id: '2', type: 'warning', reason: 'First warning issued' })}
              className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm hover:bg-yellow-200 transition-colors"
            >
              Warning
            </button>
            <button
              onClick={() => onResolve(item.id, { id: '3', type: 'content_removal', reason: 'Content violates guidelines' })}
              className="px-3 py-2 bg-orange-100 text-orange-800 rounded-lg text-sm hover:bg-orange-200 transition-colors"
            >
              Remove Content
            </button>
            <button
              onClick={() => onResolve(item.id, { id: '4', type: 'educational_intervention', reason: 'Educational approach' })}
              className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm hover:bg-blue-200 transition-colors"
            >
              Educational
            </button>
            <button
              onClick={() => onResolve(item.id, { id: '5', type: 'temporary_suspension', reason: 'Temporary suspension needed' })}
              className="px-3 py-2 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200 transition-colors"
            >
              Suspend
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Filter Controls Component
const FilterControls: React.FC<{
  filters: {
    type: string;
    priority: string;
    status: string;
    assignee: string;
  };
  onFiltersChange: (filters: any) => void;
}> = ({ filters, onFiltersChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Filter Queue</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-hive-text-primary mb-2 block">Type</label>
          <select
            value={filters.type}
            onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
            className="w-full p-2 border border-hive-border-default rounded-lg text-sm"
          >
            <option value="">All Types</option>
            <option value="content_report">Content Report</option>
            <option value="behavior_report">Behavior Report</option>
            <option value="harassment">Harassment</option>
            <option value="spam">Spam</option>
            <option value="space_violation">Space Violation</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-hive-text-primary mb-2 block">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value })}
            className="w-full p-2 border border-hive-border-default rounded-lg text-sm"
          >
            <option value="">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-hive-text-primary mb-2 block">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="w-full p-2 border border-hive-border-default rounded-lg text-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_review">In Review</option>
            <option value="escalated">Escalated</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-hive-text-primary mb-2 block">Assignee</label>
          <select
            value={filters.assignee}
            onChange={(e) => onFiltersChange({ ...filters, assignee: e.target.value })}
            className="w-full p-2 border border-hive-border-default rounded-lg text-sm"
          >
            <option value="">All Assignees</option>
            <option value="unassigned">Unassigned</option>
            <option value="me">Assigned to Me</option>
            <option value="sarah">Sarah Chen</option>
            <option value="admin">Admin Team</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Main Moderation Queue Component
const ModerationQueue: React.FC = () => {
  const [queue, setQueue] = useState(MODERATION_QUEUE);
  const [filters, setFilters] = useState({
    type: '',
    priority: '',
    status: '',
    assignee: ''
  });

  const handleReview = (itemId: string) => {
    console.log('Starting review for item:', itemId);
    // In real app, this would open detailed review interface
  };

  const handleAssign = (itemId: string, assignee: string) => {
    setQueue(prev => prev.map(item => 
      item.id === itemId ? { ...item, assignedTo: assignee, status: 'in_review' as const } : item
    ));
  };

  const handleResolve = (itemId: string, action: ModerationAction) => {
    console.log('Resolving item:', itemId, 'with action:', action);
    setQueue(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'resolved' as const } : item
    ));
  };

  // Filter queue based on selected criteria
  const filteredQueue = queue.filter(item => {
    if (filters.type && item.type !== filters.type) return false;
    if (filters.priority && item.priority !== filters.priority) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.assignee) {
      if (filters.assignee === 'unassigned' && item.assignedTo) return false;
      if (filters.assignee === 'me' && item.assignedTo !== 'Current User') return false;
      if (filters.assignee !== 'unassigned' && filters.assignee !== 'me' && !item.assignedTo?.toLowerCase().includes(filters.assignee)) return false;
    }
    return true;
  });

  // Sort by priority and creation date
  const sortedQueue = [...filteredQueue].sort((a, b) => {
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-hive-text-primary">Moderation Queue</h1>
          <p className="text-hive-text-secondary">Human-reviewed content moderation and community safety</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-hive-text-secondary">
            {filteredQueue.length} of {queue.length} items
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-hive-border-default p-6">
          <div className="text-2xl font-bold text-red-600">{queue.filter(i => i.priority === 'urgent').length}</div>
          <div className="text-sm text-hive-text-secondary">Urgent Items</div>
        </div>
        
        <div className="bg-white rounded-2xl border border-hive-border-default p-6">
          <div className="text-2xl font-bold text-orange-600">{queue.filter(i => i.status === 'pending').length}</div>
          <div className="text-sm text-hive-text-secondary">Pending Review</div>
        </div>
        
        <div className="bg-white rounded-2xl border border-hive-border-default p-6">
          <div className="text-2xl font-bold text-blue-600">{queue.filter(i => i.status === 'in_review').length}</div>
          <div className="text-sm text-hive-text-secondary">In Review</div>
        </div>
        
        <div className="bg-white rounded-2xl border border-hive-border-default p-6">
          <div className="text-2xl font-bold text-green-600">{queue.filter(i => i.status === 'resolved').length}</div>
          <div className="text-sm text-hive-text-secondary">Resolved Today</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <div className="lg:col-span-1">
          <FilterControls
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Queue Items */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {sortedQueue.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-hive-text-primary mb-2">No items match your filters</h3>
                <p className="text-hive-text-secondary">Try adjusting your filter criteria or check back later for new reports.</p>
              </div>
            ) : (
              sortedQueue.map((item) => (
                <ModerationItemCard
                  key={item.id}
                  item={item}
                  onReview={handleReview}
                  onAssign={handleAssign}
                  onResolve={handleResolve}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BasicModerationQueue: Story = {
  name: '🛡️ Basic Moderation Queue',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto">
          <ModerationQueue />
        </div>
      </div>
    );
  }
};