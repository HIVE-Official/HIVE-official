'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Image, 
  Link, 
  Tag,
  X,
  Plus,
  Loader2,
  AlertCircle,
  CheckSquare
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Label,
  Badge,
  Card,
  Alert,
  AlertDescription
} from '@hive/ui'

// State Management (these will be optional)
import { useUIStore, useEventStore } from '@hive/hooks'

// API client
import { authenticatedFetch } from '@/lib/api/api-client'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  spaceId?: string
  eventId?: string // For editing existing events
  onSuccess?: (eventId: string) => void
  mode?: 'create' | 'edit'
  initialData?: Partial<EventFormData>
}

interface EventFormData {
  title: string
  description: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
  type: string
  isVirtual: boolean
  registrationRequired: boolean
  maxAttendees: string
  tags: string[]
  isPublic: boolean
  rsvpRequired: boolean
}

const EVENT_TYPES = [
  { value: 'general', label: 'General' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'social', label: 'Social' },
  { value: 'academic', label: 'Academic' },
  { value: 'sports', label: 'Sports' },
  { value: 'career', label: 'Career' },
  { value: 'other', label: 'Other' }
]

/**
 * Unified Event Modal - Consolidates all event creation/editing functionality
 * Combines the best features from both create-event-modal and event-creation-modal
 */
export function EventModal({
  isOpen,
  onClose,
  spaceId,
  eventId,
  onSuccess,
  mode = 'create',
  initialData
}: EventModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState('')
  const [draftSaved, setDraftSaved] = useState(false)
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    type: 'general',
    isVirtual: false,
    registrationRequired: false,
    maxAttendees: '',
    tags: [],
    isPublic: true,
    rsvpRequired: false,
    ...initialData
  })

  // Auto-save draft functionality
  useEffect(() => {
    if (mode === 'create' && formData.title) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(`event-draft-${spaceId}`, JSON.stringify(formData))
        setDraftSaved(true)
        setTimeout(() => setDraftSaved(false), 2000)
      }, 1000)
      
      return () => clearTimeout(timeoutId)
    }
  }, [formData, spaceId, mode])

  // Load draft on mount
  useEffect(() => {
    if (mode === 'create' && spaceId) {
      const draft = localStorage.getItem(`event-draft-${spaceId}`)
      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft)
          setFormData(prev => ({ ...prev, ...parsedDraft }))
        } catch (e) {
          console.error('Failed to load draft:', e)
        }
      }
    }
  }, [spaceId, mode])

  // Load existing event data for editing
  useEffect(() => {
    if (mode === 'edit' && eventId) {
      fetchEventData()
    }
  }, [eventId, mode])

  const fetchEventData = async () => {
    try {
      const response = await authenticatedFetch(`/api/events/${eventId}`)
      if (response.ok) {
        const event = await response.json()
        setFormData({
          title: event.title || '',
          description: event.description || '',
          startDate: event.startDate?.split('T')[0] || '',
          startTime: event.startTime || '',
          endDate: event.endDate?.split('T')[0] || '',
          endTime: event.endTime || '',
          location: event.location || '',
          type: event.type || 'general',
          isVirtual: event.isVirtual || false,
          registrationRequired: event.registrationRequired || false,
          maxAttendees: event.maxAttendees?.toString() || '',
          tags: event.tags || [],
          isPublic: event.isPublic !== false,
          rsvpRequired: event.rsvpRequired || false
        })
      }
    } catch (error) {
      console.error('Failed to fetch event:', error)
      setError('Failed to load event data')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Event title is required')
      return false
    }
    
    if (!formData.startDate || !formData.startTime) {
      setError('Start date and time are required')
      return false
    }
    
    if (!formData.endDate || !formData.endTime) {
      setError('End date and time are required')
      return false
    }
    
    // Check if end datetime is after start datetime
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`)
    
    if (endDateTime <= startDateTime) {
      setError('End date/time must be after start date/time')
      return false
    }
    
    // Check if start date is not in the past (for new events)
    if (mode === 'create') {
      const now = new Date()
      if (startDateTime < now) {
        setError('Event cannot start in the past')
        return false
      }
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      const endpoint = mode === 'edit' 
        ? `/api/events/${eventId}`
        : `/api/spaces/${spaceId}/events`
      
      const method = mode === 'edit' ? 'PUT' : 'POST'
      
      const response = await authenticatedFetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : null,
          startDateTime: `${formData.startDate}T${formData.startTime}`,
          endDateTime: `${formData.endDate}T${formData.endTime}`
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        
        // Clear draft if creating
        if (mode === 'create' && spaceId) {
          localStorage.removeItem(`event-draft-${spaceId}`)
        }
        
        onSuccess?.(data.id || data.eventId)
        onClose()
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          startDate: '',
          startTime: '',
          endDate: '',
          endTime: '',
          location: '',
          type: 'general',
          isVirtual: false,
          registrationRequired: false,
          maxAttendees: '',
          tags: [],
          isPublic: true,
          rsvpRequired: false
        })
      } else {
        const errorData = await response.json()
        setError(errorData.message || `Failed to ${mode} event`)
      }
    } catch (error) {
      console.error(`Failed to ${mode} event:`, error)
      setError(`Failed to ${mode} event. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearDraft = () => {
    if (spaceId) {
      localStorage.removeItem(`event-draft-${spaceId}`)
      setFormData({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        location: '',
        type: 'general',
        isVirtual: false,
        registrationRequired: false,
        maxAttendees: '',
        tags: [],
        isPublic: true,
        rsvpRequired: false
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === 'edit' ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {draftSaved && (
            <Alert>
              <AlertDescription>Draft saved automatically</AlertDescription>
            </Alert>
          )}

          {/* Title */}
          <div>
            <Label htmlFor="title" className="flex items-center gap-2">
              Event Title *
              <span className="text-xs text-gray-500">
                ({formData.title.length}/100)
              </span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              maxLength={100}
              required
              placeholder="Enter event title"
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="flex items-center gap-2">
              Description
              <span className="text-xs text-gray-500">
                ({formData.description.length}/500)
              </span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              maxLength={500}
              rows={3}
              placeholder="Describe your event"
              className="mt-1"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date *
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Start Time *
              </Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Event Type */}
          <div>
            <Label htmlFor="type">Event Type</Label>
            <Select
              name="type"
              value={formData.type}
              onValueChange={(value) => 
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {EVENT_TYPES.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder={formData.isVirtual ? "Enter meeting link" : "Enter location"}
              className="mt-1"
            />
          </div>

          {/* Tags */}
          <div>
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Tags
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add tags"
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer">
                  {tag}
                  <X
                    className="ml-1 h-3 w-3"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Attendees */}
          <div>
            <Label htmlFor="maxAttendees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Max Attendees (optional)
            </Label>
            <Input
              id="maxAttendees"
              name="maxAttendees"
              type="number"
              value={formData.maxAttendees}
              onChange={handleInputChange}
              min="1"
              placeholder="Leave empty for unlimited"
              className="mt-1"
            />
          </div>

          {/* Event Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="isVirtual" className="cursor-pointer">
                Virtual Event
              </Label>
              <Switch
                id="isVirtual"
                name="isVirtual"
                checked={formData.isVirtual}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, isVirtual: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="registrationRequired" className="cursor-pointer flex items-center gap-2">
                <CheckSquare className="h-4 w-4" />
                Registration Required
              </Label>
              <Switch
                id="registrationRequired"
                name="registrationRequired"
                checked={formData.registrationRequired}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, registrationRequired: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="rsvpRequired" className="cursor-pointer">
                RSVP Required
              </Label>
              <Switch
                id="rsvpRequired"
                name="rsvpRequired"
                checked={formData.rsvpRequired}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, rsvpRequired: checked }))
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="isPublic" className="cursor-pointer">
                Public Event
              </Label>
              <Switch
                id="isPublic"
                name="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, isPublic: checked }))
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <div>
              {mode === 'create' && spaceId && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={clearDraft}
                  disabled={isSubmitting}
                >
                  Clear Draft
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {mode === 'edit' ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  mode === 'edit' ? 'Update Event' : 'Create Event'
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Export with both names for backward compatibility during migration
export { EventModal as CreateEventModal }
export { EventModal as EventCreationModal }