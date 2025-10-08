export type SessionSecurityLevel = "standard" | "elevated" | "restricted";

export interface SessionMetadata {
  userAgent?: string;
  ip?: string;
  createdAt?: number;
  lastRotated?: number;
}

export interface SessionData {
  sessionId: string;
  userId: string;
  email: string;
  handle?: string;
  campusId?: string;
  schoolId?: string;
  issuedAt?: number;
  expiresAt?: number;
  verifiedAt?: string;
  fingerprint?: string;
  lastActivity?: number;
  rotationCount?: number;
  securityLevel?: SessionSecurityLevel;
  metadata?: SessionMetadata;
  csrf?: string;
  isAdmin?: boolean;
}

export interface SessionCreationInput {
  userId: string;
  email: string;
  handle?: string;
  campusId?: string;
  schoolId?: string;
  isAdmin?: boolean;
}
