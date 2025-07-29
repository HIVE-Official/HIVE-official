import React from 'react';
export interface ToolConfiguration {
    theme: 'light' | 'dark' | 'auto';
    primaryColor: string;
    backgroundColor: string;
    allowMultipleSubmissions: boolean;
    requireAuthentication: boolean;
    showProgressBar: boolean;
    autoSave: boolean;
    trackingEnabled: boolean;
    allowAnalyticsOptOut: boolean;
}
export interface ToolState {
    id: string;
    name: string;
    icon: string;
    status: 'loading' | 'ready' | 'error' | 'updating';
    version: string;
    lastSync: Date;
    dataSize: number;
    isConnected: boolean;
    analytics: {
        sessions: number;
        totalTime: number;
        lastUsed: Date;
        errorCount: number;
    };
}
export interface EventSystemContext {
    systemId: string;
    installedComponents: string[];
    registerComponent: (componentId: string, componentState: any) => void;
    updateComponent: (componentId: string, updates: any) => void;
    shareData: (fromComponent: string, data: any) => void;
    subscribeToData: (componentId: string, callback: (data: any) => void) => void;
}
interface ToolContainerProps {
    toolId: string;
    installationId: string;
    configuration: ToolConfiguration;
    systemContext?: EventSystemContext;
    children: React.ReactNode;
    onStateChange?: (state: ToolState) => void;
    onConfigChange?: (config: ToolConfiguration) => void;
    onAction?: (action: string, data?: any) => void;
    className?: string;
}
export declare const ToolContainer: React.FC<ToolContainerProps>;
export default ToolContainer;
//# sourceMappingURL=ToolContainer.d.ts.map