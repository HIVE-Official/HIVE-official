import { DomainEvent } from '../../shared/domain-event';
export class RitualPhaseChangedEvent extends DomainEvent {
    constructor(payload) {
        super();
        this.payload = payload;
    }
    get aggregateId() {
        return this.payload.ritualId;
    }
    get eventName() {
        return 'RitualPhaseChanged';
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
//# sourceMappingURL=ritual-phase-changed.event.js.map