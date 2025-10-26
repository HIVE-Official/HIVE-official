// Bounded Context Owner: HiveLab Guild
export type ElementCategory = "trigger" | "input" | "logic" | "output" | "integration" | "utility";

export interface ElementDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: ElementCategory;
  readonly tags?: readonly string[];
  readonly tone?: "primary" | "neutral" | "warning";
  readonly version?: string;
}

export const ELEMENTS: readonly ElementDefinition[] = [
  { id: "trigger.schedule", name: "Schedule", description: "Run on a cadence", category: "trigger", tone: "neutral" },
  { id: "input.form", name: "Form", description: "Collect responses", category: "input", tone: "primary" },
  { id: "logic.branch", name: "Branch", description: "Route by rules", category: "logic", tone: "neutral" },
  { id: "output.post", name: "Post", description: "Publish to feed", category: "output", tone: "warning" },
  { id: "output.digest", name: "Digest", description: "Send weekly summary", category: "output", tone: "warning" },
  { id: "utility.delay", name: "Delay", description: "Wait between steps", category: "utility", tone: "neutral" },
];

