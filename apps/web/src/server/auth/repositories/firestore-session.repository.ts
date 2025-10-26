// Bounded Context Owner: Identity & Access Management Guild
import type { Firestore, Timestamp } from "firebase-admin/firestore";
import { SessionEntity } from "@core";
import type { SessionRepository } from "@core";

const COLLECTION = "sessions";

interface SessionRecord {
  readonly sessionId: string;
  readonly profileId: string;
  readonly issuedAt: Date | Timestamp;
  readonly expiresAt: Date | Timestamp;
  readonly scopes: readonly string[];
  readonly device?: {
    readonly userAgent?: string;
    readonly ipAddress?: string;
  };
}

export class FirestoreSessionRepository implements SessionRepository {
  constructor(private readonly firestore: Firestore) {}

  async save(session: SessionEntity): Promise<void> {
    const props = session.getProps();
    await this.firestore.collection(COLLECTION).doc(props.sessionId).set(
      {
        sessionId: props.sessionId,
        profileId: props.profileId,
        issuedAt: props.issuedAt,
        expiresAt: props.expiresAt,
        scopes: props.scopes,
        device: props.device ?? undefined,
        updatedAt: new Date()
      },
      { merge: true }
    );
  }

  async findById(sessionId: string): Promise<SessionEntity | null> {
    const doc = await this.firestore.collection(COLLECTION).doc(sessionId).get();
    if (!doc.exists) {
      return null;
    }

    const data = doc.data() as SessionRecord;
    const result = SessionEntity.create({
      sessionId: data.sessionId,
      profileId: data.profileId,
      issuedAt: this.toDate(data.issuedAt) ?? new Date(),
      expiresAt: this.toDate(data.expiresAt) ?? new Date(),
      scopes: data.scopes ?? [],
      device: data.device
    });

    if (!result.ok) {
      throw new Error(`Stored session is invalid: ${result.error}`);
    }

    return result.value;
  }

  async revoke(sessionId: string): Promise<void> {
    await this.firestore.collection(COLLECTION).doc(sessionId).delete();
  }

  private toDate(value: Date | Timestamp | undefined): Date | undefined {
    if (!value) {
      return undefined;
    }

    if (value instanceof Date) {
      return value;
    }

    if (typeof value.toDate === "function") {
      return value.toDate();
    }

    return new Date(value as unknown as string);
  }
}
