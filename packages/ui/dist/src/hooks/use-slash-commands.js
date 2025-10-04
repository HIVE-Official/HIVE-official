import * as React from "react";
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
export function useSlashCommands({ value, onCommand, autoClear = false, }) {
    const [detectedCommand, setDetectedCommand] = React.useState(null);
    // Command regex patterns
    const commandPatterns = {
        poll: /^\/poll\s*$/i,
        event: /^\/event\s*$/i,
        task: /^\/task\s*$/i,
        resource: /^\/resource\s*$/i,
    };
    // Detect slash commands
    React.useEffect(() => {
        const trimmedValue = value.trim();
        // Check each command pattern
        for (const [command, pattern] of Object.entries(commandPatterns)) {
            if (pattern.test(trimmedValue)) {
                setDetectedCommand(command);
                onCommand?.(command);
                if (autoClear) {
                    // Auto-clear after command is detected
                    setTimeout(() => setDetectedCommand(null), 100);
                }
                return;
            }
        }
        // No command detected
        setDetectedCommand(null);
    }, [value, onCommand, autoClear]);
    const clearCommand = React.useCallback(() => {
        setDetectedCommand(null);
    }, []);
    const isSlashInput = value.trim().startsWith("/");
    return {
        command: detectedCommand,
        clearCommand,
        isSlashInput,
    };
}
//# sourceMappingURL=use-slash-commands.js.map