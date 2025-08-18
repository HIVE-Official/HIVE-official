import { EventDefinition } from './event-system-core';
interface RSVPManagerProps {
    event: EventDefinition;
    onUpdateEvent?: (updates: Partial<EventDefinition>) => void;
    onMessageAttendees?: (recipients: string[], message: string) => void;
    onExportRSVPs?: (format: 'csv' | 'excel') => void;
}
export declare function RSVPManagerTool({ event, onUpdateEvent, onMessageAttendees, onExportRSVPs }: RSVPManagerProps): import("react/jsx-runtime").JSX.Element;
export default RSVPManagerTool;
//# sourceMappingURL=rsvp-manager-tool.d.ts.map