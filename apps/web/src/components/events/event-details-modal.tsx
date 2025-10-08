"use client";

import { useState } from "react";
import { Dialog, Button, Badge, Card } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Zap, 
  Star,
  Heart,
  MessageCircle,
  Share2,
  ExternalLink,
  Settings,
  UserPlus,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { EventToolIntegration } from "./event-tool-integration";

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventData | null;
  currentUserId?: string;
  onRSVP: (_eventId: string, _status: 'going' | 'interested' | 'not_going') => void;
  onBookmark: (_eventId: string) => void;
}

interface EventData {
  id: string;
  title: string;
  description: string;
  type: 'academic' | 'social' | 'professional' | 'recreational' | 'official';
  organizer: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    verified?: boolean;
  };
  space?: {
    id: string;
    name: string;
    type: string;
  };
  datetime: {
    start: string;
    end: string;
    timezone: string;
  };
  location: {
    type: 'physical' | 'virtual' | 'hybrid';
    name: string;
    address?: string;
    virtualLink?: string;
  };
  capacity: {
    max: number;
    current: number;
    waitlist: number;
  };
  tools: string[];
  tags: string[];
  visibility: 'public' | 'space_only' | 'invited_only';
  rsvpStatus?: 'going' | 'interested' | 'not_going' | null;
  isBookmarked: boolean;
  engagement: {
    going: number;
    interested: number;
    comments: number;
    shares: number;
  };
  requirements?: string[];
  createdAt: string;
  updatedAt: string;
}


export function EventDetailsModal({ 
  isOpen, 
  onClose, 
  event, 
  currentUserId,
  onRSVP, 
  onBookmark 
}: EventDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'tools' | 'attendees' | 'discussion'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!event) return null;

  const formatEventTime = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const now = new Date();
    
    const isToday = start.toDateString() === now.toDateString();
    const isTomorrow = start.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
    
    let dayText = '';
    if (isToday) dayText = 'Today';
    else if (isTomorrow) dayText = 'Tomorrow';
    else dayText = start.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: start.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
    });
    
    const timeText = `${start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })} - ${end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })}`;
    
    return { dayText, timeText };
  };

  const getEventTypeColor = (type: EventData['type']) => {
    switch (type) {
      case 'academic': return 'bg-blue-500';
      case 'social': return 'bg-pink-500';
      case 'professional': return 'bg-green-500';
      case 'recreational': return 'bg-orange-500';
      case 'official': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type: EventData['type']) => {
    switch (type) {
      case 'academic': return '📚';
      case 'social': return '🎉';
      case 'professional': return '💼';
      case 'recreational': return '🎮';
      case 'official': return '🏛️';
      default: return '📅';
    }
  };


  const { dayText, timeText } = formatEventTime(event.datetime.start, event.datetime.end);
  const isEventFull = event.capacity.current >= event.capacity.max;
  const isEventPast = new Date(event.datetime.end) < new Date();
  const isEventSoon = new Date(event.datetime.start) < new Date(Date.now() + 24 * 60 * 60 * 1000);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/events/${event.id}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      // Intentionally suppressed - non-critical error
    }
  };

  const handleToolLaunch = (toolId: string, config?: any) => {
    // In a real implementation, this would launch the tool in the context of the event
    // This would integrate with the actual tool system
    alert(`Tool "${toolId}" launching for event attendees...`);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
     
     
      className="max-h-[90vh] overflow-hidden"
    >
      <div className="flex flex-col h-full">
        {/* Event Header */}
        <div className="p-6 border-b border-zinc-800">
          <div className="flex items-start space-x-4">
            <div className={`w-16 h-16 ${getEventTypeColor(event.type)} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
              {getEventTypeIcon(event.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold text-white leading-tight pr-4">
                  {event.title}
                </h2>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    className={`max-w-sm ${event.isBookmarked ? 'text-[var(--hive-brand-primary)]' : 'text-zinc-400'}`}
                    onClick={() => onBookmark(event.id)}
                  >
                    <Heart className={`h-5 w-5 ${event.isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="outline"
                    className="max-w-sm text-zinc-400 hover:text-white"
                    onClick={handleCopyLink}
                    
                  >
                    {copiedLink ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Share2 className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-zinc-400 mb-3">
                <div className="flex items-center space-x-1">
                  <span>{event.organizer.name}</span>
                  {event.organizer.verified && (
                    <Star className="h-4 w-4 text-[var(--hive-brand-primary)] fill-current" />
                  )}
                </div>
                {event.space && (
                  <>
                    <span>•</span>
                    <span className="text-[var(--hive-brand-primary)]">{event.space.name}</span>
                  </>
                )}
                <span>•</span>
                <Badge variant="secondary" className="text-xs capitalize">
                  {event.type}
                </Badge>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-zinc-400" />
                  <div>
                    <div className="text-white font-medium">{dayText}</div>
                    <div className="text-zinc-400">{timeText}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-zinc-400" />
                  <div>
                    <div className="text-white font-medium">{event.location.type === 'virtual' ? 'Virtual' : 'In-Person'}</div>
                    <div className="text-zinc-400 truncate">{event.location.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-zinc-400" />
                  <div>
                    <div className="text-white font-medium">{event.capacity.current}/{event.capacity.max}</div>
                    <div className="text-zinc-400">attending</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-zinc-400" />
                  <div>
                    <div className="text-white font-medium">{event.tools.length}</div>
                    <div className="text-zinc-400">tools</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RSVP Actions */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800">
            <div className="flex items-center space-x-3">
              {!isEventPast && (
                <>
                  <Button
                    variant={event.rsvpStatus === 'going' ? 'default' : 'outline'}
                    onClick={() => onRSVP(event.id, event.rsvpStatus === 'going' ? 'not_going' : 'going')}
                    disabled={isEventFull && event.rsvpStatus !== 'going'}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Going ({event.engagement.going})</span>
                  </Button>
                  
                  <Button
                    variant={event.rsvpStatus === 'interested' ? 'default' : 'outline'}
                    onClick={() => onRSVP(event.id, event.rsvpStatus === 'interested' ? 'not_going' : 'interested')}
                  >
                    <Star className="h-4 w-4" />
                    <span>Interested ({event.engagement.interested})</span>
                  </Button>
                </>
              )}
              
              {isEventFull && event.rsvpStatus !== 'going' && (
                <Badge variant="destructive" className="flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Event Full</span>
                </Badge>
              )}
              
              {isEventPast && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Event Ended</span>
                </Badge>
              )}
            </div>

            {isEventSoon && event.rsvpStatus === 'going' && (
              <Badge variant="secondary" className="animate-pulse">
                Starting Soon!
              </Badge>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 px-6 pt-4 border-b border-zinc-800">
          {[
            { id: 'details', label: 'Details', icon: Calendar },
            { id: 'tools', label: 'Tools', icon: Zap, count: event.tools.length },
            { id: 'attendees', label: 'Attendees', icon: Users, count: event.capacity.current },
            { id: 'discussion', label: 'Discussion', icon: MessageCircle, count: event.engagement.comments }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[var(--hive-brand-primary)] text-hive-obsidian font-medium'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${activeTab === tab.id ? 'bg-hive-obsidian text-[var(--hive-brand-primary)]' : ''}`}
                  >
                    {tab.count}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">About this event</h3>
                <p className="text-zinc-300 leading-relaxed">{event.description}</p>
              </div>

              {/* Location Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Location</h3>
                <Card className="p-4 bg-zinc-800/50 border-zinc-700">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-zinc-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-white">{event.location.name}</div>
                      {event.location.address && (
                        <div className="text-sm text-zinc-400 mt-1">{event.location.address}</div>
                      )}
                      {event.location.virtualLink && (
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            className="max-w-sm flex items-center space-x-2"
                            onClick={() => window.open(event.location.virtualLink, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>Join Virtual Event</span>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Requirements */}
              {event.requirements && event.requirements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Requirements</h3>
                  <div className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-zinc-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {event.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tools Tab */}
          {activeTab === 'tools' && (
            <EventToolIntegration
              eventId={event.id}
              availableTools={event.tools}
              isEventActive={isEventSoon || (new Date(event.datetime.start) <= new Date() && new Date() <= new Date(event.datetime.end))}
              userRole={event.organizer.id === currentUserId ? 'organizer' : event.rsvpStatus === 'going' ? 'attendee' : 'viewer'}
              onToolLaunch={handleToolLaunch}
            />
          )}

          {/* Attendees Tab */}
          {activeTab === 'attendees' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Attendees ({event.capacity.current})
                </h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {event.capacity.max - event.capacity.current} spots left
                  </Badge>
                  {event.organizer.id === currentUserId && (
                    <Button variant="outline" className="max-w-sm">
                      <UserPlus className="h-4 w-4 mr-1" />
                      Invite
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Attendee List */}
              <div className="space-y-4">
                {/* Going Attendees */}
                <div>
                  <h4 className="text-sm font-medium text-zinc-400 mb-3">
                    Going ({event.engagement.going})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Organizer */}
                    <div className="flex items-center space-x-3 p-3 bg-zinc-800/50 rounded-lg">
                      <div className="w-10 h-10 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center">
                        <span className="text-hive-obsidian font-semibold text-sm">
                          {event.organizer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{event.organizer.name}</span>
                          {event.organizer.verified && (
                            <Star className="h-3 w-3 text-[var(--hive-brand-primary)] fill-current" />
                          )}
                          <Badge variant="secondary" className="text-xs">
                            Organizer
                          </Badge>
                        </div>
                        <div className="text-sm text-zinc-400">@{event.organizer.handle}</div>
                      </div>
                    </div>
                    
                    {/* Mock other attendees */}
                    {Array.from({ length: Math.min(event.engagement.going - 1, 5) }, (_, i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-zinc-800/50 rounded-lg">
                        <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {String.fromCharCode(65 + i)}{String.fromCharCode(65 + ((i + 3) % 26))}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            {['Alex Chen', 'Maria Rodriguez', 'David Kim', 'Sarah Johnson', 'Mike Wilson'][i]}
                          </div>
                          <div className="text-sm text-zinc-400">
                            @{['alexc', 'mariar', 'davidk', 'sarahj', 'mikew'][i]}
                          </div>
                        </div>
                        {currentUserId === event.organizer.id && (
 <Button variant="outline" className="max-w-sm text-zinc-400">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    {event.engagement.going > 6 && (
                      <div className="flex items-center justify-center p-3 bg-zinc-800/30 rounded-lg border-2 border-dashed border-zinc-700">
                        <span className="text-zinc-400 text-sm">
                          +{event.engagement.going - 6} more attendees
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Interested Attendees */}
                {event.engagement.interested > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-3">
                      Interested ({event.engagement.interested})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Array.from({ length: Math.min(event.engagement.interested, 4) }, (_, i) => (
                        <div key={i} className="flex items-center space-x-3 p-3 bg-zinc-800/30 rounded-lg">
                          <div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-white">
                              {['Emma Davis', 'John Smith', 'Lisa Wang', 'Tom Brown'][i]}
                            </div>
                            <div className="text-sm text-zinc-400">
                              @{['emmad', 'johns', 'lisaw', 'tomb'][i]}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {event.engagement.interested > 4 && (
                        <div className="flex items-center justify-center p-3 bg-zinc-800/20 rounded-lg border-2 border-dashed border-zinc-700">
                          <span className="text-zinc-400 text-sm">
                            +{event.engagement.interested - 4} more interested
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Waitlist */}
                {event.capacity.waitlist > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-zinc-400 mb-3">
                      Waitlist ({event.capacity.waitlist})
                    </h4>
                    <div className="text-center p-4 bg-zinc-800/30 rounded-lg border border-zinc-700">
                      <Clock className="h-8 w-8 text-zinc-500 mx-auto mb-2" />
                      <p className="text-sm text-zinc-400">
                        {event.capacity.waitlist} people waiting for spots to open up
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Discussion Tab */}
          {activeTab === 'discussion' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Discussion ({event.engagement.comments})
                </h3>
                {event.organizer.id === currentUserId && (
                  <Button variant="outline" className="max-w-sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Moderate
                  </Button>
                )}
              </div>
              
              {/* Comment Input */}
              <div className="flex items-start space-x-3 p-4 bg-zinc-800/30 rounded-lg">
                <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm">You</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Ask a question or share a comment..."
                    className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-[var(--hive-brand-primary)] focus:outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-xs text-zinc-400">
                      <span>💡 Ask about logistics, requirements, or coordination</span>
                    </div>
 <Button className="max-w-sm bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne">
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Comments List */}
              <div className="space-y-4">
                {event.engagement.comments > 0 ? (
                  <>
                    {/* Sample Comments */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-4 bg-zinc-800/20 rounded-lg">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">AC</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white">Alex Chen</span>
                            <span className="text-xs text-zinc-400">2 hours ago</span>
                          </div>
                          <p className="text-zinc-300 text-sm leading-relaxed">
                            Should I bring my own laptop or will there be computers available? Also, is there a specific IDE we should use for the coding exercises?
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
 <Button variant="outline" className="max-w-sm text-zinc-400 hover:text-white text-xs">
                              <Heart className="h-3 w-3 mr-1" />
                              3
                            </Button>
 <Button variant="outline" className="max-w-sm text-zinc-400 hover:text-white text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Organizer Reply */}
                      <div className="flex items-start space-x-3 p-4 bg-[var(--hive-brand-primary)]/5 border-l-2 border-[var(--hive-brand-primary)] rounded-lg ml-6">
                        <div className="w-10 h-10 bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-hive-obsidian font-semibold text-sm">SC</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white">{event.organizer.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              Organizer
                            </Badge>
                            <span className="text-xs text-zinc-400">1 hour ago</span>
                          </div>
                          <p className="text-zinc-300 text-sm leading-relaxed">
                            Great question! Please bring your own laptop with your preferred IDE installed. We'll be using various languages so having your familiar setup will help. I've also added "Laptop" to the requirements list above.
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
 <Button variant="outline" className="max-w-sm text-zinc-400 hover:text-white text-xs">
                              <Heart className="h-3 w-3 mr-1" />
                              5
                            </Button>
 <Button variant="outline" className="max-w-sm text-zinc-400 hover:text-white text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 p-4 bg-zinc-800/20 rounded-lg">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">MR</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white">Maria Rodriguez</span>
                            <span className="text-xs text-zinc-400">45 minutes ago</span>
                          </div>
                          <p className="text-zinc-300 text-sm leading-relaxed">
                            Looking forward to this! I've been working through CLRS chapters 15-16. Are we focusing on any specific algorithms or should I review everything?
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
 <Button variant="outline" className="max-w-sm text-zinc-400 hover:text-white text-xs">
                              <Heart className="h-3 w-3 mr-1" />
                              2
                            </Button>
 <Button variant="outline" className="max-w-sm text-zinc-400 hover:text-white text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {event.engagement.comments > 3 && (
                      <div className="text-center">
                        <Button variant="outline" className="max-w-sm">
                          Load {event.engagement.comments - 3} more comments
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
                    <p className="text-zinc-400">No comments yet</p>
                    <p className="text-sm text-zinc-500 mt-1">
                      Be the first to ask a question or share your thoughts
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}
