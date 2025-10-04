export type SlashCommand = "poll" | "event" | "task" | "resource";
export interface UseSlashCommandsProps {
    /** Input value */
    value: string;
    /** Callback when command is detected */
    onCommand?: (command: SlashCommand) => void;
    /** Whether to auto-clear input after command */
    autoClear?: boolean;
}
export interface UseSlashCommandsReturn {
    /** Detected command (if any) */
    command: SlashCommand | null;
    /** Clear the detected command */
    clearCommand: () => void;
    /** Check if input starts with slash */
    isSlashInput: boolean;
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
export declare function useSlashCommands({ value, onCommand, autoClear, }: UseSlashCommandsProps): UseSlashCommandsReturn;
//# sourceMappingURL=use-slash-commands.d.ts.map