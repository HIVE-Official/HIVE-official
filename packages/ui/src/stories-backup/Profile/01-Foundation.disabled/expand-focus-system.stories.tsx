import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile/01-Foundation/Expand & Focus System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Expand & Focus System - Core interaction pattern for widget expansion with full-screen focused experiences and seamless transitions.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Focus Mode Hook
const useFocusMode = () => {
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const enterFocus = (widgetId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(widgetId);
      setIsTransitioning(false);
    }, 200);
  };

  const exitFocus = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(null);
      setIsTransitioning(false);
    }, 200);
  };

  return { focusedWidget, isTransitioning, enterFocus, exitFocus };
};

// Focus Overlay Component
const FocusOverlay = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  isTransitioning 
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isTransitioning: boolean;
}) => {
  if (!isOpen && !isTransitioning) return null;

  return (
    <div className={`
      fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4
      transition-all duration-200
      ${isOpen && !isTransitioning ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className={`
        bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden
        transform transition-all duration-200
        ${isOpen && !isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Focus Header */}
        <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <h2 className="text-xl font-bold text-hive-text-primary">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors">
              ⚙️
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Focus Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Demo Widget Component with Focus
const DemoWidget = ({ 
  id, 
  title, 
  size, 
  icon, 
  preview, 
  focusContent,
  onFocus 
}: {
  id: string;
  title: string;
  size: string;
  icon: string;
  preview: React.ReactNode;
  focusContent: React.ReactNode;
  onFocus: (id: string) => void;
}) => {
  return (
    <div 
      onClick={() => onFocus(id)}
      className="bg-white border border-hive-border-default rounded-xl p-4 h-full cursor-pointer hover:border-hive-brand-secondary/50 hover:shadow-lg transition-all duration-200 group"
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            {icon}
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">{title}</span>
        </div>
        <div className="text-xs text-hive-text-tertiary">{size}</div>
      </div>

      {/* Widget Preview Content */}
      <div className="group-hover:scale-[1.02] transition-transform duration-200">
        {preview}
      </div>

      {/* Focus Hint */}
      <div className="mt-3 pt-3 border-t border-hive-border-default opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="text-xs text-hive-brand-secondary text-center">
          Click to expand & focus →
        </div>
      </div>
    </div>
  );
};

export const ExpandFocusSystem: Story = {
  name: '🔍 Expand & Focus System',
  render: () => {
    const { focusedWidget, isTransitioning, enterFocus, exitFocus } = useFocusMode();

    // Demo data for different widgets
    const widgets = [
      {
        id: 'avatar',
        title: 'Avatar Widget',
        size: '1x1',
        icon: '👤',
        preview: (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div>
                <div className="text-sm font-medium text-hive-text-primary">Sarah Chen</div>
                <div className="text-xs text-hive-text-secondary">@sarahc • Online</div>
              </div>
            </div>
            <div className="text-xs text-hive-text-tertiary">247 connections • 12 spaces</div>
          </div>
        ),
        focusContent: (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <div className="w-32 h-32 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto">
                SC
              </div>
              <div>
                <h3 className="text-3xl font-bold text-hive-text-primary">Sarah Chen</h3>
                <div className="text-lg text-hive-text-secondary">@sarahc • Computer Science • Class of 2025</div>
                <div className="text-hive-text-tertiary">University of Technology</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-hive-text-primary">247</div>
                <div className="text-sm text-hive-text-secondary">Connections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-hive-text-primary">12</div>
                <div className="text-sm text-hive-text-secondary">Active Spaces</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-hive-text-primary">8</div>
                <div className="text-sm text-hive-text-secondary">Tools Built</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-hive-text-primary">Recent Activity</h4>
              <div className="space-y-3">
                {[
                  { action: 'Built a new study scheduler tool', time: '2 hours ago', space: 'CS Study Group' },
                  { action: 'Joined Floor Pizza Night event', time: '4 hours ago', space: 'Floor 3 Community' },
                  { action: 'Completed final exam study session', time: '6 hours ago', space: 'CS Study Group' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-hive-background-primary rounded-lg">
                    <div className="w-2 h-2 bg-hive-brand-secondary rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm text-hive-text-primary">{activity.action}</div>
                      <div className="text-xs text-hive-text-secondary">{activity.space} • {activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'priority',
        title: 'Priority Coordination',
        size: '2x1',
        icon: '📋',
        preview: (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-status-error rounded-full"></div>
              <span className="text-sm text-hive-text-primary">CS Final - Tomorrow 2PM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-status-warning rounded-full"></div>
              <span className="text-sm text-hive-text-primary">Study Group - Today 4PM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hive-status-success rounded-full"></div>
              <span className="text-sm text-hive-text-primary">Office Hours - Friday</span>
            </div>
          </div>
        ),
        focusContent: (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-hive-text-primary">Priority Coordination</h3>
              <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
                + Add Priority
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-hive-status-error">1</div>
                <div className="text-sm text-hive-text-secondary">Urgent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-hive-status-warning">3</div>
                <div className="text-sm text-hive-text-secondary">Today</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-hive-status-success">5</div>
                <div className="text-sm text-hive-text-secondary">This Week</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-hive-status-error mb-4">🔴 URGENT</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-hive-status-error/10 border border-hive-status-error/20 rounded-lg">
                    <button className="w-4 h-4 bg-hive-status-error rounded-full"></button>
                    <div className="flex-1">
                      <div className="font-medium text-hive-text-primary">CS Final Exam</div>
                      <div className="text-sm text-hive-text-secondary">Tomorrow 2:00 PM • Library Room 204</div>
                      <div className="text-xs text-hive-text-tertiary">Study group coordination needed</div>
                    </div>
                    <div className="text-xs text-hive-status-error font-bold">Due in 18h</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-hive-status-warning mb-4">🟡 TODAY</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Study Group Planning', due: 'Today 4:00 PM', space: 'CS Study Group', people: 4 },
                    { title: 'Lab Report Draft', due: 'Today 11:59 PM', progress: 30 },
                    { title: 'Office Hours Visit', due: 'Today 3:00 PM', location: 'Prof. Johnson Office' }
                  ].map((task, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-hive-status-warning/10 border border-hive-status-warning/20 rounded-lg">
                      <button className="w-4 h-4 bg-hive-status-warning rounded-full"></button>
                      <div className="flex-1">
                        <div className="font-medium text-hive-text-primary">{task.title}</div>
                        <div className="text-sm text-hive-text-secondary">{task.due}</div>
                        {task.space && <div className="text-xs text-hive-text-tertiary">🏢 {task.space} • 👥 {task.people}</div>}
                        {task.progress && (
                          <div className="mt-2">
                            <div className="w-full h-1 bg-hive-background-secondary rounded-full">
                              <div className="h-1 bg-hive-status-warning rounded-full" style={{ width: `${task.progress}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      },
      {
        id: 'calendar',
        title: 'Social Calendar',
        size: '2x1',
        icon: '📅',
        preview: (
          <div className="space-y-2">
            <div className="text-xs text-hive-text-secondary">Today • 3 events</div>
            <div className="space-y-1">
              <div className="text-xs text-hive-text-primary">2:00 PM - Study Session</div>
              <div className="text-xs text-hive-text-primary">4:00 PM - Office Hours</div>
              <div className="text-xs text-hive-text-primary">7:00 PM - Pizza Night</div>
            </div>
          </div>
        ),
        focusContent: (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-hive-text-primary">Social Calendar</h3>
              <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
                + Schedule Event
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-hive-text-primary">3</div>
                <div className="text-sm text-hive-text-secondary">Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-hive-text-primary">12</div>
                <div className="text-sm text-hive-text-secondary">This Week</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-hive-status-success">5h</div>
                <div className="text-sm text-hive-text-secondary">Free Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-hive-status-error">1</div>
                <div className="text-sm text-hive-text-secondary">Conflict</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-hive-text-primary mb-4">Today's Schedule</h4>
                <div className="space-y-4">
                  {[
                    { time: '2:00 PM - 4:00 PM', title: 'CS Final Study Session', type: 'academic', location: 'Library Room 204', attendees: 12, rsvp: 'going' },
                    { time: '3:00 PM - 4:00 PM', title: 'Office Hours', type: 'academic', location: 'Prof. Johnson Office', conflict: true },
                    { time: '7:00 PM - 9:00 PM', title: 'Floor Pizza Night', type: 'social', location: 'Floor 3 Lounge', attendees: 18, rsvp: 'maybe' }
                  ].map((event, index) => (
                    <div key={index} className={`
                      flex items-start gap-4 p-4 rounded-lg border
                      ${event.conflict ? 'bg-hive-status-error/10 border-hive-status-error/20' : 'bg-hive-background-primary border-hive-border-default'}
                    `}>
                      <div className="text-center min-w-[80px]">
                        <div className="text-sm font-bold text-hive-text-primary">{event.time.split(' - ')[0]}</div>
                        <div className="text-xs text-hive-text-tertiary">{event.time.split(' - ')[1]}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={event.type === 'academic' ? '📚' : '👥'}></span>
                          <span className="font-medium text-hive-text-primary">{event.title}</span>
                          {event.rsvp && (
                            <span className={`
                              px-2 py-1 text-xs rounded-full
                              ${event.rsvp === 'going' ? 'bg-hive-status-success/10 text-hive-status-success' :
                                event.rsvp === 'maybe' ? 'bg-hive-status-warning/10 text-hive-status-warning' : ''}
                            `}>
                              {event.rsvp === 'going' ? '✓ Going' : '? Maybe'}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-hive-text-secondary mt-1">
                          📍 {event.location}
                          {event.attendees && <span> • 👥 {event.attendees} attending</span>}
                        </div>
                        {event.conflict && (
                          <div className="text-xs text-hive-status-error mt-1">⚠️ Overlaps with study session</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }
    ];

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Expand & Focus System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Core interaction pattern for HIVE widgets - click any widget to expand into full-screen focused experience
            </p>
          </div>

          {/* Demo Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Interactive Demo</h2>
            <p className="text-hive-text-secondary">Click on any widget below to see the Expand & Focus interaction</p>
            
            <div className="grid gap-4 auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="col-span-1 row-span-1">
                <DemoWidget 
                  {...widgets[0]}
                  onFocus={enterFocus}
                />
              </div>
              
              <div className="col-span-2 row-span-1">
                <DemoWidget 
                  {...widgets[1]}
                  onFocus={enterFocus}
                />
              </div>
              
              <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
                <div className="text-center text-hive-text-secondary">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-sm font-medium">Privacy Widget</div>
                  <div className="text-xs">1x1 size</div>
                </div>
              </div>

              <div className="col-span-2 row-span-1">
                <DemoWidget 
                  {...widgets[2]}
                  onFocus={enterFocus}
                />
              </div>

              <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
                <div className="text-center text-hive-text-secondary">
                  <div className="text-2xl mb-2">🏢</div>
                  <div className="text-sm font-medium">Community Widget</div>
                  <div className="text-xs">2x1 size</div>
                </div>
              </div>
            </div>
          </div>

          {/* System Documentation */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">System Architecture</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Interaction Flow</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>1. <strong>Widget Preview</strong>: Compact view with essential information</div>
                  <div>2. <strong>Hover State</strong>: Visual feedback with expand hint</div>
                  <div>3. <strong>Click to Expand</strong>: Smooth transition to full-screen modal</div>
                  <div>4. <strong>Focused Experience</strong>: Complete functionality with enhanced UX</div>
                  <div>5. <strong>Return to Grid</strong>: Seamless transition back to grid view</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Design Principles</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Progressive Disclosure</strong>: Show more detail on demand</div>
                  <div>• <strong>Context Preservation</strong>: Always know where you are</div>
                  <div>• <strong>Smooth Transitions</strong>: 200ms eased animations</div>
                  <div>• <strong>Keyboard Accessible</strong>: ESC to close, Tab navigation</div>
                  <div>• <strong>Mobile Optimized</strong>: Full-screen on mobile devices</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Mode Overlay */}
        {widgets.map(widget => (
          <FocusOverlay
            key={widget.id}
            isOpen={focusedWidget === widget.id}
            onClose={exitFocus}
            title={widget.title}
            isTransitioning={isTransitioning}
          >
            {widget.focusContent}
          </FocusOverlay>
        ))}
      </div>
    );
  }
};