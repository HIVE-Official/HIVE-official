import * as React from "react";
/**
 * Inline Tool Creation Forms
 *
 * SPEC-compliant inline forms that appear in the chat board
 * when users click the tool buttons.
 */
export interface EventFormData {
    title: string;
    description?: string;
    startDate: string;
    startTime: string;
    location?: string;
}
export interface InlineEventFormProps {
    onSubmit: (data: EventFormData) => void;
    onCancel: () => void;
    className?: string;
}
export declare const InlineEventForm: React.ForwardRefExoticComponent<InlineEventFormProps & React.RefAttributes<HTMLDivElement>>;
export interface PollFormData {
    question: string;
    options: string[];
    allowMultiple?: boolean;
    anonymous?: boolean;
}
export interface InlinePollFormProps {
    onSubmit: (data: PollFormData) => void;
    onCancel: () => void;
    className?: string;
}
export declare const InlinePollForm: React.ForwardRefExoticComponent<InlinePollFormProps & React.RefAttributes<HTMLDivElement>>;
export interface TaskFormData {
    title: string;
    description?: string;
    dueDate?: string;
    assignTo?: "volunteer" | "specific";
    priority?: "low" | "medium" | "high";
}
export interface InlineTaskFormProps {
    onSubmit: (data: TaskFormData) => void;
    onCancel: () => void;
    className?: string;
}
export declare const InlineTaskForm: React.ForwardRefExoticComponent<InlineTaskFormProps & React.RefAttributes<HTMLDivElement>>;
export interface ResourceFormData {
    title: string;
    url?: string;
    file?: File;
    description?: string;
}
export interface InlineResourceFormProps {
    onSubmit: (data: ResourceFormData) => void;
    onCancel: () => void;
    className?: string;
}
export declare const InlineResourceForm: React.ForwardRefExoticComponent<InlineResourceFormProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=inline-tool-forms.d.ts.map