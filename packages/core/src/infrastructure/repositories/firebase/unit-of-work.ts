/**
 * Firebase Unit of Work Implementation
 * Manages transactions across repositories
 */

import { IUnitOfWork, IProfileRepository, IConnectionRepository, ISpaceRepository, IFeedRepository, IRitualRepository } from '../interfaces';
import { FirebaseProfileRepository } from './profile.repository';
import { FirebaseConnectionRepository } from './connection.repository';
import { FirebaseSpaceRepository } from './space.repository';
import { FirebaseFeedRepository } from './feed.repository';
import { FirebaseRitualRepository } from './ritual.repository';

export class FirebaseUnitOfWork implements IUnitOfWork {
  private _profiles: IProfileRepository;
  private _connections: IConnectionRepository;
  private _spaces: ISpaceRepository;
  private _feeds: IFeedRepository;
  private _rituals: IRitualRepository;

  private transactionStarted: boolean = false;
  private transactionData: Map<string, any> = new Map();

  constructor() {
    // Initialize all repositories
    this._profiles = new FirebaseProfileRepository();
    this._connections = new FirebaseConnectionRepository();
    this._spaces = new FirebaseSpaceRepository();
    this._feeds = new FirebaseFeedRepository();
    this._rituals = new FirebaseRitualRepository();
  }

  get profiles(): IProfileRepository {
    return this._profiles;
  }

  get connections(): IConnectionRepository {
    return this._connections;
  }

  get spaces(): ISpaceRepository {
    return this._spaces;
  }

  get feeds(): IFeedRepository {
    return this._feeds;
  }

  get rituals(): IRitualRepository {
    return this._rituals;
  }

  async begin(): Promise<void> {
    if (this.transactionStarted) {
      throw new Error('Transaction already started');
    }
    this.transactionStarted = true;
    this.transactionData.clear();
  }

  async commit(): Promise<void> {
    if (!this.transactionStarted) {
      throw new Error('No transaction to commit');
    }

    try {
      // In a real implementation, this would batch write all changes
      // For now, Firebase operations are atomic at the document level
      // We'd need to use Firebase transactions for true ACID compliance

      this.transactionStarted = false;
      this.transactionData.clear();
    } catch (error) {
      await this.rollback();
      throw error;
    }
  }

  async rollback(): Promise<void> {
    if (!this.transactionStarted) {
      return;
    }

    // Clear any pending changes
    this.transactionData.clear();
    this.transactionStarted = false;
  }
}