"use client";

import React, { useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { 
  Crown, 
  Users, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";

export interface SpaceActivationRequestFormProps {
  space: {
    id: string;
    name: string;
    category: string;
    description: string;
    potentialMembers: number;
    rssEvents: Array<{
      title: string;
      date: string;
      source: string;
    }>;
  };
  onSubmit: (data: {
    connection: string;
    connectionDetails?: string;
    reason: string;
    firstTool: string;
  }) => Promise<void>;
  onCancel: () => void;
}

// Connection options based on space category
const CONNECTION_OPTIONS = {
  academic: [
    { value: "major", label: "I'm a student in this major/department" },
    { value: "ta", label: "I'm a TA or have been in this program" },
    { value: "tutor", label: "I tutor in this subject area" },
    { value: "leader", label: "I lead study groups or academic activities" },
    { value: "other", label: "Other (please explain)" },
  ],
  residential: [
    { value: "resident", label: "I live in this residence hall/area" },
    { value: "ra", label: "I'm an RA or floor leader" },
    { value: "former", label: "I previously lived here and stayed connected" },
    { value: "leader", label: "I organize events in this area" },
    { value: "other", label: "Other (please explain)" },
  ],
  social: [
    { value: "member", label: "I'm actively involved in this community" },
    { value: "organizer", label: "I organize events or activities" },
    { value: "founder", label: "I helped start this group/activity" },
    { value: "leader", label: "I have leadership experience in this area" },
    { value: "other", label: "Other (please explain)" },
  ],
  professional: [
    { value: "experience", label: "I have experience in this field" },
    { value: "internship", label: "I've interned or worked in this area" },
    { value: "leader", label: "I lead professional development activities" },
    { value: "network", label: "I have strong networks in this field" },
    { value: "other", label: "Other (please explain)" },
  ],
};

// First tool options
const FIRST_TOOL_OPTIONS = [
  { value: "events", label: "Event Calendar", description: "Schedule regular meetups and activities" },
  { value: "resources", label: "Resource Library", description: "Share study materials and helpful links" },
  { value: "discussions", label: "Discussion Board", description: "Start conversations and Q&A" },
  { value: "announcements", label: "Announcements", description: "Keep everyone updated on important news" },
  { value: "polls", label: "Polls & Surveys", description: "Gather input from the community" },
  { value: "marketplace", label: "Marketplace", description: "Buy/sell textbooks and items" },
];

export const SpaceActivationRequestForm: React.FC<SpaceActivationRequestFormProps> = ({
  space,
  onSubmit,
  onCancel,
}) => {
  const [connection, setConnection] = useState("");
  const [connectionDetails, setConnectionDetails] = useState("");
  const [reason, setReason] = useState("");
  const [firstTool, setFirstTool] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const connectionOptions = CONNECTION_OPTIONS[space.category as keyof typeof CONNECTION_OPTIONS] || CONNECTION_OPTIONS.social;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({
        connection,
        connectionDetails: connection === "other" ? connectionDetails : undefined,
        reason,
        firstTool,
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        onCancel(); // Close form after success
      }, 2000);
    } catch (error) {
      console.error("Failed to submit activation request:", error);
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <Card className="w-full max-w-2xl bg-surface border-border">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Request Submitted!
              </h3>
              <p className="text-muted-foreground">
                Your activation request for <strong>{space.name}</strong> has been submitted. 
                You'll receive an email within 24 hours with the decision.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl bg-surface border-border">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="p-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <CardTitle className="text-xl font-display text-foreground">
              Request to Lead: {space.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Help us understand why you're the right leader for this space
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Space Overview */}
          <div className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Crown className="w-5 h-5 text-accent" />
              <h3 className="font-display font-semibold text-foreground">
                Space Overview
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {space.description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">
                  {space.potentialMembers.toLocaleString()} potential members
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">
                  {space.rssEvents.length} upcoming events
                </span>
              </div>
            </div>
          </div>

          {/* Connection to Space */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-foreground">
              How are you connected to this space?
            </Label>
            <Select value={connection} onValueChange={setConnection}>
              <SelectTrigger>
                <SelectValue placeholder="Select your connection..." />
              </SelectTrigger>
              <SelectContent>
                {connectionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Connection Details (if "Other" selected) */}
          {connection === "other" && (
            <div className="space-y-3">
              <Label className="text-base font-medium text-foreground">
                Please explain your connection
              </Label>
              <Input
                value={connectionDetails}
                onChange={(e) => setConnectionDetails(e.target.value)}
                placeholder="e.g., I'm president of a related club..."
                required
              />
            </div>
          )}

          {/* Leadership Reason */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-foreground">
              Why do you want to lead this space?
            </Label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Share your vision for this space and what you hope to accomplish as its leader..."
              rows={4}
              className="resize-none"
              required
            />
            <p className="text-xs text-muted-foreground">
              Help us understand your motivation and plans for growing this community
            </p>
          </div>

          {/* First Tool Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-foreground">
              What's the first tool you'd add to this space?
            </Label>
            <div className="grid gap-3">
              {FIRST_TOOL_OPTIONS.map((tool) => (
                <div
                  key={tool.value}
                  onClick={() => setFirstTool(tool.value)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    firstTool === tool.value
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50 hover:bg-accent/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      firstTool === tool.value
                        ? "border-accent bg-accent"
                        : "border-border"
                    }`}>
                      {firstTool === tool.value && (
                        <div className="w-full h-full bg-accent rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {tool.label}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Timeline */}
          <div className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-accent" />
              <h4 className="font-medium text-foreground">
                What happens next?
              </h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• We'll review your request within 24 hours</li>
              <li>• You'll receive an email with our decision</li>
              <li>• If approved, you'll get a welcome checklist to get started</li>
              <li>• The space will be activated and potential members notified</li>
            </ul>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-accent hover:bg-accent/90 text-background font-medium"
              disabled={
                isSubmitting ||
                !connection ||
                !reason ||
                !firstTool ||
                (connection === "other" && !connectionDetails)
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Crown className="mr-2 h-4 w-4" />
                  Submit Request
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};