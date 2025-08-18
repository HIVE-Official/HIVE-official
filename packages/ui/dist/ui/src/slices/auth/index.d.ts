/**
 * Auth Slice - Authentication & Session Management
 *
 * This slice handles all authentication flows, session management,
 * and authentication state for HIVE users.
 */
export { HiveAuthFlow } from '../../components/auth/hive-auth-flow';
export type { AuthUser, AuthState, SessionData } from './types';
export { useAuth } from './hooks/use-auth';
export { useSession } from './hooks/use-session';
export { useMagicLink } from './hooks/use-magic-link';
export { AUTH_ROUTES, MAGIC_LINK_CONFIG } from './constants';
//# sourceMappingURL=index.d.ts.map