"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFeatureFlags = useFeatureFlags;
exports.useToolBuilderVariant = useToolBuilderVariant;
exports.useNavigationVariant = useNavigationVariant;
const react_1 = require("react");
const auth_logic_1 = require("@hive/auth-logic");
const core_1 = require("@hive/core");
function useFeatureFlags() {
    const { user } = (0, auth_logic_1.useAuth)();
    const [flags, setFlags] = (0, react_1.useState)((0, core_1.getFeatureFlags)('default'));
    (0, react_1.useEffect)(() => {
        if (user?.uid) {
            const userFlags = (0, core_1.getFeatureFlags)(user.uid);
            setFlags(userFlags);
        }
    }, [user?.uid]);
    const trackEvent = (feature, action, metadata) => {
        if (user?.uid) {
            (0, core_1.trackVariantEvent)({
                userId: user.uid,
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