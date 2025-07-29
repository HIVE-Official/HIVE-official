import React from 'react';
export interface EventSystemConfig {
    defaultEventTypes: string[];
    calendarIntegration: boolean;
    notificationSettings: {
        eventReminders: boolean;
        rsvpUpdates: boolean;
        checkInAlerts: boolean;
    };
    spaceIntegration: {
        enabled: boolean;
        autoAnnounce: boolean;
        requireApproval: boolean;
    };
    memberPermissions: {
        anyoneCanCreate: boolean;
        requireApproval: boolean;
        moderatorRoles: string[];
    };
}
export interface EventSystemState {
    systemId: "event-management-system";
    installedComponents: string[];
    systemConfiguration: EventSystemConfig;
    componentStates: Map<string, any>;
    dataFlow: Map<string, any>;
    integrations: {
        calendar: {
            status: 'connected' | 'disconnected' | 'error';
            lastSync?: Date;
        };
        notifications: {
            status: 'active' | 'inactive' | 'error';
        };
        spaces: {
            status: 'connected' | 'disconnected' | 'error';
        };
    };
    systemAnalytics: {
        eventsCreated: number;
        totalAttendees: number;
        averageAttendance: number;
        memberEngagement: number;
    };
    lastSync: Date;
}
export interface EventSystemContext {
    state: EventSystemState;
    registerComponent: (componentId: string, componentState: any) => void;
    updateComponent: (componentId: string, updates: any) => void;
    shareData: (fromComponent: string, data: any) => void;
    subscribeToData: (componentId: string, callback: (data: any) => void) => void;
}
interface EventSystemContainerProps {
    installationId: string;
    configuration: EventSystemConfig;
    onSystemUpdate?: (state: EventSystemState) => void;
    onComponentAction?: (componentId: string, action: string, data?: any) => void;
    className?: string;
}
export declare const EventSystemContainer: React.FC<EventSystemContainerProps>;
export default EventSystemContainer;
//# sourceMappingURL=EventSystemContainer.d.ts.map