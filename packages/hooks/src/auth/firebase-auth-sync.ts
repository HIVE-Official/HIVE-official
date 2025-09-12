import { onAuthStateChanged, type User, type Auth } from 'firebase/auth';
import { doc, onSnapshot, getDoc, type Firestore, type DocumentSnapshot, type FirestoreError } from 'firebase/firestore';
import { useAuthStore } from '../stores/auth-store';

/**
 * Syncs Firebase Auth state with Zustand store
 * This should be initialized once at the app root
 */
export function initializeAuthSync(auth: Auth, db: Firestore) {
  const { setUser, setProfile, setLoading, setError } = useAuthStore.getState();

  // Set up auth state listener
  const unsubscribeAuth = onAuthStateChanged(
    auth,
    async (firebaseUser: User | null) => {
      try {
        setLoading(true);
        
        if (firebaseUser) {
          // User is signed in
          setUser(firebaseUser);
          
          // Fetch user profile from Firestore
          const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (profileDoc.exists()) {
            const profileData = profileDoc.data();
            setProfile({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              handle: profileData.handle || '',
              displayName: profileData.displayName || firebaseUser.displayName || '',
              photoURL: profileData.photoURL || firebaseUser.photoURL || undefined,
              schoolId: profileData.schoolId || '',
              graduationYear: profileData.graduationYear || new Date().getFullYear() + 4,
              major: profileData.major,
              interests: profileData.interests || [],
              isBuilder: profileData.isBuilder || false,
              onboardingCompleted: profileData.onboardingCompleted || false,
              createdAt: profileData.createdAt?.toDate() || new Date(),
              updatedAt: profileData.updatedAt?.toDate() || new Date(),
            });
            
            // Set up real-time profile listener
            const unsubscribeProfile = onSnapshot(
              doc(db, 'users', firebaseUser.uid),
              (doc: DocumentSnapshot) => {
                if (doc.exists()) {
                  const data = doc.data();
                  useAuthStore.getState().updateProfile({
                    ...data,
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate(),
                  });
                }
              },
              (error: FirestoreError) => {
                console.error('Profile listener error:', error);
              }
            );
            
            // Store cleanup function
            (globalThis as Record<string, unknown>).__hiveProfileUnsubscribe = unsubscribeProfile;
          } else {
            // User exists but no profile yet (new user)
            setProfile(null);
          }
        } else {
          // User is signed out
          setUser(null);
          setProfile(null);
          
          // Clean up profile listener if it exists
          if ((globalThis as Record<string, unknown>).__hiveProfileUnsubscribe) {
            ((globalThis as Record<string, unknown>).__hiveProfileUnsubscribe as () => void)();
            delete (globalThis as Record<string, unknown>).__hiveProfileUnsubscribe;
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Auth sync error:', error);
        setError(error instanceof Error ? error.message : 'Authentication error');
        setLoading(false);
      }
    },
    (error: Error) => {
      console.error('Auth state change error:', error);
      setError(error.message);
      setLoading(false);
    }
  );

  // Return cleanup function
  return () => {
    unsubscribeAuth();
    if ((globalThis as Record<string, unknown>).__hiveProfileUnsubscribe) {
      ((globalThis as Record<string, unknown>).__hiveProfileUnsubscribe as () => void)();
      delete (globalThis as Record<string, unknown>).__hiveProfileUnsubscribe;
    }
  };
}

/**
 * Hook to ensure auth is synced
 * Use this in your root layout or _app.tsx
 */
export function useAuthSync(auth: Auth, db: Firestore) {
  // This will run once on mount and set up the sync
  if (typeof window !== 'undefined' && !(globalThis as Record<string, unknown>).__hiveAuthInitialized) {
    (globalThis as Record<string, unknown>).__hiveAuthInitialized = true;
    initializeAuthSync(auth, db);
  }
}