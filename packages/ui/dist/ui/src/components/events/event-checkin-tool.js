"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QrCode, Scan, UserCheck, Users, Clock, Search, CheckCircle, AlertCircle, Camera, Download, RefreshCw, Monitor, Smartphone, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils.js';
const CheckinMethodBadge = ({ method }) => {
    const config = {
        qr: { label: 'QR Scan', className: 'bg-green-100 text-green-800 border-green-200' },
        manual: { label: 'Manual', className: 'bg-blue-100 text-blue-800 border-blue-200' },
        walk_in: { label: 'Walk-in', className: 'bg-purple-100 text-purple-800 border-purple-200' },
    };
    return (_jsx(Badge, { className: config[method].className, children: config[method].label }));
};
const QRCodeDisplay = ({ qrCode, onRefresh }) => (_jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "inline-block p-4 bg-white rounded-lg shadow-sm border", children: _jsx("div", { className: "w-48 h-48 bg-[var(--hive-background-secondary)] rounded-lg flex items-center justify-center", children: _jsx("div", { className: "grid grid-cols-8 gap-1", children: Array.from({ length: 64 }).map((_, i) => (_jsx("div", { className: `w-2 h-2 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}` }, i))) }) }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-900 mb-1", children: "Event Check-in QR Code" }), _jsx("p", { className: "text-xs text-gray-500 mb-3", children: "Scan this code to check attendees in quickly" }), _jsxs(Button, { size: "sm", variant: "secondary", onClick: onRefresh, children: [_jsx(RefreshCw, { className: "w-3 h-3 mr-1" }), "Refresh Code"] })] })] }));
const QRScanner = ({ isActive, onScan, onClose }) => {
    const videoRef = useRef(null);
    const [hasCamera, setHasCamera] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (!isActive)
            return;
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setHasCamera(true);
                }
            }
            catch (err) {
                setError('Camera access denied or not available');
                setHasCamera(false);
            }
        };
        startCamera();
        return () => {
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isActive]);
    if (!isActive)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Scan QR Code" }), _jsx(Button, { size: "sm", variant: "secondary", onClick: onClose, children: _jsx(EyeOff, { className: "w-4 h-4" }) })] }), error ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-red-400 mx-auto mb-4" }), _jsx("p", { className: "text-red-600 mb-4", children: error }), _jsx(Button, { onClick: onClose, children: "Close" })] })) : hasCamera ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx("video", { ref: videoRef, autoPlay: true, playsInline: true, className: "w-full h-64 object-cover rounded-lg bg-[var(--hive-background-secondary)]" }), _jsxs("div", { className: "absolute inset-0 border-2 border-amber-400 rounded-lg pointer-events-none", children: [_jsx("div", { className: "absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400" }), _jsx("div", { className: "absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400" }), _jsx("div", { className: "absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400" }), _jsx("div", { className: "absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400" })] })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)] text-center", children: "Position the QR code within the yellow frame" }), _jsx(Button, { className: "w-full", onClick: () => {
                                onScan('mock_qr_code_user_123');
                                onClose();
                            }, children: "Simulate Successful Scan" })] })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(Camera, { className: "w-12 h-12 text-gray-400 mx-auto mb-4 animate-pulse" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Starting camera..." })] }))] }) }));
};
const ManualCheckinModal = ({ isOpen, rsvps, onCheckin, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [guestCount, setGuestCount] = useState(0);
    const uncheckedRSVPs = rsvps.filter(rsvp => !rsvp.checkedIn && rsvp.status === 'yes');
    const filteredRSVPs = uncheckedRSVPs.filter(rsvp => rsvp.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rsvp.userEmail.toLowerCase().includes(searchQuery.toLowerCase()));
    const handleCheckin = () => {
        if (selectedUser) {
            onCheckin(selectedUser, guestCount);
            setSelectedUser(null);
            setGuestCount(0);
            setSearchQuery('');
            onClose();
        }
    };
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-hidden flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Manual Check-in" }), _jsx(Button, { size: "sm", variant: "secondary", onClick: onClose, children: "Close" })] }), _jsxs("div", { className: "space-y-4 flex-1 overflow-hidden", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search attendees...", className: "w-full pl-10 pr-4 py-2 border border-[var(--hive-border-default)] rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsx("div", { className: "flex-1 overflow-y-auto max-h-64", children: filteredRSVPs.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Users, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-gray-500 text-sm", children: searchQuery ? 'No attendees found' : 'All attendees have been checked in' })] })) : (_jsx("div", { className: "space-y-2", children: filteredRSVPs.map((rsvp) => (_jsxs("button", { onClick: () => {
                                        setSelectedUser(rsvp.userId);
                                        setGuestCount(rsvp.guestCount);
                                    }, className: cn("w-full p-3 text-left rounded-lg border transition-colors", selectedUser === rsvp.userId
                                        ? "border-amber-500 bg-amber-50"
                                        : "border-gray-200 hover:border-[var(--hive-border-default)]"), children: [_jsx("div", { className: "font-medium text-gray-900", children: rsvp.userName }), _jsx("div", { className: "text-sm text-gray-500", children: rsvp.userEmail }), rsvp.guestCount > 0 && (_jsxs("div", { className: "text-xs text-gray-400", children: ["+", rsvp.guestCount, " guests"] }))] }, rsvp.id))) })) }), selectedUser && (_jsx("div", { className: "pt-4 border-t", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium", children: "Guest count:" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setGuestCount(Math.max(0, guestCount - 1)), className: "w-8 h-8 rounded-full border border-[var(--hive-border-default)] flex items-center justify-center text-[var(--hive-text-muted)] hover:bg-gray-50", children: "-" }), _jsx("span", { className: "w-8 text-center", children: guestCount }), _jsx("button", { onClick: () => setGuestCount(guestCount + 1), className: "w-8 h-8 rounded-full border border-[var(--hive-border-default)] flex items-center justify-center text-[var(--hive-text-muted)] hover:bg-gray-50", children: "+" })] })] }) }))] }), _jsx("div", { className: "pt-4 border-t", children: _jsxs(Button, { onClick: handleCheckin, disabled: !selectedUser, className: "w-full", children: [_jsx(UserCheck, { className: "w-4 h-4 mr-2" }), "Check In"] }) })] }) }));
};
export function EventCheckinTool({ event, rsvps, onCheckin, onGenerateQR, onExportAttendance }) {
    const [viewMode, setViewMode] = useState('dashboard');
    const [qrCode, setQRCode] = useState('');
    const [checkinEntries, setCheckinEntries] = useState([]);
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [showManualModal, setShowManualModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    // Calculate stats
    const stats = React.useMemo(() => {
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
        const mockEntries = rsvps
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
        }
        catch (error) {
            console.error('Failed to generate QR code:', error);
        }
    }, [event.id, onGenerateQR]);
    const handleQRScan = useCallback(async (scannedCode) => {
        try {
            // Mock QR scan processing
            const userId = scannedCode.replace('mock_qr_code_user_', '');
            await onCheckin(userId);
            // Add to checkin entries
            const newEntry = {
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
        }
        catch (error) {
            console.error('Failed to process QR scan:', error);
        }
    }, [onCheckin, event.startDate]);
    const handleManualCheckin = useCallback(async (userId, guestCount = 0) => {
        try {
            await onCheckin(userId, guestCount);
            const rsvp = rsvps.find(r => r.userId === userId);
            if (rsvp) {
                const newEntry = {
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
        }
        catch (error) {
            console.error('Failed to check in attendee:', error);
        }
    }, [onCheckin, rsvps, event.startDate]);
    const filteredEntries = checkinEntries.filter(entry => !searchQuery ||
        entry.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.userEmail.toLowerCase().includes(searchQuery.toLowerCase()));
    // Initialize QR code on mount
    useEffect(() => {
        if (viewMode === 'qr' && !qrCode) {
            handleGenerateQR();
        }
    }, [viewMode, qrCode, handleGenerateQR]);
    if (viewMode === 'qr') {
        return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "QR Code Check-in" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Display this code for attendees to scan" })] }), _jsx(Button, { onClick: () => setViewMode('dashboard'), children: "Back to Dashboard" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsx(Card, { className: "p-8", children: _jsx(QRCodeDisplay, { qrCode: qrCode, onRefresh: handleGenerateQR }) }), _jsxs(Card, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Instructions" }), _jsxs("div", { className: "space-y-4 text-sm", children: [_jsxs("div", { className: "flex gap-3", children: [_jsx(Monitor, { className: "w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Display Mode" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Show this screen on a large display at the entrance" })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Smartphone, { className: "w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Attendee Scanning" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Attendees scan with their phone camera or any QR scanner app" })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(RefreshCw, { className: "w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Security" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Code refreshes every 5 minutes for security" })] })] })] }), _jsxs("div", { className: "mt-6 p-4 bg-amber-50 rounded-lg", children: [_jsx("h4", { className: "font-medium text-amber-800 mb-1", children: "Live Stats" }), _jsxs("p", { className: "text-sm text-amber-700", children: [stats.checkedIn, " checked in \u2022 ", stats.totalExpected - stats.checkedIn, " remaining"] })] })] })] })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Event Check-in" }), _jsxs("p", { className: "text-[var(--hive-text-muted)]", children: ["Real-time attendance tracking for ", event.title] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Button, { variant: "secondary", onClick: () => onExportAttendance?.('csv'), children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export"] }), _jsxs(Button, { onClick: () => setShowManualModal(true), children: [_jsx(UserCheck, { className: "w-4 h-4 mr-2" }), "Manual Check-in"] })] })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4", children: [_jsxs(Card, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: stats.checkedIn }), _jsx("div", { className: "text-sm text-gray-500", children: "Checked In" })] }), _jsxs(Card, { className: "p-4 text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-green-600", children: [stats.checkinRate.toFixed(0), "%"] }), _jsx("div", { className: "text-sm text-gray-500", children: "Check-in Rate" })] }), _jsxs(Card, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: stats.onTime }), _jsx("div", { className: "text-sm text-gray-500", children: "On Time" })] }), _jsxs(Card, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-orange-600", children: stats.late }), _jsx("div", { className: "text-sm text-gray-500", children: "Late" })] }), _jsxs(Card, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-red-600", children: stats.noShow }), _jsx("div", { className: "text-sm text-gray-500", children: "No Show" })] }), _jsxs(Card, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: stats.walkIns }), _jsx("div", { className: "text-sm text-gray-500", children: "Walk-ins" })] }), _jsxs(Card, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-text-muted)]", children: stats.totalExpected }), _jsx("div", { className: "text-sm text-gray-500", children: "Expected" })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(Card, { className: "p-6 cursor-pointer hover:shadow-md transition-shadow", onClick: () => setViewMode('qr'), children: _jsxs("div", { className: "text-center", children: [_jsx(QrCode, { className: "w-12 h-12 text-amber-500 mx-auto mb-4" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "QR Code Display" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Show QR code for attendees to scan themselves" })] }) }), _jsx(Card, { className: "p-6 cursor-pointer hover:shadow-md transition-shadow", onClick: () => setShowQRScanner(true), children: _jsxs("div", { className: "text-center", children: [_jsx(Scan, { className: "w-12 h-12 text-green-500 mx-auto mb-4" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Scan QR Codes" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Use camera to scan attendee QR codes" })] }) }), _jsx(Card, { className: "p-6 cursor-pointer hover:shadow-md transition-shadow", onClick: () => setShowManualModal(true), children: _jsxs("div", { className: "text-center", children: [_jsx(UserCheck, { className: "w-12 h-12 text-blue-500 mx-auto mb-4" }), _jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Manual Check-in" }), _jsx("p", { className: "text-sm text-[var(--hive-text-muted)]", children: "Search and check in attendees manually" })] }) })] }), _jsx(Card, { children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Recent Check-ins" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" }), _jsx("input", { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search check-ins...", className: "pl-10 pr-4 py-2 border border-[var(--hive-border-default)] rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] })] }), _jsx("div", { className: "space-y-3", children: filteredEntries.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Clock, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-gray-500", children: "No check-ins yet" })] })) : (filteredEntries.slice(0, 10).map((entry) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-green-100 rounded-full flex items-center justify-center", children: _jsx(CheckCircle, { className: "w-4 h-4 text-green-600" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: entry.userName }), _jsx("p", { className: "text-sm text-gray-500", children: entry.userEmail })] })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm", children: [_jsx(CheckinMethodBadge, { method: entry.method }), entry.guestCount > 0 && (_jsxs("span", { className: "text-gray-500", children: ["+", entry.guestCount] })), entry.wasLate && (_jsx(Badge, { className: "bg-orange-100 text-orange-800 border-orange-200", children: "Late" })), _jsx("span", { className: "text-gray-500", children: entry.checkedInAt.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }) })] })] }, entry.id)))) }), filteredEntries.length > 10 && (_jsx("div", { className: "text-center mt-4", children: _jsxs("p", { className: "text-sm text-gray-500", children: ["Showing 10 of ", filteredEntries.length, " check-ins"] }) }))] }) }), _jsx(QRScanner, { isActive: showQRScanner, onScan: handleQRScan, onClose: () => setShowQRScanner(false) }), _jsx(ManualCheckinModal, { isOpen: showManualModal, rsvps: rsvps, onCheckin: handleManualCheckin, onClose: () => setShowManualModal(false) })] }));
}
export default EventCheckinTool;
//# sourceMappingURL=event-checkin-tool.js.map