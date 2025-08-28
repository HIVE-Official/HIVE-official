'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { cn } from '../lib/utils';
import { Text } from '../../atomic/atoms/text';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout';

// Loading orchestration strategies
type LoadingStrategy = 
  | 'predictive'     // Predict what user will need next
  | 'priority-based' // Load critical content first
  | 'progressive'    // Load in stages with visual feedback
  | 'background'     // Load while showing placeholder content
  | 'optimistic';    // Show expected result while loading

// Resource priority levels
type ResourcePriority = 'critical' | 'high' | 'medium' | 'low' | 'background';

// Loading phases for orchestrated experience
type LoadingPhase = 
  | 'initializing'   // First moment, show instant feedback
  | 'fetching'       // Actively loading data
  | 'processing'     // Data received, processing
  | 'rendering'      // Creating UI
  | 'finalizing'     // Last touches, animations
  | 'complete';      // Done, ready to show

// Campus context for network-aware loading
type CampusLoadingContext = {
  networkQuality: 'excellent' | 'good' | 'fair' | 'poor';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'late-night';
  campusLoad: 'low' | 'medium' | 'high' | 'peak'; // Network congestion
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'library-computer';
};

// Resource definition for orchestrated loading
interface LoadingResource {
  id: string;
  name: string;
  priority: ResourcePriority;
  estimatedTime: number; // milliseconds
  dependencies?: string[]; // Resource IDs this depends on
  skipOnSlowNetwork?: boolean;
  offlineCapable?: boolean;
}

// User journey context for predictive loading
interface UserJourneyContext {
  currentPage: 'profile' | 'spaces' | 'tools' | 'feed' | 'onboarding';
  previousPage?: string;
  userPattern?: 'explorer' | 'creator' | 'social' | 'focused'; // Predicted behavior
  timeSpent: number; // Time on current page
  commonNextActions?: string[]; // What they usually do next
}

interface LoadingOrchestratorProps {
  // Core configuration
  resources: LoadingResource[];
  strategy?: LoadingStrategy;
  
  // Context for smart loading
  campusContext?: CampusLoadingContext;
  userJourney?: UserJourneyContext;
  
  // Visual customization
  showProgress?: boolean;
  showPredictions?: boolean;
  showNetworkStatus?: boolean;
  enablePerformanceTheater?: boolean; // Show what's happening behind scenes
  
  // Campus-specific features
  adaptToCampusNetwork?: boolean;
  enableDataSaver?: boolean;
  showStudentFriendlyMessages?: boolean;
  
  // Callbacks
  onPhaseChange?: (phase: LoadingPhase, resource?: LoadingResource) => void;
  onResourceComplete?: (resource: LoadingResource) => void;
  onAllComplete?: () => void;
  onError?: (error: Error, resource?: LoadingResource) => void;
  
  // Render props
  children?: (state: LoadingState) => React.ReactNode;
  fallback?: React.ReactNode;
  
  className?: string;
}

// Comprehensive loading state
interface LoadingState {
  phase: LoadingPhase;
  progress: number; // 0-100
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

// Custom hook for orchestrated loading
function useLoadingOrchestrator(
  resources: LoadingResource[],
  strategy: LoadingStrategy,
  campusContext?: CampusLoadingContext
) {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    phase: 'initializing',
    progress: 0,
    completedResources: [],
    failedResources: [],
    estimatedTimeRemaining: 0,
    isOptimistic: strategy === 'optimistic',
    networkOptimized: false,
    predictions: {
      nextLikelyActions: [],
      preloadingInBackground: []
    }
  });
  
  const activeLoadingRef = useRef<Map<string, Promise<any>>>(new Map());
  const startTimeRef = useRef<number>(Date.now());
  
  // Calculate total estimated time considering network conditions
  const totalEstimatedTime = useMemo(() => {
    let baseTime = resources.reduce((sum, resource) => sum + resource.estimatedTime, 0);
    
    // Adjust for network conditions
    if (campusContext) {
      const networkMultipliers = {
        excellent: 0.7,
        good: 1.0,
        fair: 1.5,
        poor: 2.5
      };
      baseTime *= networkMultipliers[campusContext.networkQuality];
      
      // Adjust for campus load
      const loadMultipliers = {
        low: 0.8,
        medium: 1.0,
        high: 1.3,
        peak: 2.0
      };
      baseTime *= loadMultipliers[campusContext.campusLoad];
    }
    
    return Math.round(baseTime);
  }, [resources, campusContext]);
  
  // Prioritize resources based on strategy and context
  const prioritizedResources = useMemo(() => {
    let sorted = [...resources];
    
    switch (strategy) {
      case 'priority-based':
        sorted.sort((a, b) => {
          const priorityOrder = { critical: 5, high: 4, medium: 3, low: 2, background: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        break;
      
      case 'predictive':
        // Sort by likely user needs (simplified logic)
        sorted.sort((a, b) => {
          const criticalFirst = a.priority === 'critical' ? -1 : b.priority === 'critical' ? 1 : 0;
          return criticalFirst || a.estimatedTime - b.estimatedTime;
        });
        break;
      
      case 'progressive':
        // Load in stages: critical → high → medium → low → background
        sorted.sort((a, b) => {
          const priorityOrder = { critical: 5, high: 4, medium: 3, low: 2, background: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        break;
    }
    
    // Filter out resources that should be skipped on slow networks
    if (campusContext?.networkQuality === 'poor') {
      sorted = sorted.filter(resource => !resource.skipOnSlowNetwork);
    }
    
    return sorted;
  }, [resources, strategy, campusContext]);
  
  // Load resources with orchestration
  const loadResources = useCallback(async () => {
    setLoadingState(prev => ({ ...prev, phase: 'fetching' }));
    
    const dependencyGraph = new Map<string, string[]>();
    prioritizedResources.forEach(resource => {
      dependencyGraph.set(resource.id, resource.dependencies || []);
    });
    
    // Process resources respecting dependencies
    const processedResources = new Set<string>();
    
    for (const resource of prioritizedResources) {
      // Check if dependencies are met
      const canProcess = (resource.dependencies || []).every(dep => 
        processedResources.has(dep)
      );
      
      if (!canProcess) {
        // Skip for now, will be retried
        continue;
      }
      
      try {
        setLoadingState(prev => ({
          ...prev,
          currentResource: resource,
          phase: 'processing'
        }));
        
        // Simulate resource loading (replace with actual loading logic)
        const loadingPromise = new Promise((resolve) => {
          setTimeout(resolve, resource.estimatedTime);
        });
        
        activeLoadingRef.current.set(resource.id, loadingPromise);
        await loadingPromise;
        
        processedResources.add(resource.id);
        
        setLoadingState(prev => {
          const newCompleted = [...prev.completedResources, resource.id];
          const progress = Math.round((newCompleted.length / prioritizedResources.length) * 100);
          const elapsedTime = Date.now() - startTimeRef.current;
          const avgTimePerResource = elapsedTime / newCompleted.length;
          const remainingResources = prioritizedResources.length - newCompleted.length;
          const estimatedTimeRemaining = Math.max(0, avgTimePerResource * remainingResources);
          
          return {
            ...prev,
            completedResources: newCompleted,
            progress,
            estimatedTimeRemaining,
            phase: newCompleted.length === prioritizedResources.length ? 'finalizing' : 'processing'
          };
        });
        
      } catch (error) {
        console.error(`Failed to load resource ${resource.id}:`, error);
        setLoadingState(prev => ({
          ...prev,
          failedResources: [...prev.failedResources, resource.id]
        }));
      }
    }
    
    // Finalization phase
    setLoadingState(prev => ({ ...prev, phase: 'finalizing' }));
    await new Promise(resolve => setTimeout(resolve, 200)); // Allow UI to settle
    
    setLoadingState(prev => ({ ...prev, phase: 'complete' }));
  }, [prioritizedResources]);
  
  // Start loading on mount
  useEffect(() => {
    loadResources();
  }, [loadResources]);
  
  return loadingState;
}

// Generate contextual loading messages
function generateLoadingMessage(
  phase: LoadingPhase,
  resource?: LoadingResource,
  campusContext?: CampusLoadingContext,
  userJourney?: UserJourneyContext
): string {
  const studentFriendly = {
    initializing: [
      "Getting HIVE ready for you! 😊",
      "Warming up your campus connection...",
      "HIVE is loading - grab a coffee? ☕",
    ],
    fetching: [
      "Pulling in your latest updates...",
      "Syncing with your campus community...",
      "Loading what matters most to you...",
    ],
    processing: [
      "Almost there - organizing everything...",
      "Making sure everything looks perfect...",
      "Fine-tuning your experience...",
    ],
    rendering: [
      "Building your personalized view...",
      "Putting the finishing touches on...",
      "Creating your dashboard...",
    ],
    finalizing: [
      "Just a moment more...",
      "Adding the final details...",
      "Almost ready to go!",
    ],
    complete: [
      "Welcome to HIVE! 🎆",
      "You're all set!",
      "Ready to get things done!",
    ]
  };
  
  const messages = studentFriendly[phase] || studentFriendly.initializing;
  
  // Add context-specific messages
  if (campusContext?.networkQuality === 'poor') {
    return "Campus Wi-Fi is a bit slow today - hang tight! 📶";
  }
  
  if (userJourney?.currentPage === 'tools' && phase === 'processing') {
    return "Loading your tools and creations...";
  }
  
  // Random selection from appropriate messages
  return messages[Math.floor(Math.random() * messages.length)];
}

export const LoadingOrchestrator: React.FC<LoadingOrchestratorProps> = ({
  resources,
  strategy = 'progressive',
  campusContext,
  userJourney,
  showProgress = true,
  showPredictions = false,
  showNetworkStatus = true,
  enablePerformanceTheater = false,
  adaptToCampusNetwork = true,
  enableDataSaver = false,
  showStudentFriendlyMessages = true,
  onPhaseChange,
  onResourceComplete,
  onAllComplete,
  onError,
  children,
  fallback,
  className
}) => {
  const viewport = useAdvancedViewport();
  const loadingState = useLoadingOrchestrator(resources, strategy, campusContext);
  const [currentMessage, setCurrentMessage] = useState('');
  
  // Update message based on loading state
  useEffect(() => {
    const message = generateLoadingMessage(
      loadingState.phase,
      loadingState.currentResource,
      campusContext,
      userJourney
    );
    setCurrentMessage(message);
  }, [loadingState.phase, loadingState.currentResource, campusContext, userJourney]);
  
  // Notify of phase changes
  useEffect(() => {
    if (onPhaseChange) {
      onPhaseChange(loadingState.phase, loadingState.currentResource);
    }
  }, [loadingState.phase, loadingState.currentResource, onPhaseChange]);
  
  // Notify when complete
  useEffect(() => {
    if (loadingState.phase === 'complete' && onAllComplete) {
      onAllComplete();
    }
  }, [loadingState.phase, onAllComplete]);
  
  // If complete and children provided, render them
  if (loadingState.phase === 'complete' && children) {
    return <>{children(loadingState)}</>;
  }
  
  // If complete and no children, don't render anything
  if (loadingState.phase === 'complete') {
    return null;
  }
  
  // Render custom fallback if provided
  if (fallback) {
    return <>{fallback}</>;
  }
  
  return (
    <div className={cn(
      'flex flex-col items-center justify-center min-h-screen bg-hive-background-primary',
      className
    )}>
      {/* Main loading animation */}
      <div className="relative mb-8">
        {/* Hexagon loading animation (HIVE brand) */}
        <div className="relative w-20 h-20">
          <div className={cn(
            'absolute inset-0 border-4 border-hive-gold/20 animate-spin',
            'rounded-lg transform rotate-45'
          )} />
          <div className={cn(
            'absolute inset-2 border-4 border-hive-gold animate-pulse',
            'rounded-lg transform rotate-45'
          )} />
          <div className="absolute inset-6 bg-hive-gold rounded-sm animate-bounce" />
        </div>
        
        {/* Progress ring */}
        {showProgress && (
          <div className="absolute -inset-4">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-hive-border-default/20"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-hive-gold transition-all duration-500 ease-out"
                style={{
                  strokeDasharray: '283', // 2π * 45
                  strokeDashoffset: 283 - (loadingState.progress / 100) * 283
                }}
              />
            </svg>
          </div>
        )}
      </div>
      
      {/* Loading message */}
      <div className="text-center space-y-3 max-w-md">
        {showStudentFriendlyMessages && (
          <Text 
            variant="heading-md" 
            color="primary"
            className="font-medium animate-pulse"
          >
            {currentMessage}
          </Text>
        )}
        
        {/* Progress details */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-hive-text-secondary">
              <span>{loadingState.progress}% complete</span>
              {loadingState.estimatedTimeRemaining > 0 && (
                <>
                  <span>•</span>
                  <span>{Math.ceil(loadingState.estimatedTimeRemaining / 1000)}s remaining</span>
                </>
              )}
            </div>
            
            {/* Progress bar */}
            <div className="w-64 h-1 bg-hive-border-default/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-hive-gold transition-all duration-300 ease-out"
                style={{ width: `${loadingState.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Network status */}
      {showNetworkStatus && campusContext && (
        <div className="mt-6 flex items-center space-x-2 text-xs text-hive-text-tertiary">
          <span>📶</span>
          <span>
            {campusContext.networkQuality} connection • {campusContext.campusLoad} campus load
          </span>
        </div>
      )}
      
      {/* Performance theater */}
      {enablePerformanceTheater && (
        <div className="mt-8 space-y-2 text-center">
          <Text variant="body-xs" color="muted" className="font-mono">
            Current: {loadingState.currentResource?.name || 'Initializing'}
          </Text>
          <Text variant="body-xs" color="muted" className="font-mono">
            Phase: {loadingState.phase}
          </Text>
          <Text variant="body-xs" color="muted" className="font-mono">
            Completed: {loadingState.completedResources.length}/{resources.length}
          </Text>
        </div>
      )}
      
      {/* Predictions */}
      {showPredictions && loadingState.predictions.nextLikelyActions.length > 0 && (
        <div className="mt-6 text-center space-y-2">
          <Text variant="body-xs" color="muted">
            Getting ready for: {loadingState.predictions.nextLikelyActions.join(', ')}
          </Text>
        </div>
      )}
      
      {/* Campus-specific tips while loading */}
      {campusContext?.networkQuality === 'poor' && (
        <div className="mt-6 p-4 bg-hive-gold/5 border border-hive-gold/20 rounded-lg max-w-sm text-center">
          <Text variant="body-sm" color="secondary">
            💡 Tip: Try moving closer to a Wi-Fi access point or using mobile data!
          </Text>
        </div>
      )}
    </div>
  );
};

// Export utilities
export { useLoadingOrchestrator, generateLoadingMessage };
export type { 
  LoadingOrchestratorProps,
  LoadingStrategy,
  LoadingPhase,
  LoadingResource,
  LoadingState,
  CampusLoadingContext,
  UserJourneyContext
};