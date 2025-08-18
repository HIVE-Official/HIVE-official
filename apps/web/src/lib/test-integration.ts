/**
 * Integration Testing Utilities for HIVE Real-time and Feature Flag Systems
 * Use these functions to test that both systems work together correctly
 */

import { realtimeService } from './firebase-realtime';
import { featureFlagService, UserFeatureContext, HIVE_FEATURE_FLAGS } from './feature-flags';
import { logger } from './logger';

export interface IntegrationTestResult {
  success: boolean;
  testName: string;
  duration: number;
  result?: any;
  error?: string;
}

export class IntegrationTester {
  private testResults: IntegrationTestResult[] = [];

  /**
   * Run all integration tests
   */
  async runAllTests(): Promise<IntegrationTestResult[]> {
    this.testResults = [];
    
    
    
    await this.testFeatureFlagEvaluation();
    await this.testRealTimeMessaging();
    await this.testFeatureFlagAndRealtimeIntegration();
    await this.testAdminFeatureFlagCRUD();
    
    const passedTests = this.testResults.filter(r => r.success).length;
    const totalTests = this.testResults.length;
    
    
    
    return this.testResults;
  }

  /**
   * Test feature flag evaluation system
   */
  private async testFeatureFlagEvaluation(): Promise<void> {
    const testName = 'Feature Flag Evaluation';
    const startTime = Date.now();
    
    try {
      // Create test user context
      const testUserContext: UserFeatureContext = {
        userId: 'test-user-123',
        userRole: 'member',
        schoolId: 'buffalo.edu',
        spaceIds: ['space-1', 'space-2']
      };

      // Test evaluating a feature flag
      const result = await featureFlagService.isFeatureEnabled(
        HIVE_FEATURE_FLAGS.REAL_TIME_CHAT,
        testUserContext
      );

      // Test should pass if evaluation completes without error
      this.testResults.push({
        success: true,
        testName,
        duration: Date.now() - startTime,
        result
      });

      
    } catch (error) {
      this.testResults.push({
        success: false,
        testName,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      
    }
  }

  /**
   * Test real-time messaging functionality
   */
  private async testRealTimeMessaging(): Promise<void> {
    const testName = 'Real-time Messaging';
    const startTime = Date.now();
    
    try {
      // Test sending a message
      const messageId = await realtimeService.sendMessage({
        type: 'system',
        channel: 'test:integration:messages',
        senderId: 'test-system',
        content: {
          message: 'Integration test message',
          timestamp: new Date().toISOString()
        },
        metadata: {
          timestamp: new Date().toISOString(),
          priority: 'normal',
          requiresAck: false,
          retryCount: 0
        }
      });

      // Test should pass if message is sent successfully
      this.testResults.push({
        success: !!messageId,
        testName,
        duration: Date.now() - startTime,
        result: { messageId }
      });

      
    } catch (error) {
      this.testResults.push({
        success: false,
        testName,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      
    }
  }

  /**
   * Test integration between feature flags and real-time messaging
   */
  private async testFeatureFlagAndRealtimeIntegration(): Promise<void> {
    const testName = 'Feature Flag + Real-time Integration';
    const startTime = Date.now();
    
    try {
      const testUserContext: UserFeatureContext = {
        userId: 'test-user-integration',
        userRole: 'builder',
        schoolId: 'buffalo.edu',
        spaceIds: ['integration-space']
      };

      // Check if real-time chat is enabled for this user
      const chatEnabled = await featureFlagService.isFeatureEnabled(
        HIVE_FEATURE_FLAGS.REAL_TIME_CHAT,
        testUserContext
      );

      // If chat is enabled, send a message
      let messageResult = null;
      if (chatEnabled.enabled) {
        messageResult = await realtimeService.sendChatMessage(
          'integration-space',
          testUserContext.userId,
          'Integration test: Chat feature is enabled!',
          'text'
        );
      }

      // Test notification system
      await realtimeService.sendNotification(
        testUserContext.userId,
        {
          title: 'Integration Test',
          message: `Chat feature is ${chatEnabled.enabled ? 'enabled' : 'disabled'} for you`,
          type: 'info',
          metadata: { testRun: true }
        }
      );

      this.testResults.push({
        success: true,
        testName,
        duration: Date.now() - startTime,
        result: {
          chatEnabled: chatEnabled.enabled,
          messageId: messageResult,
          reason: chatEnabled.reason
        }
      });

      
    } catch (error) {
      this.testResults.push({
        success: false,
        testName,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      
    }
  }

  /**
   * Test admin feature flag CRUD operations
   */
  private async testAdminFeatureFlagCRUD(): Promise<void> {
    const testName = 'Admin Feature Flag CRUD';
    const startTime = Date.now();
    
    try {
      const testFlagId = 'test_integration_flag';
      const adminUserId = 'test-admin';

      // Create a test feature flag
      await featureFlagService.setFeatureFlag({
        id: testFlagId,
        name: 'Integration Test Flag',
        description: 'A feature flag created during integration testing',
        category: 'experimental',
        enabled: true,
        rollout: {
          type: 'percentage',
          percentage: 50
        },
        analytics: {
          trackingEnabled: true,
          events: ['test_event']
        }
      }, adminUserId);

      // Read the created flag
      const createdFlag = await featureFlagService.getFeatureFlag(testFlagId);
      
      if (!createdFlag) {
        throw new Error('Failed to create or retrieve test flag');
      }

      // Update the flag
      await featureFlagService.setFeatureFlag({
        ...createdFlag,
        enabled: false,
        rollout: {
          type: 'all'
        }
      }, adminUserId);

      // Verify the update
      const updatedFlag = await featureFlagService.getFeatureFlag(testFlagId);
      
      if (!updatedFlag || updatedFlag.enabled || updatedFlag.rollout.type !== 'all') {
        throw new Error('Flag update failed');
      }

      // Clean up - delete the test flag
      await featureFlagService.deleteFeatureFlag(testFlagId, adminUserId);

      // Verify deletion
      const deletedFlag = await featureFlagService.getFeatureFlag(testFlagId);
      
      if (deletedFlag) {
        throw new Error('Flag deletion failed');
      }

      this.testResults.push({
        success: true,
        testName,
        duration: Date.now() - startTime,
        result: {
          created: !!createdFlag,
          updated: !!updatedFlag,
          deleted: !deletedFlag
        }
      });

      
    } catch (error) {
      this.testResults.push({
        success: false,
        testName,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      
    }
  }

  /**
   * Test presence system functionality
   */
  async testPresenceSystem(): Promise<IntegrationTestResult> {
    const testName = 'Presence System';
    const startTime = Date.now();
    
    try {
      const testUserId = 'test-presence-user';
      const testSpaceId = 'test-space-presence';

      // Update user presence
      await realtimeService.updatePresence(testUserId, {
        status: 'online',
        currentSpace: testSpaceId,
        activity: 'testing presence system',
        metadata: {
          platform: 'web',
          version: '1.0.0'
        }
      });

      // Test typing indicators
      await realtimeService.setTypingIndicator(testSpaceId, testUserId, true);
      
      // Wait a bit then stop typing
      await new Promise(resolve => setTimeout(resolve, 1000));
      await realtimeService.setTypingIndicator(testSpaceId, testUserId, false);

      const result = {
        success: true,
        testName,
        duration: Date.now() - startTime,
        result: {
          presenceUpdated: true,
          typingIndicatorSet: true
        }
      };

      
      return result;
    } catch (error) {
      const result = {
        success: false,
        testName,
        duration: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      
      return result;
    }
  }

  /**
   * Get test results summary
   */
  getTestSummary(): {
    total: number;
    passed: number;
    failed: number;
    passRate: number;
    results: IntegrationTestResult[];
  } {
    const total = this.testResults.length;
    const passed = this.testResults.filter(r => r.success).length;
    const failed = total - passed;
    const passRate = total > 0 ? (passed / total) * 100 : 0;

    return {
      total,
      passed,
      failed,
      passRate,
      results: this.testResults
    };
  }
}

// Export singleton instance
export const integrationTester = new IntegrationTester();

// Utility function to run a quick smoke test
export async function runSmokeTest(): Promise<boolean> {
  try {
    
    
    // Test basic feature flag evaluation
    const testResult = await featureFlagService.isFeatureEnabled(
      HIVE_FEATURE_FLAGS.REAL_TIME_CHAT,
      {
        userId: 'smoke-test-user',
        userRole: 'member'
      }
    );

    // Test basic message sending
    await realtimeService.sendMessage({
      type: 'system',
      channel: 'smoke:test',
      senderId: 'smoke-test',
      content: { test: true },
      metadata: {
        timestamp: new Date().toISOString(),
        priority: 'low',
        requiresAck: false,
        retryCount: 0
      }
    });

    
    return true;
  } catch (error) {
    
    return false;
  }
}

// Export the test interface for use in other parts of the application
export { IntegrationTestResult, IntegrationTester };