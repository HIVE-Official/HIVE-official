// Bounded Context Owner: Identity & Access Management Guild
export const SESSION_COOKIE_NAME = "hive_session";
export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 12 // 12 hours
};
