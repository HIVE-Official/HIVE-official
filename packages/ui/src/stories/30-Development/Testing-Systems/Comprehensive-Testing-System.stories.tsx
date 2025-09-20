import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { HiveProgress as Progress } from '../../components/hive-progress';
import { Switch } from '../../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { 
  TestTube,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Zap,
  Target,
  Bug,
  Shield,
  Activity,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  Square,
  SkipForward,
  RefreshCw,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Users,
  User,
  Globe,
  Wifi,
  WifiOff,
  Database,
  Server,
  Cloud,
  CloudOff,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Search,
  Filter,
  Download,
  Upload,
  Send,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Plus,
  Minus,
  X,
  Check,
  Info,
  HelpCircle,
  Code,
  Terminal,
  FileText,
  Folder,
  FolderOpen,
  File,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Copy,
  Trash2,
  Edit3,
  Save,
  Home,
  School,
  MapPin,
  Calendar,
  Bell,
  Star,
  Flag,
  Layers,
  Grid3x3,
  List,
  MoreHorizontal,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CornerUpLeft,
  CornerUpRight,
  CornerDownLeft,
  CornerDownRight,
  Maximize,
  Minimize,
  Loader2
} from 'lucide-react';

/**
 * # HIVE Comprehensive Testing System
 * 
 * Advanced testing scenarios, quality assurance patterns, and automated testing
 * demonstrations for the HIVE platform. Shows how components handle edge cases,
 * performance stress tests, accessibility validation, and real-world campus
 * usage scenarios that UB students encounter daily.
 * 
 * ## Testing Features:
 * - **Unit Testing**: Component isolation and behavior verification
 * - **Integration Testing**: Multi-component interaction scenarios
 * - **Performance Testing**: Load testing and stress scenarios
 * - **Accessibility Testing**: WCAG compliance and assistive technology support
 * - **User Experience Testing**: Real campus usage patterns and edge cases
 * - **Error Handling**: Comprehensive error scenario validation
 * - **Cross-Device Testing**: Mobile, tablet, and desktop compatibility
 * - **Network Testing**: Offline, slow connection, and network failure scenarios
 */

const meta: Meta = {
  title: '25-Advanced Systems/Comprehensive Testing',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive testing system with real-world campus scenarios and quality assurance'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Testing State Management
interface TestCase {
  id: string;
  name: string;
  description: string;
  category: 'unit' | 'integration' | 'performance' | 'accessibility' | 'ux' | 'security';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
  duration?: number;
  error?: string;
  metrics?: Record<string, number>;
  priority: 'low' | 'medium' | 'high' | 'critical'
}

interface TestSuite {
  id: string;
  name: string;
  description: string;
  tests: TestCase[];
  environment: 'development' | 'staging' | 'production' | 'local';
  device: 'mobile' | 'tablet' | 'desktop' | 'all';
  browser: 'chrome' | 'firefox' | 'safari' | 'edge' | 'all'
}

interface TestMetrics {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  coverage: number;
  performance: {
    averageResponseTime: number;
    memoryUsage: number;
    bundleSize: number
  };
  accessibility: {
    wcagAA: number;
    wcagAAA: number;
    issues: number
  }
}

// Advanced Testing Hook
const useTesting = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      id: 'campus-feed',
      name: 'Campus Feed Components',
      description: 'Testing social feed functionality for UB student interactions',
      environment: 'development',
      device: 'all',
      browser: 'all',
      tests: [
        {
          id: 'feed-loading',
          name: 'Feed Loading State',
          description: 'Verify feed loads correctly with skeleton UI',
          category: 'unit',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'post-interaction',
          name: 'Post Interactions',
          description: 'Test like, comment, share functionality',
          category: 'integration',
          status: 'pending',
          priority: 'critical'
        },
        {
          id: 'infinite-scroll',
          name: 'Infinite Scroll Performance',
          description: 'Test feed performance with 1000+ posts',
          category: 'performance',
          status: 'pending',
          priority: 'medium'
        },
        {
          id: 'feed-accessibility',
          name: 'Feed Screen Reader Support',
          description: 'Verify all feed content is accessible',
          category: 'accessibility',
          status: 'pending',
          priority: 'high'
        }
      ]
    },
    {
      id: 'campus-spaces',
      name: 'Campus Spaces System',
      description: 'Testing space creation, joining, and management for UB communities',
      environment: 'development',
      device: 'all',
      browser: 'all',
      tests: [
        {
          id: 'space-creation',
          name: 'Space Creation Flow',
          description: 'Test creating new campus spaces',
          category: 'integration',
          status: 'pending',
          priority: 'critical'
        },
        {
          id: 'member-management',
          name: 'Member Management',
          description: 'Test adding/removing space members',
          category: 'unit',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'space-permissions',
          name: 'Space Permission System',
          description: 'Verify role-based access controls',
          category: 'security',
          status: 'pending',
          priority: 'critical'
        },
        {
          id: 'space-search',
          name: 'Space Discovery',
          description: 'Test space search and filtering',
          category: 'ux',
          status: 'pending',
          priority: 'medium'
        }
      ]
    },
    {
      id: 'mobile-gestures',
      name: 'Mobile Gesture System',
      description: 'Testing touch interactions for on-the-go campus usage',
      environment: 'development',
      device: 'mobile',
      browser: 'all',
      tests: [
        {
          id: 'swipe-gestures',
          name: 'Swipe Gesture Recognition',
          description: 'Test swipe left/right/up/down detection',
          category: 'ux',
          status: 'pending',
          priority: 'high'
        },
        {
          id: 'haptic-feedback',
          name: 'Haptic Feedback',
          description: 'Verify vibration feedback on mobile devices',
          category: 'ux',
          status: 'pending',
          priority: 'medium'
        },
        {
          id: 'gesture-performance',
          name: 'Gesture Performance',
          description: 'Test 60fps gesture animations',
          category: 'performance',
          status: 'pending',
          priority: 'high'
        }
      ]
    },
    {
      id: 'campus-integration',
      name: 'UB Campus Integration',
      description: 'Testing Buffalo-specific features and data integration',
      environment: 'staging',
      device: 'all',
      browser: 'all',
      tests: [
        {
          id: 'ub-email-validation',
          name: 'UB Email Validation',
          description: 'Verify only @buffalo.edu emails are accepted',
          category: 'security',
          status: 'pending',
          priority: 'critical'
        },
        {
          id: 'campus-locations',
          name: 'Campus Location Data',
          description: 'Test building and location information accuracy',
          category: 'integration',
          status: 'pending',
          priority: 'medium'
        },
        {
          id: 'academic-calendar',
          name: 'Academic Calendar Integration',
          description: 'Verify semester dates and academic events',
          category: 'integration',
          status: 'pending',
          priority: 'low'
        }
      ]
    }
  ]);

  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [testMetrics, setTestMetrics] = useState<TestMetrics>({
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    skippedTests: 0,
    coverage: 0,
    performance: {
      averageResponseTime: 0,
      memoryUsage: 0,
      bundleSize: 0
    },
    accessibility: {
      wcagAA: 0,
      wcagAAA: 0,
      issues: 0
    }
  });

  const [isRunning, setIsRunning] = useState(false);

  // Calculate metrics from test suites
  useEffect(() => {
    const allTests = testSuites.flatMap(suite => suite.tests);
    const metrics: TestMetrics = {
      totalTests: allTests.length,
      passedTests: allTests.filter(t => t.status === 'passed').length,
      failedTests: allTests.filter(t => t.status === 'failed').length,
      skippedTests: allTests.filter(t => t.status === 'skipped').length,
      coverage: 0,
      performance: {
        averageResponseTime: 0,
        memoryUsage: 0,
        bundleSize: 0
      },
      accessibility: {
        wcagAA: 0,
        wcagAAA: 0,
        issues: 0
      }
    };

    // Calculate coverage
    const completedTests = metrics.passedTests + metrics.failedTests;
    metrics.coverage = metrics.totalTests > 0 ? (completedTests / metrics.totalTests) * 100 : 0;

    // Calculate performance metrics
    const performanceTests = allTests.filter(t => t.metrics);
    if (performanceTests.length > 0) {
      metrics.performance.averageResponseTime = performanceTests.reduce((acc, t) => 
        acc + (t.metrics?.responseTime || 0), 0) / performanceTests.length;
      metrics.performance.memoryUsage = Math.max(...performanceTests.map(t => t.metrics?.memoryUsage || 0));
      metrics.performance.bundleSize = Math.max(...performanceTests.map(t => t.metrics?.bundleSize || 0))
    }

    // Calculate accessibility metrics
    const accessibilityTests = allTests.filter(t => t.category === 'accessibility' && t.status === 'passed');
    metrics.accessibility.wcagAA = Math.min(95, accessibilityTests.length * 25); // Simulate scores
    metrics.accessibility.wcagAAA = Math.min(88, accessibilityTests.length * 20);
    metrics.accessibility.issues = allTests.filter(t => t.category === 'accessibility' && t.status === 'failed').length;

    setTestMetrics(metrics)
  }, [testSuites]);

  const runTest = useCallback(async (suiteId: string, testId: string) => {
    setCurrentTest(`${suiteId}-${testId}`);
    
    // Update test status to running
    setTestSuites(prev => prev.map(suite => ({
      ...suite,
      tests: suite.tests.map(test => 
        test.id === testId && suite.id === suiteId
          ? { ...test, status: 'running' as const }
          : test
      )
    })));

    // Simulate test execution
    const executionTime = Math.random() * 3000 + 500; // 0.5-3.5 seconds
    
    await new Promise(resolve => setTimeout(resolve, executionTime));

    // Simulate test results (90% pass rate)
    const passed = Math.random() > 0.1;
    const error = passed ? undefined : 'Test assertion failed: Expected true but received false';
    
    const metrics = {
      responseTime: Math.random() * 500 + 100,
      memoryUsage: Math.random() * 50 + 20,
      bundleSize: Math.random() * 100 + 200,
      accessibilityScore: Math.random() * 20 + 80
    };

    // Update test results
    setTestSuites(prev => prev.map(suite => ({
      ...suite,
      tests: suite.tests.map(test => 
        test.id === testId && suite.id === suiteId
          ? { 
              ...test, 
              status: passed ? 'passed' as const : 'failed' as const,
              duration: Math.round(executionTime),
              error,
              metrics
            }
          : test
      )
    })));

    setCurrentTest(null)
  }, []);

  const runAllTests = useCallback(async () => {
    setIsRunning(true);
    
    for (const suite of testSuites) {
      for (const test of suite.tests) {
        if (test.status === 'pending') {
          await runTest(suite.id, test.id)
        }
      }
    }
    
    setIsRunning(false)
  }, [testSuites, runTest]);

  const runSuite = useCallback(async (suiteId: string) => {
    setIsRunning(true);
    
    const suite = testSuites.find(s => s.id === suiteId);
    if (suite) {
      for (const test of suite.tests) {
        if (test.status === 'pending' || test.status === 'failed') {
          await runTest(suiteId, test.id)
        }
      }
    }
    
    setIsRunning(false)
  }, [testSuites, runTest]);

  const resetTests = useCallback(() => {
    setTestSuites(prev => prev.map(suite => ({
      ...suite,
      tests: suite.tests.map(test => ({
        ...test,
        status: 'pending' as const,
        duration: undefined,
        error: undefined,
        metrics: undefined
      })})
    })));
    setCurrentTest(null)
  }, []);

  return {
    testSuites,
    currentTest,
    testMetrics,
    isRunning,
    runTest,
    runAllTests,
    runSuite,
    resetTests
  }
};

// Test Status Icon Component
const TestStatusIcon = ({ status }: { status: TestCase['status'] }) => {
  switch (status) {
    case 'running':
      return <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />;
    case 'passed':
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-red-400" />;
    case 'skipped':
      return <Clock className="h-4 w-4 text-gray-400" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />
  }
};

// Test Category Badge
const TestCategoryBadge = ({ category }: { category: TestCase['category'] }) => {
  const categoryConfig = {
    unit: { color: 'bg-blue-600', label: 'Unit' },
    integration: { color: 'bg-green-600', label: 'Integration' },
    performance: { color: 'bg-purple-600', label: 'Performance' },
    accessibility: { color: 'bg-orange-600', label: 'A11y' },
    ux: { color: 'bg-pink-600', label: 'UX' },
    security: { color: 'bg-red-600', label: 'Security' }
  };

  const config = categoryConfig[category];
  
  return (
    <Badge className={`${config.color} text-white text-xs`}>
      {config.label}
    </Badge>
  )
};

// Test Priority Badge
const TestPriorityBadge = ({ priority }: { priority: TestCase['priority'] }) => {
  const priorityConfig = {
    low: { color: 'bg-gray-600', label: 'Low' },
    medium: { color: 'bg-yellow-600', label: 'Medium' },
    high: { color: 'bg-orange-600', label: 'High' },
    critical: { color: 'bg-red-600', label: 'Critical' }
  };

  const config = priorityConfig[priority];
  
  return (
    <Badge className={`${config.color} text-white text-xs`}>
      {config.label}
    </Badge>
  )
};

// Test Metrics Dashboard
const TestMetricsDashboard = ({ metrics }: { metrics: TestMetrics }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Tests</p>
            <p className="text-2xl font-bold text-white">{metrics.totalTests}</p>
          </div>
          <TestTube className="h-8 w-8 text-blue-400" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Passed</p>
            <p className="text-2xl font-bold text-green-400">{metrics.passedTests}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Failed</p>
            <p className="text-2xl font-bold text-red-400">{metrics.failedTests}</p>
          </div>
          <XCircle className="h-8 w-8 text-red-400" />
        </div>
      </CardContent>
    </Card>

    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Coverage</p>
            <p className="text-2xl font-bold text-yellow-400">{metrics.coverage.toFixed(1)}%</p>
          </div>
          <Target className="h-8 w-8 text-yellow-400" />
        </div>
      </CardContent>
    </Card>
  </div>
);

// Test Suite Component
const TestSuiteCard = ({ 
  suite, 
  currentTest, 
  onRunSuite, 
  onRunTest,
  isRunning 
}: {
  suite: TestSuite;
  currentTest: string | null;
  onRunSuite: (suiteId: string) => void;
  onRunTest: (suiteId: string, testId: string) => void;
  isRunning: boolean
}) => {
  const passedTests = suite.tests.filter(t => t.status === 'passed').length;
  const failedTests = suite.tests.filter(t => t.status === 'failed').length;
  const totalTests = suite.tests.length;
  const successRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg">{suite.name}</CardTitle>
            <CardDescription className="text-gray-400">{suite.description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
              {suite.environment}
            </Badge>
            <Button
              onClick={() => onRunSuite(suite.id)}
              disabled={isRunning}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4 mr-2" />
              Run Suite
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Monitor className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400 capitalize">{suite.device}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400 capitalize">{suite.browser}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BarChart3 className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">{successRate.toFixed(0)}% success</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {suite.tests.map(test => (
            <div
              key={test.id}
              className={`
                p-4 rounded-lg border transition-all
                ${currentTest === `${suite.id}-${test.id}` 
                  ? 'border-yellow-500 bg-yellow-500/5' 
                  : 'border-gray-700 bg-gray-800/50'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <TestStatusIcon status={test.status} />
                    <span className="text-white font-medium">{test.name}</span>
                    <TestCategoryBadge category={test.category} />
                    <TestPriorityBadge priority={test.priority} />
                  </div>
                  
                  <p className="text-gray-400 text-sm">{test.description}</p>
                  
                  {test.error && (
                    <Alert className="border-red-600 bg-red-900/20">
                      <Bug className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">
                        {test.error}
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {test.duration && (
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Duration: {test.duration}ms</span>
                      {test.metrics && (
                        <>
                          <span>Response: {test.metrics.responseTime?.toFixed(0)}ms</span>
                          <span>Memory: {test.metrics.memoryUsage?.toFixed(1)}MB</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={() => onRunTest(suite.id, test.id)}
                  disabled={isRunning || test.status === 'running'}
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                >
                  {test.status === 'running' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
};

// Performance Metrics Component
const PerformanceMetrics = ({ metrics }: { metrics: TestMetrics }) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <Zap className="mr-2 h-5 w-5" />
        Performance Metrics
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-blue-400">
            {metrics.performance.averageResponseTime.toFixed(0)}ms
          </div>
          <div className="text-sm text-gray-400">Avg Response Time</div>
        </div>
        
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-green-400">
            {metrics.performance.memoryUsage.toFixed(1)}MB
          </div>
          <div className="text-sm text-gray-400">Peak Memory Usage</div>
        </div>
        
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-purple-400">
            {metrics.performance.bundleSize.toFixed(0)}KB
          </div>
          <div className="text-sm text-gray-400">Bundle Size</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Accessibility Metrics Component
const AccessibilityMetrics = ({ metrics }: { metrics: TestMetrics }) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <Shield className="mr-2 h-5 w-5" />
        Accessibility Metrics
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white">WCAG 2.1 AA</span>
            <span className="text-green-400 font-bold">{metrics.accessibility.wcagAA}%</span>
          </div>
          <Progress value={metrics.accessibility.wcagAA} className="h-2" />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white">WCAG 2.1 AAA</span>
            <span className="text-yellow-400 font-bold">{metrics.accessibility.wcagAAA}%</span>
          </div>
          <Progress value={metrics.accessibility.wcagAAA} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <span className="text-white">Accessibility Issues</span>
          <Badge className={`${metrics.accessibility.issues > 0 ? 'bg-red-600' : 'bg-green-600'} text-white`}>
            {metrics.accessibility.issues}
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Campus-Specific Test Scenarios
const CampusTestScenarios = () => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <School className="mr-2 h-5 w-5" />
        UB Campus Test Scenarios
      </CardTitle>
      <CardDescription className="text-gray-400">
        Real-world scenarios specific to University at Buffalo students
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-white font-medium">Academic Scenarios</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Finals week stress testing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Course registration rush</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Study group coordination</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Professor office hours booking</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium">Campus Life Scenarios</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Dining hall wait times</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Parking space availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Stampede shuttle tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Event RSVP management</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium">Social Scenarios</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Homecoming week activity</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Greek life recruitment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Bulls game coordination</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Club meeting scheduling</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-medium">Technical Scenarios</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Campus WiFi limitations</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Mobile data constraints</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Building network transitions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Offline mode functionality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main Testing System Component
const ComprehensiveTestingSystem = () => {
  const testing = useTesting();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <TestTube className="mr-4 h-10 w-10" />
            Comprehensive Testing System
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl">
            Advanced testing scenarios, quality assurance patterns, and automated validation
            for HIVE's campus-focused features. Ensuring reliability for UB students' daily digital campus life.
          </p>
        </div>

        {/* Test Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              onClick={testing.runAllTests}
              disabled={testing.isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              {testing.isRunning ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run All Tests
            </Button>
            
            <Button
              onClick={testing.resetTests}
              disabled={testing.isRunning}
              variant="outline"
              className="border-gray-600 text-gray-300"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Tests
            </Button>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-400">Running:</span>
            <Badge className={testing.isRunning ? 'bg-yellow-600' : 'bg-gray-600'}>
              {testing.isRunning ? 'Active' : 'Idle'}
            </Badge>
          </div>
        </div>

        {/* Metrics Dashboard */}
        <TestMetricsDashboard metrics={testing.testMetrics} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Test Suites */}
          <div className="lg:col-span-2 space-y-6">
            {testing.testSuites.map(suite => (
              <TestSuiteCard
                key={suite.id}
                suite={suite}
                currentTest={testing.currentTest}
                onRunSuite={testing.runSuite}
                onRunTest={testing.runTest}
                isRunning={testing.isRunning}
              />
            ))}
          </div>

          {/* Metrics and Campus Scenarios */}
          <div className="lg:col-span-1 space-y-6">
            <PerformanceMetrics metrics={testing.testMetrics} />
            <AccessibilityMetrics metrics={testing.testMetrics} />
            <CampusTestScenarios />
          </div>
        </div>
      </div>
    </div>
  )
};

// Story Exports
export const ComprehensiveTestingSystemDemo: Story = {
  render: () => <ComprehensiveTestingSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete testing system with real-world campus scenarios and quality assurance metrics'
      }
    }
  }
};

export const TestMetrics: Story = {
  render: () => {
    const testing = useTesting();
    return (
      <div className="max-w-4xl mx-auto p-6 bg-black space-y-6">
        <TestMetricsDashboard metrics={testing.testMetrics} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PerformanceMetrics metrics={testing.testMetrics} />
          <AccessibilityMetrics metrics={testing.testMetrics} />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Testing metrics dashboard showing performance and accessibility scores'
      }
    }
  }
};

export const CampusTestScenariosDemo: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6 bg-black">
      <CampusTestScenarios />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'University at Buffalo specific testing scenarios for real campus usage'
      }
    }
  }
};

export const TestSuiteDemo: Story = {
  render: () => {
    const testing = useTesting();
    const campusFeedSuite = testing.testSuites.find(s => s.id === 'campus-feed');
    
    if (!campusFeedSuite) return null;
    
    return (
      <div className="max-w-3xl mx-auto p-6 bg-black">
        <TestSuiteCard
          suite={campusFeedSuite}
          currentTest={testing.currentTest}
          onRunSuite={testing.runSuite}
          onRunTest={testing.runTest}
          isRunning={testing.isRunning}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Individual test suite with interactive test execution'
      }
    }
  }
};