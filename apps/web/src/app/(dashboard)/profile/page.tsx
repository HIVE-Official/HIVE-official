"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageContainer, Button, Card, HiveShell } from '@hive/ui';
import { 
  User, Camera, MapPin, Calendar, Edit3, Settings, 
  GraduationCap, Home, MessageCircle, Palette, Plus, Upload, X
} from 'lucide-react';
import { useSession } from '../../../hooks/use-session';

interface CampusProfile {
  // Core Campus Identity
  fullName: string;
  preferredName?: string;
  profilePhoto?: string;
  avatarUrl?: string;
  academicYear: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'other';
  major: string;
  housing: string;
  pronouns?: string;
  statusMessage?: string;
  
  // Basic Stats for Launch
  joinedSpaces: number;
  createdAt: string;
  lastActive: string;
}

async function fetchCampusProfile(): Promise<CampusProfile> {
  let headers: HeadersInit = {};
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
    } else {
      headers.Authorization = `Bearer test-token`;
    }
  } catch (error) {
    console.warn('Could not get auth token, using test token');
    headers.Authorization = `Bearer test-token`;
  }

  const response = await fetch('/api/profile', { headers });
  if (!response.ok) {
    // Return mock campus profile for development
    return {
      fullName: 'Development User',
      preferredName: 'Dev',
      academicYear: 'junior',
      major: 'Computer Science',
      housing: 'Smith Hall, Room 305',
      pronouns: 'they/them',
      statusMessage: 'Building epic study tools 🔥',
      joinedSpaces: 5,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };
  }
  
  const data = await response.json();
  return data.user;
}

// Avatar generation function
function generateAvatarColors(name: string) {
  const colors = [
    ['from-blue-500', 'to-blue-600'],
    ['from-purple-500', 'to-purple-600'], 
    ['from-green-500', 'to-green-600'],
    ['from-red-500', 'to-red-600'],
    ['from-yellow-500', 'to-yellow-600'],
    ['from-pink-500', 'to-pink-600'],
    ['from-indigo-500', 'to-indigo-600'],
    ['from-teal-500', 'to-teal-600']
  ];
  
  const hash = name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}

export default function CampusProfilePage() {
  const { user } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<CampusProfile>>({});
  const [isClient, setIsClient] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { 
    data: profile, 
    isLoading, 
    error 
  } = useQuery<CampusProfile>({
    queryKey: ["campus-profile"],
    queryFn: fetchCampusProfile,
    staleTime: 60000, // 1 minute
    enabled: !!user && isClient
  });

  // Photo upload mutation
  const uploadPhotoMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('photo', file);
      
      let headers: HeadersInit = {};
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
        } else {
          headers.Authorization = `Bearer test-token`;
        }
      } catch (error) {
        headers.Authorization = `Bearer test-token`;
      }

      const response = await fetch('/api/profile/upload-photo', {
        method: 'POST',
        headers,
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campus-profile"] });
      setShowPhotoUpload(false);
      setPreviewImage(null);
    },
    onError: (error) => {
      console.error('Photo upload failed:', error);
      alert('Failed to upload photo. Please try again.');
    }
  });

  // Avatar generation mutation
  const generateAvatarMutation = useMutation({
    mutationFn: async () => {
      let headers: HeadersInit = {};
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
        } else {
          headers.Authorization = `Bearer test-token`;
        }
      } catch (error) {
        headers.Authorization = `Bearer test-token`;
      }

      const response = await fetch('/api/profile/generate-avatar', {
        method: 'POST',
        headers
      });

      if (!response.ok) {
        throw new Error('Failed to generate avatar');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campus-profile"] });
    },
    onError: (error) => {
      console.error('Avatar generation failed:', error);
      alert('Failed to generate avatar. Please try again.');
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      uploadPhotoMutation.mutate(file);
    }
  };

  // Profile update mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: Partial<CampusProfile>) => {
      let headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
        } else {
          headers.Authorization = `Bearer test-token`;
        }
      } catch (error) {
        headers.Authorization = `Bearer test-token`;
      }

      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers,
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campus-profile"] });
      setIsEditing(false);
      setEditForm({});
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
      alert('Failed to update profile. Please try again.');
    }
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (Object.keys(editForm).length > 0) {
        updateProfileMutation.mutate(editForm);
      } else {
        setIsEditing(false);
      }
    } else {
      // Start editing - populate form with current values
      setEditForm({
        fullName: profile?.fullName || '',
        statusMessage: profile?.statusMessage || '',
        academicYear: profile?.academicYear || 'junior',
        major: profile?.major || '',
        housing: profile?.housing || '',
        pronouns: profile?.pronouns || '',
      });
      setIsEditing(true);
    }
  };

  const handleFormChange = (field: keyof CampusProfile, value: string | CampusProfile['academicYear']) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const avatarColors = generateAvatarColors(profile?.fullName || user?.fullName || 'User');

  if (!user || !isClient) {
    return (
      <PageContainer title="Loading..." maxWidth="4xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-[#FFD700] rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-white">Loading your campus profile...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <HiveShell
      layout="profile"
      pageTitle="Your Campus Profile"
      breadcrumbs={[
        { label: "Profile", href: "/profile", icon: User }
      ]}
      actions={
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
            onClick={handleEditToggle}
            disabled={updateProfileMutation.isPending}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            {updateProfileMutation.isPending ? 'Saving...' : (isEditing ? 'Save Profile' : 'Edit Profile')}
          </Button>
          <Button 
            variant="outline"
            className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
            onClick={() => window.location.href = "/settings"}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto">
      {/* Campus Identity Header */}
      <Card className="p-8 mb-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-500/20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Photo Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/20 ${
                (profile?.profilePhoto || profile?.avatarUrl) 
                  ? 'bg-transparent' 
                  : `bg-gradient-to-br ${avatarColors[0]} ${avatarColors[1]}`
              }`}>
                {(profile?.profilePhoto || profile?.avatarUrl) ? (
                  <img 
                    src={profile.profilePhoto || profile.avatarUrl} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white">
                    {profile?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 
                     user?.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 rounded-full p-3 h-12 w-12 bg-[#FFD700] hover:bg-[#FFE255] text-black"
                onClick={() => setShowPhotoUpload(true)}
                disabled={uploadPhotoMutation.isPending}
              >
                <Camera className="h-5 w-5" />
              </Button>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
              onClick={() => generateAvatarMutation.mutate()}
              disabled={generateAvatarMutation.isPending}
            >
              <Palette className="h-4 w-4 mr-2" />
              {generateAvatarMutation.isPending ? 'Generating...' : 'Generate Avatar'}
            </Button>
          </div>

          {/* Identity Information */}
          <div className="flex-1 space-y-6">
            {/* Name & Status */}
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-4xl font-bold text-white">
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.fullName || ''}
                      onChange={(e) => handleFormChange('fullName', e.target.value)}
                      className="bg-transparent border-b-2 border-[#FFD700] focus:outline-none text-white"
                    />
                  ) : (
                    profile?.fullName || user.fullName || 'Campus Builder'
                  )}
                </h1>
                {profile?.preferredName && (
                  <span className="text-xl text-white/70">"{profile.preferredName}"</span>
                )}
              </div>
              
              <div className="mb-4">
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editForm.pronouns || ''}
                    onChange={(e) => handleFormChange('pronouns', e.target.value)}
                    placeholder="Pronouns (optional)"
                    className="bg-[rgba(255,255,255,0.1)] border border-white/20 rounded text-white p-2 text-sm"
                  />
                ) : (
                  profile?.pronouns && (
                    <p className="text-white/60 text-lg">{profile.pronouns}</p>
                  )
                )}
              </div>

              <div className="flex items-center gap-2 p-3 bg-[rgba(255,215,0,0.1)] border border-[#FFD700]/30 rounded-lg mb-4">
                <MessageCircle className="h-5 w-5 text-[#FFD700]" />
                {isEditing ? (
                  <input 
                    type="text" 
                    value={editForm.statusMessage || ''}
                    onChange={(e) => handleFormChange('statusMessage', e.target.value)}
                    placeholder="What are you building?"
                    className="bg-transparent focus:outline-none text-white flex-1"
                  />
                ) : (
                  <span className="text-white">
                    {profile?.statusMessage || 'Building something awesome! 🚀'}
                  </span>
                )}
              </div>
            </div>

            {/* Campus Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-white/60 text-sm">Academic Year</p>
                    {isEditing ? (
                      <select 
                        value={editForm.academicYear || ''}
                        onChange={(e) => handleFormChange('academicYear', e.target.value)}
                        className="bg-[rgba(255,255,255,0.1)] border border-white/20 rounded text-white p-1"
                      >
                        <option value="freshman">Freshman</option>
                        <option value="sophomore">Sophomore</option>
                        <option value="junior">Junior</option>
                        <option value="senior">Senior</option>
                        <option value="graduate">Graduate</option>
                        <option value="other">Other</option>
                      </select>
                    ) : (
                      <p className="text-white font-medium capitalize">
                        {profile?.academicYear || 'Junior'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="text-white/60 text-sm">Major</p>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.major || ''}
                        onChange={(e) => handleFormChange('major', e.target.value)}
                        className="bg-[rgba(255,255,255,0.1)] border border-white/20 rounded text-white p-1"
                      />
                    ) : (
                      <p className="text-white font-medium">
                        {profile?.major || 'Computer Science'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-white/60 text-sm">Housing</p>
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={editForm.housing || ''}
                        onChange={(e) => handleFormChange('housing', e.target.value)}
                        placeholder="Dorm or off-campus"
                        className="bg-[rgba(255,255,255,0.1)] border border-white/20 rounded text-white p-1"
                      />
                    ) : (
                      <p className="text-white font-medium">
                        {profile?.housing || 'Smith Hall, Room 305'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-white/60 text-sm">Joined HIVE</p>
                    <p className="text-white font-medium">
                      {new Date(profile?.createdAt || Date.now()).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Campus Activity Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Campus Engagement */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-[#FFD700]" />
            Campus Presence
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
              <span className="text-white/80">Spaces Joined</span>
              <span className="text-2xl font-bold text-[#FFD700]">{profile?.joinedSpaces || 0}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
              <span className="text-white/80">Last Active</span>
              <span className="text-white font-medium">
                {profile?.lastActive ? new Date(profile.lastActive).toLocaleDateString() : 'Today'}
              </span>
            </div>

            <div className="p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
              <p className="text-white/60 text-sm mb-2">Campus Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">Active Student</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Quick Actions</h2>
          
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
              onClick={() => window.location.href = "/spaces/browse"}
            >
              <Plus className="h-4 w-4 mr-3" />
              Join a Space
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
              onClick={() => window.location.href = "/spaces/my"}
            >
              <MapPin className="h-4 w-4 mr-3" />
              My Spaces
            </Button>
            
            <Button 
              variant="outline"
              className="w-full justify-start border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
              onClick={() => window.location.href = "/settings"}
            >
              <Settings className="h-4 w-4 mr-3" />
              Profile Settings
            </Button>
          </div>
        </Card>

        {/* Getting Started */}
        <Card className="p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-[#FFD700]/20">
          <h2 className="text-lg font-semibold text-white mb-4">Complete Your Profile</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Profile Photo</span>
              <span className={profile?.profilePhoto || profile?.avatarUrl ? "text-green-400" : "text-gray-400"}>
                {profile?.profilePhoto || profile?.avatarUrl ? "✓" : "○"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Academic Info</span>
              <span className={profile?.academicYear && profile?.major ? "text-green-400" : "text-yellow-400"}>
                {profile?.academicYear && profile?.major ? "✓" : "⋯"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Housing Details</span>
              <span className={profile?.housing ? "text-green-400" : "text-yellow-400"}>
                {profile?.housing ? "✓" : "⋯"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Join a Space</span>
              <span className={(profile?.joinedSpaces || 0) > 0 ? "text-green-400" : "text-gray-400"}>
                {(profile?.joinedSpaces || 0) > 0 ? "✓" : "○"}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-white/60 mb-3">Complete your profile to connect with your campus community</p>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div className="bg-[#FFD700] h-2 rounded-full" style={{
                width: `${Math.round(
                  ((profile?.profilePhoto || profile?.avatarUrl ? 1 : 0) +
                   (profile?.academicYear && profile?.major ? 1 : 0) +
                   (profile?.housing ? 1 : 0) +
                   ((profile?.joinedSpaces || 0) > 0 ? 1 : 0)) / 4 * 100
                )}%`
              }}></div>
            </div>
            <p className="text-xs text-[#FFD700] mt-1">
              {Math.round(
                ((profile?.profilePhoto || profile?.avatarUrl ? 1 : 0) +
                 (profile?.academicYear && profile?.major ? 1 : 0) +
                 (profile?.housing ? 1 : 0) +
                 ((profile?.joinedSpaces || 0) > 0 ? 1 : 0)) / 4 * 100
              )}% Complete
            </p>
          </div>
        </Card>
      </div>

      {/* Photo Upload Modal */}
      {showPhotoUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Upload Profile Photo</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowPhotoUpload(false);
                  setPreviewImage(null);
                }}
                className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Upload Area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded-lg p-8 text-center cursor-pointer hover:border-[#FFD700] transition-colors"
              >
                {previewImage ? (
                  <div className="space-y-4">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white/20"
                    />
                    <p className="text-white text-sm">Click to choose a different photo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-[#A1A1AA] mx-auto" />
                    <div>
                      <p className="text-white mb-1">Click to upload a photo</p>
                      <p className="text-[#A1A1AA] text-sm">JPG, PNG or GIF (max 5MB)</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                  onClick={() => {
                    setShowPhotoUpload(false);
                    setPreviewImage(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
                  onClick={handlePhotoUpload}
                  disabled={!previewImage || uploadPhotoMutation.isPending}
                >
                  {uploadPhotoMutation.isPending ? 'Uploading...' : 'Upload Photo'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Hidden file input for photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      </div>
    </HiveShell>
  );
}