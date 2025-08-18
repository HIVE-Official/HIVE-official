import { EventDefinition } from './event-system-core';
interface EventCreatorToolProps {
    spaceId: string;
    onEventCreated?: (event: EventDefinition) => void;
    onCancel?: () => void;
    initialEvent?: Partial<EventDefinition>;
}
export declare function EventCreatorToolV2({ spaceId, onEventCreated, onCancel, initialEvent }: EventCreatorToolProps): import("react/jsx-runtime").JSX.Element;
export default EventCreatorToolV2;
//# sourceMappingURL=event-creator-tool-v2.d.ts.map