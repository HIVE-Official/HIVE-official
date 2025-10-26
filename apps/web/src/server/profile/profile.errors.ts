// Bounded Context Owner: Identity & Access Management Guild

export class ProfileServiceError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly code: string = "PROFILE_SERVICE_ERROR"
  ) {
    super(message);
    this.name = "ProfileServiceError";
  }
}

export const isProfileServiceError = (error: unknown): error is ProfileServiceError =>
  error instanceof ProfileServiceError;
