"use client";

import { useState } from 'react';
import { Button, Card, Switch, Badge, Progress } from "@hive/ui";
import { Dialog, DialogContent, HiveModalHeader, HiveModalTitle, HiveModalFooter, Alert, AlertDescription } from "@hive/ui";
import { 
  Link, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Settings,
  Loader2,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

interface IntegrationConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (_permissions: string[]) => Promise<void>;
  onDisconnect?: () => Promise<void>;
  integration: {
    id: string;
    name: string;
    description: string;
    icon: any;
    isConnected: boolean;
    connectionStatus?: 'healthy' | 'warning' | 'error';
    lastSync?: string;
    permissions: {
      id: string;
      name: string;
      description: string;
      required: boolean;
      granted?: boolean;
    }[];
    features: string[];
    privacyNote?: string;
  };
}

export function IntegrationConnectionModal({
  isOpen,
  onClose,
  onConnect,
  onDisconnect,
  integration
}: IntegrationConnectionModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    integration.permissions.filter(p => p.required || p.granted).map(p => p.id)
  );
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const [connectionStep, setConnectionStep] = useState<'permissions' | 'connecting' | 'success' | 'error'>('permissions');
  const [error, setError] = useState<string | null>(null);

  const IconComponent = integration.icon;

  const handlePermissionToggle = (permissionId: string) => {
    const permission = integration.permissions.find(p => p.id === permissionId);
    if (permission?.required) return; // Can't toggle required permissions

    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setConnectionStep('connecting');
      setError(null);

      await onConnect(selectedPermissions);
      
      setConnectionStep('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      setConnectionStep('error');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    if (!onDisconnect) return;
    
    try {
      setIsConnecting(true);
      await onDisconnect();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Disconnection failed');
    } finally {
      setIsConnecting(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'healthy': return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Connected</Badge>;
      case 'warning': return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Issues</Badge>;
      case 'error': return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Error</Badge>;
      default: return <Badge variant="secondary">Not Connected</Badge>;
    }
  };

  if (connectionStep === 'connecting') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-[var(--hive-brand-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-8 w-8 text-[var(--hive-brand-primary)] animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Connecting to {integration.name}
            </h3>
            <p className="text-hive-text-mutedLight mb-4">
              Please complete the connection in the popup window
            </p>
            <Progress value={75} className="h-2" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (connectionStep === 'success') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Successfully Connected!
            </h3>
            <p className="text-hive-text-mutedLight">
              {integration.name} has been connected to your HIVE profile
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <HiveModalHeader>
          <HiveModalTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <span>{integration.isConnected ? 'Manage' : 'Connect'} {integration.name}</span>
                {integration.isConnected && getStatusBadge(integration.connectionStatus)}
              </div>
              <div className="text-sm text-hive-text-mutedLight font-normal">
                {integration.description}
              </div>
            </div>
          </HiveModalTitle>
        </HiveModalHeader>

        <div className="p-6 space-y-6">
          {/* Connection Status */}
          {integration.isConnected && (
            <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white mb-1">Connection Status</h3>
                  <p className="text-sm text-hive-text-mutedLight">
                    Last synced: {integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}
                  </p>
                </div>
                <div className={`text-right ${getStatusColor(integration.connectionStatus)}`}>
                  <div className="font-medium capitalize">{integration.connectionStatus || 'Unknown'}</div>
                </div>
              </div>
            </Card>
          )}

          {/* Features */}
          <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
            <h3 className="font-medium text-white mb-3 flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Features & Benefits</span>
            </h3>
            <ul className="space-y-2">
              {integration.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-hive-text-mutedLight">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Permissions */}
          <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
            <h3 className="font-medium text-white mb-3 flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Permissions</span>
            </h3>
            <div className="space-y-3">
              {integration.permissions.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white">{permission.name}</span>
                      {permission.required && (
                        <Badge variant="secondary" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-hive-text-mutedLight">{permission.description}</p>
                  </div>
                  <Switch
                    checked={selectedPermissions.includes(permission.id)}
                    onCheckedChange={() => handlePermissionToggle(permission.id)}
                    disabled={permission.required}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Privacy Notice */}
          {integration.privacyNote && (
            <Card className="p-4 bg-blue-500/5 border-blue-500/20">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-white mb-1">Privacy & Data</h4>
                  <div className="space-y-2">
                    <p className="text-sm text-hive-text-mutedLight">
                      {showPrivacyDetails ? integration.privacyNote : `${integration.privacyNote.slice(0, 100)}...`}
                    </p>
                    <button
                      onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
                      className="text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      {showPrivacyDetails ? (
                        <>
                          <EyeOff className="h-3 w-3" />
                          <span>Show less</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3" />
                          <span>Read more</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Error Display */}
          {connectionStep === 'error' && error && (
            <Alert className="border-red-500/20 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <HiveModalFooter>
          <div className="flex items-center justify-between w-full">
            <div>
              {integration.isConnected && onDisconnect && (
                <Button
                  variant="outline"
                  onClick={handleDisconnect}
                  disabled={isConnecting}
                  className="border-red-500 text-red-400 hover:bg-red-500/10"
                >
                  <X className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isConnecting}
              >
                Cancel
              </Button>
              {!integration.isConnected ? (
                <Button
                  onClick={handleConnect}
                  disabled={isConnecting || selectedPermissions.length === 0}
                  className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
                >
                  <Link className="h-4 w-4 mr-2" />
                  Connect {integration.name}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => window.open(`/settings/integrations/${integration.id}`, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Manage Settings
                </Button>
              )}
            </div>
          </div>
        </HiveModalFooter>
      </DialogContent>
    </Dialog>
  );
}