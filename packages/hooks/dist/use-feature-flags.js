"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeatureFlags = useFeatureFlags;
exports.useToolBuilderVariant = useToolBuilderVariant;
exports.useNavigationVariant = useNavigationVariant;
const react_1 = require("react");
const core_1 = require("@hive/core");
function useFeatureFlags() {
    const [flags, setFlags] = (0, react_1.useState)((0, core_1.getFeatureFlags)('default'));
    const [userId, setUserId] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        // Check for user session in localStorage (matches the web app's auth pattern)
        const checkUserSession = () => {
            try {
                // Check for hive session (used in web app)
                const hiveSession = window.localStorage.getItem('hive_session');
                if (hiveSession) {
                    const session = JSON.parse(hiveSession);
                    if (session.user?.uid) {
                        setUserId(session.user.uid);
                        return;
                    }
                }
                // Check for dev mode user
                const devAuthMode = window.localStorage.getItem('dev_auth_mode');
                const devUserData = window.localStorage.getItem('dev_user');
                if (devAuthMode === 'true' && devUserData) {
                    const devUser = JSON.parse(devUserData);
                    if (devUser.uid) {
                        setUserId(devUser.uid);
                        return;
                    }
                }
                // Fallback to test user for development
                if (process.env.NODE_ENV === 'development') {
                    setUserId('test-user-id');
                    return;
                }
            }
            catch (error) {
                console.warn('Error checking user session for feature flags:', error);
            }
            setUserId(null);
        };
        checkUserSession();
        // Listen for storage changes to update user session
        const handleStorageChange = (e) => {
            if (e.key === 'hive_session' || e.key === 'dev_user' || e.key === 'dev_auth_mode') {
                checkUserSession();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    (0, react_1.useEffect)(() => {
        if (userId) {
            const userFlags = (0, core_1.getFeatureFlags)(userId);
            setFlags(userFlags);
        }
        else {
            const defaultFlags = (0, core_1.getFeatureFlags)('default');
            setFlags(defaultFlags);
        }
    }, [userId]);
    const trackEvent = (feature, action, metadata) => {
        if (userId) {
            (0, core_1.trackVariantEvent)({
                userId,
                variant: String(flags[feature]),
                feature,
                action,
                metadata,
            });
        }
    };
    return {
        ...flags,
        trackEvent,
    };
}
// Convenience hooks for specific features
function useToolBuilderVariant() {
    const flags = useFeatureFlags();
    return {
        variant: flags.toolBuilderVariant,
        trackEvent: (action, metadata) => flags.trackEvent('toolBuilderVariant', action, metadata),
    };
}
function useNavigationVariant() {
    const flags = useFeatureFlags();
    return {
        variant: flags.navigationVariant,
        trackEvent: (action, metadata) => flags.trackEvent('navigationVariant', action, metadata),
    };
}
//# sourceMappingURL=use-feature-flags.js.map