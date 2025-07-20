import type { Meta, StoryObj } from '@storybook/react';
import { HiveSpaceCard } from '../../components/hive-space-card';
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState } from 'react';

const meta: Meta = {
  title: 'Spaces/Error Handling',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive error handling patterns for HIVE spaces including network errors, permissions, validation, and recovery strategies.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Error types and mock data
const errorTypes = {
  network: {
    title: 'Network Error',
    description: 'Unable to connect to HIVE servers',
    icon: '🌐',
    color: 'red',
    recoverable: true
  },
  permission: {
    title: 'Permission Denied',
    description: 'You don\'t have permission to perform this action',
    icon: '🔒',
    color: 'orange',
    recoverable: false
  },
  validation: {
    title: 'Invalid Input',
    description: 'Please check your input and try again',
    icon: '⚠️',
    color: 'yellow',
    recoverable: true
  },
  notFound: {
    title: 'Space Not Found',
    description: 'The space you\'re looking for doesn\'t exist',
    icon: '🔍',
    color: 'gray',
    recoverable: false
  },
  server: {
    title: 'Server Error',
    description: 'Something went wrong on our end',
    icon: '🔥',
    color: 'red',
    recoverable: true
  },
  quota: {
    title: 'Quota Exceeded',
    description: 'You\'ve reached your space limit',
    icon: '📊',
    color: 'purple',
    recoverable: false
  }
};

export const ErrorStatesOverview: Story = {
  render: () => {
    const [selectedError, setSelectedError] = useState<string | null>(null);

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Error Handling States</h1>
              <p className="text-gray-600">Comprehensive error handling patterns for HIVE spaces</p>
            </div>
            <HiveButton variant="outline">
              Error Documentation
            </HiveButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(errorTypes).map(([key, error]) => (
              <motion.div
                key={key}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <HiveCard 
                  className="h-full cursor-pointer"
                  onClick={() => setSelectedError(key)}
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{error.icon}</div>
                      <div>
                        <h3 className="font-semibold">{error.title}</h3>
                        <p className="text-sm text-gray-600">{error.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <HiveBadge 
                        variant={error.recoverable ? 'success' : 'destructive'}
                      >
                        {error.recoverable ? 'Recoverable' : 'Non-recoverable'}
                      </HiveBadge>
                      
                      <div className={`w-3 h-3 rounded-full bg-${error.color}-500`}></div>
                    </div>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </div>

          {selectedError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <HiveCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {errorTypes[selectedError as keyof typeof errorTypes].title} Details
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {errorTypes[selectedError as keyof typeof errorTypes].description}
                  </p>
                  <div className="flex gap-2">
                    <HiveButton variant="primary">
                      Learn More
                    </HiveButton>
                    <HiveButton variant="outline">
                      View Examples
                    </HiveButton>
                  </div>
                </div>
              </HiveCard>
            </motion.div>
          )}
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const NetworkErrorHandling: Story = {
  render: () => {
    const [isOffline, setIsOffline] = useState(false);
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryCount, setRetryCount] = useState(0);

    const handleRetry = () => {
      setIsRetrying(true);
      setRetryCount(prev => prev + 1);
      
      setTimeout(() => {
        setIsRetrying(false);
        // Simulate success after 3 retries
        if (retryCount >= 2) {
          setIsOffline(false);
          setRetryCount(0);
        }
      }, 2000);
    };

    const simulateOffline = () => {
      setIsOffline(true);
      setRetryCount(0);
    };

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Network Error Handling</h1>
              <p className="text-gray-600">Network connectivity and error recovery patterns</p>
            </div>
            <HiveButton 
              variant="outline" 
              onClick={simulateOffline}
              disabled={isOffline}
            >
              Simulate Offline
            </HiveButton>
          </div>

          {isOffline ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🌐</div>
              <h2 className="text-xl font-semibold mb-2">Connection Lost</h2>
              <p className="text-gray-600 mb-6">
                Unable to connect to HIVE servers. Please check your internet connection.
              </p>
              
              <div className="flex flex-col items-center gap-4">
                <HiveButton 
                  variant="primary"
                  onClick={handleRetry}
                  disabled={isRetrying}
                >
                  {isRetrying ? 'Retrying...' : `Retry${retryCount > 0 ? ` (${retryCount})` : ''}`}
                </HiveButton>
                
                <div className="text-sm text-gray-500">
                  Auto-retry in 30 seconds
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <HiveCard>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Sample Space {i + 1}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        This space loaded successfully after network recovery.
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-500">Online</span>
                      </div>
                    </div>
                  </HiveCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const PermissionErrorHandling: Story = {
  render: () => {
    const [userRole, setUserRole] = useState<'guest' | 'member' | 'builder'>('guest');
    const [attemptedAction, setAttemptedAction] = useState<string | null>(null);

    const actions = [
      { id: 'create-post', label: 'Create Post', requiredRole: 'member' },
      { id: 'deploy-tool', label: 'Deploy Tool', requiredRole: 'builder' },
      { id: 'manage-members', label: 'Manage Members', requiredRole: 'builder' },
      { id: 'view-analytics', label: 'View Analytics', requiredRole: 'builder' },
      { id: 'delete-space', label: 'Delete Space', requiredRole: 'builder' }
    ];

    const handleAction = (actionId: string, requiredRole: string) => {
      const roleHierarchy = { guest: 0, member: 1, builder: 2 };
      const userLevel = roleHierarchy[userRole];
      const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy];

      if (userLevel < requiredLevel) {
        setAttemptedAction(actionId);
      } else {
        alert('Action completed successfully!');
      }
    };

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Permission Error Handling</h1>
              <p className="text-gray-600">Role-based access control and permission errors</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Role:</span>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as 'guest' | 'member' | 'builder')}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="guest">Guest</option>
                <option value="member">Member</option>
                <option value="builder">Builder</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action) => (
              <HiveCard key={action.id}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{action.label}</h3>
                    <HiveBadge variant="outline">
                      {action.requiredRole}
                    </HiveBadge>
                  </div>
                  
                  <HiveButton
                    variant="primary"
                    onClick={() => handleAction(action.id, action.requiredRole)}
                    className="w-full"
                  >
                    Try Action
                  </HiveButton>
                </div>
              </HiveCard>
            ))}
          </div>

          {attemptedAction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white p-6 rounded-lg max-w-md mx-4"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-lg font-semibold mb-2">Permission Denied</h3>
                  <p className="text-gray-600 mb-6">
                    You don't have permission to perform this action. 
                    {userRole === 'guest' ? ' Please join the space first.' : 
                     userRole === 'member' ? ' Builder permissions required.' : ''}
                  </p>
                  
                  <div className="flex gap-2">
                    <HiveButton 
                      variant="primary"
                      onClick={() => setAttemptedAction(null)}
                    >
                      Got it
                    </HiveButton>
                    {userRole === 'guest' && (
                      <HiveButton 
                        variant="outline"
                        onClick={() => {
                          setUserRole('member');
                          setAttemptedAction(null);
                        }}
                      >
                        Join Space
                      </HiveButton>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const ValidationErrorHandling: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      spaceName: '',
      description: '',
      visibility: 'public'
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.spaceName.trim()) {
        newErrors.spaceName = 'Space name is required';
      } else if (formData.spaceName.length < 3) {
        newErrors.spaceName = 'Space name must be at least 3 characters';
      } else if (formData.spaceName.length > 50) {
        newErrors.spaceName = 'Space name must be less than 50 characters';
      }

      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      } else if (formData.description.length < 10) {
        newErrors.description = 'Description must be at least 10 characters';
      } else if (formData.description.length > 500) {
        newErrors.description = 'Description must be less than 500 characters';
      }

      return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate();
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        
        // Simulate server validation
        setTimeout(() => {
          setIsSubmitting(false);
          // Simulate server-side validation error
          if (formData.spaceName.toLowerCase().includes('test')) {
            setErrors({ spaceName: 'Space name cannot contain "test"' });
          } else {
            alert('Space created successfully!');
            setFormData({ spaceName: '', description: '', visibility: 'public' });
          }
        }, 2000);
      }
    };

    return (
      <HiveSpaceLayout>
        <div className="p-6 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Form Validation Errors</h1>
            <p className="text-gray-600">
              Comprehensive form validation with real-time feedback
            </p>
          </div>

          <HiveCard>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Space Name *
                </label>
                <HiveInput
                  value={formData.spaceName}
                  onChange={(e) => setFormData(prev => ({ ...prev, spaceName: e.target.value }))}
                  placeholder="Enter space name"
                  className={`w-full ${errors.spaceName ? 'border-red-500' : ''}`}
                />
                {errors.spaceName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors.spaceName}
                  </motion.p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your space"
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.description}
                    </motion.p>
                  )}
                  <span className="text-sm text-gray-500 ml-auto">
                    {formData.description.length}/500
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Visibility
                </label>
                <select
                  value={formData.visibility}
                  onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="invite-only">Invite Only</option>
                </select>
              </div>

              <div className="flex gap-2">
                <HiveButton
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Space'}
                </HiveButton>
                <HiveButton
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({ spaceName: '', description: '', visibility: 'public' });
                    setErrors({});
                  }}
                >
                  Reset
                </HiveButton>
              </div>
            </form>
          </HiveCard>
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const ErrorRecoveryStrategies: Story = {
  render: () => {
    const [errorScenario, setErrorScenario] = useState<string | null>(null);
    const [isRecovering, setIsRecovering] = useState(false);
    const [recoveryProgress, setRecoveryProgress] = useState(0);

    const scenarios = [
      {
        id: 'data-loss',
        title: 'Data Loss Recovery',
        description: 'Recover unsaved changes from local storage',
        icon: '💾',
        strategy: 'Auto-save and local storage backup'
      },
      {
        id: 'sync-conflict',
        title: 'Sync Conflict Resolution',
        description: 'Handle conflicting changes from multiple users',
        icon: '🔄',
        strategy: 'Conflict detection and manual resolution'
      },
      {
        id: 'partial-failure',
        title: 'Partial Operation Failure',
        description: 'Some parts of the operation succeeded',
        icon: '⚠️',
        strategy: 'Rollback and retry failed parts'
      },
      {
        id: 'quota-exceeded',
        title: 'Quota Exceeded',
        description: 'User has reached their limits',
        icon: '📊',
        strategy: 'Graceful degradation and upgrade prompts'
      }
    ];

    const handleRecovery = (scenarioId: string) => {
      setErrorScenario(scenarioId);
      setIsRecovering(true);
      setRecoveryProgress(0);

      // Simulate recovery process
      const interval = setInterval(() => {
        setRecoveryProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsRecovering(false);
            setTimeout(() => setErrorScenario(null), 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    };

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Error Recovery Strategies</h1>
              <p className="text-gray-600">
                Automated and manual recovery patterns for common error scenarios
              </p>
            </div>
            <HiveButton variant="outline">
              Recovery Guide
            </HiveButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <HiveCard key={scenario.id}>
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-2xl">{scenario.icon}</div>
                    <div>
                      <h3 className="font-semibold">{scenario.title}</h3>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Recovery Strategy:</div>
                    <div className="text-sm bg-gray-50 p-2 rounded">
                      {scenario.strategy}
                    </div>
                  </div>
                  
                  <HiveButton
                    variant="primary"
                    onClick={() => handleRecovery(scenario.id)}
                    disabled={isRecovering}
                    className="w-full"
                  >
                    {isRecovering && errorScenario === scenario.id ? 'Recovering...' : 'Test Recovery'}
                  </HiveButton>
                </div>
              </HiveCard>
            ))}
          </div>

          {errorScenario && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white p-6 rounded-lg max-w-md mx-4"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">
                    {scenarios.find(s => s.id === errorScenario)?.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isRecovering ? 'Recovering...' : 'Recovery Complete'}
                  </h3>
                  
                  {isRecovering ? (
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${recoveryProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {recoveryProgress}% complete
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-600 mb-4">
                      Recovery completed successfully!
                    </p>
                  )}
                  
                  {!isRecovering && (
                    <HiveButton 
                      variant="primary"
                      onClick={() => setErrorScenario(null)}
                    >
                      Close
                    </HiveButton>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </HiveSpaceLayout>
    );
  },
};