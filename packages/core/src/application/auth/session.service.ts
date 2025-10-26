// Bounded Context Owner: Identity & Access Management Guild
import { SessionEntity } from "../../domain/auth/session/session.entity";
import type { SessionRepository } from "../../domain/auth/session/session.repository";
import type { IdGenerator } from "../../shared/id-generator";
import { err, ok, type Result } from "../../shared/result";

export interface CreateSessionCommand {
  readonly profileId: string;
  readonly scopes?: readonly string[];
  readonly ttlHours?: number;
  readonly device?: {
    readonly userAgent?: string;
    readonly ipAddress?: string;
  };
}

export interface CreateSessionSuccess {
  readonly sessionId: string;
  readonly profileId: string;
  readonly issuedAt: Date;
  readonly expiresAt: Date;
}

export interface RefreshSessionCommand {
  readonly sessionId: string;
  readonly extendByHours: number;
}

export class SessionService {
  constructor(
    private readonly repository: SessionRepository,
    private readonly idGenerator: IdGenerator,
    private readonly clock: () => Date = () => new Date()
  ) {}

  async create(
    command: CreateSessionCommand
  ): Promise<Result<CreateSessionSuccess>> {
    if (!command.profileId) {
      return err("profileId is required");
    }

    const issuedAt = this.clock();
    const expiresAt = new Date(issuedAt.getTime());
    const ttlHours = command.ttlHours ?? 12;
    expiresAt.setHours(expiresAt.getHours() + ttlHours);

    const creationResult = SessionEntity.create({
      sessionId: this.idGenerator.generate(),
      profileId: command.profileId,
      issuedAt,
      expiresAt,
      scopes: command.scopes ?? [],
      device: command.device
    });

    if (!creationResult.ok) {
      return err(creationResult.error);
    }

    const session = creationResult.value;
    await this.repository.save(session);

    return ok({
      sessionId: session.getProps().sessionId,
      profileId: command.profileId,
      issuedAt,
      expiresAt
    });
  }

  async refresh(command: RefreshSessionCommand): Promise<Result<void>> {
    const existing = await this.repository.findById(command.sessionId);
    if (!existing) {
      return err("Session not found");
    }

    const newExpiry = new Date(existing.getProps().expiresAt.getTime());
    newExpiry.setHours(newExpiry.getHours() + command.extendByHours);

    const result = existing.refresh(newExpiry, this.clock());
    if (!result.ok) {
      return err(result.error);
    }

    await this.repository.save(existing);
    return ok(undefined);
  }

  async revoke(sessionId: string): Promise<Result<void>> {
    await this.repository.revoke(sessionId);
    return ok(undefined);
  }
}
