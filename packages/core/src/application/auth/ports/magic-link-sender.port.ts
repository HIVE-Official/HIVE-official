// Bounded Context Owner: Identity & Access Management Guild
import type { UserType } from "../../../domain/profile/profile.types";

export interface MagicLinkPayload {
  readonly email: string;
  readonly profileId: string;
  readonly campusId: string;
  readonly userType: UserType;
}

export interface MagicLinkResult {
  readonly expiresAt: Date;
  readonly messageId: string;
}

export interface MagicLinkSender {
  send(payload: MagicLinkPayload): Promise<MagicLinkResult>;
}
