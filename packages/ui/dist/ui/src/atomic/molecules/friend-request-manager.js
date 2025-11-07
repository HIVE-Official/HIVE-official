"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, UserCheck, UserX, Send, Clock, 
// Check,
X, MessageCircle, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils.js';
import { Button } from '../atoms/button.js';
import { Avatar } from '../atoms/avatar.js';
import { Badge } from '../atoms/badge.js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../atoms/tabs.js';
export const FriendRequestManager = ({ 
// userId & onSendRequest may be handled internally in future; not directly used here
onAcceptRequest, onRejectRequest, onCancelRequest, className = '' }) => {
    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingRequest, setProcessingRequest] = useState(null);
    // Fetch friend requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                // Fetch received requests
                const receivedResponse = await fetch('/api/friends/request?type=received');
                const receivedData = await receivedResponse.json();
                setReceivedRequests(receivedData.requests || []);
                // Fetch sent requests
                const sentResponse = await fetch('/api/friends/request?type=sent');
                const sentData = await sentResponse.json();
                setSentRequests(sentData.requests || []);
            }
            catch (error) {
                console.error('Error fetching friend requests:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);
    const handleAccept = async (requestId) => {
        if (!onAcceptRequest)
            return;
        setProcessingRequest(requestId);
        try {
            await onAcceptRequest(requestId);
            // Remove from received requests
            setReceivedRequests(prev => prev.filter(r => r.id !== requestId));
        }
        catch (error) {
            console.error('Error accepting request:', error);
        }
        finally {
            setProcessingRequest(null);
        }
    };
    const handleReject = async (requestId) => {
        if (!onRejectRequest)
            return;
        setProcessingRequest(requestId);
        try {
            await onRejectRequest(requestId);
            // Remove from received requests
            setReceivedRequests(prev => prev.filter(r => r.id !== requestId));
        }
        catch (error) {
            console.error('Error rejecting request:', error);
        }
        finally {
            setProcessingRequest(null);
        }
    };
    const handleCancel = async (requestId) => {
        if (!onCancelRequest)
            return;
        setProcessingRequest(requestId);
        try {
            await onCancelRequest(requestId);
            // Remove from sent requests
            setSentRequests(prev => prev.filter(r => r.id !== requestId));
        }
        catch (error) {
            console.error('Error cancelling request:', error);
        }
        finally {
            setProcessingRequest(null);
        }
    };
    const RequestCard = ({ request, type }) => {
        const isProcessing = processingRequest === request.id;
        const displayName = type === 'received' ? request.fromUserName : request.toUserName;
        const displayAvatar = type === 'received' ? request.fromUserAvatar : request.toUserAvatar;
        return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, x: -100 }, className: "p-4 bg-hive-background-secondary rounded-lg border border-hive-border hover:border-hive-brand-gold/30 transition-colors", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsxs(Avatar, { className: "w-12 h-16", children: [" ", displayAvatar ? (_jsx("img", { src: displayAvatar, alt: displayName, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-gradient-to-br from-hive-brand-gold/20 to-hive-brand-gold/10 flex items-center justify-center", children: _jsx(Users, { className: "w-6 h-6 text-hive-brand-gold" }) }))] }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-medium text-hive-foreground truncate", children: displayName }), _jsxs(Badge, { variant: "secondary", className: "text-xs", children: [_jsx(Clock, { className: "w-3 h-3 mr-1" }), getTimeAgo(request.createdAt)] })] }), request.message && (_jsxs("p", { className: "text-sm text-hive-text-secondary mb-2 line-clamp-2", children: [_jsx(MessageCircle, { className: "w-3 h-3 inline mr-1" }), request.message] })), _jsx("div", { className: "flex gap-2", children: type === 'received' ? (_jsxs(_Fragment, { children: [_jsx(Button, { size: "sm", variant: "default", onClick: () => handleAccept(request.id), disabled: isProcessing, className: "bg-hive-brand-gold hover:bg-hive-brand-gold-light text-black", children: isProcessing ? (_jsx("div", { className: "w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" })) : (_jsxs(_Fragment, { children: [_jsx(UserCheck, { className: "w-4 h-4 mr-1" }), "Accept"] })) }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => handleReject(request.id), disabled: isProcessing, children: isProcessing ? (_jsx("div", { className: "w-4 h-4 border-2 border-hive-foreground/30 border-t-hive-foreground rounded-full animate-spin" })) : (_jsxs(_Fragment, { children: [_jsx(UserX, { className: "w-4 h-4 mr-1" }), "Decline"] })) })] })) : (_jsx(Button, { size: "sm", variant: "outline", onClick: () => handleCancel(request.id), disabled: isProcessing, children: isProcessing ? (_jsx("div", { className: "w-4 h-4 border-2 border-hive-foreground/30 border-t-hive-foreground rounded-full animate-spin" })) : (_jsxs(_Fragment, { children: [_jsx(X, { className: "w-4 h-4 mr-1" }), "Cancel Request"] })) })) })] })] }) }));
    };
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-semibold text-hive-foreground flex items-center gap-2", children: [_jsx(Users, { className: "w-5 h-5 text-hive-brand-gold" }), "Friend Requests"] }), receivedRequests.length > 0 && (_jsxs(Badge, { className: "bg-hive-brand-gold text-black", children: [receivedRequests.length, " new"] }))] }), _jsxs(Tabs, { defaultValue: "received", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsxs(TabsTrigger, { value: "received", className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "w-4 h-4" }), "Received (", receivedRequests.length, ")"] }), _jsxs(TabsTrigger, { value: "sent", className: "flex items-center gap-2", children: [_jsx(Send, { className: "w-4 h-4" }), "Sent (", sentRequests.length, ")"] })] }), _jsx(TabsContent, { value: "received", className: "space-y-3", children: loading ? (_jsx("div", { className: "py-8 text-center text-hive-text-secondary", children: "Loading requests..." })) : receivedRequests.length === 0 ? (_jsxs("div", { className: "py-8 text-center", children: [_jsx(UserPlus, { className: "w-12 h-12 text-hive-text-tertiary mx-auto mb-3" }), _jsx("p", { className: "text-hive-text-secondary", children: "No pending friend requests" }), _jsx("p", { className: "text-sm text-hive-text-tertiary mt-1", children: "When someone wants to be friends, you'll see it here" })] })) : (_jsx(AnimatePresence, { mode: "popLayout", children: receivedRequests.map(request => (_jsx(RequestCard, { request: request, type: "received" }, request.id))) })) }), _jsx(TabsContent, { value: "sent", className: "space-y-3", children: loading ? (_jsx("div", { className: "py-8 text-center text-hive-text-secondary", children: "Loading requests..." })) : sentRequests.length === 0 ? (_jsxs("div", { className: "py-8 text-center", children: [_jsx(Send, { className: "w-12 h-12 text-hive-text-tertiary mx-auto mb-3" }), _jsx("p", { className: "text-hive-text-secondary", children: "No pending requests sent" }), _jsx("p", { className: "text-sm text-hive-text-tertiary mt-1", children: "Friend requests you've sent will appear here" })] })) : (_jsx(AnimatePresence, { mode: "popLayout", children: sentRequests.map(request => (_jsx(RequestCard, { request: request, type: "sent" }, request.id))) })) })] }), (receivedRequests.length + sentRequests.length) >= 5 && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, className: "bg-gradient-to-r from-hive-brand-gold/10 to-hive-brand-gold/5 rounded-lg p-3 border border-hive-brand-gold/20", children: _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Sparkles, { className: "w-4 h-4 text-hive-brand-gold" }), _jsx("span", { className: "text-hive-foreground font-medium", children: "You're building your network!" }), _jsx("span", { className: "text-hive-text-secondary", children: "Active friend requests show you're connected on campus" })] }) }))] }));
};
// Helper function to format time ago
function getTimeAgo(date) {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0)
        return `${days}d ago`;
    if (hours > 0)
        return `${hours}h ago`;
    if (minutes > 0)
        return `${minutes}m ago`;
    return 'Just now';
}
//# sourceMappingURL=friend-request-manager.js.map