"use strict";
/**
 * AnalyticsConfigValue Tests
 * Tests for analytics configuration value object
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const analytics_config_value_1 = require("../analytics-config.value");
(0, vitest_1.describe)('AnalyticsConfigValue', () => {
    (0, vitest_1.describe)('create()', () => {
        (0, vitest_1.it)('should create with default configuration when empty object provided', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({});
            (0, vitest_1.expect)(config.batchSize).toBe(100);
            (0, vitest_1.expect)(config.flushInterval).toBe(30000);
            (0, vitest_1.expect)(config.shouldHashUserIds).toBe(true);
            (0, vitest_1.expect)(config.sampleRate).toBe(1);
        });
        (0, vitest_1.it)('should create with partial configuration override', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 50,
                sampleRate: 0.5
            });
            (0, vitest_1.expect)(config.batchSize).toBe(50);
            (0, vitest_1.expect)(config.flushInterval).toBe(30000); // Default
            (0, vitest_1.expect)(config.sampleRate).toBe(0.5);
        });
        (0, vitest_1.it)('should create with full custom configuration', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 200,
                flushInterval: 60000,
                hashUserIds: false,
                retentionDays: 180,
                sampleRate: 0.8,
                dataset: 'custom_analytics',
                feedEventsTable: 'custom_feed_events',
                spaceMetricsTable: 'custom_space_metrics',
                userBehaviorTable: 'custom_user_behavior'
            });
            (0, vitest_1.expect)(config.batchSize).toBe(200);
            (0, vitest_1.expect)(config.flushInterval).toBe(60000);
            (0, vitest_1.expect)(config.shouldHashUserIds).toBe(false);
            (0, vitest_1.expect)(config.sampleRate).toBe(0.8);
        });
        (0, vitest_1.it)('should throw when batch size is zero', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: 0 });
            }).toThrow('Batch size must be between 1 and 1000');
        });
        (0, vitest_1.it)('should throw when batch size is negative', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: -1 });
            }).toThrow('Batch size must be between 1 and 1000');
        });
        (0, vitest_1.it)('should throw when batch size exceeds 1000', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: 1001 });
            }).toThrow('Batch size must be between 1 and 1000');
        });
        (0, vitest_1.it)('should accept batch size of 1', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: 1 });
            (0, vitest_1.expect)(config.batchSize).toBe(1);
        });
        (0, vitest_1.it)('should accept batch size of 1000', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: 1000 });
            (0, vitest_1.expect)(config.batchSize).toBe(1000);
        });
        (0, vitest_1.it)('should throw when flush interval is too short (< 1000ms)', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ flushInterval: 999 });
            }).toThrow('Flush interval must be between 1 second and 5 minutes');
        });
        (0, vitest_1.it)('should throw when flush interval is too long (> 300000ms)', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ flushInterval: 300001 });
            }).toThrow('Flush interval must be between 1 second and 5 minutes');
        });
        (0, vitest_1.it)('should accept flush interval of 1000ms', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ flushInterval: 1000 });
            (0, vitest_1.expect)(config.flushInterval).toBe(1000);
        });
        (0, vitest_1.it)('should accept flush interval of 300000ms (5 minutes)', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ flushInterval: 300000 });
            (0, vitest_1.expect)(config.flushInterval).toBe(300000);
        });
        (0, vitest_1.it)('should throw when sample rate is negative', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ sampleRate: -0.1 });
            }).toThrow('Sample rate must be between 0 and 1');
        });
        (0, vitest_1.it)('should throw when sample rate exceeds 1', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ sampleRate: 1.1 });
            }).toThrow('Sample rate must be between 0 and 1');
        });
        (0, vitest_1.it)('should accept sample rate of 0 (no sampling)', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ sampleRate: 0 });
            (0, vitest_1.expect)(config.sampleRate).toBe(0);
        });
        (0, vitest_1.it)('should accept sample rate of 1 (all events)', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ sampleRate: 1 });
            (0, vitest_1.expect)(config.sampleRate).toBe(1);
        });
        (0, vitest_1.it)('should throw when retention days is zero', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ retentionDays: 0 });
            }).toThrow('Retention days must be between 1 and 730 days');
        });
        (0, vitest_1.it)('should throw when retention days exceeds 730 (2 years)', () => {
            (0, vitest_1.expect)(() => {
                analytics_config_value_1.AnalyticsConfigValue.create({ retentionDays: 731 });
            }).toThrow('Retention days must be between 1 and 730 days');
        });
        (0, vitest_1.it)('should accept retention days of 1', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ retentionDays: 1 });
            (0, vitest_1.expect)(config.config.retentionDays).toBe(1);
        });
        (0, vitest_1.it)('should accept retention days of 730', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ retentionDays: 730 });
            (0, vitest_1.expect)(config.config.retentionDays).toBe(730);
        });
    });
    (0, vitest_1.describe)('shouldSampleEvent()', () => {
        (0, vitest_1.it)('should always return true when sample rate is 1', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ sampleRate: 1 });
            // Test multiple times
            for (let i = 0; i < 100; i++) {
                (0, vitest_1.expect)(config.shouldSampleEvent()).toBe(true);
            }
        });
        (0, vitest_1.it)('should always return false when sample rate is 0', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ sampleRate: 0 });
            // Test multiple times
            for (let i = 0; i < 100; i++) {
                (0, vitest_1.expect)(config.shouldSampleEvent()).toBe(false);
            }
        });
        (0, vitest_1.it)('should return true approximately 50% of time when sample rate is 0.5', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ sampleRate: 0.5 });
            let trueCount = 0;
            const iterations = 10000;
            for (let i = 0; i < iterations; i++) {
                if (config.shouldSampleEvent()) {
                    trueCount++;
                }
            }
            const actualRate = trueCount / iterations;
            // Allow 5% deviation due to randomness
            (0, vitest_1.expect)(actualRate).toBeGreaterThan(0.45);
            (0, vitest_1.expect)(actualRate).toBeLessThan(0.55);
        });
    });
    (0, vitest_1.describe)('getters', () => {
        (0, vitest_1.it)('should expose batchSize getter', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: 150 });
            (0, vitest_1.expect)(config.batchSize).toBe(150);
        });
        (0, vitest_1.it)('should expose flushInterval getter', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ flushInterval: 45000 });
            (0, vitest_1.expect)(config.flushInterval).toBe(45000);
        });
        (0, vitest_1.it)('should expose shouldHashUserIds getter', () => {
            const config1 = analytics_config_value_1.AnalyticsConfigValue.create({ hashUserIds: true });
            const config2 = analytics_config_value_1.AnalyticsConfigValue.create({ hashUserIds: false });
            (0, vitest_1.expect)(config1.shouldHashUserIds).toBe(true);
            (0, vitest_1.expect)(config2.shouldHashUserIds).toBe(false);
        });
        (0, vitest_1.it)('should expose sampleRate getter', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ sampleRate: 0.75 });
            (0, vitest_1.expect)(config.sampleRate).toBe(0.75);
        });
        (0, vitest_1.it)('should expose full config getter', () => {
            const inputConfig = {
                batchSize: 200,
                flushInterval: 60000,
                hashUserIds: false,
                retentionDays: 180,
                sampleRate: 0.8
            };
            const config = analytics_config_value_1.AnalyticsConfigValue.create(inputConfig);
            const fullConfig = config.config;
            (0, vitest_1.expect)(fullConfig.batchSize).toBe(200);
            (0, vitest_1.expect)(fullConfig.flushInterval).toBe(60000);
            (0, vitest_1.expect)(fullConfig.hashUserIds).toBe(false);
            (0, vitest_1.expect)(fullConfig.retentionDays).toBe(180);
            (0, vitest_1.expect)(fullConfig.sampleRate).toBe(0.8);
        });
        (0, vitest_1.it)('should return immutable copy from config getter', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: 100 });
            const configCopy1 = config.config;
            const configCopy2 = config.config;
            // Modifying copy should not affect original
            configCopy1.batchSize = 999;
            (0, vitest_1.expect)(config.batchSize).toBe(100);
            (0, vitest_1.expect)(configCopy2.batchSize).toBe(100);
        });
    });
    (0, vitest_1.describe)('equals()', () => {
        (0, vitest_1.it)('should be equal when all properties are the same', () => {
            const config1 = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 150,
                flushInterval: 45000
            });
            const config2 = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 150,
                flushInterval: 45000
            });
            (0, vitest_1.expect)(config1.equals(config2)).toBe(true);
        });
        (0, vitest_1.it)('should not be equal when batch size differs', () => {
            const config1 = analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: 100 });
            const config2 = analytics_config_value_1.AnalyticsConfigValue.create({ batchSize: 200 });
            (0, vitest_1.expect)(config1.equals(config2)).toBe(false);
        });
        (0, vitest_1.it)('should not be equal when any property differs', () => {
            const config1 = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 100,
                sampleRate: 1
            });
            const config2 = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 100,
                sampleRate: 0.5
            });
            (0, vitest_1.expect)(config1.equals(config2)).toBe(false);
        });
    });
    (0, vitest_1.describe)('real-world configurations', () => {
        (0, vitest_1.it)('should create production configuration', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 500,
                flushInterval: 30000, // 30 seconds
                hashUserIds: true,
                retentionDays: 90,
                sampleRate: 1
            });
            (0, vitest_1.expect)(config.batchSize).toBe(500);
            (0, vitest_1.expect)(config.flushInterval).toBe(30000);
            (0, vitest_1.expect)(config.shouldHashUserIds).toBe(true);
            (0, vitest_1.expect)(config.sampleRate).toBe(1);
        });
        (0, vitest_1.it)('should create development configuration', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 10,
                flushInterval: 5000, // 5 seconds
                hashUserIds: false,
                retentionDays: 7,
                sampleRate: 0.1 // Only 10% of events
            });
            (0, vitest_1.expect)(config.batchSize).toBe(10);
            (0, vitest_1.expect)(config.flushInterval).toBe(5000);
            (0, vitest_1.expect)(config.shouldHashUserIds).toBe(false);
            (0, vitest_1.expect)(config.sampleRate).toBe(0.1);
        });
        (0, vitest_1.it)('should create high-volume configuration', () => {
            const config = analytics_config_value_1.AnalyticsConfigValue.create({
                batchSize: 1000,
                flushInterval: 60000, // 1 minute
                hashUserIds: true,
                retentionDays: 30,
                sampleRate: 0.5 // Sample 50% to reduce load
            });
            (0, vitest_1.expect)(config.batchSize).toBe(1000);
            (0, vitest_1.expect)(config.sampleRate).toBe(0.5);
        });
    });
});
//# sourceMappingURL=analytics-config.value.test.js.map