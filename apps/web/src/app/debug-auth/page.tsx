"use client";

import { useState, useEffect } from 'react';

export default function DebugAuthPage() {
  const [debug, setDebug] = useState<any>({});

  useEffect(() => {
    const checkAuth = () => {
      const sessionJson = localStorage.getItem('hive_session');
      const devAuth = localStorage.getItem('dev_auth_mode');
      
      setDebug({
        hasSessionJson: !!sessionJson,
        sessionData: sessionJson ? JSON.parse(sessionJson) : null,
        devAuthMode: devAuth,
        allLocalStorage: Object.entries(localStorage),
        timestamp: new Date().toISOString()
      });
    };

    checkAuth();
    
    // Check every second
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const clearAuth = () => {
    localStorage.clear();
    location.reload();
  };

  const setTestAuth = () => {
    const testSession = {
      userId: 'debug-user',
      email: 'debug@test.edu',
      schoolId: 'test-university',
      verifiedAt: new Date().toISOString(),
      onboardingCompleted: true,
      profileData: {
        fullName: 'Debug User',
        handle: 'debug-user',
        major: 'Computer Science',
        avatarUrl: '',
        builderOptIn: true
      }
    };
    
    localStorage.setItem('hive_session', JSON.stringify(testSession));
    localStorage.setItem('dev_auth_mode', 'true');
    location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🔍 Auth Debug Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="space-y-4">
              <button 
                onClick={setTestAuth}
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                Set Test Session
              </button>
              <button 
                onClick={clearAuth}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
              >
                Clear All Auth Data
              </button>
              <a 
                href="/dev-login"
                className="block w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-center"
              >
                Go to Dev Login
              </a>
              <a 
                href="/"
                className="block w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white text-center"
              >
                Go to Dashboard
              </a>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
            <div className="bg-gray-800 p-4 rounded text-sm overflow-auto max-h-96">
              <pre>{JSON.stringify(debug, null, 2)}</pre>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Fixes</h2>
          <div className="bg-yellow-900 border border-yellow-600 p-4 rounded">
            <p className="text-yellow-200 mb-2">If you're stuck on loading:</p>
            <ol className="list-decimal list-inside space-y-1 text-yellow-100">
              <li>Click "Set Test Session" above</li>
              <li>Open browser dev tools (F12) and check Console tab</li>
              <li>Look for messages starting with 🔍</li>
              <li>Check Application → Storage → Local Storage in dev tools</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}