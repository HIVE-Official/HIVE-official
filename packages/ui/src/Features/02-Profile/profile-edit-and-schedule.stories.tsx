import type { Meta, StoryObj } from '@storybook/react';
import { ProfileEditSheet } from '../../atomic/organisms/profile-edit-sheet';
import { ProfileScheduleWidget } from '../../atomic/organisms/profile-schedule-widget';
import { ProfileHeader } from '../../atomic/organisms/profile-header';
import { Card } from '../../atomic/atoms/card';

const meta = {
  title: '02-Profile/Edit & Schedule',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock profile data
const mockProfile = {
  fullName: 'Sarah Chen',
  bio: 'CS major passionate about AI/ML and building tools that make campus life easier. Always down for coffee chats!',
  major: 'Computer Science',
  academicYear: 'Junior' as const,
  graduationYear: 2026,
  pronouns: 'she/her',
  photos: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
  ],
  interests: ['AI/ML', 'Web Development', 'Coffee', 'Hiking'],
};

// Mock schedule events
const mockScheduleEvents = [
  {
    id: '1',
    title: 'CSE 442 - Software Engineering',
    type: 'class' as const,
    startTime: '9:00 AM',
    endTime: '10:50 AM',
    location: 'Davis Hall 101',
    instructor: 'Prof. Johnson',
    color: 'blue' as const,
  },
  {
    id: '2',
    title: 'CS Club Meeting',
    type: 'event' as const,
    startTime: '12:00 PM',
    endTime: '1:00 PM',
    location: 'Student Union 2nd Floor',
    spaceName: 'CS Club',
    rsvpStatus: 'going' as const,
  },
  {
    id: '3',
    title: 'Office Hours - Prof. Smith',
    type: 'office-hours' as const,
    startTime: '2:00 PM',
    endTime: '3:00 PM',
    location: 'Davis Hall 301',
    instructor: 'Prof. Smith',
  },
  {
    id: '4',
    title: 'UB Hackathon Kickoff',
    type: 'event' as const,
    startTime: '6:00 PM',
    endTime: '8:00 PM',
    location: 'Capen Hall Auditorium',
    spaceName: 'UB Hackathon 2025',
    rsvpStatus: null,
  },
];

// Profile Edit Sheet Stories
export const InlineProfileEdit: Story = {
  render: () => (
    <div className="max-w-4xl">
      <Card className="p-6">
        <ProfileHeader
          name={mockProfile.fullName}
          handle="sarachen"
          avatarUrl={mockProfile.photos[0]}
          photos={mockProfile.photos}
          bio={mockProfile.bio}
          major={mockProfile.major}
          academicYear={mockProfile.academicYear}
          graduationYear={mockProfile.graduationYear}
          pronouns={mockProfile.pronouns}
          verified={true}
          isOwnProfile={true}
          badges={[
            { label: 'Space Leader', variant: 'default' },
            { label: 'Active Now', variant: 'secondary' },
          ]}
        />

        <div className="mt-6 flex gap-3">
          <ProfileEditSheet
            profile={mockProfile}
            onSave={async (data) => {
              console.log('Saving profile:', data);
              await new Promise(resolve => setTimeout(resolve, 1000));
              alert('Profile saved!');
            }}
            onUploadPhoto={async (file) => {
              console.log('Uploading photo:', file.name);
              await new Promise(resolve => setTimeout(resolve, 1000));
              return `https://images.unsplash.com/photo-${Date.now()}?w=400&h=600&fit=crop`;
            }}
            onRemovePhoto={(photoUrl) => {
              console.log('Removing photo:', photoUrl);
            }}
          />
        </div>
      </Card>
    </div>
  ),
};

// Schedule Widget Stories
export const TodayScheduleFull: Story = {
  render: () => (
    <div className="max-w-md">
      <ProfileScheduleWidget
        events={mockScheduleEvents}
        onEventClick={(id) => console.log('Event clicked:', id)}
        onRsvp={(id) => console.log('RSVP:', id)}
        onViewFullCalendar={() => console.log('View full calendar')}
        onImportClasses={() => console.log('Import classes')}
      />
    </div>
  ),
};

export const UpcomingEventsOnly: Story = {
  render: () => (
    <div className="max-w-md">
      <ProfileScheduleWidget
        events={mockScheduleEvents}
        showOnlyUpcoming={true}
        onEventClick={(id) => console.log('Event clicked:', id)}
        onRsvp={(id) => console.log('RSVP:', id)}
        onViewFullCalendar={() => console.log('View full calendar')}
      />
    </div>
  ),
};

export const EmptySchedule: Story = {
  render: () => (
    <div className="max-w-md">
      <ProfileScheduleWidget
        events={[]}
        onImportClasses={() => alert('Import your class schedule from UB HUB!')}
        onViewFullCalendar={() => console.log('View full calendar')}
      />
    </div>
  ),
};

export const ClassesOnly: Story = {
  render: () => (
    <div className="max-w-md">
      <ProfileScheduleWidget
        events={mockScheduleEvents.filter(e => e.type === 'class')}
        onEventClick={(id) => console.log('Event clicked:', id)}
        onViewFullCalendar={() => console.log('View full calendar')}
        onImportClasses={() => console.log('Import more classes')}
      />
    </div>
  ),
};

export const EventsOnly: Story = {
  render: () => (
    <div className="max-w-md">
      <ProfileScheduleWidget
        events={mockScheduleEvents.filter(e => e.type === 'event')}
        onEventClick={(id) => console.log('Event clicked:', id)}
        onRsvp={(id) => {
          alert(`RSVP'd to event ${id}!`);
        }}
        onViewFullCalendar={() => console.log('View full calendar')}
      />
    </div>
  ),
};

// Combined Story: Complete Profile with Edit + Schedule
export const CompleteProfileWithSchedule: Story = {
  render: () => (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        {/* Left: Portrait */}
        <div>
          <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl border-4 border-border">
            <img
              src={mockProfile.photos[0]}
              alt={mockProfile.fullName}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-6">
          {/* Header with Edit Button */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{mockProfile.fullName}</h1>
                <p className="text-muted-foreground mt-1">@sarachen • {mockProfile.pronouns}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">{mockProfile.major}</span>
                  <span className="text-muted-foreground">
                    {' '}• {mockProfile.academicYear} • Class of {mockProfile.graduationYear}
                  </span>
                </p>
                <p className="text-muted-foreground mt-3">{mockProfile.bio}</p>
              </div>

              <ProfileEditSheet
                profile={mockProfile}
                onSave={async (data) => {
                  console.log('Saving:', data);
                  await new Promise(resolve => setTimeout(resolve, 1000));
                  alert('Profile updated!');
                }}
              />
            </div>
          </Card>

          {/* Schedule Widget (Prominent) */}
          <ProfileScheduleWidget
            events={mockScheduleEvents}
            onEventClick={(id) => console.log('Event clicked:', id)}
            onRsvp={(id) => alert(`RSVP'd to event ${id}!`)}
            onViewFullCalendar={() => alert('Opening full calendar...')}
            onImportClasses={() => alert('Import schedule from UB HUB!')}
          />

          {/* Other widgets would go here */}
        </div>
      </div>
    </div>
  ),
};
