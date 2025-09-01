'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, Clock, Users, BookOpen, MessageSquare, 
  CheckCircle2, ArrowRight, Calendar, MapPin, ExternalLink,
  ChevronDown, ChevronUp, Filter, MoreHorizontal
} from 'lucide-react';
import { BaseWidget } from '../bento-grid/base-widget';
import { BaseWidgetProps, CoordinationOpportunity, QuickAction } from '../bento-grid/types';
import { HiveButton } from '../../hive-button';
import { HiveBadge } from '../../hive-badge';
import { cn } from '../../lib/utils';

interface PriorityCoordinationWidgetProps extends BaseWidgetProps {
  priorities: CoordinationOpportunity[];
  isLoading?: boolean;
  onActionTaken: (priorityId: string, actionId: string) => void;
  onPriorityClick: (priorityId: string) => void;
  onViewAll: () => void;
}

export const PriorityCoordinationWidget: React.FC<PriorityCoordinationWidgetProps> = ({
  priorities = [],
  isLoading = false,
  onActionTaken,
  onPriorityClick,
  onViewAll,
  ...baseProps
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['urgent']));
  const [showAllItems, setShowAllItems] = useState(false);

  // Organize priorities by urgency
  const organizedPriorities = useMemo(() => {
    const urgent = priorities.filter(p => p.type === 'urgent').sort((a, b) => b.priority - a.priority);
    const today = priorities.filter(p => p.type === 'today').sort((a, b) => b.priority - a.priority);
    const thisWeek = priorities.filter(p => p.type === 'this_week').sort((a, b) => b.priority - a.priority);
    
    return { urgent, today, thisWeek };
  }, [priorities]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const getSourceIcon = (source: CoordinationOpportunity['source']) => {
    const iconMap = {
      calendar: <Calendar className="h-4 w-4" />,
      community: <Users className="h-4 w-4" />,
      social: <MessageSquare className="h-4 w-4" />,
      personal: <BookOpen className="h-4 w-4" />
    };
    return iconMap[source] || <AlertCircle className="h-4 w-4" />;
  };

  const getSourceColor = (source: CoordinationOpportunity['source']) => {
    const colorMap = {
      calendar: 'text-blue-400 bg-blue-400/10',
      community: 'text-purple-400 bg-purple-400/10',
      social: 'text-green-400 bg-green-400/10',
      personal: 'text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10'
    };
    return colorMap[source] || 'text-gray-400 bg-gray-400/10';
  };

  const getUrgencyColor = (type: CoordinationOpportunity['type']) => {
    const colorMap = {
      urgent: 'text-red-400',
      today: 'text-orange-400',
      this_week: 'text-green-400'
    };
    return colorMap[type] || 'text-gray-400';
  };

  const getUrgencyEmoji = (type: CoordinationOpportunity['type']) => {
    const emojiMap = {
      urgent: '🔴',
      today: '🟡',
      this_week: '🟢'
    };
    return emojiMap[type] || '⚪';
  };

  const renderPriorityItem = (priority: CoordinationOpportunity, index: number) => (
    <motion.div
      key={priority.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
    >
      <div
        className={cn(
          'p-3 rounded-lg border transition-all duration-200 cursor-pointer',
          'bg-hive-surface-elevated/50 border-hive-border-subtle/50',
          'hover:bg-hive-surface-elevated border-hive-border-subtle',
          'hover:shadow-lg hover:shadow-hive-gold/5'
        )}
        onClick={() => onPriorityClick(priority.id)}
      >
        <div className="flex items-start gap-3">
          {/* Source Icon */}
          <div className={cn(
            'p-2 rounded-full shrink-0 mt-0.5',
            getSourceColor(priority.source)
          )}>
            {getSourceIcon(priority.source)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-medium text-hive-text-primary line-clamp-1">
                {priority.title}
              </h4>
              {priority.deadline && (
                <div className="flex items-center gap-1 text-xs text-hive-text-tertiary shrink-0">
                  <Clock className="h-3 w-3" />
                  {new Date(priority.deadline).toLocaleDateString()}
                </div>
              )}
            </div>

            <p className="text-sm text-hive-text-secondary line-clamp-2 mb-3">
              {priority.description}
            </p>

            {/* Context Info */}
            {priority.context.participants && priority.context.participants.length > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-3 w-3 text-hive-text-tertiary" />
                <span className="text-xs text-hive-text-tertiary">
                  {priority.context.participants.length} people involved
                </span>
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {priority.actions.slice(0, 2).map((action) => (
                <Button
                  key={action.id}
                  size="sm"
                  variant={action.type === 'primary' ? 'primary' : 'outline'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onActionTaken(priority.id, action.id);
                  }}
                  className="text-xs px-3 py-1"
                >
                  {action.label}
                </Button>
              ))}
              {priority.actions.length > 2 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPriorityClick(priority.id);
                  }}
                  className="h-7 w-7 p-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Priority Score Indicator */}
          <div className={cn(
            'w-2 h-2 rounded-full shrink-0 mt-2',
            priority.priority >= 80 ? 'bg-red-400' :
            priority.priority >= 60 ? 'bg-orange-400' :
            'bg-green-400'
          )} />
        </div>
      </div>
    </motion.div>
  );

  const renderPrioritySection = (
    title: string,
    priorities: CoordinationOpportunity[],
    type: 'urgent' | 'today' | 'this_week'
  ) => {
    const isExpanded = expandedSections.has(type);
    const displayItems = showAllItems ? priorities : priorities.slice(0, 3);
    
    if (priorities.length === 0) return null;

    return (
      <div className="space-y-3">
        <button
          onClick={() => toggleSection(type)}
          className="flex items-center justify-between w-full text-left group"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{getUrgencyEmoji(type)}</span>
            <h3 className={cn(
              'font-semibold text-sm uppercase tracking-wide',
              getUrgencyColor(type)
            )}>
              {title} ({priorities.length})
            </h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-hive-text-secondary group-hover:text-hive-text-primary transition-colors" />
          ) : (
            <ChevronDown className="h-4 w-4 text-hive-text-secondary group-hover:text-hive-text-primary transition-colors" />
          )}
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {displayItems.map((priority, index) => renderPriorityItem(priority, index))}
              
              {priorities.length > 3 && !showAllItems && (
                <button
                  onClick={() => setShowAllItems(true)}
                  className="w-full py-2 text-sm text-hive-text-secondary hover:text-hive-text-primary transition-colors text-center"
                >
                  Show {priorities.length - 3} more items
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const widgetContent = (
    <div className="h-full flex flex-col">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-2" />
            <p className="text-sm text-hive-text-secondary">Loading priorities...</p>
          </div>
        </div>
      ) : priorities.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-3" />
            <h3 className="font-medium text-hive-text-primary mb-1">You're all caught up!</h3>
            <p className="text-sm text-hive-text-secondary">No urgent coordination needed right now.</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-4 overflow-y-auto">
          {renderPrioritySection('URGENT', organizedPriorities.urgent, 'urgent')}
          {renderPrioritySection('TODAY', organizedPriorities.today, 'today')}
          {renderPrioritySection('THIS WEEK', organizedPriorities.thisWeek, 'this_week')}
        </div>
      )}

      {/* Footer Actions */}
      {priorities.length > 0 && (
        <div className="pt-4 border-t border-hive-border-subtle/50">
          <Button
            variant="secondary"
            size="sm"
            onClick={onViewAll}
            className="w-full gap-2"
          >
            <span>View All Priorities</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <BaseWidget {...baseProps}>
      {widgetContent}
    </BaseWidget>
  );
};