'use client';

import { useState, useEffect } from 'react';
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
  EyeOff
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

interface SpaceManagementDashboardProps {
  space: Space;
  userRole: 'owner' | 'admin' | 'moderator' | 'member';
}

export function SpaceManagementDashboard({ space, userRole }: SpaceManagementDashboardProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [spaceData, setSpaceData] = useState(space);

  const canManage = ['owner', 'admin'].includes(userRole);
  const canModerate = ['owner', 'admin', 'moderator'].includes(userRole);

  // Fetch space members
  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch(`/api/spaces/${space.id}/members`);
        if (response.ok) {
          const data = await response.json();
          setMembers(data.members || []);
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [space.id]);

  const updateSpaceSettings = async (updates: Partial<Space>) => {
    try {
      const response = await fetch(`/api/spaces/${space.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        setSpaceData(prev => ({ ...prev, ...updates }));
        setEditMode(false);
      }
    } catch (error) {
      console.error('Failed to update space:', error);
    }
  };

  const updateMemberRole = async (memberId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/spaces/${space.id}/members`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId, role: newRole })
      });

      if (response.ok) {
        setMembers(prev => 
          prev.map(member => 
            member.id === memberId ? { ...member, role: newRole as any } : member
          )
        );
      }
    } catch (error) {
      console.error('Failed to update member role:', error);
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      const response = await fetch(`/api/spaces/${space.id}/members`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId })
      });

      if (response.ok) {
        setMembers(prev => prev.filter(member => member.id !== memberId));
      }
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
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

  return (
    <div className="space-y-6">
      {/* Space Overview */}
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {spaceData.name}
              <Badge variant={spaceData.isPrivate ? 'secondary' : 'default'}>
                {spaceData.isPrivate ? (
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
            <CardDescription>{spaceData.description}</CardDescription>
          </div>
          {canManage && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditMode(true)}
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
                {spaceData.memberCount}
              </div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent">
                {spaceData.metrics.postCount}
              </div>
              <div className="text-sm text-muted-foreground">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent">
                {spaceData.metrics.toolCount}
              </div>
              <div className="text-sm text-muted-foreground">Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-accent">
                {spaceData.metrics.activeMembers}
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
            <h3 className="text-lg font-semibold">Space Members ({members.length})</h3>
            {canManage && (
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {members.map((member) => (
              <Card key={member.id}>
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
                          onValueChange={(value) => updateMemberRole(member.id, value)}
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
                            <Button variant="outline" size="sm">
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
                                onClick={() => removeMember(member.id)}
                              >
                                Remove
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
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
                    <Input defaultValue={spaceData.name} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Visibility</label>
                    <Select defaultValue={spaceData.isPrivate ? 'private' : 'public'}>
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
                  <Input defaultValue={spaceData.description} />
                </div>
                <div className="flex gap-2">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
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
              <Input defaultValue={spaceData.name} />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input defaultValue={spaceData.description} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={() => updateSpaceSettings({})}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}