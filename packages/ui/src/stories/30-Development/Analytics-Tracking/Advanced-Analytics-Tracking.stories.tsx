import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { HiveProgress as Progress } from '../../components/hive-progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Switch } from '../../../components/ui/switch';
import { 
  Activity, 
  BarChart3, 
  Clock, 
  Eye, 
  Heart,
  MessageSquare,
  Share2,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  Smartphone,
  Monitor,
  Shield,
  AlertCircle,
  CheckCircle,
  Target,
  Zap,
  Database,
  PieChart,
  LineChart,
  Globe,
  UserCheck,
  MousePointer,
  Timer
} from 'lucide-react';

const meta: Meta = {
  title: '28-Advanced-Analytics-Tracking/Analytics-Tracking-System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Advanced Analytics & Tracking Demonstrations

Comprehensive analytics and tracking system for HIVE platform with privacy-compliant data collection,
real-time insights, behavioral analysis, and actionable metrics for campus engagement optimization.

## Features Demonstrated

### User Behavior Analytics
- **Page Views & Session Tracking**: Real-time page navigation and session duration monitoring
- **Interaction Heatmaps**: Click tracking, hover patterns, and engagement zones
- **User Journey Mapping**: Complete flow analysis from entry to conversion
- **Feature Adoption**: Tool usage, space participation, and engagement metrics

### Engagement Metrics
- **Social Activity Tracking**: Likes, comments, shares, and connection patterns
- **Content Performance**: Post reach, engagement rates, and viral coefficient
- **Community Health**: Space activity, member retention, and growth metrics
- **Tool Usage Analytics**: Builder engagement, deployment success, sharing patterns

### Campus-Specific Analytics
- **Location-Based Insights**: Building usage, popular campus areas, event attendance
- **Academic Calendar Correlation**: Usage patterns during finals, breaks, registration
- **UB-Specific Metrics**: Dorm activity, dining trends, shuttle usage correlation
- **Student Lifecycle Analytics**: Freshman adaptation, senior engagement, retention factors

### Performance Monitoring
- **Real-Time Performance Metrics**: Page load times, API response rates, error tracking
- **Core Web Vitals**: LCP, FID, CLS monitoring with campus network considerations
- **Mobile Performance**: Touch response times, gesture recognition accuracy
- **Infrastructure Health**: Database query performance, storage usage, CDN efficiency

### Privacy-Compliant Features
- **FERPA Compliance**: Educational privacy protection with anonymized analytics
- **Granular Consent Management**: Opt-in/out for different tracking categories
- **Data Retention Controls**: Automatic data purging and anonymization
- **Transparent Reporting**: Clear visibility into what data is collected and why
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Analytics Context and Types
interface AnalyticsState {
  pageViews: Array<{
    page: string;
    timestamp: number;
    sessionId: string;
    userId?: string;
    duration: number;
    referrer?: string;
  }>;
  interactions: Array<{
    type: 'click' | 'hover' | 'scroll' | 'form_submit' | 'share' | 'like';
    element: string;
    timestamp: number;
    userId?: string;
    metadata?: Record<string, any>;
  }>;
  userJourneys: Array<{
    userId: string;
    sessionId: string;
    path: string[];
    startTime: number;
    endTime?: number;
    conversions: string[];
  }>;
  performanceMetrics: {
    avgPageLoad: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
    };
    apiResponseTimes: Record<string, number>;
    errorRates: Record<string, number>;
  };
  privacySettings: {
    trackingEnabled: boolean;
    personalDataEnabled: boolean;
    performanceMonitoring: boolean;
    marketingInsights: boolean;
  };
}

interface AnalyticsAction {
  type: 'TRACK_PAGE_VIEW' | 'TRACK_INTERACTION' | 'UPDATE_PERFORMANCE' | 'UPDATE_PRIVACY' | 'GENERATE_REPORT';
  payload: any;
}

const initialAnalyticsState: AnalyticsState = {
  pageViews: [],
  interactions: [],
  userJourneys: [],
  performanceMetrics: {
    avgPageLoad: 1.2,
    coreWebVitals: {
      lcp: 2.1,
      fid: 0.08,
      cls: 0.05
    },
    apiResponseTimes: {
      '/api/spaces': 145,
      '/api/profile': 89,
      '/api/feed': 201,
      '/api/tools': 167
    },
    errorRates: {
      '4xx': 0.02,
      '5xx': 0.001,
      'client': 0.005
    }
  },
  privacySettings: {
    trackingEnabled: true,
    personalDataEnabled: false,
    performanceMonitoring: true,
    marketingInsights: false
  }
};

function analyticsReducer(state: AnalyticsState, action: AnalyticsAction): AnalyticsState {
  switch (action.type) {
    case 'TRACK_PAGE_VIEW':
      return {
        ...state,
        pageViews: [...state.pageViews.slice(-99), action.payload].slice(-100)
      };
    case 'TRACK_INTERACTION':
      return {
        ...state,
        interactions: [...state.interactions.slice(-99), action.payload].slice(-100)
      };
    case 'UPDATE_PERFORMANCE':
      return {
        ...state,
        performanceMetrics: { ...state.performanceMetrics, ...action.payload }
      };
    case 'UPDATE_PRIVACY':
      return {
        ...state,
        privacySettings: { ...state.privacySettings, ...action.payload }
      };
    default:
      return state;
  }
}

const AnalyticsContext = createContext<{
  state: AnalyticsState;
  dispatch: React.Dispatch<AnalyticsAction>;
  trackPageView: (page: string) => void;
  trackInteraction: (type: string, element: string, metadata?: any) => void;
} | null>(null);

// UB Campus Analytics Data
const campusAnalyticsData = {
  popularLocations: [
    { name: 'Student Union', visits: 2847, peakTime: '12:00 PM' },
    { name: 'Lockwood Library', visits: 1923, peakTime: '7:00 PM' },
    { name: 'Capen Hall', visits: 1456, peakTime: '10:00 AM' },
    { name: 'Davis Hall', visits: 1234, peakTime: '2:00 PM' },
    { name: 'Alumni Arena', visits: 892, peakTime: '6:00 PM' }
  ],
  academicCorrelation: [
    { period: 'Finals Week', engagement: 245, stress: 8.2 },
    { period: 'Registration', engagement: 189, stress: 7.1 },
    { period: 'Spring Break', engagement: 67, stress: 3.2 },
    { period: 'Homecoming', engagement: 312, stress: 4.8 },
    { period: 'Regular Semester', engagement: 156, stress: 5.5 }
  ],
  dormActivityPatterns: [
    { dorm: 'Ellicott Complex', activeUsers: 1567, peakHours: '10:00 PM - 12:00 AM' },
    { dorm: 'Governors Complex', activeUsers: 1234, peakHours: '9:00 PM - 11:00 PM' },
    { dorm: 'South Campus Apts', activeUsers: 890, peakHours: '11:00 PM - 1:00 AM' },
    { dorm: 'Hadley Village', activeUsers: 678, peakHours: '8:00 PM - 10:00 PM' }
  ]
};

// Real-time Analytics Components
function RealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    activeUsers: 2847,
    activeSessions: 1923,
    pageViews: 15234,
    interactions: 8756
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
        activeSessions: prev.activeSessions + Math.floor(Math.random() * 15) - 7,
        pageViews: prev.pageViews + Math.floor(Math.random() * 50),
        interactions: prev.interactions + Math.floor(Math.random() * 30)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Active Users</p>
              <p className="text-2xl font-bold">{metrics.activeUsers.toLocaleString()}</p>
              <p className="text-blue-200 text-xs">+12% from yesterday</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Sessions</p>
              <p className="text-2xl font-bold">{metrics.activeSessions.toLocaleString()}</p>
              <p className="text-green-200 text-xs">+8% from yesterday</p>
            </div>
            <Activity className="h-8 w-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Page Views</p>
              <p className="text-2xl font-bold">{metrics.pageViews.toLocaleString()}</p>
              <p className="text-purple-200 text-xs">+15% from yesterday</p>
            </div>
            <Eye className="h-8 w-8 text-purple-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Interactions</p>
              <p className="text-2xl font-bold">{metrics.interactions.toLocaleString()}</p>
              <p className="text-orange-200 text-xs">+23% from yesterday</p>
            </div>
            <MousePointer className="h-8 w-8 text-orange-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UserBehaviorHeatmap() {
  const [selectedView, setSelectedView] = useState<'clicks' | 'hovers' | 'scrolls'>('clicks');
  
  const heatmapData = {
    clicks: [
      { element: 'Feed Posts', intensity: 89, coordinates: [45, 30] },
      { element: 'Space Cards', intensity: 76, coordinates: [60, 45] },
      { element: 'Tool Builder', intensity: 92, coordinates: [35, 60] },
      { element: 'Profile Menu', intensity: 67, coordinates: [85, 15] },
      { element: 'Navigation', intensity: 81, coordinates: [15, 25] }
    ],
    hovers: [
      { element: 'Space Previews', intensity: 73, coordinates: [55, 40] },
      { element: 'User Avatars', intensity: 68, coordinates: [40, 35] },
      { element: 'Tool Cards', intensity: 84, coordinates: [70, 55] },
      { element: 'Campus Events', intensity: 59, coordinates: [25, 70] },
      { element: 'Notifications', intensity: 91, coordinates: [80, 20] }
    ],
    scrolls: [
      { element: 'Feed Timeline', intensity: 95, coordinates: [50, 50] },
      { element: 'Space Directory', intensity: 78, coordinates: [45, 65] },
      { element: 'Tool Gallery', intensity: 72, coordinates: [65, 45] },
      { element: 'Profile Board', intensity: 86, coordinates: [55, 75] },
      { element: 'Campus Map', intensity: 64, coordinates: [30, 40] }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          User Interaction Heatmap
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={selectedView === 'clicks' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('clicks')}
          >
            Clicks
          </Button>
          <Button
            variant={selectedView === 'hovers' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('hovers')}
          >
            Hovers
          </Button>
          <Button
            variant={selectedView === 'scrolls' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('scrolls')}
          >
            Scrolls
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative h-80 bg-gray-50 rounded-lg overflow-hidden">
          {/* Simulated mobile/desktop interface */}
          <div className="absolute inset-4 bg-white rounded-lg shadow-sm border">
            {heatmapData[selectedView].map((point, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${point.coordinates[0]}%`,
                  top: `${point.coordinates[1]}%`
                }}
              >
                <div 
                  className={`w-8 h-8 rounded-full blur-sm ${
                    point.intensity > 85 ? 'bg-red-500' :
                    point.intensity > 70 ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}
                  style={{
                    opacity: point.intensity / 100
                  }}
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium whitespace-nowrap">
                  {point.element}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Low (40-69%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span>Medium (70-84%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span>High (85-100%)</span>
            </div>
          </div>
          <span>Interaction Intensity</span>
        </div>
      </CardContent>
    </Card>
  );
}

function CampusEngagementAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Popular Campus Locations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campusAnalyticsData.popularLocations.map((location, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{location.name}</p>
                  <p className="text-sm text-gray-500">Peak: {location.peakTime}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{location.visits.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">visits</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Academic Period Correlation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campusAnalyticsData.academicCorrelation.map((period, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{period.period}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {period.engagement}% engagement
                    </Badge>
                    <Badge variant={period.stress > 7 ? 'destructive' : period.stress > 5 ? 'secondary' : 'default'}>
                      {period.stress}/10 stress
                    </Badge>
                  </div>
                </div>
                <Progress value={period.engagement / 3} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PerformanceMonitoring() {
  const [selectedMetric, setSelectedMetric] = useState<'vitals' | 'api' | 'errors'>('vitals');

  const performanceData = {
    vitals: [
      { metric: 'Largest Contentful Paint (LCP)', value: '2.1s', target: '≤2.5s', status: 'good' },
      { metric: 'First Input Delay (FID)', value: '80ms', target: '≤100ms', status: 'good' },
      { metric: 'Cumulative Layout Shift (CLS)', value: '0.05', target: '≤0.1', status: 'good' },
      { metric: 'Time to Interactive (TTI)', value: '3.2s', target: '≤3.8s', status: 'good' }
    ],
    api: [
      { endpoint: '/api/spaces', avgTime: 145, p95: 289, errors: 0.02 },
      { endpoint: '/api/profile', avgTime: 89, p95: 156, errors: 0.01 },
      { endpoint: '/api/feed', avgTime: 201, p95: 378, errors: 0.03 },
      { endpoint: '/api/tools', avgTime: 167, p95: 295, errors: 0.015 }
    ],
    errors: [
      { type: 'JavaScript Errors', count: 23, trend: 'down', impact: 'low' },
      { type: 'API 4xx Errors', count: 156, trend: 'stable', impact: 'medium' },
      { type: 'API 5xx Errors', count: 7, trend: 'down', impact: 'high' },
      { type: 'Network Timeouts', count: 34, trend: 'up', impact: 'medium' }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Performance Monitoring
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={selectedMetric === 'vitals' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMetric('vitals')}
          >
            Core Web Vitals
          </Button>
          <Button
            variant={selectedMetric === 'api' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMetric('api')}
          >
            API Performance
          </Button>
          <Button
            variant={selectedMetric === 'errors' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedMetric('errors')}
          >
            Error Tracking
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedMetric === 'vitals' && (
          <div className="space-y-4">
            {performanceData.vitals.map((vital, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium">{vital.metric}</p>
                  <p className="text-sm text-gray-500">Target: {vital.target}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={vital.status === 'good' ? 'default' : 'destructive'}>
                    {vital.value}
                  </Badge>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMetric === 'api' && (
          <div className="space-y-4">
            {performanceData.api.map((endpoint, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-sm">{endpoint.endpoint}</span>
                  <Badge variant={endpoint.errors > 0.02 ? 'destructive' : 'default'}>
                    {(endpoint.errors * 100).toFixed(2)}% errors
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Avg Response:</span>
                    <span className="ml-2 font-medium">{endpoint.avgTime}ms</span>
                  </div>
                  <div>
                    <span className="text-gray-500">P95:</span>
                    <span className="ml-2 font-medium">{endpoint.p95}ms</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMetric === 'errors' && (
          <div className="space-y-4">
            {performanceData.errors.map((error, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div>
                  <p className="font-medium">{error.type}</p>
                  <p className="text-sm text-gray-500">Impact: {error.impact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{error.count}</span>
                  <div className={`flex items-center gap-1 text-sm ${
                    error.trend === 'up' ? 'text-red-500' :
                    error.trend === 'down' ? 'text-green-500' :
                    'text-gray-500'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${
                      error.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {error.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PrivacyComplianceCenter() {
  const [privacySettings, setPrivacySettings] = useState({
    essential: true, // Always on
    functional: true,
    analytics: false,
    marketing: false
  });

  const [dataRetention, setDataRetention] = useState({
    userActivity: '30 days',
    performanceMetrics: '90 days',
    errorLogs: '7 days',
    anonymizedInsights: '2 years'
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Essential Tracking</p>
              <p className="text-sm text-gray-500">Required for basic functionality</p>
            </div>
            <Switch checked={privacySettings.essential} disabled />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Functional Analytics</p>
              <p className="text-sm text-gray-500">Improve user experience and features</p>
            </div>
            <Switch 
              checked={privacySettings.functional}
              onCheckedChange={(checked) => 
                setPrivacySettings(prev => ({...prev, functional: checked}))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Performance Monitoring</p>
              <p className="text-sm text-gray-500">Track performance and optimize platform</p>
            </div>
            <Switch 
              checked={privacySettings.analytics}
              onCheckedChange={(checked) => 
                setPrivacySettings(prev => ({...prev, analytics: checked}))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Campus Insights</p>
              <p className="text-sm text-gray-500">Anonymized campus engagement analysis</p>
            </div>
            <Switch 
              checked={privacySettings.marketing}
              onCheckedChange={(checked) => 
                setPrivacySettings(prev => ({...prev, marketing: checked}))
              }
            />
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              All data collection complies with FERPA educational privacy requirements. 
              Personal student information is never shared or used for commercial purposes.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Retention Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(dataRetention).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <div>
                <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="text-sm text-gray-500">
                  {key === 'userActivity' && 'Page views, interactions, session data'}
                  {key === 'performanceMetrics' && 'Load times, API response rates'}
                  {key === 'errorLogs' && 'Technical errors and debugging info'}
                  {key === 'anonymizedInsights' && 'Aggregated campus trends'}
                </p>
              </div>
              <Badge variant="outline">{value}</Badge>
            </div>
          ))}

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Data is automatically purged according to retention policies. 
              Students can request data deletion at any time through account settings.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(analyticsReducer, initialAnalyticsState);

  const trackPageView = (page: string) => {
    if (state.privacySettings.trackingEnabled) {
      dispatch({
        type: 'TRACK_PAGE_VIEW',
        payload: {
          page,
          timestamp: Date.now(),
          sessionId: 'session_' + Math.random().toString(36).substr(2, 9),
          duration: Math.floor(Math.random() * 300) + 30,
          referrer: document.referrer || 'direct'
        }
      });
    }
  };

  const trackInteraction = (type: string, element: string, metadata?: any) => {
    if (state.privacySettings.trackingEnabled) {
      dispatch({
        type: 'TRACK_INTERACTION',
        payload: {
          type,
          element,
          timestamp: Date.now(),
          metadata
        }
      });
    }
  };

  return (
    <AnalyticsContext.Provider value={{ state, dispatch, trackPageView, trackInteraction }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Main Story Component
function AdvancedAnalyticsSystem() {
  return (
    <AnalyticsProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HIVE Analytics Dashboard</h1>
              <p className="text-gray-500 mt-1">
                Privacy-compliant insights for University at Buffalo campus engagement
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                FERPA Compliant
              </Badge>
              <Badge variant="outline">Live Data</Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* Real-time Metrics */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-time Engagement
            </h2>
            <RealTimeMetrics />
          </div>

          {/* Analytics Tabs */}
          <Tabs defaultValue="behavior" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="behavior">User Behavior</TabsTrigger>
              <TabsTrigger value="campus">Campus Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="behavior" className="space-y-6">
              <UserBehaviorHeatmap />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Engagement Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Heart className="h-8 w-8 text-red-500" />
                      </div>
                      <p className="text-2xl font-bold">12,847</p>
                      <p className="text-sm text-gray-500">Likes This Week</p>
                      <Badge className="mt-1 bg-green-100 text-green-800">+18%</Badge>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <MessageSquare className="h-8 w-8 text-blue-500" />
                      </div>
                      <p className="text-2xl font-bold">3,452</p>
                      <p className="text-sm text-gray-500">Comments This Week</p>
                      <Badge className="mt-1 bg-green-100 text-green-800">+23%</Badge>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Share2 className="h-8 w-8 text-purple-500" />
                      </div>
                      <p className="text-2xl font-bold">892</p>
                      <p className="text-sm text-gray-500">Shares This Week</p>
                      <Badge className="mt-1 bg-green-100 text-green-800">+31%</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="campus" className="space-y-6">
              <CampusEngagementAnalytics />
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Dormitory Activity Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campusAnalyticsData.dormActivityPatterns.map((dorm, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                        <div>
                          <p className="font-semibold">{dorm.dorm}</p>
                          <p className="text-sm text-gray-500">Peak: {dorm.peakHours}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{dorm.activeUsers}</p>
                          <p className="text-sm text-gray-500">active users</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <PerformanceMonitoring />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      Device Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Mobile (iOS)</span>
                        <div className="flex items-center gap-2">
                          <Progress value={68} className="w-20" />
                          <span className="text-sm font-medium">68%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Mobile (Android)</span>
                        <div className="flex items-center gap-2">
                          <Progress value={23} className="w-20" />
                          <span className="text-sm font-medium">23%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Desktop</span>
                        <div className="flex items-center gap-2">
                          <Progress value={9} className="w-20" />
                          <span className="text-sm font-medium">9%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Network Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Campus WiFi</span>
                        <Badge variant="default">Avg: 1.2s load</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Mobile Data</span>
                        <Badge variant="secondary">Avg: 2.8s load</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Off-Campus</span>
                        <Badge variant="outline">Avg: 1.8s load</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <PrivacyComplianceCenter />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AnalyticsProvider>
  );
}

// Story Exports
export const AdvancedAnalyticsTracking: Story = {
  render: () => <AdvancedAnalyticsSystem />,
  parameters: {
    docs: {
      description: {
        story: `
Complete analytics and tracking system with real-time metrics, user behavior analysis, 
campus-specific insights, and privacy-compliant data collection for HIVE platform.
        `,
      },
    },
  },
};

export const RealTimeMetricsDemo: Story = {
  render: () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Real-time Campus Engagement</h2>
      <RealTimeMetrics />
    </div>
  ),
};

export const BehaviorHeatmapDemo: Story = {
  render: () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">User Interaction Heatmap</h2>
      <UserBehaviorHeatmap />
    </div>
  ),
};

export const CampusAnalyticsDemo: Story = {
  render: () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">UB Campus Analytics</h2>
      <CampusEngagementAnalytics />
    </div>
  ),
};

export const PerformanceMonitoringDemo: Story = {
  render: () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Performance Monitoring</h2>
      <PerformanceMonitoring />
    </div>
  ),
};

export const PrivacyControlsDemo: Story = {
  render: () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Privacy & Compliance</h2>
      <PrivacyComplianceCenter />
    </div>
  ),
};