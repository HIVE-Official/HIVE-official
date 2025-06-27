"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { Button } from '../button';
import { StepProps } from './types';

export const OnboardingCompleteStep: React.FC<StepProps> = ({ onSubmit }) => {
  return (
    <Card className="w-full max-w-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Welcome to HIVE!</CardTitle>
        <CardDescription className="text-muted-foreground">
          You&apos;re all set up and ready to start connecting with your academic community.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center text-card-foreground">
          <p>
            We&apos;ve created your profile and connected you with relevant communities based on your interests.
          </p>
          <p className="mt-2">
            Start exploring, join discussions, and connect with fellow academics!
          </p>
        </div>

        <Button
          variant="ritual"
          onClick={() => void onSubmit(null)}
          className="w-full"
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
}; 