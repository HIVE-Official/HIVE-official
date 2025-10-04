"use client"

import * as React from "react"
import { Textarea } from "../atoms/textarea"
import { Button } from "../atoms/button"
import { cn } from "../../lib/utils"

export interface CommentInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  avatar?: string
  userName: string
  placeholder?: string
  maxLength?: number
  showCharCount?: boolean
  isLoading?: boolean
  disabled?: boolean
  onSubmit?: (comment: string) => void | Promise<void>
  submitLabel?: string
}

const CommentInput = React.forwardRef<HTMLDivElement, CommentInputProps>(
  (
    {
      className,
      avatar,
      userName,
      placeholder = "Write a comment...",
      maxLength = 500,
      showCharCount = false,
      isLoading = false,
      disabled = false,
      onSubmit,
      submitLabel = "Post",
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState("")
    const [rows, setRows] = React.useState(1)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    // Generate initials from name
    const initials = userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    // Auto-resize textarea
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (maxLength && newValue.length > maxLength) return

      setValue(newValue)

      // Calculate rows based on content
      const lineCount = (newValue.match(/\n/g) || []).length + 1
      setRows(Math.min(Math.max(lineCount, 1), 6))
    }

    const handleSubmit = async () => {
      if (!value.trim() || isLoading || disabled) return

      try {
        await onSubmit?.(value.trim())
        setValue("")
        setRows(1)
      } catch (error) {
        console.error("Failed to submit comment:", error)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Submit on Cmd/Ctrl + Enter
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault()
        handleSubmit()
      }
    }

    const remainingChars = maxLength - value.length
    const isNearLimit = remainingChars < 50
    const isAtLimit = remainingChars === 0

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-smooth ease-liquid focus-within:border-primary/50 focus-within:shadow-md",
          disabled && "opacity-60 pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="h-12 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted transition-smooth ease-liquid">
          {avatar ? (
            <img src={avatar} alt={userName} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold text-primary">
              {initials}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            rows={rows}
            className="min-h-0 resize-none border-0 p-0 shadow-none focus-visible:ring-0 transition-smooth ease-liquid"
          />

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {showCharCount && (
                <span
                  className={cn(
                    "transition-smooth ease-liquid",
                    isNearLimit && "text-orange-500",
                    isAtLimit && "text-destructive font-medium"
                  )}
                >
                  {remainingChars}
                </span>
              )}
              <span className="hidden sm:inline">
                <kbd className="rounded bg-muted px-1 font-mono text-[10px]">⌘</kbd>
                <kbd className="rounded bg-muted px-1 font-mono text-[10px]">Enter</kbd>
                {" "}to post
              </span>
            </div>

            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!value.trim() || disabled || isLoading}
              className="shrink-0 transition-smooth ease-liquid"
            >
              {isLoading ? "Posting..." : submitLabel}
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

CommentInput.displayName = "CommentInput"

export { CommentInput }
