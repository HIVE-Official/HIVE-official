"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Textarea } from "../atoms/textarea"
import { Label } from "../atoms/label"

/**
 * Inline Tool Creation Forms
 *
 * SPEC-compliant inline forms that appear in the chat board
 * when users click the tool buttons.
 */

// Event Creation Form
export interface EventFormData {
  title: string
  description?: string
  startDate: string
  startTime: string
  location?: string
}

export interface InlineEventFormProps {
  onSubmit: (data: EventFormData) => void
  onCancel: () => void
  className?: string
}

export const InlineEventForm = React.forwardRef<HTMLDivElement, InlineEventFormProps>(
  ({ onSubmit, onCancel, className }, ref) => {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [startDate, setStartDate] = React.useState("")
    const [startTime, setStartTime] = React.useState("")
    const [location, setLocation] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!title || !startDate || !startTime) return
      onSubmit({ title, description, startDate, startTime, location })
    }

    return (
      <div ref={ref} className={cn("rounded-lg border border-white/10 bg-[#0c0c0c] p-4", className)}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>📅</span> Create Event
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="event-title" className="text-xs">Title *</Label>
            <Input
              id="event-title"
              value={title}
              onChange={(e: React.ChangeEvent) => setTitle(e.target.value)}
              placeholder="Weekly build session"
              required
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="event-date" className="text-xs">Date *</Label>
              <Input
                id="event-date"
                type="date"
                value={startDate}
                onChange={(e: React.ChangeEvent) => setStartDate(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="event-time" className="text-xs">Time *</Label>
              <Input
                id="event-time"
                type="time"
                value={startTime}
                onChange={(e: React.ChangeEvent) => setStartTime(e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="event-location" className="text-xs">Location</Label>
            <Input
              id="event-location"
              value={location}
              onChange={(e: React.ChangeEvent) => setLocation(e.target.value)}
              placeholder="Davis Hall Lab 101"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="event-description" className="text-xs">Description</Label>
            <Textarea
              id="event-description"
              value={description}
              onChange={(e: React.ChangeEvent) => setDescription(e.target.value)}
              placeholder="Hands-on work on competition bot..."
              rows={2}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" size="sm" className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
              Create Event
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }
)

InlineEventForm.displayName = "InlineEventForm"

// Poll Creation Form
export interface PollFormData {
  question: string
  options: string[]
  allowMultiple?: boolean
  anonymous?: boolean
}

export interface InlinePollFormProps {
  onSubmit: (data: PollFormData) => void
  onCancel: () => void
  className?: string
}

export const InlinePollForm = React.forwardRef<HTMLDivElement, InlinePollFormProps>(
  ({ onSubmit, onCancel, className }, ref) => {
    const [question, setQuestion] = React.useState("")
    const [options, setOptions] = React.useState(["", ""])

    const addOption = () => {
      if (options.length < 5) {
        setOptions([...options, ""])
      }
    }

    const updateOption = (index: number, value: string) => {
      const newOptions = [...options]
      newOptions[index] = value
      setOptions(newOptions)
    }

    const removeOption = (index: number) => {
      if (options.length > 2) {
        setOptions(options.filter((_, i) => i !== index))
      }
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const validOptions = options.filter(opt => opt.trim())
      if (!question || validOptions.length < 2) return
      onSubmit({ question, options: validOptions })
    }

    return (
      <div ref={ref} className={cn("rounded-lg border border-white/10 bg-[#0c0c0c] p-4", className)}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>📊</span> Create Poll
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="poll-question" className="text-xs">Question *</Label>
            <Input
              id="poll-question"
              value={question}
              onChange={(e: React.ChangeEvent) => setQuestion(e.target.value)}
              placeholder="What time works best for the meeting?"
              required
              className="mt-1"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Options (2-5) *</Label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option}
                  onChange={(e: React.ChangeEvent) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                  className="flex-1"
                />
                {options.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    className="h-9 w-9"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {options.length < 5 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addOption}
                className="w-full"
              >
                + Add Option
              </Button>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" size="sm" className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
              Create Poll
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }
)

InlinePollForm.displayName = "InlinePollForm"

// Task Creation Form
export interface TaskFormData {
  title: string
  description?: string
  dueDate?: string
  assignTo?: "volunteer" | "specific"
  priority?: "low" | "medium" | "high"
}

export interface InlineTaskFormProps {
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  className?: string
}

export const InlineTaskForm = React.forwardRef<HTMLDivElement, InlineTaskFormProps>(
  ({ onSubmit, onCancel, className }, ref) => {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [dueDate, setDueDate] = React.useState("")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!title) return
      onSubmit({ title, description, dueDate })
    }

    return (
      <div ref={ref} className={cn("rounded-lg border border-white/10 bg-[#0c0c0c] p-4", className)}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>📋</span> Create Task
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="task-title" className="text-xs">Task *</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e: React.ChangeEvent) => setTitle(e.target.value)}
              placeholder="Clean common room"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="task-due" className="text-xs">Due Date</Label>
            <Input
              id="task-due"
              type="date"
              value={dueDate}
              onChange={(e: React.ChangeEvent) => setDueDate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="task-description" className="text-xs">Description</Label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e: React.ChangeEvent) => setDescription(e.target.value)}
              placeholder="Details about the task..."
              rows={2}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" size="sm" className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
              Create Task
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }
)

InlineTaskForm.displayName = "InlineTaskForm"

// Resource Upload Form
export interface ResourceFormData {
  title: string
  url?: string
  file?: File
  description?: string
}

export interface InlineResourceFormProps {
  onSubmit: (data: ResourceFormData) => void
  onCancel: () => void
  className?: string
}

export const InlineResourceForm = React.forwardRef<HTMLDivElement, InlineResourceFormProps>(
  ({ onSubmit, onCancel, className }, ref) => {
    const [title, setTitle] = React.useState("")
    const [url, setUrl] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [type, setType] = React.useState<"link" | "file">("link")

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!title || (type === "link" && !url)) return
      onSubmit({ title, url, description })
    }

    return (
      <div ref={ref} className={cn("rounded-lg border border-white/10 bg-[#0c0c0c] p-4", className)}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <span>📚</span> Add Resource
          </h3>
          <Button variant="ghost" size="icon" onClick={onCancel} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="resource-title" className="text-xs">Title *</Label>
            <Input
              id="resource-title"
              value={title}
              onChange={(e: React.ChangeEvent) => setTitle(e.target.value)}
              placeholder="Study guide"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="resource-url" className="text-xs">Link or URL *</Label>
            <Input
              id="resource-url"
              type="url"
              value={url}
              onChange={(e: React.ChangeEvent) => setUrl(e.target.value)}
              placeholder="https://..."
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="resource-description" className="text-xs">Description</Label>
            <Textarea
              id="resource-description"
              value={description}
              onChange={(e: React.ChangeEvent) => setDescription(e.target.value)}
              placeholder="What is this resource for?"
              rows={2}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="submit" size="sm" className="flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
              Add Resource
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }
)

InlineResourceForm.displayName = "InlineResourceForm"
