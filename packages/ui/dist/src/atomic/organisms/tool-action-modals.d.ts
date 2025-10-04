export interface PollModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: PollData) => void;
}
export interface PollData {
    question: string;
    options: string[];
    settings: {
        anonymous: boolean;
        multipleChoice: boolean;
        endDate?: string;
    };
}
export declare const PollModal: ({ open, onOpenChange, onSubmit }: PollModalProps) => import("react/jsx-runtime").JSX.Element;
export interface EventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: EventData) => void;
}
export interface EventData {
    title: string;
    startTime: string;
    endTime?: string;
    location?: string;
    description?: string;
    rsvpLimit?: number;
    template?: "meeting" | "social" | "workshop";
}
export declare const EventModal: ({ open, onOpenChange, onSubmit }: EventModalProps) => import("react/jsx-runtime").JSX.Element;
export interface TaskModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: TaskData) => void;
}
export interface TaskData {
    title: string;
    description?: string;
    dueDate: string;
    assignTo?: "volunteer" | "specific";
    assignees?: string[];
    priority: "low" | "medium" | "high";
}
export declare const TaskModal: ({ open, onOpenChange, onSubmit }: TaskModalProps) => import("react/jsx-runtime").JSX.Element;
export interface ResourceModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: ResourceData) => void;
}
export interface ResourceData {
    type: "upload" | "link";
    title: string;
    url?: string;
    file?: File;
    description?: string;
    postAnnouncement: boolean;
}
export declare const ResourceModal: ({ open, onOpenChange, onSubmit }: ResourceModalProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tool-action-modals.d.ts.map