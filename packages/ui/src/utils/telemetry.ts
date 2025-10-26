// Bounded Context Owner: Platform Telemetry Guild
// Temporary no-op telemetry helpers for Storybook/demo environments.

type Props = Record<string, unknown> | undefined;

function log(event: string, props?: Props) {
  // eslint-disable-next-line no-console
  console.info(`[telemetry] ${event}`, props || {});
}

export const telemetry = {
  composerOpened(source: "plus" | "slash") {
    log("composer_opened", { source });
  },
  composerActionSelected(actionId: string) {
    log("composer_action_selected", { actionId });
  },
  proposalSubmitted(kind: string) {
    log("proposal_submitted", { kind });
  },
  postSubmitted(kind: string, length: number) {
    log("post_submitted", { kind, length });
  },
  eventCreated(context?: Props) {
    log("event_created", context);
  },
  rsvpClicked(eventId: string, status: string) {
    log("rsvp_clicked", { eventId, status });
  },
};
