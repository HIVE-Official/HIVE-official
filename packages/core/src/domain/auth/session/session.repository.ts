// Bounded Context Owner: Identity & Access Management Guild
import type { SessionEntity } from "./session.entity";

export interface SessionRepository {
  save(session: SessionEntity): Promise<void>;
  findById(sessionId: string): Promise<SessionEntity | null>;
  revoke(sessionId: string): Promise<void>;
}
