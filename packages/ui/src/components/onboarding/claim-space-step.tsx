"use client";

import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";

export interface ClaimSpaceStepProps {
  spaceName: string;
  spaceDescription: string;
  onSpaceNameChange: (value: string) => void;
  onSpaceDescriptionChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onBack?: () => void;
}

export const ClaimSpaceStep: React.FC<ClaimSpaceStepProps> = ({
  spaceName,
  spaceDescription,
  onSpaceNameChange,
  onSpaceDescriptionChange,
  onSubmit,
  isLoading,
  onBack,
}) => {
  return (
    <Card className="w-full max-w-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Claim Your Space</CardTitle>
        <CardDescription className="text-muted-foreground">
          Create your own space to build and collaborate with others.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="spaceName">Space Name</Label>
            <Input
              id="spaceName"
              value={spaceName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSpaceNameChange(e.target.value)}
              placeholder="e.g., UB Computer Science"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spaceDescription">Description</Label>
            <Textarea
              id="spaceDescription"
              value={spaceDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onSpaceDescriptionChange(e.target.value)}
              placeholder="What's this space about?"
              required
            />
          </div>
        </div>

        <div className="flex gap-2">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
          )}
          <Button
            type="button"
            variant="default"
            onClick={onSubmit}
            className="flex-1"
            disabled={isLoading || !spaceName || !spaceDescription}
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