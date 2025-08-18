import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Settings, BarChart3, Shield, Calendar, Bell, User, BookOpen, Trophy, Users, MapPin, GraduationCap, Clock, Zap, Star, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';

const meta: Meta = {
  title: '03-Molecules/Profile-Components/Profile Dashboard System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Profile Dashboard System

A comprehensive profile dashboard system for University at Buffalo students, providing a unified command center for campus life management. These molecular components create a personalized hub that combines academic, social, and campus utility features into an intuitive dashboard experience.

## Campus Integration Features
- **Academic Progress Tracking** - Course management, GPA monitoring, and study goal progress
- **Social Community Hub** - Active spaces, friend connections, and campus social activity
- **Campus Utility Integration** - Quick access to campus tools, schedules, and services
- **Privacy & Preferences** - Granular control over visibility, notifications, and data sharing

## Dashboard Components
- **Profile Header** - Student identity, status, and quick settings access
- **Activity Overview** - Recent campus activity, engagement metrics, and progress indicators
- **Quick Actions Panel** - Fast access to common tasks like creating posts, joining spaces, messaging
- **Widget System** - Customizable cards showing analytics, calendar, tools, and privacy controls

## Interactive Elements
- **Expand & Focus System** - Detailed views for analytics, settings, and privacy controls
- **Real-time Updates** - Live activity feeds, notification badges, and status indicators
- **Smart Recommendations** - Suggested spaces, study partners, and campus opportunities
- **Goal Tracking** - Academic milestones, social engagement targets, and productivity metrics

## Personalization Features
- **Adaptive Layout** - Dashboard adjusts based on user behavior and preferences
- **Smart Notifications** - Context-aware alerts for academic deadlines and social events
- **Campus Context** - Location-aware features showing nearby study spots and campus services
- **Privacy-First Design** - Student control over all personal information and activity visibility
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Student Data
const campusStudentData = {
  id: 'sarah-chen-cs',
  name: 'Sarah Chen',
  handle: '@sarahc.cs',
  major: 'Computer Science',
  year: 'Junior',
  gpa: 3.8,
  avatar: '/api/placeholder/80/80',
  coverImage: '/api/placeholder/400/150',
  bio: 'CS major passionate about AI and machine learning. Always looking for study partners and project collaborators!',
  location: {
    dorm: 'Ellicott Complex',
    campus: 'North Campus',
    currentLocation: 'Lockwood Library'
  },
  academic: {
    currentSemester: 'Spring 2024',
    creditHours: 15,
    courses: [
      { code: 'CSE 474', name: 'Introduction to Machine Learning', progress: 75 },
      { code: 'CSE 442', name: 'Software Engineering', progress: 90 },
      { code: 'MTH 411', name: 'Probability Theory', progress: 65 }
    ],
    nextDeadline: {
      course: 'CSE 474',
      assignment: 'ML Project Proposal',
      dueDate: 'Tomorrow, 11:59 PM'
    }
  },
  social: {
    activeSpaces: [
      { name: 'CSE 115 Study Group', memberCount: 24, role: 'member' },
      { name: 'UB Women in CS', memberCount: 156, role: 'officer' },
      { name: 'Floor 3 Community', memberCount: 18, role: 'admin' }
    ],
    connections: 47,
    recentActivity: [
      { type: 'post', content: 'Shared study notes for CSE 474', time: '2 hours ago' },
      { type: 'join', content: 'Joined Machine Learning Research Group', time: '1 day ago' }
    ]
  },
  tools: {
    recentlyUsed: [
      { name: 'Study Session Planner', lastUsed: '30 minutes ago', usage: 'weekly' },
      { name: 'Group Project Coordinator', lastUsed: '2 hours ago', usage: 'active' },
      { name: 'GPA Calculator', lastUsed: '1 day ago', usage: 'occasional' }
    ],
    favoriteTools: 3,
    toolsCreated: 1
  },
  analytics: {
    weeklyStudyHours: 24,
    campusEngagement: 87,
    socialActivity: 92,
    academicProgress: 78
  },
  privacy: {
    ghostMode: false,
    studyMode: true,
    profileVisibility: 'campus',
    lastActive: '5 minutes ago'
  },
  notifications: [
    { type: 'academic', title: 'Assignment due tomorrow', time: '1 hour ago', urgent: true },
    { type: 'social', title: 'New post in CSE Study Group', time: '2 hours ago', urgent: false },
    { type: 'tool', title: 'Study session starting soon', time: '30 minutes ago', urgent: true }
  ]
};

// Main Profile Dashboard Story
export const MainProfileDashboard: Story = {
  render: () => {
    const [activeWidget, setActiveWidget] = React.useState<string | null>(null);
    const [privacyMode, setPrivacyMode] = React.useState(campusStudentData.privacy.ghostMode);

    const urgentNotifications = campusStudentData.notifications.filter(n => n.urgent).length;

    return (
      <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Profile Dashboard</h2>
          <p className="text-lg text-gray-600">Your University at Buffalo command center</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile & Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Header Card */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="h-20 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="absolute -bottom-8 left-4">
                  <Avatar className="h-16 w-16 border-4 border-white">
                    <AvatarImage src={campusStudentData.avatar} alt={campusStudentData.name} />
                    <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                      SC
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setPrivacyMode(!privacyMode)}
                    className={`p-2 rounded-full transition-colors ${
                      privacyMode ? 'bg-purple-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {privacyMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <CardContent className="pt-10 pb-4">
                <div className="text-center">
                  <h3 className="font-bold text-gray-900">{campusStudentData.name}</h3>
                  <p className="text-gray-600">{campusStudentData.handle}</p>
                  <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-600">
                    <GraduationCap className="h-4 w-4" />
                    <span>{campusStudentData.major} • {campusStudentData.year}</span>
                  </div>
                  
                  {privacyMode && (
                    <Badge className="mt-2 bg-purple-100 text-purple-700">
                      Ghost Mode Active
                    </Badge>
                  )}
                  
                  <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{campusStudentData.location.currentLocation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Campus Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{campusStudentData.social.connections}</div>
                    <div className="text-xs text-gray-500">Connections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{campusStudentData.social.activeSpaces.length}</div>
                    <div className="text-xs text-gray-500">Active Spaces</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Study Progress</span>
                    <span className="text-sm text-gray-600">{campusStudentData.analytics.academicProgress}%</span>
                  </div>
                  <Progress value={campusStudentData.analytics.academicProgress} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Campus Engagement</span>
                    <span className="text-sm text-gray-600">{campusStudentData.analytics.campusEngagement}%</span>
                  </div>
                  <Progress value={campusStudentData.analytics.campusEngagement} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { icon: Settings, label: 'Profile Settings', action: 'settings' },
                  { icon: BarChart3, label: 'View Analytics', action: 'analytics' },
                  { icon: Shield, label: 'Privacy Controls', action: 'privacy' },
                  { icon: Calendar, label: 'Schedule View', action: 'calendar' }
                ].map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.action}
                      onClick={() => setActiveWidget(action.action)}
                      className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <IconComponent className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">{action.label}</span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Notifications Bar */}
            {urgentNotifications > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="font-medium text-orange-800">
                        You have {urgentNotifications} urgent notification{urgentNotifications > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-orange-600">
                        {campusStudentData.notifications.filter(n => n.urgent)[0]?.title}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="text-orange-600 border-orange-200">
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Academic Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Current Courses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {campusStudentData.academic.courses.map((course, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{course.code}</p>
                          <p className="text-sm text-gray-600">{course.name}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {course.progress}%
                        </Badge>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <Clock className="h-4 w-4" />
                      <span>Next: {campusStudentData.academic.nextDeadline.assignment}</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">
                      Due {campusStudentData.academic.nextDeadline.dueDate}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Active Spaces
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {campusStudentData.social.activeSpaces.map((space, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{space.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-3 w-3" />
                          <span>{space.memberCount} members</span>
                          <Badge variant="secondary" className="text-xs">
                            {space.role}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Open
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Analytics Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  This Week's Insights
                </CardTitle>
                <CardDescription>
                  Your campus activity and productivity metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { label: 'Study Hours', value: campusStudentData.analytics.weeklyStudyHours, unit: 'hrs', color: 'blue' },
                    { label: 'Engagement', value: campusStudentData.analytics.campusEngagement, unit: '%', color: 'green' },
                    { label: 'Social Activity', value: campusStudentData.analytics.socialActivity, unit: '%', color: 'purple' },
                    { label: 'Tools Used', value: campusStudentData.tools.recentlyUsed.length, unit: 'tools', color: 'orange' }
                  ].map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-3xl font-bold ${
                        metric.color === 'blue' ? 'text-blue-600' :
                        metric.color === 'green' ? 'text-green-600' :
                        metric.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`}>
                        {metric.value}
                        <span className="text-lg text-gray-500 ml-1">{metric.unit}</span>
                      </div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campusStudentData.social.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'post' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {activity.type === 'post' ? 
                          <BookOpen className="h-4 w-4" /> : 
                          <Users className="h-4 w-4" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.content}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Active Widget Overlay */}
        {activeWidget && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setActiveWidget(null)}>
            <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="capitalize">{activeWidget} Panel</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setActiveWidget(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                    <Star className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {activeWidget.charAt(0).toUpperCase() + activeWidget.slice(1)} Panel
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Detailed {activeWidget} management coming in v1 release
                  </p>
                  <Badge className="bg-blue-100 text-blue-700">
                    Feature Preview
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
};

// Compact Dashboard Story
export const CompactProfileDashboard: Story = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Compact Dashboard View</h2>
        <p className="text-lg text-gray-600">Space-efficient profile overview for quick access</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={campusStudentData.avatar} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">SC</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{campusStudentData.name}</h3>
                <p className="text-sm text-gray-600">{campusStudentData.major} • {campusStudentData.year}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Academic Progress</span>
                <span className="text-sm font-medium">{campusStudentData.analytics.academicProgress}%</span>
              </div>
              <Progress value={campusStudentData.analytics.academicProgress} className="h-2" />
              
              <div className="grid grid-cols-3 gap-3 pt-3 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{campusStudentData.academic.courses.length}</div>
                  <div className="text-xs text-gray-500">Courses</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{campusStudentData.social.activeSpaces.length}</div>
                  <div className="text-xs text-gray-500">Spaces</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{campusStudentData.social.connections}</div>
                  <div className="text-xs text-gray-500">Friends</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { icon: BookOpen, label: 'Study Hours', value: `${campusStudentData.analytics.weeklyStudyHours}h`, color: 'blue' },
                { icon: Users, label: 'Social Activity', value: `${campusStudentData.analytics.socialActivity}%`, color: 'green' },
                { icon: Trophy, label: 'Goals Met', value: '4/6', color: 'yellow' },
                { icon: Clock, label: 'Time on Campus', value: '32h', color: 'purple' }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      stat.color === 'green' ? 'bg-green-100 text-green-600' :
                      stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                    <p className="font-semibold text-gray-900">{stat.value}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campusStudentData.social.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`p-1.5 rounded-full ${
                    activity.type === 'post' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {activity.type === 'post' ? 
                      <BookOpen className="h-3 w-3" /> : 
                      <Users className="h-3 w-3" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 line-clamp-2">{activity.content}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

// Interactive Dashboard Demo Story
export const InteractiveProfileDemo: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(campusStudentData.notifications);
    const [studyMode, setStudyMode] = React.useState(campusStudentData.privacy.studyMode);
    const [selectedCourse, setSelectedCourse] = React.useState<string | null>(null);

    const markNotificationRead = (index: number) => {
      setNotifications(prev => prev.filter((_, i) => i !== index));
    };

    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Profile Dashboard</h2>
          <p className="text-lg text-gray-600">Experience dynamic interactions and real-time updates</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Study Mode</span>
                <button
                  onClick={() => setStudyMode(!studyMode)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    studyMode ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    studyMode ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Active Notifications</p>
                <Badge variant={notifications.length > 0 ? 'default' : 'secondary'}>
                  {notifications.length} pending
                </Badge>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Course Focus</p>
                <div className="space-y-1">
                  {campusStudentData.academic.courses.map((course, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCourse(selectedCourse === course.code ? null : course.code)}
                      className={`w-full text-left p-2 text-xs rounded transition-colors ${
                        selectedCourse === course.code ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                      }`}
                    >
                      {course.code}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Dashboard */}
          <div className="lg:col-span-3 space-y-6">
            {/* Status Bar */}
            <Card className={`transition-colors ${studyMode ? 'border-blue-200 bg-blue-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={campusStudentData.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">SC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{campusStudentData.name}</p>
                      <p className="text-sm text-gray-600">
                        {studyMode ? '📚 In Study Mode' : '💬 Available for chat'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {notifications.length > 0 && (
                      <div className="relative">
                        <Bell className="h-5 w-5 text-gray-600" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                          {notifications.length}
                        </div>
                      </div>
                    )}
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Notifications */}
            {notifications.length > 0 && (
              <div className="space-y-2">
                {notifications.map((notification, index) => (
                  <Card key={index} className={`${notification.urgent ? 'border-orange-200 bg-orange-50' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${
                            notification.type === 'academic' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'social' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            {notification.type === 'academic' ? <BookOpen className="h-4 w-4" /> :
                             notification.type === 'social' ? <Users className="h-4 w-4" /> :
                             <Zap className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.time}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => markNotificationRead(index)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Course Focus View */}
            {selectedCourse && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    {selectedCourse} Focus Mode
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const course = campusStudentData.academic.courses.find(c => c.code === selectedCourse);
                    return course ? (
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-gray-900">{course.name}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="mt-1" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Study Materials
                          </Button>
                          <Button size="sm" variant="outline">
                            Join Study Group
                          </Button>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Analytics Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    Weekly Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: 'Study Hours', value: campusStudentData.analytics.weeklyStudyHours, max: 40, color: 'blue' },
                      { label: 'Campus Engagement', value: campusStudentData.analytics.campusEngagement, max: 100, color: 'green' },
                      { label: 'Social Activity', value: campusStudentData.analytics.socialActivity, max: 100, color: 'purple' }
                    ].map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-600">{metric.label}</span>
                          <span className="text-sm font-medium">{metric.value}{metric.max === 100 ? '%' : 'h'}</span>
                        </div>
                        <Progress value={(metric.value / metric.max) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { title: 'Study Streak', description: '7 days in a row', earned: true },
                      { title: 'Social Butterfly', description: '5 new connections', earned: true },
                      { title: 'Academic Focus', description: '90% course completion', earned: false },
                      { title: 'Community Leader', description: 'Help 10 students', earned: false }
                    ].map((achievement, index) => (
                      <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${
                        achievement.earned ? 'bg-yellow-50' : 'bg-gray-50'
                      }`}>
                        <div className={`p-2 rounded-full ${
                          achievement.earned ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-400'
                        }`}>
                          <Trophy className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                            {achievement.title}
                          </p>
                          <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
                          <Badge className="bg-yellow-100 text-yellow-700">
                            Earned
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-2">Dashboard Features</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Real-time notification management with smart filtering</li>
            <li>• Dynamic study mode that adapts interface and privacy settings</li>
            <li>• Course-focused views with relevant tools and study materials</li>
            <li>• Interactive progress tracking with goal management</li>
          </ul>
        </div>
      </div>
    );
  }
};