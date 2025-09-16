'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Button,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@hive/ui';
import { 
  Shield, 
  EyeOff, 
  Settings,
  Globe,
  UserCheck,
  UserX,
  FileText,
  Download,
  RefreshCw
} from 'lucide-react';

interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  category: 'profile' | 'content' | 'data' | 'communication';
  defaultValue: boolean;
  currentValue: boolean;
  affectedUsers: number;
  lastModified: string;
  modifiedBy: string;
}

interface UserPrivacyOverride {
  userId: string;
  userEmail: string;
  setting: string;
  value: boolean;
  reason: string;
  createdAt: string;
  createdBy: string;
}

interface GhostModeUser {
  id: string;
  email: string;
  enabledAt: string;
  duration: string;
  reason: string;
}

interface DataRequest {
  id: string;
  userId: string;
  userEmail: string;
  type: 'export' | 'deletion';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedAt: string;
  completedAt?: string;
  downloadUrl?: string;
}

export default function PrivacyControls() {
  const [settings, setSettings] = useState<PrivacySetting[]>([]);
  const [overrides, setOverrides] = useState<UserPrivacyOverride[]>([]);
  const [ghostModeUsers, setGhostModeUsers] = useState<GhostModeUser[]>([]);
  const [dataRequests, setDataRequests] = useState<DataRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    loadPrivacyData();
  }, []);

  const loadPrivacyData = async () => {
    try {
      setLoading(true);

      // Load privacy settings
      const settingsResponse = await fetch('/api/admin/privacy/settings');
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        setSettings(settingsData.settings || []);
      }

      // Load user overrides
      const overridesResponse = await fetch('/api/admin/privacy/overrides');
      if (overridesResponse.ok) {
        const overridesData = await overridesResponse.json();
        setOverrides(overridesData.overrides || []);
      }

      // Load ghost mode users
      const ghostResponse = await fetch('/api/admin/privacy/ghost-mode');
      if (ghostResponse.ok) {
        const ghostData = await ghostResponse.json();
        setGhostModeUsers(ghostData.users || []);
      }

      // Load data requests
      const requestsResponse = await fetch('/api/admin/privacy/data-requests');
      if (requestsResponse.ok) {
        const requestsData = await requestsResponse.json();
        setDataRequests(requestsData.requests || []);
      }
    } catch (error) {
      logger.error('Error loading privacy data:', { error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  const updatePrivacySetting = async (settingId: string, value: boolean) => {
    try {
      const response = await fetch(`/api/admin/privacy/settings/${settingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
      });

      if (response.ok) {
        setSettings(prev => 
          prev.map(s => s.id === settingId ? { ...s, currentValue: value } : s)
        );
      }
    } catch (error) {
      logger.error('Error updating privacy setting:', { error: String(error) });
    }
  };

  const handleDataRequest = async (requestId: string, action: 'approve' | 'reject') => {
    try {
      const response = await fetch(`/api/admin/privacy/data-requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });

      if (response.ok) {
        await loadPrivacyData();
      }
    } catch (error) {
      logger.error('Error handling data request:', { error: String(error) });
    }
  };

  const disableGhostMode = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/privacy/ghost-mode/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setGhostModeUsers(prev => prev.filter(u => u.id !== userId));
      }
    } catch (error) {
      logger.error('Error disabling ghost mode:', { error: String(error) });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'profile': return <UserCheck className="h-4 w-4" />;
      case 'content': return <FileText className="h-4 w-4" />;
      case 'data': return <Shield className="h-4 w-4" />;
      case 'communication': return <Globe className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Privacy Controls</h2>
          <p className="text-muted-foreground">Manage user privacy and data protection</p>
        </div>
        <Button onClick={loadPrivacyData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Privacy Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{settings.length}</div>
            <p className="text-xs text-muted-foreground">
              {settings.filter(s => s.currentValue).length} enabled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">User Overrides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overrides.length}</div>
            <p className="text-xs text-muted-foreground">Custom settings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Ghost Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ghostModeUsers.length}</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Data Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {dataRequests.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="overrides">Overrides</TabsTrigger>
          <TabsTrigger value="ghost">Ghost Mode</TabsTrigger>
          <TabsTrigger value="requests">Data Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Privacy Settings</CardTitle>
              <CardDescription>
                Configure default privacy settings for all users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['profile', 'content', 'data', 'communication'].map(category => (
                  <div key={category}>
                    <h4 className="font-semibold text-sm mb-3 flex items-center">
                      {getCategoryIcon(category)}
                      <span className="ml-2 capitalize">{category} Settings</span>
                    </h4>
                    <div className="space-y-3 pl-6">
                      {settings
                        .filter(s => s.category === category)
                        .map(setting => (
                          <div key={setting.id} className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-sm">{setting.name}</p>
                                {setting.currentValue !== setting.defaultValue && (
                                  <Badge variant="secondary" className="text-xs">Modified</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {setting.description}
                              </p>
                              <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                                <span>{setting.affectedUsers} users affected</span>
                                <span>•</span>
                                <span>Modified {new Date(setting.lastModified).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <Switch
                              checked={setting.currentValue}
                              onCheckedChange={(checked) => updatePrivacySetting(setting.id, checked)}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overrides" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Privacy Overrides</CardTitle>
              <CardDescription>
                Custom privacy settings for specific users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {overrides.length === 0 ? (
                <div className="text-center py-8">
                  <UserX className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground">No user overrides configured</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {overrides.map(override => (
                    <div key={`${override.userId}-${override.setting}`} className="border rounded p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{override.userEmail}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {override.setting}: {override.value ? 'Enabled' : 'Disabled'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Reason: {override.reason}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Set by {override.createdBy} on {new Date(override.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ghost" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ghost Mode Users</CardTitle>
              <CardDescription>
                Users with enhanced privacy protection
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ghostModeUsers.length === 0 ? (
                <div className="text-center py-8">
                  <EyeOff className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground">No users in ghost mode</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {ghostModeUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between border rounded p-3">
                      <div>
                        <p className="font-medium text-sm">{user.email}</p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                          <span>Enabled: {new Date(user.enabledAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>Duration: {user.duration}</span>
                          <span>•</span>
                          <span>Reason: {user.reason}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => disableGhostMode(user.id)}
                      >
                        Disable
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Access Requests</CardTitle>
              <CardDescription>
                User data export and deletion requests (GDPR/CCPA compliance)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dataRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Download className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-muted-foreground">No pending data requests</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dataRequests.map(request => (
                    <div key={request.id} className="border rounded p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-sm">{request.userEmail}</p>
                            <Badge variant={request.type === 'deletion' ? 'destructive' : 'default'}>
                              {request.type === 'deletion' ? 'Deletion' : 'Export'} Request
                            </Badge>
                            <Badge variant={
                              request.status === 'completed' ? 'default' :
                              request.status === 'failed' ? 'destructive' :
                              request.status === 'processing' ? 'secondary' :
                              'outline'
                            }>
                              {request.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                            <span>Requested: {new Date(request.requestedAt).toLocaleDateString()}</span>
                            {request.completedAt && (
                              <>
                                <span>•</span>
                                <span>Completed: {new Date(request.completedAt).toLocaleDateString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {request.status === 'pending' && (
                            <>
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => handleDataRequest(request.id, 'approve')}
                              >
                                Process
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDataRequest(request.id, 'reject')}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {request.status === 'completed' && request.downloadUrl && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}