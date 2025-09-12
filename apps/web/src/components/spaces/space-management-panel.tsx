'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Users, 
  Shield, 
  BarChart3, 
  Bell,
  Lock,
  Globe,
  Eye,
  UserPlus,
  UserMinus,
  Crown,
  Ban,
  AlertTriangle,
  Check,
  X,
  Search,
  Filter,
  Download,
  Upload,
  Trash2,
  Edit2,
  Save
} from 'lucide-react';
import { Button, Card, Badge, Input, Select, Switch, Tabs, TabsList, TabsTrigger, TabsContent } from '@hive/ui';
import { Avatar } from '@hive/ui';
import { useAuth } from '@/hooks/use-auth';
import { 
  doc, 
  collection, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';

interface SpaceMember {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  joinedAt: any;
  lastActive?: any;
  permissions: string[];
  banned?: boolean;
  warnings?: number;
}

interface SpaceSettings {
  visibility: 'public' | 'private' | 'hidden';
  joinApproval: boolean;
  postApproval: boolean;
  allowInvites: boolean;
  allowMemberList: boolean;
  allowAnonymous: boolean;
  maxMembers?: number;
  contentRules?: string[];
  autoModeration: {
    enabled: boolean;
    flagWords: string[];
    maxWarnings: number;
    autoKickAfterWarnings: boolean;
  };
}

interface SpaceManagementPanelProps {
  spaceId: string;
  spaceName: string;
  onClose?: () => void;
}

const ROLE_HIERARCHY = {
  owner: 4,
  admin: 3,
  moderator: 2,
  member: 1
};

const ROLE_PERMISSIONS = {
  owner: ['all'],
  admin: ['manage_members', 'manage_posts', 'manage_events', 'manage_settings', 'moderate'],
  moderator: ['manage_posts', 'moderate', 'manage_events'],
  member: ['post', 'comment', 'react']
};

export function SpaceManagementPanel({ spaceId, spaceName, onClose }: SpaceManagementPanelProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('members');
  const [members, setMembers] = useState<SpaceMember[]>([]);
  const [settings, setSettings] = useState<SpaceSettings>({
    visibility: 'public',
    joinApproval: false,
    postApproval: false,
    allowInvites: true,
    allowMemberList: true,
    allowAnonymous: false,
    autoModeration: {
      enabled: false,
      flagWords: [],
      maxWarnings: 3,
      autoKickAfterWarnings: false
    }
  });
  const [currentUserRole, setCurrentUserRole] = useState<string>('member');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [bannedUsers, setBannedUsers] = useState<any[]>([]);

  useEffect(() => {
    loadSpaceData();
  }, [spaceId]);

  const loadSpaceData = async () => {
    setIsLoading(true);
    try {
      // Load members
      const membersRef = collection(db, 'spaces', spaceId, 'members');
      const membersSnap = await getDocs(query(membersRef, orderBy('joinedAt', 'desc')));
      const membersData = membersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SpaceMember));
      setMembers(membersData);

      // Find current user's role
      const currentMember = membersData.find(m => m.userId === user?.id);
      if (currentMember) {
        setCurrentUserRole(currentMember.role);
      }

      // Load space settings
      const spaceDoc = await getDoc(doc(db, 'spaces', spaceId));
      if (spaceDoc.exists()) {
        const spaceData = spaceDoc.data();
        if (spaceData.settings) {
          setSettings(spaceData.settings);
        }
      }

      // Load pending join requests if user is admin
      if (currentMember && ['owner', 'admin'].includes(currentMember.role)) {
        const requestsRef = collection(db, 'spaces', spaceId, 'joinRequests');
        const requestsSnap = await getDocs(query(requestsRef, where('status', '==', 'pending')));
        setPendingRequests(requestsSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      }

      // Load banned users
      const bannedRef = collection(db, 'spaces', spaceId, 'banned');
      const bannedSnap = await getDocs(bannedRef);
      setBannedUsers(bannedSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));

    } catch (error) {
      console.error('Error loading space data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const canManageRole = (targetRole: string): boolean => {
    if (!currentUserRole) return false;
    return ROLE_HIERARCHY[currentUserRole as keyof typeof ROLE_HIERARCHY] > 
           ROLE_HIERARCHY[targetRole as keyof typeof ROLE_HIERARCHY];
  };

  const updateMemberRole = async (memberId: string, newRole: string) => {
    if (!canManageRole(newRole)) return;

    try {
      const memberRef = doc(db, 'spaces', spaceId, 'members', memberId);
      await updateDoc(memberRef, {
        role: newRole,
        permissions: ROLE_PERMISSIONS[newRole as keyof typeof ROLE_PERMISSIONS],
        updatedAt: serverTimestamp()
      });

      setMembers(prev => prev.map(m => 
        m.id === memberId 
          ? { ...m, role: newRole as any, permissions: ROLE_PERMISSIONS[newRole as keyof typeof ROLE_PERMISSIONS] }
          : m
      ));
    } catch (error) {
      console.error('Error updating member role:', error);
    }
  };

  const removeMember = async (memberId: string, userId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member || !canManageRole(member.role)) return;

    try {
      // Remove from members collection
      await deleteDoc(doc(db, 'spaces', spaceId, 'members', memberId));

      // Update space member count
      const spaceRef = doc(db, 'spaces', spaceId);
      await updateDoc(spaceRef, {
        memberCount: members.length - 1,
        members: arrayRemove(userId)
      });

      setMembers(prev => prev.filter(m => m.id !== memberId));
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const banUser = async (userId: string, userName: string, reason?: string) => {
    try {
      // Add to banned collection
      await setDoc(doc(db, 'spaces', spaceId, 'banned', userId), {
        userId,
        userName,
        bannedBy: user?.id,
        bannedAt: serverTimestamp(),
        reason: reason || 'No reason provided'
      });

      // Remove from members
      const memberToRemove = members.find(m => m.userId === userId);
      if (memberToRemove) {
        await removeMember(memberToRemove.id, userId);
      }

      setBannedUsers(prev => [...prev, {
        id: userId,
        userId,
        userName,
        reason,
        bannedAt: new Date()
      }]);
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'spaces', spaceId, 'banned', userId));
      setBannedUsers(prev => prev.filter(u => u.userId !== userId));
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  const handleJoinRequest = async (requestId: string, approved: boolean) => {
    try {
      const requestRef = doc(db, 'spaces', spaceId, 'joinRequests', requestId);
      const request = pendingRequests.find(r => r.id === requestId);
      
      if (!request) return;

      if (approved) {
        // Add as member
        await setDoc(doc(db, 'spaces', spaceId, 'members', request.userId), {
          userId: request.userId,
          userName: request.userName,
          userEmail: request.userEmail,
          userAvatar: request.userAvatar,
          role: 'member',
          permissions: ROLE_PERMISSIONS.member,
          joinedAt: serverTimestamp()
        });

        // Update space
        const spaceRef = doc(db, 'spaces', spaceId);
        await updateDoc(spaceRef, {
          memberCount: members.length + 1,
          members: arrayUnion(request.userId)
        });
      }

      // Update request status
      await updateDoc(requestRef, {
        status: approved ? 'approved' : 'rejected',
        processedBy: user?.id,
        processedAt: serverTimestamp()
      });

      setPendingRequests(prev => prev.filter(r => r.id !== requestId));
    } catch (error) {
      console.error('Error handling join request:', error);
    }
  };

  const updateSpaceSettings = async () => {
    if (!['owner', 'admin'].includes(currentUserRole)) return;

    try {
      const spaceRef = doc(db, 'spaces', spaceId);
      await updateDoc(spaceRef, {
        settings,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating space settings:', error);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const renderMemberRow = (member: SpaceMember) => {
    const canManage = canManageRole(member.role);
    
    return (
      <div key={member.id} className="flex items-center justify-between p-3 hover:bg-[var(--hive-background-secondary)] rounded-lg transition-colors">
        <div className="flex items-center gap-3">
          <Avatar
            src={member.userAvatar}
            alt={member.userName}
            size="md"
            fallback={member.userName[0]?.toUpperCase()}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{member.userName}</span>
              {member.role === 'owner' && <Crown className="h-4 w-4 text-yellow-500" />}
              <Badge variant={
                member.role === 'owner' ? 'destructive' :
                member.role === 'admin' ? 'default' :
                member.role === 'moderator' ? 'secondary' :
                'outline'
              }>
                {member.role}
              </Badge>
            </div>
            <div className="text-sm text-[var(--hive-text-tertiary)]">
              {member.userEmail} • Joined {formatDistanceToNow(member.joinedAt?.toDate() || new Date(), { addSuffix: true })}
            </div>
            {member.warnings && member.warnings > 0 && (
              <div className="flex items-center gap-1 mt-1">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-yellow-500">{member.warnings} warnings</span>
              </div>
            )}
          </div>
        </div>
        
        {canManage && (
          <div className="flex items-center gap-2">
            <Select
              value={member.role}
              onValueChange={(value: any) => updateMemberRole(member.id, value)}
              disabled={!canManage}
            >
              <option value="member">Member</option>
              <option value="moderator">Moderator</option>
              {['owner', 'admin'].includes(currentUserRole) && (
                <option value="admin">Admin</option>
              )}
            </Select>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => banUser(member.userId, member.userName)}
              className="text-red-500 hover:text-red-600"
            >
              <Ban className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeMember(member.id, member.userId)}
              className="text-red-500 hover:text-red-600"
            >
              <UserMinus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--hive-border)]">
          <div>
            <h2 className="text-2xl font-bold">Manage {spaceName}</h2>
            <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
              Configure space settings, manage members, and moderate content
            </p>
          </div>
          {onClose && (
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="border-b border-[var(--hive-border)] px-6">
            <TabsTrigger value="members">
              <Users className="h-4 w-4 mr-2" />
              Members ({members.length})
            </TabsTrigger>
            {['owner', 'admin'].includes(currentUserRole) && (
              <>
                <TabsTrigger value="requests">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Requests ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
                <TabsTrigger value="moderation">
                  <Shield className="h-4 w-4 mr-2" />
                  Moderation
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {/* Search and filters */}
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--hive-text-tertiary)]" />
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e: any) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <option value="all">All Roles</option>
                  <option value="owner">Owners</option>
                  <option value="admin">Admins</option>
                  <option value="moderator">Moderators</option>
                  <option value="member">Members</option>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Members list */}
              <div className="space-y-2">
                {filteredMembers.map(renderMemberRow)}
              </div>
            </div>
          </TabsContent>

          {/* Join Requests Tab */}
          {['owner', 'admin'].includes(currentUserRole) && (
            <TabsContent value="requests" className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {pendingRequests.length === 0 ? (
                  <div className="text-center py-8 text-[var(--hive-text-tertiary)]">
                    <UserPlus className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No pending requests</p>
                  </div>
                ) : (
                  pendingRequests.map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={request.userAvatar}
                          alt={request.userName}
                          size="md"
                          fallback={request.userName[0]?.toUpperCase()}
                        />
                        <div>
                          <p className="font-medium">{request.userName}</p>
                          <p className="text-sm text-[var(--hive-text-tertiary)]">{request.userEmail}</p>
                          {request.message && (
                            <p className="text-sm mt-1">{request.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleJoinRequest(request.id, true)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleJoinRequest(request.id, false)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          )}

          {/* Settings Tab */}
          {['owner', 'admin'].includes(currentUserRole) && (
            <TabsContent value="settings" className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Space Visibility</p>
                        <p className="text-sm text-[var(--hive-text-tertiary)]">Control who can find and view this space</p>
                      </div>
                      <Select
                        value={settings.visibility}
                        onValueChange={(value: any) => setSettings({...settings, visibility: value as any})}
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="hidden">Hidden</option>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Require Join Approval</p>
                        <p className="text-sm text-[var(--hive-text-tertiary)]">New members must be approved by admins</p>
                      </div>
                      <Switch
                        checked={settings.joinApproval}
                        onCheckedChange={(checked: any) => setSettings({...settings, joinApproval: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Post Approval</p>
                        <p className="text-sm text-[var(--hive-text-tertiary)]">Posts require moderator approval</p>
                      </div>
                      <Switch
                        checked={settings.postApproval}
                        onCheckedChange={(checked: any) => setSettings({...settings, postApproval: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Member Invites</p>
                        <p className="text-sm text-[var(--hive-text-tertiary)]">Members can invite others to join</p>
                      </div>
                      <Switch
                        checked={settings.allowInvites}
                        onCheckedChange={(checked: any) => setSettings({...settings, allowInvites: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={updateSpaceSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </TabsContent>
          )}

          {/* Moderation Tab */}
          {['owner', 'admin', 'moderator'].includes(currentUserRole) && (
            <TabsContent value="moderation" className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Banned Users</h3>
                  {bannedUsers.length === 0 ? (
                    <p className="text-[var(--hive-text-tertiary)]">No banned users</p>
                  ) : (
                    <div className="space-y-2">
                      {bannedUsers.map(banned => (
                        <div key={banned.id} className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                          <div>
                            <p className="font-medium">{banned.userName}</p>
                            <p className="text-sm text-[var(--hive-text-tertiary)]">
                              Reason: {banned.reason}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => unbanUser(banned.userId)}
                          >
                            Unban
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Auto-Moderation</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Enable Auto-Moderation</p>
                        <p className="text-sm text-[var(--hive-text-tertiary)]">Automatically flag and remove inappropriate content</p>
                      </div>
                      <Switch
                        checked={settings.autoModeration.enabled}
                        onCheckedChange={(checked: any) => setSettings({
                          ...settings,
                          autoModeration: { ...settings.autoModeration, enabled: checked }
                        })}
                      />
                    </div>

                    {settings.autoModeration.enabled && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-2">Flagged Words</label>
                          <textarea
                            className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border)] rounded-lg"
                            rows={3}
                            placeholder="Enter words to flag, separated by commas"
                            value={settings.autoModeration.flagWords.join(', ')}
                            onChange={(e: any) => setSettings({
                              ...settings,
                              autoModeration: {
                                ...settings.autoModeration,
                                flagWords: e.target.value.split(',').map(w => w.trim()).filter(Boolean)
                              }
                            })}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Auto-kick after warnings</p>
                            <p className="text-sm text-[var(--hive-text-tertiary)]">
                              Automatically remove members after {settings.autoModeration.maxWarnings} warnings
                            </p>
                          </div>
                          <Switch
                            checked={settings.autoModeration.autoKickAfterWarnings}
                            onCheckedChange={(checked: any) => setSettings({
                              ...settings,
                              autoModeration: { ...settings.autoModeration, autoKickAfterWarnings: checked }
                            })}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          )}

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-[var(--hive-brand-primary)]" />
                  <span className="text-xs text-[var(--hive-text-tertiary)]">Total</span>
                </div>
                <p className="text-2xl font-bold">{members.length}</p>
                <p className="text-sm text-[var(--hive-text-tertiary)]">Members</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
                  <span className="text-xs text-[var(--hive-text-tertiary)]">Staff</span>
                </div>
                <p className="text-2xl font-bold">
                  {members.filter(m => ['owner', 'admin', 'moderator'].includes(m.role)).length}
                </p>
                <p className="text-sm text-[var(--hive-text-tertiary)]">Moderators</p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="text-xs text-[var(--hive-text-tertiary)]">Issues</span>
                </div>
                <p className="text-2xl font-bold">
                  {members.filter(m => m.warnings && m.warnings > 0).length}
                </p>
                <p className="text-sm text-[var(--hive-text-tertiary)]">Warnings</p>
              </Card>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Member Growth</h3>
              <div className="h-64 bg-[var(--hive-background-secondary)] rounded-lg flex items-center justify-center">
                <p className="text-[var(--hive-text-tertiary)]">Growth chart coming soon</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}