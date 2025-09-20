/**
 * HIVE Live Frontend: Calendar & Events System
 * Complete calendar integration and event management as it appears in production
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../../components/ui/avatar';
import { Input } from '../../../components/ui/input';
import { Separator } from '../../../components/ui/separator';
import { Switch } from '../../../components/ui/switch';
import { HiveProgress } from '../../../components/hive-progress';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus, 
  Search,
  Filter,
  User,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Edit,
  Trash2,
  Share,
  Heart,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Target,
  BookOpen,
  Coffee,
  GraduationCap,
  Home,
  Settings
} from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: '16-Live-Frontend/Calendar & Events System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Live Calendar & Events System

The complete calendar and event management system as experienced by UB students in production. This showcases the full campus scheduling, conflict detection, and social event coordination features.

## Key Features
- **Smart Calendar Integration**: Personal, academic, and social events
- **Conflict Detection**: Automatic scheduling conflict identification
- **Social Events**: Campus-wide event discovery and RSVP
- **Study Sessions**: Academic coordination and group study planning
- **Mobile-Optimized**: Touch-friendly scheduling and quick actions
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock calendar data
const mockEvents = [
  {
    id: 'event_1',
    title: 'CS 101 Study Session',
    description: 'Weekly study group for intro programming',
    startDate: '2024-11-15T18:00:00Z',
    endDate: '2024-11-15T20:00:00Z',
    type: 'study',
    location: 'Lockwood Library, Room 204',
    organizer: {
      name: 'Marcus Johnson',
      handle: '@mjohnson',
      avatar: 'MJ'
    },
    spaceId: 'cs101_study',
    spaceName: 'CS 101 Study Group',
    attendees: 12,
    maxAttendees: 20,
    status: 'confirmed',
    isRSVPed: true,
    tags: ['study', 'computer-science', 'exam-prep']
  },
  {
    id: 'event_2',
    title: 'Data Structures Exam',
    description: 'Midterm examination for CSE 250',
    startDate: '2024-11-16T14:00:00Z',
    endDate: '2024-11-16T15:30:00Z',
    type: 'exam',
    location: 'Davis Hall 101',
    organizer: {
      name: 'Prof. Smith',
      handle: '@prof_smith',
      avatar: 'PS'
    },
    status: 'confirmed',
    isImportant: true,
    tags: ['exam', 'computer-science', 'required']
  },
  {
    id: 'event_3',
    title: 'Floor Movie Night',
    description: 'Monthly movie night for 3rd floor residents',
    startDate: '2024-11-16T19:00:00Z',
    endDate: '2024-11-16T22:00:00Z',
    type: 'social',
    location: 'Ellicott Complex - 3rd Floor Lounge',
    organizer: {
      name: 'Sarah Chen',
      handle: '@sarahc',
      avatar: 'SC'
    },
    spaceId: 'ellicott_3rd',
    spaceName: 'Ellicott 3rd Floor',
    attendees: 8,
    maxAttendees: 15,
    status: 'confirmed',
    isRSVPed: false,
    tags: ['social', 'dorm', 'entertainment']
  }
];

const CalendarSystem = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [showConflicts, setShowConflicts] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFD700] mb-4">HIVE Calendar & Events System</h1>
          <p className="text-xl text-gray-300 mb-6">
            Complete campus scheduling with smart conflict detection and social event coordination.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge>Calendar Integration</Badge>
            <Badge>Event Management</Badge>
            <Badge>Conflict Detection</Badge>
            <Badge>Social Coordination</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-[#FFD700] flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Campus Calendar
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex bg-gray-700 rounded-lg p-1">
                      {['day', 'week', 'month'].map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setViewMode(mode as any)}
                          className={`px-3 py-1 rounded-md text-sm transition-colors ${
                            viewMode === mode
                              ? 'bg-[#FFD700] text-black'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                      ))}
                    </div>
                    <Button size="sm" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
                      <Plus className="w-4 h-4 mr-1" />
                      Add Event
                    </Button>
                  </div>
                </div>
                <p className="text-gray-400">November 2024 • UB Campus Schedule</p>
              </CardHeader>
              <CardContent>
                
                {/* Calendar Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Button size="icon" variant="outline" className="border-gray-600">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <h3 className="text-xl font-semibold text-white">
                      Week of November 11-17, 2024
                    </h3>
                    <Button size="icon" variant="outline" className="border-gray-600">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    Today
                  </Button>
                </div>

                {/* Week View Grid */}
                <div className="bg-black rounded-lg border border-gray-700 overflow-hidden">
                  
                  {/* Day Headers */}
                  <div className="grid grid-cols-8 border-b border-gray-700">
                    <div className="p-3 text-gray-500 text-sm"></div>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="p-3 text-center border-l border-gray-700">
                        <div className="text-gray-400 text-sm">{day}</div>
                        <div className={`text-lg font-semibold ${
                          index === 1 ? 'text-[#FFD700]' : 'text-white'
                        }`}>
                          {12 + index}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Time Slots */}
                  {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
                    <div key={hour} className="grid grid-cols-8 border-b border-gray-700/50">
                      <div className="p-3 text-gray-500 text-sm border-r border-gray-700">
                        {hour}:00
                      </div>
                      {Array.from({ length: 7 }).map((_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className="p-2 border-l border-gray-700/50 min-h-[60px] relative"
                        >
                          {/* Event blocks */}
                          {hour === 18 && dayIndex === 0 && (
                            <div className="absolute inset-1 bg-blue-500/20 border border-blue-500 rounded p-1">
                              <div className="text-xs text-blue-300 font-medium truncate">
                                CS Study Session
                              </div>
                            </div>
                          )}
                          {hour === 14 && dayIndex === 1 && (
                            <div className="absolute inset-1 bg-red-500/20 border border-red-500 rounded p-1">
                              <div className="text-xs text-red-300 font-medium truncate">
                                Data Structures Exam
                              </div>
                            </div>
                          )}
                          {hour === 19 && dayIndex === 1 && (
                            <div className="absolute inset-1 bg-green-500/20 border border-green-500 rounded p-1">
                              <div className="text-xs text-green-300 font-medium truncate">
                                Movie Night
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Details & Actions */}
          <div className="space-y-6">
            
            {/* Conflict Alerts */}
            <Card className="bg-red-900/20 border-red-700">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Schedule Conflicts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-red-800/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-red-300 font-medium">Overlapping Events</h4>
                      <Badge variant="destructive" className="text-xs">High</Badge>
                    </div>
                    <p className="text-red-200 text-sm mb-2">
                      Movie Night conflicts with study session end time
                    </p>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-300">
                      Resolve Conflict
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Show conflict detection</span>
                    <Switch checked={showConflicts} onCheckedChange={setShowConflicts} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-[#FFD700] flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="p-4 bg-gray-800 rounded-lg">
                      
                      {/* Event Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            event.type === 'study' ? 'bg-blue-500' :
                            event.type === 'exam' ? 'bg-red-500' :
                            'bg-green-500'
                          }`} />
                          <div>
                            <h4 className="text-white font-medium">{event.title}</h4>
                            <p className="text-gray-400 text-sm">{event.spaceName || 'Personal'}</p>
                          </div>
                        </div>
                        <MoreVertical className="w-4 h-4 text-gray-500 cursor-pointer" />
                      </div>

                      {/* Event Details */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center text-sm text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          Nov 15, 6:00 PM - 8:00 PM
                        </div>
                        <div className="flex items-center text-sm text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                        {event.attendees && (
                          <div className="flex items-center text-sm text-gray-300">
                            <Users className="w-4 h-4 mr-2" />
                            {event.attendees}/{event.maxAttendees} attending
                          </div>
                        )}
                      </div>

                      {/* Event Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {event.isRSVPed ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Button size="sm" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
                              RSVP
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="icon" variant="ghost" className="w-6 h-6">
                            <Share className="w-3 h-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="w-6 h-6">
                            <Heart className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-[#FFD700] text-black hover:bg-[#FFD700]/90 justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Study Session
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-white justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Find Campus Events
                  </Button>
                  <Button variant="outline" className="w-full border-gray-600 text-white justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Calendar Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Categories */}
        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardHeader>
            <CardTitle className="text-[#FFD700]">Event Categories</CardTitle>
            <p className="text-gray-400">Campus event types and their characteristics</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-medium mb-2">Study Sessions</h4>
                <p className="text-gray-400 text-sm">
                  Academic collaboration and exam preparation
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-medium mb-2">Exams & Classes</h4>
                <p className="text-gray-400 text-sm">
                  Required academic events and deadlines
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-medium mb-2">Social Events</h4>
                <p className="text-gray-400 text-sm">
                  Campus social activities and community building
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-medium mb-2">Organization</h4>
                <p className="text-gray-400 text-sm">
                  Club meetings and leadership activities
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
};

export const CompleteCalendarSystem: Story = {
  render: () => <CalendarSystem />,
  parameters: {
    layout: 'fullscreen'
  }
};

export const MobileCalendarView: Story = {
  render: () => (
    <div className="max-w-sm mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <CalendarSystem />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const ConflictDetectionDemo: Story = {
  render: () => <CalendarSystem />,
  parameters: {
    layout: 'fullscreen'
  }
};