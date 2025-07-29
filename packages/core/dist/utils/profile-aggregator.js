"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileUtils = exports.profileAggregator = void 0;
exports.useProfileAggregator = useProfileAggregator;
exports.withProfileData = withProfileData;
const jsx_runtime_1 = require("react/jsx-runtime");
// Profile data aggregation utility
// This utility helps aggregate data from multiple profile endpoints for efficient loading
const react_1 = __importDefault(require("react"));
class ProfileAggregator {
    constructor() {
        this.cache = new Map();
        this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    }
    static getInstance() {
        if (!ProfileAggregator.instance) {
            ProfileAggregator.instance = new ProfileAggregator();
        }
        return ProfileAggregator.instance;
    }
    // Aggregate all profile data in one call
    async aggregateProfileData(options = {}) {
        const startTime = Date.now();
        const { includeSpaces = true, includeActivity = true, includeCalendar = true, includePrivacy = false, includeStats = false, timeRange = 'week' } = options;
        const endpoints = [];
        const requests = [];
        // Always include dashboard
        endpoints.push('/api/profile/dashboard');
        requests.push(this.fetchWithCache('/api/profile/dashboard', { timeRange }));
        // Conditionally include other endpoints
        if (includeSpaces) {
            endpoints.push('/api/profile/spaces');
            requests.push(this.fetchWithCache('/api/profile/spaces', {
                includeActivity: 'true',
                includeStats: 'true',
                timeRange
            }));
        }
        if (includeCalendar) {
            endpoints.push('/api/calendar');
            requests.push(this.fetchWithCache('/api/calendar', {
                includeSpaceEvents: 'true',
                startDate: this.getDateRange(timeRange).start,
                endDate: this.getDateRange(timeRange).end
            }));
        }
        if (includeActivity) {
            endpoints.push('/api/activity');
            requests.push(this.fetchWithCache('/api/activity', {
                timeRange,
                includeDetails: 'true'
            }));
        }
        if (includePrivacy) {
            endpoints.push('/api/privacy');
            requests.push(this.fetchWithCache('/api/privacy'));
        }
        if (includeStats) {
            endpoints.push('/api/profile/stats');
            requests.push(this.fetchWithCache('/api/profile/stats', {
                timeRange,
                includeComparisons: 'true'
            }));
        }
        try {
            const results = await Promise.all(requests);
            const loadTime = Date.now() - startTime;
            const aggregatedData = {
                dashboard: results[0],
                spaces: includeSpaces ? results[1] : null,
                calendar: includeCalendar ? results[includeSpaces ? 2 : 1] : null,
                activity: includeActivity ? results[this.getResultIndex(includeSpaces, includeCalendar)] : null,
                privacy: includePrivacy ? results[this.getResultIndex(includeSpaces, includeCalendar, includeActivity)] : null,
                stats: includeStats ? results[this.getResultIndex(includeSpaces, includeCalendar, includeActivity, includePrivacy)] : null,
                metadata: {
                    loadTime,
                    endpoints,
                    timeRange,
                    generatedAt: new Date().toISOString()
                }
            };
            return aggregatedData;
        }
        catch (error) {
            console.error('Error aggregating profile data:', error);
            throw error;
        }
    }
    // Fetch dashboard data only (lightweight)
    async getDashboard(timeRange = 'week') {
        return this.fetchWithCache('/api/profile/dashboard', { timeRange });
    }
    // Fetch space data with activity
    async getSpacesWithActivity(timeRange = 'week') {
        return this.fetchWithCache('/api/profile/spaces', {
            includeActivity: 'true',
            includeStats: 'true',
            timeRange
        });
    }
    // Fetch calendar events
    async getCalendarEvents(startDate, endDate) {
        const params = { includeSpaceEvents: 'true' };
        if (startDate)
            params.startDate = startDate;
        if (endDate)
            params.endDate = endDate;
        return this.fetchWithCache('/api/calendar', params);
    }
    // Fetch activity analytics
    async getActivityAnalytics(timeRange = 'week') {
        return this.fetchWithCache('/api/activity', {
            timeRange,
            includeDetails: 'true'
        });
    }
    // Fetch advanced activity insights
    async getActivityInsights(timeRange = 'week') {
        return this.fetchWithCache('/api/activity/insights', {
            timeRange,
            analysisType: 'comprehensive'
        });
    }
    // Fetch privacy settings
    async getPrivacySettings() {
        return this.fetchWithCache('/api/privacy');
    }
    // Fetch detailed statistics
    async getDetailedStats(timeRange = 'month') {
        return this.fetchWithCache('/api/profile/stats', {
            timeRange,
            includeComparisons: 'true'
        });
    }
    // Fetch space recommendations
    async getSpaceRecommendations(type = 'all', limit = 10) {
        return this.fetchWithCache('/api/profile/spaces/recommendations', {
            type,
            limit: limit.toString()
        });
    }
    // Batch update profile data
    async batchUpdateProfile(updates) {
        const results = [];
        if (updates.privacy) {
            results.push(await this.updatePrivacySettings(updates.privacy));
        }
        if (updates.spaceActions) {
            const spaceActionPromises = updates.spaceActions.map(action => this.performSpaceAction(action.spaceId, action.action, action.value));
            results.push(...await Promise.all(spaceActionPromises));
        }
        // Clear relevant caches
        this.clearCache();
        return results;
    }
    // Helper method to update privacy settings
    async updatePrivacySettings(settings) {
        const response = await fetch(`${this.baseUrl}/api/privacy`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        if (!response.ok) {
            throw new Error(`Failed to update privacy settings: ${response.statusText}`);
        }
        return response.json();
    }
    // Helper method to perform space actions
    async performSpaceAction(spaceId, action, value) {
        const response = await fetch(`${this.baseUrl}/api/profile/spaces/actions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spaceId, type: action, value })
        });
        if (!response.ok) {
            throw new Error(`Failed to perform space action: ${response.statusText}`);
        }
        return response.json();
    }
    // Helper method to fetch with caching
    async fetchWithCache(endpoint, params = {}) {
        const cacheKey = `${endpoint}?${new URLSearchParams(params).toString()}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        const url = `${this.baseUrl}${endpoint}?${new URLSearchParams(params).toString()}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
        }
        const data = await response.json();
        // Cache for 2 minutes
        this.cache.set(cacheKey, data);
        setTimeout(() => {
            this.cache.delete(cacheKey);
        }, 2 * 60 * 1000);
        return data;
    }
    // Helper method to calculate date range
    getDateRange(timeRange) {
        const end = new Date();
        const start = new Date();
        switch (timeRange) {
            case 'week':
                start.setDate(end.getDate() - 7);
                break;
            case 'month':
                start.setMonth(end.getMonth() - 1);
                break;
            case 'semester':
                start.setMonth(end.getMonth() - 4);
                break;
            case 'year':
                start.setFullYear(end.getFullYear() - 1);
                break;
            case 'all':
                start.setFullYear(end.getFullYear() - 2);
                break;
        }
        return {
            start: start.toISOString(),
            end: end.toISOString()
        };
    }
    // Helper method to get result index based on included options
    getResultIndex(...includes) {
        return includes.filter(Boolean).length;
    }
    // Clear all cached data
    clearCache() {
        this.cache.clear();
    }
    // Preload profile data for better performance
    async preloadProfileData(options = {}) {
        try {
            await this.aggregateProfileData(options);
        }
        catch (error) {
            console.warn('Failed to preload profile data:', error);
        }
    }
}
// Export singleton instance
exports.profileAggregator = ProfileAggregator.getInstance();
// React hooks for easy integration
function useProfileAggregator() {
    return exports.profileAggregator;
}
// Higher-order component for profile data
function withProfileData(Component) {
    return function ProfileDataComponent(props) {
        const [profileData, setProfileData] = react_1.default.useState(null);
        const [loading, setLoading] = react_1.default.useState(true);
        const [error, setError] = react_1.default.useState(null);
        react_1.default.useEffect(() => {
            exports.profileAggregator.aggregateProfileData()
                .then(data => {
                setProfileData(data);
                setLoading(false);
            })
                .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
        }, []);
        if (loading) {
            return (0, jsx_runtime_1.jsx)("div", { children: "Loading profile data..." });
        }
        if (error) {
            return (0, jsx_runtime_1.jsxs)("div", { children: ["Error loading profile: ", error] });
        }
        if (!profileData) {
            return (0, jsx_runtime_1.jsx)("div", { children: "No profile data available" });
        }
        return (0, jsx_runtime_1.jsx)(Component, { ...props, profileData: profileData });
    };
}
// Utility functions for profile data processing
exports.profileUtils = {
    // Calculate engagement score
    calculateEngagementScore: (profileData) => {
        const dashboard = profileData.dashboard;
        const summaryData = dashboard?.dashboard?.summary;
        if (!summaryData)
            return 0;
        const timeWeight = Math.min((summaryData.weeklyActivity || 0) / 120, 1) * 30; // Max 30 points for 2 hours
        const spaceWeight = Math.min((summaryData.activeSpaces || 0) / 5, 1) * 25; // Max 25 points for 5 spaces
        const contentWeight = Math.min((summaryData.contentCreated || 0) / 10, 1) * 25; // Max 25 points for 10 content
        const socialWeight = Math.min((summaryData.socialInteractions || 0) / 20, 1) * 20; // Max 20 points for 20 interactions
        return Math.round(timeWeight + spaceWeight + contentWeight + socialWeight);
    },
    // Get activity trend
    getActivityTrend: (profileData) => {
        const activity = profileData.activity;
        const analyticsData = activity?.analytics;
        if (!analyticsData)
            return 'stable';
        // Simple trend calculation - would be more sophisticated in real implementation
        const recent = analyticsData.totalTimeSpent || 0;
        const baseline = 60; // 1 hour baseline
        if (recent > baseline * 1.1)
            return 'up';
        if (recent < baseline * 0.9)
            return 'down';
        return 'stable';
    },
    // Format time spent
    formatTimeSpent: (minutes) => {
        if (minutes < 60) {
            return `${minutes}m`;
        }
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    },
    // Get top spaces
    getTopSpaces: (profileData, limit = 3) => {
        const spaces = profileData.spaces?.memberships || [];
        return spaces
            .filter((space) => space.status === 'active')
            .sort((a, b) => {
            const aTime = a.recentActivity?.timeSpent || 0;
            const bTime = b.recentActivity?.timeSpent || 0;
            return bTime - aTime;
        })
            .slice(0, limit);
    }
};
exports.default = ProfileAggregator;
//# sourceMappingURL=profile-aggregator.js.map