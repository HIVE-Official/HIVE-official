/**
 * AnalyticsConfigValue Tests
 * Tests for analytics configuration value object
 */

import { describe, it, expect } from 'vitest';
import { AnalyticsConfigValue } from '../analytics-config.value';

describe('AnalyticsConfigValue', () => {
  describe('create()', () => {
    it('should create with default configuration when empty object provided', () => {
      const config = AnalyticsConfigValue.create({});

      expect(config.batchSize).toBe(100);
      expect(config.flushInterval).toBe(30000);
      expect(config.shouldHashUserIds).toBe(true);
      expect(config.sampleRate).toBe(1);
    });

    it('should create with partial configuration override', () => {
      const config = AnalyticsConfigValue.create({
        batchSize: 50,
        sampleRate: 0.5
      });

      expect(config.batchSize).toBe(50);
      expect(config.flushInterval).toBe(30000); // Default
      expect(config.sampleRate).toBe(0.5);
    });

    it('should create with full custom configuration', () => {
      const config = AnalyticsConfigValue.create({
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

      expect(config.batchSize).toBe(200);
      expect(config.flushInterval).toBe(60000);
      expect(config.shouldHashUserIds).toBe(false);
      expect(config.sampleRate).toBe(0.8);
    });

    it('should throw when batch size is zero', () => {
      expect(() => {
        AnalyticsConfigValue.create({ batchSize: 0 });
      }).toThrow('Batch size must be between 1 and 1000');
    });

    it('should throw when batch size is negative', () => {
      expect(() => {
        AnalyticsConfigValue.create({ batchSize: -1 });
      }).toThrow('Batch size must be between 1 and 1000');
    });

    it('should throw when batch size exceeds 1000', () => {
      expect(() => {
        AnalyticsConfigValue.create({ batchSize: 1001 });
      }).toThrow('Batch size must be between 1 and 1000');
    });

    it('should accept batch size of 1', () => {
      const config = AnalyticsConfigValue.create({ batchSize: 1 });
      expect(config.batchSize).toBe(1);
    });

    it('should accept batch size of 1000', () => {
      const config = AnalyticsConfigValue.create({ batchSize: 1000 });
      expect(config.batchSize).toBe(1000);
    });

    it('should throw when flush interval is too short (< 1000ms)', () => {
      expect(() => {
        AnalyticsConfigValue.create({ flushInterval: 999 });
      }).toThrow('Flush interval must be between 1 second and 5 minutes');
    });

    it('should throw when flush interval is too long (> 300000ms)', () => {
      expect(() => {
        AnalyticsConfigValue.create({ flushInterval: 300001 });
      }).toThrow('Flush interval must be between 1 second and 5 minutes');
    });

    it('should accept flush interval of 1000ms', () => {
      const config = AnalyticsConfigValue.create({ flushInterval: 1000 });
      expect(config.flushInterval).toBe(1000);
    });

    it('should accept flush interval of 300000ms (5 minutes)', () => {
      const config = AnalyticsConfigValue.create({ flushInterval: 300000 });
      expect(config.flushInterval).toBe(300000);
    });

    it('should throw when sample rate is negative', () => {
      expect(() => {
        AnalyticsConfigValue.create({ sampleRate: -0.1 });
      }).toThrow('Sample rate must be between 0 and 1');
    });

    it('should throw when sample rate exceeds 1', () => {
      expect(() => {
        AnalyticsConfigValue.create({ sampleRate: 1.1 });
      }).toThrow('Sample rate must be between 0 and 1');
    });

    it('should accept sample rate of 0 (no sampling)', () => {
      const config = AnalyticsConfigValue.create({ sampleRate: 0 });
      expect(config.sampleRate).toBe(0);
    });

    it('should accept sample rate of 1 (all events)', () => {
      const config = AnalyticsConfigValue.create({ sampleRate: 1 });
      expect(config.sampleRate).toBe(1);
    });

    it('should throw when retention days is zero', () => {
      expect(() => {
        AnalyticsConfigValue.create({ retentionDays: 0 });
      }).toThrow('Retention days must be between 1 and 730 days');
    });

    it('should throw when retention days exceeds 730 (2 years)', () => {
      expect(() => {
        AnalyticsConfigValue.create({ retentionDays: 731 });
      }).toThrow('Retention days must be between 1 and 730 days');
    });

    it('should accept retention days of 1', () => {
      const config = AnalyticsConfigValue.create({ retentionDays: 1 });
      expect(config.config.retentionDays).toBe(1);
    });

    it('should accept retention days of 730', () => {
      const config = AnalyticsConfigValue.create({ retentionDays: 730 });
      expect(config.config.retentionDays).toBe(730);
    });
  });

  describe('shouldSampleEvent()', () => {
    it('should always return true when sample rate is 1', () => {
      const config = AnalyticsConfigValue.create({ sampleRate: 1 });

      // Test multiple times
      for (let i = 0; i < 100; i++) {
        expect(config.shouldSampleEvent()).toBe(true);
      }
    });

    it('should always return false when sample rate is 0', () => {
      const config = AnalyticsConfigValue.create({ sampleRate: 0 });

      // Test multiple times
      for (let i = 0; i < 100; i++) {
        expect(config.shouldSampleEvent()).toBe(false);
      }
    });

    it('should return true approximately 50% of time when sample rate is 0.5', () => {
      const config = AnalyticsConfigValue.create({ sampleRate: 0.5 });

      let trueCount = 0;
      const iterations = 10000;

      for (let i = 0; i < iterations; i++) {
        if (config.shouldSampleEvent()) {
          trueCount++;
        }
      }

      const actualRate = trueCount / iterations;
      // Allow 5% deviation due to randomness
      expect(actualRate).toBeGreaterThan(0.45);
      expect(actualRate).toBeLessThan(0.55);
    });
  });

  describe('getters', () => {
    it('should expose batchSize getter', () => {
      const config = AnalyticsConfigValue.create({ batchSize: 150 });
      expect(config.batchSize).toBe(150);
    });

    it('should expose flushInterval getter', () => {
      const config = AnalyticsConfigValue.create({ flushInterval: 45000 });
      expect(config.flushInterval).toBe(45000);
    });

    it('should expose shouldHashUserIds getter', () => {
      const config1 = AnalyticsConfigValue.create({ hashUserIds: true });
      const config2 = AnalyticsConfigValue.create({ hashUserIds: false });

      expect(config1.shouldHashUserIds).toBe(true);
      expect(config2.shouldHashUserIds).toBe(false);
    });

    it('should expose sampleRate getter', () => {
      const config = AnalyticsConfigValue.create({ sampleRate: 0.75 });
      expect(config.sampleRate).toBe(0.75);
    });

    it('should expose full config getter', () => {
      const inputConfig = {
        batchSize: 200,
        flushInterval: 60000,
        hashUserIds: false,
        retentionDays: 180,
        sampleRate: 0.8
      };

      const config = AnalyticsConfigValue.create(inputConfig);
      const fullConfig = config.config;

      expect(fullConfig.batchSize).toBe(200);
      expect(fullConfig.flushInterval).toBe(60000);
      expect(fullConfig.hashUserIds).toBe(false);
      expect(fullConfig.retentionDays).toBe(180);
      expect(fullConfig.sampleRate).toBe(0.8);
    });

    it('should return immutable copy from config getter', () => {
      const config = AnalyticsConfigValue.create({ batchSize: 100 });
      const configCopy1 = config.config;
      const configCopy2 = config.config;

      // Modifying copy should not affect original
      configCopy1.batchSize = 999;

      expect(config.batchSize).toBe(100);
      expect(configCopy2.batchSize).toBe(100);
    });
  });

  describe('equals()', () => {
    it('should be equal when all properties are the same', () => {
      const config1 = AnalyticsConfigValue.create({
        batchSize: 150,
        flushInterval: 45000
      });

      const config2 = AnalyticsConfigValue.create({
        batchSize: 150,
        flushInterval: 45000
      });

      expect(config1.equals(config2)).toBe(true);
    });

    it('should not be equal when batch size differs', () => {
      const config1 = AnalyticsConfigValue.create({ batchSize: 100 });
      const config2 = AnalyticsConfigValue.create({ batchSize: 200 });

      expect(config1.equals(config2)).toBe(false);
    });

    it('should not be equal when any property differs', () => {
      const config1 = AnalyticsConfigValue.create({
        batchSize: 100,
        sampleRate: 1
      });

      const config2 = AnalyticsConfigValue.create({
        batchSize: 100,
        sampleRate: 0.5
      });

      expect(config1.equals(config2)).toBe(false);
    });
  });

  describe('real-world configurations', () => {
    it('should create production configuration', () => {
      const config = AnalyticsConfigValue.create({
        batchSize: 500,
        flushInterval: 30000, // 30 seconds
        hashUserIds: true,
        retentionDays: 90,
        sampleRate: 1
      });

      expect(config.batchSize).toBe(500);
      expect(config.flushInterval).toBe(30000);
      expect(config.shouldHashUserIds).toBe(true);
      expect(config.sampleRate).toBe(1);
    });

    it('should create development configuration', () => {
      const config = AnalyticsConfigValue.create({
        batchSize: 10,
        flushInterval: 5000, // 5 seconds
        hashUserIds: false,
        retentionDays: 7,
        sampleRate: 0.1 // Only 10% of events
      });

      expect(config.batchSize).toBe(10);
      expect(config.flushInterval).toBe(5000);
      expect(config.shouldHashUserIds).toBe(false);
      expect(config.sampleRate).toBe(0.1);
    });

    it('should create high-volume configuration', () => {
      const config = AnalyticsConfigValue.create({
        batchSize: 1000,
        flushInterval: 60000, // 1 minute
        hashUserIds: true,
        retentionDays: 30,
        sampleRate: 0.5 // Sample 50% to reduce load
      });

      expect(config.batchSize).toBe(1000);
      expect(config.sampleRate).toBe(0.5);
    });
  });
});
