"use client";

import { useState, useEffect } from "react";
import { 
  HiveCard as Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  HiveButton as Button,
  Badge,
  Alert,
  AlertDescription,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Label,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@hive/ui";
import { 
  AlertTriangle,
  Shield,
  Zap,
  Lock,
  Unlock,
  Bell,
  Settings,
  CheckCircle,
  Siren,
  PhoneCall
} from "lucide-react";
import { useAdminAuth } from "../lib/auth";
import { toast } from "sonner";

interface EmergencyAction {
  id: string;
  name: string;
  description: string;
  type: 'kill_switch' | 'rate_limit' | 'maintenance' | 'lockdown' | 'notification';
  severity: 'low' | 'medium' | 'high' | 'critical';
  isActive: boolean;
  lastActivated?: Date;
  activatedBy?: string;
  reason?: string;
  affectedUsers?: number;
  estimatedImpact?: string;
  rollbackable: boolean;
}

interface SystemLockdown {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  components: string[];
  severity: 'partial' | 'full';
  reason?: string;
  activatedAt?: Date;
  activatedBy?: string;
  estimatedDuration?: number;
}

interface EmergencyLog {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  reason: string;
  impact: string;
  status: 'executed' | 'rolled_back' | 'failed';
}

export function EmergencyResponseCenter() {
  const { admin } = useAdminAuth();
  const [emergencyActions, setEmergencyActions] = useState<EmergencyAction[]>([]);
  const [systemLockdowns, setSystemLockdowns] = useState<SystemLockdown[]>([]);
  const [emergencyLogs, setEmergencyLogs] = useState<EmergencyLog[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showConfirmDialog, setShowConfirmDialog] = useState<EmergencyAction | null>(null);
  const [confirmReason, setConfirmReason] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeEmergencySystem();
  }, []);

  const initializeEmergencySystem = () => {
    const mockActions: EmergencyAction[] = [
      {
        id: 'platform-kill',
        name: 'Platform Kill Switch',
        description: 'Immediately disable all user access to the platform',
        type: 'kill_switch',
        severity: 'critical',
        isActive: false,
        rollbackable: true,
        estimatedImpact: 'Complete platform outage'
      },
      {
        id: 'registration-kill',
        name: 'Registration Kill Switch',
        description: 'Disable new user registrations',
        type: 'kill_switch',
        severity: 'medium',
        isActive: false,
        rollbackable: true,
        estimatedImpact: 'New users cannot register'
      },
      {
        id: 'content-creation-kill',
        name: 'Content Creation Kill Switch',
        description: 'Disable all content creation (posts, comments, spaces)',
        type: 'kill_switch',
        severity: 'high',
        isActive: false,
        rollbackable: true,
        estimatedImpact: 'Users cannot create new content'
      },
      {
        id: 'messaging-kill',
        name: 'Messaging Kill Switch',
        description: 'Disable all messaging and real-time features',
        type: 'kill_switch',
        severity: 'high',
        isActive: false,
        rollbackable: true,
        estimatedImpact: 'No messaging or real-time updates'
      },
      {
        id: 'api-rate-limit',
        name: 'Emergency Rate Limiting',
        description: 'Severely limit API requests to prevent abuse',
        type: 'rate_limit',
        severity: 'medium',
        isActive: false,
        rollbackable: true,
        estimatedImpact: 'Slower platform performance'
      },
      {
        id: 'maintenance-mode',
        name: 'Maintenance Mode',
        description: 'Put platform in maintenance mode with custom message',
        type: 'maintenance',
        severity: 'high',
        isActive: false,
        rollbackable: true,
        estimatedImpact: 'Platform unavailable with maintenance page'
      },
      {
        id: 'emergency-broadcast',
        name: 'Emergency Broadcast',
        description: 'Send critical notification to all users',
        type: 'notification',
        severity: 'low',
        isActive: false,
        rollbackable: false,
        estimatedImpact: 'All users receive notification'
      }
    ];

    const mockLockdowns: SystemLockdown[] = [
      {
        id: 'security-lockdown',
        name: 'Security Lockdown',
        description: 'Lock all security-sensitive operations',
        isActive: false,
        components: ['authentication', 'user-management', 'permissions'],
        severity: 'full'
      },
      {
        id: 'content-lockdown',
        name: 'Content Lockdown',
        description: 'Lock all content-related operations',
        isActive: false,
        components: ['posts', 'comments', 'spaces', 'tools'],
        severity: 'partial'
      },
      {
        id: 'data-lockdown',
        name: 'Data Lockdown',
        description: 'Lock all data modification operations',
        isActive: false,
        components: ['database-writes', 'file-uploads', 'profile-updates'],
        severity: 'full'
      }
    ];

    const mockLogs: EmergencyLog[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        action: 'Emergency Rate Limiting Activated',
        user: 'admin@hive.com',
        reason: 'Suspected DDoS attack',
        impact: 'API requests limited to 10/minute per user',
        status: 'executed'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        action: 'Emergency Rate Limiting Deactivated',
        user: 'admin@hive.com',
        reason: 'Attack mitigated, returning to normal',
        impact: 'Normal API limits restored',
        status: 'rolled_back'
      }
    ];

    setEmergencyActions(mockActions);
    setSystemLockdowns(mockLockdowns);
    setEmergencyLogs(mockLogs);
  };

  const handleEmergencyAction = async (action: EmergencyAction, reason: string) => {
    if (!admin) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update action status
      setEmergencyActions(prev => prev.map(a => 
        a.id === action.id ? {
          ...a,
          isActive: !a.isActive,
          lastActivated: new Date(),
          activatedBy: admin.email,
          reason: reason
        } : a
      ));

      // Add to logs
      const logEntry: EmergencyLog = {
        id: Date.now().toString(),
        timestamp: new Date(),
        action: `${action.name} ${action.isActive ? 'Deactivated' : 'Activated'}`,
        user: admin.email,
        reason: reason,
        impact: action.estimatedImpact || 'Unknown impact',
        status: 'executed'
      };

      setEmergencyLogs(prev => [logEntry, ...prev]);

      toast.success(`${action.name} ${action.isActive ? 'deactivated' : 'activated'} successfully`);
      setShowConfirmDialog(null);
      setConfirmReason("");
    } catch (error) {
      console.error('Emergency action failed:', error);
      toast.error('Emergency action failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSystemLockdown = async (lockdown: SystemLockdown, reason: string) => {
    if (!admin) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update lockdown status
      setSystemLockdowns(prev => prev.map(l => 
        l.id === lockdown.id ? {
          ...l,
          isActive: !l.isActive,
          activatedAt: new Date(),
          activatedBy: admin.email,
          reason: reason
        } : l
      ));

      toast.success(`${lockdown.name} ${lockdown.isActive ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error('System lockdown failed:', error);
      toast.error('System lockdown failed');
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400 border-green-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'critical': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'kill_switch': return <Zap className="w-5 h-5" />;
      case 'rate_limit': return <Shield className="w-5 h-5" />;
      case 'maintenance': return <Settings className="w-5 h-5" />;
      case 'lockdown': return <Lock className="w-5 h-5" />;
      case 'notification': return <Bell className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const activeActions = emergencyActions.filter(a => a.isActive);
  const activeLockdowns = systemLockdowns.filter(l => l.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Siren className="w-6 h-6 text-red-400" />
            Emergency Response Center
          </h2>
          <p className="text-gray-400">Critical system controls and emergency procedures</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeActions.length > 0 || activeLockdowns.length > 0 
              ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
              : 'bg-green-500/20 text-green-400 border border-green-500/30'
          }`}>
            {activeActions.length > 0 || activeLockdowns.length > 0 
              ? `${activeActions.length + activeLockdowns.length} Active Controls` 
              : 'All Systems Normal'
            }
          </div>
        </div>
      </div>

      {/* Active Emergencies Alert */}
      {(activeActions.length > 0 || activeLockdowns.length > 0) && (
        <Alert className="border-red-500/50 bg-red-500/10">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <AlertDescription className="text-red-300">
            <div className="flex items-center justify-between">
              <div>
                <strong>Emergency Controls Active:</strong> {activeActions.length} actions, {activeLockdowns.length} lockdowns
              </div>
              <Button variant="ghost" size="sm" className="text-red-300 hover:text-red-200">
                <PhoneCall className="w-4 h-4 mr-1" />
                Contact Support
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-800 border-gray-700">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kill-switches">Kill Switches</TabsTrigger>
          <TabsTrigger value="lockdowns">System Lockdowns</TabsTrigger>
          <TabsTrigger value="logs">Emergency Logs</TabsTrigger>
          <TabsTrigger value="procedures">Procedures</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-red-700 bg-red-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-300">Platform Kill Switch</p>
                    <p className="text-2xl font-bold text-white">
                      {emergencyActions.find(a => a.id === 'platform-kill')?.isActive ? 'ACTIVE' : 'READY'}
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-700 bg-yellow-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-300">Rate Limiting</p>
                    <p className="text-2xl font-bold text-white">
                      {emergencyActions.find(a => a.id === 'api-rate-limit')?.isActive ? 'ACTIVE' : 'NORMAL'}
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-700 bg-orange-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-300">Maintenance Mode</p>
                    <p className="text-2xl font-bold text-white">
                      {emergencyActions.find(a => a.id === 'maintenance-mode')?.isActive ? 'ACTIVE' : 'OFF'}
                    </p>
                  </div>
                  <Settings className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-700 bg-purple-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-300">System Lockdowns</p>
                    <p className="text-2xl font-bold text-white">{activeLockdowns.length}</p>
                  </div>
                  <Lock className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Emergency Actions */}
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Active Emergency Controls</CardTitle>
            </CardHeader>
            <CardContent>
              {activeActions.length === 0 && activeLockdowns.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-400">No emergency controls are currently active</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeActions.map(action => (
                    <div key={action.id} className="border border-red-500/30 rounded-lg p-4 bg-red-500/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getActionIcon(action.type)}
                          <div>
                            <h4 className="font-medium text-white">{action.name}</h4>
                            <p className="text-sm text-red-300">{action.reason}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Activated {action.lastActivated?.toLocaleString()} by {action.activatedBy}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setShowConfirmDialog(action)}
                        >
                          Deactivate
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {activeLockdowns.map(lockdown => (
                    <div key={lockdown.id} className="border border-purple-500/30 rounded-lg p-4 bg-purple-500/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5" />
                          <div>
                            <h4 className="font-medium text-white">{lockdown.name}</h4>
                            <p className="text-sm text-purple-300">{lockdown.reason}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Activated {lockdown.activatedAt?.toLocaleString()} by {lockdown.activatedBy}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleSystemLockdown(lockdown, "Manual deactivation")}
                        >
                          Unlock
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kill-switches" className="space-y-6">
          <div className="grid gap-4">
            {emergencyActions.filter(a => a.type === 'kill_switch').map(action => (
              <Card key={action.id} className="border-gray-700 bg-gray-900/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getActionIcon(action.type)}
                        <h4 className="font-medium text-white text-lg">{action.name}</h4>
                        <Badge className={getSeverityColor(action.severity)}>
                          {action.severity.toUpperCase()}
                        </Badge>
                        {action.isActive && (
                          <Badge variant="destructive">ACTIVE</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mb-3">{action.description}</p>
                      
                      <div className="text-sm text-gray-400">
                        <p><strong>Impact:</strong> {action.estimatedImpact}</p>
                        {action.lastActivated && (
                          <p><strong>Last Used:</strong> {action.lastActivated.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant={action.isActive ? "destructive" : "default"}
                        onClick={() => setShowConfirmDialog(action)}
                        disabled={loading}
                        className={action.isActive ? "" : "bg-red-600 hover:bg-red-700"}
                      >
                        {action.isActive ? (
                          <>
                            <Unlock className="w-4 h-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Zap className="w-4 h-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {action.isActive && action.reason && (
                    <Alert className="mt-4 border-red-500/50 bg-red-500/10">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <AlertDescription className="text-red-300">
                        <strong>Active Reason:</strong> {action.reason}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="lockdowns" className="space-y-6">
          <div className="grid gap-4">
            {systemLockdowns.map(lockdown => (
              <Card key={lockdown.id} className="border-gray-700 bg-gray-900/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Lock className="w-5 h-5" />
                        <h4 className="font-medium text-white text-lg">{lockdown.name}</h4>
                        <Badge className={lockdown.severity === 'full' ? 'text-red-400 border-red-400' : 'text-yellow-400 border-yellow-400'}>
                          {lockdown.severity.toUpperCase()}
                        </Badge>
                        {lockdown.isActive && (
                          <Badge variant="destructive">ACTIVE</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mb-3">{lockdown.description}</p>
                      
                      <div className="text-sm text-gray-400">
                        <p><strong>Components:</strong> {lockdown.components.join(', ')}</p>
                        {lockdown.activatedAt && (
                          <p><strong>Activated:</strong> {lockdown.activatedAt.toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant={lockdown.isActive ? "destructive" : "default"}
                        onClick={() => setShowConfirmDialog({ ...lockdown, type: 'lockdown', severity: lockdown.severity === 'full' ? 'critical' : 'medium', rollbackable: true } as any)}
                        disabled={loading}
                        className={lockdown.isActive ? "" : "bg-purple-600 hover:bg-purple-700"}
                      >
                        {lockdown.isActive ? (
                          <>
                            <Unlock className="w-4 h-4 mr-2" />
                            Unlock
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Activate
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  {lockdown.isActive && lockdown.reason && (
                    <Alert className="mt-4 border-purple-500/50 bg-purple-500/10">
                      <Lock className="w-4 h-4 text-purple-400" />
                      <AlertDescription className="text-purple-300">
                        <strong>Active Reason:</strong> {lockdown.reason}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Emergency Action Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyLogs.map(log => (
                  <div key={log.id} className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-white">{log.action}</h4>
                          <Badge className={
                            log.status === 'executed' ? 'text-green-400 border-green-400' :
                            log.status === 'rolled_back' ? 'text-yellow-400 border-yellow-400' :
                            'text-red-400 border-red-400'
                          }>
                            {log.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-300 mb-2">{log.reason}</p>
                        <p className="text-sm text-gray-400 mb-2">{log.impact}</p>
                        
                        <div className="text-xs text-gray-500">
                          {log.timestamp.toLocaleString()} by {log.user}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedures" className="space-y-6">
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader>
              <CardTitle className="text-white">Emergency Response Procedures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border border-red-500/30 rounded-lg p-4 bg-red-500/10">
                  <h4 className="font-semibold text-red-300 mb-2">🚨 Platform-Wide Emergency</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                    <li>Activate Platform Kill Switch immediately</li>
                    <li>Assess the severity and scope of the issue</li>
                    <li>Contact technical lead and stakeholders</li>
                    <li>Document the incident and response actions</li>
                    <li>Prepare user communication</li>
                    <li>Work on resolution while system is down</li>
                    <li>Test fix thoroughly before reactivation</li>
                  </ol>
                </div>

                <div className="border border-yellow-500/30 rounded-lg p-4 bg-yellow-500/10">
                  <h4 className="font-semibold text-yellow-300 mb-2">⚠️ Security Incident</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                    <li>Activate Security Lockdown</li>
                    <li>Preserve evidence and logs</li>
                    <li>Identify affected systems and users</li>
                    <li>Implement additional security measures</li>
                    <li>Begin forensic investigation</li>
                    <li>Prepare incident report</li>
                    <li>Plan communication to affected users</li>
                  </ol>
                </div>

                <div className="border border-orange-500/30 rounded-lg p-4 bg-orange-500/10">
                  <h4 className="font-semibold text-orange-300 mb-2">📊 Performance Issues</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                    <li>Activate Emergency Rate Limiting</li>
                    <li>Monitor system metrics closely</li>
                    <li>Identify performance bottlenecks</li>
                    <li>Scale resources if possible</li>
                    <li>Consider maintenance mode if severe</li>
                    <li>Implement permanent fix</li>
                    <li>Gradually return to normal limits</li>
                  </ol>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-white">Emergency Contacts</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-gray-400">Technical Lead</p>
                    <p className="text-white">tech-lead@hive.com</p>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-gray-400">Security Team</p>
                    <p className="text-white">security@hive.com</p>
                    <p className="text-gray-400">+1 (555) 123-4568</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <Dialog open={true} onOpenChange={() => setShowConfirmDialog(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                Confirm Emergency Action
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Alert className="border-yellow-500/50 bg-yellow-500/10">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <AlertDescription className="text-yellow-300">
                  You are about to {showConfirmDialog.isActive ? 'deactivate' : 'activate'} <strong>{showConfirmDialog.name}</strong>.
                  {!showConfirmDialog.isActive && (
                    <div className="mt-2">
                      <strong>Expected Impact:</strong> {showConfirmDialog.estimatedImpact}
                    </div>
                  )}
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for this action (required)</Label>
                <Textarea
                  id="reason"
                  value={confirmReason}
                  onChange={(e) => setConfirmReason(e.target.value)}
                  placeholder="Explain why this emergency action is necessary..."
                  className="bg-gray-800 border-gray-600"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowConfirmDialog(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleEmergencyAction(showConfirmDialog, confirmReason)}
                  disabled={!confirmReason.trim() || loading}
                >
                  {loading ? 'Processing...' : `${showConfirmDialog.isActive ? 'Deactivate' : 'Activate'}`}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}