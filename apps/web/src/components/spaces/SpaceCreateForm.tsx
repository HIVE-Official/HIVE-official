// Bounded Context Owner: Community Guild
"use client";

import { useState, useTransition } from "react";
import type React from "react";
import { useRouter } from "next/navigation";
import type { SpaceType } from "@core";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Textarea,
  Text
} from "@hive/ui";

interface SpaceCreateFormProps {
  readonly viewerId: string;
  readonly campusId: string;
}

type Step = 0 | 1 | 2;

interface SpacePreset {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
  readonly spaceType: SpaceType;
  readonly defaults: {
    visibility: "public" | "campus" | "private";
    maxMembers?: number;
    tags?: readonly string[];
    inviteOnly?: boolean;
  };
}

const SPACE_PRESETS: readonly SpacePreset[] = [
  {
    id: "student-organization",
    label: "Student Organization",
    description: "Clubs, project teams, and student-led initiatives across campus.",
    icon: "🎯",
    spaceType: "student_organization",
    defaults: {
      visibility: "public",
      maxMembers: 250,
      tags: ["club", "student-led"],
      inviteOnly: false
    }
  },
  {
    id: "university-organization",
    label: "University Organization",
    description: "Departments, offices, and programs coordinating outreach and services.",
    icon: "🏛️",
    spaceType: "university_organization",
    defaults: {
      visibility: "public",
      maxMembers: 500,
      tags: ["official", "department"],
      inviteOnly: false
    }
  },
  {
    id: "greek-life",
    label: "Greek Life Chapter",
    description: "Coordinate rituals, philanthropy, and chapter operations securely.",
    icon: "⚜️",
    spaceType: "greek_life",
    defaults: {
      visibility: "campus",
      maxMembers: 150,
      tags: ["greek-life", "chapter"],
      inviteOnly: true
    }
  },
  {
    id: "residential",
    label: "Residential Community",
    description: "Keep dorms, apartments, and floors aligned on logistics.",
    icon: "🏠",
    spaceType: "residential",
    defaults: {
      visibility: "campus",
      maxMembers: 200,
      tags: ["residential", "dorm"],
      inviteOnly: false
    }
  }
];

const SPACE_TYPE_LABELS: Record<SpaceType, string> = {
  student_organization: "Student Organization",
  university_organization: "University Organization",
  greek_life: "Greek Life",
  residential: "Residential Community"
};

const formatSpaceType = (spaceType: SpaceType) => SPACE_TYPE_LABELS[spaceType];

const STEP_TITLES: readonly string[] = [
  "Pick a vibe",
  "Describe it",
  "Set privacy"
];

const PRIVACY_OPTIONS: Array<{
  value: "public" | "campus" | "private";
  title: string;
  description: string;
}> = [
  {
    value: "public",
    title: "Public",
    description: "Visible in search to any campus guest. Anyone can peek in."
  },
  {
    value: "campus",
    title: "Campus",
    description: "Only authenticated campus students can join instantly."
  },
  {
    value: "private",
    title: "Invite only",
    description: "Hidden space. Leader approves every member manually."
  }
];

export function SpaceCreateForm({ viewerId, campusId }: SpaceCreateFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<Step>(0);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [type, setType] = useState<SpaceType>("student_organization");
  const [visibility, setVisibility] = useState<"public" | "campus" | "private">("campus");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [maxMembers, setMaxMembers] = useState<string>("");
  const [isInviteOnly, setIsInviteOnly] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const applyPreset = (preset: SpacePreset) => {
    setSelectedPresetId(preset.id);
    setType(preset.spaceType);
    setVisibility(preset.defaults.visibility);
    setIsInviteOnly(preset.defaults.inviteOnly ?? false);
    if (preset.defaults.maxMembers) {
      setMaxMembers(String(preset.defaults.maxMembers));
    }
    if (preset.defaults.tags?.length && tagsInput.trim().length === 0) {
      setTagsInput(preset.defaults.tags.join(", "));
    }
    setError(null);
  };

  const handleNext = () => {
    if (step === 0) {
      if (!selectedPresetId) {
        setError("Pick a preset so we can tune defaults.");
        return;
      }
      setStep(1);
      setError(null);
      return;
    }

    if (step === 1) {
      if (name.trim().length < 3) {
        setError("Name needs at least 3 characters.");
        return;
      }
      if (description.trim().length < 20) {
        setError("Give a description with at least 20 characters.");
        return;
      }
      setStep(2);
      setError(null);
      return;
    }
  };

  const handleBack = () => {
    setError(null);
    setStep((prev) => (prev > 0 ? ((prev - 1) as Step) : prev));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (step < 2) {
      handleNext();
      return;
    }

    setError(null);

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const maxMembersValue = parseInt(maxMembers, 10);

    startTransition(async () => {
      const response = await fetch("/api/spaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          type,
          visibility,
          tags,
          maxMembers: Number.isNaN(maxMembersValue) ? undefined : maxMembersValue,
          isInviteOnly: visibility === "private" ? true : isInviteOnly,
          campusId,
          leaderId: viewerId
        })
      });

      const json: unknown = await response.json().catch(() => null);
      const isSuccess = (v: unknown): v is { success: true; data: { id?: unknown } } => {
        return typeof v === "object" && v !== null && (v as { success?: unknown }).success === true;
      };
      if (!response.ok || !isSuccess(json)) {
        const extractMessage = (v: unknown): string | undefined => {
          if (typeof v !== "object" || v === null) return undefined;
          const err = (v as { error?: { message?: unknown } }).error;
          return typeof err?.message === "string" ? err.message : undefined;
        };
        setError(extractMessage(json) ?? "Unable to create space right now.");
        return;
      }

      const newSpaceId = typeof json.data.id === "string" ? json.data.id : undefined;
      router.push(newSpaceId ? `/spaces/${newSpaceId}` : "/spaces");
    });
  };

  const selectedPreset = selectedPresetId
    ? SPACE_PRESETS.find((preset) => preset.id === selectedPresetId)
    : undefined;

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle>Create a new space</CardTitle>
        <Text variant="muted" className="text-sm">
          Spaces are panic rooms. We’ll help you launch one in under 30 seconds.
        </Text>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {STEP_TITLES.map((title, index) => (
            <span key={title} className={index === step ? "text-foreground" : "opacity-50"}>
              {index + 1}. {title}
              {index < STEP_TITLES.length - 1 ? <span className="px-2 text-muted-foreground">/</span> : null}
            </span>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 0 ? (
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                {SPACE_PRESETS.map((preset) => (
                  <button
                    type="button"
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`rounded-xl border px-4 py-4 text-left transition hover:border-foreground ${
                      selectedPresetId === preset.id ? "border-foreground bg-muted/30" : "border-border/60 bg-muted/10"
                    }`}
                    disabled={isPending}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{preset.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{preset.label}</div>
                        <p className="text-xs text-muted-foreground">{preset.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Text variant="muted" className="text-sm">
                Presets tune privacy, member caps, and tags so you can focus on describing the vibe.
              </Text>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Space name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={selectedPreset ? `${selectedPreset.label} for CS201` : "Robotics Guild"}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-foreground">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Tell students why this space exists and what happens here."
                  rows={5}
                  required
                />
                <Text variant="muted">Aim for 2-3 sentences that cover purpose and cadence.</Text>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="tags" className="text-sm font-medium text-foreground">
                    Tags (comma separated)
                  </label>
                  <Input
                    id="tags"
                    value={tagsInput}
                    onChange={(event) => setTagsInput(event.target.value)}
                    placeholder="engineering, late-night"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="maxMembers" className="text-sm font-medium text-foreground">
                    Member cap (optional)
                  </label>
                  <Input
                    id="maxMembers"
                    type="number"
                    min={1}
                    max={1000}
                    value={maxMembers}
                    onChange={(event) => setMaxMembers(event.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-6">
              <div className="grid gap-3 md:grid-cols-3">
                {PRIVACY_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => {
                      setVisibility(option.value);
                      setIsInviteOnly(option.value === "private");
                    }}
                    className={`rounded-xl border px-4 py-4 text-left transition ${
                      visibility === option.value ? "border-foreground bg-muted/30" : "border-border/60 bg-muted/10"
                    }`}
                    disabled={isPending}
                  >
                    <div className="text-sm font-semibold text-foreground">{option.title}</div>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </button>
                ))}
              </div>

              {visibility !== "private" ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <input
                    id="inviteOnly"
                    type="checkbox"
                    checked={isInviteOnly}
                    onChange={(event) => setIsInviteOnly(event.target.checked)}
                    className="h-4 w-4 rounded border-border/60"
                  />
                  <label htmlFor="inviteOnly" className="text-sm font-normal text-foreground">
                    Require approval before members join
                  </label>
                </div>
              ) : (
                <Badge variant="outline">Invite only</Badge>
              )}

              <div className="space-y-2 rounded-lg border border-border/60 bg-muted/10 p-4 text-sm text-muted-foreground">
                <div className="font-semibold text-foreground">Launch checklist</div>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Type: <span className="capitalize">{formatSpaceType(type)}</span></li>
                  <li>Visibility: {visibility}</li>
                  <li>Invite approval: {visibility === "private" || isInviteOnly ? "required" : "instant join"}</li>
                  <li>Tags: {tagsInput || "none"}</li>
                </ul>
              </div>
            </div>
          ) : null}

          {error ? <Text variant="muted" className="text-destructive">{error}</Text> : null}

          <div className="flex items-center justify-between">
            <Button type="button" variant="ghost" onClick={handleBack} disabled={step === 0 || isPending}>
              Back
            </Button>
            {step < 2 ? (
              <Button type="button" onClick={handleNext} disabled={isPending}>
                Continue
              </Button>
            ) : (
              <Button type="submit" isLoading={isPending} disabled={isPending}>
                Create Space
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
