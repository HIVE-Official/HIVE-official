'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Label } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { XIcon, PlusIcon } from 'lucide-react';

// Simple Alert component since it's not available in @hive/ui
const Alert = ({ variant, children }: { variant?: string; children: React.ReactNode }) => (
  <div className={`p-3 rounded-md border ${variant === 'destructive' || variant === 'error' ? 'border-red-500 bg-red-50 text-red-900' : 'border-border bg-surface/50 text-muted-foreground'}`}>
    {children}
  </div>
);

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
);

export function SpaceVerification() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [emails, setEmails] = useState<string[]>(onboardingData?.verificationEmails ?? []);
  const [currentEmail, setCurrentEmail] = useState('');
  const [error, setError] = useState('');

  // Mock space data - real API integration pending
  const space = { name: onboardingData?.spaceType || 'your organization' };

  const addEmail = () => {
    if (!currentEmail) return;
    if (emails.length >= 4) {
      setError('You can only add up to 4 verification emails');
      return;
    }
    if (!currentEmail.endsWith('.edu')) {
      setError('Please enter a valid .edu email address');
      return;
    }
    if (emails.includes(currentEmail)) {
      setError('This email has already been added');
      return;
    }

    setEmails([...emails, currentEmail]);
    setCurrentEmail('');
    setError('');
  };

  const removeEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await update({
      verificationEmails: emails
    });

    router.push('/onboarding/4');
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Verify Your Leadership</h2>
        <p className="text-muted-foreground">
          Please invite up to 4 other members of {space?.name} to verify your leadership role.
          They should be current members who can confirm your position.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Add verification emails (.edu required)</Label>
            <div className="flex space-x-2">
              <Input
                type="email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                placeholder="member@university.edu"
                className="flex-1"
              />
              <Button 
                type="button"
                onClick={addEmail}
                disabled={!currentEmail || emails.length >= 4}
              >
                <PlusIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            {emails.map(email => (
              <div key={email} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span className="text-sm">{email}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEmail(email)}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button 
          type="submit"
          disabled={emails.length === 0}
          className="w-full"
        >
          Continue
        </Button>
      </form>
    </Card>
  );
} 