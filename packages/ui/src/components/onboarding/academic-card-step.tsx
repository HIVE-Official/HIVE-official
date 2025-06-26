"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { Button } from '../button';
import { Input } from '../input';
import { Label } from '../label';
import { Loader2 } from 'lucide-react';
import { StepProps } from './types';

export const AcademicCardStep: React.FC<StepProps> = ({ onSubmit, onSkip }) => {
  const [formData, setFormData] = useState({
    institution: '',
    department: '',
    role: '',
    graduationYear: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } catch {
      // console.error("Failed to submit academic info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      void onSubmit(null);
    }
  };

  const isFormValid = formData.institution && formData.department && formData.role;

  return (
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Academic Information</CardTitle>
        <CardDescription className="text-zinc-400">
          Tell us about your academic background to help us connect you with relevant peers and content.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="institution" className="text-zinc-300">
              Institution
            </Label>
            <Input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              placeholder="e.g., Stanford University"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="department" className="text-zinc-300">
              Department
            </Label>
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="e.g., Computer Science"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-zinc-300">
              Role
            </Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g., PhD Student"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="graduationYear" className="text-zinc-300">
              Expected Graduation Year (Optional)
            </Label>
            <Input
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              placeholder="e.g., 2025"
              className="bg-zinc-800 border-zinc-700 text-white"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip for now
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-yellow-500 text-black hover:bg-yellow-600"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 