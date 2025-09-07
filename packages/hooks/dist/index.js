"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNavigationVariant = exports.useToolBuilderVariant = exports.useFeatureFlags = exports.useDebounce = exports.useLegacyProfile = exports.useLegacySpaces = exports.useUploadOnboardingPhoto = exports.useSubmitOnboarding = exports.useHandleAvailability = exports.useProfileData = exports.useUploadProfilePhoto = exports.useUpdateProfile = exports.useUserAnalytics = exports.useUserSpaceMemberships = exports.useUserProfile = exports.useProfileModern = exports.useOnboardingAnalytics = exports.useCreationAnalytics = exports.useAnalytics = exports.useAuthOperations = exports.useAuthSync = exports.initializeAuthSync = void 0;
// State Management - Zustand Stores
__exportStar(require("./stores"), exports);
// Server State Management - React Query
__exportStar(require("./queries"), exports);
// Auth utilities
var firebase_auth_sync_1 = require("./auth/firebase-auth-sync");
Object.defineProperty(exports, "initializeAuthSync", { enumerable: true, get: function () { return firebase_auth_sync_1.initializeAuthSync; } });
Object.defineProperty(exports, "useAuthSync", { enumerable: true, get: function () { return firebase_auth_sync_1.useAuthSync; } });
var use_auth_operations_1 = require("./auth/use-auth-operations");
Object.defineProperty(exports, "useAuthOperations", { enumerable: true, get: function () { return use_auth_operations_1.useAuthOperations; } });
// Analytics hooks
var use_analytics_1 = require("./use-analytics");
Object.defineProperty(exports, "useAnalytics", { enumerable: true, get: function () { return use_analytics_1.useAnalytics; } });
var use_creation_analytics_1 = require("./use-creation-analytics");
Object.defineProperty(exports, "useCreationAnalytics", { enumerable: true, get: function () { return use_creation_analytics_1.useCreationAnalytics; } });
// Onboarding analytics
var use_onboarding_analytics_1 = require("./use-onboarding-analytics");
Object.defineProperty(exports, "useOnboardingAnalytics", { enumerable: true, get: function () { return use_onboarding_analytics_1.useOnboardingAnalytics; } });
// Modern Profile hooks with Zustand + React Query
var use_profile_modern_1 = require("./use-profile-modern");
Object.defineProperty(exports, "useProfileModern", { enumerable: true, get: function () { return use_profile_modern_1.useProfileModern; } });
var profile_queries_1 = require("./queries/profile-queries");
Object.defineProperty(exports, "useUserProfile", { enumerable: true, get: function () { return profile_queries_1.useUserProfile; } });
Object.defineProperty(exports, "useUserSpaceMemberships", { enumerable: true, get: function () { return profile_queries_1.useUserSpaceMemberships; } });
Object.defineProperty(exports, "useUserAnalytics", { enumerable: true, get: function () { return profile_queries_1.useUserAnalytics; } });
Object.defineProperty(exports, "useUpdateProfile", { enumerable: true, get: function () { return profile_queries_1.useUpdateProfile; } });
Object.defineProperty(exports, "useUploadProfilePhoto", { enumerable: true, get: function () { return profile_queries_1.useUploadProfilePhoto; } });
Object.defineProperty(exports, "useProfileData", { enumerable: true, get: function () { return profile_queries_1.useProfileData; } });
// Onboarding hooks with React Query
var onboarding_queries_1 = require("./queries/onboarding-queries");
Object.defineProperty(exports, "useHandleAvailability", { enumerable: true, get: function () { return onboarding_queries_1.useHandleAvailability; } });
Object.defineProperty(exports, "useSubmitOnboarding", { enumerable: true, get: function () { return onboarding_queries_1.useSubmitOnboarding; } });
Object.defineProperty(exports, "useUploadOnboardingPhoto", { enumerable: true, get: function () { return onboarding_queries_1.useUploadProfilePhoto; } });
// Legacy Data fetching hooks (deprecated - use modern versions)
var use_spaces_1 = require("./use-spaces");
Object.defineProperty(exports, "useLegacySpaces", { enumerable: true, get: function () { return use_spaces_1.useSpaces; } });
var use_profile_1 = require("./use-profile");
Object.defineProperty(exports, "useLegacyProfile", { enumerable: true, get: function () { return use_profile_1.useProfile; } });
// Utility hooks
var use_debounce_1 = require("./use-debounce");
Object.defineProperty(exports, "useDebounce", { enumerable: true, get: function () { return use_debounce_1.useDebounce; } });
// Feature flags hooks
var use_feature_flags_1 = require("./use-feature-flags");
Object.defineProperty(exports, "useFeatureFlags", { enumerable: true, get: function () { return use_feature_flags_1.useFeatureFlags; } });
Object.defineProperty(exports, "useToolBuilderVariant", { enumerable: true, get: function () { return use_feature_flags_1.useToolBuilderVariant; } });
Object.defineProperty(exports, "useNavigationVariant", { enumerable: true, get: function () { return use_feature_flags_1.useNavigationVariant; } });
//# sourceMappingURL=index.js.map