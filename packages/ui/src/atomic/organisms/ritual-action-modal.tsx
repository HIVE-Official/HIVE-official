"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Dialog, DialogContent } from "../atoms/dialog"
import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import { Textarea } from "../atoms/textarea"
import { Trophy, Sparkles, Zap, PartyPopper, Check, Loader2 } from "lucide-react"

export interface RitualAction {
  id: string
  name: string
  description: string
  type: "manual" | "upload" | "text" | "number"
  required?: boolean
  placeholder?: string
  reward?: string
}

export interface RitualActionModalProps {
  /** Whether modal is open */
  open: boolean

  /** Close handler */
  onClose: () => void

  /** Action to complete */
  action: RitualAction

  /** Ritual name (for context) */
  ritualName?: string

  /** Completion handler */
  onComplete: (data: Record<string, any>) => void | Promise<void>

  /** Loading state */
  isLoading?: boolean
}

const RitualActionModal = React.forwardRef<HTMLDivElement, RitualActionModalProps>(
  (
    {
      open,
      onClose,
      action,
      ritualName,
      onComplete,
      isLoading = false,
    },
    ref
  ) => {
    const [formData, setFormData] = React.useState<Record<string, any>>({})
    const [files, setFiles] = React.useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [showCelebration, setShowCelebration] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (isSubmitting || isLoading) return

      setIsSubmitting(true)

      // Show celebration animation
      setShowCelebration(true)

      // Wait for celebration, then complete
      setTimeout(async () => {
        try {
          await onComplete({
            actionId: action.id,
            ...formData,
            files: files.length > 0 ? files : undefined,
          })
          onClose()
        } catch (error) {
          console.error("Error completing action:", error)
          setShowCelebration(false)
        } finally {
          setIsSubmitting(false)
        }
      }, 1200)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
      setFiles(selectedFiles)
    }

    const isValid =
      action.type === "manual" ||
      (action.type === "upload" && files.length > 0) ||
      (action.type === "text" && formData.text?.trim()) ||
      (action.type === "number" && !isNaN(formData.value))

    // Celebration Screen
    if (showCelebration) {
      return (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent
            ref={ref}
            className="bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] border border-[#FFD700]/30 max-w-md overflow-hidden"
          >
            <div className="relative flex flex-col items-center justify-center py-16 space-y-6">
              {/* Animated celebration background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#FFD700]/5 animate-pulse" />

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <Sparkles className="absolute top-10 left-10 h-6 w-6 text-[#FFD700] animate-bounce" style={{ animationDelay: "0s" }} />
                <Sparkles className="absolute top-20 right-16 h-4 w-4 text-[#FFD700]/70 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <Sparkles className="absolute bottom-16 left-16 h-5 w-5 text-[#FFD700]/80 animate-bounce" style={{ animationDelay: "0.4s" }} />
                <Zap className="absolute top-16 right-10 h-7 w-7 text-[#FFD700] animate-pulse" style={{ animationDelay: "0.1s" }} />
                <PartyPopper className="absolute bottom-20 right-20 h-6 w-6 text-[#FFD700]/60 animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>

              {/* Main trophy animation */}
              <div className="relative z-10 animate-bounce">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.4)]">
                  <Trophy className="h-12 w-12 text-black" />
                </div>
              </div>

              <div className="relative z-10 text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Amazing!</h2>
                <p className="text-lg text-[#FFD700] font-semibold">
                  +1 Step Closer
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )
    }

    // Main Action Screen - Redesigned to be engaging, not form-like
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          ref={ref}
          className="bg-[#0c0c0c] border border-white/8 sm:max-w-md p-0 overflow-hidden"
        >
          {/* Reward Header - Visual emphasis */}
          {action.reward && (
            <div className="relative bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 border-b border-[#FFD700]/30 px-6 py-4">
              <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[#FFD700]/10 to-transparent" />
              <div className="relative flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-6 w-6 text-[#FFD700]" />
                </div>
                <div>
                  <p className="text-xs text-white/70 uppercase tracking-wide font-medium">Unlock</p>
                  <p className="text-base font-bold text-[#FFD700]">{action.reward}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            {/* Action Title - Bold and engaging */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white leading-tight">
                {action.name}
              </h2>
              <p className="text-sm text-white/70 leading-relaxed">
                {action.description}
              </p>
            </div>

            {/* Interactive Input Area - Visual and engaging */}
            <div>
              {action.type === "text" && (
                <Textarea
                  value={formData.text || ""}
                  onChange={(e: React.ChangeEvent) => setFormData({ ...formData, text: e.target.value })}
                  placeholder={action.placeholder || "Share your thoughts..."}
                  required={action.required}
                  className="bg-white/5 border-white/8 text-white placeholder:text-white/50 text-base min-h-[120px] focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/50 transition-all"
                />
              )}

              {action.type === "number" && (
                <Input
                  type="number"
                  step="0.1"
                  value={formData.value || ""}
                  onChange={(e: React.ChangeEvent) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                  placeholder={action.placeholder || "0"}
                  required={action.required}
                  className="bg-white/5 border-white/8 text-white text-3xl font-bold text-center h-20 placeholder:text-white/50 focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/50 transition-all"
                />
              )}

              {action.type === "upload" && (
                <label className={cn(
                  "relative flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed cursor-pointer transition-all",
                  files.length > 0
                    ? "border-[#FFD700] bg-[#FFD700]/10"
                    : "border-white/20 hover:border-[#FFD700]/50 hover:bg-white/5"
                )}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    multiple
                    required={action.required}
                    className="hidden"
                  />
                  {files.length > 0 ? (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="h-12 w-12 rounded-full bg-[#FFD700] flex items-center justify-center">
                        <Check className="h-6 w-6 text-black" />
                      </div>
                      <p className="text-sm font-semibold text-white">
                        {files.length} file{files.length > 1 ? "s" : ""} selected
                      </p>
                      <p className="text-xs text-white/50 px-4 text-center truncate max-w-full">
                        {files.map((f) => f.name).join(", ")}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-3">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-white/70" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-white">Tap to upload</p>
                        <p className="text-xs text-white/50 mt-1">Show your progress</p>
                      </div>
                    </div>
                  )}
                </label>
              )}

              {action.type === "manual" && (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#FFD700]/20 blur-2xl animate-pulse" />
                    <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg">
                      <Sparkles className="h-10 w-10 text-black" />
                    </div>
                  </div>
                  <p className="text-sm text-white/70 text-center">
                    Tap below to mark complete
                  </p>
                </div>
              )}
            </div>

            {/* Progress indicator for ritual */}
            {ritualName && (
              <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                <span>{ritualName}</span>
              </div>
            )}

            {/* Action Button - Prominent and engaging */}
            <div className="space-y-3">
              <Button
                type="submit"
                size="lg"
                disabled={!isValid || isSubmitting || isLoading}
                className={cn(
                  "w-full h-14 text-base font-bold transition-all",
                  isValid
                    ? "bg-white text-black hover:bg-[#FFD700] hover:text-black hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                )}
              >
                {isSubmitting || isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    {action.type === "manual" ? "Mark Complete" : "Submit & Continue"}
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting || isLoading}
                className="w-full py-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                Maybe later
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
)

RitualActionModal.displayName = "RitualActionModal"

export { RitualActionModal }
// RitualAction already exported above
