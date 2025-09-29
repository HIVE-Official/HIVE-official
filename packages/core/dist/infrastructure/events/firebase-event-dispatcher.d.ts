/**
 * Firebase Event Dispatcher
 * Publishes domain events to Firestore for real-time updates
 */
import { IEventDispatcher } from '../repositories/interfaces';
export declare class FirebaseEventDispatcher implements IEventDispatcher {
    private handlers;
    private readonly eventsCollection;
    dispatch(events: any[]): Promise<void>;
    subscribe(eventType: string, handler: (event: any) => Promise<void>): void;
    unsubscribe(eventType: string, handler: (event: any) => Promise<void>): void;
    private notifyHandlers;
}
export declare const eventDispatcher: FirebaseEventDispatcher;
//# sourceMappingURL=firebase-event-dispatcher.d.ts.map