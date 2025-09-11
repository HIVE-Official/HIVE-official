"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Progress, Input } from '../atoms';
import { Card } from '../molecules';
import { UserPlus, Users, Mail, MessageCircle, Copy, CheckCircle, ChevronRight, Sparkles, Heart, Link, QrCode, Clock, Award, Target } from 'lucide-react';
const InvitationMethodStep = ({ onComplete, userProfile }) => {
    const [invitesSent, setInvitesSent] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState('');
    const [inviteCode] = useState('HIVE-' + Math.random().toString(36).substr(2, 8).toUpperCase());
    const [shareableLink] = useState(`https://hive.college/join/${inviteCode}`);
    const [copied, setCopied] = useState(false);
    const maxInvites = 5; // Limited invitations create scarcity
    const inviteMethods = [
        {
            id: 'direct_link',
            title: 'Share Invite Link',
            description: 'Share your personal invite link with friends',
            icon: Link,
            action: 'Copy Link'
        },
        {
            id: 'text_message',
            title: 'Text Message',
            description: 'Send invites via SMS or messaging apps',
            icon: MessageCircle,
            action: 'Compose Message'
        },
        {
            id: 'email',
            title: 'Email Invitation',
            description: 'Send personalized email invitations',
            icon: Mail,
            action: 'Send Email'
        },
        {
            id: 'qr_code',
            title: 'QR Code',
            description: 'Generate a QR code for easy sharing',
            icon: QrCode,
            action: 'Generate QR'
        }
    ];
    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareableLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const handleSendInvite = (method) => {
        if (invitesSent < maxInvites) {
            setInvitesSent(prev => prev + 1);
            // Simulate sending invite
        }
    };
    const isComplete = invitesSent >= 2; // Require at least 2 invites sent
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[var(--hive-gold)] to-pink-500 rounded-full flex items-center justify-center", children: _jsx(UserPlus, { className: "h-10 w-10 text-[var(--hive-text-inverse)]" }) }), _jsx("h3", { className: "text-2xl font-bold text-hive-text-primary mb-2", children: "Invite Your Friends" }), _jsxs("p", { className: "text-hive-text-secondary", children: ["You have ", maxInvites, " exclusive invitations to share"] })] }), _jsxs(Card, { className: "p-4 bg-gradient-to-r from-[var(--hive-gold)]/10 to-pink-500/10 border-[var(--hive-gold)]/20", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-hive-text-primary", children: "Invitations Remaining" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Limited time exclusive access" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-3xl font-bold text-[var(--hive-gold)]", children: maxInvites - invitesSent }), _jsxs("div", { className: "text-xs text-hive-text-secondary", children: ["out of ", maxInvites] })] })] }), _jsx(Progress, { value: (invitesSent / maxInvites) * 100, className: "h-2 mt-3" })] }), _jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-hive-gold/20 rounded-lg flex items-center justify-center", children: _jsx(Link, { className: "h-5 w-5 text-hive-gold" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-hive-text-primary", children: "Your Personal Invite Link" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Share this link to invite friends" })] })] }), _jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [_jsx(Input, { value: shareableLink, readOnly: true, className: "flex-1 font-mono text-sm" }), _jsx(Button, { onClick: handleCopyLink, variant: "secondary", className: `px-4 ${copied ? 'text-green-400 border-green-400' : ''}`, children: copied ? _jsx(CheckCircle, { className: "h-4 w-4" }) : _jsx(Copy, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "bg-hive-surface-elevated p-4 rounded-lg", children: [_jsx("h5", { className: "font-medium text-hive-text-primary mb-2", children: "Invite Preview:" }), _jsxs("div", { className: "text-sm text-hive-text-secondary italic", children: ["\"Hey! I'm using HIVE to prepare for campus life at UB. It's helping me find study groups, connect with people in my major, and get ready for the semester. Want to join me? Use my invite link: ", shareableLink, "\""] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: inviteMethods.map(method => {
                    const IconComponent = method.icon;
                    return (_jsx(Card, { className: "p-4 cursor-pointer hover:border-[var(--hive-gold)]/50 transition-colors", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-gold)]/20 rounded-lg flex items-center justify-center", children: _jsx(IconComponent, { className: "h-5 w-5 text-[var(--hive-gold)]" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-1", children: method.title }), _jsx("p", { className: "text-sm text-hive-text-secondary mb-3", children: method.description }), _jsxs(Button, { size: "sm", onClick: () => handleSendInvite(method.id), disabled: invitesSent >= maxInvites, className: "bg-[var(--hive-gold)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-gold-dark)]", children: [method.action, _jsx(ChevronRight, { className: "h-3 w-3 ml-1" })] })] })] }) }, method.id));
                }) }), _jsx(Card, { className: "p-4 bg-hive-surface-elevated", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(Users, { className: "h-5 w-5 text-hive-brand-secondary" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-hive-text-primary", children: "1,247 students are already preparing for fall semester" }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: "Your friends will thank you for the early access" })] })] }) }), _jsxs("div", { className: "bg-hive-surface-elevated p-4 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-hive-text-secondary", children: "Invites sent:" }), _jsxs("span", { className: `font-semibold ${isComplete ? 'text-green-400' : 'text-hive-text-secondary'}`, children: [invitesSent, "/2+ required"] })] }), isComplete && (_jsxs("div", { className: "flex items-center space-x-2 text-green-400 text-sm", children: [_jsx(CheckCircle, { className: "h-4 w-4" }), _jsx("span", { children: "Great! You've helped grow the HIVE community" })] }))] }), _jsxs(Button, { onClick: () => onComplete({ invitesSent, inviteCode }), disabled: !isComplete, className: "w-full bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90", children: ["Complete Connect Ritual", _jsx(Sparkles, { className: "h-4 w-4 ml-2" })] })] }));
};
export function RitualConnectWorkflow({ currentStep = 0, onStepComplete, onRitualComplete, userProfile = { name: 'Student', handle: '@student', interests: [] }, className = '' }) {
    const [isComplete, setIsComplete] = useState(false);
    const [connectData, setConnectData] = useState({});
    const handleStepComplete = (data) => {
        setConnectData(data);
        onStepComplete?.('friend_invitations', data);
        setIsComplete(true);
        onRitualComplete?.();
    };
    if (isComplete) {
        return (_jsx("div", { className: `space-y-8 ${className}`, children: _jsxs(Card, { className: "p-8 text-center bg-gradient-to-br from-[var(--hive-gold)]/10 to-pink-500/10 border-[var(--hive-gold)]/30", children: [_jsx("div", { className: "w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[var(--hive-gold)] to-pink-500 rounded-full flex items-center justify-center", children: _jsx(CheckCircle, { className: "h-12 w-12 text-[var(--hive-text-inverse)]" }) }), _jsx("h2", { className: "text-3xl font-bold text-hive-text-primary mb-4", children: "Connect Ritual Complete!" }), _jsxs("p", { className: "text-hive-text-secondary text-lg mb-6", children: ["Awesome! You've sent ", connectData.invitesSent, " invitations to help your friends join HIVE. Your social graph is being built and your Connections Widget will be populated as friends accept your invites."] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(UserPlus, { className: "h-8 w-8 mx-auto mb-2 text-[var(--hive-gold)]" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Invites Sent" }), _jsxs("p", { className: "text-sm text-hive-text-secondary", children: [connectData.invitesSent, " friends invited"] })] }), _jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(Heart, { className: "h-8 w-8 mx-auto mb-2 text-pink-400" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Social Graph" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Building connections" })] }), _jsxs("div", { className: "p-4 bg-hive-surface-elevated rounded-lg", children: [_jsx(Award, { className: "h-8 w-8 mx-auto mb-2 text-green-400" }), _jsx("h3", { className: "font-semibold text-hive-text-primary", children: "Community Builder" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Badge earned" })] })] }), _jsxs("div", { className: "bg-hive-gold/10 p-4 rounded-lg mb-6", children: [_jsxs("div", { className: "flex items-center justify-center space-x-2 text-hive-gold mb-2", children: [_jsx(Sparkles, { className: "h-4 w-4" }), _jsxs("span", { className: "font-medium", children: ["Invite Code: ", connectData.inviteCode] })] }), _jsx("p", { className: "text-xs text-hive-text-secondary", children: "Save this code - you can share it later too!" })] }), _jsxs("div", { className: "flex items-center justify-center space-x-2 text-[var(--hive-gold)]", children: [_jsx(Target, { className: "h-5 w-5" }), _jsx("span", { className: "font-medium", children: "Ready for Week 4: Launch Preparation" })] })] }) }));
    }
    return (_jsxs("div", { className: `space-y-8 ${className}`, children: [_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-hive-text-primary", children: "Connect Ritual" }), _jsx("p", { className: "text-hive-text-secondary", children: "Week 3 \u2022 Build your network" })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "flex items-center space-x-2 text-hive-text-secondary text-sm", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: "~10 minutes" })] }) })] }), _jsx("div", { className: "bg-[var(--hive-gold)]/10 p-4 rounded-lg border border-[var(--hive-gold)]/20", children: _jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Users, { className: "h-5 w-5 text-[var(--hive-gold)] mt-0.5" }), _jsxs("div", { children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-1", children: "Limited Invitation Access" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "HIVE is currently invite-only for the summer preparation period. Your 5 exclusive invitations help build our initial campus community before the public launch." })] })] }) })] }), _jsx(Card, { className: "p-8", children: _jsx(InvitationMethodStep, { onComplete: handleStepComplete, userProfile: userProfile }) })] }));
}
//# sourceMappingURL=ritual-connect-workflow.js.map