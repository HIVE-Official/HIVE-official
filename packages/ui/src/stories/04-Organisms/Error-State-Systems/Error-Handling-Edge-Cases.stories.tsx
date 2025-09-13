import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../atomic/ui/card';
import { Button } from '../../../atomic/atoms/button-enhanced';
import { Input } from '../../../atomic/atoms/input-enhanced';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../atomic/atoms/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../atomic/atoms/avatar';
import { HiveProgress as Progress } from '../../../components/hive-progress';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../atomic/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '../../../atomic/molecules/alert-toast-system';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { 
  AlertTriangle,
  XCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  Server,
  Database,
  Cloud,
  CloudOff,
  Zap,
  ZapOff,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield,
  ShieldAlert,
  Clock,
  Timer,
  Loader2,
  CheckCircle,
  Info,
  HelpCircle,
  Settings,
  Bug,
  Activity,
  TrendingDown,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  AlertCircle,
  Bell,
  BellOff,
  Mail,
  MailX,
  Phone,
  PhoneOff,
  MessageCircle,
  MessageSquareX,
  Users,
  UserX,
  Globe,
  GlobeX,
  Home,
  Search,
  SearchX,
  Filter,
  FilterX,
  Upload,
  UploadX,
  Download,
  DownloadX,
  Save,
  X,
  RotateCcw,
  Pause,
  Play,
  Square,
  SkipForward,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  Terminal,
  Code,
  FileX,
  FolderX,
  ImageX,
  VideoX,
  Plus
} from 'lucide-react';

/**
 * # HIVE Error Handling & Edge Cases System
 * 
 * Comprehensive error handling, edge case scenarios, and recovery patterns
 * for the HIVE platform. Demonstrates graceful degradation, error boundaries,
 * retry mechanisms, and user-friendly error states that maintain campus
 * community engagement even when things go wrong.
 * 
 * ## Error Handling Features:
 * - **Network Errors**: Offline states, connection failures, timeout handling
 * - **API Errors**: 4xx/5xx responses, rate limiting, service unavailable
 * - **Validation Errors**: Form validation, input sanitization, UB email validation
 * - **Permission Errors**: Access denied, authentication failures, role restrictions
 * - **Data Corruption**: Malformed responses, missing fields, type mismatches
 * - **Campus-Specific Errors**: Building access issues, event conflicts, space limits
 * - **Recovery Patterns**: Auto-retry, manual refresh, fallback content
 * - **Error Boundaries**: Component isolation, graceful degradation, error reporting
 */

const meta: Meta<typeof React.Fragment> = {
  title: '22-Advanced Systems/Error Handling & Edge Cases',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Comprehensive error handling and edge case scenarios for robust HIVE platform'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Error Types and States
interface ErrorState {
  type: 'network' | 'api' | 'validation' | 'permission' | 'data' | 'campus' | 'unknown';
  code?: string | number;
  message: string;
  details?: string;
  timestamp: number;
  retryable: boolean;
  actionSuggestion?: string;
  technicalDetails?: string;
}

interface ErrorRecovery {
  attemptCount: number;
  maxAttempts: number;
  backoffMs: number;
  lastAttemptAt?: number;
  isRetrying: boolean;
  autoRetry: boolean;
}

// Error Management Hook
const useErrorHandling = () => {
  const [errors, setErrors] = useState<Record<string, ErrorState>>({});
  const [recoveryStates, setRecoveryStates] = useState<Record<string, ErrorRecovery>>({});
  const [globalErrorMode, setGlobalErrorMode] = useState<'normal' | 'degraded' | 'offline'>('normal');

  const addError = useCallback((id: string, error: Partial<ErrorState>) => {
    const errorState: ErrorState = {
      type: 'unknown',
      message: 'An unexpected error occurred',
      timestamp: Date.now(),
      retryable: true,
      ...error
    };

    setErrors(prev => ({ ...prev, [id]: errorState }));

    // Initialize recovery state if error is retryable
    if (errorState.retryable) {
      setRecoveryStates(prev => ({
        ...prev,
        [id]: {
          attemptCount: 0,
          maxAttempts: 3,
          backoffMs: 1000,
          isRetrying: false,
          autoRetry: true
        }
      }));
    }
  }, []);

  const clearError = useCallback((id: string) => {
    setErrors(prev => {
      const { [id]: removed, ...rest } = prev;
      return rest;
    });
    setRecoveryStates(prev => {
      const { [id]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const retryOperation = useCallback(async (id: string, operation: () => Promise<void>) => {
    const recovery = recoveryStates[id];
    if (!recovery) return;

    setRecoveryStates(prev => ({
      ...prev,
      [id]: {
        ...recovery,
        isRetrying: true,
        attemptCount: recovery.attemptCount + 1,
        lastAttemptAt: Date.now()
      }
    }));

    try {
      await new Promise(resolve => setTimeout(resolve, recovery.backoffMs));
      await operation();
      
      // Success - clear error
      clearError(id);
    } catch (error) {
      const updatedRecovery = recoveryStates[id];
      
      if (updatedRecovery.attemptCount >= updatedRecovery.maxAttempts) {
        // Max attempts reached
        setRecoveryStates(prev => ({
          ...prev,
          [id]: { ...updatedRecovery, isRetrying: false, autoRetry: false }
        }));
      } else {
        // Increase backoff for next attempt
        setRecoveryStates(prev => ({
          ...prev,
          [id]: {
            ...updatedRecovery,
            isRetrying: false,
            backoffMs: Math.min(updatedRecovery.backoffMs * 2, 10000)
          }
        }));
      }
    }
  }, [recoveryStates, clearError]);

  // Simulate various error scenarios
  const simulateNetworkError = () => {
    addError('network-1', {
      type: 'network',
      code: 'NETWORK_TIMEOUT',
      message: 'Unable to connect to HIVE servers',
      details: 'Please check your internet connection and try again.',
      actionSuggestion: 'Check campus WiFi connection',
      technicalDetails: 'Timeout after 30s - server may be temporarily unavailable'
    });
  };

  const simulateAPIError = () => {
    const errorCodes = [400, 401, 403, 404, 429, 500, 502, 503];
    const randomCode = errorCodes[Math.floor(Math.random() * errorCodes.length)];
    
    const errorMessages = {
      400: 'Invalid request format',
      401: 'Please sign in with your UB credentials',
      403: 'You don\'t have permission to access this space',
      404: 'The requested space or content was not found',
      429: 'Too many requests - please wait a moment',
      500: 'HIVE servers are experiencing issues',
      502: 'Gateway error - servers may be updating',
      503: 'HIVE is temporarily unavailable for maintenance'
    };

    addError('api-1', {
      type: 'api',
      code: randomCode,
      message: errorMessages[randomCode as keyof typeof errorMessages],
      details: randomCode >= 500 ? 'Our team has been notified and is working on a fix.' : undefined,
      retryable: randomCode >= 500 || randomCode === 429,
      actionSuggestion: randomCode === 401 ? 'Sign in again' : randomCode === 403 ? 'Contact space administrator' : 'Try again in a few moments'
    });
  };

  const simulateValidationError = () => {
    addError('validation-1', {
      type: 'validation',
      code: 'INVALID_EMAIL',
      message: 'Please use your UB email address',
      details: 'Only @buffalo.edu email addresses are allowed on HIVE.',
      retryable: false,
      actionSuggestion: 'Enter your @buffalo.edu email address'
    });
  };

  const simulateCampusError = () => {
    const campusErrors = [
      {
        code: 'BUILDING_ACCESS',
        message: 'Building access restricted',
        details: 'This space is only accessible to students with card access to the building.',
        suggestion: 'Contact building services or use virtual meeting option'
      },
      {
        code: 'EVENT_CONFLICT',
        message: 'Room booking conflict detected',
        details: 'Another event is already scheduled for this time and location.',
        suggestion: 'Choose a different time or contact event coordinator'
      },
      {
        code: 'CAPACITY_EXCEEDED',
        message: 'Space capacity reached',
        details: 'This space has reached its maximum member capacity.',
        suggestion: 'Join the waitlist or explore similar spaces'
      }
    ];

    const randomError = campusErrors[Math.floor(Math.random() * campusErrors.length)];
    
    addError('campus-1', {
      type: 'campus',
      code: randomError.code,
      message: randomError.message,
      details: randomError.details,
      retryable: false,
      actionSuggestion: randomError.suggestion
    });
  };

  const simulateDataError = () => {
    addError('data-1', {
      type: 'data',
      code: 'CORRUPTED_RESPONSE',
      message: 'Received invalid data from server',
      details: 'The server response was malformed or incomplete.',
      retryable: true,
      actionSuggestion: 'Refresh the page or try again',
      technicalDetails: 'JSON parsing failed - expected object but received array'
    });
  };

  return {
    errors,
    recoveryStates,
    globalErrorMode,
    addError,
    clearError,
    retryOperation,
    setGlobalErrorMode,
    simulateNetworkError,
    simulateAPIError,
    simulateValidationError,
    simulateCampusError,
    simulateDataError
  };
};

// Error Display Component
const ErrorDisplay = ({ 
  error, 
  recovery, 
  onRetry, 
  onDismiss,
  showTechnical = false 
}: {
  error: ErrorState;
  recovery?: ErrorRecovery;
  onRetry?: () => void;
  onDismiss: () => void;
  showTechnical?: boolean;
}) => {
  const getErrorIcon = () => {
    switch (error.type) {
      case 'network': return <WifiOff className="h-5 w-5" />;
      case 'api': return <Server className="h-5 w-5" />;
      case 'validation': return <AlertCircle className="h-5 w-5" />;
      case 'permission': return <Shield className="h-5 w-5" />;
      case 'data': return <Database className="h-5 w-5" />;
      case 'campus': return <Home className="h-5 w-5" />;
      default: return <XCircle className="h-5 w-5" />;
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case 'network': return 'border-orange-600 bg-orange-900/20';
      case 'api': return 'border-red-600 bg-red-900/20';
      case 'validation': return 'border-yellow-600 bg-yellow-900/20';
      case 'permission': return 'border-purple-600 bg-purple-900/20';
      case 'data': return 'border-blue-600 bg-blue-900/20';
      case 'campus': return 'border-green-600 bg-green-900/20';
      default: return 'border-gray-600 bg-gray-900/20';
    }
  };

  const getIconColor = () => {
    switch (error.type) {
      case 'network': return 'text-orange-400';
      case 'api': return 'text-red-400';
      case 'validation': return 'text-yellow-400';
      case 'permission': return 'text-purple-400';
      case 'data': return 'text-blue-400';
      case 'campus': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Alert className={`${getErrorColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={getIconColor()}>
            {getErrorIcon()}
          </div>
          
          <div className="flex-1 space-y-2">
            <AlertTitle className="text-white flex items-center space-x-2">
              <span>{(error instanceof Error ? error.message : "Unknown error")}</span>
              {error.code && (
                <Badge variant="secondary" className="text-xs">
                  {error.code}
                </Badge>
              )}
            </AlertTitle>
            
            {error.details && (
              <AlertDescription className="text-gray-300">
                {error.details}
              </AlertDescription>
            )}
            
            {error.actionSuggestion && (
              <div className="text-sm text-blue-300 bg-blue-900/20 rounded p-2">
                <Info className="h-4 w-4 inline mr-2" />
                {error.actionSuggestion}
              </div>
            )}
            
            {showTechnical && error.technicalDetails && (
              <details className="text-xs text-gray-500">
                <summary className="cursor-pointer hover:text-gray-400">Technical Details</summary>
                <code className="block mt-1 p-2 bg-gray-800 rounded">
                  {error.technicalDetails}
                </code>
              </details>
            )}

            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{new Date(error.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {error.retryable && onRetry && (
            <Button
              size="sm"
              onClick={onRetry}
              disabled={recovery?.isRetrying}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {recovery?.isRetrying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              <span className="ml-1">
                {recovery?.isRetrying ? 'Retrying...' : 'Retry'}
              </span>
            </Button>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={onDismiss}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {recovery && recovery.attemptCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Retry attempts: {recovery.attemptCount}/{recovery.maxAttempts}</span>
            {recovery.lastAttemptAt && (
              <span>Last attempt: {new Date(recovery.lastAttemptAt).toLocaleTimeString()}</span>
            )}
          </div>
          
          {recovery.attemptCount < recovery.maxAttempts && (
            <Progress 
              value={(recovery.attemptCount / recovery.maxAttempts) * 100}
              className="mt-2 h-1"
            />
          )}
        </div>
      )}
    </Alert>
  );
};

// Error Boundary Component
const ErrorBoundaryDemo = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string>('');

  const triggerError = () => {
    setHasError(true);
    setErrorInfo('Simulated component error - this would normally be caught by error boundary');
  };

  const resetError = () => {
    setHasError(false);
    setErrorInfo('');
  };

  if (hasError) {
    return (
      <Card className="bg-red-900/20 border-red-600">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bug className="mr-2 h-5 w-5 text-red-400" />
            Component Error Boundary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-red-200">
            Something went wrong with this component. The error has been logged 
            and our team has been notified.
          </p>
          
          <Alert className="border-red-600 bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <AlertTitle className="text-red-200">Error Details</AlertTitle>
            <AlertDescription className="text-red-300">
              {errorInfo}
            </AlertDescription>
          </Alert>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={resetError}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            
            <Button
              variant="secondary"
              className="border-gray-600 text-gray-300"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      {children}
      <Button
        onClick={triggerError}
        variant="destructive"
        size="sm"
        className="mt-4"
      >
        <Bug className="h-4 w-4 mr-2" />
        Simulate Component Error
      </Button>
    </div>
  );
};

// Network Status Component
const NetworkStatusDemo = ({ globalErrorMode, onModeChange }: {
  globalErrorMode: 'normal' | 'degraded' | 'offline';
  onModeChange: (mode: 'normal' | 'degraded' | 'offline') => void;
}) => {
  const getStatusInfo = () => {
    switch (globalErrorMode) {
      case 'normal':
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-400" />,
          title: 'All Systems Operational',
          description: 'HIVE is running normally with all features available.',
          color: 'border-green-600 bg-green-900/20'
        };
      case 'degraded':
        return {
          icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
          title: 'Degraded Performance',
          description: 'Some features may be slower than usual. Core functionality remains available.',
          color: 'border-yellow-600 bg-yellow-900/20'
        };
      case 'offline':
        return {
          icon: <WifiOff className="h-5 w-5 text-red-400" />,
          title: 'Offline Mode',
          description: 'You\'re currently offline. Some content may be cached and available.',
          color: 'border-red-600 bg-red-900/20'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className={`${statusInfo.color}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          {statusInfo.icon}
          <span className="ml-2">Network Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-white font-medium">{statusInfo.title}</h4>
          <p className="text-gray-300 text-sm mt-1">{statusInfo.description}</p>
        </div>
        
        <div className="space-y-2">
          <Label className="text-white">Simulate Network State:</Label>
          <Select value={globalErrorMode} onValueChange={onModeChange}>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal Operation</SelectItem>
              <SelectItem value="degraded">Degraded Performance</SelectItem>
              <SelectItem value="offline">Offline Mode</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {globalErrorMode === 'offline' && (
          <div className="space-y-2">
            <h5 className="text-white text-sm font-medium">Available Offline:</h5>
            <div className="text-xs text-gray-400 space-y-1">
              <div>• Previously loaded spaces and posts</div>
              <div>• Cached user profiles and connections</div>
              <div>• Draft messages and posts (will sync when online)</div>
              <div>• Settings and preferences</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Error Simulation Controls
const ErrorSimulationControls = ({ 
  onSimulateError 
}: {
  onSimulateError: (type: string) => void;
}) => (
  <Card className="bg-gray-900 border-gray-800">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <Terminal className="mr-2 h-5 w-5" />
        Error Simulation
      </CardTitle>
      <CardDescription className="text-gray-400">
        Test different error scenarios and recovery patterns
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => onSimulateError('network')}
          variant="secondary"
          size="sm"
          className="justify-start border-orange-600 text-orange-300 hover:bg-orange-900/20"
        >
          <WifiOff className="h-4 w-4 mr-2" />
          Network Error
        </Button>
        
        <Button
          onClick={() => onSimulateError('api')}
          variant="secondary"
          size="sm"
          className="justify-start border-red-600 text-red-300 hover:bg-red-900/20"
        >
          <Server className="h-4 w-4 mr-2" />
          API Error
        </Button>
        
        <Button
          onClick={() => onSimulateError('validation')}
          variant="secondary"
          size="sm"
          className="justify-start border-yellow-600 text-yellow-300 hover:bg-yellow-900/20"
        >
          <AlertCircle className="h-4 w-4 mr-2" />
          Validation Error
        </Button>
        
        <Button
          onClick={() => onSimulateError('campus')}
          variant="secondary"
          size="sm"
          className="justify-start border-green-600 text-green-300 hover:bg-green-900/20"
        >
          <Home className="h-4 w-4 mr-2" />
          Campus Error
        </Button>
        
        <Button
          onClick={() => onSimulateError('data')}
          variant="secondary"
          size="sm"
          className="justify-start border-blue-600 text-blue-300 hover:bg-blue-900/20"
        >
          <Database className="h-4 w-4 mr-2" />
          Data Error
        </Button>
        
        <Button
          onClick={() => onSimulateError('permission')}
          variant="secondary"
          size="sm"
          className="justify-start border-purple-600 text-purple-300 hover:bg-purple-900/20"
        >
          <Shield className="h-4 w-4 mr-2" />
          Permission Error
        </Button>
      </div>
    </CardContent>
  </Card>
);

// Edge Case Demo Components
const EdgeCaseDemo = () => {
  const [demoState, setDemoState] = useState<'loading' | 'empty' | 'partial' | 'corrupted'>('loading');
  
  const mockData = {
    loading: null,
    empty: [],
    partial: [{ id: 1, name: 'Partial Data', incomplete: true }],
    corrupted: [{ id: 1, name: null, invalid_field: 'broken' }]
  };

  const renderContent = () => {
    switch (demoState) {
      case 'loading':
        return (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-yellow-500 animate-spin" />
            <span className="ml-2 text-gray-400">Loading campus spaces...</span>
          </div>
        );
        
      case 'empty':
        return (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No spaces found</h3>
            <p className="text-gray-400 text-sm mb-4">
              You haven't joined any campus spaces yet.
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Plus className="h-4 w-4 mr-2" />
              Browse Spaces
            </Button>
          </div>
        );
        
      case 'partial':
        return (
          <div className="space-y-3">
            <Alert className="border-yellow-600 bg-yellow-900/20">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-200">
                Some information is temporarily unavailable.
              </AlertDescription>
            </Alert>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="text-white font-medium">Partial Data</h4>
              <p className="text-gray-400 text-sm">Some details are loading...</p>
            </div>
          </div>
        );
        
      case 'corrupted':
        return (
          <Alert className="border-red-600 bg-red-900/20">
            <XCircle className="h-4 w-4 text-red-400" />
            <AlertTitle className="text-red-200">Data Error</AlertTitle>
            <AlertDescription className="text-red-300">
              Received invalid data from server. Please refresh or try again.
            </AlertDescription>
          </Alert>
        );
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Code className="mr-2 h-5 w-5" />
          Edge Case Scenarios
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={demoState === 'loading' ? 'default' : 'outline'}
            onClick={() => setDemoState('loading')}
          >
            Loading
          </Button>
          <Button
            size="sm"
            variant={demoState === 'empty' ? 'default' : 'outline'}
            onClick={() => setDemoState('empty')}
          >
            Empty
          </Button>
          <Button
            size="sm"
            variant={demoState === 'partial' ? 'default' : 'outline'}
            onClick={() => setDemoState('partial')}
          >
            Partial
          </Button>
          <Button
            size="sm"
            variant={demoState === 'corrupted' ? 'default' : 'outline'}
            onClick={() => setDemoState('corrupted')}
          >
            Corrupted
          </Button>
        </div>
        
        <div className="min-h-32">
          {renderContent()}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Error Handling System
const ErrorHandlingSystem = () => {
  const errorHandling = useErrorHandling();
  const [showTechnical, setShowTechnical] = useState(false);

  const handleSimulateError = (type: string) => {
    switch (type) {
      case 'network': errorHandling.simulateNetworkError(); break;
      case 'api': errorHandling.simulateAPIError(); break;
      case 'validation': errorHandling.simulateValidationError(); break;
      case 'campus': errorHandling.simulateCampusError(); break;
      case 'data': errorHandling.simulateDataError(); break;
      case 'permission':
        errorHandling.addError('permission-1', {
          type: 'permission',
          code: 'INSUFFICIENT_PERMISSIONS',
          message: 'Access denied to admin features',
          details: 'You need administrator permissions to access this feature.',
          retryable: false,
          actionSuggestion: 'Contact your space administrator for access'
        });
        break;
    }
  };

  const handleRetry = async (errorId: string) => {
    await errorHandling.retryOperation(errorId, async () => {
      // Simulate operation with 70% success rate
      if (Math.random() < 0.7) {
        return Promise.resolve();
      } else {
        throw new Error('Retry failed');
      }
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <ShieldAlert className="mr-4 h-10 w-10" />
            Error Handling & Edge Cases System
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl">
            Comprehensive error handling, graceful degradation, and recovery patterns 
            that keep UB students connected even when things go wrong.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ErrorSimulationControls onSimulateError={handleSimulateError} />
            
            <NetworkStatusDemo 
              globalErrorMode={errorHandling.globalErrorMode}
              onModeChange={errorHandling.setGlobalErrorMode}
            />
            
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-sm">Display Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="technical"
                    checked={showTechnical}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowTechnical(e.target.checked)}
                    className="rounded border-gray-600"
                  />
                  <Label htmlFor="technical" className="text-white text-sm">
                    Show technical details
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Errors */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Active Errors</h2>
              
              {Object.keys(errorHandling.errors).length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-400">No active errors. All systems operational.</p>
                  </CardContent>
                </Card>
              ) : (
                Object.entries(errorHandling.errors).map(([id, error]) => (
                  <ErrorDisplay
                    key={id}
                    error={error}
                    recovery={errorHandling.recoveryStates[id]}
                    onRetry={() => handleRetry(id)}
                    onDismiss={() => errorHandling.clearError(id)}
                    showTechnical={showTechnical}
                  />
                ))
              )}
            </div>
            
            {/* Error Boundary Demo */}
            <ErrorBoundaryDemo>
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Protected Component</CardTitle>
                  <CardDescription className="text-gray-400">
                    This component is wrapped in an error boundary
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white">
                    This content is protected by an error boundary. If this component
                    crashes, it will be caught and displayed gracefully.
                  </p>
                </CardContent>
              </Card>
            </ErrorBoundaryDemo>
            
            {/* Edge Cases Demo */}
            <EdgeCaseDemo />
          </div>
        </div>
      </div>
    </div>
  );
};

// Story Exports
export const ErrorHandlingSystemDemo: Story = {
  render: () => <ErrorHandlingSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete error handling system with recovery patterns and edge case scenarios'
      }
    }
  }
};

export const NetworkErrors: Story = {
  render: () => {
    const errorHandling = useErrorHandling();
    
    useEffect(() => {
      errorHandling.simulateNetworkError();
    }, []);
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        {Object.entries(errorHandling.errors).map(([id, error]) => (
          <ErrorDisplay
            key={id}
            error={error}
            recovery={errorHandling.recoveryStates[id]}
            onRetry={() => {}}
            onDismiss={() => errorHandling.clearError(id)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Network connectivity errors with retry mechanisms'
      }
    }
  }
};

export const ValidationErrors: Story = {
  render: () => {
    const errorHandling = useErrorHandling();
    
    useEffect(() => {
      errorHandling.simulateValidationError();
    }, []);
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        {Object.entries(errorHandling.errors).map(([id, error]) => (
          <ErrorDisplay
            key={id}
            error={error}
            recovery={errorHandling.recoveryStates[id]}
            onRetry={() => {}}
            onDismiss={() => errorHandling.clearError(id)}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form validation and input errors with helpful guidance'
      }
    }
  }
};

export const ErrorBoundary: Story = {
  render: () => (
    <div className="max-w-2xl mx-auto p-6">
      <ErrorBoundaryDemo>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <p className="text-white">This is a component that can crash.</p>
          </CardContent>
        </Card>
      </ErrorBoundaryDemo>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error boundary component for graceful error handling'
      }
    }
  }
};