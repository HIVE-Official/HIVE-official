"use client";
import { useState, useEffect, createContext, useContext, } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (!auth) {
            setIsLoading(false);
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // In a real implementation, you'd fetch additional user data from Firestore
                const idTokenResult = await firebaseUser.getIdTokenResult();
                const onboardingCompleted = !!idTokenResult.claims.onboardingCompleted;
                const authUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    fullName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
                    onboardingCompleted,
                    getIdToken: () => firebaseUser.getIdToken(),
                };
                setUser(authUser);
            }
            else {
                setUser(null);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);
    const value = {
        user,
        isLoading,
        isAuthenticated: !!user,
    };
    return value;
    {
        value;
    }
     > { children } < /AuthContext.Provider>;
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
//# sourceMappingURL=use-auth.js.map