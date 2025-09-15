import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useMemo, useCallback, memo, lazy, Suspense, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../atomic/ui/card';
import { Button } from '../../../atomic/atoms/button-enhanced';
import { Input } from '../../../atomic/atoms/input-enhanced';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../atomic/atoms/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../atomic/atoms/avatar';
import { Progress } from '../../../components/ui/progress';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../atomic/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../../atomic/molecules/alert-toast-system';
import { Switch } from '../../../atomic/atoms/switch-enhanced';
import { Slider } from '../../../components/ui/slider';
import { 
  Zap,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Timer,
  Gauge,
  Cpu,
  HardDrive,
  Wifi,
  Database,
  Cloud,
  Memory,
  Monitor,
  Smartphone,
  Settings,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  Play,
  Pause,
  Square,
  SkipForward,
  RefreshCw,
  Download,
  Upload,
  FileText,
  Image as ImageIcon,
  Video,
  Search,
  Filter,
  Grid3x3,
  List,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  X,
  Maximize,
  Minimize,
  Target,
  Crosshair,
  Focus,
  Layers,
  Code,
  Terminal,
  GitBranch,
  Archive,
  Folder,
  FolderOpen
} from 'lucide-react';

/**
 * # HIVE Performance Optimization System
 * 
 * Advanced performance optimization techniques and monitoring for the HIVE platform.
 * Demonstrates lazy loading, virtualization, memoization, bundle optimization,
 * and real-time performance metrics to ensure blazing fast experiences
 * for UB students even with complex campus features.
 * 
 * ## Performance Features:
 * - **Lazy Loading**: Dynamic imports and component-level code splitting
 * - **Virtual Scrolling**: Efficiently render thousands of posts and users
 * - **Memoization**: Smart caching with React.memo, useMemo, and useCallback
 * - **Bundle Optimization**: Tree shaking, dead code elimination, compression
 * - **Image Optimization**: WebP conversion, lazy loading, progressive enhancement
 * - **Network Optimization**: Request batching, caching strategies, prefetching
 * - **Memory Management**: Cleanup, garbage collection awareness, leak prevention
 * - **Real-time Metrics**: Core Web Vitals, user experience monitoring
 */

const meta: Meta<typeof React.Fragment> = {
  title: '23-Advanced Systems/Performance Optimization',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Advanced performance optimization techniques and real-time monitoring for HIVE'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Performance Monitoring Hook
const usePerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    lcp: 0, // Largest Contentful Paint
    fid: 0, // First Input Delay  
    cls: 0, // Cumulative Layout Shift
    ttfb: 0, // Time to First Byte
    fcp: 0, // First Contentful Paint
    memoryUsage: 0,
    bundleSize: 0,
    componentsRendered: 0,
    apiCalls: 0,
    imageLoaded: 0,
    cacheHits: 0
  });

  const [isMonitoring, setIsMonitoring] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    
    intervalRef.current = setInterval(() => {
      // Simulate real performance metrics
      setMetrics(prev => ({
        lcp: Math.random() * 2000 + 800, // 800-2800ms
        fid: Math.random() * 100 + 10, // 10-110ms
        cls: Math.random() * 0.25, // 0-0.25
        ttfb: Math.random() * 500 + 100, // 100-600ms
        fcp: Math.random() * 1500 + 500, // 500-2000ms
        memoryUsage: Math.random() * 50 + 20, // 20-70MB
        bundleSize: 245 + Math.random() * 50, // ~245-295KB
        componentsRendered: prev.componentsRendered + Math.floor(Math.random() * 5),
        apiCalls: prev.apiCalls + Math.floor(Math.random() * 3),
        imageLoaded: prev.imageLoaded + Math.floor(Math.random() * 2),
        cacheHits: prev.cacheHits + Math.floor(Math.random() * 4)
      }));
    }, 1000);
  }, []);

  const stopMonitoring = useCallback(() => {
    setIsMonitoring(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const resetMetrics = useCallback(() => {
    setMetrics({
      lcp: 0,
      fid: 0,
      cls: 0,
      ttfb: 0,
      fcp: 0,
      memoryUsage: 0,
      bundleSize: 245,
      componentsRendered: 0,
      apiCalls: 0,
      imageLoaded: 0,
      cacheHits: 0
    });
  }, []);

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    resetMetrics
  };
};

// Memoized Heavy Component
const HeavyComponent = memo(({ 
  data, 
  onAction, 
  theme = 'dark' 
}: { 
  data: unknown[]; 
  onAction: (id: string) => void;
  theme?: string;
}) => {
  console.log('HeavyComponent render'); // For demo purposes
  
  // Expensive computation simulation
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true,
      hash: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    }));
  }, [data]);

  const handleClick = useCallback((id: string) => {
    onAction(id);
  }, [onAction]);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Cpu className="mr-2 h-5 w-5" />
          Optimized Heavy Component
        </CardTitle>
        <CardDescription className="text-gray-400">
          This component uses React.memo, useMemo, and useCallback for optimization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {processedData.slice(0, 6).map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <div className="text-white font-medium">{item.name}</div>
              <div className="text-gray-400 text-sm">Hash: {item.hash}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Processed {processedData.length} items • Theme: {theme}
        </div>
      </CardContent>
    </Card>
  );
});

HeavyComponent.displayName = 'HeavyComponent';

// Virtual Scrolling Component
const VirtualScrollDemo = () => {
  const [itemCount, setItemCount] = useState(10000);
  const [itemHeight] = useState(60);
  const [containerHeight] = useState(400);
  const [scrollTop, setScrollTop] = useState(0);
  const [isVirtualized, setIsVirtualized] = useState(true);

  // Generate mock data
  const items = useMemo(() => 
    Array.from({ length: itemCount }, (_, i) => ({
      id: i,
      name: `Campus User ${i + 1}`,
      avatar: `/api/placeholder/40/40`,
      status: ['online', 'away', 'offline'][Math.floor(Math.random() * 3)],
      lastSeen: `${Math.floor(Math.random() * 60)}m ago`,
      space: ['CS Study Group', 'Ellicott Complex', 'Engineering Club', 'Buffalo Gaming'][Math.floor(Math.random() * 4)]
    })), 
    [itemCount]
  );

  // Virtual scrolling calculations
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  const visibleItems = items.slice(visibleStart, visibleEnd);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const renderVirtualized = () => (
    <div
      className="overflow-auto bg-gray-900 border border-gray-800 rounded-lg"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 border-b border-gray-800 hover:bg-gray-800"
              style={{ height: itemHeight }}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={item.avatar} />
                <AvatarFallback className="bg-gray-700 text-white text-xs">
                  {item.name.split(' ')[2]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium truncate">{item.name}</span>
                  <Badge 
                    className={`text-xs ${
                      item.status === 'online' ? 'bg-green-600' :
                      item.status === 'away' ? 'bg-yellow-600' : 'bg-gray-600'
                    }`}
                  >
                    {item.status}
                  </Badge>
                </div>
                <div className="text-gray-400 text-sm truncate">
                  {item.space} • {item.lastSeen}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRegular = () => (
    <div
      className="overflow-auto bg-gray-900 border border-gray-800 rounded-lg"
      style={{ height: containerHeight }}
    >
      {items.slice(0, 100).map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-3 p-3 border-b border-gray-800 hover:bg-gray-800"
          style={{ height: itemHeight }}
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={item.avatar} />
            <AvatarFallback className="bg-gray-700 text-white text-xs">
              {item.name.split(' ')[2]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium truncate">{item.name}</span>
              <Badge 
                className={`text-xs ${
                  item.status === 'online' ? 'bg-green-600' :
                  item.status === 'away' ? 'bg-yellow-600' : 'bg-gray-600'
                }`}
              >
                {item.status}
              </Badge>
            </div>
            <div className="text-gray-400 text-sm truncate">
              {item.space} • {item.lastSeen}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <List className="mr-2 h-5 w-5" />
          Virtual Scrolling Demo
        </CardTitle>
        <CardDescription className="text-gray-400">
          Efficiently render large lists with virtual scrolling
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={isVirtualized}
                onCheckedChange={setIsVirtualized}
              />
              <Label className="text-white">
                Virtualization {isVirtualized ? 'ON' : 'OFF'}
              </Label>
            </div>
            
            <Badge variant={isVirtualized ? 'default' : 'secondary'}>
              {isVirtualized 
                ? `Rendering ${visibleItems.length} of ${itemCount} items`
                : `Rendering ${Math.min(100, itemCount)} of ${itemCount} items`
              }
            </Badge>
          </div>
          
          <div className="text-sm text-gray-400">
            Performance: {isVirtualized ? 'Optimized' : 'Standard'}
          </div>
        </div>

        {isVirtualized ? renderVirtualized() : renderRegular()}
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center p-2 bg-gray-800 rounded">
            <div className="text-yellow-400 font-bold">{itemCount.toLocaleString()}</div>
            <div className="text-gray-400">Total Items</div>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded">
            <div className="text-green-400 font-bold">
              {isVirtualized ? visibleItems.length : Math.min(100, itemCount)}
            </div>
            <div className="text-gray-400">DOM Nodes</div>
          </div>
          <div className="text-center p-2 bg-gray-800 rounded">
            <div className="text-blue-400 font-bold">60 FPS</div>
            <div className="text-gray-400">Scroll Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Lazy Loading Demo
const LazyLoadDemo = () => {
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  // Simulate lazy component loading
  const LazyProfileCard = lazy(() => 
    new Promise<{ default: React.ComponentType<any> }>(resolve => {
      setTimeout(() => {
        resolve({
          default: ({ user }: { user: any }) => (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gray-600 text-white">
                      {user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm">{user.major}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        });
      }, 1000);
    })
  );

  const LazySpaceCard = lazy(() =>
    new Promise<{ default: React.ComponentType<any> }>(resolve => {
      setTimeout(() => {
        resolve({
          default: ({ space }: { space: any }) => (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="text-white font-medium">{space.name}</div>
                  <div className="text-gray-400 text-sm">{space.description}</div>
                  <Badge className="bg-blue-600 text-white">
                    {space.memberCount} members
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        });
      }, 1500);
    })
  );

  const loadComponent = (componentName: string) => {
    if (loadedComponents.has(componentName)) return;

    setIsLoading(prev => ({ ...prev, [componentName]: true }));
    
    setTimeout(() => {
      setLoadedComponents(prev => new Set([...prev, componentName]));
      setIsLoading(prev => ({ ...prev, [componentName]: false }));
    }, Math.random() * 1000 + 500);
  };

  const mockUser = { name: 'Sarah Johnson', major: 'Computer Science' };
  const mockSpace = { 
    name: 'CS Study Group', 
    description: 'Weekly study sessions for Computer Science students',
    memberCount: 24
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Download className="mr-2 h-5 w-5" />
          Lazy Loading Demo
        </CardTitle>
        <CardDescription className="text-gray-400">
          Components are loaded dynamically when needed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white">Profile Card</span>
              <Button
                size="sm"
                onClick={() => loadComponent('profile')}
                disabled={isLoading.profile || loadedComponents.has('profile')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading.profile ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : loadedComponents.has('profile') ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="ml-1">
                  {isLoading.profile ? 'Loading...' : 
                   loadedComponents.has('profile') ? 'Loaded' : 'Load'}
                </span>
              </Button>
            </div>
            
            {loadedComponents.has('profile') && (
              <Suspense fallback={
                <div className="animate-pulse bg-gray-800 rounded-lg h-20" />
              }>
                <LazyProfileCard user={mockUser} />
              </Suspense>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white">Space Card</span>
              <Button
                size="sm"
                onClick={() => loadComponent('space')}
                disabled={isLoading.space || loadedComponents.has('space')}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading.space ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : loadedComponents.has('space') ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span className="ml-1">
                  {isLoading.space ? 'Loading...' : 
                   loadedComponents.has('space') ? 'Loaded' : 'Load'}
                </span>
              </Button>
            </div>
            
            {loadedComponents.has('space') && (
              <Suspense fallback={
                <div className="animate-pulse bg-gray-800 rounded-lg h-20" />
              }>
                <LazySpaceCard space={mockSpace} />
              </Suspense>
            )}
          </div>
        </div>

        <Alert className="border-blue-600 bg-blue-900/20">
          <FileText className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Bundle Impact:</strong> Components are split into separate chunks and only loaded when requested, 
            reducing initial bundle size by ~40KB per component.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

// Core Web Vitals Monitor
const CoreWebVitalsMonitor = ({ metrics }: { metrics: any }) => {
  const getScoreColor = (metric: string, value: number) => {
    const thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 600, poor: 1500 }
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'text-gray-400';

    if (value <= threshold.good) return 'text-green-400';
    if (value <= threshold.poor) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatMetric = (metric: string, value: number) => {
    if (metric === 'cls') return value.toFixed(3);
    if (metric.includes('memory')) return `${value.toFixed(1)}MB`;
    if (metric.includes('size')) return `${value.toFixed(0)}KB`;
    return `${value.toFixed(0)}ms`;
  };

  const webVitals = [
    { key: 'lcp', name: 'Largest Contentful Paint', value: metrics.lcp, icon: Target },
    { key: 'fid', name: 'First Input Delay', value: metrics.fid, icon: Timer },
    { key: 'cls', name: 'Cumulative Layout Shift', value: metrics.cls, icon: Layers },
    { key: 'fcp', name: 'First Contentful Paint', value: metrics.fcp, icon: Eye },
    { key: 'ttfb', name: 'Time to First Byte', value: metrics.ttfb, icon: Zap }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="mr-2 h-5 w-5" />
          Core Web Vitals
        </CardTitle>
        <CardDescription className="text-gray-400">
          Real-time user experience metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {webVitals.map(({ key, name, value, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className="h-4 w-4 text-gray-400" />
                <span className="text-white text-sm">{name}</span>
              </div>
              <div className={`font-mono text-sm ${getScoreColor(key, value)}`}>
                {formatMetric(key, value)}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4 bg-gray-700" />

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-blue-400">{metrics.memoryUsage.toFixed(1)}MB</div>
            <div className="text-xs text-gray-400">Memory Usage</div>
          </div>
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-lg font-bold text-purple-400">{metrics.bundleSize.toFixed(0)}KB</div>
            <div className="text-xs text-gray-400">Bundle Size</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Performance Controls
const PerformanceControls = ({ 
  onStartMonitoring, 
  onStopMonitoring, 
  onReset,
  isMonitoring 
}: {
  onStartMonitoring: () => void;
  onStopMonitoring: () => void;
  onReset: () => void;
  isMonitoring: boolean;
}) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <Settings className="mr-2 h-5 w-5" />
        Performance Controls
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex space-x-2">
        <Button
          onClick={onStartMonitoring}
          disabled={isMonitoring}
          className="bg-green-600 hover:bg-green-700"
          size="sm"
        >
          <Play className="h-4 w-4 mr-2" />
          Start
        </Button>
        
        <Button
          onClick={onStopMonitoring}
          disabled={!isMonitoring}
          variant="destructive"
          size="sm"
        >
          <Pause className="h-4 w-4 mr-2" />
          Stop
        </Button>
        
        <Button
          onClick={onReset}
          variant="secondary"
          size="sm"
          className="border-gray-600 text-gray-300"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        <div>Status: {isMonitoring ? 'Monitoring' : 'Stopped'}</div>
        <div>Update Rate: 1 second</div>
        <div>Metrics: Core Web Vitals + Custom</div>
      </div>
    </CardContent>
  </Card>
);

// Optimization Summary
const OptimizationSummary = ({ metrics }: { metrics: any }) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <BarChart3 className="mr-2 h-5 w-5" />
        Optimization Impact
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-green-400">{metrics.componentsRendered}</div>
          <div className="text-xs text-gray-400">Components Rendered</div>
        </div>
        
        <div className="text-center p-3 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-blue-400">{metrics.cacheHits}</div>
          <div className="text-xs text-gray-400">Cache Hits</div>
        </div>
        
        <div className="text-center p-3 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-yellow-400">{metrics.apiCalls}</div>
          <div className="text-xs text-gray-400">API Calls</div>
        </div>
        
        <div className="text-center p-3 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-purple-400">{metrics.imageLoaded}</div>
          <div className="text-xs text-gray-400">Images Loaded</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Bundle Optimization</span>
          <span className="text-green-400">+40% smaller</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Render Performance</span>
          <span className="text-green-400">+60% faster</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Memory Usage</span>
          <span className="text-green-400">-35% reduction</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main Performance System
const PerformanceOptimizationSystem = () => {
  const performance = usePerformanceMonitoring();
  const [testData, setTestData] = useState(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i.toString(),
      name: `Test Item ${i + 1}`,
      description: `Description for item ${i + 1}`
    }))
  );

  const handleAction = useCallback((id: string) => {
  }, []);

  const addTestData = () => {
    setTestData(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: `New Item ${prev.length + 1}`,
        description: `Dynamic item ${prev.length + 1}`
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Zap className="mr-4 h-10 w-10" />
            Performance Optimization System
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl">
            Advanced performance optimization techniques ensuring blazing fast experiences 
            for UB students even with complex campus features and large datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monitoring & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <PerformanceControls
              onStartMonitoring={performance.startMonitoring}
              onStopMonitoring={performance.stopMonitoring}
              onReset={performance.resetMetrics}
              isMonitoring={performance.isMonitoring}
            />
            
            <CoreWebVitalsMonitor metrics={performance.metrics} />
            
            <OptimizationSummary metrics={performance.metrics} />
          </div>

          {/* Demo Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Memoization Demo */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">React Optimization</h2>
                <Button onClick={addTestData} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Data
                </Button>
              </div>
              
              <HeavyComponent 
                data={testData} 
                onAction={handleAction}
                theme="dark"
              />
            </div>

            {/* Virtual Scrolling */}
            <VirtualScrollDemo />
            
            {/* Lazy Loading */}
            <LazyLoadDemo />

            {/* Performance Tips */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Optimization Techniques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">✅ Implemented</h4>
                    <div className="text-green-400">• React.memo for expensive components</div>
                    <div className="text-green-400">• useMemo for heavy computations</div>
                    <div className="text-green-400">• useCallback for stable functions</div>
                    <div className="text-green-400">• Virtual scrolling for large lists</div>
                    <div className="text-green-400">• Lazy loading with Suspense</div>
                    <div className="text-green-400">• Bundle splitting and tree shaking</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-white font-medium">🚀 Advanced</h4>
                    <div className="text-blue-400">• Service Worker caching</div>
                    <div className="text-blue-400">• Image optimization (WebP)</div>
                    <div className="text-blue-400">• Request deduplication</div>
                    <div className="text-blue-400">• Critical CSS inlining</div>
                    <div className="text-blue-400">• Preload important resources</div>
                    <div className="text-blue-400">• Database query optimization</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Story Exports
export const PerformanceOptimization: Story = {
  render: () => <PerformanceOptimizationSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete performance optimization system with real-time monitoring and advanced techniques'
      }
    }
  }
};

export const VirtualScrolling: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <VirtualScrollDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Virtual scrolling for efficiently rendering large lists of campus users and content'
      }
    }
  }
};

export const LazyLoading: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6">
      <LazyLoadDemo />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lazy loading components with dynamic imports and code splitting'
      }
    }
  }
};

export const CoreWebVitals: Story = {
  render: () => {
    const performance = usePerformanceMonitoring();
    
    useEffect(() => {
      performance.startMonitoring();
      return () => performance.stopMonitoring();
    }, []);
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <CoreWebVitalsMonitor metrics={performance.metrics} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-time Core Web Vitals monitoring and performance metrics'
      }
    }
  }
};