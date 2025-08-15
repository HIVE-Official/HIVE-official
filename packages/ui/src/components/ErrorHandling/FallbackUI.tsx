'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';
import { Text } from '../../ui/text';
import { Button } from '../../ui/button';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout';

// Fallback strategies for different failure scenarios
type FallbackStrategy = 
  | 'progressive-disclosure' // Hide advanced features, keep core functionality
  | 'simplified-mode'        // Switch to basic version of interface
  | 'cached-content'         // Show last known good state
  | 'offline-capable'        // Enable offline-first features
  | 'essential-only'         // Strip to bare minimum functionality
  | 'graceful-exit';         // Provide clear path to working areas

// Feature categories for intelligent degradation
type FeatureCategory = 
  | 'core'           // Essential features (profile, basic navigation)
  | 'social'         // Social features (spaces, feed)
  | 'creation'       // Tool building, content creation
  | 'analytics'      // Dashboards, insights
  | 'advanced'       // Power user features
  | 'experimental';  // Beta features

// Fallback contexts for different HIVE areas
type FallbackContext = {
  area: 'profile' | 'spaces' | 'tools' | 'feed' | 'onboarding' | 'auth' | 'global';
  user?: {
    isBuilder?: boolean;
    hasCreatedTools?: boolean;
    campusRole?: 'student' | 'faculty' | 'admin';
  };
  criticalFeatures: FeatureCategory[];
  availableOffline?: string[];
};

interface FallbackUIProps {
  // Failure details
  reason?: string;
  failedFeatures?: FeatureCategory[];
  severity?: 'minor' | 'moderate' | 'severe' | 'critical';
  
  // Fallback configuration
  strategy?: FallbackStrategy;
  context?: FallbackContext;
  
  // Available alternatives
  workingFeatures?: string[];
  cachedData?: any;
  offlineCapabilities?: string[];
  
  // Recovery options
  onRetry?: () => Promise<void>;
  onSwitchMode?: (mode: 'simplified' | 'offline' | 'essential') => void;
  onNavigateToWorking?: (area: string) => void;
  
  // Customization
  title?: string;
  description?: string;
  encouragingMessage?: string;
  showFeatureStatus?: boolean;
  
  className?: string;
  children?: React.ReactNode;
}

// Intelligent feature prioritization based on user context
function prioritizeFeatures(
  context: FallbackContext,
  failedFeatures: FeatureCategory[]
): {
  stillWorking: FeatureCategory[];
  degraded: FeatureCategory[];
  unavailable: FeatureCategory[];
} {
  const allFeatures: FeatureCategory[] = ['core', 'social', 'creation', 'analytics', 'advanced', 'experimental'];
  
  const stillWorking = allFeatures.filter(feature => 
    !failedFeatures.includes(feature) && 
    context.criticalFeatures.includes(feature)
  );
  
  const degraded = allFeatures.filter(feature => 
    !failedFeatures.includes(feature) && 
    !context.criticalFeatures.includes(feature)
  );
  
  const unavailable = failedFeatures;
  
  return { stillWorking, degraded, unavailable };
}

// Generate contextual messaging based on what's affected
function generateFallbackMessage(
  context: FallbackContext,
  failedFeatures: FeatureCategory[],
  severity: string
): {
  title: string;
  description: string;
  encouragement: string;
  alternatives: string[];
} {
  const { area, user } = context;
  
  // Area-specific messaging
  const areaMessages = {
    profile: {
      title: "Your profile is running in safe mode",
      description: "Some advanced features are temporarily unavailable, but your core profile works perfectly.",
      encouragement: "Your data is safe and your essential tools are ready to go!"
    },
    spaces: {
      title: "Spaces are running with essential features",
      description: "Community features are working, but some advanced collaboration tools are temporarily down.",
      encouragement: "You can still connect with your campus communities!"
    },
    tools: {
      title: user?.isBuilder ? "Builder mode simplified" : "Tools in basic mode",
      description: user?.isBuilder 
        ? "Advanced building features are down, but you can still use and share your existing tools."
        : "Tool creation is limited right now, but all your saved tools work perfectly.",
      encouragement: user?.isBuilder 
        ? "Your creations are safe - just limited editing for now!"
        : "Perfect time to explore tools others have shared!"
    },
    feed: {
      title: "Feed showing cached content",
      description: "We're showing your recent activity while we restore live updates.",
      encouragement: "Stay connected with what you've already seen!"
    },
    global: {
      title: "HIVE is running in simplified mode",
      description: "Some features are temporarily limited while we resolve technical issues.",
      encouragement: "Core functionality is working great - you can still get things done!"
    }
  };
  
  const base = areaMessages[area] || areaMessages.global;
  
  // Generate alternatives based on what's still working
  const alternatives = [
    "Use offline features while connectivity improves",
    "Access your saved content and recently used tools",
    "Switch to simplified mode for better reliability"
  ];
  
  if (area === 'tools' && !failedFeatures.includes('core')) {
    alternatives.unshift("Your existing tools still work perfectly");
  }
  
  if (area === 'spaces' && !failedFeatures.includes('social')) {
    alternatives.unshift("Basic community features are still available");
  }
  
  return {
    ...base,
    alternatives: alternatives.slice(0, 3)
  };
}

// Feature status indicator component
function FeatureStatus({ 
  category, 
  status 
}: { 
  category: FeatureCategory; 
  status: 'working' | 'degraded' | 'unavailable';
}) {
  const statusConfig = {
    working: {
      icon: '✅',
      color: 'text-hive-emerald',
      bgColor: 'bg-hive-emerald/10',
      label: 'Working'
    },
    degraded: {
      icon: '⚠️',
      color: 'text-hive-gold',
      bgColor: 'bg-hive-gold/10',
      label: 'Limited'
    },
    unavailable: {
      icon: '❌',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      label: 'Down'
    }
  };
  
  const config = statusConfig[status];
  const categoryLabels = {
    core: 'Essential Features',
    social: 'Community Features',
    creation: 'Tool Building',
    analytics: 'Insights & Data',
    advanced: 'Power Features',
    experimental: 'Beta Features'
  };
  
  return (
    <div className={cn(
      'flex items-center justify-between p-3 rounded-lg border',
      config.bgColor,
      `border-current ${config.color.replace('text-', 'border-')}/20`
    )}>
      <div className="flex items-center space-x-2">
        <span role="img" aria-label={`${status} status`}>
          {config.icon}
        </span>
        <Text variant="body-sm" color="secondary">
          {categoryLabels[category]}
        </Text>
      </div>
      <span className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        config.color,
        config.bgColor
      )}>
        {config.label}
      </span>
    </div>
  );
}

export const FallbackUI: React.FC<FallbackUIProps> = ({
  reason,
  failedFeatures = [],
  severity = 'moderate',
  strategy = 'progressive-disclosure',
  context = {
    area: 'global',
    criticalFeatures: ['core'],
    availableOffline: []
  },
  workingFeatures = [],
  cachedData,
  offlineCapabilities = [],
  onRetry,
  onSwitchMode,
  onNavigateToWorking,
  title,
  description,
  encouragingMessage,
  showFeatureStatus = true,
  className,
  children
}) => {
  const viewport = useAdvancedViewport();
  const [currentMode, setCurrentMode] = useState<'normal' | 'simplified' | 'offline' | 'essential'>('normal');
  const [isRetrying, setIsRetrying] = useState(false);
  
  // Analyze feature impact
  const featureAnalysis = prioritizeFeatures(context, failedFeatures);
  const messaging = generateFallbackMessage(context, failedFeatures, severity);
  
  const handleModeSwitch = (mode: 'simplified' | 'offline' | 'essential') => {
    setCurrentMode(mode);
    if (onSwitchMode) {
      onSwitchMode(mode);
    }
  };
  
  const handleRetry = async () => {
    if (!onRetry) return;
    
    setIsRetrying(true);
    try {
      await onRetry();
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };
  
  const severityStyles = {
    minor: {
      border: 'border-hive-gold/30',
      bg: 'bg-hive-gold/5',
      icon: '🟡',
      iconBg: 'bg-hive-gold/20'
    },
    moderate: {
      border: 'border-orange-500/30',
      bg: 'bg-orange-500/5',
      icon: '🟠',
      iconBg: 'bg-orange-500/20'
    },
    severe: {
      border: 'border-red-500/30',
      bg: 'bg-red-500/5',
      icon: '🔴',
      iconBg: 'bg-red-500/20'
    },
    critical: {
      border: 'border-red-600/40',
      bg: 'bg-red-600/10',
      icon: '⚠️',
      iconBg: 'bg-red-600/30'
    }
  };
  
  const style = severityStyles[severity];
  
  return (
    <div className={cn(
      'w-full max-w-4xl mx-auto p-6',
      'border rounded-xl backdrop-blur-sm',
      style.border,
      style.bg,
      className
    )}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className={cn(
          'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4',
          style.iconBg
        )}>
          <span className="text-2xl" role="img" aria-label="Status icon">
            {style.icon}
          </span>
        </div>
        
        <Text 
          variant="heading-lg" 
          color="primary"
          className="font-semibold mb-2"
        >
          {title || messaging.title}
        </Text>
        
        <Text 
          variant="body-md" 
          color="secondary"
          className="max-w-2xl mx-auto leading-relaxed"
        >
          {description || messaging.description}
        </Text>
        
        {(encouragingMessage || messaging.encouragement) && (
          <Text 
            variant="body-sm" 
            color="secondary"
            className="mt-3 italic text-hive-gold"
          >
            {encouragingMessage || messaging.encouragement}
          </Text>
        )}
      </div>
      
      {/* Feature status grid */}
      {showFeatureStatus && (
        <div className="mb-6">
          <Text variant="body-sm" color="secondary" className="font-medium mb-3">
            System Status:
          </Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {featureAnalysis.stillWorking.map(feature => (
              <FeatureStatus key={feature} category={feature} status="working" />
            ))}
            {featureAnalysis.degraded.map(feature => (
              <FeatureStatus key={feature} category={feature} status="degraded" />
            ))}
            {featureAnalysis.unavailable.map(feature => (
              <FeatureStatus key={feature} category={feature} status="unavailable" />
            ))}
          </div>
        </div>
      )}
      
      {/* Mode selection */}
      <div className="mb-6">
        <Text variant="body-sm" color="secondary" className="font-medium mb-3">
          Choose how to continue:
        </Text>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant={currentMode === 'simplified' ? 'primary' : 'secondary'}
            onClick={() => handleModeSwitch('simplified')}
            className="text-left justify-start h-auto p-4"
          >
            <div>
              <div className="font-medium">📱 Simplified Mode</div>
              <div className="text-xs text-current/70 mt-1">
                Basic features only
              </div>
            </div>
          </Button>
          
          {offlineCapabilities.length > 0 && (
            <Button
              variant={currentMode === 'offline' ? 'primary' : 'secondary'}
              onClick={() => handleModeSwitch('offline')}
              className="text-left justify-start h-auto p-4"
            >
              <div>
                <div className="font-medium">📴 Offline Mode</div>
                <div className="text-xs text-current/70 mt-1">
                  Work without connection
                </div>
              </div>
            </Button>
          )}
          
          <Button
            variant={currentMode === 'essential' ? 'primary' : 'secondary'}
            onClick={() => handleModeSwitch('essential')}
            className="text-left justify-start h-auto p-4"
          >
            <div>
              <div className="font-medium">⚙️ Essential Only</div>
              <div className="text-xs text-current/70 mt-1">
                Core features guaranteed
              </div>
            </div>
          </Button>
        </div>
      </div>
      
      {/* Alternative options */}
      {messaging.alternatives.length > 0 && (
        <div className="mb-6">
          <Text variant="body-sm" color="secondary" className="font-medium mb-3">
            💡 What you can still do:
          </Text>
          <ul className="space-y-2">
            {messaging.alternatives.map((alternative, index) => (
              <li key={index} className="flex items-start text-sm text-hive-text-secondary">
                <span className="mr-2 text-hive-gold mt-0.5">•</span>
                {alternative}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <Button
            variant="primary"
            onClick={handleRetry}
            disabled={isRetrying}
            className={viewport.isMobile ? 'w-full' : ''}
          >
            {isRetrying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Restoring...
              </>
            ) : (
              '🔄 Try to restore full features'
            )}
          </Button>
        )}
        
        {onNavigateToWorking && (
          <Button
            variant="secondary"
            onClick={() => onNavigateToWorking('profile')}
            className={viewport.isMobile ? 'w-full' : ''}
          >
            🏠 Go to your profile
          </Button>
        )}
        
        <Button
          variant="ghost"
          onClick={() => window.location.href = '/'}
          className={cn(
            'text-hive-text-secondary',
            viewport.isMobile && 'w-full'
          )}
        >
          📝 Take me to HIVE home
        </Button>
      </div>
      
      {/* Custom content */}
      {children && (
        <div className="mt-6 pt-6 border-t border-hive-border-default/20">
          {children}
        </div>
      )}
      
      {/* Cached data preview */}
      {cachedData && strategy === 'cached-content' && (
        <div className="mt-6 p-4 bg-hive-background-secondary/20 border border-hive-border-default/20 rounded-lg">
          <Text variant="body-sm" color="secondary" className="font-medium mb-2">
            💾 Recent data (offline):
          </Text>
          <div className="text-xs text-hive-text-secondary font-mono">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      )}
      
      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-6 text-left">
          <summary className="cursor-pointer text-xs text-hive-text-secondary font-mono">
            Fallback Debug Info
          </summary>
          <div className="mt-2 p-3 bg-hive-background-secondary/30 rounded text-xs font-mono space-y-1">
            <div>Reason: {reason || 'Not specified'}</div>
            <div>Strategy: {strategy}</div>
            <div>Severity: {severity}</div>
            <div>Context Area: {context.area}</div>
            <div>Failed Features: {failedFeatures.join(', ') || 'None'}</div>
            <div>Current Mode: {currentMode}</div>
            <div>Working Features: {featureAnalysis.stillWorking.join(', ')}</div>
            <div>Offline Capabilities: {offlineCapabilities.join(', ') || 'None'}</div>
          </div>
        </details>
      )}
    </div>
  );
};

// Export utilities
export { prioritizeFeatures, generateFallbackMessage, FeatureStatus };
export type { 
  FallbackUIProps, 
  FallbackStrategy, 
  FeatureCategory, 
  FallbackContext 
};