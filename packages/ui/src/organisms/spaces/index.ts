// Bounded Context Owner: Spaces Domain Guild
/**
 * Spaces V5 Architecture
 *
 * Refactored component library:
 * - Single SpaceLayout (70/30 split, discussion-first)
 * - Consolidated tool widgets (Events, Community, Resources, Tools)
 * - Inline posts only (standard, event, poll, announcement)
 * - Forms/trackers moved to widget tools
 */

// Types
export * from "./types";

// Header
export * from "./space-header";

// Layout (V5 - single consolidated component)
export * from "./space-layout";
export * from "./space-dashboard";
export * from "./space-discovery-card";
export * from "./space-discovery-grid";

// BoardCard base and INLINE variants only
export * from "./board-card";
export * from "./board-card-standard"; // Discussion posts (PRIMARY)
export * from "./board-card-event"; // Pre-seeded events (SECONDARY)
export * from "./board-card-poll"; // Quick votes (inline)
export * from "./board-card-announcement"; // Leader-only
export * from "./board-card-digest"; // AI summaries

// NOTE: Forms and trackers are now WIDGET TOOLS, not inline posts
// See ToolsWidget for form/tracker interfaces

// Board composition helpers
export * from "./pinned-cluster";
export * from "./feed-list";
export * from "./composer";
export * from "./post-detail";
export * from "./composer-actions";
export * from "./comments-sheet";
export * from "./safety-queue";

// Full-page modules (click-through destinations from widgets)
export * from "./calendar-month";
export * from "./calendar-list";
export * from "./space-calendar-view";
export * from "./event-detail";
export * from "./event-sheet";
export * from "./members-roster";
export * from "./about-section";
export * from "./tools-catalog";
export * from "./moderation-queue";

// Right-side Dock (legacy code: context-rail)
export * from "./dock";
export { Dock } from "./dock";
export * from "./right-rail-clear";
export { RightRailClear as DockClear } from "./right-rail-clear";

// Widgets (V5 - Consolidated clickable tools)
export * from "./widgets";
