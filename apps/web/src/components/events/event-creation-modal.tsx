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
  AlertCircle
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
  Card
} from '@hive/ui'
import { logger } from '@hive/core'

// State Management
import { useUIStore, useEventStore } from '@hive/hooks'

// Queries & Mutations
import { useCreateEvent, useUpdateEvent, useSpaces } from '@hive/hooks'

interface EventCreationModalMigratedProps {
  spaceId?: string
  eventId?: string // For editing existing events
  onClose?: () => void
  onSuccess?: (eventId: string) => void
}

export function EventCreationModalMigrated({
  spaceId,
  eventId,
  onClose,
  onSuccess
}: EventCreationModalMigratedProps) {
  // Global state
  const { showToast } = useUIStore()
  const { getDraft, saveDraft, clearDraft } = useEventStore()
  
  // Queries & Mutations
  const { data: spaces } = useSpaces()
  const createEvent = useCreateEvent()
  const updateEvent = useUpdateEvent()
  
  // Form state - initialize from draft if available
  const draft = getDraft(eventId || 'new')
  const [formData, setFormData] = useState({
    title: draft?.title || '',
    description: draft?.description || '',
    location: draft?.location || '',
    startDate: draft?.startDate || '',
    startTime: draft?.startTime || '',
    endDate: draft?.endDate || '',
    endTime: draft?.endTime || '',
    spaceId: draft?.spaceId || spaceId || '',
    category: draft?.category || 'general',
    capacity: draft?.capacity || null,
    isVirtual: draft?.isVirtual || false,
    virtualLink: draft?.virtualLink || '',
    tags: draft?.tags || [],
    image: draft?.image || '',
    requiresRSVP: draft?.requiresRSVP || false,
    isPublic: draft?.isPublic || true
  })
  
  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft(eventId || 'new', formData)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [formData, eventId, saveDraft])
  
  const handleSubmit = async () => {
    // Validation
    if (!formData.title || !formData.startDate || !formData.startTime) {
      // showToast({
      //   title: 'Missing required fields',
      //   description: 'Please fill in all required fields.',
      //   variant: 'error'
      // })
      return
    }
    
    if (!formData.spaceId) {
      // showToast({
      //   title: 'Select a space',
      //   description: 'Please select a space for this event.',
      //   variant: 'error'
      // })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Combine date and time
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
      const endDateTime = formData.endDate && formData.endTime 
        ? new Date(`${formData.endDate}T${formData.endTime}`)
        : new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000) // Default 2 hours
      
      const eventData = {
        ...formData,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
        capacity: formData.capacity ? Number(formData.capacity) : null
      }
      
      let result
      if (eventId) {
        result = await updateEvent.mutateAsync({ eventId, updates: eventData })
      } else {
        result = await createEvent.mutateAsync(eventData)
      }
      
      // Clear draft on success
      clearDraft(eventId || 'new')
      
      // showToast({
      //   title: eventId ? 'Event updated' : 'Event created',
      //   description: `Your event "${formData.title}" has been ${eventId ? 'updated' : 'created'} successfully.`,
      //   variant: 'success'
      // })
      
      onSuccess?.(result.id)
      onClose?.()
    } catch (error) {
      logger.error('Failed to save event', { error })
      // showToast({
      //   title: 'Failed to save event',
      //   description: 'Please try again or contact support.',
      //   variant: 'error'
      // })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.toLowerCase()]
      }))
      setNewTag('')
    }
  }
  
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }
  
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {eventId ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Study Session, Club Meeting, Game Night"
                value={formData.title}
                onChange={(e: any) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                maxLength={100}
              />
              <p className="text-xs text-muted mt-1">
                {formData.title.length}/100 characters
              </p>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your event..."
                value={formData.description}
                onChange={(e: any) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                maxLength={500}
              />
              <p className="text-xs text-muted mt-1">
                {formData.description.length}/500 characters
              </p>
            </div>
          </div>
          
          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date & Time
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <Label htmlFor="startTime">Start Time *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  min={formData.startDate}
                />
              </div>
              
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>
          </div>
          
          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h3>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="virtual"
                checked={formData.isVirtual}
                onCheckedChange={(checked: any) => setFormData(prev => ({ ...prev, isVirtual: checked }))}
              />
              <Label htmlFor="virtual">Virtual Event</Label>
            </div>
            
            {formData.isVirtual ? (
              <div>
                <Label htmlFor="virtualLink">Meeting Link</Label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <Input
                    id="virtualLink"
                    type="url"
                    placeholder="https://zoom.us/..."
                    value={formData.virtualLink}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, virtualLink: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <Input
                    id="location"
                    placeholder="e.g., Capen Hall Room 110"
                    value={formData.location}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Event Settings */}
          <div className="space-y-4">
            <h3 className="font-medium">Event Settings</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="space">Space *</Label>
                <Select
                  value={formData.spaceId}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, spaceId: value }))}
                >
                  <SelectTrigger id="space">
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                  <SelectContent>
                    {spaces?.map(space => (
                      <SelectItem key={space.id} value={space.id}>
                        {space.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="Unlimited"
                    value={formData.capacity || ''}
                    onChange={(e: any) => setFormData(prev => ({ ...prev, capacity: e.target.value ? Number(e.target.value) : null }))}
                    className="pl-10"
                    min="1"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="rsvp"
                  checked={formData.requiresRSVP}
                  onCheckedChange={(checked: any) => setFormData(prev => ({ ...prev, requiresRSVP: checked }))}
                />
                <Label htmlFor="rsvp">Require RSVP</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={formData.isPublic}
                  onCheckedChange={(checked: any) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                />
                <Label htmlFor="public">Public Event</Label>
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag..."
                value={newTag}
                onChange={(e: any) => setNewTag(e.target.value)}
                onKeyPress={(e: any) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleAddTag}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag}
                    <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="ghost"
            onClick={() => clearDraft(eventId || 'new')}
            disabled={isSubmitting}
          >
            Clear Draft
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.title || !formData.startDate || !formData.startTime || !formData.spaceId}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {eventId ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                eventId ? 'Update Event' : 'Create Event'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}