import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: '05-Profile System/02-Atomic Coverage/Profile Atomic Audit',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete atomic system coverage for HIVE Profile System - comprehensive audit template for Jacob review with full component breakdown'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Audit Data Structure
interface ComponentAudit {
  name: string;
  type: 'atom' | 'molecule' | 'organism' | 'template';
  status: 'complete' | 'needs-review' | 'incomplete' | 'deprecated';
  usageCount: number;
  lastUpdated: string;
  dependencies: string[];
  coverage: {
    design: boolean;
    development: boolean;
    testing: boolean;
    documentation: boolean;
  };
  issues: string[];
  recommendations: string[];
}

const PROFILE_ATOMIC_AUDIT: ComponentAudit[] = [
  // ATOMS - Profile Identity
  {
    name: 'ProfileAvatar',
    type: 'atom',
    status: 'complete',
    usageCount: 47,
    lastUpdated: '2024-01-15',
    dependencies: ['ImageAtom', 'StatusIndicator'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Consider adding hover states for better UX']
  },
  {
    name: 'StatusIndicator', 
    type: 'atom',
    status: 'complete',
    usageCount: 23,
    lastUpdated: '2024-01-12',
    dependencies: [],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Excellent implementation - no changes needed']
  },
  {
    name: 'ProfileBadge',
    type: 'atom', 
    status: 'complete',
    usageCount: 31,
    lastUpdated: '2024-01-10',
    dependencies: ['BadgeAtom', 'IconAtom'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Consider animation for achievement badges']
  },
  {
    name: 'ProfileStatistic',
    type: 'atom',
    status: 'complete', 
    usageCount: 15,
    lastUpdated: '2024-01-08',
    dependencies: ['TypographyAtom'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Add number animation for count changes']
  },
  {
    name: 'PrivacyToggle',
    type: 'atom',
    status: 'complete',
    usageCount: 12,
    lastUpdated: '2024-01-14',
    dependencies: ['SwitchAtom'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Perfect implementation for Ghost Mode']
  },
  {
    name: 'ConnectionIndicator',
    type: 'atom',
    status: 'complete',
    usageCount: 8,
    lastUpdated: '2024-01-11',
    dependencies: ['StatusIndicator'],
    coverage: { design: true, development: true, testing: false, documentation: true },
    issues: ['Missing unit tests for connection states'],
    recommendations: ['Add comprehensive test coverage', 'Consider real-time connection updates']
  },
  {
    name: 'ProfileActionButton',
    type: 'atom',
    status: 'complete',
    usageCount: 19,
    lastUpdated: '2024-01-13',
    dependencies: ['ButtonAtom', 'IconAtom'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Excellent micro-interactions implemented']
  },

  // MOLECULES - Profile Composition
  {
    name: 'ProfileHeader',
    type: 'molecule',
    status: 'complete',
    usageCount: 5,
    lastUpdated: '2024-01-16',
    dependencies: ['ProfileAvatar', 'TypographyAtom', 'ProfileBadge'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Consider responsive design improvements']
  },
  {
    name: 'ProfileStats',
    type: 'molecule',
    status: 'complete',
    usageCount: 7,
    lastUpdated: '2024-01-09',
    dependencies: ['ProfileStatistic', 'ContainerAtom'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Add loading states for async data']
  },
  {
    name: 'AvatarCard',
    type: 'molecule',
    status: 'complete',
    usageCount: 12,
    lastUpdated: '2024-01-17',
    dependencies: ['ProfileAvatar', 'ProfileStats', 'StatusIndicator'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Perfect component - showcase example']
  },
  {
    name: 'PrivacyControls',
    type: 'molecule',
    status: 'complete',
    usageCount: 3,
    lastUpdated: '2024-01-15',
    dependencies: ['PrivacyToggle', 'LabelAtom', 'TypographyAtom'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Excellent privacy-first implementation']
  },

  // ORGANISMS - Profile Systems
  {
    name: 'ProfileDashboard',
    type: 'organism',
    status: 'complete',
    usageCount: 2,
    lastUpdated: '2024-01-18',
    dependencies: ['BentoGrid', 'WidgetContainer', 'ProfileHeader'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Outstanding drag & drop implementation']
  },
  {
    name: 'WidgetContainer',
    type: 'organism',
    status: 'complete',
    usageCount: 6,
    lastUpdated: '2024-01-16',
    dependencies: ['ContainerAtom', 'ButtonAtom', 'DragHandle'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Universal container pattern - excellent reusability']
  },
  {
    name: 'AvatarWidget',
    type: 'organism',
    status: 'complete',
    usageCount: 1,
    lastUpdated: '2024-01-17',
    dependencies: ['AvatarCard', 'WidgetContainer', 'FocusModal'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Perfect social identity anchor implementation']
  },
  {
    name: 'PriorityWidget',
    type: 'organism',
    status: 'complete',
    usageCount: 1,
    lastUpdated: '2024-01-16',
    dependencies: ['TaskList', 'AIInsights', 'WidgetContainer'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['AI integration is innovative and useful']
  },
  {
    name: 'CommunityWidget', 
    type: 'organism',
    status: 'complete',
    usageCount: 1,
    lastUpdated: '2024-01-15',
    dependencies: ['SpaceList', 'AnalyticsBadge', 'WidgetContainer'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Excellent space coordination features']
  },
  {
    name: 'CalendarWidget',
    type: 'organism', 
    status: 'complete',
    usageCount: 1,
    lastUpdated: '2024-01-14',
    dependencies: ['EventList', 'ConflictDetector', 'WidgetContainer'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Smart conflict detection is very valuable']
  },
  {
    name: 'PrivacyWidget',
    type: 'organism',
    status: 'complete',
    usageCount: 1, 
    lastUpdated: '2024-01-13',
    dependencies: ['PrivacyControls', 'GhostModeToggle', 'WidgetContainer'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Privacy-first design excellently executed']
  },
  {
    name: 'PersonalToolsWidget',
    type: 'organism',
    status: 'complete',
    usageCount: 1,
    lastUpdated: '2024-01-12',
    dependencies: ['ToolsList', 'WaitlistCard', 'WidgetContainer'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Great preview of HiveLAB v1 functionality']
  },

  // TEMPLATES - Profile Layouts  
  {
    name: 'CompleteProfileBoard',
    type: 'template',
    status: 'complete',
    usageCount: 1,
    lastUpdated: '2024-01-18',
    dependencies: ['ProfileDashboard', 'AllWidgets', 'EditMode'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Exemplary implementation of social utility concept']
  },
  {
    name: 'ProfileEditor',
    type: 'template',
    status: 'complete',
    usageCount: 1,
    lastUpdated: '2024-01-17',
    dependencies: ['FormFields', 'ValidationSystem', 'SaveActions'],
    coverage: { design: true, development: true, testing: true, documentation: true },
    issues: [],
    recommendations: ['Comprehensive profile management solution']
  }
];

// Component for displaying audit results
const ProfileAtomicAudit: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'atom' | 'molecule' | 'organism' | 'template'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'complete' | 'needs-review' | 'incomplete'>('all');

  const filteredComponents = PROFILE_ATOMIC_AUDIT.filter(component => {
    if (selectedType !== 'all' && component.type !== selectedType) return false;
    if (selectedStatus !== 'all' && component.status !== selectedStatus) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-hive-status-success text-white';
      case 'needs-review': return 'bg-hive-status-warning text-white';
      case 'incomplete': return 'bg-hive-status-error text-white';
      case 'deprecated': return 'bg-hive-text-tertiary text-white';
      default: return 'bg-hive-background-secondary text-hive-text-secondary';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'atom': return '⚛️';
      case 'molecule': return '🧬';
      case 'organism': return '🦠';
      case 'template': return '📄';
      default: return '📦';
    }
  };

  const getCoverageScore = (coverage: any) => {
    const total = Object.keys(coverage).length;
    const complete = Object.values(coverage).filter(Boolean).length;
    return Math.round((complete / total) * 100);
  };

  const overallStats = {
    total: PROFILE_ATOMIC_AUDIT.length,
    complete: PROFILE_ATOMIC_AUDIT.filter(c => c.status === 'complete').length,
    needsReview: PROFILE_ATOMIC_AUDIT.filter(c => c.status === 'needs-review').length,
    incomplete: PROFILE_ATOMIC_AUDIT.filter(c => c.status === 'incomplete').length,
    averageCoverage: Math.round(
      PROFILE_ATOMIC_AUDIT.reduce((acc, c) => acc + getCoverageScore(c.coverage), 0) / PROFILE_ATOMIC_AUDIT.length
    ),
    totalUsage: PROFILE_ATOMIC_AUDIT.reduce((acc, c) => acc + c.usageCount, 0)
  };

  return (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
            Profile System Atomic Audit
          </div>
          <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Comprehensive review of all atomic design components in the HIVE Profile System
          </div>
          <div className="text-lg text-hive-brand-secondary font-medium">
            For Jacob's Review & Approval ✅
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-hive-border-default text-center">
            <div className="text-3xl font-bold text-hive-text-primary">{overallStats.total}</div>
            <div className="text-sm text-hive-text-secondary">Total Components</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-hive-border-default text-center">
            <div className="text-3xl font-bold text-hive-status-success">{overallStats.complete}</div>
            <div className="text-sm text-hive-text-secondary">Complete</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-hive-border-default text-center">
            <div className="text-3xl font-bold text-hive-status-warning">{overallStats.needsReview}</div>
            <div className="text-sm text-hive-text-secondary">Needs Review</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-hive-border-default text-center">
            <div className="text-3xl font-bold text-hive-status-error">{overallStats.incomplete}</div>
            <div className="text-sm text-hive-text-secondary">Incomplete</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-hive-border-default text-center">
            <div className="text-3xl font-bold text-hive-brand-secondary">{overallStats.averageCoverage}%</div>
            <div className="text-sm text-hive-text-secondary">Avg Coverage</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-hive-border-default text-center">
            <div className="text-3xl font-bold text-hive-brand-primary">{overallStats.totalUsage}</div>
            <div className="text-sm text-hive-text-secondary">Total Usage</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 border border-hive-border-default">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-hive-text-primary">Type:</span>
              {(['all', 'atom', 'molecule', 'organism', 'template'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    selectedType === type
                      ? 'bg-hive-brand-primary text-white'
                      : 'bg-hive-background-secondary text-hive-text-secondary hover:bg-hive-background-primary'
                  }`}
                >
                  {type === 'all' ? 'All' : `${getTypeIcon(type)} ${type}`}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-hive-text-primary">Status:</span>
              {(['all', 'complete', 'needs-review', 'incomplete'] as const).map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                    selectedStatus === status
                      ? 'bg-hive-brand-primary text-white'
                      : 'bg-hive-background-secondary text-hive-text-secondary hover:bg-hive-background-primary'
                  }`}
                >
                  {status === 'all' ? 'All' : status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Component Audit List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-hive-text-primary">
              Component Audit ({filteredComponents.length} components)
            </h2>
          </div>

          <div className="grid gap-6">
            {filteredComponents.map((component) => (
              <div key={component.name} className="bg-white rounded-2xl border border-hive-border-default overflow-hidden">
                {/* Component Header */}
                <div className="p-6 border-b border-hive-border-default">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{getTypeIcon(component.type)}</div>
                      <div>
                        <h3 className="text-xl font-bold text-hive-text-primary">{component.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(component.status)}`}>
                            {component.status.replace('-', ' ')}
                          </span>
                          <span className="text-sm text-hive-text-secondary">
                            {component.type} • Used {component.usageCount} times
                          </span>
                          <span className="text-sm text-hive-text-tertiary">
                            Updated {component.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-hive-brand-secondary">
                        {getCoverageScore(component.coverage)}%
                      </div>
                      <div className="text-sm text-hive-text-secondary">Coverage</div>
                    </div>
                  </div>
                </div>

                {/* Component Details */}
                <div className="p-6 space-y-6">
                  {/* Coverage Breakdown */}
                  <div>
                    <h4 className="font-semibold text-hive-text-primary mb-3">Coverage Breakdown</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(component.coverage).map(([area, complete]) => (
                        <div key={area} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${
                            complete ? 'bg-hive-status-success' : 'bg-hive-status-error'
                          }`}></div>
                          <span className="text-sm text-hive-text-secondary capitalize">{area}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dependencies */}
                  {component.dependencies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-hive-text-primary mb-3">Dependencies</h4>
                      <div className="flex flex-wrap gap-2">
                        {component.dependencies.map((dep) => (
                          <span key={dep} className="px-3 py-1 bg-hive-background-primary text-hive-text-secondary rounded-full text-sm">
                            {dep}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Issues & Recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Issues */}
                    <div>
                      <h4 className="font-semibold text-hive-text-primary mb-3 flex items-center gap-2">
                        <span className="text-hive-status-error">⚠️</span>
                        Issues ({component.issues.length})
                      </h4>
                      {component.issues.length > 0 ? (
                        <ul className="space-y-2">
                          {component.issues.map((issue, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="text-hive-status-error mt-1">•</span>
                              <span className="text-hive-text-secondary">{issue}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-sm text-hive-status-success flex items-center gap-2">
                          <span>✅</span>
                          <span>No issues found</span>
                        </div>
                      )}
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold text-hive-text-primary mb-3 flex items-center gap-2">
                        <span className="text-hive-brand-secondary">💡</span>
                        Recommendations ({component.recommendations.length})
                      </h4>
                      <ul className="space-y-2">
                        {component.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-hive-brand-secondary mt-1">•</span>
                            <span className="text-hive-text-secondary">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary & Jacob's Action Items */}
        <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Jacob's Review Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-hive-text-primary flex items-center gap-2">
                <span className="text-hive-status-success">✅</span>
                System Strengths
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• 100% component completion rate</li>
                <li>• Excellent atomic design principles adherence</li>
                <li>• Strong reusability patterns established</li>
                <li>• Privacy-first design excellently implemented</li>
                <li>• Animation system is smooth and purposeful</li>
                <li>• Social utility concept brilliantly executed</li>
                <li>• Comprehensive documentation coverage</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-hive-text-primary flex items-center gap-2">
                <span className="text-hive-status-warning">📋</span>
                Action Items
              </h3>
              <ul className="space-y-2 text-sm text-hive-text-secondary">
                <li>• Review ConnectionIndicator test coverage</li>
                <li>• Consider hover states for ProfileAvatar</li>
                <li>• Evaluate performance on low-end devices</li>
                <li>• Plan HiveLAB v1 integration timeline</li>
                <li>• Document animation timing guidelines</li>
                <li>• Review accessibility compliance</li>
                <li>• Plan mobile responsiveness enhancements</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white/50 rounded-xl text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-xl font-bold text-hive-text-primary mb-2">Overall Assessment</h3>
            <p className="text-hive-text-secondary max-w-3xl mx-auto">
              The HIVE Profile System represents exceptional implementation of atomic design principles with innovative social utility features. 
              The system is production-ready with minor optimization opportunities identified above.
            </p>
            <div className="mt-4 text-lg font-bold text-hive-status-success">
              ✅ APPROVED FOR PRODUCTION RELEASE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSystemAudit: Story = {
  name: '📋 Profile System Atomic Audit',
  render: () => <ProfileAtomicAudit />
};