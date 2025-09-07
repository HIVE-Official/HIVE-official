import { type Auth } from 'firebase/auth';
import { type Firestore } from 'firebase/firestore';
/**
 * Syncs Firebase Auth state with Zustand store
 * This should be initialized once at the app root
 */
export declare function initializeAuthSync(auth: Auth, db: Firestore): () => void;
/**
 * Hook to ensure auth is synced
 * Use this in your root layout or _app.tsx
 */
export declare function useAuthSync(auth: Auth, db: Firestore): void;
//# sourceMappingURL=firebase-auth-sync.d.ts.map