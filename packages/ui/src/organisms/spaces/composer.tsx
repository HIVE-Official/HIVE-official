// Bounded Context Owner: Spaces Domain Guild
/**
 * Composer — Minimal bottom composer with action shelf and policy preflight slot.
 * - One-line input expands on focus
 * - ≤6 actions via ComposerActions (existing)
 * - Emits onSubmit with text content; resets with undo affordance managed by parent
 */
import * as React from "react";
import { Button } from "@/atoms/button";
import { Textarea } from "@/atoms/textarea";
import { InlineNotice } from "@/molecules/inline-notice";
import { Popover, PopoverContent, PopoverTrigger } from "@/molecules/popover";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/atoms/tooltip";
import { cn } from "@/utils/cn";
import {
  Plus,
  MessageSquare,
  Calendar,
  BarChart3,
  ClipboardList,
  Megaphone,
} from "lucide-react";
import { defaultToolActions, readRecents, writeRecents, type ToolAction, type ToolActionId } from "@/organisms/hivelab/tools.registry";
import { telemetry } from "@/utils/telemetry";

export interface ComposerProps {
  /** Preflight message for policies (leaders-only, media approval, etc.) */
  preflight?: { variant?: "neutral" | "info" | "success" | "warning" | "destructive"; heading?: string; body?: string } | null;
  /** Called when user submits content */
  onSubmit?: (content: string) => void;
  /** Disable input and actions */
  disabled?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Post type action handlers (opened via + menu) */
  onCreatePost?: () => void;
  onCreateEvent?: () => void;
  onProposeEvent?: () => void;
  onCreatePoll?: () => void;
  onCreateForm?: () => void;
  onCreateAnnouncement?: () => void;
  onProposePoll?: () => void;
  onProposeForm?: () => void;
  /** Policy gates for menu */
  allowEvents?: boolean;
  allowPolls?: boolean;
  allowForms?: boolean;
  isLeader?: boolean;
  role?: "member" | "moderator" | "leader";
  policy?: {
    posting?: "members" | "leaders_only";
    event?: "leaders_only" | "members_with_approval" | "members_open";
    poll?: "leaders_only" | "members_with_approval" | "members_open";
    form?: "leaders_only" | "members_with_approval" | "members_open";
  };
  /** Visual variant: 'plus' (ChatGPT-like) | 'shelf' (legacy). Defaults to 'plus'. */
  variant?: "plus" | "shelf";
}

export const Composer: React.FC<ComposerProps> = ({
  preflight,
  onSubmit,
  disabled = false,
  placeholder = "What's happening in your space?",
  onCreatePost,
  onCreateEvent,
  onProposeEvent,
  onCreatePoll,
  onCreateForm,
  onCreateAnnouncement,
  onProposePoll,
  onProposeForm,
  allowEvents = true,
  allowPolls = true,
  allowForms = true,
  isLeader = false,
  role,
  policy,
  variant = "plus",
}) => {
  const [value, setValue] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [slashOpen, setSlashOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [highlight, setHighlight] = React.useState(0);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const storageKey = "composer:recents";
  const actions = React.useMemo(() => defaultToolActions(), []);
  const isLeaderOrMod = isLeader || role === "leader" || role === "moderator";
  const ctx = { allowEvents, allowPolls, allowForms, isLeader: isLeaderOrMod };
  const recents = readRecents(storageKey);

  const installFiltered = (list: ToolAction[]): ToolAction[] => {
    const q = query.trim().toLowerCase();
    return list.filter((a) => {
      if (a.roles && !a.roles.some((r) => (isLeader ? ["leader", "moderator"].includes(r as any) : r === "member"))) return false;
      if (a.gatedBy && !a.gatedBy(ctx)) return false;
      if (!q) return true;
      const keys = [a.label, ...(a.keywords || [])].join(" ").toLowerCase();
      return keys.includes(q);
    });
  };

  const all = installFiltered(actions);
  const recentActions = recents.map((id) => all.find((a) => a.id === id)).filter(Boolean) as ToolAction[];
  const suggested = all.filter((a) => a.section === "suggested" && !recentActions.includes(a));
  const installed = all.filter((a) => a.section === "installed" && !recentActions.includes(a));

  const recordRecent = (id: ToolActionId) => {
    const next = [id, ...recents.filter((x) => x !== id)].slice(0, 5);
    writeRecents(storageKey, next);
  };

  const triggerAction = (id: ToolActionId) => {
    telemetry.composerActionSelected(id);
    switch (id) {
      case "text":
        onCreatePost?.();
        setExpanded(true);
        break;
      case "event": {
        const mode = eventActionMode();
        if (mode === "create") onCreateEvent?.();
        else if (mode === "propose") onProposeEvent?.();
        setExpanded(true);
        break;
      }
      case "poll":
        onCreatePoll?.();
        setExpanded(true);
        break;
      case "form":
        onCreateForm?.();
        setExpanded(true);
        break;
      case "announcement":
        onCreateAnnouncement?.();
        setExpanded(true);
        break;
      default:
        // Future tool: insert tag in text as a placeholder
        setValue((v) => (v ? v + "\n" : "") + `#${id} `);
        setExpanded(true);
    }
    recordRecent(id);
    setSlashOpen(false);
    setMenuOpen(false);
  };

  // Gating logic for events
  type Mode = "create" | "propose" | "disabled";
  const eventActionMode = (): Mode => {
    if (!allowEvents) return "disabled";
    const p = policy?.event || "members_with_approval";
    if (isLeaderOrMod) return "create";
    if (p === "members_open") return "create";
    if (p === "members_with_approval") return "propose";
    return "disabled"; // leaders_only
  };

  const pollActionMode = (): Mode => {
    const p = policy?.poll || "members_open";
    if (isLeaderOrMod) return "create";
    if (p === "members_open") return "create";
    if (p === "members_with_approval") return "propose";
    return "disabled";
  };

  const formActionMode = (): Mode => {
    const p = policy?.form || "members_open";
    if (isLeaderOrMod) return "create";
    if (p === "members_open") return "create";
    if (p === "members_with_approval") return "propose";
    return "disabled";
  };

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setValue("");
    setExpanded(false);
  };

  const containerBg = variant === "shelf" ? "bg-muted/30" : "bg-card";

  return (
    <div className="space-y-3">
      {preflight && (
        <InlineNotice variant={preflight.variant ?? "info"} heading={preflight.heading}>
          {preflight.body}
        </InlineNotice>
      )}

      {/* Minimal input with + actions (ChatGPT-like) */}
      <div className={cn("rounded-lg border border-border/50 p-2 relative", containerBg)}>
        <div className="flex items-start gap-2">
          {/* + menu trigger */}
          <Popover open={menuOpen} onOpenChange={setMenuOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                aria-label="Open composer actions"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground",
                  "hover:text-foreground hover:border-primary/40",
                  "transition duration-swift ease-standard",
                  menuOpen && "rotate-45 text-foreground border-primary/50"
                )}
                onClick={() => { setMenuOpen((v) => { const next = !v; if (next) telemetry.composerOpened("plus"); return next; }); }}
                disabled={disabled}
              >
                <Plus className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" sideOffset={8} className="min-w-[240px]">
              <div className="grid grid-cols-2 gap-2">
                {/* Text */}
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/40"
                  onClick={() => { onCreatePost?.(); setExpanded(true); setMenuOpen(false); }}
                >
                  <MessageSquare className="h-4 w-4" /> <span>Text</span>
                </button>
                {/* Event */}
                {allowEvents && (() => {
                  const mode = eventActionMode();
                  if (mode === "create") {
                    return (
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/40"
                        onClick={() => { onCreateEvent?.(); setExpanded(true); setMenuOpen(false); }}
                      >
                        <Calendar className="h-4 w-4" /> <span>Event</span>
                      </button>
                    );
                  }
                  if (mode === "propose") {
                    return (
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/40"
                        onClick={() => { onProposeEvent?.(); setExpanded(true); setMenuOpen(false); }}
                      >
                        <Calendar className="h-4 w-4" /> <span>Propose event</span>
                      </button>
                    );
                  }
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          disabled
                          className="flex items-center gap-2 rounded-md px-2 py-2 text-muted-foreground/60 cursor-not-allowed"
                        >
                          <Calendar className="h-4 w-4" /> <span>Event</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>Leaders-only</TooltipContent>
                    </Tooltip>
                  );
                })()}
                {/* Poll */}
                {allowPolls && (() => {
                  const mode = pollActionMode();
                  if (mode === 'create') {
                    return (
                      <button type="button" className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/40" onClick={() => { onCreatePoll?.(); setExpanded(true); setMenuOpen(false); }}>
                        <BarChart3 className="h-4 w-4" /> <span>Poll</span>
                      </button>
                    );
                  }
                  if (mode === 'propose') {
                    return (
                      <button type="button" className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/40" onClick={() => { onProposePoll?.(); setExpanded(true); setMenuOpen(false); }}>
                        <BarChart3 className="h-4 w-4" /> <span>Propose poll</span>
                      </button>
                    );
                  }
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <button type="button" disabled className="flex items-center gap-2 rounded-md px-2 py-2 text-muted-foreground/60 cursor-not-allowed">
                            <BarChart3 className="h-4 w-4" /> <span>Poll</span>
                          </button>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Leaders-only</TooltipContent>
                    </Tooltip>
                  );
                })()}
                {/* Form */}
                {allowForms && (() => {
                  const mode = formActionMode();
                  if (mode === 'create') {
                    return (
                      <button type="button" className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/40" onClick={() => { onCreateForm?.(); setExpanded(true); setMenuOpen(false); }}>
                        <ClipboardList className="h-4 w-4" /> <span>Form</span>
                      </button>
                    );
                  }
                  if (mode === 'propose') {
                    return (
                      <button type="button" className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/40" onClick={() => { onProposeForm?.(); setExpanded(true); setMenuOpen(false); }}>
                        <ClipboardList className="h-4 w-4" /> <span>Propose form</span>
                      </button>
                    );
                  }
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <button type="button" disabled className="flex items-center gap-2 rounded-md px-2 py-2 text-muted-foreground/60 cursor-not-allowed">
                            <ClipboardList className="h-4 w-4" /> <span>Form</span>
                          </button>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Leaders-only</TooltipContent>
                    </Tooltip>
                  );
                })()}
                {/* Announcement (leaders only) */}
                {isLeader && (
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-muted/40"
                    onClick={() => { onCreateAnnouncement?.(); setExpanded(true); setMenuOpen(false); }}
                  >
                    <Megaphone className="h-4 w-4" /> <span>Announcement</span>
                  </button>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Inline recents pills (up to 2) */}
          {recentActions.slice(0,2).length > 0 && (
            <div className="flex items-center gap-1 mt-1">
              {recentActions.slice(0,2).map((a) => {
                const Icon = a.icon;
                return (
                  <button key={a.id} onClick={() => triggerAction(a.id)} className="inline-flex items-center gap-1 rounded-full border border-border/50 px-2 py-0.5 text-caption text-muted-foreground hover:bg-muted/40">
                    <Icon className="h-3.5 w-3.5" /> {a.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Textarea */}
          <div className="flex-1 min-w-0">
            <Textarea
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              onFocus={() => setExpanded(true)}
              onKeyDown={(e) => {
                if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
                  setSlashOpen(true);
                  telemetry.composerOpened("slash");
                  setQuery("");
                } else if (slashOpen) {
                  if (e.key === "Escape") {
                    setSlashOpen(false);
                  } else if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setHighlight((h) => Math.min(h + 1, (recentActions.length + suggested.length + installed.length) - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setHighlight((h) => Math.max(h - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    const merged = [...recentActions, ...suggested, ...installed];
                    const pick = merged[highlight] || merged[0];
                    if (pick) triggerAction(pick.id);
                  }
                }
              }}
              placeholder={placeholder}
              disabled={disabled}
              minRows={expanded ? 3 : 1}
              maxRows={8}
              className="resize-none bg-background/50"
              aria-label="Compose a post"
              ref={textareaRef}
            />
            <div className="flex items-center justify-between mt-1">
              <span className="text-caption text-muted-foreground">
                {value.length > 0 ? `${value.length} / 4000` : " "}
              </span>
              <Button size="sm" onClick={submit} disabled={disabled || value.trim().length === 0}>
                Post
              </Button>
            </div>
          </div>
        </div>
        {/* Slash menu (caret-anchored approximation) */}
        {slashOpen && (
          <div className="mt-2">
            <Popover open={slashOpen} onOpenChange={setSlashOpen}>
              <PopoverTrigger asChild>
                <div />
              </PopoverTrigger>
              <PopoverContent align="start" side="bottom" sideOffset={8} className="min-w-[280px]" style={{ position: 'absolute' }}>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => { setQuery(e.currentTarget.value); setHighlight(0); }}
                  className="w-full rounded-md border border-border/50 bg-background px-2 py-1 text-sm mb-2"
                  placeholder="Search actions…"
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
                      // Delegate to textarea handler state
                      e.preventDefault();
                    }
                    if (e.key === "Escape") setSlashOpen(false);
                  }}
                />
                <div className="max-h-64 overflow-auto">
                  {recentActions.length > 0 && (
                    <SectionList title="Recent" items={recentActions} highlightOffset={0} highlightIndex={highlight} onPick={(id) => triggerAction(id)} />
                  )}
                  <SectionList title="Suggested" items={suggested} highlightOffset={recentActions.length} highlightIndex={highlight} onPick={(id) => triggerAction(id)} />
                  {installed.length > 0 && (
                    <SectionList title="Tools" items={installed} highlightOffset={recentActions.length + suggested.length} highlightIndex={highlight} onPick={(id) => triggerAction(id)} />
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

type SectionProps = {
  title: string;
  items: ToolAction[];
  highlightIndex: number;
  highlightOffset: number;
  onPick: (id: ToolActionId) => void;
};

const SectionList = ({ title, items, highlightIndex, highlightOffset, onPick }: SectionProps) => {
  if (!items.length) return null;
  return (
    <div className="mb-2">
      <div className="px-1 pb-1 text-caption text-muted-foreground uppercase tracking-wide">{title}</div>
      <ul className="grid grid-cols-2 gap-1">
        {items.map((a, i) => {
          const Icon = a.icon;
          const active = highlightIndex === highlightOffset + i;
          return (
            <li key={a.id}>
              <button
                type="button"
                className={cn("w-full flex items-center gap-2 rounded-md px-2 py-2 text-left hover:bg-muted/40", active && "bg-muted/50")}
                onClick={() => onPick(a.id)}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{a.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
