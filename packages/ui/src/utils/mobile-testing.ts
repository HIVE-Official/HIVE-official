'use client';

/**
 * Mobile Testing Utilities
 * Comprehensive testing tools for mobile experience validation
 */

import { useState } from 'react';
import { logger } from './logger';

import { getNetworkInfo, getBatteryInfo, getDeviceMemory } from './mobile-native-features';
import { mobilePerformanceManager } from './mobile-performance';

// Device simulation types
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

// Common mobile device profiles for testing
export const DEVICE_PROFILES: Record<string, DeviceProfile> = {
  'iPhone SE': {
    name: 'iPhone SE',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 375, height: 667, devicePixelRatio: 2 },
    network: { effectiveType: '4g', downlink: 10, rtt: 50 },
    memory: 3,
    cpuCores: 2,
    touchCapable: true,
    orientation: 'portrait'
  },
  'iPhone 12 Pro': {
    name: 'iPhone 12 Pro',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 390, height: 844, devicePixelRatio: 3 },
    network: { effectiveType: '4g', downlink: 25, rtt: 30 },
    memory: 6,
    cpuCores: 6,
    touchCapable: true,
    orientation: 'portrait'
  },
  'Samsung Galaxy S21': {
    name: 'Samsung Galaxy S21',
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    viewport: { width: 360, height: 800, devicePixelRatio: 3 },
    network: { effectiveType: '4g', downlink: 20, rtt: 40 },
    memory: 8,
    cpuCores: 8,
    touchCapable: true,
    orientation: 'portrait'
  },
  'iPad Pro': {
    name: 'iPad Pro',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    viewport: { width: 1024, height: 1366, devicePixelRatio: 2 },
    network: { effectiveType: '4g', downlink: 30, rtt: 25 },
    memory: 8,
    cpuCores: 8,
    touchCapable: true,
    orientation: 'portrait'
  },
  'Low-end Android': {
    name: 'Low-end Android',
    userAgent: 'Mozilla/5.0 (Linux; Android 9; SM-A102U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.93 Mobile Safari/537.36',
    viewport: { width: 360, height: 640, devicePixelRatio: 1.5 },
    network: { effectiveType: '3g', downlink: 1.5, rtt: 300 },
    memory: 2,
    cpuCores: 4,
    touchCapable: true,
    orientation: 'portrait'
  }
};

// Test scenarios for mobile flows
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

// Core mobile test scenarios
export const MOBILE_TEST_SCENARIOS: TestScenario[] = [
  {
    name: 'Feed Browse Flow',
    description: 'User browses through the main feed on mobile',
    steps: [
      { action: 'navigate', value: '/feed' },
      { action: 'wait', timeout: 2000 },
      { action: 'scroll', value: { direction: 'down', distance: 500 } },
      { action: 'tap', target: '[data-testid="post-like-button"]' },
      { action: 'swipe', value: { direction: 'left', target: '[data-testid="post-card"]' } },
      { action: 'assert', value: { type: 'visible', target: '[data-testid="swipe-actions"]' } }
    ],
    expectedBehavior: 'Smooth scrolling, responsive interactions, swipe actions work',
    performance: {
      maxLoadTime: 3000,
      maxMemoryUsage: 100,
      minFrameRate: 30
    }
  },
  {
    name: 'Space Creation Flow',
    description: 'User creates a new space on mobile',
    steps: [
      { action: 'navigate', value: '/spaces' },
      { action: 'tap', target: '[data-testid="create-space-button"]' },
      { action: 'wait', timeout: 1000 },
      { action: 'tap', target: '[data-testid="space-name-input"]' },
      { action: 'assert', value: { type: 'focused', target: '[data-testid="space-name-input"]' } }
    ],
    expectedBehavior: 'Modal opens smoothly, input focuses correctly',
    performance: {
      maxLoadTime: 2000,
      maxMemoryUsage: 75,
      minFrameRate: 45
    }
  },
  {
    name: 'Tool Builder Flow',
    description: 'User accesses tool builder on mobile',
    steps: [
      { action: 'navigate', value: '/tools/new' },
      { action: 'wait', timeout: 3000 },
      { action: 'tap', target: '[data-testid="tool-type-selector"]' },
      { action: 'scroll', value: { direction: 'down', distance: 200 } },
      { action: 'tap', target: '[data-testid="create-tool-button"]' }
    ],
    expectedBehavior: 'Tool builder loads and is usable on mobile',
    performance: {
      maxLoadTime: 4000,
      maxMemoryUsage: 150,
      minFrameRate: 30
    }
  }
];

// Mobile testing utilities
export class MobileTester {
  private currentProfile: DeviceProfile | null = null;
  private testResults: TestResult[] = [];

  // Simulate device profile
  async simulateDevice(profileName: keyof typeof DEVICE_PROFILES): Promise<boolean> {
    const profile = DEVICE_PROFILES[profileName];
    if (!profile) {
      logger.error('Device profile not found:', { profileName });
      return false;
    }

    this.currentProfile = profile;

    try {
      // Simulate viewport
      if ('visualViewport' in window) {
        // Modern approach
        Object.defineProperty(window.visualViewport, 'width', { 
          get: () => profile.viewport.width 
        });
        Object.defineProperty(window.visualViewport, 'height', { 
          get: () => profile.viewport.height 
        });
      }

      // Simulate device pixel ratio
      Object.defineProperty(window, 'devicePixelRatio', {
        get: () => profile.viewport.devicePixelRatio
      });

      // Simulate user agent
      Object.defineProperty(navigator, 'userAgent', {
        get: () => profile.userAgent
      });

      // Simulate touch capability
      if (profile.touchCapable) {
        Object.defineProperty(window, 'TouchEvent', { value: class TouchEvent {} });
        Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 5 });
      }
      return true;
    } catch (error) {
      logger.error('Failed to simulate device:', { error });
      return false;
    }
  }

  // Run test scenario
  async runScenario(scenario: TestScenario): Promise<TestResult> {
    const startTime = performance.now();
    const result: TestResult = {
      scenarioName: scenario.name,
      deviceProfile: this.currentProfile?.name || 'Unknown',
      startTime,
      endTime: 0,
      duration: 0,
      passed: false,
      steps: [],
      performance: {
        loadTime: 0,
        memoryUsage: 0,
        frameRate: 0
      },
      errors: []
    };

    try {
      // Initialize performance monitoring
      const performanceStart = await this.startPerformanceMonitoring();

      // Execute test steps
      for (let i = 0; i < scenario.steps.length; i++) {
        const step = scenario.steps[i];
        const stepResult = await this.executeStep(step, i);
        result.steps.push(stepResult);

        if (!stepResult.passed) {
          result.errors.push(`Step ${i + 1} failed: ${stepResult.error}`);
        }
      }

      // Collect performance metrics
      result.performance = await this.collectPerformanceMetrics(performanceStart);

      // Validate performance requirements
      if (scenario.performance) {
        const perfValidation = this.validatePerformance(result.performance, scenario.performance);
        if (!perfValidation.passed) {
          result.errors.push(...perfValidation.errors);
        }
      }

      result.passed = result.errors.length === 0;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? (error instanceof Error ? error.message : "Unknown error") : String(error);
      result.errors.push(`Scenario execution failed: ${errorMessage}`);
      result.passed = false;
    }

    result.endTime = performance.now();
    result.duration = result.endTime - result.startTime;

    this.testResults.push(result);
    return result;
  }

  // Execute individual test step
  private async executeStep(step: TestStep, index: number): Promise<StepResult> {
    const stepResult: StepResult = {
      stepIndex: index,
      action: step.action,
      startTime: performance.now(),
      endTime: 0,
      duration: 0,
      passed: false,
      error: null
    };

    try {
      switch (step.action) {
        case 'navigate':
          await this.navigateStep(step.value);
          break;
        case 'tap':
          await this.tapStep(step.target!);
          break;
        case 'swipe':
          await this.swipeStep(step.value);
          break;
        case 'scroll':
          await this.scrollStep(step.value);
          break;
        case 'wait':
          await this.waitStep(step.timeout!);
          break;
        case 'assert':
          await this.assertStep(step.value);
          break;
        default:
          throw new Error(`Unknown action: ${step.action}`);
      }

      stepResult.passed = true;
    } catch (error) {
      stepResult.passed = false;
      stepResult.error = error instanceof Error ? (error instanceof Error ? error.message : "Unknown error") : String(error);
    }

    stepResult.endTime = performance.now();
    stepResult.duration = stepResult.endTime - stepResult.startTime;

    return stepResult;
  }

  // Test step implementations
  private async navigateStep(url: string): Promise<void> {
    // Simulate navigation
    window.history.pushState({}, '', url);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  private async tapStep(selector: string): Promise<void> {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }

    // Simulate touch events
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const touchStart = new TouchEvent('touchstart', {
      touches: [new Touch({
        identifier: 0,
        target: element,
        clientX: centerX,
        clientY: centerY,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1
      })]
    });

    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [new Touch({
        identifier: 0,
        target: element,
        clientX: centerX,
        clientY: centerY,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1
      })]
    });

    element.dispatchEvent(touchStart);
    await new Promise(resolve => setTimeout(resolve, 50));
    element.dispatchEvent(touchEnd);
    
    // Also dispatch click for compatibility
    (element as HTMLElement).click();
  }

  private async swipeStep(swipeData: any): Promise<void> {
    const { direction, target, distance = 100 } = swipeData;
    const element = document.querySelector(target);
    
    if (!element) {
      throw new Error(`Swipe target not found: ${target}`);
    }

    // Simulate swipe gesture
    const rect = element.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    let endX = startX;
    let endY = startY;

    switch (direction) {
      case 'left':
        endX = startX - distance;
        break;
      case 'right':
        endX = startX + distance;
        break;
      case 'up':
        endY = startY - distance;
        break;
      case 'down':
        endY = startY + distance;
        break;
    }

    // Dispatch touch events for swipe
    const touchStart = new TouchEvent('touchstart', {
      touches: [new Touch({
        identifier: 0,
        target: element,
        clientX: startX,
        clientY: startY,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1
      })]
    });

    const touchMove = new TouchEvent('touchmove', {
      touches: [new Touch({
        identifier: 0,
        target: element,
        clientX: endX,
        clientY: endY,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1
      })]
    });

    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [new Touch({
        identifier: 0,
        target: element,
        clientX: endX,
        clientY: endY,
        radiusX: 10,
        radiusY: 10,
        rotationAngle: 0,
        force: 1
      })]
    });

    element.dispatchEvent(touchStart);
    await new Promise(resolve => setTimeout(resolve, 100));
    element.dispatchEvent(touchMove);
    await new Promise(resolve => setTimeout(resolve, 100));
    element.dispatchEvent(touchEnd);
  }

  private async scrollStep(scrollData: any): Promise<void> {
    const { direction, distance } = scrollData;
    
    let deltaX = 0;
    let deltaY = 0;

    switch (direction) {
      case 'down':
        deltaY = distance;
        break;
      case 'up':
        deltaY = -distance;
        break;
      case 'left':
        deltaX = -distance;
        break;
      case 'right':
        deltaX = distance;
        break;
    }

    window.scrollBy(deltaX, deltaY);
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  private async waitStep(timeout: number): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, timeout));
  }

  private async assertStep(assertion: any): Promise<void> {
    const { type, target } = assertion;
    
    switch (type) {
      case 'visible': {
        const element = document.querySelector(target);
        if (!element || !this.isElementVisible(element)) {
          throw new Error(`Element not visible: ${target}`);
        }
        break;
      }
      case 'focused':
        if (document.activeElement !== document.querySelector(target)) {
          throw new Error(`Element not focused: ${target}`);
        }
        break;
      default:
        throw new Error(`Unknown assertion type: ${type}`);
    }
  }

  private isElementVisible(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && 
           rect.top >= 0 && rect.left >= 0 &&
           rect.bottom <= window.innerHeight && 
           rect.right <= window.innerWidth;
  }

  // Performance monitoring
  private async startPerformanceMonitoring(): Promise<PerformanceStart> {
    const startMemory = this.getMemoryUsage();
    const startTime = performance.now();
    
    return {
      startTime,
      startMemory,
      frameStart: mobilePerformanceManager.getAverageFrameRate()
    };
  }

  private async collectPerformanceMetrics(start: PerformanceStart): Promise<PerformanceMetrics> {
    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();
    const frameRate = mobilePerformanceManager.getAverageFrameRate();

    return {
      loadTime: endTime - start.startTime,
      memoryUsage: Math.max(0, endMemory - start.startMemory),
      frameRate
    };
  }

  private getMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }

  private validatePerformance(actual: PerformanceMetrics, expected: any): ValidationResult {
    const errors: string[] = [];

    if (actual.loadTime > expected.maxLoadTime) {
      errors.push(`Load time too slow: ${actual.loadTime}ms (max: ${expected.maxLoadTime}ms)`);
    }

    if (actual.memoryUsage > expected.maxMemoryUsage) {
      errors.push(`Memory usage too high: ${actual.memoryUsage}MB (max: ${expected.maxMemoryUsage}MB)`);
    }

    if (actual.frameRate < expected.minFrameRate) {
      errors.push(`Frame rate too low: ${actual.frameRate}fps (min: ${expected.minFrameRate}fps)`);
    }

    return {
      passed: errors.length === 0,
      errors
    };
  }

  // Get test results
  getResults(): TestResult[] {
    return this.testResults;
  }

  // Generate test report
  generateReport(): TestReport {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    
    return {
      summary: {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        successRate: totalTests > 0 ? (passedTests / totalTests) * 100 : 0
      },
      results: this.testResults,
      deviceProfiles: [...new Set(this.testResults.map(r => r.deviceProfile))],
      generatedAt: new Date().toISOString()
    };
  }
}

// Type definitions
interface PerformanceStart {
  startTime: number;
  startMemory: number;
  frameStart: number;
}

interface PerformanceMetrics {
  loadTime: number;
  memoryUsage: number;
  frameRate: number;
}

interface ValidationResult {
  passed: boolean;
  errors: string[];
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

// Export testing utilities
export const mobileTester = new MobileTester();

// React hook for mobile testing
export function useMobileTesting() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const runTests = async (scenarios: TestScenario[], deviceProfile?: keyof typeof DEVICE_PROFILES) => {
    setIsRunning(true);
    
    try {
      if (deviceProfile) {
        await mobileTester.simulateDevice(deviceProfile);
      }

      const testResults: TestResult[] = [];
      for (const scenario of scenarios) {
        const result = await mobileTester.runScenario(scenario);
        testResults.push(result);
      }

      setResults(testResults);
    } catch (error) {
      logger.error('Mobile testing failed:', { error });
    } finally {
      setIsRunning(false);
    }
  };

  const generateReport = () => mobileTester.generateReport();

  return {
    isRunning,
    results,
    runTests,
    generateReport,
    deviceProfiles: DEVICE_PROFILES,
    scenarios: MOBILE_TEST_SCENARIOS
  };
}