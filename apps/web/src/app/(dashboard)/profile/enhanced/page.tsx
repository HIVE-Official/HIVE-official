"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// Temporary direct import until UI package builds
import { 
  EnhancedProfileDashboard,
  EnhancedProfileUser, 
  PersonalTool, 
  ActivityLogItem 
} from '../../../../../packages/ui/src/components/profile-cards/enhanced-profile-dashboard';
import { ProfileCompletionStatus } from '../../../../../packages/ui/src/components/profile-cards/avatar-card';
import { useSession } from '../../../../hooks/use-session';

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
  joinedSpaces: number;
  createdAt: string;
  lastActive: string;
  isBuilder?: boolean;
  ghostMode?: boolean;
  stats?: {
    spacesJoined: number;
    toolsUsed: number;
    connectionsCount: number;
    toolsCreated?: number;
    spacesLed?: number;
  };
}

// Mock data generators (replace with real API calls)
const generateMockPersonalTools = (): PersonalTool[] => [
  {
    id: '1',
    name: 'Study Timer',
    description: 'Pomodoro technique timer',
    icon: '⏰',
    lastUsed: '2 hours ago',
    usageCount: 15,
    isForked: true,
    originalCreator: 'Alex Chen'
  },
  {
    id: '2',
    name: 'Grade Tracker',
    description: 'Track your course grades',
    icon: '📊',
    lastUsed: '1 day ago',
    usageCount: 8,
    isForked: false
  },
  {
    id: '3',
    name: 'Calendar Sync',
    description: 'Sync with Google Calendar',
    icon: '📅',
    lastUsed: '3 days ago',
    usageCount: 22,
    isForked: true,
    originalCreator: 'Sarah Kim'
  }
];

const generateMockActivityLog = (): ActivityLogItem[] => [
  {
    id: '1',
    type: 'space_joined',
    title: 'Joined CS Study Group',
    description: 'Started collaborating in Computer Science space',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'tool_used',
    title: 'Used Study Timer',
    description: 'Completed 4 pomodoro sessions',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    type: 'tool_created',
    title: 'Created Grade Calculator',
    description: 'Built a tool to calculate GPA',
    timestamp: '2 days ago'
  }
];

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
      isBuilder: Math.random() > 0.5, // Random for demo
      ghostMode: false,
      stats: {
        spacesJoined: 5,
        toolsUsed: 12,
        connectionsCount: 23,
        toolsCreated: 3,
        spacesLed: 1
      }
    };
  }
  
  const data = await response.json();
  return {
    ...data.user,
    isBuilder: data.user.isBuilder || Math.random() > 0.5,
    stats: {
      spacesJoined: data.user.joinedSpaces || 0,
      toolsUsed: 12,
      connectionsCount: 23,
      toolsCreated: data.user.isBuilder ? 3 : 0,
      spacesLed: data.user.isBuilder ? 1 : 0
    }
  };
}

export default function EnhancedProfilePage() {
  const { user } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [cardLayout, setCardLayout] = useState<Record<string, any>>({});
  const [personalTools] = useState(generateMockPersonalTools);
  const [activityLog] = useState(generateMockActivityLog);
  const queryClient = useQueryClient();

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
    staleTime: 60000,
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
    }
  });

  if (!user || !isClient || isLoading) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex items-center justify-center">
        <div className="text-center text-white">
          <p>Failed to load profile</p>
        </div>
      </div>
    );
  }

  const enhancedUser: EnhancedProfileUser = {
    id: user.id,
    name: profile.fullName,
    email: user.email,
    avatar: profile.profilePhoto || profile.avatarUrl,
    isBuilder: profile.isBuilder,
    isVerifiedStudent: true, // Assume verified for demo
    campus: 'University Demo',
    gradYear: '2025',
    major: profile.major,
    ghostMode: profile.ghostMode,
    stats: profile.stats
  };

  const completionStatus: ProfileCompletionStatus = {
    overall: Math.round(
      ((profile.profilePhoto || profile.avatarUrl ? 1 : 0) +
       (profile.academicYear && profile.major ? 1 : 0) +
       (profile.housing ? 1 : 0) +
       (profile.joinedSpaces > 0 ? 1 : 0)) / 4 * 100
    ),
    sections: {
      basicInfo: { 
        completed: !!(profile.fullName && profile.academicYear), 
        label: 'Basic Information' 
      },
      academicInfo: { 
        completed: !!(profile.major && profile.housing), 
        label: 'Academic Details' 
      },
      interests: { 
        completed: profile.joinedSpaces > 0, 
        label: 'Space Participation' 
      },
      privacy: { 
        completed: !!profile.pronouns, 
        label: 'Privacy Settings' 
      }
    }
  };

  return (
    <EnhancedProfileDashboard
      user={enhancedUser}
      spaces={[]} // TODO: Integrate with actual spaces API
      events={[]} // TODO: Integrate with actual events API
      connections={[]} // TODO: Integrate with actual connections API
      personalTools={personalTools}
      activityLog={activityLog}
      hiveLab={profile.isBuilder ? { tools: [], stats: {} } : undefined}
      completionStatus={completionStatus}
      cardLayout={cardLayout}
      onCardLayoutChange={setCardLayout}
      onPhotoUpload={(file) => uploadPhotoMutation.mutate(file)}
      onGenerateAvatar={() => generateAvatarMutation.mutate()}
      onEditProfile={() => window.location.href = '/profile'}
      onPrivacySettings={() => window.location.href = '/settings'}
      onSpaceClick={(spaceId) => window.location.href = `/spaces/${spaceId}`}
      onEventClick={(eventId) => console.log('Event clicked:', eventId)}
      onToolClick={(toolId) => console.log('Tool clicked:', toolId)}
      onCreateTool={() => window.location.href = '/build'}
    />
  );
}