// Bounded Context Owner: Identity & Access Management Guild
import { SessionEntity } from "../../domain/auth/session/session.entity";
import type { SessionRepository } from "../../domain/auth/session/session.repository";

export class InMemorySessionRepository implements SessionRepository {
  private readonly store = new Map<string, ReturnType<SessionEntity["getProps"]>>();

  async save(session: SessionEntity): Promise<void> {
    this.store.set(session.getProps().sessionId, session.getProps());
  }

  async findById(sessionId: string): Promise<SessionEntity | null> {
    const props = this.store.get(sessionId);
    if (!props) {
      return null;
    }
    const result = SessionEntity.create({
      ...props,
      issuedAt: new Date(props.issuedAt),
      expiresAt: new Date(props.expiresAt)
    });

    if (!result.ok) {
      throw new Error(`Stored session is invalid: ${result.error}`);
    }

    return result.value;
  }

  async revoke(sessionId: string): Promise<void> {
    this.store.delete(sessionId);
  }
}
