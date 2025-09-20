"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback, memo, createContext, useContext } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// Enterprise HIVE Logo System
// Advanced features for large-scale deployments, A/B testing, analytics, and customization

// Global configuration context
interface HiveLogoConfig {
  // Analytics provider
  analytics?: {
    provider: 'google-analytics' | 'mixpanel' | 'amplitude' | 'custom';
    trackingId?: string;
    customTracker?: (event: string, properties: Record<string, any>) => void
  };
  
  // A/B testing framework
  abTesting?: {
    provider: 'optimizely' | 'launchdarkly' | 'split' | 'custom';
    getUserVariant?: (experimentId: string, userId?: string) => string
  };
  
  // Feature flags
  featureFlags?: {
    provider: 'launchdarkly' | 'split' | 'unleash' | 'custom';
    isEnabled?: (flagName: string) => boolean
  };
  
  // Brand customization
  brandCustomization?: {
    allowCustomColors?: boolean;
    allowCustomSizes?: boolean;
    allowLogoReplacement?: boolean;
    whitelabelMode?: boolean
  };
  
  // Performance settings
  performance?: {
    enableMetrics?: boolean;
    enableLazyLoading?: boolean;
    enablePreloading?: boolean;
    optimizeForLowEnd?: boolean
  };
  
  // Security
  security?: {
    enableCSP?: boolean;
    allowedOrigins?: string[];
    requireIntegrity?: boolean
  }
}

const HiveLogoConfigContext = createContext<HiveLogoConfig>({});

// Provider component for enterprise configuration
export const HiveLogoProvider: React.FC<{
  config: HiveLogoConfig;
  children: React.ReactNode
}> = ({ config, children }) => {
  return (
    <HiveLogoConfigContext.Provider value={config}>
      {children}
    </HiveLogoConfigContext.Provider>
  )
};

// Hook to access enterprise configuration
export const useHiveLogoConfig = () => {
  return useContext(HiveLogoConfigContext)
};

// Advanced analytics tracking
interface AnalyticsEvent {
  action: 'view' | 'click' | 'hover' | 'focus' | 'error';
  variant: string;
  context: string;
  timestamp: number;
  userId?: string;
  sessionId?: string;
  experimentId?: string;
  abVariant?: string;
  customProperties?: Record<string, any>
}

const useAnalytics = () => {
  const config = useHiveLogoConfig();
  
  const track = useCallback((event: Omit<AnalyticsEvent, 'timestamp'>) => {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
    };
    
    // Route to appropriate analytics provider
    switch (config.analytics?.provider) {
      case 'google-analytics':
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', event.action, {
            event_category: 'hive_logo',
            event_label: `${event.variant}_${event.context}`,
            custom_map: event.customProperties,
          })
        }
        break;
        
      case 'mixpanel':
        if (typeof window !== 'undefined' && (window as any).mixpanel) {
          (window as any).mixpanel.track(`Logo ${event.action}`, fullEvent)
        }
        break;
        
      case 'amplitude':
        if (typeof window !== 'undefined' && (window as any).amplitude) {
          (window as any).amplitude.getInstance().logEvent(`Logo ${event.action}`, fullEvent)
        }
        break;
        
      case 'custom':
        config.analytics?.customTracker?.(event.action, fullEvent);
        break;
        
      default:
        // Fallback to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[HIVE Analytics]', fullEvent)
        }
    }
  }, [config.analytics]);
  
  return { track }
};

// A/B testing hook
const useABTesting = (experimentId: string, variants: string[], userId?: string) => {
  const config = useHiveLogoConfig();
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  
  useEffect(() => {
    if (!experimentId || variants.length === 0) {
      setSelectedVariant(variants[0] || '');
      return
    }
    
    let variant = '';
    
    switch (config.abTesting?.provider) {
      case 'optimizely':
        // Optimizely integration
        if (typeof window !== 'undefined' && (window as any).optimizely) {
          variant = (window as any).optimizely.get('state').getVariationMap()[experimentId] || variants[0]
        }
        break;
        
      case 'launchdarkly':
        // LaunchDarkly integration
        variant = config.abTesting?.getUserVariant?.(experimentId, userId) || variants[0];
        break;
        
      case 'split':
        // Split.io integration
        if (typeof window !== 'undefined' && (window as any).splitio) {
          const client = (window as any).splitio.client;
          variant = client?.getTreatment(experimentId) || variants[0]
        }
        break;
        
      case 'custom':
        variant = config.abTesting?.getUserVariant?.(experimentId, userId) || variants[0];
        break;
        
      default:
        // Simple hash-based assignment for fallback
        if (userId) {
          const hash = userId.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
          }, 0);
          variant = variants[Math.abs(hash) % variants.length]
        } else {
          variant = variants[0]
        }
    }
    
    setSelectedVariant(variant)
  }, [experimentId, variants, userId, config.abTesting]);
  
  return selectedVariant
};

// Feature flags hook
const useFeatureFlag = (flagName: string, defaultValue = false) => {
  const config = useHiveLogoConfig();
  const [isEnabled, setIsEnabled] = useState(defaultValue);
  
  useEffect(() => {
    if (!config.featureFlags?.isEnabled) {
      setIsEnabled(defaultValue);
      return
    }
    
    const enabled = config.featureFlags.isEnabled(flagName);
    setIsEnabled(enabled)
  }, [flagName, defaultValue, config.featureFlags]);
  
  return isEnabled
};

// Performance monitoring hook
const usePerformanceMonitoring = (componentName: string) => {
  const config = useHiveLogoConfig();
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    cacheHitRate: 0,
  });
  
  useEffect(() => {
    if (!config.performance?.enableMetrics) return;
    
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.includes(componentName)) {
          setMetrics(prev => ({
            ...prev,
            renderTime: entry.duration,
          }))
        }
      }
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    return () => observer.disconnect()
  }, [componentName, config.performance]);
  
  return metrics
};

// Enterprise logo component with all advanced features
interface EnterpriseLogoProps {
  // Core props
  variant?: 'primary' | 'gold' | 'inverted' | 'custom';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  
  // Enterprise features
  experimentId?: string;
  userId?: string;
  sessionId?: string;
  
  // Customization
  customTheme?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    fontFamily?: string
  };
  
  // White-label options
  whiteLabel?: {
    companyName?: string;
    logoUrl?: string;
    hideHiveBranding?: boolean
  };
  
  // Analytics context
  context?: string;
  trackingProperties?: Record<string, any>;
  
  // Accessibility
  accessibility?: {
    ariaLabel?: string;
    announceChanges?: boolean;
    highContrast?: boolean
  };
  
  className?: string;
  onClick?: () => void
}

export const HiveLogoEnterprise = memo(({
  variant = 'primary',
  size = 'md',
  experimentId,
  userId,
  sessionId,
  customTheme,
  whiteLabel,
  context = 'default',
  trackingProperties = {},
  accessibility = {},
  className,
  onClick,
  ...props
}: EnterpriseLogoProps) => {
  const config = useHiveLogoConfig();
  const { track } = useAnalytics();
  const shouldReduceMotion = useReducedMotion();
  
  // A/B testing for logo variants
  const abVariant = useABTesting(
    experimentId || 'logo_variant_test',
    ['primary', 'gold', 'animated'],
    userId
  );
  
  // Feature flags
  const enableAnimations = useFeatureFlag('logo_animations', true);
  const enableCustomization = useFeatureFlag('logo_customization', true);
  const enableAnalytics = useFeatureFlag('logo_analytics', true);
  
  // Performance monitoring
  const performanceMetrics = usePerformanceMonitoring('HiveLogoEnterprise');
  
  // Determine final variant (A/B test overrides prop)
  const finalVariant = experimentId ? abVariant : variant;
  
  // Apply customization if enabled
  const customStyles = useMemo(() => {
    if (!enableCustomization || !customTheme) return {};
    
    return {
      color: customTheme.primaryColor,
      fontFamily: customTheme.fontFamily,
      filter: customTheme.accentColor ? `drop-shadow(0 0 4px ${customTheme.accentColor})` : undefined,
    }
  }, [enableCustomization, customTheme]);
  
  // Analytics tracking
  const handleView = useCallback(() => {
    if (!enableAnalytics) return;
    
    track({
      action: 'view',
      variant: finalVariant,
      context,
      userId,
      sessionId,
      experimentId,
      abVariant: experimentId ? abVariant : undefined,
      customProperties: {
        ...trackingProperties,
        renderTime: performanceMetrics.renderTime,
        customized: !!customTheme,
        whiteLabeled: !!whiteLabel,
      },
    })
  }, [
    enableAnalytics, track, finalVariant, context, userId, sessionId,
    experimentId, abVariant, trackingProperties, performanceMetrics, customTheme, whiteLabel
  ]);
  
  const handleClick = useCallback(() => {
    if (!enableAnalytics) return;
    
    track({
      action: 'click',
      variant: finalVariant,
      context,
      userId,
      sessionId,
      experimentId,
      abVariant: experimentId ? abVariant : undefined,
      customProperties: trackingProperties,
    });
    
    onClick?.()
  }, [
    enableAnalytics, track, finalVariant, context, userId, sessionId,
    experimentId, abVariant, trackingProperties, onClick
  ]);
  
  // Track view on mount
  useEffect(() => {
    handleView()
  }, [handleView]);
  
  // White-label rendering
  if (whiteLabel?.logoUrl) {
    return (
      <div
        className={cn("inline-flex items-center space-x-2", className)}
        onClick={handleClick}
        style={customStyles}
        {...props}
      >
        <img
          src={whiteLabel.logoUrl}
          alt={whiteLabel.companyName || 'Company logo'}
          className={cn(
            "object-contain",
            size === 'xs' && "w-4 h-4",
            size === 'sm' && "w-5 h-5",
            size === 'md' && "w-6 h-6",
            size === 'lg' && "w-8 h-8",
            size === 'xl' && "w-10 h-10",
            size === '2xl' && "w-12 h-12",
            size === '3xl' && "w-16 h-16",
            size === '4xl' && "w-20 h-20"
          )}
        />
        {whiteLabel.companyName && !whiteLabel.hideHiveBranding && (
          <span className="font-bold tracking-wide">
            {whiteLabel.companyName}
          </span>
        )}
      </div>
    )
  }
  
  // Animation configuration
  const animationProps = useMemo(() => {
    if (!enableAnimations || shouldReduceMotion) {
      return {}
    }
    
    switch (finalVariant) {
      case 'animated':
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: "spring", stiffness: 200, damping: 20 } as any,
        };
      default:
        return {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.98 },
        }
    }
  }, [enableAnimations, shouldReduceMotion, finalVariant]);
  
  const logoVariants = cva(
    "inline-flex items-center space-x-2 transition-all duration-200 cursor-pointer",
    {
      variants: {
        variant: {
          primary: "text-[var(--hive-text-primary)]",
          gold: "text-[var(--hive-color-gold)]",
          inverted: "text-[var(--hive-background-primary)]",
          custom: "text-current",
        },
        size: {
          xs: "text-xs",
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
          xl: "text-xl",
          "2xl": "text-2xl",
          "3xl": "text-3xl",
          "4xl": "text-4xl",
        },
        accessibility: {
          normal: "",
          highContrast: "contrast-200 brightness-150",
        }
      },
      defaultVariants: {
        variant: "primary",
        size: "md",
        accessibility: "normal",
      },
    }
  );
  
  return (
    <motion.div
      className={cn(
        logoVariants({
          variant: finalVariant as any,
          size,
          accessibility: accessibility.highContrast ? 'highContrast' : 'normal',
          className,
        })
      )}
      style={customStyles}
      onClick={handleClick}
      role="img"
      aria-label={accessibility.ariaLabel || 'HIVE logo'}
      {...animationProps}
      {...props}
    >
      {/* Logo SVG */}
      <svg
        viewBox="0 0 1500 1500"
        fill="none"
        className={cn(
          "flex-shrink-0",
          size === 'xs' && "w-4 h-4",
          size === 'sm' && "w-5 h-5",
          size === 'md' && "w-6 h-6",
          size === 'lg' && "w-8 h-8",
          size === 'xl' && "w-10 h-10",
          size === '2xl' && "w-12 h-12",
          size === '3xl' && "w-16 h-16",
          size === '4xl' && "w-20 h-20"
        )}
      >
        <path
          d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
          fill="currentColor"
        />
      </svg>
      
      {/* Wordmark */}
      {!whiteLabel?.hideHiveBranding && (
        <span className="font-bold tracking-wide select-none">
          HIVE
        </span>
      )}
      
      {/* Performance metrics overlay (development only) */}
      {config.performance?.enableMetrics && process.env.NODE_ENV === 'development' && (
        <div className="absolute -top-8 left-0 text-xs text-[var(--hive-text-primary)]/60 bg-[var(--hive-background-primary)]/80 p-1 rounded whitespace-nowrap">
          {performanceMetrics.renderTime.toFixed(1)}ms
        </div>
      )}
      
      {/* A/B test indicator (development only) */}
      {experimentId && process.env.NODE_ENV === 'development' && (
        <div className="absolute -bottom-6 left-0 text-xs text-[var(--hive-color-gold)] bg-[var(--hive-background-primary)]/80 p-1 rounded whitespace-nowrap">
          A/B: {abVariant}
        </div>
      )}
    </motion.div>
  )
});

HiveLogoEnterprise.displayName = 'HiveLogoEnterprise';

// Advanced logo analytics dashboard component
export const HiveLogoAnalyticsDashboard: React.FC<{
  dateRange?: { start: Date; end: Date };
  className?: string
}> = ({ dateRange, className }) => {
  const [analyticsData, setAnalyticsData] = useState({
    totalViews: 0,
    totalClicks: 0,
    clickThroughRate: 0,
    topVariants: [] as { variant: string; count: number }[],
    performanceMetrics: {
      averageRenderTime: 0,
      slowestRender: 0,
      fastestRender: 0,
    },
  });
  
  useEffect(() => {
    // Fetch analytics data based on date range
    // This would integrate with your analytics provider
    const fetchAnalyticsData = async () => {
      // Implementation depends on your analytics provider
      // Example structure for the data you'd want to show
    };
    
    fetchAnalyticsData()
  }, [dateRange]);
  
  return (
    <div className={cn("p-6 bg-[var(--hive-background-primary)]/20 rounded-xl space-y-6", className)}>
      <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">HIVE Logo Analytics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-lg">
          <div className="text-2xl font-bold text-[var(--hive-color-gold)]">
            {analyticsData.totalViews.toLocaleString()}
          </div>
          <div className="text-[var(--hive-text-primary)]/70 text-sm">Total Views</div>
        </div>
        
        <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-lg">
          <div className="text-2xl font-bold text-[var(--hive-color-gold)]">
            {analyticsData.totalClicks.toLocaleString()}
          </div>
          <div className="text-[var(--hive-text-primary)]/70 text-sm">Total Clicks</div>
        </div>
        
        <div className="p-4 bg-[var(--hive-text-primary)]/5 rounded-lg">
          <div className="text-2xl font-bold text-[var(--hive-color-gold)]">
            {(analyticsData.clickThroughRate * 100).toFixed(1)}%
          </div>
          <div className="text-[var(--hive-text-primary)]/70 text-sm">Click-through Rate</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Top Performing Variants</h4>
        {analyticsData.topVariants.map((variant, index) => (
          <div key={variant.variant} className="flex items-center justify-between p-3 bg-[var(--hive-text-primary)]/5 rounded-lg">
            <span className="text-[var(--hive-text-primary)]">{variant.variant}</span>
            <span className="text-[var(--hive-color-gold)] font-semibold">{variant.count}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">Performance Metrics</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--hive-text-primary)]">
              {analyticsData.performanceMetrics.averageRenderTime.toFixed(1)}ms
            </div>
            <div className="text-[var(--hive-text-primary)]/70 text-xs">Avg Render</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--hive-text-primary)]">
              {analyticsData.performanceMetrics.fastestRender.toFixed(1)}ms
            </div>
            <div className="text-[var(--hive-text-primary)]/70 text-xs">Fastest</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--hive-text-primary)]">
              {analyticsData.performanceMetrics.slowestRender.toFixed(1)}ms
            </div>
            <div className="text-[var(--hive-text-primary)]/70 text-xs">Slowest</div>
          </div>
        </div>
      </div>
    </div>
  )
};

// Export enterprise components (already exported with const declarations above)