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
    <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-white">Upload your avatar</CardTitle>
        <CardDescription className="text-zinc-400">
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
            className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 rounded-md transition-colors"
          >
            Choose file
          </label>
          {selectedFile && (
            <div className="text-zinc-400">
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
            onClick={handleSubmit}
            className="flex-1 bg-yellow-500 text-black hover:bg-yellow-600"
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