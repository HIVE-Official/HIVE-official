import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Users, MapPin, Clock, Star, Settings, ArrowRight, BookOpen, Home, Building, GraduationCap, Calendar, MessageSquare, Lock, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../atomic/ui/card';
import { Badge } from '../../../atomic/atoms/badge';
import { Button } from '../../../atomic/atoms/button-enhanced';
import { Avatar, AvatarFallback } from '../../../atomic/atoms/avatar';

const meta: Meta<typeof React.Fragment> = {
  title: '03-Molecules/Card-Components/Space Card System',
  component: React.Fragment,
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Space Card System

A comprehensive card system for displaying University at Buffalo campus spaces, study groups, and social communities. These molecular components combine multiple atomic elements to create engaging, informative displays of campus spaces that students can discover, join, and interact with.

## Campus Integration Features
- **Academic Spaces** - Study groups, course sections, and academic clubs with relevant course information
- **Social Spaces** - Dorm communities, social clubs, and event groups with member counts and activity levels
- **Campus Services** - Dining coordination, laundry tracking, and facility-based communities
- **Interest Groups** - Hobby groups, intramural teams, and special interest communities

## Card Variants
- **Browse Cards** - Discovery-focused with key information and join actions
- **Member Cards** - Detailed view for spaces user has joined with management options
- **Featured Cards** - Highlighted spaces with enhanced visual prominence
- **Compact Cards** - Space-efficient display for lists and search results

## Interactive Elements
- **Join/Leave Actions** - Clear call-to-action buttons with state management
- **Member Previews** - Avatar displays showing active community members
- **Activity Indicators** - Recent activity and engagement metrics
- **Privacy Controls** - Visual indication of space visibility and join requirements

## Accessibility Standards
- **WCAG 2.1 AA Compliant** - Full keyboard navigation and screen reader support
- **Semantic Structure** - Proper heading hierarchy and content organization
- **Focus Management** - Clear focus indicators and logical tab order
- **Informative Labels** - Descriptive text for all interactive elements
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Space Data
const campusSpaceData = [
  {
    id: 'cse115-study',
    name: 'CSE 115 Study Group',
    description: 'Weekly study sessions for Computer Science fundamentals. We meet every Tuesday and Thursday in Lockwood Library.',
    type: 'Academic',
    category: 'Study Group',
    memberCount: 12,
    maxMembers: 15,
    isPrivate: false,
    lastActive: '2 hours ago',
    location: 'Lockwood Library',
    meetingTime: 'Tue/Thu 7:00 PM',
    image: '/api/placeholder/300/200',
    tags: ['Computer Science', 'Study Group', 'Weekly'],
    members: [
      { id: '1', name: 'Sarah Chen', avatar: '/api/placeholder/40/40' },
      { id: '2', name: 'Mike Johnson', avatar: null },
      { id: '3', name: 'Emma Rodriguez', avatar: '/api/placeholder/40/40' },
      { id: '4', name: 'David Kim', avatar: '/api/placeholder/40/40' }
    ],
    stats: {
      studyHours: 48,
      resources: 12,
      events: 8
    },
    isJoined: false,
    canJoin: true
  },
  {
    id: 'ellicott-floor3',
    name: 'Ellicott Floor 3',
    description: 'Our floor community for social events, study sessions, and coordinating everything from laundry to late-night food runs.',
    type: 'Residential',
    category: 'Dorm Community',
    memberCount: 24,
    maxMembers: 30,
    isPrivate: true,
    lastActive: '15 minutes ago',
    location: 'Ellicott Complex Floor 3',
    meetingTime: 'Ongoing',
    image: null,
    tags: ['Dorm Life', 'Community', 'Social Events'],
    members: [
      { id: '5', name: 'Alex Rivera', avatar: '/api/placeholder/40/40' },
      { id: '6', name: 'Jordan Lee', avatar: null },
      { id: '7', name: 'Taylor Swift', avatar: '/api/placeholder/40/40' },
      { id: '8', name: 'Morgan Davis', avatar: '/api/placeholder/40/40' }
    ],
    stats: {
      events: 15,
      posts: 127,
      activeToday: 8
    },
    isJoined: true,
    canJoin: false
  },
  {
    id: 'buffalo-robotics',
    name: 'Buffalo Robotics Club',
    description: 'Building autonomous robots and competing in regional competitions. Open to all engineering majors and anyone interested in robotics.',
    type: 'Organization',
    category: 'Engineering Club',
    memberCount: 47,
    maxMembers: null,
    isPrivate: false,
    lastActive: '1 day ago',
    location: 'Davis Hall Lab 230',
    meetingTime: 'Fridays 6:00 PM',
    image: '/api/placeholder/300/200',
    tags: ['Engineering', 'Robotics', 'Competition'],
    members: [
      { id: '9', name: 'Chris Park', avatar: '/api/placeholder/40/40' },
      { id: '10', name: 'Maya Patel', avatar: '/api/placeholder/40/40' },
      { id: '11', name: 'Ryan Wong', avatar: null },
      { id: '12', name: 'Lisa Zhang', avatar: '/api/placeholder/40/40' }
    ],
    stats: {
      projects: 6,
      competitions: 3,
      workshops: 12
    },
    isJoined: false,
    canJoin: true,
    featured: true
  },
  {
    id: 'pre-med-support',
    name: 'Pre-Med Support Network',
    description: 'Support group for pre-medical students. MCAT prep, medical school applications, and emotional support through the journey.',
    type: 'Academic',
    category: 'Support Group',
    memberCount: 28,
    maxMembers: 35,
    isPrivate: true,
    lastActive: '4 hours ago',
    location: 'Virtual & Study Rooms',
    meetingTime: 'Sundays 3:00 PM',
    image: '/api/placeholder/300/200',
    tags: ['Pre-Med', 'MCAT', 'Support Group'],
    members: [
      { id: '13', name: 'Priya Sharma', avatar: '/api/placeholder/40/40' },
      { id: '14', name: 'Marcus Thompson', avatar: '/api/placeholder/40/40' },
      { id: '15', name: 'Elena Kozlov', avatar: null },
      { id: '16', name: 'Ahmed Hassan', avatar: '/api/placeholder/40/40' }
    ],
    stats: {
      studySessions: 22,
      mcatScores: 518,
      acceptances: 12
    },
    isJoined: true,
    canJoin: false,
    inviteOnly: true
  }
];

// Space Browse Cards Story
export const SpaceBrowseCards: Story = {
  render: () => (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Space Discovery</h2>
        <p className="text-lg text-gray-600">Discover and join University at Buffalo campus communities</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {campusSpaceData.map((space: any) => (
          <Card key={space.id} className={`overflow-hidden hover:shadow-lg transition-shadow ${
            space.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
          }`}>
            {/* Card Header with Image or Fallback */}
            <div className="relative">
              {space.image ? (
                <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={space.image} 
                    alt={`${space.name} cover`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`h-48 flex items-center justify-center rounded-t-lg ${
                  space.type === 'Academic' ? 'bg-blue-100' :
                  space.type === 'Residential' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  {space.type === 'Academic' ? (
                    <BookOpen className="h-16 w-16 text-blue-600" />
                  ) : space.type === 'Residential' ? (
                    <Home className="h-16 w-16 text-green-600" />
                  ) : (
                    <Building className="h-16 w-16 text-purple-600" />
                  )}
                </div>
              )}
              
              {/* Privacy Badge */}
              <div className="absolute top-4 right-4">
                {space.isPrivate ? (
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    <Lock className="h-3 w-3 mr-1" />
                    Private
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    <Globe className="h-3 w-3 mr-1" />
                    Public
                  </Badge>
                )}
              </div>

              {/* Featured Badge */}
              {space.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{space.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {space.category} • {space.type}
                  </CardDescription>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-semibold text-gray-900">
                    {space.memberCount}
                    {space.maxMembers && `/${space.maxMembers}`}
                  </div>
                  <div className="text-xs text-gray-500">members</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {space.description}
              </p>

              {/* Location and Time */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{space.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{space.meetingTime}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {space.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Member Avatars */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  {space.members.slice(0, 4).map((member, index) => (
                    <Avatar key={member.id} className="h-8 w-8 border-2 border-white">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs bg-gray-100">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                {space.memberCount > 4 && (
                  <span className="text-xs text-gray-500">
                    +{space.memberCount - 4} more
                  </span>
                )}
                <div className="ml-auto text-xs text-gray-500">
                  Active {space.lastActive}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {space.isJoined ? (
                  <>
                    <Button size="sm" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Open Space
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </>
                ) : space.canJoin ? (
                  <Button size="sm" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Join Space
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" disabled className="flex-1">
                    {space.inviteOnly ? 'Invite Required' : 'Space Full'}
                  </Button>
                )}
                <Button size="sm" variant="secondary">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
};

// Compact Space Cards Story
export const CompactSpaceCards: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Compact Space Display</h2>
        <p className="text-lg text-gray-600">Space-efficient cards for lists and search results</p>
      </div>

      <div className="space-y-4">
        {campusSpaceData.map((space: any) => (
          <Card key={space.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                {/* Space Icon/Avatar */}
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                  space.type === 'Academic' ? 'bg-blue-100' :
                  space.type === 'Residential' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  {space.type === 'Academic' ? (
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  ) : space.type === 'Residential' ? (
                    <Home className="h-6 w-6 text-green-600" />
                  ) : (
                    <Building className="h-6 w-6 text-purple-600" />
                  )}
                </div>

                {/* Space Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{space.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{space.description}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {space.memberCount} members
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {space.lastActive}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {space.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 ml-4">
                      {space.isJoined ? (
                        <Button size="sm" variant="secondary">
                          <Settings className="h-4 w-4" />
                        </Button>
                      ) : space.canJoin ? (
                        <Button size="sm">
                          Join
                        </Button>
                      ) : (
                        <Button size="sm" variant="secondary" disabled>
                          {space.isPrivate ? 'Private' : 'Full'}
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
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

// Interactive Space Cards Story
export const InteractiveSpaceCards: Story = {
  render: () => {
    const [joinedSpaces, setJoinedSpaces] = React.useState(['ellicott-floor3', 'pre-med-support']);
    const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

    const handleJoinSpace = (spaceId: string) => {
      setJoinedSpaces(prev => [...prev, spaceId]);
    };

    const handleLeaveSpace = (spaceId: string) => {
      setJoinedSpaces(prev => prev.filter(id => id !== spaceId));
    };

    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Space Cards</h2>
          <p className="text-lg text-gray-600">Experience dynamic space interactions and state management</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {campusSpaceData.slice(0, 4).map((space: any) => {
            const isJoined = joinedSpaces.includes(space.id);
            const isHovered = hoveredCard === space.id;

            return (
              <Card 
                key={space.id} 
                className={`overflow-hidden transition-all duration-300 cursor-pointer ${
                  isHovered ? 'shadow-xl scale-[1.02]' : 'shadow-md hover:shadow-lg'
                } ${isJoined ? 'ring-2 ring-green-500 ring-opacity-30' : ''}`}
                onMouseEnter={() => setHoveredCard(space.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        space.type === 'Academic' ? 'bg-blue-100 text-blue-600' :
                        space.type === 'Residential' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {space.type === 'Academic' ? <BookOpen className="h-5 w-5" /> :
                         space.type === 'Residential' ? <Home className="h-5 w-5" /> :
                         <Building className="h-5 w-5" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{space.name}</CardTitle>
                        <CardDescription>{space.category}</CardDescription>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isJoined ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {isJoined ? 'Joined' : 'Available'}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {space.description}
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {Object.entries(space.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Member Preview */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex -space-x-2">
                      {space.members.slice(0, 3).map((member: any) => (
                        <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="text-xs bg-gray-100">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      {space.memberCount} total members
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-2">
                    {isJoined ? (
                      <>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => console.log(`Opening ${space.name}`)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Open Space
                        </Button>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => handleLeaveSpace(space.id)}
                        >
                          Leave
                        </Button>
                      </>
                    ) : space.canJoin ? (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleJoinSpace(space.id)}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Join Space
                      </Button>
                    ) : (
                      <Button size="sm" variant="secondary" disabled className="flex-1">
                        {space.inviteOnly ? 'Invite Required' : 'Space Full'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-2">Space Card Features</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Real-time join/leave state management with visual feedback</li>
            <li>• Hover effects and animations for enhanced user experience</li>
            <li>• Comprehensive space information display with stats and member previews</li>
            <li>• Responsive design that works perfectly on mobile and desktop</li>
          </ul>
        </div>
      </div>
    );
  }
};