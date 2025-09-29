/**
 * Analytics Configuration Value Object
 * Domain value object for analytics configuration settings
 */
export class AnalyticsConfigValue {
    constructor(_config) {
        this._config = _config;
    }
    static create(config) {
        const defaultConfig = {
            batchSize: 100,
            flushInterval: 30000,
            hashUserIds: true,
            retentionDays: 90,
            sampleRate: 1,
            dataset: 'hive_analytics',
            feedEventsTable: 'feed_events',
            spaceMetricsTable: 'space_metrics',
            userBehaviorTable: 'user_behavior',
        };
        const mergedConfig = { ...defaultConfig, ...config };
        // Validate configuration
        if (mergedConfig.batchSize <= 0 || mergedConfig.batchSize > 1000) {
            throw new Error('Batch size must be between 1 and 1000');
        }
        if (mergedConfig.flushInterval < 1000 || mergedConfig.flushInterval > 300000) {
            throw new Error('Flush interval must be between 1 second and 5 minutes');
        }
        if (mergedConfig.sampleRate < 0 || mergedConfig.sampleRate > 1) {
            throw new Error('Sample rate must be between 0 and 1');
        }
        if (mergedConfig.retentionDays < 1 || mergedConfig.retentionDays > 730) {
            throw new Error('Retention days must be between 1 and 730 days');
        }
        return new AnalyticsConfigValue(mergedConfig);
    }
    get config() {
        return { ...this._config };
    }
    get batchSize() {
        return this._config.batchSize;
    }
    get flushInterval() {
        return this._config.flushInterval;
    }
    get shouldHashUserIds() {
        return this._config.hashUserIds;
    }
    get sampleRate() {
        return this._config.sampleRate;
    }
    shouldSampleEvent() {
        return Math.random() <= this._config.sampleRate;
    }
    equals(other) {
        return JSON.stringify(this._config) === JSON.stringify(other._config);
    }
}
//# sourceMappingURL=analytics-config.value.js.map