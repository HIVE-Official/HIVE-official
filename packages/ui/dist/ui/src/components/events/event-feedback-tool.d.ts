import { EventDefinition } from './event-system-core';
interface EventFeedbackToolProps {
    event: EventDefinition;
    isBuilder?: boolean;
    onSendFeedbackRequest?: (recipients: string[]) => Promise<void>;
    onExportFeedback?: (format: 'csv' | 'pdf') => void;
}
export declare function EventFeedbackTool({ event, isBuilder, onSendFeedbackRequest, onExportFeedback }: EventFeedbackToolProps): import("react/jsx-runtime").JSX.Element;
export default EventFeedbackTool;
//# sourceMappingURL=event-feedback-tool.d.ts.map