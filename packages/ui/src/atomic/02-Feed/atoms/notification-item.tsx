'use client';

/**
 * 🎯 HIVE Notification Item Component
 *
 * Behavioral Psychology Features:
 * - "Someone needs you" framing for help requests
 * - Social proof messaging for achievements
 * - Effortless competence positioning
 * - Smooth interaction animations
 * - Variable urgency indicators
 */

import React, { useState } from 'react';
import {
  Clock,
  Users,
  Heart,
  Trash2,
  ExternalLink,
  AlertCircle,
  Sparkles,
  MessageCircle,
  Trophy,
  Eye
} from 'lucide-react';
import { cn } from '../../../lib/utils';
import { HiveNotification } from '../../../types/notifications';

// Motion components
interface MotionDivProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: any;
  transition?: any;
  initial?: any;
  whileHover?: any;
  whileTap?: any;
  layoutId?: string;
}

interface MotionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animate?: any;
  transition?: any;
  initial?: any;
  whileHover?: any;
  whileTap?: any;
}

const MotionDiv = React.forwardRef<HTMLDivElement, MotionDivProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  )
);
MotionDiv.displayName = 'MotionDiv';

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, children, ...props }, ref) => (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  )
);
MotionButton.displayName = 'MotionButton';

// HIVE Easing
const HIVE_EASING = {
  liquid: [0.23, 1, 0.32, 1],
  magnetic: [0.25, 0.46, 0.45, 0.94],
  silk: [0.16, 1, 0.3, 1]
} as const;

export interface NotificationItemProps {
  /** Notification data */
  notification: HiveNotification;
  /** Processing state */
  isProcessing?: boolean;
  /** Mark as read handler */
  onMarkAsRead: () => void;
  /** Delete handler */
  onDelete: () => void;
  /** Navigation handler */
  onNavigate?: (url: string) => void;
  /** Animation index for staggered entry */
  index?: number;
  /** Custom className */
  className?: string;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  isProcessing = false,
  onMarkAsRead,
  onDelete,
  onNavigate,
  index = 0,
  className,
}) => {
  const [showActions, setShowActions] = useState(false);

  // Get notification icon based on type and category
  const getNotificationIcon = () => {
    const iconClass = "w-5 h-5";

    switch (notification.type) {
      case 'help_request':
        return <Heart className={cn(iconClass, "text-hive-status-error")} />;
      case 'connection':
        return <Users className={cn(iconClass, "text-hive-brand-primary")} />;
      case 'space':
        return <MessageCircle className={cn(iconClass, "text-hive-brand-secondary")} />;
      case 'achievement':
        return <Trophy className={cn(iconClass, "text-hive-brand-primary")} />;
      case 'system':
        return <AlertCircle className={cn(iconClass, "text-hive-text-tertiary")} />;
      default:
        return <Sparkles className={cn(iconClass, "text-hive-brand-primary")} />;
    }
  };

  // Get behavioral messaging
  const getBehavioralMessage = () => {
    const { category, metadata } = notification;

    // "Someone needs you" framing
    if (category === 'someone_needs_you') {
      return {
        prefix: "🆘",
        emphasis: "needs your help",
        context: metadata?.['urgencyLevel'] === 'immediate' ? "Right now" : "Today"
      };
    }

    // Social proof framing
    if (category === 'social_proof') {
      return {
        prefix: "🏆",
        emphasis: "You're recognized!",
        context: (metadata as any)?.['exclusivityText'] || "Top contributor"
      };
    }

    // Insider knowledge framing
    if (category === 'insider_knowledge') {
      return {
        prefix: "💡",
        emphasis: "Exclusive update",
        context: "You're among the first to know"
      };
    }

    return null;
  };

  // Get time display with behavioral context
  const getTimeDisplay = () => {
    const now = new Date();
    const notificationTime = notification.timestamp.toDate();
    const diffMs = now.getTime() - notificationTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return notificationTime.toLocaleDateString();
  };

  // Handle notification click
  const handleClick = () => {
    if (notification.actionUrl && onNavigate) {
      onNavigate(notification.actionUrl);
    }

    if (!notification.isRead) {
      onMarkAsRead();
    }
  };

  const behavioralMessage = getBehavioralMessage();

  return (
    <MotionDiv
      className={cn(
        'relative p-4 hover:bg-hive-background-tertiary/30 transition-all cursor-pointer group',
        !notification.isRead && 'border-l-2 border-hive-brand-primary bg-hive-brand-primary/5',
        isProcessing && 'opacity-50 pointer-events-none',
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: HIVE_EASING.silk
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={handleClick}
      whileHover={{ x: 2 }}
    >
      {/* Unread indicator pulse */}
      {!notification.isRead && (
        <MotionDiv
          className="absolute left-0 top-4 w-2 h-2 bg-hive-brand-primary rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="flex gap-3">
        {/* Avatar or Icon */}
        <div className="flex-shrink-0">
          {notification.metadata?.avatarUrl ? (
            <img
              src={notification.metadata.avatarUrl}
              alt={notification.metadata.senderName || 'User'}
              className="w-8 h-8 rounded-full border border-hive-border-default"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hive-background-tertiary to-hive-background-secondary border border-hive-border-default flex items-center justify-center">
              {getNotificationIcon()}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Behavioral messaging header */}
          {behavioralMessage && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs">{behavioralMessage.prefix}</span>
              <span className="text-xs text-hive-brand-primary font-medium">
                {behavioralMessage.emphasis}
              </span>
              <span className="text-xs text-hive-text-tertiary">
                {behavioralMessage.context}
              </span>
            </div>
          )}

          {/* Title */}
          <h4 className={cn(
            'font-medium text-sm mb-1 font-sans',
            notification.isRead ? 'text-hive-text-secondary' : 'text-hive-text-primary'
          )}>
            {notification.title}
          </h4>

          {/* Message */}
          <p className={cn(
            'text-sm mb-2 font-sans line-clamp-2',
            notification.isRead ? 'text-hive-text-tertiary' : 'text-hive-text-secondary'
          )}>
            {notification.message}
          </p>

          {/* Social proof or exclusivity text */}
          {notification.socialProofText && (
            <p className="text-xs text-hive-brand-secondary mb-2 font-sans">
              💪 {notification.socialProofText}
            </p>
          )}

          {notification.exclusivityText && (
            <p className="text-xs text-hive-brand-primary mb-2 font-sans">
              ⭐ {notification.exclusivityText}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-hive-text-tertiary font-sans">
              <Clock className="w-3 h-3" />
              <span>{getTimeDisplay()}</span>

              {notification.priority === 'urgent' && (
                <span className="px-1.5 py-0.5 bg-hive-status-error/20 text-hive-status-error rounded text-xs font-medium">
                  Urgent
                </span>
              )}

              {notification.priority === 'high' && (
                <span className="px-1.5 py-0.5 bg-hive-brand-primary/20 text-hive-brand-primary rounded text-xs font-medium">
                  High
                </span>
              )}
            </div>

            {/* Action button */}
            {notification.actionText && notification.actionUrl && (
              <MotionButton
                className="text-xs text-hive-brand-primary hover:text-hive-brand-secondary font-medium flex items-center gap-1 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNavigate && notification.actionUrl) {
                    onNavigate(notification.actionUrl);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {notification.actionText}
                <ExternalLink className="w-3 h-3" />
              </MotionButton>
            )}
          </div>
        </div>

        {/* Action buttons (shown on hover) */}
        <div className={cn(
          'flex-shrink-0 flex items-start gap-1 transition-opacity',
          showActions ? 'opacity-100' : 'opacity-0'
        )}>
          {!notification.isRead && (
            <MotionButton
              className="p-1 text-hive-text-tertiary hover:text-hive-brand-primary transition-colors rounded"
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead();
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Mark as read"
            >
              <Eye className="w-4 h-4" />
            </MotionButton>
          )}

          <MotionButton
            className="p-1 text-hive-text-tertiary hover:text-hive-status-error transition-colors rounded"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Delete notification"
          >
            <Trash2 className="w-4 h-4" />
          </MotionButton>
        </div>
      </div>

      {/* Processing overlay */}
      {isProcessing && (
        <MotionDiv
          className="absolute inset-0 bg-hive-background-secondary/50 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-4 h-4 border-2 border-hive-brand-primary border-t-transparent rounded-full animate-spin" />
        </MotionDiv>
      )}
    </MotionDiv>
  );
};

export default NotificationItem;
