/**
 * 🎯 HIVE Notification Toast Manager
 *
 * Behavioral Psychology Implementation:
 * - High-priority "someone needs you" alerts
 * - Variable reward scheduling for engagement
 * - Relief amplifier design patterns
 * - Smooth, non-intrusive animations
 */
import React from 'react';
import { HiveNotification, ToastNotificationData } from '../../types/notifications';
export interface NotificationToastManagerProps {
    /** Array of notifications to monitor */
    notifications: HiveNotification[];
    /** Previous notifications count for comparison */
    previousCount?: number;
    /** Navigation handler for toast actions */
    onNavigate?: (url: string) => void;
    /** Custom toast filter */
    shouldShowToast?: (notification: HiveNotification) => boolean;
}
export declare const NotificationToastManager: React.FC<NotificationToastManagerProps>;
export declare const useNotificationToasts: (notifications: HiveNotification[], onNavigate?: (url: string) => void, shouldShowToast?: (notification: HiveNotification) => boolean) => {
    ToastManager: () => import("react/jsx-runtime").JSX.Element;
    currentCount: number;
    previousCount: number;
};
export declare const createUrgentHelpToast: (senderName: string, helpType: string, actionUrl: string, onNavigate: (url: string) => void) => ToastNotificationData;
export declare const createSocialProofToast: (achievement: string, percentile: string, actionUrl?: string, onNavigate?: (url: string) => void) => ToastNotificationData;
export declare const createInsiderToast: (updateTitle: string, exclusivityText: string, actionUrl?: string, onNavigate?: (url: string) => void) => ToastNotificationData;
export default NotificationToastManager;
//# sourceMappingURL=notification-toast-manager.d.ts.map