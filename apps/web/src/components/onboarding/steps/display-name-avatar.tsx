'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Label } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { XIcon, ImageIcon } from 'lucide-react';

function generateHandle(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '') // Remove special characters and emojis
    .replace(/\s+/g, '.') // Replace spaces with dots
    .slice(0, 30); // Limit length
}

function validateName(name: string): boolean {
  // Check for emojis using regex
  const emojiRegex = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/u;
  if (emojiRegex.test(name)) return false;

  // Check for full name (at least two words)
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return false;

  // Check for special characters
  const specialCharsRegex = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+/;
  if (specialCharsRegex.test(name)) return false;

  return true;
}

export function DisplayNameAvatar() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [fullName, setFullName] = useState(onboardingData?.fullName ?? '');
  const [handle, setHandle] = useState(onboardingData?.handle ?? '');
  const [avatarUrl, setAvatarUrl] = useState(onboardingData?.avatarUrl ?? '');
  const [error, setError] = useState('');

  // Update handle when name changes
  useEffect(() => {
    if (fullName) {
      setHandle(generateHandle(fullName));
    }
  }, [fullName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateName(fullName)) {
      setError('Please enter your full name (first and last) without emojis or special characters');
      return;
    }

    await update({
      fullName,
      handle,
      avatarUrl
    });

    router.push('/onboarding/2');
  };

  return (
    <Card className="w-full max-w-lg p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome to HIVE</h2>
        <p className="text-muted-foreground">
          Let's start by setting up your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload Card */}
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
          {avatarUrl ? (
            <>
              <img
                src={avatarUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setAvatarUrl('')}
                className="absolute top-2 right-2 rounded-full bg-black/50 p-1 hover:bg-black/70"
              >
                <XIcon className="h-4 w-4 text-white" />
              </button>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2">
              <ImageIcon className="h-8 w-8 text-gray-400" />
              <Button type="button" variant="outline" size="sm">
                Upload Photo
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your first and last name"
              required
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="handle">Username</Label>
            <div className="relative">
              <Input
                id="handle"
                value={handle}
                readOnly
                className="bg-muted pr-10"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <span className="text-sm text-muted-foreground">🔒</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your username is automatically generated from your full name
            </p>
          </div>
        </div>

        <Button 
          type="submit"
          disabled={!fullName || !handle}
          className="w-full"
        >
          Continue
        </Button>
      </form>
    </Card>
  );
} 