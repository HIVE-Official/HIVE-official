"use client";

import { useState, useEffect } from 'react';
import { CookieUtils } from '@/lib/cookie-utils';

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

export default function DebugAuthPage() {
  const [debug, setDebug] = useState<any>({});
  const [returnTo, setReturnTo] = useState<string>('/');

  useEffect(() => {
    // Get return URL from query params
    const urlParams = new URLSearchParams(window.location.search);
    const returnUrl = urlParams.get('returnTo') || '/';
    setReturnTo(returnUrl);
    
    const checkAuth = () => {
      const sessionJson = localStorage.getItem('hive_session');
      const devAuth = localStorage.getItem('dev_auth_mode');
      const sessionCookie = CookieUtils.getSessionToken();
      
      setDebug({
        hasSessionJson: !!sessionJson,
        sessionData: sessionJson ? JSON.parse(sessionJson) : null,
        devAuthMode: devAuth,
        sessionCookie: sessionCookie,
        hasCookie: !!sessionCookie,
        allLocalStorage: Object.entries(localStorage),
        allCookies: document.cookie.split(';').map(c => c.trim()),
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
    CookieUtils.clearSessionToken();
    location.reload();
  };

  const setTestAuth = () => {
    const userId = 'debug-user';
    const testSession = {
      userId,
      email: 'debug@test.edu',
      schoolId: 'test-university',
      verifiedAt: new Date().toISOString(),
      onboardingCompleted: true,
      developmentMode: true,
      profileData: {
        fullName: 'Debug User',
        handle: 'debug-user',
        major: 'Computer Science',
        avatarUrl: '',
        builderOptIn: true
      }
    };
    
    // Set localStorage data
    localStorage.setItem('hive_session', JSON.stringify(testSession));
    localStorage.setItem('dev_auth_mode', 'true');
    
    // Set session cookie for middleware
    const sessionToken = CookieUtils.generateDevSessionToken(userId);
    CookieUtils.setSessionToken(sessionToken);
    
    // Debug auth session created successfully
    
    // Redirect to the return URL instead of reloading
    setTimeout(() => {
      window.location.href = returnTo;
    }, 500);
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
                href={returnTo}
                className="block w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white text-center"
              >
                Go to {returnTo === '/' ? 'Dashboard' : returnTo}
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