import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../atomic/ui/card';
import { Button } from '../../../atomic/atoms/button-enhanced';
import { Input } from '../../../atomic/atoms/input-enhanced';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../atomic/atoms/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../atomic/atoms/avatar';
import { Progress } from '../../../components/ui/progress';
import { Skeleton } from '../../../components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '../../../atomic/molecules/alert-toast-system';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../atomic/ui/tabs';
import { 
  AlertTriangle, 
  RefreshCw, 
  Wifi,
  WifiOff,
  Server,
  Clock,
  XCircle,
  CheckCircle,
  Info,
  Loader2,
  Upload,
  Download,
  MessageCircle,
  Users,
  MapPin,
  GraduationCap,
  Settings,
  Home,
  Search,
  Bell,
  User,
  Heart,
  Share,
  Send,
  Plus,
  ChevronRight,
  Eye,
  Calendar,
  FileText,
  Globe,
  Smartphone,
  Database,
  Shield
} from 'lucide-react';

/**
 * # HIVE Error & Loading States System
 * 
 * Comprehensive error handling and loading state management for the HIVE platform.
 * Provides consistent, user-friendly feedback for all possible application states including network issues, server errors, and loading processes.
 * 
 * ## Key Features:
 * - **Loading States**: Skeletons, spinners, and progress indicators for different content types
 * - **Error States**: Network errors, server errors, validation errors, and 404 pages
 * - **Empty States**: Content discovery, onboarding guidance, and action prompts
 * - **Offline States**: Campus WiFi issues, data saving, and sync status
 * - **Success States**: Confirmation messages and completion feedback
 * - **Campus Context**: UB-specific error messages and recovery suggestions
 * - **Mobile Optimization**: Touch-friendly error recovery and loading indicators
 */

const meta: Meta<typeof React.Fragment> = {
  title: '12-Live Frontend/Error & Loading States System',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete error handling and loading state system for production-ready UX'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// State Management Hook
const useErrorStates = () => {
  const [currentState, setCurrentState] = useState('loading');
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  const simulateLoading = (duration = 3000) => {
    setCurrentState('loading');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentState('success');
          return 100;
        }
        return prev + (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  };

  const simulateError = (errorType = 'network') => {
    setCurrentState(errorType);
    setRetryAttempts(prev => prev + 1);
  };

  const retry = () => {
    simulateLoading(2000);
  };

  return {
    currentState,
    setCurrentState,
    retryAttempts,
    progress,
    isOnline,
    setIsOnline,
    simulateLoading,
    simulateError,
    retry
  };
};

// Loading Skeletons
const ProfileSkeleton = () => (
  <Card className="bg-gray-900 border-gray-800">
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-16 h-16 rounded-full bg-gray-800" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-32 bg-gray-800" />
          <Skeleton className="h-4 w-24 bg-gray-800" />
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16 bg-gray-800" />
            <Skeleton className="h-6 w-20 bg-gray-800" />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const FeedSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, i) => (
      <Card key={i} className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="w-10 h-10 rounded-full bg-gray-800" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-24 bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
              <Skeleton className="h-4 w-3/4 bg-gray-800" />
              <Skeleton className="h-32 w-full bg-gray-800 rounded-lg" />
              <div className="flex space-x-4 pt-2">
                <Skeleton className="h-8 w-16 bg-gray-800" />
                <Skeleton className="h-8 w-16 bg-gray-800" />
                <Skeleton className="h-8 w-16 bg-gray-800" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const SpaceCardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <Card key={i} className="bg-gray-900 border-gray-800">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-8 h-8 rounded bg-gray-800" />
              <Skeleton className="h-5 w-24 bg-gray-800" />
            </div>
            <Skeleton className="h-4 w-full bg-gray-800" />
            <Skeleton className="h-4 w-2/3 bg-gray-800" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-4 w-16 bg-gray-800" />
              <Skeleton className="h-6 w-12 bg-gray-800 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

// Loading States
const LoadingSpinner = ({ size = 'default', message }: { size?: 'small' | 'default' | 'large', message?: string }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-yellow-500`} />
      {message && <p className="text-gray-400 text-sm">{message}</p>}
    </div>
  );
};

const ProgressLoader = ({ progress, message }: { progress: number, message: string }) => (
  <div className="space-y-4">
    <div className="text-center">
      <LoadingSpinner size="large" />
      <p className="text-white font-medium mt-4">{message}</p>
    </div>
    <div className="space-y-2">
      <Progress value={progress} className="w-full" />
      <p className="text-center text-gray-400 text-sm">{Math.round(progress)}% complete</p>
    </div>
  </div>
);

// Error States
const NetworkError = ({ onRetry, retryAttempts }: { onRetry: () => void, retryAttempts: number }) => (
  <div className="text-center space-y-6 p-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 border-2 border-red-800">
      <WifiOff className="w-8 h-8 text-red-400" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white">No Internet Connection</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Can't connect to HIVE. Check your WiFi connection or try switching to mobile data.
      </p>
      {retryAttempts > 0 && (
        <p className="text-gray-500 text-sm">Retry attempts: {retryAttempts}</p>
      )}
    </div>

    <div className="space-y-3">
      <Button onClick={onRetry} className="bg-yellow-500 hover:bg-yellow-600 text-black">
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
      
      <div className="space-y-2">
        <p className="text-gray-500 text-sm">UB Network Troubleshooting:</p>
        <div className="text-gray-400 text-xs space-y-1">
          <p>• Connect to UB WiFi or eduroam</p>
          <p>• Try moving closer to a WiFi access point</p>
          <p>• Check if campus WiFi is experiencing issues</p>
        </div>
      </div>
    </div>
  </div>
);

const ServerError = ({ onRetry }: { onRetry: () => void }) => (
  <div className="text-center space-y-6 p-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-900/20 border-2 border-orange-800">
      <Server className="w-8 h-8 text-orange-400" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white">Server Error</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Something went wrong on our end. We're working to fix this issue.
      </p>
    </div>

    <div className="space-y-3">
      <Button onClick={onRetry} variant="secondary" className="border-gray-700 text-gray-300">
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh
      </Button>
      
      <p className="text-gray-500 text-sm">
        If the problem persists, contact HIVE support
      </p>
    </div>
  </div>
);

const NotFoundError = () => (
  <div className="text-center space-y-6 p-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 border-2 border-gray-700">
      <Search className="w-8 h-8 text-gray-400" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white">Page Not Found</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>

    <div className="space-y-3">
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
        <Home className="mr-2 h-4 w-4" />
        Go Home
      </Button>
      
      <Button variant="secondary" className="border-gray-700 text-gray-300">
        <ChevronRight className="mr-2 h-4 w-4" />
        Browse Spaces
      </Button>
    </div>
  </div>
);

const ValidationError = ({ errors }: { errors: string[] }) => (
  <Alert className="border-red-800 bg-red-900/20">
    <AlertTriangle className="h-4 w-4 text-red-400" />
    <AlertTitle className="text-red-200">Please fix the following errors:</AlertTitle>
    <AlertDescription className="text-red-300">
      <ul className="mt-2 space-y-1">
        {errors.map((error, index) => (
          <li key={index} className="text-sm">• {error}</li>
        ))}
      </ul>
    </AlertDescription>
  </Alert>
);

// Empty States
const EmptyFeed = () => (
  <div className="text-center space-y-6 p-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800">
      <MessageCircle className="w-8 h-8 text-gray-400" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white">Your feed is quiet</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Join some spaces or follow more students to see posts in your feed.
      </p>
    </div>

    <div className="space-y-3">
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
        <Users className="mr-2 h-4 w-4" />
        Explore Spaces
      </Button>
      
      <Button variant="secondary" className="border-gray-700 text-gray-300">
        <Plus className="mr-2 h-4 w-4" />
        Create Post
      </Button>
    </div>

    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left">
      <Card className="bg-gray-800 border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-5 w-5 text-yellow-500" />
          <span className="text-white text-sm font-medium">Academic Spaces</span>
        </div>
        <p className="text-gray-400 text-xs mt-1">Join spaces for your classes</p>
      </Card>
      
      <Card className="bg-gray-800 border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <Home className="h-5 w-5 text-blue-400" />
          <span className="text-white text-sm font-medium">Dorm Communities</span>
        </div>
        <p className="text-gray-400 text-xs mt-1">Connect with floor mates</p>
      </Card>
    </div>
  </div>
);

const EmptySpaces = () => (
  <div className="text-center space-y-6 p-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800">
      <Users className="w-8 h-8 text-gray-400" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white">No spaces yet</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Spaces help you connect with classmates, dorm mates, and students with similar interests.
      </p>
    </div>

    <div className="space-y-3">
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
        <Search className="mr-2 h-4 w-4" />
        Find Spaces
      </Button>
      
      <Button variant="secondary" className="border-gray-700 text-gray-300">
        <Plus className="mr-2 h-4 w-4" />
        Create Space
      </Button>
    </div>

    <div className="text-gray-500 text-sm space-y-1">
      <p>Popular UB spaces to join:</p>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        <Badge variant="secondary" className="border-gray-700 text-gray-300">CS Study Group</Badge>
        <Badge variant="secondary" className="border-gray-700 text-gray-300">Ellicott Complex</Badge>
        <Badge variant="secondary" className="border-gray-700 text-gray-300">UB Gaming</Badge>
      </div>
    </div>
  </div>
);

const EmptySearch = ({ query }: { query: string }) => (
  <div className="text-center space-y-6 p-8">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800">
      <Search className="w-8 h-8 text-gray-400" />
    </div>
    
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-white">No results for "{query}"</h3>
      <p className="text-gray-400 max-w-md mx-auto">
        Try different keywords or browse popular spaces and students.
      </p>
    </div>

    <div className="space-y-3">
      <Button variant="secondary" className="border-gray-700 text-gray-300">
        <RefreshCw className="mr-2 h-4 w-4" />
        Clear Search
      </Button>
    </div>

    <div className="space-y-2">
      <p className="text-gray-500 text-sm">Suggestions:</p>
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          Computer Science
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          Study Groups
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          Dorm Activities
        </Button>
      </div>
    </div>
  </div>
);

// Success States
const SuccessMessage = ({ title, message, action }: { title: string, message: string, action?: () => void }) => (
  <Alert className="border-green-800 bg-green-900/20">
    <CheckCircle className="h-4 w-4 text-green-400" />
    <AlertTitle className="text-green-200">{title}</AlertTitle>
    <AlertDescription className="text-green-300">
      {message}
      {action && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 text-green-300 hover:text-green-200 p-0"
          onClick={action}
        >
          View Details
          <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      )}
    </AlertDescription>
  </Alert>
);

// Offline States
const OfflineState = () => (
  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
    <div className="flex items-center space-x-3">
      <WifiOff className="h-5 w-5 text-orange-400" />
      <div className="flex-1">
        <p className="text-white font-medium text-sm">You're offline</p>
        <p className="text-gray-400 text-sm">Some features may not work until you reconnect</p>
      </div>
      <Badge variant="secondary" className="border-orange-700 text-orange-400">
        Offline
      </Badge>
    </div>
  </div>
);

// Comprehensive Error & Loading Demo
const ErrorLoadingDemo = () => {
  const errorHook = useErrorStates();
  const { currentState, setCurrentState, progress, retryAttempts, retry } = errorHook;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-black font-bold">
                H
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Error & Loading States</h1>
                <p className="text-gray-400 text-sm">Production-ready UX feedback system</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="secondary"
                className="border-gray-700 text-gray-300"
                onClick={() => setCurrentState('online')}
              >
                Online
              </Button>
              <Button 
                size="sm" 
                variant="secondary"
                className="border-gray-700 text-gray-300"
                onClick={() => setCurrentState('offline')}
              >
                Offline
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* State Controls */}
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">State Controls</CardTitle>
            <CardDescription className="text-gray-400">
              Test different loading and error states
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button 
                onClick={() => errorHook.simulateLoading()} 
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Loader2 className="mr-2 h-4 w-4" />
                Loading
              </Button>
              <Button 
                onClick={() => errorHook.simulateError('network')} 
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <WifiOff className="mr-2 h-4 w-4" />
                Network Error
              </Button>
              <Button 
                onClick={() => errorHook.simulateError('server')} 
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Server className="mr-2 h-4 w-4" />
                Server Error
              </Button>
              <Button 
                onClick={() => setCurrentState('404')} 
                className="bg-gray-600 hover:bg-gray-700 text-white"
              >
                <Search className="mr-2 h-4 w-4" />
                404 Error
              </Button>
              <Button 
                onClick={() => setCurrentState('empty-feed')} 
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Empty Feed
              </Button>
              <Button 
                onClick={() => setCurrentState('empty-spaces')} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Users className="mr-2 h-4 w-4" />
                Empty Spaces
              </Button>
              <Button 
                onClick={() => setCurrentState('validation')} 
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Validation
              </Button>
              <Button 
                onClick={() => setCurrentState('success')} 
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Success
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Offline Banner */}
        {currentState === 'offline' && (
          <div className="mb-6">
            <OfflineState />
          </div>
        )}

        {/* Main Content Area */}
        <div className="space-y-6">
          {/* Current State Display */}
          {currentState === 'loading' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8">
                <ProgressLoader 
                  progress={progress} 
                  message="Loading your feed..." 
                />
              </CardContent>
            </Card>
          )}

          {currentState === 'network' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent>
                <NetworkError onRetry={retry} retryAttempts={retryAttempts} />
              </CardContent>
            </Card>
          )}

          {currentState === 'server' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent>
                <ServerError onRetry={retry} />
              </CardContent>
            </Card>
          )}

          {currentState === '404' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent>
                <NotFoundError />
              </CardContent>
            </Card>
          )}

          {currentState === 'empty-feed' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent>
                <EmptyFeed />
              </CardContent>
            </Card>
          )}

          {currentState === 'empty-spaces' && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent>
                <EmptySpaces />
              </CardContent>
            </Card>
          )}

          {currentState === 'validation' && (
            <div className="space-y-4">
              <ValidationError 
                errors={[
                  'Email address is required',
                  'Password must be at least 8 characters',
                  'Please agree to the terms of service'
                ]} 
              />
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white">Email</Label>
                      <Input 
                        className="bg-gray-800 border-red-700 text-white"
                        placeholder="your.name@buffalo.edu"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Password</Label>
                      <Input 
                        type="password"
                        className="bg-gray-800 border-red-700 text-white"
                        placeholder="Password"
                      />
                    </div>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      Sign Up
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentState === 'success' && (
            <div className="space-y-4">
              <SuccessMessage 
                title="Profile Updated!"
                message="Your changes have been saved successfully."
              />
              <SuccessMessage 
                title="Space Created!"
                message="CS 115 Study Group is now live. Students can start joining."
                action={() => {}}
              />
            </div>
          )}

          {/* Loading Skeletons Demo */}
          {currentState === 'skeletons' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Profile Loading</h3>
                <ProfileSkeleton />
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Feed Loading</h3>
                <FeedSkeleton />
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Spaces Loading</h3>
                <SpaceCardSkeleton />
              </div>
            </div>
          )}

          {/* Normal Content State */}
          {(currentState === 'success' || currentState === 'online') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/api/placeholder/32/32" />
                        <AvatarFallback>MJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white text-sm">Mike joined CS Study Group</p>
                        <p className="text-gray-400 text-xs">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/api/placeholder/32/32" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white text-sm">Sarah posted in Ellicott Complex</p>
                        <p className="text-gray-400 text-xs">5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Popular Spaces</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <GraduationCap className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">CS 115 Study Group</p>
                          <p className="text-gray-400 text-xs">124 members</p>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                        Join
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                          <Home className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">Ellicott Complex</p>
                          <p className="text-gray-400 text-xs">89 members</p>
                        </div>
                      </div>
                      <Button size="sm" variant="secondary" className="border-gray-700 text-gray-300">
                        Join
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const CompleteErrorLoadingSystem: Story = {
  render: () => <ErrorLoadingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete error handling and loading state system with network errors, server errors, empty states, and loading indicators'
      }
    }
  }
};

export const LoadingStates: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState('skeletons');
    
    return (
      <div className="min-h-screen bg-black p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Loading States</h1>
            <p className="text-gray-400">Different loading indicators for various content types</p>
          </div>
          
          <Tabs value={activeDemo} onValueChange={setActiveDemo}>
            <TabsList className="grid grid-cols-3 w-full bg-gray-900">
              <TabsTrigger value="skeletons">Skeletons</TabsTrigger>
              <TabsTrigger value="spinners">Spinners</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skeletons" className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-4">Profile Loading</h3>
                <ProfileSkeleton />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-4">Feed Loading</h3>
                <FeedSkeleton />
              </div>
            </TabsContent>
            
            <TabsContent value="spinners" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <LoadingSpinner size="small" message="Loading..." />
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <LoadingSpinner size="default" message="Processing..." />
                  </CardContent>
                </Card>
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <LoadingSpinner size="large" message="Uploading..." />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-8">
                  <ProgressLoader progress={65} message="Uploading tool data..." />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different loading state patterns including skeletons, spinners, and progress indicators'
      }
    }
  }
};

export const ErrorStates: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Error States</h1>
          <p className="text-gray-400">User-friendly error handling with recovery actions</p>
        </div>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <NetworkError onRetry={() => {}} retryAttempts={2} />
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <ServerError onRetry={() => {}} />
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <NotFoundError />
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error states including network errors, server errors, and 404 pages with UB-specific guidance'
      }
    }
  }
};

export const EmptyStates: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Empty States</h1>
          <p className="text-gray-400">Onboarding and discovery for empty content areas</p>
        </div>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <EmptyFeed />
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <EmptySpaces />
          </CardContent>
        </Card>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardContent>
            <EmptySearch query="advanced calculus" />
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty states that guide users toward content discovery and creation'
      }
    }
  }
};

export const MobileErrorStates: Story = {
  render: () => <ErrorLoadingDemo />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized error and loading states with touch-friendly recovery actions'
      }
    }
  }
};