"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { InlineToolMenu } from "./inline-tool-menu"
import { useSlashCommands } from "../../hooks/use-slash-commands"
import { Plus, Paperclip, Image as ImageIcon, Send } from "lucide-react"

export interface SpaceComposerWithToolsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Composer value */
  value: string

  /** Value change handler */
  onValueChange: (value: string) => void

  /** Post creation handler */
  onCreatePost: (content: string) => void

  /** Tool selection handler (opens appropriate modal) */
  onToolSelect?: (toolId: "poll" | "event" | "task" | "resource") => void

  /** Placeholder text */
  placeholder?: string

  /** Whether user can attach files */
  canAttach?: boolean

  /** File attach handler */
  onAttachFile?: () => void

  /** Image attach handler */
  onAttachImage?: () => void

  /** Show inline tools menu */
  showInlineTools?: boolean
}

const SpaceComposerWithTools = React.forwardRef<HTMLDivElement, SpaceComposerWithToolsProps>(
  (
    {
      className,
      value,
      onValueChange,
      onCreatePost,
      onToolSelect,
      placeholder = "Message #space...",
      canAttach = true,
      onAttachFile,
      onAttachImage,
      showInlineTools = true,
      ...props
    },
    ref
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const [toolMenuOpen, setToolMenuOpen] = React.useState(false)

    // Slash command detection
    const { command, isSlashInput } = useSlashCommands({
      value,
      onCommand: (cmd) => {
        onToolSelect?.(cmd)
        onValueChange("") // Clear input after command
      },
      autoClear: true,
    })

    // Auto-resize textarea
    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [value])

    // Handle post creation
    const handlePost = () => {
      if (value.trim() && onCreatePost) {
        onCreatePost(value)
        onValueChange("")
      }
    }

    // Handle Enter key (Shift+Enter for newline, Enter to send)
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handlePost()
      }
    }

    return (
      <div
        ref={ref}
        className={cn("border-t border-white/8 bg-[#000000] p-6", className)}
        {...props}
      >
        <div className="relative max-w-4xl mx-auto">
          {/* Slash Command Helper */}
          {isSlashInput && !command && (
            <div className="absolute bottom-full left-0 mb-2 w-64 rounded-lg border border-white/8 bg-[#0c0c0c] shadow-lg p-3 text-xs">
              <p className="font-semibold text-white mb-1">Slash Commands:</p>
              <ul className="space-y-1 text-white/70">
                <li><code className="bg-[#000000] px-1 rounded">/poll</code> - Create a poll</li>
                <li><code className="bg-[#000000] px-1 rounded">/event</code> - Create an event</li>
                <li><code className="bg-[#000000] px-1 rounded">/task</code> - Create a task</li>
                <li><code className="bg-[#000000] px-1 rounded">/resource</code> - Add a resource</li>
              </ul>
            </div>
          )}

          {/* Textarea Container with Claude-style rounded border */}
          <div className="relative rounded-3xl border border-white/8 bg-[#0c0c0c] focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/20 transition-all duration-smooth">
            {/* Left Tools (Plus Button for Inline Menu) */}
            {showInlineTools && (
              <div className="absolute left-2 bottom-2 flex items-center gap-1">
                <InlineToolMenu
                  open={toolMenuOpen}
                  onOpenChange={setToolMenuOpen}
                  onToolSelect={onToolSelect}
                  position="above"
                  trigger={
                    <button
                      type="button"
                      className={cn(
                        "p-2 hover:bg-white/10 rounded-full transition-all duration-smooth",
                        toolMenuOpen
                          ? "bg-white/10 text-white"
                          : "text-white/70 hover:text-white"
                      )}
                      title="Quick tools (Poll, Event, Task, Resource)"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  }
                />
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e: React.ChangeEvent) => onValueChange((e.target as HTMLInputElement).value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={cn(
                "w-full resize-none rounded-3xl bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none min-h-[52px] max-h-[200px]",
                showInlineTools ? "px-14 py-3 pr-32" : "px-6 py-3 pr-24"
              )}
              rows={1}
            />

            {/* Right Action Buttons */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1">
              {/* Attach File */}
              {canAttach && onAttachFile && (
                <button
                  type="button"
                  onClick={onAttachFile}
                  className="p-2 hover:bg-white/10 rounded-full transition-all duration-smooth text-white/70 hover:text-white"
                  title="Attach file"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
              )}

              {/* Add Image */}
              {canAttach && onAttachImage && (
                <button
                  type="button"
                  onClick={onAttachImage}
                  className="p-2 hover:bg-white/10 rounded-full transition-all duration-smooth text-white/70 hover:text-white"
                  title="Add image"
                >
                  <ImageIcon className="h-5 w-5" />
                </button>
              )}

              {/* Send Button */}
              <button
                type="button"
                onClick={handlePost}
                disabled={!value.trim()}
                className={cn(
                  "p-2 rounded-full transition-all duration-smooth",
                  value.trim()
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                )}
                title="Send message (Enter)"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-[10px] text-white/70 text-center mt-2">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10">Enter</kbd> to send,{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-white/10">Shift+Enter</kbd> for new line
            {showInlineTools && (
              <>
                {" "} · Click <Plus className="h-3 w-3 inline" /> for quick tools
              </>
            )}
          </p>
        </div>
      </div>
    )
  }
)

SpaceComposerWithTools.displayName = "SpaceComposerWithTools"

export { SpaceComposerWithTools }
