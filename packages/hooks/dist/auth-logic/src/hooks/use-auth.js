"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuth = useAuth;
const react_1 = require("react");
const firebase_config_1 = require("../firebase-config");
const auth_1 = require("firebase/auth");
const firestore_1 = require("firebase/firestore");
const error_handler_1 = require("../error-handler");
const session_manager_1 = require("../session-manager");
function useAuth() {
    const [user, setUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const clearError = () => setError(null);
    // Development mode user management
    const checkDevUser = () => {
        if (typeof window === 'undefined')
            return null;
        const devAuthMode = window.localStorage.getItem('dev_auth_mode');
        const devUserData = window.localStorage.getItem('dev_user');
        if (devAuthMode === 'true' && devUserData) {
            try {
                const devUser = JSON.parse(devUserData);
                return {
                    ...devUser,
                    getIdToken: async () => 'dev_token_' + devUser.uid
                };
            }
            catch (error) {
                console.error('Error parsing dev user data:', error);
                return null;
            }
        }
        return null;
    };
    // Clear development mode data
    const clearDevMode = () => {
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem('dev_auth_mode');
            window.localStorage.removeItem('dev_user');
            console.log('Development mode data cleared');
        }
    };
    const fetchUserData = async (firebaseUser) => {
        try {
            const db = (0, firestore_1.getFirestore)();
            const userDocRef = (0, firestore_1.doc)(db, "users", firebaseUser.uid);
            const userDoc = await (0, firestore_1.getDoc)(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                return {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    fullName: userData.fullName || null,
                    handle: userData.handle || null,
                    bio: userData.bio || null,
                    major: userData.major || null,
                    graduationYear: userData.graduationYear || null,
                    avatarUrl: userData.avatarUrl || null,
                    isBuilder: userData.builderOptIn || false,
                    schoolId: userData.schoolId || null,
                    onboardingCompleted: !!(userData.handle && userData.fullName),
                    getIdToken: () => firebaseUser.getIdToken(),
                };
            }
            else {
                // User document doesn't exist yet - needs onboarding
                return {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    fullName: null,
                    handle: null,
                    bio: null,
                    major: null,
                    graduationYear: null,
                    avatarUrl: null,
                    isBuilder: false,
                    schoolId: null,
                    onboardingCompleted: false,
                    getIdToken: () => firebaseUser.getIdToken(),
                };
            }
        }
        catch (fetchError) {
            console.error("Error fetching user data:", fetchError);
            // Fallback to basic user object
            return {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                fullName: firebaseUser.displayName || null,
                handle: null,
                bio: null,
                major: null,
                graduationYear: null,
                avatarUrl: null,
                isBuilder: false,
                schoolId: null,
                onboardingCompleted: false,
                getIdToken: () => firebaseUser.getIdToken(),
            };
        }
    };
    const refreshUser = async () => {
        // Check for development mode user first
        const devUser = checkDevUser();
        if (devUser) {
            setUser(devUser);
            setError(null);
            return;
        }
        if (!firebase_config_1.auth)
            return;
        const currentUser = firebase_config_1.auth.currentUser;
        if (currentUser) {
            try {
                setIsLoading(true);
                const userData = await fetchUserData(currentUser);
                setUser(userData);
                setError(null);
            }
            catch (refreshError) {
                const authError = (0, error_handler_1.handleAuthError)(refreshError);
                setError(authError);
            }
            finally {
                setIsLoading(false);
            }
        }
    };
    (0, react_1.useEffect)(() => {
        const sessionManager = session_manager_1.SessionManager.getInstance();
        // Check for development mode user first
        const devUser = checkDevUser();
        if (devUser) {
            console.log('Development mode user detected:', devUser);
            setUser(devUser);
            setError(null);
            setIsLoading(false);
            // Listen for localStorage changes to update dev user
            const handleStorageChange = (e) => {
                if (e.key === 'dev_user' || e.key === 'dev_auth_mode') {
                    const updatedDevUser = checkDevUser();
                    if (updatedDevUser) {
                        setUser(updatedDevUser);
                    }
                    else {
                        setUser(null);
                    }
                }
            };
            window.addEventListener('storage', handleStorageChange);
            return () => {
                window.removeEventListener('storage', handleStorageChange);
            };
        }
        if (!firebase_config_1.auth) {
            setIsLoading(false);
            return;
        }
        const unsubscribe = (0, auth_1.onAuthStateChanged)(firebase_config_1.auth, async (firebaseUser) => {
            try {
                if (firebaseUser) {
                    // Update session management
                    sessionManager.updateSession(firebaseUser);
                    const userData = await fetchUserData(firebaseUser);
                    setUser(userData);
                    setError(null);
                }
                else {
                    sessionManager.clearSession();
                    setUser(null);
                    setError(null);
                }
            }
            catch (authError) {
                console.error("Auth state change error:", authError);
                const error = (0, error_handler_1.handleAuthError)(authError);
                setError(error);
                setUser(null);
            }
            finally {
                setIsLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);
    return {
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        clearError,
        refreshUser,
        clearDevMode: process.env.NODE_ENV === 'development' ? clearDevMode : undefined,
    };
}
//# sourceMappingURL=use-auth.js.map