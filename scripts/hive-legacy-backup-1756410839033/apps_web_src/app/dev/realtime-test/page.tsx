'use client';

import React from 'react';
import { RealtimeTestPanel } from '@/components/realtime/realtime-test-panel';
import { RealtimeIntegrationTest } from '@/components/realtime/realtime-integration-test';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@hive/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hive/ui';

export default function RealtimeTestPage() {
  // Mock data for testing
  const testUserId = 'test-user-' + Date.now();
  const testSpaceId = 'ub-cs-department';
  const testToolId = 'collaboration-tool-1';

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🔥 HIVE Realtime System Test</CardTitle>
            <CardDescription>
              End-to-end testing of Firestore-based realtime functionality across the entire platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <strong>Test User ID:</strong>
                  <code className="block mt-1 p-2 bg-muted rounded text-xs">
                    {testUserId}
                  </code>
                </div>
                <div>
                  <strong>Test Space ID:</strong>
                  <code className="block mt-1 p-2 bg-muted rounded text-xs">
                    {testSpaceId}
                  </code>
                </div>
                <div>
                  <strong>Test Tool ID:</strong>
                  <code className="block mt-1 p-2 bg-muted rounded text-xs">
                    {testToolId}
                  </code>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">What this tests:</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>✅ Firestore-based realtime messaging system</li>
                  <li>✅ Cross-slice synchronization (Profile ↔ Spaces ↔ Feed ↔ Tools)</li>
                  <li>✅ Real-time chat with typing indicators</li>
                  <li>✅ User presence tracking (online/offline/away)</li>
                  <li>✅ Real-time notifications delivery</li>
                  <li>✅ Collaborative tool synchronization</li>
                  <li>✅ Error handling and graceful degradation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="integration" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="integration">Integration Test</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Test Panel</TabsTrigger>
          </TabsList>
          
          <TabsContent value="integration" className="space-y-6">
            <RealtimeIntegrationTest
              userId={testUserId}
              spaceId={testSpaceId}
              toolId={testToolId}
            />
          </TabsContent>
          
          <TabsContent value="detailed" className="space-y-6">
            <RealtimeTestPanel
              userId={testUserId}
              spaceId={testSpaceId}
              toolId={testToolId}
            />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Implementation Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-3">✅ Completed Components</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>🔥 Firebase Realtime Service (Firestore-based)</li>
                  <li>🎣 React Hooks (Chat, Presence, Notifications, Tool Sync)</li>
                  <li>🛡️ Comprehensive Firestore Security Rules</li>
                  <li>🔄 Cross-slice Synchronization Service</li>
                  <li>📊 Real-time Performance Monitoring</li>
                  <li>🧪 End-to-End Test Suite (Integration + Detailed)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">🎯 Platform Integration</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>📱 Profile: Real-time activity and status updates</li>
                  <li>🏢 Spaces: Live chat, presence, and coordination</li>
                  <li>📰 Feed: Real-time content and activity streams</li>
                  <li>🔧 Tools: Collaborative synchronization system</li>
                  <li>🎭 Rituals: Live participation and engagement tracking</li>
                  <li>🔗 Cross-slice: Seamless data flow between components</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🎉 Realtime System Integration Complete!</h4>
              <p className="text-green-800 text-sm">
                The HIVE platform now has a comprehensive Firestore-based realtime system that supports:
                real-time messaging, user presence tracking, live notifications, collaborative tool synchronization,
                and cross-slice data flow. All components include proper error handling, security rules, and 
                graceful degradation when services are unavailable.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}