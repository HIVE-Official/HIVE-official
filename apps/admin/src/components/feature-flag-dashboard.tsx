"use client";

import { useState, useEffect } from "react";
import { logger } from '@hive/core';

import { 
  HiveCard as Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  HiveButton as Button,
  Badge,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
  Label,
  Progress,
  Alert,
  AlertDescription
} from "@hive/ui";
import { 
  Plus, 
  Search, 
  Settings, 
  AlertTriangle, 
  Target,
  BarChart3,
  Clock,
  Users,
  Activity,
  Eye,
  PlayCircle,
  Shield,
} from "lucide-react";
import { 
  FeatureFlag, 
  featureFlagService,
} from "../lib/feature-flags";
import { useAdminAuth } from "../lib/auth";
import { toast } from "sonner";

export function FeatureFlagDashboard() {
  const { admin } = useAdminAuth();
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedFlag, setSelectedFlag] = useState<FeatureFlag | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    loadFeatureFlags();
  }, []);

  const loadFeatureFlags = async () => {
    try {
      const allFlags = await featureFlagService.getAllFeatureFlags();
      setFlags(allFlags);
    } catch (error) {
      logger.error('Error loading feature flags:', error);
      toast.error('Failed to load feature flags');
    } finally {
      setLoading(false);
    }
  };

  const filteredFlags = flags.filter(flag => {
    const matchesSearch = flag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flag.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || flag.status === statusFilter;
    const matchesType = typeFilter === 'all' || flag.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleToggleFlag = async (flag: FeatureFlag) => {
    if (!admin) return;

    try {
      const newStatus = flag.status === 'active' ? 'inactive' : 'active';
      await featureFlagService.updateFeatureFlag(
        flag.id,
        { status: newStatus },
        admin.id,
        admin.email,
        `Status changed to ${newStatus}`
      );
      
      await loadFeatureFlags();
      toast.success(`Feature flag ${newStatus}`);
    } catch (error) {
      logger.error('Error toggling flag:', error);
      toast.error('Failed to toggle feature flag');
    }
  };

  const handleKillSwitch = async (flag: FeatureFlag, reason: string) => {
    if (!admin) return;

    try {
      if (flag.killSwitch) {
        await featureFlagService.deactivateKillSwitch(flag.id, admin.id, admin.email);
        toast.success('Kill switch deactivated');
      } else {
        await featureFlagService.activateKillSwitch(flag.id, admin.id, admin.email, reason);
        toast.success('Emergency kill switch activated');
      }
      
      await loadFeatureFlags();
    } catch (error) {
      logger.error('Error with kill switch:', error);
      toast.error('Failed to toggle kill switch');
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading feature flags...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Feature Flags</h2>
          <p className="text-gray-400">Manage platform features and experiments</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Flag
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
                  placeholder="Search feature flags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="release">Release</SelectItem>
                  <SelectItem value="experiment">Experiment</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="permission">Permission</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-400">Active Flags</p>
                <p className="text-2xl font-bold text-white">
                  {flags.filter(f => f.status === 'active' && !f.killSwitch).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-400">Kill Switches</p>
                <p className="text-2xl font-bold text-white">
                  {flags.filter(f => f.killSwitch).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-400">Experiments</p>
                <p className="text-2xl font-bold text-white">
                  {flags.filter(f => f.type === 'experiment').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-400">Scheduled</p>
                <p className="text-2xl font-bold text-white">
                  {flags.filter(f => f.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Flags List */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">Feature Flags ({filteredFlags.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFlags.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No feature flags found</p>
              </div>
            ) : (
              filteredFlags.map((flag) => (
                <FeatureFlagCard
                  key={flag.id}
                  flag={flag}
                  onToggle={() => handleToggleFlag(flag)}
                  onKillSwitch={(reason) => handleKillSwitch(flag, reason)}
                  onSelect={() => setSelectedFlag(flag)}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Flag Dialog */}
      <CreateFeatureFlagDialog 
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreated={loadFeatureFlags}
      />

      {/* Flag Details Dialog */}
      {selectedFlag && (
        <FeatureFlagDetailsDialog
          flag={selectedFlag}
          onClose={() => setSelectedFlag(null)}
          onUpdated={loadFeatureFlags}
        />
      )}
    </div>
  );
}

interface FeatureFlagCardProps {
  flag: FeatureFlag;
  onToggle: () => void;
  onKillSwitch: (reason: string) => void;
  onSelect: () => void;
}

function FeatureFlagCard({ flag, onToggle, onKillSwitch, onSelect }: FeatureFlagCardProps) {
  const [showKillSwitchDialog, setShowKillSwitchDialog] = useState(false);
  const [killSwitchReason, setKillSwitchReason] = useState("");

  const handleKillSwitch = () => {
    if (flag.killSwitch) {
      onKillSwitch("");
    } else if (killSwitchReason.trim()) {
      onKillSwitch(killSwitchReason);
      setShowKillSwitchDialog(false);
      setKillSwitchReason("");
    }
  };

  return (
    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/50 hover:bg-gray-800/70 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              {getTypeIcon(flag.type)}
              <h3 
                className="text-lg font-semibold text-white cursor-pointer hover:text-orange-400"
                onClick={onSelect}
              >
                {flag.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(flag.status, flag.killSwitch)}`} />
              <Badge variant="secondary" className="capitalize">
                {flag.killSwitch ? 'KILLED' : flag.status}
              </Badge>
              <Badge variant="outline" className="capitalize">
                {flag.type}
              </Badge>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm mb-3">{flag.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              <span>{flag.rolloutPercentage}% rollout</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{flag.targetSegments.length} segments</span>
            </div>
            {flag.variants && (
              <div className="flex items-center gap-1">
                <BarChart3 className="w-3 h-3" />
                <span>{flag.variants.length} variants</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Toggle Switch */}
          <div className="flex items-center gap-2">
            <Switch
              checked={flag.status === 'active' && !flag.killSwitch}
              onCheckedChange={onToggle}
              disabled={flag.killSwitch}
            />
            <span className="text-sm text-gray-400">
              {flag.status === 'active' && !flag.killSwitch ? 'ON' : 'OFF'}
            </span>
          </div>
          
          {/* Kill Switch */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => flag.killSwitch ? handleKillSwitch() : setShowKillSwitchDialog(true)}
            className={flag.killSwitch ? "text-red-400 hover:text-red-300" : "text-gray-400 hover:text-red-400"}
          >
            <AlertTriangle className="w-4 h-4" />
          </Button>
          
          {/* View Details */}
          <Button variant="ghost" size="sm" onClick={onSelect}>
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {flag.killSwitch && flag.killSwitchReason && (
        <Alert className="mt-3 border-red-500/50 bg-red-500/10">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <AlertDescription className="text-red-300">
            <strong>Emergency Kill Switch Active:</strong> {flag.killSwitchReason}
            {flag.killSwitchActivatedAt && (
              <div className="text-xs mt-1 opacity-80">
                Activated {flag.killSwitchActivatedAt.toDate().toLocaleString()}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {/* Kill Switch Confirmation Dialog */}
      <Dialog open={showKillSwitchDialog} onOpenChange={setShowKillSwitchDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              Emergency Kill Switch
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-400">
              This will immediately disable the feature flag for all users. Provide a reason for this emergency action:
            </p>
            <Textarea
              value={killSwitchReason}
              onChange={(e) => setKillSwitchReason(e.target.value)}
              placeholder="Explain why this kill switch is being activated..."
              className="bg-gray-800 border-gray-600"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setShowKillSwitchDialog(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleKillSwitch}
                disabled={!killSwitchReason.trim()}
              >
                Activate Kill Switch
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CreateFeatureFlagDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

function CreateFeatureFlagDialog({ open, onOpenChange, onCreated }: CreateFeatureFlagDialogProps) {
  const { admin } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'release' as const,
    environment: 'development' as const,
    rolloutPercentage: 0,
    status: 'inactive' as const
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!admin || loading) return;

    setLoading(true);
    try {
      await featureFlagService.createFeatureFlag({
        ...formData,
        targetSegments: [],
        excludeSegments: [],
        killSwitch: false,
        createdBy: admin.id,
        updatedBy: admin.id
      });

      toast.success('Feature flag created successfully');
      onCreated();
      onOpenChange(false);
      setFormData({
        name: '',
        description: '',
        type: 'release',
        environment: 'development',
        rolloutPercentage: 0,
        status: 'inactive'
      });
    } catch (error) {
      logger.error('Error creating feature flag:', error);
      toast.error('Failed to create feature flag');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Feature Flag</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Flag Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., new-dashboard-layout"
                required
                className="bg-gray-800 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as 'release' | 'experiment' | 'operational' | 'permission' }))}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="release">Release</SelectItem>
                  <SelectItem value="experiment">Experiment</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="permission">Permission</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what this feature flag controls..."
              required
              className="bg-gray-800 border-gray-600"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="environment">Environment</Label>
              <Select 
                value={formData.environment} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, environment: value as 'development' | 'staging' | 'production' }))}
              >
                <SelectTrigger className="bg-gray-800 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="all">All Environments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rollout">Initial Rollout %</Label>
              <Input
                id="rollout"
                type="number"
                min="0"
                max="100"
                value={formData.rolloutPercentage}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  rolloutPercentage: parseInt(e.target.value) || 0 
                }))}
                className="bg-gray-800 border-gray-600"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {loading ? 'Creating...' : 'Create Flag'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface FeatureFlagDetailsDialogProps {
  flag: FeatureFlag;
  onClose: () => void;
  onUpdated: () => void;
}

function FeatureFlagDetailsDialog({ flag, onClose }: FeatureFlagDetailsDialogProps & { _onUpdated?: () => void }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTypeIcon(flag.type)}
            {flag.name}
            <Badge variant="outline" className="ml-2 capitalize">
              {flag.type}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Status</h4>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(flag.status, flag.killSwitch)}`} />
                <span className="text-gray-300 capitalize">
                  {flag.killSwitch ? 'Emergency Killed' : flag.status}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Rollout</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{flag.rolloutPercentage}%</span>
                </div>
                <Progress value={flag.rolloutPercentage} className="h-2" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">Description</h4>
            <p className="text-gray-300">{flag.description}</p>
          </div>
          
          {/* Targeting */}
          {flag.targetSegments.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-2">Target Segments</h4>
              <div className="flex flex-wrap gap-2">
                {flag.targetSegments.map((segment, index) => (
                  <Badge key={index} variant="secondary">
                    {segment.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Variants */}
          {flag.variants && flag.variants.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-2">Variants</h4>
              <div className="space-y-2">
                {flag.variants.map((variant) => (
                  <div key={variant.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <div className="font-medium text-white">{variant.name}</div>
                      <div className="text-sm text-gray-400">{variant.description}</div>
                    </div>
                    <Badge variant="outline">{variant.weight}%</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Audit Log */}
          <div>
            <h4 className="font-semibold text-white mb-2">Recent Activity</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {flag.auditLog.slice(-5).reverse().map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-800/50 rounded">
                  <div>
                    <span className="text-white capitalize">{entry.action.replace('_', ' ')}</span>
                    <span className="text-gray-400 ml-2">by {entry.userName}</span>
                  </div>
                  <span className="text-gray-500">
                    {entry.timestamp.toDate().toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'release': return <PlayCircle className="w-4 h-4" />;
    case 'experiment': return <BarChart3 className="w-4 h-4" />;
    case 'operational': return <Settings className="w-4 h-4" />;
    case 'permission': return <Shield className="w-4 h-4" />;
    default: return <Activity className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string, killSwitch: boolean) => {
  if (killSwitch) return 'bg-red-500';
  
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'inactive': return 'bg-gray-500';
    case 'scheduled': return 'bg-yellow-500';
    case 'archived': return 'bg-purple-500';
    default: return 'bg-gray-500';
  }
};