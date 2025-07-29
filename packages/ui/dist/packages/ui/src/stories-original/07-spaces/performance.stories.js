import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
const meta = {
    title: 'Spaces/Performance',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Performance optimization patterns for HIVE spaces including lazy loading, virtualization, caching, and performance monitoring.',
            },
        },
    },
};
export default meta;
// Performance monitoring utilities
const usePerformanceMetrics = () => {
    const [metrics, setMetrics] = useState({
        loadTime: 0,
        renderTime: 0,
        memoryUsage: 0,
        frameRate: 60
    });
    useEffect(() => {
        const startTime = performance.now();
        const updateMetrics = () => {
            const loadTime = performance.now() - startTime;
            const memoryUsage = performance.memory?.usedJSHeapSize / 1024 / 1024 || 0;
            setMetrics({
                loadTime: Math.round(loadTime),
                renderTime: Math.round(loadTime * 0.3),
                memoryUsage: Math.round(memoryUsage * 100) / 100,
                frameRate: Math.round(60 - (loadTime / 1000) * 2)
            });
        };
        const timer = setTimeout(updateMetrics, 100);
        return () => clearTimeout(timer);
    }, []);
    return metrics;
};
// Mock data generators
const generateMockSpaces = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `space-${i}`,
        name: `Space ${i + 1}`,
        description: `This is the description for space ${i + 1}. It contains various information about the space.`,
        memberCount: Math.floor(Math.random() * 100) + 1,
        lastActivity: `${Math.floor(Math.random() * 60)} minutes ago`,
        isActive: Math.random() > 0.3,
        surfaces: ['posts', 'events', 'tools', 'members'].slice(0, Math.floor(Math.random() * 4) + 1)
    }));
};
const generateMockPosts = (count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `post-${i}`,
        author: `User ${i + 1}`,
        content: `This is post content number ${i + 1}. It might contain a lot of text depending on what the user wrote.`,
        timestamp: `${Math.floor(Math.random() * 120)} minutes ago`,
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 20)
    }));
};
export const PerformanceOverview = {
    render: () => {
        const metrics = usePerformanceMetrics();
        const [dataSize, setDataSize] = useState(100);
        const [loadingState, setLoadingState] = useState('idle');
        const handleLoadData = () => {
            setLoadingState('loading');
            setTimeout(() => {
                setLoadingState('loaded');
            }, 1000);
        };
        const performanceScore = useMemo(() => {
            const score = Math.max(0, 100 - (metrics.loadTime / 10) - (metrics.memoryUsage / 5));
            return Math.round(score);
        }, [metrics]);
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Performance Overview" }), _jsx("p", { className: "text-gray-600", children: "Real-time performance metrics and optimization strategies" })] }), _jsxs(HiveBadge, { variant: performanceScore > 80 ? 'success' : performanceScore > 60 ? 'warning' : 'destructive', children: ["Score: ", performanceScore] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full" }), _jsx("span", { className: "font-semibold text-sm", children: "Load Time" })] }), _jsxs("p", { className: "text-2xl font-bold", children: [metrics.loadTime, "ms"] }), _jsx("p", { className: "text-sm text-gray-600", children: "Initial page load" })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-green-500 rounded-full" }), _jsx("span", { className: "font-semibold text-sm", children: "Render Time" })] }), _jsxs("p", { className: "text-2xl font-bold", children: [metrics.renderTime, "ms"] }), _jsx("p", { className: "text-sm text-gray-600", children: "Component rendering" })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-yellow-500 rounded-full" }), _jsx("span", { className: "font-semibold text-sm", children: "Memory Usage" })] }), _jsxs("p", { className: "text-2xl font-bold", children: [metrics.memoryUsage, "MB"] }), _jsx("p", { className: "text-sm text-gray-600", children: "JavaScript heap" })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-purple-500 rounded-full" }), _jsx("span", { className: "font-semibold text-sm", children: "Frame Rate" })] }), _jsxs("p", { className: "text-2xl font-bold", children: [metrics.frameRate, "fps"] }), _jsx("p", { className: "text-sm text-gray-600", children: "Animation performance" })] }) })] }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Data Loading Performance" }), _jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Data Size:" }), _jsxs("select", { value: dataSize, onChange: (e) => setDataSize(Number(e.target.value)), className: "px-3 py-1 border rounded text-sm", children: [_jsx("option", { value: 100, children: "100 items" }), _jsx("option", { value: 500, children: "500 items" }), _jsx("option", { value: 1000, children: "1000 items" }), _jsx("option", { value: 5000, children: "5000 items" })] })] }), _jsx(HiveButton, { variant: "primary", onClick: handleLoadData, disabled: loadingState === 'loading', children: loadingState === 'loading' ? 'Loading...' : 'Load Data' }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Status: ", loadingState] })] }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Testing with ", dataSize, " items \u2022 Memory efficient loading with virtualization"] })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Performance Recommendations" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-green-600 text-sm", children: "\u2713" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Lazy Loading Implemented" }), _jsx("p", { className: "text-sm text-gray-600", children: "Components load only when needed" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-green-600 text-sm", children: "\u2713" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Image Optimization" }), _jsx("p", { className: "text-sm text-gray-600", children: "WebP format with responsive sizing" })] })] }), _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0", children: _jsx("span", { className: "text-yellow-600 text-sm", children: "!" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Bundle Size Optimization" }), _jsx("p", { className: "text-sm text-gray-600", children: "Consider code splitting for large spaces" })] })] })] })] }) })] }) }));
    },
};
export const LazyLoadingDemo = {
    render: () => {
        const [visibleCount, setVisibleCount] = useState(10);
        const [isLoading, setIsLoading] = useState(false);
        const totalItems = 1000;
        const spaces = useMemo(() => generateMockSpaces(visibleCount), [visibleCount]);
        const loadMore = () => {
            setIsLoading(true);
            setTimeout(() => {
                setVisibleCount(prev => Math.min(prev + 10, totalItems));
                setIsLoading(false);
            }, 500);
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Lazy Loading Demo" }), _jsx("p", { className: "text-gray-600", children: "Efficient loading of large datasets with progressive rendering" })] }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Showing ", visibleCount, " of ", totalItems, " items"] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: spaces.map((space, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: (index % 10) * 0.1 }, children: _jsx(HiveCard, { className: "h-full", children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-[var(--hive-text-primary)] font-bold", children: index + 1 }), _jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "font-semibold text-sm", children: space.name }), _jsxs("p", { className: "text-xs text-gray-600", children: [space.memberCount, " members"] })] }), _jsx(HiveBadge, { variant: space.isActive ? 'success' : 'secondary', children: space.isActive ? 'Active' : 'Inactive' })] }), _jsx("p", { className: "text-sm text-gray-600 mb-3 line-clamp-2", children: space.description }), _jsx("div", { className: "flex items-center gap-1 mb-3", children: space.surfaces.map((surface) => (_jsx("div", { className: "w-2 h-2 bg-blue-400 rounded-full", title: surface }, surface))) }), _jsxs("div", { className: "text-xs text-gray-500", children: ["Last activity: ", space.lastActivity] })] }) }) }, space.id))) }), visibleCount < totalItems && (_jsx("div", { className: "text-center", children: _jsx(HiveButton, { variant: "outline", onClick: loadMore, disabled: isLoading, children: isLoading ? 'Loading...' : 'Load More' }) })), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Performance Benefits" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("div", { className: "font-medium text-green-600", children: "Reduced Initial Load" }), _jsx("div", { className: "text-gray-600", children: "Only loads visible items" })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-blue-600", children: "Lower Memory Usage" }), _jsx("div", { className: "text-gray-600", children: "Efficient DOM management" })] }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-purple-600", children: "Better UX" }), _jsx("div", { className: "text-gray-600", children: "Faster perceived performance" })] })] })] }) })] }) }));
    },
};
export const VirtualizationDemo = {
    render: () => {
        const [itemCount, setItemCount] = useState(10000);
        const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
        const [scrollPosition, setScrollPosition] = useState(0);
        const itemHeight = 80;
        const containerHeight = 400;
        const visibleItemsCount = Math.ceil(containerHeight / itemHeight);
        const posts = useMemo(() => generateMockPosts(itemCount), [itemCount]);
        const handleScroll = (e) => {
            const scrollTop = e.currentTarget.scrollTop;
            const start = Math.floor(scrollTop / itemHeight);
            const end = Math.min(start + visibleItemsCount + 5, itemCount);
            setVisibleRange({ start, end });
            setScrollPosition(scrollTop);
        };
        const visiblePosts = posts.slice(visibleRange.start, visibleRange.end);
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Virtualization Demo" }), _jsx("p", { className: "text-gray-600", children: "Efficient rendering of large lists with virtual scrolling" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Items:" }), _jsxs("select", { value: itemCount, onChange: (e) => setItemCount(Number(e.target.value)), className: "px-3 py-1 border rounded text-sm", children: [_jsx("option", { value: 1000, children: "1,000" }), _jsx("option", { value: 5000, children: "5,000" }), _jsx("option", { value: 10000, children: "10,000" }), _jsx("option", { value: 50000, children: "50,000" })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Virtualized Feed" }), _jsx("div", { className: "relative bg-gray-50 rounded border", onScroll: handleScroll, style: {
                                                    height: containerHeight,
                                                    overflow: 'auto'
                                                }, children: _jsx("div", { style: { height: itemCount * itemHeight, position: 'relative' }, children: _jsx("div", { style: {
                                                            position: 'absolute',
                                                            top: visibleRange.start * itemHeight,
                                                            width: '100%'
                                                        }, children: visiblePosts.map((post, index) => (_jsx("div", { className: "border-b p-3 bg-[var(--hive-text-primary)]", style: { height: itemHeight }, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-bold", children: visibleRange.start + index + 1 }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-sm", children: post.author }), _jsx("p", { className: "text-xs text-gray-600 truncate", children: post.content }), _jsxs("div", { className: "flex items-center gap-4 mt-1 text-xs text-gray-500", children: [_jsxs("span", { children: [post.likes, " likes"] }), _jsxs("span", { children: [post.comments, " comments"] }), _jsx("span", { children: post.timestamp })] })] })] }) }, post.id))) }) }) })] }) }) }), _jsxs("div", { className: "space-y-4", children: [_jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Performance Stats" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Total Items:" }), _jsx("span", { className: "font-medium", children: itemCount.toLocaleString() })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Rendered Items:" }), _jsx("span", { className: "font-medium", children: visibleRange.end - visibleRange.start })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Memory Efficiency:" }), _jsxs("span", { className: "font-medium text-green-600", children: [Math.round((visibleRange.end - visibleRange.start) / itemCount * 100), "%"] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { children: "Scroll Position:" }), _jsxs("span", { className: "font-medium", children: [Math.round(scrollPosition), "px"] })] })] })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-3", children: "Optimization Benefits" }), _jsxs("div", { className: "space-y-2 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { children: "Constant rendering performance" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { children: "Minimal DOM nodes" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-purple-500 rounded-full" }), _jsx("span", { children: "Smooth scrolling" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-yellow-500 rounded-full" }), _jsx("span", { children: "Low memory footprint" })] })] })] }) })] })] })] }) }));
    },
};
export const CachingStrategies = {
    render: () => {
        const [cacheStats, setCacheStats] = useState({
            hits: 0,
            misses: 0,
            size: 0,
            entries: []
        });
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
        const [isSearching, setIsSearching] = useState(false);
        // Mock cache implementation
        const cache = useMemo(() => new Map(), []);
        const performSearch = async (term) => {
            setIsSearching(true);
            // Check cache first
            const cacheKey = `search:${term}`;
            if (cache.has(cacheKey)) {
                setCacheStats(prev => ({ ...prev, hits: prev.hits + 1 }));
                setSearchResults(cache.get(cacheKey));
                setIsSearching(false);
                return;
            }
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Generate mock results
            const results = generateMockSpaces(5).filter(space => space.name.toLowerCase().includes(term.toLowerCase()));
            // Cache the results
            cache.set(cacheKey, results);
            setCacheStats(prev => ({
                ...prev,
                misses: prev.misses + 1,
                size: prev.size + JSON.stringify(results).length,
                entries: [...prev.entries, {
                        key: cacheKey,
                        value: `${results.length} results`,
                        timestamp: Date.now()
                    }].slice(-10)
            }));
            setSearchResults(results);
            setIsSearching(false);
        };
        const clearCache = () => {
            cache.clear();
            setCacheStats({
                hits: 0,
                misses: 0,
                size: 0,
                entries: []
            });
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Caching Strategies" }), _jsx("p", { className: "text-gray-600", children: "Intelligent caching for improved performance and user experience" })] }), _jsx(HiveButton, { variant: "outline", onClick: clearCache, children: "Clear Cache" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-green-500 rounded-full" }), _jsx("span", { className: "font-semibold text-sm", children: "Cache Hits" })] }), _jsx("p", { className: "text-2xl font-bold", children: cacheStats.hits }), _jsx("p", { className: "text-sm text-gray-600", children: "Served from cache" })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-red-500 rounded-full" }), _jsx("span", { className: "font-semibold text-sm", children: "Cache Misses" })] }), _jsx("p", { className: "text-2xl font-bold", children: cacheStats.misses }), _jsx("p", { className: "text-sm text-gray-600", children: "Fetched from API" })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full" }), _jsx("span", { className: "font-semibold text-sm", children: "Hit Rate" })] }), _jsxs("p", { className: "text-2xl font-bold", children: [cacheStats.hits + cacheStats.misses > 0
                                                    ? Math.round((cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100)
                                                    : 0, "%"] }), _jsx("p", { className: "text-sm text-gray-600", children: "Cache efficiency" })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-purple-500 rounded-full" }), _jsx("span", { className: "font-semibold text-sm", children: "Cache Size" })] }), _jsxs("p", { className: "text-2xl font-bold", children: [Math.round(cacheStats.size / 1024), "KB"] }), _jsx("p", { className: "text-sm text-gray-600", children: "Memory usage" })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Search with Caching" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(HiveInput, { value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), placeholder: "Search spaces...", className: "flex-1" }), _jsx(HiveButton, { variant: "primary", onClick: () => performSearch(searchTerm), disabled: isSearching || !searchTerm, children: isSearching ? 'Searching...' : 'Search' })] }), _jsxs("div", { className: "space-y-2", children: [searchResults.map((space) => (_jsxs("div", { className: "p-3 bg-gray-50 rounded border", children: [_jsx("h4", { className: "font-medium text-sm", children: space.name }), _jsx("p", { className: "text-xs text-gray-600", children: space.description })] }, space.id))), searchResults.length === 0 && searchTerm && !isSearching && (_jsxs("div", { className: "p-3 text-center text-gray-500 text-sm", children: ["No spaces found for \"", searchTerm, "\""] }))] })] })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "font-semibold mb-4", children: "Cache Entries" }), _jsxs("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: [cacheStats.entries.map((entry, index) => (_jsx("div", { className: "p-2 bg-gray-50 rounded border text-sm", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { className: "flex-1", children: [_jsx("div", { className: "font-medium", children: entry.key }), _jsx("div", { className: "text-gray-600", children: entry.value })] }), _jsx("div", { className: "text-xs text-gray-500", children: new Date(entry.timestamp).toLocaleTimeString() })] }) }, index))), cacheStats.entries.length === 0 && (_jsx("div", { className: "p-3 text-center text-gray-500 text-sm", children: "No cache entries yet" }))] })] }) })] }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Caching Strategies" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Memory Caching" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Fast in-memory cache for frequently accessed data" }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { children: "Instant access" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { children: "Automatic cleanup" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "HTTP Caching" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Browser and CDN caching for static assets" }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { children: "Reduced bandwidth" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { children: "Global distribution" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Database Caching" }), _jsx("p", { className: "text-sm text-gray-600 mb-3", children: "Query result caching for database optimization" }), _jsxs("div", { className: "space-y-1 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { children: "Faster queries" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { children: "Reduced load" })] })] })] })] })] }) })] }) }));
    },
};
//# sourceMappingURL=performance.stories.js.map