import React, { type ReactNode } from 'react';
import { type HiveError } from '../ErrorHandling/ErrorBoundary';
import { type LoadingResource, type CampusLoadingContext } from '../Loading/LoadingOrchestrator';
interface SuspenseBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    loadingStrategy?: 'minimal' | 'detailed' | 'branded' | 'progressive';
    loadingResources?: LoadingResource[];
    campusContext?: CampusLoadingContext;
    errorFallback?: (error: HiveError, retry: () => void) => ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    context?: {
        user?: {
            id: string;
            name?: string;
            email?: string;
        };
        campus?: {
            id: string;
            name?: string;
        };
        pageType?: 'profile' | 'spaces' | 'tools' | 'feed';
        feature?: string;
    };
    enablePreloading?: boolean;
    timeout?: number;
    className?: string;
}
export declare const SuspenseBoundary: React.FC<SuspenseBoundaryProps>;
export declare const ProfileSuspenseBoundary: React.FC<Omit<SuspenseBoundaryProps, 'context'> & {
    userId?: string;
    userName?: string;
}>;
export declare const SpacesSuspenseBoundary: React.FC<Omit<SuspenseBoundaryProps, 'context'> & {
    spaceId?: string;
}>;
export declare const ToolsSuspenseBoundary: React.FC<Omit<SuspenseBoundaryProps, 'context'> & {
    toolId?: string;
}>;
export declare const FeedSuspenseBoundary: React.FC<Omit<SuspenseBoundaryProps, 'context'>>;
export default SuspenseBoundary;
export type { SuspenseBoundaryProps };
//# sourceMappingURL=SuspenseBoundary.d.ts.map