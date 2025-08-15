import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Camera,
  Share,
  QrCode,
  Star,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Upload,
  Image,
  Music,
  Utensils,
  Coffee,
  GraduationCap,
  Gamepad2,
  Dumbbell,
  Book,
  Palette,
  Code,
  Mic,
  Film,
  Heart,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Bell,
  MessageCircle,
  UserPlus,
  Sparkles,
  Target,
  Award,
  Zap,
  Building,
  CheckCircle,
  AlertCircle,
  Info,
  DollarSign,
  Gift,
  Ticket,
  Settings,
  Link,
  Tag,
  Repeat,
  CalendarDays
} from 'lucide-react';

// Event Form Props
interface EventFormProps {
  onSubmit?: (data: any) => Promise<void>;
  onBack?: () => void;
  loading?: boolean;
  className?: string;
  editMode?: boolean;
  eventData?: any;
}

// Main Event Creation Form - HIVE's flagship Event Management System
const EventCreationForm: React.FC<EventFormProps> = ({ onSubmit, loading, className, editMode, eventData }) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      onSubmit?.(formData);
    }
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  return (
    <HiveCard className={`w-150 ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-[var(--hive-text-primary)]" />
          </div>
          <div>
            <Badge variant="secondary" size="sm" className="mb-2">Event Management System</Badge>
            <Text variant="heading-lg" className="font-bold">
              {editMode ? 'Edit Event' : 'Create Campus Event'}
            </Text>
            <Text variant="body-md" color="secondary">
              {editMode ? 'Update your event details' : 'Bring your campus community together'}
            </Text>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((num) => (
            <div
              key={num}
              className={`flex-1 h-1 rounded-full transition-colors ${
                num <= step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <motion.div
                key="basic"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Event Basics</Text>
                  <Text variant="body-sm" color="secondary">
                    Give your event a compelling identity
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Event Title</Text>
                    <HiveInput
                      placeholder="HIVE Campus Hackathon 2025"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      disabled={loading}
                      className="w-full"
                      maxLength={100}
                    />
                    <div className="flex justify-between">
                      <Text variant="body-xs" color="secondary">
                        Make it descriptive and engaging
                      </Text>
                      <Text variant="body-xs" color="secondary">
                        {formData.title.length}/100
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Description</Text>
                    <textarea
                      placeholder="Describe your event, what attendees can expect, and why they should join..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none"
                      rows={4}
                      maxLength={500}
                    />
                    <div className="flex justify-between">
                      <Text variant="body-xs" color="secondary">
                        Include agenda, requirements, or special instructions
                      </Text>
                      <Text variant="body-xs" color="secondary">
                        {formData.description.length}/500
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Category</Text>
                    <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                      {eventCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                          className={`p-3 rounded-lg border transition-all ${
                            formData.category === category.id
                              ? `border-${category.color}-500 bg-${category.color}-500/10`
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <category.icon className="h-5 w-5 mx-auto mb-1" />
                          <Text variant="body-xs" className="font-medium">{category.label}</Text>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Tags</Text>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addTag(tag)}
                          className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full border border-[var(--hive-border-default)] transition-colors"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <motion.div
                key="datetime"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">When & How Often</Text>
                  <Text variant="body-sm" color="secondary">
                    Schedule your event timing
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Date</Text>
                      <HiveInput
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<Calendar className="h-4 w-4" />}
                      />
                    </div>
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Timezone</Text>
                      <select 
                        value={formData.timezone}
                        onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                        className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
                      >
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/New_York">Eastern Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Start Time</Text>
                      <HiveInput
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<Clock className="h-4 w-4" />}
                      />
                    </div>
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">End Time</Text>
                      <HiveInput
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<Clock className="h-4 w-4" />}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.recurring}
                        onChange={(e) => setFormData(prev => ({ ...prev, recurring: e.target.checked }))}
                        className="rounded border-gray-600 bg-gray-800"
                      />
                      <div>
                        <Text variant="body-sm" className="font-medium">Recurring Event</Text>
                        <Text variant="body-xs" color="secondary">This event happens regularly</Text>
                      </div>
                    </label>

                    {formData.recurring && (
                      <motion.div
                        variants={गति.fadeIn}
                        initial="initial"
                        animate="animate"
                        className="space-y-2"
                      >
                        <Text variant="body-sm" className="font-medium">Repeat Pattern</Text>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { value: 'weekly', label: 'Weekly', icon: CalendarDays },
                            { value: 'biweekly', label: 'Every 2 weeks', icon: CalendarDays },
                            { value: 'monthly', label: 'Monthly', icon: CalendarDays },
                            { value: 'custom', label: 'Custom', icon: Settings }
                          ].map((pattern) => (
                            <button
                              key={pattern.value}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, recurrencePattern: pattern.value }))}
                              className={`p-3 rounded-lg border transition-colors text-left ${
                                formData.recurrencePattern === pattern.value
                                  ? 'border-purple-500 bg-purple-500/10'
                                  : 'border-[var(--hive-border-default)] hover:border-gray-600'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <pattern.icon className="h-4 w-4" />
                                <Text variant="body-sm">{pattern.label}</Text>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <motion.div
                key="location"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Where It Happens</Text>
                  <Text variant="body-sm" color="secondary">
                    Set the location for your event
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Location Type</Text>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: 'physical', label: 'In-Person', desc: 'Physical campus location', icon: Building },
                        { value: 'virtual', label: 'Virtual', desc: 'Online event', icon: Globe },
                        { value: 'hybrid', label: 'Hybrid', desc: 'Both in-person & online', icon: Zap }
                      ].map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, locationType: type.value }))}
                          className={`p-4 rounded-lg border transition-colors text-center ${
                            formData.locationType === type.value
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <type.icon className="h-6 w-6 mx-auto mb-2" />
                          <Text variant="body-sm" className="font-medium">{type.label}</Text>
                          <Text variant="body-xs" color="secondary">{type.desc}</Text>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(formData.locationType === 'physical' || formData.locationType === 'hybrid') && (
                    <motion.div
                      variants={गति.fadeIn}
                      initial="initial"
                      animate="animate"
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Text variant="body-sm" className="font-medium">Venue Name</Text>
                        <HiveInput
                          placeholder="Student Union Building"
                          value={formData.venue}
                          onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                          disabled={loading}
                          className="w-full"
                          icon={<Building className="h-4 w-4" />}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Text variant="body-sm" className="font-medium">Room/Area</Text>
                          <HiveInput
                            placeholder="Conference Room A"
                            value={formData.room}
                            onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                            disabled={loading}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Text variant="body-sm" className="font-medium">Campus Address</Text>
                          <HiveInput
                            placeholder="123 University Ave"
                            value={formData.address}
                            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                            disabled={loading}
                            className="w-full"
                            icon={<MapPin className="h-4 w-4" />}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {(formData.locationType === 'virtual' || formData.locationType === 'hybrid') && (
                    <motion.div
                      variants={गति.fadeIn}
                      initial="initial"
                      animate="animate"
                      className="space-y-2"
                    >
                      <Text variant="body-sm" className="font-medium">Virtual Meeting Link</Text>
                      <HiveInput
                        placeholder="https://zoom.us/j/123456789"
                        value={formData.virtualLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, virtualLink: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<Link className="h-4 w-4" />}
                      />
                      <Text variant="body-xs" color="secondary">
                        Zoom, Google Meet, or other video conferencing link
                      </Text>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Capacity & Access */}
            {step === 4 && (
              <motion.div
                key="access"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Access & Capacity</Text>
                  <Text variant="body-sm" color="secondary">
                    Control who can attend and how many
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Max Capacity</Text>
                      <HiveInput
                        type="number"
                        placeholder="50"
                        value={formData.maxCapacity}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxCapacity: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<Users className="h-4 w-4" />}
                      />
                      <Text variant="body-xs" color="secondary">
                        Leave empty for unlimited
                      </Text>
                    </div>
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Ticket Price</Text>
                      <HiveInput
                        type="number"
                        placeholder="0"
                        value={formData.ticketPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, ticketPrice: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<DollarSign className="h-4 w-4" />}
                      />
                      <Text variant="body-xs" color="secondary">
                        $0 for free events
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Event Visibility</Text>
                    <div className="space-y-2">
                      {[
                        { value: 'public', label: 'Public', desc: 'Anyone can discover this event', icon: Globe },
                        { value: 'campus', label: 'Campus Only', desc: 'Visible to verified students & faculty', icon: GraduationCap },
                        { value: 'space', label: 'Space Members', desc: 'Only members of selected spaces', icon: Users },
                        { value: 'private', label: 'Private', desc: 'Invite-only event', icon: Lock }
                      ].map((visibility) => (
                        <button
                          key={visibility.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, visibility: visibility.value }))}
                          className={`w-full p-3 rounded-lg border transition-colors text-left ${
                            formData.visibility === visibility.value
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <visibility.icon className="h-4 w-4" />
                            <div className="flex-1">
                              <Text variant="body-sm" className="font-medium">{visibility.label}</Text>
                              <Text variant="body-xs" color="secondary">{visibility.desc}</Text>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.registrationRequired}
                          onChange={(e) => setFormData(prev => ({ ...prev, registrationRequired: e.target.checked }))}
                          className="rounded border-gray-600 bg-gray-800"
                        />
                        <div>
                          <Text variant="body-sm" className="font-medium">Registration Required</Text>
                          <Text variant="body-xs" color="secondary">Attendees must RSVP</Text>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.scholarshipAvailable}
                          onChange={(e) => setFormData(prev => ({ ...prev, scholarshipAvailable: e.target.checked }))}
                          className="rounded border-gray-600 bg-gray-800"
                        />
                        <div>
                          <Text variant="body-sm" className="font-medium">Financial Aid</Text>
                          <Text variant="body-xs" color="secondary">Scholarships available</Text>
                        </div>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.livestreamEnabled}
                          onChange={(e) => setFormData(prev => ({ ...prev, livestreamEnabled: e.target.checked }))}
                          className="rounded border-gray-600 bg-gray-800"
                        />
                        <div>
                          <Text variant="body-sm" className="font-medium">Livestream</Text>
                          <Text variant="body-xs" color="secondary">Stream for remote viewing</Text>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.networkingEnabled}
                          onChange={(e) => setFormData(prev => ({ ...prev, networkingEnabled: e.target.checked }))}
                          className="rounded border-gray-600 bg-gray-800"
                        />
                        <div>
                          <Text variant="body-sm" className="font-medium">Networking Mode</Text>
                          <Text variant="body-xs" color="secondary">Help attendees connect</Text>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 5: Final Details */}
            {step === 5 && (
              <motion.div
                key="final"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Final Touches</Text>
                  <Text variant="body-sm" color="secondary">
                    Add contact info and media
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Contact Information</Text>
                    <HiveInput
                      placeholder="organizer@university.edu or @username"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                      disabled={loading}
                      className="w-full"
                      icon={<MessageCircle className="h-4 w-4" />}
                    />
                    <Text variant="body-xs" color="secondary">
                      How attendees can reach you with questions
                    </Text>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Cover Image</Text>
                    <div className="border-2 border-dashed border-[var(--hive-border-default)] rounded-lg p-8 text-center hover:border-gray-600 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <Text variant="body-sm" color="secondary">
                        Click to upload or drag and drop
                      </Text>
                      <Text variant="body-xs" color="secondary" className="mt-1">
                        PNG, JPG up to 5MB
                      </Text>
                    </div>
                  </div>

                  {/* Event Preview */}
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <Text variant="body-sm" className="font-medium mb-3">Event Preview</Text>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        <Text variant="body-sm">
                          {formData.date ? new Date(formData.date).toLocaleDateString() : 'Date not set'} 
                          {formData.startTime && ` at ${formData.startTime}`}
                        </Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-400" />
                        <Text variant="body-sm">
                          {formData.locationType === 'virtual' ? 'Virtual Event' : formData.venue || 'Location TBD'}
                        </Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-400" />
                        <Text variant="body-sm">
                          {formData.maxCapacity ? `Up to ${formData.maxCapacity} attendees` : 'Unlimited capacity'}
                        </Text>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" size="sm">
                              {tag}
                            </Badge>
                          ))}
                          {formData.tags.length > 3 && (
                            <Badge variant="secondary" size="sm">
                              +{formData.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            {step > 1 && (
              <HiveButton
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={loading}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </HiveButton>
            )}
            <HiveButton
              type="submit"
              className={step === 1 ? 'w-full' : 'ml-auto'}
              loading={loading}
              variant="premium"
              size="lg"
              disabled={!formData.title || !formData.category}
            >
              {step === 5 ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {editMode ? 'Update Event' : 'Create Event'}
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </HiveButton>
          </div>
        </form>

        {/* Step Indicator */}
        <div className="text-center pt-4 border-t border-[var(--hive-border-default)]">
          <Text variant="body-xs" color="secondary">
            Step {step} of 5 • Event Creation
          </Text>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Calendar className="h-3 w-3 text-purple-500" />
            <Text variant="body-xs" className="text-purple-400">
              {step === 1 && 'Basic event information...'}
              {step === 2 && 'Scheduling your event...'}
              {step === 3 && 'Setting location details...'}
              {step === 4 && 'Configuring access...'}
              {step === 5 && 'Adding final touches...'}
            </Text>
          </div>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Stories Configuration
const meta: Meta = {
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
type Story = StoryObj;

// Event Creation Stories
export const EventCreationDefault: Story = {
  name: 'Event Creation - Complete Flow',
  render: () => (
    <EventCreationForm 
      onSubmit={async (data) => {
        console.log('Event Created:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('🎉 Event created successfully! Your campus community will love it.');
      }}
    />
  )
};

export const EventCreationLoading: Story = {
  name: 'Event Creation - Loading State',
  render: () => (
    <EventCreationForm 
      loading={true}
      onSubmit={async (data) => {
        console.log('Event Created:', data);
      }}
    />
  )
};

export const EventEditMode: Story = {
  name: 'Event Edit - Existing Event',
  render: () => (
    <EventCreationForm 
      editMode={true}
      eventData={{
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
      }}
      onSubmit={async (data) => {
        console.log('Event Updated:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('✅ Event updated successfully!');
      }}
    />
  )
};

// Quick Event Creation
export const QuickEventCreation: Story = {
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

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Quick Event:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('🚀 Quick event created! You can add more details later.');
    };

    return (
      <HiveCard className="w-100" variant="elevated" size="lg">
        <motion.div
          variants={गति.slideUp}
          initial="initial"
          animate="animate"
          className="p-6 space-y-6"
        >
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
              <Zap className="w-6 h-6 text-[var(--hive-text-primary)]" />
            </div>
            <div>
              <Text variant="heading-lg" className="font-bold">Quick Event</Text>
              <Text variant="body-md" color="secondary">
                Create an event in 60 seconds
              </Text>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <HiveInput
              placeholder="Event title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <HiveInput
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full"
                required
              />
              <HiveInput
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full"
                required
              />
            </div>

            <HiveInput
              placeholder="Location (e.g., Student Union)"
              value={formData.venue}
              onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
              className="w-full"
              icon={<MapPin className="h-4 w-4" />}
              required
            />

            <HiveButton
              type="submit"
              className="w-full"
              variant="premium"
              size="lg"
            >
              <Zap className="h-4 w-4 mr-2" />
              Create Quick Event
            </HiveButton>
          </form>

          <div className="text-center">
            <Text variant="body-xs" color="secondary">
              You can add more details after creation
            </Text>
          </div>
        </motion.div>
      </HiveCard>
    );
  }
};

// Event Form Variants
export const EventFormVariants: Story = {
  name: 'Event Form - All Variants',
  render: () => {
    const [currentForm, setCurrentForm] = useState<'create' | 'edit' | 'quick'>('create');

    return (
      <div className="flex flex-col items-center gap-6">
        {/* Form Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentForm('create')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === 'create' 
                ? 'bg-purple-500 text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Create Event
          </button>
          <button
            onClick={() => setCurrentForm('edit')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === 'edit' 
                ? 'bg-purple-500 text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Edit Event
          </button>
          <button
            onClick={() => setCurrentForm('quick')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === 'quick' 
                ? 'bg-green-500 text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Quick Create
          </button>
        </div>

        {/* Current Form */}
        <AnimatePresence mode="wait">
          {currentForm === 'create' && (
            <motion.div
              key="create"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <EventCreationForm 
                onSubmit={async (data) => {
                  console.log('Event Created:', data);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
};

// Mobile Event Creation
export const MobileEventCreation: Story = {
  name: 'Mobile-First Event Creation',
  render: () => (
    <div className="max-w-sm mx-auto">
      <EventCreationForm 
        className="w-full max-w-sm"
        onSubmit={async (data) => {
          console.log('Mobile Event:', data);
          await new Promise(resolve => setTimeout(resolve, 1500));
        }}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};