import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Switch } from '../../../components/ui/switch';
import { Separator } from '../../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Textarea } from '../../../components/ui/textarea';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { 
  Settings, 
  User, 
  Shield, 
  Eye, 
  Bell, 
  Mail, 
  Smartphone, 
  Lock,
  Camera,
  Trash2,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Moon,
  Sun,
  Palette,
  MessageCircle,
  Calendar,
  GraduationCap,
  UserX,
  Database,
  FileText,
  Activity
} from 'lucide-react';

/**
 * # HIVE Settings & Privacy System
 * 
 * Comprehensive settings and privacy controls for UB students on the HIVE platform.
 * Ensures students have full control over their data, visibility, and campus social experience.
 * 
 * ## Key Features:
 * - **Profile Management**: Handle, bio, photo, academic info updates
 * - **Privacy Controls**: Granular visibility settings for campus safety
 * - **Notification Preferences**: Smart campus-aware notifications
 * - **Data Management**: Download data, account deletion, data portability
 * - **Campus Safety**: UB-specific privacy and safety features
 * - **Accessibility**: Theme, font size, motion preferences
 */

const meta: Meta = {
  title: '11-Live Frontend/Settings & Privacy System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete settings and privacy management system for UB students on HIVE'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Mock User Data
const mockUser = {
  id: 'user123',
  email: 'sarah.johnson@buffalo.edu',
  handle: 'sarah.johnson',
  firstName: 'Sarah',
  lastName: 'Johnson', 
  bio: 'Computer Science major, love hiking and trying new restaurants around Buffalo!',
  profilePhoto: '/api/placeholder/150/150',
  graduationYear: '2026',
  major: 'Computer Science',
  dorm: 'Ellicott Complex',
  joinedAt: '2024-08-15T10:30:00Z',
  stats: {
    spacesJoined: 12,
    toolsCreated: 3,
    postsShared: 47,
    connections: 156
  }
};

// Settings State Management
const useSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      handle: mockUser.handle,
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      bio: mockUser.bio,
      profilePhoto: mockUser.profilePhoto,
      graduationYear: mockUser.graduationYear,
      major: mockUser.major,
      dorm: mockUser.dorm
    },
    privacy: {
      profileVisibility: 'public', // public, friends, private
      allowMessages: true,
      showActivity: true,
      showLocation: false,
      searchable: true,
      allowSpaceInvites: true,
      showGraduationYear: true,
      showMajor: true,
      showDorm: false
    },
    notifications: {
      email: {
        spacePosts: true,
        directMessages: true,
        spaceInvites: true,
        toolUpdates: false,
        weeklyDigest: true,
        securityAlerts: true
      },
      push: {
        spacePosts: false,
        directMessages: true,
        spaceInvites: true,
        toolUpdates: false
      },
      inApp: {
        spacePosts: true,
        directMessages: true,
        spaceInvites: true,
        toolUpdates: true,
        ritualReminders: true
      }
    },
    preferences: {
      theme: 'dark', // dark, light, auto
      fontSize: 'medium', // small, medium, large
      reduceMotion: false,
      autoplayVideos: true,
      showTips: true,
      language: 'en'
    },
    data: {
      downloadRequested: false,
      lastDownload: null,
      accountDeletionScheduled: false
    }
  });

  const updateSetting = (path: string, value: any) => {
    setSettings(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const saveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return {
    activeTab,
    setActiveTab,
    isLoading,
    settings,
    updateSetting,
    saveSettings
  };
};

// Settings Layout Component
const SettingsLayout = ({ 
  children, 
  title, 
  subtitle,
  actions
}: { 
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) => (
  <div className="min-h-screen bg-black text-white">
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Settings className="mr-3 h-8 w-8" />
              {title}
            </h1>
            {subtitle && <p className="text-gray-400 mt-2">{subtitle}</p>}
          </div>
          {actions}
        </div>
        <Separator className="bg-gray-800" />
      </div>
      
      {children}
    </div>
  </div>
);

// Profile Settings Tab
const ProfileSettingsTab = ({ 
  settings, 
  updateSetting 
}: { 
  settings: ReturnType<typeof useSettings>['settings'];
  updateSetting: (path: string, value: any) => void;
}) => (
  <div className="space-y-6">
    {/* Profile Photo Section */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Camera className="mr-2 h-5 w-5" />
          Profile Photo
        </CardTitle>
        <CardDescription className="text-gray-400">
          Help classmates recognize you around UB campus
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={settings.profile.profilePhoto} />
            <AvatarFallback className="bg-gray-800 text-white text-lg">
              {settings.profile.firstName[0]}{settings.profile.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex space-x-2">
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
              <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
            <p className="text-xs text-gray-500">JPG, PNG up to 5MB. Square images work best.</p>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Basic Info Section */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <User className="mr-2 h-5 w-5" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">First Name</Label>
            <Input
              value={settings.profile.firstName}
              onChange={(e) => updateSetting('profile.firstName', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Last Name</Label>
            <Input
              value={settings.profile.lastName}
              onChange={(e) => updateSetting('profile.lastName', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Handle</Label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500">@</span>
            <Input
              value={settings.profile.handle}
              onChange={(e) => updateSetting('profile.handle', e.target.value)}
              className="pl-8 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <p className="text-xs text-gray-500">This is how other students will find you on HIVE</p>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Bio</Label>
          <Textarea
            value={settings.profile.bio}
            onChange={(e) => updateSetting('profile.bio', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white resize-none"
            rows={3}
            maxLength={150}
          />
          <p className="text-xs text-gray-500 text-right">
            {settings.profile.bio.length}/150 characters
          </p>
        </div>
      </CardContent>
    </Card>

    {/* Academic Info Section */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          Academic Information
        </CardTitle>
        <CardDescription className="text-gray-400">
          Help us connect you with relevant classmates and spaces
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Graduation Year</Label>
            <Select
              value={settings.profile.graduationYear}
              onValueChange={(value) => updateSetting('profile.graduationYear', value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
                <SelectItem value="2028">2028</SelectItem>
                <SelectItem value="2029">2029</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Major</Label>
            <Select
              value={settings.profile.major}
              onValueChange={(value) => updateSetting('profile.major', value)}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Business Administration">Business Administration</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Psychology">Psychology</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="English">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Housing</Label>
          <Select
            value={settings.profile.dorm}
            onValueChange={(value) => updateSetting('profile.dorm', value)}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="Ellicott Complex">Ellicott Complex</SelectItem>
              <SelectItem value="Governors Complex">Governors Complex</SelectItem>
              <SelectItem value="South Campus Apartments">South Campus Apartments</SelectItem>
              <SelectItem value="Flint Loop">Flint Loop</SelectItem>
              <SelectItem value="Creekside Village">Creekside Village</SelectItem>
              <SelectItem value="Hadley Village">Hadley Village</SelectItem>
              <SelectItem value="Off Campus">Off Campus</SelectItem>
              <SelectItem value="Commuter">Commuter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>

    {/* Account Info */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Account Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-400">Email Address</Label>
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <span className="text-white">{mockUser.email}</span>
            <Badge variant="secondary" className="bg-green-900 text-green-300">
              Verified
            </Badge>
          </div>
          <p className="text-xs text-gray-500">
            Your UB email cannot be changed. Contact support if you need assistance.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-400">Member Since</Label>
          <div className="flex items-center p-3 bg-gray-800 rounded-lg">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-white">August 15, 2024</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-800 rounded-lg text-center">
            <p className="text-2xl font-bold text-yellow-500">{mockUser.stats.spacesJoined}</p>
            <p className="text-sm text-gray-400">Spaces Joined</p>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-400">{mockUser.stats.connections}</p>
            <p className="text-sm text-gray-400">Connections</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Privacy Settings Tab
const PrivacySettingsTab = ({ 
  settings, 
  updateSetting 
}: { 
  settings: ReturnType<typeof useSettings>['settings'];
  updateSetting: (path: string, value: any) => void;
}) => (
  <div className="space-y-6">
    {/* Profile Visibility */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Eye className="mr-2 h-5 w-5" />
          Profile Visibility
        </CardTitle>
        <CardDescription className="text-gray-400">
          Control who can see your profile and information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-white">Who can see your profile?</Label>
          <Select
            value={settings.privacy.profileVisibility}
            onValueChange={(value) => updateSetting('privacy.profileVisibility', value)}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="public">All UB Students & Faculty</SelectItem>
              <SelectItem value="friends">Connections Only</SelectItem>
              <SelectItem value="private">Private (Hidden)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-gray-700" />

        <div className="space-y-4">
          <h4 className="text-white font-medium">Information Visibility</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Show Major</p>
                <p className="text-gray-400 text-sm">Let others see your field of study</p>
              </div>
              <Switch
                checked={settings.privacy.showMajor}
                onCheckedChange={(checked) => updateSetting('privacy.showMajor', checked)}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Show Graduation Year</p>
                <p className="text-gray-400 text-sm">Display your expected graduation year</p>
              </div>
              <Switch
                checked={settings.privacy.showGraduationYear}
                onCheckedChange={(checked) => updateSetting('privacy.showGraduationYear', checked)}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Show Housing</p>
                <p className="text-gray-400 text-sm">Let others see which dorm/area you live in</p>
              </div>
              <Switch
                checked={settings.privacy.showDorm}
                onCheckedChange={(checked) => updateSetting('privacy.showDorm', checked)}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Show Activity Status</p>
                <p className="text-gray-400 text-sm">Display when you're active on HIVE</p>
              </div>
              <Switch
                checked={settings.privacy.showActivity}
                onCheckedChange={(checked) => updateSetting('privacy.showActivity', checked)}
                className="data-[state=checked]:bg-yellow-500"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Communication Settings */}
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          Communication & Interactions
        </CardTitle>
        <CardDescription className="text-gray-400">
          Manage how other students can interact with you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white">Allow Direct Messages</p>
            <p className="text-gray-400 text-sm">Let other UB students message you directly</p>
          </div>
          <Switch
            checked={settings.privacy.allowMessages}
            onCheckedChange={(checked) => updateSetting('privacy.allowMessages', checked)}
            className="data-[state=checked]:bg-yellow-500"
          />
        </div>

        <Separator className="bg-gray-700" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white">Allow Space Invites</p>
            <p className="text-gray-400 text-sm">Let others invite you to join spaces</p>
          </div>
          <Switch
            checked={settings.privacy.allowSpaceInvites}
            onCheckedChange={(checked) => updateSetting('privacy.allowSpaceInvites', checked)}
            className="data-[state=checked]:bg-yellow-500"
          />
        </div>

        <Separator className="bg-gray-700" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-white">Searchable Profile</p>
            <p className="text-gray-400 text-sm">Allow others to find you in search</p>
          </div>
          <Switch
            checked={settings.privacy.searchable}
            onCheckedChange={(checked) => updateSetting('privacy.searchable', checked)}
            className="data-[state=checked]:bg-yellow-500"
          />
        </div>
      </CardContent>
    </Card>

    {/* Campus Safety */}
    <Card className="bg-blue-900/20 border-blue-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Shield className="mr-2 h-5 w-5 text-blue-400" />
          Campus Safety & Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="border-blue-800 bg-blue-900/20">
          <Shield className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>HIVE is UB-only.</strong> Your information is only visible to verified UB students and faculty. 
            We never share data with external parties or other universities.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <h4 className="text-white font-medium">Safety Features</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              @buffalo.edu email verification required
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Profile data encrypted and secure
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Report and block features available
            </li>
            <li className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              24/7 moderation and support
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Main Settings Component
const SettingsSystem = () => {
  const settingsState = useSettings();

  return (
    <SettingsLayout 
      title="Settings" 
      subtitle="Manage your profile, privacy, and preferences"
      actions={
        <Button 
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
          onClick={settingsState.saveSettings}
          disabled={settingsState.isLoading}
        >
          {settingsState.isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      }
    >
      <Tabs value={settingsState.activeTab} onValueChange={settingsState.setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 text-gray-300">
          <TabsTrigger value="profile" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            <Shield className="mr-2 h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            <Palette className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile">
            <ProfileSettingsTab settings={settingsState.settings} updateSetting={settingsState.updateSetting} />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacySettingsTab settings={settingsState.settings} updateSetting={settingsState.updateSetting} />
          </TabsContent>

          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Palette className="mr-2 h-5 w-5" />
                    Theme & Display
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Dark Mode</p>
                      <p className="text-gray-400 text-sm">Use dark theme across HIVE</p>
                    </div>
                    <Switch
                      checked={settingsState.settings.preferences.theme === 'dark'}
                      onCheckedChange={(checked) => settingsState.updateSetting('preferences.theme', checked ? 'dark' : 'light')}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Reduce Motion</p>
                      <p className="text-gray-400 text-sm">Minimize animations and transitions</p>
                    </div>
                    <Switch
                      checked={settingsState.settings.preferences.reduceMotion}
                      onCheckedChange={(checked) => settingsState.updateSetting('preferences.reduceMotion', checked)}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </SettingsLayout>
  );
};

// Story Exports
export const CompleteSettingsSystem: Story = {
  render: () => <SettingsSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete settings and privacy management system with all UB-specific features and controls'
      }
    }
  }
};

export const ProfileSettings: Story = {
  render: () => {
    const settingsState = useSettings();
    return (
      <SettingsLayout title="Profile Settings" subtitle="Manage your personal information">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <ProfileSettingsTab settings={settingsState.settings} updateSetting={settingsState.updateSetting} />
          </CardContent>
        </Card>
      </SettingsLayout>
    );
  }
};

export const PrivacySettings: Story = {
  render: () => {
    const settingsState = useSettings();
    return (
      <SettingsLayout title="Privacy & Safety" subtitle="Control your visibility and interactions">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <PrivacySettingsTab settings={settingsState.settings} updateSetting={settingsState.updateSetting} />
          </CardContent>
        </Card>
      </SettingsLayout>
    );
  }
};

export const MobileSettingsExperience: Story = {
  render: () => <SettingsSystem />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile-optimized settings interface for campus mobile usage'
      }
    }
  }
};