"use client";

import { useState } from "react";
import { PageContainer, Button, Card } from "@hive/ui";
import { Calendar, Plus, ChevronLeft as _ChevronLeft, ChevronRight as _ChevronRight, Clock, MapPin, Users, Video, Bell, Filter as _Filter, Search, ExternalLink } from "lucide-react";

// Mock events data - in production this would come from API
const mockEvents = [
  {
    id: '1',
    title: 'CS Study Session',
    description: 'Data structures and algorithms review',
    date: '2024-01-15',
    time: '3:00 PM',
    duration: '2 hours',
    location: 'Library Room 301',
    type: 'study',
    attendees: 12,
    space: 'CS Study Group',
    isVirtual: false,
    status: 'confirmed'
  },
  {
    id: '2',
    title: 'Design Workshop',
    description: 'UI/UX design principles and prototyping',
    date: '2024-01-16',
    time: '2:00 PM',
    duration: '3 hours',
    location: 'Zoom Meeting',
    type: 'workshop',
    attendees: 25,
    space: 'Design Club',
    isVirtual: true,
    status: 'confirmed'
  },
  {
    id: '3',
    title: 'Startup Pitch Night',
    description: 'Present your startup ideas to the community',
    date: '2024-01-18',
    time: '6:00 PM',
    duration: '2.5 hours',
    location: 'Student Center Auditorium',
    type: 'event',
    attendees: 85,
    space: 'Entrepreneur Society',
    isVirtual: false,
    status: 'confirmed'
  },
  {
    id: '4',
    title: 'Office Hours',
    description: 'Get help with your HIVE projects',
    date: '2024-01-17',
    time: '11:00 AM',
    duration: '1 hour',
    location: 'HIVE Lab',
    type: 'office-hours',
    attendees: 8,
    space: 'HIVE Team',
    isVirtual: false,
    status: 'confirmed'
  }
];

export default function CalendarPage() {
  const [view, setView] = useState<'month' | 'week' | 'day' | 'list'>('list');
  const [_selectedDate, _setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState<'all' | 'study' | 'workshop' | 'event' | 'office-hours'>('all');

  const filteredEvents = filter === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.type === filter);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'study': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'workshop': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'event': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'office-hours': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return Clock;
      case 'workshop': return Users;
      case 'event': return Calendar;
      case 'office-hours': return Bell;
      default: return Calendar;
    }
  };

  return (
    <PageContainer
      title="Calendar"
      subtitle="Stay organized with your events and activities"
      breadcrumbs={[
        { label: "Calendar", icon: Calendar }
      ]}
      actions={
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
            onClick={() => window.location.href = '/calendar/create'}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
          <Button className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]">
            <Calendar className="h-4 w-4 mr-2" />
            Sync Calendar
          </Button>
        </div>
      }
      maxWidth="xl"
    >
      {/* Calendar Header */}
      <div className="mb-8">
        <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Your Schedule</h2>
              <p className="text-[#A1A1AA]">
                {filteredEvents.length} events {filter !== 'all' && `in ${filter}`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Filter Dropdown */}
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                >
                  <option value="all">All Events</option>
                  <option value="study">Study Sessions</option>
                  <option value="workshop">Workshops</option>
                  <option value="event">Events</option>
                  <option value="office-hours">Office Hours</option>
                </select>
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-[rgba(255,255,255,0.05)] rounded-lg p-1">
                {(['list', 'month', 'week'] as const).map((viewType) => (
                  <button
                    key={viewType}
                    onClick={() => setView(viewType)}
                    className={`px-3 py-2 text-sm rounded-md transition-all capitalize ${
                      view === viewType
                        ? 'bg-[#FFD700] text-[#0A0A0A] font-medium'
                        : 'text-[#A1A1AA] hover:text-white hover:bg-[rgba(255,255,255,0.1)]'
                    }`}
                  >
                    {viewType}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.06)]">
              <div className="text-2xl font-bold text-white">{mockEvents.length}</div>
              <div className="text-sm text-[#A1A1AA]">Total Events</div>
            </div>
            <div className="text-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.06)]">
              <div className="text-2xl font-bold text-white">3</div>
              <div className="text-sm text-[#A1A1AA]">This Week</div>
            </div>
            <div className="text-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.06)]">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-[#A1A1AA]">Attending</div>
            </div>
            <div className="text-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.06)]">
              <div className="text-2xl font-bold text-white">2</div>
              <div className="text-sm text-[#A1A1AA]">Hosting</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Events
          </Button>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event) => {
            const EventIcon = getEventTypeIcon(event.type);
            return (
              <Card 
                key={event.id}
                className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-all cursor-pointer group"
                onClick={() => window.location.href = `/calendar/events/${event.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-[rgba(255,255,255,0.1)] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                      <EventIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-white group-hover:text-[#FFD700] transition-colors">
                          {event.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs border ${getEventTypeColor(event.type)}`}>
                          {event.type.replace('-', ' ')}
                        </span>
                        {event.isVirtual && (
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            Virtual
                          </span>
                        )}
                      </div>
                      <p className="text-[#A1A1AA] mb-4">{event.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center text-[#A1A1AA]">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-[#A1A1AA]">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.time} ({event.duration})
                        </div>
                        <div className="flex items-center text-[#A1A1AA]">
                          {event.isVirtual ? <Video className="h-4 w-4 mr-2" /> : <MapPin className="h-4 w-4 mr-2" />}
                          {event.location}
                        </div>
                        <div className="flex items-center text-[#A1A1AA]">
                          <Users className="h-4 w-4 mr-2" />
                          {event.attendees} attending
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-[#A1A1AA]">
                          from <span className="text-white">{event.space}</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle RSVP
                            }}
                          >
                            RSVP
                          </Button>
                          {event.isVirtual && (
                            <Button
                              size="sm"
                              className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle join virtual event
                              }}
                            >
                              <Video className="h-4 w-4 mr-2" />
                              Join
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <Card className="p-8 text-center bg-gradient-to-r from-[rgba(255,215,0,0.1)] to-[rgba(255,215,0,0.05)] border-[rgba(255,215,0,0.2)]">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Connected</h2>
          <p className="text-[#A1A1AA] mb-6 max-w-md mx-auto">
            Sync your HIVE calendar with your preferred calendar app to never miss an event.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
              onClick={() => {
                // Handle Google Calendar sync
                window.open('https://calendar.google.com', '_blank');
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Sync with Google Calendar
            </Button>
            <Button 
              variant="outline" 
              className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
              onClick={() => {
                // Handle Outlook sync
                window.open('https://outlook.live.com/calendar', '_blank');
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Sync with Outlook
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}