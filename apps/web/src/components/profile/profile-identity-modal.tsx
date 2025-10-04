"use client";

import React, { useState, useRef, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from 'next/image';
import { Input, Button, Textarea } from "@hive/ui";
import { useSession } from '../../hooks/use-session';

interface CampusProfile {
  fullName: string;
  preferredName?: string;
  profilePhoto?: string;
  avatarUrl?: string;
  academicYear: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'other';
  major: string;
  housing: string;
  pronouns?: string;
  statusMessage?: string;
  isBuilder?: boolean;
  age?: number;
}

interface ProfileIdentityModalProps {
  profile: CampusProfile;
  isOpen: boolean;
  onClose: () => void;
}

const ACADEMIC_YEARS = [
  { value: 'freshman', label: 'Freshman' },
  { value: 'sophomore', label: 'Sophomore' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'other', label: 'Other' },
];

const COMMON_MAJORS = [
  'Computer Science', 'Business Administration', 'Psychology', 'Biology', 
  'Engineering', 'English', 'Mathematics', 'History', 'Economics', 'Political Science',
  'Chemistry', 'Physics', 'Art', 'Music', 'Philosophy', 'Sociology', 'Anthropology',
  'Environmental Science', 'Nursing', 'Education', 'Communications', 'Marketing',
  'Finance', 'Pre-Med', 'Pre-Law', 'International Relations', 'Other'
];

export function ProfileIdentityModal({ profile, isOpen, onClose }: ProfileIdentityModalProps) {
  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    preferredName: profile.preferredName || '',
    age: profile.age || '',
    academicYear: profile.academicYear || 'freshman',
    major: profile.major || '',
    housing: profile.housing || '',
    pronouns: profile.pronouns || '',
    statusMessage: profile.statusMessage || '',
  });

  // Update form data when profile changes
  React.useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        preferredName: profile.preferredName || '',
        age: profile.age || '',
        academicYear: profile.academicYear || 'freshman',
        major: profile.major || '',
        housing: profile.housing || '',
        pronouns: profile.pronouns || '',
        statusMessage: profile.statusMessage || '',
      });
    }
  }, [profile]);
  
  const [photoPreview, setPhotoPreview] = useState<string | null>(profile.profilePhoto || profile.avatarUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const queryClient = useQueryClient();
  
  // Stub profile methods (useSession doesn't provide these)
  const updateProfile = async (data: any): Promise<any> => {
    // Return mock data for now - implement actual API call later
    return { success: true, ...data };
  };
  const uploadPhoto = async (file: File): Promise<{ avatarUrl: string }> => {
    // Return mock data for now - implement actual API call later
    return { avatarUrl: URL.createObjectURL(file) };
  };
  const isUpdating = false;
  const _profileError = null;
  const _clearError = () => {};
  
  // PWA Camera Support Detection
  const isCameraSupported = typeof navigator !== 'undefined' && 
    navigator.mediaDevices && 
    navigator.mediaDevices.getUserMedia;
  
  const _isMobile = typeof window !== 'undefined' && 
    /Mobi|Android/i.test(navigator.userAgent);

  // Use HIVE photo upload hook
  const handlePhotoUpload = useCallback(async (file: File) => {
    try {
      setIsUploading(true);
      setUploadError(null);
      const result = await uploadPhoto(file);
      setPhotoPreview(result.avatarUrl);
      
      // Update localStorage session data for immediate sync
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          session.profileData = {
            ...session.profileData,
            avatarUrl: result.avatarUrl
          };
          window.localStorage.setItem('hive_session', JSON.stringify(session));
          
          // Trigger storage event to update useSession
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'hive_session',
            newValue: JSON.stringify(session)
          }));
        }
      } catch (sessionError) {
        console.warn('Could not update session data:', sessionError);
      }
      
      // Force refresh profile data across dashboard
      queryClient.invalidateQueries({ queryKey: ["campus-profile"] });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [uploadPhoto, queryClient]);

  // Generate avatar mutation
  const generateAvatarMutation = useMutation({
    mutationFn: async () => {
      const headers: Record<string, string> = {};
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
        headers,
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate avatar');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setPhotoPreview(data.avatarUrl);
      setUploadError(null);
      
      // Update localStorage session data for immediate sync
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          session.profileData = {
            ...session.profileData,
            avatarUrl: data.avatarUrl
          };
          window.localStorage.setItem('hive_session', JSON.stringify(session));
          
          // Trigger storage event to update useSession
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'hive_session',
            newValue: JSON.stringify(session)
          }));
        }
      } catch (sessionError) {
        console.warn('Could not update session data:', sessionError);
      }
      
      // Force refresh profile data across dashboard
      queryClient.invalidateQueries({ queryKey: ["campus-profile"] });
      queryClient.refetchQueries({ queryKey: ["campus-profile"] });
    },
    onError: (error) => {
      setUploadError(error instanceof Error ? error.message : 'Generation failed');
    }
  });

  // Handle file input change
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('Invalid file type. Only JPEG, PNG, and WebP are allowed.');
        return;
      }
      
      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setUploadError('File too large. Maximum size is 5MB.');
        return;
      }
      
      handlePhotoUpload(file);
    }
  }, [handlePhotoUpload]);

  // PWA Camera Functions
  const startCamera = useCallback(async () => {
    if (!isCameraSupported) return;
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setUploadError('Camera access denied. Please allow camera permissions.');
    }
  }, [isCameraSupported]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0);
    
    // Convert to blob and upload
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        handlePhotoUpload(file);
        stopCamera();
      }
    }, 'image/jpeg', 0.8);
  }, [handlePhotoUpload, stopCamera]);


  const handleUpdateProfile = useCallback(async () => {
    try {
      // Filter out empty strings and prepare update data
      const updateData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== '')
      );
      
      // Convert age to number if present
      if (updateData.age) {
        updateData.age = parseInt(updateData.age as string);
      }
      
      await updateProfile(updateData);
      
      // Update localStorage session data for immediate sync
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        if (sessionJson) {
          const session = JSON.parse(sessionJson);
          session.profileData = {
            ...session.profileData,
            fullName: updateData.fullName || session.profileData?.fullName,
            major: updateData.major || session.profileData?.major,
            // Add other fields as needed
          };
          window.localStorage.setItem('hive_session', JSON.stringify(session));
          
          // Trigger storage event to update useSession
          window.dispatchEvent(new StorageEvent('storage', {
            key: 'hive_session',
            newValue: JSON.stringify(session)
          }));
        }
      } catch (sessionError) {
        console.warn('Could not update session data:', sessionError);
      }
      
      // Force refresh profile data across dashboard
      queryClient.invalidateQueries({ queryKey: ["campus-profile"] });
      queryClient.refetchQueries({ queryKey: ["campus-profile"] });
      
      onClose();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Profile update failed');
    }
  }, [formData, updateProfile, onClose, queryClient]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 p-4 animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-hive-background-tertiary rounded-2xl border border-hive-brand-primary/20 w-full max-w-4xl my-8 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-hive-border-primary sticky top-0 bg-hive-background-tertiary z-10">
          <h2 className="text-xl font-bold text-hive-text-primary">Your Profile</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-hive-background-secondary flex items-center justify-center text-hive-text-muted hover:bg-hive-background-interactive hover:scale-110 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
            {/* Photo Section */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg font-semibold text-hive-text-primary">Profile Photo</h3>
              
              {/* Photo Display */}
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-hive-brand-primary/20 to-hive-brand-primary/10 border-2 border-dashed border-hive-brand-primary/30">
                  {photoPreview ? (
                    <Image src={photoPreview} alt="" width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-hive-brand-primary/30 to-hive-brand-primary/20 border-2 border-hive-brand-primary/40 flex items-center justify-center text-2xl font-bold text-hive-text-primary mx-auto mb-4">
                          {formData.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                        </div>
                        <p className="text-hive-text-secondary text-sm">No photo yet</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Upload Error */}
                {uploadError && (
                  <div className="mt-2 text-sm text-hive-status-error bg-hive-status-error/10 border border-hive-status-error/20 rounded-lg p-3">
                    {uploadError}
                  </div>
                )}
              </div>

              {/* Photo Actions */}
              <div className="space-y-3">
                {/* HIVE File Upload Component - temporarily disabled */}
                {/* <HiveFileUpload
                  accept="image/*"
                  maxSize={5 * 1024 * 1024} // 5MB
                  onFilesSelected={(files: File[]) => {
                    if (files[0]) {
                      handlePhotoUpload(files[0]);
                    }
                  }}
                  multiple={false}
                  className="w-full"
                /> */}
                
                {/* Fallback Upload Button */}
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full"
                  variant="default"
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center animate-pulse">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      <span className="animate-in slide-in-from-left-1">Uploading...</span>
                    </div>
                  ) : (
                    <span className="transition-all duration-200 hover:scale-105 inline-flex items-center">
                      📁 Upload Photo
                    </span>
                  )}
                </Button>

                {/* Take Photo (PWA) */}
                {isCameraSupported && (
                  <Button
                    onClick={showCamera ? capturePhoto : startCamera}
                    disabled={isUploading}
                    variant="outline"
                    className="w-full transition-all duration-200 hover:scale-[1.02]"
                  >
                    <span className="transition-all duration-200 hover:scale-105 inline-flex items-center">
                      📱 {showCamera ? 'Capture Photo' : 'Take Photo'}
                    </span>
                  </Button>
                )}

                {/* Generate Avatar */}
                <Button
                  onClick={() => generateAvatarMutation.mutate()}
                  disabled={generateAvatarMutation.isPending}
                  variant="outline"
                  className="w-full transition-all duration-200 hover:scale-[1.02]"
                >
                  {generateAvatarMutation.isPending ? (
                    <div className="flex items-center justify-center animate-pulse">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      <span className="animate-in slide-in-from-left-1">Generating...</span>
                    </div>
                  ) : (
                    <span className="transition-all duration-200 hover:scale-105 inline-flex items-center">
                      🎨 Generate Avatar
                    </span>
                  )}
                </Button>

                {/* Remove Photo */}
                {photoPreview && (
                  <Button
                    onClick={() => setPhotoPreview(null)}
                    variant="destructive"
                    className="w-full"
                  >
                    🗑️ Remove Photo
                  </Button>
                )}
              </div>

              {/* Camera View (Hidden Canvas for Capture) */}
              {showCamera && (
                <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-300">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full aspect-square object-cover rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  />
                  <button
                    onClick={stopCamera}
                    className="w-full py-2 px-4 bg-[#3A3A3D] text-[#E5E5E7] rounded-lg text-sm hover:bg-[#4A4A4D] hover:scale-[1.02] transition-all duration-200"
                  >
                    Cancel Camera
                  </button>
                </div>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* Identity Section */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg font-semibold text-[#E5E5E7]">Identity & Info</h3>
              
              <div className="space-y-4">
                {/* Display Name */}
                <div>
                  <label className="block text-sm font-medium text-hive-text-secondary mb-2">
                    Display Name
                  </label>
                  <Input
                    value={formData.fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, fullName: (e.target as HTMLInputElement).value }))}
                    placeholder="Your full name"
                    className="w-full"
                  />
                </div>

                {/* Preferred Name */}
                <div>
                  <label className="block text-sm font-medium text-hive-text-secondary mb-2">
                    Preferred Name (Optional)
                  </label>
                  <Input
                    value={formData.preferredName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, preferredName: (e.target as HTMLInputElement).value }))}
                    placeholder="What should we call you?"
                    className="w-full"
                  />
                </div>

                {/* Age & Academic Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-hive-text-secondary mb-2">
                      Age
                    </label>
                    <Input
                      type="number"
                      value={formData.age}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, age: (e.target as HTMLInputElement).value }))}
                      placeholder="18"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-hive-text-secondary mb-2">
                      Academic Year
                    </label>
                    <select
                      value={formData.academicYear}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, academicYear: (e.target as HTMLInputElement).value as any }))}
                      className="w-full px-4 py-3 bg-hive-background-secondary border border-hive-border-primary rounded-xl text-hive-text-primary focus:border-hive-brand-primary/40 focus:outline-none transition-colors"
                    >
                      {ACADEMIC_YEARS.map(year => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Major */}
                <div>
                  <label className="block text-sm font-medium text-hive-text-secondary mb-2">
                    Major
                  </label>
                  <select
                    value={formData.major}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData(prev => ({ ...prev, major: (e.target as HTMLInputElement).value }))}
                    className="w-full px-4 py-3 bg-hive-background-secondary border border-hive-border-primary rounded-xl text-hive-text-primary focus:border-hive-brand-primary/40 focus:outline-none transition-colors"
                  >
                    <option value="">Select your major</option>
                    {COMMON_MAJORS.map(major => (
                      <option key={major} value={major}>
                        {major}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Housing */}
                <div>
                  <label className="block text-sm font-medium text-hive-text-secondary mb-2">
                    Dorm/Housing
                  </label>
                  <Input
                    value={formData.housing}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, housing: (e.target as HTMLInputElement).value }))}
                    placeholder="e.g., Smith Hall, Room 305"
                    className="w-full"
                  />
                </div>

                {/* Pronouns */}
                <div>
                  <label className="block text-sm font-medium text-hive-text-secondary mb-2">
                    Pronouns (Optional)
                  </label>
                  <Input
                    value={formData.pronouns}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, pronouns: (e.target as HTMLInputElement).value }))}
                    placeholder="e.g., they/them, she/her, he/him"
                    className="w-full"
                  />
                </div>

                {/* Status Message */}
                <div>
                  <label className="block text-sm font-medium text-hive-text-secondary mb-2">
                    Bio/Status (Optional)
                  </label>
                  <Textarea
                    value={formData.statusMessage}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, statusMessage: (e.target as HTMLInputElement).value }))}
                    placeholder="Tell your campus story..."
                    rows={3}
                    maxLength={200}
                    className="w-full resize-none"
                  />
                  <div className="text-xs text-hive-text-muted mt-1">
                    {formData.statusMessage.length}/200 characters
                  </div>
                </div>
              </div>

              {/* Builder Status Info */}
              {profile.isBuilder && (
                <div className="p-4 bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-primary)]/5 border border-[var(--hive-brand-primary)]/20 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🔨</span>
                    <h4 className="font-semibold text-[#E5E5E7]">Builder Status</h4>
                  </div>
                  <p className="text-sm text-[#C1C1C4] mb-2">
                    You're a recognized student leader and builder in the HIVE community.
                  </p>
                  <div className="text-xs text-[#9B9B9F]">
                    Member since: March 2025 • Tools created: 2 • Impact: 101 students helped
                  </div>
                </div>
              )}
            </div>
          </div>
        

        {/* Footer Actions */}
        <div className="p-6 border-t border-hive-border-primary flex justify-end gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="px-6 py-3"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateProfile}
              disabled={isUpdating}
              variant="default"
              className="px-6 py-3"
            >
              {isUpdating ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}