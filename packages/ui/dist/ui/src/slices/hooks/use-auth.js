/**
 * Minimal auth hook for slice integration
 */
import { useState, createContext } from 'react';
export function useAuthProvider() {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const login = async (credentials) => {
        setIsLoading(true);
        try {
            // Login logic here
            console.log('Login:', credentials);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        }
        finally {
            setIsLoading(false);
        }
    };
    const logout = async () => {
        setUser(null);
        setIsAuthenticated(false);
    };
    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        sendMagicLink: async () => { },
        verifyMagicLink: async () => { },
        refreshSession: async () => { },
        updateProfile: async () => { },
        devLogin: async () => { }
    };
}
export const AuthContext = createContext(null);
//# sourceMappingURL=use-auth.js.map