"use client";

import { PageContainer, Button, Card } from '@hive/ui';
import { Calendar, Plus, MapPin, Clock, Users, ExternalLink, Filter } from 'lucide-react';

export default function EventsPage() {
  return (
    <PageContainer
      title="Events"
      subtitle="Discover and create events in your community"
      breadcrumbs={[
        { label: "Events", icon: Calendar }
      ]}
      actions={
        <Button className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      }
      maxWidth="xl"
    >
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A1A1AA]" />
            <select className="w-full pl-10 pr-4 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.12)] rounded-lg text-white text-sm">
              <option>All Events</option>
              <option>Study Groups</option>
              <option>Workshops</option>
              <option>Social</option>
              <option>Career</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="border-[rgba(255,255,255,0.2)] text-white">
            Today
          </Button>
          <Button variant="outline" size="sm" className="border-[rgba(255,255,255,0.2)] text-white">
            This Week
          </Button>
          <Button variant="outline" size="sm" className="border-[rgba(255,255,255,0.2)] text-white">
            This Month
          </Button>
        </div>
      </div>

      {/* Featured Event */}
      <Card className="p-8 bg-gradient-to-r from-[rgba(255,215,0,0.1)] to-[rgba(255,215,0,0.05)] border-[rgba(255,215,0,0.2)] mb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-2 py-1 bg-[#FFD700] text-[#0A0A0A] text-xs font-medium rounded">Featured</span>
              <span className="px-2 py-1 bg-[rgba(255,255,255,0.1)] text-white text-xs rounded">Workshop</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Building Your First HIVE Tool Workshop
            </h2>
            <p className="text-[#A1A1AA] mb-6">
              Join us for a hands-on workshop where you'll learn to build your first tool using HiveLab. 
              Perfect for beginners, no coding experience required!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-[#A1A1AA]">
                <Calendar className="h-4 w-4" />
                <span>Tomorrow, Feb 15</span>
              </div>
              <div className="flex items-center space-x-2 text-[#A1A1AA]">
                <Clock className="h-4 w-4" />
                <span>2:00 PM - 4:00 PM</span>
              </div>
              <div className="flex items-center space-x-2 text-[#A1A1AA]">
                <MapPin className="h-4 w-4" />
                <span>Engineering Building</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-sm text-[#A1A1AA]">attending</div>
            </div>
            <Button className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]">
              Register Now
            </Button>
          </div>
        </div>
      </Card>

      {/* Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            This Week
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "CS Study Group: Data Structures",
                time: "Today, 7:00 PM",
                location: "Library Room 301",
                attendees: 12,
                type: "Study Group"
              },
              {
                title: "Startup Pitch Night",
                time: "Friday, 6:00 PM",
                location: "Student Union",
                attendees: 89,
                type: "Career"
              },
              {
                title: "React Workshop",
                time: "Saturday, 2:00 PM",
                location: "Virtual",
                attendees: 34,
                type: "Workshop"
              }
            ].map((event, i) => (
              <Card key={i} className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-[rgba(255,255,255,0.1)] text-white text-xs rounded">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-white font-medium mb-2">{event.title}</h3>
                    <div className="space-y-1 text-sm text-[#A1A1AA]">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[#A1A1AA] flex-shrink-0 ml-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Later This Month
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "AI/ML Workshop Series",
                time: "Feb 20, 3:00 PM",
                location: "Tech Hub",
                attendees: 156,
                type: "Workshop"
              },
              {
                title: "HIVE Community Meetup",
                time: "Feb 25, 5:00 PM",
                location: "Student Center",
                attendees: 78,
                type: "Social"
              },
              {
                title: "Final Project Showcase",
                time: "Feb 28, 1:00 PM",
                location: "Auditorium",
                attendees: 203,
                type: "Showcase"
              }
            ].map((event, i) => (
              <Card key={i} className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-[rgba(255,255,255,0.1)] text-white text-xs rounded">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-white font-medium mb-2">{event.title}</h3>
                    <div className="space-y-1 text-sm text-[#A1A1AA]">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-[#A1A1AA] flex-shrink-0 ml-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Event CTA */}
      <Card className="p-8 bg-gradient-to-r from-[rgba(255,215,0,0.1)] to-[rgba(255,215,0,0.05)] border-[rgba(255,215,0,0.2)] text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Have an event to share?</h2>
        <p className="text-[#A1A1AA] mb-6 max-w-md mx-auto">
          Create and promote your event to the HIVE community. From study groups to workshops, 
          bring people together.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
          <Button variant="outline" className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]">
            Event Guidelines
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
}