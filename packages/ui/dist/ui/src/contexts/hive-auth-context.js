import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const HiveAuthContext = createContext(undefined);
export function HiveAuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Mock auth state check
        const checkAuth = async () => {
            try {
                // In production, this would check Firebase Auth
                const storedUser = localStorage.getItem('hive_user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);
    const signIn = async (email) => {
        setLoading(true);
        try {
            // Mock sign in - in production this would use Firebase Auth
            const mockUser = {
                id: Math.random().toString(36),
                email,
                emailVerified: false,
                onboardingComplete: false,
            };
            setUser(mockUser);
            localStorage.setItem('hive_user', JSON.stringify(mockUser));
        }
        catch (err) {
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const signOut = async () => {
        setLoading(true);
        try {
            setUser(null);
            localStorage.removeItem('hive_user');
        }
        catch (err) {
            setError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const updateUser = async (updates) => {
        if (!user)
            return;
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('hive_user', JSON.stringify(updatedUser));
    };
    return (_jsx(HiveAuthContext.Provider, { value: {
            user,
            loading,
            error,
            signIn,
            signOut,
            updateUser,
        }, children: children }));
}
export function useHiveAuth() {
    const context = useContext(HiveAuthContext);
    if (context === undefined) {
        throw new Error('useHiveAuth must be used within a HiveAuthProvider');
    }
    return context;
}
//# sourceMappingURL=hive-auth-context.js.map