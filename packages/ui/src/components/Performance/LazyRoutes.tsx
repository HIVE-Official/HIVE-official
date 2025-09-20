'use client';

import React, { Suspense, lazy, useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '../../lib/utils';
import { LoadingOrchestrator } from '../Loading/LoadingOrchestrator';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout';

// Route priority levels for intelligent loading
type RoutePriority = 'critical' | 'high' | 'medium' | 'low' | 'background';

// User journey patterns for predictive loading
type UserPattern = 'explorer' | 'creator' | 'social' | 'focused' | 'power-user';

// Campus context for network-aware loading
interface CampusContext {
  networkQuality: 'excellent' | 'good' | 'fair' | 'poor';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'late-night';
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'library-computer';
  campusLoad: 'low' | 'medium' | 'high' | 'peak'
}

// Route definition with intelligent loading metadata
interface LazyRoute {
  id: string;
  path: string;
  component: () => Promise<{ default: React.ComponentType<any> }>;
  priority: RoutePriority;
  
  // Predictive loading hints
  commonNextRoutes?: string[]; // Routes users often visit after this one
  userPatterns?: UserPattern[]; // Which user types commonly visit
  campusUsageHours?: number[]; // Hours when this route is most accessed
  
  // Loading optimization
  preloadTriggers?: {
    onHover?: boolean;
    onVisible?: boolean;
    onUserPattern?: boolean;
    afterDelay?: number; // ms
  };
  
  // Performance hints
  estimatedSize?: number; // KB
  dependencies?: string[]; // Other route IDs this depends on
  skipOnSlowNetwork?: boolean;
  
  // Metadata
  title?: string;
  description?: string;
  category?: 'core' | 'social' | 'creation' | 'analytics' | 'admin'
}

// Navigation analytics for pattern recognition
interface NavigationAnalytics {
  visitedRoutes: string[];
  currentSession: {
    startTime: number;
    routeSequence: string[];
    timeSpentPerRoute: Record<string, number>
  };
  userPattern?: UserPattern;
  predictedNextRoutes: string[]
}

interface LazyRoutesProps {
  routes: LazyRoute[];
  campusContext?: CampusContext;
  enablePredictiveLoading?: boolean;
  enableHoverPreloading?: boolean;
  enableAnalytics?: boolean;
  
  // Fallback components
  loadingComponent?: React.ComponentType<any>;
  errorBoundary?: React.ComponentType<any>;
  
  // Performance settings
  maxConcurrentLoads?: number;
  preloadBudget?: number; // KB to spend on preloading
  
  className?: string;
  children?: React.ReactNode
}

// Custom hook for navigation analytics and pattern recognition
function useNavigationAnalytics(routes: LazyRoute[]): NavigationAnalytics {
  const [analytics, setAnalytics] = useState<NavigationAnalytics>({
    visitedRoutes: [],
    currentSession: {
      startTime: Date.now(),
      routeSequence: [],
      timeSpentPerRoute: {}
    },
    predictedNextRoutes: []
  });
  
  const currentRouteStartTime = useRef<number>(Date.now());
  
  // Track route changes
  useEffect(() => {
    const handleRouteChange = () => {
      const currentPath = window.location.pathname;
      const currentRoute = routes.find(route => 
        currentPath === route.path || currentPath.startsWith(route.path)
      );
      
      if (currentRoute) {
        const now = Date.now();
        const timeSpent = now - currentRouteStartTime.current;
        
        setAnalytics(prev => ({
          ...prev,
          visitedRoutes: [...new Set([...prev.visitedRoutes, currentRoute.id])],
          currentSession: {
            ...prev.currentSession,
            routeSequence: [...prev.currentSession.routeSequence, currentRoute.id],
            timeSpentPerRoute: {
              ...prev.currentSession.timeSpentPerRoute,
              [currentRoute.id]: (prev.currentSession.timeSpentPerRoute[currentRoute.id] || 0) + timeSpent
            }
          }
        }));
        
        currentRouteStartTime.current = now
      }
    };
    
    // Listen for route changes (this would integrate with your router)
    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange(); // Initial call
    
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [routes]);
  
  // Analyze user patterns and predict next routes
  useEffect(() => {
    const analyzePatterns = () => {
      const { routeSequence, timeSpentPerRoute } = analytics.currentSession;
      
      // Determine user pattern based on behavior
      let userPattern: UserPattern = 'explorer';
      
      const profileTime = timeSpentPerRoute['profile'] || 0;
      const toolsTime = timeSpentPerRoute['tools'] || 0;
      const spacesTime = timeSpentPerRoute['spaces'] || 0;
      const feedTime = timeSpentPerRoute['feed'] || 0;
      
      if (toolsTime > profileTime + spacesTime + feedTime) {
        userPattern = 'creator'
      } else if (spacesTime > profileTime + toolsTime + feedTime) {
        userPattern = 'social'
      } else if (routeSequence.length < 3 && timeSpentPerRoute[routeSequence[0]] > 30000) {
        userPattern = 'focused'
      } else if (Object.keys(timeSpentPerRoute).length > 5) {
        userPattern = 'power-user'
      }
      
      // Predict next routes based on current route and user pattern
      const currentRoute = routes.find(r => r.path === window.location.pathname);
      const predictedRoutes = currentRoute?.commonNextRoutes || [];
      
      // Add pattern-based predictions
      const patternRoutes = routes
        .filter(route => route.userPatterns?.includes(userPattern))
        .map(route => route.id)
        .slice(0, 3);
      
      setAnalytics(prev => ({
        ...prev,
        userPattern,
        predictedNextRoutes: [...new Set([...predictedRoutes, ...patternRoutes])]
      })})
    };
    
    const timer = setTimeout(analyzePatterns, 2000); // Analyze after 2 seconds
    return () => clearTimeout(timer)
  }, [analytics.currentSession, routes]);
  
  return analytics
}

// Smart preloading manager
class SmartPreloader {
  private static instance: SmartPreloader;
  private loadedChunks = new Set<string>();
  private loadingChunks = new Set<string>();
  private preloadBudgetUsed = 0;
  private maxBudget: number;
  
  constructor(maxBudget = 1024) { // 1MB default budget
    this.maxBudget = maxBudget
  }
  
  static getInstance(maxBudget?: number): SmartPreloader {
    if (!SmartPreloader.instance) {
      SmartPreloader.instance = new SmartPreloader(maxBudget)
    }
    return SmartPreloader.instance
  }
  
  async preloadRoute(
    route: LazyRoute,
    priority: 'high' | 'medium' | 'low' = 'medium',
    campusContext?: CampusContext
  ): Promise<boolean> {
    // Skip if already loaded or loading
    if (this.loadedChunks.has(route.id) || this.loadingChunks.has(route.id)) {
      return true
    }
    
    // Skip if over budget
    if (route.estimatedSize && this.preloadBudgetUsed + route.estimatedSize > this.maxBudget) {
      console.log(`Skipping preload of ${route.id} - over budget`);
      return false
    }
    
    // Skip on slow networks for non-critical routes
    if (campusContext?.networkQuality === 'poor' && route.skipOnSlowNetwork) {
      console.log(`Skipping preload of ${route.id} - slow network`);
      return false
    }
    
    try {
      this.loadingChunks.add(route.id);
      
      // Use different strategies based on priority
      if (priority === 'high') {
        // Immediate preload
        await route.component()
      } else if (priority === 'medium') {
        // Preload on idle
        await new Promise(resolve => {
          if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
              route.component().then(resolve)
            })
          } else {
            setTimeout(() => {
              route.component().then(resolve)
            }, 100)
          }
        })
      } else {
        // Low priority - preload with delay
        await new Promise(resolve => {
          setTimeout(() => {
            route.component().then(resolve)
          }, 1000)
        })
      }
      
      this.loadedChunks.add(route.id);
      this.preloadBudgetUsed += route.estimatedSize || 50; // Default 50KB estimate
      
      console.log(`Preloaded route: ${route.id}`);
      return true
      
    } catch (error) {
      console.error(`Failed to preload route ${route.id}:`, error);
      return false
    } finally {
      this.loadingChunks.delete(route.id)
    }
  }
  
  getStats() {
    return {
      loadedChunks: this.loadedChunks.size,
      budgetUsed: this.preloadBudgetUsed,
      maxBudget: this.maxBudget,
      budgetRemaining: this.maxBudget - this.preloadBudgetUsed
    }
  }
}

export const LazyRoutes: React.FC<LazyRoutesProps> = ({
  routes,
  campusContext,
  enablePredictiveLoading = true,
  enableHoverPreloading = true,
  enableAnalytics = true,
  loadingComponent,
  errorBoundary,
  maxConcurrentLoads = 3,
  preloadBudget = 1024,
  className,
  children
}) => {
  const viewport = useAdvancedViewport();
  const analytics = useNavigationAnalytics(routes);
  const preloader = SmartPreloader.getInstance(preloadBudget);
  const [preloadedRoutes, setPreloadedRoutes] = useState<Set<string>>(new Set());
  
  // Predictive preloading based on user patterns
  useEffect(() => {
    if (!enablePredictiveLoading) return;
    
    const preloadPredictedRoutes = async () => {
      const routesToPreload = analytics.predictedNextRoutes
        .map(routeId => routes.find(r => r.id === routeId))
        .filter((route): route is LazyRoute => {
          return route !== undefined && !preloadedRoutes.has(route.id)
        })}}}
        .slice(0, maxConcurrentLoads);
      
      for (const route of routesToPreload) {
        const success = await preloader.preloadRoute(route, 'medium', campusContext);
        if (success) {
          setPreloadedRoutes(prev => new Set([...prev, route.id]))
        }
      }
    };
    
    const timer = setTimeout(preloadPredictedRoutes, 1000);
    return () => clearTimeout(timer)
  }, [analytics.predictedNextRoutes, enablePredictiveLoading, routes, campusContext, maxConcurrentLoads]);
  
  // Campus-aware preloading strategy
  useEffect(() => {
    if (!campusContext) return;
    
    const strategicPreload = async () => {
      // During low campus load, preload more aggressively
      if (campusContext.campusLoad === 'low' && campusContext.networkQuality !== 'poor') {
        const highPriorityRoutes = routes
          .filter(route => route.priority === 'high' && !preloadedRoutes.has(route.id))
          .slice(0, 2);
        
        for (const route of highPriorityRoutes) {
          const success = await preloader.preloadRoute(route, 'high', campusContext);
          if (success) {
            setPreloadedRoutes(prev => new Set([...prev, route.id]))
          }
        }
      }
      
      // Time-based preloading for common campus usage patterns
      const currentHour = new Date().getHours();
      const timeBasedRoutes = routes
        .filter(route => 
          route.campusUsageHours?.includes(currentHour) && 
          !preloadedRoutes.has(route.id)
        )
        .slice(0, 1);
      
      for (const route of timeBasedRoutes) {
        await preloader.preloadRoute(route, 'low', campusContext)
      }
    };
    
    const timer = setTimeout(strategicPreload, 2000);
    return () => clearTimeout(timer)
  }, [campusContext, routes]);
  
  // Create lazy components with enhanced loading states
  const createLazyComponent = (route: LazyRoute) => {
    const LazyComponent = lazy(route.component);
    
    return React.forwardRef<any, any>((props, ref) => {
      // Custom loading component with route context
      const CustomLoading = loadingComponent || (() => (
        <LoadingOrchestrator
          resources={[
            {
              id: route.id,
              name: route.title || route.id,
              priority: route.priority === 'critical' ? 'critical' : 'high',
              estimatedTime: route.estimatedSize ? route.estimatedSize * 10 : 1000
            }
          ]}
          campusContext={campusContext}
          showStudentFriendlyMessages
          className="min-h-[50vh]"
        />
      ));
      
      return (
        <Suspense fallback={<CustomLoading />}>
          <LazyComponent ref={ref} {...props} />
        </Suspense>
      )
    })
  };
  
  // Hover preloading handler
  const handleHoverPreload = useCallback(async (route: LazyRoute) => {
    if (!enableHoverPreloading || preloadedRoutes.has(route.id)) return;
    
    const success = await preloader.preloadRoute(route, 'high', campusContext);
    if (success) {
      setPreloadedRoutes(prev => new Set([...prev, route.id]))
    }
  }, [enableHoverPreloading, campusContext]);
  
  return (
    <div className={cn('w-full', className)}>
      {children}
      
      {/* Development tools */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/90 text-white text-xs p-3 rounded-lg font-mono z-50 max-w-xs">
          <div className="font-semibold mb-2">LazyRoutes Debug</div>
          <div>Preloaded: {preloadedRoutes.size}</div>
          <div>User Pattern: {analytics.userPattern}</div>
          <div>Budget Used: {preloader.getStats().budgetUsed}KB</div>
          <div>Predicted Next: {analytics.predictedNextRoutes.slice(0, 2).join(', ')}</div>
          <div>Network: {campusContext?.networkQuality || 'unknown'}</div>
          <div>Campus Load: {campusContext?.campusLoad || 'unknown'}</div>
        </div>
      )}
    </div>
  )
};

// Utility function to create route configurations
export function createLazyRoute(
  id: string,
  path: string,
  component: () => Promise<{ default: React.ComponentType<any> }>,
  options: Partial<Omit<LazyRoute, 'id' | 'path' | 'component'>> = {}
): LazyRoute {
  return {
    id,
    path,
    component,
    priority: 'medium',
    preloadTriggers: {
      onHover: true,
      onVisible: false,
      onUserPattern: true
    },
    ...options
  }
}

// Export utilities and types
export { SmartPreloader, useNavigationAnalytics };
export type {
  LazyRoutesProps,
  LazyRoute,
  RoutePriority,
  UserPattern,
  CampusContext,
  NavigationAnalytics
};