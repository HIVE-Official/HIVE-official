import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { Calendar, Clock, MapPin, Users, Star, ArrowRight, ArrowLeft, X, Upload, Music, Utensils, GraduationCap, Dumbbell, Palette, Code, Heart, Globe, Lock, MessageCircle, Sparkles, Target, Award, Zap, Building, DollarSign, Settings, Link, CalendarDays } from 'lucide-react';
// Main Event Creation Form - HIVE's flagship Event Management System
const EventCreationForm = ({ onSubmit, loading, className, editMode, eventData }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Basic Info
        title: editMode ? eventData?.title || '' : '',
        description: editMode ? eventData?.description || '' : '',
        category: editMode ? eventData?.category || '' : '',
        tags: editMode ? eventData?.tags || [] : [],
        // Date & Time
        date: editMode ? eventData?.date || '' : '',
        startTime: editMode ? eventData?.startTime || '' : '',
        endTime: editMode ? eventData?.endTime || '' : '',
        timezone: editMode ? eventData?.timezone || 'America/Los_Angeles' : 'America/Los_Angeles',
        recurring: editMode ? eventData?.recurring || false : false,
        recurrencePattern: editMode ? eventData?.recurrencePattern || '' : '',
        // Location
        locationType: editMode ? eventData?.locationType || 'physical' : 'physical',
        venue: editMode ? eventData?.venue || '' : '',
        address: editMode ? eventData?.address || '' : '',
        room: editMode ? eventData?.room || '' : '',
        virtualLink: editMode ? eventData?.virtualLink || '' : '',
        // Capacity & Access
        maxCapacity: editMode ? eventData?.maxCapacity || '' : '',
        registrationRequired: editMode ? eventData?.registrationRequired || false : false,
        visibility: editMode ? eventData?.visibility || 'campus' : 'campus',
        approvalRequired: editMode ? eventData?.approvalRequired || false : false,
        // Media & Promotion
        coverImage: editMode ? eventData?.coverImage || null : null,
        additionalImages: editMode ? eventData?.additionalImages || [] : [],
        // Campus Integration
        spaceId: editMode ? eventData?.spaceId || '' : '',
        collaborators: editMode ? eventData?.collaborators || [] : [],
        contactInfo: editMode ? eventData?.contactInfo || '' : '',
        // Advanced Options
        ticketPrice: editMode ? eventData?.ticketPrice || '' : '',
        scholarshipAvailable: editMode ? eventData?.scholarshipAvailable || false : false,
        livestreamEnabled: editMode ? eventData?.livestreamEnabled || false : false,
        networkingEnabled: editMode ? eventData?.networkingEnabled || true : true
    });
    const eventCategories = [
        { id: 'academic', label: 'Academic', icon: GraduationCap, color: 'blue' },
        { id: 'social', label: 'Social', icon: Users, color: 'purple' },
        { id: 'professional', label: 'Professional', icon: Target, color: 'green' },
        { id: 'cultural', label: 'Cultural', icon: Globe, color: 'orange' },
        { id: 'wellness', label: 'Wellness', icon: Heart, color: 'red' },
        { id: 'tech', label: 'Technology', icon: Code, color: 'cyan' },
        { id: 'arts', label: 'Arts & Creative', icon: Palette, color: 'pink' },
        { id: 'sports', label: 'Sports & Fitness', icon: Dumbbell, color: 'emerald' },
        { id: 'food', label: 'Food & Dining', icon: Utensils, color: 'yellow' },
        { id: 'entertainment', label: 'Entertainment', icon: Music, color: 'indigo' },
        { id: 'volunteer', label: 'Volunteer', icon: Star, color: 'amber' },
        { id: 'career', label: 'Career', icon: Award, color: 'teal' }
    ];
    const popularTags = [
        'study group', 'networking', 'workshop', 'party', 'competition',
        'presentation', 'discussion', 'collaboration', 'mentorship', 'hackathon',
        'concert', 'game night', 'movie screening', 'outdoor', 'fundraiser'
    ];
    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < 5) {
            setStep(step + 1);
        }
        else {
            onSubmit?.(formData);
        }
    };
    const addTag = (tag) => {
        if (!formData.tags.includes(tag)) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
        }
    };
    const removeTag = (tag) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
    };
    return (_jsx(HiveCard, { className: `w-150 ${className}`, variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4", children: _jsx(Calendar, { className: "w-8 h-8 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx(Badge, { variant: "secondary", size: "sm", className: "mb-2", children: "Event Management System" }), _jsx(Text, { variant: "heading-lg", className: "font-bold", children: editMode ? 'Edit Event' : 'Create Campus Event' }), _jsx(Text, { variant: "body-md", color: "secondary", children: editMode ? 'Update your event details' : 'Bring your campus community together' })] })] }), _jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3, 4, 5].map((num) => (_jsx("div", { className: `flex-1 h-1 rounded-full transition-colors ${num <= step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-800'}` }, num))) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs(AnimatePresence, { mode: "wait", children: [step === 1 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Event Basics" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Give your event a compelling identity" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Event Title" }), _jsx(HiveInput, { placeholder: "HIVE Campus Hackathon 2025", value: formData.title, onChange: (e) => setFormData(prev => ({ ...prev, title: e.target.value })), disabled: loading, className: "w-full", maxLength: 100 }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "Make it descriptive and engaging" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [formData.title.length, "/100"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Description" }), _jsx("textarea", { placeholder: "Describe your event, what attendees can expect, and why they should join...", value: formData.description, onChange: (e) => setFormData(prev => ({ ...prev, description: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none", rows: 4, maxLength: 500 }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Text, { variant: "body-xs", color: "secondary", children: "Include agenda, requirements, or special instructions" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [formData.description.length, "/500"] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Category" }), _jsx("div", { className: "grid grid-cols-3 gap-2 max-h-64 overflow-y-auto", children: eventCategories.map((category) => (_jsxs("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, category: category.id })), className: `p-3 rounded-lg border transition-all ${formData.category === category.id
                                                                    ? `border-${category.color}-500 bg-${category.color}-500/10`
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(category.icon, { className: "h-5 w-5 mx-auto mb-1" }), _jsx(Text, { variant: "body-xs", className: "font-medium", children: category.label })] }, category.id))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: formData.tags.map((tag, index) => (_jsxs(Badge, { variant: "secondary", size: "sm", className: "flex items-center gap-1", children: [tag, _jsx("button", { type: "button", onClick: () => removeTag(tag), className: "ml-1 hover:text-red-400", children: _jsx(X, { className: "h-3 w-3" }) })] }, index))) }), _jsx("div", { className: "flex flex-wrap gap-2", children: popularTags.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map((tag) => (_jsxs("button", { type: "button", onClick: () => addTag(tag), className: "px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full border border-[var(--hive-border-default)] transition-colors", children: ["+ ", tag] }, tag))) })] })] })] }, "basic")), step === 2 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "When & How Often" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Schedule your event timing" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Date" }), _jsx(HiveInput, { type: "date", value: formData.date, onChange: (e) => setFormData(prev => ({ ...prev, date: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Calendar, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Timezone" }), _jsxs("select", { value: formData.timezone, onChange: (e) => setFormData(prev => ({ ...prev, timezone: e.target.value })), className: "w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "America/Los_Angeles", children: "Pacific Time" }), _jsx("option", { value: "America/Denver", children: "Mountain Time" }), _jsx("option", { value: "America/Chicago", children: "Central Time" }), _jsx("option", { value: "America/New_York", children: "Eastern Time" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Start Time" }), _jsx(HiveInput, { type: "time", value: formData.startTime, onChange: (e) => setFormData(prev => ({ ...prev, startTime: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Clock, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "End Time" }), _jsx(HiveInput, { type: "time", value: formData.endTime, onChange: (e) => setFormData(prev => ({ ...prev, endTime: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Clock, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: formData.recurring, onChange: (e) => setFormData(prev => ({ ...prev, recurring: e.target.checked })), className: "rounded border-gray-600 bg-gray-800" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Recurring Event" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "This event happens regularly" })] })] }), formData.recurring && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Repeat Pattern" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: [
                                                                        { value: 'weekly', label: 'Weekly', icon: CalendarDays },
                                                                        { value: 'biweekly', label: 'Every 2 weeks', icon: CalendarDays },
                                                                        { value: 'monthly', label: 'Monthly', icon: CalendarDays },
                                                                        { value: 'custom', label: 'Custom', icon: Settings }
                                                                    ].map((pattern) => (_jsx("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, recurrencePattern: pattern.value })), className: `p-3 rounded-lg border transition-colors text-left ${formData.recurrencePattern === pattern.value
                                                                            ? 'border-purple-500 bg-purple-500/10'
                                                                            : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(pattern.icon, { className: "h-4 w-4" }), _jsx(Text, { variant: "body-sm", children: pattern.label })] }) }, pattern.value))) })] }))] })] })] }, "datetime")), step === 3 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Where It Happens" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Set the location for your event" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Location Type" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: [
                                                                { value: 'physical', label: 'In-Person', desc: 'Physical campus location', icon: Building },
                                                                { value: 'virtual', label: 'Virtual', desc: 'Online event', icon: Globe },
                                                                { value: 'hybrid', label: 'Hybrid', desc: 'Both in-person & online', icon: Zap }
                                                            ].map((type) => (_jsxs("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, locationType: type.value })), className: `p-4 rounded-lg border transition-colors text-center ${formData.locationType === type.value
                                                                    ? 'border-purple-500 bg-purple-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: [_jsx(type.icon, { className: "h-6 w-6 mx-auto mb-2" }), _jsx(Text, { variant: "body-sm", className: "font-medium", children: type.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: type.desc })] }, type.value))) })] }), (formData.locationType === 'physical' || formData.locationType === 'hybrid') && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Venue Name" }), _jsx(HiveInput, { placeholder: "Student Union Building", value: formData.venue, onChange: (e) => setFormData(prev => ({ ...prev, venue: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Building, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Room/Area" }), _jsx(HiveInput, { placeholder: "Conference Room A", value: formData.room, onChange: (e) => setFormData(prev => ({ ...prev, room: e.target.value })), disabled: loading, className: "w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Campus Address" }), _jsx(HiveInput, { placeholder: "123 University Ave", value: formData.address, onChange: (e) => setFormData(prev => ({ ...prev, address: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(MapPin, { className: "h-4 w-4" }) })] })] })] })), (formData.locationType === 'virtual' || formData.locationType === 'hybrid') && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Virtual Meeting Link" }), _jsx(HiveInput, { placeholder: "https://zoom.us/j/123456789", value: formData.virtualLink, onChange: (e) => setFormData(prev => ({ ...prev, virtualLink: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Link, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Zoom, Google Meet, or other video conferencing link" })] }))] })] }, "location")), step === 4 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Access & Capacity" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Control who can attend and how many" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Max Capacity" }), _jsx(HiveInput, { type: "number", placeholder: "50", value: formData.maxCapacity, onChange: (e) => setFormData(prev => ({ ...prev, maxCapacity: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(Users, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Leave empty for unlimited" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Ticket Price" }), _jsx(HiveInput, { type: "number", placeholder: "0", value: formData.ticketPrice, onChange: (e) => setFormData(prev => ({ ...prev, ticketPrice: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(DollarSign, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "$0 for free events" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Event Visibility" }), _jsx("div", { className: "space-y-2", children: [
                                                                { value: 'public', label: 'Public', desc: 'Anyone can discover this event', icon: Globe },
                                                                { value: 'campus', label: 'Campus Only', desc: 'Visible to verified students & faculty', icon: GraduationCap },
                                                                { value: 'space', label: 'Space Members', desc: 'Only members of selected spaces', icon: Users },
                                                                { value: 'private', label: 'Private', desc: 'Invite-only event', icon: Lock }
                                                            ].map((visibility) => (_jsx("button", { type: "button", onClick: () => setFormData(prev => ({ ...prev, visibility: visibility.value })), className: `w-full p-3 rounded-lg border transition-colors text-left ${formData.visibility === visibility.value
                                                                    ? 'border-purple-500 bg-purple-500/10'
                                                                    : 'border-[var(--hive-border-default)] hover:border-gray-600'}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(visibility.icon, { className: "h-4 w-4" }), _jsxs("div", { className: "flex-1", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: visibility.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: visibility.desc })] })] }) }, visibility.value))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: formData.registrationRequired, onChange: (e) => setFormData(prev => ({ ...prev, registrationRequired: e.target.checked })), className: "rounded border-gray-600 bg-gray-800" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Registration Required" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Attendees must RSVP" })] })] }), _jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: formData.scholarshipAvailable, onChange: (e) => setFormData(prev => ({ ...prev, scholarshipAvailable: e.target.checked })), className: "rounded border-gray-600 bg-gray-800" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Financial Aid" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Scholarships available" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: formData.livestreamEnabled, onChange: (e) => setFormData(prev => ({ ...prev, livestreamEnabled: e.target.checked })), className: "rounded border-gray-600 bg-gray-800" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Livestream" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Stream for remote viewing" })] })] }), _jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: formData.networkingEnabled, onChange: (e) => setFormData(prev => ({ ...prev, networkingEnabled: e.target.checked })), className: "rounded border-gray-600 bg-gray-800" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Networking Mode" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Help attendees connect" })] })] })] })] })] })] }, "access")), step === 5 && (_jsxs(motion.div, { variants: गति.fadeIn, initial: "initial", animate: "animate", exit: "exit", className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Text, { variant: "heading-md", className: "font-bold", children: "Final Touches" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Add contact info and media" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Contact Information" }), _jsx(HiveInput, { placeholder: "organizer@university.edu or @username", value: formData.contactInfo, onChange: (e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value })), disabled: loading, className: "w-full", icon: _jsx(MessageCircle, { className: "h-4 w-4" }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "How attendees can reach you with questions" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Text, { variant: "body-sm", className: "font-medium", children: "Cover Image" }), _jsxs("div", { className: "border-2 border-dashed border-[var(--hive-border-default)] rounded-lg p-8 text-center hover:border-gray-600 transition-colors cursor-pointer", children: [_jsx(Upload, { className: "h-8 w-8 mx-auto mb-2 text-gray-400" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Click to upload or drag and drop" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mt-1", children: "PNG, JPG up to 5MB" })] })] }), _jsxs("div", { className: "p-4 bg-gray-800/50 rounded-lg", children: [_jsx(Text, { variant: "body-sm", className: "font-medium mb-3", children: "Event Preview" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-purple-400" }), _jsxs(Text, { variant: "body-sm", children: [formData.date ? new Date(formData.date).toLocaleDateString() : 'Date not set', formData.startTime && ` at ${formData.startTime}`] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-purple-400" }), _jsx(Text, { variant: "body-sm", children: formData.locationType === 'virtual' ? 'Virtual Event' : formData.venue || 'Location TBD' })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4 text-purple-400" }), _jsx(Text, { variant: "body-sm", children: formData.maxCapacity ? `Up to ${formData.maxCapacity} attendees` : 'Unlimited capacity' })] }), formData.tags.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [formData.tags.slice(0, 3).map((tag, index) => (_jsx(Badge, { variant: "secondary", size: "sm", children: tag }, index))), formData.tags.length > 3 && (_jsxs(Badge, { variant: "secondary", size: "sm", children: ["+", formData.tags.length - 3, " more"] }))] }))] })] })] })] }, "final"))] }), _jsxs("div", { className: "flex items-center justify-between pt-4", children: [step > 1 && (_jsxs(HiveButton, { type: "button", variant: "outline", onClick: () => setStep(step - 1), disabled: loading, children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back"] })), _jsx(HiveButton, { type: "submit", className: step === 1 ? 'w-full' : 'ml-auto', loading: loading, variant: "premium", size: "lg", disabled: !formData.title || !formData.category, children: step === 5 ? (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "h-4 w-4 mr-2" }), editMode ? 'Update Event' : 'Create Event'] })) : (_jsxs(_Fragment, { children: ["Continue", _jsx(ArrowRight, { className: "h-4 w-4 ml-2" })] })) })] })] }), _jsxs("div", { className: "text-center pt-4 border-t border-[var(--hive-border-default)]", children: [_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["Step ", step, " of 5 \u2022 Event Creation"] }), _jsxs("div", { className: "flex items-center justify-center gap-1 mt-2", children: [_jsx(Calendar, { className: "h-3 w-3 text-purple-500" }), _jsxs(Text, { variant: "body-xs", className: "text-purple-400", children: [step === 1 && 'Basic event information...', step === 2 && 'Scheduling your event...', step === 3 && 'Setting location details...', step === 4 && 'Configuring access...', step === 5 && 'Adding final touches...'] })] })] })] }) }));
};
// Stories Configuration
const meta = {
    title: '03-molecules/Forms/Event Forms',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Event Forms** - Campus Event Management System

The flagship Event Management System for HIVE, designed to make campus event creation intuitive and comprehensive. These molecular forms combine multiple atomic components to create sophisticated event planning experiences.

## Event Management Philosophy
- **Campus-Centric**: Built specifically for university events and student organizations
- **Multi-step Progression**: Complex form broken into digestible, logical steps
- **Smart Defaults**: Intelligent form behavior based on student event patterns
- **Social Integration**: Deep integration with Spaces, profiles, and campus community

## Key Features
- **5-Step Creation Flow**: Basic Info → Date/Time → Location → Access → Final Details
- **Smart Location Types**: Physical, Virtual, and Hybrid event support
- **Advanced Scheduling**: Recurring events with custom patterns
- **Campus Integration**: Visibility controls and space-based permissions
- **Rich Media Support**: Cover images and additional event assets
- **Accessibility Features**: Financial aid options and live streaming

## Form Components
- **Event Creation Form**: Complete multi-step event creation experience
- **Quick Event Form**: Simplified creation for common event types
- **Event Edit Form**: Modification interface for existing events
- **Recurring Event Setup**: Advanced scheduling configuration

## Technical Implementation
- **Progressive Enhancement**: Each step builds on previous selections
- **Smart Validation**: Context-aware validation and suggestions
- **Real-time Preview**: Live preview of event as it's being created
- **Draft Persistence**: Auto-save functionality for complex forms
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Event Creation Stories
export const EventCreationDefault = {
    name: 'Event Creation - Complete Flow',
    render: () => (_jsx(EventCreationForm, { onSubmit: async (data) => {
            console.log('Event Created:', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('🎉 Event created successfully! Your campus community will love it.');
        } }))
};
export const EventCreationLoading = {
    name: 'Event Creation - Loading State',
    render: () => (_jsx(EventCreationForm, { loading: true, onSubmit: async (data) => {
            console.log('Event Created:', data);
        } }))
};
export const EventEditMode = {
    name: 'Event Edit - Existing Event',
    render: () => (_jsx(EventCreationForm, { editMode: true, eventData: {
            title: 'HIVE Campus Hackathon 2025',
            description: 'Join us for 48 hours of coding, creativity, and collaboration. Build something amazing with your peers!',
            category: 'tech',
            tags: ['hackathon', 'coding', 'collaboration', 'competition'],
            date: '2025-03-15',
            startTime: '09:00',
            endTime: '18:00',
            locationType: 'physical',
            venue: 'Engineering Building',
            room: 'Auditorium',
            maxCapacity: '100',
            visibility: 'campus',
            registrationRequired: true
        }, onSubmit: async (data) => {
            console.log('Event Updated:', data);
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('✅ Event updated successfully!');
        } }))
};
// Quick Event Creation
export const QuickEventCreation = {
    name: 'Quick Event - Simplified Flow',
    render: () => {
        const [formData, setFormData] = useState({
            title: '',
            category: '',
            date: '',
            startTime: '',
            locationType: 'physical',
            venue: '',
            maxCapacity: ''
        });
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log('Quick Event:', formData);
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('🚀 Quick event created! You can add more details later.');
        };
        return (_jsx(HiveCard, { className: "w-100", variant: "elevated", size: "lg", children: _jsxs(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", className: "p-6 space-y-6", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("div", { className: "w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center", children: _jsx(Zap, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "font-bold", children: "Quick Event" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Create an event in 60 seconds" })] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx(HiveInput, { placeholder: "Event title", value: formData.title, onChange: (e) => setFormData(prev => ({ ...prev, title: e.target.value })), className: "w-full", required: true }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx(HiveInput, { type: "date", value: formData.date, onChange: (e) => setFormData(prev => ({ ...prev, date: e.target.value })), className: "w-full", required: true }), _jsx(HiveInput, { type: "time", value: formData.startTime, onChange: (e) => setFormData(prev => ({ ...prev, startTime: e.target.value })), className: "w-full", required: true })] }), _jsx(HiveInput, { placeholder: "Location (e.g., Student Union)", value: formData.venue, onChange: (e) => setFormData(prev => ({ ...prev, venue: e.target.value })), className: "w-full", icon: _jsx(MapPin, { className: "h-4 w-4" }), required: true }), _jsxs(HiveButton, { type: "submit", className: "w-full", variant: "premium", size: "lg", children: [_jsx(Zap, { className: "h-4 w-4 mr-2" }), "Create Quick Event"] })] }), _jsx("div", { className: "text-center", children: _jsx(Text, { variant: "body-xs", color: "secondary", children: "You can add more details after creation" }) })] }) }));
    }
};
// Event Form Variants
export const EventFormVariants = {
    name: 'Event Form - All Variants',
    render: () => {
        const [currentForm, setCurrentForm] = useState('create');
        return (_jsxs("div", { className: "flex flex-col items-center gap-6", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: () => setCurrentForm('create'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === 'create'
                                ? 'bg-purple-500 text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "Create Event" }), _jsx("button", { onClick: () => setCurrentForm('edit'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === 'edit'
                                ? 'bg-purple-500 text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "Edit Event" }), _jsx("button", { onClick: () => setCurrentForm('quick'), className: `px-4 py-2 rounded-lg transition-colors ${currentForm === 'quick'
                                ? 'bg-green-500 text-[var(--hive-text-primary)]'
                                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'}`, children: "Quick Create" })] }), _jsx(AnimatePresence, { mode: "wait", children: currentForm === 'create' && (_jsx(motion.div, { variants: गति.slideUp, initial: "initial", animate: "animate", exit: "exit", children: _jsx(EventCreationForm, { onSubmit: async (data) => {
                                console.log('Event Created:', data);
                                await new Promise(resolve => setTimeout(resolve, 1500));
                            } }) }, "create")) })] }));
    }
};
// Mobile Event Creation
export const MobileEventCreation = {
    name: 'Mobile-First Event Creation',
    render: () => (_jsx("div", { className: "max-w-sm mx-auto", children: _jsx(EventCreationForm, { className: "w-full max-w-sm", onSubmit: async (data) => {
                console.log('Mobile Event:', data);
                await new Promise(resolve => setTimeout(resolve, 1500));
            } }) })),
    parameters: {
        viewport: {
            defaultViewport: 'mobile1'
        }
    }
};
//# sourceMappingURL=event-forms.stories.js.map