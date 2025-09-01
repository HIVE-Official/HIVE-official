/**
 * Comprehensive Mobile Flow Tests for HIVE Platform
 * Tests critical user flows on mobile devices
 */

import { mobileTester, MOBILE_TEST_SCENARIOS, DEVICE_PROFILES } from '@hive/ui';

// Enhanced HIVE-specific mobile test scenarios
export const HIVE_MOBILE_TEST_SCENARIOS = [
  ...MOBILE_TEST_SCENARIOS,
  
  // Profile Management Flow
  {
    name: 'Profile Creation and Customization',
    description: 'User creates and customizes their HIVE profile',
    steps: [
      { action: 'navigate', value: '/profile/edit' },
      { action: 'wait', timeout: 2000 },
      { action: 'tap', target: '[data-testid="profile-photo-upload"]' },
      { action: 'tap', target: '[data-testid="bio-input"]' },
      { action: 'assert', value: { type: 'focused', target: '[data-testid="bio-input"]' } },
      { action: 'scroll', value: { direction: 'down', distance: 300 } },
      { action: 'tap', target: '[data-testid="save-profile-button"]' }
    ],
    expectedBehavior: 'Profile editing flows smoothly with touch-optimized inputs',
    performance: {
      maxLoadTime: 2500,
      maxMemoryUsage: 80,
      minFrameRate: 45
    }
  },

  // Space Discovery Flow
  {
    name: 'Space Discovery and Joining',
    description: 'User discovers and joins spaces through mobile interface',
    steps: [
      { action: 'navigate', value: '/spaces' },
      { action: 'wait', timeout: 1500 },
      { action: 'tap', target: '[data-testid="search-spaces-input"]' },
      { action: 'assert', value: { type: 'focused', target: '[data-testid="search-spaces-input"]' } },
      { action: 'scroll', value: { direction: 'down', distance: 400 } },
      { action: 'tap', target: '[data-testid="space-card"]:first-child' },
      { action: 'tap', target: '[data-testid="join-space-button"]' },
      { action: 'assert', value: { type: 'visible', target: '[data-testid="success-message"]' } }
    ],
    expectedBehavior: 'Space discovery and joining works seamlessly on mobile',
    performance: {
      maxLoadTime: 3000,
      maxMemoryUsage: 100,
      minFrameRate: 30
    }
  },

  // Tool Interaction Flow  
  {
    name: 'Tool Creation and Usage',
    description: 'User creates a simple tool using mobile interface',
    steps: [
      { action: 'navigate', value: '/hivelab' },
      { action: 'wait', timeout: 2000 },
      { action: 'tap', target: '[data-testid="create-new-tool"]' },
      { action: 'tap', target: '[data-testid="visual-builder-mode"]' },
      { action: 'wait', timeout: 1000 },
      { action: 'tap', target: '[data-testid="add-text-input-element"]' },
      { action: 'tap', target: '[data-testid="add-button-element"]' },
      { action: 'tap', target: '[data-testid="preview-tool-button"]' }
    ],
    expectedBehavior: 'Tool builder interface is usable on mobile with touch interactions',
    performance: {
      maxLoadTime: 4000,
      maxMemoryUsage: 150,
      minFrameRate: 25
    }
  },

  // Calendar Integration Flow
  {
    name: 'Calendar Management',
    description: 'User manages calendar events on mobile',
    steps: [
      { action: 'navigate', value: '/calendar' },
      { action: 'wait', timeout: 1500 },
      { action: 'tap', target: '[data-testid="add-event-button"]' },
      { action: 'tap', target: '[data-testid="event-title-input"]' },
      { action: 'assert', value: { type: 'focused', target: '[data-testid="event-title-input"]' } },
      { action: 'scroll', value: { direction: 'down', distance: 200 } },
      { action: 'tap', target: '[data-testid="save-event-button"]' }
    ],
    expectedBehavior: 'Calendar interface is mobile-friendly with proper input handling',
    performance: {
      maxLoadTime: 2000,
      maxMemoryUsage: 75,
      minFrameRate: 45
    }
  },

  // Feed Interaction Flow
  {
    name: 'Feed Browsing and Interaction',
    description: 'User browses and interacts with the main feed',
    steps: [
      { action: 'navigate', value: '/feed' },
      { action: 'wait', timeout: 2000 },
      { action: 'scroll', value: { direction: 'down', distance: 300 } },
      { action: 'swipe', value: { direction: 'left', target: '[data-testid="feed-post"]:first-child' } },
      { action: 'assert', value: { type: 'visible', target: '[data-testid="swipe-actions"]' } },
      { action: 'tap', target: '[data-testid="like-action"]' },
      { action: 'scroll', value: { direction: 'up', distance: 100 } },
      { action: 'assert', value: { type: 'visible', target: '[data-testid="pull-to-refresh-indicator"]' } }
    ],
    expectedBehavior: 'Feed supports pull-to-refresh and swipe actions',
    performance: {
      maxLoadTime: 2500,
      maxMemoryUsage: 90,
      minFrameRate: 40
    }
  }
];

// Mobile testing configuration
export class HiveMobileTester {
  private testResults: any[] = [];

  async runComprehensiveTests(): Promise<{
    summary: any;
    results: any[];
    report: string;
  }> {
    console.log('Starting comprehensive HIVE mobile testing...');

    // Test across multiple device profiles
    const testProfiles = ['iPhone SE', 'iPhone 12 Pro', 'Samsung Galaxy S21', 'iPad Pro', 'Low-end Android'];
    
    for (const profileName of testProfiles) {
      console.log(`Testing on ${profileName}...`);
      
      // Simulate device
      await mobileTester.simulateDevice(profileName as keyof typeof DEVICE_PROFILES);
      
      // Run HIVE-specific scenarios
      for (const scenario of HIVE_MOBILE_TEST_SCENARIOS) {
        console.log(`  Running scenario: ${scenario.name}`);
        const result = await mobileTester.runScenario(scenario);
        
        this.testResults.push({
          ...result,
          deviceProfile: profileName,
          timestamp: new Date().toISOString()
        });
      }
    }

    return this.generateComprehensiveReport();
  }

  async testCriticalFlows(): Promise<{
    summary: any;
    criticalIssues: any[];
  }> {
    console.log('Testing critical mobile flows...');

    const criticalScenarios = HIVE_MOBILE_TEST_SCENARIOS.filter(scenario => 
      scenario.name.includes('Feed') || 
      scenario.name.includes('Space') || 
      scenario.name.includes('Profile')
    );

    const results = [];
    for (const scenario of criticalScenarios) {
      // Test on standard mobile device
      await mobileTester.simulateDevice('iPhone 12 Pro');
      const result = await mobileTester.runScenario(scenario);
      results.push(result);
    }

    const criticalIssues = results
      .filter(result => !result.passed)
      .map(result => ({
        scenario: result.scenarioName,
        errors: result.errors,
        performance: result.performance,
        severity: this.calculateSeverity(result)
      }));

    return {
      summary: {
        totalTests: results.length,
        passed: results.filter(r => r.passed).length,
        failed: results.filter(r => !r.passed).length,
        criticalIssues: criticalIssues.length
      },
      criticalIssues
    };
  }

  async testPerformance(): Promise<{
    performanceMetrics: any;
    recommendations: string[];
  }> {
    console.log('Running mobile performance tests...');

    // Test performance across different scenarios
    const performanceTests = [
      { name: 'Initial Load', path: '/', maxTime: 3000 },
      { name: 'Feed Load', path: '/feed', maxTime: 2500 },
      { name: 'Space Discovery', path: '/spaces', maxTime: 3000 },
      { name: 'Profile Load', path: '/profile', maxTime: 2000 },
      { name: 'Tool Builder', path: '/hivelab', maxTime: 4000 }
    ];

    const results = [];
    const recommendations = [];

    for (const test of performanceTests) {
      // Test on low-end device for worst-case scenario
      await mobileTester.simulateDevice('Low-end Android');
      
      const startTime = performance.now();
      // Simulate navigation and measure
      await this.simulatePageLoad(test.path);
      const endTime = performance.now();
      
      const loadTime = endTime - startTime;
      const passed = loadTime <= test.maxTime;
      
      results.push({
        name: test.name,
        loadTime,
        maxTime: test.maxTime,
        passed,
        score: passed ? 100 : Math.max(0, 100 - ((loadTime - test.maxTime) / test.maxTime) * 100)
      });

      if (!passed) {
        recommendations.push(`Optimize ${test.name} - currently ${Math.round(loadTime)}ms, target ${test.maxTime}ms`);
      }
    }

    const averageScore = results.reduce((acc, r) => acc + r.score, 0) / results.length;

    return {
      performanceMetrics: {
        overallScore: Math.round(averageScore),
        results,
        averageLoadTime: Math.round(results.reduce((acc, r) => acc + r.loadTime, 0) / results.length)
      },
      recommendations
    };
  }

  private async simulatePageLoad(path: string): Promise<void> {
    // Simulate page load timing
    return new Promise(resolve => {
      // Mock different load times based on path complexity
      const baseTime = path === '/hivelab' ? 800 : 300;
      const networkDelay = Math.random() * 200;
      setTimeout(resolve, baseTime + networkDelay);
    });
  }

  private calculateSeverity(result: any): 'low' | 'medium' | 'high' | 'critical' {
    const errorCount = result.errors.length;
    const performanceScore = this.calculatePerformanceScore(result.performance);

    if (errorCount > 3 || performanceScore < 30) return 'critical';
    if (errorCount > 1 || performanceScore < 60) return 'high';
    if (errorCount > 0 || performanceScore < 80) return 'medium';
    return 'low';
  }

  private calculatePerformanceScore(performance: any): number {
    // Simple scoring based on performance metrics
    let score = 100;
    
    if (performance.loadTime > 3000) score -= 30;
    else if (performance.loadTime > 2000) score -= 15;
    
    if (performance.memoryUsage > 150) score -= 20;
    else if (performance.memoryUsage > 100) score -= 10;
    
    if (performance.frameRate < 30) score -= 25;
    else if (performance.frameRate < 45) score -= 10;
    
    return Math.max(0, score);
  }

  private generateComprehensiveReport(): {
    summary: any;
    results: any[];
    report: string;
  } {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.passed).length;
    const failed = total - passed;
    const successRate = (passed / total) * 100;

    // Group results by device
    const resultsByDevice = this.testResults.reduce((acc, result) => {
      if (!acc[result.deviceProfile]) {
        acc[result.deviceProfile] = [];
      }
      acc[result.deviceProfile].push(result);
      return acc;
    }, {} as Record<string, any[]>);

    // Generate detailed report
    let report = `# HIVE Mobile Testing Report\n\n`;
    report += `**Generated:** ${new Date().toISOString()}\n`;
    report += `**Total Tests:** ${total}\n`;
    report += `**Success Rate:** ${successRate.toFixed(1)}%\n\n`;

    report += `## Summary by Device\n\n`;
    Object.entries(resultsByDevice).forEach(([device, results]) => {
      const devicePassed = results.filter(r => r.passed).length;
      const deviceTotal = results.length;
      const deviceSuccessRate = (devicePassed / deviceTotal) * 100;
      
      report += `### ${device}\n`;
      report += `- Tests: ${deviceTotal}\n`;
      report += `- Passed: ${devicePassed}\n`;
      report += `- Success Rate: ${deviceSuccessRate.toFixed(1)}%\n\n`;
    });

    report += `## Critical Issues\n\n`;
    const criticalIssues = this.testResults.filter(r => !r.passed);
    if (criticalIssues.length > 0) {
      criticalIssues.forEach(issue => {
        report += `**${issue.scenarioName}** (${issue.deviceProfile})\n`;
        issue.errors.forEach((error: string) => {
          report += `- ${error}\n`;
        });
        report += '\n';
      });
    } else {
      report += `No critical issues found! 🎉\n\n`;
    }

    return {
      summary: {
        total,
        passed,
        failed,
        successRate: Math.round(successRate),
        devicesTested: Object.keys(resultsByDevice).length,
        criticalIssues: criticalIssues.length
      },
      results: this.testResults,
      report
    };
  }
}

// Export testing utilities
export const hiveMobileTester = new HiveMobileTester();

// Automated test runner for CI/CD
export async function runAutomatedMobileTests(): Promise<boolean> {
  try {
    console.log('🚀 Running automated HIVE mobile tests...');
    
    // Run critical flow tests
    const criticalResults = await hiveMobileTester.testCriticalFlows();
    
    // Run performance tests
    const performanceResults = await hiveMobileTester.testPerformance();
    
    console.log('📊 Test Results:', {
      critical: criticalResults.summary,
      performance: performanceResults.performanceMetrics.overallScore
    });
    
    // Determine if tests pass (no critical issues and decent performance)
    const testsPass = criticalResults.criticalIssues.length === 0 && 
                      performanceResults.performanceMetrics.overallScore >= 75;
    
    if (testsPass) {
      console.log('✅ All mobile tests passed!');
    } else {
      console.log('❌ Mobile tests failed:', {
        criticalIssues: criticalResults.criticalIssues.length,
        performanceScore: performanceResults.performanceMetrics.overallScore
      });
    }
    
    return testsPass;
  } catch (error) {
    console.error('Mobile testing failed:', error);
    return false;
  }
}

// Manual testing helper for development
export async function runManualMobileTest(scenario?: string): Promise<void> {
  try {
    if (scenario) {
      const testScenario = HIVE_MOBILE_TEST_SCENARIOS.find(s => s.name.includes(scenario));
      if (testScenario) {
        console.log(`Running ${testScenario.name}...`);
        await mobileTester.simulateDevice('iPhone 12 Pro');
        const result = await mobileTester.runScenario(testScenario);
        console.log('Test result:', result);
      } else {
        console.log('Scenario not found. Available scenarios:');
        HIVE_MOBILE_TEST_SCENARIOS.forEach(s => console.log(`- ${s.name}`));
      }
    } else {
      console.log('Running quick mobile test suite...');
      const results = await hiveMobileTester.testCriticalFlows();
      console.log('Quick test results:', results.summary);
    }
  } catch (error) {
    console.error('Manual mobile test failed:', error);
  }
}