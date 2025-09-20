import type { Meta, StoryObj } from '@storybook/react';
import { Loader2, CheckCircle, AlertCircle, Users, BookOpen, Calendar, MapPin, Settings, Upload } from 'lucide-react';
import { Progress } from '../../../components/ui/progress';
import { Spinner } from '../../../components/ui/spinner';
import { Skeleton } from '../../../components/ui/skeleton';

const meta: Meta = {
  title: '02-Atoms/Feedback-Elements/Progress & Loading System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Progress & Loading System

A comprehensive feedback system for communicating loading states, progress, and task completion across the HIVE platform. This system provides students with clear visual feedback for all asynchronous operations, from joining spaces to uploading content.

## Campus Integration Features
- **Academic Progress Tracking** - Course completion, assignment uploads, grade calculations
- **Social Activity Feedback** - Space joining, friend requests, event RSVPs
- **Platform Operations** - Data syncing, content loading, real-time updates
- **Mobile Optimization** - Touch-friendly progress indicators optimized for campus mobile usage

## Accessibility Standards
- **WCAG 2.1 AA Compliant** - Proper contrast ratios and screen reader support
- **Reduced Motion Support** - Respects user motion preferences
- **Semantic Progress** - Proper ARIA labels and progress announcements
- **Keyboard Navigation** - Full keyboard accessibility for interactive elements
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Progress Bar Patterns
const campusProgressPatterns = [
  {
    category: 'Academic Progress',
    patterns: [
      { 
        label: 'Assignment Upload', 
        value: 75, 
        icon: Upload, 
        status: 'in-progress',
        context: 'File upload to course space',
        timeEstimate: '2 minutes remaining'
      },
      { 
        label: 'Course Completion', 
        value: 85, 
        icon: BookOpen, 
        status: 'in-progress',
        context: 'Semester progress tracking',
        timeEstimate: '3 weeks remaining'
      },
      { 
        label: 'Grade Calculation', 
        value: 100, 
        icon: CheckCircle, 
        status: 'complete',
        context: 'Final grade processing',
        timeEstimate: 'Complete'
      }
    ]
  },
  {
    category: 'Social Activities',
    patterns: [
      { 
        label: 'Space Setup', 
        value: 60, 
        icon: Users, 
        status: 'in-progress',
        context: 'Creating study group space',
        timeEstimate: '30 seconds remaining'
      },
      { 
        label: 'Event Planning', 
        value: 40, 
        icon: Calendar, 
        status: 'in-progress',
        context: 'Floor event coordination',
        timeEstimate: '5 minutes remaining'
      },
      { 
        label: 'Member Sync', 
        value: 90, 
        icon: Users, 
        status: 'in-progress',
        context: 'Updating space membership',
        timeEstimate: 'Almost done'
      }
    ]
  }
];

// Loading State Patterns
const campusLoadingStates = [
  {
    category: 'Page Loading',
    states: [
      { 
        type: 'spinner',
        size: 'small',
        context: 'Feed refresh',
        description: 'Loading new posts and updates'
      },
      { 
        type: 'spinner',
        size: 'medium',
        context: 'Space content',
        description: 'Loading space dashboard and activity'
      },
      { 
        type: 'spinner',
        size: 'large',
        context: 'Initial app load',
        description: 'Setting up your HIVE experience'
      }
    ]
  },
  {
    category: 'Content Loading',
    states: [
      { 
        type: 'skeleton',
        variant: 'text',
        context: 'Post content',
        description: 'Loading post text and metadata'
      },
      { 
        type: 'skeleton',
        variant: 'avatar',
        context: 'Profile pictures',
        description: 'Loading user profile images'
      },
      { 
        type: 'skeleton',
        variant: 'card',
        context: 'Space cards',
        description: 'Loading space information and previews'
      }
    ]
  }
];

// Progress Bar Variants Story
export const ProgressBarVariants: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">HIVE Progress Indicators</h2>
        <p className="text-lg text-gray-600">Visual feedback system for campus activities and platform operations</p>
      </div>

      {campusProgressPatterns.map((category) => (
        <div key={category.category} className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            {category.category}
          </h3>
          
          <div className="grid gap-6">
            {category.patterns.map((pattern, index) => {
              const IconComponent = pattern.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        pattern.status === 'complete' ? 'bg-green-100 text-green-600' :
                        pattern.status === 'error' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{pattern.label}</h4>
                        <p className="text-sm text-gray-600">{pattern.context}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{pattern.value}%</div>
                      <div className="text-xs text-gray-500">{pattern.timeEstimate}</div>
                    </div>
                  </div>
                  
                  <Progress 
                    value={pattern.value} 
                    className="h-3 bg-gray-100" 
                  />
                  
                  {pattern.status === 'complete' && (
                    <div className="flex items-center gap-2 mt-3 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Task completed successfully</span>
                    </div>
                  )}
                </div>
              )
            })
          </div>
        </div>
      ))}
    </div>
  )
};

// Loading Spinners Story
export const LoadingSpinners: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">HIVE Loading States</h2>
        <p className="text-lg text-gray-600">Spinner components for various loading scenarios</p>
      </div>

      {campusLoadingStates.map((category) => (
        <div key={category.category} className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
            {category.category}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.states.filter(state => state.type === 'spinner').map((state, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="mb-4">
                  <Spinner 
                    className={`mx-auto ${
                      state.size === 'small' ? 'h-6 w-6' :
                      state.size === 'large' ? 'h-12 w-12' :
                      'h-8 w-8'
                    } text-blue-600`}
                  />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{state.context}</h4>
                <p className="text-sm text-gray-600">{state.description}</p>
                <div className="mt-4 text-xs text-gray-400">
                  Size: {state.size} • Animated loading indicator
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
};

// Skeleton Loading Story
export const SkeletonLoading: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">HIVE Skeleton Loading</h2>
        <p className="text-lg text-gray-600">Content placeholders while data loads</p>
      </div>

      <div className="grid gap-8">
        {/* Post Skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Social Post Loading</h3>
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-3" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Space Card Skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Space Card Loading</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-4">
                <Skeleton className="h-32 w-full rounded mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-1/2 mb-3" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Loading</h3>
          <div className="flex items-center gap-6 mb-6">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Skeleton className="h-8 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
            <div className="text-center">
              <Skeleton className="h-8 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
            <div className="text-center">
              <Skeleton className="h-8 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
};

// Interactive Progress Demo Story
export const InteractiveProgressDemo: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    const startProgress = () => {
      setIsLoading(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsLoading(false);
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)
    };

    const campusOperations = [
      { name: 'Join Study Group', icon: Users, estimatedTime: '30 seconds' },
      { name: 'Upload Assignment', icon: Upload, estimatedTime: '2 minutes' },
      { name: 'Sync Calendar', icon: Calendar, estimatedTime: '45 seconds' },
      { name: 'Update Profile', icon: Settings, estimatedTime: '1 minute' }
    ];

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Progress Demo</h2>
          <p className="text-lg text-gray-600">Experience HIVE's progress feedback system</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Campus Operation Simulator</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {campusOperations.map((operation, index) => {
              const IconComponent = operation.icon;
              return (
                <button
                  key={index}
                  onClick={startProgress}
                  disabled={isLoading}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">{operation.name}</div>
                    <div className="text-sm text-gray-600">~{operation.estimatedTime}</div>
                  </div>
                </button>
              )
            })
          </div>

          {(isLoading || progress > 0) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isLoading && <Loader2 className="h-5 w-5 animate-spin text-blue-600" />}
                  <span className="font-medium text-gray-900">
                    {isLoading ? 'Processing...' : 'Complete!'}
                  </span>
                </div>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              
              <Progress value={progress} className="h-3" />
              
              {progress === 100 && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span>Operation completed successfully!</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-2">Campus Integration Features</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Real-time progress tracking for academic operations</li>
            <li>• Social activity feedback with estimated completion times</li>
            <li>• Accessible progress announcements for screen readers</li>
            <li>• Mobile-optimized loading states for on-campus usage</li>
          </ul>
        </div>
      </div>
    )
  }
};