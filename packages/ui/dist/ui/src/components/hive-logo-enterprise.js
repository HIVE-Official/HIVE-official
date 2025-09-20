"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useCallback, memo, createContext, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
const HiveLogoConfigContext = createContext({});
// Provider component for enterprise configuration
export const HiveLogoProvider = ({ config, children }) => {
    return (_jsx(HiveLogoConfigContext.Provider, { value: config, children: children }));
};
// Hook to access enterprise configuration
export const useHiveLogoConfig = () => {
    return useContext(HiveLogoConfigContext);
};
const useAnalytics = () => {
    const config = useHiveLogoConfig();
    const track = useCallback((event) => {
        const fullEvent = {
            ...event,
            timestamp: Date.now(),
        };
        // Route to appropriate analytics provider
        switch (config.analytics?.provider) {
            case 'google-analytics':
                if (typeof window !== 'undefined' && window.gtag) {
                    window.gtag('event', event.action, {
                        event_category: 'hive_logo',
                        event_label: `${event.variant}_${event.context}`,
                        custom_map: event.customProperties,
                    });
                }
        }
        break;
    });
};
'mixpanel';
if (typeof window !== 'undefined' && window.mixpanel) {
    window.mixpanel.track(`Logo ${event.action}`, fullEvent);
}
break;
'amplitude';
if (typeof window !== 'undefined' && window.amplitude) {
    window.amplitude.getInstance().logEvent(`Logo ${event.action}`, fullEvent);
}
break;
'custom';
config.analytics?.customTracker?.(event.action, fullEvent);
break;
// Fallback to console in development
if (process.env.NODE_ENV === 'development') {
    console.log('[HIVE Analytics]', fullEvent);
}
[config.analytics];
;
return { track };
;
// A/B testing hook
const useABTesting = (experimentId, variants, userId) => {
    const config = useHiveLogoConfig();
    const [selectedVariant, setSelectedVariant] = useState('');
    useEffect(() => {
        if (!experimentId || variants.length === 0) {
            setSelectedVariant(variants[0] || '');
            return;
        }
        let variant = '';
        switch (config.abTesting?.provider) {
            case 'optimizely':
                // Optimizely integration
                if (typeof window !== 'undefined' && window.optimizely) {
                    variant = window.optimizely.get('state').getVariationMap()[experimentId] || variants[0];
                }
                break;
            case 'launchdarkly':
                // LaunchDarkly integration
                variant = config.abTesting?.getUserVariant?.(experimentId, userId) || variants[0];
                break;
            case 'split':
                // Split.io integration
                if (typeof window !== 'undefined' && window.splitio) {
                    const client = window.splitio.client;
                    variant = client?.getTreatment(experimentId) || variants[0];
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
                        return a & a;
                    }, 0);
                    variant = variants[Math.abs(hash) % variants.length];
                }
                else {
                    variant = variants[0];
                }
        }
        setSelectedVariant(variant);
    }, [experimentId, variants, userId, config.abTesting]);
    return selectedVariant;
};
// Feature flags hook
const useFeatureFlag = (flagName, defaultValue = false) => {
    const config = useHiveLogoConfig();
    const [isEnabled, setIsEnabled] = useState(defaultValue);
    useEffect(() => {
        if (!config.featureFlags?.isEnabled) {
            setIsEnabled(defaultValue);
            return;
        }
        const enabled = config.featureFlags.isEnabled(flagName);
        setIsEnabled(enabled);
    }, [flagName, defaultValue, config.featureFlags]);
    return isEnabled;
};
// Performance monitoring hook
const usePerformanceMonitoring = (componentName) => {
    const config = useHiveLogoConfig();
    const [metrics, setMetrics] = useState({
        renderTime: 0,
        memoryUsage: 0,
        cacheHitRate: 0,
    });
    useEffect(() => {
        if (!config.performance?.enableMetrics)
            return;
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name.includes(componentName)) {
                    setMetrics(prev => ({
                        ...prev,
                        renderTime: entry.duration,
                    }));
                }
            }
        });
    });
};
;
observer.observe({ entryTypes: ['measure'] });
return () => observer.disconnect();
[componentName, config.performance];
;
return metrics;
;
export const HiveLogoEnterprise = memo(({ variant = 'primary', size = 'md', experimentId, userId, sessionId, customTheme, whiteLabel, context = 'default', trackingProperties = {}, accessibility = {}, className, onClick, ...props }) => {
    const config = useHiveLogoConfig();
    const { track } = useAnalytics();
    const shouldReduceMotion = useReducedMotion();
    // A/B testing for logo variants
    const abVariant = useABTesting(experimentId || 'logo_variant_test', ['primary', 'gold', 'animated'], userId);
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
        if (!enableCustomization || !customTheme)
            return {};
        return {
            color: customTheme.primaryColor,
            fontFamily: customTheme.fontFamily,
            filter: customTheme.accentColor ? `drop-shadow(0 0 4px ${customTheme.accentColor})` : undefined,
        };
    }, [enableCustomization, customTheme]);
    // Analytics tracking
    const handleView = useCallback(() => {
        if (!enableAnalytics)
            return;
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
        });
    }, [
        enableAnalytics, track, finalVariant, context, userId, sessionId,
        experimentId, abVariant, trackingProperties, performanceMetrics, customTheme, whiteLabel
    ]);
    const handleClick = useCallback(() => {
        if (!enableAnalytics)
            return;
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
        onClick?.();
    }, [
        enableAnalytics, track, finalVariant, context, userId, sessionId,
        experimentId, abVariant, trackingProperties, onClick
    ]);
    // Track view on mount
    useEffect(() => {
        handleView();
    }, [handleView]);
    // White-label rendering
    if (whiteLabel?.logoUrl) {
        return (_jsxs("div", { className: cn("inline-flex items-center space-x-2", className), onClick: handleClick, style: customStyles, ...props, children: [_jsx("img", { src: whiteLabel.logoUrl, alt: whiteLabel.companyName || 'Company logo', className: cn("object-contain", size === 'xs' && "w-4 h-4", size === 'sm' && "w-5 h-5", size === 'md' && "w-6 h-6", size === 'lg' && "w-8 h-8", size === 'xl' && "w-10 h-10", size === '2xl' && "w-12 h-12", size === '3xl' && "w-16 h-16", size === '4xl' && "w-20 h-20") }), whiteLabel.companyName && !whiteLabel.hideHiveBranding && (_jsx("span", { className: "font-bold tracking-wide", children: whiteLabel.companyName }))] }));
    }
    // Animation configuration
    const animationProps = useMemo(() => {
        if (!enableAnimations || shouldReduceMotion) {
            return {};
        }
        switch (finalVariant) {
            case 'animated':
                return {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    whileHover: { scale: 1.05 },
                    whileTap: { scale: 0.95 },
                    transition: { type: "spring", stiffness: 200, damping: 20 },
                };
            default:
                return {
                    whileHover: { scale: 1.02 },
                    whileTap: { scale: 0.98 },
                };
        }
    }, [enableAnimations, shouldReduceMotion, finalVariant]);
    const logoVariants = cva("inline-flex items-center space-x-2 transition-all duration-200 cursor-pointer", {
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
    });
    return (_jsxs(motion.div, { className: cn(logoVariants({
            variant: finalVariant,
            size,
            accessibility: accessibility.highContrast ? 'highContrast' : 'normal',
            className,
        })), style: customStyles, onClick: handleClick, role: "img", "aria-label": accessibility.ariaLabel || 'HIVE logo', ...animationProps, ...props, children: [_jsx("svg", { viewBox: "0 0 1500 1500", fill: "none", className: cn("flex-shrink-0", size === 'xs' && "w-4 h-4", size === 'sm' && "w-5 h-5", size === 'md' && "w-6 h-6", size === 'lg' && "w-8 h-8", size === 'xl' && "w-10 h-10", size === '2xl' && "w-12 h-12", size === '3xl' && "w-16 h-16", size === '4xl' && "w-20 h-20"), children: _jsx("path", { d: "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z", fill: "currentColor" }) }), !whiteLabel?.hideHiveBranding && (_jsx("span", { className: "font-bold tracking-wide select-none", children: "HIVE" })), config.performance?.enableMetrics && process.env.NODE_ENV === 'development' && (_jsxs("div", { className: "absolute -top-8 left-0 text-xs text-[var(--hive-text-primary)]/60 bg-[var(--hive-background-primary)]/80 p-1 rounded whitespace-nowrap", children: [performanceMetrics.renderTime.toFixed(1), "ms"] })), experimentId && process.env.NODE_ENV === 'development' && (_jsxs("div", { className: "absolute -bottom-6 left-0 text-xs text-[var(--hive-color-gold)] bg-[var(--hive-background-primary)]/80 p-1 rounded whitespace-nowrap", children: ["A/B: ", abVariant] }))] }));
});
HiveLogoEnterprise.displayName = 'HiveLogoEnterprise';
// Advanced logo analytics dashboard component
export const HiveLogoAnalyticsDashboard = ({ dateRange, className }) => {
    const [analyticsData, setAnalyticsData] = useState({
        totalViews: 0,
        totalClicks: 0,
        clickThroughRate: 0,
        topVariants: [],
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
        fetchAnalyticsData();
    }, [dateRange]);
    return (_jsxs("div", { className: cn("p-6 bg-[var(--hive-background-primary)]/20 rounded-xl space-y-6", className), children: [_jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "HIVE Logo Analytics" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-color-gold)]", children: analyticsData.totalViews.toLocaleString() }), _jsx("div", { className: "text-[var(--hive-text-primary)]/70 text-sm", children: "Total Views" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-color-gold)]", children: analyticsData.totalClicks.toLocaleString() }), _jsx("div", { className: "text-[var(--hive-text-primary)]/70 text-sm", children: "Total Clicks" })] }), _jsxs("div", { className: "p-4 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-color-gold)]", children: [(analyticsData.clickThroughRate * 100).toFixed(1), "%"] }), _jsx("div", { className: "text-[var(--hive-text-primary)]/70 text-sm", children: "Click-through Rate" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Top Performing Variants" }), analyticsData.topVariants.map((variant, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-[var(--hive-text-primary)]/5 rounded-lg", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: variant.variant }), _jsx("span", { className: "text-[var(--hive-color-gold)] font-semibold", children: variant.count })] }, variant.variant)))] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Performance Metrics" }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: [analyticsData.performanceMetrics.averageRenderTime.toFixed(1), "ms"] }), _jsx("div", { className: "text-[var(--hive-text-primary)]/70 text-xs", children: "Avg Render" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: [analyticsData.performanceMetrics.fastestRender.toFixed(1), "ms"] }), _jsx("div", { className: "text-[var(--hive-text-primary)]/70 text-xs", children: "Fastest" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: [analyticsData.performanceMetrics.slowestRender.toFixed(1), "ms"] }), _jsx("div", { className: "text-[var(--hive-text-primary)]/70 text-xs", children: "Slowest" })] })] })] })] }));
};
//# sourceMappingURL=hive-logo-enterprise.js.map