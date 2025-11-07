import * as React from "react";
export type ComposerVisibility = "space" | "campus";
export interface ComposerAttachment {
    id: string;
    name: string;
    size: number;
    type: string;
    file?: File | null;
    url?: string;
    progress?: number;
}
export interface ComposerPayload {
    message: string;
    visibility: ComposerVisibility;
    attachments: ComposerAttachment[];
    mentions: string[];
    commands: string[];
}
export interface ComposerChatProps extends React.ComponentPropsWithoutRef<"section"> {
    defaultVisibility?: ComposerVisibility;
    placeholder?: string;
    maxCharacters?: number;
    attachmentsLimit?: number;
    compact?: boolean;
    defaultValue?: string;
    disabled?: boolean;
    onSend?: (payload: ComposerPayload) => void;
    onOpenTool?: (slug: string) => void;
    onToggleVisibility?: (visibility: ComposerVisibility) => void;
    onLintError?: (issue: {
        code: string;
        message: string;
    }) => void;
}
declare const ComposerChat: React.ForwardRefExoticComponent<ComposerChatProps & React.RefAttributes<HTMLElement>>;
export { ComposerChat };
//# sourceMappingURL=composer-chat.d.ts.map