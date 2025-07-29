"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * DEVELOPMENT-ONLY Login Page
 * Provides easy testing access in development environment
 */
export default function DevLoginPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const devUsers = [
    { email: 'student@test.edu', role: 'Student', handle: 'test-student' },
    { email: 'faculty@test.edu', role: 'Faculty', handle: 'test-faculty' },
    { email: 'admin@test.edu', role: 'Admin', handle: 'test-admin' }
  ];

  const handleLogin = async (email: string) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          schoolId: 'test-university'
        }),
      });

      const data = await response.json();

      if (data.success && data.dev) {
        setMessage('✅ Development authentication successful!');
        
        // Create localStorage session for frontend compatibility
        const devUser = devUsers.find(u => u.email === email);
        if (devUser) {
          const sessionData = {
            userId: `dev-${devUser.handle}`,
            email: devUser.email,
            schoolId: 'test-university',
            verifiedAt: new Date().toISOString(),
            onboardingCompleted: false,
            profileData: {
              fullName: `Test ${devUser.role}`,
              handle: devUser.handle,
              major: 'Computer Science',
              avatarUrl: '',
              builderOptIn: true
            }
          };
          
          localStorage.setItem('hive_session', JSON.stringify(sessionData));
          localStorage.setItem('dev_auth_mode', 'true');
        }
        
        // Redirect to dashboard or main app
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else {
        setMessage(data.message || 'Authentication failed');
      }
    } catch (error) {
      setMessage('❌ Authentication failed');
      console.error('Dev login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check if we're running in a deployed environment
  const isDeployed = typeof window !== 'undefined' && 
    (window.location.hostname.includes('vercel.app') || 
     window.location.hostname.includes('herokuapp.com') ||
     window.location.hostname.includes('railway.app') ||
     window.location.hostname.includes('netlify.app') ||
     !window.location.hostname.includes('localhost'));

  // Only show in local development
  if (isDeployed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-gray-600">Development login not available in production</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            🔧 Development Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Quick access for testing (Development Only)
          </p>
        </div>
        
        {message && (
          <div className={`text-center p-3 rounded ${
            message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          {devUsers.map((user) => (
            <button
              key={user.email}
              onClick={() => handleLogin(user.email)}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <div className="text-left">
                <div className="font-medium">{user.role}</div>
                <div className="text-xs opacity-80">{user.email}</div>
                <div className="text-xs opacity-60">@{user.handle}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <div className="text-xs text-gray-500">
            <p>🔒 This uses the same secure authentication system as production</p>
            <p>✅ All security middleware is active and tested</p>
            <p>🚫 Completely blocked in production environment</p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <a 
            href="/api/dev-auth" 
            target="_blank" 
            className="text-indigo-600 hover:text-indigo-500 text-sm"
          >
            View available development users →
          </a>
        </div>
      </div>
    </div>
  );
}