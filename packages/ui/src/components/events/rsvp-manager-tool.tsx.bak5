"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  UserCheck, 
  UserX, 
  Clock,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  MoreVertical,
  Eye,
  Edit3,
  Copy
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EventDefinition, RSVPResponse, EventAnalytics } from './event-system-core';

interface RSVPManagerProps {
  event: EventDefinition;
  onUpdateEvent?: (updates: Partial<EventDefinition>) => void;
  onMessageAttendees?: (recipients: string[], message: string) => void;
  onExportRSVPs?: (format: 'csv' | 'excel') => void;
}

interface RSVPStats {
  total: number;
  yes: number;
  no: number;
  maybe: number;
  pending: number;
  checkedIn: number;
  noShow: number;
  waitlist: number;
}

const RSVPStatusBadge = ({ status }: { status: RSVPResponse['status'] }) => {
  const config = {
    yes: { label: 'Going', variant: 'default' as const, className: 'bg-green-100 text-green-800 border-green-200' },
    no: { label: 'Not Going', variant: 'outline' as const, className: 'bg-red-100 text-red-800 border-red-200' },
    maybe: { label: 'Maybe', variant: 'outline' as const, className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  };

  const { label, className } = config[status];

  return (
    <HiveBadge className={className}>
      {label}
    </HiveBadge>
  );
};

const AttendeeRow = ({ 
  rsvp, 
  onUpdateStatus, 
  onToggleCheckin, 
  onMessage, 
  showActions = true 
}: {
  rsvp: RSVPResponse & { userName: string; userEmail: string; userAvatar?: string };
  onUpdateStatus: (rsvpId: string, status: RSVPResponse['status']) => void;
  onToggleCheckin: (rsvpId: string) => void;
  onMessage: (userId: string) => void;
  showActions?: boolean;
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {rsvp.userAvatar ? (
              <img src={rsvp.userAvatar} alt={rsvp.userName} className="w-full h-full rounded-full object-cover" />
            ) : (
              rsvp.userName.charAt(0).toUpperCase()
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-medium text-gray-900 truncate">{rsvp.userName}</p>
              {rsvp.checkedIn && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">{rsvp.userEmail}</p>
            {rsvp.guestCount > 0 && (
              <p className="text-xs text-gray-400">+{rsvp.guestCount} guest{rsvp.guestCount > 1 ? 's' : ''}</p>
            )}
          </div>

          {/* RSVP Status */}
          <RSVPStatusBadge status={rsvp.status} />

          {/* Response Time */}
          <div className="text-xs text-gray-400 text-right">
            <p>{new Date(rsvp.respondedAt).toLocaleDateString()}</p>
            <p>{new Date(rsvp.respondedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-2 ml-4">
            <HiveButton
              size="sm"
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
            >
              <Eye className="w-4 h-4" />
            </HiveButton>
            
            <div className="relative">
              <HiveButton
                size="sm"
                variant="outline"
              >
                <MoreVertical className="w-4 h-4" />
              </HiveButton>
            </div>
          </div>
        )}
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">RSVP Details</h4>
              <div className="space-y-1">
                <p><span className="text-gray-500">Status:</span> {rsvp.status}</p>
                <p><span className="text-gray-500">Guests:</span> {rsvp.guestCount}</p>
                <p><span className="text-gray-500">Responded:</span> {new Date(rsvp.respondedAt).toLocaleString()}</p>
                {rsvp.checkedIn && (
                  <p><span className="text-gray-500">Checked in:</span> {rsvp.checkedInAt ? new Date(rsvp.checkedInAt).toLocaleString() : 'Yes'}</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Additional Info</h4>
              <div className="space-y-1">
                {rsvp.dietaryRestrictions && (
                  <p><span className="text-gray-500">Dietary:</span> {rsvp.dietaryRestrictions}</p>
                )}
                {rsvp.accessibilityNeeds && (
                  <p><span className="text-gray-500">Accessibility:</span> {rsvp.accessibilityNeeds}</p>
                )}
                {rsvp.comments && (
                  <p><span className="text-gray-500">Comments:</span> {rsvp.comments}</p>
                )}
              </div>
            </div>
          </div>

          {/* Guest Names */}
          {rsvp.guestNames && rsvp.guestNames.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Guest Names</h4>
              <div className="flex flex-wrap gap-2">
                {rsvp.guestNames.map((name, index) => (
                  <HiveBadge key={index} variant="outline" className="text-xs">
                    {name}
                  </HiveBadge>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
            <HiveButton size="sm" variant="outline" onClick={() => onMessage(rsvp.userId)}>
              <MessageSquare className="w-3 h-3 mr-1" />
              Message
            </HiveButton>
            <HiveButton 
              size="sm" 
              variant="outline"
              onClick={() => onToggleCheckin(rsvp.id)}
            >
              {rsvp.checkedIn ? (
                <>
                  <UserX className="w-3 h-3 mr-1" />
                  Undo Check-in
                </>
              ) : (
                <>
                  <UserCheck className="w-3 h-3 mr-1" />
                  Check In
                </>
              )}
            </HiveButton>
          </div>
        </div>
      )}
    </>
  );
};

export function RSVPManagerTool({ event, onUpdateEvent, onMessageAttendees, onExportRSVPs }: RSVPManagerProps) {
  const [rsvps, setRSVPs] = useState<(RSVPResponse & { userName: string; userEmail: string; userAvatar?: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RSVPResponse['status'] | 'all'>('all');
  const [checkinFilter, setCheckinFilter] = useState<'all' | 'checked_in' | 'not_checked_in'>('all');
  const [selectedRSVPs, setSelectedRSVPs] = useState<string[]>([]);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Mock data - replace with API call
  useEffect(() => {
    const fetchRSVPs = async () => {
      setLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRSVPs = [
          {
            id: 'rsvp_1',
            eventId: event.id,
            userId: 'user_1',
            spaceId: event.spaceId,
            status: 'yes' as const,
            guestCount: 1,
            guestNames: ['Alex Smith'],
            dietaryRestrictions: 'Vegetarian',
            respondedAt: new Date('2024-01-15T10:30:00Z'),
            checkedIn: true,
            checkedInAt: new Date('2024-01-20T18:00:00Z'),
            noShow: false,
            userName: 'Sarah Johnson',
            userEmail: 'sarah.johnson@university.edu',
            userAvatar: undefined
          },
          {
            id: 'rsvp_2',
            eventId: event.id,
            userId: 'user_2',
            spaceId: event.spaceId,
            status: 'yes' as const,
            guestCount: 0,
            accessibilityNeeds: 'Wheelchair accessible entrance',
            respondedAt: new Date('2024-01-16T14:20:00Z'),
            checkedIn: false,
            noShow: false,
            userName: 'Michael Chen',
            userEmail: 'michael.chen@university.edu',
            userAvatar: undefined
          },
          {
            id: 'rsvp_3',
            eventId: event.id,
            userId: 'user_3',
            spaceId: event.spaceId,
            status: 'maybe' as const,
            guestCount: 2,
            guestNames: ['Jamie Wilson', 'Casey Brown'],
            comments: 'Will try to make it if I finish my project',
            respondedAt: new Date('2024-01-17T09:15:00Z'),
            checkedIn: false,
            noShow: false,
            userName: 'Emma Davis',
            userEmail: 'emma.davis@university.edu',
            userAvatar: undefined
          },
          {
            id: 'rsvp_4',
            eventId: event.id,
            userId: 'user_4',
            spaceId: event.spaceId,
            status: 'no' as const,
            guestCount: 0,
            comments: 'Have a conflicting exam',
            respondedAt: new Date('2024-01-18T16:45:00Z'),
            checkedIn: false,
            noShow: false,
            userName: 'David Rodriguez',
            userEmail: 'david.rodriguez@university.edu',
            userAvatar: undefined
          }
        ];
        
        setRSVPs(mockRSVPs);
      } catch (error) {
        console.error('Failed to fetch RSVPs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, [event.id]);

  // Calculate statistics
  const stats: RSVPStats = useMemo(() => {
    const total = rsvps.length;
    const yes = rsvps.filter(r => r.status === 'yes').length;
    const no = rsvps.filter(r => r.status === 'no').length;
    const maybe = rsvps.filter(r => r.status === 'maybe').length;
    const checkedIn = rsvps.filter(r => r.checkedIn).length;
    const noShow = rsvps.filter(r => r.noShow).length;
    
    return {
      total,
      yes,
      no,
      maybe,
      pending: 0, // Would come from invited but not responded
      checkedIn,
      noShow,
      waitlist: event.capacity ? Math.max(0, yes - event.capacity) : 0
    };
  }, [rsvps, event.capacity]);

  // Filter RSVPs
  const filteredRSVPs = useMemo(() => {
    return rsvps.filter(rsvp => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!rsvp.userName.toLowerCase().includes(query) && 
            !rsvp.userEmail.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all' && rsvp.status !== statusFilter) {
        return false;
      }

      // Check-in filter
      if (checkinFilter === 'checked_in' && !rsvp.checkedIn) {
        return false;
      }
      if (checkinFilter === 'not_checked_in' && rsvp.checkedIn) {
        return false;
      }

      return true;
    });
  }, [rsvps, searchQuery, statusFilter, checkinFilter]);

  const handleUpdateRSVPStatus = useCallback((rsvpId: string, status: RSVPResponse['status']) => {
    setRSVPs(prev => prev.map(rsvp => 
      rsvp.id === rsvpId ? { ...rsvp, status, respondedAt: new Date() } : rsvp
    ));
  }, []);

  const handleToggleCheckin = useCallback((rsvpId: string) => {
    setRSVPs(prev => prev.map(rsvp => 
      rsvp.id === rsvpId ? { 
        ...rsvp, 
        checkedIn: !rsvp.checkedIn,
        checkedInAt: !rsvp.checkedIn ? new Date() : undefined
      } : rsvp
    ));
  }, []);

  const handleMessageAttendee = useCallback((userId: string) => {
    // Open messaging interface for specific user
    console.log('Message user:', userId);
  }, []);

  const handleBulkMessage = useCallback(() => {
    if (selectedRSVPs.length === 0) return;
    setShowMessageModal(true);
  }, [selectedRSVPs]);

  const handleExport = useCallback((format: 'csv' | 'excel') => {
    onExportRSVPs?.(format);
  }, [onExportRSVPs]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 bg-amber-500 rounded-lg animate-pulse mx-auto mb-4" />
        <p className="text-gray-600">Loading RSVPs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">RSVP Manager</h2>
            <p className="text-gray-600">Manage event attendance and communicate with attendees</p>
          </div>
          
          <div className="flex items-center gap-3">
            <HiveButton variant="outline" onClick={() => handleExport('csv')}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </HiveButton>
            <HiveButton 
              variant="outline" 
              onClick={handleBulkMessage}
              disabled={selectedRSVPs.length === 0}
            >
              <Mail className="w-4 h-4 mr-2" />
              Message Selected ({selectedRSVPs.length})
            </HiveButton>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-500">Total RSVPs</div>
          </HiveCard>
          
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.yes}</div>
            <div className="text-sm text-gray-500">Going</div>
          </HiveCard>
          
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.maybe}</div>
            <div className="text-sm text-gray-500">Maybe</div>
          </HiveCard>
          
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.no}</div>
            <div className="text-sm text-gray-500">Not Going</div>
          </HiveCard>
          
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.checkedIn}</div>
            <div className="text-sm text-gray-500">Checked In</div>
          </HiveCard>
          
          <HiveCard className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.noShow}</div>
            <div className="text-sm text-gray-500">No Shows</div>
          </HiveCard>

          {event.capacity && (
            <HiveCard className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.waitlist}</div>
              <div className="text-sm text-gray-500">Waitlist</div>
            </HiveCard>
          )}
        </div>

        {/* Capacity Warning */}
        {event.capacity && stats.yes > event.capacity && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-800">Over Capacity</h4>
                <p className="text-sm text-orange-700">
                  You have {stats.yes} confirmed attendees for a capacity of {event.capacity}. 
                  Consider increasing capacity or managing the waitlist.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search attendees..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Status</option>
            <option value="yes">Going</option>
            <option value="maybe">Maybe</option>
            <option value="no">Not Going</option>
          </select>

          <select
            value={checkinFilter}
            onChange={(e) => setCheckinFilter(e.target.value as typeof checkinFilter)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="all">All Attendees</option>
            <option value="checked_in">Checked In</option>
            <option value="not_checked_in">Not Checked In</option>
          </select>
        </div>
      </div>

      {/* Attendees List */}
      <HiveCard>
        <div className="divide-y divide-gray-100">
          {filteredRSVPs.length === 0 ? (
            <div className="p-8 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No RSVPs Found</h3>
              <p className="text-gray-500">
                {searchQuery ? 'No attendees match your search.' : 'No one has RSVP\'d to this event yet.'}
              </p>
            </div>
          ) : (
            <>
              {/* Bulk Actions Header */}
              {selectedRSVPs.length > 0 && (
                <div className="p-4 bg-amber-50 border-b border-amber-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-amber-800">
                      {selectedRSVPs.length} attendee{selectedRSVPs.length > 1 ? 's' : ''} selected
                    </p>
                    <div className="flex gap-2">
                      <HiveButton size="sm" variant="outline" onClick={handleBulkMessage}>
                        <Mail className="w-3 h-3 mr-1" />
                        Message
                      </HiveButton>
                      <HiveButton size="sm" variant="outline" onClick={() => setSelectedRSVPs([])}>
                        Clear
                      </HiveButton>
                    </div>
                  </div>
                </div>
              )}

              {/* Attendees */}
              {filteredRSVPs.map((rsvp) => (
                <AttendeeRow
                  key={rsvp.id}
                  rsvp={rsvp}
                  onUpdateStatus={handleUpdateRSVPStatus}
                  onToggleCheckin={handleToggleCheckin}
                  onMessage={handleMessageAttendee}
                />
              ))}
            </>
          )}
        </div>
      </HiveCard>

      {/* Summary */}
      <div className="text-sm text-gray-500 text-center">
        Showing {filteredRSVPs.length} of {stats.total} RSVPs
        {event.capacity && (
          <span> • Capacity: {stats.yes}/{event.capacity}</span>
        )}
      </div>
    </div>
  );
}

export default RSVPManagerTool;