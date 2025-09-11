"use client";

import { useState } from "react";
import { Modal, Button, Input, Badge } from "@hive/ui";
import { 
  MapPin, 
  Users, 
  Clock, 
  Zap, 
  Tag,
  Eye,
  Plus,
  X,
  Type,
  FileText
} from "lucide-react";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (event: CreateEventData) => void;
  defaultSpaceId?: string;
}

interface CreateEventData {
  title: string;
  description: string;
  type: 'academic' | 'social' | 'professional' | 'recreational' | 'official';
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
  capacity: number;
  spaceId?: string;
  tools: string[];
  tags: string[];
  visibility: 'public' | 'space_only' | 'invited_only';
  requirements?: string[];
}

const EVENT_TYPES = [
  { id: 'academic', label: 'Academic', icon: '📚', color: 'bg-blue-500' },
  { id: 'social', label: 'Social', icon: '🎉', color: 'bg-pink-500' },
  { id: 'professional', label: 'Professional', icon: '💼', color: 'bg-green-500' },
  { id: 'recreational', label: 'Recreational', icon: '🎮', color: 'bg-[var(--hive-gold)]' },
  { id: 'official', label: 'Official', icon: '🏛️', color: 'bg-[var(--hive-gold)]' }
] as const;

const AVAILABLE_TOOLS = [
  { id: 'study-timer', name: 'Study Timer', category: 'productivity' },
  { id: 'poll-maker', name: 'Poll Maker', category: 'engagement' },
  { id: 'whiteboard', name: 'Whiteboard', category: 'collaboration' },
  { id: 'file-share', name: 'File Share', category: 'collaboration' },
  { id: 'music-queue', name: 'Music Queue', category: 'social' },
  { id: 'group-chat', name: 'Group Chat', category: 'communication' },
  { id: 'attendance', name: 'Attendance Tracker', category: 'organization' },
  { id: 'feedback', name: 'Feedback Collector', category: 'engagement' }
];

export function CreateEventModal({ isOpen, onClose, onCreateEvent, defaultSpaceId }: CreateEventModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CreateEventData>({
    title: '',
    description: '',
    type: 'academic',
    datetime: {
      start: '',
      end: '',
      timezone: 'America/New_York'
    },
    location: {
      type: 'physical',
      name: '',
      address: ''
    },
    capacity: 50,
    spaceId: defaultSpaceId,
    tools: [],
    tags: [],
    visibility: defaultSpaceId ? 'space_only' : 'public',
    requirements: []
  });
  
  const [newTag, setNewTag] = useState('');
  const [newRequirement, setNewRequirement] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parentField: string, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof CreateEventData] as any,
        [childField]: value
      }
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !formData.requirements?.includes(newRequirement.trim())) {
      setFormData(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (requirement: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter(r => r !== requirement) || []
    }));
  };

  const toggleTool = (toolId: string) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(toolId)
        ? prev.tools.filter(t => t !== toolId)
        : [...prev.tools, toolId]
    }));
  };

  const canProceed = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.description.trim() && formData.type;
      case 2:
        return formData.datetime.start && formData.datetime.end;
      case 3:
        return formData.location.name.trim() && 
               (formData.location.type !== 'virtual' || formData.location.virtualLink?.trim()) &&
               (formData.location.type !== 'physical' || formData.location.address?.trim());
      case 4:
        return formData.capacity > 0;
      default:
        return true;
    }
  };

  const handleSubmit = () => {
    if (canProceed(step)) {
      onCreateEvent(formData);
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: 'academic',
        datetime: {
          start: '',
          end: '',
          timezone: 'America/New_York'
        },
        location: {
          type: 'physical',
          name: '',
          address: ''
        },
        capacity: 50,
        tools: [],
        tags: [],
        visibility: 'public',
        requirements: []
      });
      setStep(1);
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return 'Event Basics';
      case 2: return 'Date & Time';
      case 3: return 'Location';
      case 4: return 'Capacity & Settings';
      case 5: return 'Tools & Features';
      case 6: return 'Review & Create';
      default: return 'Create Event';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create Event - ${getStepTitle(step)}`}
      size="xl"
    >
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                stepNumber === step
                  ? 'bg-hive-gold text-hive-obsidian'
                  : stepNumber < step
                  ? 'bg-green-500 text-[var(--hive-text-inverse)]'
                  : 'bg-zinc-700 text-zinc-400'
              }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>

        {/* Step 1: Event Basics */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                <Type className="inline h-4 w-4 mr-1" />
                Event Title
              </label>
              <Input
                value={formData.title}
                onChange={(e: any) => handleInputChange('title', e.target.value)}
                placeholder="Enter event title..."
                className="w-full"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                <FileText className="inline h-4 w-4 mr-1" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e: any) => handleInputChange('description', e.target.value)}
                placeholder="Describe your event, what to expect, and any important details..."
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] placeholder-zinc-400 focus:border-hive-gold focus:outline-none resize-none"
                rows={4}
                maxLength={500}
              />
              <div className="text-xs text-zinc-400 mt-1">
                {formData.description.length}/500 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">Event Type</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {EVENT_TYPES.map((type: any) => (
                  <button
                    key={type.id}
                    onClick={() => handleInputChange('type', type.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.type === type.id
                        ? 'border-hive-gold bg-hive-gold/10'
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-sm font-medium text-[var(--hive-text-inverse)]">{type.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.datetime.start}
                  onChange={(e: any) => handleNestedInputChange('datetime', 'start', e.target.value)}
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] focus:border-hive-gold focus:outline-none"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.datetime.end}
                  onChange={(e: any) => handleNestedInputChange('datetime', 'end', e.target.value)}
                  className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] focus:border-hive-gold focus:outline-none"
                  min={formData.datetime.start || new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">Timezone</label>
              <select
                value={formData.datetime.timezone}
                onChange={(e: any) => handleNestedInputChange('datetime', 'timezone', e.target.value)}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] focus:border-hive-gold focus:outline-none"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">Location Type</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'physical', label: 'In-Person', icon: '📍' },
                  { id: 'virtual', label: 'Virtual', icon: '💻' },
                  { id: 'hybrid', label: 'Hybrid', icon: '🔗' }
                ].map((locType: any) => (
                  <button
                    key={locType.id}
                    onClick={() => handleNestedInputChange('location', 'type', locType.id)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.location.type === locType.id
                        ? 'border-hive-gold bg-hive-gold/10'
                        : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xl mb-1">{locType.icon}</div>
                      <div className="text-sm font-medium text-[var(--hive-text-inverse)]">{locType.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Location Name
              </label>
              <Input
                value={formData.location.name}
                onChange={(e: any) => handleNestedInputChange('location', 'name', e.target.value)}
                placeholder={
                  formData.location.type === 'virtual' 
                    ? 'e.g., Zoom Meeting, Discord Channel'
                    : 'e.g., Lockwood Library Room 301, Student Union'
                }
                className="w-full"
              />
            </div>

            {formData.location.type === 'physical' && (
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">Full Address</label>
                <Input
                  value={formData.location.address || ''}
                  onChange={(e: any) => handleNestedInputChange('location', 'address', e.target.value)}
                  placeholder="Enter full address with building and room number..."
                  className="w-full"
                />
              </div>
            )}

            {(formData.location.type === 'virtual' || formData.location.type === 'hybrid') && (
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">Virtual Link</label>
                <Input
                  value={formData.location.virtualLink || ''}
                  onChange={(e: any) => handleNestedInputChange('location', 'virtualLink', e.target.value)}
                  placeholder="https://zoom.us/j/... or Discord invite link"
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}

        {/* Step 4: Capacity & Settings */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                Event Capacity
              </label>
              <div className="flex items-center space-x-4">
                <Input
                  type="number"
                  value={formData.capacity.toString()}
                  onChange={(e: any) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
                  placeholder="50"
                  className="w-32"
                  min="1"
                  max="10000"
                />
                <span className="text-zinc-400 text-sm">people maximum</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                <Eye className="inline h-4 w-4 mr-1" />
                Event Visibility
              </label>
              <div className="space-y-3">
                {[
                  { id: 'public', label: 'Public', desc: 'Anyone can discover and join this event', icon: '🌍' },
                  { id: 'space_only', label: 'Space Members Only', desc: 'Only members of your space can see this event', icon: '👥' },
                  { id: 'invited_only', label: 'Invite Only', desc: 'Only people you invite can join', icon: '🔒' }
                ].map((vis: any) => (
                  <label
                    key={vis.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.visibility === vis.id
                        ? 'border-hive-gold bg-hive-gold/5'
                        : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value={vis.id}
                      checked={formData.visibility === vis.id}
                      onChange={(e: any) => handleInputChange('visibility', e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{vis.icon}</span>
                        <span className="font-medium text-[var(--hive-text-inverse)]">{vis.label}</span>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1">{vis.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Tools & Features */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                <Zap className="inline h-4 w-4 mr-1" />
                Available Tools
              </label>
              <p className="text-sm text-zinc-400 mb-4">
                Select tools that attendees can use during your event
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {AVAILABLE_TOOLS.map((tool: any) => (
                  <label
                    key={tool.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.tools.includes(tool.id)
                        ? 'border-hive-gold bg-hive-gold/5'
                        : 'border-zinc-700 hover:border-zinc-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.tools.includes(tool.id)}
                      onChange={() => toggleTool(tool.id)}
                    />
                    <div>
                      <div className="font-medium text-[var(--hive-text-inverse)]">{tool.name}</div>
                      <div className="text-xs text-zinc-400 capitalize">{tool.category}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags
              </label>
              <div className="flex items-center space-x-2 mb-3">
                <Input
                  value={newTag}
                  onChange={(e: any) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1"
                  onKeyPress={(e: any) => e.key === 'Enter' && addTag()}
                />
                <Button onClick={addTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="skill-tag" className="flex items-center space-x-1">
                    <span>#{tag}</span>
                    <button onClick={() => removeTag(tag)} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">Requirements</label>
              <div className="flex items-center space-x-2 mb-3">
                <Input
                  value={newRequirement}
                  onChange={(e: any) => setNewRequirement(e.target.value)}
                  placeholder="e.g., Laptop, Professional attire..."
                  className="flex-1"
                  onKeyPress={(e: any) => e.key === 'Enter' && addRequirement()}
                />
                <Button onClick={addRequirement} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {formData.requirements?.map((req: any) => (
                  <div key={req} className="flex items-center justify-between p-2 bg-zinc-800 rounded">
                    <span className="text-[var(--hive-text-inverse)] text-sm">{req}</span>
                    <button onClick={() => removeRequirement(req)}>
                      <X className="h-4 w-4 text-zinc-400 hover:text-[var(--hive-text-inverse)]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Review & Create */}
        {step === 6 && (
          <div className="space-y-6">
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Event Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Title:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formData.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Type:</span>
                  <span className="text-[var(--hive-text-inverse)] capitalize">{formData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Date:</span>
                  <span className="text-[var(--hive-text-inverse)]">
                    {new Date(formData.datetime.start).toLocaleDateString()} - {new Date(formData.datetime.end).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Location:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formData.location.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Capacity:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formData.capacity} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Tools:</span>
                  <span className="text-[var(--hive-text-inverse)]">{formData.tools.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Visibility:</span>
                  <span className="text-[var(--hive-text-inverse)] capitalize">{formData.visibility.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
          >
            {step > 1 ? 'Previous' : 'Cancel'}
          </Button>

          <div className="flex items-center space-x-3">
            {step < 6 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed(step)}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne disabled:opacity-50"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                Create Event
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}