import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { MessageSquare, UserPlus, MoreHorizontal, MapPin, Calendar, GraduationCap, Users, BookOpen, Star, Trophy, Clock, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../atomic/atoms/badge';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Avatar, AvatarFallback, AvatarImage } from '../../atomic/atoms/avatar';

const meta: Meta = {
  title: '03-Molecules/Card-Components/Profile Card System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Profile Card System

A comprehensive profile card system for displaying University at Buffalo student information, academic details, and social connections. These molecular components showcase student identities with relevant campus context, enabling social discovery and academic collaboration.

## Campus Integration Features
- **Academic Context** - Major, year, GPA, and course information relevant to campus life
- **Social Connections** - Mutual friends, shared spaces, and common interests for networking
- **Campus Activity** - Recent posts, space participation, and campus engagement metrics
- **Location Awareness** - Dorm, preferred study locations, and campus presence indicators

## Card Variants
- **Discovery Cards** - Focus on academic compatibility and connection potential
- **Member Cards** - Detailed view for space members with activity and contribution metrics
- **Compact Cards** - Space-efficient display for member lists and search results
- **Connection Cards** - Emphasis on mutual connections and shared interests

## Interactive Elements
- **Connection Actions** - Send friend requests, start conversations, and follow updates
- **Academic Compatibility** - Show shared courses, study preferences, and academic alignment
- **Social Proof** - Display mutual connections, shared spaces, and common activities
- **Quick Actions** - Message, connect, view profile, and space-specific interactions

## Privacy Features
- **Visibility Controls** - Respect student privacy settings and information sharing preferences
- **Campus-Only Display** - Information limited to University at Buffalo community
- **Academic Privacy** - GPA and detailed academic information shown only when appropriate
- **Social Boundaries** - Clear indication of connection status and communication preferences
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Student Profile Data
const campusProfileData = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    handle: '@sarahc.cs',
    major: 'Computer Science',
    year: 'Junior',
    gpa: 3.8,
    avatar: '/api/placeholder/120/120',
    coverImage: '/api/placeholder/400/150',
    bio: 'CS major passionate about AI and machine learning. Always looking for study partners and project collaborators!',
    location: {
      dorm: 'Ellicott Complex',
      campus: 'North Campus',
      studySpots: ['Lockwood Library', 'Student Union', 'Capen Hall']
    },
    academic: {
      courses: ['CSE 474', 'CSE 442', 'MTH 411'],
      interests: ['Machine Learning', 'Web Development', 'Data Science'],
      achievements: ['Dean\'s List', 'CS Department Scholar']
    },
    social: {
      spaces: ['CSE 115 Study Group', 'UB Women in CS', 'Floor 3 Community'],
      connections: 47,
      mutualFriends: 12,
      posts: 23,
      lastActive: '2 hours ago'
    },
    stats: {
      studyHours: 156,
      helpedStudents: 8,
      projectsCompleted: 4
    },
    isConnected: false,
    canConnect: true,
    connectionStatus: 'none', // none, pending, connected, blocked
    badges: [
      { type: 'academic', label: 'Dean\'s List', icon: Trophy },
      { type: 'social', label: 'Study Group Leader', icon: Users },
      { type: 'campus', label: 'Library Regular', icon: BookOpen }
    ]
  },
  {
    id: 'marcus-johnson',
    name: 'Marcus Johnson',
    handle: '@marcus.biz',
    major: 'Business Administration',
    year: 'Senior',
    gpa: 3.6,
    avatar: '/api/placeholder/120/120',
    coverImage: null,
    bio: 'Business student and entrepreneur. Starting a campus food delivery service. Let\'s connect and build something amazing!',
    location: {
      dorm: 'Governors Complex',
      campus: 'North Campus',
      studySpots: ['School of Management', 'Student Union', 'Off-campus Coffee']
    },
    academic: {
      courses: ['MGA 405', 'FIN 315', 'MKT 301'],
      interests: ['Entrepreneurship', 'Marketing', 'Finance'],
      achievements: ['Business Plan Competition Winner', 'Student Government']
    },
    social: {
      spaces: ['Entrepreneurship Club', 'Business Student Association', 'Governors Community'],
      connections: 89,
      mutualFriends: 5,
      posts: 45,
      lastActive: '30 minutes ago'
    },
    stats: {
      networkingEvents: 12,
      businessConnections: 23,
      startupProjects: 2
    },
    isConnected: true,
    canConnect: false,
    connectionStatus: 'connected',
    badges: [
      { type: 'achievement', label: 'Entrepreneur', icon: Star },
      { type: 'leadership', label: 'Club President', icon: Trophy },
      { type: 'social', label: 'Networking Pro', icon: Users }
    ]
  },
  {
    id: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    handle: '@emily.psych',
    major: 'Psychology',
    year: 'Sophomore',
    gpa: null, // Privacy setting - not shown
    avatar: null,
    coverImage: '/api/placeholder/400/150',
    bio: 'Psychology major interested in research and mental health advocacy. Love discussing human behavior and supporting fellow students.',
    location: {
      dorm: 'South Campus Apartments',
      campus: 'South Campus',
      studySpots: ['Psychology Building', 'Health Sciences Library']
    },
    academic: {
      courses: ['PSY 350', 'PSY 207', 'STA 119'],
      interests: ['Clinical Psychology', 'Research Methods', 'Mental Health'],
      achievements: ['Research Assistant', 'Psychology Club VP']
    },
    social: {
      spaces: ['Psychology Research Group', 'Mental Health Advocates', 'South Campus Community'],
      connections: 34,
      mutualFriends: 8,
      posts: 17,
      lastActive: '1 day ago'
    },
    stats: {
      researchHours: 89,
      studentsHelped: 15,
      advocacyEvents: 6
    },
    isConnected: false,
    canConnect: true,
    connectionStatus: 'none',
    badges: [
      { type: 'research', label: 'Research Assistant', icon: BookOpen },
      { type: 'service', label: 'Mental Health Advocate', icon: Star },
      { type: 'leadership', label: 'Club Officer', icon: Trophy }
    ]
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    handle: '@dkim.eng',
    major: 'Mechanical Engineering',
    year: 'Freshman',
    gpa: 3.9,
    avatar: '/api/placeholder/120/120',
    coverImage: null,
    bio: 'First-year engineering student excited about robotics and sustainable energy. Looking for study groups and project partners!',
    location: {
      dorm: 'Creekside Village',
      campus: 'North Campus',
      studySpots: ['Engineering Library', 'Davis Hall', 'Furnas Hall']
    },
    academic: {
      courses: ['EAS 199', 'MTH 141', 'PHY 107'],
      interests: ['Robotics', 'Sustainable Energy', 'CAD Design'],
      achievements: ['Honors Program', 'First-Year Excellence']
    },
    social: {
      spaces: ['Engineering Freshman Group', 'Robotics Club', 'Creekside Floor 2'],
      connections: 19,
      mutualFriends: 3,
      posts: 8,
      lastActive: '4 hours ago'
    },
    stats: {
      projectsStarted: 2,
      studyGroups: 5,
      labHours: 34
    },
    isConnected: false,
    canConnect: true,
    connectionStatus: 'pending', // Request sent
    badges: [
      { type: 'academic', label: 'Honors Student', icon: Trophy },
      { type: 'achievement', label: 'First-Year Star', icon: Star }
    ]
  }
];

// Profile Discovery Cards Story
export const ProfileDiscoveryCards: Story = {
  render: () => (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Profile Discovery</h2>
        <p className="text-lg text-gray-600">Connect with University at Buffalo students in your academic and social circles</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {campusProfileData.map((profile) => (
          <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Cover Image or Gradient */}
            <div className="relative">
              {profile.coverImage ? (
                <div className="h-32 bg-gray-200 overflow-hidden">
                  <img 
                    src={profile.coverImage} 
                    alt={`${profile.name} cover`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`h-32 ${
                  profile.major.includes('Computer') ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                  profile.major.includes('Business') ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  profile.major.includes('Psychology') ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                  'bg-gradient-to-r from-orange-400 to-orange-600'
                }`}></div>
              )}
              
              {/* Connection Status Badge */}
              <div className="absolute top-4 right-4">
                {profile.connectionStatus === 'connected' && (
                  <Badge className="bg-green-500 text-white">
                    <Users className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                )}
                {profile.connectionStatus === 'pending' && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
            </div>

            <CardHeader className="pb-3 relative">
              {/* Profile Avatar */}
              <div className="absolute -top-12 left-6">
                <Avatar className="h-20 w-20 border-4 border-white">
                  <AvatarImage src={profile.avatar} alt={`${profile.name}'s profile`} />
                  <AvatarFallback className="text-lg font-semibold bg-gray-100">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="pt-10">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{profile.name}</CardTitle>
                    <CardDescription className="text-base">{profile.handle}</CardDescription>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <GraduationCap className="h-4 w-4" />
                      <span>{profile.major} • {profile.year}</span>
                      {profile.gpa && (
                        <>
                          <span>•</span>
                          <span className="font-medium">{profile.gpa} GPA</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {profile.bio}
              </p>

              {/* Location Info */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{profile.location.dorm} • {profile.location.campus}</span>
              </div>

              {/* Academic Interests */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Academic Interests</div>
                <div className="flex flex-wrap gap-2">
                  {profile.academic.interests.slice(0, 3).map((interest, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Social Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-gray-900">{profile.social.connections}</div>
                  <div className="text-xs text-gray-500">Connections</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{profile.social.spaces.length}</div>
                  <div className="text-xs text-gray-500">Spaces</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{profile.social.mutualFriends}</div>
                  <div className="text-xs text-gray-500">Mutual</div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.badges.slice(0, 2).map((badge, index) => {
                  const IconComponent = badge.icon;
                  return (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <IconComponent className="h-3 w-3 mr-1" />
                      {badge.label}
                    </Badge>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {profile.connectionStatus === 'connected' ? (
                  <>
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </>
                ) : profile.connectionStatus === 'pending' ? (
                  <Button size="sm" variant="outline" disabled className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Request Sent
                  </Button>
                ) : profile.canConnect ? (
                  <Button size="sm" className="flex-1">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" disabled className="flex-1">
                    Cannot Connect
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
              </div>

              {/* Last Active */}
              <div className="text-xs text-gray-500 mt-3 text-center">
                Last active {profile.social.lastActive}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};

// Compact Profile Cards Story
export const CompactProfileCards: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Space Member Display</h2>
        <p className="text-lg text-gray-600">Compact profile cards for member lists and group displays</p>
      </div>

      <div className="space-y-3">
        {campusProfileData.map((profile) => (
          <Card key={profile.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Profile Avatar */}
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar} alt={`${profile.name}'s profile`} />
                  <AvatarFallback className="font-semibold bg-gray-100">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                {/* Profile Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{profile.name}</h3>
                      <p className="text-sm text-gray-600 truncate">
                        {profile.major} • {profile.year}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="h-3 w-3" />
                          <span>{profile.social.connections} connections</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>{profile.location.dorm}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {profile.academic.interests[0]}
                        </Badge>
                      </div>
                    </div>

                    {/* Connection Status & Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      {profile.connectionStatus === 'connected' ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                            Connected
                          </Badge>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : profile.connectionStatus === 'pending' ? (
                        <Badge variant="outline" className="text-xs text-yellow-700">
                          Pending
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline">
                          <UserPlus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};

// Interactive Profile Cards Story
export const InteractiveProfileCards: Story = {
  render: () => {
    const [connections, setConnections] = React.useState(['marcus-johnson']);
    const [pendingRequests, setPendingRequests] = React.useState(['david-kim']);
    const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

    const handleConnect = (profileId: string) => {
      setPendingRequests(prev => [...prev, profileId]);
    };

    const handleMessage = (profileId: string) => {
      console.log(`Opening message with ${profileId}`);
    };

    const getConnectionStatus = (profileId: string) => {
      if (connections.includes(profileId)) return 'connected';
      if (pendingRequests.includes(profileId)) return 'pending';
      return 'none';
    };

    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Profile System</h2>
          <p className="text-lg text-gray-600">Experience dynamic profile interactions and connection management</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {campusProfileData.map((profile) => {
            const connectionStatus = getConnectionStatus(profile.id);
            const isHovered = hoveredCard === profile.id;

            return (
              <Card 
                key={profile.id} 
                className={`overflow-hidden transition-all duration-300 ${
                  isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-md hover:shadow-lg'
                } ${connectionStatus === 'connected' ? 'ring-2 ring-green-500 ring-opacity-30' : ''}`}
                onMouseEnter={() => setHoveredCard(profile.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={profile.avatar} alt={`${profile.name}'s profile`} />
                      <AvatarFallback className="text-lg font-semibold bg-gray-100">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{profile.name}</CardTitle>
                          <CardDescription>{profile.handle}</CardDescription>
                          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                            <GraduationCap className="h-4 w-4" />
                            <span>{profile.major} • {profile.year}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          connectionStatus === 'connected' ? 'bg-green-100 text-green-700' :
                          connectionStatus === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {connectionStatus === 'connected' ? 'Connected' :
                           connectionStatus === 'pending' ? 'Pending' : 'Available'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {profile.bio}
                  </p>

                  {/* Academic & Social Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-1">Current Courses</div>
                      <div className="space-y-1">
                        {profile.academic.courses.slice(0, 2).map((course, index) => (
                          <Badge key={index} variant="outline" className="text-xs block w-fit">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-700 mb-1">Active In</div>
                      <div className="space-y-1">
                        {profile.social.spaces.slice(0, 2).map((space, index) => (
                          <div key={index} className="text-xs text-gray-600 truncate">
                            {space}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mutual Connections */}
                  {profile.social.mutualFriends > 0 && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-blue-800">
                        <Users className="h-4 w-4" />
                        <span>{profile.social.mutualFriends} mutual connections</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {connectionStatus === 'connected' ? (
                      <>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleMessage(profile.id)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </>
                    ) : connectionStatus === 'pending' ? (
                      <Button size="sm" variant="outline" disabled className="flex-1">
                        <Clock className="h-4 w-4 mr-2" />
                        Request Sent
                      </Button>
                    ) : (
                      <>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleConnect(profile.id)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Activity Indicator */}
                  <div className="text-xs text-gray-500 mt-3 text-center">
                    Last active {profile.social.lastActive}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-2">Profile Card Features</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Real-time connection status management with visual feedback</li>
            <li>• Academic compatibility display showing shared courses and interests</li>
            <li>• Social proof through mutual connections and shared spaces</li>
            <li>• Privacy-aware information display respecting student preferences</li>
          </ul>
        </div>
      </div>
    );
  }
};