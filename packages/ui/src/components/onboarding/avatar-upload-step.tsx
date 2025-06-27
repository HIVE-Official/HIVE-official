"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { Button } from '../button';
import { Loader2 } from 'lucide-react';
import { StepProps } from './types';

export const AvatarUploadStep: React.FC<StepProps> = ({ onSubmit, onSkip }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    try {
      await onSubmit({ file: selectedFile });
    } catch {
      // console.error("Failed to upload avatar:", error);
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

  return (
    <Card className="w-full max-w-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Upload your avatar</CardTitle>
        <CardDescription className="text-muted-foreground">
          Choose a profile picture to help others recognize you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="avatar-upload"
          />
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer bg-surface-01 hover:bg-surface-02 text-foreground px-4 py-2 rounded-md transition-colors"
          >
            Choose file
          </label>
          {selectedFile && (
            <div className="text-muted-foreground">
              Selected: {selectedFile.name}
            </div>
          )}
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
              variant="default"
              onClick={handleSubmit}
            className="flex-1"
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Upload
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 