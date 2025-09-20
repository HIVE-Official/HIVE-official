"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { 
  QrCode, 
  Scan, 
  UserCheck, 
  Users, 
  Clock,
  Search,
  CheckCircle,
  AlertCircle,
  Camera,
  Upload,
  Download,
  RefreshCw,
  Monitor,
  Smartphone,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EventDefinition, RSVPResponse } from './event-system-core';

interface EventCheckinProps {
  event: EventDefinition;
  rsvps: (RSVPResponse & { userName: string; userEmail: string })[];
  onCheckin: (userId: string, guestCount?: number) => Promise<void>;
  onGenerateQR?: () => Promise<string>;
  onExportAttendance?: (format: 'csv' | 'excel') => void;
}

interface CheckinStats {
  totalExpected: number;
  checkedIn: number;
  checkinRate: number;
  onTime: number;
  late: number;
  noShow: number;
  walkIns: number;
}

interface CheckinEntry {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  checkedInAt: Date;
  method: 'qr' | 'manual' | 'walk_in';
  guestCount: number;
  wasLate: boolean;
}

const CheckinMethodBadge = ({ method }: { method: CheckinEntry['method'] }) => {
  const config = {
    qr: { label: 'QR Scan', className: 'bg-green-100 text-green-800 border-green-200' },
    manual: { label: 'Manual', className: 'bg-blue-100 text-blue-800 border-blue-200' },
    walk_in: { label: 'Walk-in', className: 'bg-purple-100 text-purple-800 border-purple-200' },
  };

  return (
    <HiveBadge className={config[method].className}>
      {config[method].label}
    </HiveBadge>
  );
};

const QRCodeDisplay = ({ qrCode, onRefresh }: { qrCode: string; onRefresh: () => void }) => (
  <div className="text-center space-y-4">
    <div className="inline-block p-4 bg-white rounded-lg shadow-sm border">
      <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        {/* Mock QR Code - replace with actual QR code generator */}
        <div className="grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`} 
            />
          ))}
        </div>
      </div>
    </div>
    
    <div>
      <p className="text-sm font-medium text-gray-900 mb-1">Event Check-in QR Code</p>
      <p className="text-xs text-gray-500 mb-3">
        Scan this code to check attendees in quickly
      </p>
      <HiveButton size="sm" variant="outline" onClick={onRefresh}>
        <RefreshCw className="w-3 h-3 mr-1" />
        Refresh Code
      </HiveButton>
    </div>
  </div>
);

const QRScanner = ({ 
  isActive, 
  onScan, 
  onClose 
}: { 
  isActive: boolean; 
  onScan: (code: string) => void; 
  onClose: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasCamera(true);
        }
      } catch (err) {
        setError('Camera access denied or not available');
        setHasCamera(false);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Scan QR Code</h3>
          <HiveButton size="sm" variant="outline" onClick={onClose}>
            <EyeOff className="w-4 h-4" />
          </HiveButton>
        </div>

        {error ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <HiveButton onClick={onClose}>Close</HiveButton>
          </div>
        ) : hasCamera ? (
          <div className="space-y-4">
            <div className="relative">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-64 object-cover rounded-lg bg-gray-100"
              />
              <div className="absolute inset-0 border-2 border-amber-400 rounded-lg pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400"></div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 text-center">
              Position the QR code within the yellow frame
            </p>

            {/* Mock scan simulation */}
            <HiveButton 
              className="w-full" 
              onClick={() => {
                onScan('mock_qr_code_user_123');
                onClose();
              }}
            >
              Simulate Successful Scan
            </HiveButton>
          </div>
        ) : (
          <div className="text-center py-8">
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Starting camera...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ManualCheckinModal = ({ 
  isOpen, 
  rsvps, 
  onCheckin, 
  onClose 
}: {
  isOpen: boolean;
  rsvps: (RSVPResponse & { userName: string; userEmail: string })[];
  onCheckin: (userId: string, guestCount?: number) => void;
  onClose: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(0);

  const uncheckedRSVPs = rsvps.filter(rsvp => !rsvp.checkedIn && rsvp.status === 'yes');
  const filteredRSVPs = uncheckedRSVPs.filter(rsvp =>
    rsvp.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rsvp.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckin = () => {
    if (selectedUser) {
      onCheckin(selectedUser, guestCount);
      setSelectedUser(null);
      setGuestCount(0);
      setSearchQuery('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Manual Check-in</h3>
          <HiveButton size="sm" variant="outline" onClick={onClose}>
            Close
          </HiveButton>
        </div>

        <div className="space-y-4 flex-1 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attendees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto max-h-64">
            {filteredRSVPs.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">
                  {searchQuery ? 'No attendees found' : 'All attendees have been checked in'}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredRSVPs.map((rsvp) => (
                  <button
                    key={rsvp.id}
                    onClick={() => {
                      setSelectedUser(rsvp.userId);
                      setGuestCount(rsvp.guestCount);
                    }}
                    className={cn(
                      "w-full p-3 text-left rounded-lg border transition-colors",
                      selectedUser === rsvp.userId
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="font-medium text-gray-900">{rsvp.userName}</div>
                    <div className="text-sm text-gray-500">{rsvp.userEmail}</div>
                    {rsvp.guestCount > 0 && (
                      <div className="text-xs text-gray-400">+{rsvp.guestCount} guests</div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedUser && (
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Guest count:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGuestCount(Math.max(0, guestCount - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{guestCount}</span>
                  <button
                    onClick={() => setGuestCount(guestCount + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <HiveButton
            onClick={handleCheckin}
            disabled={!selectedUser}
            className="w-full"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Check In
          </HiveButton>
        </div>
      </div>
    </div>
  );
};

export function EventCheckinTool({ 
  event, 
  rsvps, 
  onCheckin, 
  onGenerateQR, 
  onExportAttendance 
}: EventCheckinProps) {
  const [viewMode, setViewMode] = useState<'dashboard' | 'qr' | 'scan' | 'manual'>('dashboard');
  const [qrCode, setQRCode] = useState<string>('');
  const [checkinEntries, setCheckinEntries] = useState<CheckinEntry[]>([]);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate stats
  const stats: CheckinStats = React.useMemo(() => {
    const yesRSVPs = rsvps.filter(r => r.status === 'yes');
    const checkedInCount = rsvps.filter(r => r.checkedIn).length;
    const eventStart = event.startDate;
    
    const onTime = checkinEntries.filter(entry => !entry.wasLate).length;
    const late = checkinEntries.filter(entry => entry.wasLate).length;
    const walkIns = checkinEntries.filter(entry => entry.method === 'walk_in').length;

    return {
      totalExpected: yesRSVPs.length,
      checkedIn: checkedInCount,
      checkinRate: yesRSVPs.length > 0 ? (checkedInCount / yesRSVPs.length) * 100 : 0,
      onTime,
      late,
      noShow: yesRSVPs.length - checkedInCount,
      walkIns
    };
  }, [rsvps, checkinEntries, event.startDate]);

  // Mock checkin entries
  useEffect(() => {
    const mockEntries: CheckinEntry[] = rsvps
      .filter(rsvp => rsvp.checkedIn)
      .map((rsvp, index) => ({
        id: `checkin_${rsvp.id}`,
        userId: rsvp.userId,
        userName: rsvp.userName,
        userEmail: rsvp.userEmail,
        checkedInAt: rsvp.checkedInAt || new Date(),
        method: index % 3 === 0 ? 'qr' : index % 3 === 1 ? 'manual' : 'walk_in',
        guestCount: rsvp.guestCount,
        wasLate: rsvp.checkedInAt ? rsvp.checkedInAt > event.startDate : false
      }));
    
    setCheckinEntries(mockEntries);
  }, [rsvps, event.startDate]);

  const handleGenerateQR = useCallback(async () => {
    try {
      const code = onGenerateQR ? await onGenerateQR() : `checkin_qr_${event.id}_${Date.now()}`;
      setQRCode(code);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  }, [event.id, onGenerateQR]);

  const handleQRScan = useCallback(async (scannedCode: string) => {
    try {
      // Mock QR scan processing
      const userId = scannedCode.replace('mock_qr_code_user_', '');
      await onCheckin(userId);
      
      // Add to checkin entries
      const newEntry: CheckinEntry = {
        id: `checkin_qr_${Date.now()}`,
        userId,
        userName: `User ${userId}`,
        userEmail: `user${userId}@university.edu`,
        checkedInAt: new Date(),
        method: 'qr',
        guestCount: 0,
        wasLate: new Date() > event.startDate
      };
      
      setCheckinEntries(prev => [newEntry, ...prev]);
    } catch (error) {
      console.error('Failed to process QR scan:', error);
    }
  }, [onCheckin, event.startDate]);

  const handleManualCheckin = useCallback(async (userId: string, guestCount = 0) => {
    try {
      await onCheckin(userId, guestCount);
      
      const rsvp = rsvps.find(r => r.userId === userId);
      if (rsvp) {
        const newEntry: CheckinEntry = {
          id: `checkin_manual_${Date.now()}`,
          userId,
          userName: rsvp.userName,
          userEmail: rsvp.userEmail,
          checkedInAt: new Date(),
          method: 'manual',
          guestCount,
          wasLate: new Date() > event.startDate
        };
        
        setCheckinEntries(prev => [newEntry, ...prev]);
      }
    } catch (error) {
      console.error('Failed to check in attendee:', error);
    }
  }, [onCheckin, rsvps, event.startDate]);

  const filteredEntries = checkinEntries.filter(entry =>
    !searchQuery || 
    entry.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Initialize QR code on mount
  useEffect(() => {
    if (viewMode === 'qr' && !qrCode) {
      handleGenerateQR();
    }
  }, [viewMode, qrCode, handleGenerateQR]);

  if (viewMode === 'qr') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">QR Code Check-in</h2>
            <p className="text-gray-600">Display this code for attendees to scan</p>
          </div>
          <HiveButton onClick={() => setViewMode('dashboard')}>
            Back to Dashboard
          </HiveButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <HiveCard className="p-8">
            <QRCodeDisplay qrCode={qrCode} onRefresh={handleGenerateQR} />
          </HiveCard>

          <HiveCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Instructions</h3>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <Monitor className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Display Mode</p>
                  <p className="text-gray-600">Show this screen on a large display at the entrance</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Smartphone className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Attendee Scanning</p>
                  <p className="text-gray-600">Attendees scan with their phone camera or any QR scanner app</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <RefreshCw className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Security</p>
                  <p className="text-gray-600">Code refreshes every 5 minutes for security</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-1">Live Stats</h4>
              <p className="text-sm text-amber-700">
                {stats.checkedIn} checked in • {stats.totalExpected - stats.checkedIn} remaining
              </p>
            </div>
          </HiveCard>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Check-in</h2>
          <p className="text-gray-600">Real-time attendance tracking for {event.title}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <HiveButton variant="outline" onClick={() => onExportAttendance?.('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </HiveButton>
          <HiveButton onClick={() => setShowManualModal(true)}>
            <UserCheck className="w-4 h-4 mr-2" />
            Manual Check-in
          </HiveButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.checkedIn}</div>
          <div className="text-sm text-gray-500">Checked In</div>
        </HiveCard>
        
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.checkinRate.toFixed(0)}%</div>
          <div className="text-sm text-gray-500">Check-in Rate</div>
        </HiveCard>
        
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.onTime}</div>
          <div className="text-sm text-gray-500">On Time</div>
        </HiveCard>
        
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.late}</div>
          <div className="text-sm text-gray-500">Late</div>
        </HiveCard>
        
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.noShow}</div>
          <div className="text-sm text-gray-500">No Show</div>
        </HiveCard>

        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.walkIns}</div>
          <div className="text-sm text-gray-500">Walk-ins</div>
        </HiveCard>

        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">{stats.totalExpected}</div>
          <div className="text-sm text-gray-500">Expected</div>
        </HiveCard>
      </div>

      {/* Check-in Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HiveCard 
          className="p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setViewMode('qr')}
        >
          <div className="text-center">
            <QrCode className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">QR Code Display</h3>
            <p className="text-sm text-gray-600">
              Show QR code for attendees to scan themselves
            </p>
          </div>
        </HiveCard>

        <HiveCard 
          className="p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setShowQRScanner(true)}
        >
          <div className="text-center">
            <Scan className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Scan QR Codes</h3>
            <p className="text-sm text-gray-600">
              Use camera to scan attendee QR codes
            </p>
          </div>
        </HiveCard>

        <HiveCard 
          className="p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setShowManualModal(true)}
        >
          <div className="text-center">
            <UserCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Manual Check-in</h3>
            <p className="text-sm text-gray-600">
              Search and check in attendees manually
            </p>
          </div>
        </HiveCard>
      </div>

      {/* Recent Check-ins */}
      <HiveCard>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Check-ins</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search check-ins..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No check-ins yet</p>
              </div>
            ) : (
              filteredEntries.slice(0, 10).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{entry.userName}</p>
                      <p className="text-sm text-gray-500">{entry.userEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <CheckinMethodBadge method={entry.method} />
                    {entry.guestCount > 0 && (
                      <span className="text-gray-500">+{entry.guestCount}</span>
                    )}
                    {entry.wasLate && (
                      <HiveBadge className="bg-orange-100 text-orange-800 border-orange-200">
                        Late
                      </HiveBadge>
                    )}
                    <span className="text-gray-500">
                      {entry.checkedInAt.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredEntries.length > 10 && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Showing 10 of {filteredEntries.length} check-ins
              </p>
            </div>
          )}
        </div>
      </HiveCard>

      {/* Modals */}
      <QRScanner
        isActive={showQRScanner}
        onScan={handleQRScan}
        onClose={() => setShowQRScanner(false)}
      />

      <ManualCheckinModal
        isOpen={showManualModal}
        rsvps={rsvps}
        onCheckin={handleManualCheckin}
        onClose={() => setShowManualModal(false)}
      />
    </div>
  );
}

export default EventCheckinTool;