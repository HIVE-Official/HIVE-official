'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, Plus, ArrowRight, Star, Users, Calculator, 
  Calendar, BookOpen, DollarSign, Target, Coffee,
  Sparkles, Crown, ExternalLink;
} from 'lucide-react';
import { BaseWidget } from '../bento-grid/base-widget';
import { BaseWidgetProps } from '../bento-grid/types';
import { HiveButton } from '../../hive-button';
import { HiveBadge } from '../../hive-badge';
import { cn } from '../../../lib/utils';

interface PersonalToolsPreviewWidgetProps extends BaseWidgetProps {
  isV1Unlocked?: boolean;
  onJoinWaitlist: () => void;
  onViewToolCategory: (category: string) => void;
}

const PREVIEW_TOOLS = [
  {
    id: 'expense-tracker',
    name: 'Group Expense Tracker',
    description: 'Split dinner costs transparently with receipt scanning',
    icon: <DollarSign className="h-5 w-5" />,
    category: 'Social Coordination',
    emoji: '💰',
    impact: 'Reduces group payment friction by 85%',
    users: '2.3k'
  },
  {
    id: 'availability-matcher',
    name: 'Availability Matcher',
    description: 'Find optimal coordination times across friend groups',
    icon: <Calendar className="h-5 w-5" />,
    category: 'Social Coordination',
    emoji: '📅',
    impact: 'Saves 20min per group planning session',
    users: '1.8k'
  },
  {
    id: 'event-planner',
    name: 'Event Planning Suite',
    description: 'End-to-end gathering coordination with polling',
    icon: <Users className="h-5 w-5" />,
    category: 'Social Coordination',
    emoji: '🎪',
    impact: '3x higher event attendance rates',
    users: '4.1k'
  },
  {
    id: 'study-organizer',
    name: 'Study Session Organizer',
    description: 'Academic collaboration with space booking',
    icon: <BookOpen className="h-5 w-5" />,
    category: 'Academic Tools',
    emoji: '📚',
    impact: 'Improves study group consistency by 60%',
    users: '3.2k'
  },
  {
    id: 'campus-exchange',
    name: 'Campus Exchange',
    description: 'Buy/sell textbooks within trusted network',
    icon: <ArrowRight className="h-5 w-5" />,
    category: 'Community Marketplace',
    emoji: '📖',
    impact: 'Save avg $200/semester on textbooks',
    users: '5.7k'
  },
  {
    id: 'goal-tracker',
    name: 'Goal Tracker',
    description: 'Personal development with accountability partnerships',
    icon: <Target className="h-5 w-5" />,
    category: 'Personal Productivity',
    emoji: '🎯',
    impact: '2.5x goal completion rate improvement',
    users: '1.9k'
  }
];

const TOOL_CATEGORIES = [
  {
    id: 'social-coordination',
    name: 'Social Coordination',
    emoji: '👥',
    count: 8,
    description: 'Group planning & coordination tools'
  },
  {
    id: 'community-marketplace',
    name: 'Community Marketplace',
    emoji: '💰',
    count: 6,
    description: 'Campus-specific trading & services'
  },
  {
    id: 'academic-collaboration',
    name: 'Academic Collaboration',
    emoji: '📚',
    count: 12,
    description: 'Study groups & project management'
  },
  {
    id: 'personal-productivity',
    name: 'Personal Productivity',
    emoji: '🎯',
    count: 10,
    description: 'Individual goals & habit tracking'
  }
];

export const PersonalToolsPreviewWidget: React.FC<PersonalToolsPreviewWidgetProps> = ({
  isV1Unlocked = false,
  onJoinWaitlist,
  onViewToolCategory,
  ...baseProps;
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'categories'>('preview');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderPreviewTab = () => (
    <div className="space-y-4">
      {/* V1 Status Banner */}}
      <div className={cn(
        'p-3 rounded-lg border text-center',
        isV1Unlocked;
          ? 'bg-green-400/10 border-green-400/30 text-green-400'
          : 'bg-[var(--hive-brand-secondary)]/10 border-hive-gold/30 text-[var(--hive-brand-secondary)]'
      )}>
        <div className="flex items-center justify-center gap-2 mb-1">
          {isV1Unlocked ? (
            <>
              <Crown className="h-4 w-4" />
              <span className="font-semibold text-sm">v1 UNLOCKED</span>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              <span className="font-semibold text-sm">LAUNCHING v1</span>
            </>
          )}
        </div>
        <p className="text-xs opacity-90">
          {isV1Unlocked;
            ? 'Access to all personal tools and community marketplace'
            : 'Social-enhanced productivity tools coming Fall 2025'
          }
        </p>
      </div>

      {/* Featured Tools Preview */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-hive-text-primary flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
          Featured Tools;
        </h4>
        
        <div className="space-y-2">
          {PREVIEW_TOOLS.slice(0, 3).map((tool, index) => (
            <motion.div;
              key={tool.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'p-3 rounded-lg border transition-all cursor-pointer group',
                'bg-hive-surface-elevated/30 border-hive-border-subtle/30',
                'hover:bg-hive-surface-elevated hover:border-hive-border-subtle',
                selectedTool === tool.id && 'ring-2 ring-hive-gold/30'
              )}
              onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[var(--hive-brand-secondary)]/10 rounded-lg text-[var(--hive-brand-secondary)] shrink-0">
                  <span className="text-lg">{tool.emoji}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-medium text-hive-text-primary text-sm line-clamp-1">
                      {tool.name}
                    </h5>
                    <HiveBadge variant="tool-builder" className="text-xs">
                      {tool.users} users;
                    </HiveBadge>
                  </div>
                  
                  <p className="text-xs text-hive-text-secondary line-clamp-2 mb-2">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-[var(--hive-brand-secondary)]" />
                    <span className="text-xs text-hive-text-tertiary">
                      {tool.impact}
                    </span>
                  </div>
                </div>
              </div>

              {selectedTool === tool.id && (
                <motion.div;
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-hive-border-subtle/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-hive-text-secondary">
                      Category: {tool.category}
                    </span>
                    <HiveButton;
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewToolCategory(tool.category)
          }}
                      className="text-xs"
                    >
                      Explore;
                    </HiveButton>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Integration Highlights */}
      <div className="p-3 bg-purple-400/5 border border-purple-400/20 rounded-lg">
        <h5 className="text-sm font-medium text-purple-400 mb-2 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Social-Enhanced Features;
        </h5>
        <ul className="text-xs text-hive-text-secondary space-y-1">
          <li>• Tools integrate with your community activity</li>
          <li>• Share expenses transparently with friends</li>
          <li>• Find study partners through availability matching</li>
          <li>• Build trust through community verification</li>
        </ul>
      </div>
    </div>
  );

  const renderCategoriesTab = () => (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-hive-text-primary">
        Tool Categories ({TOOL_CATEGORIES.reduce((sum, cat) => sum + cat.count, 0)} total)
      </h4>
      
      <div className="grid gap-3">
        {TOOL_CATEGORIES.map((category) => (
          <motion.button;
            key={category.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewToolCategory(category.id)}
            className={cn(
              'p-3 rounded-lg border text-left transition-all group',
              'bg-hive-surface-elevated/30 border-hive-border-subtle/30',
              'hover:bg-hive-surface-elevated hover:border-hive-border-subtle'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">{category.emoji}</span>
                <div>
                  <h5 className="font-medium text-hive-text-primary text-sm">
                    {category.name}
                  </h5>
                  <p className="text-xs text-hive-text-secondary">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <HiveBadge variant="tool-builder" className="text-xs">
                  {category.count}
                </HiveBadge>
                <ArrowRight className="h-4 w-4 text-hive-text-tertiary group-hover:text-hive-text-secondary transition-colors" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );

  const widgetContent = (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex border-b border-hive-border-subtle/30 mb-4">
        {[
          { id: 'preview', label: 'Preview', icon: Star },
          { id: 'categories', label: 'Categories', icon: Plus }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button;
              key={tab.id}}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative',
                activeTab === tab.id;
                  ? 'text-[var(--hive-brand-secondary)]'
                  : 'text-hive-text-secondary hover:text-hive-text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:block">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div;
                  layoutId="tools-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--hive-brand-secondary)]"
                />
              )}
            </button>
          )
          })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div;
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'preview' && renderPreviewTab()}
            {activeTab === 'categories' && renderCategoriesTab()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-hive-border-subtle/30">
        {isV1Unlocked ? (
          <HiveButton;
            variant="primary"
            size="sm"
            onClick={() => onViewToolCategory('all')}
            className="w-full gap-2"
          >
            <span>Browse All Tools</span>
            <ArrowRight className="h-4 w-4" />
          </HiveButton>
        ) : (
          <HiveButton;
            variant="outline"
            size="sm"
            onClick={onJoinWaitlist}
            className="w-full gap-2"
          >
            <Lock className="h-4 w-4" />
            <span>Join v1 Waitlist</span>
            <ExternalLink className="h-4 w-4" />
          </HiveButton>
        )}
      </div>
    </div>
  );

  return (
    <BaseWidget {...baseProps}>
      {widgetContent}
    </BaseWidget>
  )
};