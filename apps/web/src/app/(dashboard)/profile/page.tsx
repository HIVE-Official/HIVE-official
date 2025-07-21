"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  EnhancedProfileDashboard,
  EnhancedProfileUser, 
  PersonalTool, 
  ActivityLogItem,
  ProfileCompletionStatus 
} from '@hive/ui';
import { useSession } from '../../../hooks/use-session';

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
  ghostModeLevel?: 'invisible' | 'minimal' | 'selective' | 'normal';
  stats?: {
    spacesJoined: number;
    toolsUsed: number;
    connectionsCount: number;
    toolsCreated?: number;
    spacesLed?: number;
  };
}

// Enhanced mock data generators
const generateMockPersonalTools = (): PersonalTool[] => [
  {
    id: '1',
    name: 'Study Timer',
    description: 'Advanced Pomodoro technique timer with analytics',
    icon: '⏰',
    lastUsed: '2 hours ago',
    usageCount: 23,
    isForked: true,
    originalCreator: 'Alex Chen (CS \'25)'
  },
  {
    id: '2',
    name: 'GPA Calculator',
    description: 'Smart GPA tracking with semester projections',
    icon: '📊',
    lastUsed: '1 day ago',
    usageCount: 15,
    isForked: false
  },
  {
    id: '3',
    name: 'Calendar Sync',
    description: 'Google Calendar integration with reminders',
    icon: '📅',
    lastUsed: '3 hours ago',
    usageCount: 31,
    isForked: true,
    originalCreator: 'Sarah Kim (CS \'24)'
  },
  {
    id: '4',
    name: 'Course Planner',
    description: 'Degree requirement tracking and planning',
    icon: '🎓',
    lastUsed: '5 days ago',
    usageCount: 8,
    isForked: false
  },
  {
    id: '5',
    name: 'Study Buddy',
    description: 'Find study partners for your courses',
    icon: '👥',
    lastUsed: '1 week ago',
    usageCount: 12,
    isForked: true,
    originalCreator: 'Mike Johnson (EE \'26)'
  },
  {
    id: '6',
    name: 'Note Taker',
    description: 'Smart note organization and search',
    icon: '📝',
    lastUsed: '4 hours ago',
    usageCount: 45,
    isForked: false
  }
];

const generateMockActivityLog = (): ActivityLogItem[] => [
  {
    id: '1',
    type: 'space_joined',
    title: 'Joined CS Study Group',
    description: 'Started collaborating in Computer Science study space',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'tool_used',
    title: 'Used Study Timer',
    description: 'Completed 6 pomodoro sessions for Algorithms homework',
    timestamp: '3 hours ago'
  },
  {
    id: '3',
    type: 'tool_created',
    title: 'Created Grade Calculator',
    description: 'Built a tool to calculate weighted semester GPA',
    timestamp: '2 days ago'
  },
  {
    id: '4',
    type: 'connection_made',
    title: 'Connected with Study Group',
    description: 'Joined weekly CS 3310 problem solving sessions',
    timestamp: '3 days ago'
  },
  {
    id: '5',
    type: 'space_joined',
    title: 'Joined Robotics Club',
    description: 'Became member of campus robotics engineering space',
    timestamp: '1 week ago'
  }
];

const generateMockUpcomingEvents = () => [
  {
    id: '1',
    title: 'Data Structures Exam',
    description: 'CS 2420 Midterm Examination',
    startTime: '2025-07-22T10:00:00Z',
    endTime: '2025-07-22T12:00:00Z',
    location: 'Engineering Building Room 101',
    type: 'academic',
    isAllDay: false
  },
  {
    id: '2',
    title: 'Study Group Session',
    description: 'Algorithms problem solving with CS majors',
    startTime: '2025-07-21T19:00:00Z',
    endTime: '2025-07-21T21:00:00Z',
    location: 'Library Study Room 3B',
    type: 'study',
    isAllDay: false
  },
  {
    id: '3',
    title: 'Career Fair Prep',
    description: 'Resume workshop and interview practice',
    startTime: '2025-07-23T16:00:00Z',
    endTime: '2025-07-23T18:00:00Z',
    location: 'Student Union Ballroom',
    type: 'career',
    isAllDay: false
  },
  {
    id: '4',
    title: 'Robotics Club Meeting',
    description: 'Weekly project update and planning session',
    startTime: '2025-07-24T18:30:00Z',
    endTime: '2025-07-24T20:00:00Z',
    location: 'Maker Space Lab',
    type: 'extracurricular',
    isAllDay: false
  }
];

const generateMockSpaces = () => [
  {
    id: '1',
    name: 'CS Study Group',
    description: 'Collaborative computer science learning',
    memberCount: 45,
    category: 'Academic',
    isActive: true,
    lastActivity: '2 hours ago',
    role: 'member'
  },
  {
    id: '2',
    name: 'Robotics Club',
    description: 'Building autonomous robots and competing',
    memberCount: 23,
    category: 'Engineering',
    isActive: true,
    lastActivity: '1 day ago',
    role: 'member'
  },
  {
    id: '3',
    name: 'Data Science Society',
    description: 'Exploring ML and data analytics together',
    memberCount: 67,
    category: 'Academic',
    isActive: true,
    lastActivity: '3 days ago',
    role: 'leader'
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
    // Return enhanced mock campus profile for development
    return {
      fullName: 'Jordan Smith',
      preferredName: 'J',
      academicYear: 'junior',
      major: 'Computer Science',
      housing: 'Smith Hall, Room 305',
      pronouns: 'they/them',
      statusMessage: 'Building the future, one algorithm at a time 🚀',
      joinedSpaces: 3,
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year ago
      lastActive: new Date().toISOString(),
      isBuilder: Math.random() > 0.3, // 70% chance of being a builder
      ghostMode: Math.random() > 0.7, // 30% chance of ghost mode
      ghostModeLevel: 'selective',
      stats: {
        spacesJoined: 3,
        toolsUsed: 6,
        connectionsCount: 34,
        toolsCreated: Math.random() > 0.5 ? Math.floor(Math.random() * 8) + 1 : 0,
        spacesLed: Math.random() > 0.6 ? 1 : 0
      }
    };
  }
  
  const data = await response.json();
  return {
    ...data.user,
    isBuilder: data.user.isBuilder || Math.random() > 0.5,
    ghostMode: data.user.ghostMode || false,
    ghostModeLevel: data.user.ghostModeLevel || 'selective',
    stats: {
      spacesJoined: data.user.joinedSpaces || 0,
      toolsUsed: Math.floor(Math.random() * 20) + 1,
      connectionsCount: Math.floor(Math.random() * 50) + 10,
      toolsCreated: data.user.isBuilder ? Math.floor(Math.random() * 10) + 1 : 0,
      spacesLed: data.user.isBuilder ? Math.floor(Math.random() * 3) : 0
    }
  };
}

export default function ProfilePage() {
  const { user } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [cardLayout, setCardLayout] = useState<Record<string, any>>({});
  const [personalTools] = useState(generateMockPersonalTools);
  const [activityLog] = useState(generateMockActivityLog);
  const [upcomingEvents] = useState(generateMockUpcomingEvents);
  const [userSpaces] = useState(generateMockSpaces);
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

  // Layout persistence
  const saveLayoutMutation = useMutation({
    mutationFn: async (layout: Record<string, any>) => {
      // TODO: Implement actual layout saving to backend
      localStorage.setItem('hive_profile_layout', JSON.stringify(layout));
      return Promise.resolve(layout);
    },
    onSuccess: (layout) => {
      console.log('Profile layout saved:', layout);
    }
  });

  useEffect(() => {
    // Load saved layout from localStorage
    try {
      const savedLayout = localStorage.getItem('hive_profile_layout');
      if (savedLayout) {
        setCardLayout(JSON.parse(savedLayout));
      }
    } catch (error) {
      console.warn('Failed to load saved profile layout:', error);
    }
  }, []);

  const handleCardLayoutChange = (newLayout: Record<string, any>) => {
    setCardLayout(newLayout);
    saveLayoutMutation.mutate(newLayout);
  };

  if (!user || !isClient || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hive-gold mx-auto mb-4" />
          <p className="text-gray-300">Loading your HIVE Profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 flex items-center justify-center">
        <div className="text-center text-white">
          <p>Failed to load profile</p>
          <button 
            onClick={() => queryClient.invalidateQueries({ queryKey: ["campus-profile"] })}
            className="mt-4 px-4 py-2 bg-hive-gold text-black rounded-lg"
          >
            Retry
          </button>
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
    isVerifiedStudent: true,
    campus: 'University of Technology', // TODO: Get from actual campus data
    gradYear: '2025', // TODO: Calculate from academic year
    major: profile.major,
    ghostMode: profile.ghostMode,
    stats: profile.stats
  };

  const completionStatus: ProfileCompletionStatus = {
    overall: Math.round(
      ((profile.profilePhoto || profile.avatarUrl ? 1 : 0) +
       (profile.academicYear && profile.major ? 1 : 0) +
       (profile.housing ? 1 : 0) +
       (profile.joinedSpaces > 0 ? 1 : 0) +
       (profile.pronouns ? 1 : 0)) / 5 * 100
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
        label: 'Profile Customization' 
      }
    }
  };

  return (
    <EnhancedProfileDashboard
      user={enhancedUser}
      spaces={userSpaces}
      events={upcomingEvents}
      connections={[]} // TODO: Implement connections
      personalTools={personalTools}
      activityLog={activityLog}
      hiveLab={profile.isBuilder ? { tools: [], stats: profile.stats } : undefined}
      completionStatus={completionStatus}
      cardLayout={cardLayout}
      onCardLayoutChange={handleCardLayoutChange}
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