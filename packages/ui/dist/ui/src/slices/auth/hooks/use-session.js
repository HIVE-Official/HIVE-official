/**
 * useSession Hook
 *
 * Manages session state, expiry tracking, and automatic refresh
 * for HIVE authentication sessions.
 */
"use client";
import { useState, useCallback, useEffect } from 'react';
import { SESSION_CONFIG, AUTH_ROUTES } from '../constants.js';
export function useSession() {
    const [session, setSession] = useState(null);
    const [lastActivity, setLastActivity] = useState(new Date());
    // Initialize session from storage
    useEffect(() => {
        const storedSession = localStorage.getItem(SESSION_CONFIG.STORAGE_KEY);
        if (storedSession) {
            try {
                const sessionData = JSON.parse(storedSession);
                setSession({
                    ...sessionData,
                    expiresAt: new Date(sessionData.expiresAt),
                    lastActivity: new Date(sessionData.lastActivity || Date.now())
                });
            }
            catch (error) {
                console.warn('Failed to parse stored session:', error);
                localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
            }
        }
    }, []);
    // Calculate session validity
    const isValidSession = session !== null && new Date() < session.expiresAt;
    const isExpired = session !== null && new Date() >= session.expiresAt;
    // Calculate time until expiry in seconds
    const timeUntilExpiry = session
        ? Math.max(0, Math.floor((session.expiresAt.getTime() - Date.now()) / 1000))
        : 0;
    // Refresh session
    const refreshSession = useCallback(async () => {
        if (!session?.sessionToken)
            return;
        try {
            const response = await fetch(AUTH_ROUTES.API.REFRESH, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.sessionToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const { sessionToken, expiresAt } = await response.json();
                const updatedSession = {
                    ...session,
                    sessionToken,
                    expiresAt: new Date(expiresAt),
                    lastActivity: new Date()
                };
                setSession(updatedSession);
                // Update stored session
                localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify({
                    ...updatedSession,
                    expiresAt: updatedSession.expiresAt.toISOString(),
                    lastActivity: updatedSession.lastActivity.toISOString()
                }));
            }
            else {
                // Refresh failed, clear session
                clearSession();
            }
        }
        catch (error) {
            console.warn('Failed to refresh session:', error);
            clearSession();
        }
    }, [session]);
    // Clear session
    const clearSession = useCallback(() => {
        setSession(null);
        localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
        localStorage.removeItem(SESSION_CONFIG.REFRESH_KEY);
    }, []);
    // Update last activity
    const updateLastActivity = useCallback(() => {
        const now = new Date();
        setLastActivity(now);
        if (session) {
            const updatedSession = {
                ...session,
                lastActivity: now
            };
            setSession(updatedSession);
            // Throttle storage updates to avoid excessive writes
            const shouldUpdateStorage = now.getTime() - session.lastActivity.getTime() > 60000; // 1 minute
            if (shouldUpdateStorage) {
                localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify({
                    ...updatedSession,
                    expiresAt: updatedSession.expiresAt.toISOString(),
                    lastActivity: updatedSession.lastActivity.toISOString()
                }));
            }
        }
    }, [session]);
    // Auto-refresh session when close to expiry
    useEffect(() => {
        if (!session || !isValidSession)
            return;
        const refreshThreshold = SESSION_CONFIG.REFRESH_THRESHOLD * 60 * 1000; // Convert to milliseconds
        const timeUntilRefresh = session.expiresAt.getTime() - Date.now() - refreshThreshold;
        if (timeUntilRefresh <= 0) {
            // Refresh immediately if we're past the threshold
            refreshSession();
            return;
        }
        // Set timeout to refresh when threshold is reached
        const refreshTimeout = setTimeout(() => {
            refreshSession();
        }, timeUntilRefresh);
        return () => clearTimeout(refreshTimeout);
    }, [session, isValidSession, refreshSession]);
    // Auto-refresh session at regular intervals
    useEffect(() => {
        if (!session || !isValidSession)
            return;
        const refreshInterval = setInterval(() => {
            const minutesUntilExpiry = timeUntilExpiry / 60;
            // Refresh if we're within the refresh threshold
            if (minutesUntilExpiry <= SESSION_CONFIG.REFRESH_THRESHOLD) {
                refreshSession();
            }
        }, SESSION_CONFIG.AUTO_REFRESH_INTERVAL * 60 * 1000);
        return () => clearInterval(refreshInterval);
    }, [session, isValidSession, timeUntilExpiry, refreshSession]);
    // Clear expired sessions
    useEffect(() => {
        if (isExpired) {
            clearSession();
        }
    }, [isExpired, clearSession]);
    // Update activity on user interaction
    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
        const activityHandler = () => {
            updateLastActivity();
        };
        // Throttle activity updates
        let activityTimeout;
        const throttledActivityHandler = () => {
            clearTimeout(activityTimeout);
            activityTimeout = setTimeout(activityHandler, 30000); // Update every 30 seconds max
        };
        events.forEach(event => {
            document.addEventListener(event, throttledActivityHandler, true);
        });
        return () => {
            clearTimeout(activityTimeout);
            events.forEach(event => {
                document.removeEventListener(event, throttledActivityHandler, true);
            });
        };
    }, [updateLastActivity]);
    return {
        session,
        isValidSession,
        isExpired,
        timeUntilExpiry,
        refreshSession,
        clearSession,
        updateLastActivity
    };
}
//# sourceMappingURL=use-session.js.map