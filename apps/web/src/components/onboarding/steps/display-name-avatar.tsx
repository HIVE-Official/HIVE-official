'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Input, Label, Avatar, AvatarImage, AvatarFallback } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';

export function DisplayNameAvatar() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [fullName, setFullName] = useState(onboardingData?.fullName ?? '');
  const [handle, setHandle] = useState(onboardingData?.handle ?? '');
  const [avatarUrl, setAvatarUrl] = useState(onboardingData?.avatarUrl ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback>
              {fullName.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <Button type="button" variant="outline">
            Upload Photo
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="handle">Username</Label>
            <Input
              id="handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value.toLowerCase())}
              placeholder="Choose a username"
              required
            />
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