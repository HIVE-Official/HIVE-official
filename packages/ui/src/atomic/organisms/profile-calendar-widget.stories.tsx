import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCalendarWidget, CalendarEvent } from './profile-calendar-widget';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof ProfileCalendarWidget> = {
  title: '03-Organisms/Profile Calendar Widget - COMPLETE DEFINITION',
  component: ProfileCalendarWidget,
  parameters: {
    docs: {
      description: {
        component: `
## 📅 HIVE Profile Calendar Widget - Complete Organism Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive personal schedule and availability widget for University at Buffalo HIVE platform student time management and campus coordination.

### 🎯 **COMPONENT EXCELLENCE**
- **5 Event Types** - Class, study, meeting, personal, deadline with distinct visual styling
- **5 Availability States** - Available, busy, in-class, studying, offline with real-time updates
- **Study Progress Tracking** - Daily study hour goals with visual progress indicators
- **Next Event Preview** - Immediate upcoming event with location and participant details
- **Schedule Overview** - Today's complete schedule with completion status tracking
- **Interactive Management** - Add events, edit existing, update availability status
- **Perfect Semantic Tokens** - 100% semantic token usage for consistent theming
- **Mobile Optimized** - Touch-friendly design with responsive event management
- **Campus Integration** - Built for University at Buffalo student academic scheduling

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform student scheduling:
- **Class Schedule Management** - CSE 331, MTH 241, PHY 207 course tracking with locations
- **Study Session Coordination** - Algorithm practice, exam prep, project work scheduling
- **Campus Event Integration** - Study groups, office hours, research meetings, club activities
- **Availability Broadcasting** - Real-time status for study partner coordination
- **Academic Goal Tracking** - Daily study hour goals with progress visualization
- **Location Awareness** - Lockwood Library, Davis Hall, Knox Hall building integration
- **Time Management** - Semester planning with deadline tracking and workload balance

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large event targets and clear availability controls
- **Quick Status Updates** - One-touch availability changes while walking between classes
- **Gesture Support** - Swipe interactions for event navigation and management
- **Responsive Layout** - Adaptive schedule display for mobile time management
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
      description: 'User profile data',
    },
    todayEvents: {
      control: 'object',
      description: 'Today\'s schedule events',
    },
    upcomingEvents: {
      control: 'object',
      description: 'Upcoming events array',
    },
    availabilityStatus: {
      control: 'select',
      options: ['available', 'busy', 'in-class', 'studying', 'offline'],
      description: 'Current availability status',
    },
    nextAvailableSlot: {
      control: 'text',
      description: 'Next available time slot',
    },
    studyHoursToday: {
      control: { type: 'range', min: 0, max: 12 },
      description: 'Study hours completed today',
    },
    studyGoal: {
      control: { type: 'range', min: 0, max: 12 },
      description: 'Daily study hour goal',
    },
    isEditable: {
      control: 'boolean',
      description: 'Enable editing controls',
    },
    onAddEvent: {
      action: 'add-event',
      description: 'Add event handler',
    },
    onViewCalendar: {
      action: 'view-calendar',
      description: 'View full calendar handler',
    },
    onEditEvent: {
      action: 'edit-event',
      description: 'Edit event handler',
    },
    onUpdateAvailability: {
      action: 'update-availability',
      description: 'Update availability handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileCalendarWidget>;

// Sample event data for stories
const sampleEvents = {
  busyStudentDay: [
    {
      id: 'cse331-lecture',
      title: 'CSE 331 Algorithm Analysis',
      type: 'class' as const,
      startTime: '09:00',
      endTime: '10:20',
      location: 'Davis Hall 101',
      isRecurring: true,
      status: 'completed' as const
    },
    {
      id: 'study-group-algo',
      title: 'Algorithm Study Group',
      type: 'study' as const,
      startTime: '14:00',
      endTime: '16:00',
      location: 'Lockwood Library Room 240',
      participants: 6,
      status: 'confirmed' as const
    },
    {
      id: 'office-hours',
      title: 'Prof. Johnson Office Hours',
      type: 'meeting' as const,
      startTime: '16:30',
      endTime: '17:00',
      location: 'Davis Hall 338',
      status: 'confirmed' as const
    },
    {
      id: 'dinner-friends',
      title: 'Dinner with Floor Friends',
      type: 'personal' as const,
      startTime: '18:00',
      endTime: '19:30',
      location: 'Ellicott Dining',
      participants: 8,
      status: 'confirmed' as const
    },
    {
      id: 'project-deadline',
      title: 'Data Structures Project Due',
      type: 'deadline' as const,
      startTime: '23:59',
      endTime: '23:59',
      status: 'confirmed' as const
    }
  ],
  lightScheduleDay: [
    {
      id: 'physics-lab',
      title: 'PHY 207 Physics Lab',
      type: 'class' as const,
      startTime: '10:00',
      endTime: '12:50',
      location: 'Fronczak Hall B6',
      status: 'confirmed' as const
    },
    {
      id: 'lunch-study',
      title: 'Calculus Review Session',
      type: 'study' as const,
      startTime: '13:30',
      endTime: '15:00',
      location: 'Mathematics Building',
      participants: 4,
      status: 'confirmed' as const
    }
  ]
};

const sampleUser = {
  id: 'sarah-chen-schedule',
  name: 'Sarah Chen',
  timezone: 'America/New_York'
};

// Default profile calendar widget showcase
export const Default: Story = {
  args: {
    user: sampleUser,
    todayEvents: sampleEvents.busyStudentDay,
    upcomingEvents: sampleEvents.lightScheduleDay,
    availabilityStatus: 'studying',
    nextAvailableSlot: '4:30 PM',
    studyHoursToday: 4.5,
    studyGoal: 6,
    isEditable: true,
    onAddEvent: action('add-event-clicked'),
    onViewCalendar: action('view-calendar-clicked'),
    onEditEvent: action('edit-event-clicked'),
    onUpdateAvailability: action('availability-updated'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)] max-w-md">
      <Text variant="body-md" color="primary" className="mb-4">
        HIVE profile calendar widget for University at Buffalo student scheduling:
      </Text>
      <ProfileCalendarWidget {...args} />
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Availability States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🎯 AVAILABILITY STATES</Badge>
            Real-Time Student Status
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 availability states for University at Buffalo HIVE platform student status and study coordination
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Student Status Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Available for Study:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={sampleEvents.lightScheduleDay}
                      availabilityStatus="available"
                      nextAvailableSlot="Now"
                      studyHoursToday={2}
                      studyGoal={6}
                      isEditable={true}
                      onAddEvent={action('available-add')}
                      onViewCalendar={action('available-view')}
                      onEditEvent={action('available-edit')}
                      onUpdateAvailability={action('available-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Open for study sessions, group work, and academic collaboration
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Currently Studying:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={sampleEvents.busyStudentDay.slice(1, 3)}
                      availabilityStatus="studying"
                      nextAvailableSlot="6:00 PM"
                      studyHoursToday={4.5}
                      studyGoal={6}
                      isEditable={true}
                      onAddEvent={action('studying-add')}
                      onViewCalendar={action('studying-view')}
                      onEditEvent={action('studying-edit')}
                      onUpdateAvailability={action('studying-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      In focused study session, prefer minimal interruptions
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">In Class:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={[sampleEvents.busyStudentDay[0], sampleEvents.busyStudentDay[2]]}
                      availabilityStatus="in-class"
                      nextAvailableSlot="2:00 PM"
                      studyHoursToday={1.5}
                      studyGoal={6}
                      isEditable={true}
                      onAddEvent={action('class-add')}
                      onViewCalendar={action('class-view')}
                      onEditEvent={action('class-edit')}
                      onUpdateAvailability={action('class-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Currently in lecture, lab, or academic session
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Busy:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={sampleEvents.busyStudentDay}
                      availabilityStatus="busy"
                      nextAvailableSlot="Tomorrow 9:00 AM"
                      studyHoursToday={6}
                      studyGoal={6}
                      isEditable={true}
                      onAddEvent={action('busy-add')}
                      onViewCalendar={action('busy-view')}
                      onEditEvent={action('busy-edit')}
                      onUpdateAvailability={action('busy-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Packed schedule with classes, meetings, and commitments
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Offline:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={[]}
                      availabilityStatus="offline"
                      studyHoursToday={0}
                      studyGoal={6}
                      isEditable={true}
                      onAddEvent={action('offline-add')}
                      onViewCalendar={action('offline-view')}
                      onEditEvent={action('offline-edit')}
                      onUpdateAvailability={action('offline-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Not currently available for coordination or communication
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Event Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📚 EVENT TYPES</Badge>
            Calendar Event Categories
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 event types for comprehensive University at Buffalo student schedule management
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Academic & Personal Events:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Class Schedule:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={[
                        {
                          id: 'cse331-algo',
                          title: 'CSE 331 Algorithm Analysis',
                          type: 'class',
                          startTime: '09:00',
                          endTime: '10:20',
                          location: 'Davis Hall 101',
                          status: 'confirmed'
                        },
                        {
                          id: 'math241-calc',
                          title: 'MTH 241 Calculus III',
                          type: 'class',
                          startTime: '11:30',
                          endTime: '12:50',
                          location: 'Mathematics Building',
                          status: 'confirmed'
                        }
                      ]}
                      availabilityStatus="in-class"
                      nextAvailableSlot="1:00 PM"
                      studyHoursToday={2}
                      studyGoal={5}
                      isEditable={true}
                      onAddEvent={action('class-schedule-add')}
                      onViewCalendar={action('class-schedule-view')}
                      onEditEvent={action('class-schedule-edit')}
                      onUpdateAvailability={action('class-schedule-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Academic classes with building locations and recurring schedule
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Study Sessions:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={[
                        {
                          id: 'algo-practice',
                          title: 'Algorithm Practice Problems',
                          type: 'study',
                          startTime: '14:00',
                          endTime: '16:00',
                          location: 'Lockwood Library Room 240',
                          participants: 5,
                          status: 'confirmed'
                        },
                        {
                          id: 'exam-prep',
                          title: 'Midterm Exam Preparation',
                          type: 'study',
                          startTime: '19:00',
                          endTime: '21:00',
                          location: 'Ellicott Study Lounge',
                          status: 'confirmed'
                        }
                      ]}
                      availabilityStatus="studying"
                      nextAvailableSlot="4:30 PM"
                      studyHoursToday={4}
                      studyGoal={6}
                      isEditable={true}
                      onAddEvent={action('study-sessions-add')}
                      onViewCalendar={action('study-sessions-view')}
                      onEditEvent={action('study-sessions-edit')}
                      onUpdateAvailability={action('study-sessions-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Group and individual study sessions with participant tracking
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Meetings & Office Hours:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={[
                        {
                          id: 'prof-office-hours',
                          title: 'Prof. Johnson Office Hours',
                          type: 'meeting',
                          startTime: '15:30',
                          endTime: '16:00',
                          location: 'Davis Hall 338',
                          status: 'confirmed'
                        },
                        {
                          id: 'research-meeting',
                          title: 'AI Lab Research Meeting',
                          type: 'meeting',
                          startTime: '17:00',
                          endTime: '18:00',
                          location: 'Capen Hall 213',
                          participants: 12,
                          status: 'tentative'
                        }
                      ]}
                      availabilityStatus="busy"
                      nextAvailableSlot="6:30 PM"
                      studyHoursToday={3}
                      studyGoal={6}
                      isEditable={true}
                      onAddEvent={action('meetings-add')}
                      onViewCalendar={action('meetings-view')}
                      onEditEvent={action('meetings-edit')}
                      onUpdateAvailability={action('meetings-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Academic meetings, office hours, and research collaboration
                    </Text>
                  </div>

                  <div className="space-y-4">
                    <Text variant="body-sm" color="gold" weight="medium">Deadlines & Personal:</Text>
                    <ProfileCalendarWidget
                      user={sampleUser}
                      todayEvents={[
                        {
                          id: 'project-due',
                          title: 'Data Structures Project Due',
                          type: 'deadline',
                          startTime: '23:59',
                          endTime: '23:59',
                          status: 'confirmed'
                        },
                        {
                          id: 'dinner-plans',
                          title: 'Dinner with Roommates',
                          type: 'personal',
                          startTime: '18:30',
                          endTime: '20:00',
                          location: 'Student Union Food Court',
                          participants: 4,
                          status: 'confirmed'
                        }
                      ]}
                      availabilityStatus="available"
                      nextAvailableSlot="Now"
                      studyHoursToday={5.5}
                      studyGoal={6}
                      isEditable={true}
                      onAddEvent={action('deadlines-add')}
                      onViewCalendar={action('deadlines-view')}
                      onEditEvent={action('deadlines-edit')}
                      onUpdateAvailability={action('deadlines-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Assignment deadlines and personal social commitments
                    </Text>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Schedule Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Profile calendar widget usage in actual University at Buffalo student scheduling and campus coordination contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* CS Student Full Schedule */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Computer Science Junior - Heavy Course Load:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Sarah Chen - Tuesday Schedule (Peak Academic Day)
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Morning Classes:</Text>
                    <ProfileCalendarWidget
                      user={{
                        id: 'sarah-cs-morning',
                        name: 'Sarah Chen',
                        timezone: 'America/New_York'
          }}
                      todayEvents={[
                        {
                          id: 'cse331-morning',
                          title: 'CSE 331 Algorithm Analysis',
                          type: 'class',
                          startTime: '09:00',
                          endTime: '10:20',
                          location: 'Davis Hall 101',
                          isRecurring: true,
                          status: 'completed'
                        },
                        {
                          id: 'mth241-morning',
                          title: 'MTH 241 Calculus III',
                          type: 'class',
                          startTime: '11:30',
                          endTime: '12:50',
                          location: 'Mathematics Building 122',
                          isRecurring: true,
                          status: 'confirmed'
                        }
                      ]}
                      availabilityStatus="in-class"
                      nextAvailableSlot="1:00 PM"
                      studyHoursToday={1.5}
                      studyGoal={7}
                      isEditable={true}
                      onAddEvent={action('cs-morning-add')}
                      onViewCalendar={action('cs-morning-view')}
                      onEditEvent={action('cs-morning-edit')}
                      onUpdateAvailability={action('cs-morning-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Back-to-back morning classes in Davis Hall and Mathematics Building
                    </Text>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Afternoon Coordination:</Text>
                    <ProfileCalendarWidget
                      user={{
                        id: 'sarah-cs-afternoon',
                        name: 'Sarah Chen',
                        timezone: 'America/New_York'
          }}
                      todayEvents={[
                        {
                          id: 'lunch-study-group',
                          title: 'Algorithm Study Group',
                          type: 'study',
                          startTime: '13:00',
                          endTime: '15:00',
                          location: 'Lockwood Library Room 240',
                          participants: 6,
                          status: 'confirmed'
                        },
                        {
                          id: 'ta-office-hours',
                          title: 'TA Office Hours - Help Students',
                          type: 'meeting',
                          startTime: '15:30',
                          endTime: '17:00',
                          location: 'Davis Hall TA Room',
                          participants: 8,
                          status: 'confirmed'
                        },
                        {
                          id: 'research-lab',
                          title: 'AI Research Lab Meeting',
                          type: 'meeting',
                          startTime: '17:30',
                          endTime: '19:00',
                          location: 'Capen Hall 213',
                          participants: 15,
                          status: 'confirmed'
                        }
                      ]}
                      availabilityStatus="studying"
                      nextAvailableSlot="7:30 PM"
                      studyHoursToday={4.5}
                      studyGoal={7}
                      isEditable={true}
                      onAddEvent={action('cs-afternoon-add')}
                      onViewCalendar={action('cs-afternoon-view')}
                      onEditEvent={action('cs-afternoon-edit')}
                      onUpdateAvailability={action('cs-afternoon-update')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Study coordination, teaching assistance, and research participation
                    </Text>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Pre-Med Student Schedule */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Pre-Med Student - Research & Clinical Focus:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Lab & Research Schedule:</Text>
                  <ProfileCalendarWidget
                    user={{
                      id: 'jamie-premed',
                      name: 'Jamie Park',
                      timezone: 'America/New_York'
          }}
                    todayEvents={[
                      {
                        id: 'organic-chem-lab',
                        title: 'CHE 201 Organic Chemistry Lab',
                        type: 'class',
                        startTime: '10:00',
                        endTime: '13:00',
                        location: 'Chemistry Building B40',
                        status: 'confirmed'
                      },
                      {
                        id: 'research-hospital',
                        title: 'Clinical Research at ECMC',
                        type: 'meeting',
                        startTime: '14:30',
                        endTime: '17:30',
                        location: 'Erie County Medical Center',
                        participants: 4,
                        status: 'confirmed'
                      }
                    ]}
                    availabilityStatus="busy"
                    nextAvailableSlot="Tomorrow 9:00 AM"
                    studyHoursToday={6}
                    studyGoal={8}
                    isEditable={true}
                    onAddEvent={action('premed-research-add')}
                    onViewCalendar={action('premed-research-view')}
                    onEditEvent={action('premed-research-edit')}
                    onUpdateAvailability={action('premed-research-update')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Laboratory work and clinical research experience for medical school preparation
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">MCAT Preparation:</Text>
                  <ProfileCalendarWidget
                    user={{
                      id: 'jamie-mcat-prep',
                      name: 'Jamie Park',
                      timezone: 'America/New_York'
          }}
                    todayEvents={[
                      {
                        id: 'mcat-study-session',
                        title: 'MCAT Physics Practice',
                        type: 'study',
                        startTime: '08:00',
                        endTime: '10:00',
                        location: 'Health Sciences Library',
                        status: 'completed'
                      },
                      {
                        id: 'mcat-group-review',
                        title: 'MCAT Study Group',
                        type: 'study',
                        startTime: '19:00',
                        endTime: '21:00',
                        location: 'Abbott Hall Study Room',
                        participants: 8,
                        status: 'confirmed'
                      },
                      {
                        id: 'mcat-practice-test',
                        title: 'MCAT Practice Test Deadline',
                        type: 'deadline',
                        startTime: '23:59',
                        endTime: '23:59',
                        status: 'confirmed'
                      }
                    ]}
                    availabilityStatus="studying"
                    nextAvailableSlot="5:00 PM"
                    studyHoursToday={8}
                    studyGoal={9}
                    isEditable={true}
                    onAddEvent={action('mcat-prep-add')}
                    onViewCalendar={action('mcat-prep-view')}
                    onEditEvent={action('mcat-prep-edit')}
                    onUpdateAvailability={action('mcat-prep-update')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Intensive MCAT preparation with group study and practice test coordination
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Engineering Student Project Schedule */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Engineering Student - Senior Design Project:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Project Coordination:</Text>
                  <ProfileCalendarWidget
                    user={{
                      id: 'alex-engineering',
                      name: 'Alex Rivera',
                      timezone: 'America/New_York'
          }}
                    todayEvents={[
                      {
                        id: 'senior-design-meeting',
                        title: 'Senior Design Team Meeting',
                        type: 'meeting',
                        startTime: '11:00',
                        endTime: '12:30',
                        location: 'Furnas Hall Maker Space',
                        participants: 5,
                        status: 'confirmed'
                      },
                      {
                        id: 'prototype-testing',
                        title: 'Autonomous Drone Testing',
                        type: 'study',
                        startTime: '14:00',
                        endTime: '17:00',
                        location: 'Baird Point Testing Field',
                        participants: 3,
                        status: 'confirmed'
                      },
                      {
                        id: 'sponsor-presentation',
                        title: 'Industry Sponsor Presentation',
                        type: 'meeting',
                        startTime: '18:00',
                        endTime: '19:00',
                        location: 'Zoom/Davis Hall 101',
                        participants: 8,
                        status: 'tentative'
                      }
                    ]}
                    availabilityStatus="busy"
                    nextAvailableSlot="Tomorrow 10:00 AM"
                    studyHoursToday={5.5}
                    studyGoal={6}
                    isEditable={true}
                    onAddEvent={action('engineering-project-add')}
                    onViewCalendar={action('engineering-project-view')}
                    onEditEvent={action('engineering-project-edit')}
                    onUpdateAvailability={action('engineering-project-update')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Senior design project with team coordination, testing, and industry presentations
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Leadership & Mentoring:</Text>
                  <ProfileCalendarWidget
                    user={{
                      id: 'alex-leadership',
                      name: 'Alex Rivera',
                      timezone: 'America/New_York'
          }}
                    todayEvents={[
                      {
                        id: 'robotics-club-meeting',
                        title: 'Robotics Club Leadership Meeting',
                        type: 'meeting',
                        startTime: '16:00',
                        endTime: '17:30',
                        location: 'Student Union 403',
                        participants: 12,
                        status: 'confirmed'
                      },
                      {
                        id: 'freshman-mentoring',
                        title: 'EE Freshman Mentoring Session',
                        type: 'meeting',
                        startTime: '19:00',
                        endTime: '20:30',
                        location: 'Bonner Hall Lounge',
                        participants: 8,
                        status: 'confirmed'
                      }
                    ]}
                    availabilityStatus="available"
                    nextAvailableSlot="2:00 PM"
                    studyHoursToday={3}
                    studyGoal={5}
                    isEditable={true}
                    onAddEvent={action('leadership-mentoring-add')}
                    onViewCalendar={action('leadership-mentoring-view')}
                    onEditEvent={action('leadership-mentoring-edit')}
                    onUpdateAvailability={action('leadership-mentoring-update')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Student organization leadership and peer mentoring responsibilities
                  </Text>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Schedule Management */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Schedule Management:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized calendar widget for on-campus schedule management:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Status Updates:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Touch-Friendly Calendar Management</Text>
                    <Text variant="body-xs" color="secondary">
                      One-touch availability updates while walking between Davis Hall and Lockwood Library
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Quick event additions during spontaneous study group formations
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Real-time schedule sharing for immediate study partner coordination
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Study progress tracking with visual goal achievement feedback
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus-Aware Scheduling:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <Text variant="body-sm" weight="medium" color="primary">Location-Integrated Time Management</Text>
                    <Text variant="body-xs" color="secondary">
                      Building-aware event creation with automatic location suggestions
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Transit time calculations between North Campus and South Campus
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Study space availability integration with Lockwood Library booking
                    </Text>
                    <Text variant="body-xs" color="secondary">
                      Weather-aware outdoor event suggestions and location alternatives
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    user: sampleUser,
    todayEvents: sampleEvents.busyStudentDay,
    upcomingEvents: sampleEvents.lightScheduleDay,
    availabilityStatus: 'available',
    nextAvailableSlot: '2:00 PM',
    studyHoursToday: 3.5,
    studyGoal: 6,
    isEditable: true,
    onAddEvent: action('playground-add-event'),
    onViewCalendar: action('playground-view-calendar'),
    onEditEvent: action('playground-edit-event'),
    onUpdateAvailability: action('playground-update-availability'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Profile Calendar Widget Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different calendar widget configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-w-md">
            <ProfileCalendarWidget {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive calendar widget testing for University at Buffalo HIVE platform student scheduling
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};