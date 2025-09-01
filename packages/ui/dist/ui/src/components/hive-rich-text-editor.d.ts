import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveRichTextEditorVariants: (props?: ({
    variant?: "default" | "minimal" | "elevated" | "premium" | null | undefined;
    size?: "sm" | "default" | "lg" | "xl" | null | undefined;
    mode?: "split" | "preview" | "edit" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface CampusLink {
    type: 'space' | 'student' | 'course' | 'tool';
    id: string;
    name: string;
    url?: string;
}
export interface CollaborativeUser {
    id: string;
    name: string;
    avatar?: string;
    cursor?: {
        line: number;
        column: number;
    };
    selection?: {
        start: {
            line: number;
            column: number;
        };
        end: {
            line: number;
            column: number;
        };
    };
}
export interface HiveRichTextEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>, VariantProps<typeof hiveRichTextEditorVariants> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    showToolbar?: boolean;
    showPreview?: boolean;
    showWordCount?: boolean;
    showCollaborators?: boolean;
    maxLength?: number;
    autosave?: boolean;
    autosaveInterval?: number;
    campusLinks?: CampusLink[];
    collaborators?: CollaborativeUser[];
    onSave?: (content: string) => void;
    onImageUpload?: (file: File) => Promise<string>;
    onCampusLinkSearch?: (query: string, type: CampusLink['type']) => Promise<CampusLink[]>;
    syntaxHighlight?: boolean;
    spellCheck?: boolean;
    autoFocus?: boolean;
    error?: string;
    disabled?: boolean;
}
declare const HiveRichTextEditor: React.ForwardRefExoticComponent<HiveRichTextEditorProps & React.RefAttributes<HTMLDivElement>>;
export { HiveRichTextEditor, hiveRichTextEditorVariants };
//# sourceMappingURL=hive-rich-text-editor.d.ts.map