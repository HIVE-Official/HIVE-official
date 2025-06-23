import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from './enhanced-cards';

const meta: Meta = {
  title: 'UI/Event Card',
  component: EventCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Enhanced event card with proper transitions, RSVP functionality, and comprehensive event details. Features 220ms content transitions and hover states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data with reliable SVG placeholders
const sampleEvent = {
  id: '1',
  title: 'Hackathon Kickoff: Build for Good',
  description: 'Join us for an exciting 48-hour hackathon focused on creating technology solutions for social impact. Teams of 4, amazing prizes, and industry mentors!',
  startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
  endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
  location: 'Davis Hall, Room 101',
  imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMzNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImV2ZW50R3JhZCIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojRkZENzAwO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGOEM4QztzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2V2ZW50R3JhZCkiLz48cmVjdCB4PSIxMDAiIHk9IjEwMCIgd2lkdGg9IjQwMCIgaGVpZ2h0PSIxMzciIiBmaWxsPSIjMEEwQTBBIiBvcGFjaXR5PSIwLjEiIHJ4PSI4Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMwQTBBMEEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5IYWNrYXRob248L3RleHQ+PC9zdmc+',
  attendeeCount: 45,
  maxAttendees: 100,
  isAttending: false,
  host: {
    name: 'Tech Society',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiNGRkQ3MDAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1zaXplPSIxNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzBBMEEwQSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFVPC90ZXh0Pjwvc3ZnPg==',
  },
  space: {
    name: 'Tech Events',
    color: '#FFD700',
  },
};

export const Default: Story = {
  args: {
    variant: 'event',
    event: sampleEvent,
    hoverable: true,
  },
};

export const LiveEvent: Story = {
  args: {
    variant: 'event',
    event: {
      ...sampleEvent,
      title: 'Live: Office Hours with Prof. Smith',
      description: 'Drop-in office hours for Computer Science students. Ask questions about coursework, research opportunities, or career advice.',
      startTime: new Date(Date.now() - 30 * 60 * 1000), // Started 30 min ago
      endTime: new Date(Date.now() + 30 * 60 * 1000), // Ends in 30 min
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMzNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImxpdmVHcmFkIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZjAwMDA7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojY2MwMDAwO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbGl2ZUdyYWQpIi8+PGNpcmNsZSBjeD0iMzAwIiBjeT0iMTY4IiByPSI0MCIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4zIiBjbGFzcz0iYW5pbWF0ZS1waW5nIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5MSVZFPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5PZmZpY2UgSG91cnM8L3RleHQ+PC9zdmc+',
      attendeeCount: 12,
      maxAttendees: 20,
    },
    hoverable: true,
  },
};

export const AttendingEvent: Story = {
  args: {
    variant: 'event',
    event: {
      ...sampleEvent,
      isAttending: true,
      attendeeCount: 46,
    },
    hoverable: true,
  },
};

export const FullEvent: Story = {
  args: {
    variant: 'event',
    event: {
      ...sampleEvent,
      title: 'Advanced React Workshop',
      attendeeCount: 100,
      maxAttendees: 100,
      imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMzNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9IndvcmtzaG9wR3JhZCIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNDI4NWY0O3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzNjZjYztzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3dvcmtzaG9wR3JhZCkiLz48cG9seWdvbiBwb2ludHM9IjMwMCwxMDAgMzUwLDE1MCAzMDAsMjAwIDI1MCwxNTAiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuMjUiLz48dGV4dCB4PSI1MCUiIHk9IjQwJSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlJlYWN0PC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNjAlIiBmb250LXNpemU9IjE4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Xb3Jrc2hvcDwvdGV4dD48L3N2Zz4=',
    },
    hoverable: true,
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid gap-6 max-w-4xl">
      <div className="grid md:grid-cols-2 gap-6">
        <EventCard
          variant="event"
          event={sampleEvent}
          hoverable={true}
        />
        <EventCard
          variant="event"
          event={{
            ...sampleEvent,
            title: 'Live: Office Hours',
            startTime: new Date(Date.now() - 30 * 60 * 1000),
            endTime: new Date(Date.now() + 30 * 60 * 1000),
            attendeeCount: 12,
            maxAttendees: 20,
            imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMzNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImxpdmVHcmFkMiIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmYwMDAwO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6I2NjMDAwMDtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2xpdmVHcmFkMikiLz48dGV4dCB4PSI1MCUiIHk9IjQ1JSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxJVkU8L3RleHQ+PC9zdmc+',
          }}
          hoverable={true}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <EventCard
          variant="event"
          event={{
            ...sampleEvent,
            title: 'Study Group: Algorithms',
            isAttending: true,
            attendeeCount: 8,
            maxAttendees: 12,
            imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMzNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InN0dWR5R3JhZCIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTBiOTgxO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzA1OWY2Mjtic3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzdHVkeUdyYWQpIi8+PHJlY3QgeD0iMjAwIiB5PSIxMjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZGRkZGIiBvcGFjaXR5PSIwLjIiIHJ4PSI4Ii8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TdHVkeSBHcm91cDwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1zaXplPSIxNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWxnb3JpdGhtczwvdGV4dD48L3N2Zz4=',
          }}
          hoverable={true}
        />
        <EventCard
          variant="event"
          event={{
            ...sampleEvent,
            title: 'Career Fair 2024',
            attendeeCount: 100,
            maxAttendees: 100,
            imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMzNyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNhcmVlckdyYWQiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6Izc5MzVmMDtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM1NzIxYzQ7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNjYXJlZXJHcmFkKSIvPjxyZWN0IHg9IjE1MCIgeT0iMTEwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI0ZGRkZGRiIgb3BhY2l0eT0iMC4xNSIgcng9IjEyIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5DYXJlZXIgRmFpcjwvdGV4dD48dGV4dCB4PSI1MCUiIHk9IjYwJSIgZm9udC1zaXplPSIxOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmaWxsPSIjRkZGRkZGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+MjAyNDwvdGV4dD48L3N2Zz4=',
          }}
          hoverable={true}
        />
      </div>
    </div>
  ),
}; 