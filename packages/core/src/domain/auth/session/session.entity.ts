// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "../../../shared/result";

const sessionScopeSchema = z.array(z.string().min(1)).default([]);

export interface SessionProps {
  readonly sessionId: string;
  readonly profileId: string;
  readonly issuedAt: Date;
  readonly expiresAt: Date;
  readonly scopes: readonly string[];
  readonly device?: {
    readonly userAgent?: string;
    readonly ipAddress?: string;
  };
}

export class SessionEntity {
  private props: SessionProps;

  private constructor(props: SessionProps) {
    this.props = props;
  }

  static create(input: Omit<SessionProps, "issuedAt"> & { issuedAt?: Date }): Result<SessionEntity> {
    const issuedAt = input.issuedAt ?? new Date();
    if (!(input.expiresAt instanceof Date) || Number.isNaN(input.expiresAt.getTime())) {
      return err("expiresAt must be a valid date");
    }

    if (input.expiresAt.getTime() <= issuedAt.getTime()) {
      return err("expiresAt must be in the future");
    }

    if (!input.sessionId) {
      return err("sessionId is required");
    }

    if (!input.profileId) {
      return err("profileId is required");
    }

    const scopes = sessionScopeSchema.parse(input.scopes ?? []);

    return ok(
      new SessionEntity({
        sessionId: input.sessionId,
        profileId: input.profileId,
        issuedAt,
        expiresAt: input.expiresAt,
        scopes,
        device: input.device
      })
    );
  }

  refresh(newExpiry: Date, reference: Date = new Date()): Result<void> {
    if (newExpiry.getTime() <= reference.getTime()) {
      return err("New expiry must be in the future");
    }

    this.props = {
      ...this.props,
      expiresAt: newExpiry
    };

    return ok(undefined);
  }

  getProps(): SessionProps {
    return { ...this.props, scopes: [...this.props.scopes] };
  }

  hasExpired(reference: Date = new Date()): boolean {
    return this.props.expiresAt.getTime() <= reference.getTime();
  }
}
