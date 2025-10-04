"use strict";
// Auth hooks - REMOVED: use useUnifiedAuth from @hive/ui instead
// export { useAuth } from './use-auth';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTouchGestures = exports.useFeedSSE = exports.useNavigationVariant = exports.useToolBuilderVariant = exports.useFeatureFlags = exports.useDebounce = exports.useProfile = exports.useSpaces = exports.useOnboardingAnalytics = exports.useCreationAnalytics = exports.useAnalytics = void 0;
// Analytics hooks
var use_analytics_1 = require("./use-analytics");
Object.defineProperty(exports, "useAnalytics", { enumerable: true, get: function () { return use_analytics_1.useAnalytics; } });
var use_creation_analytics_1 = require("./use-creation-analytics");
Object.defineProperty(exports, "useCreationAnalytics", { enumerable: true, get: function () { return use_creation_analytics_1.useCreationAnalytics; } });
// Onboarding analytics
var use_onboarding_analytics_1 = require("./use-onboarding-analytics");
Object.defineProperty(exports, "useOnboardingAnalytics", { enumerable: true, get: function () { return use_onboarding_analytics_1.useOnboardingAnalytics; } });
// Data fetching hooks
var use_spaces_1 = require("./use-spaces");
Object.defineProperty(exports, "useSpaces", { enumerable: true, get: function () { return use_spaces_1.useSpaces; } });
var use_profile_1 = require("./use-profile");
Object.defineProperty(exports, "useProfile", { enumerable: true, get: function () { return use_profile_1.useProfile; } });
// Utility hooks
var use_debounce_1 = require("./use-debounce");
Object.defineProperty(exports, "useDebounce", { enumerable: true, get: function () { return use_debounce_1.useDebounce; } });
// Feature flags hooks
var use_feature_flags_1 = require("./use-feature-flags");
Object.defineProperty(exports, "useFeatureFlags", { enumerable: true, get: function () { return use_feature_flags_1.useFeatureFlags; } });
Object.defineProperty(exports, "useToolBuilderVariant", { enumerable: true, get: function () { return use_feature_flags_1.useToolBuilderVariant; } });
Object.defineProperty(exports, "useNavigationVariant", { enumerable: true, get: function () { return use_feature_flags_1.useNavigationVariant; } });
// Real-time and mobile hooks
var use_feed_sse_1 = require("./use-feed-sse");
Object.defineProperty(exports, "useFeedSSE", { enumerable: true, get: function () { return use_feed_sse_1.useFeedSSE; } });
var use_touch_gestures_1 = require("./use-touch-gestures");
Object.defineProperty(exports, "useTouchGestures", { enumerable: true, get: function () { return use_touch_gestures_1.useTouchGestures; } });
//# sourceMappingURL=index.js.map