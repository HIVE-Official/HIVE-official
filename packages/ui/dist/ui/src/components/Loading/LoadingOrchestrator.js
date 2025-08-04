'use client';
import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { cn } from '../../lib/utils.js';
import { Text } from '../../atomic/atoms/text.js';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout.js';
// Custom hook for orchestrated loading
function useLoadingOrchestrator(resources, strategy, campusContext) {
    const [loadingState, setLoadingState] = useState({
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
    const activeLoadingRef = useRef(new Map());
    const startTimeRef = useRef(Date.now());
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
        const dependencyGraph = new Map();
        prioritizedResources.forEach(resource => {
            dependencyGraph.set(resource.id, resource.dependencies || []);
        });
        // Process resources respecting dependencies
        const processedResources = new Set();
        for (const resource of prioritizedResources) {
            // Check if dependencies are met
            const canProcess = (resource.dependencies || []).every(dep => processedResources.has(dep));
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
            }
            catch (error) {
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
function generateLoadingMessage(phase, resource, campusContext, userJourney) {
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
export const LoadingOrchestrator = ({ resources, strategy = 'progressive', campusContext, userJourney, showProgress = true, showPredictions = false, showNetworkStatus = true, enablePerformanceTheater = false, adaptToCampusNetwork = true, enableDataSaver = false, showStudentFriendlyMessages = true, onPhaseChange, onResourceComplete, onAllComplete, onError, children, fallback, className }) => {
    const viewport = useAdvancedViewport();
    const loadingState = useLoadingOrchestrator(resources, strategy, campusContext);
    const [currentMessage, setCurrentMessage] = useState('');
    // Update message based on loading state
    useEffect(() => {
        const message = generateLoadingMessage(loadingState.phase, loadingState.currentResource, campusContext, userJourney);
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
        return _jsx(_Fragment, { children: children(loadingState) });
    }
    // If complete and no children, don't render anything
    if (loadingState.phase === 'complete') {
        return null;
    }
    // Render custom fallback if provided
    if (fallback) {
        return _jsx(_Fragment, { children: fallback });
    }
    return (_jsxs("div", { className: cn('flex flex-col items-center justify-center min-h-screen bg-hive-background-primary', className), children: [_jsxs("div", { className: "relative mb-8", children: [_jsxs("div", { className: "relative w-20 h-20", children: [_jsx("div", { className: cn('absolute inset-0 border-4 border-hive-gold/20 animate-spin', 'rounded-lg transform rotate-45') }), _jsx("div", { className: cn('absolute inset-2 border-4 border-hive-gold animate-pulse', 'rounded-lg transform rotate-45') }), _jsx("div", { className: "absolute inset-6 bg-hive-gold rounded-sm animate-bounce" })] }), showProgress && (_jsx("div", { className: "absolute -inset-4", children: _jsxs("svg", { className: "w-28 h-28 transform -rotate-90", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "currentColor", strokeWidth: "2", className: "text-hive-border-default/20" }), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", className: "text-hive-gold transition-all duration-500 ease-out", style: {
                                        strokeDasharray: '283', // 2π * 45
                                        strokeDashoffset: 283 - (loadingState.progress / 100) * 283
                                    } })] }) }))] }), _jsxs("div", { className: "text-center space-y-3 max-w-md", children: [showStudentFriendlyMessages && (_jsx(Text, { variant: "heading-md", color: "primary", className: "font-medium animate-pulse", children: currentMessage })), showProgress && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2 text-sm text-hive-text-secondary", children: [_jsxs("span", { children: [loadingState.progress, "% complete"] }), loadingState.estimatedTimeRemaining > 0 && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsxs("span", { children: [Math.ceil(loadingState.estimatedTimeRemaining / 1000), "s remaining"] })] }))] }), _jsx("div", { className: "w-64 h-1 bg-hive-border-default/20 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-hive-gold transition-all duration-300 ease-out", style: { width: `${loadingState.progress}%` } }) })] }))] }), showNetworkStatus && campusContext && (_jsxs("div", { className: "mt-6 flex items-center space-x-2 text-xs text-hive-text-tertiary", children: [_jsx("span", { children: "\uD83D\uDCF6" }), _jsxs("span", { children: [campusContext.networkQuality, " connection \u2022 ", campusContext.campusLoad, " campus load"] })] })), enablePerformanceTheater && (_jsxs("div", { className: "mt-8 space-y-2 text-center", children: [_jsxs(Text, { variant: "body-xs", color: "muted", className: "font-mono", children: ["Current: ", loadingState.currentResource?.name || 'Initializing'] }), _jsxs(Text, { variant: "body-xs", color: "muted", className: "font-mono", children: ["Phase: ", loadingState.phase] }), _jsxs(Text, { variant: "body-xs", color: "muted", className: "font-mono", children: ["Completed: ", loadingState.completedResources.length, "/", resources.length] })] })), showPredictions && loadingState.predictions.nextLikelyActions.length > 0 && (_jsx("div", { className: "mt-6 text-center space-y-2", children: _jsxs(Text, { variant: "body-xs", color: "muted", children: ["Getting ready for: ", loadingState.predictions.nextLikelyActions.join(', ')] }) })), campusContext?.networkQuality === 'poor' && (_jsx("div", { className: "mt-6 p-4 bg-hive-gold/5 border border-hive-gold/20 rounded-lg max-w-sm text-center", children: _jsx(Text, { variant: "body-sm", color: "secondary", children: "\uD83D\uDCA1 Tip: Try moving closer to a Wi-Fi access point or using mobile data!" }) }))] }));
};
// Export utilities
export { useLoadingOrchestrator, generateLoadingMessage };
//# sourceMappingURL=LoadingOrchestrator.js.map