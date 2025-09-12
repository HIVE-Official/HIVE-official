"use client";

import { useState, useEffect } from "react";
import { 
  HiveCard as Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  HiveButton as Button,
  Badge,
  Input,
  Textarea,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Alert,
  AlertDescription
} from "@hive/ui";
import { 
  Settings,
  Plus,
  Search,
  Edit,
  Save,
  Shield,
  Zap,
  AlertTriangle,
  XCircle,
  Lock,
  FileText,
  BarChart3,
  Eye,
  History
} from "lucide-react";
import { PlatformConfig, featureFlagService } from "../lib/feature-flags";
import { useAdminAuth } from "../lib/auth";
import { toast } from "sonner";

interface ConfigCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  configs: PlatformConfig[];
}

export function PlatformConfigManager() {
  const { admin } = useAdminAuth();
  const [configCategories, setConfigCategories] = useState<ConfigCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingConfig, setEditingConfig] = useState<PlatformConfig | null>(null);
  const [showHistoryDialog, setShowHistoryDialog] = useState<PlatformConfig | null>(null);

  useEffect(() => {
    initializePlatformConfigs();
  }, []);

  const initializePlatformConfigs = async () => {
    try {
      // In production, this would fetch from featureFlagService.getAllPlatformConfigs()
      const mockConfigs: PlatformConfig[] = [
        // Features Category
        {
          id: 'feature-registration',
          category: 'features',
          key: 'registration.enabled',
          value: true,
          type: 'boolean',
          description: 'Allow new user registrations',
          environment: 'all',
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },
        {
          id: 'feature-messaging',
          category: 'features',
          key: 'messaging.enabled',
          value: true,
          type: 'boolean',
          description: 'Enable real-time messaging features',
          environment: 'all',
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },
        {
          id: 'feature-spaces',
          category: 'features',
          key: 'spaces.creation.enabled',
          value: true,
          type: 'boolean',
          description: 'Allow users to create new spaces',
          environment: 'all',
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },

        // Limits Category
        {
          id: 'limits-rate-api',
          category: 'limits',
          key: 'rate_limits.api.requests_per_minute',
          value: 60,
          type: 'number',
          description: 'API requests per minute per user',
          environment: 'all',
          validation: { min: 1, max: 1000 },
          isEmergencyActive: false,
          emergencyValue: 10,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },
        {
          id: 'limits-file-upload',
          category: 'limits',
          key: 'file_upload.max_size_mb',
          value: 10,
          type: 'number',
          description: 'Maximum file upload size in MB',
          environment: 'all',
          validation: { min: 1, max: 100 },
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },
        {
          id: 'limits-space-members',
          category: 'limits',
          key: 'spaces.max_members',
          value: 500,
          type: 'number',
          description: 'Maximum members per space',
          environment: 'all',
          validation: { min: 10, max: 10000 },
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },

        // Content Category
        {
          id: 'content-moderation',
          category: 'content',
          key: 'moderation.auto_flag.enabled',
          value: true,
          type: 'boolean',
          description: 'Enable automatic content flagging',
          environment: 'all',
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },
        {
          id: 'content-post-length',
          category: 'content',
          key: 'posts.max_length',
          value: 2000,
          type: 'number',
          description: 'Maximum characters per post',
          environment: 'all',
          validation: { min: 100, max: 10000 },
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },

        // Security Category
        {
          id: 'security-session',
          category: 'security',
          key: 'auth.session_timeout_minutes',
          value: 60,
          type: 'number',
          description: 'User session timeout in minutes',
          environment: 'all',
          validation: { min: 5, max: 720 },
          isEmergencyActive: false,
          emergencyValue: 15,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },
        {
          id: 'security-password',
          category: 'security',
          key: 'auth.password_min_length',
          value: 8,
          type: 'number',
          description: 'Minimum password length requirement',
          environment: 'all',
          validation: { min: 6, max: 128 },
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },

        // Performance Category
        {
          id: 'performance-cache',
          category: 'performance',
          key: 'cache.default_ttl_seconds',
          value: 300,
          type: 'number',
          description: 'Default cache TTL in seconds',
          environment: 'all',
          validation: { min: 30, max: 3600 },
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        },

        // UI Category
        {
          id: 'ui-theme',
          category: 'ui',
          key: 'ui.default_theme',
          value: 'dark',
          type: 'string',
          description: 'Default UI theme for new users',
          environment: 'all',
          validation: { allowedValues: ['light', 'dark', 'auto'] },
          isEmergencyActive: false,
          createdBy: 'system',
          createdAt: new Date(),
          updatedBy: 'admin',
          updatedAt: new Date(),
          auditLog: []
        }
      ];

      const categories: ConfigCategory[] = [
        {
          id: 'features',
          name: 'Features',
          description: 'Platform feature toggles and controls',
          icon: <Zap className="w-5 h-5" />,
          color: 'text-blue-400',
          configs: mockConfigs.filter(c => c.category === 'features')
        },
        {
          id: 'limits',
          name: 'Limits',
          description: 'Rate limits and resource constraints',
          icon: <Shield className="w-5 h-5" />,
          color: 'text-yellow-400',
          configs: mockConfigs.filter(c => c.category === 'limits')
        },
        {
          id: 'content',
          name: 'Content',
          description: 'Content creation and moderation settings',
          icon: <FileText className="w-5 h-5" />,
          color: 'text-green-400',
          configs: mockConfigs.filter(c => c.category === 'content')
        },
        {
          id: 'security',
          name: 'Security',
          description: 'Authentication and security controls',
          icon: <Lock className="w-5 h-5" />,
          color: 'text-red-400',
          configs: mockConfigs.filter(c => c.category === 'security')
        },
        {
          id: 'performance',
          name: 'Performance',
          description: 'Caching and performance optimization',
          icon: <BarChart3 className="w-5 h-5" />,
          color: 'text-purple-400',
          configs: mockConfigs.filter(c => c.category === 'performance')
        },
        {
          id: 'ui',
          name: 'UI/UX',
          description: 'User interface and experience settings',
          icon: <Eye className="w-5 h-5" />,
          color: 'text-pink-400',
          configs: mockConfigs.filter(c => c.category === 'ui')
        }
      ];

      setConfigCategories(categories);
    } catch (error) {
      console.error('Error loading platform configs:', error);
      toast.error('Failed to load platform configurations');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConfig = async (config: PlatformConfig, newValue: unknown, reason?: string) => {
    if (!admin) return;

    try {
      // In production, use featureFlagService.updatePlatformConfig
      await featureFlagService.updatePlatformConfig(
        config.id,
        newValue,
        admin.id,
        admin.email,
        reason
      );

      // Update local state
      setConfigCategories(prev => prev.map(category => ({
        ...category,
        configs: category.configs.map(c => 
          c.id === config.id ? { ...c, value: newValue, updatedAt: new Date() } : c
        )
      })));

      toast.success(`Configuration updated: ${config.key}`);
      setEditingConfig(null);
    } catch (error) {
      console.error('Error updating config:', error);
      toast.error('Failed to update configuration');
    }
  };

  const handleEmergencyToggle = async (config: PlatformConfig) => {
    if (!admin) return;

    try {
      const newEmergencyState = !config.isEmergencyActive;
      const newValue = newEmergencyState ? config.emergencyValue : config.value;

      // In production, this would update both the emergency state and value
      setConfigCategories(prev => prev.map(category => ({
        ...category,
        configs: category.configs.map(c => 
          c.id === config.id ? { 
            ...c, 
            isEmergencyActive: newEmergencyState,
            value: newValue
          } : c
        )
      })));

      toast.success(`Emergency mode ${newEmergencyState ? 'activated' : 'deactivated'} for ${config.key}`);
    } catch (error) {
      console.error('Error toggling emergency mode:', error);
      toast.error('Failed to toggle emergency mode');
    }
  };


  const filteredConfigs = configCategories.reduce((acc, category) => {
    if (selectedCategory !== 'all' && selectedCategory !== category.id) return acc;
    
    const matchingConfigs = category.configs.filter(config => 
      config.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      config.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingConfigs.length > 0) {
      acc.push({ ...category, configs: matchingConfigs });
    }
    
    return acc;
  }, [] as ConfigCategory[]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading platform configurations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Platform Configuration</h2>
          <p className="text-gray-400">Manage system settings and operational parameters</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {}}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Config
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search configurations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {configCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Categories */}
      {filteredConfigs.map((category) => (
        <Card key={category.id} className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className={`text-white flex items-center gap-3 ${category.color}`}>
              {category.icon}
              {category.name}
              <Badge variant="outline" className="ml-2">
                {category.configs.length} configs
              </Badge>
            </CardTitle>
            <p className="text-gray-400 text-sm">{category.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {category.configs.map((config) => (
                <ConfigurationItem
                  key={config.id}
                  config={config}
                  onUpdate={(newValue, reason) => handleUpdateConfig(config, newValue, reason)}
                  onEmergencyToggle={() => handleEmergencyToggle(config)}
                  onEdit={() => setEditingConfig(config)}
                  onShowHistory={() => setShowHistoryDialog(config)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredConfigs.length === 0 && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No configurations found matching your search</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Config Dialog */}
      {editingConfig && (
        <ConfigEditDialog
          config={editingConfig}
          onClose={() => setEditingConfig(null)}
          onUpdate={handleUpdateConfig}
        />
      )}

      {/* History Dialog */}
      {showHistoryDialog && (
        <ConfigHistoryDialog
          config={showHistoryDialog}
          onClose={() => setShowHistoryDialog(null)}
        />
      )}
    </div>
  );
}

interface ConfigurationItemProps {
  config: PlatformConfig;
  onUpdate: (newValue: unknown, reason?: string) => void;
  onEmergencyToggle: () => void;
  onEdit: () => void;
  onShowHistory: () => void;
}

function ConfigurationItem({ config, onUpdate, onEmergencyToggle, onShowHistory }: ConfigurationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(config.value);

  const handleSave = () => {
    let processedValue = editValue;
    
    if (config.type === 'number') {
      processedValue = parseInt(editValue) || 0;
    } else if (config.type === 'boolean') {
      processedValue = editValue === 'true' || editValue === true;
    }
    
    onUpdate(processedValue);
    setIsEditing(false);
  };

  const renderValue = () => {
    if (config.isEmergencyActive && config.emergencyValue !== undefined) {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="text-xs">EMERGENCY</Badge>
          <span className="text-red-300 font-mono">
            {typeof config.emergencyValue === 'boolean' 
              ? (config.emergencyValue ? 'true' : 'false')
              : config.emergencyValue.toString()
            }
          </span>
        </div>
      );
    }

    if (isEditing) {
      if (config.type === 'boolean') {
        return (
          <Select value={editValue?.toString()} onValueChange={setEditValue}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">true</SelectItem>
              <SelectItem value="false">false</SelectItem>
            </SelectContent>
          </Select>
        );
      } else if (config.validation?.allowedValues) {
        return (
          <Select value={editValue} onValueChange={setEditValue}>
            <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {config.validation.allowedValues.map((value: unknown) => (
                <SelectItem key={value} value={value.toString()}>
                  {value.toString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      } else {
        return (
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            type={config.type === 'number' ? 'number' : 'text'}
            className="w-40 bg-gray-800 border-gray-600"
            min={config.validation?.min}
            max={config.validation?.max}
          />
        );
      }
    }

    return (
      <span className="font-mono text-green-300">
        {typeof config.value === 'boolean' 
          ? (config.value ? 'true' : 'false')
          : config.value.toString()
        }
      </span>
    );
  };

  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/30">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-4 h-4" />
            <div>
              <h4 className="font-medium text-white font-mono text-sm">{config.key}</h4>
              <p className="text-gray-400 text-sm">{config.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">Value:</span>
              {renderValue()}
            </div>
            
            <Badge variant="outline" className="text-xs">
              {config.type}
            </Badge>
            
            {config.environment !== 'all' && (
              <Badge variant="outline" className="text-xs">
                {config.environment}
              </Badge>
            )}
          </div>
          
          {config.validation && (
            <div className="text-xs text-gray-500 mt-2">
              {config.validation.min !== undefined && `Min: ${config.validation.min}`}
              {config.validation.max !== undefined && ` Max: ${config.validation.max}`}
              {config.validation.allowedValues && ` Values: ${config.validation.allowedValues.join(', ')}`}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="w-3 h-3" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                <XCircle className="w-3 h-3" />
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                <Edit className="w-3 h-3" />
              </Button>
            </>
          )}
          
          {config.emergencyValue !== undefined && (
            <Button
              size="sm"
              variant={config.isEmergencyActive ? "destructive" : "ghost"}
              onClick={onEmergencyToggle}
              title={config.isEmergencyActive ? "Deactivate emergency mode" : "Activate emergency mode"}
            >
              <AlertTriangle className="w-3 h-3" />
            </Button>
          )}
          
          <Button size="sm" variant="ghost" onClick={onShowHistory}>
            <History className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      {config.isEmergencyActive && (
        <Alert className="mt-3 border-red-500/50 bg-red-500/10">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <AlertDescription className="text-red-300">
            Emergency mode active - using emergency value instead of configured value
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

interface ConfigEditDialogProps {
  config: PlatformConfig;
  onClose: () => void;
  onUpdate: (config: PlatformConfig, newValue: unknown, reason?: string) => void;
}

function ConfigEditDialog({ config, onClose, onUpdate }: ConfigEditDialogProps) {
  const [newValue, setNewValue] = useState(config.value);
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(config, newValue, reason);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Configuration</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Configuration Key</Label>
            <Input value={config.key} disabled className="bg-gray-800 border-gray-600" />
          </div>
          
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea value={config.description} disabled className="bg-gray-800 border-gray-600" />
          </div>
          
          <div className="space-y-2">
            <Label>New Value</Label>
            {config.type === 'boolean' ? (
              <Select value={newValue?.toString()} onValueChange={setNewValue}>
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">true</SelectItem>
                  <SelectItem value="false">false</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                type={config.type === 'number' ? 'number' : 'text'}
                className="bg-gray-800 border-gray-600"
              />
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Reason for Change</Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why this configuration is being changed..."
              className="bg-gray-800 border-gray-600"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Update Configuration
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface ConfigHistoryDialogProps {
  config: PlatformConfig;
  onClose: () => void;
}

function ConfigHistoryDialog({ config, onClose }: ConfigHistoryDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configuration History</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Configuration</Label>
            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="font-mono text-sm">{config.key}</div>
              <div className="text-gray-400 text-xs mt-1">{config.description}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Change History</Label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {config.auditLog.length === 0 ? (
                <div className="text-center py-4 text-gray-400">
                  No change history available
                </div>
              ) : (
                config.auditLog.reverse().map((entry, index) => (
                  <div key={index} className="border border-gray-700 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="text-xs">
                        {entry.action.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {entry.timestamp.toDate().toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-red-400">From:</span>
                        <code className="text-xs bg-gray-800 px-2 py-1 rounded">
                          {JSON.stringify(entry.oldValue)}
                        </code>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-green-400">To:</span>
                        <code className="text-xs bg-gray-800 px-2 py-1 rounded">
                          {JSON.stringify(entry.newValue)}
                        </code>
                      </div>
                      {entry.reason && (
                        <div className="text-gray-400 text-xs mt-2">
                          <strong>Reason:</strong> {entry.reason}
                        </div>
                      )}
                      <div className="text-gray-500 text-xs mt-1">
                        Changed by {entry.userName}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

