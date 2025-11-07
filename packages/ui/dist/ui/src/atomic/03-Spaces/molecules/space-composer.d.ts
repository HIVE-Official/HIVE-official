export interface SpaceComposerProps {
    /** Space name for context */
    spaceName: string;
    /** Whether user can create events */
    canCreateEvents?: boolean;
    /** Whether user can use tools */
    canUseTools?: boolean;
    /** Submit post handler */
    onSubmit?: (content: string, attachments: {
        type: 'image' | 'event' | 'tool';
        data: unknown;
    }[]) => void;
    /** Placeholder text */
    placeholder?: string;
}
export declare function SpaceComposer({ spaceName, canCreateEvents, canUseTools, onSubmit, placeholder, }: SpaceComposerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=space-composer.d.ts.map