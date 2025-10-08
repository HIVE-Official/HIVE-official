import * as React from "react"

export type SlashCommand = "poll" | "event" | "task" | "resource"

export interface UseSlashCommandsProps {
  /** Input value */
  value: string

  /** Callback when command is detected */
  onCommand?: (command: SlashCommand) => void

  /** Whether to auto-clear input after command */
  autoClear?: boolean
}

export interface UseSlashCommandsReturn {
  /** Detected command (if any) */
  command: SlashCommand | null

  /** Clear the detected command */
  clearCommand: () => void

  /** Check if input starts with slash */
  isSlashInput: boolean
}

/**
 * Hook to detect and handle slash commands in text input
 *
 * Supported commands:
 * - /poll - Create a poll
 * - /event - Create an event
 * - /task - Create a task
 * - /resource - Add a resource
 *
 * @example
 * ```tsx
 * const { command, clearCommand } = useSlashCommands({
 *   value: inputValue,
 *   onCommand: (cmd) => {
 *     if (cmd === 'poll') openPollModal()
 *   }
 * })
 * ```
 */
export function useSlashCommands({
  value,
  onCommand,
  autoClear = false,
}: UseSlashCommandsProps): UseSlashCommandsReturn {
  const [detectedCommand, setDetectedCommand] = React.useState<SlashCommand | null>(null)

  // Command regex patterns
  const commandPatterns: Record<SlashCommand, RegExp> = {
    poll: /^\/poll\s*$/i,
    event: /^\/event\s*$/i,
    task: /^\/task\s*$/i,
    resource: /^\/resource\s*$/i,
  }

  // Detect slash commands
  React.useEffect(() => {
    const trimmedValue = value.trim()

    // Check each command pattern
    for (const [command, pattern] of Object.entries(commandPatterns)) {
      if (pattern.test(trimmedValue)) {
        setDetectedCommand(command as SlashCommand)
        onCommand?.(command as SlashCommand)

        if (autoClear) {
          // Auto-clear after command is detected
          setTimeout(() => setDetectedCommand(null), 100)
        }
        return
      }
    }

    // No command detected
    setDetectedCommand(null)
  }, [value, onCommand, autoClear])

  const clearCommand = React.useCallback(() => {
    setDetectedCommand(null)
  }, [])

  const isSlashInput = value.trim().startsWith("/")

  return {
    command: detectedCommand,
    clearCommand,
    isSlashInput,
  }
}
