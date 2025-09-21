import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { User, Upload, Camera, Edit3, Users, GraduationCap, Building, MapPin, Settings, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../atomic/atoms/button-enhanced';

const meta: Meta = {
  title: '02-Atoms/Content-Elements/Avatar & Image System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Avatar & Image System

A comprehensive visual identity system designed for University at Buffalo campus community representation. This system provides consistent avatar displays, profile images, and media elements that create recognizable identity across the HIVE platform.

## Campus Integration Features
- **Student Identity Display** - Academic year, major, and campus affiliation indicators
- **Social Recognition** - Consistent avatar display across spaces, groups, and interactions
- **Privacy Controls** - Configurable visibility settings for profile images and personal information
- **Mobile Optimization** - Responsive image loading and display for campus mobile usage

## Avatar Types
- **Personal Avatars** - Student profile pictures with academic context
- **Group Avatars** - Study group, club, and organization representations
- **System Avatars** - Default fallbacks and generated placeholder images
- **Status Indicators** - Online presence, academic standing, and engagement levels

## Accessibility Standards
- **WCAG 2.1 AA Compliant** - Proper alt text and high contrast ratios
- **Screen Reader Support** - Descriptive image content and context
- **Keyboard Navigation** - Accessible avatar editing and selection interfaces
- **Progressive Enhancement** - Graceful fallbacks when images fail to load
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Avatar Data
const campusAvatarData = {
  students: [
    {
      id: '1',
      name: 'Sarah Chen',
      major: 'Computer Science',
      year: 'Junior',
      dorm: 'Ellicott Complex',
      status: 'online',
      image: '/api/placeholder/120/120',
      badges: ['Dean\'s List', 'Study Group Leader']
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      major: 'Business Administration',
      year: 'Senior',
      dorm: 'Governors Complex',
      status: 'away',
      image: '/api/placeholder/120/120',
      badges: ['Student Government', 'Club President']
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      major: 'Psychology',
      year: 'Sophomore',
      dorm: 'South Campus',
      status: 'offline',
      image: null, // No image to test fallback
      badges: ['Research Assistant']
    },
    {
      id: '4',
      name: 'David Kim',
      major: 'Mechanical Engineering',
      year: 'Freshman',
      dorm: 'Creekside Village',
      status: 'online',
      image: '/api/placeholder/120/120',
      badges: ['Honors Program']
    }
  ],
  groups: [
    {
      id: 'cse115-study',
      name: 'CSE 115 Study Group',
      type: 'Academic',
      memberCount: 8,
      image: '/api/placeholder/120/120',
      category: 'Computer Science'
    },
    {
      id: 'ellicott-floor3',
      name: 'Ellicott Floor 3',
      type: 'Residential',
      memberCount: 24,
      image: null,
      category: 'Dorm Community'
    },
    {
      id: 'buffalo-robotics',
      name: 'Buffalo Robotics Club',
      type: 'Organization',
      memberCount: 45,
      image: '/api/placeholder/120/120',
      category: 'Engineering'
    }
  ]
};

// Avatar Size Variants
const avatarSizes = [
  { size: 'sm', dimension: 'h-8 w-8', label: 'Small (32px)', usage: 'Navigation, compact lists' },
  { size: 'md', dimension: 'h-12 w-12', label: 'Medium (48px)', usage: 'Posts, comments, cards' },
  { size: 'lg', dimension: 'h-16 w-16', label: 'Large (64px)', usage: 'Profile headers, member lists' },
  { size: 'xl', dimension: 'h-20 w-20', label: 'Extra Large (80px)', usage: 'Profile pages, featured content' },
  { size: '2xl', dimension: 'h-32 w-32', label: '2X Large (128px)', usage: 'Profile editing, detailed views' }
];

// Personal Avatar Showcase Story
export const PersonalAvatarShowcase: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Avatar System</h2>
        <p className="text-lg text-gray-600">Personal identity representation for University at Buffalo students</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {campusAvatarData.students.map((student) => (
          <div key={student.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={student.image} alt={`${student.name}'s profile`} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Status Indicator */}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${
                  student.status === 'online' ? 'bg-green-500' :
                  student.status === 'away' ? 'bg-yellow-500' :
                  'bg-gray-400'
                }`}></div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" />
                    <span>{student.major} • {student.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Building className="h-3 w-3" />
                    <span>{student.dorm}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-xs px-2 py-1 rounded-full ${
                  student.status === 'online' ? 'bg-green-100 text-green-700' :
                  student.status === 'away' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {student.status}
                </div>
              </div>
            </div>

            {/* Student Badges */}
            <div className="flex flex-wrap gap-2">
              {student.badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

// Group Avatar Showcase Story
export const GroupAvatarShowcase: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Group & Space Avatar System</h2>
        <p className="text-lg text-gray-600">Visual identity for campus communities and organizations</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campusAvatarData.groups.map((group) => (
          <div key={group.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-4">
              <div className="relative inline-block">
                <Avatar className="h-20 w-20 mx-auto mb-3">
                  <AvatarImage src={group.image} alt={`${group.name} avatar`} />
                  <AvatarFallback className={`text-lg font-bold ${
                    group.type === 'Academic' ? 'bg-blue-100 text-blue-600' :
                    group.type === 'Residential' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {group.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                {/* Group Type Indicator */}
                <div className={`absolute -top-1 -right-1 p-1 rounded-full ${
                  group.type === 'Academic' ? 'bg-blue-500' :
                  group.type === 'Residential' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}>
                  {group.type === 'Academic' ? (
                    <GraduationCap className="h-3 w-3 text-white" />
                  ) : group.type === 'Residential' ? (
                    <Building className="h-3 w-3 text-white" />
                  ) : (
                    <Users className="h-3 w-3 text-white" />
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-1">{group.name}</h3>
              <p className="text-sm text-gray-600">{group.category}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Members:</span>
                <span className="font-medium text-gray-900">{group.memberCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Type:</span>
                <Badge variant={
                  group.type === 'Academic' ? 'default' :
                  group.type === 'Residential' ? 'secondary' :
                  'outline'
                }>
                  {group.type}
                </Badge>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full mt-4">
              <Users className="h-4 w-4 mr-2" />
              View Group
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
};

// Avatar Size Variants Story
export const AvatarSizeVariants: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Avatar Size System</h2>
        <p className="text-lg text-gray-600">Consistent sizing across different platform contexts</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="space-y-8">
          {avatarSizes.map((size) => (
            <div key={size.size} className="flex items-center gap-6 pb-6 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-4 min-w-[200px]">
                <Avatar className={size.dimension}>
                  <AvatarImage src="/api/placeholder/120/120" alt="Sample avatar" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    SC
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">{size.label}</div>
                  <div className="text-sm text-gray-600">{size.dimension}</div>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-700">{size.usage}</p>
              </div>

              {/* Example Context */}
              <div className="text-xs bg-gray-50 px-3 py-2 rounded-lg">
                {size.size === 'sm' && 'Nav bar, sidebar'}
                {size.size === 'md' && 'Feed posts, comments'}
                {size.size === 'lg' && 'Member lists, cards'}
                {size.size === 'xl' && 'Profile headers'}
                {size.size === '2xl' && 'Profile editing'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

// Avatar States & Fallbacks Story
export const AvatarStatesAndFallbacks: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Avatar States & Fallbacks</h2>
        <p className="text-lg text-gray-600">Handling different avatar conditions and loading states</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Loading & Error States */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Loading & Error States</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gray-200 animate-pulse">
                  <User className="h-6 w-6 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">Loading State</div>
                <div className="text-sm text-gray-600">Animated placeholder while image loads</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/broken-image.jpg" alt="Broken image" />
                <AvatarFallback className="bg-red-100 text-red-600">
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">Error Fallback</div>
                <div className="text-sm text-gray-600">Default icon when image fails to load</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-gray-900">Initial Fallback</div>
                <div className="text-sm text-gray-600">User initials when no image provided</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Indicators</h3>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/120/120" alt="Online user" />
                  <AvatarFallback className="bg-green-100 text-green-600">ON</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Online</div>
                <div className="text-sm text-gray-600">Actively using the platform</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/120/120" alt="Away user" />
                  <AvatarFallback className="bg-yellow-100 text-yellow-600">AW</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Away</div>
                <div className="text-sm text-gray-600">Logged in but inactive</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/api/placeholder/120/120" alt="Offline user" />
                  <AvatarFallback className="bg-gray-100 text-gray-600">OF</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900">Offline</div>
                <div className="text-sm text-gray-600">Not currently logged in</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// Interactive Avatar Editor Story
export const InteractiveAvatarEditor: Story = {
  render: () => {
    const [selectedAvatar, setSelectedAvatar] = React.useState('/api/placeholder/120/120');
    const [isEditing, setIsEditing] = React.useState(false);

    const avatarOptions = [
      '/api/placeholder/120/120',
      '/api/placeholder/121/121',
      '/api/placeholder/122/122',
      null // Fallback option
    ];

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Avatar Editor</h2>
          <p className="text-lg text-gray-600">Experience HIVE's avatar customization system</p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Avatar</h3>
            
            <div className="relative inline-block">
              <Avatar className="h-32 w-32">
                <AvatarImage src={selectedAvatar} alt="Current profile avatar" />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-bold">
                  SC
                </AvatarFallback>
              </Avatar>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                {isEditing ? <Settings className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
              </button>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
              <p className="text-sm text-gray-600">Computer Science • Junior</p>
            </div>
          </div>

          {isEditing && (
            <div className="border-t pt-6">
              <h4 className="font-semibold text-gray-800 mb-4">Choose Avatar</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {avatarOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAvatar(option)}
                    className={`relative p-2 rounded-xl border-2 transition-colors ${
                      selectedAvatar === option
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarImage src={option} alt={`Avatar option ${index + 1}`} />
                      <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                        {index === avatarOptions.length - 1 ? 'SC' : `${index + 1}`}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-gray-600 mt-2">
                      {index === avatarOptions.length - 1 ? 'Initials' : `Option ${index + 1}`}
                    </p>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 justify-center">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
                <Button onClick={() => setIsEditing(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-100">
          <h4 className="font-semibold text-teal-900 mb-2">Avatar System Features</h4>
          <ul className="text-sm text-teal-800 space-y-1">
            <li>• Multiple upload options (file upload, camera, URL)</li>
            <li>• Automatic fallback to user initials when no image available</li>
            <li>• Status indicators for online presence and activity</li>
            <li>• Responsive sizing for different platform contexts</li>
          </ul>
        </div>
      </div>
    );
  }
};