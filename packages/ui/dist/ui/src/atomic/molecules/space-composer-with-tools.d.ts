import * as React from "react";
export interface SpaceComposerWithToolsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Composer value */
    value: string;
    /** Value change handler */
    onValueChange: (value: string) => void;
    /** Post creation handler */
    onCreatePost: (content: string) => void;
    /** Tool selection handler (opens appropriate modal) */
    onToolSelect?: (toolId: "poll" | "event" | "task" | "resource") => void;
    /** Placeholder text */
    placeholder?: string;
    /** Whether user can attach files */
    canAttach?: boolean;
    /** File attach handler */
    onAttachFile?: () => void;
    /** Image attach handler */
    onAttachImage?: () => void;
    /** Show inline tools menu */
    showInlineTools?: boolean;
}
declare const SpaceComposerWithTools: React.ForwardRefExoticComponent<SpaceComposerWithToolsProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceComposerWithTools };
//# sourceMappingURL=space-composer-with-tools.d.ts.map