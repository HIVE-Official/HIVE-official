"use client";

import { useState } from 'react';
import {
  Plus,
  Building2,
  Users,
  Home,
  GraduationCap,
  Lock,
  Globe,
  Eye,
  EyeOff,
  Settings,
  AlertCircle,
  CheckCircle,
  Upload,
  Link
} from 'lucide-react';
import {
  Card,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Alert,
  AlertDescription,
  Textarea
} from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import { db } from '@hive/core';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import type { SpaceType } from '@/lib/space-type-rules';
import { api } from '@/lib/api-client';

interface SpaceCreationFormData {
  // Basic Information
  name: string;
  handle: string; // URL-friendly identifier
  description: string;
  category: SpaceType;
  avatar?: string;
  coverImage?: string;

  // Access Control
  visibility: 'public' | 'campus_only' | 'invite_only';
  joinMethod: 'instant' | 'approval' | 'invitation_only';
  membershipLimit?: number;

  // Leadership
  leaderId?: string;
  leaderEmail?: string;
  coLeaders?: string[];

  // Category-Specific Fields
  // For University Orgs
  departmentId?: string;
  courseNumber?: string;
  facultyAdvisor?: string;

  // For Residential
  buildingName?: string;
  floorNumber?: string;

  // For Greek Life
  chapterName?: string;
  nationalOrg?: string;
  foundedYear?: number;

  // For Student Orgs
  organizationType?: 'academic' | 'cultural' | 'hobby' | 'professional' | 'service';
  fundingStatus?: 'funded' | 'unfunded' | 'pending';

  // Integration Settings
  enableRssFeed?: boolean;
  rssUrl?: string;
  enableCalendarSync?: boolean;
  calendarUrl?: string;
  externalWebsite?: string;

  // Initial Tools
  defaultTools?: string[];
}

const CATEGORY_CONFIGS = {
  student_organizations: {
    icon: Users,
    fields: ['organizationType', 'fundingStatus', 'externalWebsite'],
    defaultTools: ['event_coordination', 'member_onboarding', 'project_management']
  },
  university_organizations: {
    icon: GraduationCap,
    fields: ['departmentId', 'courseNumber', 'facultyAdvisor'],
    defaultTools: ['administrative', 'resource_allocation', 'student_services']
  },
  residential_spaces: {
    icon: Home,
    fields: ['buildingName', 'floorNumber'],
    defaultTools: ['resource_booking', 'issue_reporting', 'community_guidelines']
  },
  greek_life_spaces: {
    icon: Building2,
    fields: ['chapterName', 'nationalOrg', 'foundedYear'],
    defaultTools: ['rush_management', 'social_planning', 'alumni_network']
  }
};

export function SpaceCreationPanel() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<Partial<SpaceCreationFormData>>({
    category: 'student_organizations',
    visibility: 'campus_only',
    joinMethod: 'approval',
    enableRssFeed: false,
    enableCalendarSync: false
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Check if user is admin
  const isAdmin = user?.customClaims?.role === 'admin' || user?.customClaims?.isHiveAdmin;

  if (!isAdmin) {
    return (
      <Alert className="bg-red-900/20 border-red-600">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-red-400">
          You do not have permission to create spaces. Only HIVE admins can create new spaces.
        </AlertDescription>
      </Alert>
    );
  }

  const handleCreateSpace = async () => {
    setError(null);
    setCreating(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.handle || !formData.description) {
        throw new Error('Please fill in all required fields');
      }

      // Check handle uniqueness
      const handleCheck = await api.spaces.checkHandle(formData.handle);
      const handleResult = await handleCheck.json();
      if (!handleResult.available) {
        throw new Error('This handle is already taken');
      }

      // Create the space document
      const spaceData = {
        ...formData,
        id: `space_${formData.handle}`,
        campusId: 'ub-buffalo', // Hard-coded for vBETA
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdBy: user?.uid,
        memberCount: 0,
        postCount: 0,
        isActive: true,
        isVerified: true, // Admin-created spaces are auto-verified
        settings: {
          allowMemberPosts: true,
          requirePostApproval: false,
          allowEvents: true,
          allowTools: true,
          maxToolCount: CATEGORY_CONFIGS[formData.category as SpaceType].defaultTools.length * 2
        },
        metadata: {
          creationMethod: 'admin_panel',
          creatorRole: 'hive_admin'
        }
      };

      // Create in Firestore
      const spaceRef = doc(db, 'spaces', spaceData.id);
      await setDoc(spaceRef, spaceData);

      // Create initial subcollections
      await Promise.all([
        // Members collection with creator as owner
        setDoc(doc(db, 'spaces', spaceData.id, 'members', user!.uid), {
          userId: user!.uid,
          role: 'owner',
          joinedAt: serverTimestamp(),
          addedBy: 'system'
        }),

        // Settings document
        setDoc(doc(db, 'spaces', spaceData.id, 'settings', 'main'), {
          ...spaceData.settings,
          updatedAt: serverTimestamp()
        })
      ]);

      // Install default tools for the category
      const defaultTools = CATEGORY_CONFIGS[formData.category as SpaceType].defaultTools;
      if (defaultTools.length > 0) {
        await api.spaces.installDefaultTools(spaceData.id, defaultTools);
      }

      // If RSS feed is enabled, set it up
      if (formData.enableRssFeed && formData.rssUrl) {
        await api.spaces.setupRssFeed(spaceData.id, formData.rssUrl);
      }

      setSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          category: 'student_organizations',
          visibility: 'campus_only',
          joinMethod: 'approval',
          enableRssFeed: false,
          enableCalendarSync: false
        });
        setSuccess(false);
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Failed to create space');
    } finally {
      setCreating(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const categoryConfig = CATEGORY_CONFIGS[formData.category as SpaceType];

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[var(--hive-brand-primary)]/20 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Create New Space</h2>
              <p className="text-sm text-gray-400">Admin-only space creation panel</p>
            </div>
          </div>

          {success && (
            <Alert className="mb-6 bg-green-900/20 border-green-600">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-400">
                Space created successfully! It's now live and discoverable.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mb-6 bg-red-900/20 border-red-600">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <Label className="text-white mb-2">Space Category *</Label>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(CATEGORY_CONFIGS).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => updateFormData('category', key)}
                      className={`
                        p-4 rounded-lg border-2 transition-all
                        ${formData.category === key
                          ? 'bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)]'
                          : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                        }
                      `}
                    >
                      <Icon className="w-6 h-6 text-[var(--hive-brand-primary)] mb-2" />
                      <div className="text-sm font-medium text-white">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white">Space Name *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e: React.ChangeEvent) => updateFormData('name', e.target.value)}
                  placeholder="e.g., Computer Science Club"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label htmlFor="handle" className="text-white">URL Handle *</Label>
                <Input
                  id="handle"
                  value={formData.handle || ''}
                  onChange={(e: React.ChangeEvent) => updateFormData('handle', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                  placeholder="e.g., cs-club"
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Space URL: /spaces/{formData.handle || 'handle'}
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white">Description *</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e: React.ChangeEvent) => updateFormData('description', e.target.value)}
                placeholder="Describe what this space is about..."
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              />
            </div>

            {/* Category-Specific Fields */}
            {formData.category === 'student_organizations' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Organization Type</Label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) => updateFormData('organizationType', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="hobby">Hobby/Interest</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Funding Status</Label>
                  <Select
                    value={formData.fundingStatus}
                    onValueChange={(value) => updateFormData('fundingStatus', value)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="funded">SA Funded</SelectItem>
                      <SelectItem value="unfunded">Unfunded</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {formData.category === 'university_organizations' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Department</Label>
                  <Input
                    value={formData.departmentId || ''}
                    onChange={(e: React.ChangeEvent) => updateFormData('departmentId', e.target.value)}
                    placeholder="e.g., Computer Science"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white">Course Number</Label>
                  <Input
                    value={formData.courseNumber || ''}
                    onChange={(e: React.ChangeEvent) => updateFormData('courseNumber', e.target.value)}
                    placeholder="e.g., CSE 442"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            )}

            {formData.category === 'residential_spaces' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Building Name *</Label>
                  <Input
                    value={formData.buildingName || ''}
                    onChange={(e: React.ChangeEvent) => updateFormData('buildingName', e.target.value)}
                    placeholder="e.g., Ellicott Complex"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white">Floor/Section</Label>
                  <Input
                    value={formData.floorNumber || ''}
                    onChange={(e: React.ChangeEvent) => updateFormData('floorNumber', e.target.value)}
                    placeholder="e.g., 3rd Floor"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            )}

            {formData.category === 'greek_life_spaces' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Chapter Name *</Label>
                  <Input
                    value={formData.chapterName || ''}
                    onChange={(e: React.ChangeEvent) => updateFormData('chapterName', e.target.value)}
                    placeholder="e.g., Alpha Phi"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-white">National Organization</Label>
                  <Input
                    value={formData.nationalOrg || ''}
                    onChange={(e: React.ChangeEvent) => updateFormData('nationalOrg', e.target.value)}
                    placeholder="e.g., Alpha Phi International"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>
            )}

            {/* Access Control */}
            <div className="space-y-4 p-4 bg-gray-800/30 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-3">Access Control</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Visibility</Label>
                  <Select
                    value={formData.visibility}
                    onValueChange={(value) => updateFormData('visibility', value as any)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>Public</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="campus_only">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          <span>Campus Only</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="invite_only">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          <span>Invite Only</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white">Join Method</Label>
                  <Select
                    value={formData.joinMethod}
                    onValueChange={(value) => updateFormData('joinMethod', value as any)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instant Join</SelectItem>
                      <SelectItem value="approval">Requires Approval</SelectItem>
                      <SelectItem value="invitation_only">Invitation Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Integration Settings */}
            <div className="space-y-4 p-4 bg-gray-800/30 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-3">Integrations</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">RSS Feed Integration</Label>
                    <p className="text-xs text-gray-400">Auto-import events and announcements</p>
                  </div>
                  <Switch
                    checked={formData.enableRssFeed}
                    onCheckedChange={(checked) => updateFormData('enableRssFeed', checked)}
                  />
                </div>

                {formData.enableRssFeed && (
                  <Input
                    value={formData.rssUrl || ''}
                    onChange={(e: React.ChangeEvent) => updateFormData('rssUrl', e.target.value)}
                    placeholder="RSS feed URL"
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Calendar Sync</Label>
                    <p className="text-xs text-gray-400">Sync with external calendar</p>
                  </div>
                  <Switch
                    checked={formData.enableCalendarSync}
                    onCheckedChange={(checked) => updateFormData('enableCalendarSync', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Create Button */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setFormData({
                  category: 'student_organizations',
                  visibility: 'campus_only',
                  joinMethod: 'approval',
                  enableRssFeed: false,
                  enableCalendarSync: false
                })}
                disabled={creating}
              >
                Reset Form
              </Button>

              <Button
                onClick={handleCreateSpace}
                disabled={creating || !formData.name || !formData.handle || !formData.description}
                className="bg-[var(--hive-brand-primary)] text-black hover:bg-[var(--hive-brand-primary)]/90"
              >
                {creating ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Creating Space...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Space
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}