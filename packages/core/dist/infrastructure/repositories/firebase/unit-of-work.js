"use strict";
/**
 * Firebase Unit of Work Implementation
 * Manages transactions across repositories
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseUnitOfWork = void 0;
const profile_repository_1 = require("./profile.repository");
const connection_repository_1 = require("./connection.repository");
const space_repository_1 = require("./space.repository");
const feed_repository_1 = require("./feed.repository");
const ritual_repository_1 = require("./ritual.repository");
class FirebaseUnitOfWork {
    constructor() {
        this.transactionStarted = false;
        this.transactionData = new Map();
        // Initialize all repositories
        this._profiles = new profile_repository_1.FirebaseProfileRepository();
        this._connections = new connection_repository_1.FirebaseConnectionRepository();
        this._spaces = new space_repository_1.FirebaseSpaceRepository();
        this._feeds = new feed_repository_1.FirebaseFeedRepository();
        this._rituals = new ritual_repository_1.FirebaseRitualRepository();
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
exports.FirebaseUnitOfWork = FirebaseUnitOfWork;
//# sourceMappingURL=unit-of-work.js.map