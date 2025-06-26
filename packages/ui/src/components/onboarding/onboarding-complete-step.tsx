"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { Button } from '../button';
import { StepProps } from './types';

export const OnboardingCompleteStep: React.FC<StepProps> = ({ onSubmit }) => {
  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Welcome to HIVE!</CardTitle>
        <CardDescription className="text-zinc-400">
          You&apos;re all set up and ready to start connecting with your academic community.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center text-zinc-300">
          <p>
            We&apos;ve created your profile and connected you with relevant communities based on your interests.
          </p>
          <p className="mt-2">
            Start exploring, join discussions, and connect with fellow academics!
          </p>
        </div>

        <Button
          onClick={() => void onSubmit(null)}
          className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}; 