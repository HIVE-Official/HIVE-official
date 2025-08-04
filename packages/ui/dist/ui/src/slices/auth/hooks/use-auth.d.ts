/**
 * useAuth Hook
 *
 * Main authentication hook that manages user state, login/logout flows,
 * and authentication status for HIVE applications.
 */
import type { UseAuthReturn } from '../types';
declare const AuthContext: import("react").Context<UseAuthReturn>;
export declare function useAuthProvider(): UseAuthReturn;
export declare function useAuth(): UseAuthReturn;
export { AuthContext };
//# sourceMappingURL=use-auth.d.ts.map