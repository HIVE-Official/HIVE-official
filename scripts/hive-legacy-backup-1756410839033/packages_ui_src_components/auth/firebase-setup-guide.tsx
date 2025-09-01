"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Card, CardContent, CardHeader } from '../card';
import { ExternalLink, Copy, CheckCircle, AlertTriangle, Settings } from 'lucide-react';

export const FirebaseSetupGuide: React.FC = () => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, step: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const firebaseConfig = `# Add these to your .env.local file (create if it doesn't exist)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-card border-border">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-surface-02 rounded-full flex items-center justify-center">
              <Settings className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold">Email System Setup Required</h2>
            <p className="text-muted-foreground">
              The magic link email system needs Firebase configuration to work in production.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Quick Start for Development */}
            <div className="bg-surface-01 border border-border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Currently in Development Mode
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    The app is running without Firebase. Real email sending is disabled.
                  </p>
                </div>
              </div>
            </div>

            {/* Setup Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Setup Steps:</h3>
              
              {/* Step 1 */}
              <div className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-semibold">
                    1
                  </div>
                  <h4 className="font-medium">Create Firebase Project</h4>
                </div>
                <p className="text-sm text-muted-foreground pl-8">
                  Go to the Firebase Console and create a new project
                </p>
                <div className="pl-8">
                  <ButtonEnhanced
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open('https://console.firebase.google.com', '_blank')}
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Open Firebase Console
                  </ButtonEnhanced>
                </div>
              </div>

              {/* Step 2 */}
              <div className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-semibold">
                    2
                  </div>
                  <h4 className="font-medium">Enable Authentication</h4>
                </div>
                <div className="text-sm text-muted-foreground pl-8 space-y-2">
                  <p>• Go to Authentication → Sign-in method</p>
                  <p>• Enable &quot;Email/Password&quot;</p>
                  <p>• Enable &quot;Email link (passwordless sign-in)&quot;</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-semibold">
                    3
                  </div>
                  <h4 className="font-medium">Get Configuration</h4>
                </div>
                <div className="text-sm text-muted-foreground pl-8 space-y-2">
                  <p>• Go to Project Settings → General</p>
                  <p>• Find your web app config</p>
                  <p>• Copy the configuration values</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-semibold">
                    4
                  </div>
                  <h4 className="font-medium">Update Environment Variables</h4>
                </div>
                <div className="pl-8 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Create or update your <code className="bg-surface-01 px-1 rounded">.env.local</code> file:
                  </p>
                  <div className="relative">
                    <pre className="bg-surface-01 p-3 rounded-md text-xs overflow-x-auto">
                      <code>{firebaseConfig}</code>
                    </pre>
                    <ButtonEnhanced
                      variant="secondary"
                      size="sm"
                      onClick={() => copyToClipboard(firebaseConfig, 4)}
                      className="absolute top-2 right-2 h-8 px-2"
                    >
                      {copiedStep === 4 ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </ButtonEnhanced>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="border border-border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-semibold">
                    5
                  </div>
                  <h4 className="font-medium">Restart Development Server</h4>
                </div>
                <div className="text-sm text-muted-foreground pl-8 space-y-2">
                  <p>After updating the environment variables:</p>
                  <div className="bg-surface-01 p-2 rounded text-xs font-mono">
                    npm run dev
                  </div>
                </div>
              </div>
            </div>

            {/* For now, continue button */}
            <div className="border-t border-border pt-6">
              <div className="bg-surface-02 border border-accent/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Development Testing
                    </h4>
                    <p className="text-sm text-muted mt-1">
                      For now, you can continue testing the UI flows. Real email sending will work once Firebase is configured.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}; 