"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfileModern, useUpdateProfile, useUploadProfilePhoto } from '@hive/hooks';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Input,
  Textarea,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  ComprehensiveFormField,
  ProfileAvatar,
  Container,
  Separator,
  Switch,
  Progress,
  HiveModal,
  UB_MAJORS,
  UB_ACADEMIC_YEARS,
} from '@hive/ui';
import {
  User,
  Camera,
  Save,
  X,
  AlertCircle,
  Check,
  ChevronLeft,
  Shield,
  Eye,
  EyeOff,
  Users,
  Globe,
  Lock,
  Bell,
  MessageCircle,
  Loader2,
  GraduationCap,
  Home,
  Hash,
  Sparkles,
} from 'lucide-react';
import { useSession } from '@/hooks/use-session';

const PRONOUNS_OPTIONS = [
  'he/him',
  'she/her',
  'they/them',
  'ze/zir',
  'xe/xem',
  'other',
  'prefer not to say',
];

const HOUSING_OPTIONS = [
  'Ellicott Complex',
  'Governors Complex',
  'South Campus',
  'Flint Loop',
  'Off Campus - North',
  'Off Campus - South',
  'Off Campus - Downtown',
  'Commuter',
];

const INTERESTS_OPTIONS = [
  'Computer Science',
  'Engineering',
  'Business',
  'Healthcare',
  'Arts & Design',
  'Music',
  'Sports',
  'Gaming',
  'Research',
  'Entrepreneurship',
  'Social Impact',
  'Technology',
  'Photography',
  'Writing',
  'Cooking',
];

export default function ProfileEditPage() {
  const router = useRouter();
  const { user } = useSession();
  const { profile, loading: profileLoading, completionPercentage } = useProfileModern();
  const updateProfileMutation = useUpdateProfile();
  const uploadPhotoMutation = useUploadProfilePhoto();

  const [activeTab, setActiveTab] = useState('personal');
  const [isDirty, setIsDirty] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    handle: '',
    pronouns: '',
    bio: '',
    statusMessage: '',
    
    // Academic Information
    major: '',
    academicYear: '',
    graduationYear: new Date().getFullYear() + 4,
    housing: '',
    
    // Interests
    interests: [] as string[],
    
    // Privacy Settings
    isPublic: true,
    showActivity: true,
    showSpaces: true,
    showConnections: true,
    allowDirectMessages: true,
    showOnlineStatus: true,
    ghostModeEnabled: false,
    ghostModeLevel: 'minimal' as 'minimal' | 'moderate' | 'maximum',
    
    // Builder Settings
    builderOptIn: false,
    builderSpecializations: [] as string[],
  });

  // Initialize form data from profile
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.identity?.fullName || '',
        handle: profile.identity?.handle || '',
        pronouns: profile.academic?.pronouns || '',
        bio: profile.personal?.bio || '',
        statusMessage: profile.personal?.statusMessage || '',
        major: profile.academic?.major || '',
        academicYear: profile.academic?.academicYear || '',
        graduationYear: profile.academic?.graduationYear || new Date().getFullYear() + 4,
        housing: profile.academic?.housing || '',
        interests: profile.personal?.interests || [],
        isPublic: profile.privacy?.isPublic ?? true,
        showActivity: profile.privacy?.showActivity ?? true,
        showSpaces: profile.privacy?.showSpaces ?? true,
        showConnections: profile.privacy?.showConnections ?? true,
        allowDirectMessages: profile.privacy?.allowDirectMessages ?? true,
        showOnlineStatus: profile.privacy?.showOnlineStatus ?? true,
        ghostModeEnabled: profile.privacy?.ghostMode?.enabled ?? false,
        ghostModeLevel: profile.privacy?.ghostMode?.level || 'minimal',
        builderOptIn: profile.builder?.builderOptIn ?? false,
        builderSpecializations: profile.builder?.specializations || [],
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo must be less than 5MB');
        return;
      }
      
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Upload photo first if changed
      let avatarUrl = profile?.identity?.avatarUrl;
      if (photoFile) {
        const photoResult = await uploadPhotoMutation.mutateAsync(photoFile);
        avatarUrl = photoResult.avatarUrl;
      }

      // Update profile data
      await updateProfileMutation.mutateAsync({
        identity: {
          fullName: formData.fullName,
          avatarUrl,
        },
        academic: {
          major: formData.major,
          academicYear: formData.academicYear as any,
          graduationYear: formData.graduationYear,
          housing: formData.housing,
          pronouns: formData.pronouns,
        },
        personal: {
          bio: formData.bio,
          statusMessage: formData.statusMessage,
          interests: formData.interests,
        },
        privacy: {
          isPublic: formData.isPublic,
          showActivity: formData.showActivity,
          showSpaces: formData.showSpaces,
          showConnections: formData.showConnections,
          allowDirectMessages: formData.allowDirectMessages,
          showOnlineStatus: formData.showOnlineStatus,
          ghostMode: {
            enabled: formData.ghostModeEnabled,
            level: formData.ghostModeLevel,
          },
        },
        builder: {
          builderOptIn: formData.builderOptIn,
          specializations: formData.builderSpecializations,
        },
      });

      setIsDirty(false);
      router.push('/profile');
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowExitModal(true);
    } else {
      router.push('/profile');
    }
  };

  const isLoading = profileLoading || updateProfileMutation.isPending || uploadPhotoMutation.isPending;

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <Container className="max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-sm text-muted-foreground">
              Customize your HIVE presence
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Profile Strength</p>
            <div className="flex items-center gap-2">
              <Progress value={completionPercentage} className="w-24 h-2" />
              <span className="text-sm font-medium">{completionPercentage}%</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading || !isDirty}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="builder">Builder</TabsTrigger>
        </TabsList>

        {/* Personal Tab */}
        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
              <CardDescription>
                Your photo helps others recognize you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <ProfileAvatar
                    src={photoPreview || profile?.identity?.avatarUrl}
                    alt={formData.fullName}
                    size="xl"
                    fallback={formData.fullName.charAt(0)}
                  />
                  <label
                    htmlFor="photo-upload"
                    className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    <Camera className="h-4 w-4 text-primary-foreground" />
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                      disabled={isLoading}
                    />
                  </label>
                </div>
                
                <div className="flex-1 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Upload a photo that represents you. Max size: 5MB
                  </p>
                  {photoFile && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <Check className="h-4 w-4" />
                      New photo selected
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                How you appear across HIVE
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComprehensiveFormField
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  icon={<User className="h-4 w-4" />}
                  required
                />
                
                <ComprehensiveFormField
                  label="Handle"
                  value={formData.handle}
                  onChange={(e) => handleInputChange('handle', e.target.value)}
                  placeholder="johndoe"
                  icon={<Hash className="h-4 w-4" />}
                  helperText="Your unique username"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label>Pronouns</Label>
                <Select
                  value={formData.pronouns}
                  onValueChange={(value: any) => handleInputChange('pronouns', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pronouns" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRONOUNS_OPTIONS.map(pronoun => (
                      <SelectItem key={pronoun} value={pronoun}>
                        {pronoun}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.bio.length}/500
                </p>
              </div>

              <div className="space-y-2">
                <Label>Status Message</Label>
                <Input
                  value={formData.statusMessage}
                  onChange={(e) => handleInputChange('statusMessage', e.target.value)}
                  placeholder="What are you up to?"
                  maxLength={100}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interests</CardTitle>
              <CardDescription>
                Help others find you through shared interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {INTERESTS_OPTIONS.map(interest => (
                  <Badge
                    key={interest}
                    variant={formData.interests.includes(interest) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      const newInterests = formData.interests.includes(interest)
                        ? formData.interests.filter(i => i !== interest)
                        : [...formData.interests, interest];
                      handleInputChange('interests', newInterests);
                    }}
                  >
                    {formData.interests.includes(interest) && (
                      <Check className="h-3 w-3 mr-1" />
                    )}
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Information</CardTitle>
              <CardDescription>
                Your academic profile at UB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Major</Label>
                  <Select
                    value={formData.major}
                    onValueChange={(value: any) => handleInputChange('major', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your major" />
                    </SelectTrigger>
                    <SelectContent>
                      {UB_MAJORS.map(major => (
                        <SelectItem key={major} value={major}>
                          {major}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Academic Year</Label>
                  <Select
                    value={formData.academicYear}
                    onValueChange={(value: any) => handleInputChange('academicYear', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      {UB_ACADEMIC_YEARS.map(year => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComprehensiveFormField
                  label="Graduation Year"
                  type="number"
                  value={formData.graduationYear.toString()}
                  onChange={(e) => handleInputChange('graduationYear', parseInt(e.target.value))}
                  placeholder="2025"
                  icon={<GraduationCap className="h-4 w-4" />}
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 10}
                />

                <div className="space-y-2">
                  <Label>Housing</Label>
                  <Select
                    value={formData.housing}
                    onValueChange={(value: any) => handleInputChange('housing', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select housing" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOUSING_OPTIONS.map(housing => (
                        <SelectItem key={housing} value={housing}>
                          {housing}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Visibility</CardTitle>
              <CardDescription>
                Control who can see your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Public Profile</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anyone to view your profile
                  </p>
                </div>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked: any) => handleInputChange('isPublic', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Activity</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your recent activity on your profile
                  </p>
                </div>
                <Switch
                  checked={formData.showActivity}
                  onCheckedChange={(checked: any) => handleInputChange('showActivity', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Spaces</Label>
                  <p className="text-sm text-muted-foreground">
                    Display the spaces you're a member of
                  </p>
                </div>
                <Switch
                  checked={formData.showSpaces}
                  onCheckedChange={(checked: any) => handleInputChange('showSpaces', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Connections</Label>
                  <p className="text-sm text-muted-foreground">
                    Display your connections count
                  </p>
                </div>
                <Switch
                  checked={formData.showConnections}
                  onCheckedChange={(checked: any) => handleInputChange('showConnections', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication</CardTitle>
              <CardDescription>
                Manage how others can interact with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow others to send you direct messages
                  </p>
                </div>
                <Switch
                  checked={formData.allowDirectMessages}
                  onCheckedChange={(checked: any) => handleInputChange('allowDirectMessages', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Online Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Show when you're online
                  </p>
                </div>
                <Switch
                  checked={formData.showOnlineStatus}
                  onCheckedChange={(checked: any) => handleInputChange('showOnlineStatus', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ghost Mode</CardTitle>
              <CardDescription>
                Browse HIVE with enhanced privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Ghost Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Hide your activity from others
                  </p>
                </div>
                <Switch
                  checked={formData.ghostModeEnabled}
                  onCheckedChange={(checked: any) => handleInputChange('ghostModeEnabled', checked)}
                />
              </div>

              {formData.ghostModeEnabled && (
                <div className="space-y-2">
                  <Label>Ghost Mode Level</Label>
                  <Select
                    value={formData.ghostModeLevel}
                    onValueChange={(value: any) => handleInputChange('ghostModeLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimal">
                        <div>
                          <p className="font-medium">Minimal</p>
                          <p className="text-xs text-muted-foreground">Hide online status only</p>
                        </div>
                      </SelectItem>
                      <SelectItem value="moderate">
                        <div>
                          <p className="font-medium">Moderate</p>
                          <p className="text-xs text-muted-foreground">Hide activity and status</p>
                        </div>
                      </SelectItem>
                      <SelectItem value="maximum">
                        <div>
                          <p className="font-medium">Maximum</p>
                          <p className="text-xs text-muted-foreground">Complete invisibility</p>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Builder Tab */}
        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Builder Program</CardTitle>
              <CardDescription>
                Join the HIVE Builder community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex gap-3">
                  <Sparkles className="h-5 w-5 text-amber-600 dark:text-[var(--hive-gold)] mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                      Become a HIVE Builder
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Create tools and solutions for the campus community. Get early access to new features
                      and shape the future of HIVE.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Opt into Builder Program</Label>
                  <p className="text-sm text-muted-foreground">
                    Start creating tools for your community
                  </p>
                </div>
                <Switch
                  checked={formData.builderOptIn}
                  onCheckedChange={(checked: any) => handleInputChange('builderOptIn', checked)}
                />
              </div>

              {formData.builderOptIn && (
                <div className="space-y-4">
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Specializations</Label>
                    <p className="text-sm text-muted-foreground">
                      What types of tools do you want to build?
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Study Tools', 'Social Features', 'Productivity', 'Analytics', 'Automation', 'Entertainment'].map(spec => (
                        <Badge
                          key={spec}
                          variant={formData.builderSpecializations.includes(spec) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => {
                            const newSpecs = formData.builderSpecializations.includes(spec)
                              ? formData.builderSpecializations.filter(s => s !== spec)
                              : [...formData.builderSpecializations, spec];
                            handleInputChange('builderSpecializations', newSpecs);
                          }}
                        >
                          {formData.builderSpecializations.includes(spec) && (
                            <Check className="h-3 w-3 mr-1" />
                          )}
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Exit Confirmation Modal */}
      <HiveModal
        open={showExitModal}
        onOpenChange={setShowExitModal}
        title="Unsaved Changes"
        description="You have unsaved changes. Are you sure you want to leave?"
      >
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowExitModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => router.push('/profile')}
          >
            Leave Without Saving
          </Button>
        </div>
      </HiveModal>
    </Container>
  );
}