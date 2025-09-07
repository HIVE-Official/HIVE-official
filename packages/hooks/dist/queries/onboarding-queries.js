"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardingQueryKeys = void 0;
exports.useHandleAvailability = useHandleAvailability;
exports.useSubmitOnboarding = useSubmitOnboarding;
exports.useUploadProfilePhoto = useUploadProfilePhoto;
const react_query_1 = require("@tanstack/react-query");
const query_client_1 = require("./query-client");
// API client functions
async function checkHandleAvailability(handle) {
    const response = await fetch(`/api/onboarding/check-handle?handle=${encodeURIComponent(handle)}`);
    if (!response.ok) {
        throw new Error('Failed to check handle availability');
    }
    return await response.json();
}
async function submitOnboardingData(data) {
    const response = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit onboarding data');
    }
    return await response.json();
}
async function uploadProfilePhoto(file) {
    const formData = new FormData();
    formData.append('photo', file);
    const response = await fetch('/api/onboarding/upload-photo', {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload photo');
    }
    return await response.json();
}
// React Query hooks
function useHandleAvailability(handle) {
    return (0, react_query_1.useQuery)({
        queryKey: query_client_1.queryKeys.handleAvailability(handle),
        queryFn: () => checkHandleAvailability(handle),
        enabled: handle.length >= 3, // Only check when handle meets minimum length
        staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
        retry: 1, // Only retry once on failure
    });
}
function useSubmitOnboarding() {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: submitOnboardingData,
        onSuccess: () => {
            // Invalidate and refetch user profile data
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.profile('me') });
            queryClient.invalidateQueries({ queryKey: query_client_1.queryKeys.userAnalytics('me') });
        },
    });
}
function useUploadProfilePhoto() {
    return (0, react_query_1.useMutation)({
        mutationFn: uploadProfilePhoto,
    });
}
exports.onboardingQueryKeys = {
    handleAvailability: (handle) => ['hive', 'onboarding', 'handle-availability', handle],
};
//# sourceMappingURL=onboarding-queries.js.map