/**
 * Firebase Unit of Work Implementation
 * Manages transactions across repositories
 */
import { FirebaseProfileRepository } from './profile.repository';
import { FirebaseConnectionRepository } from './connection.repository';
import { FirebaseSpaceRepository } from './space.repository';
import { FirebaseFeedRepository } from './feed.repository';
import { FirebaseRitualRepository } from './ritual.repository';
export class FirebaseUnitOfWork {
    constructor() {
        this.transactionStarted = false;
        this.transactionData = new Map();
        // Initialize all repositories
        this._profiles = new FirebaseProfileRepository();
        this._connections = new FirebaseConnectionRepository();
        this._spaces = new FirebaseSpaceRepository();
        this._feeds = new FirebaseFeedRepository();
        this._rituals = new FirebaseRitualRepository();
    }
    get profiles() {
        return this._profiles;
    }
    get connections() {
        return this._connections;
    }
    get spaces() {
        return this._spaces;
    }
    get feeds() {
        return this._feeds;
    }
    get rituals() {
        return this._rituals;
    }
    async begin() {
        if (this.transactionStarted) {
            throw new Error('Transaction already started');
        }
        this.transactionStarted = true;
        this.transactionData.clear();
    }
    async commit() {
        if (!this.transactionStarted) {
            throw new Error('No transaction to commit');
        }
        try {
            // In a real implementation, this would batch write all changes
            // For now, Firebase operations are atomic at the document level
            // We'd need to use Firebase transactions for true ACID compliance
            this.transactionStarted = false;
            this.transactionData.clear();
        }
        catch (error) {
            await this.rollback();
            throw error;
        }
    }
    async rollback() {
        if (!this.transactionStarted) {
            return;
        }
        // Clear any pending changes
        this.transactionData.clear();
        this.transactionStarted = false;
    }
}
//# sourceMappingURL=unit-of-work.js.map