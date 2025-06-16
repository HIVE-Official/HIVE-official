"use client";
import { useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
export function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // In a real implementation, you'd fetch additional user data from Firestore
                // For now, we'll create a basic user object
                const authUser = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    fullName: firebaseUser.displayName ||
                        firebaseUser.email?.split("@")[0] ||
                        "User",
                    onboardingCompleted: true, // Placeholder - would be fetched from user profile
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
    }, []);
    return {
        user,
        isLoading,
        isAuthenticated: !!user,
    };
}
//# sourceMappingURL=use-auth.js.map