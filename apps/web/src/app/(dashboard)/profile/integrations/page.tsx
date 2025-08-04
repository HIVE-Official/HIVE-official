"use client";

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { Button, Card, 
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger  } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { 
  User, 
  Link,
  Check,
  X,
  AlertTriangle,
  RefreshCw,
  Settings,
  Shield,
  Calendar,
  Mail,
  Globe,
  Zap,
  BookOpen,
  Coffee,
  Car,
  Activity,
  Eye,
  Plus
} from 'lucide-react';
import { ErrorBoundary } from '../../../../components/error-boundary';
// import { useSession } from '../../../../hooks/use-session';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'productivity' | 'communication' | 'campus-life';
  provider: string;
  icon: any;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  isRequired?: boolean;
  isRecommended?: boolean;
  connectedAt?: string;
  lastSync?: string;
  syncFrequency: 'real-time' | 'hourly' | 'daily' | 'manual';
  permissions: string[];
  dataShared: string[];
  features: string[];
  troubleshooting?: {
    commonIssue: string;
    solution: string;
  };
}

interface IntegrationHealth {
  totalIntegrations: number;
  connectedIntegrations: number;
  healthyIntegrations: number;
  lastSyncErrors: number;
  dataFreshness: number; // 0-100
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'university-sis',
    name: 'University Student Information System',
    description: 'Access your academic records, grades, and course schedules',
    category: 'academic',
    provider: 'University IT',
    icon: BookOpen,
    status: 'connected',
    isRequired: true,
    connectedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    syncFrequency: 'daily',
    permissions: ['academic-records-read', 'schedule-read', 'grades-read'],
    dataShared: ['Course enrollment', 'Grades', 'Academic standing', 'Schedule'],
    features: ['Grade tracking', 'Schedule sync', 'Academic progress']
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync your personal calendar with HIVE for unified scheduling',
    category: 'productivity',
    provider: 'Google',
    icon: Calendar,
    status: 'connected',
    isRecommended: true,
    connectedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    lastSync: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    syncFrequency: 'real-time',
    permissions: ['calendar-read', 'calendar-write', 'events-modify'],
    dataShared: ['Events', 'Availability', 'Calendar preferences'],
    features: ['Unified calendar view', 'Conflict detection', 'Smart scheduling']
  },
  {
    id: 'university-email',
    name: 'University Email',
    description: 'Integrate with your student email for notifications and updates',
    category: 'communication',
    provider: 'University IT',
    icon: Mail,
    status: 'connected',
    isRecommended: true,
    connectedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    lastSync: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    syncFrequency: 'hourly',
    permissions: ['email-read', 'notifications-send'],
    dataShared: ['Email notifications', 'University communications'],
    features: ['Smart notifications', 'Email digest', 'Priority filtering']
  },
  {
    id: 'dining-services',
    name: 'Campus Dining Services',
    description: 'Track meal plan usage and dining hall information',
    category: 'campus-life',
    provider: 'Campus Dining',
    icon: Coffee,
    status: 'error',
    connectedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    lastSync: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    syncFrequency: 'daily',
    permissions: ['dining-data-read', 'meal-plan-read'],
    dataShared: ['Meal plan balance', 'Dining preferences', 'Usage history'],
    features: ['Meal plan tracking', 'Dining recommendations', 'Wait time alerts'],
    troubleshooting: {
      commonIssue: 'Authentication expired',
      solution: 'Reconnect your dining services account'
    }
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft Office 365',
    description: 'Access your OneDrive files and Office applications',
    category: 'productivity',
    provider: 'Microsoft',
    icon: Globe,
    status: 'disconnected',
    syncFrequency: 'real-time',
    permissions: ['files-read', 'files-write', 'office-apps-access'],
    dataShared: ['Documents', 'Spreadsheets', 'Presentations', 'Notes'],
    features: ['Document integration', 'Real-time collaboration', 'File sync']
  },
  {
    id: 'campus-parking',
    name: 'Campus Parking System',
    description: 'Monitor parking permits and find available spots',
    category: 'campus-life',
    provider: 'Parking Services',
    icon: Car,
    status: 'disconnected',
    syncFrequency: 'hourly',
    permissions: ['parking-data-read', 'location-access'],
    dataShared: ['Parking permits', 'Violation history', 'Preferred locations'],
    features: ['Spot availability', 'Permit tracking', 'Violation alerts']
  }
];

const INTEGRATION_HEALTH: IntegrationHealth = {
  totalIntegrations: 6,
  connectedIntegrations: 4,
  healthyIntegrations: 3,
  lastSyncErrors: 1,
  dataFreshness: 87
};

export default function ProfileIntegrationsPage() {
  // Future navigation and user functionality placeholders
  // const router = useRouter();
  // const { user } = useSession();
  
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS);
  const [health, setHealth] = useState<IntegrationHealth>(INTEGRATION_HEALTH);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleConnect = async (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: 'syncing' as const,
            connectedAt: new Date().toISOString()
          }
        : integration
    ));

    // Simulate connection process
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'connected' as const,
              lastSync: new Date().toISOString()
            }
          : integration
      ));
      
      setHealth(prev => ({
        ...prev,
        connectedIntegrations: prev.connectedIntegrations + 1,
        healthyIntegrations: prev.healthyIntegrations + 1
      }));
    }, 2000);
  };

  const handleDisconnect = async (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: 'disconnected' as const,
            connectedAt: undefined,
            lastSync: undefined
          }
        : integration
    ));
    
    setHealth(prev => ({
      ...prev,
      connectedIntegrations: prev.connectedIntegrations - 1,
      healthyIntegrations: prev.healthyIntegrations - 1
    }));
  };

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    
    // Simulate refresh process
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => 
        integration.status === 'connected' 
          ? { ...integration, lastSync: new Date().toISOString() }
          : integration
      ));
      setIsRefreshing(false);
    }, 3000);
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'syncing': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return <Check className="h-4 w-4 text-green-400" />;
      case 'error': return <X className="h-4 w-4 text-red-400" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 text-yellow-400 animate-spin" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getCategoryIcon = (category: Integration['category']) => {
    switch (category) {
      case 'academic': return BookOpen;
      case 'productivity': return Zap;
      case 'communication': return Mail;
      case 'campus-life': return Coffee;
      default: return Globe;
    }
  };

  // Future functionality - show connected integrations count
  // const connectedIntegrations = integrations.filter(i => i.status === 'connected');
  const errorIntegrations = integrations.filter(i => i.status === 'error');

  return (
    <ErrorBoundary>
      <PageContainer
        title="External Integrations"
        subtitle="Connect HIVE with your campus and productivity services"
        breadcrumbs={[
          { label: "Profile", icon: User, href: "/profile" },
          { label: "Integrations" }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefreshAll}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh All
            </Button>
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Privacy Settings
            </Button>
          </div>
        }
        maxWidth="xl"
      >
        <div className="space-y-6">
          {/* Integration Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
              <Link className="h-6 w-6 mx-auto mb-2 text-blue-400" />
              <div className="text-lg font-bold text-white">{health.connectedIntegrations}/{health.totalIntegrations}</div>
              <div className="text-xs text-hive-text-mutedLight">Connected</div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <Activity className="h-6 w-6 mx-auto mb-2 text-green-400" />
              <div className="text-lg font-bold text-white">{health.healthyIntegrations}</div>
              <div className="text-xs text-hive-text-mutedLight">Healthy</div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-400" />
              <div className="text-lg font-bold text-white">{health.lastSyncErrors}</div>
              <div className="text-xs text-hive-text-mutedLight">Sync Errors</div>
            </Card>
            
            <Card className="p-4 text-center bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <RefreshCw className="h-6 w-6 mx-auto mb-2 text-purple-400" />
              <div className="text-lg font-bold text-white">{health.dataFreshness}%</div>
              <div className="text-xs text-hive-text-mutedLight">Data Freshness</div>
            </Card>
          </div>

          {/* Error Alerts */}
          {errorIntegrations.length > 0 && (
            <Card className="p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/20">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div>
                  <p className="text-white font-medium">Integration Issues Detected</p>
                  <p className="text-sm text-red-200">
                    {errorIntegrations.length} integration{errorIntegrations.length > 1 ? 's' : ''} need{errorIntegrations.length === 1 ? 's' : ''} attention
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto border-red-500 text-red-400 hover:bg-red-500/10">
                  Fix Issues
                </Button>
              </div>
            </Card>
          )}

          {/* Main Integration Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({integrations.length})</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="productivity">Productivity</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="campus-life">Campus Life</TabsTrigger>
            </TabsList>

            {/* All Integrations */}
            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {integrations.map((integration) => {
                  const IconComponent = integration.icon;
                  const CategoryIcon = getCategoryIcon(integration.category);
                  
                  return (
                    <Card key={integration.id} className="p-6 bg-hive-background-overlay border-hive-border-default">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white flex items-center space-x-2">
                              <span>{integration.name}</span>
                              {integration.isRequired && (
                                <Badge variant="secondary" className="text-xs">Required</Badge>
                              )}
                              {integration.isRecommended && (
                                <Badge variant="outline" className="text-xs">Recommended</Badge>
                              )}
                            </h3>
                            <p className="text-sm text-hive-text-mutedLight">by {integration.provider}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(integration.status)}
                          <Button variant="ghost" size="sm" className="p-1">
                            <Settings className="h-4 w-4 text-hive-text-mutedLight" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-hive-text-mutedLight mb-4">{integration.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 text-xs text-hive-text-mutedLight">
                          <div className="flex items-center space-x-1">
                            <CategoryIcon className="h-3 w-3" />
                            <span className="capitalize">{integration.category.replace('-', ' ')}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <RefreshCw className="h-3 w-3" />
                            <span className="capitalize">{integration.syncFrequency}</span>
                          </div>
                        </div>
                        <div className={`text-xs font-medium ${getStatusColor(integration.status)} capitalize`}>
                          {integration.status}
                        </div>
                      </div>
                      
                      {integration.status === 'connected' && integration.lastSync && (
                        <div className="text-xs text-hive-text-mutedLight mb-4">
                          Last sync: {formatTimeAgo(integration.lastSync)}
                        </div>
                      )}
                      
                      {integration.status === 'error' && integration.troubleshooting && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
                          <p className="text-sm text-white font-medium">{integration.troubleshooting.commonIssue}</p>
                          <p className="text-xs text-red-200">{integration.troubleshooting.solution}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-hive-text-mutedLight">
                          {integration.features.length} features • {integration.dataShared.length} data types
                        </div>
                        <div className="flex items-center space-x-2">
                          {integration.status === 'connected' ? (
                            <>
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3 mr-1" />
                                Manage
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDisconnect(integration.id)}
                                className="text-red-400 hover:bg-red-400/10"
                                disabled={integration.isRequired}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleConnect(integration.id)}
                              disabled={integration.status === 'syncing'}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Category-specific tabs */}
            {(['academic', 'productivity', 'communication', 'campus-life'] as const).map((category) => (
              <TabsContent key={category} value={category} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {integrations
                    .filter(integration => integration.category === category)
                    .map((integration) => {
                      const IconComponent = integration.icon;
                      
                      return (
                        <Card key={integration.id} className="p-6 bg-hive-background-overlay border-hive-border-default">
                          {/* Same card content as above */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-white">{integration.name}</h3>
                                <p className="text-sm text-hive-text-mutedLight">by {integration.provider}</p>
                              </div>
                            </div>
                            {getStatusIcon(integration.status)}
                          </div>
                          
                          <p className="text-sm text-hive-text-mutedLight mb-4">{integration.description}</p>
                          
                          <div className="space-y-2 mb-4">
                            <div className="text-xs text-white font-medium">Features:</div>
                            <div className="flex flex-wrap gap-1">
                              {integration.features.slice(0, 3).map((feature) => (
                                <Badge key={feature} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-hive-text-mutedLight">
                              Sync: {integration.syncFrequency}
                            </div>
                            <div className="flex items-center space-x-2">
                              {integration.status === 'connected' ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDisconnect(integration.id)}
                                  className="text-red-400"
                                >
                                  Disconnect
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleConnect(integration.id)}
                                >
                                  Connect
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Privacy & Data Information */}
          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Privacy & Data Control
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-white mb-2">Data You Control</h4>
                <ul className="text-sm text-hive-text-mutedLight space-y-1">
                  <li>• You can disconnect any non-required integration at any time</li>
                  <li>• Data is only shared with your explicit permission</li>
                  <li>• All data transfers are encrypted and secure</li>
                  <li>• You can audit what data each service accesses</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Integration Benefits</h4>
                <ul className="text-sm text-hive-text-mutedLight space-y-1">
                  <li>• Unified view of your campus digital life</li>
                  <li>• Smart recommendations based on your data</li>
                  <li>• Automated workflows between services</li>
                  <li>• Better insights into your productivity patterns</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </PageContainer>
    </ErrorBoundary>
  );
}