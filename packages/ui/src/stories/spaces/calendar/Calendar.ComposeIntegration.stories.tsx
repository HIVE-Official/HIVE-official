import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Composer } from "@/organisms/spaces/composer";
import { CalendarList } from "@/organisms/spaces/calendar-list";
import { EventSheet } from "@/organisms/spaces/event-sheet";
import type { CalendarEvent, RSVPStatus } from "@/organisms/spaces/types";
import { roboticsUpcomingEvents } from "@/fixtures/spaces/space-robotics";
import { addMinutes } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { telemetry } from "@/utils/telemetry";

const meta: Meta<typeof CalendarList> = {
  title: "Organisms/Spaces/Calendar/Composer Integration",
  component: CalendarList,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj;

function makeEvent(title: string): CalendarEvent {
  const now = new Date();
  return {
    id: `evt-${Math.random().toString(36).slice(2)}`,
    spaceId: "space-robotics",
    title: title || "Untitled Event",
    description: "Draft event created from Composer.",
    location: "TBD",
    startTime: addMinutes(now, 120),
    endTime: addMinutes(now, 180),
    coverImageUrl: null,
    coverImageAlt: null,
    tags: [],
    maxAttendees: undefined,
    enableWaitlist: true,
    goingCount: 0,
    maybeCount: 0,
    waitlistCount: 0,
    checkInEnabled: false,
    checkedInCount: 0,
    checkInWindowBefore: undefined,
    checkInWindowAfter: undefined,
    qrCodeEnabled: false,
    coHostIds: [],
    coHostNames: [],
    isRssImported: false,
    userRsvp: undefined,
    userCheckedIn: false,
    createdAt: now,
    updatedAt: now,
  };
}

export const LeaderCreatesEvent: Story = {
  render: () => {
    const { toast } = useToast();
    const [events, setEvents] = React.useState<CalendarEvent[]>([...roboticsUpcomingEvents as any]);
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState<CalendarEvent | null>(null);

    const onRSVP = (id: string, status: RSVPStatus) => {
      telemetry.rsvpClicked(id, status);
      setEvents((list) => list.map((e) => (e.id === id ? { ...e, userRsvp: status } : e)));
      toast({ title: "RSVP", description: `Updated to ${status}` });
    };

    return (
      <div className="space-y-6">
        <Composer
          role="leader"
          allowEvents
          allowForms
          allowPolls
          preflight={null}
          onCreateEvent={() => {
            const evt = makeEvent("Workshop from Composer");
            setEvents((list) => [evt, ...list]);
            telemetry.eventCreated({ id: evt.id, title: evt.title });
            toast({ title: "Event created", description: "Draft added to calendar" });
          }}
          onSubmit={(text) => {
            // Optional: turn plain text into an event if it starts with "event:"
            if (/^event\s*:/i.test(text)) {
              const title = text.replace(/^event\s*:/i, "").trim();
              const evt = makeEvent(title || "Composer Event");
              setEvents((list) => [evt, ...list]);
              telemetry.eventCreated({ id: evt.id, title: evt.title, from: "text_prefix" });
              toast({ title: "Event created", description: title || "Untitled" });
            } else {
              telemetry.postSubmitted("text", text.length);
              toast({ title: "Posted", description: text.slice(0, 48) });
            }
          }}
        />
        <CalendarList
          events={events}
          canCreateEvents
          onEventClick={(evt) => { setActive(evt); setOpen(true); }}
          onRSVP={onRSVP}
        />
        {active && (
          <EventSheet
            open={open}
            onOpenChange={setOpen}
            event={active}
            onRSVP={(status) => onRSVP(active.id, status)}
            blurExperimental
          />
        )}
      </div>
    );
  },
};

export const MemberProposesEvent: Story = {
  render: () => {
    const { toast } = useToast();
    const [events, setEvents] = React.useState<CalendarEvent[]>([...roboticsUpcomingEvents as any]);
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState<CalendarEvent | null>(null);

    return (
      <div className="space-y-6">
        <Composer
          role="member"
          allowEvents
          policy={{ posting: "members", event: "members_with_approval" }}
          preflight={null}
          onProposeEvent={() => {
            telemetry.proposalSubmitted("event");
            toast({ title: "Proposal sent", description: "Leaders will review your event" });
          }}
          onSubmit={(text) => { telemetry.postSubmitted("text", text.length); toast({ title: "Posted", description: text.slice(0, 48) }); }}
        />
        <CalendarList
          events={events.map((e, idx) => ({ ...(e as any), proposalStatus: idx % 2 === 0 ? 'pending' : undefined })) as any}
          onEventClick={(evt) => { setActive(evt); setOpen(true); }}
          onRSVP={(id, status) => {
            setEvents((list) => list.map((e) => (e.id === id ? { ...e, userRsvp: status } : e)));
            toast({ title: "RSVP", description: `Updated to ${status}` });
          }}
        />
        {active && (
          <EventSheet
            open={open}
            onOpenChange={setOpen}
            event={active}
            blurExperimental
          />
        )}
      </div>
    );
  },
};

export const LeadersApproveProposals: Story = {
  render: () => {
    const { toast } = useToast();
    const [events, setEvents] = React.useState<CalendarEvent[]>([...roboticsUpcomingEvents as any]);
    const [proposals, setProposals] = React.useState<{ id: string; title: string }[]>([]);
    const [open, setOpen] = React.useState(false);
    const [active, setActive] = React.useState<CalendarEvent | null>(null);

    const propose = (title: string) => {
      const id = `pp-${Math.random().toString(36).slice(2)}`;
      setProposals((p) => [{ id, title }, ...p]);
      telemetry.proposalSubmitted("event");
      toast({ title: "Proposal sent", description: title });
    };

    const approve = (pid: string) => {
      const proposal = proposals.find((p) => p.id === pid);
      if (!proposal) return;
      const evt = makeEvent(proposal.title);
      setEvents((list) => [evt, ...list]);
      setProposals((p) => p.filter((x) => x.id !== pid));
      telemetry.eventCreated({ id: evt.id, title: evt.title, source: "proposal" });
      toast({ title: "Event approved", description: proposal.title });
    };

    const decline = (pid: string) => {
      const proposal = proposals.find((p) => p.id === pid);
      setProposals((p) => p.filter((x) => x.id !== pid));
      toast({ title: "Proposal declined", description: proposal?.title });
    };

    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Member proposer */}
        <div className="space-y-4">
          <Composer
            role="member"
            allowEvents
            policy={{ posting: "members", event: "members_with_approval" }}
            preflight={null}
            onProposeEvent={() => propose("Proposed Hack Night")}
          />
          <CalendarList
            events={events}
            onEventClick={(evt) => { setActive(evt); setOpen(true); }}
            onRSVP={(id, status) => {
              telemetry.rsvpClicked(id, status);
              setEvents((list) => list.map((e) => (e.id === id ? { ...e, userRsvp: status } : e)));
            }}
          />
        </div>

        {/* Leader queue */}
        <aside className="rounded-lg border border-border/50 bg-card/80 p-4">
          <h3 className="mb-2 text-body font-semibold">Proposals (Leader)</h3>
          {proposals.length === 0 ? (
            <p className="text-caption text-muted-foreground">No proposals yet</p>
          ) : (
            <ul className="space-y-2">
              {proposals.map((p) => (
                <li key={p.id} className="rounded-md border border-border/40 bg-card/60 p-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-body-sm font-medium">{p.title}</span>
                    <div className="flex items-center gap-2">
                      <button className="rounded-md bg-primary/90 px-2 py-1 text-xs text-primary-foreground hover:bg-primary" onClick={() => approve(p.id)}>
                        Approve
                      </button>
                      <button className="rounded-md bg-muted px-2 py-1 text-xs hover:bg-muted/70" onClick={() => decline(p.id)}>
                        Decline
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {active && (
          <EventSheet open={open} onOpenChange={setOpen} event={active} blurExperimental />
        )}
      </div>
    );
  },
};
