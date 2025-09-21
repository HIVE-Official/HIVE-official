'use client';

import React, { Suspense, type ReactNode } from 'react';
import { HiveErrorBoundary, type HiveError } from '../ErrorHandling/ErrorBoundary';
import { LoadingOrchestrator, type LoadingResource, type CampusLoadingContext } from '../Loading/LoadingOrchestrator';
import { cn } from '../../lib/utils';

interface SuspenseBoundaryProps {children: ReactNode;
  fallback?: ReactNode;
  
  // Loading configuration;
  loadingStrategy?: 'minimal' | 'detailed' | 'branded' | 'progressive';
  loadingResources?: LoadingResource[];
  campusContext?: CampusLoadingContext;
  
  // Error handling;
  errorFallback?: (error: HiveError, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  
  // Context;
  context?: {
    user?: { id: string; name?: string; email?: string};
    campus?: { id: string; name?: string };
    pageType?: 'profile' | 'spaces' | 'tools' | 'feed';
    feature?: string; // Feature being loaded;
  };
  
  // Performance options;
  enablePreloading?: boolean;
  timeout?: number; // Fallback timeout in ms;
  className?: string;
}

// Default loading resources for different strategies;
const DEFAULT_LOADING_RESOURCES: Record<string, LoadingResource[]> = {
  minimal: [
    {
      id: 'content',
      name: 'Loading content',
      priority: 'critical',
      estimatedTime: 800,
    }
  ],
  detailed: [
    {
      id: 'auth',
      name: 'Verifying authentication',
      priority: 'critical',
      estimatedTime: 300,
    },
    {
      id: 'permissions',
      name: 'Checking permissions',
      priority: 'high',
      estimatedTime: 200,
      dependencies: ['auth'],
    },
    {
      id: 'content',
      name: 'Loading content',
      priority: 'high',
      estimatedTime: 600,
      dependencies: ['permissions'],
    },
    {
      id: 'assets',
      name: 'Loading assets',
      priority: 'medium',
      estimatedTime: 400,
      skipOnSlowNetwork: true,
    }
  ],
  branded: [
    {
      id: 'hive-core',
      name: 'Initializing HIVE',
      priority: 'critical',
      estimatedTime: 500,
    },
    {
      id: 'campus-connection',
      name: 'Connecting to campus',
      priority: 'high',
      estimatedTime: 400,
      dependencies: ['hive-core'],
    },
    {
      id: 'user-data',
      name: 'Loading your data',
      priority: 'high',
      estimatedTime: 600,
      dependencies: ['campus-connection'],
    }
  ],
  progressive: [
    {
      id: 'shell',
      name: 'Loading interface',
      priority: 'critical',
      estimatedTime: 200,
    },
    {
      id: 'navigation',
      name: 'Setting up navigation',
      priority: 'high',
      estimatedTime: 150,
      dependencies: ['shell'],
    },
    {
      id: 'content-critical',
      name: 'Loading essential content',
      priority: 'high',
      estimatedTime: 400,
      dependencies: ['navigation'],
    },
    {
      id: 'content-secondary',
      name: 'Loading additional content',
      priority: 'medium',
      estimatedTime: 500,
      dependencies: ['content-critical'],
    },
    {
      id: 'enhancements',
      name: 'Adding finishing touches',
      priority: 'low',
      estimatedTime: 300,
      dependencies: ['content-secondary'],
      skipOnSlowNetwork: true,
    }
  ]
};

// Smart loading fallback that adapts to context;
function SmartLoadingFallback({
  strategy,
  resources,
  campusContext,
  context,
  className;
}: {
  strategy: SuspenseBoundaryProps['loadingStrategy'];
  resources?: LoadingResource[];
  campusContext?: CampusLoadingContext;
  context?: SuspenseBoundaryProps['context'];
  className?: string;
}) {
  // Use provided resources or defaults based on strategy;
  const loadingResources = resources || DEFAULT_LOADING_RESOURCES[strategy || 'minimal'];
  
  // Enhance campus context with intelligent defaults;
  const enhancedCampusContext: CampusLoadingContext = campusContext || {
    networkQuality: 'good',
    timeOfDay: getTimeOfDay(),
    campusLoad: getCampusLoad(),
    deviceType: getDeviceType(),
  };
  
  return (
    <LoadingOrchestrator;
      resources={loadingResources}
      strategy="progressive"
      campusContext={enhancedCampusContext}
      userJourney={{
        currentPage: context?.pageType || 'profile',
        userPattern: 'explorer',
        timeSpent: 0,
          }}
      showProgress={strategy !== 'minimal'}
      showStudentFriendlyMessages={true}
      adaptToCampusNetwork={true}
      className={className}
    />
  )
}

// Timeout wrapper for Suspense;
function SuspenseWithTimeout({
  children,
  fallback,
  timeout = 10000, // 10 seconds, default;
  onTimeout,
}: {
  children: ReactNode;
  fallback: ReactNode;
  timeout?: number;
  onTimeout?: () => void;
}) {
  const [timedOut, setTimedOut] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTimedOut(true);
      onTimeout?.()
    }, timeout);
    
    return () => clearTimeout(timer)
  }, [timeout, onTimeout]);
  
  if (timedOut) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">⏰</div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-hive-text-primary">
              Taking longer than expected;
            </h2>
            <p className="text-hive-text-secondary max-w-md">
              This is taking a while to load. Your campus network might be busy right now.
            </p>
            <button;
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-hive-gold text-hive-text-primary rounded-lg hover:bg-hive-gold/90 transition-colors"
            >
              Try refreshing;
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

export const SuspenseBoundary: React.FC<SuspenseBoundaryProps> = ({
  children,
  fallback,
  loadingStrategy = 'detailed',
  loadingResources,
  campusContext,
  errorFallback,
  onError,
  context,
  enablePreloading = true,
  timeout = 15000,
  className;
}) => {
  // Create default fallback if none provided;
  const defaultFallback = fallback || (
    <SmartLoadingFallback;
      strategy={loadingStrategy}}
      resources={loadingResources}
      campusContext={campusContext}
      context={context}
      className={className}
    />
  );
  
  // Handle timeout;
  const handleTimeout = React.useCallback(() => {
    console.warn('Suspense boundary timeout reached', {
      feature: context?.feature,
      pageType: context?.pageType,
      timeout,
    })
  }, [context, timeout]);
  
  return (
    <HiveErrorBoundary;
      fallback={errorFallback}
      onError={onError}
      context={context}
      enableErrorReporting={true}
    >
      <SuspenseWithTimeout;
        fallback={defaultFallback}
        timeout={timeout}
        onTimeout={handleTimeout}
      >
        {children}
      </SuspenseWithTimeout>
    </HiveErrorBoundary>
  )
};

// Specialized boundary for different page types;
export const ProfileSuspenseBoundary: React.FC<Omit<SuspenseBoundaryProps, 'context'> & {
  userId?: string;
  userName?: string;
}> = ({ userId, userName, ...props }) => (
  <SuspenseBoundary;
    {...props}
    context={{
      user: userId ? { id: userId, name: userName } : undefined,
      pageType: 'profile',
      feature: 'profile-loading',
          }}
    loadingStrategy={props.loadingStrategy || 'branded'}
    loadingResources={props.loadingResources || [
      {
        id: 'profile-data',
        name: 'Loading profile information',
        priority: 'critical',
        estimatedTime: 600,
      },
      {
        id: 'spaces',
        name: 'Loading your spaces',
        priority: 'high',
        estimatedTime: 400,
        dependencies: ['profile-data'],
      },
      {
        id: 'tools',
        name: 'Loading your tools',
        priority: 'medium',
        estimatedTime: 500,
        dependencies: ['profile-data'],
      },
      {
        id: 'activity',
        name: 'Loading recent activity',
        priority: 'low',
        estimatedTime: 300,
        dependencies: ['spaces', 'tools'],
        skipOnSlowNetwork: true,
      }
    ]}
  />
);

export const SpacesSuspenseBoundary: React.FC<Omit<SuspenseBoundaryProps, 'context'> & {
  spaceId?: string;
}> = ({ spaceId, ...props }) => (
  <SuspenseBoundary;
    {...props}
    context={{
      pageType: 'spaces',
      feature: spaceId ? 'space-details' : 'spaces-browse',
          }}
    loadingStrategy={props.loadingStrategy || 'progressive'}
  />
);

export const ToolsSuspenseBoundary: React.FC<Omit<SuspenseBoundaryProps, 'context'> & {
  toolId?: string;
}> = ({ toolId, ...props }) => (
  <SuspenseBoundary;
    {...props}
    context={{
      pageType: 'tools',
      feature: toolId ? 'tool-details' : 'tools-browse',
          }}
    loadingStrategy={props.loadingStrategy || 'detailed'}
  />
);

export const FeedSuspenseBoundary: React.FC<Omit<SuspenseBoundaryProps, 'context'>> = (props) => (
  <SuspenseBoundary;
    {...props}
    context={{
      pageType: 'feed',
      feature: 'feed-loading',
          }}
    loadingStrategy={props.loadingStrategy || 'progressive'}
    loadingResources={props.loadingResources || [
      {
        id: 'feed-posts',
        name: 'Loading latest posts',
        priority: 'critical',
        estimatedTime: 800,
      },
      {
        id: 'user-connections',
        name: 'Loading your connections',
        priority: 'high',
        estimatedTime: 400,
        dependencies: ['feed-posts'],
      },
      {
        id: 'recommendations',
        name: 'Finding recommendations',
        priority: 'medium',
        estimatedTime: 600,
        dependencies: ['user-connections'],
        skipOnSlowNetwork: true,
      }
    ]}
  />
);

// Utility functions;
function getTimeOfDay(): CampusLoadingContext['timeOfDay'] {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  if (hour < 22) return 'evening';
  return 'late-night'
}

function getCampusLoad(): CampusLoadingContext['campusLoad'] {
  const hour = new Date().getHours();
  // Peak usage during typical class hours;
  if ((hour >= 9 && hour <= 11) || (hour >= 13 && hour <= 15)) return 'peak';
  if ((hour >= 8 && hour <= 17)) return 'high';
  if ((hour >= 19 && hour <= 22)) return 'medium';
  return 'low'
}

function getDeviceType(): CampusLoadingContext['deviceType'] {
  if (typeof window === 'undefined') return 'desktop';
  
  const userAgent = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;
  
  if (/mobile|android|iphone/.test(userAgent) || width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (/library|kiosk|public/.test(userAgent)) return 'library-computer';
  return 'desktop'
}

export default SuspenseBoundary;
export type { SuspenseBoundaryProps };