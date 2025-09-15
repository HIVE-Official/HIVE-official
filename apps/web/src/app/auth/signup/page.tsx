"use client";

import React, { useState } from 'react';
import { logger } from '@hive/core/utils/logger';

import { useRouter } from 'next/navigation';
import { Card, Button, Input, Label } from '@hive/ui';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import { ArrowRight, Mail, Lock, User, AtSign } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    handle: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate email domain
      if (!formData.email.endsWith('@buffalo.edu')) {
        throw new Error('Please use your @buffalo.edu email address');
      }

      // Validate handle format
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.handle)) {
        throw new Error('Handle must be 3-20 characters (letters, numbers, underscores only)');
      }

      // Step 1: Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Step 2: Get ID token for API calls
      const token = await userCredential.user.getIdToken();

      // Step 3: Create profile in Firestore
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          handle: formData.handle,
          displayName: formData.displayName,
          email: formData.email
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create profile');
      }

      // Success! Redirect to profile
      router.push('/profile');
      
    } catch (err: any) {
      logger.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
      
      // If profile creation failed but auth user was created, we should clean up
      // In production, handle this more gracefully
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Join HIVE</h1>
          <p className="text-muted-foreground">
            Create your campus command center
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <Label htmlFor="email">UB Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your.name@buffalo.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Must be a @buffalo.edu email
            </p>
          </div>

          {/* Display Name */}
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="displayName"
                type="text"
                placeholder="Sarah Chen"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Handle */}
          <div>
            <Label htmlFor="handle">Choose Your Handle</Label>
            <div className="relative mt-1">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="handle"
                type="text"
                placeholder="sarahchen"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value.toLowerCase() })}
                className="pl-10"
                pattern="[a-zA-Z0-9_]{3,20}"
                required
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              3-20 characters, letters, numbers, underscores only
            </p>
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10"
                minLength={6}
                required
                disabled={isLoading}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              At least 6 characters
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              'Creating Account...'
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth" className="text-accent hover:underline">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}