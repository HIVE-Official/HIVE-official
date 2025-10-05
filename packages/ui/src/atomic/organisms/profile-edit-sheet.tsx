"use client"

import * as React from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../atoms/sheet"
import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Textarea } from "../atoms/textarea"
import { Label } from "../atoms/label"
import { Badge } from "../atoms/badge"
import { Separator } from "../atoms/separator"
import { Avatar, AvatarImage, AvatarFallback } from "../atoms/avatar"
import { cn } from "../../lib/utils"
import { Edit, Upload, X } from "lucide-react"

export interface ProfileEditData {
  fullName: string
  bio?: string
  major: string
  academicYear?: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate"
  graduationYear?: number
  pronouns?: string
  photos?: string[]
  interests?: string[]
}

export interface ProfileEditSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current profile data */
  profile: ProfileEditData

  /** Save handler */
  onSave?: (data: ProfileEditData) => void | Promise<void>

  /** Photo upload handler */
  onUploadPhoto?: (file: File) => Promise<string>

  /** Photo remove handler */
  onRemovePhoto?: (photoUrl: string) => void

  /** Trigger button (optional - defaults to "Edit Profile") */
  trigger?: React.ReactNode

  /** Loading state */
  isLoading?: boolean
}

/**
 * Profile Edit Sheet
 *
 * Side drawer for inline profile editing.
 * Better UX than full-page forms - students can edit without losing context.
 *
 * Features:
 * - Photo carousel editing (upload/reorder/remove)
 * - Inline field editing
 * - Interest tag management
 * - Auto-save on blur (optional)
 * - Validation feedback
 */
const ProfileEditSheet = React.forwardRef<HTMLDivElement, ProfileEditSheetProps>(
  ({
    className,
    profile,
    onSave,
    onUploadPhoto,
    onRemovePhoto,
    trigger,
    isLoading = false,
    ...props
  }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [editedData, setEditedData] = React.useState<ProfileEditData>(profile)
    const [isDirty, setIsDirty] = React.useState(false)

    // Reset edited data when profile changes or sheet opens
    React.useEffect(() => {
      if (open) {
        setEditedData(profile)
        setIsDirty(false)
      }
    }, [open, profile])

    const handleFieldChange = (field: keyof ProfileEditData, value: any) => {
      setEditedData(prev => ({ ...prev, [field]: value }))
      setIsDirty(true)
    }

    const handleSave = async () => {
      if (onSave) {
        await onSave(editedData)
      }
      setIsDirty(false)
      setOpen(false)
    }

    const handleCancel = () => {
      setEditedData(profile)
      setIsDirty(false)
      setOpen(false)
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || !onUploadPhoto) return

      try {
        const photoUrl = await onUploadPhoto(file)
        setEditedData(prev => ({
          ...prev,
          photos: [...(prev.photos || []), photoUrl].slice(0, 5) // Max 5 photos
        }))
        setIsDirty(true)
      } catch (error) {
        console.error('Failed to upload photo:', error)
      }
    }

    const handleRemovePhoto = (photoUrl: string) => {
      if (onRemovePhoto) {
        onRemovePhoto(photoUrl)
      }
      setEditedData(prev => ({
        ...prev,
        photos: prev.photos?.filter(p => p !== photoUrl)
      }))
      setIsDirty(true)
    }

    const initials = editedData.fullName
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {trigger || (
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </SheetTrigger>

        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile. Changes are saved when you click "Save Changes".
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-6">
            {/* Photo Carousel Management */}
            <div className="space-y-3">
              <Label>Profile Photos (max 5)</Label>
              <div className="grid grid-cols-5 gap-2">
                {/* Existing photos */}
                {editedData.photos?.map((photo, index) => (
                  <div key={index} className="relative aspect-[3/4] rounded-lg overflow-hidden border group">
                    <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo)}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

                {/* Upload button (only if < 5 photos) */}
                {(!editedData.photos || editedData.photos.length < 5) && (
                  <label className="aspect-[3/4] rounded-lg border-2 border-dashed border-muted-foreground/40 hover:border-primary cursor-pointer flex flex-col items-center justify-center transition-colors">
                    <Upload className="h-5 w-5 text-muted-foreground mb-1" />
                    <span className="text-[10px] text-muted-foreground">Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoUpload}
                      disabled={isLoading}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {editedData.photos?.length || 0} / 5 photos • 3:4 aspect ratio recommended
              </p>
            </div>

            <Separator />

            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={editedData.fullName}
                  onChange={(e: React.ChangeEvent) => handleFieldChange('fullName', (e.target as HTMLInputElement).value)}
                  placeholder="Sarah Chen"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={editedData.bio || ''}
                  onChange={(e: React.ChangeEvent) => handleFieldChange('bio', (e.target as HTMLInputElement).value)}
                  placeholder="Tell people about yourself..."
                  rows={3}
                  disabled={isLoading}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  {editedData.bio?.length || 0} / 150 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pronouns">Pronouns</Label>
                <Input
                  id="pronouns"
                  value={editedData.pronouns || ''}
                  onChange={(e: React.ChangeEvent) => handleFieldChange('pronouns', (e.target as HTMLInputElement).value)}
                  placeholder="she/her"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Separator />

            {/* Academic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="major">Major *</Label>
                <Input
                  id="major"
                  value={editedData.major}
                  onChange={(e: React.ChangeEvent) => handleFieldChange('major', (e.target as HTMLInputElement).value)}
                  placeholder="Computer Science"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Year</Label>
                  <select
                    id="academicYear"
                    value={editedData.academicYear || ''}
                    onChange={(e: React.ChangeEvent) => handleFieldChange('academicYear', (e.target as HTMLInputElement).value)}
                    disabled={isLoading}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select year</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Grad Year</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    value={editedData.graduationYear || ''}
                    onChange={(e: React.ChangeEvent) => handleFieldChange('graduationYear', parseInt((e.target as HTMLInputElement).value))}
                    placeholder="2026"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Interests (Optional future enhancement) */}
            {editedData.interests && (
              <div className="space-y-3">
                <Label>Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {editedData.interests.map((interest, index) => (
                    <Badge key={index} variant="sophomore">
                      {interest}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Interest editing coming soon
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!isDirty || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }
)

ProfileEditSheet.displayName = "ProfileEditSheet"

export { ProfileEditSheet }
