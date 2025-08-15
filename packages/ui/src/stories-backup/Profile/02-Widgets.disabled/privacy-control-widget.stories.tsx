import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Shield, Eye, EyeOff, Lock, Unlock, User, Users, Globe, Settings, X, ArrowLeft, AlertTriangle } from 'lucide-react';

const meta = {
  title: 'Profile/02-Widgets/Privacy Control Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Privacy Control Widget (1x1) - Ghost Mode and granular privacy management with transparency controls and data visibility settings. Click to expand into Focus Mode.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Privacy Widget Data Interface
interface PrivacySetting {
  id: string;
  category: 'profile' | 'activity' | 'location' | 'social' | 'data';
  name: string;
  description: string;
  level: 'public' | 'connections' | 'spaces' | 'private';
  enabled: boolean;
  affectedFeatures: string[];
  impact: 'low' | 'medium' | 'high';
}

interface GhostModeConfig {
  enabled: boolean;
  duration?: string;
  autoDisable?: string;
  exemptions: {
    spaces: string[];
    emergencyContacts: string[];
    academicEvents: boolean;
  };
  visibilityLevel: 'invisible' | 'minimal' | 'academic_only';
}

interface DataUsageInfo {
  category: string;
  purpose: string;
  sharing: 'none' | 'anonymous' | 'aggregated' | 'identified';
  retention: string;
  canDelete: boolean;
  lastAccessed?: string;
}

interface PrivacyWidgetData {
  ghostMode: GhostModeConfig;
  privacyScore: number; // 0-100
  settings: PrivacySetting[];
  dataUsage: DataUsageInfo[];
  insights: {
    recommendation: string;
    vulnerabilities: string[];
    improvements: string[];
  };
  audit: {
    lastReview: string;
    changesThisWeek: number;
    dataRequests: number;
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
        bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden
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

// Privacy Control Widget Component
const PrivacyWidget = ({ 
  data,
  size = 'default',
  isEditMode = false,
  state = 'loaded',
  onToggleGhostMode,
  onUpdateSetting,
  onPrivacyReview,
  onFocus,
  className = ''
}: {
  data?: PrivacyWidgetData;
  size?: 'compact' | 'default' | 'expanded';
  isEditMode?: boolean;
  state?: 'loading' | 'error' | 'empty' | 'loaded';
  onToggleGhostMode?: () => void;
  onUpdateSetting?: (settingId: string, value: any) => void;
  onPrivacyReview?: () => void;
  onFocus?: () => void;
  className?: string;
}) => {
  // Demo data
  const defaultData: PrivacyWidgetData = {
    ghostMode: {
      enabled: false,
      duration: 'Until manually disabled',
      exemptions: {
        spaces: ['CS Study Group'],
        emergencyContacts: ['Campus Security', 'RA'],
        academicEvents: true
      },
      visibilityLevel: 'minimal'
    },
    privacyScore: 85,
    settings: [
      {
        id: 'profile-visibility',
        category: 'profile',
        name: 'Profile Visibility',
        description: 'Who can see your profile information',
        level: 'connections',
        enabled: true,
        affectedFeatures: ['Profile page', 'Search results'],
        impact: 'medium'
      },
      {
        id: 'activity-sharing',
        category: 'activity',
        name: 'Activity Sharing',
        description: 'Share your current activities and status',
        level: 'spaces',
        enabled: true,
        affectedFeatures: ['Status indicators', 'Activity feed'],
        impact: 'low'
      },
      {
        id: 'location-sharing',
        category: 'location',
        name: 'Location Sharing',
        description: 'Share your current location for coordination',
        level: 'private',
        enabled: false,
        affectedFeatures: ['Event coordination', 'Study group meetups'],
        impact: 'high'
      },
      {
        id: 'social-graph',
        category: 'social',
        name: 'Connection Visibility',
        description: 'Who can see your connections and social graph',
        level: 'connections',
        enabled: true,
        affectedFeatures: ['Connection suggestions', 'Social recommendations'],
        impact: 'medium'
      }
    ],
    dataUsage: [
      {
        category: 'Profile Data',
        purpose: 'Identity verification and connections',
        sharing: 'none',
        retention: '2 years after graduation',
        canDelete: true,
        lastAccessed: '2 hours ago'
      },
      {
        category: 'Activity Data',
        purpose: 'Coordination and space recommendations',
        sharing: 'aggregated',
        retention: '1 year',
        canDelete: true,
        lastAccessed: '5 minutes ago'
      },
      {
        category: 'Academic Data',
        purpose: 'Study group matching and academic tools',
        sharing: 'anonymous',
        retention: 'End of semester',
        canDelete: false,
        lastAccessed: '1 hour ago'
      }
    ],
    insights: {
      recommendation: 'Your privacy settings provide good balance between coordination and privacy',
      vulnerabilities: ['Location sharing disabled may reduce event coordination effectiveness'],
      improvements: ['Consider enabling limited location sharing for study groups']
    },
    audit: {
      lastReview: '2 weeks ago',
      changesThisWeek: 2,
      dataRequests: 0
    }
  };

  const widgetData = data || defaultData;

  const getPrivacyScoreColor = (score: number) => {
    if (score >= 80) return 'hive-status-success';
    if (score >= 60) return 'hive-status-warning';
    return 'hive-status-error';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'public': return '🌐';
      case 'connections': return '👥';
      case 'spaces': return '🏢';
      case 'private': return '🔒';
      default: return '❓';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'hive-status-error';
      case 'connections': return 'hive-status-warning';
      case 'spaces': return 'hive-brand-secondary';
      case 'private': return 'hive-status-success';
      default: return 'hive-text-tertiary';
    }
  };

  const renderDefaultView = () => (
    <div className="space-y-4">
      {/* Ghost Mode Toggle */}
      <div className="flex items-center justify-between p-3 bg-hive-background-primary rounded-lg">
        <div className="flex items-center gap-3">
          <div className="text-2xl">👻</div>
          <div>
            <div className="text-sm font-medium text-hive-text-primary">Ghost Mode</div>
            <div className="text-xs text-hive-text-secondary">
              {widgetData.ghostMode.enabled ? 'Active - You are invisible' : 'Inactive - You are visible'}
            </div>
          </div>
        </div>
        <div className={`
          w-12 h-6 rounded-full transition-colors cursor-pointer
          ${widgetData.ghostMode.enabled ? 'bg-hive-text-tertiary' : 'bg-hive-background-secondary'}
        `}>
          <div className={`
            w-5 h-5 bg-white rounded-full shadow transform transition-transform m-0.5
            ${widgetData.ghostMode.enabled ? 'translate-x-6' : 'translate-x-0'}
          `}></div>
        </div>
      </div>

      {/* Privacy Score */}
      <div className="text-center space-y-2">
        <div className={`text-2xl font-bold text-${getPrivacyScoreColor(widgetData.privacyScore)}`}>
          {widgetData.privacyScore}/100
        </div>
        <div className="text-xs text-hive-text-secondary">Privacy Score</div>
        <div className="w-full h-2 bg-hive-background-secondary rounded-full">
          <div 
            className={`h-2 bg-${getPrivacyScoreColor(widgetData.privacyScore)} rounded-full transition-all duration-300`}
            style={{ width: `${widgetData.privacyScore}%` }}
          ></div>
        </div>
      </div>

      {/* Key Settings */}
      <div className="space-y-2">
        {widgetData.settings.slice(0, 3).map((setting) => (
          <div key={setting.id} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs">{getLevelIcon(setting.level)}</span>
              <span className="text-hive-text-primary truncate">{setting.name}</span>
            </div>
            <div className={`px-2 py-0.5 text-xs rounded-full bg-${getLevelColor(setting.level)}/10 text-${getLevelColor(setting.level)}`}>
              {setting.level}
            </div>
          </div>
        ))}
      </div>

      {/* Privacy Insight */}
      {widgetData.insights.recommendation && (
        <div className="p-3 bg-hive-brand-secondary/10 border border-hive-brand-secondary/20 rounded-lg">
          <div className="text-xs text-hive-brand-secondary">
            💡 {widgetData.insights.recommendation}
          </div>
        </div>
      )}

      {/* Audit Info */}
      <div className="flex items-center justify-between text-xs text-hive-text-tertiary pt-2 border-t border-hive-border-default">
        <span>Last review: {widgetData.audit.lastReview}</span>
        <span>{widgetData.audit.changesThisWeek} changes this week</span>
      </div>
    </div>
  );

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
            🔒
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">Privacy Control</span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrivacyReview?.();
              }}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Privacy Review"
            >
              🔍
            </button>
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={`${isEditMode ? 'pointer-events-none opacity-75' : ''} group-hover:scale-[1.02] transition-transform duration-200`}>
        {renderDefaultView()}
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
            Privacy Control Widget (1x1)
          </div>
        </div>
      )}
    </div>
  );
};

// Privacy Focus Content
const PrivacyFocusContent = ({ data }: { data: PrivacyWidgetData }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'settings' | 'data' | 'audit'>('overview');
  const [showGhostModeConfig, setShowGhostModeConfig] = useState(false);

  const getPrivacyScoreColor = (score: number) => {
    if (score >= 80) return 'hive-status-success';
    if (score >= 60) return 'hive-status-warning';
    return 'hive-status-error';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'public': return '🌐';
      case 'connections': return '👥';
      case 'spaces': return '🏢';
      case 'private': return '🔒';
      default: return '❓';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'hive-status-error';
      case 'connections': return 'hive-status-warning';
      case 'spaces': return 'hive-brand-secondary';
      case 'private': return 'hive-status-success';
      default: return 'hive-text-tertiary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'profile': return '👤';
      case 'activity': return '📊';
      case 'location': return '📍';
      case 'social': return '👥';
      case 'data': return '💾';
      default: return '⚙️';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-hive-text-primary">Privacy Control</h3>
          <p className="text-hive-text-secondary">Manage your privacy settings, data usage, and Ghost Mode configuration</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
            📥 Export Data
          </button>
          <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
            🔍 Privacy Review
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4">
        {[
          { key: 'overview', label: 'Overview', icon: '📊' },
          { key: 'settings', label: 'Settings', icon: '⚙️' },
          { key: 'data', label: 'Data Usage', icon: '💾' },
          { key: 'audit', label: 'Audit Log', icon: '📋' }
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
          {/* Privacy Score Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 text-center p-6 bg-hive-background-primary rounded-xl">
              <div className={`text-4xl font-bold text-${getPrivacyScoreColor(data.privacyScore)} mb-2`}>
                {data.privacyScore}/100
              </div>
              <div className="text-sm text-hive-text-secondary mb-4">Privacy Score</div>
              <div className="w-full h-3 bg-hive-background-secondary rounded-full">
                <div 
                  className={`h-3 bg-${getPrivacyScoreColor(data.privacyScore)} rounded-full transition-all duration-500`}
                  style={{ width: `${data.privacyScore}%` }}
                ></div>
              </div>
              <div className="text-xs text-hive-text-tertiary mt-2">
                {data.privacyScore >= 80 ? 'Excellent privacy protection' :
                 data.privacyScore >= 60 ? 'Good privacy protection' : 'Privacy needs attention'}
              </div>
            </div>

            <div className="col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-hive-background-primary rounded-xl">
                  <div className="text-2xl font-bold text-hive-text-primary">{data.settings.filter(s => s.enabled).length}</div>
                  <div className="text-sm text-hive-text-secondary">Active Settings</div>
                </div>
                <div className="p-4 bg-hive-background-primary rounded-xl">
                  <div className="text-2xl font-bold text-hive-text-primary">{data.audit.changesThisWeek}</div>
                  <div className="text-sm text-hive-text-secondary">Changes This Week</div>
                </div>
              </div>
              
              <div className="p-4 bg-hive-background-primary rounded-xl">
                <div className="text-sm font-medium text-hive-text-primary mb-2">Data Requests</div>
                <div className="text-2xl font-bold text-hive-status-success">{data.audit.dataRequests}</div>
                <div className="text-xs text-hive-text-tertiary">No external data requests this month</div>
              </div>
            </div>
          </div>

          {/* Ghost Mode Control */}
          <div className="bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">👻</div>
                <div>
                  <h4 className="text-lg font-bold text-hive-text-primary">Ghost Mode</h4>
                  <p className="text-hive-text-secondary">Complete invisibility while maintaining functionality</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`
                  w-16 h-8 rounded-full transition-colors cursor-pointer
                  ${data.ghostMode.enabled ? 'bg-hive-text-tertiary' : 'bg-hive-background-secondary'}
                `}>
                  <div className={`
                    w-7 h-7 bg-white rounded-full shadow transform transition-transform m-0.5
                    ${data.ghostMode.enabled ? 'translate-x-8' : 'translate-x-0'}
                  `}></div>
                </div>
                <button 
                  onClick={() => setShowGhostModeConfig(!showGhostModeConfig)}
                  className="px-3 py-1 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors text-sm"
                >
                  Configure
                </button>
              </div>
            </div>

            {showGhostModeConfig && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-sm font-medium text-hive-text-primary mb-3">Exemptions</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-hive-text-secondary">Academic Events</span>
                      <div className={`w-10 h-5 rounded-full ${data.ghostMode.exemptions.academicEvents ? 'bg-hive-status-success' : 'bg-hive-background-secondary'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform m-0.5 ${data.ghostMode.exemptions.academicEvents ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                    <div className="text-sm text-hive-text-secondary">
                      Emergency Contacts: {data.ghostMode.exemptions.emergencyContacts.join(', ')}
                    </div>
                    <div className="text-sm text-hive-text-secondary">
                      Spaces: {data.ghostMode.exemptions.spaces.join(', ')}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-hive-text-primary mb-3">Visibility Level</div>
                  <div className="space-y-2">
                    {['invisible', 'minimal', 'academic_only'].map(level => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="visibilityLevel" 
                          value={level}
                          checked={data.ghostMode.visibilityLevel === level}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-hive-text-secondary capitalize">{level.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Insights */}
          {data.insights.recommendation && (
            <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold">
                  💡
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-hive-text-primary mb-2">Privacy Insights</h4>
                  <p className="text-hive-text-secondary mb-4">{data.insights.recommendation}</p>
                  
                  {data.insights.vulnerabilities.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm font-medium text-hive-status-warning mb-2">⚠️ Potential Vulnerabilities</div>
                      {data.insights.vulnerabilities.map((vuln, index) => (
                        <div key={index} className="text-sm text-hive-text-secondary">• {vuln}</div>
                      ))}
                    </div>
                  )}
                  
                  {data.insights.improvements.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-hive-status-success mb-2">✨ Suggested Improvements</div>
                      {data.insights.improvements.map((improvement, index) => (
                        <div key={index} className="text-sm text-hive-text-secondary">• {improvement}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {selectedTab === 'settings' && (
        <div className="space-y-6">
          <div className="grid gap-6">
            {data.settings.map((setting) => (
              <div key={setting.id} className="p-6 bg-hive-background-primary border border-hive-border-default rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-hive-brand-secondary/10 rounded-xl flex items-center justify-center text-xl">
                      {getCategoryIcon(setting.category)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-hive-text-primary">{setting.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full bg-${getLevelColor(setting.level)}/10 text-${getLevelColor(setting.level)}`}>
                          {getLevelIcon(setting.level)} {setting.level}
                        </span>
                        {setting.impact === 'high' && (
                          <span className="px-2 py-1 text-xs rounded-full bg-hive-status-error/10 text-hive-status-error">
                            High Impact
                          </span>
                        )}
                      </div>
                      
                      <p className="text-hive-text-secondary text-sm mb-3">{setting.description}</p>
                      
                      <div className="text-xs text-hive-text-tertiary">
                        <strong>Affects:</strong> {setting.affectedFeatures.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`
                      w-12 h-6 rounded-full transition-colors cursor-pointer
                      ${setting.enabled ? 'bg-hive-status-success' : 'bg-hive-background-secondary'}
                    `}>
                      <div className={`
                        w-5 h-5 bg-white rounded-full shadow transform transition-transform m-0.5
                        ${setting.enabled ? 'translate-x-6' : 'translate-x-0'}
                      `}></div>
                    </div>
                    <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors">
                      ⚙️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Usage Tab */}
      {selectedTab === 'data' && (
        <div className="space-y-6">
          <div className="grid gap-6">
            {data.dataUsage.map((usage, index) => (
              <div key={index} className="p-6 bg-hive-background-primary border border-hive-border-default rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-hive-text-primary">{usage.category}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        usage.sharing === 'none' ? 'bg-hive-status-success/10 text-hive-status-success' :
                        usage.sharing === 'anonymous' ? 'bg-hive-status-warning/10 text-hive-status-warning' :
                        'bg-hive-status-error/10 text-hive-status-error'
                      }`}>
                        {usage.sharing === 'none' ? '🔒 Not Shared' :
                         usage.sharing === 'anonymous' ? '👤 Anonymous' :
                         usage.sharing === 'aggregated' ? '📊 Aggregated' : '🆔 Identified'}
                      </span>
                    </div>
                    
                    <p className="text-hive-text-secondary text-sm mb-3">{usage.purpose}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong className="text-hive-text-primary">Retention:</strong>
                        <div className="text-hive-text-tertiary">{usage.retention}</div>
                      </div>
                      <div>
                        <strong className="text-hive-text-primary">Last Accessed:</strong>
                        <div className="text-hive-text-tertiary">{usage.lastAccessed || 'Never'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {usage.canDelete && (
                      <button className="px-3 py-1 bg-hive-status-error/10 text-hive-status-error border border-hive-status-error/20 rounded-lg hover:bg-hive-status-error/20 transition-colors text-sm">
                        Delete Data
                      </button>
                    )}
                    <button className="px-3 py-1 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors text-sm">
                      Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audit Tab */}
      {selectedTab === 'audit' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-text-primary">{data.audit.changesThisWeek}</div>
              <div className="text-sm text-hive-text-secondary">Changes This Week</div>
            </div>
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-2xl font-bold text-hive-status-success">{data.audit.dataRequests}</div>
              <div className="text-sm text-hive-text-secondary">Data Requests</div>
            </div>
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-sm font-bold text-hive-text-primary">Last Review</div>
              <div className="text-sm text-hive-text-secondary">{data.audit.lastReview}</div>
            </div>
          </div>

          <div className="bg-hive-background-primary border border-hive-border-default rounded-xl p-6">
            <h4 className="text-lg font-semibold text-hive-text-primary mb-4">Recent Privacy Activity</h4>
            <div className="space-y-4">
              {[
                { action: 'Ghost Mode disabled', time: '2 hours ago', type: 'setting' },
                { action: 'Location sharing updated to Private', time: '3 days ago', type: 'setting' },
                { action: 'Privacy review completed', time: '2 weeks ago', type: 'review' },
                { action: 'Data export requested', time: '1 month ago', type: 'data' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg">
                  <div className="w-2 h-2 bg-hive-brand-secondary rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-hive-text-primary">{activity.action}</div>
                    <div className="text-xs text-hive-text-tertiary">{activity.time}</div>
                  </div>
                  <div className={`px-2 py-1 text-xs rounded-full ${
                    activity.type === 'setting' ? 'bg-hive-brand-secondary/10 text-hive-brand-secondary' :
                    activity.type === 'review' ? 'bg-hive-status-success/10 text-hive-status-success' :
                    'bg-hive-status-warning/10 text-hive-status-warning'
                  }`}>
                    {activity.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const PrivacyControlSystem: Story = {
  name: '🔒 Privacy Control Widget with Focus',
  render: () => {
    const { focusedWidget, isTransitioning, enterFocus, exitFocus } = useFocusMode();

    const demoData: PrivacyWidgetData = {
      ghostMode: {
        enabled: false,
        duration: 'Until manually disabled',
        exemptions: {
          spaces: ['CS Study Group'],
          emergencyContacts: ['Campus Security', 'RA'],
          academicEvents: true
        },
        visibilityLevel: 'minimal'
      },
      privacyScore: 85,
      settings: [
        {
          id: 'profile-visibility',
          category: 'profile',
          name: 'Profile Visibility',
          description: 'Control who can see your profile information and social presence',
          level: 'connections',
          enabled: true,
          affectedFeatures: ['Profile page', 'Search results', 'Connection suggestions'],
          impact: 'medium'
        },
        {
          id: 'activity-sharing',
          category: 'activity',
          name: 'Activity Sharing',
          description: 'Share your current activities, status, and coordination participation',
          level: 'spaces',
          enabled: true,
          affectedFeatures: ['Status indicators', 'Activity feed', 'Space coordination'],
          impact: 'low'
        },
        {
          id: 'location-sharing',
          category: 'location',
          name: 'Location Sharing',
          description: 'Share your current location for event coordination and meetups',
          level: 'private',
          enabled: false,
          affectedFeatures: ['Event coordination', 'Study group meetups', 'Emergency contacts'],
          impact: 'high'
        },
        {
          id: 'social-graph',
          category: 'social',
          name: 'Connection Visibility',
          description: 'Control who can see your connections and social network',
          level: 'connections',
          enabled: true,
          affectedFeatures: ['Connection suggestions', 'Social recommendations', 'Network analysis'],
          impact: 'medium'
        },
        {
          id: 'data-analytics',
          category: 'data',
          name: 'Anonymous Analytics',
          description: 'Allow anonymous usage data to improve HIVE platform features',
          level: 'public',
          enabled: true,
          affectedFeatures: ['Platform improvements', 'Feature recommendations'],
          impact: 'low'
        }
      ],
      dataUsage: [
        {
          category: 'Profile Data',
          purpose: 'Identity verification, connections, and profile customization',
          sharing: 'none',
          retention: '2 years after graduation',
          canDelete: true,
          lastAccessed: '2 hours ago'
        },
        {
          category: 'Activity Data',
          purpose: 'Space coordination, activity recommendations, and social matching',
          sharing: 'aggregated',
          retention: '1 year',
          canDelete: true,
          lastAccessed: '5 minutes ago'
        },
        {
          category: 'Academic Data',
          purpose: 'Study group matching, academic tool recommendations, and course alignment',
          sharing: 'anonymous',
          retention: 'End of current semester',
          canDelete: false,
          lastAccessed: '1 hour ago'
        },
        {
          category: 'Usage Analytics',
          purpose: 'Platform improvement and feature development',
          sharing: 'anonymous',
          retention: '6 months',
          canDelete: true,
          lastAccessed: '30 minutes ago'
        }
      ],
      insights: {
        recommendation: 'Your privacy settings provide excellent balance between coordination effectiveness and personal privacy',
        vulnerabilities: [
          'Location sharing disabled may reduce effectiveness of study group coordination',
          'Consider enabling limited location sharing for trusted academic spaces'
        ],
        improvements: [
          'Enable location sharing for CS Study Group to improve meetup coordination',
          'Review data retention periods - some can be shortened for better privacy'
        ]
      },
      audit: {
        lastReview: '2 weeks ago',
        changesThisWeek: 2,
        dataRequests: 0
      }
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Privacy Control Widget System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Ghost Mode and granular privacy management with transparency controls and comprehensive data governance
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Interactive Demo</h2>
            <p className="text-hive-text-secondary">Click the widget below to experience the Expand & Focus interaction</p>
            
            <div className="flex justify-center">
              <div className="w-80 h-80">
                <PrivacyWidget 
                  data={demoData}
                  onFocus={() => enterFocus('privacy')}
                />
              </div>
            </div>
          </div>

          {/* Feature Overview */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Ghost Mode</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Complete Invisibility</strong>: One-click privacy protection</div>
                  <div>• <strong>Smart Exemptions</strong>: Academic events and emergency contacts</div>
                  <div>• <strong>Visibility Levels</strong>: Invisible, minimal, or academic-only</div>
                  <div>• <strong>Temporary Modes</strong>: Time-based or manual control</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Granular Controls</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Category-Based Settings</strong>: Profile, activity, location, social</div>
                  <div>• <strong>Impact Awareness</strong>: Clear feature impact indicators</div>
                  <div>• <strong>Privacy Levels</strong>: Public, connections, spaces, private</div>
                  <div>• <strong>Feature Integration</strong>: Shows affected platform features</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Focus Mode Experience</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Privacy Dashboard</strong>: Complete privacy overview and scoring</div>
                  <div>• <strong>Data Transparency</strong>: Detailed data usage and sharing info</div>
                  <div>• <strong>Audit Trail</strong>: Complete history of privacy changes</div>
                  <div>• <strong>Smart Insights</strong>: AI-powered privacy recommendations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Mode Overlay */}
        <FocusOverlay
          isOpen={focusedWidget === 'privacy'}
          onClose={exitFocus}
          title="Privacy Control - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <PrivacyFocusContent data={demoData} />
        </FocusOverlay>
      </div>
    );
  }
};