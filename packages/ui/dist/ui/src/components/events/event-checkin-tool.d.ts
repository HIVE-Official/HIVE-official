import { EventDefinition, RSVPResponse } from './event-system-core';
interface EventCheckinProps {
    event: EventDefinition;
    rsvps: (RSVPResponse & {
        userName: string;
        userEmail: string;
    })[];
    onCheckin: (userId: string, guestCount?: number) => Promise<void>;
    onGenerateQR?: () => Promise<string>;
    onExportAttendance?: (format: 'csv' | 'excel') => void;
}
export declare function EventCheckinTool({ event, rsvps, onCheckin, onGenerateQR, onExportAttendance }: EventCheckinProps): import("react/jsx-runtime").JSX.Element;
export default EventCheckinTool;
//# sourceMappingURL=event-checkin-tool.d.ts.map