// Bounded Context Owner: HiveLab Guild
import {
  ToolAggregate,
  type ToolSnapshot,
  type ToolElement,
  type ToolBlueprint
} from "@core";

const campusId = "ub-buffalo";

// Use a known catalog element so seeds validate against the HiveLab catalog
const defaultElement = (name: string): ToolElement => ({
  id: "quick_form",
  name,
  type: "collector",
  config: { label: name }
});

const createToolSnapshot = (input: {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  elements?: readonly ToolElement[];
  status?: "draft" | "limited_run" | "certified";
  visibility?: "private" | "space" | "campus" | "public";
  deployedTo?: readonly string[];
}): ToolSnapshot => {
  const creation = ToolAggregate.create({
    id: input.id,
    campusId,
    name: input.name,
    description: input.description,
    createdBy: input.createdBy,
    elements: input.elements ?? [defaultElement(input.name)]
  });

  if (!creation.ok) {
    throw new Error(`Failed to seed tool: ${creation.error}`);
  }

  const aggregate = creation.value!;

  if (input.status === "limited_run" || input.status === "certified") {
    const now = new Date();
    const publish = aggregate.publishWithStage("limited_run", now);
    if (!publish.ok) {
      throw new Error(`Failed to publish seed tool: ${publish.error}`);
    }
    if (input.status === "certified") {
      const certify = aggregate.publishWithStage("certified", now);
      if (!certify.ok) {
        throw new Error(`Failed to certify seed tool: ${certify.error}`);
      }
    }
    const visibility = input.visibility ?? "campus";
    const visibilityResult = aggregate.updateVisibility(visibility);
    if (!visibilityResult.ok) {
      throw new Error(`Failed to update seed tool visibility: ${visibilityResult.error}`);
    }
    if (input.deployedTo && input.deployedTo.length > 0) {
      const deploy = aggregate.deployToSpaces(input.deployedTo);
      if (!deploy.ok) {
        throw new Error(`Failed to deploy seed tool: ${deploy.error}`);
      }
    }
  }

  aggregate.pullDomainEvents();
  return aggregate.toSnapshot();
};

export const seedToolSnapshots: readonly ToolSnapshot[] = [
  createToolSnapshot({
    id: "tool-event-rsvp",
    name: "Event RSVP",
    description: "Collect RSVPs with reminders and automated follow-ups.",
    createdBy: "profile-jwrhineh",
    status: "certified",
    visibility: "campus",
    deployedTo: ["space-robotics", "space-panic-relief"]
  }),
  createToolSnapshot({
    id: "tool-feedback",
    name: "Feedback Pulse",
    description: "Quick pulse checks after events or workshops.",
    createdBy: "profile-jwrhineh"
  })
];

export const toolBlueprints: readonly ToolBlueprint[] = [
  {
    id: "tpl-rsvp",
    name: "Campus RSVP",
    description: "Collect RSVPs, send reminders, and export attendee lists.",
    category: "Events"
  },
  {
    id: "tpl-feedback",
    name: "Feedback Collector",
    description: "Gather quick sentiment from members after meetings.",
    category: "Insights"
  }
];
