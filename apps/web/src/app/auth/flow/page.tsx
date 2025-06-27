'use client';

import { AuthFlow, ToastProvider, type School, type AuthFlowCallbacks } from '@hive/ui';

export const dynamic = 'force-dynamic';
import { useState } from 'react';

const mockSchools: School[] = [
  {
    id: 'ub',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open',
    isUB: true,
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'waitlist',
    waitlistCount: 127,
  },
  {
    id: 'columbia',
    name: 'Columbia University',
    domain: 'columbia.edu',
    status: 'waitlist',
    waitlistCount: 261,
  },
  {
    id: 'nyu',
    name: 'New York University',
    domain: 'nyu.edu',
    status: 'waitlist',
    waitlistCount: 156,
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    domain: 'syr.edu',
    status: 'waitlist',
    waitlistCount: 89,
  },
];

export default function AuthFlowDemo() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [flowData, setFlowData] = useState<{ email: string; school: School } | null>(null);

  const callbacks: AuthFlowCallbacks = {
    onSendMagicLink: async (email: string, school: School) => {
      console.log(`Sending magic link to ${email} for ${school.name}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, simulate success
      console.log(`Magic link sent successfully!`);
    },
    
    onCreateSchool: async (schoolName: string) => {
      console.log(`Creating waitlist for ${schoolName}`);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`Waitlist created for ${schoolName}`);
    },
    
    onFlowComplete: (data) => {
      console.log('Auth flow completed:', data);
      setFlowData(data);
      setIsCompleted(true);
    },
  };

  if (isCompleted && flowData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-display font-semibold mb-4">
            🎉 Flow Complete!
          </h1>
          <div className="bg-surface border border-border rounded-lg p-6 mb-6">
            <h2 className="text-lg font-display font-medium mb-3">
              Registration Details
            </h2>
            <div className="space-y-2 text-left">
              <p className="text-sm">
                <span className="text-muted">Email:</span> {flowData.email}
              </p>
              <p className="text-sm">
                <span className="text-muted">School:</span> {flowData.school.name}
              </p>
              <p className="text-sm">
                <span className="text-muted">Status:</span> {flowData.school.status}
              </p>
              {flowData.school.isUB && (
                <p className="text-sm text-accent">
                  ✨ UB Student - July 1 Feed Access!
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setIsCompleted(false);
              setFlowData(null);
            }}
            className="text-accent hover:text-accent/80 font-sans text-sm"
          >
            ← Test Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div>
        <AuthFlow
          schools={mockSchools}
          callbacks={callbacks}
          initialStep="splash"
        />
      </div>
    </ToastProvider>
  );
}
