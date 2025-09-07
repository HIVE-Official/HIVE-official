'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Users,
  BarChart3,
  Plus,
  Crown,
  Shield,
  UserPlus,
  UserMinus,
  Bell,
  Hash,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Avatar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Input,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@hive/ui';

// State Management
import { 
  useSpaceMembers,
  useUpdateSpaceSettings,
  useUpdateMemberRole,
  useRemoveMember,
  useUIStore,
  useAuthStore
} from '@hive/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Space {
  id: string;
  name: string;
  description: string;
  type: string;
  memberCount: number;
  isPrivate: boolean;
  bannerUrl?: string;
  createdAt: Date;
  metrics: {
    postCount: number;
    eventCount: number;
    toolCount: number;
    activeMembers: number;
  };
}

interface Member {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  lastActive: Date;
  isActive: boolean;
}

interface SpaceManagementDashboardMigratedProps {
  space: Space;
  userRole: 'owner' | 'admin' | 'moderator' | 'member';
}

export function SpaceManagementDashboardMigrated({ space, userRole }: SpaceManagementDashboardMigratedProps) {
  // Global state
  const { addToast } = useUIStore();
  const { profile } = useAuthStore();
  const queryClient = useQueryClient();

  // Local UI state
  const [editMode, setEditMode] = useState(false);
  const [spaceSettings, setSpaceSettings] = useState({
    name: space.name,
    description: space.description,
    isPrivate: space.isPrivate
  });

  // Permissions
  const canManage = ['owner', 'admin'].includes(userRole);
  const canModerate = ['owner', 'admin', 'moderator'].includes(userRole);

  // React Query hooks
  const { data: members, isLoading: membersLoading, error: membersError } = useSpaceMembers(space.id);
  const updateSettings = useUpdateSpaceSettings();
  const updateMemberRole = useUpdateMemberRole();
  const removeMember = useRemoveMember();

  // Handlers
  const handleUpdateSpaceSettings = async () => {
    updateSettings.mutate(
      { spaceId: space.id, updates: spaceSettings },
      {
        onSuccess: () => {
          addToast({
            title: 'Settings Updated',
            description: 'Space settings have been successfully updated',
            type: 'success',
          });
          setEditMode(false);
          
          // Update space cache
          queryClient.setQueryData(['space', space.id], (old: any) => ({
            ...old,
            ...spaceSettings
          }));
        },
        onError: (error) => {
          addToast({
            title: 'Failed to update settings',
            description: error.message || 'Something went wrong',
            type: 'error',
          });
        },
      }
    );
  };

  const handleUpdateMemberRole = async (memberId: string, newRole: string) => {
    updateMemberRole.mutate(
      { spaceId: space.id, memberId, role: newRole },
      {
        onSuccess: () => {
          addToast({
            title: 'Role Updated',
            description: 'Member role has been updated',
            type: 'success',
          });
        },
        onError: (error) => {
          addToast({
            title: 'Failed to update role',
            description: error.message || 'Something went wrong',
            type: 'error',
          });
        },
      }
    );
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    removeMember.mutate(
      { spaceId: space.id, memberId },
      {
        onSuccess: () => {
          addToast({
            title: 'Member Removed',
            description: `${memberName} has been removed from the space`,
            type: 'info',
          });
        },
        onError: (error) => {
          addToast({
            title: 'Failed to remove member',
            description: error.message || 'Something went wrong',
            type: 'error',
          });
        },
      }
    );
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-amber-500';
      case 'admin': return 'bg-red-500';
      case 'moderator': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="h-3 w-3" />;
      case 'admin': return <Shield className="h-3 w-3" />;
      case 'moderator': return <Hash className="h-3 w-3" />;
      default: return <Users className="h-3 w-3" />;
    }
  };

  // Loading state
  if (membersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-muted-foreground">Loading space management...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (membersError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <p className="text-destructive">Failed to load space data</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['space-members', space.id] })} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Space Overview */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {space.name}
              <Badge variant={space.isPrivate ? 'secondary' : 'default'}>
                {space.isPrivate ? (
                  <>
                    <EyeOff className="h-3 w-3 mr-1" />
                    Private
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    Public
                  </>
                )}
              </Badge>
            </CardTitle>
            <CardDescription>{space.description}</CardDescription>
          </div>
          {canManage && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(true)}
              disabled={updateSettings.isPending}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent">
                {space.memberCount}
              </div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent">
                {space.metrics.postCount}
              </div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent">
                {space.metrics.toolCount}
              </div>
              <div className="text-sm text-muted-foreground">Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent">
                {space.metrics.activeMembers}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Management Tabs */}
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members">
            <Users className="h-4 w-4 mr-2" />
            Members
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Space Members ({members?.length || 0})</h3>
            {canManage && (
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            )}
          </div>

          <div className="space-y-2">
            <AnimatePresence>
              {members?.map((member) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <img src={member.avatarUrl} alt={member.name} />
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.email}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Joined {new Date(member.joinedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`${getRoleColor(member.role)} text-white`}
                        >
                          {getRoleIcon(member.role)}
                          {member.role}
                        </Badge>

                        {canManage && member.role !== 'owner' && (
                          <div className="flex gap-1">
                            <Select
                              value={member.role}
                              onValueChange={(value) => handleUpdateMemberRole(member.id, value)}
                              disabled={updateMemberRole.isPending}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="moderator">Moderator</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  disabled={removeMember.isPending}
                                >
                                  <UserMinus className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Remove Member</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to remove {member.name} from this space?
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleRemoveMember(member.id, member.name)}
                                    disabled={removeMember.isPending}
                                  >
                                    {removeMember.isPending ? (
                                      <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Removing...
                                      </>
                                    ) : (
                                      'Remove'
                                    )}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Space Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Analytics dashboard coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          {canManage ? (
            <Card>
              <CardHeader>
                <CardTitle>Space Settings</CardTitle>
                <CardDescription>
                  Manage your space configuration and permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Space Name</label>
                    <Input 
                      value={spaceSettings.name}
                      onChange={(e) => setSpaceSettings(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Visibility</label>
                    <Select 
                      value={spaceSettings.isPrivate ? 'private' : 'public'}
                      onValueChange={(value) => setSpaceSettings(prev => ({ ...prev, isPrivate: value === 'private' }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Input 
                    value={spaceSettings.description}
                    onChange={(e) => setSpaceSettings(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleUpdateSpaceSettings}
                    disabled={updateSettings.isPending}
                  >
                    {updateSettings.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setSpaceSettings({
                      name: space.name,
                      description: space.description,
                      isPrivate: space.isPrivate
                    })}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <div className="text-muted-foreground">
                  You don't have permission to manage this space
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Space Modal */}
      <Dialog open={editMode} onOpenChange={setEditMode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Space</DialogTitle>
            <DialogDescription>
              Update your space information and settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Space Name</label>
              <Input 
                value={spaceSettings.name}
                onChange={(e) => setSpaceSettings(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input 
                value={spaceSettings.description}
                onChange={(e) => setSpaceSettings(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateSpaceSettings}
              disabled={updateSettings.isPending}
            >
              {updateSettings.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}