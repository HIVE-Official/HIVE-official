/**
 * HIVE Performance Guidelines: Campus-Specific Targets
 * Performance optimization documentation for campus network conditions and mobile-first experiences
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Progress } from '../../../components/ui/progress';
import { 
  Zap, 
  Wifi, 
  Smartphone, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Monitor,
  Image,
  FileCode,
  Database,
  Cloud,
  Users,
  MapPin,
  Activity,
  BarChart3,
  Gauge,
  Timer,
  Download
} from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../hive-tokens.css';

const meta = {
  title: '10-Performance/Campus Guidelines & Targets',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Performance Guidelines: Campus-Specific Targets

Performance optimization documentation designed for the unique challenges of campus network conditions and mobile-first student experiences.

## Campus Performance Context
- **Variable Network Quality**: WiFi dead zones, cellular congestion, shared bandwidth
- **Mobile-First Usage**: Students primarily access HIVE on mobile devices while walking
- **Battery Constraints**: Power-efficient animations and processing for all-day usage
- **Social Moments**: Fast loading for social interactions and coordination

## Performance Targets
- **First Contentful Paint**: < 1.5s on 3G, < 800ms on campus WiFi
- **Largest Contentful Paint**: < 2.5s on mobile, < 1.8s on desktop  
- **Cumulative Layout Shift**: < 0.1 across all devices
- **First Input Delay**: < 100ms for immediate interaction feedback
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const PerformanceShowcase = () => {
  const [activeMetric, setActiveMetric] = useState<string>('core-vitals');
  const [simulatedNetwork, setSimulatedNetwork] = useState<'fast3g' | 'slow3g' | 'wifi'>('fast3g');
  const [isLoading, setIsLoading] = useState(false);
  const [performanceData, setPerformanceData] = useState<any>({});

  // Campus-Specific Performance Targets
  const campusTargets = {
    'core-vitals': {
      title: 'Core Web Vitals',
      icon: Gauge,
      description: 'Essential metrics for campus user experience',
      metrics: [
        {
          name: 'First Contentful Paint (FCP)',
          target: {
            '3g': '< 1.5s',
            'wifi': '< 800ms',
            'desktop': '< 600ms'
          },
          current: { '3g': 1.2, wifi: 0.7, desktop: 0.5 },
          importance: 'Students need immediate visual feedback while navigating campus',
          optimizations: [
            'Critical CSS inlining',
            'Font preloading',
            'Image lazy loading',
            'Service worker caching'
          ]
        },
        {
          name: 'Largest Contentful Paint (LCP)',
          target: {
            '3g': '< 2.5s',
            'wifi': '< 1.8s',
            'desktop': '< 1.2s'
          },
          current: { '3g': 2.1, wifi: 1.5, desktop: 1.0 },
          importance: 'Main content must load quickly for mobile-first campus usage',
          optimizations: [
            'Image optimization',
            'CDN implementation',
            'Preload key resources',
            'Minimize render blocking'
          ]
        },
        {
          name: 'Cumulative Layout Shift (CLS)',
          target: {
            '3g': '< 0.1',
            'wifi': '< 0.1',
            'desktop': '< 0.1'
          },
          current: { '3g': 0.05, wifi: 0.03, desktop: 0.02 },
          importance: 'Stable layouts prevent misclicks while walking',
          optimizations: [
            'Image dimensions',
            'Font fallbacks',
            'Reserved space for ads',
            'CSS containment'
          ]
        },
        {
          name: 'First Input Delay (FID)',
          target: {
            '3g': '< 100ms',
            'wifi': '< 50ms',
            'desktop': '< 30ms'
          },
          current: { '3g': 80, wifi: 40, desktop: 25 },
          importance: 'Immediate response for social interactions and quick actions',
          optimizations: [
            'Code splitting',
            'Reduce JavaScript',
            'Worker threads',
            'Event delegation'
          ]
        }
      ]
    },
    'campus-specific': {
      title: 'Campus-Specific Metrics',
      icon: MapPin,
      description: 'Performance targets for campus social utility scenarios',
      metrics: [
        {
          name: 'Space Discovery Load Time',
          target: {
            '3g': '< 2s',
            'wifi': '< 1s',
            'desktop': '< 800ms'
          },
          current: { '3g': 1.6, wifi: 0.8, desktop: 0.6 },
          importance: 'Fast space browsing for students between classes',
          optimizations: [
            'Incremental loading',
            'Skeleton screens',
            'Predictive prefetching',
            'Background sync'
          ]
        },
        {
          name: 'Profile Load & Interaction',
          target: {
            '3g': '< 1.5s',
            'wifi': '< 800ms',
            'desktop': '< 500ms'
          },
          current: { '3g': 1.2, wifi: 0.7, desktop: 0.4 },
          importance: 'Quick profile access for social trust building',
          optimizations: [
            'Profile caching',
            'Image compression',
            'Data prefetching',
            'Stale-while-revalidate'
          ]
        },
        {
          name: 'Real-time Updates',
          target: {
            '3g': '< 3s',
            'wifi': '< 1s',
            'desktop': '< 500ms'
          },
          current: { '3g': 2.5, wifi: 0.8, desktop: 0.4 },
          importance: 'Live campus coordination and social updates',
          optimizations: [
            'WebSocket optimization',
            'Batch updates',
            'Differential sync',
            'Smart polling'
          ]
        },
        {
          name: 'Tool Creation Flow',
          target: {
            '3g': '< 3s per step',
            'wifi': '< 1.5s per step',
            'desktop': '< 1s per step'
          },
          current: { '3g': 2.8, wifi: 1.3, desktop: 0.9 },
          importance: 'Smooth tool building maintains creative momentum',
          optimizations: [
            'Progressive saving',
            'Background processing',
            'Optimistic updates',
            'State persistence'
          ]
        }
      ]
    },
    'network-conditions': {
      title: 'Network Adaptation',
      icon: Wifi,
      description: 'Performance strategies for variable campus connectivity',
      metrics: [
        {
          name: 'Offline Capability',
          target: {
            '3g': 'Core features work offline',
            'wifi': 'Enhanced offline experience',
            'desktop': 'Full offline functionality'
          },
          current: { '3g': 'Basic', wifi: 'Good', desktop: 'Excellent' },
          importance: 'Graceful degradation in WiFi dead zones',
          optimizations: [
            'Service worker',
            'IndexedDB storage',
            'Background sync',
            'Cache-first strategy'
          ]
        },
        {
          name: 'Adaptive Loading',
          target: {
            '3g': 'Essential content only',
            'wifi': 'Standard experience',
            'desktop': 'Full feature set'
          },
          current: { '3g': 'Good', wifi: 'Excellent', desktop: 'Excellent' },
          importance: 'Bandwidth-aware content delivery',
          optimizations: [
            'Connection quality detection',
            'Progressive enhancement',
            'Conditional resource loading',
            'Data saver mode'
          ]
        }
      ]
    }
  };

  // Performance Simulation
  const simulateNetworkCondition = (condition: typeof simulatedNetwork) => {
    setIsLoading(true);
    setSimulatedNetwork(condition);
    
    const loadTimes = {
      'slow3g': 3000,
      'fast3g': 1500,
      'wifi': 500
    };
    
    setTimeout(() => {
      setIsLoading(false);
      setPerformanceData({
        loadTime: loadTimes[condition],
        condition: condition,
        timestamp: Date.now()
      });
    }, loadTimes[condition]);
  };

  // Performance Metrics Visualization
  const MetricVisualization = ({ metric, networkType }: { metric: any; networkType: string }) => {
    const current = typeof metric.current[networkType] === 'number' ? 
      metric.current[networkType] : 
      metric.current[networkType];
    
    const target = metric.target[networkType];
    
    const getStatus = (current: any, target: string) => {
      if (typeof current === 'string') {
        return current === 'Excellent' ? 'excellent' : 
               current === 'Good' ? 'good' : 'needs-work';
      }
      
      const targetValue = parseFloat(target.replace(/[<>\s]/g, ''));
      const isTime = target.includes('s') || target.includes('ms');
      const comparison = isTime ? current <= targetValue : current >= targetValue;
      
      return comparison ? 'excellent' : current <= targetValue * 1.2 ? 'good' : 'needs-work';
    };

    const status = getStatus(current, target);
    const statusConfig = {
      excellent: { color: 'var(--hive-status-success)', icon: CheckCircle },
      good: { color: 'var(--hive-status-warning)', icon: Clock },
      'needs-work': { color: 'var(--hive-status-error)', icon: XCircle }
    };

    const StatusIcon = statusConfig[status as keyof typeof statusConfig].icon;
    
    return (
      <motion.div
        className="p-4 rounded-lg border"
        style={{
          backgroundColor: 'var(--hive-background-tertiary)',
          borderColor: statusConfig[status as keyof typeof statusConfig].color
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-sm" style={{ color: 'var(--hive-text-primary)' }}>
            {metric.name}
          </h4>
          <div className="flex items-center space-x-2">
            <StatusIcon className="w-4 h-4" style={{ color: statusConfig[status as keyof typeof statusConfig].color }} />
            <Badge style={{ 
              backgroundColor: statusConfig[status as keyof typeof statusConfig].color,
              color: 'white',
              fontSize: '0.75rem'
            }}>
              {typeof current === 'number' ? 
                (metric.name.includes('CLS') ? current.toFixed(3) : `${current}${metric.name.includes('Delay') ? 'ms' : 's'}`) :
                current}
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span style={{ color: 'var(--hive-text-muted)' }}>Target: {target}</span>
            <span style={{ color: 'var(--hive-text-muted)' }}>Network: {networkType}</span>
          </div>
          
          {typeof current === 'number' && (
            <div className="space-y-1">
              <Progress 
                value={Math.min((parseFloat(target.replace(/[<>\s]/g, '')) / current) * 100, 100)}
                className="h-2"
              />
              <div className="text-xs" style={{ color: 'var(--hive-text-disabled)' }}>
                {status === 'excellent' ? 'Meeting target' : 
                 status === 'good' ? 'Close to target' : 'Needs optimization'}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Campus Scenario Simulator
  const CampusScenarioSimulator = () => {
    const scenarios = [
      {
        title: 'Walking Between Classes',
        network: 'Variable 3G/4G',
        constraints: ['One-handed use', 'Intermittent connectivity', 'Battery conservation'],
        loadTime: isLoading ? 'Loading...' : `${performanceData.loadTime || 800}ms`
      },
      {
        title: 'Dorm Room WiFi',
        network: 'Shared Campus WiFi',
        constraints: ['Peak usage congestion', 'Bandwidth limits', 'Stable connection'],
        loadTime: isLoading ? 'Loading...' : `${performanceData.loadTime || 500}ms`
      },
      {
        title: 'Library Study Session',
        network: 'High-Speed WiFi',
        constraints: ['Optimal conditions', 'Desktop/laptop access', 'Extended usage'],
        loadTime: isLoading ? 'Loading...' : `${performanceData.loadTime || 300}ms`
      }
    ];

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {(['slow3g', 'fast3g', 'wifi'] as const).map((condition) => (
            <Button
              key={condition}
              size="sm"
              variant={simulatedNetwork === condition ? "default" : "outline"}
              onClick={() => simulateNetworkCondition(condition)}
              disabled={isLoading}
              style={{
                backgroundColor: simulatedNetwork === condition ? 'var(--hive-brand-primary)' : 'transparent',
                color: simulatedNetwork === condition ? 'var(--hive-text-inverse)' : 'var(--hive-text-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <Wifi className="w-4 h-4 mr-1" />
              {condition === 'slow3g' ? 'Slow 3G' : condition === 'fast3g' ? 'Fast 3G' : 'Campus WiFi'}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                {scenario.title}
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span style={{ color: 'var(--hive-text-secondary)' }}>Network:</span>
                  <span className="ml-1" style={{ color: 'var(--hive-text-muted)' }}>
                    {scenario.network}
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--hive-text-secondary)' }}>Load Time:</span>
                  <Badge className="ml-2" style={{ 
                    backgroundColor: isLoading ? 'var(--hive-status-warning)' : 'var(--hive-status-success)',
                    color: 'white'
                  }}>
                    {scenario.loadTime}
                  </Badge>
                </div>
                <div>
                  <span style={{ color: 'var(--hive-text-secondary)' }}>Constraints:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scenario.constraints.map((constraint, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs"
                             style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                        {constraint}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Optimization Strategies
  const optimizationStrategies = [
    {
      category: 'Image Optimization',
      strategies: [
        { name: 'WebP Format', impact: 'High', effort: 'Low', savings: '25-35% file size' },
        { name: 'Lazy Loading', impact: 'High', effort: 'Medium', savings: '40-60% initial load' },
        { name: 'Responsive Images', impact: 'Medium', effort: 'Medium', savings: '20-50% bandwidth' },
        { name: 'CDN Delivery', impact: 'High', effort: 'Low', savings: '30-70% load time' }
      ]
    },
    {
      category: 'JavaScript Optimization',
      strategies: [
        { name: 'Code Splitting', impact: 'High', effort: 'High', savings: '50-80% initial bundle' },
        { name: 'Tree Shaking', impact: 'Medium', effort: 'Low', savings: '10-30% bundle size' },
        { name: 'Module Federation', impact: 'High', effort: 'High', savings: '40-60% redundancy' },
        { name: 'Service Workers', impact: 'High', effort: 'Medium', savings: '90% repeat visits' }
      ]
    },
    {
      category: 'Campus-Specific',
      strategies: [
        { name: 'Offline-First Design', impact: 'High', effort: 'High', savings: '100% in dead zones' },
        { name: 'Predictive Prefetching', impact: 'Medium', effort: 'Medium', savings: '30-50% perceived load' },
        { name: 'Battery-Aware Features', impact: 'Medium', effort: 'Medium', savings: '20% battery usage' },
        { name: 'Adaptive Quality', impact: 'High', effort: 'Medium', savings: '40-80% on slow networks' }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-8" style={{ 
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 50%, var(--hive-background-secondary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 hive-interactive p-2"
                 style={{ 
                   backgroundColor: 'var(--hive-background-tertiary)',
                   border: '1px solid var(--hive-border-gold)'
                 }}>
              <Zap className="w-full h-full" style={{ color: 'var(--hive-brand-primary)' }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              Performance Guidelines
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            Campus-specific performance targets optimized for variable network conditions and mobile-first student experiences.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-800/50 text-white border-gray-700">Mobile Optimized</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Network Aware</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Battery Efficient</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Offline Ready</Badge>
          </div>
        </motion.div>

        {/* Metric Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-wrap gap-3">
            {Object.entries(campusTargets).map(([key, target]) => {
              const IconComponent = target.icon;
              const isActive = activeMetric === key;
              return (
                <Button
                  key={key}
                  variant={isActive ? "default" : "outline"}
                  size="lg"
                  className="hive-interactive"
                  style={isActive ? {
                    backgroundColor: 'var(--hive-brand-primary)',
                    color: 'var(--hive-text-inverse)',
                    borderColor: 'var(--hive-border-gold)'
                  } : {
                    borderColor: 'var(--hive-border-primary)',
                    color: 'var(--hive-text-secondary)'
                  }}
                  onClick={() => setActiveMetric(key)}
                >
                  <IconComponent className="w-5 h-5 mr-2" />
                  {target.title}
                </Button>
              );
            })}
          </div>
          
          <p className="text-lg mt-4" style={{ color: 'var(--hive-text-muted)' }}>
            {campusTargets[activeMetric as keyof typeof campusTargets].description}
          </p>
        </motion.div>

        {/* Performance Metrics Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMetric}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <Card className="hive-glass border border-gray-700">
              <CardHeader>
                <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                  {campusTargets[activeMetric as keyof typeof campusTargets].title} Targets
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  Performance metrics across different campus network conditions
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {campusTargets[activeMetric as keyof typeof campusTargets].metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-lg" style={{ color: 'var(--hive-text-primary)' }}>
                          {metric.name}
                        </h4>
                      </div>
                      
                      <p className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                        {metric.importance}
                      </p>

                      {/* Network Condition Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.keys(metric.target).map((networkType) => (
                          <MetricVisualization 
                            key={networkType}
                            metric={metric}
                            networkType={networkType}
                          />
                        ))}
                      </div>

                      {/* Optimization Strategies */}
                      <div className="mt-4">
                        <h5 className="font-medium mb-3 text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
                          Optimization Strategies:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {metric.optimizations.map((optimization: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs"
                                   style={{ borderColor: 'var(--hive-border-subtle)', color: 'var(--hive-text-muted)' }}>
                              {optimization}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Campus Scenario Simulator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Campus Performance Simulator
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Test HIVE's performance across different campus scenarios and network conditions
              </p>
            </CardHeader>
            <CardContent>
              <CampusScenarioSimulator />
            </CardContent>
          </Card>
        </motion.div>

        {/* Optimization Strategies */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Performance Optimization Strategies
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Prioritized optimization techniques for maximum campus performance impact
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {optimizationStrategies.map((category, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <h4 className="font-medium mb-4" style={{ color: 'var(--hive-text-primary)' }}>
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {category.strategies.map((strategy, idx) => (
                        <div key={idx} className="p-4 rounded-lg border"
                             style={{
                               backgroundColor: 'var(--hive-background-secondary)',
                               borderColor: 'var(--hive-border-primary)'
                             }}>
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm" style={{ color: 'var(--hive-text-primary)' }}>
                              {strategy.name}
                            </h5>
                            <div className="flex space-x-1">
                              <Badge 
                                style={{ 
                                  backgroundColor: strategy.impact === 'High' ? 'var(--hive-status-success)' :
                                                   strategy.impact === 'Medium' ? 'var(--hive-status-warning)' :
                                                   'var(--hive-status-info)',
                                  color: 'white',
                                  fontSize: '0.7rem'
                                }}
                              >
                                {strategy.impact}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span style={{ color: 'var(--hive-text-secondary)' }}>Effort:</span>
                              <span style={{ color: 'var(--hive-text-muted)' }}>{strategy.effort}</span>
                            </div>
                            <div className="flex justify-between">
                              <span style={{ color: 'var(--hive-text-secondary)' }}>Savings:</span>
                              <span style={{ color: 'var(--hive-text-muted)' }}>{strategy.savings}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Guidelines */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Implementation Guidelines
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Technical implementation for campus performance optimization
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Network Awareness
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-2"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>// Detect network conditions</div>
                      <div>const connection = navigator.connection;</div>
                      <div>if (connection.effectiveType === '3g') &#123;</div>
                      <div className="pl-4">// Load essential content only</div>
                      <div className="pl-4">enableDataSaverMode();</div>
                      <div>&#125;</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Offline-First Strategy
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-1"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>// Service worker cache strategy</div>
                      <div>self.addEventListener('fetch', (event) =&gt; &#123;</div>
                      <div className="pl-4">event.respondWith(</div>
                      <div className="pl-8">caches.match(event.request)</div>
                      <div className="pl-8">.then(response =&gt; response || fetch(event.request))</div>
                      <div className="pl-4">);</div>
                      <div>&#125;);</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Performance Monitoring
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-1"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>// Web Vitals monitoring</div>
                      <div>import &#123;getCLS, getFID, getFCP, getLCP&#125; from 'web-vitals';</div>
                      <div className="mt-2">getCLS(console.log);</div>
                      <div>getFID(console.log);</div>
                      <div>getLCP(console.log);</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Campus-Specific Optimizations
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Preload critical campus resources (spaces, profiles)
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Implement background sync for social updates
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Use intersection observers for lazy loading
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Optimize for battery-conscious users
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export const PerformanceCampusGuidelines: Story = {
  render: () => <PerformanceShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};