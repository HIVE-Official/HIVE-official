import { useState, useEffect } from 'react';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import { logger } from '@/lib/utils/structured-logger';

export interface SpaceMember {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'moderator' | 'member';
  status: 'active' | 'inactive' | 'suspended';
  joinedAt: Date;
  lastActive?: Date;
  
  // Campus info
  major?: string;
  year?: string;
  dorm?: string;
  location?: string;
  
  // Activity metrics
  postsCount?: number;
  engagementScore?: number;
  coordinationParticipation?: number;
  contributionScore?: number;
  
  // Additional fields from API
  username?: string;
  bio?: string;
  isVerified?: boolean;
  badges?: string[];
  interests?: string[];
  graduationYear?: number;
  socialLinks?: Record<string, string>;
  permissions?: {
    canMessage: boolean;
    canViewProfile: boolean;
    canInviteOthers: boolean;
  };
}

interface UseSpaceMembersResult {
  members: SpaceMember[];
  loading: boolean;
  error: Error | null;
  summary: {
    totalMembers: number;
    onlineMembers: number;
    activeMembers: number;
  } | null;
  refresh: () => void;
}

export function useSpaceMembers(spaceId: string | undefined): UseSpaceMembersResult {
  const [members, setMembers] = useState<SpaceMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [summary, setSummary] = useState<UseSpaceMembersResult['summary']>(null);

  const fetchMembers = async () => {
    if (!spaceId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await authenticatedFetch(`/api/spaces/${spaceId}/members`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Transform the API response to match our interface
      const transformedMembers: SpaceMember[] = data.members.map((member: any) => ({
        id: member.id,
        name: member.name || 'Unknown User',
        email: member.username ? `${member.username}@buffalo.edu` : undefined,
        avatar: member.avatar,
        role: member.role || 'member',
        status: member.status === 'online' ? 'active' : 'inactive',
        joinedAt: new Date(member.joinedAt),
        lastActive: member.lastActive ? new Date(member.lastActive) : undefined,
        
        // Campus info
        major: member.major,
        year: member.graduationYear ? getAcademicYear(member.graduationYear) : undefined,
        dorm: member.location,
        location: member.location,
        
        // Activity metrics
        postsCount: member.stats?.postsCount || 0,
        engagementScore: member.stats?.contributionScore ? Math.min(100, member.stats.contributionScore) : 0,
        coordinationParticipation: member.stats?.eventsAttended || 0,
        contributionScore: member.stats?.contributionScore || 0,
        
        // Additional fields
        username: member.username,
        bio: member.bio,
        isVerified: member.isVerified,
        badges: member.badges,
        interests: member.interests,
        graduationYear: member.graduationYear,
        socialLinks: member.socialLinks,
        permissions: member.permissions
      }));

      setMembers(transformedMembers);
      setSummary(data.summary || {
        totalMembers: transformedMembers.length,
        onlineMembers: transformedMembers.filter(m => m.status === 'active').length,
        activeMembers: transformedMembers.filter(m => {
          if (!m.lastActive) return false;
          const daysSinceActive = (Date.now() - m.lastActive.getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceActive <= 7;
        }).length
      });

      logger.info('Fetched space members', { 
        spaceId, 
        memberCount: transformedMembers.length 
      });
    } catch (err) {
      logger.error('Error fetching space members', { 
        error: err, 
        spaceId 
      });
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [spaceId]);

  return {
    members,
    loading,
    error,
    summary,
    refresh: fetchMembers
  };
}

// Helper function to determine academic year from graduation year
function getAcademicYear(graduationYear: number): string {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  // Adjust for academic year (August starts new year)
  const academicYear = currentMonth >= 7 ? currentYear : currentYear - 1;
  
  const yearsUntilGraduation = graduationYear - academicYear;
  
  if (yearsUntilGraduation <= 0) return 'Alumni';
  if (yearsUntilGraduation === 1) return 'Senior';
  if (yearsUntilGraduation === 2) return 'Junior';
  if (yearsUntilGraduation === 3) return 'Sophomore';
  if (yearsUntilGraduation === 4) return 'Freshman';
  return 'Graduate';
}