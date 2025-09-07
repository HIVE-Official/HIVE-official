"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAuthSync = initializeAuthSync;
exports.useAuthSync = useAuthSync;
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const auth_store_1 = require("../stores/auth-store");
/**
 * Syncs Firebase Auth state with Zustand store
 * This should be initialized once at the app root
 */
function initializeAuthSync(auth, db) {
    const { setUser, setProfile, setLoading, setError } = auth_store_1.useAuthStore.getState();
    // Set up auth state listener
    const unsubscribeAuth = (0, auth_1.onAuthStateChanged)(auth, async (firebaseUser) => {
        try {
            setLoading(true);
            if (firebaseUser) {
                // User is signed in
                setUser(firebaseUser);
                // Fetch user profile from Firestore
                const profileDoc = await (0, firestore_1.getDoc)((0, firestore_1.doc)(db, 'users', firebaseUser.uid));
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
                    const unsubscribeProfile = (0, firestore_1.onSnapshot)((0, firestore_1.doc)(db, 'users', firebaseUser.uid), (doc) => {
                        if (doc.exists()) {
                            const data = doc.data();
                            auth_store_1.useAuthStore.getState().updateProfile({
                                ...data,
                                createdAt: data.createdAt?.toDate(),
                                updatedAt: data.updatedAt?.toDate(),
                            });
                        }
                    }, (error) => {
                        console.error('Profile listener error:', error);
                    });
                    // Store cleanup function
                    globalThis.__hiveProfileUnsubscribe = unsubscribeProfile;
                }
                else {
                    // User exists but no profile yet (new user)
                    setProfile(null);
                }
            }
            else {
                // User is signed out
                setUser(null);
                setProfile(null);
                // Clean up profile listener if it exists
                if (globalThis.__hiveProfileUnsubscribe) {
                    globalThis.__hiveProfileUnsubscribe();
                    delete globalThis.__hiveProfileUnsubscribe;
                }
            }
            setLoading(false);
        }
        catch (error) {
            console.error('Auth sync error:', error);
            setError(error instanceof Error ? error.message : 'Authentication error');
            setLoading(false);
        }
    }, (error) => {
        console.error('Auth state change error:', error);
        setError(error.message);
        setLoading(false);
    });
    // Return cleanup function
    return () => {
        unsubscribeAuth();
        if (globalThis.__hiveProfileUnsubscribe) {
            globalThis.__hiveProfileUnsubscribe();
            delete globalThis.__hiveProfileUnsubscribe;
        }
    };
}
/**
 * Hook to ensure auth is synced
 * Use this in your root layout or _app.tsx
 */
function useAuthSync(auth, db) {
    // This will run once on mount and set up the sync
    if (typeof window !== 'undefined' && !globalThis.__hiveAuthInitialized) {
        globalThis.__hiveAuthInitialized = true;
        initializeAuthSync(auth, db);
    }
}
//# sourceMappingURL=firebase-auth-sync.js.map