'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { X, Type, Calendar, BarChart3, Megaphone, Plus, Minus, Eye, EyeOff, AlertCircle, CheckCircle, Send } from 'lucide-react';
const POST_TYPES = [
    {
        type: 'text',
        label: 'Text Post',
        description: 'Share thoughts, questions, or updates',
        icon: _jsx(Type, { className: "w-5 h-5" }),
        color: 'text-[var(--hive-text-primary)]',
        bgColor: 'bg-[var(--hive-background-secondary)]/60',
        borderColor: 'border-[var(--hive-border-primary)]/30',
    },
    {
        type: 'event',
        label: 'Event',
        description: 'Schedule meetings, activities, or gatherings',
        icon: _jsx(Calendar, { className: "w-5 h-5" }),
        color: 'text-[var(--hive-brand-primary)]',
        bgColor: 'bg-[var(--hive-brand-primary)]/10',
        borderColor: 'border-[var(--hive-brand-primary)]/30',
    },
    {
        type: 'poll',
        label: 'Poll',
        description: 'Gather opinions and make group decisions',
        icon: _jsx(BarChart3, { className: "w-5 h-5" }),
        color: 'text-[var(--hive-status-info)]',
        bgColor: 'bg-[var(--hive-status-info)]/10',
        borderColor: 'border-[var(--hive-status-info)]/30',
    },
    {
        type: 'announcement',
        label: 'Announcement',
        description: 'Important notices and updates',
        icon: _jsx(Megaphone, { className: "w-5 h-5" }),
        color: 'text-[var(--hive-status-warning)]',
        bgColor: 'bg-[var(--hive-status-warning)]/10',
        borderColor: 'border-[var(--hive-status-warning)]/30',
        requiredRole: 'co_leader',
    },
];
const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low Priority', color: 'text-gray-400' },
    { value: 'medium', label: 'Medium Priority', color: 'text-blue-400' },
    { value: 'high', label: 'High Priority', color: 'text-orange-400' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-400' },
];
export const PostCreationModal = ({ isOpen, onClose, onSubmit, spaceType, userRole = 'member', initialType = 'text', isSubmitting = false, className }) => {
    const [selectedType, setSelectedType] = useState(initialType);
    const [content, setContent] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [errors, setErrors] = useState({});
    // Event fields
    const [eventTitle, setEventTitle] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventCapacity, setEventCapacity] = useState();
    const [requireRsvp, setRequireRsvp] = useState(true);
    // Poll fields
    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState(['', '']);
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [pollExpiresIn, setPollExpiresIn] = useState(7);
    const [anonymousPoll, setAnonymousPoll] = useState(false);
    // Announcement fields
    const [announcementPriority, setAnnouncementPriority] = useState('medium');
    const [pinnedAnnouncement, setPinnedAnnouncement] = useState(false);
    const [announcementExpires, setAnnouncementExpires] = useState('');
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const canCreateType = (type) => {
        const typeConfig = POST_TYPES.find(t => t.type === type);
        if (!typeConfig?.requiredRole)
            return true;
        if (typeConfig.requiredRole === 'co_leader') {
            return userRole === 'leader' || userRole === 'co_leader';
        }
        return userRole === typeConfig.requiredRole;
    };
    const validateForm = () => {
        const newErrors = {};
        if (!content.trim()) {
            newErrors.content = 'Content is required';
        }
        if (selectedType === 'event') {
            if (!eventTitle.trim())
                newErrors.eventTitle = 'Event title is required';
            if (!eventDate)
                newErrors.eventDate = 'Event date is required';
            if (!eventTime)
                newErrors.eventTime = 'Event time is required';
        }
        if (selectedType === 'poll') {
            if (!pollQuestion.trim())
                newErrors.pollQuestion = 'Poll question is required';
            const validOptions = pollOptions.filter(opt => opt.trim());
            if (validOptions.length < 2) {
                newErrors.pollOptions = 'At least 2 poll options are required';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async () => {
        if (!validateForm())
            return;
        const data = {
            type: selectedType,
            content: content.trim(),
        };
        if (selectedType === 'event') {
            data.event = {
                title: eventTitle.trim(),
                date: eventDate,
                time: eventTime,
                location: eventLocation.trim() || undefined,
                description: eventDescription.trim() || undefined,
                capacity: eventCapacity,
                requireRsvp,
            };
        }
        if (selectedType === 'poll') {
            data.poll = {
                question: pollQuestion.trim(),
                options: pollOptions.filter(opt => opt.trim()),
                allowMultiple,
                expiresIn: pollExpiresIn,
                anonymous: anonymousPoll,
            };
        }
        if (selectedType === 'announcement') {
            data.announcement = {
                priority: announcementPriority,
                pinned: pinnedAnnouncement,
                expiresAt: announcementExpires || undefined,
            };
        }
        try {
            await onSubmit(data);
            handleClose();
        }
        catch (error) {
            console.error('Failed to create post:', error);
        }
    };
    const handleClose = () => {
        setContent('');
        setEventTitle('');
        setEventDate('');
        setEventTime('');
        setEventLocation('');
        setEventDescription('');
        setEventCapacity(undefined);
        setPollQuestion('');
        setPollOptions(['', '']);
        setErrors({});
        onClose();
    };
    const addPollOption = () => {
        if (pollOptions.length < 6) {
            setPollOptions([...pollOptions, '']);
        }
    };
    const removePollOption = (index) => {
        if (pollOptions.length > 2) {
            setPollOptions(pollOptions.filter((_, i) => i !== index));
        }
    };
    const updatePollOption = (index, value) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };
    if (!isOpen)
        return null;
    return (_jsx(AnimatePresence, { children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: handleClose, className: "absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: cn('relative w-full max-w-2xl max-h-[90vh] overflow-hidden', 'bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95', 'backdrop-blur-xl border border-[var(--hive-border-primary)]/30', 'rounded-3xl shadow-2xl', className), children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-[var(--hive-border-primary)]/20", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Create Post" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: "Share something with your community" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => setShowPreview(!showPreview), className: cn('w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200', showPreview
                                                ? 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30'
                                                : 'bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]/30 hover:text-[var(--hive-text-primary)]'), children: showPreview ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) }), _jsx("button", { onClick: handleClose, className: "w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200", children: _jsx(X, { className: "w-5 h-5" }) })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary)] mb-3", children: "Post Type" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: POST_TYPES.map((type) => {
                                                const isDisabled = !canCreateType(type.type);
                                                return (_jsxs(motion.button, { whileHover: !isDisabled ? { scale: 1.02 } : {}, whileTap: !isDisabled ? { scale: 0.98 } : {}, onClick: () => !isDisabled && setSelectedType(type.type), disabled: isDisabled, className: cn('p-4 rounded-xl border transition-all duration-200 text-left', selectedType === type.type
                                                        ? `${type.bgColor} ${type.borderColor} ${type.color}`
                                                        : 'bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20 text-[var(--hive-text-secondary)]', !isDisabled && 'hover:border-[var(--hive-brand-primary)]/30', isDisabled && 'opacity-50 cursor-not-allowed'), children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [type.icon, _jsx("span", { className: "font-medium", children: type.label }), isDisabled && _jsx(AlertCircle, { className: "w-4 h-4 text-[var(--hive-status-warning)]" })] }), _jsx("p", { className: "text-xs opacity-80", children: type.description })] }, type.type));
                                            }) })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-semibold text-[var(--hive-text-primary)] mb-2", children: [selectedType === 'poll' ? 'Poll Description' : 'Content', _jsx("span", { className: "text-[var(--hive-status-error)]", children: "*" })] }), _jsx("textarea", { ref: textareaRef, value: content, onChange: (e) => setContent(e.target.value), placeholder: selectedType === 'event'
                                                ? 'Describe your event and what people can expect...'
                                                : selectedType === 'poll'
                                                    ? 'Provide context or details about your poll...'
                                                    : selectedType === 'announcement'
                                                        ? 'Share your important announcement...'
                                                        : 'What\'s on your mind?', rows: 4, className: cn('w-full px-4 py-3 rounded-xl border resize-none transition-all duration-200', 'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]', 'placeholder:text-[var(--hive-text-muted)]', 'focus:outline-none focus:ring-0', errors.content
                                                ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                                                : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50') }), errors.content && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)] mt-1", children: errors.content }))] }), selectedType === 'event' && (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: "Event Details" }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: ["Event Title ", _jsx("span", { className: "text-[var(--hive-status-error)]", children: "*" })] }), _jsx("input", { type: "text", value: eventTitle, onChange: (e) => setEventTitle(e.target.value), placeholder: "Enter event title", className: cn('w-full px-4 py-3 rounded-xl border transition-all duration-200', 'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]', 'placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0', errors.eventTitle
                                                        ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                                                        : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50') }), errors.eventTitle && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)] mt-1", children: errors.eventTitle }))] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: ["Date ", _jsx("span", { className: "text-[var(--hive-status-error)]", children: "*" })] }), _jsx("input", { type: "date", value: eventDate, onChange: (e) => setEventDate(e.target.value), className: cn('w-full px-4 py-3 rounded-xl border transition-all duration-200', 'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]', 'focus:outline-none focus:ring-0', errors.eventDate
                                                                ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                                                                : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50') }), errors.eventDate && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)] mt-1", children: errors.eventDate }))] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: ["Time ", _jsx("span", { className: "text-[var(--hive-status-error)]", children: "*" })] }), _jsx("input", { type: "time", value: eventTime, onChange: (e) => setEventTime(e.target.value), className: cn('w-full px-4 py-3 rounded-xl border transition-all duration-200', 'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]', 'focus:outline-none focus:ring-0', errors.eventTime
                                                                ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                                                                : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50') }), errors.eventTime && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)] mt-1", children: errors.eventTime }))] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Location" }), _jsx("input", { type: "text", value: eventLocation, onChange: (e) => setEventLocation(e.target.value), placeholder: "Where will this event take place?", className: "w-full px-4 py-3 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: requireRsvp, onChange: (e) => setRequireRsvp(e.target.checked), className: "w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20" }), _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: "Require RSVP" })] }), eventCapacity !== undefined && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-sm text-[var(--hive-text-primary)]", children: "Capacity:" }), _jsx("input", { type: "number", value: eventCapacity, onChange: (e) => setEventCapacity(Number(e.target.value) || undefined), min: "1", className: "w-20 px-2 py-1 rounded border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm focus:outline-none focus:border-[var(--hive-brand-primary)]/50" })] }))] })] })), selectedType === 'poll' && (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: "Poll Details" }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: ["Poll Question ", _jsx("span", { className: "text-[var(--hive-status-error)]", children: "*" })] }), _jsx("input", { type: "text", value: pollQuestion, onChange: (e) => setPollQuestion(e.target.value), placeholder: "What would you like to ask?", className: cn('w-full px-4 py-3 rounded-xl border transition-all duration-200', 'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]', 'placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0', errors.pollQuestion
                                                        ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
                                                        : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50') }), errors.pollQuestion && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)] mt-1", children: errors.pollQuestion }))] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: ["Poll Options ", _jsx("span", { className: "text-[var(--hive-status-error)]", children: "*" })] }), _jsxs("div", { className: "space-y-2", children: [pollOptions.map((option, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: option, onChange: (e) => updatePollOption(index, e.target.value), placeholder: `Option ${index + 1}`, className: "flex-1 px-4 py-2 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200" }), pollOptions.length > 2 && (_jsx("button", { onClick: () => removePollOption(index), className: "w-8 h-8 rounded-lg bg-[var(--hive-status-error)]/10 text-[var(--hive-status-error)] hover:bg-[var(--hive-status-error)]/20 transition-colors duration-200 flex items-center justify-center", children: _jsx(Minus, { className: "w-4 h-4" }) }))] }, index))), pollOptions.length < 6 && (_jsxs("button", { onClick: addPollOption, className: "flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] hover:border-[var(--hive-brand-primary)]/50 transition-all duration-200", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm", children: "Add Option" })] }))] }), errors.pollOptions && (_jsx("p", { className: "text-xs text-[var(--hive-status-error)] mt-1", children: errors.pollOptions }))] }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: allowMultiple, onChange: (e) => setAllowMultiple(e.target.checked), className: "w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20" }), _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: "Allow multiple choices" })] }), _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: anonymousPoll, onChange: (e) => setAnonymousPoll(e.target.checked), className: "w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20" }), _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: "Anonymous voting" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Poll Duration" }), _jsxs("select", { value: pollExpiresIn || '', onChange: (e) => setPollExpiresIn(Number(e.target.value) || undefined), className: "px-4 py-2 rounded-xl border border-[var(--hive-border-primary)]/30 bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] focus:outline-none focus:ring-0 focus:border-[var(--hive-brand-primary)]/50 transition-all duration-200", children: [_jsx("option", { value: "", children: "No expiration" }), _jsx("option", { value: 1, children: "1 day" }), _jsx("option", { value: 3, children: "3 days" }), _jsx("option", { value: 7, children: "1 week" }), _jsx("option", { value: 14, children: "2 weeks" }), _jsx("option", { value: 30, children: "1 month" })] })] })] })), selectedType === 'announcement' && (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary)]", children: "Announcement Settings" }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Priority Level" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: PRIORITY_OPTIONS.map((priority) => (_jsx("button", { onClick: () => setAnnouncementPriority(priority.value), className: cn('p-3 rounded-xl border transition-all duration-200 text-left', announcementPriority === priority.value
                                                            ? 'bg-[var(--hive-brand-primary)]/10 border-[var(--hive-brand-primary)]/30 text-[var(--hive-brand-primary)]'
                                                            : 'bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20 text-[var(--hive-text-secondary)] hover:border-[var(--hive-brand-primary)]/30'), children: _jsx("span", { className: cn('text-sm font-medium', priority.color), children: priority.label }) }, priority.value))) })] }), _jsx("div", { className: "flex items-center gap-4", children: _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: pinnedAnnouncement, onChange: (e) => setPinnedAnnouncement(e.target.checked), className: "w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20" }), _jsx("span", { className: "text-sm text-[var(--hive-text-primary)]", children: "Pin to top" })] }) })] }))] }), _jsxs("div", { className: "flex items-center justify-between p-6 border-t border-[var(--hive-border-primary)]/20", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-[var(--hive-text-muted)]", children: [_jsx(CheckCircle, { className: "w-4 h-4" }), _jsx("span", { children: "Draft saved automatically" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: handleClose, disabled: isSubmitting, className: "px-6 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 disabled:opacity-50", children: "Cancel" }), _jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: handleSubmit, disabled: isSubmitting || !content.trim(), className: cn('px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2', 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40', 'hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60', 'disabled:opacity-50 disabled:cursor-not-allowed'), children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" }), _jsx("span", { children: "Publishing..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Send, { className: "w-4 h-4" }), _jsxs("span", { children: ["Publish ", selectedType === 'text' ? 'Post' : selectedType === 'event' ? 'Event' : selectedType === 'poll' ? 'Poll' : 'Announcement'] })] })) })] })] })] })] }) }));
};
export default PostCreationModal;
//# sourceMappingURL=post-creation-modal.js.map