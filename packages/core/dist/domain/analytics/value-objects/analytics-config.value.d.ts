/**
 * Analytics Configuration Value Object
 * Domain value object for analytics configuration settings
 */
import { FeedAnalyticsConfig } from '../types';
export declare class AnalyticsConfigValue {
    private readonly _config;
    private constructor();
    static create(config: Partial<FeedAnalyticsConfig>): AnalyticsConfigValue;
    get config(): FeedAnalyticsConfig;
    get batchSize(): number;
    get flushInterval(): number;
    get shouldHashUserIds(): boolean;
    get sampleRate(): number;
    shouldSampleEvent(): boolean;
    equals(other: AnalyticsConfigValue): boolean;
}
//# sourceMappingURL=analytics-config.value.d.ts.map