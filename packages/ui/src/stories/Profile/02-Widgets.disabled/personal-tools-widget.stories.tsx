import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Wrench, Download, Star, TrendingUp, Users, Play, Settings, X, ArrowLeft, ExternalLink, Code, Sparkles } from 'lucide-react';

const meta = {
  title: 'Profile/02-Widgets/Personal Tools Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Personal Tools Widget (2x2) - HiveLAB v1 Preview showing the future of personal productivity tools and custom app marketplace. Join the waitlist to access building tools. Click to expand into Focus Mode.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Personal Tools Widget Data Interface
interface PersonalTool {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'academic' | 'social' | 'utility' | 'custom';
  status: 'available' | 'beta' | 'coming_soon' | 'waitlist';
  icon: string;
  color: string;
  usage: {
    timesUsed: number;
    lastUsed?: string;
    averageRating: number;
    totalRatings: number;
  };
  features: string[];
  createdBy?: {
    type: 'hive' | 'community' | 'user';
    name: string;
    verified: boolean;
  };
  integrations: string[];
  preview?: {
    screenshots: string[];
    demoUrl?: string;
  };
}

interface ToolCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  toolCount: number;
  featured: PersonalTool[];
}

interface PersonalToolsWidgetData {
  userTools: PersonalTool[];
  recommendations: PersonalTool[];
  categories: ToolCategory[];
  stats: {
    toolsInstalled: number;
    toolsBuilt: number;
    totalUsage: number;
    weeklyActive: number;
  };
  waitlistStatus: {
    position?: number;
    estimatedAccess?: string;
    earlyAccess: boolean;
  };
  buildingTools: {
    inProgress: number;
    published: number;
    totalDownloads: number;
  };
  marketplace: {
    totalTools: number;
    newThisWeek: number;
    trending: PersonalTool[];
  };
}

// Focus Mode Hook
const useFocusMode = () => {
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const enterFocus = (widgetId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(widgetId);
      setIsTransitioning(false);
    }, 200);
  };

  const exitFocus = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(null);
      setIsTransitioning(false);
    }, 200);
  };

  return { focusedWidget, isTransitioning, enterFocus, exitFocus };
};

// Focus Overlay Component
const FocusOverlay = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  isTransitioning 
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isTransitioning: boolean;
}) => {
  if (!isOpen && !isTransitioning) return null;

  return (
    <div className={`
      fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4
      transition-all duration-200
      ${isOpen && !isTransitioning ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className={`
        bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden
        transform transition-all duration-200
        ${isOpen && !isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Focus Header */}
        <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <h2 className="text-xl font-bold text-hive-text-primary">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors">
              ⚙️
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Focus Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Personal Tools Widget Component
const PersonalToolsWidget = ({ 
  data,
  size = 'default',
  isEditMode = false,
  state = 'loaded',
  onJoinWaitlist,
  onInstallTool,
  onBuildTool,
  onFocus,
  className = ''
}: {
  data?: PersonalToolsWidgetData;
  size?: 'compact' | 'default' | 'large';
  isEditMode?: boolean;
  state?: 'loading' | 'error' | 'empty' | 'loaded';
  onJoinWaitlist?: () => void;
  onInstallTool?: (toolId: string) => void;
  onBuildTool?: () => void;
  onFocus?: () => void;
  className?: string;
}) => {
  // Demo data
  const defaultData: PersonalToolsWidgetData = {
    userTools: [
      {
        id: 'study-scheduler',
        name: 'Study Session Scheduler',
        description: 'AI-powered study session planning with conflict detection',
        category: 'academic',
        status: 'beta',
        icon: '📚',
        color: 'blue-500',
        usage: {
          timesUsed: 47,
          lastUsed: '2 hours ago',
          averageRating: 4.8,
          totalRatings: 23
        },
        features: ['AI Scheduling', 'Conflict Detection', 'Space Integration'],
        createdBy: {
          type: 'user',
          name: 'Sarah Chen',
          verified: true
        },
        integrations: ['Google Calendar', 'HIVE Spaces', 'Priority Widget']
      },
      {
        id: 'laundry-tracker',
        name: 'Dorm Laundry Tracker',
        description: 'Track laundry machines and get notifications when done',
        category: 'utility',
        status: 'available',
        icon: '🧺',
        color: 'green-500',
        usage: {
          timesUsed: 156,
          lastUsed: '1 day ago',
          averageRating: 4.9,
          totalRatings: 67
        },
        features: ['Machine Status', 'Push Notifications', 'Usage Analytics'],
        createdBy: {
          type: 'community',
          name: 'Floor 3 Community',
          verified: true
        },
        integrations: ['HIVE Notifications', 'Floor Spaces']
      }
    ],
    recommendations: [
      {
        id: 'grade-predictor',
        name: 'Grade Predictor',
        description: 'Predict final grades based on current performance',
        category: 'academic',
        status: 'coming_soon',
        icon: '📊',
        color: 'purple-500',
        usage: {
          timesUsed: 0,
          averageRating: 0,
          totalRatings: 0
        },
        features: ['Grade Prediction', 'Study Recommendations', 'Progress Tracking'],
        createdBy: {
          type: 'hive',
          name: 'HIVE Team',
          verified: true
        },
        integrations: ['Academic Records', 'Study Tools']
      }
    ],
    categories: [
      {
        id: 'academic',
        name: 'Academic',
        icon: '📚',
        description: 'Study tools, grade tracking, and academic productivity',
        toolCount: 24,
        featured: []
      },
      {
        id: 'social',
        name: 'Social',
        icon: '👥',
        description: 'Event coordination, social planning, and connection tools',
        toolCount: 18,
        featured: []
      },
      {
        id: 'utility',
        name: 'Utility',
        icon: '🛠️',
        description: 'Campus life tools, dorm utilities, and daily helpers',
        toolCount: 31,
        featured: []
      }
    ],
    stats: {
      toolsInstalled: 8,
      toolsBuilt: 2,
      totalUsage: 342,
      weeklyActive: 6
    },
    waitlistStatus: {
      position: 47,
      estimatedAccess: 'Early February 2024',
      earlyAccess: false
    },
    buildingTools: {
      inProgress: 1,
      published: 2,
      totalDownloads: 89
    },
    marketplace: {
      totalTools: 156,
      newThisWeek: 8,
      trending: []
    }
  };

  const widgetData = data || defaultData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'hive-status-success';
      case 'beta': return 'hive-status-warning';
      case 'coming_soon': return 'hive-brand-secondary';
      case 'waitlist': return 'hive-text-tertiary';
      default: return 'hive-text-tertiary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'beta': return 'Beta';
      case 'coming_soon': return 'Coming Soon';
      case 'waitlist': return 'Waitlist';
      default: return 'Unknown';
    }
  };

  const renderCompactView = () => (
    <div className="text-center space-y-4">
      <div className="text-4xl">🛠️</div>
      <div>
        <div className="text-xl font-bold text-hive-text-primary">Personal Tools</div>
        <div className="text-sm text-hive-text-secondary">HiveLAB v1 Preview</div>
      </div>
      <div className="px-4 py-2 bg-hive-brand-secondary/10 text-hive-brand-secondary text-sm rounded-full border border-hive-brand-secondary/20">
        JOIN WAITLIST →
      </div>
      <div className="text-xs text-hive-text-tertiary">
        Position #{widgetData.waitlistStatus.position} • {widgetData.marketplace.totalTools} tools available
      </div>
    </div>
  );

  const renderDefaultView = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-3xl">🛠️</div>
        <div>
          <div className="text-lg font-bold text-hive-text-primary">Personal Tools</div>
          <div className="text-sm text-hive-text-secondary">HiveLAB v1 Preview</div>
        </div>
      </div>

      {/* Waitlist Status */}
      <div className="p-4 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl text-center">
        <div className="text-sm font-medium text-hive-text-primary mb-2">
          🚀 Early Access Waitlist
        </div>
        <div className="text-xs text-hive-text-secondary mb-3">
          Position #{widgetData.waitlistStatus.position} • Est. {widgetData.waitlistStatus.estimatedAccess}
        </div>
        <button className="px-4 py-2 bg-hive-brand-secondary text-white text-sm rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
          VIEW WAITLIST STATUS
        </button>
      </div>

      {/* Preview Tools */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-hive-text-primary">Available in v1</div>
        {widgetData.userTools.slice(0, 2).map((tool) => (
          <div key={tool.id} className="flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg">
            <div className={`w-8 h-8 bg-${tool.color} rounded-lg text-white text-sm flex items-center justify-center`}>
              {tool.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-hive-text-primary truncate">{tool.name}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full bg-${getStatusColor(tool.status)}/10 text-${getStatusColor(tool.status)}`}>
                  {getStatusText(tool.status)}
                </span>
              </div>
              <div className="text-xs text-hive-text-secondary truncate">{tool.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Marketplace Stats */}
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div>
          <div className="font-bold text-hive-text-primary">{widgetData.marketplace.totalTools}</div>
          <div className="text-hive-text-secondary">Total Tools</div>
        </div>
        <div>
          <div className="font-bold text-hive-text-primary">{widgetData.marketplace.newThisWeek}</div>
          <div className="text-hive-text-secondary">New This Week</div>
        </div>
        <div>
          <div className="font-bold text-hive-brand-secondary">{widgetData.stats.toolsBuilt}</div>
          <div className="text-hive-text-secondary">You Built</div>
        </div>
      </div>
    </div>
  );

  const renderLargeView = () => (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="text-center space-y-4">
        <div className="text-4xl">🛠️</div>
        <div>
          <div className="text-2xl font-bold text-hive-text-primary">Personal Tools</div>
          <div className="text-sm text-hive-text-secondary">HiveLAB v1 Preview - Custom App Marketplace</div>
        </div>
        
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-hive-background-primary rounded-lg">
            <div className="text-lg font-bold text-hive-text-primary">{widgetData.stats.toolsInstalled}</div>
            <div className="text-xs text-hive-text-secondary">Installed</div>
          </div>
          <div className="p-3 bg-hive-background-primary rounded-lg">
            <div className="text-lg font-bold text-hive-brand-secondary">{widgetData.stats.toolsBuilt}</div>
            <div className="text-xs text-hive-text-secondary">Built</div>
          </div>
          <div className="p-3 bg-hive-background-primary rounded-lg">
            <div className="text-lg font-bold text-hive-text-primary">{widgetData.stats.totalUsage}</div>
            <div className="text-xs text-hive-text-secondary">Total Uses</div>
          </div>
          <div className="p-3 bg-hive-background-primary rounded-lg">
            <div className="text-lg font-bold text-hive-status-success">{widgetData.stats.weeklyActive}</div>
            <div className="text-xs text-hive-text-secondary">Weekly Active</div>
          </div>
        </div>
      </div>

      {/* Waitlist CTA */}
      <div className="p-6 bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl text-center">
        <div className="text-lg font-bold text-hive-text-primary mb-2">
          🚀 Join the HiveLAB Waitlist
        </div>
        <div className="text-sm text-hive-text-secondary mb-4">
          Build custom tools for your campus life. Position #{widgetData.waitlistStatus.position}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button className="px-6 py-3 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
            VIEW STATUS
          </button>
          <button className="px-6 py-3 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
            PREVIEW TOOLS
          </button>
        </div>
      </div>

      {/* Your Tools */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-hive-text-primary">Your Tools</h4>
          <button className="text-xs text-hive-brand-secondary hover:text-hive-brand-secondary/80 transition-colors">
            View All →
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {widgetData.userTools.map((tool) => (
            <div key={tool.id} className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default hover:shadow-md transition-all duration-200">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 bg-${tool.color} rounded-xl text-white text-lg flex items-center justify-center flex-shrink-0`}>
                  {tool.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-hive-text-primary text-sm truncate">{tool.name}</span>
                    <span className={`px-2 py-0.5 text-xs rounded-full bg-${getStatusColor(tool.status)}/10 text-${getStatusColor(tool.status)}`}>
                      {getStatusText(tool.status)}
                    </span>
                  </div>
                  <div className="text-xs text-hive-text-secondary mb-2 line-clamp-2">{tool.description}</div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-hive-text-tertiary">{tool.usage.timesUsed} uses</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-hive-text-tertiary">{tool.usage.averageRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Preview */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-hive-text-primary">Tool Categories</h4>
        <div className="grid grid-cols-3 gap-2">
          {widgetData.categories.map((category) => (
            <div key={category.id} className="p-3 bg-hive-background-primary rounded-lg text-center">
              <div className="text-lg mb-1">{category.icon}</div>
              <div className="text-xs font-medium text-hive-text-primary">{category.name}</div>
              <div className="text-xs text-hive-text-tertiary">{category.toolCount} tools</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (size) {
      case 'compact': return renderCompactView();
      case 'large': return renderLargeView();
      default: return renderDefaultView();
    }
  };

  return (
    <div 
      onClick={onFocus}
      className={`
        relative bg-white border border-hive-border-default rounded-xl p-4 h-full group
        ${isEditMode ? 'border-hive-brand-secondary/50 shadow-lg' : 'cursor-pointer hover:border-hive-brand-secondary/50 hover:shadow-lg'}
        transition-all duration-200
        ${className}
      `}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            🛠️
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">Personal Tools</span>
          <span className="px-2 py-0.5 bg-hive-brand-secondary/10 text-hive-brand-secondary text-xs rounded-full border border-hive-brand-secondary/20">
            v1 Preview
          </span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBuildTool?.();
              }}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Build Tool"
            >
              ➕
            </button>
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={`${isEditMode ? 'pointer-events-none opacity-75' : ''} group-hover:scale-[1.02] transition-transform duration-200`}>
        {renderContent()}
      </div>

      {/* Focus Hint */}
      <div className="pt-2 border-t border-hive-border-default opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="text-xs text-hive-brand-secondary text-center">
          Click to expand & focus →
        </div>
      </div>

      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl flex items-center justify-center">
          <div className="text-xs text-hive-text-secondary font-medium">
            Personal Tools Widget (2x2)
          </div>
        </div>
      )}
    </div>
  );
};

// Personal Tools Focus Content
const PersonalToolsFocusContent = ({ data }: { data: PersonalToolsWidgetData }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'marketplace' | 'mytools' | 'build'>('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'hive-status-success';
      case 'beta': return 'hive-status-warning';
      case 'coming_soon': return 'hive-brand-secondary';
      case 'waitlist': return 'hive-text-tertiary';
      default: return 'hive-text-tertiary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Available';
      case 'beta': return 'Beta';
      case 'coming_soon': return 'Coming Soon';
      case 'waitlist': return 'Waitlist';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-hive-text-primary">Personal Tools - HiveLAB</h3>
          <p className="text-hive-text-secondary">Build, discover, and use custom tools for your campus life</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
            📚 Documentation
          </button>
          <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
            🚀 Join Waitlist
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4">
        {[
          { key: 'overview', label: 'Overview', icon: '📊' },
          { key: 'marketplace', label: 'Marketplace', icon: '🏪' },
          { key: 'mytools', label: 'My Tools', icon: '🛠️' },
          { key: 'build', label: 'Build', icon: '🏗️' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key as any)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${selectedTab === tab.key 
                ? 'bg-hive-brand-secondary text-white' 
                : 'bg-hive-background-secondary text-hive-text-secondary hover:bg-hive-text-tertiary/20'
              }
            `}
          >
            <span>{tab.icon}</span>
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-8">
          {/* Waitlist Status */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl p-8">
            <div className="text-center space-y-6">
              <div>
                <div className="text-3xl mb-3">🚀</div>
                <h4 className="text-2xl font-bold text-hive-text-primary mb-2">HiveLAB v1 Early Access</h4>
                <p className="text-hive-text-secondary">Build custom tools for your campus community</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-hive-brand-secondary">#{data.waitlistStatus.position}</div>
                  <div className="text-sm text-hive-text-secondary">Your Position</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-hive-text-primary">{data.waitlistStatus.estimatedAccess}</div>
                  <div className="text-sm text-hive-text-secondary">Estimated Access</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-hive-text-primary">{data.marketplace.totalTools}</div>
                  <div className="text-sm text-hive-text-secondary">Tools Available</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <button className="px-6 py-3 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
                  View Waitlist Details
                </button>
                <button className="px-6 py-3 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
                  Preview Tools
                </button>
              </div>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl font-bold text-hive-text-primary">{data.stats.toolsInstalled}</div>
              <div className="text-sm text-hive-text-secondary">Tools Installed</div>
            </div>
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl font-bold text-hive-brand-secondary">{data.stats.toolsBuilt}</div>
              <div className="text-sm text-hive-text-secondary">Tools Built</div>
            </div>
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl font-bold text-hive-text-primary">{data.stats.totalUsage}</div>
              <div className="text-sm text-hive-text-secondary">Total Usage</div>
            </div>
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl font-bold text-hive-status-success">{data.stats.weeklyActive}</div>
              <div className="text-sm text-hive-text-secondary">Weekly Active</div>
            </div>
          </div>

          {/* Featured Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-hive-text-primary">Tool Categories</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.categories.map((category) => (
                <div key={category.id} className="p-6 bg-hive-background-primary border border-hive-border-default rounded-xl hover:shadow-md transition-all duration-200">
                  <div className="text-center space-y-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <h5 className="font-bold text-hive-text-primary">{category.name}</h5>
                      <p className="text-sm text-hive-text-secondary mt-1">{category.description}</p>
                    </div>
                    <div className="text-2xl font-bold text-hive-brand-secondary">{category.toolCount}</div>
                    <div className="text-xs text-hive-text-tertiary">Available Tools</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Marketplace Tab */}
      {selectedTab === 'marketplace' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-hive-text-primary">Tool Marketplace</h4>
            <div className="flex items-center gap-3">
              <select className="px-3 py-2 bg-hive-background-secondary border border-hive-border-default rounded-lg text-hive-text-primary">
                <option>All Categories</option>
                <option>Academic</option>
                <option>Social</option>
                <option>Utility</option>
              </select>
              <select className="px-3 py-2 bg-hive-background-secondary border border-hive-border-default rounded-lg text-hive-text-primary">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid gap-6">
            {[...data.userTools, ...data.recommendations].map((tool) => (
              <div key={tool.id} className="p-6 bg-hive-background-primary border border-hive-border-default rounded-xl hover:shadow-md transition-all duration-200">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-${tool.color} rounded-xl text-white text-2xl flex items-center justify-center flex-shrink-0`}>
                    {tool.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="text-lg font-bold text-hive-text-primary">{tool.name}</h5>
                          <span className={`px-3 py-1 text-sm rounded-full bg-${getStatusColor(tool.status)}/10 text-${getStatusColor(tool.status)}`}>
                            {getStatusText(tool.status)}
                          </span>
                          {tool.createdBy?.verified && (
                            <span className="text-hive-status-success">✓</span>
                          )}
                        </div>
                        
                        <p className="text-hive-text-secondary mb-4">{tool.description}</p>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm font-medium text-hive-text-primary mb-2">Features</div>
                            <div className="flex flex-wrap gap-2">
                              {tool.features.slice(0, 3).map((feature, index) => (
                                <span key={index} className="px-2 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary text-xs rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm font-medium text-hive-text-primary mb-2">Created By</div>
                            <div className="text-sm text-hive-text-secondary">
                              {tool.createdBy?.name} ({tool.createdBy?.type})
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium text-hive-text-primary">{tool.usage.averageRating}</span>
                          <span className="text-hive-text-tertiary">({tool.usage.totalRatings})</span>
                        </div>
                        <div className="text-sm text-hive-text-tertiary mb-4">{tool.usage.timesUsed} uses</div>
                        
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors text-sm">
                            Install
                          </button>
                          <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors text-sm">
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Tools Tab */}
      {selectedTab === 'mytools' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-hive-text-primary">My Tools ({data.userTools.length})</h4>
            <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
              + Install New Tool
            </button>
          </div>

          <div className="grid gap-4">
            {data.userTools.map((tool) => (
              <div key={tool.id} className="p-4 bg-hive-background-primary border border-hive-border-default rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${tool.color} rounded-xl text-white text-lg flex items-center justify-center`}>
                    {tool.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-hive-text-primary">{tool.name}</h5>
                      <span className={`px-2 py-1 text-xs rounded-full bg-${getStatusColor(tool.status)}/10 text-${getStatusColor(tool.status)}`}>
                        {getStatusText(tool.status)}
                      </span>
                    </div>
                    <p className="text-sm text-hive-text-secondary mb-2">{tool.description}</p>
                    <div className="flex items-center gap-4 text-xs text-hive-text-tertiary">
                      <span>Used {tool.usage.timesUsed} times</span>
                      <span>Last used {tool.usage.lastUsed}</span>
                      <span>★ {tool.usage.averageRating}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors text-sm">
                      Open
                    </button>
                    <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-lg flex items-center justify-center transition-colors">
                      ⋯
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Build Tab */}
      {selectedTab === 'build' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl p-8 text-center">
            <div className="text-4xl mb-4">🏗️</div>
            <h4 className="text-2xl font-bold text-hive-text-primary mb-2">Build Your Own Tools</h4>
            <p className="text-hive-text-secondary mb-6">Create custom tools for your campus community using HiveLAB</p>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-2xl font-bold text-hive-text-primary">{data.buildingTools.inProgress}</div>
                <div className="text-sm text-hive-text-secondary">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-hive-brand-secondary">{data.buildingTools.published}</div>
                <div className="text-sm text-hive-text-secondary">Published</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-hive-text-primary">{data.buildingTools.totalDownloads}</div>
                <div className="text-sm text-hive-text-secondary">Total Downloads</div>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
              Start Building
            </button>
          </div>

          <div className="text-center p-8 bg-hive-background-primary rounded-xl">
            <div className="text-2xl mb-4">📚</div>
            <h5 className="text-lg font-semibold text-hive-text-primary mb-2">Builder Resources</h5>
            <p className="text-hive-text-secondary mb-4">Documentation, tutorials, and community support</p>
            <div className="flex items-center justify-center gap-3">
              <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
                📖 Documentation
              </button>
              <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
                🎓 Tutorials
              </button>
              <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
                💬 Community
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const PersonalToolsSystem: Story = {
  name: '🛠️ Personal Tools Widget with Focus',
  render: () => {
    const { focusedWidget, isTransitioning, enterFocus, exitFocus } = useFocusMode();

    const demoData: PersonalToolsWidgetData = {
      userTools: [
        {
          id: 'study-scheduler',
          name: 'Study Session Scheduler',
          description: 'AI-powered study session planning with conflict detection and space integration',
          category: 'academic',
          status: 'beta',
          icon: '📚',
          color: 'blue-500',
          usage: {
            timesUsed: 47,
            lastUsed: '2 hours ago',
            averageRating: 4.8,
            totalRatings: 23
          },
          features: ['AI Scheduling', 'Conflict Detection', 'Space Integration', 'Calendar Sync'],
          createdBy: {
            type: 'user',
            name: 'Sarah Chen',
            verified: true
          },
          integrations: ['Google Calendar', 'HIVE Spaces', 'Priority Widget', 'Social Calendar']
        },
        {
          id: 'laundry-tracker',
          name: 'Dorm Laundry Tracker',
          description: 'Track laundry machine availability, get notifications when cycles complete',
          category: 'utility',
          status: 'available',
          icon: '🧺',
          color: 'green-500',
          usage: {
            timesUsed: 156,
            lastUsed: '1 day ago',
            averageRating: 4.9,
            totalRatings: 67
          },
          features: ['Machine Status', 'Push Notifications', 'Usage Analytics', 'Queue Management'],
          createdBy: {
            type: 'community',
            name: 'Floor 3 Community',
            verified: true
          },
          integrations: ['HIVE Notifications', 'Floor Spaces', 'Community Widget']
        },
        {
          id: 'meal-planner',
          name: 'Campus Meal Planner',
          description: 'Plan meals, track dining hall hours, coordinate with friends',
          category: 'social',
          status: 'available',
          icon: '🍽️',
          color: 'orange-500',
          usage: {
            timesUsed: 89,
            lastUsed: '3 hours ago',
            averageRating: 4.6,
            totalRatings: 34
          },
          features: ['Meal Planning', 'Social Coordination', 'Dining Hours', 'Nutrition Tracking'],
          createdBy: {
            type: 'community',
            name: 'Dining Hall Initiative',
            verified: true
          },
          integrations: ['Social Calendar', 'Community Spaces', 'Friend Network']
        }
      ],
      recommendations: [
        {
          id: 'grade-predictor',
          name: 'Grade Predictor & Analytics',
          description: 'Predict final grades based on current performance and get study recommendations',
          category: 'academic',
          status: 'coming_soon',
          icon: '📊',
          color: 'purple-500',
          usage: {
            timesUsed: 0,
            averageRating: 0,
            totalRatings: 0
          },
          features: ['Grade Prediction', 'Study Recommendations', 'Progress Tracking', 'Goal Setting'],
          createdBy: {
            type: 'hive',
            name: 'HIVE Team',
            verified: true
          },
          integrations: ['Academic Records', 'Study Tools', 'Priority Widget']
        },
        {
          id: 'event-coordinator',
          name: 'Event Coordinator Pro',
          description: 'Advanced event planning with budget tracking, RSVP management, and space booking',
          category: 'social',
          status: 'waitlist',
          icon: '🎉',
          color: 'pink-500',
          usage: {
            timesUsed: 0,
            averageRating: 0,
            totalRatings: 0
          },
          features: ['Budget Tracking', 'RSVP Management', 'Space Booking', 'Vendor Management'],
          createdBy: {
            type: 'community',
            name: 'Event Planning Society',
            verified: false
          },
          integrations: ['Social Calendar', 'Community Spaces', 'Budget Tools']
        }
      ],
      categories: [
        {
          id: 'academic',
          name: 'Academic',
          icon: '📚',
          description: 'Study tools, grade tracking, and academic productivity apps',
          toolCount: 24,
          featured: []
        },
        {
          id: 'social',
          name: 'Social',
          icon: '👥',
          description: 'Event coordination, social planning, and connection tools',
          toolCount: 18,
          featured: []
        },
        {
          id: 'utility',
          name: 'Utility',
          icon: '🛠️',
          description: 'Campus life tools, dorm utilities, and daily life helpers',
          toolCount: 31,
          featured: []
        },
        {
          id: 'productivity',
          name: 'Productivity',
          icon: '⚡',
          description: 'Time management, task tracking, and efficiency tools',
          toolCount: 19,
          featured: []
        }
      ],
      stats: {
        toolsInstalled: 8,
        toolsBuilt: 2,
        totalUsage: 342,
        weeklyActive: 6
      },
      waitlistStatus: {
        position: 47,
        estimatedAccess: 'Early February 2024',
        earlyAccess: false
      },
      buildingTools: {
        inProgress: 1,
        published: 2,
        totalDownloads: 89
      },
      marketplace: {
        totalTools: 156,
        newThisWeek: 8,
        trending: []
      }
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Personal Tools Widget System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              HiveLAB v1 Preview - Custom app marketplace for campus life productivity and coordination tools
            </p>
          </div>

          {/* Size Variants */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-hive-text-primary">Widget Size Variants</h2>
            
            <div className="grid gap-8">
              {/* Compact (1x1) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Compact View (1x1)</h3>
                <div className="w-80 h-80">
                  <PersonalToolsWidget 
                    data={demoData}
                    size="compact"
                    onFocus={() => enterFocus('tools-compact')}
                  />
                </div>
              </div>

              {/* Default (2x2) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Default View (2x2)</h3>
                <div className="w-[640px] h-[640px]">
                  <PersonalToolsWidget 
                    data={demoData}
                    size="default"
                    onFocus={() => enterFocus('tools-default')}
                  />
                </div>
              </div>

              {/* Large (expanded demo) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Large View (showcase)</h3>
                <div className="w-full max-w-4xl h-[800px]">
                  <PersonalToolsWidget 
                    data={demoData}
                    size="large"
                    onFocus={() => enterFocus('tools-large')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Overview */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">HiveLAB Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Custom Tool Building</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Visual Builder</strong>: Drag-and-drop tool creation interface</div>
                  <div>• <strong>API Integration</strong>: Connect to campus systems and services</div>
                  <div>• <strong>Template Library</strong>: Start from pre-built tool templates</div>
                  <div>• <strong>Community Publishing</strong>: Share tools with your campus</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Tool Marketplace</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Curated Collection</strong>: Verified tools from community builders</div>
                  <div>• <strong>Category Organization</strong>: Academic, social, utility, productivity</div>
                  <div>• <strong>Rating System</strong>: Community-driven tool quality assessment</div>
                  <div>• <strong>Usage Analytics</strong>: Track tool performance and adoption</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Focus Mode Experience</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Full Marketplace</strong>: Browse and install tools</div>
                  <div>• <strong>Tool Management</strong>: Organize and configure your tools</div>
                  <div>• <strong>Builder Dashboard</strong>: Create and publish your own tools</div>
                  <div>• <strong>Waitlist Status</strong>: Track early access progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Mode Overlays */}
        <FocusOverlay
          isOpen={focusedWidget === 'tools-compact' || focusedWidget === 'tools-default' || focusedWidget === 'tools-large'}
          onClose={exitFocus}
          title="Personal Tools - HiveLAB Preview"
          isTransitioning={isTransitioning}
        >
          <PersonalToolsFocusContent data={demoData} />
        </FocusOverlay>
      </div>
    );  
  }
};