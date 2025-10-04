"use client";

import { useState } from 'react';
import {
  Calendar,
  BarChart3,
  CheckSquare,
  FileText,
  Plus,
  X,
  MapPin,
  Clock,
  Users,
  Settings,
  Zap
} from 'lucide-react';
import {
  Button,
  Card,
  Input,
  HiveTextarea,
  Dialog,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@hive/ui';
import { api } from '@/lib/api-client';

interface ToolsWidgetProps {
  spaceId: string;
  userRole: 'owner' | 'leader' | 'moderator' | 'member' | 'guest';
  canCreateEvents: boolean;
  canCreatePolls: boolean;
  canCreateTasks: boolean;
  canCreateResources: boolean;
  onToolUsed?: (toolType: string, data: any) => void;
}

interface Tool {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  permission: keyof Pick<ToolsWidgetProps, 'canCreateEvents' | 'canCreatePolls' | 'canCreateTasks' | 'canCreateResources'>;
}

const DEFAULT_TOOLS: Tool[] = [
  {
    id: 'event',
    name: 'Event',
    icon: Calendar,
    description: 'Create an event with RSVP',
    color: 'text-blue-400',
    permission: 'canCreateEvents'
  },
  {
    id: 'poll',
    name: 'Poll',
    icon: BarChart3,
    description: 'Quick poll with 2-5 options',
    color: 'text-green-400',
    permission: 'canCreatePolls'
  },
  {
    id: 'task',
    name: 'Task',
    icon: CheckSquare,
    description: 'Assign task with deadline',
    color: 'text-orange-400',
    permission: 'canCreateTasks'
  },
  {
    id: 'resource',
    name: 'Resource',
    icon: FileText,
    description: 'Upload file or add link',
    color: 'text-purple-400',
    permission: 'canCreateResources'
  }
];

export function ToolsWidget({
  spaceId,
  userRole,
  canCreateEvents,
  canCreatePolls,
  canCreateTasks,
  canCreateResources,
  onToolUsed
}: ToolsWidgetProps) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const permissions = {
    canCreateEvents,
    canCreatePolls,
    canCreateTasks,
    canCreateResources
  };

  const availableTools = DEFAULT_TOOLS.filter(tool => permissions[tool.permission]);

  const handleToolClick = (toolId: string) => {
    setActiveModal(toolId);
  };

  const handleToolComplete = (toolType: string, data: any) => {
    setActiveModal(null);
    onToolUsed?.(toolType, data);
  };

  return (
    <>
      <Card className="bg-gray-900/50 border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--hive-brand-primary)]" />
            Quick Tools
          </h4>
        </div>

        {availableTools.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {availableTools.map(tool => {
              const IconComponent = tool.icon;
              return (
                <Button
                  key={tool.id}
                  variant="outline"
                  size="sm"
                  className="border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 flex flex-col items-center gap-1 h-auto py-3"
                  onClick={() => handleToolClick(tool.id)}
                >
                  <IconComponent className={`w-5 h-5 ${tool.color}`} />
                  <span className="text-xs">{tool.name}</span>
                </Button>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-4">
            <Settings className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-xs text-gray-400">No tools available</p>
            <p className="text-xs text-gray-500">Contact space leaders</p>
          </div>
        )}
      </Card>

      {/* Tool Modals */}
      {activeModal && (
        <ToolModal
          toolId={activeModal}
          spaceId={spaceId}
          onClose={() => setActiveModal(null)}
          onComplete={handleToolComplete}
        />
      )}
    </>
  );
}

function ToolModal({
  toolId,
  spaceId,
  onClose,
  onComplete
}: {
  toolId: string;
  spaceId: string;
  onClose: () => void;
  onComplete: (toolType: string, data: any) => void;
}) {
  const tool = DEFAULT_TOOLS.find(t => t.id === toolId);
  if (!tool) return null;

  switch (toolId) {
    case 'event':
      return (
        <EventCreationModal
          spaceId={spaceId}
          onClose={onClose}
          onComplete={onComplete}
        />
      );
    case 'poll':
      return (
        <PollCreationModal
          spaceId={spaceId}
          onClose={onClose}
          onComplete={onComplete}
        />
      );
    case 'task':
      return (
        <TaskCreationModal
          spaceId={spaceId}
          onClose={onClose}
          onComplete={onComplete}
        />
      );
    case 'resource':
      return (
        <ResourceCreationModal
          spaceId={spaceId}
          onClose={onClose}
          onComplete={onComplete}
        />
      );
    default:
      return null;
  }
}

function EventCreationModal({
  spaceId,
  onClose,
  onComplete
}: {
  spaceId: string;
  onClose: () => void;
  onComplete: (toolType: string, data: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    maxAttendees: '',
    requireRsvp: true,
    template: 'custom'
  });

  const templates = {
    meeting: {
      title: 'Weekly Meeting',
      description: 'Regular team meeting to discuss updates and plan ahead.',
      requireRsvp: true
    },
    social: {
      title: 'Social Gathering',
      description: 'Come hang out and get to know fellow members!',
      requireRsvp: false
    },
    workshop: {
      title: 'Workshop',
      description: 'Educational workshop for skill building.',
      requireRsvp: true
    }
  };

  const handleTemplateSelect = (template: keyof typeof templates) => {
    const templateData = templates[template];
    setFormData(prev => ({
      ...prev,
      ...templateData,
      template
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventData = {
        ...formData,
        startTime: new Date(`${formData.startDate}T${formData.startTime}`),
        endTime: formData.endDate && formData.endTime
          ? new Date(`${formData.endDate}T${formData.endTime}`)
          : undefined,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined
      };

      const response = await api.post(`/api/spaces/${spaceId}/events`, eventData);
      onComplete('event', response.event);
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={true}
      onClose={onClose}
      title="Create Event"
      className="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Templates */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Quick Templates
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(templates).map(([key, template]) => (
              <Button
                key={key}
                type="button"
                variant={formData.template === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTemplateSelect(key as keyof typeof templates)}
                className="text-xs"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Event Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, title: (e.target as HTMLInputElement).value }))}
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Description
          </label>
          <HiveTextarea
            value={formData.description}
            onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, description: (e.target as HTMLInputElement).value }))}
            placeholder="Event description..."
            rows={3}
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Start Date *
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, startDate: (e.target as HTMLInputElement).value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Start Time *
            </label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, startTime: (e.target as HTMLInputElement).value }))}
              required
            />
          </div>
        </div>

        {/* Optional End Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              End Date
            </label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, endDate: (e.target as HTMLInputElement).value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              End Time
            </label>
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, endTime: (e.target as HTMLInputElement).value }))}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Location
          </label>
          <Input
            value={formData.location}
            onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, location: (e.target as HTMLInputElement).value }))}
            placeholder="Event location or 'Online'"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Max Attendees
            </label>
            <Input
              type="number"
              value={formData.maxAttendees}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, maxAttendees: (e.target as HTMLInputElement).value }))}
              placeholder="Leave empty for unlimited"
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="requireRsvp"
              checked={formData.requireRsvp}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, requireRsvp: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="requireRsvp" className="text-sm text-white">
              Require RSVP
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.title || !formData.startDate || !formData.startTime}
            className="flex-1 bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
          >
            {loading ? 'Creating...' : 'Create Event'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function PollCreationModal({
  spaceId,
  onClose,
  onComplete
}: {
  spaceId: string;
  onClose: () => void;
  onComplete: (toolType: string, data: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', ''],
    allowMultiple: false,
    anonymous: false,
    endDate: '',
    endTime: ''
  });

  const addOption = () => {
    if (formData.options.length < 5) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, '']
      }));
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index)
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? value : opt)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pollData = {
        ...formData,
        options: formData.options.filter(opt => opt.trim()),
        endTime: formData.endDate && formData.endTime
          ? new Date(`${formData.endDate}T${formData.endTime}`)
          : undefined
      };

      const response = await api.post(`/api/spaces/${spaceId}/polls`, pollData);
      onComplete('poll', response.poll);
    } catch (error) {
      console.error('Failed to create poll:', error);
    } finally {
      setLoading(false);
    }
  };

  const isValid = formData.question.trim() &&
    formData.options.filter(opt => opt.trim()).length >= 2;

  return (
    <Dialog
      isOpen={true}
      onClose={onClose}
      title="Create Poll"
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Poll Question *
          </label>
          <Input
            value={formData.question}
            onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, question: (e.target as HTMLInputElement).value }))}
            placeholder="What would you like to ask?"
            required
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Options (2-5) *
          </label>
          <div className="space-y-2">
            {formData.options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e: React.ChangeEvent) => updateOption(index, (e.target as HTMLInputElement).value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1"
                />
                {formData.options.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(index)}
                    className="border-red-600 text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {formData.options.length < 5 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                className="w-full border-dashed border-gray-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Option
              </Button>
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="allowMultiple"
              checked={formData.allowMultiple}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, allowMultiple: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="allowMultiple" className="text-sm text-white">
              Allow multiple choices
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.anonymous}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="anonymous" className="text-sm text-white">
              Anonymous voting
            </label>
          </div>
        </div>

        {/* End Time */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Auto-close (optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, endDate: (e.target as HTMLInputElement).value }))}
              placeholder="End date"
            />
            <Input
              type="time"
              value={formData.endTime}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, endTime: (e.target as HTMLInputElement).value }))}
              placeholder="End time"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !isValid}
            className="flex-1 bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
          >
            {loading ? 'Creating...' : 'Create Poll'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function TaskCreationModal({
  spaceId,
  onClose,
  onComplete
}: {
  spaceId: string;
  onClose: () => void;
  onComplete: (toolType: string, data: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    assignTo: 'volunteer' as 'volunteer' | 'specific',
    assigneeId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        ...formData,
        dueTime: formData.dueDate && formData.dueTime
          ? new Date(`${formData.dueDate}T${formData.dueTime}`)
          : undefined
      };

      const response = await api.post(`/api/spaces/${spaceId}/tasks`, taskData);
      onComplete('task', response.task);
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={true}
      onClose={onClose}
      title="Create Task"
      className="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Task Title *
          </label>
          <Input
            value={formData.title}
            onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, title: (e.target as HTMLInputElement).value }))}
            placeholder="What needs to be done?"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Description
          </label>
          <HiveTextarea
            value={formData.description}
            onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, description: (e.target as HTMLInputElement).value }))}
            placeholder="Task details and requirements..."
            rows={3}
          />
        </div>

        {/* Due Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Due Date
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, dueDate: (e.target as HTMLInputElement).value }))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Due Time
            </label>
            <Input
              type="time"
              value={formData.dueTime}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, dueTime: (e.target as HTMLInputElement).value }))}
            />
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Priority
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['low', 'medium', 'high'] as const).map(priority => (
              <Button
                key={priority}
                type="button"
                variant={formData.priority === priority ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, priority }))}
                className={`text-xs ${
                  priority === 'low' ? 'border-green-600 text-green-400' :
                  priority === 'medium' ? 'border-yellow-600 text-yellow-400' :
                  'border-red-600 text-red-400'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Assignment */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Assignment
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="volunteer"
                name="assignTo"
                checked={formData.assignTo === 'volunteer'}
                onChange={() => setFormData(prev => ({ ...prev, assignTo: 'volunteer' }))}
              />
              <label htmlFor="volunteer" className="text-sm text-white">
                Open for volunteers
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="specific"
                name="assignTo"
                checked={formData.assignTo === 'specific'}
                onChange={() => setFormData(prev => ({ ...prev, assignTo: 'specific' }))}
              />
              <label htmlFor="specific" className="text-sm text-white">
                Assign to specific member
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.title}
            className="flex-1 bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

function ResourceCreationModal({
  spaceId,
  onClose,
  onComplete
}: {
  spaceId: string;
  onClose: () => void;
  onComplete: (toolType: string, data: any) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'upload' | 'link'>('upload');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    tags: '',
    file: null as File | null
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file,
        title: prev.title || file.name.split('.')[0]
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'upload' && formData.file) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', formData.file);
        uploadFormData.append('title', formData.title);
        uploadFormData.append('description', formData.description);
        uploadFormData.append('tags', formData.tags);

        const response = await api.post(`/api/spaces/${spaceId}/resources`, uploadFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        onComplete('resource', response.resource);
      } else if (mode === 'link' && formData.url) {
        const linkData = {
          title: formData.title,
          description: formData.description,
          url: formData.url,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          type: 'link'
        };

        const response = await api.post(`/api/spaces/${spaceId}/resources`, linkData);
        onComplete('resource', response.resource);
      }
    } catch (error) {
      console.error('Failed to create resource:', error);
    } finally {
      setLoading(false);
    }
  };

  const isValid = mode === 'upload'
    ? formData.file && formData.title
    : formData.url && formData.title;

  return (
    <Dialog
      isOpen={true}
      onClose={onClose}
      title="Add Resource"
      className="max-w-lg"
    >
      <div className="space-y-4">
        {/* Mode Selection */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
          <TabsList className="bg-gray-800 border-gray-700 w-full">
            <TabsTrigger value="upload" className="flex-1">
              Upload File
            </TabsTrigger>
            <TabsTrigger value="link" className="flex-1">
              Add Link
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'upload' ? (
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                File *
              </label>
              <input
                type="file"
                onChange={handleFileSelect}
                className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[var(--hive-brand-primary)] file:text-black hover:file:bg-yellow-400"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.png,.gif,.mp4,.mp3"
                required
              />
              {formData.file && (
                <p className="text-xs text-gray-400 mt-1">
                  Selected: {formData.file.name}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                URL *
              </label>
              <Input
                type="url"
                value={formData.url}
                onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, url: (e.target as HTMLInputElement).value }))}
                placeholder="https://example.com/resource"
                required
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Title *
            </label>
            <Input
              value={formData.title}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, title: (e.target as HTMLInputElement).value }))}
              placeholder="Resource title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <HiveTextarea
              value={formData.description}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, description: (e.target as HTMLInputElement).value }))}
              placeholder="What is this resource for?"
              rows={2}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Tags
            </label>
            <Input
              value={formData.tags}
              onChange={(e: React.ChangeEvent) => setFormData(prev => ({ ...prev, tags: (e.target as HTMLInputElement).value }))}
              placeholder="study, notes, exam (comma separated)"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !isValid}
              className="flex-1 bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
            >
              {loading ? 'Adding...' : `Add ${mode === 'upload' ? 'File' : 'Link'}`}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}