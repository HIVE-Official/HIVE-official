"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHiveProfile } from '../../../../hooks/use-hive-profile';
import { ErrorBoundary } from '../../../../components/error-boundary';
import { 
  Camera, 
  Save, 
  ArrowLeft,
  User,
  GraduationCap,
  MapPin,
  Hash
} from 'lucide-react';

export default function ProfileEditPage() {
  const router = useRouter();
  const { profile, updateProfile, uploadAvatar, isLoading, isUpdating, error } = useHiveProfile();
  const [isFormDirty, setIsFormDirty] = useState(false);
  
  // Form state - using proper HIVE design system components
  const [formData, setFormData] = useState({
    fullName: '',
    handle: '',
    bio: '',
    pronouns: '',
    major: '',
    academicYear: '',
    graduationYear: '',
    housing: '',
    interests: [] as string[]
  });

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.identity.fullName || '',
        handle: profile.identity.handle || '',
        bio: profile.personal.bio || '',
        pronouns: profile.academic.pronouns || '',
        major: profile.academic.major || '',
        academicYear: profile.academic.academicYear || '',
        graduationYear: String(profile.academic.graduationYear || ''),
        housing: profile.academic.housing || '',
        interests: profile.personal.interests || []
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsFormDirty(true);
  };

  const handleSave = async () => {
    try {
      const updateData = {
        identity: {
          fullName: formData.fullName,
          handle: formData.handle
        },
        personal: {
          bio: formData.bio,
          interests: formData.interests
        },
        academic: {
          pronouns: formData.pronouns,
          major: formData.major,
          academicYear: formData.academicYear,
          graduationYear: formData.graduationYear,
          housing: formData.housing
        }
      };

      const success = await updateProfile(updateData as any);
      if (success) {
        setIsFormDirty(false);
        router.push('/profile');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadAvatar(file);
    }
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-8 h-8 bg-hive-brand-secondary rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-hive-text-secondary">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-hive-background-primary">
        {/* Header */}
        <div className="border-b border-hive-border-default bg-hive-background-secondary">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-lg hover:bg-hive-interactive-hover transition-colors"
                >
                  <ArrowLeft size={20} className="text-hive-text-secondary" />
                </button>
                <div>
                  <h1 className="text-heading-lg font-semibold text-hive-text-primary">Edit Profile</h1>
                  <p className="text-body-md text-hive-text-secondary">Update your HIVE profile information</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/profile')}
                  className="px-4 py-2 border border-hive-border-default rounded-lg text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!isFormDirty || isUpdating}
                  className="px-4 py-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Save size={16} />
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Avatar Section */}
            <div className="lg:col-span-1">
              <div className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-6">
                <h2 className="text-heading-md font-semibold text-hive-text-primary mb-4">Profile Photo</h2>
                
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    {profile.identity.avatarUrl ? (
                      <img
                        src={profile.identity.avatarUrl}
                        alt={profile.identity.fullName}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-hive-brand-secondary rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {profile.identity.fullName?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 p-2 bg-hive-brand-secondary rounded-full cursor-pointer hover:bg-hive-brand-hover transition-colors">
                      <Camera size={14} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-body-sm text-hive-text-tertiary">
                    Click the camera icon to upload a new photo
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-6">
                <div className="flex items-center gap-2 mb-4">
                  <User size={18} className="text-hive-brand-secondary" />
                  <h2 className="text-heading-md font-semibold text-hive-text-primary">Basic Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body-md font-medium text-hive-text-primary mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary placeholder:text-hive-text-tertiary focus:border-hive-brand-secondary focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-body-md font-medium text-hive-text-primary mb-2">
                      Pronouns
                    </label>
                    <select
                      value={formData.pronouns}
                      onChange={(e) => handleInputChange('pronouns', e.target.value)}
                      className="w-full px-4 py-3 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary focus:border-hive-brand-secondary focus:outline-none transition-colors"
                    >
                      <option value="">Select pronouns</option>
                      <option value="they/them">they/them</option>
                      <option value="she/her">she/her</option>
                      <option value="he/him">he/him</option>
                      <option value="ze/zir">ze/zir</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-body-md font-medium text-hive-text-primary mb-2">
                    Handle
                  </label>
                  <div className="relative">
                    <Hash size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-hive-text-tertiary" />
                    <input
                      type="text"
                      value={formData.handle}
                      onChange={(e) => handleInputChange('handle', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary placeholder:text-hive-text-tertiary focus:border-hive-brand-secondary focus:outline-none transition-colors"
                      placeholder="your-handle"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-body-md font-medium text-hive-text-primary mb-2">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary placeholder:text-hive-text-tertiary focus:border-hive-brand-secondary focus:outline-none transition-colors resize-none"
                    placeholder="Tell others about yourself..."
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={18} className="text-hive-brand-secondary" />
                  <h2 className="text-heading-md font-semibold text-hive-text-primary">Academic Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body-md font-medium text-hive-text-primary mb-2">
                      Major
                    </label>
                    <input
                      type="text"
                      value={formData.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      className="w-full px-4 py-3 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary placeholder:text-hive-text-tertiary focus:border-hive-brand-secondary focus:outline-none transition-colors"
                      placeholder="Computer Science"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-body-md font-medium text-hive-text-primary mb-2">
                      Academic Year
                    </label>
                    <select
                      value={formData.academicYear}
                      onChange={(e) => handleInputChange('academicYear', e.target.value)}
                      className="w-full px-4 py-3 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary focus:border-hive-brand-secondary focus:outline-none transition-colors"
                    >
                      <option value="">Select year</option>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-body-md font-medium text-hive-text-primary mb-2">
                    Graduation Year
                  </label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                    min="2024"
                    max="2035"
                    className="w-full px-4 py-3 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary placeholder:text-hive-text-tertiary focus:border-hive-brand-secondary focus:outline-none transition-colors"
                    placeholder="2027"
                  />
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin size={18} className="text-hive-brand-secondary" />
                  <h2 className="text-heading-md font-semibold text-hive-text-primary">Housing/Location</h2>
                </div>
                
                <div>
                  <label className="block text-body-md font-medium text-hive-text-primary mb-2">
                    Housing/Location
                  </label>
                  <input
                    type="text"
                    value={formData.housing}
                    onChange={(e) => handleInputChange('housing', e.target.value)}
                    className="w-full px-4 py-3 bg-hive-background-primary border border-hive-border-default rounded-lg text-hive-text-primary placeholder:text-hive-text-tertiary focus:border-hive-brand-secondary focus:outline-none transition-colors"
                    placeholder="Smith Hall, Room 305"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}