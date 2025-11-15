import * as React from 'react';
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
export declare const NotificationToastContainer: React.ForwardRefExoticComponent<NotificationToastContainerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=notification-toast-container.d.ts.map