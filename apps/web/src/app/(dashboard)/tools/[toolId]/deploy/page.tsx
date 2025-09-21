"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card, Button } from "@hive/ui";
import { Alert as _Alert } from "@/components/temp-stubs";
import { 
  ArrowLeft, 
  User, 
  Users, 
  Settings, 
  Shield, 
  Eye as _Eye, 
  Globe as _Globe,
  Lock as _Lock,
  CheckCircle,
  AlertCircle,
  Rocket
} from 'lucide-react';
import { useFeatureFlags } from '@hive/hooks';
import { useUnifiedAuth } from '@hive/ui';
import { ToolNavigation } from '@/lib/tool-navigation';

interface DeploymentTarget {
  id: string;
  name: string;
  type: 'profile' | 'space';
  icon: React.ReactNode;
  description: string;
  permissions: string[];
}

interface DeploymentConfig {
  targetType: 'profile' | 'space';
  targetId: string;
  surface?: string;
  permissions: {
    canInteract: boolean;
    canView: boolean;
    canEdit: boolean;
    allowedRoles?: string[];
  };
  settings: {
    showInDirectory: boolean;
    allowSharing: boolean;
    collectAnalytics: boolean;
    notifyOnInteraction: boolean;
  };
}

export default function ToolDeployPage() {
  const _router = useRouter();
  const params = useParams();
  const flags = useFeatureFlags();
  const { user, getAuthToken } = useUnifiedAuth();
  const toolId = params.toolId as string;

  const [step, setStep] = useState<'target' | 'config' | 'confirm' | 'success'>('target');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toolData, setToolData] = useState<any>(null);
  
  const [deploymentConfig, setDeploymentConfig] = useState<DeploymentConfig>({
    targetType: 'profile',
    targetId: user?.uid || 'test-user-id',
    permissions: {
      canInteract: true,
      canView: true,
      canEdit: false,
    },
    settings: {
      showInDirectory: true,
      allowSharing: true,
      collectAnalytics: true,
      notifyOnInteraction: false,
    },
  });

  // Mock data for available targets
  const availableTargets: DeploymentTarget[] = [
    {
      id: user?.uid || 'test-user-id',
      name: 'My Profile',
      type: 'profile',
      icon: <User className="h-5 w-5" />,
      description: 'Deploy to your personal profile dashboard',
      permissions: ['full_access'],
    },
    {
      id: 'space-1',
      name: 'Study Group',
      type: 'space',
      icon: <Users className="h-5 w-5" />,
      description: 'Deploy to Study Group space',
      permissions: ['builder', 'admin'],
    },
    {
      id: 'space-2',
      name: 'CS Club',
      type: 'space',
      icon: <Users className="h-5 w-5" />,
      description: 'Deploy to CS Club community space',
      permissions: ['admin'],
    },
  ];

  const spaceSurfaces = [
    { id: 'tools', name: 'Tools Gallery', description: 'Main tools section' },
    { id: 'pinned', name: 'Pinned', description: 'Pinned at top of space' },
    { id: 'posts', name: 'Posts Feed', description: 'Within the posts feed' },
    { id: 'events', name: 'Events', description: 'Events section' },
  ];

  useEffect(() => {
    // Load tool data
    const loadTool = async () => {
      try {
        // Mock tool data
        setToolData({
          id: toolId,
          name: 'Sample Tool',
          description: 'A sample tool for deployment',
          status: 'draft',
        });
      } catch (err) {
        setError('Failed to load tool data');
      }
    };

    loadTool();
    flags.trackEvent('tools', 'interact', { action: 'deploy_start', toolId });
  }, [toolId, flags]);

  const handleTargetSelect = (target: DeploymentTarget) => {
    setDeploymentConfig(prev => ({
      ...prev,
      targetType: target.type,
      targetId: target.id,
    }));
    setStep('config');
  };

  const handleConfigUpdate = (updates: Partial<DeploymentConfig>) => {
    setDeploymentConfig(prev => ({ ...prev, ...updates }));
  };

  const handleDeploy = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const authToken = await getAuthToken();
      const response = await fetch('/api/tools/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          toolId,
          deployTo: deploymentConfig.targetType,
          targetId: deploymentConfig.targetId,
          surface: deploymentConfig.surface,
          permissions: deploymentConfig.permissions,
          settings: deploymentConfig.settings,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to deploy tool');
      }

      flags.trackEvent('tools', 'complete', { 
        action: 'deploy_success',
        toolId, 
        targetType: deploymentConfig.targetType,
        targetId: deploymentConfig.targetId 
      });

      setStep('success');
    } catch (err) {
      console.error('Deployment error:', err);
      setError(err instanceof Error ? err.message : 'Failed to deploy tool');
    } finally {
      setIsLoading(false);
    }
  };

  const renderTargetSelection = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Select Deployment Target
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Choose where you want to deploy this tool
        </p>
      </div>

      <div className="grid gap-4">
        {availableTargets.map((target) => (
          <Card
            key={target.id}
            className="p-6 cursor-pointer transition-all hover:bg-[var(--hive-background-secondary)] border-[var(--hive-border-primary)]"
            onClick={() => handleTargetSelect(target)}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[var(--hive-background-secondary)] rounded-lg flex items-center justify-center">
                {target.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">
                  {target.name}
                </h3>
                <p className="text-sm text-[var(--hive-text-secondary)] mb-2">
                  {target.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--hive-text-secondary)]">
                    Permissions: {target.permissions.join(', ')}
                  </span>
                </div>
              </div>
              <ArrowLeft className="h-5 w-5 text-[var(--hive-text-secondary)] rotate-180" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderConfiguration = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Deployment Configuration
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Configure how your tool will be deployed and accessed
        </p>
      </div>

      {/* Surface Selection for Spaces */}
      {deploymentConfig.targetType === 'space' && (
        <Card className="p-6">
          <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Surface Location
          </h3>
          <div className="grid gap-3">
            {spaceSurfaces.map((surface) => (
              <label
                key={surface.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-[var(--hive-border-primary)] cursor-pointer hover:bg-[var(--hive-background-secondary)]"
              >
                <input
                  type="radio"
                  name="surface"
                  value={surface.id}
                  checked={deploymentConfig.surface === surface.id}
                  onChange={(e: React.ChangeEvent) => handleConfigUpdate({ surface: e.target.value })}
                  className="text-[#FFD700]"
                />
                <div>
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {surface.name}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {surface.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Card>
      )}

      {/* Permissions */}
      <Card className="p-6">
        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Permissions
        </h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={deploymentConfig.permissions.canView}
              onChange={(e: React.ChangeEvent) => handleConfigUpdate({
                permissions: { ...deploymentConfig.permissions, canView: e.target.checked }
              })}
              className="text-[#FFD700]"
            />
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">Can View</div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                Users can see the tool
              </div>
            </div>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={deploymentConfig.permissions.canInteract}
              onChange={(e: React.ChangeEvent) => handleConfigUpdate({
                permissions: { ...deploymentConfig.permissions, canInteract: e.target.checked }
              })}
              className="text-[#FFD700]"
            />
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">Can Interact</div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                Users can use the tool
              </div>
            </div>
          </label>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Tool Settings
        </h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={deploymentConfig.settings.showInDirectory}
              onChange={(e: React.ChangeEvent) => handleConfigUpdate({
                settings: { ...deploymentConfig.settings, showInDirectory: e.target.checked }
              })}
              className="text-[#FFD700]"
            />
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">Show in Directory</div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                Tool appears in public listings
              </div>
            </div>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={deploymentConfig.settings.allowSharing}
              onChange={(e: React.ChangeEvent) => handleConfigUpdate({
                settings: { ...deploymentConfig.settings, allowSharing: e.target.checked }
              })}
              className="text-[#FFD700]"
            />
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">Allow Sharing</div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                Users can share the tool
              </div>
            </div>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={deploymentConfig.settings.collectAnalytics}
              onChange={(e: React.ChangeEvent) => handleConfigUpdate({
                settings: { ...deploymentConfig.settings, collectAnalytics: e.target.checked }
              })}
              className="text-[#FFD700]"
            />
            <div>
              <div className="font-medium text-[var(--hive-text-primary)]">Collect Analytics</div>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                Track usage data for insights
              </div>
            </div>
          </label>
        </div>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          onClick={() => setStep('target')}
          className="border-[var(--hive-border-primary)]"
        >
          Back
        </Button>
        <Button
          onClick={() => setStep('confirm')}
          className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
        >
          Review Deployment
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const selectedTarget = availableTargets.find(t => t.id === deploymentConfig.targetId);
    const selectedSurface = spaceSurfaces.find(s => s.id === deploymentConfig.surface);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
            Confirm Deployment
          </h2>
          <p className="text-[var(--hive-text-secondary)]">
            Review your deployment configuration before proceeding
          </p>
        </div>

        <Card className="p-6">
          <h3 className="font-semibold text-[var(--hive-text-primary)] mb-4">
            Deployment Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[var(--hive-text-secondary)]">Tool:</span>
              <span className="text-[var(--hive-text-primary)] font-medium">
                {toolData?.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--hive-text-secondary)]">Target:</span>
              <span className="text-[var(--hive-text-primary)] font-medium">
                {selectedTarget?.name}
              </span>
            </div>
            {selectedSurface && (
              <div className="flex justify-between">
                <span className="text-[var(--hive-text-secondary)]">Surface:</span>
                <span className="text-[var(--hive-text-primary)] font-medium">
                  {selectedSurface.name}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[var(--hive-text-secondary)]">Visibility:</span>
              <span className="text-[var(--hive-text-primary)] font-medium">
                {deploymentConfig.settings.showInDirectory ? 'Public' : 'Private'}
              </span>
            </div>
          </div>
        </Card>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <span className="text-red-400">{error}</span>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setStep('config')}
            className="border-[var(--hive-border-primary)]"
          >
            Back
          </Button>
          <Button
            onClick={handleDeploy}
            disabled={isLoading}
            className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255] flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#0A0A0A]" />
                Deploying...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                Deploy Tool
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-green-400" />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
          Tool Deployed Successfully!
        </h2>
        <p className="text-[var(--hive-text-secondary)]">
          Your tool is now live and accessible to users
        </p>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          variant="secondary"
          onClick={() => ToolNavigation.toMarketplace()}
          className="border-[var(--hive-border-primary)]"
        >
          Back to Marketplace
        </Button>
        <Button
          onClick={() => ToolNavigation.toAnalytics(toolId)}
          className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
        >
          View Analytics
        </Button>
      </div>
    </div>
  );

  if (!toolData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
          <p className="text-[var(--hive-text-secondary)]">Loading tool...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Header */}
      <div className="border-b border-[var(--hive-border-primary)] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => ToolNavigation.goBack('marketplace')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-[var(--hive-text-primary)]">
              Deploy Tool: {toolData.name}
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-[var(--hive-text-secondary)]">
                Step {step === 'target' ? 1 : step === 'config' ? 2 : step === 'confirm' ? 3 : 4} of 4
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {step === 'target' && renderTargetSelection()}
        {step === 'config' && renderConfiguration()}
        {step === 'confirm' && renderConfirmation()}
        {step === 'success' && renderSuccess()}
      </div>
    </div>
  );
}