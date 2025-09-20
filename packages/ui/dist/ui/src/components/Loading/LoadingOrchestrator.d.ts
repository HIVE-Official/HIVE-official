import React from 'react';
type LoadingStrategy = 'predictive' | 'priority-based' | 'progressive' | 'background' | 'optimistic';
type ResourcePriority = 'critical' | 'high' | 'medium' | 'low' | 'background';
type LoadingPhase = 'initializing' | 'fetching' | 'processing' | 'rendering' | 'finalizing' | 'complete';
type CampusLoadingContext = {
    networkQuality: 'excellent' | 'good' | 'fair' | 'poor';
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'late-night';
    campusLoad: 'low' | 'medium' | 'high' | 'peak';
    deviceType: 'mobile' | 'tablet' | 'desktop' | 'library-computer';
};
interface LoadingResource {
    id: string;
    name: string;
    priority: ResourcePriority;
    estimatedTime: number;
    dependencies?: string[];
    skipOnSlowNetwork?: boolean;
    offlineCapable?: boolean;
}
interface UserJourneyContext {
    currentPage: 'profile' | 'spaces' | 'tools' | 'feed' | 'onboarding';
    previousPage?: string;
    userPattern?: 'explorer' | 'creator' | 'social' | 'focused';
    timeSpent: number;
    commonNextActions?: string[];
}
interface LoadingOrchestratorProps {
    resources: LoadingResource[];
    strategy?: LoadingStrategy;
    campusContext?: CampusLoadingContext;
    userJourney?: UserJourneyContext;
    showProgress?: boolean;
    showPredictions?: boolean;
    showNetworkStatus?: boolean;
    enablePerformanceTheater?: boolean;
    adaptToCampusNetwork?: boolean;
    enableDataSaver?: boolean;
    showStudentFriendlyMessages?: boolean;
    onPhaseChange?: (phase: LoadingPhase, resource?: LoadingResource) => void;
    onResourceComplete?: (resource: LoadingResource) => void;
    onAllComplete?: () => void;
    onError?: (error: Error, resource?: LoadingResource) => void;
    children?: (state: LoadingState) => React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
}
interface LoadingState {
    phase: LoadingPhase;
    progress: number;
    currentResource?: LoadingResource;
    completedResources: string[];
    failedResources: string[];
    estimatedTimeRemaining: number;
    isOptimistic: boolean;
    networkOptimized: boolean;
    predictions: {
        nextLikelyActions: string[];
        preloadingInBackground: string[];
    };
}
declare function useLoadingOrchestrator(resources: LoadingResource[], strategy: LoadingStrategy, campusContext?: CampusLoadingContext): void;
declare function generateLoadingMessage(phase: LoadingPhase, resource?: LoadingResource, campusContext?: CampusLoadingContext, userJourney?: UserJourneyContext): string;
export declare const LoadingOrchestrator: React.FC<LoadingOrchestratorProps>;
export { useLoadingOrchestrator, generateLoadingMessage };
export type { LoadingOrchestratorProps, LoadingStrategy, LoadingPhase, LoadingResource, LoadingState, CampusLoadingContext, UserJourneyContext };
//# sourceMappingURL=LoadingOrchestrator.d.ts.map