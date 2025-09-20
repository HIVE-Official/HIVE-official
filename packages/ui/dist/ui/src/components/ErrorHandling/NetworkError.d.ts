import React from 'react';
type NetworkCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'offline' | 'unknown';
type CampusNetworkContext = {
    type: 'campus-wifi' | 'dorm-ethernet' | 'library-wifi' | 'mobile-data' | 'public-wifi' | 'unknown';
    name?: string;
    knownIssues?: string[];
    estimatedFixTime?: string;
    alternativeSuggestions?: string[];
};
type NetworkErrorType = 'connection-lost' | 'timeout' | 'slow-connection' | 'dns-failure' | 'server-unreachable' | 'campus-maintenance' | 'bandwidth-throttled' | 'authentication-required';
interface NetworkErrorProps {
    errorType?: NetworkErrorType;
    originalError?: Error;
    networkCondition?: NetworkCondition;
    campusContext?: CampusNetworkContext;
    onRetry?: () => Promise<void>;
    onOfflineMode?: () => void;
    enableOfflineMode?: boolean;
    showCampusStatus?: boolean;
    enableNetworkTips?: boolean;
    showAlternativeLocations?: boolean;
    title?: string;
    description?: string;
    className?: string;
    onErrorReport?: (errorDetails: any) => void;
}
declare function useNetworkMonitoring(): {
    isOnline: boolean;
    networkCondition: NetworkCondition;
    connectionType: string;
    downlink: number;
};
declare function detectCampusNetwork(): CampusNetworkContext;
declare function generateCampusMessage(errorType: NetworkErrorType, campusContext: CampusNetworkContext, networkCondition: NetworkCondition): {
    title: string;
    description: string;
    encouragement: string;
    tips: string[];
};
export declare const NetworkError: React.FC<NetworkErrorProps>, errorType: any, networkCondition: any, campusContext: any, retryCount: any, onErrorReport: any;
export { useNetworkMonitoring, detectCampusNetwork, generateCampusMessage };
export type { NetworkErrorProps, NetworkCondition, CampusNetworkContext, NetworkErrorType };
//# sourceMappingURL=NetworkError.d.ts.map