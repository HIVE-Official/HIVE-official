import type { Meta, StoryObj } from '@storybook/react';
import { HiveSpaceCard } from '../../components/hive-space-card';
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

const meta: Meta = {
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
type Story = StoryObj<typeof meta>;

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
      const memoryUsage = (performance as any).memory?.usedJSHeapSize / 1024 / 1024 || 0;
      
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
const generateMockSpaces = (count: number) => {
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

const generateMockPosts = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i}`,
    author: `User ${i + 1}`,
    content: `This is post content number ${i + 1}. It might contain a lot of text depending on what the user wrote.`,
    timestamp: `${Math.floor(Math.random() * 120)} minutes ago`,
    likes: Math.floor(Math.random() * 50),
    comments: Math.floor(Math.random() * 20)
  }));
};

export const PerformanceOverview: Story = {
  render: () => {
    const metrics = usePerformanceMetrics();
    const [dataSize, setDataSize] = useState(100);
    const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'loaded'>('idle');

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

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Performance Overview</h1>
              <p className="text-gray-600">
                Real-time performance metrics and optimization strategies
              </p>
            </div>
            <HiveBadge 
              variant={performanceScore > 80 ? 'success' : performanceScore > 60 ? 'warning' : 'destructive'}
            >
              Score: {performanceScore}
            </HiveBadge>
          </div>

          {/* Performance Metrics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Load Time</span>
                </div>
                <p className="text-2xl font-bold">{metrics.loadTime}ms</p>
                <p className="text-sm text-gray-600">Initial page load</p>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Render Time</span>
                </div>
                <p className="text-2xl font-bold">{metrics.renderTime}ms</p>
                <p className="text-sm text-gray-600">Component rendering</p>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Memory Usage</span>
                </div>
                <p className="text-2xl font-bold">{metrics.memoryUsage}MB</p>
                <p className="text-sm text-gray-600">JavaScript heap</p>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Frame Rate</span>
                </div>
                <p className="text-2xl font-bold">{metrics.frameRate}fps</p>
                <p className="text-sm text-gray-600">Animation performance</p>
              </div>
            </HiveCard>
          </div>

          {/* Data Loading Test */}
          <HiveCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Data Loading Performance</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Data Size:</label>
                  <select
                    value={dataSize}
                    onChange={(e) => setDataSize(Number(e.target.value))}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    <option value={100}>100 items</option>
                    <option value={500}>500 items</option>
                    <option value={1000}>1000 items</option>
                    <option value={5000}>5000 items</option>
                  </select>
                </div>
                <HiveButton 
                  variant="primary"
                  onClick={handleLoadData}
                  disabled={loadingState === 'loading'}
                >
                  {loadingState === 'loading' ? 'Loading...' : 'Load Data'}
                </HiveButton>
                <div className="text-sm text-gray-600">
                  Status: {loadingState}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                Testing with {dataSize} items • Memory efficient loading with virtualization
              </div>
            </div>
          </HiveCard>

          {/* Performance Recommendations */}
          <HiveCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">Lazy Loading Implemented</p>
                    <p className="text-sm text-gray-600">Components load only when needed</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-medium">Image Optimization</p>
                    <p className="text-sm text-gray-600">WebP format with responsive sizing</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 text-sm">!</span>
                  </div>
                  <div>
                    <p className="font-medium">Bundle Size Optimization</p>
                    <p className="text-sm text-gray-600">Consider code splitting for large spaces</p>
                  </div>
                </div>
              </div>
            </div>
          </HiveCard>
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const LazyLoadingDemo: Story = {
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

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Lazy Loading Demo</h1>
              <p className="text-gray-600">
                Efficient loading of large datasets with progressive rendering
              </p>
            </div>
            <div className="text-sm text-gray-600">
              Showing {visibleCount} of {totalItems} items
            </div>
          </div>

          {/* Lazy Loaded Space Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces.map((space, index) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 10) * 0.1 }}
              >
                <HiveCard className="h-full">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{space.name}</h3>
                        <p className="text-xs text-gray-600">{space.memberCount} members</p>
                      </div>
                      <HiveBadge variant={space.isActive ? 'success' : 'secondary'}>
                        {space.isActive ? 'Active' : 'Inactive'}
                      </HiveBadge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {space.description}
                    </p>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {space.surfaces.map((surface) => (
                        <div 
                          key={surface}
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          title={surface}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Last activity: {space.lastActivity}
                    </div>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < totalItems && (
            <div className="text-center">
              <HiveButton 
                variant="outline"
                onClick={loadMore}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </HiveButton>
            </div>
          )}

          {/* Performance Info */}
          <HiveCard>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Performance Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-medium text-green-600">Reduced Initial Load</div>
                  <div className="text-gray-600">Only loads visible items</div>
                </div>
                <div>
                  <div className="font-medium text-blue-600">Lower Memory Usage</div>
                  <div className="text-gray-600">Efficient DOM management</div>
                </div>
                <div>
                  <div className="font-medium text-purple-600">Better UX</div>
                  <div className="text-gray-600">Faster perceived performance</div>
                </div>
              </div>
            </div>
          </HiveCard>
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const VirtualizationDemo: Story = {
  render: () => {
    const [itemCount, setItemCount] = useState(10000);
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const itemHeight = 80;
    const containerHeight = 400;
    const visibleItemsCount = Math.ceil(containerHeight / itemHeight);
    
    const posts = useMemo(() => generateMockPosts(itemCount), [itemCount]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const scrollTop = e.currentTarget.scrollTop;
      const start = Math.floor(scrollTop / itemHeight);
      const end = Math.min(start + visibleItemsCount + 5, itemCount);
      
      setVisibleRange({ start, end });
      setScrollPosition(scrollTop);
    };

    const visiblePosts = posts.slice(visibleRange.start, visibleRange.end);

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Virtualization Demo</h1>
              <p className="text-gray-600">
                Efficient rendering of large lists with virtual scrolling
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Items:</span>
              <select
                value={itemCount}
                onChange={(e) => setItemCount(Number(e.target.value))}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value={1000}>1,000</option>
                <option value={5000}>5,000</option>
                <option value={10000}>10,000</option>
                <option value={50000}>50,000</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Virtualized List */}
            <div className="lg:col-span-2">
              <HiveCard>
                <div className="p-4">
                  <h3 className="font-semibold mb-4">Virtualized Feed</h3>
                  <div
                    className="relative bg-gray-50 rounded border"
                    onScroll={handleScroll}
                    style={{
                      height: containerHeight,
                      overflow: 'auto'
                    }}
                  >
                    {/* Total height spacer */}
                    <div style={{ height: itemCount * itemHeight, position: 'relative' }}>
                      {/* Visible items */}
                      <div 
                        style={{
                          position: 'absolute',
                          top: visibleRange.start * itemHeight,
                          width: '100%'
                        }}
                      >
                        {visiblePosts.map((post, index) => (
                          <div
                            key={post.id}
                            className="border-b p-3 bg-white"
                            style={{ height: itemHeight }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {visibleRange.start + index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{post.author}</p>
                                <p className="text-xs text-gray-600 truncate">{post.content}</p>
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                  <span>{post.likes} likes</span>
                                  <span>{post.comments} comments</span>
                                  <span>{post.timestamp}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </HiveCard>
            </div>

            {/* Performance Stats */}
            <div className="space-y-4">
              <HiveCard>
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Performance Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span className="font-medium">{itemCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rendered Items:</span>
                      <span className="font-medium">{visibleRange.end - visibleRange.start}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Efficiency:</span>
                      <span className="font-medium text-green-600">
                        {Math.round((visibleRange.end - visibleRange.start) / itemCount * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scroll Position:</span>
                      <span className="font-medium">{Math.round(scrollPosition)}px</span>
                    </div>
                  </div>
                </div>
              </HiveCard>

              <HiveCard>
                <div className="p-4">
                  <h3 className="font-semibold mb-3">Optimization Benefits</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Constant rendering performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Minimal DOM nodes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Smooth scrolling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Low memory footprint</span>
                    </div>
                  </div>
                </div>
              </HiveCard>
            </div>
          </div>
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const CachingStrategies: Story = {
  render: () => {
    const [cacheStats, setCacheStats] = useState({
      hits: 0,
      misses: 0,
      size: 0,
      entries: [] as Array<{ key: string; value: string; timestamp: number }>
    });
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Mock cache implementation
    const cache = useMemo(() => new Map<string, any>(), []);

    const performSearch = async (term: string) => {
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
      const results = generateMockSpaces(5).filter(space => 
        space.name.toLowerCase().includes(term.toLowerCase())
      );
      
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

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Caching Strategies</h1>
              <p className="text-gray-600">
                Intelligent caching for improved performance and user experience
              </p>
            </div>
            <HiveButton variant="outline" onClick={clearCache}>
              Clear Cache
            </HiveButton>
          </div>

          {/* Cache Performance Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Cache Hits</span>
                </div>
                <p className="text-2xl font-bold">{cacheStats.hits}</p>
                <p className="text-sm text-gray-600">Served from cache</p>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Cache Misses</span>
                </div>
                <p className="text-2xl font-bold">{cacheStats.misses}</p>
                <p className="text-sm text-gray-600">Fetched from API</p>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Hit Rate</span>
                </div>
                <p className="text-2xl font-bold">
                  {cacheStats.hits + cacheStats.misses > 0 
                    ? Math.round((cacheStats.hits / (cacheStats.hits + cacheStats.misses)) * 100)
                    : 0}%
                </p>
                <p className="text-sm text-gray-600">Cache efficiency</p>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="font-semibold text-sm">Cache Size</span>
                </div>
                <p className="text-2xl font-bold">{Math.round(cacheStats.size / 1024)}KB</p>
                <p className="text-sm text-gray-600">Memory usage</p>
              </div>
            </HiveCard>
          </div>

          {/* Search with Caching Demo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HiveCard>
              <div className="p-4">
                <h3 className="font-semibold mb-4">Search with Caching</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <HiveInput
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search spaces..."
                      className="flex-1"
                    />
                    <HiveButton 
                      variant="primary"
                      onClick={() => performSearch(searchTerm)}
                      disabled={isSearching || !searchTerm}
                    >
                      {isSearching ? 'Searching...' : 'Search'}
                    </HiveButton>
                  </div>
                  
                  <div className="space-y-2">
                    {searchResults.map((space) => (
                      <div key={space.id} className="p-3 bg-gray-50 rounded border">
                        <h4 className="font-medium text-sm">{space.name}</h4>
                        <p className="text-xs text-gray-600">{space.description}</p>
                      </div>
                    ))}
                    
                    {searchResults.length === 0 && searchTerm && !isSearching && (
                      <div className="p-3 text-center text-gray-500 text-sm">
                        No spaces found for "{searchTerm}"
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <h3 className="font-semibold mb-4">Cache Entries</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {cacheStats.entries.map((entry, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded border text-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium">{entry.key}</div>
                          <div className="text-gray-600">{entry.value}</div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {cacheStats.entries.length === 0 && (
                    <div className="p-3 text-center text-gray-500 text-sm">
                      No cache entries yet
                    </div>
                  )}
                </div>
              </div>
            </HiveCard>
          </div>

          {/* Caching Strategies Info */}
          <HiveCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Caching Strategies</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Memory Caching</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Fast in-memory cache for frequently accessed data
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Instant access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Automatic cleanup</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">HTTP Caching</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Browser and CDN caching for static assets
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Reduced bandwidth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Global distribution</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Database Caching</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Query result caching for database optimization
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Faster queries</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Reduced load</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HiveCard>
        </div>
      </HiveSpaceLayout>
    );
  },
};