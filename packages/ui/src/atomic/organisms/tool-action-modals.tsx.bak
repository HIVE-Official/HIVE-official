"use client"

import * as React from "react"
import { Calendar, X, Plus, Trash2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../atoms/dialog"
import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"
import { Textarea } from "../atoms/textarea"
import { Switch } from "../atoms/switch"
import { Badge } from "../atoms/badge"

// Poll Modal
export interface PollModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: PollData) => void
}

export interface PollData {
  question: string
  options: string[]
  settings: {
    anonymous: boolean
    multipleChoice: boolean
    endDate?: string
  }
}

export const PollModal = ({ open, onOpenChange, onSubmit }: PollModalProps) => {
  const [question, setQuestion] = React.useState("")
  const [options, setOptions] = React.useState(["", ""])
  const [anonymous, setAnonymous] = React.useState(false)
  const [multipleChoice, setMultipleChoice] = React.useState(false)
  const [endDate, setEndDate] = React.useState("")

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleSubmit = () => {
    onSubmit({
      question,
      options: options.filter(o => o.trim() !== ""),
      settings: {
        anonymous,
        multipleChoice,
        endDate: endDate || undefined,
      },
    })
    // Reset form
    setQuestion("")
    setOptions(["", ""])
    setAnonymous(false)
    setMultipleChoice(false)
    setEndDate("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            Create Poll
          </DialogTitle>
          <DialogDescription>
            Ask a question and get quick feedback from space members
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Question */}
          <div className="space-y-2">
            <Label htmlFor="poll-question">Question</Label>
            <Input
              id="poll-question"
              placeholder="What's your question?"
              value={question}
              onChange={(e: React.ChangeEvent) => setQuestion(e.target.value)}
            />
          </div>

          {/* Options */}
          <div className="space-y-2">
            <Label>Options (2-5)</Label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e: React.ChangeEvent) => updateOption(index, e.target.value)}
                />
                {options.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {options.length < 5 && (
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            )}
          </div>

          {/* Settings */}
          <div className="space-y-3 border-t border-white/8 pt-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="poll-anonymous">Anonymous voting</Label>
              <Switch
                id="poll-anonymous"
                checked={anonymous}
                onCheckedChange={setAnonymous}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="poll-multiple">Multiple choice</Label>
              <Switch
                id="poll-multiple"
                checked={multipleChoice}
                onCheckedChange={setMultipleChoice}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="poll-end">End date (optional)</Label>
              <Input
                id="poll-end"
                type="datetime-local"
                value={endDate}
                onChange={(e: React.ChangeEvent) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!question || options.filter(o => o.trim() !== "").length < 2}
          >
            Create Poll
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Event Modal
export interface EventModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: EventData) => void
}

export interface EventData {
  title: string
  startTime: string
  endTime?: string
  location?: string
  description?: string
  rsvpLimit?: number
  template?: "meeting" | "social" | "workshop"
}

export const EventModal = ({ open, onOpenChange, onSubmit }: EventModalProps) => {
  const [title, setTitle] = React.useState("")
  const [startTime, setStartTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [rsvpLimit, setRsvpLimit] = React.useState("")

  const quickTemplates = [
    { id: "meeting", label: "Meeting", icon: "👥" },
    { id: "social", label: "Social", icon: "🎉" },
    { id: "workshop", label: "Workshop", icon: "🛠️" },
  ]

  const applyTemplate = (template: "meeting" | "social" | "workshop") => {
    const templates = {
      meeting: { title: "Team Meeting", description: "Regular team sync" },
      social: { title: "Social Gathering", description: "Casual hangout" },
      workshop: { title: "Workshop", description: "Learning session" },
    }
    setTitle(templates[template].title)
    setDescription(templates[template].description)
  }

  const handleSubmit = () => {
    onSubmit({
      title,
      startTime,
      endTime: endTime || undefined,
      location: location || undefined,
      description: description || undefined,
      rsvpLimit: rsvpLimit ? parseInt(rsvpLimit) : undefined,
    })
    // Reset form
    setTitle("")
    setStartTime("")
    setEndTime("")
    setLocation("")
    setDescription("")
    setRsvpLimit("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">📅</span>
            Create Event
          </DialogTitle>
          <DialogDescription>
            Schedule an event for your space members
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Quick Templates */}
          <div className="flex gap-2">
            {quickTemplates.map((template) => (
              <Button
                key={template.id}
                variant="outline"
                size="sm"
                onClick={() => applyTemplate(template.id as any)}
                className="flex-1"
              >
                <span className="mr-1">{template.icon}</span>
                {template.label}
              </Button>
            ))}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="event-title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="event-title"
              placeholder="Event name"
              value={title}
              onChange={(e: React.ChangeEvent) => setTitle(e.target.value)}
            />
          </div>

          {/* Date/Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-start">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <Input
                id="event-start"
                type="datetime-local"
                value={startTime}
                onChange={(e: React.ChangeEvent) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-end">End Time</Label>
              <Input
                id="event-end"
                type="datetime-local"
                value={endTime}
                onChange={(e: React.ChangeEvent) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="event-location">Location</Label>
            <Input
              id="event-location"
              placeholder="Where is this happening?"
              value={location}
              onChange={(e: React.ChangeEvent) => setLocation(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="event-description">Description</Label>
            <Textarea
              id="event-description"
              placeholder="Event details..."
              value={description}
              onChange={(e: React.ChangeEvent) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* RSVP Limit */}
          <div className="space-y-2">
            <Label htmlFor="event-rsvp">RSVP Limit (optional)</Label>
            <Input
              id="event-rsvp"
              type="number"
              placeholder="Max attendees"
              value={rsvpLimit}
              onChange={(e: React.ChangeEvent) => setRsvpLimit(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title || !startTime}
          >
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Task Modal
export interface TaskModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: TaskData) => void
}

export interface TaskData {
  title: string
  description?: string
  dueDate: string
  assignTo?: "volunteer" | "specific"
  assignees?: string[]
  priority: "low" | "medium" | "high"
}

export const TaskModal = ({ open, onOpenChange, onSubmit }: TaskModalProps) => {
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [dueDate, setDueDate] = React.useState("")
  const [priority, setPriority] = React.useState<"low" | "medium" | "high">("medium")

  const handleSubmit = () => {
    onSubmit({
      title,
      description: description || undefined,
      dueDate,
      priority,
    })
    // Reset form
    setTitle("")
    setDescription("")
    setDueDate("")
    setPriority("medium")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            Create Task
          </DialogTitle>
          <DialogDescription>
            Assign a task with a deadline to space members
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="task-title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="task-title"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e: React.ChangeEvent) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              placeholder="Task details..."
              value={description}
              onChange={(e: React.ChangeEvent) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="task-due">
              Due Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="task-due"
              type="datetime-local"
              value={dueDate}
              onChange={(e: React.ChangeEvent) => setDueDate(e.target.value)}
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as const).map((p) => (
                <Button
                  key={p}
                  variant={priority === p ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriority(p)}
                  className="flex-1 capitalize"
                >
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title || !dueDate}
          >
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Resource Modal
export interface ResourceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: ResourceData) => void
}

export interface ResourceData {
  type: "upload" | "link"
  title: string
  url?: string
  file?: File
  description?: string
  postAnnouncement: boolean
}

export const ResourceModal = ({ open, onOpenChange, onSubmit }: ResourceModalProps) => {
  const [type, setType] = React.useState<"upload" | "link">("link")
  const [title, setTitle] = React.useState("")
  const [url, setUrl] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [postAnnouncement, setPostAnnouncement] = React.useState(true)

  const handleSubmit = () => {
    onSubmit({
      type,
      title,
      url: type === "link" ? url : undefined,
      description: description || undefined,
      postAnnouncement,
    })
    // Reset form
    setType("link")
    setTitle("")
    setUrl("")
    setDescription("")
    setPostAnnouncement(true)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">📚</span>
            Add Resource
          </DialogTitle>
          <DialogDescription>
            Upload a file or link to a resource for your space
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Type Selection */}
          <div className="flex gap-2">
            <Button
              variant={type === "link" ? "default" : "outline"}
              size="sm"
              onClick={() => setType("link")}
              className="flex-1"
            >
              🔗 Link
            </Button>
            <Button
              variant={type === "upload" ? "default" : "outline"}
              size="sm"
              onClick={() => setType("upload")}
              className="flex-1"
            >
              📎 Upload
            </Button>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="resource-title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="resource-title"
              placeholder="Resource name"
              value={title}
              onChange={(e: React.ChangeEvent) => setTitle(e.target.value)}
            />
          </div>

          {/* URL or Upload */}
          {type === "link" ? (
            <div className="space-y-2">
              <Label htmlFor="resource-url">
                URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="resource-url"
                type="url"
                placeholder="https://..."
                value={url}
                onChange={(e: React.ChangeEvent) => setUrl(e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="resource-file">File</Label>
              <div className="border-2 border-dashed border-white/8 rounded-lg p-6 text-center">
                <p className="text-sm text-white/70">
                  Drag & drop file here or click to browse
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="resource-description">Description</Label>
            <Textarea
              id="resource-description"
              placeholder="What is this resource for?"
              value={description}
              onChange={(e: React.ChangeEvent) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          {/* Post Announcement */}
          <div className="flex items-center justify-between">
            <Label htmlFor="resource-announce">Post announcement in feed</Label>
            <Switch
              id="resource-announce"
              checked={postAnnouncement}
              onCheckedChange={setPostAnnouncement}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title || (type === "link" && !url)}
          >
            Add Resource
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
