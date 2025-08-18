import { EventDefinition } from './event-system-core';
interface EventCreatorProps {
    spaceId: string;
    onEventCreated?: (event: EventDefinition) => void;
    onCancel?: () => void;
    initialEvent?: Partial<EventDefinition>;
}
export declare function EventCreatorTool({ spaceId, onEventCreated, onCancel, initialEvent }: EventCreatorProps): import("react/jsx-runtime").JSX.Element;
export default EventCreatorTool;
//# sourceMappingURL=event-creator-tool.d.ts.map