"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  Calendar,
  Target,
  TrendingUp,
  Layers,
  Zap,
  Shield,
  Code,
  Smartphone,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { Button, Card, Badge } from "@hive/ui";

// Types for the plan system
interface PlanItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned' | 'blocked';
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'auth' | 'design' | 'features' | 'infrastructure' | 'polish';
  dueDate?: string;
  blockers?: string[];
  dependencies?: string[];
  effort: 'small' | 'medium' | 'large' | 'epic';
}

interface RoadmapPhase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  startDate: string;
  endDate: string;
  goals: string[];
  items: PlanItem[];
}

// Platform update data
const currentSprintItems: PlanItem[] = [
  {
    id: 'merge-conflicts',
    title: 'Resolve Git Merge Conflicts',
    description: 'Clean up conflicting auth/onboarding implementations between HEAD and main branches',
    status: 'blocked',
    priority: 'critical',
    category: 'infrastructure',
    effort: 'small',
    blockers: ['Need to choose between two auth approaches']
  },
  {
    id: 'onboarding-api',
    title: 'Complete Onboarding API Integration',
    description: 'Connect onboarding bridge to real backend endpoints',
    status: 'in-progress',
    priority: 'critical',
    category: 'auth',
    effort: 'medium',
    dependencies: ['merge-conflicts']
  },
  {
    id: 'design-audit',
    title: 'Frontend Design Consistency Audit',
    description: 'Ensure all components follow HIVE design system guidelines',
    status: 'in-progress',
    priority: 'high',
    category: 'design',
    effort: 'medium'
  },
  {
    id: 'mobile-optimization',
    title: 'Mobile Experience Polish',
    description: 'Optimize touch interactions and responsive layouts',
    status: 'planned',
    priority: 'high',
    category: 'polish',
    effort: 'large'
  }
];

const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'phase-1',
    name: 'Foundation Stabilization',
    description: 'Resolve technical debt and ensure solid auth/onboarding flow',
    status: 'active',
    startDate: '2025-01-18',
    endDate: '2025-01-25',
    goals: [
      'Clean auth/onboarding implementation',
      'Design system consistency',
      'Mobile-first optimization',
      'End-to-end testing'
    ],
    items: currentSprintItems
  },
  {
    id: 'phase-2',
    name: 'Core Platform Features',
    description: 'Build out spaces, feed, and profile functionality',
    status: 'upcoming',
    startDate: '2025-01-26',
    endDate: '2025-02-15',
    goals: [
      'Complete spaces system',
      'Social feed implementation',
      'Profile dashboard',
      'Real-time features'
    ],
    items: [
      {
        id: 'spaces-system',
        title: 'Complete Spaces System',
        description: 'Build full spaces creation, joining, and management',
        status: 'planned',
        priority: 'critical',
        category: 'features',
        effort: 'epic'
      },
      {
        id: 'social-feed',
        title: 'Social Feed Implementation',
        description: 'Activity feed with posts, interactions, and discovery',
        status: 'planned',
        priority: 'high',
        category: 'features',
        effort: 'large'
      },
      {
        id: 'realtime-system',
        title: 'Real-time Updates',
        description: 'Live notifications and activity updates',
        status: 'planned',
        priority: 'medium',
        category: 'infrastructure',
        effort: 'large'
      }
    ]
  },
  {
    id: 'phase-3',
    name: 'Tools & Builder Platform',
    description: 'Enable student tool creation and sharing',
    status: 'upcoming',
    startDate: '2025-02-16',
    endDate: '2025-03-15',
    goals: [
      'Visual tool builder',
      'Tool marketplace',
      'Community sharing',
      'Builder permissions'
    ],
    items: [
      {
        id: 'tool-builder',
        title: 'Visual Tool Builder',
        description: 'Drag-and-drop interface for creating campus tools',
        status: 'planned',
        priority: 'critical',
        category: 'features',
        effort: 'epic'
      },
      {
        id: 'tool-marketplace',
        title: 'Tool Discovery & Sharing',
        description: 'Browse, install, and share student-created tools',
        status: 'planned',
        priority: 'high',
        category: 'features',
        effort: 'large'
      }
    ]
  },
  {
    id: 'phase-4',
    name: 'Platform Scale & Polish',
    description: 'Performance optimization and advanced features',
    status: 'upcoming',
    startDate: '2025-03-16',
    endDate: '2025-04-15',
    goals: [
      'Performance optimization',
      'Advanced analytics',
      'Multi-campus support',
      'Beta launch preparation'
    ],
    items: [
      {
        id: 'performance-opt',
        title: 'Performance Optimization',
        description: 'Code splitting, lazy loading, and caching strategies',
        status: 'planned',
        priority: 'high',
        category: 'infrastructure',
        effort: 'large'
      },
      {
        id: 'multi-campus',
        title: 'Multi-Campus Architecture',
        description: 'Scale beyond UB to support multiple universities',
        status: 'planned',
        priority: 'medium',
        category: 'infrastructure',
        effort: 'epic'
      }
    ]
  }
];

const designSystemUpdates = [
  {
    title: 'Gold Accent Consistency',
    description: 'Enforce strategic gold usage across all components',
    status: 'in-progress',
    impact: 'Brand consistency and visual hierarchy'
  },
  {
    title: 'Motion Standardization',
    description: 'Apply HIVE motion curve (cubic-bezier(0.33, 0.65, 0, 1)) everywhere',
    status: 'planned',
    impact: 'Cohesive user experience'
  },
  {
    title: 'Mobile Touch Optimization',
    description: 'Ensure all interactive elements meet 44px minimum touch targets',
    status: 'planned',
    impact: 'Mobile usability'
  },
  {
    title: 'Campus Energy Adaptation',
    description: 'Interface adapts to student life cycles (study vs social periods)',
    status: 'planned',
    impact: 'Contextual user experience'
  }
];

export default function PlanPage() {
  const [activePhase, setActivePhase] = useState<string>('phase-1');
  const [showDesignUpdates, setShowDesignUpdates] = useState(false);
  const [filter, setFilter] = useState<'all' | 'critical' | 'blocked'>('all');

  const getStatusIcon = (status: PlanItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[var(--hive-status-success)]" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-[var(--hive-brand-primary)]" />;
      case 'blocked':
        return <AlertTriangle className="w-5 h-5 text-[var(--hive-status-error)]" />;
      default:
        return <Circle className="w-5 h-5 text-[var(--hive-text-muted)]" />;
    }
  };

  const getPriorityColor = (priority: PlanItem['priority']) => {
    switch (priority) {
      case 'critical':
        return 'destructive';
      case 'high':
        return 'warning';
      case 'medium':
        return 'success';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getCategoryIcon = (category: PlanItem['category']) => {
    switch (category) {
      case 'auth':
        return <Shield className="w-4 h-4" />;
      case 'design':
        return <Layers className="w-4 h-4" />;
      case 'features':
        return <Sparkles className="w-4 h-4" />;
      case 'infrastructure':
        return <Code className="w-4 h-4" />;
      case 'polish':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const filteredCurrentItems = currentSprintItems.filter(item => {
    if (filter === 'critical') return item.priority === 'critical';
    if (filter === 'blocked') return item.status === 'blocked';
    return true;
  });

  const _currentPhase = roadmapPhases.find(phase => phase.status === 'active');
  const _upcomingPhases = roadmapPhases.filter(phase => phase.status === 'upcoming');

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      {/* Header */}
      <motion.div 
        className="border-b border-[var(--hive-border-primary)]/20 backdrop-blur-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-2">
                Platform Roadmap
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                Building the future of campus coordination at UB
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" size="lg">
                vBETA
              </Badge>
              <Button variant="secondary" size="md" onClick={() => setShowDesignUpdates(!showDesignUpdates)}>
                {showDesignUpdates ? 'Hide' : 'Show'} Design Updates
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* Current Sprint Status */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-2">
                Current Sprint: Foundation Stabilization
              </h2>
              <p className="text-[var(--hive-text-secondary)]">
                Week of January 18-25, 2025 • Focus: Auth/Onboarding + Design Polish
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'premium' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'critical' ? 'premium' : 'ghost'}
                size="sm"
                onClick={() => setFilter('critical')}
              >
                Critical
              </Button>
              <Button
                variant={filter === 'blocked' ? 'premium' : 'ghost'}
                size="sm"
                onClick={() => setFilter('blocked')}
              >
                Blocked
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredCurrentItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {getStatusIcon(item.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(item.category)}
                            <Badge variant={getPriorityColor(item.priority)} size="sm">
                              {item.priority}
                            </Badge>
                            <Badge variant="secondary" size="sm">
                              {item.effort}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-[var(--hive-text-secondary)] mb-3">
                          {item.description}
                        </p>
                        {item.blockers && item.blockers.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-[var(--hive-status-error)]">
                              Blockers:
                            </h4>
                            <ul className="list-disc list-inside text-sm text-[var(--hive-text-secondary)]">
                              {item.blockers.map((blocker, i) => (
                                <li key={i}>{blocker}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-[var(--hive-text-muted)] capitalize">
                        {item.status.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Design System Updates */}
        <AnimatePresence>
          {showDesignUpdates && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">
                Design System Updates
              </h2>
              <div className="grid gap-4">
                {designSystemUpdates.map((update, index) => (
                  <motion.div
                    key={update.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card variant="default" className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                              {update.title}
                            </h3>
                            <Badge 
                              variant={update.status === 'in-progress' ? 'warning' : 'secondary'} 
                              size="sm"
                            >
                              {update.status.replace('-', ' ')}
                            </Badge>
                          </div>
                          <p className="text-[var(--hive-text-secondary)] mb-2">
                            {update.description}
                          </p>
                          <div className="text-sm text-[var(--hive-text-muted)]">
                            <strong>Impact:</strong> {update.impact}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Roadmap Phases */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-[var(--hive-text-primary)] mb-6">
            Development Roadmap
          </h2>
          
          <div className="space-y-6">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card 
                  variant={phase.status === 'active' ? 'gold-accent' : 'elevated'} 
                  className="p-6"
                >
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setActivePhase(activePhase === phase.id ? '' : phase.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        phase.status === 'completed' ? 'bg-[var(--hive-status-success)]/20' :
                        phase.status === 'active' ? 'bg-[var(--hive-brand-primary)]/20' :
                        'bg-[var(--hive-background-tertiary)]/20'
                      }`}>
                        {phase.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-[var(--hive-status-success)]" />
                        ) : phase.status === 'active' ? (
                          <TrendingUp className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                        ) : (
                          <Calendar className="w-5 h-5 text-[var(--hive-text-muted)]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--hive-text-primary)]">
                          {phase.name}
                        </h3>
                        <p className="text-[var(--hive-text-secondary)]">
                          {phase.description}
                        </p>
                        <div className="text-sm text-[var(--hive-text-muted)] mt-1">
                          {phase.startDate} → {phase.endDate}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={
                          phase.status === 'completed' ? 'success' :
                          phase.status === 'active' ? 'warning' : 'secondary'
                        }
                        size="lg"
                      >
                        {phase.status}
                      </Badge>
                      {activePhase === phase.id ? (
                        <ChevronDown className="w-5 h-5 text-[var(--hive-text-muted)]" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-[var(--hive-text-muted)]" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {activePhase === phase.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-[var(--hive-border-primary)]/20"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-3">
                              Phase Goals
                            </h4>
                            <ul className="space-y-2">
                              {phase.goals.map((goal, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <Target className="w-4 h-4 text-[var(--hive-brand-primary)]" />
                                  <span className="text-[var(--hive-text-secondary)]">{goal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-3">
                              Key Items ({phase.items.length})
                            </h4>
                            <div className="space-y-2">
                              {phase.items.slice(0, 3).map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                  {getStatusIcon(item.status)}
                                  <span className="text-[var(--hive-text-secondary)] text-sm">
                                    {item.title}
                                  </span>
                                </div>
                              ))}
                              {phase.items.length > 3 && (
                                <div className="text-sm text-[var(--hive-text-muted)]">
                                  +{phase.items.length - 3} more items
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Metrics */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card variant="elevated" className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--hive-status-success)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-[var(--hive-status-success)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--hive-text-primary)] mb-1">
              {currentSprintItems.filter(item => item.status === 'completed').length}
            </div>
            <div className="text-[var(--hive-text-secondary)]">Completed</div>
          </Card>

          <Card variant="elevated" className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-[var(--hive-brand-primary)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--hive-text-primary)] mb-1">
              {currentSprintItems.filter(item => item.status === 'in-progress').length}
            </div>
            <div className="text-[var(--hive-text-secondary)]">In Progress</div>
          </Card>

          <Card variant="elevated" className="p-6 text-center">
            <div className="w-12 h-12 bg-[var(--hive-status-error)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-[var(--hive-status-error)]" />
            </div>
            <div className="text-2xl font-bold text-[var(--hive-text-primary)] mb-1">
              {currentSprintItems.filter(item => item.status === 'blocked').length}
            </div>
            <div className="text-[var(--hive-text-secondary)]">Blocked</div>
          </Card>
        </motion.section>

        {/* Next Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card variant="announcement" className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-[var(--hive-brand-primary)]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                  Immediate Next Actions
                </h3>
                <ul className="space-y-2 text-[var(--hive-text-secondary)]">
                  <li>• Resolve merge conflicts between auth implementations</li>
                  <li>• Complete onboarding API integration and testing</li>
                  <li>• Audit design system compliance across all components</li>
                  <li>• Run end-to-end testing of complete user journey</li>
                </ul>
                <div className="mt-4">
                  <Button variant="premium" size="md">
                    Start Next Sprint Planning
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}