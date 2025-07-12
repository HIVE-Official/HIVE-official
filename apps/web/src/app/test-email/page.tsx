"use client";

import { useState } from 'react';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testEmail = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          schoolId: 'buffalo', // Test with Buffalo (open school)
        }),
      });
      
      const data = await response.json();
      setResult({
        status: response.status,
        data: data,
      });
    } catch (error) {
      setResult({
        status: 'error',
        data: { error: error.message },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white">Test Email Sending</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2">Test Email (use .edu domain):</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@buffalo.edu"
              className="w-full p-3 bg-surface border border-border rounded-lg text-white"
            />
          </div>
          
          <button
            onClick={testEmail}
            disabled={loading || !email}
            className="px-6 py-3 bg-accent text-background rounded-lg disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Test Email Send'}
          </button>
        </div>
        
        {result && (
          <div className="mt-6 p-4 bg-surface rounded-lg">
            <h2 className="text-lg font-semibold text-white mb-2">Result:</h2>
            <div className="text-sm">
              <div className="text-accent mb-2">Status: {result.status}</div>
              <pre className="text-muted overflow-auto whitespace-pre-wrap">
                {JSON.stringify(result.data, null, 2)}
              </pre>
              {result.data?.success && (
                <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded">
                  <div className="text-accent font-medium">✅ API Success Response</div>
                  <div className="text-xs text-muted mt-1">
                    If you're not receiving emails, check:
                    <ul className="list-disc pl-4 mt-1">
                      <li>Spam/junk folder</li>
                      <li>Firebase Console → Authentication → Sign-in method → Email link enabled</li>
                      <li>Firebase Console → Authentication → Settings → Authorized domains includes your domain</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="text-sm text-muted space-y-2">
          <p><strong>Instructions:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use a real .edu email address</li>
            <li>Check the result for any Firebase configuration errors</li>
            <li>If you see "configuration-not-found", Firebase Auth email links need to be enabled</li>
            <li>If you see "unauthorized-domain", add localhost to Firebase authorized domains</li>
            <li><strong>Current issue:</strong> Firebase Admin SDK not configured (missing FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}