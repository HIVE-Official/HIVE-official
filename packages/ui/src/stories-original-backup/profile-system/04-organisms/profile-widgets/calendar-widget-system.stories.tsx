import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile System/04-Organisms/Profile Widgets/Calendar Widget System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive calendar widget system for HIVE profiles, featuring event display, schedule management, integration with academic calendar, and expand & focus modal interactions.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Calendar Widget Component (would be imported from actual component)
const CalendarWidget = ({ 
  events = [], 
  viewMode = 'week',
  showControls = true,
  expandable = true,
  className = '',
  onEventClick,
  onExpand,
  onConfigure 
}: {
  events?: Array<{
    id: string;
    title: string;
    type: 'class' | 'study' | 'event' | 'meeting' | 'deadline';
    time: string;
    duration?: string;
    location?: string;
    color?: string;
  }>;
  viewMode?: 'day' | 'week' | 'month';
  showControls?: boolean;
  expandable?: boolean;
  className?: string;
  onEventClick?: (eventId: string) => void;
  onExpand?: () => void;
  onConfigure?: () => void;
}) => {
  const [currentView, setCurrentView] = useState(viewMode);
  const [isConfigMode, setIsConfigMode] = useState(false);

  const eventTypeColors = {
    class: 'bg-blue-500',
    study: 'bg-green-500',
    event: 'bg-purple-500',
    meeting: 'bg-orange-500',
    deadline: 'bg-red-500'
  };

  const today = new Date();
  const currentTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`bg-hive-background-secondary border border-hive-border-default rounded-xl ${className}`}>
      {/* Widget Header */}
      <div className="flex items-center justify-between p-4 border-b border-hive-border-default">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-hive-brand-primary/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-hive-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-hive-text-primary">Calendar</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {showControls && (
            <>
              <select 
                value={currentView} 
                onChange={(e) => setCurrentView(e.target.value as any)}
                className="text-xs bg-hive-background-primary border border-hive-border-default rounded px-2 py-1"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
              
              {expandable && (
                <button 
                  onClick={onExpand}
                  className="w-6 h-6 bg-hive-background-primary hover:bg-hive-brand-primary/10 rounded flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3 text-hive-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              )}
              
              <button 
                onClick={() => {
                  setIsConfigMode(!isConfigMode);
                  onConfigure?.();
                }}
                className="w-6 h-6 bg-hive-background-primary hover:bg-hive-brand-primary/10 rounded flex items-center justify-center transition-colors"
              >
                <svg className="w-3 h-3 text-hive-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Configuration Panel */}
      {isConfigMode && (
        <div className="p-4 bg-hive-brand-primary/5 border-b border-hive-border-default">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-hive-text-primary">Calendar Settings</h4>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-hive-text-secondary">Show classes</span>
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-hive-text-secondary">Show study sessions</span>
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-hive-text-secondary">Show deadlines</span>
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" className="rounded" />
                <span className="text-hive-text-secondary">Show birthdays</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Widget Content */}
      <div className="p-4">
        {currentView === 'week' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-hive-text-primary">This Week</span>
              <span className="text-hive-text-secondary">{currentTime}</span>
            </div>
            
            <div className="space-y-2">
              {events.slice(0, 4).map((event) => (
                <div 
                  key={event.id}
                  onClick={() => onEventClick?.(event.id)}
                  className="flex items-center gap-3 p-2 hover:bg-hive-background-primary rounded-lg cursor-pointer transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${eventTypeColors[event.type]}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-hive-text-primary truncate">{event.title}</div>
                    <div className="text-xs text-hive-text-secondary">
                      {event.time}{event.duration && ` • ${event.duration}`}
                      {event.location && ` • ${event.location}`}
                    </div>
                  </div>
                </div>
              ))}
              
              {events.length > 4 && (
                <button 
                  onClick={onExpand}
                  className="w-full text-xs text-hive-brand-primary hover:text-hive-brand-secondary text-center py-2 transition-colors"
                >
                  +{events.length - 4} more events
                </button>
              )}
            </div>
          </div>
        )}

        {currentView === 'day' && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-hive-text-primary">Today</div>
            <div className="space-y-2">
              {events.filter(e => e.time.includes('AM') || e.time.includes('PM')).slice(0, 3).map((event) => (
                <div 
                  key={event.id}
                  onClick={() => onEventClick?.(event.id)}
                  className="flex items-start gap-3 p-2 hover:bg-hive-background-primary rounded-lg cursor-pointer transition-colors"
                >
                  <div className="text-xs text-hive-text-secondary pt-0.5 w-12 text-right">{event.time}</div>
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${eventTypeColors[event.type]}`} />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-hive-text-primary">{event.title}</div>
                    {event.location && <div className="text-xs text-hive-text-secondary">{event.location}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'month' && (
          <div className="space-y-3">
            <div className="text-sm font-medium text-hive-text-primary">December 2024</div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center text-hive-text-tertiary font-medium p-1">{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <div 
                  key={day} 
                  className={`
                    text-center p-1 rounded cursor-pointer transition-colors
                    ${day === 15 ? 'bg-hive-brand-primary text-white' : 'text-hive-text-secondary hover:bg-hive-background-primary'}
                    ${[3, 7, 12, 18, 22, 28].includes(day) ? 'bg-hive-brand-primary/10' : ''}
                  `}
                  onClick={() => console.log(`Day ${day} clicked`)}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className="text-center py-8 text-hive-text-secondary">
            <svg className="w-12 h-12 mx-auto mb-3 text-hive-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="text-sm">No events scheduled</div>
            <button className="text-xs text-hive-brand-primary hover:text-hive-brand-secondary mt-2 transition-colors">
              + Add event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Sample event data
const sampleEvents = [
  { id: '1', title: 'Data Structures Lecture', type: 'class' as const, time: '9:00 AM', duration: '1h 30m', location: 'NSC 225' },
  { id: '2', title: 'Study Group - Algorithms', type: 'study' as const, time: '2:00 PM', duration: '2h', location: 'Library Room 301' },
  { id: '3', title: 'CS Club Meeting', type: 'event' as const, time: '6:00 PM', duration: '1h', location: 'Davis Hall 101' },
  { id: '4', title: 'Project Deadline', type: 'deadline' as const, time: '11:59 PM', location: 'Online' },
  { id: '5', title: 'Office Hours', type: 'meeting' as const, time: '3:00 PM', duration: '1h', location: 'Professor Office' },
  { id: '6', title: 'Hackathon Prep', type: 'study' as const, time: '7:00 PM', duration: '3h', location: 'Makerspace' }
];

// =========================
// CALENDAR WIDGET STORIES
// =========================

export const DefaultCalendarWidget: Story = {
  name: '🎯 Default Calendar Widget',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Calendar Widget System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Comprehensive calendar widget for HIVE profiles, featuring event management, 
            schedule integration, and expand & focus modal interactions for academic life.
          </p>
        </div>

        {/* Widget Sizes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">📐 Widget Sizes</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Compact Widget */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Compact (1x1)</h3>
              <CalendarWidget
                events={sampleEvents.slice(0, 2)}
                viewMode="day"
                className="w-full h-64"
                onEventClick={(id) => console.log('Event clicked:', id)}
                onExpand={() => console.log('Expand calendar')}
                onConfigure={() => console.log('Configure calendar')}
              />
            </div>

            {/* Standard Widget */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Standard (2x1)</h3>
              <CalendarWidget
                events={sampleEvents}
                viewMode="week"
                className="w-full h-64"
                onEventClick={(id) => console.log('Event clicked:', id)}
                onExpand={() => console.log('Expand calendar')}
                onConfigure={() => console.log('Configure calendar')}
              />
            </div>

            {/* Large Widget */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Large (2x2)</h3>
              <CalendarWidget
                events={sampleEvents}
                viewMode="month"
                className="w-full h-64"
                onEventClick={(id) => console.log('Event clicked:', id)}
                onExpand={() => console.log('Expand calendar')}
                onConfigure={() => console.log('Configure calendar')}
              />
            </div>
          </div>
        </div>

        {/* View Modes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">👁️ View Modes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Day View */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Day View</h3>
              <CalendarWidget
                events={sampleEvents}
                viewMode="day"
                className="w-full h-80"
                onEventClick={(id) => console.log('Day view event:', id)}
              />
            </div>

            {/* Week View */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Week View</h3>
              <CalendarWidget
                events={sampleEvents}
                viewMode="week"
                className="w-full h-80"
                onEventClick={(id) => console.log('Week view event:', id)}
              />
            </div>

            {/* Month View */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Month View</h3>
              <CalendarWidget
                events={sampleEvents}
                viewMode="month"
                className="w-full h-80"
                onEventClick={(id) => console.log('Month view event:', id)}
              />
            </div>
          </div>
        </div>

        {/* Widget States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">🔄 Widget States</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Empty State */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Empty State</h3>
              <CalendarWidget
                events={[]}
                viewMode="week"
                className="w-full h-64"
              />
            </div>

            {/* Configuration Mode */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Configuration Mode</h3>
              <div className="relative">
                <CalendarWidget
                  events={sampleEvents}
                  viewMode="week"
                  className="w-full h-64"
                />
                <div className="absolute inset-0 bg-hive-brand-primary/5 border border-hive-brand-primary/30 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-hive-brand-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg className="w-4 h-4 text-hive-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold text-hive-text-primary">Edit Mode Active</div>
                    <div className="text-xs text-hive-text-secondary">Drag to resize • Click to configure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const ExpandFocusModal: Story = {
  name: '🔍 Expand & Focus Modal',
  render: () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Calendar Expand & Focus</h1>
            <p className="text-lg text-hive-text-secondary">
              Click the expand button to see the full calendar experience in a modal
            </p>
          </div>

          {/* Widget in Dashboard Context */}
          <div className="bg-hive-background-secondary rounded-xl p-6">
            <h2 className="text-xl font-semibold text-hive-text-primary mb-4">Profile Dashboard Context</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CalendarWidget
                events={sampleEvents}
                viewMode="week"
                className="w-full h-64"
                onEventClick={(id) => console.log('Event clicked:', id)}
                onExpand={() => setIsModalOpen(true)}
                onConfigure={() => console.log('Configure calendar')}
              />
              <div className="bg-white border border-hive-border-default rounded-xl p-6 flex items-center justify-center">
                <div className="text-center text-hive-text-secondary">
                  <div className="text-4xl mb-2">📊</div>
                  <div>Other Widget</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Overlay */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-hive-background-primary rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-hive-brand-primary/20 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-hive-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-hive-text-primary">My Calendar</h2>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-status-error/10 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <svg className="w-4 h-4 text-hive-text-secondary hover:text-hive-status-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Calendar */}
                    <div className="lg:col-span-2">
                      <div className="bg-hive-background-secondary rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-semibold text-hive-text-primary">December 2024</h3>
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1 text-sm bg-hive-background-primary border border-hive-border-default rounded hover:bg-hive-brand-primary/10 transition-colors">
                              ← Prev
                            </button>
                            <button className="px-3 py-1 text-sm bg-hive-background-primary border border-hive-border-default rounded hover:bg-hive-brand-primary/10 transition-colors">
                              Next →
                            </button>
                          </div>
                        </div>
                        
                        {/* Full Calendar Grid */}
                        <div className="grid grid-cols-7 gap-2">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-sm font-semibold text-hive-text-secondary p-2">
                              {day}
                            </div>
                          ))}
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <div key={day} className="aspect-square border border-hive-border-default rounded-lg p-1 hover:bg-hive-background-primary cursor-pointer transition-colors">
                              <div className="text-sm text-hive-text-secondary mb-1">{day}</div>
                              {[3, 7, 12, 15, 18, 22, 28].includes(day) && (
                                <div className="w-2 h-2 bg-hive-brand-primary rounded-full"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Event Details Sidebar */}
                    <div className="space-y-6">
                      <div className="bg-hive-background-secondary rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Today's Events</h3>
                        <div className="space-y-3">
                          {sampleEvents.slice(0, 3).map((event) => (
                            <div key={event.id} className="p-3 bg-hive-background-primary rounded-lg">
                              <div className="text-sm font-medium text-hive-text-primary">{event.title}</div>
                              <div className="text-xs text-hive-text-secondary mt-1">
                                {event.time} • {event.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-hive-background-secondary rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                          <button className="w-full px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-secondary transition-colors">
                            + Add Event
                          </button>
                          <button className="w-full px-4 py-2 bg-hive-background-primary border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-brand-primary/10 transition-colors">
                            Import Calendar
                          </button>
                          <button className="w-full px-4 py-2 bg-hive-background-primary border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-brand-primary/10 transition-colors">
                            Settings
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export const IntegrationDemo: Story = {
  name: '🔗 Academic Integration',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">Academic Calendar Integration</h1>
          <p className="text-lg text-hive-text-secondary">
            How the calendar widget integrates with university systems and student life
          </p>
        </div>

        {/* Integration Sources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H7m4 0v-9m0 0l-2-2m2 2l2-2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">University HUB</h3>
            <p className="text-sm text-hive-text-secondary">Class schedules, exam dates, academic deadlines</p>
          </div>

          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">HIVE Spaces</h3>
            <p className="text-sm text-hive-text-secondary">Study groups, club meetings, social events</p>
          </div>

          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Personal</h3>
            <p className="text-sm text-hive-text-secondary">Custom events, reminders, personal deadlines</p>
          </div>
        </div>

        {/* Integrated Calendar Example */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Integrated Calendar View</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CalendarWidget
              events={[
                { id: '1', title: 'Calculus II', type: 'class', time: '9:00 AM', duration: '1h 30m', location: 'Math 250' },
                { id: '2', title: 'CS Study Group', type: 'study', time: '2:00 PM', duration: '2h', location: 'HIVE Space' },
                { id: '3', title: 'Project Due', type: 'deadline', time: '11:59 PM', location: 'UBLearns' },
                { id: '4', title: 'Career Fair', type: 'event', time: '10:00 AM', duration: '4h', location: 'Student Union' },
                { id: '5', title: 'Office Hours', type: 'meeting', time: '3:00 PM', duration: '1h', location: 'Davis 338' }
              ]}
              viewMode="week"
              className="w-full h-96"
              onEventClick={(id) => console.log('Integrated event:', id)}
              onExpand={() => console.log('Expand integrated calendar')}
            />

            {/* Event Type Legend */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-hive-text-primary">Event Types</h3>
              <div className="space-y-4">
                {[
                  { type: 'class', label: 'Classes', color: 'bg-blue-500', description: 'From University HUB' },
                  { type: 'study', label: 'Study Sessions', color: 'bg-green-500', description: 'From HIVE Spaces' },
                  { type: 'event', label: 'Campus Events', color: 'bg-purple-500', description: 'University & Organizations' },
                  { type: 'meeting', label: 'Meetings', color: 'bg-orange-500', description: 'Office hours, advisors' },
                  { type: 'deadline', label: 'Deadlines', color: 'bg-red-500', description: 'Assignments, projects' }
                ].map(({ type, label, color, description }) => (
                  <div key={type} className="flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${color}`} />
                    <div>
                      <div className="text-sm font-medium text-hive-text-primary">{label}</div>
                      <div className="text-xs text-hive-text-secondary">{description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-hive-brand-primary/10 border border-hive-brand-primary/20 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-hive-text-primary mb-2">Smart Sync</h4>
                <p className="text-xs text-hive-text-secondary">
                  Your calendar automatically syncs with university systems and updates in real-time when you join new spaces or create events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};