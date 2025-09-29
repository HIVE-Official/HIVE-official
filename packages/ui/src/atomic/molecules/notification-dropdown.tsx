'use client';

/**
 * 🎯 HIVE Notification Dropdown Component
 *
 * Behavioral Psychology Implementation:
 * - "Someone needs you" framing (relief amplifier)
 * - Social proof messaging
 * - Variable reward scheduling through urgency
 * - 70% completion target optimization
 * - Effortless competence positioning
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  Users,
  Heart,
  Trash2,
  ExternalLink,
  AlertCircle,
  Sparkles,
  MessageCircle,
  ChevronDown,
  CheckCheck,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveNotification } from '../../types/notifications';
import { NotificationItem } from '../atoms/notification-item';

// Motion components (matching shell implementation)
interface MotionDivProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: any;
  transition?: any;
  initial?: any;
  exit?: any;
  layoutId?: string;
  whileHover?: any;
  whileTap?: any;
}

interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animate?: any;
  transition?: any;
  initial?: any;
  whileHover?: any;
  whileTap?: any;
}

const MotionDiv = React.forwardRef<HTMLDivElement, MotionDivProps>(
  ({ animate, transition, initial, exit, layoutId, whileHover, whileTap, className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
);
MotionDiv.displayName = 'MotionDiv';

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ animate, transition, initial, whileHover, whileTap, className, children, ...props }, ref) => (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  )
);
MotionButton.displayName = 'MotionButton';

// HIVE Easing Curves
const HIVE_EASING = {
  liquid: [0.23, 1, 0.32, 1],
  magnetic: [0.25, 0.46, 0.45, 0.94],
  silk: [0.16, 1, 0.3, 1]
} as const;

export interface NotificationDropdownProps {
  /** Array of notifications */
  notifications: HiveNotification[];
  /** Unread count */
  unreadCount: number;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string | null;
  /** Dropdown open state */
  isOpen: boolean;
  /** Close dropdown handler */
  onClose: () => void;
  /** Mark notification as read */
  onMarkAsRead: (notificationId: string) => Promise<void>;
  /** Mark all as read */
  onMarkAllAsRead: () => Promise<void>;
  /** Delete notification */
  onDeleteNotification: (notificationId: string) => Promise<void>;
  /** Clear all notifications */
  onClearAll: () => Promise<void>;
  /** Navigation handler */
  onNavigate?: (url: string) => void;
  /** Custom className */
  className?: string;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  unreadCount,
  loading = false,
  error = null,
  isOpen,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onClearAll,
  onNavigate,
  className,
}) => {
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Behavioral grouping: Prioritize "someone needs you" notifications
  const groupedNotifications = React.useMemo(() => {
    const urgent = notifications.filter(n => n.priority === 'urgent' || n.category === 'someone_needs_you');
    const social = notifications.filter(n => n.category === 'social_proof' && n.priority !== 'urgent');
    const insider = notifications.filter(n => n.category === 'insider_knowledge' && n.priority !== 'urgent');
    const other = notifications.filter(n => !urgent.includes(n) && !social.includes(n) && !insider.includes(n));

    return { urgent, social, insider, other };
  }, [notifications]);

  // Handle notification action with optimistic updates
  const handleNotificationAction = async (
    notificationId: string,
    action: () => Promise<void>,
    optimisticUpdate?: () => void
  ) => {
    setProcessingIds(prev => new Set(prev).add(notificationId));

    try {
      if (optimisticUpdate) optimisticUpdate();
      await action();
    } catch (error) {
      console.error('Notification action failed:', error);
      // Could show toast error here
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  // Behavioral psychology: Get contextual empty state message
  const getEmptyStateMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning! No one needs your help right now.";
    if (hour < 17) return "All caught up! Your community is thriving.";
    return "Quiet evening! Check back tomorrow for new ways to help.";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <MotionDiv
        className={cn(
          'absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] z-50',
          'bg-hive-background-secondary/95 backdrop-blur-xl',
          'border border-hive-border-default rounded-lg',
          'shadow-hive-level3 overflow-hidden',
          className
        )}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2, ease: HIVE_EASING.liquid }}
      >
        {/* Header with behavioral messaging */}
        <div className="p-4 border-b border-hive-border-default bg-gradient-to-r from-hive-background-secondary to-hive-background-tertiary/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-hive-text-primary font-semibold font-sans">
                {unreadCount > 0 ? 'People Need You' : 'All Caught Up'}
              </h3>
              <p className="text-hive-text-tertiary text-sm font-sans">
                {unreadCount > 0
                  ? `${unreadCount} ${unreadCount === 1 ? 'person needs' : 'people need'} your help`
                  : 'No urgent requests right now'
                }
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <MotionButton
                  className="text-hive-text-tertiary hover:text-hive-brand-primary text-sm font-medium transition-colors"
                  onClick={onMarkAllAsRead}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </MotionButton>
              )}

              <MotionButton
                className="text-hive-text-tertiary hover:text-hive-text-primary p-1 rounded-md hover:bg-hive-background-tertiary"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Close notifications"
              >
                <X className="w-4 h-4" />
              </MotionButton>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <NotificationSkeleton />
          ) : error ? (
            <div className="p-4 text-center">
              <AlertCircle className="w-8 h-8 text-hive-status-error mx-auto mb-2" />
              <p className="text-hive-status-error text-sm">{error}</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Heart className="w-12 h-12 text-hive-text-tertiary mx-auto mb-4 opacity-50" />
              <p className="text-hive-text-secondary font-sans">{getEmptyStateMessage()}</p>
              <p className="text-hive-text-tertiary text-sm mt-2 font-sans">
                You're making a difference! ✨
              </p>
            </div>
          ) : (
            <div className="py-2">
              {/* Urgent notifications first - "Someone needs you" */}
              {groupedNotifications.urgent.length > 0 && (
                <NotificationSection
                  title="🆘 Someone Needs You"
                  notifications={groupedNotifications.urgent}
                  onMarkAsRead={onMarkAsRead}
                  onDeleteNotification={onDeleteNotification}
                  onNavigate={onNavigate}
                  processingIds={processingIds}
                  handleAction={handleNotificationAction}
                />
              )}

              {/* Social proof notifications */}
              {groupedNotifications.social.length > 0 && (
                <NotificationSection
                  title="🏆 Social Recognition"
                  notifications={groupedNotifications.social}
                  onMarkAsRead={onMarkAsRead}
                  onDeleteNotification={onDeleteNotification}
                  onNavigate={onNavigate}
                  processingIds={processingIds}
                  handleAction={handleNotificationAction}
                />
              )}

              {/* Insider knowledge notifications */}
              {groupedNotifications.insider.length > 0 && (
                <NotificationSection
                  title="💡 Insider Updates"
                  notifications={groupedNotifications.insider}
                  onMarkAsRead={onMarkAsRead}
                  onDeleteNotification={onDeleteNotification}
                  onNavigate={onNavigate}
                  processingIds={processingIds}
                  handleAction={handleNotificationAction}
                />
              )}

              {/* Other notifications */}
              {groupedNotifications.other.length > 0 && (
                <NotificationSection
                  title="📬 Other Updates"
                  notifications={groupedNotifications.other}
                  onMarkAsRead={onMarkAsRead}
                  onDeleteNotification={onDeleteNotification}
                  onNavigate={onNavigate}
                  processingIds={processingIds}
                  handleAction={handleNotificationAction}
                />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-hive-border-default bg-hive-background-tertiary/30">
            <div className="flex items-center justify-between">
              <span className="text-hive-text-tertiary text-xs font-sans">
                {notifications.length} total notifications
              </span>

              {!showClearConfirm ? (
                <MotionButton
                  className="text-hive-text-tertiary hover:text-hive-status-error text-xs font-medium transition-colors"
                  onClick={() => setShowClearConfirm(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  Clear All
                </MotionButton>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-hive-text-tertiary text-xs">Sure?</span>
                  <MotionButton
                    className="text-hive-status-error text-xs font-medium"
                    onClick={() => {
                      onClearAll();
                      setShowClearConfirm(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    Yes
                  </MotionButton>
                  <MotionButton
                    className="text-hive-text-tertiary text-xs font-medium"
                    onClick={() => setShowClearConfirm(false)}
                    whileHover={{ scale: 1.05 }}
                  >
                    No
                  </MotionButton>
                </div>
              )}
            </div>
          </div>
        )}
      </MotionDiv>
    </AnimatePresence>
  );
};

// Notification Section Component
interface NotificationSectionProps {
  title: string;
  notifications: HiveNotification[];
  onMarkAsRead: (id: string) => Promise<void>;
  onDeleteNotification: (id: string) => Promise<void>;
  onNavigate?: (url: string) => void;
  processingIds: Set<string>;
  handleAction: (id: string, action: () => Promise<void>, optimistic?: () => void) => Promise<void>;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({
  title,
  notifications,
  onMarkAsRead,
  onDeleteNotification,
  onNavigate,
  processingIds,
  handleAction,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="border-b border-hive-border-default/50 last:border-b-0">
      <MotionButton
        className="w-full px-4 py-2 text-left text-hive-text-secondary text-xs font-medium uppercase tracking-wide flex items-center justify-between hover:bg-hive-background-tertiary/30"
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ x: 2 }}
      >
        <span>{title} ({notifications.length})</span>
        <ChevronDown className={cn('w-3 h-3 transition-transform', isCollapsed && 'rotate-180')} />
      </MotionButton>

      <AnimatePresence>
        {!isCollapsed && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: HIVE_EASING.silk }}
          >
            {notifications.map((notification, index) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                isProcessing={processingIds.has(notification.id)}
                onMarkAsRead={() => handleAction(notification.id, () => onMarkAsRead(notification.id))}
                onDelete={() => handleAction(notification.id, () => onDeleteNotification(notification.id))}
                onNavigate={onNavigate}
                index={index}
              />
            ))}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

// Loading skeleton
const NotificationSkeleton: React.FC = () => (
  <div className="p-4 space-y-3">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex gap-3 animate-pulse">
        <div className="w-8 h-8 bg-hive-background-tertiary rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-hive-background-tertiary rounded w-3/4" />
          <div className="h-3 bg-hive-background-tertiary rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default NotificationDropdown;