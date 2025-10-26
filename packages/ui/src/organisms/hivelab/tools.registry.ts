// Bounded Context Owner: HiveLab Guild
// Minimal UI registry for composer actions. In real app, hydrate from Tool definitions.

import { Calendar, BarChart3, ClipboardList, MessageSquare, Megaphone, Hammer } from "lucide-react";

export type ToolActionId = "text" | "event" | "poll" | "form" | "announcement" | string;

export type ToolAction = {
  id: ToolActionId;
  label: string;
  icon: any; // lucide icon component
  keywords?: string[];
  roles?: ("member" | "moderator" | "leader")[];
  gatedBy?: (ctx: ToolContext) => boolean; // policy gate
  produceDraft?: (ctx: ToolContext) => { text?: string };
  section?: "recent" | "suggested" | "installed";
};

export type ToolContext = {
  isLeader?: boolean;
  allowEvents?: boolean;
  allowPolls?: boolean;
  allowForms?: boolean;
};

export function defaultToolActions(): ToolAction[] {
  return [
    {
      id: "text",
      label: "Text",
      icon: MessageSquare,
      keywords: ["post", "message"],
      produceDraft: () => ({ text: "" }),
      section: "suggested",
    },
    {
      id: "event",
      label: "Event",
      icon: Calendar,
      keywords: ["calendar", "meet", "rsvp"],
      gatedBy: (c) => !!c.allowEvents,
      section: "suggested",
    },
    {
      id: "poll",
      label: "Poll",
      icon: BarChart3,
      keywords: ["vote", "question"],
      gatedBy: (c) => !!c.allowPolls,
      section: "installed",
    },
    {
      id: "form",
      label: "Form",
      icon: ClipboardList,
      keywords: ["signup", "rsvp", "form"],
      gatedBy: (c) => !!c.allowForms,
      section: "installed",
    },
    {
      id: "announcement",
      label: "Announcement",
      icon: Megaphone,
      roles: ["leader", "moderator"],
      section: "installed",
    },
    // Example placeholder for future tools
    {
      id: "tool-rideboard",
      label: "Rideboard",
      icon: Hammer,
      keywords: ["rides", "carpool"],
      section: "installed",
    },
  ];
}

// Recent actions persisted per space/user context
export function readRecents(storageKey: string): ToolActionId[] {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? (arr as ToolActionId[]) : [];
  } catch {
    return [];
  }
}

export function writeRecents(storageKey: string, ids: ToolActionId[]) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(ids.slice(0, 5)));
  } catch (error) {
    console.warn("hivelab.tools.write_recents_failed", error);
  }
}
