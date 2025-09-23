"use client";

/**
 * Simple test component to verify UnifiedAuth integration
 */

import { useAuth } from "@hive/auth-logic";
import { useSession } from '../hooks/use-session';

export function AuthTest() {
  // Test new UnifiedAuth hook
  const unifiedAuth = useAuth();
  
  // Test local session hook  
  const session = useSession();

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Auth Integration Test</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-green-600">✅ UnifiedAuth Hook</h4>
          <p className="text-sm">
            User: {unifiedAuth.user?.email || 'Not authenticated'} 
            ({unifiedAuth.isLoading ? 'Loading...' : unifiedAuth.isAuthenticated ? 'Authenticated' : 'Not authenticated'})
          </p>
          {/* <p className="text-sm">
            Onboarding: {unifiedAuth.requiresOnboarding() ? 'Required' : 'Complete'}
          </p> */}
        </div>

        <div>
          <h4 className="font-medium text-blue-600">✅ UnifiedAuth Integration</h4>
          <p className="text-sm">
            Integration: {unifiedAuth.isAuthenticated ? 'Connected' : 'Pending'} 
          </p>
        </div>

        <div>
          <h4 className="font-medium text-purple-600">✅ Legacy useSession Hook</h4>
          <p className="text-sm">
            User: {session.user?.email || 'Not authenticated'}
            ({session.isLoading ? 'Loading...' : session.isAuthenticated ? 'Authenticated' : 'Not authenticated'})
          </p>
          <p className="text-sm">
            School: {session.sessionData?.schoolId || 'N/A'}
          </p>
        </div>

        {/* {unifiedAuth.user?.developmentMode && (
          <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              🚧 Development Mode Active
            </p>
          </div>
        )} */}
        
        <div className="flex gap-2">
          {/* <button
            onClick={() => unifiedAuth.devLogin('test_user_456')}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Dev Login
          </button> */}
          <button
            onClick={() => unifiedAuth.logout?.()}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}