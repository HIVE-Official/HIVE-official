import { DomainEvent } from '../../shared/domain-event';
export class RitualCreatedEvent extends DomainEvent {
    constructor(ritual) {
        super();
        this.payload = ritual;
    }
    get aggregateId() {
        return this.payload.id;
    }
    get eventName() {
        return 'RitualCreated';
    }
    get eventVersion() {
        return 1;
    }
    getPayload() {
        return {
            campusId: this.payload.campusId,
            archetype: this.payload.archetype,
            phase: this.payload.phase,
            startsAt: this.payload.startsAt,
            endsAt: this.payload.endsAt,
        };
    }
}
//# sourceMappingURL=ritual-created.event.js.map