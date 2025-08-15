import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Admin/01-Power Admin/FeatureFlags',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Feature flag management system for controlled platform feature rollouts and A/B testing'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  key: string;
  enabled: boolean;
  rolloutPercentage: number;
  environment: 'development' | 'staging' | 'production';
  category: 'core' | 'experimental' | 'ui' | 'api' | 'social';
  targetAudience: ('all' | 'students' | 'faculty' | 'admins' | 'beta-testers')[];
  createdBy: string;
  createdAt: string;
  lastModified: string;
  dependencies?: string[];
  metrics?: {
    usageCount: number;
    conversionRate?: number;
    errorRate?: number;
  };
}

interface RolloutRule {
  id: string;
  type: 'percentage' | 'user-list' | 'school' | 'user-type';
  value: string | number;
  description: string;
}

// Demo data
const FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: '1',
    name: 'Enhanced Profile Widgets',
    description: 'New drag-and-drop profile widget system with expanded customization options',
    key: 'enhanced_profile_widgets',
    enabled: true,
    rolloutPercentage: 75,
    environment: 'production',
    category: 'ui',
    targetAudience: ['students', 'faculty'],
    createdBy: 'Sarah Chen',
    createdAt: '2024-01-15',
    lastModified: '2024-02-08',
    dependencies: ['profile_system_v2'],
    metrics: {
      usageCount: 3247,
      conversionRate: 68.5,
      errorRate: 0.02
    }
  },
  {
    id: '2',
    name: 'Real-time Space Chat',
    description: 'Live messaging within spaces for instant coordination and communication',
    key: 'realtime_space_chat',
    enabled: false,
    rolloutPercentage: 0,
    environment: 'development',
    category: 'social',
    targetAudience: ['beta-testers'],
    createdBy: 'Alex Rodriguez',
    createdAt: '2024-02-01',
    lastModified: '2024-02-10',
    dependencies: ['websocket_infrastructure'],
    metrics: {
      usageCount: 0,
      errorRate: 0
    }
  },
  {
    id: '3',
    name: 'Advanced Space Analytics',
    description: 'Detailed analytics dashboard for space leaders with engagement insights',
    key: 'advanced_space_analytics',
    enabled: true,
    rolloutPercentage: 50,
    environment: 'staging',
    category: 'core',
    targetAudience: ['students'],
    createdBy: 'Maya Patel',
    createdAt: '2024-01-22',
    lastModified: '2024-02-12',
    metrics: {
      usageCount: 1856,
      conversionRate: 45.2,
      errorRate: 0.01
    }
  },
  {
    id: '4',
    name: 'Mobile Push Notifications',
    description: 'Push notification system for mobile app engagement and updates',
    key: 'mobile_push_notifications',
    enabled: true,
    rolloutPercentage: 100,
    environment: 'production',
    category: 'core',
    targetAudience: ['all'],
    createdBy: 'David Kim',
    createdAt: '2024-01-08',
    lastModified: '2024-01-30',
    dependencies: ['mobile_app_v2'],
    metrics: {
      usageCount: 8934,
      conversionRate: 82.3,
      errorRate: 0.005
    }
  },
  {
    id: '5',
    name: 'AI-Powered Space Recommendations',
    description: 'Machine learning recommendations for space discovery and matching',
    key: 'ai_space_recommendations',
    enabled: false,
    rolloutPercentage: 10,
    environment: 'staging',
    category: 'experimental',
    targetAudience: ['beta-testers', 'students'],
    createdBy: 'Emma Wilson',
    createdAt: '2024-02-05',
    lastModified: '2024-02-13',
    dependencies: ['ml_infrastructure', 'user_preference_engine'],
    metrics: {
      usageCount: 234,
      conversionRate: 28.7,
      errorRate: 0.08
    }
  },
  {
    id: '6',
    name: 'Enhanced Search Filters',
    description: 'Additional filtering options for space search including location and schedule',
    key: 'enhanced_search_filters',
    enabled: true,
    rolloutPercentage: 85,
    environment: 'production',
    category: 'ui',
    targetAudience: ['students', 'faculty'],
    createdBy: 'Jordan Lee',
    createdAt: '2024-01-18',
    lastModified: '2024-02-06',
    metrics: {
      usageCount: 5621,
      conversionRate: 72.1,
      errorRate: 0.01
    }
  }
];

// Feature Flag Status Badge Component
const StatusBadge: React.FC<{ 
  enabled: boolean; 
  environment: FeatureFlag['environment'];
  rolloutPercentage: number;
}> = ({ enabled, environment, rolloutPercentage }) => {
  const getStatusColor = () => {
    if (!enabled) return 'bg-hive-status-error text-white';
    if (environment === 'development') return 'bg-yellow-500 text-white';
    if (environment === 'staging') return 'bg-blue-500 text-white';
    if (rolloutPercentage < 100) return 'bg-orange-500 text-white';
    return 'bg-hive-status-success text-white';
  };

  const getStatusText = () => {
    if (!enabled) return 'Disabled';
    if (environment === 'development') return 'Development';
    if (environment === 'staging') return 'Staging';
    if (rolloutPercentage < 100) return `${rolloutPercentage}% Rollout`;
    return 'Live';
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {getStatusText()}
    </span>
  );
};

// Category Badge Component
const CategoryBadge: React.FC<{ category: FeatureFlag['category'] }> = ({ category }) => {
  const categoryConfig = {
    core: { color: 'bg-blue-100 text-blue-800', icon: '🔧' },
    experimental: { color: 'bg-purple-100 text-purple-800', icon: '🧪' },
    ui: { color: 'bg-green-100 text-green-800', icon: '🎨' },
    api: { color: 'bg-orange-100 text-orange-800', icon: '⚡' },
    social: { color: 'bg-pink-100 text-pink-800', icon: '👥' }
  };

  const config = categoryConfig[category];

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span>{config.icon}</span>
      <span className="capitalize">{category}</span>
    </span>
  );
};

// Rollout Percentage Component
const RolloutPercentage: React.FC<{ 
  percentage: number; 
  onPercentageChange: (percentage: number) => void;
  disabled?: boolean;
}> = ({ percentage, onPercentageChange, disabled = false }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-hive-text-primary">Rollout Percentage</span>
        <span className="text-sm text-hive-text-secondary">{percentage}%</span>
      </div>
      
      <div className="relative">
        <div className="w-full h-2 bg-hive-background-primary rounded-full">
          <div 
            className="h-2 bg-hive-brand-primary rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={percentage}
          onChange={(e) => onPercentageChange(parseInt(e.target.value))}
          disabled={disabled}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />
      </div>
      
      <div className="flex justify-between text-xs text-hive-text-secondary">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

// Feature Flag Card Component
const FeatureFlagCard: React.FC<{ 
  flag: FeatureFlag; 
  onToggle: (flagId: string) => void;
  onEdit: (flagId: string) => void;
  onViewMetrics: (flagId: string) => void;
  onUpdateRollout: (flagId: string, percentage: number) => void;
}> = ({ flag, onToggle, onEdit, onViewMetrics, onUpdateRollout }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-hive-text-primary">{flag.name}</h3>
            <CategoryBadge category={flag.category} />
          </div>
          <p className="text-hive-text-secondary text-sm mb-3">{flag.description}</p>
          <div className="flex items-center gap-2">
            <StatusBadge 
              enabled={flag.enabled} 
              environment={flag.environment}
              rolloutPercentage={flag.rolloutPercentage}
            />
            <span className="text-xs text-hive-text-secondary">
              Key: <code className="bg-hive-background-primary px-1 rounded">{flag.key}</code>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggle(flag.id)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-hive-brand-primary focus:ring-offset-2 ${
              flag.enabled ? 'bg-hive-brand-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                flag.enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Rollout Control */}
      {flag.enabled && (
        <div className="mb-4">
          <RolloutPercentage
            percentage={flag.rolloutPercentage}
            onPercentageChange={(percentage) => onUpdateRollout(flag.id, percentage)}
          />
        </div>
      )}

      {/* Target Audience */}
      <div className="mb-4">
        <div className="text-sm font-medium text-hive-text-primary mb-2">Target Audience</div>
        <div className="flex flex-wrap gap-2">
          {flag.targetAudience.map((audience) => (
            <span key={audience} className="px-2 py-1 bg-hive-background-primary text-hive-text-secondary text-xs rounded-full">
              {audience.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Dependencies */}
      {flag.dependencies && flag.dependencies.length > 0 && (
        <div className="mb-4">
          <div className="text-sm font-medium text-hive-text-primary mb-2">Dependencies</div>
          <div className="flex flex-wrap gap-2">
            {flag.dependencies.map((dep) => (
              <code key={dep} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                {dep}
              </code>
            ))}
          </div>
        </div>
      )}

      {/* Metrics */}
      {flag.metrics && (
        <div className="mb-4 p-3 bg-hive-background-primary rounded-xl">
          <div className="text-sm font-medium text-hive-text-primary mb-2">Performance Metrics</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-hive-text-secondary">Usage</div>
              <div className="font-semibold text-hive-text-primary">{flag.metrics.usageCount.toLocaleString()}</div>
            </div>
            {flag.metrics.conversionRate && (
              <div>
                <div className="text-hive-text-secondary">Conversion</div>
                <div className="font-semibold text-hive-text-primary">{flag.metrics.conversionRate}%</div>
              </div>
            )}
            <div>
              <div className="text-hive-text-secondary">Error Rate</div>
              <div className={`font-semibold ${flag.metrics.errorRate > 0.05 ? 'text-hive-status-error' : 'text-hive-status-success'}`}>
                {(flag.metrics.errorRate * 100).toFixed(3)}%
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meta Info */}
      <div className="flex items-center justify-between text-xs text-hive-text-secondary mb-4">
        <span>Created by {flag.createdBy} on {flag.createdAt}</span>
        <span>Modified {flag.lastModified}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onEdit(flag.id)}
          className="px-3 py-2 bg-hive-brand-primary text-white text-sm rounded-lg hover:bg-hive-brand-primary/80 transition-colors"
        >
          Edit Configuration
        </button>
        
        <button
          onClick={() => onViewMetrics(flag.id)}
          className="px-3 py-2 bg-white border border-hive-border-default text-hive-text-secondary text-sm rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors"
        >
          View Metrics
        </button>
      </div>
    </div>
  );
};

// Filter Controls Component
const FilterControls: React.FC<{
  filters: {
    category: string;
    environment: string;
    status: string;
  };
  onFiltersChange: (filters: any) => void;
}> = ({ filters, onFiltersChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-hive-text-primary mb-2 block">Category</label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="w-full p-2 border border-hive-border-default rounded-lg text-sm"
          >
            <option value="">All Categories</option>
            <option value="core">Core</option>
            <option value="experimental">Experimental</option>
            <option value="ui">UI</option>
            <option value="api">API</option>
            <option value="social">Social</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-hive-text-primary mb-2 block">Environment</label>
          <select
            value={filters.environment}
            onChange={(e) => onFiltersChange({ ...filters, environment: e.target.value })}
            className="w-full p-2 border border-hive-border-default rounded-lg text-sm"
          >
            <option value="">All Environments</option>
            <option value="development">Development</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
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
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
            <option value="partial">Partial Rollout</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Main Feature Flags Component
const FeatureFlags: React.FC = () => {
  const [flags, setFlags] = useState(FEATURE_FLAGS);
  const [filters, setFilters] = useState({
    category: '',
    environment: '',
    status: ''
  });

  const handleToggleFlag = (flagId: string) => {
    setFlags(prev => prev.map(flag => 
      flag.id === flagId ? { ...flag, enabled: !flag.enabled } : flag
    ));
  };

  const handleUpdateRollout = (flagId: string, percentage: number) => {
    setFlags(prev => prev.map(flag => 
      flag.id === flagId ? { ...flag, rolloutPercentage: percentage } : flag
    ));
  };

  const handleEditFlag = (flagId: string) => {
    console.log('Editing flag:', flagId);
  };

  const handleViewMetrics = (flagId: string) => {
    console.log('Viewing metrics for flag:', flagId);
  };

  // Filter flags based on selected criteria
  const filteredFlags = flags.filter(flag => {
    if (filters.category && flag.category !== filters.category) return false;
    if (filters.environment && flag.environment !== filters.environment) return false;
    if (filters.status) {
      if (filters.status === 'enabled' && !flag.enabled) return false;
      if (filters.status === 'disabled' && flag.enabled) return false;
      if (filters.status === 'partial' && (flag.rolloutPercentage >= 100 || !flag.enabled)) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-hive-text-primary">Feature Flags</h1>
          <p className="text-hive-text-secondary">Manage platform features and control rollout to different user segments</p>
        </div>
        
        <button className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors">
          Create New Flag
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-hive-border-default p-6">
          <div className="text-2xl font-bold text-hive-text-primary">{flags.length}</div>
          <div className="text-sm text-hive-text-secondary">Total Flags</div>
        </div>
        
        <div className="bg-white rounded-2xl border border-hive-border-default p-6">
          <div className="text-2xl font-bold text-hive-status-success">{flags.filter(f => f.enabled).length}</div>
          <div className="text-sm text-hive-text-secondary">Enabled</div>
        </div>
        
        <div className="bg-white rounded-2xl border border-hive-border-default p-6">
          <div className="text-2xl font-bold text-hive-status-warning">{flags.filter(f => f.enabled && f.rolloutPercentage < 100).length}</div>
          <div className="text-sm text-hive-text-secondary">Partial Rollout</div>
        </div>
        
        <div className="bg-white rounded-2xl border border-hive-border-default p-6">
          <div className="text-2xl font-bold text-hive-brand-primary">{flags.filter(f => f.environment === 'production').length}</div>
          <div className="text-sm text-hive-text-secondary">In Production</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterControls
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Feature Flags List */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {filteredFlags.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🚩</div>
                <h3 className="text-xl font-bold text-hive-text-primary mb-2">No flags match your filters</h3>
                <p className="text-hive-text-secondary">Try adjusting your filter criteria to see more feature flags.</p>
              </div>
            ) : (
              filteredFlags.map((flag) => (
                <FeatureFlagCard
                  key={flag.id}
                  flag={flag}
                  onToggle={handleToggleFlag}
                  onEdit={handleEditFlag}
                  onViewMetrics={handleViewMetrics}
                  onUpdateRollout={handleUpdateRollout}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const BasicFeatureFlags: Story = {
  name: '🚩 Basic Feature Flags',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto">
          <FeatureFlags />
        </div>
      </div>
    );
  }
};