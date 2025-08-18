"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProfile = useProfile;
const react_1 = require("react");
const auth_logic_1 = require("@hive/auth-logic");
function useProfile() {
    const { user, refreshUser } = (0, auth_logic_1.useAuth)();
    const [isUpdating, setIsUpdating] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const clearError = () => setError(null);
    const updateProfile = async (data) => {
        if (!user) {
            setError('User not authenticated');
            return false;
        }
        setIsUpdating(true);
        setError(null);
        try {
            const token = await user.getIdToken();
            const response = await fetch('/api/profile', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update profile');
            }
            // Refresh user data to get updated profile
            await refreshUser();
            return true;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update profile';
            setError(message);
            return false;
        }
        finally {
            setIsUpdating(false);
        }
    };
    const uploadPhoto = async (file) => {
        if (!user) {
            setError('User not authenticated');
            return null;
        }
        setIsUpdating(true);
        setError(null);
        try {
            const token = await user.getIdToken();
            const formData = new FormData();
            formData.append('photo', file);
            const response = await fetch('/api/profile/upload-photo', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to upload photo');
            }
            const result = await response.json();
            // Refresh user data to get updated avatar URL
            await refreshUser();
            return result.avatarUrl;
        }
        catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to upload photo';
            setError(message);
            return null;
        }
        finally {
            setIsUpdating(false);
        }
    };
    return {
        updateProfile,
        uploadPhoto,
        isUpdating,
        error,
        clearError,
    };
}
//# sourceMappingURL=use-profile.js.map