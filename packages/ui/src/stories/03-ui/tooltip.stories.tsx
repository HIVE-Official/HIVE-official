/**
 * HIVE Tooltip System
 * 
 * Luxury tooltips using HIVE design system:
 * - Glass morphism with backdrop blur
 * - Campus-contextual explanations
 * - Gold accent borders and shadows
 */

import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '../../components/ui/tooltip';
import { 
  HiveButton, 
  HiveCard, 
  HiveCardContent, 
  HiveBadge 
} from '../../components';
import { 
  Info, 
  HelpCircle, 
  Star, 
  Users, 
  Zap, 
  GraduationCap,
  Calendar,
  BookOpen,
  Settings,
  Shield,
  Crown
} from 'lucide-react';

const meta: Meta = {
  title: '03-UI/Tooltip System',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE luxury tooltip system for campus platform - glass morphism with campus-contextual explanations.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// HIVE Campus Navigation with Tooltips
const CampusNavigationTooltips = () => (
  <TooltipProvider>
    <div className="p-8 bg-[var(--hive-background-primary)] rounded-3xl space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] text-center">
        Campus Navigation with Tooltips
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <HiveButton variant="ghost" className="h-16 flex-col gap-2">
              <GraduationCap className="w-6 h-6" />
              <span className="text-sm">Academic</span>
            </HiveButton>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-medium">Academic Spaces</p>
              <p className="text-sm text-[var(--hive-text-muted)]">
                Study groups, course discussions, and academic collaboration spaces organized by major and department.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <HiveButton variant="ghost" className="h-16 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span className="text-sm">Social</span>
            </HiveButton>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-medium">Social Spaces</p>
              <p className="text-sm text-[var(--hive-text-muted)]">
                Campus communities, clubs, interest groups, and social activities. Connect with students who share your interests.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <HiveButton variant="ghost" className="h-16 flex-col gap-2">
              <Zap className="w-6 h-6" />
              <span className="text-sm">HiveLAB</span>
            </HiveButton>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-medium">HiveLAB Builder Console</p>
              <p className="text-sm text-[var(--hive-text-muted)]">
                Create custom tools and experiences for your spaces. Build everything from GPA calculators to event planners.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <HiveButton variant="ghost" className="h-16 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Events</span>
            </HiveButton>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <div className="space-y-2">
              <p className="font-medium">Campus Events</p>
              <p className="text-sm text-[var(--hive-text-muted)]">
                Discover upcoming events, workshops, and activities across campus. Auto-imported from university RSS feeds.
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  </TooltipProvider>
);

// HIVE Builder Status Tooltips
const BuilderStatusTooltips = () => (
  <TooltipProvider>
    <div className="p-8 bg-[var(--hive-background-primary)] rounded-3xl space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] text-center">
        Builder Status System
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center space-y-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-16 h-16 bg-[var(--hive-background-secondary)] rounded-2xl flex items-center justify-center mx-auto border border-[var(--hive-border-subtle)] cursor-help">
                <span className="text-2xl">🌱</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium text-[var(--hive-brand-primary)]">Novice Builder</p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  Just getting started! Can use personal tools and explore spaces. Complete onboarding to unlock more features.
                </p>
                <div className="text-xs text-[var(--hive-text-muted)] pt-1 border-t border-[var(--hive-border-subtle)]">
                  Next: Create your first tool
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm text-[var(--hive-text-secondary)]">Novice</span>
        </div>
        
        <div className="text-center space-y-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--hive-status-info)]/20 to-[var(--hive-status-info)]/10 rounded-2xl flex items-center justify-center mx-auto border border-[var(--hive-status-info)]/30 cursor-help">
                <span className="text-2xl">⚡</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium text-[var(--hive-status-info)]">Intermediate Builder</p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  Making progress! Can create personal tools and use space tools. Building experience with campus platform.
                </p>
                <div className="text-xs text-[var(--hive-text-muted)] pt-1 border-t border-[var(--hive-border-subtle)]">
                  Next: Contribute to space tools
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm text-[var(--hive-text-secondary)]">Intermediate</span>
        </div>
        
        <div className="text-center space-y-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-primary)]/10 rounded-2xl flex items-center justify-center mx-auto border border-[var(--hive-brand-primary)]/30 cursor-help shadow-lg shadow-[var(--hive-shadow-gold-glow)]">
                <Star className="w-8 h-8 text-[var(--hive-brand-primary)]" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium text-[var(--hive-brand-primary)]">Advanced Builder</p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  Campus power user! Can create space tools, rituals, and complex workflows. Trusted community contributor.
                </p>
                <div className="text-xs text-[var(--hive-text-muted)] pt-1 border-t border-[var(--hive-border-subtle)]">
                  Next: Mentor other builders
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm text-[var(--hive-text-secondary)]">Advanced</span>
        </div>
        
        <div className="text-center space-y-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-primary)]/60 rounded-2xl flex items-center justify-center mx-auto cursor-help shadow-xl shadow-[var(--hive-shadow-gold-glow)]">
                <Crown className="w-8 h-8 text-[var(--hive-background-primary)]" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium text-[var(--hive-brand-primary)]">Expert Builder</p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  HIVE master! Unlimited access to all features. Can moderate spaces and access admin functions. True campus leader.
                </p>
                <div className="text-xs text-[var(--hive-text-muted)] pt-1 border-t border-[var(--hive-border-subtle)]">
                  🏆 Maximum level achieved
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          <span className="text-sm text-[var(--hive-text-secondary)]">Expert</span>
        </div>
      </div>
    </div>
  </TooltipProvider>
);

// HIVE Academic Tool Tooltips
const AcademicToolTooltips = () => (
  <TooltipProvider>
    <HiveCard className="max-w-lg">
      <HiveCardContent className="space-y-6">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] text-center">
          Academic Tools Dashboard
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div 
                className="p-4 bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm rounded-xl border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BookOpen className="w-8 h-8 text-[var(--hive-brand-primary)] mx-auto mb-2" />
                <div className="text-center">
                  <div className="text-sm font-medium text-[var(--hive-text-primary)]">GPA Calc</div>
                  <div className="text-xs text-[var(--hive-text-muted)]">v2.1</div>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium">GPA Calculator v2.1</p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  Smart academic planning tool with semester forecasting. Automatically imports course data and predicts outcomes.
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[var(--hive-border-subtle)]">
                  <HiveBadge variant="success" className="text-xs">Popular</HiveBadge>
                  <span className="text-xs text-[var(--hive-text-muted)]">Used by 847 students</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div 
                className="p-4 bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm rounded-xl border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Calendar className="w-8 h-8 text-[var(--hive-status-info)] mx-auto mb-2" />
                <div className="text-center">
                  <div className="text-sm font-medium text-[var(--hive-text-primary)]">Schedule</div>
                  <div className="text-xs text-[var(--hive-text-muted)]">Builder</div>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium">Schedule Builder</p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  Interactive course scheduling with conflict detection. Plan your perfect semester with visual time blocks.
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[var(--hive-border-subtle)]">
                  <HiveBadge variant="warning" className="text-xs">Beta</HiveBadge>
                  <span className="text-xs text-[var(--hive-text-muted)]">New features weekly</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div 
                className="p-4 bg-[var(--hive-background-secondary)]/80 backdrop-blur-sm rounded-xl border border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-xl">📚</span>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-[var(--hive-text-primary)]">Citation</div>
                  <div className="text-xs text-[var(--hive-text-muted)]">Manager</div>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium">Citation Manager</p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  Academic reference organizer with automatic formatting. Supports APA, MLA, Chicago, and custom citation styles.
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[var(--hive-border-subtle)]">
                  <HiveBadge variant="secondary" className="text-xs">Essential</HiveBadge>
                  <span className="text-xs text-[var(--hive-text-muted)]">For research papers</span>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="flex items-center justify-center gap-2 pt-4 border-t border-[var(--hive-border-subtle)]">
          <Tooltip>
            <TooltipTrigger asChild>
              <HiveButton variant="premium" size="sm" className="gap-2">
                <Zap className="w-4 h-4" />
                Create Tool
                <HelpCircle className="w-3 h-3 opacity-60" />
              </HiveButton>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div className="space-y-2">
                <p className="font-medium">Create Custom Tool</p>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  Build your own academic tools using HiveLAB. Requires Intermediate Builder status or higher.
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </HiveCardContent>
    </HiveCard>
  </TooltipProvider>
);

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

export const Basic: Story = {
  render: () => (
    <TooltipProvider>
      <div className="p-8 bg-[var(--hive-background-primary)] rounded-2xl">
        <Tooltip>
          <TooltipTrigger asChild>
            <HiveButton variant="outline" className="gap-2">
              <Info className="w-4 h-4" />
              Hover for tooltip
            </HiveButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a HIVE luxury tooltip with glass morphism!</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic HIVE tooltip with glass morphism and luxury styling.',
      },
    },
  },
};

export const CampusNavigation: Story = {
  render: () => <CampusNavigationTooltips />,
  parameters: {
    docs: {
      description: {
        story: 'Campus navigation tooltips explaining different space types and features.',
      },
    },
  },
};

export const BuilderStatus: Story = {
  render: () => <BuilderStatusTooltips />,
  parameters: {
    docs: {
      description: {
        story: 'Builder progression tooltips showing skill levels and unlocked features.',
      },
    },
  },
};

export const AcademicTools: Story = {
  render: () => (
    <div className="p-8 bg-[var(--hive-background-primary)]">
      <AcademicToolTooltips />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Academic tool dashboard with detailed tooltips for each tool.',
      },
    },
  },
};

export const VariousPositions: Story = {
  render: () => (
    <TooltipProvider>
      <div className="p-16 bg-[var(--hive-background-primary)] rounded-2xl">
        <div className="grid grid-cols-3 gap-8 place-items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <HiveButton variant="outline">Top</HiveButton>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Tooltip positioned on top</p>
            </TooltipContent>
          </Tooltip>
          
          <div></div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <HiveButton variant="outline">Bottom</HiveButton>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Tooltip positioned on bottom</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <HiveButton variant="outline">Left</HiveButton>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Tooltip positioned on left</p>
            </TooltipContent>
          </Tooltip>
          
          <div></div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <HiveButton variant="outline">Right</HiveButton>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Tooltip positioned on right</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'HIVE tooltips in different positions with luxury styling.',
      },
    },
  },
};