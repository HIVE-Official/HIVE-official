import { DomainEvent } from '../../shared/domain-event';
export class RitualDeletedEvent extends DomainEvent {
    constructor(payload) {
        super();
        this.payload = payload;
    }
    get aggregateId() {
        return this.payload.ritualId;
    }
    get eventName() {
        return 'RitualDeleted';
    }
    get eventVersion() {
        return 1;
    }
    get data() {
        return this.payload;
    }
    getPayload() {
        return { ...this.payload };
    }
}
//# sourceMappingURL=ritual-deleted.event.js.map