'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';
import * as ToastPrimitive from '@radix-ui/react-toast';
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  XIcon,
} from '../../00-Global/atoms';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  duration?: number;
}

export interface NotificationToastContainerProps {
  notifications: ToastNotification[];
  onClose?: (id: string) => void;
  maxVisible?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const getToastIcon = (type: ToastNotification['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircleIcon className="h-5 w-5 text-emerald-400" />;
    case 'error':
      return <AlertTriangleIcon className="h-5 w-5 text-red-400" />;
    case 'warning':
      return <AlertTriangleIcon className="h-5 w-5 text-yellow-400" />;
    case 'info':
      return <InfoIcon className="h-5 w-5 text-blue-400" />;
  }
};

const getToastStyles = (type: ToastNotification['type']) => {
  switch (type) {
    case 'success':
      return 'border-emerald-500/40 bg-emerald-500/10';
    case 'error':
      return 'border-red-500/40 bg-red-500/10';
    case 'warning':
      return 'border-yellow-500/40 bg-yellow-500/10';
    case 'info':
      return 'border-blue-500/40 bg-blue-500/10';
  }
};

const getPositionStyles = (position: NotificationToastContainerProps['position']) => {
  switch (position) {
    case 'top-left':
      return 'top-0 left-0 flex-col';
    case 'top-center':
      return 'top-0 left-1/2 -translate-x-1/2 flex-col';
    case 'top-right':
      return 'top-0 right-0 flex-col';
    case 'bottom-left':
      return 'bottom-0 left-0 flex-col-reverse';
    case 'bottom-center':
      return 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse';
    case 'bottom-right':
      return 'bottom-0 right-0 flex-col-reverse';
    default:
      return 'top-0 right-0 flex-col';
  }
};

export const NotificationToastContainer = React.forwardRef<
  HTMLDivElement,
  NotificationToastContainerProps
>(({ notifications, onClose, maxVisible = 3, position = 'top-right' }, ref) => {
  const visibleNotifications = notifications.slice(0, maxVisible);

  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <div ref={ref} className={cn('fixed z-[100] flex gap-3 p-6', getPositionStyles(position))}>
        {visibleNotifications.map((notification) => (
          <ToastPrimitive.Root
            key={notification.id}
            duration={notification.duration || 4000}
            onOpenChange={(open) => {
              if (!open) {
                onClose?.(notification.id);
              }
            }}
            className={cn(
              'group pointer-events-auto relative flex w-full max-w-md items-start gap-3 overflow-hidden rounded-2xl border p-4 shadow-lg transition-all',
              'data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none',
              'data-[state=open]:animate-in data-[state=closed]:animate-out',
              'data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
              'data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
              'backdrop-blur-md',
              getToastStyles(notification.type)
            )}
          >
            {/* Icon */}
            <div className="shrink-0 pt-0.5">{getToastIcon(notification.type)}</div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-1">
              <ToastPrimitive.Title className="text-sm font-semibold text-[var(--hive-text-primary)]">
                {notification.title}
              </ToastPrimitive.Title>
              {notification.description && (
                <ToastPrimitive.Description className="text-sm text-[var(--hive-text-secondary)]">
                  {notification.description}
                </ToastPrimitive.Description>
              )}
            </div>

            {/* Close Button */}
            <ToastPrimitive.Close
              className="shrink-0 rounded-lg p-1 text-[var(--hive-text-tertiary)] opacity-0 transition-opacity hover:text-[var(--hive-text-primary)] group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)]"
              onClick={() => onClose?.(notification.id)}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
      </div>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
});

NotificationToastContainer.displayName = 'NotificationToastContainer';
