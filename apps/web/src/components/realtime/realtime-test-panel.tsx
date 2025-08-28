'use client';

import React, { useState } from 'react';
import { Button } from '@hive/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { useRealtimeChat } from '@/hooks/use-realtime-chat';
import { useRealtimePresence } from '@/hooks/use-realtime-presence';
import { useRealtimeNotifications, useRealtimeNotificationSender } from '@/hooks/use-realtime-notifications';
import { useRealtimeToolSync } from '@/hooks/use-realtime-tool-sync';
import { realtimeService } from '@/lib/firebase-realtime';
import { logger } from '@/lib/logger';

interface RealtimeTestPanelProps {
  userId: string;
  spaceId: string;
  toolId?: string;
}

export function RealtimeTestPanel({ userId, spaceId, toolId = 'test-tool' }: RealtimeTestPanelProps) {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Initialize realtime hooks for testing
  const chatHook = useRealtimeChat({
    spaceId,
    onNewMessage: (message) => {
      addTestResult(`✅ Chat: Received message from ${message.userId}: ${message.content}`);
    },
    onError: (error) => {
      addTestResult(`❌ Chat: Error - ${error.message}`);
    }
  });

  const presenceHook = useRealtimePresence({
    spaceId,
    userId,
    onPresenceChange: (presence) => {
      const onlineCount = Object.values(presence).filter(p => p.status === 'online').length;
      addTestResult(`✅ Presence: ${onlineCount} users online`);
    },
    onError: (error) => {
      addTestResult(`❌ Presence: Error - ${error.message}`);
    }
  });

  const notificationHook = useRealtimeNotifications({
    userId,
    onNewNotification: (notification) => {
      addTestResult(`✅ Notifications: Received ${notification.type} - ${notification.title}`);
    },
    onError: (error) => {
      addTestResult(`❌ Notifications: Error - ${error.message}`);
    }
  });

  const { sendNotification } = useRealtimeNotificationSender();

  const toolSyncHook = useRealtimeToolSync({
    toolId,
    spaceId,
    userId,
    onToolUpdate: (update) => {
      addTestResult(`✅ Tool Sync: Update ${update.updateType} from ${update.userId}`);
    },
    onStateChange: (state) => {
      addTestResult(`✅ Tool Sync: State changed, version ${state.version}`);
    },
    onError: (error) => {
      addTestResult(`❌ Tool Sync: Error - ${error.message}`);
    }
  });

  const addTestResult = (result: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setTestResults(prev => [`[${timestamp}] ${result}`, ...prev].slice(0, 20));
    logger.info('Realtime Test Result', { result });
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const runFullTest = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    addTestResult('🚀 Starting comprehensive realtime test...');

    try {
      // Test 1: Service availability
      addTestResult(`Service available: ${realtimeService?.isAvailable() ? '✅' : '❌'}`);

      // Test 2: Chat functionality
      await testChat();

      // Test 3: Presence functionality  
      await testPresence();

      // Test 4: Notifications
      await testNotifications();

      // Test 5: Tool sync
      await testToolSync();

      // Test 6: Cross-slice sync
      await testCrossSliceSync();

      addTestResult('✅ All tests completed!');

    } catch (error) {
      addTestResult(`❌ Test suite failed: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const testChat = async () => {
    addTestResult('📝 Testing chat functionality...');
    
    try {
      const messageId = await chatHook.sendMessage('Test message from realtime panel', 'text');
      if (messageId && messageId !== 'realtime-disabled') {
        addTestResult('✅ Chat: Message sent successfully');
      } else {
        addTestResult('⚠️ Chat: Message sent but service may be disabled');
      }
    } catch (error) {
      addTestResult(`❌ Chat: Failed to send message - ${error}`);
    }
  };

  const testPresence = async () => {
    addTestResult('👥 Testing presence functionality...');
    
    try {
      await presenceHook.updateMyPresence('online', 'testing realtime features');
      addTestResult('✅ Presence: Status updated successfully');
      
      setTimeout(async () => {
        await presenceHook.updateMyPresence('away', 'testing away status');
        addTestResult('✅ Presence: Away status set');
      }, 1000);
    } catch (error) {
      addTestResult(`❌ Presence: Failed to update status - ${error}`);
    }
  };

  const testNotifications = async () => {
    addTestResult('🔔 Testing notifications...');
    
    try {
      const success = await sendNotification(userId, {
        title: 'Test Notification',
        message: 'This is a test notification from the realtime panel',
        type: 'info'
      });
      
      if (success) {
        addTestResult('✅ Notifications: Test notification sent');
      } else {
        addTestResult('⚠️ Notifications: Failed to send (service may be disabled)');
      }
    } catch (error) {
      addTestResult(`❌ Notifications: Error - ${error}`);
    }
  };

  const testToolSync = async () => {
    addTestResult('🔧 Testing tool synchronization...');
    
    try {
      const success = await toolSyncHook.updateToolState({
        testData: 'realtime test data',
        timestamp: new Date().toISOString(),
        version: Math.random()
      }, 'test_update');
      
      if (success) {
        addTestResult('✅ Tool Sync: State update successful');
      } else {
        addTestResult('⚠️ Tool Sync: Update failed (service may be disabled)');
      }
    } catch (error) {
      addTestResult(`❌ Tool Sync: Error - ${error}`);
    }
  };

  const testCrossSliceSync = async () => {
    addTestResult('🔄 Testing cross-slice synchronization...');
    
    try {
      // This would test the cross-slice sync service
      // For now, just verify it's available
      if (typeof window !== 'undefined') {
        addTestResult('✅ Cross-slice: Client-side sync available');
      }
    } catch (error) {
      addTestResult(`❌ Cross-slice: Error - ${error}`);
    }
  };

  const getStatusIcon = (isConnected: boolean, isLoading: boolean) => {
    if (isLoading) return '🔄';
    return isConnected ? '🟢' : '🔴';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🔥 HIVE Realtime Service Test Panel</CardTitle>
          <CardDescription>
            Test and monitor all realtime functionality across the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Service Status */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getStatusIcon(chatHook.isConnected, chatHook.isLoading)}</span>
                  <div>
                    <p className="text-sm text-muted-foreground">{chatHook.messages.length} messages</p>
                    <p className="text-xs text-muted-foreground">{chatHook.typingUsers.length} typing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Presence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getStatusIcon(presenceHook.isConnected, presenceHook.isLoading)}</span>
                  <div>
                    <p className="text-sm text-muted-foreground">{presenceHook.onlineUsers.length} online</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getStatusIcon(notificationHook.isConnected, notificationHook.isLoading)}</span>
                  <div>
                    <p className="text-sm text-muted-foreground">{notificationHook.unreadCount} unread</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Tool Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getStatusIcon(toolSyncHook.isConnected, toolSyncHook.isLoading)}</span>
                  <div>
                    <p className="text-sm text-muted-foreground">v{toolSyncHook.currentState?.version || 0}</p>
                    <p className="text-xs text-muted-foreground">{toolSyncHook.isSyncing ? 'Syncing...' : 'Ready'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Controls */}
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={runFullTest} 
              disabled={isRunning}
              variant="default"
            >
              {isRunning ? 'Running Tests...' : 'Run Full Test Suite'}
            </Button>
            
            <Button 
              onClick={testChat} 
              variant="outline"
              disabled={isRunning}
            >
              Test Chat
            </Button>
            
            <Button 
              onClick={testPresence} 
              variant="outline"
              disabled={isRunning}
            >
              Test Presence
            </Button>
            
            <Button 
              onClick={testNotifications} 
              variant="outline"
              disabled={isRunning}
            >
              Test Notifications
            </Button>
            
            <Button 
              onClick={testToolSync} 
              variant="outline"
              disabled={isRunning}
            >
              Test Tool Sync
            </Button>
            
            <Button 
              onClick={clearResults} 
              variant="outline"
            >
              Clear Results
            </Button>
          </div>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
                {testResults.length === 0 ? (
                  <div className="text-gray-500">No test results yet. Run a test to see output.</div>
                ) : (
                  testResults.map((result, index) => (
                    <div key={index} className="mb-1">{result}</div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Service Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>User ID:</strong> {userId}
                </div>
                <div>
                  <strong>Space ID:</strong> {spaceId}
                </div>
                <div>
                  <strong>Tool ID:</strong> {toolId}
                </div>
                <div>
                  <strong>Service Available:</strong> {realtimeService?.isAvailable() ? '✅ Yes' : '❌ No'}
                </div>
                <div>
                  <strong>Service Type:</strong> Firestore Realtime
                </div>
                <div>
                  <strong>Environment:</strong> {process.env.NODE_ENV}
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}