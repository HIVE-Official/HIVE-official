"use client";

import { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { useParams, useRouter, notFound } from 'next/navigation';
import Image from 'next/image';
import { Button, Card, Badge } from "@hive/ui";
import { PageContainer } from "@hive/ui";
import { 
  User, 
  Users, 
  Zap,
  Star,
  Calendar,
  MapPin,
  GraduationCap,
  BookOpen,
  Wrench,
  Shield,
  MessageCircle,
  UserPlus,
  Share,
  MoreHorizontal
} from 'lucide-react';
import { ErrorBoundary } from '../../../components/error-boundary';
import { profileAPI, ProfileData } from '@/lib/profile-api';
import { useSession } from '../../../hooks/use-session';

interface PublicProfileData extends ProfileData {
  isOwnProfile: boolean;
  canViewPrivateInfo: boolean;
  connectionStatus?: 'none' | 'pending' | 'connected';
}

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser } = useSession();
  const [handle, setHandle] = useState<string>('');
  
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setHandle(resolvedParams.handle as string);
    };
    resolveParams();
  }, [params]);
  
  const [profileData, setProfileData] = useState<PublicProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPublicProfile = async () => {
      if (!handle) return;
      
      try {
        setIsLoading(true);
        setError(null);

        // Check if viewing own profile
        const isOwnProfile = currentUser?.handle === handle;
        
        if (isOwnProfile) {
          // Load own profile with full data
          const profileResult = await profileAPI.getProfile();
          setProfileData({
            ...profileResult,
            isOwnProfile: true,
            canViewPrivateInfo: true
          });
        } else {
          // Load public profile via [userId] API route
          // For now, simulate with the main profile API
          try {
            const response = await fetch(`/api/profile/public/${handle}`);
            if (response.status === 404) {
              notFound();
              return;
            }
            
            const data = await response.json();
            if (!data.success) {
              throw new Error(data.error || 'Failed to load profile');
            }
            
            setProfileData({
              ...data.user,
              isOwnProfile: false,
              canViewPrivateInfo: false,
              connectionStatus: 'none'
            });
          } catch {
            // Fallback: Use development mode data
            const mockPublicProfile: PublicProfileData = {
              id: 'public_user_' + handle,
              fullName: handle.charAt(0).toUpperCase() + handle.slice(1) + ' Student',
              handle: handle,
              email: '', // Hidden for public view
              major: 'Computer Science',
              academicYear: 'junior',
              housing: isOwnProfile ? 'Smith Hall, Room 305' : '', // Hidden if not connected
              pronouns: 'they/them',
              bio: 'Building the future of campus collaboration',
              statusMessage: 'Always learning something new!',
              avatarUrl: '',
              isBuilder: Math.random() > 0.5,
              builderOptIn: false,
              isPublic: true,
              onboardingCompleted: true,
              joinedAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
              lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              isOwnProfile: false,
              canViewPrivateInfo: false,
              connectionStatus: 'none'
            };
            
            setProfileData(mockPublicProfile);
          }
        }
        
        setIsLoading(false);
      } catch (err) {
        logger.error('Failed to load public profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        setIsLoading(false);
      }
    };

    loadPublicProfile();
  }, [handle, currentUser]);

  if (error) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <User className="h-6 w-6 text-[var(--hive-text-inverse)]" />
            </div>
            <p className="text-[var(--hive-text-inverse)] mb-2">Profile not found</p>
            <p className="text-red-400 text-sm">{error}</p>
            <Button 
              onClick={() => router.back()} 
              className="mt-4 bg-hive-gold text-hive-obsidian"
            >
              Go Back
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!profileData || isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4 flex items-center justify-center">
              <User className="h-6 w-6 text-hive-obsidian animate-pulse" />
            </div>
            <p className="text-[var(--hive-text-inverse)] mb-2">Loading profile...</p>
            <p className="text-hive-text-mutedLight text-sm">@{handle}</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer
        title={profileData.isOwnProfile ? "Your Profile" : `${profileData.fullName}'s Profile`}
        subtitle={`@${profileData.handle}`}
        breadcrumbs={[
          { label: "Profile", icon: User, href: profileData.isOwnProfile ? "/profile" : undefined }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            {!profileData.isOwnProfile && (
              <>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              </>
            )}
            
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            {profileData.isOwnProfile && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push('/profile/edit')}
              >
                Edit Profile
              </Button>
            )}
            
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        }
       
      >
        {/* Profile Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Avatar & Basic Info */}
          <Card className="lg:col-span-1 p-6 bg-hive-background-overlay border-hive-border-default">
            <div className="text-center">
              {/* Profile Photo */}
              <div className="relative mx-auto mb-4">
                {profileData.avatarUrl ? (
                  <Image 
                    src={profileData.avatarUrl} 
                    alt={profileData.fullName}
                    width={120}
                    height={120}
                    className="w-30 h-30 rounded-full object-cover mx-auto"
                  />
                ) : (
                  <div className="w-30 h-30 bg-gradient-to-br from-hive-gold to-hive-champagne rounded-full flex items-center justify-center text-3xl font-bold text-hive-obsidian mx-auto">
                    {profileData.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {/* Name & Handle */}
              <h1 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-1">{profileData.fullName}</h1>
              <p className="text-hive-text-mutedLight text-sm mb-3">@{profileData.handle}</p>
              
              {/* Status Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <Badge variant="junior" className="text-xs">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {profileData.academicYear}
                </Badge>
                <Badge variant="skill-tag" className="text-xs">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {profileData.major}
                </Badge>
                {profileData.isBuilder && (
                  <Badge className="bg-hive-gold text-hive-obsidian text-xs">
                    <Wrench className="h-3 w-3 mr-1" />
                    Builder
                  </Badge>
                )}
              </div>
              
              {/* Bio */}
              {profileData.bio && (
                <p className="text-sm text-hive-text-mutedLight leading-relaxed mb-4">
                  {profileData.bio}
                </p>
              )}
              
              {/* Status Message */}
              {profileData.statusMessage && (
                <div className="bg-hive-background-tertiary rounded-lg p-3 mb-4">
                  <p className="text-sm text-[var(--hive-text-inverse)] italic">"{profileData.statusMessage}"</p>
                </div>
              )}
              
              {/* Location (if allowed) */}
              {profileData.housing && profileData.canViewPrivateInfo && (
                <div className="flex items-center justify-center text-sm text-hive-text-mutedLight">
                  <MapPin className="h-4 w-4 mr-1" />
                  {profileData.housing}
                </div>
              )}
            </div>
          </Card>
          
          {/* Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <Users className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <div className="text-lg font-bold text-[var(--hive-text-inverse)]">12</div>
                <div className="text-xs text-hive-text-mutedLight">Spaces</div>
              </Card>
              
              <Card className="p-4 text-center bg-gradient-to-br from-[var(--hive-gold)]/10 to-[var(--hive-gold-dark)]/10 border-[var(--hive-gold)]/20">
                <Zap className="h-6 w-6 mx-auto mb-2 text-[var(--hive-gold)]" />
                <div className="text-lg font-bold text-[var(--hive-text-inverse)]">8</div>
                <div className="text-xs text-hive-text-mutedLight">Tools Built</div>
              </Card>
              
              <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <Star className="h-6 w-6 mx-auto mb-2 text-green-400" />
                <div className="text-lg font-bold text-[var(--hive-text-inverse)]">2.3k</div>
                <div className="text-xs text-hive-text-mutedLight">Reputation</div>
              </Card>
              
              <Card className="p-4 text-center bg-gradient-to-br from-[var(--hive-gold)]/10 to-[var(--hive-gold-dark)]/10 border-[var(--hive-gold)]/20">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-[var(--hive-gold)]" />
                <div className="text-lg font-bold text-[var(--hive-text-inverse)]">
                  {Math.floor((Date.now() - new Date(profileData.joinedAt).getTime()) / (1000 * 60 * 60 * 24))}d
                </div>
                <div className="text-xs text-hive-text-mutedLight">On HIVE</div>
              </Card>
            </div>
            
            {/* Recent Activity Preview */}
            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-hive-background-tertiary">
                  <div className="w-8 h-8 bg-[var(--hive-gold)] rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-[var(--hive-text-inverse)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--hive-text-inverse)]">Built a new study timer tool</p>
                    <p className="text-xs text-hive-text-mutedLight">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-hive-background-tertiary">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4 text-[var(--hive-text-inverse)]" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--hive-text-inverse)]">Joined CS Study Group</p>
                    <p className="text-xs text-hive-text-mutedLight">1 day ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Privacy Notice */}
        {!profileData.isOwnProfile && !profileData.isPublic && (
          <Card className="p-4 bg-gradient-to-r from-[var(--hive-gold)]/10 to-[var(--hive-gold)]/10 border-[var(--hive-gold)]/20">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-[var(--hive-gold)]" />
              <div>
                <p className="text-sm text-[var(--hive-text-inverse)] font-medium">Limited Profile View</p>
                <p className="text-xs text-amber-200">This user has restricted their profile visibility. Connect to see more information.</p>
              </div>
            </div>
          </Card>
        )}
      </PageContainer>
    </ErrorBoundary>
  );
}