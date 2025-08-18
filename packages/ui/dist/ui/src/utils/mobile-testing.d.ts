export interface DeviceProfile {
    name: string;
    userAgent: string;
    viewport: {
        width: number;
        height: number;
        devicePixelRatio: number;
    };
    network: {
        effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
        downlink: number;
        rtt: number;
    };
    memory: number;
    cpuCores: number;
    touchCapable: boolean;
    orientation: 'portrait' | 'landscape';
}
export declare const DEVICE_PROFILES: Record<string, DeviceProfile>;
export interface TestScenario {
    name: string;
    description: string;
    steps: TestStep[];
    expectedBehavior: string;
    performance?: {
        maxLoadTime: number;
        maxMemoryUsage: number;
        minFrameRate: number;
    };
}
export interface TestStep {
    action: 'navigate' | 'tap' | 'swipe' | 'scroll' | 'wait' | 'assert';
    target?: string;
    value?: any;
    timeout?: number;
}
export declare const MOBILE_TEST_SCENARIOS: TestScenario[];
export declare class MobileTester {
    private currentProfile;
    private testResults;
    simulateDevice(profileName: keyof typeof DEVICE_PROFILES): Promise<boolean>;
    runScenario(scenario: TestScenario): Promise<TestResult>;
    private executeStep;
    private navigateStep;
    private tapStep;
    private swipeStep;
    private scrollStep;
    private waitStep;
    private assertStep;
    private isElementVisible;
    private startPerformanceMonitoring;
    private collectPerformanceMetrics;
    private getMemoryUsage;
    private validatePerformance;
    getResults(): TestResult[];
    generateReport(): TestReport;
}
interface PerformanceMetrics {
    loadTime: number;
    memoryUsage: number;
    frameRate: number;
}
interface StepResult {
    stepIndex: number;
    action: string;
    startTime: number;
    endTime: number;
    duration: number;
    passed: boolean;
    error: string | null;
}
interface TestResult {
    scenarioName: string;
    deviceProfile: string;
    startTime: number;
    endTime: number;
    duration: number;
    passed: boolean;
    steps: StepResult[];
    performance: PerformanceMetrics;
    errors: string[];
}
interface TestReport {
    summary: {
        total: number;
        passed: number;
        failed: number;
        successRate: number;
    };
    results: TestResult[];
    deviceProfiles: string[];
    generatedAt: string;
}
export declare const mobileTester: MobileTester;
export declare function useMobileTesting(): {
    isRunning: boolean;
    results: TestResult[];
    runTests: (scenarios: TestScenario[], deviceProfile?: keyof typeof DEVICE_PROFILES) => Promise<void>;
    generateReport: () => TestReport;
    deviceProfiles: Record<string, DeviceProfile>;
    scenarios: TestScenario[];
};
export {};
//# sourceMappingURL=mobile-testing.d.ts.map